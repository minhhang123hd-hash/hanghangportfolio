/* ============================================================
   HANG DOAN — PORTFOLIO — shared behaviour
   ============================================================ */

/* ---------- Nav scroll state + mobile toggle ---------- */
(function () {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
})();

/* ---------- Scroll reveal ---------- */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
})();

/* ============================================================
   INTRO — folder screen (index.html only)
   Shows once per browser session.
   ============================================================ */
(function () {
  const intro = document.getElementById('intro-screen');
  if (!intro) return;

  const alreadySeen = sessionStorage.getItem('hd_intro_seen');
  if (alreadySeen) {
    intro.remove();
    return;
  }

  const openIntro = () => {
    intro.classList.add('opening');
    sessionStorage.setItem('hd_intro_seen', '1');
    // try to start background music on this direct user gesture
    window.HDMusic && window.HDMusic.playFromGesture();
    setTimeout(() => intro.classList.add('hidden'), 950);
    setTimeout(() => intro.remove(), 1800);
  };

  intro.addEventListener('click', openIntro);
  intro.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openIntro();
  });
})();

/* ============================================================
   MUSIC PLAYER — persists on/off preference across pages
   Note: browsers block true autoplay with sound until the visitor
   interacts with the page once (a click on the folder, the nav, or
   the play button all count).
   ============================================================ */
(function () {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('music-toggle');
  const label = document.getElementById('music-label');
  if (!audio || !btn) return;

  const KEY = 'hd_music_on';

  const setUI = (playing) => {
    btn.classList.toggle('playing', playing);
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    label.textContent = playing ? 'Playing — click to pause' : 'Play background music';
  };

  const play = () => {
    audio.play().then(() => { setUI(true); localStorage.setItem(KEY, '1'); })
      .catch(() => setUI(false));
  };
  const pause = () => { audio.pause(); setUI(false); localStorage.setItem(KEY, '0'); };

  btn.addEventListener('click', () => (audio.paused ? play() : pause()));

  // expose so the intro-folder click can start music on that same gesture
  window.HDMusic = {
    playFromGesture: () => { if (localStorage.getItem(KEY) !== '0') play(); }
  };

  // resume automatically on later page navigations if it was on
  if (localStorage.getItem(KEY) === '1' && !document.getElementById('intro-screen')) {
    play();
  } else {
    setUI(false);
  }
})();

/* ============================================================
   MEDIA SLOT auto-detect — reveals the real photo/video the
   instant it loads successfully; leaves the placeholder note
   visible until then. Nothing to configure, just upload files.
   ============================================================ */
(function () {
  document.querySelectorAll('.media-slot img').forEach(img => {
    if (img.complete && img.naturalWidth > 0) { img.classList.add('loaded'); return; }
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => img.classList.remove('loaded'));
  });
  document.querySelectorAll('.media-slot video').forEach(video => {
    video.addEventListener('loadeddata', () => video.classList.add('loaded'));
    video.addEventListener('error', () => video.classList.remove('loaded'));
  });
})();

/* ---------- Gallery filter (gallery.html) ---------- */
(function () {
  const filters = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (!filters.length) return;
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      items.forEach(it => {
        it.style.display = (f === 'all' || it.dataset.type === f) ? '' : 'none';
      });
    });
  });
})();

/* ---------- Autoplay-on-scroll for gallery videos ---------- */
(function () {
  const videos = document.querySelectorAll('.gallery-item video');
  if (!videos.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) { v.muted = true; v.play().catch(() => {}); }
      else { v.pause(); }
    });
  }, { threshold: 0.6 });
  videos.forEach(v => io.observe(v));
})();

/* ---------- Contact form (static — swap action for Formspree/Netlify) ---------- */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = "Sent — thank you! ✓";
    setTimeout(() => { btn.textContent = original; form.reset(); }, 2600);
  });
})();
