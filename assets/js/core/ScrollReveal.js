import { $$, addStyles } from '../utils/dom.js';

export class ScrollReveal {
  constructor() {
    this.elements = $$('[data-reveal]');
    if (!this.elements.length) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || 0;
          
          if (delay) {
            setTimeout(() => el.classList.add('visible'), delay);
          } else {
            el.classList.add('visible');
          }
          
          this.observer.unobserve(el);
        }
      });
    }, {
      threshold: [0, 0.1, 0.2, 0.3],
      rootMargin: '0px 0px -10% 0px'
    });

    this._setupStaggers();
    this.elements.forEach(el => this.observer.observe(el));
  }

  _setupStaggers() {
    const staggers = $$('.stagger');
    staggers.forEach(container => {
      const children = Array.from(container.children);
      children.forEach((child, i) => {
        addStyles(child, { '--i': i });
      });
    });
  }
}
