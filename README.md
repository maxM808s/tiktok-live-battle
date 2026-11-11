# TikTok LIVE Battle

Static HTML/CSS/vanilla JavaScript battle display and mobile control room. No build, npm, Node.js server, database, or paid hosting required. **Real S2E event detection is not connected.** This release is usable for manual battles and simulation; it must not be described as an end-to-end S2E LIVE product.

## Open

- Display: `index.html`
- Control room: `admin.html`
- Use HTTP(S), such as GitHub Pages. ES modules/catalog fetch do not run reliably from `file://`.

## GitHub Pages

Repository Settings → Pages → Build and deployment → Deploy from a branch → `main` → `/ (root)` → Save. Published game: https://maxm808s.github.io/tiktok-live-battle/ . Admin: https://maxm808s.github.io/tiktok-live-battle/admin.html . `.nojekyll` disables Jekyll. No GitHub Actions build required.

## Configure your battle

1. Open admin.html. Select English or עברית. Default game text translates immediately; custom title/instructions and competitor names retain your supplied text. Optional English/Hebrew names override the common competitor name.
2. Enter names, upload portraits, select gradient colors, and adjust horizontal/vertical crop and zoom. Set starting scores, then Reset to apply them.
3. Save a named matchup preset. Presets include competitors, photos, mappings, and starting scores. Load or swap sides at any time. Swapping keeps each competitor's scores and mappings together.
4. Search the gift catalog by name or numeric ID. Select a side and points per gift, then click the authentic image. A gift can belong to only one competitor to avoid ambiguous routing. Remove its mapping before moving it.
5. Start the battle. Simulate gifts or manually add points. Pause rejects incoming gifts. Declare winner freezes scoring and changes the leading label. A tie has no crown. Reset applies configured starting scores and keeps replay protection intact.
6. Export settings for backup. Browser storage is local to this device/profile/origin. Clearing browser data deletes local settings. Large photo collections may exceed browser quota; images are resized to 800 pixels and storage errors are reported. Presets remain in the original browser and are not included in the settings export.

## TikTok LIVE Studio

1. In Chrome on the broadcast PC, open the hosted control room.
2. Click **Open display window**. Use the same Chrome profile and origin as the admin page. Keep both windows open. Preview and display receive same-origin storage events immediately.
3. In LIVE Studio add a **Window capture** source and select that Chrome display window. Crop browser chrome and fit the game to a vertical scene. Set the captured area to 9:16, ideally 1080 × 1920. The game scales while preserving that ratio. A 1080 × 1920 browser viewport renders the intended canvas size.
4. Do not minimize the captured window; check capture behavior in a private test stream. This environment cannot run Windows LIVE Studio, so actual capture compatibility is unverified.

**A LIVE Studio Link source uses a separate browser/storage container. It will not synchronize with Chrome admin.** Capture the shared Chrome window instead. The admin layout works on phones, but a phone controls its own local state; remote control across devices needs an additional authenticated relay service. No relay is bundled or represented as working.

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
- **Future connectors need a separate review:** there is no working S2E receiver or remote relay in this release. Any future adapter must authenticate event/control access, validate actual gift IDs and replay identifiers, and protect credentials. Remote connections need encrypted transport. An unprotected local bridge must not be exposed to the internet.

See [SECURITY.md](SECURITY.md) for the fixes, tested cases and remaining boundaries. Security tests are recorded in [tests/security-results.json](tests/security-results.json); browser regression results are in [tests/results.json](tests/results.json). These checks do not certify the app or a future connector as risk-free.
