# SrotaBio static landing page

A dependency-free waitlist landing page designed for GitHub Pages and aligned
to the approved SrotaBio identity package dated 2026-09-02. No build command is
required.

## Brand authority

- Use **SrotaBio** as one word.
- Cream `#FAF6EC`, Iron `#36384E`, Blue `#7482A8`, Lime `#C4D275` and Slate
  `#8FA0CC` are the active palette.
- Manrope is the active wordmark, UI and body family.
- The supplied rounded-square icon is used for the favicon and app touch icon.
- The light and dark website wordmarks are exact crops of the approved
  presentation assets. The supplied OG banner is inactive because it contains
  rejected copy.
- The canonical rules live in `../srota_os/brand_system.md` and
  `../brand/current/README.md`.

The older Martel assets and 4a Woven SB files remain in this repository as
historical records. The website does not reference them.

## Before publishing

### 1. Connect the waitlist form

GitHub Pages serves static files and cannot store email addresses itself. The
workspace includes a self-hosted Flask and PostgreSQL receiver in the sibling
`waitlist-api` folder:

1. Deploy `waitlist-api` behind HTTPS on the VPS.
2. Copy its URL, such as `https://api.example.com/api/waitlist`.
3. Open `site-config.js` and paste the URL into `waitlistEndpoint`.

Do not add health information to this form. It is intentionally limited to an
email address and a non-sensitive source label.

### 2. Maintain the identity

The active 2026-09-02 identity overrides are in `brand-refresh.css`. The
approved Manrope font and current logo exports live under `assets/`. Preserve
the canonical wordmark construction and compact-icon use when making changes.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish with GitHub Pages

1. Create an empty GitHub repository.
2. Add the contents of this folder to the repository root.
3. Push the files to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Choose `main`, select `/(root)`, and save.

GitHub will provide the public URL after the first deployment completes.

## Files

- `index.html` — page structure and copy
- `theme.css` — historical identity tokens retained as an unreferenced record
- `styles.css` — responsive layout and components
- `brand-refresh.css` — active approved brand tokens and component overrides
- `site-config.js` — waitlist service configuration
- `script.js` — form validation and submission
- `assets/identity/` — active wordmarks, icons and favicon plus historical assets
- `assets/fonts/` — active Manrope font/license plus historical fonts
