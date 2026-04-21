import { $, on, addStyles } from '../utils/dom.js';
import { lerp } from '../utils/math.js';

export class SmoothScroll {
  constructor() {
    this.container = $('#main');
    if (!this.container) return;

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.isReducedMotion) return;

    this.currentY = 0;
    this.targetY = 0;
    this.ease = 0.1;
    
    this.setup();
    this.bindEvents();
    this.loop();
  }

  setup() {
    document.body.style.height = `${this.container.scrollHeight}px`;
    addStyles(this.container, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      willChange: 'transform',
      overflow: 'hidden'
    });
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      this.targetY = window.scrollY;
    }, { passive: true });

    on(window, 'resize', () => {
      document.body.style.height = `${this.container.scrollHeight}px`;
    });
    
    new ResizeObserver(() => {
      document.body.style.height = `${this.container.scrollHeight}px`;
    }).observe(this.container);
  }

  loop() {
    this.currentY = lerp(this.currentY, this.targetY, this.ease);
    
    const diff = Math.abs(this.currentY - this.targetY);
    if (diff > 0.1) {
      this.container.style.transform = `translate3d(0, ${-this.currentY}px, 0)`;
    }

    requestAnimationFrame(() => this.loop());
  }
}

