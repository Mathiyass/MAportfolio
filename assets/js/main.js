import { initializeEnhancedCursor } from './modules/cursor.js';
import { initializeAdvancedNavigation, initializeEnhancedScrollEffects } from './modules/navigation.js';
import { initAllAnimations } from './animations.js';
import { initializeAdvancedTheme } from './modules/theme.js';
import { initializeEnhancedForms } from './modules/forms.js';
import { initializeAdvancedInteractiveElements, initializeAccessibilityFeatures } from './modules/ui.js';
import { initializePerformanceOptimization } from './modules/performance.js';
import { initializeEasterEgg, initializeAdminAccess, initializeKonamiCode } from './modules/easter-eggs.js';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modular components
    initializeEnhancedCursor();
    initializeAdvancedNavigation();
    initializeEnhancedScrollEffects();
    initAllAnimations();
    initializeAdvancedTheme();
    initializeEnhancedForms();
    initializeAdvancedInteractiveElements();
    initializePerformanceOptimization();
    initializeAccessibilityFeatures();

    // Easter Eggs & Secrets
    initializeEasterEgg();
    initializeAdminAccess();
    initializeKonamiCode();

    // Core App Logic
    initializeMusicToggle();
    initializePageTransitions();
});

// Music Toggle
function initializeMusicToggle() {
    const musicToggle = document.getElementById('music-toggle');
    const music = document.getElementById('background-music');

    if (musicToggle && music) {
        musicToggle.addEventListener('click', function () {
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

// Page Transitions
function initializePageTransitions() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && link.hostname === window.location.hostname && href.indexOf('#') === -1 && link.getAttribute('target') !== '_blank') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.add('page-transition-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        }
    });

    document.body.classList.add('page-transition-in');
}

// Global function called by loader
window.startMainContentAnimation = function () {
    if (window.createStartOverlay) {
        window.createStartOverlay(window.revealMainContent);
    } else {
        window.revealMainContent();
    }
};

window.revealMainContent = function () {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
};

// Card Hover 3D Effects (Special case for better performance if kept here or can be moved to ui.js)
const cards = document.querySelectorAll('.enhanced-card, .project-card, .skill-card, .social-card');
cards.forEach(card => {
    if (window.matchMedia("(pointer: fine)").matches) {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;
            this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
});

console.log(`
%c
╔══════════════════════════════════════════════════════════════╗
║                    MATHIYA'S PORTFOLIO                       ║
║                      🚀 Welcome! 🚀                          ║
║                                                              ║
║  Built with: HTML5 + Tailwind CSS + Vanilla JavaScript      ║
║  Theme: Cyber-Futuristic with Neon Glows                    ║
║  Performance: Optimized with ES6 Modules                     ║
╚══════════════════════════════════════════════════════════════╝
`, 'color: #00FFDE; font-family: monospace; line-height: 1.2;');
