import { easeOutExpo } from '../utils/math.js';

export class CountUp {
  constructor(el, target, options = {}) {
    this.el = el;
    this.target = target;
    this.duration = options.duration || 2000;
    this.prefix = options.prefix || '';
    this.suffix = options.suffix || '';
    this.locale = options.locale || 'en-US';
    
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.hasRun = false;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.start();
        } else {
          // Reset if it scrolls out of view for re-triggering
          this.hasRun = false;
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(this.el);
  }

  start() {
    if (this.hasRun) return;
    this.hasRun = true;

    if (this.isReducedMotion) {
      this._updateValue(this.target);
      return;
    }

    const startVal = 0;
    const startMs = performance.now();
    let lastInt = 0;

    const loop = (ms) => {
      const p = Math.min((ms - startMs) / this.duration, 1);
      const ease = easeOutExpo(p);
      const current = startVal + (this.target - startVal) * ease;
      const currentInt = Math.floor(current);

      if (currentInt > lastInt) {
        this.el.style.animation = 'none';
        this.el.offsetHeight; // trigger reflow
        this.el.style.animation = 'countBeat 0.2s';
        lastInt = currentInt;
      }

      this._updateValue(currentInt);

      if (p < 1) {
        requestAnimationFrame(loop);
      } else {
        this._updateValue(this.target);
      }
    };

    requestAnimationFrame(loop);
  }

  _updateValue(val) {
    const formatted = new Intl.NumberFormat(this.locale).format(val);
    this.el.textContent = \`\${this.prefix}\${formatted}\${this.suffix}\`;
  }
}

