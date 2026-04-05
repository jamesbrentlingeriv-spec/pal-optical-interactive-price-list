# PAL Optical Interactive Price List

A polished static web app for browsing PAL Optical lens pricing, filtering
categories, searching product lines, and using built-in optical calculation
tools.

<p>
  <img alt="Static HTML" src="https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JavaScript-111111">
  <img alt="Responsive UI" src="https://img.shields.io/badge/ui-responsive-111111">
  <img alt="Offline Support" src="https://img.shields.io/badge/pwa-service%20worker-111111">
  <img alt="Private Project" src="https://img.shields.io/badge/license-proprietary-111111">
</p>

## Overview

This project is a framework-free version of the PAL Optical price list
experience. It runs as a single-page static application powered by `index.html`
and `data.js`, with custom styling, category navigation, search, educational
material demos, and an `OptiCalc` utility for day-to-day lens calculations.

## Screenshots

### Light Mode

![Light mode screenshot](./FireShot%20Capture%20036%20-%20PAL%20Optical%20Interactive%20Price%20List%20-%20%5B%5D.png)

### Dark Mode

![Dark mode screenshot](./FireShot%20Capture%20037%20-%20PAL%20Optical%20Interactive%20Price%20List_%20-%20%5Bpal-optical-interactive-price-list-443610928945.us-west1.run.app%5D.png)

## Features

- Category-first lens price browsing with a dedicated left navigation column
- Fast live search for lenses, materials, and brands
- Responsive single-page layout for desktop and mobile
- Light and dark themes
- Educational material sections for lens types, coatings, and visual comparisons
- `OptiCalc` utilities for markup, decentration, MBS, and thickness estimation
- Lens thickness visualization and printable OptiCalc session receipt output
- Service worker support for core static asset caching

## Project Structure

```text
.
|- index.html          # Main application shell, styles, and runtime logic
|- data.js             # Product/category data used by the app
|- public/
|  |- sw.js            # Service worker
|  |- manifest.json    # PWA manifest
|  |- trans/           # Transition lens media assets
|  |- pal2.JPG         # Shared image asset
|  `- palpricelist.mp4 # Brand/video asset
`- package.json        # Minimal local static server script
```

## Running Locally

### Quick Open

You can open `index.html` directly in a browser.

### Recommended Local Server

For service worker behavior and a more realistic local environment:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Implementation Notes

- The app is intentionally framework-free.
- All UI logic is handled with vanilla JavaScript.
- Styling and animations are embedded directly in `index.html`.
- Product data is separated into `data.js` for easier maintenance.

## Printing

- The main page print action prints the visible price list view.
- The `OptiCalc` receipt print action prints only the session receipt and the
  lens thickness image when available.

## License

This repository is proprietary and confidential. All rights reserved.
