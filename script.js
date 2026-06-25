(function () {
  "use strict";

  // ===== THEME TOGGLE (persisted via localStorage) =====
  var themeToggle = document.getElementById("theme-toggle");
  var sunIcon = document.getElementById("sun-icon");
  var moonIcon = document.getElementById("moon-icon");
  var htmlElement = document.documentElement;

  var isDark = localStorage.getItem("nuralpath_theme") === "dark";

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
    localStorage.setItem("nuralpath_theme", isDark ? "dark" : "light");
    updateThemeUI();
  }

  // Initialize theme on page load
  updateThemeUI();

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

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

  // ===== MODAL SYSTEM =====
  var modalBackdrop = document.getElementById("modal-backdrop");
  var modalTitleEl = document.getElementById("modal-title");
  var modalMessageEl = document.getElementById("modal-message");
  var modalIconEl = document.getElementById("modal-icon");
  var modalCloseBtn = document.getElementById("modal-close-btn");
  var modalOverlayClose = document.getElementById("modal-overlay-close");

  function showModal(title, message, icon) {
    modalTitleEl.textContent = title;
    modalMessageEl.textContent = message;
    modalIconEl.textContent = icon || "✅";
    modalBackdrop.classList.remove("hidden");
    modalBackdrop.style.display = "flex";
    document.body.classList.add("modal-open");
  }

  function hideModal() {
    modalBackdrop.classList.add("hidden");
    modalBackdrop.style.display = "";
    document.body.classList.remove("modal-open");
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", hideModal);
  }

  if (modalOverlayClose) {
    modalOverlayClose.addEventListener("click", hideModal);
  }

  // ===== CONFIRMATION MODAL =====
  var confirmBackdrop = document.getElementById("confirm-backdrop");
  var confirmMessageEl = document.getElementById("confirm-message");
  var confirmCancelBtn = document.getElementById("confirm-cancel");
  var confirmOkBtn = document.getElementById("confirm-ok");
  var confirmOverlayClose = document.getElementById("confirm-overlay-close");
  var confirmCallback = null;

  function showConfirm(message, callback) {
    if (confirmMessageEl) {
      confirmMessageEl.textContent = message || "This action cannot be undone.";
    }
    confirmBackdrop.classList.remove("hidden");
    confirmBackdrop.style.display = "flex";
    document.body.classList.add("modal-open");
    confirmCallback = callback;
  }

  function hideConfirm() {
    confirmBackdrop.classList.add("hidden");
    confirmBackdrop.style.display = "";
    document.body.classList.remove("modal-open");
    confirmCallback = null;
  }

  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener("click", hideConfirm);
  }

  if (confirmOkBtn) {
    confirmOkBtn.addEventListener("click", function () {
      if (confirmCallback) confirmCallback();
      hideConfirm();
    });
  }

  if (confirmOverlayClose) {
    confirmOverlayClose.addEventListener("click", hideConfirm);
  }

  // ===== TOAST SYSTEM =====
  var toastContainer = document.getElementById("toast-container");

  function showToast(message, type) {
    if (!toastContainer) return;
    type = type || "info";
    var iconMap = { success: "✅", error: "❌", info: "💡", warning: "⚠️" };
    var icon = iconMap[type] || "💡";

    var toast = document.createElement("div");
    toast.className =
      "toast flex items-center gap-3 rounded-xl border border-surface-300/60 bg-white px-5 py-3 shadow-lg shadow-slate-200/50 pointer-events-auto " +
      "dark:bg-dark-card dark:border-dark-border/20 " +
      "border-l-4 max-w-sm";

    var borderMap = { success: "border-l-green-500", error: "border-l-red-500", info: "border-l-accent", warning: "border-l-warm" };
    toast.classList.add(borderMap[type] || borderMap.info);

    toast.innerHTML =
      '<span class="text-lg flex-shrink-0">' + icon + '</span>' +
      '<span class="text-sm text-ink-700 dark:text-dark-textMuted">' + message + '</span>';

    toastContainer.appendChild(toast);

    setTimeout(function () {
      toast.classList.add("removing");
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // ===== BUTTON ACTION HANDLER =====
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) return;
    var action = el.getAttribute("data-action");

    if (el.tagName === "A") e.preventDefault();

    switch (action) {
      case "signup":
        showLoginModal("signup");
        break;

      case "login":
        showLoginModal("login");
        break;

      case "get-started":
        var context = el.getAttribute("data-context") || "";
        if (context === "cta") {
          showModal("You're In! 🚀", "Welcome aboard! Start exploring our expert-led courses today.");
        } else {
          showModal("Welcome to NuralPath! 🚀", "Your learning journey begins now. Explore our courses and start building your future.");
        }
        break;

      case "enroll":
        var course = el.getAttribute("data-course") || "this course";
        showModal("Enrolled Successfully! ✅", "You are now part of " + course + ". Get ready to learn and grow!");
        break;

      case "view-all":
        showToast("Opening full course catalog... 📚", "info");
        break;

      case "category":
        var category = el.getAttribute("data-category") || "this category";
        showToast("Showing " + category + " courses... 📂", "info");
        break;

      case "talk-advisor":
        showModal("Connecting... ⏳", "Please wait while we connect you with an advisor.");
        setTimeout(function () {
          modalTitleEl.textContent = "Connected! ✅";
          modalMessageEl.textContent = "An advisor will reach out to you within 24 hours. Check your email for details.";
          modalIconEl.textContent = "✅";
        }, 2000);
        break;

      case "footer-link":
        var section = el.getAttribute("data-section") || "This section";
        showToast(section + " coming soon! 📍", "info");
        break;

      default:
        showToast("Feature coming soon! 🚧", "info");
    }
  });

  // ===== KEYBOARD SUPPORT =====
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (modalBackdrop && !modalBackdrop.classList.contains("hidden")) hideModal();
      if (confirmBackdrop && !confirmBackdrop.classList.contains("hidden")) hideConfirm();
      if (loginModalBackdrop && !loginModalBackdrop.classList.contains("hidden")) hideLoginModal();
    }
  });

  // ===== LOGIN MODAL SYSTEM =====
  var loginModalBackdrop = document.getElementById("login-modal-backdrop");
  var loginModalCloseBtn = document.getElementById("login-modal-close-btn");
  var loginModalOverlayClose = document.getElementById("login-modal-overlay-close");

  // Login Modal Views
  var loginView = document.getElementById("login-view");
  var signupView = document.getElementById("signup-view");
  var forgotPasswordView = document.getElementById("forgot-password-view");
  var forgotSuccessView = document.getElementById("forgot-success-view");

  // View switching links
  var signupLink = document.getElementById("signup-link");
  var loginLink = document.getElementById("login-link");
  var forgotPasswordLink = document.getElementById("forgot-password-link");
  var backToLoginLink = document.getElementById("back-to-login-link");
  var forgotSuccessClose = document.getElementById("forgot-success-close");

  // Forms
  var loginForm = document.getElementById("login-form");
  var signupForm = document.getElementById("signup-form");
  var forgotPasswordForm = document.getElementById("forgot-password-form");

  function showLoginModal(view) {
    loginModalBackdrop.classList.remove("hidden");
    loginModalBackdrop.style.display = "flex";
    document.body.classList.add("modal-open");
    switchLoginView(view || "login");
  }

  function hideLoginModal() {
    loginModalBackdrop.classList.add("hidden");
    loginModalBackdrop.style.display = "";
    document.body.classList.remove("modal-open");
    // Reset forms
    if (loginForm) loginForm.reset();
    if (signupForm) signupForm.reset();
    if (forgotPasswordForm) forgotPasswordForm.reset();
    // Reset to login view
    switchLoginView("login");
  }

  function switchLoginView(viewName) {
    // Hide all views
    loginView.classList.add("hidden");
    signupView.classList.add("hidden");
    forgotPasswordView.classList.add("hidden");
    forgotSuccessView.classList.add("hidden");

    // Show selected view
    switch (viewName) {
      case "login":
        loginView.classList.remove("hidden");
        break;
      case "signup":
        signupView.classList.remove("hidden");
        break;
      case "forgot":
        forgotPasswordView.classList.remove("hidden");
        break;
      case "forgot-success":
        forgotSuccessView.classList.remove("hidden");
        break;
    }
  }

  // Event listeners for modal close
  if (loginModalCloseBtn) {
    loginModalCloseBtn.addEventListener("click", hideLoginModal);
  }

  if (loginModalOverlayClose) {
    loginModalOverlayClose.addEventListener("click", hideLoginModal);
  }

  // View switching event listeners
  if (signupLink) {
    signupLink.addEventListener("click", function () {
      switchLoginView("signup");
    });
  }

  if (loginLink) {
    loginLink.addEventListener("click", function () {
      switchLoginView("login");
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function () {
      switchLoginView("forgot");
    });
  }

  if (backToLoginLink) {
    backToLoginLink.addEventListener("click", function () {
      switchLoginView("login");
    });
  }

  if (forgotSuccessClose) {
    forgotSuccessClose.addEventListener("click", hideLoginModal);
  }

  // ===== AUTHENTICATION WITH LOCALSTORAGE =====
  function getUsers() {
    var users = localStorage.getItem("nuralpath_users");
    return users ? JSON.parse(users) : [];
  }

  function saveUser(user) {
    var users = getUsers();
    users.push(user);
    localStorage.setItem("nuralpath_users", JSON.stringify(users));
  }

  function findUserByEmail(email) {
    var users = getUsers();
    return users.find(function (u) { return u.email === email; });
  }

  function setCurrentUser(user) {
    localStorage.setItem("nuralpath_current_user", JSON.stringify(user));
  }

  function getCurrentUser() {
    var user = localStorage.getItem("nuralpath_current_user");
    return user ? JSON.parse(user) : null;
  }

  function logout() {
    localStorage.removeItem("nuralpath_current_user");
    showToast("Logged out successfully", "info");
  }

  // Login form handler
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("login-email").value.trim();
      var password = document.getElementById("login-password").value;

      if (!email || !password) {
        showToast("Please fill in all fields", "error");
        return;
      }

      var user = findUserByEmail(email);
      if (user && user.password === password) {
        setCurrentUser(user);
        showToast("Welcome back, " + user.name + "!", "success");
        hideLoginModal();
      } else {
        showToast("Invalid email or password", "error");
      }
    });
  }

  // Signup form handler
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("signup-name").value.trim();
      var email = document.getElementById("signup-email").value.trim();
      var password = document.getElementById("signup-password").value;
      var confirmPassword = document.getElementById("signup-confirm-password").value;

      if (!name || !email || !password || !confirmPassword) {
        showToast("Please fill in all fields", "error");
        return;
      }

      if (password !== confirmPassword) {
        showToast("Passwords do not match", "error");
        return;
      }

      if (password.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
      }

      if (findUserByEmail(email)) {
        showToast("An account with this email already exists", "error");
        return;
      }

      var newUser = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
      };

      saveUser(newUser);
      setCurrentUser(newUser);
      showToast("Account created successfully! Welcome, " + name + "!", "success");
      hideLoginModal();
    });
  }

  // Forgot password form handler
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("forgot-email").value.trim();

      if (!email) {
        showToast("Please enter your email", "error");
        return;
      }

      // Simulate sending reset link
      var user = findUserByEmail(email);
      if (user) {
        switchLoginView("forgot-success");
      } else {
        // Don't reveal if email exists, just show success
        switchLoginView("forgot-success");
      }
    });
  }

  // ===== SKELETON LOADER =====
  (function () {
    var skeleton = document.getElementById("skeleton-loader");
    if (!skeleton) return;

    var minLoadTime = 1500;
    var startTime = Date.now();

    document.body.style.overflow = "hidden";

    function removeSkeleton() {
      var elapsed = Date.now() - startTime;
      var remaining = Math.max(0, minLoadTime - elapsed);

      setTimeout(function () {
        skeleton.classList.add("hide-skeleton");
        document.body.style.overflow = "";
        setTimeout(function () {
          skeleton.style.display = "none";
        }, 500);
      }, remaining);
    }

    if (document.readyState === "complete") {
      removeSkeleton();
    } else {
      window.addEventListener("load", removeSkeleton);
    }
  })();
})();
