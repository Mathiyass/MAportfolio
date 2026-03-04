/**
 * UI Effects Module
 */
import { animateNumber } from '../utils.js';

export function initializeAdvancedInteractiveElements() {
    const magneticElements = document.querySelectorAll('.neon-btn, .filter-btn');
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });
        element.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                    bar.style.boxShadow = '0 0 15px rgba(0, 255, 222, 0.5)';
                    const percentageEl = bar.parentElement.querySelector('.skill-percentage');
                    if (percentageEl) animateNumber(percentageEl, 0, parseInt(width), 1000);
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => skillObserver.observe(bar));
}

export function initializeAccessibilityFeatures() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) mobileMenu.classList.remove('active');
        }
        if (e.key === 'Tab') document.body.classList.add('keyboard-navigation');
    });
    document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-navigation'));
}
