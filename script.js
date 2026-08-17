(function () {
  "use strict";

  // ===== THEME TOGGLE =====
  var themeToggle = document.getElementById("theme-toggle");
  var sunIcon = document.getElementById("sun-icon");
  var moonIcon = document.getElementById("moon-icon");
  var htmlEl = document.documentElement;

  var isDark = localStorage.getItem("nuralpath_theme") === "dark";

  function applyTheme() {
    if (isDark) {
      htmlEl.classList.add("dark");
      if (sunIcon) sunIcon.classList.add("hidden");
      if (moonIcon) moonIcon.classList.remove("hidden");
    } else {
      htmlEl.classList.remove("dark");
      if (sunIcon) sunIcon.classList.remove("hidden");
      if (moonIcon) moonIcon.classList.add("hidden");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      isDark = !isDark;
      localStorage.setItem("nuralpath_theme", isDark ? "dark" : "light");
      applyTheme();
    });
  }

  applyTheme();

  // ===== NAVBAR SCROLL =====
  var navbar = document.getElementById("navbar");
  var navContainer = document.getElementById("nav-container");

  function updateNavbar() {
    if (!navbar || !navContainer) return;
    if (window.scrollY > 50) {
      navbar.classList.add(
        "bg-white/90", "dark:bg-dark-bg/90",
        "backdrop-blur-xl", "shadow-lg", "shadow-slate-200/50", "dark:shadow-black/20"
      );
      navContainer.classList.remove("mt-3", "glass");
      navContainer.classList.add("rounded-none");
    } else {
      navbar.classList.remove(
        "bg-white/90", "dark:bg-dark-bg/90",
        "backdrop-blur-xl", "shadow-lg", "shadow-slate-200/50", "dark:shadow-black/20"
      );
      navContainer.classList.add("mt-3", "glass");
      navContainer.classList.remove("rounded-none");
    }
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  // ===== MOBILE MENU =====
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var menuLine1 = document.getElementById("menu-line-1");
  var menuLine2 = document.getElementById("menu-line-2");
  var menuLine3 = document.getElementById("menu-line-3");
  var isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden");
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
      if (menuLine1) menuLine1.style.transform = "translateY(6px) rotate(45deg)";
      if (menuLine2) menuLine2.style.opacity = "0";
      if (menuLine3) menuLine3.style.transform = "translateY(-6px) rotate(-45deg)";
    } else {
      mobileMenu.style.maxHeight = "0";
      if (menuLine1) menuLine1.style.transform = "none";
      if (menuLine2) menuLine2.style.opacity = "1";
      if (menuLine3) menuLine3.style.transform = "none";
      setTimeout(function () {
        mobileMenu.classList.add("hidden");
      }, 300);
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  if (mobileMenu) {
    var mobileLinks = mobileMenu.querySelectorAll("a");
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener("click", function () {
        if (isMenuOpen) toggleMenu();
      });
    }
  }

  // ===== TESTIMONIAL SLIDER =====
  var track = document.getElementById("testimonial-track");
  var dotsContainer = document.getElementById("testimonial-dots");
  var dots = dotsContainer ? dotsContainer.querySelectorAll("button") : [];
  var currentSlide = 0;
  var totalSlides = dots.length;
  var slideInterval;

  function goToSlide(index) {
    if (!track || totalSlides === 0) return;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = "translateX(-" + currentSlide * 100 + "%)";

    for (var j = 0; j < dots.length; j++) {
      if (j === currentSlide) {
        dots[j].classList.add("bg-accent", "dark:bg-dark-accent", "w-8");
        dots[j].classList.remove("bg-surface-300", "dark:bg-white/15", "w-2");
      } else {
        dots[j].classList.remove("bg-accent", "dark:bg-dark-accent", "w-8");
        dots[j].classList.add("bg-surface-300", "dark:bg-white/15", "w-2");
      }
    }
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

  for (var d = 0; d < dots.length; d++) {
    dots[d].addEventListener("click", function () {
      var idx = parseInt(this.getAttribute("data-index"), 10);
      goToSlide(idx);
      startAutoSlide();
    });
  }

  var sliderEl = document.getElementById("testimonial-slider");
  if (sliderEl) {
    sliderEl.addEventListener("mouseenter", stopAutoSlide);
    sliderEl.addEventListener("mouseleave", startAutoSlide);
  }

  startAutoSlide();

  // ===== SCROLL REVEAL (IntersectionObserver) =====
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    for (var r = 0; r < revealEls.length; r++) {
      revealEls[r].style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
      revealEls[r].style.opacity = "0";
      revealEls[r].style.transform = "translateY(24px)";
      revealObserver.observe(revealEls[r]);
    }
  } else {
    // Fallback for old browsers
    function checkReveal() {
      for (var i = 0; i < revealEls.length; i++) {
        var el = revealEls[i];
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      }
    }
    for (var k = 0; k < revealEls.length; k++) {
      revealEls[k].style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";
      revealEls[k].style.opacity = "0";
      revealEls[k].style.transform = "translateY(24px)";
    }
    window.addEventListener("scroll", checkReveal, { passive: true });
    checkReveal();
  }

  // ===== SMOOTH SCROLL =====
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  for (var a = 0; a < anchorLinks.length; a++) {
    anchorLinks[a].addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 100;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  }

  // ===== MODAL =====
  var modalBackdrop = document.getElementById("modal-backdrop");
  var modalTitleEl = document.getElementById("modal-title");
  var modalMessageEl = document.getElementById("modal-message");
  var modalIconEl = document.getElementById("modal-icon");
  var modalCloseBtn = document.getElementById("modal-close-btn");
  var modalOverlayClose = document.getElementById("modal-overlay-close");

  function showModal(title, message, icon) {
    if (!modalBackdrop) return;
    if (modalTitleEl) modalTitleEl.textContent = title;
    if (modalMessageEl) modalMessageEl.textContent = message;
    if (modalIconEl) modalIconEl.textContent = icon || "";
    modalBackdrop.classList.remove("hidden");
    modalBackdrop.style.display = "flex";
    document.body.classList.add("modal-open");
  }

  function hideModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.add("hidden");
    modalBackdrop.style.display = "";
    document.body.classList.remove("modal-open");
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", hideModal);
  if (modalOverlayClose) modalOverlayClose.addEventListener("click", hideModal);

  // ===== CONFIRMATION MODAL =====
  var confirmBackdrop = document.getElementById("confirm-backdrop");
  var confirmMessageEl = document.getElementById("confirm-message");
  var confirmCancelBtn = document.getElementById("confirm-cancel");
  var confirmOkBtn = document.getElementById("confirm-ok");
  var confirmOverlayClose = document.getElementById("confirm-overlay-close");
  var confirmCallback = null;

  function showConfirm(message, callback) {
    if (!confirmBackdrop) return;
    if (confirmMessageEl) confirmMessageEl.textContent = message || "This action cannot be undone.";
    confirmBackdrop.classList.remove("hidden");
    confirmBackdrop.style.display = "flex";
    document.body.classList.add("modal-open");
    confirmCallback = callback;
  }

  function hideConfirm() {
    if (!confirmBackdrop) return;
    confirmBackdrop.classList.add("hidden");
    confirmBackdrop.style.display = "";
    document.body.classList.remove("modal-open");
    confirmCallback = null;
  }

  if (confirmCancelBtn) confirmCancelBtn.addEventListener("click", hideConfirm);
  if (confirmOkBtn) {
    confirmOkBtn.addEventListener("click", function () {
      if (confirmCallback) confirmCallback();
      hideConfirm();
    });
  }
  if (confirmOverlayClose) confirmOverlayClose.addEventListener("click", hideConfirm);

  // ===== TOAST =====
  var toastContainer = document.getElementById("toast-container");

  function showToast(message, type) {
    if (!toastContainer) return;
    type = type || "info";
    var iconMap = { success: "✅", error: "❌", info: "💡", warning: "⚠️" };
    var borderMap = {
      success: "border-l-green-500",
      error: "border-l-red-500",
      info: "border-l-accent",
      warning: "border-l-warm"
    };

    var toast = document.createElement("div");
    toast.className =
      "toast flex items-center gap-3 rounded-xl border border-surface-300/60 bg-white px-5 py-3 shadow-lg shadow-slate-200/50 pointer-events-auto " +
      "dark:bg-[#12182B] dark:border-white/10 " +
      "border-l-4 max-w-sm " +
      (borderMap[type] || borderMap.info);

    toast.innerHTML =
      '<span class="text-lg flex-shrink-0">' + (iconMap[type] || "💡") + "</span>" +
      '<span class="text-sm text-ink-700 dark:text-dark-textMuted">' + message + "</span>";

    toastContainer.appendChild(toast);

    setTimeout(function () {
      toast.classList.add("removing");
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // ===== BUTTON ACTIONS =====
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
        var ctx = el.getAttribute("data-context") || "";
        if (ctx === "cta") {
          showLoginModal("signup");
        } else {
          showLoginModal("signup");
        }
        break;
      case "enroll":
        var course = el.getAttribute("data-course") || "this course";
        showConfirm("Do you want to enroll in " + course + "?", function () {
          showToast("Enrolled in " + course + "! 🎉", "success");
        });
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
          if (modalTitleEl) modalTitleEl.textContent = "Connected! ✅";
          if (modalMessageEl) modalMessageEl.textContent = "An advisor will reach out to you within 24 hours. Check your email for details.";
          if (modalIconEl) modalIconEl.textContent = "✅";
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

  // ===== LOGIN MODAL =====
  var loginModalBackdrop = document.getElementById("login-modal-backdrop");
  var loginView = document.getElementById("login-view");
  var signupView = document.getElementById("signup-view");
  var forgotPasswordView = document.getElementById("forgot-password-view");
  var forgotSuccessView = document.getElementById("forgot-success-view");
  var loginForm = document.getElementById("login-form");
  var signupForm = document.getElementById("signup-form");
  var forgotPasswordForm = document.getElementById("forgot-password-form");

  var views = {
    login: loginView,
    signup: signupView,
    forgot: forgotPasswordView,
    "forgot-success": forgotSuccessView
  };

  function switchLoginView(viewName) {
    var keys = Object.keys(views);
    for (var v = 0; v < keys.length; v++) {
      if (views[keys[v]]) views[keys[v]].classList.add("hidden");
    }
    if (views[viewName]) views[viewName].classList.remove("hidden");
  }

  function showLoginModal(view) {
    if (!loginModalBackdrop) return;
    loginModalBackdrop.classList.remove("hidden");
    loginModalBackdrop.style.display = "flex";
    document.body.classList.add("modal-open");
    switchLoginView(view || "login");
  }

  function hideLoginModal() {
    if (!loginModalBackdrop) return;
    loginModalBackdrop.classList.add("hidden");
    loginModalBackdrop.style.display = "";
    document.body.classList.remove("modal-open");
    if (loginForm) loginForm.reset();
    if (signupForm) signupForm.reset();
    if (forgotPasswordForm) forgotPasswordForm.reset();
    switchLoginView("login");
  }

  // Close buttons
  var loginModalCloseBtn = document.getElementById("login-modal-close-btn");
  var loginModalOverlayClose = document.getElementById("login-modal-overlay-close");
  if (loginModalCloseBtn) loginModalCloseBtn.addEventListener("click", hideLoginModal);
  if (loginModalOverlayClose) loginModalOverlayClose.addEventListener("click", hideLoginModal);

  // View switchers
  var signupLink = document.getElementById("signup-link");
  var loginLink = document.getElementById("login-link");
  var forgotPasswordLink = document.getElementById("forgot-password-link");
  var backToLoginLink = document.getElementById("back-to-login-link");
  var forgotSuccessClose = document.getElementById("forgot-success-close");

  if (signupLink) signupLink.addEventListener("click", function () { switchLoginView("signup"); });
  if (loginLink) loginLink.addEventListener("click", function () { switchLoginView("login"); });
  if (forgotPasswordLink) forgotPasswordLink.addEventListener("click", function () { switchLoginView("forgot"); });
  if (backToLoginLink) backToLoginLink.addEventListener("click", function () { switchLoginView("login"); });
  if (forgotSuccessClose) forgotSuccessClose.addEventListener("click", hideLoginModal);

  // ===== LOCAL AUTH =====
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
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) return users[i];
    }
    return null;
  }

  function setCurrentUser(user) {
    localStorage.setItem("nuralpath_current_user", JSON.stringify(user));
  }

  // Login
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

  // Signup
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
      var newUser = { name: name, email: email, password: password, createdAt: new Date().toISOString() };
      saveUser(newUser);
      setCurrentUser(newUser);
      showToast("Account created! Welcome, " + name + "!", "success");
      hideLoginModal();
    });
  }

  // Forgot password
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("forgot-email").value.trim();
      if (!email) {
        showToast("Please enter your email", "error");
        return;
      }
      switchLoginView("forgot-success");
    });
  }

  // ===== KEYBOARD =====
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (modalBackdrop && !modalBackdrop.classList.contains("hidden")) hideModal();
      if (confirmBackdrop && !confirmBackdrop.classList.contains("hidden")) hideConfirm();
      if (loginModalBackdrop && !loginModalBackdrop.classList.contains("hidden")) hideLoginModal();
    }
  });

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
