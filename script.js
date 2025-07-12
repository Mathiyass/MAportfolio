// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Enhanced Typing Effect
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
let typingElement;

function typeEffect() {
    if (!typingElement) {
        typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
    }
    
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

// Enhanced Navbar Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
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
    lastScrollTop = scrollTop;
    
    // Update progress bar
    updateProgressBar();
    
    // Update active nav link
    updateActiveNavLink();
});

// Progress Bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-cyber-cyan');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-cyber-cyan');
        }
    });
}

// Mobile Menu Enhanced
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
    
    // Animate hamburger icon
    const icon = this.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200);
    });
}

// Skills Section Observer
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Project Filter System
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active', 'bg-cyber-cyan', 'text-dark-bg'));
        this.classList.add('active', 'bg-cyber-cyan', 'text-dark-bg');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'slideUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Enhanced Project Cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced Contact Form
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            formStatus.classList.remove('hidden');
            formSuccess.classList.remove('hidden');
            formError.classList.add('hidden');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
                formSuccess.classList.add('hidden');
            }, 5000);
        }, 2000);
    });
}

// Dark/Light Mode Toggle
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
        
        // Add transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

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

// Particles.js Configuration
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00ffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Enhanced Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('ma-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                setTimeout(typeEffect, 500);
            }, 1000);
        }, 3500);
    }
});

// Update current year
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    if (section instanceof Element) {
        observer.observe(section);
    }
});

// Enhanced Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animate-float');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    }
});

// Performance Optimization: Lazy Loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console Easter Egg
console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║                    Welcome to Mathisha's                     ║
    ║                   Enhanced Portfolio! 🚀                    ║
    ║                                                              ║
    ║    Built with ❤️, lots of ☕, and cutting-edge tech         ║
    ║                                                              ║
    ║    🌟 Features:                                              ║
    ║    • Responsive Design                                       ║
    ║    • Dark/Light Mode                                         ║
    ║    • Smooth Animations                                       ║
    ║    • Interactive Elements                                    ║
    ║    • Performance Optimized                                   ║
    ║                                                              ║
    ║    Check out the source code:                                ║
    ║    🔗 github.com/Mathiyass/portfolio                         ║
    ║                                                              ║
    ║    Let's connect and build something amazing together! 🤝    ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
`);

// Advanced Features
class PortfolioEnhancements {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupAdvancedAnimations();
        this.setupPerformanceMonitoring();
        this.setupAccessibility();
    }
    
    setupAdvancedAnimations() {
        // Add stagger animations to skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Add hover effects to achievement badges
        const badges = document.querySelectorAll('.achievement-badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotateY(5deg)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotateY(0deg)';
            });
        });
    }
    
    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Portfolio loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
    
    setupAccessibility() {
        // Add focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, textarea');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid #00ffff';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
    }
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioEnhancements();
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here for PWA functionality
        console.log('Portfolio ready for PWA enhancement');
    });
}