/* ===================================================================
   AFRIQUEEUROPECONNEXIONVMETC — CyberTech Neon Dark 2026
   Matching JS for: 3‑dot mobile menu, neon off‑canvas, fixed dropdowns
   Author: AEC
   =================================================================== */

(function () {
  "use strict";

  /* --------------------------- Config & Utils --------------------------- */
  const DEBUG = false; // set true to see console logs
  const MOBILE_MAX_WIDTH = 768;

  const log  = (...a) => DEBUG && console.log("[AEC]", ...a);
  const warn = (...a) => DEBUG && console.warn("[AEC]", ...a);
  const err  = (...a) => console.error("[AEC]", ...a);

  if (typeof window === "undefined" || typeof document === "undefined") {
    // SSR/hydration guard
    return;
  }

  /* --------------------------- Ready Handler --------------------------- */
  window.addEventListener("load", () => {
    log("🚀 AEC Cyber Nav JS loaded");

    const mobileBtn = document.getElementById("mobileMenuBtn");
    const navLinks  = document.getElementById("navLinks");
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    // Optional elements
    const backToTopBtn = document.getElementById("backToTop");
    const scrollIndicator = document.querySelector(".scroll-indicator");

    if (!mobileBtn || !navLinks) {
      err("❌ Missing required elements: #mobileMenuBtn and/or #navLinks");
      return;
    }

    // --------------------------- Accessibility Baseline ---------------------------
    mobileBtn.setAttribute("aria-controls", "navLinks");
    if (!mobileBtn.hasAttribute("aria-expanded")) {
      mobileBtn.setAttribute("aria-expanded", "false");
    }
    if (!mobileBtn.hasAttribute("aria-label")) {
      mobileBtn.setAttribute("aria-label", "Open menu");
    }
    navLinks.setAttribute("role", "menubar");
    if (!navLinks.hasAttribute("aria-hidden")) {
      navLinks.setAttribute("aria-hidden", "true");
    }

    // Ensure dropdown menus are aria-initialized
    dropdownToggles.forEach((btn) => {
      // If toggle controls a menu, set aria-hidden on the menu initially
      const menuId = btn.getAttribute("aria-controls");
      if (menuId) {
        const menu = document.getElementById(menuId);
        if (menu) {
          menu.setAttribute("role", "menu");
          menu.setAttribute("aria-hidden", "true");
        }
      }
      btn.setAttribute("aria-expanded", "false");
    });

    // --------------------------- State & Helpers ---------------------------
    let lastTrigger = null;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = () => window.innerWidth <= MOBILE_MAX_WIDTH;

    const setBodyScrollLock = (lock) => {
      document.body.style.overflow = lock ? "hidden" : "";
      document.body.classList.toggle("menu-open", lock); // used for overlay via CSS
    };

    const setMenuState = (open) => {
      navLinks.classList.toggle("active", open);
      mobileBtn.classList.toggle("active", open);
      mobileBtn.setAttribute("aria-expanded", String(open));
      navLinks.setAttribute("aria-hidden", String(!open));
      setBodyScrollLock(open);
      log(open ? "✅ Menu OPENED" : "❌ Menu CLOSED");

      if (!open) {
        // Close any open mobile dropdowns
        document.querySelectorAll(".dropdown.open").forEach((d) => d.classList.remove("open"));
        // Return focus to last trigger for accessibility
        if (lastTrigger) {
          try {
            lastTrigger.focus({ preventScroll: true });
          } catch {}
          lastTrigger = null;
        }
      } else {
        // Move focus to first interactive item for better a11y
        const firstInteractive = navLinks.querySelector("button, a");
        if (firstInteractive) {
          try {
            firstInteractive.focus({ preventScroll: true });
          } catch {}
        }
      }
    };

    const toggleMenu = (e) => {
      if (e) e.preventDefault();
      lastTrigger = (e && (e.currentTarget || e.target)) || mobileBtn;
      const open = !navLinks.classList.contains("active");
      setMenuState(open);
    };

    // --------------------------- Event Wiring (Menu) ---------------------------
    // Use pointer events for faster taps; fallback click for desktop/assistive tech
    mobileBtn.addEventListener("pointerup", toggleMenu);
    mobileBtn.addEventListener("click", toggleMenu);

    // Close on outside click when menu is open (mobile + desktop)
    document.addEventListener("pointerdown", (e) => {
      if (!navLinks.classList.contains("active")) return;
      const insideMenu = e.target.closest("#navLinks");
      const onToggle   = e.target.closest("#mobileMenuBtn");
      if (!insideMenu && !onToggle) {
        setMenuState(false);
      }
    });

    // Close on Escape (menu and dropdowns)
    document.addEventListener("keydown", (e) => {
      // Close entire menu if open
      if (e.key === "Escape" && navLinks.classList.contains("active")) {
        setMenuState(false);
        return;
      }
      // Close any open dropdown
      if (e.key === "Escape") {
        const openDD = document.querySelector(".dropdown.open .dropdown-toggle");
        if (openDD) {
          toggleDropdown(openDD, false);
          try { openDD.focus(); } catch {}
        }
      }
    });

    // Close menu after clicking a link on mobile for smoother UX
    navLinks.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      if (isMobile()) setMenuState(false);
    });

    // Auto‑reset if leaving mobile breakpoint (avoid locked states)
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isMobile()) setMenuState(false);
      }, 120);
    });

    // --------------------------- Dropdown Logic ---------------------------
    const toggleDropdown = (toggleEl, explicitOpen) => {
      const dropdown = toggleEl.closest(".dropdown");
      const menu     = dropdown ? dropdown.querySelector(".dropdown-menu") : null;
      if (!dropdown || !menu) return;

      const willOpen = explicitOpen === undefined ? !dropdown.classList.contains("open") : explicitOpen;

      // On mobile, keep only one dropdown open at a time
      if (isMobile() && willOpen) {
        document.querySelectorAll(".dropdown.open").forEach((d) => {
          if (d !== dropdown) d.classList.remove("open");
        });
      }

      dropdown.classList.toggle("open", willOpen);
      toggleEl.setAttribute("aria-expanded", String(willOpen));
      menu.setAttribute("aria-hidden", String(!willOpen));
    };

    // Hook dropdown toggles
    dropdownToggles.forEach((btn) => {
      // Pointerup => mobile; click => desktop (also helps accessibility)
      btn.addEventListener("pointerup", (e) => {
        if (isMobile()) {
          e.preventDefault();
          toggleDropdown(btn);
        }
      });
      btn.addEventListener("click", (e) => {
        // Enable click toggle on desktop too (in addition to CSS hover)
        e.preventDefault();
        toggleDropdown(btn);
      });

      // Keyboard support: Enter/Space toggle; ArrowDown opens and focuses first item
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleDropdown(btn);
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          toggleDropdown(btn, true);
          const firstItem = btn
            .closest(".dropdown")
            ?.querySelector(".dropdown-menu a, .dropdown-menu button");
          if (firstItem) {
            try { firstItem.focus(); } catch {}
          }
        }
      });
    });

    // Close dropdown if clicking outside of it (desktop + mobile)
    document.addEventListener("pointerdown", (e) => {
      const anyOpen = document.querySelector(".dropdown.open");
      if (!anyOpen) return;

      const inOpen = e.target.closest(".dropdown.open");
      const isToggle = e.target.closest(".dropdown-toggle");
      if (!inOpen && !isToggle) {
        anyOpen.classList.remove("open");
        const tgl = anyOpen.querySelector(".dropdown-toggle");
        const menu = anyOpen.querySelector(".dropdown-menu");
        if (tgl) tgl.setAttribute("aria-expanded", "false");
        if (menu) menu.setAttribute("aria-hidden", "true");
      }
    });

    // --------------------------- Back-to-top ---------------------------
    if (backToTopBtn) {
      const onScroll = () => {
        if (window.pageYOffset > 300) backToTopBtn.classList.add("show");
        else backToTopBtn.classList.remove("show");
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      backToTopBtn.addEventListener("click", () => {
        if (prefersReducedMotion) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }

    // --------------------------- Scroll indicator ---------------------------
    if (scrollIndicator) {
      scrollIndicator.addEventListener("click", () => {
        const reduce = prefersReducedMotion;
        window.scrollBy({
          top: window.innerHeight,
          behavior: reduce ? "auto" : "smooth",
        });
      });
    }

    // --------------------------- Smooth anchors ---------------------------
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#" || href === "#company" || href === "#services" || href === "#resources") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const reduce = prefersReducedMotion;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      });
    });

    log("✅ Cyber 3‑dot menu + dropdowns initialized");
  });

  // Console branding (optional flair)
  console.log(
    "%c AFRIQUEEUROPECONNEXIONVMETC ",
    "background:#2C8DFF;color:#fff;font-size:18px;font-weight:bold;padding:6px 10px;border-radius:4px;"
  );
  console.log(
    "%c CyberTech Neon Dark 2026 ",
    "background:#FFB84A;color:#000;font-size:12px;padding:4px 8px;border-radius:4px;"
  );
})();
