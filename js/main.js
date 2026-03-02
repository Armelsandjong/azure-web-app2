/* ============================================================
   AFRIQUEEUROPECONNEXIONVMETC — Refined main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const backToTop = document.getElementById('backToTop');

    // 1. Scroll Effects (Header & Back to Top)
    const onScroll = () => {
        const scrollPos = window.scrollY;

        // Header Background on Scroll
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top Button Visibility
        if (backToTop) {
            if (scrollPos > 400) {
                backToTop.style.opacity = "1";
                backToTop.style.transform = "translateY(0)";
                backToTop.style.pointerEvents = "auto";
            } else {
                backToTop.style.opacity = "0";
                backToTop.style.transform = "translateY(20px)";
                backToTop.style.pointerEvents = "none";
            }
        }
    };

    window.addEventListener('scroll', onScroll);

    // 2. Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : 'auto';
        });
    }

    // 3. Mobile Dropdown Support
    // If user clicks "Company" or "Services" on mobile, toggle the dropdown
    document.querySelectorAll('.dropdown-toggle').forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = item.parentElement;
                parent.classList.toggle('dropdown-open');
            }
        });
    });

    // 4. Smooth Reveal Animation (Intersection Observer)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Runs only once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Back to Top Click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
