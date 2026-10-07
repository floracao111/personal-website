/* ==========================================================================
   COMPONENTS — small functions that return HTML strings.
   Identity · Grid · Tile · Media · ProjectPage · Section
   ========================================================================== */

(function () {
  'use strict';

  const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const isVideo = (src) => /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(src);
  const videoType = (src) => (/\.webm/i.test(src) ? 'video/webm' : 'video/mp4');

  /* ---------- Media ------------------------------------------------------ */

  function Placeholder({ label, hint, ratio }) {
    return `
      <div class="ph" aria-hidden="true">
        <span class="ph__label">${esc(label || 'Placeholder')}</span>
        <span class="ph__cross"></span>
        <span class="ph__foot">
          <span>${esc(hint || '')}</span>
          <span>${esc((ratio || '').replace(/\s/g, ''))}</span>
        </span>
      </div>`;
  }

  // Vimeo / YouTube player URL → clean embed (no title/byline overlay, no tracking where possible)
  function embedSrc(url) {
    const u = new URL(url, location.href);
    if (/vimeo\.com$/.test(u.hostname)) {
      ['title', 'byline', 'portrait'].forEach((k) => u.searchParams.set(k, '0'));
      u.searchParams.set('dnt', '1');
    }
    return u.href;
  }

  /* ---------- Page reader (PDF / portfolio pages) ---------------------- */

  // item: { pages: ['…/page-01.jpg', …], ratio: '2000 / 1414', alt }
  // A row of page previews on top (click to jump; the bright one is the current page),
  // the current page large below: click its left/right half, swipe, or use ← → to turn.
  function Reader(item) {
    const pages = item.pages.length ? item.pages : [null, null, null]; // placeholders until pages are added
    const ratio = item.ratio || '16 / 9';
    const n = pages.length;
    const label = item.alt || 'Pages';
    return `
      <figure class="reader" data-reader style="--page-ratio:${ratio}" aria-roledescription="carousel" aria-label="${esc(label)}">
        <p class="reader__hint">
          <span class="reader__hint-mouse">Scroll</span><span class="reader__hint-touch">Swipe</span> to read about this project →
        </p>
        ${
          item.pages.length > 1
            ? `<div class="reader__thumbs">${item.pages
                .map(
                  (src, i) =>
                    `<button class="reader__thumb" aria-label="Page ${i + 1} of ${n}"><img src="${esc(src)}" alt="" draggable="false"></button>`
                )
                .join('')}</div>`
            : ''
        }
        <div class="reader__track" tabindex="0" aria-label="${esc(label)} — use the arrow keys to turn pages">
          ${pages
            .map(
              (src, i) => `
            <div class="reader__page" role="group" aria-label="Page ${i + 1} of ${n}">
              ${
                src
                  ? `<img src="${esc(src)}" alt="${esc(label)} — page ${i + 1}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async" draggable="false">`
                  : Placeholder({ label: `Page ${i + 1}`, hint: 'scripts/normalize-pages.sh', ratio })
              }
            </div>`
            )
            .join('')}
        </div>
      </figure>`;
  }

  // item: { src, embed, poster, alt, caption, ratio, audio, hint, fit, position }
  //   position: which part stays in view when the frame crops it, e.g. 'left', 'right', 'top', '30% 50%'
  //   embed: a Vimeo/YouTube player URL (e.g. https://player.vimeo.com/video/123?h=abc) — plays with sound and controls
  // opts: { ratio, label, className, fit, style }
  function Media(item = {}, opts = {}) {
    const srcs = [].concat(item.src || []).filter(Boolean);
    const ratio = item.ratio || opts.ratio || (srcs.length ? '' : '16 / 9'); // embeds and placeholders default to 16:9
    const alt = item.alt || opts.label || '';
    const pos = item.position ? ` style="object-position:${esc(item.position)}"` : '';
    let inner;

    if (item.pages) return Reader(item);
    if (item.embed) {
      inner = `<iframe src="${esc(embedSrc(item.embed))}" title="${esc(alt || 'Video')}" loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    } else if (!srcs.length) {
      inner = Placeholder({ label: alt, hint: item.hint, ratio });
    } else if (srcs.some(isVideo)) {
      const attrs = item.audio
        ? 'controls playsinline preload="metadata"'
        : 'autoplay muted loop playsinline preload="metadata" data-autoplay';
      inner = `<video ${attrs}${pos}${item.poster ? ` poster="${esc(item.poster)}"` : ''}${alt ? ` aria-label="${esc(alt)}"` : ''}>
        ${srcs.map((s) => `<source src="${esc(s)}" type="${videoType(s)}">`).join('')}
      </video>`;
    } else {
      inner = `<img src="${esc(srcs[0])}" alt="${esc(alt)}"${pos} loading="lazy" decoding="async">`;
    }

    const fit = item.fit || opts.fit;
    const cls = ['media', opts.className, fit === 'contain' ? 'media--contain' : ''].filter(Boolean).join(' ');
    return `
      <figure class="${cls}"${opts.style ? ` style="${opts.style}"` : ''}>
        <div class="media__frame${ratio ? ' media__frame--fixed' : ''}"${ratio ? ` style="aspect-ratio:${ratio}"` : ''}>${inner}</div>
        ${item.caption ? `<figcaption class="media__caption">${item.caption}</figcaption>` : ''}
      </figure>`;
  }

  /* ---------- Identity panel -------------------------------------------- */

  function Identity(active) {
    const s = window.SITE;
    return `
      <a class="identity__name${s.nameImage ? ' identity__name--image' : ''}" href="./">${
        s.nameImage ? `<img src="${esc(s.nameImage)}" alt="${esc(s.name)}">` : esc(s.name)
      }</a>
      <div class="identity__info">
        ${(s.focus || []).length ? `<ul class="identity__focus">${s.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
        <nav class="identity__nav" aria-label="Primary">
          ${s.nav
            .map((n) => `<a href="${esc(n.href)}"${n.id === active ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`)
            .join('')}
        </nav>
      </div>
      ${
        s.portrait.dots
          ? `<div class="identity__portrait identity__portrait--dots" data-portrait="${esc(s.portrait.dots)}" role="img" aria-label="${esc(s.portrait.alt)}"></div>`
          : s.portrait.src
          ? `<div class="identity__portrait">${Media(s.portrait, { ratio: '4 / 5', fit: 'contain' })}</div>`
          : ''
      }`;
  }

  /* ---------- Grid + tile ----------------------------------------------- */

  function Tile(p) {
    return `
      <li class="grid__item">
        <a class="tile" href="${encodeURIComponent(p.slug)}">
          ${Media(p.cover, { ratio: window.SITE.coverRatio || '3 / 2', label: p.title, className: 'tile__media' })}
          ${
            p.logosOnCover && p.logos
              ? `<span class="tile__logos">${p.logos
                  .map((l) => `<img src="${esc(l.src)}" alt="${esc(l.alt || '')}" style="height:${l.coverHeight || Math.round((l.height || 26) * 0.55)}px">`)
                  .join('')}</span>`
              : ''
          }
          ${p.status ? `<span class="tile__status">${esc(p.status)}</span>` : ''}
          <p class="tile__caption">
            <span class="tile__title">${esc(p.title)}</span>
            ${p.blurb ? `<span class="tile__blurb">${esc(p.blurb)}</span>` : ''}
          </p>
        </a>
      </li>`;
  }

  function Grid(projects) {
    return `<ol class="grid" aria-label="Projects">${projects.map((p) => Tile(p)).join('')}</ol>`;
  }

  // copyright line at the bottom of the homepage and every project page
  const Footer = () =>
    `<footer class="project__foot">${esc(window.SITE.name)} © ${new Date().getFullYear()}. All Rights Reserved</footer>`;

  /* ---------- Project page ---------------------------------------------- */

  const check = '<svg class="gap__icon gap__icon--yes" viewBox="0 0 16 16" aria-label="Yes"><path d="M3 8.5l3.2 3.2L13 4.8"/></svg>';
  const cross = '<svg class="gap__icon gap__icon--no" viewBox="0 0 16 16" aria-label="No"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>';

  // table: { columns: ['Open Source', …], rows: [['Yale OpenHand', true, false, …], …], highlight: 'CuedKit' }
  function GapTable(t) {
    return `
      <div class="gap">
        <table>
          <thead><tr><td></td>${t.columns.map((c) => `<th scope="col">${c}</th>`).join('')}</tr></thead>
          <tbody>${t.rows
            .map(
              ([name, ...cells]) =>
                `<tr${name === t.highlight ? ' class="gap__highlight"' : ''}><th scope="row">${esc(name)}</th>${cells
                  .map((v) => `<td>${v ? check : cross}</td>`)
                  .join('')}</tr>`
            )
            .join('')}</tbody>
        </table>
      </div>`;
  }

  // stat: { value: '73%', text, source }
  const Stat = (st) => `
    <div class="stat">
      <p class="stat__value">${esc(st.value)}</p>
      <div>
        <p class="stat__text">${st.text}</p>
        ${st.source ? `<p class="stat__source">${st.source}</p>` : ''}
      </div>
    </div>`;

  // list: [{ term, text }, …]
  const List = (items) =>
    `<dl class="qa">${items.map((q) => `<div><dt>${esc(q.term)}</dt><dd>${q.text}</dd></div>`).join('')}</dl>`;

  function Section(s) {
    const paras = [].concat(s.text || []);
    const after = [].concat(s.textAfter || []);
    const hasText = s.label || s.heading || paras.length || s.quote || s.stat || s.list || s.table;
    const media = s.media || [];
    return `
      <section class="block">
        ${
          hasText
            ? `<div class="block__text">
                 ${s.label ? `<p class="label">${esc(s.label)}</p>` : ''}
                 <div class="block__body">
                   ${s.heading ? `<h3>${esc(s.heading)}</h3>` : ''}
                   ${paras.map((t) => `<p>${t}</p>`).join('')}
                   ${s.quote ? `<p class="quote">${s.quote}</p>` : ''}
                   ${s.stat ? Stat(s.stat) : ''}
                   ${s.list ? List(s.list) : ''}
                   ${s.table ? GapTable(s.table) : ''}
                   ${after.map((t) => `<p>${t}</p>`).join('')}
                 </div>
               </div>`
            : ''
        }
        ${
          media.length
            ? s.columns === 'row'
              ? // justified row: same height, each item keeps its full shape (set `ratio` on every item)
                `<div class="block__media block__media--row">${media
                  .map((m) => {
                    const [w, h] = String(m.ratio || '1 / 1').split('/').map(Number);
                    return Media(m, { style: `flex: ${(w / h).toFixed(4)} 1 0` });
                  })
                  .join('')}</div>`
              : `<div class="block__media cols-${s.columns || 1}">${media.map((m) => Media(m)).join('')}</div>`
            : ''
        }
      </section>`;
  }

  function ProjectPage(p, i, all) {
    const meta = Object.entries(p.meta || {});
    const hero = p.hero === false ? null : p.hero || p.cover || {}; // hero: false → page starts with the sections

    return `
      <article class="project">
        <header class="project__head">
          <div class="project__titlerow">
            <h1 class="project__title">${
              Array.isArray(p.logo) // several pieces joined edge to edge, e.g. 'Cued' + 'Data'
                ? `<span class="project__logo-set" role="img" aria-label="${esc(p.title)}">${p.logo
                    .map((l) => `<img class="project__logo" src="${esc(l.src)}" alt=""${l.scale ? ` style="--logo-scale:${l.scale}"` : ''}>`)
                    .join('')}</span>`
                : p.logo
                ? `<img class="project__logo" src="${esc(p.logo)}" alt="${esc(p.title)}">`
                : esc(p.title)
            }</h1>
            ${
              p.logos
                ? `<div class="project__logos">${p.logos
                    .map((l) => `<img src="${esc(l.src)}" alt="${esc(l.alt || '')}"${l.height ? ` style="height:${l.height}px"` : ''}>`)
                    .join('')}</div>`
                : ''
            }
          </div>
          ${p.preface ? `<p class="project__preface">${p.preface}</p>` : ''}
          ${p.summary ? `<p class="project__summary">${p.summary}</p>` : ''}
          ${
            meta.length
              ? `<dl class="project__meta">${meta
                  .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${
                    v && v.href ? `<a href="${esc(v.href)}">${esc(v.text)}</a>` : esc(v)
                  }</dd></div>`)
                  .join('')}</dl>`
              : ''
          }
          ${
            (p.tags || []).length
              ? `<ul class="project__tags">${p.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join('')}</ul>`
              : ''
          }
        </header>

        ${p.intro ? Section(p.intro) : '' /* a section shown before the hero, e.g. background */}

        ${
          Array.isArray(hero) // several images side by side
            ? `<div class="project__hero block__media cols-${hero.length}">${hero.map((m) => Media(m)).join('')}</div>`
            : hero
            ? Media({ alt: `${p.title} — hero`, ...hero }, { className: 'project__hero' })
            : ''
        }

        ${(p.sections || []).map(Section).join('')}

        ${Footer()}
      </article>`;
  }

  window.C = { Media, Identity, Grid, Tile, ProjectPage, Section, Footer };
})();
