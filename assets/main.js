(function () {
  'use strict';
  document.documentElement.classList.add('js');
  /* HD-BUILD: autoplay-10s-iphonefix */

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
     CINEMATIC SCROLL-BUILT HERO
     Maps scroll progress (0..1) through a pinned section to
     each build stage: code types, real hero forms, console
     dissolves, finished homepage remains.
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

  var compCode = document.getElementById('compCode');
  var compBar = document.getElementById('compBar');
  var compStat = document.getElementById('compStat');
  var compiler = document.getElementById('compiler');
  var hint = document.getElementById('scrollHint');
  var words = Array.prototype.slice.call(intro.querySelectorAll('.sh-word'));
  var bEyebrow = intro.querySelector('[data-build="eyebrow"]');
  var bSub = intro.querySelector('[data-build="sub"]');
  var bCta = intro.querySelector('[data-build="cta"]');

  /* ---- source code that "compiles" into the hero ---- */
  var T = function (c, t) { return { c: c, t: t }; };
  var I = '  ';
  var CODE = [
    [T('c', '// compiling hatt-digital homepage…')],
    [T('p', '<'), T('t', 'header'), T('p', ' '), T('a', 'class'), T('p', '="'), T('s', 'nav'), T('p', '">')],
    [T('x', I), T('p', '<'), T('t', 'a'), T('p', ' '), T('a', 'class'), T('p', '="'), T('s', 'brand'), T('p', '">')],
    [T('x', I + I), T('p', '<'), T('t', 'img'), T('p', ' '), T('a', 'src'), T('p', '="'), T('s', 'assets/logo.png'), T('p', '">')],
    [T('x', I), T('p', '</'), T('t', 'a'), T('p', '>')],
    [T('x', I), T('p', '<'), T('t', 'nav'), T('p', '>'), T('x', 'Services Pricing About FAQ'), T('p', '</'), T('t', 'nav'), T('p', '>')],
    [T('x', I), T('p', '<'), T('t', 'a'), T('p', ' '), T('a', 'class'), T('p', '="'), T('s', 'cta'), T('p', '">'), T('x', 'Start Your Website'), T('p', '</'), T('t', 'a'), T('p', '>')],
    [T('p', '</'), T('t', 'header'), T('p', '>')],
    [],
    [T('p', '<'), T('t', 'section'), T('p', ' '), T('a', 'class'), T('p', '="'), T('s', 'hero'), T('p', '">')],
    [T('x', I), T('p', '<'), T('t', 'p'), T('p', ' '), T('a', 'class'), T('p', '="'), T('s', 'eyebrow'), T('p', '">'), T('x', 'Web design — Nova Scotia')],
    [T('x', I), T('p', '<'), T('t', 'h1'), T('p', '>'), T('x', 'Websites that make local businesses')],
    [T('x', I + '    '), T('x', 'look '), T('k', 'impossible to ignore.'), T('p', '</'), T('t', 'h1'), T('p', '>')],
    [T('x', I), T('p', '<'), T('t', 'p'), T('p', ' '), T('a', 'class'), T('p', '="'), T('s', 'lead'), T('p', '">'), T('x', 'Clean, fast, lead-focused sites.')],
    [T('x', I), T('p', '<'), T('t', 'a'), T('p', ' '), T('a', 'class'), T('p', '="'), T('s', 'btn primary'), T('p', '">'), T('x', 'Start Your Website')],
    [T('x', I), T('p', '<'), T('t', 'a'), T('p', ' '), T('a', 'class'), T('p', '="'), T('s', 'btn ghost'), T('p', '">'), T('x', 'View Services')],
    [T('p', '</'), T('t', 'section'), T('p', '>')]
  ];

  /* flatten to characters carrying their token class */
  var chars = [];
  CODE.forEach(function (line) {
    line.forEach(function (tok) { for (var i = 0; i < tok.t.length; i++) chars.push({ ch: tok.t[i], c: tok.c }); });
    chars.push({ ch: '\n', c: 'p' });
  });
  var TOTAL = chars.length;

  function esc(ch) { return ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : ch === '&' ? '&amp;' : ch; }

  var lastN = -1;
  function renderCode(n, caret) {
    if (n === lastN) return;
    lastN = n;
    var html = '', cur = null, buf = '';
    for (var i = 0; i < n; i++) {
      var c = chars[i];
      if (c.c !== cur) { if (buf) html += '<span class="' + cur + '">' + buf + '</span>'; buf = ''; cur = c.c; }
      buf += c.ch === '\n' ? '\n' : esc(c.ch);
    }
    if (buf) html += '<span class="' + cur + '">' + buf + '</span>';
    if (caret && n < TOTAL) html += '<span class="caret"></span>';
    compCode.innerHTML = html;
  }

  function on(el, yes) { if (el) el.classList.toggle('built', yes); }

  function finished() {
    renderCode(TOTAL, false);
    if (compBar) compBar.style.width = '100%';
    if (compStat) { compStat.textContent = 'deployed'; compStat.classList.add('done'); }
    on(bEyebrow, true); words.forEach(function (w) { on(w, true); });
    on(bSub, true); on(bCta, true);
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

  /* Map a single 0..1 progress value to every build stage. */
  function applyStage(p) {
    var tp = clamp(p / 0.55, 0, 1);                 // code types over first 55%
    renderCode(Math.floor(tp * TOTAL), true);
    if (compBar) compBar.style.width = (clamp(p / 0.9, 0, 1) * 100).toFixed(1) + '%';

    on(bEyebrow, p > 0.60);
    var n = words.length;
    words.forEach(function (w, i) { on(w, p >= 0.62 + (i / n) * 0.20); });  // headline, word by word
    on(bSub, p > 0.85);
    on(bCta, p > 0.90);

    if (compiler) {                                  // console dissolves 58%–86%
      var d = clamp((p - 0.58) / 0.28, 0, 1);
      compiler.style.opacity = (1 - d).toFixed(3);
      compiler.style.transform = 'translate(-50%,-50%) scale(' + (1 + d * 0.06).toFixed(3) + ')';
      compiler.style.filter = 'blur(' + (d * 8).toFixed(1) + 'px)';
      compiler.style.pointerEvents = d > 0.5 ? 'none' : 'auto';
    }
    if (compStat) {
      var dn = p > 0.9;
      compStat.textContent = dn ? 'deployed' : 'compiling';
      compStat.classList.toggle('done', dn);
    }
  }

  /* ---------- REDUCED MOTION: show the finished hero instantly ---------- */
  if (reduce) {
    finished();
    if (compiler) compiler.style.display = 'none';
    if (hint) hint.style.opacity = '1';
    bindHeaderReveal();
    return;
  }

  /* ---------- AUTO-PLAY: the build runs itself on load ---------- */
  bindHeaderReveal();
  if (hint) hint.style.opacity = '0';

  var DURATION = 10000;   // ms for the full build to play out
  var t0 = null;
  function tick(ts) {
    if (t0 === null) t0 = ts;
    var p = clamp((ts - t0) / DURATION, 0, 1);
    applyStage(p);
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      renderCode(TOTAL, false);                 // remove the blinking caret
      if (compiler) compiler.style.display = 'none';
      if (hint) hint.style.opacity = '1';       // invite scrolling into the page
    }
  }
  /* small beat so layout + fonts settle, then play */
  setTimeout(function () { requestAnimationFrame(tick); }, 320);
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

  /* cursor spotlight: track pointer over .spot elements */
  if (!reduce && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.spot').forEach(function (el) {
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
   Lives behind the hero content (pointer-events:none),
   is responsive, and respects prefers-reduced-motion by
   falling back to a static spec scatter.
===================================================== */
(function () {
  'use strict';
  var intro = document.getElementById('intro');
  var canvas = document.getElementById('introSpecs');
  if (!intro || !canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

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
  var specs = [];
  var pX = 0, pY = 0, cX = 0, cY = 0;   // pointer parallax (target / eased)
  var raf = null, running = false, last = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[(Math.random() * a.length) | 0]; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function count() {
    var w = window.innerWidth;
    if (w < 600) return 18;    // mobile: keep it uncluttered (15–25)
    if (w < 1000) return 34;
    return 52;                 // desktop (35–60)
  }

  function makeSpec() {
    var z = Math.random();                       // depth: 0 far … 1 near
    var roll = Math.random();
    var cat = roll < 0.70 ? 'small' : roll < 0.92 ? 'mid' : 'block';
    var base = cat === 'small' ? rand(2, 4.5) : cat === 'mid' ? rand(5.5, 9) : rand(12, 18);
    return {
      x: Math.random() * W,
      y: Math.random() * H,
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
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function build() {
    resize();
    var c = count();
    specs = [];
    for (var i = 0; i < c; i++) specs.push(makeSpec());
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

  /* loose curved drift: layered sines create natural convergence
     (clustering) and divergence (separation) zones over time */
  function step(dt, time) {
    var amp = 13, m = 44;
    for (var i = 0; i < specs.length; i++) {
      var s = specs[i];
      var sp = 0.4 + s.z * 0.9;
      var fx = Math.sin(s.y * 0.0042 + time * 0.16 + s.phase);
      var fy = Math.cos(s.x * 0.0040 - time * 0.13 + s.phase * 1.3);
      s.x += (fx * amp + 9) * sp * dt;     // gentle global drift right…
      s.y += (fy * amp - 6) * sp * dt;     // …and slightly up
      s.rot += s.rotSpeed * dt;

      var wrapped = false;
      if (s.x < -m) { s.x = W + m; wrapped = true; }
      else if (s.x > W + m) { s.x = -m; wrapped = true; }
      if (s.y < -m) { s.y = H + m; wrapped = true; }
      else if (s.y > H + m) { s.y = -m; wrapped = true; }

      if (wrapped) { s.trail.length = 0; }
      s.trail.push(s.x, s.y);
      if (s.trail.length > (s.tlen + 1) * 2) s.trail.splice(0, 2);
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
    if (!last) last = ts;
    var dt = Math.min((ts - last) / 1000, 0.05);
    last = ts;
    cX += (pX - cX) * 0.05;
    cY += (pY - cY) * 0.05;
    step(dt, ts / 1000);
    draw();
    raf = requestAnimationFrame(frame);
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

  /* ---- responsive rebuild (debounced) ---- */
  var rt = null;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      if (reduce) { paintStatic(); return; }
      build();
    }, 200);
  }, { passive: true });

  if (reduce) { paintStatic(); return; }

  /* subtle pointer parallax — clean, only on fine-pointer devices */
  if (hoverable) {
    window.addEventListener('pointermove', function (e) {
      pX = (e.clientX / window.innerWidth - 0.5) * 2;
      pY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* pause when the hero is offscreen or the tab is hidden */
  var onScreen = true;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else if (onScreen) start();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      onScreen = es[0].isIntersecting;
      if (onScreen && !document.hidden) start(); else stop();
    }, { threshold: 0 }).observe(intro);
  }

  build();
  start();
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
   Drives --pos on #baSlider from pointer (mouse + touch) and
   keyboard. Self-contained; no-ops on pages without the slider.
   ============================================================ */
(function () {
  'use strict';
  var slider = document.getElementById('baSlider');
  var handle = document.getElementById('baHandle');
  if (!slider || !handle) return;

  var dragging = false;

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

  slider.addEventListener('pointerdown', function (e) {
    dragging = true;
    try { slider.setPointerCapture(e.pointerId); } catch (err) {}
    setPos(pctFromX(e.clientX));
    handle.focus({ preventScroll: true });
    e.preventDefault();
  });

  slider.addEventListener('pointermove', function (e) {
    if (dragging) setPos(pctFromX(e.clientX));
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    try { slider.releasePointerCapture(e.pointerId); } catch (err) {}
  }
  slider.addEventListener('pointerup', endDrag);
  slider.addEventListener('pointercancel', endDrag);

  handle.addEventListener('keydown', function (e) {
    var step = e.shiftKey ? 10 : 4;
    var k = e.key;
    if (k === 'ArrowLeft' || k === 'ArrowDown') { setPos(currentPct() - step); e.preventDefault(); }
    else if (k === 'ArrowRight' || k === 'ArrowUp') { setPos(currentPct() + step); e.preventDefault(); }
    else if (k === 'Home') { setPos(0); e.preventDefault(); }
    else if (k === 'End') { setPos(100); e.preventDefault(); }
  });
})();
