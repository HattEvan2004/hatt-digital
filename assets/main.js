(function () {
  'use strict';
  document.documentElement.classList.add('js');
  /* HD-BUILD: safari-particle-reveal-reliable */

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  /* ---- year ---- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- mobile menu ---- */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    if (!navLinks.id) navLinks.id = 'navLinks';
    menuBtn.setAttribute('aria-controls', navLinks.id);
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ---- scroll reveal for in-page sections ---- */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  /* ---- FAQ (accessible accordion) ---- */
  document.querySelectorAll('.faq-q').forEach(function (q, i) {
    var item = q.parentElement, ans = item.querySelector('.faq-a');
    if (ans) {
      /* wire button <-> panel so screen readers announce the relationship
         and skip the collapsed answer text until it is opened */
      if (!q.id) q.id = 'faq-q-' + (i + 1);
      if (!ans.id) ans.id = 'faq-panel-' + (i + 1);
      ans.setAttribute('role', 'region');
      ans.setAttribute('aria-labelledby', q.id);
      ans.setAttribute('aria-hidden', 'true');
      q.setAttribute('aria-controls', ans.id);
    }
    q.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open);
      if (ans) {
        ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
        ans.setAttribute('aria-hidden', open ? 'false' : 'true');
      }
    });
  });

  /* keep open FAQ answers correctly sized when the viewport changes */
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-item.open .faq-a').forEach(function (ans) {
      ans.style.maxHeight = ans.scrollHeight + 'px';
    });
  }, { passive: true });

  /* The contact + quote forms are wired to Forminit in assets/forminit.js. */

  var header = document.querySelector('header');
  var isHome = document.body.classList.contains('home');

  /* =====================================================
     HOMEPAGE HERO
     Sales copy on the left, a business-value preview card on
     the right. A light staggered entrance eases the eyebrow,
     headline, sub, buttons, and preview in on load. The nav is
     hidden over the dark hero and drops in on the next section.
  ===================================================== */
  var intro = document.getElementById('intro');

  if (!intro) {
    /* Non-home pages: normal sticky header behaviour */
    if (header) {
      var hs = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
      hs(); window.addEventListener('scroll', hs, { passive: true });
    }
    return;
  }

  var words = Array.prototype.slice.call(intro.querySelectorAll('.sh-word'));
  var builds = Array.prototype.slice.call(intro.querySelectorAll('[data-build]'));

  function on(el, yes) { if (el) el.classList.toggle('built', yes); }

  function revealAll() {
    builds.forEach(function (el) { on(el, true); });
    words.forEach(function (w) { on(w, true); });
  }

  /* The nav is hidden completely over the dark hero + code-build intro,
     then drops in as a solid white bar the moment the white "Why it matters"
     section reaches the top of the viewport — and stays for the rest of the
     page. Driven off the section itself (not a fixed pixel) so it lands the
     same on desktop and mobile. Runs on every load (animated or reduced). */
  function bindHeaderReveal() {
    if (!header) return;
    var whyMatters = document.getElementById('why-it-matters');
    if (!whyMatters) return;

    var ticking = false;
    var sync = function () {
      ticking = false;
      var trigger = header.offsetHeight || 76;
      var reached = whyMatters.getBoundingClientRect().top <= trigger;
      header.classList.toggle('is-visible', reached);
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(sync); }
    };

    sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    /* Belt-and-suspenders: an IntersectionObserver wakes the scroll sync up
       so the bar still settles correctly if the section size shifts. */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(sync, { threshold: [0, 0.01, 1] }).observe(whyMatters);
    }
  }

  /* ---------- REDUCED MOTION: show the finished hero instantly ---------- */
  if (reduce) {
    revealAll();
    bindHeaderReveal();
    return;
  }

  /* ---------- Entrance ----------
     First load in a session: the spec-field canvas runs a particle formation
     (see BRAND SPEC FIELD below) that gathers the drifting specs into the
     outlines of the headline, preview card, and CTA. The real HTML fades in
     near the end of that gather, while the particles hold on the outlines,
     then everything releases into a calm ambient drift. Repeat loads in the
     same session skip the formation and play a quick stagger instead.
     Timings live in window.__hdHeroForm so the canvas and the content
     reveal are driven off the SAME requestAnimationFrame clock — never off
     independent setTimeouts — so the two can't drift out of sync if the
     browser is slow to paint the first frame (a slow font/CSS fetch, a
     throttled device, etc). Whatever the delay before the first real frame,
     content still only appears after the particle field has actually had
     frames to gather in. */
  bindHeaderReveal();

  /* The particle formation now plays on EVERY load. The old once-per-session
     throttle (a sessionStorage 'hdHeroIntro' flag) was removed: on Safari a
     returning tab kept that flag set, so every reload skipped the formation and
     the hero appeared with no reveal at all — which read as a broken animation
     rather than a throttle. ?hero=replay / #hero-replay are still honoured as an
     explicit "force the intro" switch (and clear any legacy flag), but they are
     no longer required — the intro is not throttled. */
  var forceReplay = /(?:[?&]hero=replay\b|#hero-replay\b)/i.test(
    (location.search || '') + (location.hash || ''));
  if (forceReplay) { try { sessionStorage.removeItem('hdHeroIntro'); } catch (e) {} }
  var vw = window.innerWidth;
  var F = {
    active: !!document.getElementById('introSpecs'),
    // gather / hold / lock-in / settle, tuned so the whole intro reads as a
    // real reveal: ~3.2-4s desktop, ~2.8-3.5s tablet, ~2.2-3s mobile.
    form: vw < 600 ? 1500 : vw < 1000 ? 1850 : 2100,   // gather (ms)
    hold: vw < 600 ? 430 : vw < 1000 ? 520 : 600,      // lock on the outlines
    release: vw < 600 ? 670 : vw < 1000 ? 780 : 900    // ease back into drift
  };
  window.__hdHeroForm = F;

  var revealed = false;
  function finish() {
    if (revealed) return;
    revealed = true;
    revealAll();
  }

  function play() {
    var seq = [intro.querySelector('[data-build="eyebrow"]')];
    words.forEach(function (w) { seq.push(w); });
    seq.push(intro.querySelector('[data-build="sub"]'));
    seq.push(intro.querySelector('[data-build="cta"]'));
    var preview = intro.querySelector('[data-build="preview"]');

    if (!F.active) {
      /* repeat visit this session: no particle wait to sync with — just the
         quick stagger, same as before */
      var base = 90, gap = 55;
      seq.forEach(function (el, i) {
        if (el) setTimeout(function () { on(el, true); }, base + i * gap);
      });
      setTimeout(function () { on(preview, true); }, 240);
      setTimeout(finish, base + seq.length * gap + 400);
      return;
    }

    /* First load: the headline/sub/cta/preview fade in staggered across the
       "hold" window — i.e. only once the particles have finished gathering
       into the hero outlines — so the content reads as resolving out of the
       particles, never ahead of them. Driven off rAF timestamps (the same
       clock formStep() below uses), not wall-clock delays. */
    var startAt = F.form;
    var span = Math.max(F.hold - 60, 120);
    var gap = seq.length > 1 ? span / (seq.length + 1) : span * 0.5;
    var t0 = null;

    function tick(ts) {
      if (revealed) return;
      try {
        if (t0 === null) t0 = ts;
        var elapsed = ts - t0;
        seq.forEach(function (el, i) {
          if (el && elapsed >= startAt + i * gap) on(el, true);
        });
        if (preview && elapsed >= startAt + gap * 1.4) on(preview, true);
        if (elapsed < startAt + span + 300) { requestAnimationFrame(tick); return; }
      } catch (e) { /* fall through to finish() below */ }
      finish();
    }
    requestAnimationFrame(tick);
  }

  try {
    /* Two rAF ticks so layout + fonts settle, then run the timeline off the
       same animation-frame clock as the particle field. */
    requestAnimationFrame(function () { requestAnimationFrame(play); });
  } catch (e) { finish(); }

  /* Hard safety net: whatever else happens (a thrown error, a stalled tab,
     an rAF that never fires), never leave the hero permanently hidden. */
  setTimeout(finish, F.form + F.hold + F.release + 1500);
})();

/* =====================================================
   PREMIUM PASS v2 — stagger + cursor spotlight
   Self-contained; runs on every page. Respects reduced motion.
===================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* staggered entrance: children of [data-stagger] reveal in sequence */
  if (!reduce) {
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      var step = parseFloat(group.getAttribute('data-stagger')) || 0.08;
      var kids = group.querySelectorAll(':scope > .rv, :scope > * > .rv');
      kids.forEach(function (el, i) {
        if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', (i * step).toFixed(2) + 's');
      });
    });
  }

  /* cursor spotlight: track pointer over .spot + the main card families */
  if (!reduce && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.spot, .tile, .appr, .get, .tpoint, .case').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }
})();

/* =====================================================
   HATT DIGITAL — BRAND SPEC FIELD
   A subtle animated background accent for the homepage
   hero: small glowing rounded-square "logo specs" drift
   along loose curved paths, softly cluster and separate,
   and leave gentle comet trails. Canvas + rAF, no deps.
   On the first load of a session the specs open with a
   short formation intro: they sweep inward along curved
   paths onto perimeter points traced around the real
   headline, preview card, and CTA rects, hold there while
   the HTML content resolves in, then release into a calmer
   ambient drift. Repeat loads skip straight to the drift.
   Lives behind the hero content (pointer-events:none),
   is responsive, and respects prefers-reduced-motion by
   falling back to a static spec scatter.
===================================================== */
(function () {
  'use strict';
  /* The whole field runs inside a try/catch: it's a purely decorative
     background layer, so a failure here (an odd browser, a canvas quirk)
     must never take the rest of the page's scripts down with it — the
     hero content reveal above is fully independent of this succeeding.
     But it must NOT fail silently: a swallowed error is exactly why the reveal
     "just vanished" on Safari with nothing to go on. So every failure path both
     warns to the console (temporary diagnostics) AND calls heroFallback(), which
     guarantees a clean CSS fade/slide reveal of the hero (html.hero-fallback). */
  function warn(msg, e) {
    try { (console.warn || console.log).call(console, '[hero-specs] ' + msg, e || ''); } catch (_) {}
  }
  function heroFallback(reason, e) {
    try { document.documentElement.classList.add('hero-fallback'); } catch (_) {}
    if (reason) warn(reason, e);
  }
  try {
  var intro = document.getElementById('intro');
  var canvas = document.getElementById('introSpecs');
  if (!intro || !canvas) return;
  var ctx = null;
  try { ctx = canvas.getContext('2d'); } catch (e) { ctx = null; }
  if (!ctx) { heroFallback('2D canvas context unavailable — revealing hero via CSS fallback'); return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hoverable = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* Hatt Digital logo palette — bright cyan through medium blue.
     The deep navies are kept for the larger "block" specs so they
     read as hollow logo pixels rather than vanishing on the dark bg. */
  var COLORS = [
    [20, 184, 255],   // bright cyan   #14B8FF
    [63, 208, 255],   // lighter cyan  #3FD0FF
    [18, 103, 255],   // medium royal  #1267FF
    [31, 123, 255]    // medium blue   #1F7BFF
  ];

  var W = 0, H = 0, dpr = 1;
  /* VH is the *visible* height of the hero (the viewport), which on phones and
     portrait tablets is much shorter than the full canvas: the stacked hero
     column makes the canvas ~1300px tall while only ~700-850px is on screen.
     Particles spawn and wrap within VH, not H, so the whole budget stays in
     the band the visitor can actually see (otherwise a third of them scatter
     below the fold and the formation reads as almost nothing on mobile). On
     desktop VH === H, so nothing changes there. */
  var VH = 0;
  var specs = [];
  var pX = 0, pY = 0, cX = 0, cY = 0;   // pointer parallax (target / eased)
  var raf = null, running = false, last = 0;

  /* Formation intro (set up by the hero IIFE above): on the first load of a
     session the specs gather onto perimeter points traced around the real
     headline / preview card / CTA rects, hold there while the HTML resolves
     in, then release back into the ambient drift. mode walks
     form → hold → release → ambient; mT accumulates frame time so a hidden
     tab pauses rather than skips the sequence. */
  var F = window.__hdHeroForm || { active: false };
  var mode = 'ambient', mT = 0;
  var calm = 0.75;                       // post-intro drift is calmer than the gather

  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[(Math.random() * a.length) | 0]; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function count() {
    var w = window.innerWidth;
    if (w < 600) return 30;    // mobile: lighter than desktop, but dense enough to read
    if (w < 1000) return 42;   // tablet: between mobile and desktop
    return 52;                 // desktop (35–60)
  }

  function makeSpec() {
    var z = Math.random();                       // depth: 0 far … 1 near
    var roll = Math.random();
    var cat = roll < 0.70 ? 'small' : roll < 0.92 ? 'mid' : 'block';
    var base = cat === 'small' ? rand(2, 4.5) : cat === 'mid' ? rand(5.5, 9) : rand(12, 18);
    var s = {
      x: Math.random() * W,
      y: Math.random() * VH,               // stay in the visible band (see VH note)
      z: z,
      cat: cat,
      size: base * (0.6 + z * 0.85),
      rot: rand(0, Math.PI),
      rotSpeed: rand(-0.16, 0.16) * (cat === 'block' ? 0.4 : 1),
      phase: rand(0, Math.PI * 2),
      color: pick(COLORS),
      alpha: clamp((cat === 'block' ? rand(0.22, 0.4) : rand(0.28, 0.7)) * (0.5 + z * 0.6), 0, 0.82),
      trail: [],
      tlen: cat === 'small' ? 5 : cat === 'mid' ? 6 : 3
    };
    s.baseAlpha = s.alpha;               // formation extras fade out from this
    return s;
  }

  /* WebKit/iOS silently refuse to render a canvas whose backing store is too
     large — they paint nothing at all (a classic "works in Chrome, blank in
     Safari" trap). The tall dvh hero on a 3x phone can push the backing store
     high, so cap the total area AND each dimension by scaling DPR down before it
     can cross the ceiling, guaranteeing a paintable surface on every engine. */
  var MAX_CANVAS_AREA = 16000000;   // just under iOS's ~16.7M-px canvas limit
  var MAX_CANVAS_DIM = 8192;        // and its per-side texture ceiling
  function resize() {
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    /* Cap DPR at 2: keeps the canvas crisp on 3x phones without quadrupling
       the fill cost (3x backing store on a tall hero is needlessly heavy). */
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var area = W * dpr * H * dpr;
    if (area > MAX_CANVAS_AREA) dpr = Math.max(1, dpr * Math.sqrt(MAX_CANVAS_AREA / area));
    var maxDim = Math.max(W, H) * dpr;
    if (maxDim > MAX_CANVAS_DIM) dpr = Math.max(1, dpr * (MAX_CANVAS_DIM / maxDim));
    /* Visible band: how much of the (possibly very tall) canvas is on screen.
       Clamp to the canvas so it never exceeds H. Uses innerHeight, which is a
       stable, layout-ready number on mobile Safari (unlike a CSS 100vh read). */
    var vv = window.innerHeight || H;
    var top = r.top;                       // canvas top relative to viewport
    VH = Math.max(1, Math.min(H, vv - (top < 0 ? 0 : top)));
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function build() {
    resize();
    var c = count();
    specs = [];
    for (var i = 0; i < c; i++) specs.push(makeSpec());
  }

  /* ---- formation intro: target maps traced around the real hero DOM ---- */
  function easeIO(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function extraCount() {                // temporary extra specs, removed on release
    var w = window.innerWidth;
    if (w < 600) return 20;              // mobile: enough extras to trace the outline
    if (w < 1000) return 26;
    return 34;
  }

  /* Perimeter points around the headline, preview card, and CTA block, in
     canvas coordinates. Rects are clipped to the visible viewport so on
     phones (where the card sits below the fold) the formation only traces
     what the visitor can actually see. Elements still waiting on their
     reveal carry an 18px translateY, so unbuilt [data-build] rects are
     lifted back to their final resting position.

     Points are handed out in proportion to each box's *visible* perimeter,
     not by fixed per-group weights. This matters on portrait phones: the
     preview card is mostly below the fold, so a fixed weight would spend a
     third of the budget on a thin clipped sliver and starve the headline —
     the element that actually carries the reveal. Weighting by visible
     perimeter keeps the density where the structure reads. */
  function heroTargets(total) {
    var cr = canvas.getBoundingClientRect();
    var vBot = Math.min(cr.bottom, window.innerHeight);
    var sels = ['.sh-title', '.hero-preview', '.sh-cta'];
    var boxes = [];
    var periSum = 0;
    sels.forEach(function (sel) {
      var el = intro.querySelector(sel);
      if (!el) return;
      var r = el.getBoundingClientRect();
      var lift = el.hasAttribute('data-build') && !el.classList.contains('built') ? 18 : 0;
      var top = Math.max(r.top - lift, cr.top);
      var bot = Math.min(r.bottom - lift, vBot);
      if (bot - top < 46) return;        // essentially offscreen: skip this group
      var box = { x0: r.left - cr.left, y0: top - cr.top, w: r.width, h: bot - top };
      box.peri = 2 * (box.w + box.h);
      periSum += box.peri;
      boxes.push(box);
    });
    var pts = [];
    if (!boxes.length || periSum <= 0) return pts;
    boxes.forEach(function (box) {
      var w = box.w, h = box.h, x0 = box.x0, y0 = box.y0, peri = box.peri;
      /* share of the budget ∝ this box's visible perimeter, min 8 so even a
         small CTA still reads as an outline rather than a few stray dots */
      var n = Math.max(8, Math.round(total * (peri / periSum)));
      for (var i = 0; i < n; i++) {
        var d = ((i + rand(0, 0.75)) / n) * peri;
        var x, y;
        if (d < w) { x = x0 + d; y = y0; }
        else if (d < w + h) { x = x0 + w; y = y0 + d - w; }
        else if (d < w * 2 + h) { x = x0 + (w * 2 + h - d); y = y0 + h; }
        else { x = x0; y = y0 + (peri - d); }
        pts.push([x + rand(-4, 4), y + rand(-4, 4)]);
      }
    });
    return pts;
  }

  function buildFormation() {
    var pts = heroTargets(specs.length + extraCount());
    if (!pts.length) return false;
    for (var i = pts.length - 1; i > 0; i--) {           // shuffle: groups mix organically
      var j = (Math.random() * (i + 1)) | 0, t = pts[i]; pts[i] = pts[j]; pts[j] = t;
    }
    while (specs.length < pts.length) {
      var ex = makeSpec(); ex.tmp = true; specs.push(ex);
    }
    var mob = window.innerWidth < 600;
    for (var k = 0; k < specs.length; k++) {
      var s = specs[k];
      if (k < pts.length) {
        s.free = false;
        s.sx = s.x; s.sy = s.y;
        s.tx = pts[k][0]; s.ty = pts[k][1];
        var dx = s.tx - s.sx, dy = s.ty - s.sy, L = Math.hypot(dx, dy) || 1;
        s.nx = -dy / L; s.ny = dx / L;                   // perpendicular for the curved bow
        s.bow = rand(-1, 1) * Math.min(L * 0.22, mob ? 30 : 60);
        s.delay = rand(0, 0.22);
        s.rot0 = s.rot;
      } else {
        s.free = true;                                   // no target: keeps drifting softly
      }
    }
    return true;
  }

  /* rounded-square path (with manual fallback for older engines) */
  function rsPath(x, y, s, r) {
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, s, s, r); return; }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + s, y, x + s, y + s, r);
    ctx.arcTo(x + s, y + s, x, y + s, r);
    ctx.arcTo(x, y + s, x, y, r);
    ctx.arcTo(x, y, x + s, y, r);
    ctx.closePath();
  }

  function square(x, y, size, rot, col, alpha, glow, cat) {
    if (alpha <= 0.01 || size < 0.4) return;
    var rgb = col[0] + ',' + col[1] + ',' + col[2];
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    rsPath(-size / 2, -size / 2, size, Math.min(size * 0.32, 4));
    if (glow) {
      ctx.shadowColor = 'rgba(' + rgb + ',0.55)';
      ctx.shadowBlur = cat === 'block' ? 9 : 6;
    }
    if (cat === 'block') {
      ctx.globalAlpha = alpha * 0.5;
      ctx.fillStyle = 'rgb(' + rgb + ')';
      ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = 'rgb(' + rgb + ')';
      ctx.stroke();
    } else {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgb(' + rgb + ')';
      ctx.fill();
    }
    ctx.restore();
  }

  function pushTrail(s) {
    s.trail.push(s.x, s.y);
    if (s.trail.length > (s.tlen + 1) * 2) s.trail.splice(0, 2);
  }

  /* loose curved drift: layered sines create natural convergence
     (clustering) and divergence (separation) zones over time.
     k scales the whole motion (1 = original field, calm < 1 = post-intro). */
  function driftOne(s, dt, time, k) {
    var m = 44;
    var sp = 0.4 + s.z * 0.9;
    var fx = Math.sin(s.y * 0.0042 + time * 0.16 + s.phase);
    var fy = Math.cos(s.x * 0.0040 - time * 0.13 + s.phase * 1.3);
    s.x += (fx * 13 + 9) * k * sp * dt;    // gentle global drift right…
    s.y += (fy * 13 - 6) * k * sp * dt;    // …and slightly up
    s.rot += s.rotSpeed * dt * k;

    /* wrap within the visible band (VH), not the full canvas height, so the
       ambient drift stays where it can be seen on a tall mobile hero */
    var wrapped = false;
    if (s.x < -m) { s.x = W + m; wrapped = true; }
    else if (s.x > W + m) { s.x = -m; wrapped = true; }
    if (s.y < -m) { s.y = VH + m; wrapped = true; }
    else if (s.y > VH + m) { s.y = -m; wrapped = true; }

    if (wrapped) { s.trail.length = 0; }
    pushTrail(s);
  }

  function stepAmbient(dt, time, k) {
    for (var i = 0; i < specs.length; i++) driftOne(specs[i], dt, time, k);
  }

  /* formation timeline: gather → hold on the outlines → release into drift */
  function formStep(dt, time) {
    mT += dt;
    var i, s;
    if (mode === 'form') {
      var p = clamp(mT / (F.form / 1000), 0, 1);
      for (i = 0; i < specs.length; i++) {
        s = specs[i];
        if (s.free) { driftOne(s, dt, time, calm); continue; }
        var q = clamp((p - s.delay) / (1 - s.delay), 0, 1);
        var e = easeIO(q);
        var bow = Math.sin(Math.PI * e) * s.bow + (1 - e) * Math.sin(time * 1.4 + s.phase) * 6;
        s.x = s.sx + (s.tx - s.sx) * e + s.nx * bow;
        s.y = s.sy + (s.ty - s.sy) * e + s.ny * bow;
        s.rot = s.rot0 * (1 - e);          // squares align as they lock in
        pushTrail(s);
      }
      if (p >= 1) { mode = 'hold'; mT = 0; }
    } else if (mode === 'hold') {
      for (i = 0; i < specs.length; i++) {
        s = specs[i];
        if (s.free) { driftOne(s, dt, time, calm); continue; }
        s.x = s.tx + Math.sin(time * 2.2 + s.phase) * 1.1;
        s.y = s.ty + Math.cos(time * 2.0 + s.phase * 1.3) * 1.1;
        pushTrail(s);
      }
      if (mT >= F.hold / 1000) { mode = 'release'; mT = 0; }
    } else {                               // release: drift ramps back in
      var rp = easeIO(clamp(mT / (F.release / 1000), 0, 1));
      for (i = 0; i < specs.length; i++) {
        s = specs[i];
        driftOne(s, dt, time, (s.free ? 1 : rp) * calm);
        if (s.tmp) s.alpha = s.baseAlpha * (1 - rp);
      }
      if (rp >= 1) {
        specs = specs.filter(function (sp) { return !sp.tmp; });
        mode = 'ambient'; mT = 0;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineJoin = 'round';
    for (var i = 0; i < specs.length; i++) {
      var s = specs[i];
      var ox = cX * (0.4 + s.z) * 16;
      var oy = cY * (0.4 + s.z) * 16;
      var tr = s.trail, n = tr.length / 2;
      for (var j = 0; j < n; j++) {
        var f = (j + 1) / n;                 // newest = brightest
        var head = j === n - 1;
        square(tr[j * 2] + ox, tr[j * 2 + 1] + oy, s.size * (0.5 + 0.5 * f),
          s.rot, s.color, s.alpha * f * f, head, s.cat);
      }
    }
  }

  function frame(ts) {
    if (!running) return;
    try {
      if (!last) last = ts;
      var dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      cX += (pX - cX) * 0.05;
      cY += (pY - cY) * 0.05;
      if (mode === 'ambient') stepAmbient(dt, ts / 1000, calm);
      else formStep(dt, ts / 1000);
      draw();
      raf = requestAnimationFrame(frame);
    } catch (e) {
      /* A thrown frame would otherwise stop the loop with no reschedule and no
         trace. Surface it and make sure the hero is revealed cleanly. */
      running = false;
      heroFallback('animation frame error — stopping particle field', e);
    }
  }

  function start() {
    if (running || reduce) return;
    running = true; last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
  }

  /* ---- reduced motion: paint a single static spec scatter ---- */
  function paintStatic() {
    resize();
    var c = count();
    ctx.clearRect(0, 0, W, H);
    ctx.lineJoin = 'round';
    for (var i = 0; i < c; i++) {
      var s = makeSpec();
      square(s.x, s.y, s.size, s.rot, s.color, s.alpha, s.cat !== 'small', s.cat);
    }
  }

  /* ---- responsive rebuild (debounced) ----
     Handles window resize AND orientation change (portrait ↔ landscape). If
     it fires while the formation is still playing (e.g. mobile Safari settling
     its address bar just after load, or a device rotation mid-intro), we
     re-measure and re-aim the formation onto the freshly laid-out hero rects
     instead of dropping straight to the ambient drift — so the reveal isn't
     lost. A settled field just rebuilds into ambient as before. Wrapped in
     rAF so we measure only after the browser has finished laying out. */
  var rt = null;
  function onViewportChange() {
    clearTimeout(rt);
    rt = setTimeout(function () {
      requestAnimationFrame(function () {
        try {
          if (reduce) { paintStatic(); return; }
          var forming = (mode === 'form' || mode === 'hold');
          build();
          if (forming && F.active && buildFormation()) {
            mode = 'form'; mT = 0;         // keep revealing after the reflow
          } else {
            mode = 'ambient';              // settled field: back to calm drift
          }
        } catch (e) { /* decorative layer — never throw on resize */ }
      });
    }, 200);
  }
  window.addEventListener('resize', onViewportChange, { passive: true });
  window.addEventListener('orientationchange', onViewportChange, { passive: true });

  if (reduce) { paintStatic(); return; }

  /* subtle pointer parallax — clean, only on fine-pointer devices */
  if (hoverable) {
    window.addEventListener('pointermove', function (e) {
      pX = (e.clientX / window.innerWidth - 0.5) * 2;
      pY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* Webfont metrics can shift the headline box just after first paint. If the
     fonts settle while we're still gathering, re-aim each spec at the nearest
     point of a freshly measured target map — a zero shift maps every spec back
     onto its own point, so nothing jumps. */
  function reaimFormation() {
    try {
      if (mode !== 'form') return;
      var n = 0, i;
      for (i = 0; i < specs.length; i++) if (!specs[i].free) n++;
      var pts = heroTargets(n);
      if (!pts.length) return;
      var used = new Array(pts.length);
      for (i = 0; i < specs.length; i++) {
        var s = specs[i];
        if (s.free) continue;
        var bi = -1, bd = Infinity;
        for (var q = 0; q < pts.length; q++) {
          if (used[q]) continue;
          var dx = pts[q][0] - s.tx, dy = pts[q][1] - s.ty;
          var d2 = dx * dx + dy * dy;
          if (d2 < bd) { bd = d2; bi = q; }
        }
        if (bi < 0) break;
        used[bi] = 1;
        s.tx = pts[bi][0]; s.ty = pts[bi][1];
      }
    } catch (e) { warn('re-aim after fonts.ready failed', e); }
  }

  /* Pause when the hero is scrolled off-screen or the tab is hidden — this is
     purely a performance optimisation. The field is STARTED unconditionally in
     boot() below; the observer only ever pauses/resumes it, so we never depend
     on IntersectionObserver to start the animation (a WebKit quirk where the
     first callback can report the top-of-page hero as not-intersecting used to
     leave the field dead). */
  var onScreen = true;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else if (onScreen) start();
  });
  if ('IntersectionObserver' in window) {
    try {
      new IntersectionObserver(function (es) {
        onScreen = es[es.length - 1].isIntersecting;
        /* Never pause while we're still at the top of the page: there the hero
           is on screen by definition, so a spurious "not intersecting" reading
           (seen on WebKit right after load) can't kill the intro. */
        if (!onScreen && (window.pageYOffset || 0) < Math.max(140, H * 0.5)) onScreen = true;
        if (onScreen && !document.hidden) start(); else stop();
      }, { threshold: 0 }).observe(intro);
    } catch (e) { warn('IntersectionObserver setup failed', e); }
  }

  /* ---- boot: build the field + formation, then START, from a reliable path ----
     Runs exactly once, kicked by whichever fires first: an immediate rAF (the
     script is at the end of <body>, so layout is usually ready), DOMContentLoaded,
     window load, and a setTimeout backstop — so the field starts even if any one
     of those never fires on a given engine. If the hero rects aren't measurable
     yet, the formation is retried for a few frames before settling into ambient
     drift, so the reveal is never dropped just because layout was a beat late. */
  var booted = false;
  function tryFormation() {
    if (!F.active) return true;              // nothing to form: ambient is correct
    if (buildFormation()) { mode = 'form'; mT = 0; return true; }
    return false;
  }
  function boot() {
    if (booted) return;
    booted = true;
    try {
      build();
      if (!tryFormation()) {
        var tries = 0;
        (function retry() {
          if (mode === 'form') return;
          if (++tries > 30) { warn('formation targets never became measurable; showing ambient drift'); return; }
          if (!tryFormation()) requestAnimationFrame(retry);
        })();
      }
      if (F.active && document.fonts && document.fonts.ready) {
        document.fonts.ready.then(reaimFormation).catch(function () {});
      }
      start();
    } catch (e) {
      heroFallback('boot failed', e);
    }
  }
  function scheduleBoot() { requestAnimationFrame(boot); }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    scheduleBoot();
  } else {
    document.addEventListener('DOMContentLoaded', scheduleBoot);
  }
  window.addEventListener('load', scheduleBoot);
  setTimeout(boot, 1200);                    // last-resort backstop
  } catch (e) { heroFallback('particle field crashed during setup', e); }
})();

/* =====================================================
   INTERIOR EDITOR PANES — type the data-lines content
   The phead "code editor" mockups on services/about/faq/
   contact carry their lines in a data-lines attribute but
   were never rendered. Type them in when scrolled into
   view; show them statically under reduced motion.
===================================================== */
(function () {
  'use strict';
  var panes = document.querySelectorAll('.editor pre[data-lines]');
  if (!panes.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isComment = function (l) { return /^\s*\/\//.test(l); };

  function lineSpan(text, comment) {
    var s = document.createElement('span');
    s.className = 'ln' + (comment ? ' cm' : '');
    s.textContent = text;
    return s;
  }

  function render(pre) {
    var lines;
    try { lines = JSON.parse(pre.getAttribute('data-lines')); } catch (e) { return; }
    if (!Array.isArray(lines) || !lines.length) return;
    pre.textContent = '';
    /* .editor .ln is display:block, so each line is its own block —
       no literal newlines, and the caret rides inside the active line */
    var cursor = document.createElement('span');
    cursor.className = 'cursor';

    if (reduce) {
      lines.forEach(function (l) { pre.appendChild(lineSpan(l, isComment(l))); });
      pre.lastChild.appendChild(cursor);
      return;
    }

    var li = 0, ci = 0, span = null;
    function step() {
      if (li >= lines.length) return;          // leave the caret blinking at the end
      var line = lines[li];
      if (ci === 0) { span = lineSpan('', isComment(line)); pre.appendChild(span); span.appendChild(cursor); }
      if (ci < line.length) {
        span.insertBefore(document.createTextNode(line.charAt(ci)), cursor); ci++;
        setTimeout(step, 24 + Math.random() * 28);
      } else {
        li++; ci = 0;
        setTimeout(step, 340);
      }
    }
    setTimeout(step, 260);
  }

  if (reduce || !('IntersectionObserver' in window)) {
    panes.forEach(render);
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { render(en.target); io.unobserve(en.target); }
    });
  }, { threshold: 0.25 });
  panes.forEach(function (p) { io.observe(p); });
})();

/* =====================================================
   MOBILE STICKY CTA BAR — Call · Get Quote · Start Project
   Slides up once the visitor scrolls past the hero so it
   never covers the first screen. CSS hides it >720px.
===================================================== */
(function () {
  'use strict';
  var bar = document.getElementById('mobileCta');
  if (!bar) return;
  var shown = false;
  var ticking = false;
  function sync() {
    ticking = false;
    var past = window.scrollY > 340;
    if (past !== shown) { shown = past; bar.classList.toggle('show', past); }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(sync); } }
  sync();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
})();

/* ============================================================
   BEFORE / AFTER SLIDER
   Drives --pos on #baSlider by dragging the #baHandle (pointer:
   mouse + touch + pen) or with the keyboard. Only the handle moves
   the divider — the rest of the section is inert so taps and
   vertical scrolls behave normally. No-ops on pages without it.
   ============================================================ */
(function () {
  'use strict';
  var slider = document.getElementById('baSlider');
  var handle = document.getElementById('baHandle');
  if (!slider || !handle) return;

  var hint = document.getElementById('baHint');
  var dragging = false;
  var hintGone = false;
  var interacted = false;

  // The "Drag to compare" hint has done its job once the visitor touches the
  // slider — fade it, then remove it so it never blocks the mockup.
  function dismissHint() {
    if (hintGone || !hint) return;
    hintGone = true;
    hint.classList.add('is-hidden');
    setTimeout(function () {
      if (hint && hint.parentNode) hint.parentNode.removeChild(hint);
    }, 550);
  }

  function clamp(n) { return n < 0 ? 0 : n > 100 ? 100 : n; }

  function setPos(pct) {
    pct = clamp(pct);
    slider.style.setProperty('--pos', pct + '%');
    handle.setAttribute('aria-valuenow', Math.round(pct));
  }

  function pctFromX(clientX) {
    var r = slider.getBoundingClientRect();
    if (!r.width) return 50;
    return ((clientX - r.left) / r.width) * 100;
  }

  function currentPct() {
    return parseFloat(slider.style.getPropertyValue('--pos')) || 50;
  }

  // Dragging is driven ONLY by the blue handle. Pressing anywhere else on the
  // slider — the mockup image, cards, labels, the wrapper itself — does nothing:
  // no jump, no drag. A vertical swipe over the section scrolls the page as
  // usual, because the wrapper keeps touch-action:pan-y and only the handle
  // sets touch-action:none. There is intentionally no pointerdown/click handler
  // on the container, so tapping the image can never move the divider.
  handle.addEventListener('pointerdown', function (e) {
    dragging = true;
    interacted = true;
    dismissHint();
    // Capture the pointer on the handle so pointermove/up/cancel keep firing on
    // it even when the finger travels off the handle and over the mockup. We do
    // NOT reposition on press — the divider only follows a real drag.
    try { handle.setPointerCapture(e.pointerId); } catch (err) {}
    handle.focus({ preventScroll: true });
    e.preventDefault();   // block text selection / native image drag
  });

  handle.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    setPos(pctFromX(e.clientX));
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    try { handle.releasePointerCapture(e.pointerId); } catch (err) {}
  }
  handle.addEventListener('pointerup', endDrag);
  handle.addEventListener('pointercancel', endDrag);

  handle.addEventListener('keydown', function (e) {
    var step = e.shiftKey ? 10 : 4;
    var k = e.key;
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].indexOf(k) !== -1) interacted = true;
    if (k === 'ArrowLeft' || k === 'ArrowDown') { setPos(currentPct() - step); dismissHint(); e.preventDefault(); }
    else if (k === 'ArrowRight' || k === 'ArrowUp') { setPos(currentPct() + step); dismissHint(); e.preventDefault(); }
    else if (k === 'Home') { setPos(0); dismissHint(); e.preventDefault(); }
    else if (k === 'End') { setPos(100); dismissHint(); e.preventDefault(); }
  });

  /* ---- one-time auto-sweep when the slider first scrolls into view ----
     Wipes the handle 50 → 72 → 28 → 50 so the interaction demonstrates
     itself. Skipped for reduced-motion, and it bails the moment the
     visitor takes over. Leaves the pill hint in place to reinforce it. */
  function runSweep() {
    var stops = [[0, 50], [0.30, 72], [0.66, 28], [1, 50]];
    var dur = 1500, start;
    function easeInOut(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
    function step(ts) {
      if (interacted) return;               // visitor took over — stop, leave their position
      if (start === undefined) start = ts;
      var g = Math.min((ts - start) / dur, 1);
      for (var i = 1; i < stops.length; i++) {
        if (g <= stops[i][0]) {
          var a = stops[i - 1], b = stops[i];
          var local = (g - a[0]) / (b[0] - a[0]);
          setPos(a[1] + (b[1] - a[1]) * easeInOut(local));
          break;
        }
      }
      if (g < 1) requestAnimationFrame(step);
      else setPos(50);
    }
    requestAnimationFrame(step);
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          io.disconnect();
          if (!interacted) setTimeout(runSweep, 350);
        }
      });
    }, { threshold: 0.55 });
    io.observe(slider);
  }
})();

/* =========================================================================
   PORTFOLIO CAROUSEL — rotating "coverflow" of the demo cards.
   Centre card active; one card peeking on each side (darker, behind).
   Prev/next buttons, click-a-side-card, keyboard arrows, touch swipe.
   No-op on any page without [data-carousel].
========================================================================= */
(function () {
  var root = document.querySelector('[data-carousel]');
  if (!root) return;

  var stage = root.querySelector('[data-carousel-stage]');
  var cards = Array.prototype.slice.call(root.querySelectorAll('[data-carousel-card]'));
  if (!stage || cards.length === 0) return;

  var prevBtn = root.querySelector('[data-carousel-prev]');
  var nextBtn = root.querySelector('[data-carousel-next]');
  var dotsWrap = root.querySelector('[data-carousel-dots]');
  var live = root.querySelector('[data-carousel-live]');
  var n = cards.length;
  var active = 0;

  // Single card: nothing to rotate — leave it as a static card.
  if (n < 2) { root.classList.add('is-ready'); return; }

  // ---- dot indicators ----
  var dots = [];
  if (dotsWrap) {
    cards.forEach(function (card, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pfc-dot';
      b.setAttribute('role', 'tab');
      var title = (card.querySelector('h3') || {}).textContent || ('Demo ' + (i + 1));
      b.setAttribute('aria-label', title);
      b.addEventListener('click', function () { setActive(i); });
      dotsWrap.appendChild(b);
      dots.push(b);
    });
  }

  function mod(i) { return (i % n + n) % n; }

  function render() {
    var prev = mod(active - 1);
    var next = mod(active + 1);
    cards.forEach(function (card, i) {
      card.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');
      var state = i === active ? 'is-active'
        : i === prev ? 'is-prev'
        : i === next ? 'is-next'
        : 'is-hidden';
      card.classList.add(state);
      card.setAttribute('aria-hidden', state === 'is-active' ? 'false' : 'true');
    });
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === active);
      d.setAttribute('aria-selected', i === active ? 'true' : 'false');
    });
    syncHeight();
    if (live) {
      var t = (cards[active].querySelector('h3') || {}).textContent || '';
      live.textContent = 'Showing demo ' + (active + 1) + ' of ' + n + (t ? ': ' + t : '');
    }
  }

  // Absolute cards don't size the stage, so match its height to the active card.
  function syncHeight() {
    var h = cards[active].offsetHeight;
    if (h) stage.style.height = h + 'px';
  }

  function setActive(i) { active = mod(i); render(); }
  function go(dir) { setActive(active + dir); }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(1); });

  // Click a side card to bring it forward (and block its link on that click).
  cards.forEach(function (card, i) {
    card.addEventListener('click', function (e) {
      if (card.classList.contains('is-active')) return; // active card: links work normally
      e.preventDefault();
      setActive(i);
    });
  });

  // Keyboard: arrows when the carousel has focus.
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
    else if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
    else if (e.key === 'Home') { setActive(0); e.preventDefault(); }
    else if (e.key === 'End') { setActive(n - 1); e.preventDefault(); }
  });

  // Touch / pointer swipe on the stage.
  var startX = null, startY = null, swiping = false, suppressClick = false;
  stage.addEventListener('pointerdown', function (e) {
    startX = e.clientX; startY = e.clientY; swiping = true; suppressClick = false;
  });
  stage.addEventListener('pointerup', function (e) {
    if (!swiping) return;
    swiping = false;
    if (startX === null) return;
    var dx = e.clientX - startX, dy = e.clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick = true;          // this was a swipe, not a tap
      go(dx < 0 ? 1 : -1);
    }
    startX = startY = null;
  });
  // Swallow the click that follows a swipe so it doesn't open a link / jump cards.
  stage.addEventListener('click', function (e) {
    if (suppressClick) { e.preventDefault(); e.stopPropagation(); suppressClick = false; }
  }, true);

  // Keep the stage height correct as things resize / images decode.
  window.addEventListener('resize', syncHeight, { passive: true });
  window.addEventListener('load', syncHeight);
  root.querySelectorAll('img').forEach(function (img) {
    if (!img.complete) img.addEventListener('load', syncHeight, { once: true });
  });

  root.classList.add('is-ready');
  render();
})();

/* ============================================================
   ABOUT — SERVICE-AREA MAP (Google keyless embed)
   A real, interactive Google Map embedded via ?output=embed — no
   API key, Cloud project or billing required. Each location button
   re-points the iframe at that Nova Scotia town using its EXACT
   hardcoded latitude/longitude (never a text lookup, which could
   resolve to the wrong place) and drops a marker there. Default
   selected: Halifax — also rendered server-side in the iframe src so
   the map shows before this script runs. No-ops on pages without it.
   ============================================================ */
(function () {
  'use strict';
  var frame = document.getElementById('nsMap');
  var btns = Array.prototype.slice.call(document.querySelectorAll('.area-btn'));
  if (!frame || !btns.length) return;

  // Exact "lat,lng" for every service area (passed to the embed's `q`, so the
  // marker + centre land on precisely these coordinates).
  var TOWNS = {
    halifax:     { q: '44.6488,-63.5752', name: 'Halifax' },
    dartmouth:   { q: '44.6713,-63.5772', name: 'Dartmouth' },
    truro:       { q: '45.3650,-63.2869', name: 'Truro' },
    bedford:     { q: '44.7258,-63.6668', name: 'Bedford' },
    chester:     { q: '44.5429,-64.2389', name: 'Chester' },
    mahonebay:   { q: '44.4489,-64.3872', name: 'Mahone Bay' },
    bridgewater: { q: '44.3786,-64.5188', name: 'Bridgewater' }
  };
  var ZOOM = 12;

  function urlFor(key) {
    return 'https://maps.google.com/maps?q=' + TOWNS[key].q + '&z=' + ZOOM + '&output=embed';
  }

  // soften the iframe reload with a brief fade
  frame.addEventListener('load', function () { frame.classList.remove('is-loading'); });

  // start on the pre-pressed button (Halifax) — already showing, so don't reload it
  var current = (btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || btns[0])
    .getAttribute('data-town');

  function select(key) {
    var t = TOWNS[key];
    if (!t) return;
    if (key !== current) {
      current = key;
      frame.classList.add('is-loading');
      frame.src = urlFor(key);
      frame.setAttribute('title', 'Map of Hatt Digital service areas across Nova Scotia — ' + t.name + ' selected');
    }
    btns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-town') === key ? 'true' : 'false');
    });
  }

  btns.forEach(function (b) {
    b.addEventListener('click', function () { select(b.getAttribute('data-town')); });
  });
})();

/* =========================================================================
   PRICING ACCORDION — expand one package row at a time. Tapping a header opens
   its details and collapses whichever was open, so exactly one package shows at
   a time (no three-tall-card scroll). The default open row is whatever the
   template rendered .is-open (the featured package). Enter/Space or click
   toggles; Up/Down/Home/End move focus between headers (WAI accordion pattern).
   No auto-rotation. No-op on pages without [data-pricing].
========================================================================= */
(function () {
  var root = document.querySelector('[data-pricing]');
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll('[data-pricing-item]'));
  var triggers = Array.prototype.slice.call(root.querySelectorAll('[data-pricing-trigger]'));
  if (items.length < 2 || items.length !== triggers.length) return;

  var n = items.length;

  // Start on the row the template opened (the featured tier), else the first.
  var open = 0;
  for (var k = 0; k < items.length; k++) {
    if (items[k].classList.contains('is-open')) { open = k; break; }
  }

  function setOpen(i) {
    open = (i % n + n) % n;
    items.forEach(function (item, idx) {
      var on = idx === open;
      item.classList.toggle('is-open', on);
      triggers[idx].setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  }

  function focusTrigger(i) { triggers[(i % n + n) % n].focus(); }

  triggers.forEach(function (trigger, i) {
    // Click / tap / Enter / Space (native <button>) opens this row; the open
    // row stays open so one package is always shown.
    trigger.addEventListener('click', function () { setOpen(i); });

    trigger.addEventListener('keydown', function (e) {
      var handled = true;
      if (e.key === 'ArrowDown') focusTrigger(i + 1);
      else if (e.key === 'ArrowUp') focusTrigger(i - 1);
      else if (e.key === 'Home') focusTrigger(0);
      else if (e.key === 'End') focusTrigger(n - 1);
      else handled = false;
      if (handled) e.preventDefault();
    });
  });

  // Normalise state (the template already opened the default row).
  setOpen(open);
})();
