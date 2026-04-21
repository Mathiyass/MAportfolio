/**
 * ========================================================
 * MTHISHA PORTFOLIO - V2 MAIN LOGIC
 * MAIN.JS: GSAP Config, Preloader, Page Specifics
 * ========================================================
 */

class MainApp {
    constructor() {
        this.initGSAP();
        this.runPreloader();
        this.setupPageTransitions();
        this.setupIntersectionObservers();
        this.initContactForm();
    }

    initGSAP() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded.');
            return;
        }

        // Register plugins
        gsap.registerPlugin(ScrollTrigger);

        // Global GSAP defaults
        gsap.defaults({
            ease: "expo.out",
            duration: 1.2
        });
    }

    runPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Animate the SVG Signature
        // Assumes path element has class .signature-svg path
        if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Hide preloader and reveal content
                    gsap.to(preloader, {
                        yPercent: -100,
                        duration: 1.5,
                        ease: "power4.inOut",
                        delay: 0.5,
                        onComplete: () => {
                            preloader.style.display = 'none';
                            this.initPageAnimations();
                        }
                    });
                }
            });

            // Draw SVG text
            tl.to('.signature-svg text', {
                strokeDashoffset: 0,
                duration: 2.5,
                ease: "power3.inOut"
            })
                // Pulse fill glow
                .to('.signature-svg text:not(.text-glow-svg)', {
                    fill: "#ffffff",
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5")
                // Fade out loading text
                .to('.loading-text', {
                    opacity: 0,
                    duration: 0.5
                }, "-=1");
        } else {
            // Fallback if GSAP is blocked
            setTimeout(() => {
                preloader.style.display = 'none';
                this.initPageAnimations();
            }, 2000);
        }
    }

    initPageAnimations() {
        // Initialize general page entrance animations
        if (typeof gsap === 'undefined') return;

        // Animate Navbar
        gsap.from('nav', {
            y: -100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out"
        });

        // Hero Content Entrance
        gsap.from('.hero-content > *', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: "power4.out",
            delay: 0.2
        });

        // Bind standard scroll triggers to elements with 'reveal-on-scroll' class
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(el => {
            gsap.fromTo(el,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    setupPageTransitions() {
        const links = document.querySelectorAll('a[href]:not([target="_blank"])');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Exclude hashes and special links
                if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

                const isInternal = link.hostname === window.location.hostname || !href.startsWith('http');
                if (isInternal) {
                    e.preventDefault();
                    this.runOutroAnimation(href);
                }
            });
        });
    }

    runOutroAnimation(href) {
        if (typeof gsap === 'undefined') {
            window.location.href = href;
            return;
        }

        const mask = document.createElement('div');
        mask.style.position = 'fixed';
        mask.style.top = '0';
        mask.style.left = '0';
        mask.style.width = '100vw';
        mask.style.height = '100vh';
        mask.style.backgroundColor = '#000'; // Deep space black
        mask.style.zIndex = '99999';
        mask.style.transform = 'translateY(100%)';

        // Add minimal mthisha logo or text in the center
        mask.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;height:100%;color:#00FFDE;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:2rem;letter-spacing:0.5rem;opacity:0.5;">MTHISHA</div>`;
        document.body.appendChild(mask);

        gsap.to(mask, {
            y: 0,
            duration: 0.8,
            ease: "expo.inOut",
            onComplete: () => {
                window.location.href = href;
            }
        });
    }

    setupIntersectionObservers() {
        if (typeof IntersectionObserver === 'undefined') return;

        const options = {
            root: null,
            rootMargin: '0px 0px 100px 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const endpoint = entry.target.getAttribute('data-fetch');
                    if (endpoint) {
                        console.log(`[SYS] Lazy loading data for: ${endpoint}`);
                        // In a real app, you would fetch data here.
                        entry.target.classList.add('data-loaded');
                        obs.unobserve(entry.target);
                    }
                }
            });
        }, options);

        document.querySelectorAll('[data-fetch]').forEach(el => observer.observe(el));
    }

    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Create and show Toast
            const toast = document.createElement('div');
            toast.className = 'fixed bottom-8 right-8 z-[100000] flex items-center gap-4 px-6 py-4 rounded-xl bg-black/80 border border-accent-cyan/50 backdrop-blur-xl shadow-glow-cyan text-white translate-y-20 opacity-0';
            toast.innerHTML = `
                <span class="material-symbols-outlined text-accent-cyan">check_circle</span>
                <div>
                    <h4 class="text-xs font-bold tracking-[0.2em] uppercase text-accent-cyan mb-1">Transmission Sent</h4>
                    <p class="text-[10px] text-white/50 uppercase tracking-widest">Routing through secure channels...</p>
                </div>
            `;
            document.body.appendChild(toast);

            if (typeof gsap !== 'undefined') {
                const tl = gsap.timeline();
                tl.to(toast, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
                    .to(toast, { y: 20, opacity: 0, duration: 0.4, ease: "power2.in" }, "+=3")
                    .call(() => toast.remove());
            } else {
                toast.style.transform = 'translateY(0)';
                toast.style.opacity = '1';
                setTimeout(() => toast.remove(), 3000);
            }

            form.reset();
        });
    }
}

// Boot application after Core JS has loaded
window.addEventListener('load', () => {
    // Small delay to ensure Lenis and Core are fully spun up
    setTimeout(() => {
        window.AppMain = new MainApp();
    }, 100);
});

