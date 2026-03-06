/**
 * ========================================================
 * MATHIYA PORTFOLIO - V2 FOUNDATION
 * CORE.JS: Gloabl Utilities, Lenis Smooth Scroll, Custom Cursor
 * ========================================================
 */

class CoreSystem {
    constructor() {
        this.initLenis();
        this.initCustomCursor();
        this.attachGlobalListeners();

        // Log initialization
        console.log("%c SYSTEM ONLINE: MATHIYA PORTFOLIO CORE V2 ", "background: #00FFDE; color: #000; font-weight: bold; padding: 4px; border-radius: 4px;");
    }

    /**
     * Initialize Lenis for buttery smooth scrolling
     */
    initLenis() {
        if (typeof Lenis === 'undefined') {
            console.warn('Lenis is not loaded. Ensure CDN is included.');
            return;
        }

        this.lenis = new Lenis({
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

        // Integrate Lenis with GSAP ScrollTrigger if present
        if (typeof ScrollTrigger !== 'undefined') {
            this.lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                this.lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        } else {
            const raf = (time) => {
                this.lenis.raf(time);
                requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
        }
    }

    /**
     * Advanced Magnetic Custom Cursor
     */
    initCustomCursor() {
        // Create cursor elements if they don't exist
        if (!document.getElementById('cursor-dot')) {
            const dot = document.createElement('div');
            dot.id = 'cursor-dot';
            document.body.appendChild(dot);
        }
        if (!document.getElementById('cursor-ring')) {
            const ring = document.createElement('div');
            ring.id = 'cursor-ring';
            document.body.appendChild(ring);
        }

        const cursorDot = document.getElementById('cursor-dot');
        const cursorRing = document.getElementById('cursor-ring');

        // GSAP quickTo for high performance following
        if (typeof gsap !== 'undefined') {
            let xTo = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3", force3D: true });
            let yTo = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3", force3D: true });

            let xRingTo = gsap.quickTo(cursorRing, "x", { duration: 0.4, ease: "power3.out", force3D: true });
            let yRingTo = gsap.quickTo(cursorRing, "y", { duration: 0.4, ease: "power3.out", force3D: true });

            window.addEventListener("mousemove", (e) => {
                xTo(e.clientX);
                yTo(e.clientY);
                xRingTo(e.clientX);
                yRingTo(e.clientY);
            });
        }

        // Add hover effects for interactive elements
        this.attachMagneticHover();
    }

    attachMagneticHover() {
        const interactiveElements = document.querySelectorAll('a, button, .interactive');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hover-active');
                // Reset magnetic transform
                if (typeof gsap !== 'undefined') {
                    gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
                }
            });

            // Magnetic effect calculation
            el.addEventListener('mousemove', (e) => {
                if (typeof gsap !== 'undefined') {
                    const rect = el.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    const distanceX = e.clientX - centerX;
                    const distanceY = e.clientY - centerY;

                    // Magnet strength factor
                    gsap.to(el, {
                        x: distanceX * 0.2,
                        y: distanceY * 0.2,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    attachGlobalListeners() {
        // Handle window resize logic
        window.addEventListener('resize', this.debounce(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 250));
    }

    // Utility: Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize core on DOM construct
document.addEventListener('DOMContentLoaded', () => {
    window.AppCore = new CoreSystem();
});
