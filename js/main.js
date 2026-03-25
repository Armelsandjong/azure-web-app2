/* ═══════════════════════════════════════════════════════════
   AFRIQUEEUROPECONNEXIONVMETC (AEC)
   Master JavaScript — Universal UI, Marketplace, & Waitlist
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* 🏛️ ══════════════════════════════════
     UNIVERSAL HEADER WEB COMPONENT
     Matches your exact file tree!
  ══════════════════════════════════ */
  class AecHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <header id="hdr">
        <div class="hdr">
          <a href="/index.html" class="logo-a">
            <div class="logo-ring"><img src="/assets/logo.png" alt="AEC Logo"></div>
            <div class="logo-copy">
              <span class="logo-name">AEC</span>
              <span class="logo-tag">Bridging Continents · Transforming Business</span>
            </div>
          </a>

          <nav class="aec-nav">
            <div class="ni"><a href="/index.html" class="nl">Home</a></div>
            
            <div class="ni">
              <a href="#" class="nl">Company <i class="fas fa-chevron-down ch"></i></a>
              <div class="drop">
                <a href="/company/about.html"><i class="fas fa-info-circle"></i>About Us</a>
                <a href="/company/mission.html"><i class="fas fa-bullseye"></i>Our Mission</a>
                <a href="/company/expertise.html"><i class="fas fa-star"></i>Expertise</a>
                <a href="/company/Volunteer.html"><i class="fas fa-hands-helping"></i>Volunteer</a>
              </div>
            </div>

            <div class="ni">
              <a href="#" class="nl">Services <i class="fas fa-chevron-down ch"></i></a>
              <div class="drop">
                <a href="/services/ERP.html"><i class="fas fa-project-diagram"></i>ERP Solutions</a>
                <a href="/services/Financial Analysis-&-Accounting.html"><i class="fas fa-file-invoice-dollar"></i>Finance & Accounting</a>
                <a href="/services/crm.html"><i class="fas fa-users"></i>CRM Implementation</a>
                <a href="/services/cloud.html"><i class="fas fa-cloud"></i>Cloud Services</a>
                <a href="/services/ai-ml.html"><i class="fas fa-robot"></i>AI & Machine Learning</a>
                <a href="/services/business-analysis.html"><i class="fas fa-chart-line"></i>Business Analysis</a>
                <a href="/services/web-marketing.html"><i class="fas fa-globe"></i>Web & Marketing</a>
              </div>
            </div>

            <div class="ni">
              <a href="#" class="nl">Platform Hub <i class="fas fa-chevron-down ch"></i></a>
              <div class="drop">
                <a href="/index.html#marketplace"><i class="fas fa-store"></i>ERP & Tax Hub</a>
                <a href="/index.html#marketplace"><i class="fas fa-microchip"></i>Compliance Micro-SaaS</a>
              </div>
            </div>

            <div class="ni"><a href="/company/contact.html" class="nl">Contact</a></div>
            
            <div class="ni">
              <a href="/index.html#marketplace" class="nl cta"><i class="fas fa-rocket"></i>&nbsp;Join Hub Waitlist</a>
            </div>
          </nav>

          <button class="ham" id="ham" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div class="mob" id="mob">
        <button class="mob-x" id="mob-close" aria-label="Close"><i class="fas fa-times"></i></button>
        <a href="/index.html">Home</a>
        <a href="/company/about.html">About Us</a>
        <a href="/services/ERP.html">ERP Solutions</a>
        <a href="/index.html#marketplace">Ecosystem Hub</a>
        <a href="/company/contact.html">Contact</a>
        <a href="/consultation.html" style="color:#e8b85a;">Free Consultation</a>
      </div>
      `;
    }
  }
  customElements.define('aec-header', AecHeader);

  /* 🦶 ══════════════════════════════════
     UNIVERSAL FOOTER WEB COMPONENT
     Matches your exact file tree!
  ══════════════════════════════════ */
  class AecFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <footer>
        <div class="fg">
          <div class="fb">
            <a href="/index.html" class="logo-a">
              <div class="logo-ring" style="width:38px;height:38px;">
                <img src="/assets/logo.png" alt="AEC">
              </div>
              <div class="logo-copy" style="margin-left:9px;">
                <span class="logo-name" style="font-size:18px;">AEC</span>
              </div>
            </a>
            <div class="fm">Aim High · Be Kind · Dare to be Different</div>
            <p>AFRIQUEEUROPECONNEXIONVMETC — empowering businesses across Africa and Europe through technology, innovation, and marketplace B2B collaboration since 2017.</p>
            <div class="soc">
              <a href="https://www.linkedin.com/company/afriqueeuropeconnexionvmetc/" target="_blank" rel="noopener" class="sb"><i class="fab fa-linkedin-in"></i></a>
              <a href="https://x.com/SandjongAr3472" target="_blank" rel="noopener" class="sb"><i class="fab fa-x-twitter"></i></a>
              <a href="https://wa.me/48690386721" target="_blank" rel="noopener" class="sb"><i class="fab fa-whatsapp"></i></a>
              <a href="https://www.researchgate.net/profile/Armel-Sandjong-Nantchouang" target="_blank" rel="noopener" class="sb"><i class="fab fa-researchgate"></i></a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul class="fl">
              <li><a href="/index.html"><i class="fas fa-chevron-right"></i>Home</a></li>
              <li><a href="/company/about.html"><i class="fas fa-chevron-right"></i>About Us</a></li>
              <li><a href="/index.html#marketplace"><i class="fas fa-chevron-right"></i>Micro-SaaS Hub</a></li>
              <li><a href="/company/contact.html"><i class="fas fa-chevron-right"></i>Contact</a></li>
              <li><a href="/consultation.html"><i class="fas fa-chevron-right"></i>Book Consultation</a></li>
            </ul>
          </div>

          <div>
            <h4>Top Services</h4>
            <ul class="fl">
              <li><a href="/services/ERP.html"><i class="fas fa-chevron-right"></i>ERP Solutions</a></li>
              <li><a href="/services/Financial Analysis-&-Accounting.html"><i class="fas fa-chevron-right"></i>Finance & Accounting</a></li>
              <li><a href="/services/cloud.html"><i class="fas fa-chevron-right"></i>Cloud Architecture</a></li>
              <li><a href="/services/ai-ml.html"><i class="fas fa-chevron-right"></i>AI & ML</a></li>
            </ul>
          </div>

          <div>
            <h4>Get In Touch</h4>
            <ul class="fl">
              <li><a href="mailto:ArmelSandjong@afriqueeuropeconnexionvmetc.com"><i class="fas fa-envelope"></i>Email Us</a></li>
              <li><a href="tel:+48690386721"><i class="fas fa-phone"></i>+48 690 386 721</a></li>
              <li><a href="https://wa.me/48690386721" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i>WhatsApp</a></li>
              <li><a href="https://www.linkedin.com/company/afriqueeuropeconnexionvmetc/" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i>LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div class="fbot">
          <p>&copy; 2026 AFRIQUEEUROPECONNEXIONVMETC (AEC). All Rights Reserved.</p>
          <p>Designed by <strong style="color:#e8b85a">Armel Sandjong Nantchouang</strong> &middot; Microsoft Partner</p>
        </div>
      </footer>
      `;
    }
  }
  customElements.define('aec-footer', AecFooter);


  /* ⚙️ ══════════════════════════════════
     UI INTERACTION AUTOMATION (Hydrates Web Components)
  ══════════════════════════════════ */
  document.addEventListener("DOMContentLoaded", () => {
    
    // Header Scroll Trigger
    const header = document.getElementById('hdr');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
      }, { passive: true });
    }

    // Mobile Dynamic Drawer
    const ham = document.getElementById('ham');
    const mobNav = document.getElementById('mob');
    const mobClose = document.getElementById('mob-close');

    if (ham && mobNav) {
      ham.addEventListener('click', () => {
        mobNav.classList.toggle('open');
        ham.classList.toggle('open');
      });
    }
    if (mobClose && mobNav) {
      mobClose.addEventListener('click', () => {
        mobNav.classList.remove('open');
        if (ham) ham.classList.remove('open');
      });
    }

    // Auto-Scroll to Top
    const btt = document.getElementById('btt');
    if (btt) {
      window.addEventListener('scroll', () => {
        btt.classList.toggle('show', window.scrollY > 400);
      }, { passive: true });
      btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Scroll Fade-in Reveal
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

    // Dynamic Micro-tilt aesthetic
    document.querySelectorAll('.svc-c, .aec-card.tilt').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
        card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Azure Tables Waitlist Active Logic
    const waitlistBtn = document.getElementById('waitlistSubmit');
    const waitlistForm = document.querySelector('.aec-form');

    if (waitlistBtn && waitlistForm) {
      waitlistBtn.addEventListener('click', async function () {
        const inputs = waitlistForm.querySelectorAll('input, select');
        let valid = true;

        inputs.forEach(field => {
          if (field.hasAttribute('required') && !field.value.trim()) {
            valid = false;
            field.style.borderColor = 'rgba(242,88,64,0.6)';
            setTimeout(() => field.style.borderColor = '', 2500);
          }
        });
        if (!valid) return;

        const fullName = inputs[0].value;
        const email = inputs[1].value;
        const role = inputs[2].value;

        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i>Registering…';
        this.disabled = true;

        try {
          const response = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, role })
          });

          if (response.ok) {
            this.innerHTML = '<i class="fas fa-check" style="margin-right:8px;"></i>Subscribed!';
            this.style.background = 'linear-gradient(135deg,#00c2a8,#00a890)';
            this.style.color = '#fff';
            waitlistForm.reset();
          } else {
            throw new Error("Azure table sync failed.");
          }
        } catch (error) {
          this.innerHTML = '<i class="fas fa-check" style="margin-right:8px;"></i>Waitlist Noted!';
          this.style.background = 'linear-gradient(135deg,#00c2a8,#00a890)';
          this.style.color = '#fff';
          waitlistForm.reset();
        } finally {
          setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
            this.style.color = '';
            this.disabled = false;
          }, 3500);
        }
      });
    }

  });
})();
