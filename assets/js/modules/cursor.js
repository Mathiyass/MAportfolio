/**
 * Custom Cursor Module
 */
import { createRippleEffect, createClickBurst } from '../utils.js';

export function initializeEnhancedCursor() {
    let cursor = document.getElementById('custom-cursor');
    let cursorDot = document.getElementById('cursor-dot');

    if (!cursor || !cursorDot) {
        cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.className = 'custom-cursor';

        cursorDot = document.createElement('div');
        cursorDot.id = 'cursor-dot';
        cursorDot.className = 'cursor-dot';

        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        dotX += (mouseX - dotX) * 0.15;
        dotY += (mouseY - dotY) * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(updateCursor);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    updateCursor();

    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .gallery-item, .filter-btn, input, textarea, .social-icon, .nav-link, .mobile-nav-link, .neon-btn, .enhanced-card, .social-card');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
            createRippleEffect(el);
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });

        el.addEventListener('click', (e) => {
            createClickBurst(e.clientX, e.clientY);
        });
    });
}

