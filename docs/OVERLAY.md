# Private Link source for LIVE Studio

This mode displays the game using a URL, with no window capture. A small PowerShell relay runs on your broadcast PC and synchronizes the dashboard with LIVE Studio's separate browser.

## First setup

1. [Download the Windows package](https://github.com/maxM808s/tiktok-live-battle/archive/refs/heads/main.zip) and **extract the ZIP completely**.
2. Open the extracted folder and double-click **Start-Overlay.cmd**. It uses built-in Windows PowerShell/.NET. No Node.js, npm, Python, administrator rights, paid hosting, or port forwarding is required by this implementation. The command permits this downloaded script only for its own PowerShell process; it does not change the machine's execution-policy setting. Managed Windows policy may still block it.
3. Keep the launcher window open. It opens your **local dashboard** automatically. Use that dashboard for the battle, rather than the GitHub Pages dashboard.
4. If you already configured the hosted dashboard, export its settings and import that backup into the local dashboard once. Browser storage is separate for the hosted and local addresses. Saved matchup presets are not included in the settings export; load/export a desired matchup first.
5. Connect TikFinity Desktop from the local dashboard's **LIVE** section. It must run on this same PC.
6. Click **Copy private overlay link** in the local dashboard. In TikTok LIVE Studio, add a **Link** source, paste the copied URL, and fit it to a **1080 × 1920** vertical scene.
7. Start the battle. Changes to names, scores, gifts, language, portraits and appearance reach the overlay automatically, usually within about half a second after publishing.

Keep the local dashboard, launcher, and TikFinity Desktop running during the stream. The relay serves only the game and holds its latest display snapshot in memory. It is not a public hosting service.

## Private access

- The URL starts with `http://127.0.0.1:8765/overlay.html#view=…`. **127.0.0.1 means this PC**. Someone on another computer opening that URL will contact their own PC, not yours.
- A random 256-bit viewer key protects the display snapshot. A different writer key authorizes dashboard updates. The viewer key cannot change scores/settings or retrieve the writer key.
- Keys are generated at startup, remain in memory, and are not included in settings exports or application logs. The admin key is removed from the address bar after initialization and retained only in that tab's session storage. Treat both private links as credentials on your PC.
- Restarting the launcher rotates both keys and invalidates old links. Close the old dashboard, use the new one it opens, and copy the new overlay URL into LIVE Studio. Settings remain in the local browser storage when the port/profile stay the same.
- Access is restricted by loopback binding and private keys, **not your public IP**. A public-IP change does not break the running overlay. This does not protect against malware or other privileged software on your own PC.
- The relay denies foreign origins/Host headers and serves an explicit file allowlist. It does not expose scripts, backups, environment files or repository files through its static route.
- Only display data is synchronized. Replay history, stream-session labels and unused custom gifts are excluded. Disabling recent-sender display also removes event data from future snapshots.

Do not forward port 8765, change the listener to a public interface, or share a writer link. The local relay deliberately has no public-internet mode.

## Troubleshooting

- **No dashboard opens:** keep the console visible and check its error. Run from the extracted folder. If Windows blocks the downloaded launcher, review the source and your device's execution policy; do not change system-wide policy or run it as administrator just to bypass a restriction.
- **Port already used:** stop an earlier relay first. Advanced users can run `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\Start-Overlay.ps1 -Port 8766`; a different port has separate browser storage.
- **Overlay waits for dashboard:** keep the local dashboard open and check its overlay sync status. Use **Retry overlay sync** after fixing the relay connection.
- **Key expired:** the relay restarted. Use the new dashboard and replace the Link source URL.
- **Private link will not load in LIVE Studio:** confirm it opens in another browser on the same PC and share LIVE Studio's exact error. Its URL validation/local-network behavior still requires a Windows test; do not disable browser security.
- **Dashboard closed:** the overlay retains its last snapshot while the relay runs, but no new gifts/settings are published until you reopen and authorize the dashboard.

## Verification

The real PowerShell relay was tested with PowerShell 7 on Linux and Chromium using independent browser contexts with separate storage. Tests cover authenticated reads/writes, viewer write rejection, origin/Host checks, file allowlisting, key rotation, snapshot redaction, and English/Hebrew/score synchronization. See [results](../tests/overlay-relay-results.json).

**Not yet verified:** Windows PowerShell 5.1 execution, real TikFinity gifts, and actual TikTok LIVE Studio Link-source behavior. Those are the next tests on your broadcast PC.
