// Main JavaScript file for portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeCustomCursor();
    initializeNavigation();
    initializeAnimations();
    initializeTheme();
    initializeScrollEffects();
    initializeTypingEffect();
    initializeForms();
    initializeInteractiveElements();
});

// Custom Cursor - works on all pages
function initializeCustomCursor() {
    let cursor = document.getElementById('custom-cursor');
    let cursorDot = document.getElementById('cursor-dot');

    if (!cursor || !cursorDot) {
        // Create cursor elements if they don't exist
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

    // Smooth cursor movement
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';

        requestAnimationFrame(updateCursor);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    updateCursor();

    // Add hover effects to interactive elements
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .gallery-item, .filter-btn, input, textarea, .social-icon, .nav-link, .mobile-nav-link, .neon-btn');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

function initializeNavigation() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    
    function toggleMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('translate-x-full');
            const icon = mobileMenuBtn?.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('translate-x-full')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        }
    }

    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('translate-x-full');
            const icon = mobileMenuBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function initializeAnimations() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .skill-card, .card-3d');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeTheme() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (themeToggle) {
        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.classList.add(savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.classList.remove(currentTheme);
            html.classList.add(newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
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
}

function initializeScrollEffects() {
    // Navbar scroll effects
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('nav-blur');
            } else {
                navbar.classList.remove('nav-blur');
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScrollTop = scrollTop;
        updateProgressBar();
    });

    // Progress bar
    function updateProgressBar() {
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initializeTypingEffect() {
    const typingTexts = [
        "Software Engineering Student 🎓",
        "Full Stack Developer 💻",
        "Tech Enthusiast 🌟",
        "Problem Solver 🧩",
        "Innovation Seeker 🚀",
        "Code Craftsman ⚡",
        "Digital Creator 🎨"
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');

    if (typingElement) {
        function typeEffect() {
            const currentText = typingTexts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }
}

function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : '';

            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
                submitBtn.disabled = true;
            }

            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();

                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 2000);
        });
    }
}

// Project filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-cyber-cyan', 'text-black');
                btn.classList.add('text-white');
            });
            this.classList.add('active', 'bg-cyber-cyan', 'text-black');
            this.classList.remove('text-white');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Initialize interactive elements
function initializeInteractiveElements() {
    // Floating particles on hover
    const cards = document.querySelectorAll('.glass, .project-card, .skill-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            createHoverParticles(e.target);
        });
    });

    // Interactive navigation links with ripple effect
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            createRippleEffect(e);
        });
    });

    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.neon-btn, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // Parallax scrolling for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Interactive skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

function createHoverParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #00FFDE, #FF3366);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleBurst 1s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

function createRippleEffect(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(0,255,222,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    e.target.style.position = 'relative';
    e.target.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Update current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

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
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .hover-particle {
        animation: particleBurst 1s ease-out forwards;
    }
    
    .cursor-hover {
        transform: scale(2) !important;
        background: rgba(0, 255, 222, 0.2) !important;
        box-shadow: 0 0 30px rgba(0, 255, 222, 0.8) !important;
    }
    
    .interactive-glow {
        transition: all 0.3s ease;
    }
    
    .interactive-glow:hover {
        box-shadow: 0 0 20px rgba(0, 255, 222, 0.3);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    Welcome to Mathiya's                      ║
║                     Portfolio! 🚀                           ║
║                                                              ║
║    Built with ❤️, lots of ☕, and cutting-edge tech         ║
║                                                              ║
║    Features:                                                 ║
║    • Responsive Design                                       ║
║    • Dark/Light Mode                                         ║
║    • Smooth Animations                                       ║
║    • Interactive Elements                                    ║
║                                                              ║
║    Let's connect and build something amazing together! 🤝    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
