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

  /* ---- FAQ ---- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement, ans = item.querySelector('.faq-a'),
          open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open);
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
    });
  });

  /* ---- contact form -> mailto ---- */
  var f = document.getElementById('quoteForm');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var subj = encodeURIComponent('Website enquiry — ' + (f.biz.value || f.name.value || 'New lead'));
      var body = encodeURIComponent('Name: ' + f.name.value + '\nBusiness: ' + f.biz.value +
        '\nEmail: ' + f.email.value + '\nBudget: ' + (f.budget ? f.budget.value : '') + '\n\n' + f.msg.value);
      window.location.href = 'mailto:hattdigitalns@gmail.com?subject=' + subj + '&body=' + body;
    });
  }

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

  /* The nav stays clear over the dark hero, then turns to solid glass
     once the visitor scrolls down into the light part of the page. This
     runs on every load (animated or reduced) so the header always reads. */
  function bindHeaderSolid() {
    if (!header) return;
    var hc = function () {
      header.classList.toggle('solid', window.scrollY > window.innerHeight * 0.6);
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    hc();
    window.addEventListener('scroll', hc, { passive: true });
  }

  /* Map a single 0..1 progress value to every build stage. */
  function applyStage(p) {
    var tp = clamp(p / 0.55, 0, 1);                 // code types over first 55%
    renderCode(Math.floor(tp * TOTAL), true);
    if (compBar) compBar.style.width = (clamp(p / 0.9, 0, 1) * 100).toFixed(1) + '%';

    if (header) header.classList.toggle('lit', p > 0.12);   // nav rides in early

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
    if (header) header.classList.add('lit');
    if (hint) hint.style.opacity = '1';
    bindHeaderSolid();
    return;
  }

  /* ---------- AUTO-PLAY: the build runs itself on load ---------- */
  bindHeaderSolid();
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
