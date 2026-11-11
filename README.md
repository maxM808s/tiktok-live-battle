# TikTok LIVE Battle

A customizable English/Hebrew battle display with a mobile-friendly control room. Built with HTML, CSS and vanilla JavaScript; hosted on GitHub Pages.

**Status:** manual scoring and gift simulation work. Automatic S2E gift detection is not connected.

[Open dashboard](https://maxm808s.github.io/tiktok-live-battle/admin.html) · [Open game](https://maxm808s.github.io/tiktok-live-battle/)

## Quick start

1. Open the dashboard and choose English or עברית.
2. Enter competitor names, upload portraits, and adjust colors and cropping. Optional translated names override the common name.
3. Search gifts by name or ID, select a competitor, set points, then click a gift. Remove a mapping before assigning that gift to the other competitor.
4. Set starting scores and click **Reset scores** to apply them.
5. Click **Start battle**, then use **Simulate gift** or add points manually. **Pause** stops gift scoring; **Declare winner** ends the battle.

Save matchups as presets. Settings and scores persist in your browser; export settings for backup. Presets are not included in that export.

## Broadcast with LIVE Studio

1. In the dashboard, click **Open display window** using the same Chrome profile.
2. Add that window as a **Window capture** source in LIVE Studio.
3. Crop browser controls and fit the game to a 9:16 scene, ideally 1080 × 1920.

Keep both windows open. LIVE Studio's separate **Link** source will not synchronize with Chrome. Phone controls also have separate local state; remote control requires an additional relay. Windows LIVE Studio capture remains unverified.

## Important limits and safety

- The public admin page controls only its visitor's browser, not a shared broadcast. Use one admin tab.
- Keep passwords, tokens and private backups out of the public repository. Backups include portraits and recent sender names.
- Import trusted files and prefer uploaded images; remote image hosts can see your IP address.
- The 15 bundled gift entries use authentic artwork. Confirm current IDs, availability and prices for your region.
- S2E requires a supported event output and a reviewed adapter before automatic scoring can work. No live connector is supplied.

## Documentation

- [Security fixes and boundaries](SECURITY.md)
- [S2E research, catalog sources, import limits and test details](docs/TECHNICAL.md)
- [Deployment instructions](DEPLOY.md)
- [Browser test results](tests/results.json) · [Security test results](tests/security-results.json)

No build step or runtime server is required. Serve over HTTPS; opening files directly with `file://` is unsupported.
