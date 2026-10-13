/* ═══════════════════════════════════════════════════════════
   AFRIQUEEUROPECONNEXIONVMETC (AEC)
   Shared JavaScript  —  js/main.js
   Core navigation, reveal effects, counters, and opt-in interactions
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════
     1. STICKY HEADER
  ══════════════════════════════════ */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ══════════════════════════════════
     2. MOBILE NAV TOGGLE
  ══════════════════════════════════ */
  const ham      = document.getElementById('ham');
  const mobNav   = document.getElementById('mob');
  const mobClose = document.getElementById('mob-close');

  function openMobNav() {
    if (!mobNav) return;
    mobNav.classList.add('open');
    ham && ham.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobNav() {
    if (!mobNav) return;
    mobNav.classList.remove('open');
    ham && ham.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (ham)      ham.addEventListener('click', () => mobNav.classList.contains('open') ? closeMobNav() : openMobNav());
  if (mobClose) mobClose.addEventListener('click', closeMobNav);
  if (mobNav)   mobNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobNav));

  const legacyMenuButton = document.getElementById('mobileMenuBtn');
  const legacyNav = document.getElementById('navLinks');
  if (legacyMenuButton && legacyNav) {
    const closeLegacyNav = () => {
      legacyNav.classList.remove('open');
      legacyMenuButton.setAttribute('aria-expanded', 'false');
    };

    legacyMenuButton.setAttribute('aria-expanded', 'false');
    legacyMenuButton.addEventListener('click', () => {
      const isOpen = legacyNav.classList.toggle('open');
      legacyMenuButton.setAttribute('aria-expanded', String(isOpen));
    });
    legacyNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeLegacyNav);
    });
  }

  /* ══════════════════════════════════
     3. BACK TO TOP
  ══════════════════════════════════ */
  const btt = document.getElementById('btt');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ══════════════════════════════════
     4. SCROLL REVEAL
  ══════════════════════════════════ */
  const revealEls = document.querySelectorAll('.rv');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ══════════════════════════════════
     5. ACTIVE NAV LINK
     Auto-highlights current page link
  ══════════════════════════════════ */
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('nav .nl, .mob a').forEach(link => {
    try {
      const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
      if (linkPath === currentPath) link.classList.add('active');
    } catch (_) {}
  });

  /* ══════════════════════════════════
     6. ACCORDION
  ══════════════════════════════════ */
  document.querySelectorAll('.acc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.acc-item');
      const body = item.querySelector('.acc-body');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.acc-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.acc-body').classList.remove('open');
        }
      });

      item.classList.toggle('open', !isOpen);
      body.classList.toggle('open', !isOpen);
    });
  });

  /* ══════════════════════════════════
     7. SMOOTH SCROLL for anchor links
  ══════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 78; // header height + buffer
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════
     8. COUNTER ANIMATION
     Usage: <span class="aec-counter" data-target="20" data-suffix="+"></span>
  ══════════════════════════════════ */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + (el.getAttribute('data-suffix') || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('.aec-counter');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  /* ══════════════════════════════════
     10. TICKER PAUSE ON HOVER
  ══════════════════════════════════ */
  document.querySelectorAll('.ticker-track').forEach(track => {
    track.parentElement.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.parentElement.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });

  /* ══════════════════════════════════
     11. CARD TILT (opt-in via .tilt class)
     Also applied to .svc-c cards
  ══════════════════════════════════ */
  document.querySelectorAll('.svc-c, .aec-card.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;
      card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ══════════════════════════════════
     13. FILE DROPZONE
     Usage: <div class="aec-dropzone"> + <input id="software_file">
  ══════════════════════════════════ */
  const dropzone  = document.querySelector('.aec-dropzone');
  const fileInput = document.getElementById('software_file');

  if (dropzone && fileInput) {
    ['dragenter', 'dragover'].forEach(ev => {
      dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.add('highlight'); });
    });
    ['dragleave', 'drop'].forEach(ev => {
      dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.remove('highlight'); });
    });
    dropzone.addEventListener('drop', e => {
      fileInput.files = e.dataTransfer.files;
      updateDropzoneLabel(fileInput.files[0]);
    });
    fileInput.addEventListener('change', () => updateDropzoneLabel(fileInput.files[0]));

    function updateDropzoneLabel(file) {
      if (file) {
        dropzone.innerHTML = `<i class="fas fa-file-archive" style="color:#00c2a8;font-size:24px;"></i><br>
          <strong>${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      }
    }
  }

})();
