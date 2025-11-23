// Enhanced Main JavaScript file for portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhanced components
    initializeEnhancedCursor();
    initializeAdvancedNavigation();
    initializeEnhancedAnimations();
    initializeAdvancedTheme();
    initializeEnhancedScrollEffects();
    initializeEnhancedForms();
    initializeAdvancedInteractiveElements();
    initializePerformanceOptimization();
    initializeAccessibilityFeatures();
    initializeEasterEgg();
    initializeMusicToggle();

    // Initialize Global Modules
    import('./components/widgets/CommandPalette.js').then(module => {
        new module.CommandPalette();
    });
});

// Global function called by loader
window.startMainContentAnimation = function() {
    // Re-initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // Any other start-up logic that should wait for loader
    console.log("Main content animation started");
};

// Music Toggle
function initializeMusicToggle() {
    const musicToggle = document.getElementById('music-toggle');
    const music = document.getElementById('background-music');

    if (musicToggle && music) {
        musicToggle.addEventListener('click', function() {
            if (music.paused) {
                music.play().catch(e => console.error("Audio play failed:", e));
                this.innerHTML = '<i class="fas fa-volume-up text-cyber-cyan"></i>';
            } else {
                music.pause();
                this.innerHTML = '<i class="fas fa-volume-mute text-cyber-cyan"></i>';
            }
        });
    }
}

// "MATHIYA" Keyboard Easter Egg
function initializeEasterEgg() {
    const sequence = ['m', 'a', 't', 'h', 'i', 'y', 'a'];
    let keySequence = [];

    document.addEventListener('keydown', function(e) {
        if (e.key.length === 1) { // Ignore keys like Shift, Ctrl, etc.
            keySequence.push(e.key.toLowerCase());
            keySequence = keySequence.slice(-sequence.length); // Keep the array size of the target sequence

            if (JSON.stringify(keySequence) === JSON.stringify(sequence)) {
                const logo = document.querySelector('.gradient-text a');
                if (logo) {
                    logo.classList.add('logo-easter-egg-animation');
                    setTimeout(() => {
                        logo.classList.remove('logo-easter-egg-animation');
                    }, 1500); // Remove class after animation ends
                }
                keySequence = []; // Reset sequence
            }
        }
    });
}

// Enhanced Custom Cursor with advanced features
function initializeEnhancedCursor() {
    let cursor = document.getElementById('custom-cursor');
    let cursorDot = document.getElementById('cursor-dot');

    if (!cursor || !cursorDot) {
        cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.className = 'custom-cursor';
        
        cursorDot = document.createElement('div');
        cursorDot.id = 'cursor-dot';
        cursorDot.className = 'cursor-dot';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    // Enhanced smooth cursor movement with different speeds
    function updateCursor() {
        // Cursor follows with slight delay
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        // Dot follows faster
        dotX += (mouseX - dotX) * 0.15;
        dotY += (mouseY - dotY) * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(updateCursor);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    updateCursor();

    // Enhanced hover effects for different element types
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .gallery-item, .filter-btn, input, textarea, .social-icon, .nav-link, .mobile-nav-link, .neon-btn, .enhanced-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
            
            // Add ripple effect on hover
            createRippleEffect(el);
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });

        // Click burst effect
        el.addEventListener('click', (e) => {
            createClickBurst(e.clientX, e.clientY);
        });
    });
}

// Advanced Navigation with smooth transitions
function initializeAdvancedNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    
    let lastScrollTop = 0;
    let isScrollingDown = false;

    // Enhanced navbar scroll behavior
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            // Add blur effect when scrolling
            if (scrollTop > 50) {
                navbar.classList.add('backdrop-blur-lg', 'bg-black/20');
            } else {
                navbar.classList.remove('backdrop-blur-lg', 'bg-black/20');
            }

            // Smart hide/show navbar
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                if (!isScrollingDown) {
                    navbar.style.transform = 'translateY(-100%)';
                    isScrollingDown = true;
                }
            } else {
                if (isScrollingDown) {
                    navbar.style.transform = 'translateY(0)';
                    isScrollingDown = false;
                }
            }
        }

        lastScrollTop = scrollTop;
    });

    // Enhanced mobile menu with animations
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        if (isActive) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        } else {
            mobileMenu.classList.add('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-bars');
            mobileMenuBtn.querySelector('i').classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Enhanced smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Animations with advanced effects
function initializeEnhancedAnimations() {
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
            delay: 100
        });
    }

    // Enhanced card hover effects with 3D transforms
    const cards = document.querySelectorAll('.enhanced-card, .project-card, .skill-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-15px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Add glow effect
            this.style.boxShadow = '0 25px 50px rgba(0, 255, 222, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
            this.style.boxShadow = 'none';
        });

        // Enhanced mousemove effect for cards
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `translateY(-15px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Advanced Theme System
function initializeAdvancedTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Smooth theme transition
            html.style.transition = 'all 0.3s ease';
            html.classList.remove(currentTheme);
            html.classList.add(newTheme);
            
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            updateCursorColors(newTheme);
            
            setTimeout(() => {
                html.style.transition = '';
            }, 300);
        });
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                } else {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
        }
    }

    function updateCursorColors(theme) {
        const cursor = document.getElementById('custom-cursor');
        const cursorDot = document.getElementById('cursor-dot');

        if (cursor && cursorDot) {
            if (theme === 'dark') {
                cursor.style.borderColor = '#00FFDE';
                cursorDot.style.backgroundColor = '#00FFDE';
            } else {
                cursor.style.borderColor = '#FF3366';
                cursorDot.style.backgroundColor = '#FF3366';
            }
        }
    }
}

// Enhanced Scroll Effects
function initializeEnhancedScrollEffects() {
    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Update progress bar
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }

        // Show/hide back to top button
        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
                backToTopBtn.style.transform = 'scale(1)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
                backToTopBtn.style.transform = 'scale(0.5)';
            }
        }
    });

    // Enhanced back to top functionality
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add click animation
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Advanced Typing Effect
function initializeAdvancedTypingEffect() {
    // This function is now empty as the typing effect is handled by Typed.js in animations.js
}

// Enhanced Forms with validation
function initializeEnhancedForms() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Enhanced input styling
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.style.boxShadow = '0 0 20px rgba(0, 255, 222, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                this.style.boxShadow = '';
                
                // Validate on blur
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    validateInput(this);
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;

                // Enhanced loading state
                submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
                submitBtn.disabled = true;
                submitBtn.style.pointerEvents = 'none';

                // Simulate form submission
                setTimeout(() => {
                    showModal('Message Sent', '<p class="text-center text-lg">Thank you for reaching out! I will get back to you shortly.</p>');
                    this.reset();
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.pointerEvents = 'auto';
                }, 2000);
            }
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;

        // Remove previous error styling
        input.classList.remove('error');
        
        if (input.required && !value) {
            input.classList.add('error');
            isValid = false;
        } else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('error');
                isValid = false;
            }
        }

        return isValid;
    }
}

// Advanced Interactive Elements
function initializeAdvancedInteractiveElements() {
    // Enhanced floating particles on hover
    const interactiveElements = document.querySelectorAll('.enhanced-card, .neon-btn, .project-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            createHoverParticles(this);
        });
    });

    const profilePic = document.getElementById('profile-picture-container');
    if (profilePic) {
        profilePic.addEventListener('mouseenter', function(e) {
            createHoverParticles(this);
        });
    }

    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.neon-btn, .filter-btn');
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // Enhanced skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.style.boxShadow = '0 0 15px rgba(0, 255, 222, 0.5)';
                    
                    // Add number counting animation
                    animateNumber(bar.parentElement.querySelector('.skill-percentage'), 0, parseInt(width), 1000);
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('[data-aos]');
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => fadeObserver.observe(element));
}

// Performance Optimization
function initializePerformanceOptimization() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounced scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Update scroll-dependent effects here
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Preload critical resources
    const criticalResources = [
        'assets/images/Profile Picture.jpg',
        'assets/images/Profile Picture 2.jpg'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Accessibility Features
function initializeAccessibilityFeatures() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals/menus
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }

        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
        
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
}

// Utility Functions
function createHoverParticles(element) {
    const particleCount = 8;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #00FFDE, #FF3366);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleBurst 1s ease-out forwards;
        `;
        
        const startX = rect.left + Math.random() * rect.width;
        const startY = rect.top + Math.random() * rect.height;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: radial-gradient(circle, rgba(0,255,222,0.3) 0%, transparent 70%);
        border-radius: 50%;
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function createClickBurst(x, y) {
    const burstCount = 6;
    
    for (let i = 0; i < burstCount; i++) {
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #00FFDE;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
            animation: clickBurst 0.6s ease-out forwards;
            transform: rotate(${i * 60}deg);
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => burst.remove(), 600);
    }
}

function animateNumber(element, start, end, duration) {
    if (!element) return;
    
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.round(start + (end - start) * progress);
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#00FFDE' : '#FF3366'};
        color: ${type === 'success' ? '#000' : '#fff'};
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showModal(title, contentHtml) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content glass">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold font-orbitron gradient-text">${title}</h2>
                <button class="modal-close text-2xl text-gray-400 hover:text-cyber-cyan">&times;</button>
            </div>
            <div>${contentHtml}</div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('click', () => {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('fade-out');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleBurst {
        0% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-50px);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
    
    @keyframes clickBurst {
        0% {
            transform: scale(1) translateX(0);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateX(50px);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #FF3366 !important;
        box-shadow: 0 0 10px rgba(255, 51, 102, 0.5) !important;
    }
    
    .focused {
        transform: translateY(-2px);
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #00FFDE !important;
        outline-offset: 2px !important;
    }
    
    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        border-top-color: #000;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .modal-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0,0,0,0.7);
        backdrop-filter: blur(10px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }
    .modal-overlay.fade-out {
        animation: fadeOut 0.3s ease forwards;
    }
    .modal-content {
        padding: 2rem;
        border-radius: 1rem;
        max-width: 500px;
        width: 90%;
        animation: slideIn 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(30px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(style);

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log(`🚀 Portfolio loaded in ${entry.loadEventEnd - entry.loadEventStart}ms`);
        }
    });
});

if (window.PerformanceObserver) {
    performanceObserver.observe({ entryTypes: ['navigation'] });
}

// Enhanced Console Welcome Message
console.log(`
%c
╔══════════════════════════════════════════════════════════════╗
║                    MATHIYA'S PORTFOLIO                       ║
║                      🚀 Welcome! 🚀                          ║
║                                                              ║
║  Built with: HTML5 + Tailwind CSS + Vanilla JavaScript      ║
║  Theme: Cyber-Futuristic with Neon Glows                    ║
║  Performance: Optimized for speed and UX                    ║
║                                                              ║
║  Press ~ key to open terminal easter egg!                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
            `, 'color: #00FFDE; font-family: monospace; line-height: 1.2;');
