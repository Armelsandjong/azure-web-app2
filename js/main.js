// ============================================
// AFRIQUEEUROPECONNEXIONVMETC - Main JavaScript
// Simple, Working Version with Debug Mode
// ============================================

console.log('🚀 JavaScript file loaded!');

// Wait for page to fully load
window.addEventListener('load', function() {
    console.log('✅ Page fully loaded');
    
    // ============================================
    // MOBILE MENU - Priority #1
    // ============================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    console.log('Mobile Menu Button:', mobileMenuBtn);
    console.log('Nav Links:', navLinks);
    
    if (mobileMenuBtn && navLinks) {
        console.log('✅ Mobile menu elements found!');
        
        // Click event on mobile menu button
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Mobile menu button CLICKED!');
            
            // Toggle active class
            const isActive = navLinks.classList.contains('active');
            
            if (isActive) {
                // Close menu
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
                console.log('❌ Menu CLOSED');
            } else {
                // Open menu
                navLinks.classList.add('active');
                mobileMenuBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('✅ Menu OPENED');
            }
        });
        
    } else {
        console.error('❌ ERROR: Mobile menu elements NOT found!');
        if (!mobileMenuBtn) console.error('   Missing: #mobileMenuBtn');
        if (!navLinks) console.error('   Missing: #navLinks');
    }
    
    // ============================================
    // CLOSE MENU WHEN CLICKING OUTSIDE
    // ============================================
    
    document.addEventListener('click', function(event) {
        if (!navLinks || !mobileMenuBtn) return;
        
        // Check if menu is open
        if (navLinks.classList.contains('active')) {
            // Check if click was outside the nav
            const clickedInsideNav = event.target.closest('nav');
            
            if (!clickedInsideNav) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
                console.log('🔘 Clicked outside - menu closed');
            }
        }
    });
    
    // ============================================
    // CLOSE MENU WHEN CLICKING NAV LINKS
    // ============================================
    
    const allNavLinks = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
    console.log('Found', allNavLinks.length, 'nav links');
    
    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                if (navLinks) navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
                console.log('🔘 Nav link clicked - menu closed');
            }
        });
    });
    
    // ============================================
    // DROPDOWN TOGGLE FOR MOBILE
    // ============================================
    
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    console.log('Found', dropdownToggles.length, 'dropdown toggles');
    
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                console.log('🔘 Dropdown clicked on mobile');
                
                const dropdown = this.closest('.dropdown');
                if (dropdown) {
                    dropdown.classList.toggle('active');
                    console.log('Dropdown toggled');
                }
            }
        });
    });
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        console.log('✅ Back to top button found');
        
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
    
    // ============================================
    // SCROLL INDICATOR
    // ============================================
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip these specific anchors
            if (href === '#' || href === '#company' || href === '#services' || href === '#resources') {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('✅ All JavaScript initialized successfully!');
});

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%c AFRIQUEEUROPECONNEXIONVMETC ', 'background: #2C5F8D; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Digital Transformation Solutions ', 'background: #E8A547; color: #0F1419; font-size: 14px; padding: 5px;');
console.log('%c 🌍 Abuja • Douala • Kraków ', 'color: #4A7BA7; font-size: 12px;');
