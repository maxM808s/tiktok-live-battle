# Safety and privacy

## Private overlays

Private overlay links are for use on your broadcast PC. They permit viewing, not editing. Keep them private and replace the LIVE Studio link after restarting the launcher. Do not expose the local service to the internet or change browser/system security settings to force a connection.

Use the local dashboard opened by the launcher. Other visitors to the public hosted dashboard do not control your broadcast. Anyone with access to your browser profile or privileged access to your PC remains trusted; this is not protection against a compromised computer.

## Settings and backups

- Never put TikTok passwords, session cookies, GitHub tokens or other secrets into the game, image URLs or repository.
- Backups contain portraits, configuration and viewer identifiers, including identifiers retained for duplicate protection. Keep exports private. Turning off Recent gift sender removes viewer names from outgoing overlay event snapshots. It does not erase local stored history or backups. Gift names, quantities, points and timing can still appear when their display options are enabled.
- Import trusted files. Prefer uploaded images; remote image hosts can see the requesting device's IP address.
- Keep a backup before clearing browser data. Invalid or oversized stored settings can fall back to defaults.
- If points cannot be saved, LIVE ingestion stops. Resolve the error and inspect scores before reconnecting.
- Private backups and common credential files are ignored by Git, but manual/forced uploads can still publish them.

## What is public

The repository, its history and the code delivered to browsers are inspectable. Simplifying documentation or using a private overlay URL does not prevent someone from studying or copying that code. No source-code confidentiality is claimed.

GitHub Pages projects on the same host share a browser origin. Do not host untrusted code on that origin. Hosting/browser protections do not cover malicious extensions, compromised accounts or privileged local software.

## Review status

The latest review records are [input validation](tests/security-results.json), [overlay privacy](tests/privacy-results.json), [relay authorization](tests/overlay-relay-results.json) and [current-file scan](tests/security-review.json). The current-file scan does not rescan GitHub history or inspect binary screenshots. See the [verification index](tests/README.md) for scope.

New appearance controls use fixed font/shape lists, bounded sizes/text and validated colors. Custom labels are rendered as escaped text. Fonts do not load third-party font scripts or stylesheets.

Checks cover unsafe imports/rendering, duplicate scoring, connection cleanup, storage failures and private-overlay access. The local overlay was tested with separate browser profiles to confirm synchronization without shared storage. Credential-pattern scans found no matches within their recorded scope; that is not proof that every possible secret or private datum is absent.

Real TikFinity traffic, Windows PowerShell execution and actual LIVE Studio behavior still require verification on the broadcast PC. Report suspected exposures privately without posting keys or private backups in a public issue.
