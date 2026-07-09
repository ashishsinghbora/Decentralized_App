# Security Baseline

## Mobile hardening targets (OWASP MASVS-aligned)
- Enforce secure local storage boundaries for cryptographic material (platform keystore / secure enclave adapters).
- Avoid plaintext secrets in app logs, storage, and analytics events.
- Require explicit trust states for devices before key verification-sensitive actions.

## Transport and network controls
- Require TLS 1.3 for all backend and gateway traffic.
- Deny insecure transport fallback and mixed-content media fetches.
- Bind Matrix/IPFS/UPI clients to certificate-pinned endpoints in production builds.

## Abuse controls
- Apply per-device and per-room rate limits before message relay.
- Run anti-spam policy checks in message submission pathways.
- Persist abuse telemetry with redacted identifiers only.

## Dependency audits
- npm: `npm audit --workspaces`
- Android: `./gradlew dependencyCheckAnalyze`
- iOS: `pod outdated && pod install --repo-update`

## Backups
- Backups are optional and user-controlled.
- Backup payloads must be encrypted before upload and recoverable only via user passphrase.
