# Technical notes

**Connector update:** TikFinity Desktop is now selected; see [current setup](TIKFINITY.md). The S2E investigation below is historical. The operator later confirmed an S2E HTTP POST/JSON preset via screenshot, but switched providers before its variables/replay behavior were established. No S2E connector was built.

For setup and everyday controls, see [README](../README.md).

## S2E research and boundary

Reviewed 2026-11-11:

- https://streamtoearn.io/docs — integrations, presets and overlays.
- https://streamtoearn.io/ — Server/Browser/Socket refer to how S2E receives TikTok data, not a documented output socket for third-party webpages.
- https://streamtoearn.io/gifts — public region-based visual gift catalog and TikTok CDN artwork.
- https://s2e.pp.ua/threads/stream-to-earn-forge-mod-integration.94/ — documents ServerTap-style HTTP communication for the Forge mod. It does not specify a general custom-browser event API.

No documented public S2E raw gift-event WebSocket endpoint, subscription/auth protocol, gift-catalog JSON API, replay rules, or stable streak schema was verified. Therefore this project does **not** connect to S2E and includes no guessed socket address or misleading Connect button.

To configure S2E itself, install it from its official site, connect your TikTok channel using a supported connection mode, and confirm gifts appear in its event feed. Before integrating this battle, obtain S2E-supported documentation for custom event output including actual gift ID, session ID, unique event ID, cumulative count, sender, and streak ID. Ask S2E support whether a custom HTTP action/ServerTap-compatible command target is supported in your installed version. A local Windows PowerShell/.NET adapter is a possible no-Node implementation once that output contract is confirmed; no untested adapter is supplied here. Static GitHub Pages cannot receive webhooks or run a local bridge.

### Implemented normalized input

The diagnostics panel accepts a manual JSON event (not a live connection):

```json
{"giftId":"5655","sessionId":"live-session-1","eventId":"unique-message-1","sender":"viewer","count":3,"comboId":"stable-streak-1"}
```

`core.js` exports `ingest(state,event)`. Gift IDs match exactly. Without comboId, count is the quantity in one event. With comboId, count is the cumulative total; only increases score. Final repeats with the same count add zero. Stable sessionId/eventId prevent replay duplicates even after reload. A new streak must use a new comboId. Do not fabricate identifiers from usernames/timestamps in a production adapter. Scoring should have exactly one writer; concurrent admin tabs are not a transactional multiwriter system. Deduplication is retained locally with a limit of 20,000 event keys and 10,000 streak records. At capacity, new events are rejected instead of discarding replay protection. Export a backup and prepare a fresh configuration for a new session; do not clear replay history while an adapter could replay old events. Actual S2E events/reconnections remain unverified.

## Authentic gift library

15 verified metadata entries and locally bundled transparent TikTok WebP assets; some names have region-specific IDs. Source metadata: https://github.com/antiops/tiktok-trending-data/blob/main/live-gift-details.json . Image URLs are retained in catalog.json for provenance, and Rose artwork also matches S2E's public catalog. Retrieved 2026-11-11. These are observed catalog values, **not guaranteed current regional prices**. TikTok/ByteDance owns the artwork; this is an unofficial tool.

Expand the catalog via JSON import or upload authentic artwork and actual IDs. No invented gifts, prices, emoji image substitutions or AI assets. Custom remote HTTPS images depend on the remote server; upload images for reliability. Stock images are self-hosted and verified in Chromium. Competitor photos are supplied by the operator; no people are assumed or hardcoded.

## Verification

See tests/results.json and screenshots. Browser tests cover language/direction, names, uploaded portrait, gift searching/assignment, scoring, percentages, crown, cumulative streaks, duplicate events, pause, reset, persistence, presets, swap, mobile width, image loading and browser errors. Node/Playwright was used only as an external development test tool; the delivered runtime is static JavaScript.

Not verified: real S2E gift traffic, S2E reconnect schema, Windows LIVE Studio capture. No reference screenshot was attached in the received conversation, so the visual composition follows the written reference instead of a pixel comparison. Admin controls use English; the game display translates English/Hebrew. No claim of an official complete TikTok catalog or fully connected LIVE product is made.

## Safety and privacy

- **Public page, local controls:** anyone can open the admin URL, but each visitor controls their own browser state. There is no login or shared server administration. Anyone using your broadcast browser profile can change its battle. Use one admin tab to avoid conflicting score updates.
- **Keep secrets out of the site:** never put TikTok passwords, session cookies, GitHub tokens or other credentials in settings, image URLs, screenshots, repository files or backups. All files committed to this public repository are public.
- **Handle backups privately:** exports contain names, portraits, configuration, replay history and recent sender names. Store them privately and import only files from sources you trust. Validation reduces injection risks; it does not verify the accuracy or origin of imported content. Presets are not included in the settings export.
- **Prefer uploaded images:** uploaded raster images and bundled gifts stay in browser storage or this site's assets. Optional remote HTTPS images contact their host and reveal the requesting device's IP address, even with referrer sharing disabled. Imported SVG data images and executable URL schemes are rejected.
- **Respect import limits:** JSON import files must be under 4,000,000 bytes. The custom catalog supports up to 1,000 gifts; each competitor supports up to 100 mappings. Uploads must be no larger than 10 MB and decoded images no larger than 40 million pixels. Images are resized to at most 800 pixels on their longest side. Other text, storage and replay limits also apply. Keep backups: malformed or oversized saved settings can fall back to defaults, and clearing browser data deletes local state.
- **Browser isolation matters:** GitHub Pages projects under the same host share an origin. Other scripts hosted under `maxm808s.github.io` may access this browser storage; do not host untrusted code on that origin. The content policy blocks inline scripts and plugins, but GitHub Pages does not provide this project with configurable headers for full clickjacking protection.
- **Future connectors need a separate review:** there is no working S2E receiver or remote relay in this release; the separate TikFinity local client is documented in the current setup guide. Any future adapter must authenticate event/control access, validate actual gift IDs and replay identifiers, and protect credentials. Remote connections need encrypted transport. An unprotected local bridge must not be exposed to the internet.

See [SECURITY.md](../SECURITY.md) for the fixes, tested cases and remaining boundaries. Security tests are recorded in [tests/security-results.json](../tests/security-results.json); browser regression results are in [tests/results.json](../tests/results.json). These checks do not certify the app or a future connector as risk-free.
