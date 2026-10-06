import { createClient } from '@supabase/supabase-js';
import { recoveryLinkState, passwordError } from './recovery-policy.js';

const status = document.querySelector('#status');
const requestForm = document.querySelector('#request-form');
const passwordForm = document.querySelector('#password-form');
const retry = document.querySelector('#retry');
const linkState = recoveryLinkState(location.hash);
// Keep the recovery session in memory only. No analytics or third-party scripts
// run on this page, and the SDK consumes/removes the fragment after validation.
const client = createClient('https://yzsqrdjtvkqnwrueytnf.supabase.co',
  'sb_publishable_HDlq3gfuBmyqFATj5ZN95A_5S3rBBAJ', {
    auth: { flowType: 'implicit', persistSession: false, autoRefreshToken: false,
      detectSessionInUrl: linkState === 'recovery' },
    global: { fetch: (url, options = {}) => fetch(url, {
      ...options, signal: AbortSignal.timeout(20000),
    }) },
  });
let recoveryReady = false;
let busy = false;
function invalidLink() {
  recoveryReady = false;
  passwordForm.hidden = true;
  retry.hidden = false;
  status.textContent = 'This reset link is invalid or has expired. Request a new link below.';
}
client.auth.onAuthStateChange((event, session) => {
  if (event === 'PASSWORD_RECOVERY' && session && linkState === 'recovery') {
    recoveryReady = true;
    passwordForm.hidden = false;
    status.textContent = 'Choose a new password for your POLIKRATOS account.';
  }
});
if (linkState === 'request') {
  requestForm.hidden = false;
  status.textContent = 'Get back to your game.';
} else if (linkState === 'invalid') {
  history.replaceState(null, '', location.pathname);
  invalidLink();
} else {
  try {
    const { data, error } = await client.auth.getSession();
    history.replaceState(null, '', location.pathname);
    if (error || !data.session) invalidLink();
    else {
      recoveryReady = true;
      passwordForm.hidden = false;
      status.textContent = 'Choose a new password for your POLIKRATOS account.';
    }
  } catch {
    history.replaceState(null, '', location.pathname);
    invalidLink();
  }
}
async function submit(form, action) {
  if (busy) return;
  busy = true;
  const button = form.querySelector('button');
  button.disabled = true;
  try { await action(); }
  catch { status.textContent = 'Could not connect. Please try again shortly.'; }
  finally { busy = false; button.disabled = false; }
}
requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  void submit(requestForm, async () => {
    const { error } = await client.auth.resetPasswordForEmail(
      document.querySelector('#email').value.trim(),
      { redirectTo: 'https://polikratos.com/reset-password.html' },
    );
    if (error) {
      status.textContent = error.status === 429
        ? 'Too many requests. Please wait a few minutes and try again.'
        : 'Could not send the email. Please try again later or contact support.';
      return;
    }
    // Same response for known/unknown email addresses; no account enumeration.
    status.textContent = 'If an account uses this email, a reset link will arrive shortly. Check your spam folder too.';
    requestForm.hidden = true;
    retry.hidden = false;
  });
});
passwordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  void submit(passwordForm, async () => {
    if (!recoveryReady) { invalidLink(); return; }
    const password = document.querySelector('#password').value;
    const validation = passwordError(password, document.querySelector('#confirmation').value);
    if (validation) { status.textContent = validation; return; }
    const { error } = await client.auth.updateUser({ password });
    if (error) {
      if (error.status === 401 || error.status === 403) { invalidLink(); return; }
      status.textContent = error.code === 'same_password'
        ? 'Choose a password different from your current password.'
        : 'Could not update your password. Try a stronger password or request a new link.';
      retry.hidden = false;
      return;
    }
    recoveryReady = false;
    passwordForm.reset();
    passwordForm.hidden = true;
    status.textContent = 'Password updated. Return to POLIKRATOS and sign in with your new password.';
    // A sign-out transport failure must not report the successful change as a failure.
    try { await client.auth.signOut(); } catch { /* Memory-only session ends with this page. */ }
  });
});
