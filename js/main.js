(function () {
  'use strict';

  // Utility helpers
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
/* =========================================================
   DROPDOWN TOGGLE LOGIC
========================================================= */
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    // Desktop: Handle clicks if you want them to click-to-open
    toggle.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents page from jumping to top
        e.stopPropagation();

        // Close other open dropdowns first (Human-Centric Behavior)
        dropdowns.forEach(other => {
            if (other !== dropdown) other.classList.remove('active');
        });

        // Toggle the current one
        dropdown.classList.toggle('active');
    });
});

// Close dropdowns if user clicks anywhere else on the screen
document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
});
  /* =========================================================
      MOBILE MENU (Humane Interactions)
  ========================================================= */
  const mobileMenuBtn = $('#mobileMenuBtn');
  const navLinks = $('#navLinks');

  function openMenu() {
    if (!navLinks) return;
    navLinks.classList.add('open'); 
    mobileMenuBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* =========================================================
      DROPDOWNS (Mobile Toggle)
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
      REVEAL ON SCROLL (Intersection Observer)
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
      HERO FORM HANDLING (Success State)
  ========================================================= */
  const heroForm = $('#hero-contact-form');
  const statusDiv = $('#form-status');

  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const btn = this.querySelector('button');
      const originalContent = btn.innerHTML;
      
      // Simple Visual Feedback
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

      // Simulate an API call
      setTimeout(() => {
        if (statusDiv) {
          statusDiv.innerHTML = `<p style="color: #4ade80; background: rgba(74, 222, 128, 0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem; font-size: 0.9rem;">
            <i class="fas fa-check-circle"></i> Success! Our consultants in Poland, Cameroon, or Nigeria will reach out shortly.
          </p>`;
        }
        
        this.reset();
        btn.innerHTML = originalContent;
        btn.disabled = false;
        
        // Clear status after 8 seconds
        setTimeout(() => { if(statusDiv) statusDiv.innerHTML = ''; }, 8000);
      }, 1500);
    });
  }

})();
