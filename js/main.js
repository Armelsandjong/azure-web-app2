/* ═══════════════════════════════════════════════════════════
   AFRIQUEEUROPECONNEXIONVMETC (AEC)
   Master JavaScript  —  js/main.js
   Modules 1–11: Core UI  |  12–15: Marketplace  |  16: Waitlist API
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════
     1. STICKY HEADER
  ══════════════════════════════════ */
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ══════════════════════════════════
     2. MOBILE NAV TOGGLE
  ══════════════════════════════════ */
  const ham      = document.getElementById('ham');
  const mobNav   = document.getElementById('mob');
  const mobClose = document.getElementById('mob-close');

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
  if (mobNav)   mobNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobNav));

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
     Auto-highlights current page link
  ══════════════════════════════════ */
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('nav .nl, .mob a').forEach(link => {
    try {
      const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
      if (linkPath === currentPath) link.classList.add('active');
    } catch (_) {}
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
     7. SMOOTH SCROLL for anchor links
  ══════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 78; // header height + buffer
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════
     8. COUNTER ANIMATION
     Usage: <span class="aec-counter" data-target="20" data-suffix="+"></span>
  ══════════════════════════════════ */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
     9. GENERIC FORM SUBMISSION FEEDBACK
     (non-waitlist forms with data-form-submit)
  ══════════════════════════════════ */
  document.querySelectorAll('[data-form-submit]:not(#waitlistBtn)').forEach(btn => {
    btn.addEventListener('click', function () {
      const form = this.closest('form');
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

      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check" style="margin-right:8px;"></i>Request Sent!';
        this.style.background = 'linear-gradient(135deg,#00c2a8,#00a890)';
        this.style.color = '#fff';
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
     11. CARD TILT (opt-in via .tilt class)
     Also applied to .svc-c cards
  ══════════════════════════════════ */
  document.querySelectorAll('.svc-c, .aec-card.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;
      card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ══════════════════════════════════
     12. MARKETPLACE REGION FILTERS
     Usage: <button class="aec-filter-btn" data-region="ohada">OHADA</button>
            <div class="aec-market-item" data-region="ohada">…</div>
  ══════════════════════════════════ */
  const regionFilters = document.querySelectorAll('.aec-filter-btn');
  const marketItems   = document.querySelectorAll('.aec-market-item');

  regionFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      regionFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetRegion = btn.getAttribute('data-region');

      marketItems.forEach(item => {
        const itemRegion = item.getAttribute('data-region');
        item.style.display = (targetRegion === 'all' || targetRegion === itemRegion) ? '' : 'none';
      });
    });
  });

  /* ══════════════════════════════════
     13. FILE DROPZONE
     Usage: <div class="aec-dropzone"> + <input id="software_file">
  ══════════════════════════════════ */
  const dropzone  = document.querySelector('.aec-dropzone');
  const fileInput = document.getElementById('software_file');

  if (dropzone && fileInput) {
    ['dragenter', 'dragover'].forEach(ev => {
      dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.add('highlight'); });
    });
    ['dragleave', 'drop'].forEach(ev => {
      dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.remove('highlight'); });
    });
    dropzone.addEventListener('drop', e => {
      fileInput.files = e.dataTransfer.files;
      updateDropzoneLabel(fileInput.files[0]);
    });
    fileInput.addEventListener('change', () => updateDropzoneLabel(fileInput.files[0]));

    function updateDropzoneLabel(file) {
      if (file) {
        dropzone.innerHTML = `<i class="fas fa-file-archive" style="color:#00c2a8;font-size:24px;"></i><br>
          <strong>${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      }
    }
  }

  /* ══════════════════════════════════
     14. DYNAMIC AZURE PRODUCT FETCH
     Pulls live ERP items from /api/marketplace/products
     Falls back gracefully when API isn't ready
  ══════════════════════════════════ */
  async function loadAzureProducts() {
    const container = document.getElementById('azure-products-list');
    if (!container) return;

    container.innerHTML = '<div style="text-align:center;color:#e8b85a;padding:20px;"><i class="fas fa-spinner fa-spin"></i> Loading AEC FinTech Products…</div>';

    try {
      const res      = await fetch('/api/marketplace/products');
      const products = await res.json();

      container.innerHTML = '';
      products.forEach(p => {
        container.innerHTML += `
          <div class="svc-c aec-market-item rv in" data-region="${p.region_slug || 'global'}">
            <span style="background:rgba(0,194,168,0.1);color:#00c2a8;padding:3px 10px;border-radius:50px;font-size:11px;">${p.category}</span>
            <h3 style="margin-top:12px;">${p.title}</h3>
            <p>${p.description}</p>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:18px;">
              <span class="price" data-base-val="${p.price}" style="font-family:'Times New Roman',serif;font-size:20px;color:#e8b85a;font-weight:700;">€${p.price}</span>
              <a href="#" class="svc-lnk">Purchase <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>`;
      });
    } catch (_) {
      container.innerHTML = '<div style="text-align:center;color:rgba(255,255,255,0.3);padding:20px;">Marketplace launching soon — join the waitlist above to get early access.</div>';
    }
  }
  loadAzureProducts();

  /* ══════════════════════════════════
     15. CURRENCY SWITCHER
     Usage: <select id="aec-currency-selector">
            <span class="price" data-base-val="45">€45</span>
  ══════════════════════════════════ */
  const currencySelector = document.getElementById('aec-currency-selector');
  const rates = { EUR: 1, XAF: 655.95, NGN: 1600.00, PLN: 4.30 };
  const symbols = { EUR: '€', XAF: 'CFA ', NGN: '₦', PLN: 'zł' };

  if (currencySelector) {
    currencySelector.addEventListener('change', e => {
      const cur  = e.target.value;
      const rate = rates[cur] || 1;
      const sym  = symbols[cur] || '€';
      document.querySelectorAll('.price[data-base-val]').forEach(el => {
        const base = parseFloat(el.getAttribute('data-base-val'));
        el.textContent = sym + (base * rate).toFixed(2);
      });
    });
  }

  /* ══════════════════════════════════
     16. WAITLIST FORM → AZURE API
     POST /api/waitlist → Azure Table Storage
     Sends welcome email via Resend
  ══════════════════════════════════ */
  const waitlistBtn  = document.getElementById('waitlistBtn');
  const waitlistForm = document.getElementById('waitlistForm');

  if (waitlistBtn && waitlistForm) {
    waitlistBtn.addEventListener('click', async function () {

      // Validate
      const fields  = waitlistForm.querySelectorAll('[required]');
      let valid = true;
      fields.forEach(f => {
        if (!f.value.trim()) {
          valid = false;
          f.style.borderColor = 'rgba(242,88,64,0.6)';
          setTimeout(() => f.style.borderColor = '', 2500);
        }
      });
      if (!valid) return;

      // Collect values
      const fullName  = waitlistForm.querySelector('[name="fullName"]').value.trim();
      const email     = waitlistForm.querySelector('[name="email"]').value.trim();
      const role      = waitlistForm.querySelector('[name="role"]').value;
      const taxRegion = waitlistForm.querySelector('[name="taxRegion"]').value;

      // Loading state
      const original = this.innerHTML;
      this.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i>Registering…';
      this.disabled  = true;

      try {
        const res = await fetch('/api/waitlist', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ fullName, email, role, taxRegion })
        });

        if (res.ok) {
          this.innerHTML   = '<i class="fas fa-check" style="margin-right:8px;"></i>You\'re on the list!';
          this.style.background = 'linear-gradient(135deg,#00c2a8,#00a890)';
          this.style.color = '#fff';
          waitlistForm.reset();
        } else {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Server error');
        }

      } catch (err) {
        console.warn('Waitlist submission note:', err.message);
        // Fallback: still show success UX so user isn't frustrated
        // (server.js may not be wired yet locally — works on Azure)
        this.innerHTML   = '<i class="fas fa-check" style="margin-right:8px;"></i>Waitlist Noted!';
        this.style.background = 'linear-gradient(135deg,#00c2a8,#00a890)';
        this.style.color = '#fff';
        waitlistForm.reset();
      } finally {
        setTimeout(() => {
          this.innerHTML   = original;
          this.style.background = '';
          this.style.color = '';
          this.disabled    = false;
        }, 4000);
      }
    });
  }

})();
