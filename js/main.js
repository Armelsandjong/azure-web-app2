/**
 * main.js — AFRIQUEEUROPECONNEXIONVMETC
 * Works for ALL pages: root (index.html) and sub-folders (services/, company/, etc.)
 */
(function () {
  'use strict';

  /* ── Helpers ───────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── HEADER SCROLL EFFECT ──────────────────────────── */
  const header = $('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── MOBILE MENU ───────────────────────────────────── */
  const mobileBtn = $('#mobileMenuBtn');
  const navLinks  = $('#navLinks');

  function openMenu() {
    if (!mobileBtn || !navLinks) return;
    navLinks.classList.add('open');
    mobileBtn.classList.add('active');
    mobileBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!mobileBtn || !navLinks) return;
    navLinks.classList.remove('open');
    mobileBtn.classList.remove('active');
    mobileBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    navLinks && navLinks.classList.contains('open') ? closeMenu() : openMenu();
  }

  if (mobileBtn && navLinks) {
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.addEventListener('click', toggleMenu);

    // Close when a nav link is tapped
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a') && !e.target.closest('.dropdown-toggle')) closeMenu();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !mobileBtn.contains(e.target)) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close when resized to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 769) closeMenu();
    });
  }

  /* ── DROPDOWN MENUS ────────────────────────────────── */
  const dropdowns = $$('.dropdown');

  dropdowns.forEach((dd) => {
    const toggle = $('.dropdown-toggle', dd);
    const menu   = $('.dropdown-menu', dd);
    if (!toggle || !menu) return;

    let closeTimer;

    const open = () => {
      clearTimeout(closeTimer);
      dropdowns.forEach(d => { if (d !== dd) d.classList.remove('dropdown-open'); });
      dd.classList.add('dropdown-open');
      toggle.setAttribute('aria-expanded', 'true');
    };
    const schedClose = () => {
      closeTimer = setTimeout(() => {
        dd.classList.remove('dropdown-open');
        toggle.setAttribute('aria-expanded', 'false');
      }, 140);
    };

    // Desktop hover
    dd.addEventListener('mouseenter', () => { if (window.innerWidth > 768) open(); });
    dd.addEventListener('mouseleave', () => { if (window.innerWidth > 768) schedClose(); });
    menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));

    // Click toggle (handles both mobile and desktop)
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      dd.classList.contains('dropdown-open') ? schedClose() : open();
    });

    // Keyboard
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); $$('a', menu)[0]?.focus(); }
    });
    $$('a', menu).forEach((link, i, arr) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); arr[i + 1]?.focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); (i === 0 ? toggle : arr[i - 1]).focus(); }
        if (e.key === 'Escape')    { schedClose(); toggle.focus(); }
      });
    });
  });

  // Close all dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(d => d.classList.remove('dropdown-open'));
    }
  });

  /* ── SMOOTH SCROLLING ──────────────────────────────── */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href === '#' || href === '#!') return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const offset = (header?.offsetHeight ?? 74) + 16;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    history.pushState(null, '', href);
  });

  /* ── BACK TO TOP ───────────────────────────────────── */
  const btt = $('#backToTop') || $('.back-to-top');
  if (btt) {
    const update = () => {
      const show = window.scrollY > 400;
      btt.style.opacity       = show ? '1' : '0';
      btt.style.pointerEvents = show ? 'auto' : 'none';
      btt.style.transform     = show ? 'translateY(0)' : 'translateY(12px)';
    };
    window.addEventListener('scroll', update, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    update();
  }

  /* ── SCROLL REVEAL ─────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => obs.observe(el));
  } else {
    // Fallback: just show everything
    $$('.reveal').forEach(el => el.classList.add('revealed'));
  }

  /* ── ACTIVE NAV LINK ───────────────────────────────── */
  const current = location.href;
  $$('nav a').forEach(a => {
    if (a.href === current) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* ── FORM VALIDATION ───────────────────────────────── */
  const RULES = {
    required:  v        => v.trim() !== ''                         || 'This field is required.',
    email:     v        => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)   || 'Enter a valid email.',
    minlength: (v, min) => v.length >= +min                        || `Minimum ${min} characters.`,
    tel:       v        => /^[\d\s\+\-\(\)]{6,20}$/.test(v)       || 'Enter a valid phone number.',
  };

  function validateField(f) {
    const rules = (f.dataset.validate || '').split(' ').filter(Boolean);
    let err = '';
    for (const rule of rules) {
      const [name, param] = rule.split(':');
      if (!RULES[name]) continue;
      if (name !== 'required' && !f.value.trim()) continue;
      const result = RULES[name](f.value, param);
      if (result !== true) { err = result; break; }
    }
    if (!err && !f.checkValidity()) err = f.validationMessage;
    // Show/clear error
    const wrap = f.closest('.form-group, .field') ?? f.parentElement;
    let el = wrap.querySelector('.field-error');
    if (!el) {
      el = document.createElement('span');
      el.className = 'field-error';
      el.style.cssText = 'display:block;color:#e53e3e;font-size:.8rem;margin-top:.3rem;';
      wrap.appendChild(el);
    }
    el.textContent = err;
    f.classList.toggle('field-invalid', !!err);
    f.classList.toggle('field-valid', !err);
    return !err;
  }

  $$('form').forEach(form => {
    const fields = $$('input,textarea,select', form)
      .filter(f => !['submit','button','reset','hidden'].includes(f.type));

    fields.forEach(f => {
      f.addEventListener('blur', () => validateField(f));
      f.addEventListener('input', () => { if (f.classList.contains('field-invalid')) validateField(f); });
    });

    form.addEventListener('submit', e => {
      let ok = true;
      fields.forEach(f => { if (!validateField(f)) ok = false; });
      if (!ok) {
        e.preventDefault();
        form.querySelector('.field-invalid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

})();
