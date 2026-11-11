# TikTok LIVE Battle — User Guide

Set up your competitors, choose gifts, customize the display, and show the game in TikTok LIVE Studio using a private Link source.

[Open hosted dashboard](https://maxm808s.github.io/tiktok-live-battle/admin.html) · [Download Windows package](https://github.com/maxM808s/tiktok-live-battle/archive/refs/heads/main.zip)

**Test status:** browser, simulated-gift and private-overlay synchronization tests passed. Real TikFinity gift traffic, Windows PowerShell execution and actual LIVE Studio Link-source behavior still need verification on the broadcast PC. This guide describes the implemented controls; it does not claim those remaining tests have passed.

## Contents

- [What you need](#what-you-need)
- [First-time Windows setup](#first-time-windows-setup)
- [Dashboard guide](#dashboard-guide)
- [Connect TikFinity](#connect-tikfinity)
- [Add the game to LIVE Studio](#add-the-game-to-live-studio)
- [Test before a real battle](#test-before-a-real-battle)
- [Everyday streaming routine](#everyday-streaming-routine)
- [Troubleshooting](#troubleshooting)
- [Updates and safety](#updates-and-safety)

## What you need

- A Windows broadcast PC with TikTok LIVE Studio and permission to go LIVE on your TikTok account.
- TikFinity **Desktop** installed on that same PC. Its browser-only version is not enough for this game's connection.
- A current Chrome or Edge browser is recommended for the dashboard.
- The extracted game package, including its launcher and assets.

No Node.js, npm, Python installation, VPS or paid hosting is needed for this setup. TikFinity has its own plan limits and terms; check those in your account.

## First-time Windows setup

1. Download the [Windows package](https://github.com/maxM808s/tiktok-live-battle/archive/refs/heads/main.zip).
2. Right-click the downloaded ZIP and choose **Extract All**. Open the extracted `tiktok-live-battle-main` folder. Do not run the launcher from inside the ZIP.
3. Double-click **Start-Overlay.cmd**. Keep the console window open during use.
4. The launcher opens your **local dashboard**. Use this dashboard when you want a LIVE Studio Link source. The hosted GitHub dashboard is useful for editing/testing, but its ordinary display URL does not synchronize with LIVE Studio by itself.
5. If you configured the hosted dashboard already, export its settings from **Backup & synchronization**, then restore that file in the local dashboard. Disconnect TikFinity before restoring. Saved matchup presets are not included in the export; load the matchup you want before exporting it.
6. Watch the overlay status at the top. When ready, **Copy private overlay link** becomes available.
7. Configure the sections below, connect TikFinity, and add the copied link to LIVE Studio.

Settings stay in the browser profile and address you use. Changing browsers, clearing browser data or changing the local address can give you a separate configuration. Keep a private backup.

## Dashboard guide

Use the navigation buttons at the top to jump to **Overlay link**, **General**, **Text & style**, **Competitors**, **Gifts**, **LIVE**, **Battle**, or **Preview**. Most edits save automatically; check the **Saved in this browser** indicator and any error message.

### Private LIVE Studio overlay

This section connects the game display to LIVE Studio without capturing a window.

| Control | How to use it |
|---|---|
| Download Windows package | Download the current package and extract it before launching. |
| Copy private overlay link | In the local dashboard, copy the generated viewing link and paste it into a LIVE Studio Link source. If automatic copying is unavailable, select/copy the link shown by the dashboard. |
| Retry overlay sync | After fixing a relay/launcher problem, send the current settings and scores again. |
| Overlay status | Confirm that the overlay is ready or synchronized. A sync error means the display may be showing an older picture. |

Keep the launcher and local dashboard open. The viewing link works only on your PC, permits viewing rather than editing, and expires when the launcher restarts. After a restart, close the old dashboard, use the new one, and replace the Link source URL.

### General

| Setting | What it changes |
|---|---|
| Display language | Switch the game between English and עברית. Hebrew uses right-to-left text layout. Scores and settings remain. Dashboard controls themselves remain in English. |
| Custom title | Enter your own heading. Leave blank to use the translated default title. |
| Branding | Set the branding text at the top of the game. |
| Voting instructions | Set your own bottom instruction text. Leave blank to use the translated default. |
| Brand logo | Upload a logo; use **Remove logo** to remove it. |
| Enable animations | Turn game animations on or off. |

Custom title, branding and instruction text remain as you entered them; language selection does not translate your own writing. Competitor names have separate optional translations in the Competitors section.

### Text and appearance

Watch the live preview while changing these settings.

**Color presets:** choose Original, Electric, Midnight, Black & Yellow, Orange & Black, Crimson, Emerald, Ice Blue, Rose Gold, or Black & White. The newer coordinated palettes also style the panels, progress bar and VS badge.

**Typography & sizes:**

- Choose a font style and headline weight.
- Use a slider or its exact-value box for branding text, game title, competitor names, scores, instructions, gift values and points labels.
- Adjust logo height and portrait diameter in the same section.
- Sizes describe the 1080 × 1920 game canvas and scale with the preview. Long text may automatically shrink to fit.
- Use a control's **↺** button to reset that individual size.

**Text colors & background:** choose branding, title, name, score and instruction colors, plus the background, glow and left/right panel colors.

**Use appearance colors for competitor panels** controls which panel colors you see. Turn it on for the appearance section's panel colors. Turn it off to show each competitor's own saved gradient from the Competitors section. Appearance presets preserve those saved competitor gradients.

**Show / hide elements:** choose whether branding/logo, title, instructions, decorative subtitles and recent gift sender appear on the game. Hiding the sender does not erase stored gift history or remove it from your settings backup.

**Reset appearance** restores the design settings. It does not reset scores or erase competitor names, portraits or gift mappings.

### Competitors

Configure the left and right competitor independently.

1. Enter the main **Name** for each competitor.
2. Optionally fill **English name** and **Hebrew name**. The selected language's name takes priority; otherwise the main name is used. A default team label appears if all relevant names are blank.
3. Upload a **Portrait**. It appears in the circular frame; remove it with its Remove button if needed.
4. Adjust **Horizontal crop**, **Vertical crop**, and **Portrait zoom** while looking at the preview. Adjust overall portrait diameter under Text & style.
5. Choose **Gradient start** and **Gradient end**. If they seem to have no effect, turn off **Use appearance colors for competitor panels**.
6. Set each **Starting score**. This value is applied when you use **Reset scores**; entering it does not immediately replace the current score.

**Swap sides** moves the competitors with their names, portraits, scores and assigned gifts.

#### Save and load matchups

- Enter a preset name and click **Save preset**. Reusing the same name replaces that saved matchup.
- Choose a saved matchup and click **Load matchup**. Loading restores its competitors and gift mappings, applies their starting scores, and pauses the battle. Click Start battle when ready.
- **Delete preset** removes the selected saved entry; it does not delete the current on-screen battle.

Matchup presets are separate from a full settings backup. They do not represent a backup of all appearance/general settings, and the settings export does not include the preset list.

### TikTok gifts

#### Assign a gift

1. Search by gift name or numeric ID.
2. Select the left or right competitor under **Assign selected gift to**.
3. Enter **Points per gift**.
4. Click the gift tile. Its authentic image and configured point value appear beneath that competitor.
5. Repeat to assign multiple gifts.

One gift ID can be assigned to only one competitor. To move it, remove its existing mapping first. Similar gift names can have different regional IDs; match the actual ID rather than relying only on the name.

In the assigned-gifts list, edit the points box to change its value. Click **×** to remove that mapping. Changing mappings does not retroactively recalculate existing scores.

**Coins and points are different:** the catalog's coin value is a reference, while Points per gift is your game rule. If you set a gift to 10 points and simulate a quantity of 3, that competitor receives 30 points. Current regional availability and coin prices must be checked in TikTok/TikFinity.

#### Expand the library

Open **Expand library / import catalog**:

- **Import catalog JSON:** select a compatible catalog file from a trusted source. Invalid files are rejected. Do not put credentials or private information in catalog files or image URLs.
- **Add uploaded gift:** enter its actual TikTok gift ID and name, optionally its observed coin value, then upload authentic artwork and click **Add uploaded gift**. After adding it, find it in the gallery and assign it normally.

The bundled library has 15 gift entries. The game does not automatically download every gift from TikFinity. Never guess an ID or price. Uploaded images are preferable to remote image URLs for reliability and privacy.

### TikFinity LIVE connection

This section links the game to TikFinity Desktop. Complete the [TikFinity setup](#connect-tikfinity) below first.

| Control | How to use it |
|---|---|
| Stream session label | Use one label for the current broadcast. Keep it unchanged for reconnects/reloads of that broadcast. Set a new label only for a genuinely new broadcast, while disconnected. |
| Connect TikFinity | Open the connection to TikFinity Desktop on this PC. |
| Reconnect | Retry an interrupted connection. Keep your current session label. |
| Disconnect | Stop receiving gift events. Refreshing the dashboard does not automatically reconnect. |
| Connection status | Read whether the desktop connection is reachable, retrying, or blocked. Connected alone does not prove TikTok is LIVE. |
| Recent gift events | Check the sender, gift ID, received quantity, awarded points and competitor. Simulated events are marked TEST. Unmapped gifts award no points. |

Completed gift streaks are counted when they finish. Replayed duplicate events are not awarded again. Completed gift events received while the game is paused are ignored and will not score if replayed after resuming. Pause applies when the completed event arrives: a streak that finishes after you resume can include gifts sent earlier in that streak. Let streaks finish before changing battle state if you need a clean boundary.

Keep one scoring dashboard open. If another dashboard owns the connection, disconnect or close it first. The **Adapter input / diagnostics** area is an advanced manual test tool; normal setup does not require it. Use Simulate gift for routine testing instead.

### Battle controls

| Control | Effect |
|---|---|
| Start battle | Start or resume gift scoring. It does not reset existing scores. |
| Pause | Stop scoring completed gift events. Resume with Start battle. Completed events received during the pause are not saved up for later points; see the streak timing note above. |
| Declare winner | Stop gift scoring and show the winning label/crown for the leading competitor. A tie has no leading crown. |
| Reset scores | Apply the configured starting scores. It does not clear gift mappings or duplicate protection. Pause first if you do not want gifts arriving during the reset. |
| Add points | Select a competitor, enter a positive amount, and apply a manual correction. Manual additions also work while paused. |
| Simulate gift | Select a gift and positive quantity, then send a local test event. Start the battle first and choose a mapped gift if you want points awarded. |

The percentage bar follows the score ratio. At zero versus zero it starts at 50% / 50%. The crown changes when another competitor takes the lead.

### Backup and synchronization

- Click **Export settings** to download your current settings, scores, portraits, mappings and local event/replay history.
- To restore, disconnect TikFinity, select the backup under **Restore settings**, and verify the restored scores before reconnecting. Restoring replaces the current battle configuration; export it first if you want to keep it.
- Backups contain viewer identifiers and personal images. Store them privately and never upload them to the public repository.
- The preview and ordinary display window share your browser's state. The private Link source uses the local launcher to reach LIVE Studio's separate browser.
- A phone or another browser/profile does not automatically control your current battle. Remote phone control is not implemented.

There are safety limits on imports, images, gift mappings and replay history. If an error says a limit or storage capacity was reached, export a backup, stop the connection and resolve it before continuing. Reset scores does not clear replay history; do not delete that history to force events to count.

### Preview and display window

The preview shows the current 9:16 game. Edit names, photos, language and appearance while watching it.

**Full-screen preview** enlarges that preview; press Esc to leave full screen. **Open display window** opens the ordinary display page in your browser. It is useful for checking the design or for window capture, but it is not the private URL to paste into LIVE Studio.

## Connect TikFinity

1. Install/open [TikFinity Desktop from its official site](https://tikfinity.zerody.one/landing/) on the broadcast PC. Use the desktop application for this game, not only TikFinity's web page or mobile app.
2. Sign in to your TikFinity account. In its setup, enter your TikTok **@handle**, not your display name, and save it.
3. Use TikFinity's **Connect to TikTok LIVE** control. Its upstream LIVE connection needs your TikTok broadcast to be running; you can prepare the game and simulate gifts before going LIVE.
4. Keep TikFinity Desktop open. Do not enter TikTok passwords, session cookies or stream keys into the game dashboard.
5. In the game's local dashboard, open **LIVE**, set your stream session label, and click **Connect TikFinity**.
6. If your browser asks for local-network access, allow it only for this trusted game. If connection fails, read the status message; do not disable browser security.
7. Click **Start battle** when you want gifts to count. During a controlled LIVE test, confirm a small mapped gift reaches Recent gift events and adds the expected points.

You assign gifts in this game's Gifts section. You do not need to create a separate TikFinity Action for every mapped gift.

TikFinity's own screens may change. Its [official setup guide](https://blog.tikfinity.com/tikfinity-setup/) explains account/handle setup and the desktop requirement. Free-plan limits and pricing belong to TikFinity; verify them in your account.

## Add the game to LIVE Studio

1. Start **Start-Overlay.cmd** and use the local dashboard it opens.
2. Confirm the overlay status is ready/synchronized, then click **Copy private overlay link**. Copy it again if the launcher has restarted.
3. Open TikTok LIVE Studio and choose the scene where you want the game.
4. In **Sources**, click **+ / Add source**, choose **Link**, and paste the copied private URL. Give the source a recognizable name, such as Battle Game. Exact labels can vary by LIVE Studio version.
5. If source width/height settings appear, enter **1080 × 1920** once. If the interface only provides resize handles, fit it to the vertical scene. Do not change the private URL to try to set dimensions.
6. Arrange the game and any camera/other sources in your scene. Check the entire title, portraits, gifts, scores and bottom instructions are visible.
7. Change a competitor name or simulate a mapped gift in the dashboard. Confirm the change appears in LIVE Studio. This is the essential cross-application test.
8. Keep the local dashboard, launcher and TikFinity Desktop open during the stream.

Use **Copy private overlay link**, not the hosted dashboard URL, ordinary display URL, or your local editing dashboard URL. Never share dashboard access or private links.

The link is tied to this PC and launcher session, not your public internet IP. Restarting the launcher expires it; changing your public IP does not. A link opened on another PC does not access your machine.

TikFinity's [LIVE Studio Link-source walkthrough](https://blog.tikfinity.com/tiktok-streamer-desktop/) documents the general Add source → Link workflow. This game's local Link-source compatibility still needs our Windows/LIVE Studio test. If LIVE Studio rejects the local URL, record the exact error rather than changing browser security settings.

## Test before a real battle

1. Set both starting scores to zero, click **Pause**, then **Reset scores**.
2. Map at least one gift to each competitor with easily checked point values.
3. Click **Start battle**. Simulate a gift with quantity 1, then a different quantity. Confirm the score, gift image, percentage bar and crown respond correctly.
4. Test the other competitor, then switch English/Hebrew and check names and spacing.
5. Change a color or text size and confirm the private Link source updates too.
6. Pause, send a simulated gift, and confirm the score stays unchanged.
7. Reset the test scores before the actual battle. Start/resume when ready.
8. Once TikTok is actually LIVE and TikFinity is connected, test a small real mapped gift. Wait for a streak to finish. A simulation tests the game; it does not prove the real connection works.

## Everyday streaming routine

1. Open TikFinity Desktop and LIVE Studio on the broadcast PC.
2. Run the game launcher and use its local dashboard. If it is a fresh launcher session, replace LIVE Studio's old overlay link with the newly copied one.
3. Load your matchup, inspect names/photos/gift mappings, and set/reset starting scores if needed.
4. Check the LIVE Studio preview using a simulated gift; clear those test scores afterward.
5. Begin your broadcast when ready, connect TikFinity to the active LIVE, and connect the game dashboard.
6. Click **Start battle**, monitor Recent gift events, and use Pause for interruptions.
7. At the end, declare the winner or pause, disconnect TikFinity in the game, and export settings if you want a backup. Stop the launcher after you are finished displaying the game.

## Troubleshooting

| Problem | What to check |
|---|---|
| Copy private overlay link is disabled | Run the extracted Windows launcher and use the local dashboard it opens. The public hosted dashboard cannot generate your local private link by itself. |
| Launcher closes or Windows blocks it | Extract the ZIP, read the console error and review the downloaded files/device policy. Do not change system-wide policy or use administrator access just to bypass a restriction. |
| Another launcher is already running | Stop the earlier instance before opening another. |
| Overlay says it is waiting | Keep the local dashboard open, inspect its sync status and use Retry overlay sync after fixing the launcher connection. |
| Overlay key expired | Restart opened a new session. Copy its new private link and replace the LIVE Studio source URL. |
| LIVE Studio shows an old picture | Keep the dashboard open and check overlay sync. Test the private URL in another browser on the same PC. A stopped publisher can leave the last picture visible. |
| TikFinity connected but no points | Verify TikTok is actually LIVE, the battle is started, the gift ID is mapped, and the streak has finished. Check Recent gift events and diagnostics. |
| Another dashboard owns the connection | Disconnect/close that dashboard before connecting here. Use one scoring dashboard. |
| Wrong competitor gets points | Pause and inspect the selected competitor and actual gift ID mapping. Remove a gift from its old side before moving it. |
| Competitor gradient does not change | Turn off Use appearance colors for competitor panels in Text & style. |
| Name stays in the wrong language | Check the optional English/Hebrew name overrides. Your own custom text is not automatically translated. |
| Settings seem missing | Check browser/profile and whether you are on the hosted or local dashboard. Restore a private backup if appropriate. |
| Scores cannot be saved | The LIVE connection stops. Export existing settings, address browser storage/validation errors, inspect scores, then reconnect. Unsaved gifts are not automatically recovered. |
| Private URL is rejected by LIVE Studio | Test it in another browser on this PC and share the exact Link-source error. Actual Windows compatibility remains unverified. |

## Updates and safety

To update the local package, export settings, disconnect TikFinity and stop the old launcher. Download/extract the latest package, run its launcher, and use the same browser profile. Check settings and restore your backup if needed, then copy the new private overlay link into LIVE Studio. Keep the previous package/backup privately until the new one is checked.

Do not forward local ports or expose the local service to the internet. Import trusted files and prefer uploaded images: remote image hosts can see your device's IP address. Private overlays are not protection against a compromised PC or another person using your browser profile.

Keep passwords, tokens, private links and backups out of this public repository. The repository, its history and browser-delivered source remain inspectable; a private overlay does not make the software itself private.

[Safety notes](SECURITY.md) · [Private overlay help](docs/OVERLAY.md) · [TikFinity help](docs/TIKFINITY.md)
