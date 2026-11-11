# Security review

Reviewed 2026-11-11. The hosted application has no server-side accounts, payment processing or public gift-event receiver. Optional private-overlay mode adds a local-only relay with separate ephemeral viewer/writer keys.

## Fixed

- Imported backup events previously allowed HTML through numeric fields in the recent-events renderer. Events now have strict numeric validation and all displayed fields are escaped.
- State imports, browser storage, and presets now use shared validation. CSS colors, crop/zoom values, booleans, identifiers, text lengths, mappings and scores are constrained. Malformed stored data falls back to defaults; it is not rendered as trusted markup.
- Event input stores an allowlist of fields, uses bounded string identifiers and collision-resistant composite replay keys, and limits history growth. At capacity scoring rejects events instead of silently discarding duplicate protection. Legacy replay keys remain recognized.
- Gift imports validate the complete batch before applying it and normalize fields. Imports are limited to 4 MB, 1000 custom gifts, and bounded image/text sizes. Uploaded images are rasterized and resized; oversized decoded dimensions are rejected. Raster data images, bundled gift paths and credential-free HTTPS image URLs are accepted; executable schemes and SVG data imports are rejected.
- Presets and streak dictionaries use prototype-free objects. Presets are validated before rendering/loading.
- Both pages declare a Content Security Policy blocking inline scripts, third-party scripts, plugins, form submissions, and base URL changes. Same-origin scripts/fetches/preview frames and local/data/HTTPS images are allowed. Inline CSS is needed for user colors, image positioning and score bars.
- Pages send no referrer when loading remote images. External Google Fonts requests were removed; local system fonts support Hebrew and English.

## Boundaries

Anyone can open the public hosted admin page, but its controls modify only that visitor's browser storage. Optional private-overlay mode runs a separate authenticated local relay on the broadcast PC. This is not authentication: anyone with access to the same browser profile can change its battle. GitHub Pages project paths on the same host share an origin/storage boundary; avoid hosting untrusted scripts under that origin. A future remote relay needs real authorization, encrypted transport and authenticated event ingestion.

Remote HTTPS images are optional and still reveal the viewer's IP to their host. Upload images instead for local assets. Do not place secrets or private information in public repository files, image URLs or exported backups. Backups contain portraits, configuration and recent sender names and should be handled accordingly.

GitHub Pages does not let this project set arbitrary HTTP response headers. A meta CSP cannot enforce frame-ancestors, so clickjacking protection is not claimed. Browser extensions, compromised GitHub accounts and malicious code on the same origin are outside these fixes. Malformed/oversized legacy settings may fall back to defaults; keep exported backups before changing configurations.

TikFinity is now the selected connector. S2E ingestion remains unimplemented. TikFinity messages are untrusted input: only gift envelopes with bounded identifiers, supported gift types and valid quantities reach the existing scoring engine. Actual LIVE traffic remains unverified.

## Tests

`tests/security.mjs` verifies malicious events, style/image injection, malformed storage, prototype-related keys, invalid scores and resource limits. `tests/browser.cjs` checks normal game flows and includes actual malicious backup import, literal HTML name rendering and CSP inline-script blocking. These are development tests and do not add a runtime server dependency.

Appearance controls use validated size ranges, hexadecimal colors, approved system-font choices and boolean visibility flags. Older settings receive default appearance values without changing scores.

## TikFinity local connection

The admin page can connect only to the documented `ws://localhost:21213/` endpoint, in addition to same-origin fetches. It sends no commands or credentials; it reads events only after an explicit Connect action. Browser local-network/mixed-content policies still apply. Do not disable them or expose the local endpoint to the internet. This app does not authenticate TikFinity's local service; another local program impersonating that service could supply false events. Only use a trusted PC.

A Web Locks lease permits one connected dashboard per origin. It prevents ordinary duplicate scoring tabs; it is not access control against other scripts or users of the same profile. Session labels stay stable across reconnects for replay protection. The connector rejects gifts without a stable message ID, finishes streaks before scoring and uses supplied streak IDs when available. Incoming sender names are stored locally in recent events/backups. Socket connectivity does not establish the health of the upstream TikTok connection.

## Follow-up connector review

- Disconnect clears handshake and reconnect timers and invalidates late callbacks. Unexpected processing errors stop the connection.
- Valid gift events received while paused are added to replay protection without awarding points, so a later replay cannot bypass the pause.
- Failed score/history persistence stops LIVE ingestion and leaves a visible error rather than continuing with unsaved replay keys. Unsaved events require operator review; recovery is not promised.
- Numeric gift/message/streak identifiers must be safe integers; long sender IDs are rejected. Empty/zero group IDs are not used to merge unrelated streaks.
- A pattern scan of current public files and reachable main-branch history found no credential-pattern matches or secret-file paths. See [scan scope and results](tests/leak-review.json). This is a scoped check, not proof that every kind of private data or secret is absent.

Private backup filenames, environment files and common private-key formats are listed in `.gitignore` to reduce accidental commits. This does not redact Git history or prevent force-adding files or uploading them through GitHub's web interface.

Recent events are limited to 40 entries, but retained streak keys can also contain older sender identifiers used for replay protection. Hiding the sender on the display does not erase that local history or remove it from an exported backup. Keep exports private.

## Private local overlay relay

See [setup and access model](docs/OVERLAY.md). The relay binds IPv4 loopback only, uses independent 256-bit viewer/writer keys, rejects cross-origin requests and alternate Host headers, serves only allowlisted application files, bounds request sizes/timeouts, and disables caching/referrer sharing. Viewer credentials authorize reads only. Keys stay outside settings/backups, and restarting revokes existing URLs. The local admin also gets frame-embedding protection from HTTP headers.

The publisher removes replay history, stream labels, unused custom gifts and hidden event data from snapshots. The display validates every snapshot before rendering. Raw relay writes require the writer key; local code/OS administrators with that key remain trusted. API data is not end-to-end encrypted against privileged software on the same PC. No public relay or remote-phone mode is supplied. Actual Windows/LIVE Studio behavior remains to be verified.
