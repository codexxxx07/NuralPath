(function () {
  "use strict";

  // ===== THEME TOGGLE =====
  var themeToggle = document.getElementById("theme-toggle");
  var sunIcon = document.getElementById("sun-icon");
  var moonIcon = document.getElementById("moon-icon");
  var htmlElement = document.documentElement;

  // Check for saved theme preference or default to light
  var savedTheme = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  function updateThemeUI() {
    if (isDark) {
      htmlElement.classList.add("dark");
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    } else {
      htmlElement.classList.remove("dark");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    }
  }

  function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeUI();
  }

  // Initialize theme on page load
  updateThemeUI();

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) {
      isDark = e.matches;
      updateThemeUI();
    }
  });

  // ===== NAVBAR =====
  var navbar = document.getElementById("navbar");
  var navContainer = document.getElementById("nav-container");
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var menuLine1 = document.getElementById("menu-line-1");
  var menuLine2 = document.getElementById("menu-line-2");
  var menuLine3 = document.getElementById("menu-line-3");
  var isMenuOpen = false;

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-surface-50/90", "shadow-lg", "shadow-slate-200/50");
      navContainer.classList.remove("mt-3", "glass");
      navContainer.classList.add("rounded-none", "backdrop-blur-xl");
    } else {
      navbar.classList.remove("bg-surface-50/90", "shadow-lg", "shadow-slate-200/50");
      navContainer.classList.add("mt-3", "glass");
      navContainer.classList.remove("rounded-none", "backdrop-blur-xl");
    }
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  // Mobile Menu Toggle
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden");
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      menuLine1.style.transform = "translateY(6px) rotate(45deg)";
      menuLine2.style.opacity = "0";
      menuLine3.style.transform = "translateY(-6px) rotate(-45deg)";
    } else {
      mobileMenu.style.maxHeight = "0";
      menuLine1.style.transform = "none";
      menuLine2.style.opacity = "1";
      menuLine3.style.transform = "none";
      setTimeout(function () {
        mobileMenu.classList.add("hidden");
      }, 300);
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  // Close mobile menu on link click
  var mobileLinks = mobileMenu.querySelectorAll("a");
  for (var i = 0; i < mobileLinks.length; i++) {
    mobileLinks[i].addEventListener("click", function () {
      if (isMenuOpen) toggleMenu();
    });
  }

  // ===== TESTIMONIALS SLIDER =====
  var track = document.getElementById("testimonial-track");
  var dots = document.querySelectorAll("#testimonial-dots button");
  var currentSlide = 0;
  var totalSlides = dots.length;
  var slideInterval;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = "translateX(-" + currentSlide * 100 + "%)";
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.remove("bg-accent", "w-8");
      dots[i].classList.add("bg-surface-300", "w-2");
    }
    dots[currentSlide].classList.remove("bg-surface-300", "w-2");
    dots[currentSlide].classList.add("bg-accent", "w-8");
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Dot click handlers
  for (var j = 0; j < dots.length; j++) {
    dots[j].addEventListener("click", function () {
      var index = parseInt(this.getAttribute("data-index"), 10);
      goToSlide(index);
      startAutoSlide();
    });
  }

  // Pause on hover
  var sliderEl = document.getElementById("testimonial-slider");
  sliderEl.addEventListener("mouseenter", stopAutoSlide);
  sliderEl.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();

  // ===== SCROLL REVEAL ANIMATIONS =====
  var revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    for (var i = 0; i < revealElements.length; i++) {
      var el = revealElements[i];
      var rect = el.getBoundingClientRect();
      var isVisible = rect.top < window.innerHeight - 80;
      if (isVisible) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    }
  }

  // Set initial state for reveal elements
  for (var k = 0; k < revealElements.length; k++) {
    revealElements[k].style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
    revealElements[k].style.opacity = "0";
    revealElements[k].style.transform = "translateY(24px)";
  }

  window.addEventListener("scroll", checkReveal, { passive: true });
  window.addEventListener("resize", checkReveal, { passive: true });
  checkReveal();

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var l = 0; l < anchorLinks.length; l++) {
    anchorLinks[l].addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 100;
        var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  }
})();
