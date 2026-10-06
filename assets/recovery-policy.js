export function recoveryLinkState(hash) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  if (params.has('error') || params.has('error_code')) return 'invalid';
  if (!params.size) return 'request';
  return params.get('type') === 'recovery' && params.get('access_token') &&
    params.get('refresh_token') ? 'recovery' : 'invalid';
}

export function passwordError(password, confirmation) {
  if (password.length < 8 || password.length > 128) return 'Use a password of 8–128 characters.';
  if (password !== confirmation) return 'The passwords do not match.';
  return null;
}
