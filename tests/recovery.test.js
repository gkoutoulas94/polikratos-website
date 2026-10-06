import test from 'node:test';
import assert from 'node:assert/strict';
import { recoveryLinkState, passwordError } from '../assets/recovery-policy.js';

test('ordinary navigation never opens password update', () => {
  assert.equal(recoveryLinkState(''), 'request');
  assert.equal(recoveryLinkState('#access_token=x&refresh_token=y&type=signup'), 'invalid');
  assert.equal(recoveryLinkState('#type=recovery'), 'invalid');
});
test('expired or errored callbacks are rejected before session use', () => {
  assert.equal(recoveryLinkState('#error_code=otp_expired&type=recovery&access_token=x&refresh_token=y'), 'invalid');
});
test('recovery callback must have both credentials and correct purpose', () => {
  assert.equal(recoveryLinkState('#type=recovery&access_token=x&refresh_token=y'), 'recovery');
  assert.equal(recoveryLinkState('#type=recovery&access_token=x'), 'invalid');
});
test('password confirmation rejects mismatch and length extremes', () => {
  assert.equal(passwordError('12345678', '12345678'), null);
  assert.notEqual(passwordError('12345678', '12345679'), null);
  assert.notEqual(passwordError('short', 'short'), null);
  assert.notEqual(passwordError('x'.repeat(129), 'x'.repeat(129)), null);
});
