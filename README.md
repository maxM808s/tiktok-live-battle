# Battle Studio

A customizable TikTok LIVE battle game with a clean dashboard, glass-style display, English/Hebrew support and 154 gift entries.

**[Download Windows package](https://github.com/maxM808s/tiktok-live-battle/archive/refs/heads/main.zip)** · [Open hosted dashboard](https://maxm808s.github.io/tiktok-live-battle/admin.html)

**First time? Start with Tutorial 2.** Use Tutorial 1 for dashboard controls.

1. [Use the dashboard](#tutorial-1-use-the-dashboard)
2. [First setup and going LIVE](#tutorial-2-first-setup-and-going-live)


Browser and simulated-event tests passed. Verify real gifts and Windows/LIVE Studio behavior on your broadcast PC.

## Tutorial 1: Use the dashboard

Use **☾ Night mode** at the top for a black-and-white dashboard. The choice stays in this browser and does not change the broadcast. For a monochrome game, choose **Text & style → Black & White**.

For a private LIVE Studio link, use the **local dashboard opened by Start-Overlay.cmd**. Use one dashboard at a time. Edits save automatically; watch the save indicator. The summary strip shows battle, TikFinity socket and overlay status. Use its shortcut to reach battle controls, or **Backups** in the navigation to export settings. A connected socket still does not prove TikTok is LIVE.

Use **✦ Styles** in the navigation to pick a complete display look: LIVE Battle (reference-inspired), Studio Glass, Neon Arcade, Golden Arena, Stadium, Mono Minimal, Bold Poster, Blueprint or Editorial. Styles set colors, fonts, sizes and VS appearance; competitors, photos, scores, gifts and visibility settings stay unchanged. Fine-tune afterward under Text & style.

The preview also has **Reload preview** for a stuck preview and **Adjust movement** for a quick jump to animation controls. Reloading the preview does not reset the battle.

Expand the section you need:

<details open>
<summary>1. General — language and branding</summary>

| Setting | What to do |
|---|---|
| Display language | Choose English or עברית. Game text/direction changes; scores stay. Dashboard controls remain English. |
| Custom title | Enter your heading, or leave blank for the translated default. |
| Branding and logo | Enter top branding text, upload a logo, or use Remove logo. |
| Voting instructions | Enter bottom text, or leave blank for the translated default. |
| Enable animations | Turn display effects on/off. |

Your custom writing is not automatically translated. Optional competitor translations are in Competitors.

</details>

<details>
<summary>2. Text and style — fonts, sizes and colors</summary>

- Choose **Studio** for the restrained graphite/glass palette. Other presets include Original, Electric, Midnight, Black & Yellow, Orange & Black, Blue & Yellow, Crimson, Emerald, Ice Blue, Rose Gold and Black & White.
- Presets coordinate portrait rings, panels, text and display accents while keeping scores and saved competitor gradients.
- **Animation movement:** use the visible **Off / Little / Medium / High** buttons at the top of Text & appearance. They adjust travel distance and pace for portraits, gifts, VS, crowns and background. Off stops animation without pausing scores or timers. Individual effect switches remain unchanged, and browser reduced-motion settings take priority. The choice saves automatically and syncs to your game.
- **Typography & sizes:** choose font/weight; use sliders or exact values for text, scores, gift values, labels, logo and portraits. **↺** resets one size. Long text can shrink to fit the vertical display.
- **Text colors & background:** adjust individual colors, glow and panel colors. Turn **Use appearance colors for competitor panels** off to show each competitor's own saved gradient.
- **VS badge & gift reactions:** choose Glass, Solid circle, Diamond or Minimal; edit its label, colors and text/badge sizes. Enable gift spotlights for a brief gift/quantity/points banner. Use **Gentle VS movement** for a subtle floating badge. The main animation switch and reduced-motion preference control motion.
- **Last gift received:** shows the most recent real gift and time since receipt. Simulated gifts update scores but show no gift banner or sender message, and do not replace this indicator. Real gift messages show the sender when Recent gift sender is enabled.
- **Structural styles:** Bold Poster uses square offset frames and ticket labels; Blueprint adds a technical grid, dashed rings and score strips; Editorial uses open columns, fine dividers and underlined scores. Portraits stay circular.
- **Fonts:** 15 installed-font stacks with fallbacks; appearance can vary by PC. Use the bilingual font sample and game preview to check English, Hebrew and numbers before LIVE. Fonts are not downloaded from third-party services.
- **Show / hide elements:** control branding, title, instructions, subtitles, sender, gifts and Points labels.
- **Reset appearance** resets the design without erasing scores, names, photos or gift mappings.

Hiding sender information does not erase its stored history or remove it from backups. Visibility options do not guarantee reach or bypass moderation.

</details>

<details>
<summary>3. Competitors — names, portraits and matchups</summary>

1. Enter each competitor's **Name**. Optional English/Hebrew names override it for the selected language.
2. Upload a portrait. Adjust **Horizontal crop**, **Vertical crop** and **Portrait zoom** while watching the preview. Overall portrait size is under Text & style.
3. Choose **Gradient start/end**. If nothing appears to change, turn off appearance panel colors.
4. Set **Starting score**, then use Reset scores to apply it.
5. **Swap sides** moves competitors with their scores, photos and gifts.

Enter a preset name and click **Save preset**. Reusing a name overwrites it. Choose a saved entry and **Load matchup** to restore its competitors/mappings, apply starting scores and pause the battle. **Delete preset** removes the saved entry only.

Presets do not contain all general/appearance settings and are not included in settings exports.

</details>

<details>
<summary>4. Gifts — assign multiple gifts per character</summary>

1. Click **＋ Add gift** beneath the desired competitor.
2. Search by gift name, ID or coin value (`500` / `1k`) and enter **Points per gift**.
3. Click an available tile. It adds another slot without replacing existing gifts.
4. Repeat for more gifts. Close with × or Esc to cancel.

Already assigned gifts are disabled in the picker. Remove a mapping first to move that gift. Edit its points box to change its value; × removes it. You can also use the shared gallery by choosing a side, setting points and clicking a tile.

**Coins are not game points.** A gift mapped to 10 points with quantity 3 adds 30 points. The 154-entry catalog contains observed metadata; check regional IDs, availability and current prices in TikTok/TikFinity.

**Expand library / import catalog** accepts a trusted compatible file. To add one gift yourself, supply its actual ID/name, optional observed coin value and authentic artwork, then click **Add uploaded gift** and assign it from the gallery. Never guess IDs or put private credentials in image URLs.

</details>

<details>
<summary>5. Chat +1 — choose voting words</summary>

1. Open **Chat +1** and enter a different word or short phrase for each competitor. Leave one blank to disable that side's keyword.
2. Check **Enable chat voting**, set the per-viewer cooldown (default **10 seconds**, shared across both competitors), and click **Apply chat voting**.
3. Connect TikFinity and **Start battle**. A matching comment adds **exactly +1 point**. No separate TikFinity Action is needed.
4. Enabled chat words automatically appear as **word = 1** (for example, **אייזנקוט = 1**) beneath each competitor’s gifts. Hide/show them under **Text & appearance → Show / hide elements → Chat words & +1 labels**.

Matching ignores case and surrounding/repeated spaces, but the whole message must match: `blue` matches ` BLUE `; `blue blue` and `blue!` do not. A viewer can vote again after the cooldown. Repeated message IDs, paused comments and late timed-round comments are not awarded on replay. Keywords follow competitors when swapping sides; changing keywords does not reset scores or rounds.

Expand **Test a chat vote** for a silent +1 simulation. It is labeled TEST in Recent chat votes, bypasses the real-viewer cooldown, and creates no gift message or shower. Real chat integration must be checked on your broadcast PC; events without stable message/viewer IDs are rejected. Replay/cooldown storage is bounded; export a private backup if a capacity error appears.

</details>

<details>
<summary>6. LIVE — connect TikFinity and monitor gifts</summary>

- Use one **Stream session label** for the current broadcast. Keep it during reconnects; change it only for a genuinely new broadcast while disconnected.
- **Connect TikFinity** connects to Desktop on this PC. **Reconnect** retries; **Disconnect** stops receiving. Refreshing does not automatically reconnect.
- Connected means Desktop is reachable, not that TikTok is LIVE.
- **Recent gift events** shows IDs, quantities, points and competitors. Tests are marked TEST; unmapped gifts award no points.
- Streak gifts count when they finish. Completed events received during Pause remain ignored on replay. A streak finishing after resume can include earlier gifts; finish streaks before changing battle state for a clean boundary.

Normal use does not need Adapter input / diagnostics. Use Simulate gift. Do not clear duplicate protection or change session labels to force points.

</details>

<details>
<summary>7. Modes — timed rounds and best-of series</summary>

Open **Modes** in the navigation. Choose **Untimed**, **Single timed round**, **Best of 3** (first to 2 wins) or **Best of 5** (first to 3 wins). Set 10–7,200 seconds per round, or use the 1/3/5/10-minute buttons. Click **Apply mode / reset match** to apply; this clears match scores and wins while preserving competitors, gifts and replay protection.

- **Start battle** starts/resumes the countdown. **Pause** freezes the remaining time.
- At zero, scoring stops and the round leader earns one win. **End round now** ends a round early.
- **Prepare next round** resets round scores to starting values. Press Start when ready.
- A tie awards no win. **Replay tied round** keeps the same round number.
- The series finishes when a competitor reaches the required wins. **Reset match** starts a fresh series. Loading a competitor preset also resets the series.
- Win markers follow competitor identities when swapping sides. Language/style changes preserve the timer and wins.

Keep the dashboard open to publish round results. The countdown survives reloads; a running clock continues while the page is closed. Gifts are accepted when processed before the deadline; a streak completing afterward is not awarded to that round. Paused/late gifts stay in replay protection and are not reassigned to a later round.

</details>

<details>
<summary>8. Battle — start, pause and reset</summary>

| Button | Effect |
|---|---|
| Start battle | Start/resume scoring without resetting scores. |
| Pause | Ignore completed gift events until resumed. |
| Declare winner / End round now | Stop scoring and mark the leader; timed modes also record the round result. |
| Reset scores / Reset match | Untimed: apply starting scores. Timed: pause and clear the full series, timer and wins. Mappings and duplicate protection stay. |
| Add points | Select a competitor and add a positive amount manually, including while paused. |
| Simulate gift | Choose an assigned gift and quantity; labels show its competitor and points. Start the battle first. Tests change scores silently on the display. |

The bar follows the score ratio; zero versus zero starts at 50% / 50%. The crown follows the lead.

</details>

<details>
<summary>9. Preview, overlay and backups</summary>

- **Preview** shows the game; **Full-screen preview** enlarges it. Esc exits.
- **Open display window** is for checking/window capture. It is not the private Link URL.
- **Copy private overlay link** copies your local viewing URL. **Retry overlay sync** republishes the current state after a connection problem is fixed.
- **Export settings** saves configuration, scores, images and event/replay history. Keep it private; presets are excluded.
- **Restore settings** replaces your configuration. Export first, disconnect TikFinity, restore, inspect scores, then reconnect.

Browsers/profiles and hosted/local addresses have separate settings. Phone remote control is not implemented. If saving/capacity errors appear, stop and resolve them; unsaved gifts are not automatically recovered.

</details>

## Tutorial 2: First setup and going LIVE

Follow these steps in order on your broadcast PC.

**1. Install the apps.** You need Windows, TikTok LIVE Studio with LIVE access on your account, and [TikFinity Desktop](https://tikfinity.zerody.one/landing/). Use current Chrome or Edge for the dashboard. No Node.js or paid hosting is needed by this game.

**2. Download and extract the game.** Use the Windows-package link above. Right-click the ZIP → Extract All. Open the extracted folder and double-click **Start-Overlay.cmd**. Keep its console open.

**3. Use the local dashboard it opens.** Do not keep editing an old `github.io` tab. To move existing settings, export there and restore in the local dashboard once. Load the desired matchup before exporting; presets are not included.

**4. Set up your battle.** Use Tutorial 1 to choose names, portraits, colors and gifts. Set starting scores, Pause, Reset scores, then Start battle. Simulate gifts for both sides and check the points, icons, bar and crown. Clear the test scores afterward.

**5. Prepare TikFinity.** Open Desktop, sign in to your TikFinity account, enter your TikTok **@handle** in its setup and save. Use your handle rather than display name. Keep Desktop on this PC. Its LIVE connection needs an active broadcast; game simulation works offline. Never enter TikTok passwords, cookies or stream keys into the game.

**6. Choose how to show the game.**

**Option A — Window Capture (no link to paste).** In the dashboard click **Open separate game window**. A separate window titled **Battle Studio — Game Capture** opens. Allow its popup if your browser blocks it. Click **Fullscreen** (or use F11) and **Ready · hide controls**. In LIVE Studio choose Sources → Add source → **Window Capture** and select that game window. Crop any browser borders and fit it to your vertical **1080 × 1920** scene. Keep the game window unminimized and the dashboard open in the same browser/profile. You can switch back to the dashboard to edit while the separate game window is captured. Select the window titled **Battle Studio — Game Capture**, not desktop/screen capture or the Control room window. Clicking Open separate game window again focuses the existing game window without reloading it. If your browser opens a tab despite the popup request, drag that game tab into its own window before selecting it in LIVE Studio. Press **C** inside the game window to restore setup controls; they are visible on stream if shown. Check LIVE Studio’s preview after fullscreen because capture behavior varies by Windows/browser. A low-resolution window enlarged afterward can still blur.

**Option B — Private overlay link.** In the local dashboard, wait for overlay ready/synchronized and click **Copy private overlay link**. In LIVE Studio choose your scene → Sources → + / Add source → **Link** → paste it. If source/browser dimension fields appear, set the **render resolution to 1080 × 1920** once, then fit it to the vertical scene. Dragging a low-resolution source larger can make it blurry; if render-size fields are unavailable, inspect the source settings before stretching it. Labels vary by version. Do not use the dashboard/ordinary display URL or edit the private URL.

**7. Verify the picture before going LIVE.** Change a name or simulate a mapped gift and check that LIVE Studio updates. Check that the entire game fits, portraits/text are sharp, setup controls are hidden, and no dashboard or private link is captured. Then Pause/Reset the test scores. If the URL is rejected, try it in another browser on this PC and record the exact error; do not disable browser security.

**8. Go LIVE and connect.** Start broadcasting from LIVE Studio when ready. In TikFinity Desktop, use **Connect to TikTok LIVE** and confirm the active channel. In the local game dashboard, open LIVE, set the session label and click **Connect TikFinity**. Allow local-network permission only for this trusted game if asked. You do not need a TikFinity Action per gift mapping. [Official TikFinity setup help](https://blog.tikfinity.com/tikfinity-setup/).

**9. Start the real battle.** Click **Start battle**. Verify a small real mapped gift in Recent gift events and on the display, waiting for a streak to finish. A simulation/socket connection does not prove this real-gift test. Keep **LIVE Studio, TikFinity Desktop, launcher and local dashboard** open. Use Pause for interruptions and keep the same session label for reconnects.

**10. Finish and return next time.** Declare the winner or pause, disconnect the game, export settings if wanted, and end the LIVE broadcast when ready. Stop the launcher after you finish displaying. Next time, run the launcher, use its new dashboard, load/check your matchup and repeat steps 8–9. **For Link sources, replace LIVE Studio's old overlay URL after every launcher restart. For Window Capture, reopen Broadcast window and verify the selected window.**

<details>
<summary>Troubleshooting setup and LIVE</summary>

| Problem | Check |
|---|---|
| Missing controls | Use the latest package and the local dashboard opened by its launcher. |
| Copy link disabled | Keep the launcher open and wait for overlay ready. |
| Frozen display | Check the launcher and sync status, then retry overlay sync. |
| Gifts add no points | Confirm LIVE, TikFinity connection, Start battle, the mapped ID and completed streak. |
| Another dashboard owns the connection | Disconnect/close the other scoring tab. |
| Saving or capacity error | Stop scoring, export settings and resolve the reported error. |
| TikTok low-quality warning | Check for static, blank or blurry broadcast output. The game cannot clear TikTok restrictions; appeal if mistaken. |

Keep private links and backups private. Do not expose local ports or disable browser/Windows security. See [Safety notes](SECURITY.md).

</details>

