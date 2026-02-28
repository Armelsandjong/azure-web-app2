/**
 * main.js — Complete site interactions
 * Mobile menu · Dropdowns · Smooth scroll · Back to top · Form validation
 */

(function () {
  'use strict';

  /* =========================================================
     UTILITY
  ========================================================= */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* =========================================================
     MOBILE MENU TOGGLE  (3-dot ⋮ → X)
  ========================================================= */
  const mobileMenuBtn = $('#mobileMenuBtn');
  const navLinks      = $('#navLinks');

  function openMenu() {
    navLinks.classList.add('open');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent scroll-behind
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-controls', 'navLinks');
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation');

    // Click / tap
    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Keyboard: Enter / Space
    mobileMenuBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close when a nav link is tapped (mobile UX)
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });

    // Close on outside click/tap
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on swipe-up (touch)
    let touchStartY = 0;
    navLinks.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    navLinks.addEventListener('touchend', (e) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (diff > 60) closeMenu(); // swipe up → close
    }, { passive: true });

    // Close when Escape is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        mobileMenuBtn.focus();
      }
    });
  }

  /* =========================================================
     DROPDOWN MENU HANDLERS
  ========================================================= */
  const dropdowns = $$('.dropdown');

  dropdowns.forEach((dd) => {
    const trigger = $('[data-dropdown-toggle], .dropdown-toggle, > a', dd);
    const menu    = $('.dropdown-menu', dd);
    if (!trigger || !menu) return;

    let closeTimer;

    function openDropdown() {
      clearTimeout(closeTimer);
      // Close all others first
      dropdowns.forEach((other) => {
        if (other !== dd) other.classList.remove('dropdown-open');
      });
      dd.classList.add('dropdown-open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function scheduleClose() {
      closeTimer = setTimeout(() => {
        dd.classList.remove('dropdown-open');
        trigger.setAttribute('aria-expanded', 'false');
      }, 150);
    }

    // Hover (desktop)
    dd.addEventListener('mouseenter', openDropdown);
    dd.addEventListener('mouseleave', scheduleClose);
    menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));

    // Click / tap toggle (mobile-friendly)
    trigger.addEventListener('click', (e) => {
      const isOpen = dd.classList.contains('dropdown-open');
      // Prevent navigation if it's a pure toggle link
      if (trigger.dataset.dropdownToggle !== undefined || isOpen) {
        e.preventDefault();
      }
      isOpen ? scheduleClose() : openDropdown();
    });

    // Keyboard navigation inside dropdown
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDropdown();
        $$('a', menu)[0]?.focus();
      }
    });

    const menuLinks = $$('a', menu);
    menuLinks.forEach((link, i) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); menuLinks[i + 1]?.focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); (i === 0 ? trigger : menuLinks[i - 1]).focus(); }
        if (e.key === 'Escape')    { scheduleClose(); trigger.focus(); }
      });
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach((dd) => dd.classList.remove('dropdown-open'));
    }
  });

  /* =========================================================
     SMOOTH SCROLLING
  ========================================================= */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href   = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();

    const navHeight = $('header, nav')?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top, behavior: 'smooth' });

    // Update URL without jumping
    history.pushState(null, '', href);

    // Shift focus for accessibility
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });

  /* =========================================================
     BACK TO TOP BUTTON
  ========================================================= */
  // Auto-create button if one doesn't exist in HTML
  let backToTop = $('#backToTop, .back-to-top, [data-back-to-top]');

  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>`;
    backToTop.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; z-index:999;
      width:44px; height:44px; border-radius:50%; border:none;
      background:#111; color:#fff; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 4px 16px rgba(0,0,0,.25);
      opacity:0; pointer-events:none;
      transition:opacity .3s, transform .3s;
      transform:translateY(8px);`;
    document.body.appendChild(backToTop);
  }

  function updateBackToTop() {
    const visible = window.scrollY > 400;
    backToTop.style.opacity        = visible ? '1' : '0';
    backToTop.style.pointerEvents  = visible ? 'auto' : 'none';
    backToTop.style.transform      = visible ? 'translateY(0)' : 'translateY(8px)';
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop(); // initial state

  /* =========================================================
     FORM VALIDATION
  ========================================================= */
  const forms = $$('form[data-validate], form.validate');

  // If no forms have the attribute, apply to all forms (opt-in via class or attr recommended)
  // Comment out the line below if you want to be more selective:
  if (forms.length === 0) forms.push(...$$('form'));

  const VALIDATORS = {
    required:  (v)        => v.trim() !== ''                 || 'This field is required.',
    email:     (v)        => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
    minlength: (v, min)   => v.length >= +min                || `Minimum ${min} characters required.`,
    maxlength: (v, max)   => v.length <= +max                || `Maximum ${max} characters allowed.`,
    pattern:   (v, regex) => new RegExp(regex).test(v)       || 'Invalid format.',
    tel:       (v)        => /^[\d\s\+\-\(\)]{6,20}$/.test(v)|| 'Enter a valid phone number.',
    match:     (v, id)    => v === ($(` #${id}`)?.value ?? '') || 'Fields do not match.',
  };

  function validateField(field) {
    const rules = field.dataset.validate?.split(' ') ?? [];
    let   error = '';

    for (const rule of rules) {
      const [name, param] = rule.split(':');
      const fn = VALIDATORS[name];
      if (!fn) continue;

      // Skip non-required fields that are empty (unless rule is 'required')
      if (name !== 'required' && field.value.trim() === '') continue;

      const result = fn(field.value, param);
      if (result !== true) { error = result; break; }
    }

    // Also run browser built-in validity
    if (!error && !field.checkValidity()) {
      error = field.validationMessage;
    }

    showFieldError(field, error);
    return error === '';
  }

  function showFieldError(field, message) {
    const wrapper = field.closest('.field, .form-group, .input-wrap') ?? field.parentElement;
    let   errEl   = wrapper.querySelector('.field-error');

    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'field-error';
      errEl.setAttribute('aria-live', 'polite');
      errEl.style.cssText = 'display:block;color:#e53e3e;font-size:.8rem;margin-top:.25rem;';
      wrapper.appendChild(errEl);
    }

    errEl.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');

    // Toggle CSS hook classes
    field.classList.toggle('field-invalid', !!message);
    field.classList.toggle('field-valid',   !message);
  }

  forms.forEach((form) => {
    const fields = $$('input, textarea, select', form).filter(
      (f) => f.type !== 'submit' && f.type !== 'button' && f.type !== 'reset'
    );

    // Validate on blur
    fields.forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        // Clear error eagerly once user starts fixing
        if (field.classList.contains('field-invalid')) validateField(field);
      });
    });

    // Validate all on submit
    form.addEventListener('submit', (e) => {
      let valid = true;

      fields.forEach((field) => {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        e.preventDefault();
        // Focus first invalid field
        const first = form.querySelector('.field-invalid');
        first?.focus();
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // ── Successful submission hook ──────────────────────────
      // Replace / extend this section with your own submit logic
      // (fetch API call, redirect, success message, etc.)

      const successMsg = form.dataset.successMsg ?? 'Thank you! Your message has been sent.';
      const submitBtn  = form.querySelector('[type="submit"]');

      if (form.dataset.ajax !== undefined) {
        e.preventDefault();

        submitBtn && (submitBtn.disabled = true, submitBtn.textContent = 'Sending…');

        fetch(form.action || '#', {
          method:  form.method || 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body:    JSON.stringify(Object.fromEntries(new FormData(form))),
        })
          .then((r) => r.json())
          .catch(() => ({}))
          .finally(() => {
            submitBtn && (submitBtn.disabled = false, submitBtn.textContent = 'Send');
            showFormSuccess(form, successMsg);
          });
      }
    });
  });

  function showFormSuccess(form, message) {
    let banner = form.querySelector('.form-success');
    if (!banner) {
      banner = document.createElement('div');
      banner.className = 'form-success';
      banner.setAttribute('role', 'alert');
      banner.style.cssText = `
        margin-top:1rem; padding:.75rem 1rem; border-radius:6px;
        background:#c6f6d5; color:#276749; font-weight:600;`;
      form.appendChild(banner);
    }
    banner.textContent = message;
    banner.style.display = 'block';
    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-hide after 6 s
    setTimeout(() => (banner.style.display = 'none'), 6000);
  }

  /* =========================================================
     ACTIVE NAV LINK (highlight current page)
  ========================================================= */
  $$('nav a, #navLinks a').forEach((link) => {
    if (link.href === window.location.href ||
        link.getAttribute('href') === window.location.pathname) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* =========================================================
     INTERSECTION OBSERVER — fade-in on scroll
     Add class="reveal" to any element you want animated in
  ========================================================= */
  const revealEls = $$('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* =========================================================
     RESIZE: close mobile menu on desktop resize
  ========================================================= */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768) closeMenu?.();
    }, 150);
  });

  /* =========================================================
     TOUCH: prevent 300 ms tap delay on older iOS
  ========================================================= */
  document.addEventListener('touchstart', () => {}, { passive: true });

})();
