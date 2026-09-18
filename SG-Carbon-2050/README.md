# Carbon 2050 SG — HTML5 + Vanilla JavaScript

This is the framework-free deployment version of the Carbon 2050 SG game.

## What changed
- React and Lucide dependencies were removed.
- The UI is rendered with native HTML5 DOM + ES-module JavaScript.
- Icons are inline SVG, so there is no icon-library dependency.
- The calibrated v5 game engine is preserved in `/engine`.
- The generated Singapore visual board is included in `/assets`.

## Files
- `index.html` — website entry point
- `styles.css` — responsive visual design
- `app.js` — gameplay UI and state logic
- `engine/baseline.js` — six Singapore carbon budgets
- `engine/cards.js` — all 23 action cards
- `engine/calculateFootprint.js` — calibrated v5 calculation engine
- `assets/carbon2050-visual-board.png` — visual artwork

## Deploy
Upload the entire folder to any static host. No `npm install` or build step is needed.

Suitable hosts include:
- your existing web server / cPanel
- GitHub Pages
- Netlify
- Cloudflare Pages
- AWS S3 static hosting
- Azure Static Web Apps

### Important
Because the app uses native ES modules, serve it over HTTP/HTTPS. Do not rely on opening `index.html` directly from `file://` in all browsers.

For local testing:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Model note
Carbon 2050 SG is an educational consumption-footprint simulation. It is not an official Singapore emissions forecast.
