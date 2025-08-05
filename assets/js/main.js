// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Enhanced Typing Effect
const typingTexts = [
    "Software Engineer 💻",
    "Creative Coder 🎨", 
    "Tech Enthusiast 🚀",
    "Problem Solver 🧩",
    "Innovation Seeker ⚡",
    "Digital Creator 🌟"
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
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('backdrop-blur-xl', 'bg-opacity-90');
    } else {
        navbar.classList.remove('backdrop-blur-xl', 'bg-opacity-90');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
    
    // Update progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Custom Cursor
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    }, 50);
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .neon-btn, .card-3d');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Mobile Menu Enhanced
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
    
    const icon = this.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

closeMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
});

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (themeToggle) {
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
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Floating Particles
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 20 + 's';
        container.appendChild(particle);
    }
}

// This function will be called by loader.js when the loading animation is complete
window.startMainContentAnimation = function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
    
    typeEffect();
    createParticles();
    
    // GSAP animations for enhanced effects
    if (typeof gsap !== 'undefined') {
        gsap.from('.gradient-text', {
            duration: 2,
            scale: 0.5,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
        
        gsap.from('.card-3d', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }
};

// Console Easter Egg
console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║                    Welcome to Mathiya's                      ║
    ║                   Ultra-Modern Portfolio! 🚀                ║
    ║                                                              ║
    ║    Built with ❤️, lots of ☕, and cutting-edge tech         ║
    ║                                                              ║
    ║    🌟 Features:                                              ║
    ║    • Custom MATHIYA Drawing Animation                        ║
    ║    • Floating Particles & 3D Effects                        ║
    ║    • Glassmorphism & Neon Glows                             ║
    ║    • Responsive Design                                       ║
    ║    • Dark/Light Mode                                         ║
    ║    • Smooth Animations                                       ║
    ║                                                              ║
    ║    Let's connect and build something amazing together! 🤝    ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
`);