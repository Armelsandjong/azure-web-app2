(function () {
  'use strict';

  // Utility helpers
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* =========================================================
     MOBILE MENU (Humane Interactions)
  ========================================================= */
  const mobileMenuBtn = $('#mobileMenuBtn');
  const navLinks = $('#navLinks');

  function openMenu() {
    navLinks.classList.add('open'); // Match your CSS class
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close menu when clicking a link
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });

    // Close menu when clicking outside (on the overlay/body)
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* =========================================================
     DROPDOWNS
  ========================================================= */
  const dropdowns = $$('.dropdown');
  dropdowns.forEach((dd) => {
    const trigger = $('.dropdown-toggle', dd) || $('a', dd);
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns first for a clean "human" feel
        dropdowns.forEach(other => {
            if (other !== dd) other.classList.remove('dropdown-open');
        });
        
        dd.classList.toggle('dropdown-open');
      }
    });
  });

  /* =========================================================
     SMOOTH SCROLL (With Offset for Header)
  ========================================================= */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href === '#' || href === '') return;
    
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    const headerHeight = $('header')?.offsetHeight || 80;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

    window.scrollTo({ top, behavior: 'smooth' });
  });

  /* =========================================================
     BACK TO TOP (Soft Fade)
  ========================================================= */
  const backToTop = $('#backToTop');
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 400) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
        backToTop.style.transform = 'translateY(0)';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
        backToTop.style.transform = 'translateY(10px)';
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================================================
     REVEAL ON SCROLL
  ========================================================= */
  const revealEls = $$('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => observer.observe(el));
  }

  /* =========================================================
     FORM HANDLING (Simple Human Validation)
  ========================================================= */
  const forms = $$('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !emailInput.value.includes('@')) {
        e.preventDefault();
        alert('Please enter a valid email address.');
      }
    });
  });

})();
