# Verification records

These files are development checks, not application settings or private backups.

| Area | Check |
| --- | --- |
| Local updates, cleanup and rollback | updater.ps1 |
| CMD/PowerShell source safety review | launcher-safety-results.json |
| Round timing, series and localized display | modes.mjs, modes-browser.cjs, round-visibility.cjs |
| Old-relay round support warnings | relay-compat.mjs |
| Chat keywords, cooldowns and mock TikFinity feed | chat.mjs, chat-browser.cjs, chat-labels.cjs |
| Scoring and replay protection | core.mjs |
| Import, appearance and privacy validation | security.mjs, privacy.mjs |
| Gift assets, search and mappings | catalog-display.cjs, gift-slots.cjs |
| Dashboard labels, feedback and status summary | dashboard-ux.cjs |
| Typography, themes, activity and VS controls | design.cjs, styles.cjs, engagement.cjs, gift-messages.cjs, motion.cjs, night-mode.cjs |
| Local relay authorization and synchronization | overlay-relay.cjs |
| TikFinity normalization and mock connection | tikfinity.mjs, tikfinity-browser.cjs |

The updater has both synthetic failure/recovery checks (updater-results.json) and a real GitHub archive check (updater-live-results.json), run in PowerShell 7 on Linux. The Windows CMD and PowerShell 5.1 path still needs the broadcast-PC test.

Result JSON files describe their own scope and date where recorded. Hosted results cover the public site at test time. Screenshots are visual references and may show earlier designs. A passing simulated/browser test does not verify real TikFinity gifts, Windows PowerShell 5.1 or TikTok LIVE Studio on the broadcast PC.

Never commit real private overlay URLs, credentials or user settings exports here.
