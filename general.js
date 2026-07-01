
document.addEventListener("DOMContentLoaded", function() {
    // Hide the skeleton loader
    const skeletonLoader = document.getElementById('skeleton-loader');
    if (skeletonLoader) {
        // Use a timeout to simulate loading and avoid abrupt content shifts
        setTimeout(() => {
            skeletonLoader.style.display = 'none';
            // You might want to add a class to the body or main content to trigger animations
        }, 500); // Adjust the timeout as needed
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            document.documentElement.classList.remove('dark');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Set the initial theme
    const currentTheme = localStorage.getItem('nuralpath_theme') || 'light';
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('nuralpath_theme', newTheme);
        applyTheme(newTheme);
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLine1 = document.getElementById('menu-line-1');
    const menuLine2 = document.getElementById('menu-line-2');
    const menuLine3 = document.getElementById('menu-line-3');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Optional: Animate the hamburger icon
        menuLine1.classList.toggle('rotate-45');
        menuLine1.classList.toggle('translate-y-2');
        menuLine2.classList.toggle('opacity-0');
        menuLine3.classList.toggle('-rotate-45');
        menuLine3.classList.toggle('-translate-y-2');
    });

    // Testimonial slider
    const slider = document.getElementById('testimonial-slider');
    if (slider) {
        const track = document.getElementById('testimonial-track');
        const dots = document.querySelectorAll('#testimonial-dots button');
        let currentIndex = 0;

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('w-8', index === currentIndex);
                dot.classList.toggle('bg-accent', index === currentIndex);
                dot.classList.toggle('dark:bg-dark-accent', index === currentIndex);

                dot.classList.toggle('w-2', index !== currentIndex);
                dot.classList.toggle('bg-surface-300', index !== currentIndex);
                dot.classList.toggle('dark:bg-dark-border/40', index !== currentIndex);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index);
                updateSlider();
            });
        });

        // Optional: Auto-slide
        // setInterval(() => {
        //     currentIndex = (currentIndex + 1) % dots.length;
        //     updateSlider();
        // }, 5000);
    }

});
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate on reveal
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    // Handle all data-action clicks
    document.body.addEventListener('click', function(e) {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const context = target.dataset.context; // e.g., 'hero', 'cta'
        const course = target.dataset.course; // e.g., 'VLSI Design'
        const category = target.dataset.category; // e.g., 'DSA'

        switch (action) {
            case 'get-started':
                // Could open a specific signup modal or navigate
                showLoginModal('signup');
                console.log(`'Get Started' clicked from: ${context}`);
                break;
            case 'enroll':
                showConfirmation(`Do you want to enroll in ${course}?`, () => {
                    showToast('success', `Successfully enrolled in ${course}!`);
                });
                break;
            case 'view-all':
                // You might navigate to a full courses page
                showToast('info', 'Navigating to all courses page...');
                break;
            case 'category':
                 showToast('info', `Exploring the ${category} category.`);
                break;
            case 'talk-advisor':
                showModal('Contact Advisor', 'Our advisors will reach out to you within 24 hours. Please provide your contact details on the contact page.', '📅');
                break;
            case 'login':
                showLoginModal('login');
                break;
             case 'signup':
                showLoginModal('signup');
                break;
            default:
                console.log('Unknown action:', action);
        }
    });


// =================================================================================
// MODAL, TOAST, AND CONFIRMATION LOGIC
// =================================================================================

function showModal(title, message, icon) {
    const modal = document.getElementById('modal-backdrop');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal-icon').innerHTML = icon;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function showConfirmation(message, onConfirm) {
    const confirmModal = document.getElementById('confirm-backdrop');
    document.getElementById('confirm-message').textContent = message;

    const confirmOk = document.getElementById('confirm-ok');
    const confirmCancel = document.getElementById('confirm-cancel');
    
    // Clone and replace the OK button to remove old listeners
    const newOk = confirmOk.cloneNode(true);
    confirmOk.parentNode.replaceChild(newOk, confirmOk);

    newOk.addEventListener('click', () => {
        onConfirm();
        confirmModal.classList.add('hidden');
        confirmModal.classList.remove('flex');
    });

    confirmCancel.addEventListener('click', () => {
        confirmModal.classList.add('hidden');
        confirmModal.classList.remove('flex');
    });
    
    confirmModal.classList.remove('hidden');
    confirmModal.classList.add('flex');
}

function showToast(type = 'info', message = 'Something happened.') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };

    toast.className = `toast-skeuo flex items-center gap-3 rounded-xl p-4 text-sm font-medium shadow-lg animate-toast-in`;
    toast.innerHTML = `
        <span>${icons[type]}</span>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('animate-toast-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 3000);
}

// Close modals when clicking the overlay
document.getElementById('modal-overlay-close')?.addEventListener('click', () => {
    document.getElementById('modal-backdrop').classList.add('hidden');
    document.getElementById('modal-backdrop').classList.remove('flex');
});
document.getElementById('confirm-overlay-close')?.addEventListener('click', () => {
    document.getElementById('confirm-backdrop').classList.add('hidden');
    document.getElementById('confirm-backdrop').classList.remove('flex');
});
document.getElementById('modal-close-btn')?.addEventListener('click', () => {
    document.getElementById('modal-backdrop').classList.add('hidden');
    document.getElementById('modal-backdrop').classList.remove('flex');
});


// =================================================================================
// LOGIN/SIGNUP MODAL LOGIC
// =================================================================================
const loginModalBackdrop = document.getElementById('login-modal-backdrop');
const loginView = document.getElementById('login-view');
const signupView = document.getElementById('signup-view');
const forgotPasswordView = document.getElementById('forgot-password-view');
const forgotSuccessView = document.getElementById('forgot-success-view');

const views = {
    login: loginView,
    signup: signupView,
    forgot: forgotPasswordView,
    forgotSuccess: forgotSuccessView
};

function switchLoginView(viewName) {
    Object.values(views).forEach(view => view?.classList.add('hidden'));
    views[viewName]?.classList.remove('hidden');
}

function showLoginModal(initialView = 'login') {
    switchLoginView(initialView);
    loginModalBackdrop?.classList.remove('hidden');
    loginModalBackdrop?.classList.add('flex');
}

function hideLoginModal() {
    loginModalBackdrop?.classList.add('hidden');
    loginModalBackdrop?.classList.remove('flex');
}


// Event Listeners for switching views
document.getElementById('signup-link')?.addEventListener('click', () => switchLoginView('signup'));
document.getElementById('login-link')?.addEventListener('click', () => switchLoginView('login'));
document.getElementById('forgot-password-link')?.addEventListener('click', () => switchLoginView('forgot'));
document.getElementById('back-to-login-link')?.addEventListener('click', () => switchLoginView('login'));

// Event Listeners for closing the modal
document.getElementById('login-modal-overlay-close')?.addEventListener('click', hideLoginModal);
document.getElementById('login-modal-close-btn')?.addEventListener('click', hideLoginModal);
document.getElementById('forgot-success-close')?.addEventListener('click', hideLoginModal);

// Handle form submissions
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Your login logic here
    console.log('Login submitted');
    showToast('success', 'Logged in successfully!');
    setTimeout(hideLoginModal, 1000);
});

document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Your signup logic here
     const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
     if (password !== confirmPassword) {
        showToast('error', "Passwords do not match.");
        return;
    }
    console.log('Signup submitted');
    showToast('success', 'Account created successfully!');
    setTimeout(hideLoginModal, 1000);
});

document.getElementById('forgot-password-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Your forgot password logic here
    console.log('Forgot password submitted');
    switchLoginView('forgotSuccess');
});
