# Private overlay setup

Use this mode to show the game through a LIVE Studio **Link** source, without capturing a window.

## First setup

1. [Download the Windows package](https://github.com/maxM808s/tiktok-live-battle/archive/refs/heads/main.zip) and extract the ZIP completely.
2. Double-click **Start-Overlay.cmd**. Keep its window open and use the local dashboard it opens. No Node.js installation or paid hosting is needed.
3. If you already configured the hosted dashboard, export settings there and import the backup into the local dashboard once. Presets are not included; load/export the desired matchup first.
4. Run TikFinity Desktop on this same PC and connect it from the dashboard's **LIVE** section.
5. Click **Copy private overlay link**. Add a **Link** source in LIVE Studio, paste the copied URL, and fit it to your vertical scene. If asked for dimensions, use **1080 × 1920**.
6. Start the battle. Keep the local dashboard, launcher and TikFinity Desktop open during the stream.

## Keep the link private

The overlay link works only on your PC. It allows viewing, not editing, and is separate from dashboard access. Restarting the launcher expires previous links: close the old dashboard, use the new one, and replace the URL in LIVE Studio. Your browser settings remain when using the same profile and local address.

The link is not tied to your public IP address. Changing your internet IP does not revoke it; restarting the launcher does. A private overlay does not make the publicly distributed software private.

Do not share dashboard access, forward local ports or expose the service to the internet. The launcher is intended for a trusted PC, not protection against malware or other privileged software on that PC.

## Troubleshooting

- **Launcher blocked or closes:** extract the ZIP first and read the console error. Review the source/device policy if Windows blocks it; do not change system-wide policy or run as administrator just to bypass a restriction.
- **An earlier launcher is running:** stop it before starting another.
- **Overlay waits for dashboard:** keep the local dashboard open, check its sync message and use **Retry overlay sync** after resolving the problem.
- **Link expired:** copy the new link from the dashboard opened by the latest launcher.
- **LIVE Studio rejects the link:** test the copied URL in another browser on this PC and share the exact error. Do not disable browser security.
- **Dashboard closed:** the last picture may remain visible, but new scores/settings will not arrive until the dashboard is reopened and connected.

Browser synchronization and access tests passed using PowerShell 7 on Linux. **Windows PowerShell and LIVE Studio Link behavior remain unverified until the PC test.**
