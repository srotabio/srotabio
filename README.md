# SrotaBio static landing page

A dependency-free landing page designed for GitHub Pages and aligned to
SrotaBio identity system 1.1. No build command is required.

## Brand authority

- The 4a Woven SB logo is locked. Use the supplied SVG files unchanged.
- Martel carries the display and editorial voice; Martel Sans carries body copy and UI.
- The active palette is Khadi, Chalk, Iron, Iron 70, Madder, Myrobalan, Myrtle and Loom line.
- Muggu ground, ikat band and field-series graphics remain supporting elements outside the logo.
- The canonical rules live in `../srota_os/brand_system.md` and `../brand/identity-system/README.md`.

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

All colors, shadows, type choices and shape tokens are in `theme.css`. The
layout in `styles.css` references those variables. Logo construction remains
fixed; any future theme refinement should preserve the approved brand roles.

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
- `theme.css` — replaceable visual theme
- `styles.css` — responsive layout and components
- `site-config.js` — waitlist service configuration
- `script.js` — form validation and submission
- `assets/identity/` — locked logo masters and approved supporting graphics
- `assets/fonts/` — Martel and Martel Sans web fonts with SIL OFL license
- `favicon.ico`, `apple-touch-icon.png` — responsive brand icons
