import { $, $$, on, createElement, addStyles } from '../utils/dom.js';

export class PageTransitions {
  constructor() {
    this.wipe = createElement('div', { className: 'page-wipe' });
    addStyles(this.wipe, {
      position: 'fixed',
      inset: '0',
      background: 'var(--void)',
      zIndex: '10000',
      pointerEvents: 'none',
      clipPath: 'inset(0 0 0 100%)',
      transition: 'clip-path 350ms var(--ease-expo)'
    });
    document.body.appendChild(this.wipe);

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this._bindEvents();
    
    // Enter transition
    if (!this.isReducedMotion) {
      addStyles(this.wipe, { clipPath: 'inset(0 0 0 0)' });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          addStyles(this.wipe, { clipPath: 'inset(0 100% 0 0)' });
        });
      });
    }
  }

  _bindEvents() {
    const links = $$('a[href]');
    links.forEach(link => {
      on(link, 'click', (e) => {
        const href = link.getAttribute('href');
        const target = link.target;
        
        if (
          href.startsWith('#') || 
          href.startsWith('mailto:') || 
          href.startsWith('tel:') || 
          target === '_blank' || 
          e.ctrlKey || e.metaKey || 
          link.hasAttribute('download')
        ) {
          return; // Let default behavior happen
        }

        e.preventDefault();
        this.navigate(href);
      });
    });
  }

  navigate(url) {
    if (this.isReducedMotion) {
      window.location.href = url;
      return;
    }

    // Fire glitch event if handled by shaders
    window.dispatchEvent(new CustomEvent('page:exit'));

    setTimeout(() => {
      addStyles(this.wipe, { clipPath: 'inset(0 0 0 0)', transition: 'clip-path 350ms var(--ease-expo)' });
      setTimeout(() => {
        window.location.href = url;
      }, 350);
    }, 200);
  }
}

