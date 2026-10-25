/* AEC — shared script. Every page loads this file. */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || document).querySelectorAll(s)); };

  var header = $('header');
  var nav    = $('#navLinks');
  var btn    = $('#mobileMenuBtn');

  /* ---------- menu (3-dot button on mobile) ---------- */
  function closeDropdowns() {
    $$('.dropdown.open').forEach(function (d) {
      d.classList.remove('open');
      var t = $('.dropdown-toggle', d);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
  function setMenu(open) {
    if (!nav || !btn) return;
    nav.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
    if (!open) closeDropdowns();
  }
  if (btn && nav) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!nav.classList.contains('open'));
    });
  }

  /* dropdowns: hover on desktop, tap on touch/mobile */
  var hoverDesktop = window.matchMedia('(hover:hover) and (min-width:901px)');
  $$('.dropdown-toggle').forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (hoverDesktop.matches) return;
      var li = t.closest('.dropdown');
      var wasOpen = li.classList.contains('open');
      closeDropdowns();
      if (!wasOpen) { li.classList.add('open'); t.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* choosing a real link closes the menu */
  $$('.nav-links a:not(.dropdown-toggle)').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
      if (nav && nav.classList.contains('open')) setMenu(false);
      closeDropdowns();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); closeDropdowns(); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && nav && nav.classList.contains('open')) setMenu(false);
  });

  /* highlight the page you are on */
  var norm = function (p) { return p.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/'; };
  var here = norm(location.pathname);
  $$('.nav-links a[href]').forEach(function (a) {
    if (a.classList.contains('dropdown-toggle')) return;
    var u;
    try { u = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
    if (u.hash) return;
    if (norm(u.pathname) === here) { a.classList.add('active'); a.setAttribute('aria-current', 'page'); }
  });

  /* ---------- scroll: header shadow + back to top ---------- */
  var toTop = $('#backToTop');
  var ticking = false;
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 450);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- gentle reveal on scroll ---------- */
  var rv = $$('.rv');
  if (rv.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.08 });
      rv.forEach(function (el) { io.observe(el); });
    } else {
      rv.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- "what's on your mind" picker (home page) ---------- */
  var picker = $('#picker');
  if (picker) {
    var chips = $$('.chip', picker);
    var out = $('#pickOut'), pt = $('#pickTitle'), px = $('#pickText'), pl = $('#pickLink');
    var pick = function (c) {
      chips.forEach(function (x) {
        var on = x === c;
        x.classList.toggle('on', on);
        x.setAttribute('aria-pressed', String(on));
      });
      pt.textContent = c.getAttribute('data-title');
      px.textContent = c.getAttribute('data-text');
      pl.setAttribute('href', c.getAttribute('data-link'));
      pl.querySelector('span').innerHTML = c.getAttribute('data-cta') || 'See more';
      out.classList.remove('swap'); void out.offsetWidth; out.classList.add('swap');
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { pick(c); }); });
    if (chips.length) {
      chips[0].classList.add('on');
      chips[0].setAttribute('aria-pressed', 'true');
    }
  }

  /* ---------- footer year ---------- */
  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- waitlist form (FormSubmit AJAX, email fallback) ---------- */
  var form = $('#waitlistForm');
  if (form) {
    var msg = $('#wl-msg');
    var EMAIL = 'ArmelSandjong@afriqueeuropeconnexionvmetc.com';
    var show = function (type, text) { msg.className = 'wf-msg full ' + type; msg.textContent = text; };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements._honey && form.elements._honey.value) return;

      var name   = $('#wl-name').value.trim();
      var email  = $('#wl-email').value.trim();
      var role   = $('#wl-role').value;
      var region = $('#wl-region').value;

      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        show('err', 'Please enter your name and a valid email address.'); return;
      }
      if (!$('#wl-consent').checked) {
        show('err', 'Please agree to the Privacy Policy to continue.'); return;
      }

      var submit = form.querySelector('button[type="submit"]');
      var label = submit.innerHTML;
      submit.disabled = true; submit.textContent = 'Sending…';

      fetch('https://formsubmit.co/ajax/' + EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'AEC FinTech Hub waitlist — ' + name,
          _template: 'table',
          Name: name, Email: email, Role: role, Region: region
        })
      })
      .then(function (r) { if (!r.ok) throw new Error('status'); return r.json(); })
      .then(function (j) {
        if (j && (j.success === true || j.success === 'true')) {
          show('ok', "You're on the list! We'll be in touch when the hub launches.");
          form.reset();
        } else { throw new Error('rejected'); }
      })
      .catch(function () {
        var subject = encodeURIComponent('AEC Hub Waitlist — ' + name);
        var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nRole: ' + role + '\nRegion: ' + region);
        show('err', 'Automatic sending failed, so your email app will open — please press send to finish.');
        window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
      })
      .then(function () { submit.disabled = false; submit.innerHTML = label; });
    });
  }
})();
