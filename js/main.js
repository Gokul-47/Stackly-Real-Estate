/**
 * Stackly Real Estate - Shared JS
 * Nav, footer, 404 redirects, scroll animations
 */

(function () {
  'use strict';

  // Redirect external and media links to 404
  function init404Redirects() {
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
      const href = a.getAttribute('href');
      const currentOrigin = window.location.origin;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== currentOrigin) {
          a.setAttribute('href', '404.html');
          a.setAttribute('target', '_self');
        }
      } catch (_) {}
    });
    document.querySelectorAll('a[href*=".mp4"], a[href*=".webm"], a[href*=".mp3"], a[href*=".pdf"]').forEach(function (a) {
      a.setAttribute('href', '404.html');
      a.setAttribute('target', '_self');
    });
  }

  // Main nav: dropdown and mobile menu
  function initMainNav() {
    const dropdown = document.querySelector('.nav-dropdown');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (dropdown) {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
      });
    }

    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // Header scroll behavior
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    let lastY = window.scrollY;
    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      if (y > 80) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
      if (y > lastY && y > 200) header.classList.add('hidden');
      else header.classList.remove('hidden');
      lastY = y;
    }, { passive: true });
  }

  // Scroll reveal animations
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  // Run only on pages that are not 404 and not dashboard (dashboard has its own script for charts)
  function init() {
    init404Redirects();
    initMainNav();
    initHeaderScroll();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
