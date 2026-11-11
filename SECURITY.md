# Security review

Reviewed 2026-11-11. This static application has no server-side accounts, API keys, payment processing, or network event receiver.

## Fixed

- Imported backup events previously allowed HTML through numeric fields in the recent-events renderer. Events now have strict numeric validation and all displayed fields are escaped.
- State imports, browser storage, and presets now use shared validation. CSS colors, crop/zoom values, booleans, identifiers, text lengths, mappings and scores are constrained. Malformed stored data falls back to defaults; it is not rendered as trusted markup.
- Event input stores an allowlist of fields, uses bounded string identifiers and collision-resistant composite replay keys, and limits history growth. At capacity scoring rejects events instead of silently discarding duplicate protection. Legacy replay keys remain recognized.
- Gift imports validate the complete batch before applying it and normalize fields. Imports are limited to 4 MB, 1000 custom gifts, and bounded image/text sizes. Uploaded images are rasterized and resized; oversized decoded dimensions are rejected. Raster data images, bundled gift paths and credential-free HTTPS image URLs are accepted; executable schemes and SVG data imports are rejected.
- Presets and streak dictionaries use prototype-free objects. Presets are validated before rendering/loading.
- Both pages declare a Content Security Policy blocking inline scripts, third-party scripts, plugins, form submissions, and base URL changes. Same-origin scripts/fetches/preview frames and local/data/HTTPS images are allowed. Inline CSS is needed for user colors, image positioning and score bars.
- Pages send no referrer when loading remote images. External Google Fonts requests were removed; local system fonts support Hebrew and English.

## Boundaries

Anyone can open the public admin page, but controls modify only that visitor's browser storage. There is no shared server state for other visitors to administer. This is not authentication: anyone with access to the same browser profile can change its battle. GitHub Pages project paths on the same host share an origin/storage boundary; avoid hosting untrusted scripts under that origin. A future remote relay needs real authorization, encrypted transport and authenticated event ingestion.

Remote HTTPS images are optional and still reveal the viewer's IP to their host. Upload images instead for local assets. Do not place secrets or private information in public repository files, image URLs or exported backups. Backups contain portraits, configuration and recent sender names and should be handled accordingly.

GitHub Pages does not let this project set arbitrary HTTP response headers. A meta CSP cannot enforce frame-ancestors, so clickjacking protection is not claimed. Browser extensions, compromised GitHub accounts and malicious code on the same origin are outside these fixes. Malformed/oversized legacy settings may fall back to defaults; keep exported backups before changing configurations.

Real S2E ingestion remains unconnected. No claims are made about authentication or security of an unimplemented connector. Review any future adapter before enabling it.

## Tests

`tests/security.mjs` verifies malicious events, style/image injection, malformed storage, prototype-related keys, invalid scores and resource limits. `tests/browser.cjs` checks normal game flows and includes actual malicious backup import, literal HTML name rendering and CSP inline-script blocking. These are development tests and do not add a runtime server dependency.

Appearance controls use validated size ranges, hexadecimal colors, approved system-font choices and boolean visibility flags. Older settings receive default appearance values without changing scores.
