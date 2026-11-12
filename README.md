# Battle Studio

A customizable TikTok LIVE battle game with a clean dashboard, glass-style display, English/Hebrew support and 154 gift entries.

**[Download Windows package](https://github.com/maxM808s/tiktok-live-battle/archive/refs/heads/main.zip)** · [Open hosted dashboard](https://maxm808s.github.io/tiktok-live-battle/admin.html)

**First time? Start with Tutorial 2.** Use Tutorial 1 as your dashboard reference.

1. [Use the dashboard](#tutorial-1-use-the-dashboard)
2. [First setup and going LIVE](#tutorial-2-first-setup-and-going-live)

Browser, simulated-gift and local-overlay tests passed. Real TikFinity gifts, Windows execution and LIVE Studio Link behavior still need the broadcast-PC test.

## Tutorial 1: Use the dashboard

Use **☾ Night mode** at the top for a black-and-white dashboard. The choice stays in this browser and does not change the broadcast. For a monochrome game, choose **Text & style → Black & White**.

For a private LIVE Studio link, use the **local dashboard opened by Start-Overlay.cmd**. Use one dashboard at a time. Edits save automatically; watch the save indicator.

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
- **Typography & sizes:** choose font/weight; use sliders or exact values for text, scores, gift values, labels, logo and portraits. **↺** resets one size. Long text can shrink to fit the vertical display.
- **Text colors & background:** adjust individual colors, glow and panel colors. Turn **Use appearance colors for competitor panels** off to show each competitor's own saved gradient.
- **VS badge & gift reactions:** choose Glass, Solid circle, Diamond or Minimal; edit its label, colors and text/badge sizes. Enable gift spotlights for a brief gift/quantity/points banner. The main animation switch and reduced-motion preference control motion.
- **Last gift received:** shows the most recent real gift and time since receipt. Test gifts are labeled TEST and do not replace this indicator.
- **Fonts:** nine installed-font stacks with fallbacks; appearance can vary by PC, so preview English and Hebrew before LIVE.
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
<summary>5. LIVE — connect TikFinity and monitor gifts</summary>

- Use one **Stream session label** for the current broadcast. Keep it during reconnects; change it only for a genuinely new broadcast while disconnected.
- **Connect TikFinity** connects to Desktop on this PC. **Reconnect** retries; **Disconnect** stops receiving. Refreshing does not automatically reconnect.
- Connected means Desktop is reachable, not that TikTok is LIVE.
- **Recent gift events** shows IDs, quantities, points and competitors. Tests are marked TEST; unmapped gifts award no points.
- Streak gifts count when they finish. Completed events received during Pause remain ignored on replay. A streak finishing after resume can include earlier gifts; finish streaks before changing battle state for a clean boundary.

Normal use does not need Adapter input / diagnostics. Use Simulate gift. Do not clear duplicate protection or change session labels to force points.

</details>

<details>
<summary>6. Battle — start, pause and reset</summary>

| Button | Effect |
|---|---|
| Start battle | Start/resume scoring without resetting scores. |
| Pause | Ignore completed gift events until resumed. |
| Declare winner | Stop scoring and mark the leader. A tie has no leading crown. |
| Reset scores | Apply starting scores. Pause first to avoid gifts during the reset. Mappings and duplicate protection stay. |
| Add points | Select a competitor and add a positive amount manually, including while paused. |
| Simulate gift | Select a mapped gift/quantity and test scoring. Start the battle first. |

The bar follows the score ratio; zero versus zero starts at 50% / 50%. The crown follows the lead.

</details>

<details>
<summary>7. Preview, overlay and backups</summary>

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

**6. Add the private overlay to LIVE Studio.** In the local dashboard, wait for overlay ready/synchronized and click **Copy private overlay link**. In LIVE Studio choose your scene → Sources → + / Add source → **Link** → paste it. If dimension fields appear, enter **1080 × 1920** once; otherwise fit it to your vertical scene. Labels vary by version. Do not use the dashboard/ordinary display URL or edit the private URL.

**7. Verify the picture.** Change a name or simulate a mapped gift and check that LIVE Studio updates. Then Pause/Reset the test scores. If the URL is rejected, try it in another browser on this PC and record the exact error; do not disable browser security.

**8. Go LIVE and connect.** Start broadcasting from LIVE Studio when ready. In TikFinity Desktop, use **Connect to TikTok LIVE** and confirm the active channel. In the local game dashboard, open LIVE, set the session label and click **Connect TikFinity**. Allow local-network permission only for this trusted game if asked. You do not need a TikFinity Action per gift mapping. [Official TikFinity setup help](https://blog.tikfinity.com/tikfinity-setup/).

**9. Start the real battle.** Click **Start battle**. Verify a small real mapped gift in Recent gift events and on the display, waiting for a streak to finish. A simulation/socket connection does not prove this real-gift test. Keep **LIVE Studio, TikFinity Desktop, launcher and local dashboard** open. Use Pause for interruptions and keep the same session label for reconnects.

**10. Finish and return next time.** Declare the winner or pause, disconnect the game, export settings if wanted, and end the LIVE broadcast when ready. Stop the launcher after you finish displaying. Next time, run the launcher, use its new dashboard, load/check your matchup and repeat steps 8–9. **Replace LIVE Studio's old overlay URL after every launcher restart.**

**Updating your local copy — no repeated ZIP downloads**

**Install the updater once:** if your folder does not contain **Update-Game.cmd**, export your settings, close the old launcher/dashboard, download the latest Windows package above and extract it once. Then use that folder from now on.

For future updates:

1. Finish the broadcast and export a private settings backup. Close the dashboard and launcher.
2. Double-click **Update-Game.cmd** in your game folder. Wait for **Updated** or **Already up to date**. No administrator access is needed.
3. Open **Start-Overlay.cmd** again. Check your names, photos, gifts and scores; restore your settings export only if needed.
4. Copy the new private overlay link into LIVE Studio after restarting the launcher.

The updater replaces known app files **in the same folder**. It leaves browser settings and unrelated files alone, cleans temporary downloads, and keeps only **one** previous app copy in **.battle-backup**. That recovery copy contains application files, not your browser settings. A failed download leaves the installed app unchanged.

**Need to undo an update?** Close the dashboard/launcher and double-click **Restore-Game.cmd**. It restores the one previous app copy. Start normally and replace the overlay link again. An installation failure attempts rollback automatically. If an error persists, keep your settings export and report the message.

The hosted github.io dashboard updates separately; refresh it. Ordinary settings edits do not require an app update.

**Quick fixes:** missing controls usually mean an old package/tab; disabled Copy link means the local launcher/dashboard is not ready; a frozen picture needs a sync/status check; no points needs an active LIVE, connected Desktop, started battle, mapped ID and finished streak. Close another scoring dashboard if it owns the connection. Read storage/launcher errors before continuing; do not change system-wide security settings, expose local ports or use administrator access merely to bypass a restriction.

Keep private links/backups private. The viewing link works on this PC and expires on restart, not when your public IP changes. Backups can include viewer identifiers. The repository/browser code remain inspectable; private overlays do not hide the software. More details: [Safety notes](SECURITY.md).

**TikTok “low quality content” warning:** the 10 minutes shown is the restriction duration. The notice names black, blank, static or blurry scenes; it does not identify the gift connector as the cause. Check the actual LIVE Studio output for freezing, blank sources and scaling/bitrate issues. A battle graphic by itself may be treated as static content. Use the graphic alongside meaningful live commentary, camera or gameplay, and appeal in TikTok if the restriction is mistaken. Hiding the notice, dark mode or decorative motion cannot remove a TikTok restriction.
