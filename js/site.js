/* ==========================================================================
   SITE — renders the right components for each page.
   Each HTML page sets <body data-page="home|project|about">.
   ========================================================================== */

(function () {
  'use strict';

  const page = document.body.dataset.page;
  const main = document.getElementById('main');

  document.getElementById('identity').innerHTML = C.Identity(page);

  if (page === 'home') {
    main.innerHTML = C.Grid(PROJECTS) + C.Footer();
  }

  if (page === 'project') {
    const slug = new URLSearchParams(location.search).get('p');
    const i = PROJECTS.findIndex((p) => p.slug === slug);
    if (i === -1) {
      main.innerHTML = `<article class="project"><a class="back" href="index.html">← Index</a>
        <h1 class="project__title">Not found</h1></article>`;
    } else {
      document.title = `${PROJECTS[i].title} — ${SITE.name}`;
      main.innerHTML = C.ProjectPage(PROJECTS[i], i, PROJECTS);
    }
  }

  if (page === 'about') {
    const email = document.querySelector('[data-email]');
    if (email) {
      email.href = `mailto:${SITE.email}`;
      email.textContent = SITE.email;
    }
  }

  /* ---------- Page reader ---------------------------------------------
     Native horizontal scroll with snapping (trackpads and touch just work),
     plus thumbnails, click-to-turn and arrow keys. */

  document.querySelectorAll('[data-reader]').forEach((reader) => {
    const track = reader.querySelector('.reader__track');
    const pages = [...track.children];
    const thumbs = [...reader.querySelectorAll('.reader__thumb')];
    const last = pages.length - 1;
    let page = 0; // the page we're on, or heading to (so quick repeated clicks each advance a page)
    let jumped = 0;

    const show = (i) => {
      thumbs.forEach((t, k) => t.toggleAttribute('aria-current', k === i));
      // load the neighbours ahead of time so turning is instant
      [i - 1, i + 1, i + 2].forEach((k) => {
        const img = pages[k] && pages[k].querySelector('img');
        if (img) img.loading = 'eager';
      });
    };
    const go = (i, behavior = 'smooth') => {
      page = Math.max(0, Math.min(last, i));
      if (behavior === 'instant') jumped = Date.now();
      track.scrollTo({ left: page * track.clientWidth, behavior });
      show(page);
    };

    thumbs.forEach((t, k) => t.addEventListener('click', () => go(k)));

    // click the left / right half of the page; the cursor shows which way it will go
    const side = (e) => {
      const r = track.getBoundingClientRect();
      return e.clientX - r.left < r.width / 2 ? -1 : 1;
    };
    track.addEventListener('click', (e) => go(page + side(e)));
    track.addEventListener('mousemove', (e) => {
      const d = side(e);
      track.dataset.cursor = (d < 0 && page === 0) || (d > 0 && page === last) ? '' : d < 0 ? 'prev' : 'next';
    });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(page + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(page - 1); }
    });

    // swipes / trackpad: follow wherever the scroll settles
    let settle;
    track.addEventListener(
      'scroll',
      () => {
        clearTimeout(settle);
        settle = setTimeout(() => {
          if (Date.now() - jumped < 300) return; // ignore scroll caused by our own re-alignment
          page = Math.round(track.scrollLeft / track.clientWidth);
          show(page);
        }, 120);
      },
      { passive: true }
    );

    window.addEventListener('resize', () => go(page, 'instant'));
    show(0);
  });

  /* ---------- Video behaviour -------------------------------------------
     Autoplay muted loops, but only while on screen (saves battery/CPU).
     Respects the OS "reduce motion" setting by holding on the first frame. */

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const videos = document.querySelectorAll('video[data-autoplay]');

  videos.forEach((v) => {
    v.muted = true; // property must be set for autoplay to be allowed
    if (reduceMotion) v.removeAttribute('autoplay');
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) target.play().catch(() => {});
          else target.pause();
        }),
      { rootMargin: '200px 0px' }
    );
    videos.forEach((v) => io.observe(v));
  }
})();
