# SrotaBio website

Static website served with GitHub Pages. No build command is required.

## Preview locally

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000>.

## Structure

- `index.html` — homepage
- Other root HTML files — additional website pages
- `community/register.html` — community registration page
- `styles.css`, `home.css` — website styles
- `script.js` — form validation and submission
- `site-config.js` — signup configuration
- `assets/` — images, icons, fonts and font licenses
- `CNAME` — custom domain configuration
- `.nojekyll` — static-file serving configuration

## Signup configuration

GitHub Pages cannot store form submissions. Set `waitlistEndpoint` in
`site-config.js` to an authorized HTTPS receiver. Review `previewMode` and
test form behavior before enabling submissions. Preview behavior is defined
in the website scripts.

## Deployment

The default branch is `master`. Check **Settings → Pages** for the configured
publishing source before changing deployment settings. Website publication
requires the responsible owner's explicit authorization.

## Repository scope

Keep this public repository limited to website code, required assets,
licenses and public technical documentation. Internal brand guidance,
operating context, personal preferences, private source locators and local
workspace paths belong outside this repository.
