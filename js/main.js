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

    /* ==========================================
       🎵 START MUSIC
       Click folder = valid user interaction
       ========================================== */

    const audio = document.getElementById('bg-audio');

    if (audio) {
      audio.volume = 0.35;

      audio.play()
        .then(() => {
          localStorage.setItem('hd_music_on', '1');

          const btn = document.getElementById('music-toggle');
          const label = document.getElementById('music-label');

          if (btn) {
            btn.classList.add('playing');
            btn.setAttribute('aria-pressed', 'true');
          }

          if (label) {
            label.textContent = 'Playing — click to pause';
          }
        })
        .catch((error) => {
          console.log('Music could not start:', error);
        });
    }

    /* ==========================================
       📂 OPEN FOLDER
       ========================================== */

    intro.classList.add('opening');

    sessionStorage.setItem('hd_intro_seen', '1');

    setTimeout(() => {
      intro.classList.add('hidden');
    }, 950);

    setTimeout(() => {
      intro.remove();
    }, 1800);
  };

  intro.addEventListener('click', openIntro);

  intro.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openIntro();
    }
  });

})();


/* ============================================================
   MUSIC PLAYER
   ============================================================ */

(function () {

  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('music-toggle');
  const label = document.getElementById('music-label');

  if (!audio || !btn) return;

  const KEY = 'hd_music_on';

  /* ---------- UI ---------- */

  const setUI = (playing) => {

    btn.classList.toggle('playing', playing);

    btn.setAttribute(
      'aria-pressed',
      playing ? 'true' : 'false'
    );

    if (label) {
      label.textContent = playing
        ? 'Playing — click to pause'
        : 'Play background music';
    }
  };


  /* ---------- PLAY ---------- */

  const play = () => {

    audio.volume = 0.35;

    audio.play()
      .then(() => {

        setUI(true);

        localStorage.setItem(KEY, '1');

      })
      .catch(() => {

        setUI(false);

      });

  };


  /* ---------- PAUSE ---------- */

  const pause = () => {

    audio.pause();

    setUI(false);

    localStorage.setItem(KEY, '0');

  };


  /* ---------- MUSIC BUTTON ---------- */

  btn.addEventListener('click', (e) => {

    e.stopPropagation();

    if (audio.paused) {
      play();
    } else {
      pause();
    }

  });


  /* ---------- EXPOSE ---------- */

  window.HDMusic = {

    playFromGesture: () => {

      /*
       * Không ép người dùng bật lại nếu
       * họ đã từng tắt nhạc.
       */

      if (localStorage.getItem(KEY) !== '0') {
        play();
      }

    }

  };


  /* ---------- PAGE LOAD ---------- */

  if (
    localStorage.getItem(KEY) === '1' &&
    !document.getElementById('intro-screen')
  ) {

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

/* ---------- Contact form (Formspree AJAX Integration) ---------- */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.textContent = "Sent — thank you! ✓";
        form.reset();
      } else {
        btn.textContent = "Error! Try again.";
      }
    } catch (error) {
      btn.textContent = "Error! Try again.";
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
})();
