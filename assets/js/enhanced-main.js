// Enhanced main JavaScript with all new features
document.addEventListener('DOMContentLoaded', function() {

    // Initialize custom cursor
    initCustomCursor();

    // Initialize particle background
    initParticleBackground();

    // Initialize terminal easter egg
    initTerminalEasterEgg();

    // Initialize advanced animations
    initAdvancedAnimations();

    // Initialize performance monitoring
    initPerformanceMonitoring();

    function initCustomCursor() {
        const cursor = document.getElementById('custom-cursor');
        const cursorDot = document.getElementById('cursor-dot');

        if (!cursor || !cursorDot) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';

            requestAnimationFrame(updateCursor);
        }
        updateCursor();

        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .filter-btn');
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

    function initParticleBackground() {
        const container = document.getElementById('particles-container');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: linear-gradient(45deg, #00FFDE, #FF3366);
                border-radius: 50%;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
                animation-delay: ${Math.random() * 20}s;
            `;
            container.appendChild(particle);

            // Remove and recreate after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                    createParticle();
                }
            }, 30000);
        }
    }

    function initTerminalEasterEgg() {
        let sequence = '';
        const trigger = '~';

        document.addEventListener('keydown', (e) => {
            sequence += e.key;

            if (sequence.includes(trigger)) {
                openTerminal();
                sequence = '';
            }

            if (sequence.length > 10) {
                sequence = sequence.slice(-5);
            }
        });

        function openTerminal() {
            const terminal = document.createElement('div');
            terminal.innerHTML = `
                <div class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
                    <div class="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 font-mono text-green-400">
                        <div class="flex justify-between items-center mb-4">
                            <h3 class="text-lg font-bold">MATHIYA_TERMINAL_v2.0</h3>
                            <button onclick="this.closest('.fixed').remove()" class="text-red-400 hover:text-red-300">×</button>
                        </div>
                        <div class="space-y-2 text-sm">
                            <p><span class="text-cyan-400">mathiya@portfolio:~$</span> whoami</p>
                            <p>Mathiya Angirasa - Software Engineer</p>
                            <p><span class="text-cyan-400">mathiya@portfolio:~$</span> ls -la skills/</p>
                            <p>JavaScript, Python, React, Node.js, Game Development</p>
                            <p><span class="text-cyan-400">mathiya@portfolio:~$</span> cat contact.txt</p>
                            <p>Email: mathiya.angirasa@example.com</p>
                            <p>GitHub: github.com/Mathiyass</p>
                            <p><span class="text-cyan-400">mathiya@portfolio:~$</span> echo "Thanks for visiting!"</p>
                            <p class="text-yellow-400">Thanks for visiting!</p>
                            <p><span class="text-cyan-400">mathiya@portfolio:~$</span> <span class="animate-pulse">█</span></p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(terminal);
        }
    }

    function initAdvancedAnimations() {
        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('[data-parallax]');

            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // 3D card hover effects
        const cards = document.querySelectorAll('.card-3d');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    function initPerformanceMonitoring() {
        // Monitor performance and log to console
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`🚀 Portfolio loaded in ${loadTime}ms`);

            // Log a fancy console message
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
        });
    }
});

// Global utility functions
window.showNotification = function(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white font-semibold transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});