/* ═══════════════════════════════════════════════════════════
   AFRIQUEEUROPECONNEXIONVMETC (AEC)
   Master JavaScript  —  js/main.js
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════
     1. STICKY HEADER
  ══════════════════════════════════ */
  const header = document.querySelector('.aec-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ══════════════════════════════════
     2. MOBILE NAV TOGGLE
  ══════════════════════════════════ */
  const ham    = document.querySelector('.aec-ham');
  const mobNav = document.querySelector('.aec-mob');
  const mobClose = document.querySelector('.aec-mob-close');

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

  if (mobNav) {
    mobNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobNav));
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
  ══════════════════════════════════ */
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.aec-nav .nl, .aec-mob a').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
    if (linkPath === currentPath) link.classList.add('active');
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
     7. SMOOTH SCROLL
  ══════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════
     8. COUNTER ANIMATION
  ══════════════════════════════════ */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
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
     9. FORM SUBMISSION FEEDBACK
  ══════════════════════════════════ */
  document.querySelectorAll('[data-form-submit]').forEach(btn => {
    btn.addEventListener('click', function () {
      const form = this.closest('.aec-form') || this.closest('form');
      if (!form) return;

      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'rgba(242,88,64,0.6)';
          setTimeout(() => field.style.borderColor = '', 2500);
        }
      });
      if (!valid) return;

      const original = this.innerHTML;
      this.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i>Sending…';
      this.disabled = true;
      this.style.opacity = '0.8';

      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check" style="margin-right:8px;"></i>Request Sent!';
        this.style.background = 'linear-gradient(135deg,#00c2a8,#00a890)';
        this.style.color = '#fff';
        this.style.opacity = '1';
        form.reset();

        setTimeout(() => {
          this.innerHTML = original;
          this.style.background = '';
          this.style.color = '';
          this.disabled = false;
        }, 3500);
      }, 1200);
    });
  });

  /* ══════════════════════════════════
     10. TICKER PAUSE ON HOVER
  ══════════════════════════════════ */
  document.querySelectorAll('.ticker-track').forEach(track => {
    track.parentElement.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.parentElement.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });

  /* ══════════════════════════════════
     11. CARD TILT
  ══════════════════════════════════ */
  document.querySelectorAll('.aec-card.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* 🚀 ══════════════════════════════════════════════════════
     [NEW] 12. AEC MARKETPLACE FILTERS (OHADA, Poland, Nigeria)
     ══════════════════════════════════════════════════════ */
  const regionFilters = document.querySelectorAll('.aec-filter-btn');
  const marketItems = document.querySelectorAll('.aec-market-item');

  regionFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      regionFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetRegion = btn.getAttribute('data-region'); // e.g., 'ohada', 'poland', 'nigeria'

      marketItems.forEach(item => {
        const itemRegion = item.getAttribute('data-region');
        if (targetRegion === 'all' || targetRegion === itemRegion) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* 📁 ══════════════════════════════════════════════════════
     [NEW] 13. FILE DROPZONE (For ERP/Tax Uploads)
     ══════════════════════════════════════════════════════ */
  const dropzone = document.querySelector('.aec-dropzone');
  const fileInput = document.getElementById('software_file');

  if (dropzone && fileInput) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('highlight');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('highlight');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      fileInput.files = e.dataTransfer.files;
      updateDropzoneLabel(fileInput.files[0]);
    });

    fileInput.addEventListener('change', () => {
      updateDropzoneLabel(fileInput.files[0]);
    });

    function updateDropzoneLabel(file) {
      if (file) {
        dropzone.innerHTML = `<i class="fas fa-file-archive" style="color:#00c2a8; font-size: 24px;"></i><br><strong>${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      }
    }
  }

  /* 🔗 ══════════════════════════════════════════════════════
     [NEW] 14. DYNAMIC FETCH (Pulling ERP items from Azure)
     ══════════════════════════════════════════════════════ */
  async function loadAzureProducts() {
    const productsContainer = document.getElementById('azure-products-list');
    if (!productsContainer) return;

    try {
      productsContainer.innerHTML = '<div style="text-align:center;color:#e8b85a;"><i class="fas fa-spinner fa-spin"></i> Loading AEC FinTech Products...</div>';
      
      const response = await fetch('/api/marketplace/products'); // Your Azure Node.js Endpoint
      const products = await response.json();

      productsContainer.innerHTML = ''; // Clear loader

      products.forEach(p => {
        productsContainer.innerHTML += `
          <div class="aec-market-item aec-card" data-region="${p.region_slug}">
            <span class="badge">${p.category}</span>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="ft-pricing">
              <span class="price" data-base-val="${p.price}">€${p.price}</span>
              <button class="buy-btn" onclick="buyItem('${p.id}')">Buy & Sync</button>
            </div>
          </div>
        `;
      });
    } catch (err) {
      productsContainer.innerHTML = '<div style="text-align:center;color:red;">Error fetching products. Make sure your Azure API is running.</div>';
    }
  }
  loadAzureProducts(); // Trigger it!

  /* 💱 ══════════════════════════════════════════════════════
     [NEW] 15. CURRENCY SWITCHER (Euros, CFA, Naira, Zloty)
     ══════════════════════════════════════════════════════ */
  const currencySelector = document.getElementById('aec-currency-selector');
  const rates = { EUR: 1, XAF: 655.95, NGN: 1600.00, PLN: 4.30 }; // Fallback estimations for 2026

  if (currencySelector) {
    currencySelector.addEventListener('change', (e) => {
      const selectedCur = e.target.value;
      const rate = rates[selectedCur] || 1;

      document.querySelectorAll('.price[data-base-val]').forEach(priceEl => {
        const baseValue = parseFloat(priceEl.getAttribute('data-base-val'));
        const converted = (baseValue * rate).toFixed(2);
        
        let symbol = '€';
        if (selectedCur === 'XAF') symbol = 'CFA ';
        if (selectedCur === 'NGN') symbol = '₦';
        if (selectedCur === 'PLN') symbol = 'zł';

        priceEl.textContent = `${symbol}${converted}`;
      });
    });
  }

})();
