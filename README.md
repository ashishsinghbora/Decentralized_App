# Decentralized App

Mobile-first decentralized messaging scaffold built with React Native (Expo + TypeScript) and shared domain modules for:

- Anonymous DID-based identity bootstrapping
- Matrix-compatible messaging interfaces
- Signal/Olm-ready crypto boundaries
- Offline-first queue and sync primitives
- IPFS media abstractions
- UPI payment integration contracts
- Hindi, Bengali, and Tamil localization
- Security baseline aligned to OWASP MASVS

## Repository layout

- `/apps/mobile` — React Native app shell (Expo TypeScript)
- `/packages/crypto` — identity, key management interfaces
- `/packages/messaging` — Matrix messaging and anti-spam orchestration
- `/packages/storage` — offline queue, local cache, IPFS media helpers
- `/packages/payments` — UPI transaction domain and provider contracts
- `/packages/localization` — multilingual dictionaries and translation API
- `/.github/workflows/ci.yml` — baseline CI for type checks and tests

## Quick start

```bash
cd /home/runner/work/Decentralized_App/Decentralized_App
npm install
npm run typecheck
npm run test
npm run mobile:start
```

## Security baseline

See `/SECURITY_BASELINE.md` for:
- TLS 1.3 and transport constraints
- secure key storage expectations
- dependency audit commands for npm/gradle/cocoapods
- anti-spam/rate limiting hooks