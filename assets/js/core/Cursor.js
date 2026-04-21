import { createElement, addStyles, on } from '../utils/dom.js';
import { lerp } from '../utils/math.js';

export class CustomCursor {
  constructor() {
    this.isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (this.isCoarse) return;

    this.dot = createElement('div', { className: 'cursor-dot' });
    this.ring = createElement('div', { className: 'cursor-ring' });
    
    this.setupStyles();
    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);

    this.pos = { x: 0, y: 0 };
    this.dotPos = { x: 0, y: 0 };
    this.ringPos = { x: 0, y: 0 };
    
    this.isHovering = false;
    this.magneticEl = null;

    this.bindEvents();
    this.render();
  }

  setupStyles() {
    const common = {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: 'var(--z-cursor)',
      borderRadius: 'var(--r-full)',
      willChange: 'transform'
    };

    addStyles(this.dot, {
      ...common,
      width: '6px',
      height: '6px',
      background: 'var(--cyan)',
      boxShadow: 'var(--glow-c-s)'
    });

    addStyles(this.ring, {
      ...common,
      width: '40px',
      height: '40px',
      border: '1px solid var(--cyan-border)',
      transition: 'width 0.3s, height 0.3s, background 0.3s, border-color 0.3s'
    });
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
    });

    on(document, 'mouseenter', 'a, button, .card', () => {
      this.isHovering = true;
      this.ring.style.width = '80px';
      this.ring.style.height = '80px';
      this.ring.style.background = 'var(--cyan-ghost)';
    }, true);

    on(document, 'mouseleave', 'a, button, .card', () => {
      this.isHovering = false;
      this.ring.style.width = '40px';
      this.ring.style.height = '40px';
      this.ring.style.background = 'transparent';
    }, true);
  }

  render() {
    this.dotPos.x = lerp(this.dotPos.x, this.pos.x, 0.35);
    this.dotPos.y = lerp(this.dotPos.y, this.pos.y, 0.35);
    
    this.ringPos.x = lerp(this.ringPos.x, this.pos.x, 0.15);
    this.ringPos.y = lerp(this.ringPos.y, this.pos.y, 0.15);

    this.dot.style.transform = `translate(${this.dotPos.x - 3}px, ${this.dotPos.y - 3}px)`;
    this.ring.style.transform = `translate(${this.ringPos.x - 20}px, ${this.ringPos.y - 20}px)`;

    requestAnimationFrame(() => this.render());
  }
}

