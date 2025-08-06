// Enhanced main JavaScript with all new features
document.addEventListener('DOMContentLoaded', function() {
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
        "Digital Creator 🌟",
        "Game Developer 🎮",
        "UI/UX Designer 🎯"
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

    // Enhanced Navbar Scroll Effect with Scrollspy
    let lastScrollTop = 0;
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const scrollProgress = document.getElementById('scroll-progress');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background effect
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
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Scrollspy for navigation highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollTop >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-cyber-cyan');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-cyber-cyan');
            }
        });
    });

    // Custom Cursor Enhancement
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('cursor-dot');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
            }, 50);
        });

        // Enhanced cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .neon-btn, .card-3d, .project-card, .skill-card, .social-card, .gallery-item');
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

    // Enhanced Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
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

        if (closeMenu) {
            closeMenu.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        }

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyber-cyan to-cyber-red text-black rounded-full shadow-lg opacity-0 transition-all duration-300 z-50 hover:scale-110';
    backToTopBtn.style.pointerEvents = 'none';
    document.body.appendChild(backToTopBtn);

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

    // Floating Particles System
    function createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: linear-gradient(45deg, #00FFDE, #FF3366);
                border-radius: 50%;
                opacity: 0.6;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
                animation-delay: ${Math.random() * 20}s;
            `;
            container.appendChild(particle);
        }
    }

    // Enhanced 3D Card Effects
    const cards3D = document.querySelectorAll('.card-3d');
    cards3D.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('skill-bar')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const width = progressBar.getAttribute('data-width');
                        setTimeout(() => {
                            progressBar.style.width = width + '%';
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.glass, .skill-card, .project-card, .social-card').forEach(el => {
        observer.observe(el);
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
            if (mobileMenuBtn) {
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        }
        
        // Ctrl + K for search (future feature)
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            console.log('Search feature coming soon!');
        }
    });

    // Performance Monitoring
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Portfolio loaded in ${loadTime.toFixed(2)}ms`);
        
        // Log performance metrics
        if (performance.getEntriesByType) {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                console.log('Performance Metrics:', {
                    'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
                    'TCP Connection': navigation.connectEnd - navigation.connectStart,
                    'Request': navigation.responseStart - navigation.requestStart,
                    'Response': navigation.responseEnd - navigation.responseStart,
                    'DOM Processing': navigation.domContentLoadedEventEnd - navigation.responseEnd,
                    'Total Load Time': navigation.loadEventEnd - navigation.navigationStart
                });
            }
        }
    });

    // This function will be called by signature-loader.js when the loading animation is complete
    window.startMainContentAnimation = function() {
        // Re-initialize AOS after the loader is gone
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
        
        // Start the typing effect
        typeEffect();
        
        // Create particles
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
        ║                    Welcome to MATHIYA's                      ║
        ║                 Ultra-Advanced Portfolio! 🚀                ║
        ║                                                              ║
        ║    Built with ❤️, lots of ☕, and cutting-edge tech         ║
        ║                                                              ║
        ║    🌟 Features:                                              ║
        ║    • Signature Loading Animation                             ║
        ║    • Admin Panel (password protected)                       ║
        ║    • Terminal Easter Egg (press ~ key)                      ║
        ║    • Custom Cursor & Animations                             ║
        ║    • Responsive Design                                       ║
        ║    • Performance Optimized                                   ║
        ║                                                              ║
        ║    🔐 Admin Access: /admin.html                              ║
        ║    🖥️  Terminal: Press ~ key                                 ║
        ║                                                              ║
        ║    Let's connect and build something amazing together! 🤝    ║
        ║                                                              ║
        ╚══════════════════════════════════════════════════════════════╝
    `);

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
});