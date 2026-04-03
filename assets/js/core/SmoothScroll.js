import { $, on, addStyles } from '../utils/dom.js';
import { lerp } from '../utils/math.js';

export class SmoothScroll {
  constructor() {
    this.container = $('.scroll-container');
    if (!this.container) return;

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.isReducedMotion) return;

    this.currentY = 0;
    this.targetY = 0;
    this.ease = 0.09;
    
    this.progress = 0;
    this.velocity = 0;
    this.direction = 1; // 1 down, -1 up

    this._setup();
    this._bindEvents();
    this._loop();
  }

  _setup() {
    document.body.style.height = \`\${this.container.getBoundingClientRect().height}px\`;
    addStyles(this.container, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      willChange: 'transform'
    });
  }

  _bindEvents() {
    on(window, 'scroll', () => {
      this.targetY = window.scrollY;
    }, { passive: true });

    on(window, 'resize', () => {
      document.body.style.height = \`\${this.container.getBoundingClientRect().height}px\`;
    });
    
    const ro = new ResizeObserver(() => {
      document.body.style.height = \`\${this.container.getBoundingClientRect().height}px\`;
    });
    ro.observe(this.container);
  }

  _loop() {
    const prevY = this.currentY;
    this.currentY = lerp(this.currentY, this.targetY, this.ease);
    
    // velocity
    this.velocity = this.currentY - prevY;
    if (Math.abs(this.velocity) > 0.1) {
      this.direction = this.velocity > 0 ? 1 : -1;
    }

    // transform
    const diff = Math.abs(this.currentY - this.targetY);
    if (diff > 0.1) {
      this.container.style.transform = \`translate3d(0, \${-this.currentY}px, 0)\`;
    }

    // progress
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    this.progress = maxScroll > 0 ? this.currentY / maxScroll : 0;
    
    // custom event
    window.dispatchEvent(new CustomEvent('scroll:progress', {
      detail: { progress: this.progress, velocity: this.velocity, direction: this.direction }
    }));

    requestAnimationFrame(() => this._loop());
  }
}
