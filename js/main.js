/* ============================================================
   AFRIQUEEUROPECONNEXIONVMETC — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
        });
    }

    // 2. Back to Top Visibility
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. Form Submit Protection
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button');
            btn.innerHTML = "Sending...";
            btn.style.opacity = "0.7";
        });
    }
});
