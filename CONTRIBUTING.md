# Contributing

Thank you for helping improve the wsign Node.js library.

## Development setup

```bash
git clone https://github.com/wsign-io/wsign-node.git
cd wsign-node
npm install
```

Node.js 20 or later is needed for the development tools; the published library supports Node.js 18 and later.

## Checks

Run all of these before opening a pull request (`npm run check` runs them in order):

```bash
npm run lint          # ESLint (typescript-eslint, strict type-checked rules)
npm run format:check  # Prettier; npm run format to apply
npm run typecheck     # TypeScript strict mode, no emit
npm test              # unit tests with node:test and a mocked fetch (no network)
npm run build         # ESM + CommonJS builds with type declarations
npm run test:dist     # loads both builds through the package exports
```

The integration suite talks to a real API in test mode and is skipped unless configured:

```bash
WSIGN_API_KEY=sk_test_... WSIGN_API_BASE=https://wsign.io/api/v1 npm run test:integration
```

It refuses live keys. It creates drafts, a session and a test webhook endpoint and cancels or deletes them
at the end. Test mode allows 20 created requests per account per 24 hours.

## Guidelines

- Keep the public API backwards compatible within a major version.
- Add or update unit tests for every change, and update `CHANGELOG.md` under "Unreleased".
- Follow the existing naming: resources mirror the API and request/response fields keep the API's names.
- No runtime dependencies.
- Report security issues privately as described in [SECURITY.md](SECURITY.md).
