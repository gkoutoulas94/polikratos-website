import { createClient } from '@supabase/supabase-js';

const params = new URLSearchParams(location.hash.slice(1));
const tokenHash = params.get('token_hash');
const validToken = tokenHash && /^[a-f0-9]{40,128}$/i.test(tokenHash);
history.replaceState(null, '', location.pathname);
const status = document.querySelector('#status');
const button = document.querySelector('#confirm');
const client = createClient('https://yzsqrdjtvkqnwrueytnf.supabase.co',
  'sb_publishable_HDlq3gfuBmyqFATj5ZN95A_5S3rBBAJ', {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (url, options = {}) => fetch(url, { ...options, signal: AbortSignal.timeout(20000) }) },
  });
if (validToken) {
  status.textContent = 'Confirming your email…';
} else {
  status.textContent = 'This link is missing, invalid or has expired. Request a new confirmation email.';
  document.querySelector('#help').hidden = false;
}
async function confirmEmail() {
  button.disabled = true;
  try {
    const { data, error } = await client.auth.verifyOtp({ token_hash: tokenHash, type: 'signup' });
    if (error || !data.user?.email_confirmed_at) {
      status.textContent = 'This confirmation link has expired or has already been used.';
      document.querySelector('#help').hidden = false;
      return;
    }
    document.querySelector('#title').textContent = 'Email confirmed!';
    status.textContent = 'Your account is ready. Return to POLIKRATOS to sign in and play.';
    button.hidden = true;
    document.querySelector('#return').hidden = false;
    document.querySelector('#fallback').hidden = false;
    // Do not transfer the web session to an app/custom-scheme URL.
    try { await client.auth.signOut({ scope: 'local' }); } catch { /* in-memory only */ }
  } catch {
    status.textContent = 'Could not connect. Please try again.';
    button.textContent = 'Try again';
    button.hidden = false;
    button.disabled = false;
  }
}
button.addEventListener('click', confirmEmail);
if (validToken) void confirmEmail();
