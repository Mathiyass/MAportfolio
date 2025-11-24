/**
 * GSAP Animation Suite for Mathiya's Portfolio
 * Implements high-performance animations using GSAP & ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations
    initCursorEffect();
    initScrollAnimations();
    initHoverEffects();
    initTextAnimations();
});

/**
 * Hero Section Animation Trigger
 * Called by signature-loader.js when loading is complete
 */
window.startMainContentAnimation = function() {
    console.log("Starting Main Content Animation via GSAP");
    document.body.classList.remove('overflow-hidden');

    const tl = gsap.timeline();

    // Hero Text Stagger
    tl.from("h1.glitch", {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power4.out",
        stagger: 0.2
    })
    .from(".typing-text", {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: "power2.out"
    }, "-=0.5")
    .from("p", {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: "power2.out"
    }, "-=0.8")
    .from(".neon-btn, .border-2", {
        duration: 0.8,
        opacity: 0,
        y: 20,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.5")
    .from(".social-card", {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.5");

    // Profile Image Reveal
    gsap.from("#profile-picture-container", {
        duration: 1.5,
        x: 100,
        opacity: 0,
        ease: "power4.out",
        delay: 0.5
    });

    // Initialize AOS as a fallback/complement
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }
};

/**
 * Scroll-Triggered Animations
 */
function initScrollAnimations() {
    // Section Headers
    gsap.utils.toArray("section h2").forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Enhanced Cards (About, Skills, etc.)
    gsap.utils.toArray(".enhanced-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // Project Cards
    gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // Dynamic Parallax Injection
    const heroProfile = document.querySelector("#profile-picture-container");
    if (heroProfile && !heroProfile.hasAttribute("data-parallax")) {
        heroProfile.setAttribute("data-parallax", "0.2");
    }

    // Parallax Effect for Background Elements
    gsap.utils.toArray("[data-parallax]").forEach(layer => {
        const depth = parseFloat(layer.getAttribute("data-parallax")) || 0.2;
        const movement = -(layer.offsetHeight * depth) || -50; // Fallback movement

        gsap.to(layer, {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            y: movement,
            ease: "none"
        });
    });
}

/**
 * Magnetic Hover Effects
 */
function initHoverEffects() {
    const magnets = document.querySelectorAll('.neon-btn, .social-card, .filter-btn');

    magnets.forEach((magnet) => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(magnet, {
                duration: 0.3,
                x: x * 0.2, // strength
                y: y * 0.2,
                rotation: x * 0.02,
                ease: "power2.out"
            });
        });

        magnet.addEventListener('mouseleave', () => {
            gsap.to(magnet, {
                duration: 0.5,
                x: 0,
                y: 0,
                rotation: 0,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

/**
 * Advanced Text Animations
 */
function initTextAnimations() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        gsap.to(text, {
            backgroundPosition: "200% center",
            duration: 3,
            repeat: -1,
            ease: "linear"
        });
    });
}

/**
 * Enhanced Cursor Logic (Self-Healing)
 */
function initCursorEffect() {
    let cursor = document.getElementById('custom-cursor');
    let dot = document.getElementById('cursor-dot');

    // Dynamic Injection if missing
    if (!cursor || !dot) {
        // Create styles
        const style = document.createElement('style');
        style.textContent = `
            #custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: 40px;
                height: 40px;
                border: 2px solid #00FFDE;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: none; /* GSAP handles movement */
                mix-blend-mode: difference;
            }
            #cursor-dot {
                position: fixed;
                top: 0;
                left: 0;
                width: 8px;
                height: 8px;
                background-color: #00FFDE;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                mix-blend-mode: difference;
            }
            @media (max-width: 768px) {
                #custom-cursor, #cursor-dot { display: none; }
            }
        `;
        document.head.appendChild(style);

        // Create elements
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.id = 'custom-cursor';
            document.body.appendChild(cursor);
        }
        if (!dot) {
            dot = document.createElement('div');
            dot.id = 'cursor-dot';
            document.body.appendChild(dot);
        }
    }

    // Add logic only if elements exist (which they should now)
    if (cursor && dot) {
        // Initial set to off-screen
        gsap.set([cursor, dot], {xPercent: -50, yPercent: -50, x: -100, y: -100});

        window.addEventListener('mousemove', (e) => {
            // Smooth follower
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out"
            });

            // Instant dot
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0
            });
        });

        // Hover states
        const hoverables = document.querySelectorAll('a, button, .enhanced-card, .social-card, .project-card');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 2,
                    backgroundColor: "rgba(0, 255, 222, 0.1)",
                    border: "1px solid rgba(0, 255, 222, 0.5)",
                    duration: 0.3
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: "transparent",
                    border: "2px solid #00FFDE",
                    duration: 0.3
                });
            });
        });
    }
}
