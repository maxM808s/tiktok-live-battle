# Connect TikFinity Desktop

The JavaScript connector uses TikFinity's documented local Event API at `ws://localhost:21213/`. No HTTP gift bridge, Node.js, npm or paid hosting is required. Private LIVE Studio Link mode optionally uses the [local PowerShell overlay relay](OVERLAY.md).

**Verification:** adapter and browser tests use simulated TikFinity messages. Real TikFinity Desktop traffic and Windows LIVE Studio remain unverified until tested on your broadcast PC.

## Setup

1. Install/open the Windows desktop app from [TikFinity's official site](https://tikfinity.zerody.one/landing/) and connect it to your TikTok LIVE. The browser-only TikFinity app does not provide the local Event API.
2. On that same PC, open this game's [dashboard](https://maxm808s.github.io/tiktok-live-battle/admin.html#live-connection) in current Chrome or Edge. Configure gifts and their points first.
3. Under **TikFinity LIVE connection**, choose a stream session label, such as `my-channel-live-1`. Keep it unchanged for reconnects/reloads of the same stream. Use a new label only for a genuinely new broadcast after old events can no longer be replayed.
4. Click **Connect TikFinity**. If the browser requests local-network permission, allow access only for this trusted game. A connected socket means the desktop endpoint is reachable; it does not prove TikTok is LIVE.
5. Click **Start battle**. Send a small mapped gift and confirm the gift ID, quantity and points in **Recent gift events** and on the display. For a streakable gift, finish the streak before expecting points.
6. For a LIVE Studio **Link** source, use the [private local overlay mode](OVERLAY.md), which synchronizes across application storage. Alternatively, use **Open display window** in the same browser profile and capture that window. A plain GitHub Pages display link and a phone do not share dashboard storage.
7. Disconnect when finished. Refreshing the dashboard does not automatically reconnect. Keep one scoring dashboard tab open; a browser lock prevents a second tab from opening another connector.

## Scoring and replay protection

The connector accepts `{ "event": "gift", "data": { ... } }` messages. It matches the actual `giftId`, requires `msgId` (or `common.msgId`), and reads `giftType` or `gift.type`. `repeatCount` must be a positive integer. Streakable gifts (type 1) count only when `repeatEnd` is true or 1. Other gift types score immediately.

The existing scoring engine deduplicates stable message IDs and, when supplied with a sender and a valid nonzero `groupId`, cumulative final streak counts. Missing stable IDs, unknown gift types and unsafe numeric identifiers are rejected with a diagnostic message; IDs are never invented. Do not clear history or change session labels to force an event to score. Replay limits remain in effect. Gifts received while paused are remembered as ignored, so replaying them after resume does not award points. Empty or zero group IDs are treated as absent, not as one shared streak.

## Troubleshooting

- **Cannot connect:** verify TikFinity Desktop is running on this PC and connected; check its Event API settings, then click Reconnect.
- **Local connection blocked:** check the browser's permission for local-network access. HTTPS-to-local-WebSocket behavior varies by browser/version. Share the exact error if blocked; do not disable browser security or forward port 21213 to the internet.
- **Connected but no points:** start the battle, finish the streak, verify the actual regional gift ID is mapped, and check diagnostics for unsupported fields or replay duplicates. The dashboard's Simulate gift button tests game scoring independently of TikFinity.
- **Another tab owns the connection:** disconnect/close that tab before connecting here. Current Chrome/Edge with the Web Locks API is required.
- **Storage error:** the connector stops if points/replay history cannot be saved. Export your existing settings, free browser storage, and inspect scores before reconnecting. Unsaved gifts are not automatically recovered.
- **Settings restore:** disconnect before restoring a backup. Changing the session label in another dashboard tab disconnects the active connector.

## Sources and plan limits

- [Official Event API](https://tikfinity.zerody.one/tiktok/dapi): local endpoint, desktop requirement, event envelope; links to TikTok-Live-Connector payload documentation.
- [Gift/streak event documentation](https://ttlc.docs.isaackogan.com/events/gifts-and-goals/).
- [TikFinity free-plan information](https://tikfinity.zerody.one/landing/): free features have limits; current pricing is in the app. No $25 monthly earnings cap was found on this page. This is not a promise of unlimited features or unchanged terms.
