// AFRIQUEEUROPECONNEXIONVMETC - Main JavaScript

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!event.target.closest('nav')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Close mobile menu when clicking on a link
const navLinksItems = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
navLinksItems.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Dropdown Toggle for Mobile
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            dropdown.classList.toggle('active');
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#company' && href !== '#services' && href !== '#resources') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide header on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

// Animated Counter for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count')) || parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

// Intersection Observer for Stats Animation
if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
}

// Form Validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Remove error class on input
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                }, { once: true });
            }
        });
        
        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value && !emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('error');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Please fill in all required fields correctly.');
        }
    });
});

// Newsletter Form Success Message
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const email = form.querySelector('input[type="email"]').value;
        if (email) {
            // Show success message after form submission
            setTimeout(() => {
                alert('✅ Thank you for subscribing! Check your email for confirmation.');
            }, 100);
        }
    });
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Console Branding
console.log('%c AFRIQUEEUROPECONNEXIONVMETC ', 'background: #2C5F8D; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Digital Transformation Solutions ', 'background: #E8A547; color: #0F1419; font-size: 14px; padding: 5px;');
console.log('Interested in working with us? Visit: https://afriqueeuropeconnexionvmetc.com/company/contact.html');

// Performance Monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});
