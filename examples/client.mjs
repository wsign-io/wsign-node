// Shared setup for the examples.
//
//   export WSIGN_API_KEY=sk_test_...
//   export WSIGN_TEMPLATE_ID=tpl_123            # one of your templates (scope: 'mine')
//   export WSIGN_SIGNER_EMAIL=you@example.com   # test mode accepts only your account's own addresses
//   node examples/create-signature-request.mjs
//
// Optional: WSIGN_API_BASE to point at another environment.
import Wsign from '@wsign/node';

export function env(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    console.error(`Set the ${name} environment variable first.`);
    process.exit(1);
  }
  return value;
}

export const wt = new Wsign(env('WSIGN_API_KEY'), {
  ...(process.env.WSIGN_API_BASE ? { baseUrl: process.env.WSIGN_API_BASE } : {}),
  appInfo: { name: 'wsign-node-examples' },
});
