/* ==========================================================================
   Pixel portrait — p5.js

   The photo is rebuilt from round colour dots. Each dot is a particle with a
   fixed HOME (its place in the photo) and a fixed SCATTER point somewhere on
   the screen. Moving the mouse from the middle of the window to the right
   edge flies the dots out across the page; moving back to the left
   reassembles the photo.

   The canvas covers the whole window, behind all site content.
   Where the image assembles:
     • inside the element marked  data-portrait="path/to/photo.jpg"  (identity panel)
     • or, if there is none, centred in the window (see lab/pixel-portrait.html)
   ========================================================================== */

(function () {
  'use strict';

  const CONFIG = {
    cols: 120,                    // dots across the photo — higher = more detail, smaller dots
    dot: 1,                    // dot diameter as a fraction of the grid cell (1 = dots touch)
    saturation: 1.3,             // colour boost — 1 = true to the photo
    wallLightness: 0.9,          // light, greyish areas brighter than this (0–1) are left empty…
    wallGreyness: 0.15,           // …if their colour is this close to grey (keeps skin and hair)
    startAt: 0.7,                 // mouse x (fraction of window) where scattering begins
    follow: 0.003,                // smoothing: how quickly the image follows the mouse (0–1, lower = slower)
    stagger: 0.7,                // spread of departure times — 0 = all leave together
    curve: 0.15,                  // how much flight paths bend
    seed: 7,                      // same seed → same scatter pattern every visit
  };

  const anchor = document.querySelector('[data-portrait]:not(body)');
  const PHOTO = anchor ? anchor.dataset.portrait : document.body.dataset.portrait;
  if (!PHOTO || !window.p5) return;

  window.pixelPortrait = new p5((p) => {
    let particles = [];
    let rows = 0;
    let imgRatio = 3 / 4;          // height ÷ width of the photo, set on load
    let target = 0, progress = 0;  // 0 = assembled, 1 = scattered
    let lastKey = '';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    p.setup = () => {
      const c = p.createCanvas(p.windowWidth, p.windowHeight);
      c.addClass('portrait-layer');
      c.attribute('aria-hidden', 'true');
      p.loadImage(PHOTO, build, fallback);
    };

    // Opened as a file:// page the browser blocks reading pixels — show the plain photo instead.
    function fallback() {
      if (anchor) anchor.innerHTML = `<img src="${PHOTO}" alt="" style="width:100%">`;
    }

    /* ---- 1. photo → grid of coloured dots → particles (once) ----------- */

    function build(img) {
      try {
        img.loadPixels();
      } catch (e) {
        return fallback();
      }
      imgRatio = img.height / img.width;
      if (anchor) anchor.style.aspectRatio = `${img.width} / ${img.height}`;

      const cols = CONFIG.cols;
      rows = Math.round(cols * imgRatio);
      const W = img.width, H = img.height, px = img.pixels;

      p.randomSeed(CONFIG.seed);
      particles = [];
      for (let y = 0; y < rows; y++) {
        const y0 = Math.floor((y * H) / rows), y1 = Math.floor(((y + 1) * H) / rows);
        for (let x = 0; x < cols; x++) {
          const x0 = Math.floor((x * W) / cols), x1 = Math.floor(((x + 1) * W) / cols);

          // average colour of this cell's area of the photo
          let r = 0, g = 0, b = 0, count = 0;
          for (let yy = y0; yy < y1; yy += 2) {
            for (let xx = x0; xx < x1; xx += 2) {
              const i = (yy * W + xx) * 4;
              r += px[i]; g += px[i + 1]; b += px[i + 2];
              count++;
            }
          }
          r /= count; g /= count; b /= count;

          // leave the bare wall empty: light and nearly grey
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          const light = (max + min) / 510, grey = (max - min) / 255;
          if (light > CONFIG.wallLightness && grey < CONFIG.wallGreyness) continue;

          // gentle saturation boost around the cell's own grey
          const avg = (r + g + b) / 3, k = CONFIG.saturation;
          const c = [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, avg + (v - avg) * k))));

          particles.push({
            color: `rgb(${c[0]},${c[1]},${c[2]})`,
            hx: (x + 0.5) / cols, hy: (y + 0.5) / rows,       // home, as a fraction of the photo
            sx: p.random(), sy: p.random(),                   // scatter point, as a fraction of the window
            delay: p.random(CONFIG.stagger),
            bend: p.random(-1, 1) * CONFIG.curve,
          });
        }
      }
      lastKey = '';
    }

    /* ---- 2. where the photo sits right now ------------------------------ */

    function homeRect() {
      if (anchor) {
        const r = anchor.getBoundingClientRect();
        return { x: r.left, y: r.top, w: r.width, h: r.width * imgRatio };
      }
      const w = Math.min(p.width * 0.7, (p.height * 0.8) / imgRatio);
      return { x: (p.width - w) / 2, y: (p.height - w * imgRatio) / 2, w, h: w * imgRatio };
    }

    // listen on the window: the canvas sits behind the page and ignores the mouse itself
    window.addEventListener('mousemove', (e) => {
      if (reduceMotion) return;
      target = Math.min(1, Math.max(0, (e.clientX / window.innerWidth - CONFIG.startAt) / (1 - CONFIG.startAt)));
    });

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      lastKey = '';
    };

    const ease = (t) => (1 - Math.cos(t * Math.PI)) / 2; // gentle ease-in-out

    /* ---- 3. draw -------------------------------------------------------- */

    p.draw = () => {
      if (!particles.length) return;

      progress += (target - progress) * CONFIG.follow;
      if (Math.abs(target - progress) < 0.0005) progress = target;

      const R = homeRect();
      // nothing moved → keep the last frame (saves battery when idle)
      const key = `${progress.toFixed(4)}|${R.x.toFixed(1)}|${R.y.toFixed(1)}|${R.w.toFixed(1)}|${p.width}|${p.height}`;
      if (key === lastKey) return;
      lastKey = key;

      const ctx = p.drawingContext;
      const dpr = p.pixelDensity();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, p.width, p.height);

      const radius = ((R.w / CONFIG.cols) * CONFIG.dot) / 2;
      const span = 1 - CONFIG.stagger;
      for (const q of particles) {
        const hx = R.x + q.hx * R.w, hy = R.y + q.hy * R.h;
        const local = ease(Math.min(1, Math.max(0, (progress - q.delay) / span)));

        let x = hx, y = hy;
        if (local > 0) {
          const dx = q.sx * p.width - hx, dy = q.sy * p.height - hy;
          const arc = Math.sin(local * Math.PI) * q.bend; // bow the path sideways
          x = hx + dx * local - dy * arc;
          y = hy + dy * local + dx * arc;
        }

        ctx.fillStyle = q.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };
  });
})();
