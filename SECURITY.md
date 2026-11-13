# Safety and privacy

## Private overlays

Private overlay links are for use on your broadcast PC. They permit viewing, not editing. Keep them private and replace the LIVE Studio link after restarting the launcher. Do not expose the local service to the internet or change browser/system security settings to force a connection.

Use the local dashboard opened by the launcher. Other visitors to the public hosted dashboard do not control your broadcast. Anyone with access to your browser profile or privileged access to your PC remains trusted; this is not protection against a compromised computer.

## Local updates

Run Update-Game.cmd only from your trusted game folder after closing the launcher/dashboard. The updater downloads this repository over HTTPS, pins the archive to the reported commit, validates paths and required assets, and replaces only known application files. It does not execute downloaded scripts during installation or need administrator access. HTTPS downloads and redirects are restricted to the configured repository endpoints on api.github.com, github.com and codeload.github.com. Changed or missing native launch/update scripts are blocked before installation using SHA-256 comparisons with the installed files; a native-script update needs manual review and a replacement package. This comparison is a change detector, not proof the installed script is trustworthy. CMD wrappers use the built-in Windows PowerShell path rather than searching the current folder/PATH. They use no profiles and do not create startup tasks/services, change registry startup entries, install remote-access tools or disable Windows Security. Execution-policy bypass applies to that process only. Keep antivirus/SmartScreen enabled.

Game HTML/JavaScript still comes from the repository and runs in the browser; browser data could be exposed by a malicious repository update. GitHub/account integrity remains trusted; this is not an independently signed release system.

One .battle-backup recovery copy and the installed-version marker remain locally. Temporary files are cleaned on normal completion/failure; a power loss or forced process termination may leave a temporary folder. Runtime and updater share a folder lock. Browser settings are not part of the recovery copy; keep a private settings export. Windows 5.1 execution still needs verification on the broadcast PC.

## Settings and backups

- Never put TikTok passwords, session cookies, GitHub tokens or other secrets into the game, image URLs or repository.
- Backups contain portraits, configuration and viewer identifiers, including identifiers retained for duplicate protection. Keep exports private. Turning off Recent gift sender removes viewer names from outgoing overlay event snapshots. It does not erase local stored history or backups. Gift names, quantities, points and timing can still appear when their display options are enabled.
- Import trusted files. Prefer uploaded images; remote image hosts can see the requesting device's IP address.
- Keep a backup before clearing browser data. Invalid or oversized stored settings can fall back to defaults.
- If points cannot be saved, LIVE ingestion stops. Resolve the error and inspect scores before reconnecting.
- Private backups and common credential files are ignored by Git, but manual/forced uploads can still publish them.

## Chat voting

Chat voting is opt-in. It matches entire normalized comments, awards one point, requires stable message/viewer IDs and applies a shared per-viewer cooldown. Paused and cooldown-blocked matching messages remain in replay protection. Viewer identifiers, chat vote logs and cooldown/replay tracking stay in local settings/backups and are removed from private overlay snapshots. Enabled, visible voting keywords are projected into validated appearance fields for display below gift icons; hiding/disabling the labels removes those words from outgoing appearance snapshots. Full comment text is not stored; only the configured matching keyword is logged. Raw chat text is never executed. Gifts and chat have separate replay limits. Real TikFinity chat behavior still needs verification on the broadcast PC.

## What is public

The repository, its history and the code delivered to browsers are inspectable. Simplifying documentation or using a private overlay URL does not prevent someone from studying or copying that code. No source-code confidentiality is claimed.

GitHub Pages projects on the same host share a browser origin. Do not host untrusted code on that origin. Hosting/browser protections do not cover malicious extensions, compromised accounts or privileged local software.

## Review status

The latest review records are [input validation](tests/security-results.json), [overlay privacy](tests/privacy-results.json), [relay authorization](tests/overlay-relay-results.json) and [current-file scan](tests/security-review.json). The current-file scan does not rescan GitHub history or inspect binary screenshots. See the [verification index](tests/README.md) for scope.

New appearance controls use fixed font/shape lists, bounded sizes/text and validated colors. Custom labels are rendered as escaped text. Fonts do not load third-party font scripts or stylesheets.

Checks cover unsafe imports/rendering, duplicate scoring, connection cleanup, storage failures and private-overlay access. The local overlay was tested with separate browser profiles to confirm synchronization without shared storage. Credential-pattern scans found no matches within their recorded scope; that is not proof that every possible secret or private datum is absent.

Real TikFinity traffic, Windows PowerShell execution and actual LIVE Studio behavior still require verification on the broadcast PC. Report suspected exposures privately without posting keys or private backups in a public issue.

The latest design update adds only local CSS and fixed font stacks. Its scoped credential-pattern scan and validation summary are in [design security review](tests/design-security-review.json). No new external scripts, font services, or launcher commands were added.
