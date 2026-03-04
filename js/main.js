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

  // contact form validation and redirect
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    function showError(input, message) {
      const err = input.parentElement.querySelector('.field-error');
      if (err) {
        err.textContent = message;
        err.style.display = 'block';
      }
      input.classList.add('input-error');
    }
    function clearError(input) {
      const err = input.parentElement.querySelector('.field-error');
      if (err) {
        err.textContent = '';
        err.style.display = 'none';
      }
      input.classList.remove('input-error');
    }

    function validate() {
      let valid = true;
      // name nonempty
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        valid = false;
      } else {
        clearError(nameInput);
      }
      // simple email check
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        showError(emailInput, 'Email is required');
        valid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(emailVal)) {
        showError(emailInput, 'Enter a valid email');
        valid = false;
      } else {
        clearError(emailInput);
      }
      // message
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Message cannot be empty');
        valid = false;
      } else {
        clearError(messageInput);
      }
      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validate()) {
        // all good, redirect to 404
        window.location.href = '404.html';
      }
    });
  }

  // search bar behavior: only redirect when any filter is chosen
  function initSearchBar() {
    const btn = document.querySelector('.btn-search');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const loc = document.querySelector('select[aria-label="Location"]').value;
      const type = document.querySelector('select[aria-label="Type"]').value;
      const price = document.querySelector('select[aria-label="Price Range"]').value;
      // redirect only if at least one option is selected
      if (loc || type || price) {
        window.location.href = '404.html';
      }
    });
  }

  // Run only on pages that are not 404 and not dashboard (dashboard has its own script for charts)
  function init() {
    init404Redirects();
    initMainNav();
    initHeaderScroll();
    initReveal();
    initContactForm();
    initSearchBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
