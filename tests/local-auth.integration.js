// Isolated local Supabase only. Never logs credentials or sends email.
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createClient } from '@supabase/supabase-js';

let settings;
try {
  const raw = execFileSync('npx.cmd', ['--yes', 'supabase@2.118.0', 'status', '--output', 'json'], {
    cwd: '../app/.local-staging', encoding: 'utf8', shell: true, stdio: ['ignore', 'pipe', 'pipe'],
  });
  settings = JSON.parse(raw);
} catch {
  throw Error('Start the isolated local staging stack before running this test.');
}
const url = settings.API_URL;
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(url)) throw Error('Local Supabase required.');
const options = { auth: { persistSession: false, autoRefreshToken: false } };
const admin = createClient(url, settings.SERVICE_ROLE_KEY, options);
const browser = createClient(url, settings.ANON_KEY, options);
const email = `recovery-${randomUUID()}@example.test`;
const original = `Aa!${randomUUID()}`;
const replacement = `Bb!${randomUUID()}`;
let id;
try {
  const signup = await admin.auth.admin.generateLink({ type: 'signup', email, password: original });
  assert.equal(signup.error, null);
  id = signup.data.user.id;
  const confirmed = await browser.auth.verifyOtp({ token_hash: signup.data.properties.hashed_token, type: 'signup' });
  assert.equal(confirmed.error, null);
  assert.ok(confirmed.data.user.email_confirmed_at);
  assert.equal(confirmed.data.user.id, id);
  await browser.auth.signOut({ scope: 'local' });
  const reused = await browser.auth.verifyOtp({ token_hash: signup.data.properties.hashed_token, type: 'signup' });
  assert.ok(reused.error);
  const recovery = await admin.auth.admin.generateLink({ type: 'recovery', email });
  assert.equal(recovery.error, null);
  const verified = await browser.auth.verifyOtp({ token_hash: recovery.data.properties.hashed_token, type: 'recovery' });
  assert.equal(verified.error, null);
  assert.equal((await browser.auth.updateUser({ password: replacement })).error, null);
  await browser.auth.signOut();
  assert.ok((await browser.auth.signInWithPassword({ email, password: original })).error);
  const login = await browser.auth.signInWithPassword({ email, password: replacement });
  assert.equal(login.error, null);
  assert.equal(login.data.user.id, id);
  console.log('PASS: signup confirmation, reused-link rejection, recovery, old-password rejection and same-account login (local only).');
} finally {
  await browser.auth.signOut({ scope: 'local' });
  if (id) {
    const removed = await admin.auth.admin.deleteUser(id);
    if (removed.error) throw Error('Local disposable auth test cleanup failed.');
  }
}
