# TikTok LIVE Battle

[Download the latest Windows package](https://github.com/maxM808s/tiktok-live-battle/archive/refs/heads/main.zip)

There are two tutorials below. **First time? Start with Tutorial 2**, then use Tutorial 1 when you need help with a dashboard control.

- [Tutorial 1: Use the dashboard](#tutorial-1-use-the-dashboard)
- [Tutorial 2: First setup and going LIVE](#tutorial-2-first-setup-and-going-live)

Browser and simulated-event tests passed. Real TikFinity gifts, Windows launcher execution and LIVE Studio Link behavior still need verification on the broadcast PC.

## Tutorial 1: Use the dashboard

Use the **local dashboard opened by Start-Overlay.cmd** for your private LIVE Studio overlay. Changes save automatically; check the save indicator. Use one dashboard at a time.

**1. General — language, title and branding**

- **Display language:** choose English or עברית. This changes the game text and Hebrew text direction without resetting scores. The dashboard controls remain in English.
- **Custom title:** enter a heading, or leave blank for the translated default.
- **Branding:** enter the text shown at the top. Upload a **Brand logo** if wanted; **Remove logo** removes it.
- **Voting instructions:** enter bottom text, or leave blank for the translated default.
- **Enable animations:** turn effects on/off.

Your own title, branding and instructions are not automatically translated.

**2. Text & style — sizes and colors**

- Click a preset: Original, Electric, Midnight, Black & Yellow, Orange & Black, Blue & Yellow, Crimson, Emerald, Ice Blue, Rose Gold, or Black & White. Presets recolor the portrait rings, panels and coordinated display elements.
- Under **Typography & sizes**, choose font/weight and adjust sliders or exact values for branding, title, names, scores, instructions, gift values, labels, logo and portraits. Sizes scale with the vertical display; long text can shrink to fit. **↺** resets one size.
- Under **Text colors & background**, choose individual text, background/glow and left/right panel colors.
- **Use appearance colors for competitor panels:** on uses these panel colors; off uses the competitors' saved gradients.
- Under **Show / hide elements**, choose which branding, title, instructions, subtitles and sender information appear.
- **Reset appearance** resets design settings while preserving scores, competitors and gift mappings.

**3. Competitors — names, photos and presets**

1. Enter each competitor's **Name**. Optional English/Hebrew names override the main name for that language.
2. Upload a portrait. Adjust **Horizontal crop**, **Vertical crop** and **Portrait zoom** while watching the preview. Remove the photo with its Remove button.
3. Set **Gradient start/end**. Turn off appearance panel colors if you want to see these gradients.
4. Enter a **Starting score**. Use **Reset scores** in Battle controls to apply it.
5. **Swap sides** moves the competitors with their photos, scores and gifts.

To save a matchup, enter a preset name and click **Save preset**. The same name overwrites that preset. Choose one and click **Load matchup** to restore it: loading applies starting scores and pauses the battle. **Delete preset** removes only the saved entry. Presets do not include all general/appearance settings and are not included in settings exports.

**4. Gifts — add more than one gift to each character**

1. Under the desired competitor, click **＋ Add gift**.
2. Search by gift name or ID, then set **Points per gift**.
3. Click an available gift. It adds another gift slot without replacing existing gifts.
4. Repeat for another gift on either competitor. Close with **×** or **Esc** to cancel.

Already assigned gifts are unavailable in this picker. To move a gift, remove its old mapping first. Edit its points box to change its value, or click **×** on the mapping to remove it. The shared gallery below is another way to assign gifts: choose the side, set points and click a tile.

Coin value is a catalog reference, not your scoring rule. A gift mapped to 10 points with quantity 3 adds 30 points. Verify regional IDs and current prices in TikTok/TikFinity; similar names can have different IDs.

**Expand library / import catalog** accepts a trusted compatible catalog file. To upload one gift yourself, enter its actual ID/name, optionally its observed coin value, upload authentic artwork, and click **Add uploaded gift**. Then assign it from the gallery. Do not guess IDs or use private credentials in image URLs.

**5. LIVE — connection and received gifts**

- Set a **Stream session label** for this broadcast. Keep it unchanged during reconnects; change it only for a genuinely new broadcast while disconnected.
- **Connect TikFinity** connects to Desktop on this PC. **Reconnect** retries; **Disconnect** stops receiving events.
- A connected status confirms the desktop endpoint is reachable, not that TikTok is actually LIVE.
- **Recent gift events** shows gift IDs, quantities, points and competitors. Test events are marked TEST; unmapped gifts award no points.
- Streak gifts score when they finish. Completed events received during Pause remain ignored if replayed. A streak finishing after resume can include earlier gifts, so finish streaks before changing battle state when you need a clean boundary.

Normal use does not need **Adapter input / diagnostics**. Use Simulate gift instead. Do not clear duplicate-protection history or change session labels to force points.

**6. Battle — start, pause, correct and reset**

| Button | Use |
|---|---|
| Start battle | Start/resume gift scoring. Existing scores stay. |
| Pause | Stop scoring completed gift events. Start battle resumes. |
| Declare winner | Stop scoring and show the leading competitor as winner. Ties have no leading crown. |
| Reset scores | Apply each competitor's starting score. Pause first if you do not want incoming gifts during the reset. Mappings and duplicate protection stay. |
| Add points | Select a competitor and enter a positive manual addition. This also works while paused. |
| Simulate gift | Select a mapped gift and quantity to test scoring. Start the battle first. This does not prove real TikFinity traffic works. |

The crown follows the lead. The percentage bar follows the score ratio; zero versus zero starts at 50% / 50%.

**7. Preview, backups and overlay controls**

- **Preview** shows the current game. **Full-screen preview** enlarges it; Esc exits.
- **Open display window** opens an ordinary browser view for checking or window capture. It is not the private Link URL.
- **Export settings** downloads the current configuration, scores, images and event/replay history. Store it privately.
- **Restore settings** replaces the current configuration. Export first if needed, disconnect TikFinity, restore, inspect scores, then reconnect. The preset list is not included.
- **Copy private overlay link** copies the viewing URL from the local dashboard. **Retry overlay sync** sends the latest state again after a relay problem is fixed.

Different browsers/profiles and hosted/local addresses have separate settings. A phone is not connected as a remote controller. If saving or capacity errors appear, stop and resolve them before continuing; unsaved gifts are not automatically recovered.

## Tutorial 2: First setup and going LIVE

**First-time setup: steps 1–6**

**1. Get the required apps**

Use a Windows broadcast PC with TikTok LIVE Studio and LIVE access on your TikTok account. Install [TikFinity Desktop from its official site](https://tikfinity.zerody.one/landing/). Use current Chrome or Edge for the game dashboard. No Node.js installation or paid hosting is needed by this game.

**2. Download and start the game**

Download the Windows package using the link at the top. Right-click the ZIP, choose **Extract All**, then open the extracted folder and double-click **Start-Overlay.cmd**. Keep the launcher window open.

Use the **local dashboard it opens**, not an older `github.io` tab. If you already configured that hosted dashboard, export settings there and restore them in the local dashboard once. Load the desired saved matchup before exporting, because presets are not included.

**3. Configure and test the dashboard**

Follow Tutorial 1 to set names/photos, appearance and gift mappings. Set starting scores, click Pause then Reset scores, and Start battle. Simulate a gift for each side and check its points, icons, bar and crown. Clear the test scores before the real battle.

**4. Prepare TikFinity Desktop**

Open TikFinity Desktop and sign in to your TikFinity account. In its setup, enter your TikTok **@handle**, not your display name, and save it. Its LIVE connection needs your broadcast to be active; offline preparation and game simulation can be done first.

Keep Desktop open on this same PC. Do not enter TikTok passwords, session cookies or stream keys into the game. Gifts are assigned in the game's Gifts section; you do not need a separate TikFinity Action for each mapping.

**5. Add the private link to LIVE Studio**

In the local dashboard, wait for overlay ready/synchronized, then click **Copy private overlay link**.

In LIVE Studio, choose your scene, open **Sources → + / Add source → Link**, and paste that copied URL. Give the source a name such as Battle Game. Labels may vary by LIVE Studio version.

If width and height fields appear, enter **1080 × 1920** once. Otherwise fit the source to the vertical scene using its controls. Check the full game is visible. Do not paste the dashboard URL or ordinary display URL, and do not edit the private URL to set dimensions.

**6. Check synchronization before streaming**

Change a competitor name or simulate a mapped gift in the dashboard. Confirm it changes inside LIVE Studio. Then pause/reset the test scores and leave the battle paused until ready.

Keep the local dashboard and launcher open. If LIVE Studio rejects the URL, first test it in another browser on this PC and note the exact error. Do not disable browser security.

**Going LIVE: steps 7–9**

**7. Start the broadcast and connect TikFinity**

When ready, start your broadcast using LIVE Studio. In TikFinity Desktop, use **Connect to TikTok LIVE** and confirm it is attached to your active channel. Its [official setup guide](https://blog.tikfinity.com/tikfinity-setup/) covers handle/account setup if its interface differs.

In the game's local dashboard, open **LIVE**, set the stream session label and click **Connect TikFinity**. If the browser requests local-network permission, allow it only for this trusted game. Keep one scoring dashboard open.

**8. Start and verify the battle**

Click **Start battle**. During a controlled LIVE test, check a small real mapped gift in Recent gift events and confirm its actual quantity and points. Wait for a streak to finish. A socket connection or simulated gift alone does not verify this real-gift step.

Keep all four open: **LIVE Studio, TikFinity Desktop, the game launcher and the local dashboard**. Use Pause for interruptions and Reconnect if needed, keeping the same session label for the same broadcast.

**9. End the session**

Declare the winner or pause, disconnect TikFinity in the game, and export settings if wanted. End your LIVE broadcast when ready. Close the launcher after you have finished displaying the game.

**Next time you stream**

Run the launcher and use the new local dashboard. Settings normally remain with the same browser/profile and local address. Copy its new private overlay link into LIVE Studio: restarting the launcher expires the old link. Load your matchup, reset scores as needed, then follow steps 7–9.

To update the game package, export settings, stop the old launcher, download/extract the latest package and run its launcher. Check settings and restore the backup if needed. Always use the latest copied overlay link after restarting.

**If something does not work**

- Missing new buttons/colors: confirm you extracted the latest package and are using its local dashboard, not an older hosted page or old extracted folder.
- Copy link disabled: use the dashboard opened by the running launcher. If another launcher is running, stop it first.
- Old picture or waiting message: keep the dashboard open, check sync status, then Retry overlay sync after resolving the connection issue.
- No gift points: verify TikTok is LIVE, TikFinity Desktop is connected, Start battle is active, the actual gift ID is mapped, and the streak has finished.
- Another dashboard owns the connection: disconnect/close that tab first.
- Storage, launcher or permission error: keep a backup and read the message. Do not change system-wide security settings, expose local ports or run as administrator merely to bypass a restriction.

Keep private links and backups private. The link is PC-only and expires on launcher restart; it is not tied to your public internet IP. Backups can contain portraits and viewer identifiers. Do not upload them or credentials to this public repository. The repository and browser code remain inspectable. More safety details are in [SECURITY.md](SECURITY.md).
