# Flora Cao — portfolio

Static site. No build step; the only library is p5.js (from a CDN) for the portrait. Run a local server:

    python3 scripts/serve.py        → http://localhost:4321

(It supports the partial downloads Safari needs for video, and never serves stale copies.)

## Files

    index.html          homepage (identity panel + project grid)
    project.html        one template for every project → project.html?p=<slug>
    about.html          about + contact (edit the text directly in this file)
    css/style.css       the whole visual system; tokens at the top (:root)
    js/content.js       ← ALL content: name, focus list, nav, projects, sections
    js/components.js    Identity · Grid · Tile · Media · ProjectPage · Section
    js/site.js          renders the page + video autoplay/pause behaviour
    assets/portrait/    photo.jpg — source for the dot portrait
    assets/projects/<slug>/   one folder per project

## Replacing a placeholder

1. Drop the file into the project's folder, e.g. `assets/projects/cueddata/cover.mp4`.
2. In `js/content.js`, set `src` on the matching item:
   `cover: { src: 'assets/projects/cueddata/cover.mp4' }`

Each placeholder prints the suggested path in its bottom-left corner.

- Homepage covers are cropped to **3:2** (change `coverRatio` in `js/content.js` to `'16 / 9'` if you prefer).
  Export GIF / video covers around 1500 × 1000.
- `blurb` is the one-line description next to the title on the homepage.
- Add `fit: 'contain'` to a cover to show the whole image instead of cropping (used for diagrams).
- Video: `.mp4` (H.264) works everywhere; add a `.webm` first for smaller files:
  `src: ['…/cover.webm', '…/cover.mp4']`. Keep loops short (5–10 s) and silent.
- GIF / JPG / PNG / WebP work the same way — just point `src` at the file.
- Videos autoplay muted and loop, and pause when scrolled offscreen.
  Set `audio: true` on a media item to give it controls and sound instead.

## Photos

Drop photos straight from your camera into `assets/projects/<slug>/`, then run:

    zsh scripts/optimize-images.sh

It writes web-sized copies (max 2400px) into `assets/projects/<slug>/web/` — point `src` at those,
not the 5 MB originals. Originals are never touched. Videos and GIFs are not processed.

## Dot portrait

`js/pixel-portrait.js` (p5.js) rebuilds `assets/portrait/photo.jpg` from round colour dots in the
identity panel. Moving the mouse from the middle of the window to the right edge scatters the dots
across the page, behind everything; moving back reassembles the photo.

- Swap the photo: replace `assets/portrait/photo.jpg` (about 1000px wide is plenty).
- Tune it: the `CONFIG` block at the top of `js/pixel-portrait.js` (dot count and size, colour, speed, spread…).
- `lab/pixel-portrait.html` shows the same sketch on its own, centred, for testing.
- Browsers won't let a page read a photo's pixels when opened by double-clicking (`file://`),
  so preview with `python3 scripts/serve.py` — opened directly, the panel shows the plain photo instead.

## Adding a project

Copy one entry in `window.PROJECTS`, change the `slug` (used in the URL and folder name),
and add as many `sections` as it needs. Order in the array = order on the grid.
