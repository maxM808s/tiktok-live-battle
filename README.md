# TikTok LIVE Battle

A customizable English/Hebrew battle display with a mobile-friendly control room. Built with HTML, CSS and vanilla JavaScript; hosted on GitHub Pages.

**Status:** manual scoring, gift simulation and a TikFinity Desktop connector are implemented. The connector is mock-tested; real LIVE gifts still need verification on your PC.

[Open dashboard](https://maxm808s.github.io/tiktok-live-battle/admin.html) · [Open game](https://maxm808s.github.io/tiktok-live-battle/)

## Quick start

1. Open the dashboard and choose English or עברית.
2. Use **Text & style** to change text sizes, fonts, colors, logo/portrait sizes and visibility. Changes save automatically; **Reset appearance** preserves scores.
3. Enter competitor names, upload portraits, and adjust colors and cropping. Optional translated names override the common name.
4. Search gifts by name or ID, select a competitor, set points, then click a gift. Remove a mapping before assigning that gift to the other competitor.
5. Set starting scores and click **Reset scores** to apply them.
6. Click **Start battle**, then use **Simulate gift** or add points manually. **Pause** ignores incoming gifts, including later replays; **Declare winner** ends the battle.

Save matchups as presets. Settings and scores persist in your browser; export settings for backup. Presets are not included in that export.

## Connect TikFinity

Run TikFinity Desktop on the broadcast PC. In the dashboard, open **LIVE**, set a stream session label, click **Connect TikFinity**, then **Start battle**. Streak gifts score when they finish. See the [setup and troubleshooting guide](docs/TIKFINITY.md).

## LIVE Studio: paste a private overlay link

1. [Download and extract the Windows package](https://github.com/maxM808s/tiktok-live-battle/archive/refs/heads/main.zip).
2. Double-click **Start-Overlay.cmd** and use the local dashboard it opens. Import an existing settings backup if needed.
3. Click **Copy private overlay link**, then paste it into a LIVE Studio **Link** source at 1080 × 1920.

Keep the launcher and local dashboard open. The relay synchronizes across apps without sharing a window. Its private read-only link works only on your PC and expires when the relay restarts. No Node.js or paid service is needed. [Setup and privacy details](docs/OVERLAY.md).

Windows/LIVE Studio verification is still pending. Window capture remains available as a fallback. Phone control is not connected to this local relay.

## Important limits and safety

- The hosted admin uses browser-local state. Private Link mode uses the local relay; use one local dashboard.
- If scores cannot be saved, the LIVE connection stops; resolve the storage error before reconnecting.
- Keep passwords, tokens and private backups out of the public repository. Backups include portraits and viewer identifiers.
- Import trusted files and prefer uploaded images; remote image hosts can see your IP address.
- The 15 bundled gift entries use authentic artwork. Confirm current IDs, availability and prices for your region.
- TikFinity Desktop must run on the same PC. Browser local-network permissions may be required. S2E is no longer the selected connector.

## Documentation

- [Private overlay setup](docs/OVERLAY.md)
- [Security fixes and boundaries](SECURITY.md)
- [Earlier S2E research, catalog sources and operating limits](docs/TECHNICAL.md)
- [Deployment instructions](DEPLOY.md)
- [Browser test results](tests/results.json) · [Security test results](tests/security-results.json)

No build step is required. Hosted mode uses HTTPS; private Link mode uses the local PowerShell relay. Opening files directly with `file://` is unsupported.
