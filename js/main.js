(function () {
    'use strict';

    const $ = (s) => document.querySelector(s);
    const $$ = (s) => [...document.querySelectorAll(s)];

    // 1. Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = $('header');
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // 2. Mobile Menu & Dropdowns
    const mobileBtn = $('#mobileMenuBtn');
    const navLinks = $('#navLinks');
    const dropdowns = $$('.dropdown');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileBtn.classList.toggle('active');
        });
    }

    // Toggle Dropdowns on Click (Crucial for mobile/tablet)
    dropdowns.forEach(dd => {
        const toggle = dd.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close others
                dropdowns.forEach(other => {
                    if (other !== dd) other.classList.remove('dropdown-open');
                });
                
                dd.classList.toggle('dropdown-open');
            }
        });
    });

    // 3. Form Handling with Feedback
    const heroForm = $('#hero-contact-form');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = heroForm.querySelector('button');
            const status = $('#form-status');
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            setTimeout(() => {
                status.innerHTML = '<p class="gold" style="font-weight:bold;">Success! Our experts will contact you shortly.</p>';
                heroForm.reset();
                btn.innerHTML = 'Send Consultation Request';
                btn.disabled = false;
            }, 1500);
        });
    }

    // 4. Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
    }, { threshold: 0.1 });
    $$('.reveal').forEach(el => observer.observe(el));

    // 5. Back to Top
    const btt = $('#backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btt.style.opacity = '1';
            btt.style.pointerEvents = 'auto';
            btt.style.transform = 'translateY(0)';
        } else {
            btt.style.opacity = '0';
            btt.style.pointerEvents = 'none';
            btt.style.transform = 'translateY(12px)';
        }
    });
    btt.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

})();
