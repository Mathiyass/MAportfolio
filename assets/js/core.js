/**
 * CORE.JS - Global Functionality & Initializations
 * Handles Lenis smooth scroll, GSAP base configs, Particles, and Navigation.
 */

class PortfolioCore {
    constructor() {
        this.initSmoothScroll();
        this.initParticles();
        this.initNavigation();
        this.initCustomCursor();
        this.initGlobalAnimations();
        this.initParallax();
        this.initNumberCounters();
    }

    initSmoothScroll() {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Integrate Lenis with GSAP ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        // Raf loop for Lenis fallback if GSAP ticker isn't handling it
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    initParticles() {
        if (typeof tsParticles !== 'undefined') {
            const containerId = 'particles-canvas';
            const container = document.getElementById(containerId);
            if (!container) return;

            tsParticles.load(containerId, {
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: { enable: true, mode: "push" },
                        onHover: { enable: true, mode: "repulse" },
                        resize: true,
                    },
                    modes: {
                        push: { quantity: 4 },
                        repulse: { distance: 100, duration: 0.4 },
                    },
                },
                particles: {
                    color: { value: ["#00d4ff", "#7c3aed", "#ffffff"] },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.1,
                        width: 1,
                    },
                    collisions: { enable: false },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: { default: "bounce" },
                        random: true,
                        speed: 0.5,
                        straight: false,
                    },
                    number: {
                        density: { enable: true, area: 800 },
                        value: 40,
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                    },
                    shape: { type: "circle" },
                    size: {
                        value: { min: 1, max: 3 },
                        random: true,
                    },
                },
                detectRetina: true,
            });
        }
    }

    initNavigation() {
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('backdrop-blur-md', 'shadow-lg', 'bg-black/20');
                } else {
                    header.classList.remove('backdrop-blur-md', 'shadow-lg', 'bg-black/20');
                }
            });
        }

        // Mobile Menu Toggle
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                // Basic fade animation
                if (!mobileMenu.classList.contains('hidden')) {
                    gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
                }
            });
        }
    }

    initCustomCursor() {
        // Check if device is touch
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, background-color 0.2s;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        const interactables = document.querySelectorAll('a, button, input, textarea, .glass-effect');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(0, 212, 255, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    }

    initGlobalAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Fade Up Elements
        const fadeUpElements = document.querySelectorAll('.animate-fade-up');
        fadeUpElements.forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Initialize Vanilla Tilt if present
        if (typeof VanillaTilt !== 'undefined') {
            const tiltElements = document.querySelectorAll('.tilt-card');
            if (tiltElements.length > 0) {
                VanillaTilt.init(tiltElements, {
                    max: 10,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.2,
                });
            }
        }
    }

    initParallax() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            gsap.to(el, {
                y: () => (ScrollTrigger.maxScroll(window) * speed),
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });
        });
    }

    initNumberCounters() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const counters = document.querySelectorAll('.count-up');
        counters.forEach(counter => {
            const target = parseFloat(counter.innerText.replace(/,/g, ''));
            const isSuffix = counter.innerText.includes('+') ? '+' : (counter.innerText.includes('k') ? 'k' : '');

            counter.innerText = '0' + isSuffix;

            gsap.to(counter, {
                innerText: target,
                duration: 2.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                onUpdate: function () {
                    let val = Math.round(this.targets()[0].innerText);
                    // Add back suffix if needed
                    counter.innerText = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + isSuffix;
                }
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioCore = new PortfolioCore();
});
