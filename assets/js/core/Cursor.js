/**
 * PREMIUM MAGNETIC CURSOR — v10.0
 * Difference blending + Lerped magnetic ring.
 */
export class CustomCursor {
  constructor() {
    this.isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (this.isCoarse) return;

    this.ring = document.createElement('div');
    this.ring.className = 'cursor-ring';
    
    this.dot = document.createElement('div');
    this.dot.className = 'cursor-dot';

    this.setupStyles();
    document.body.appendChild(this.ring);
    document.body.appendChild(this.dot);

    this.pos = { x: 0, y: 0 };
    this.ringPos = { x: 0, y: 0 };
    this.dotPos = { x: 0, y: 0 };
    
    this.bind();
    this.loop();
  }

  setupStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cursor-ring, .cursor-dot {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: var(--z-cursor);
        border-radius: 50%;
        will-change: transform;
      }
      .cursor-ring {
        width: 36px;
        height: 36px;
        border: 1.5px solid rgba(34, 211, 238, 0.5);
        mix-blend-mode: difference;
        transition: width 0.3s, height 0.3s, border-color 0.3s;
      }
      .cursor-dot {
        width: 4px;
        height: 4px;
        background: var(--cyan);
        box-shadow: var(--glow-cyan-s);
      }
      .cursor-active .cursor-ring {
        width: 64px;
        height: 64px;
        background: rgba(34, 211, 238, 0.1);
        border-color: var(--cyan);
      }
    `;
    document.head.appendChild(style);
  }

  bind() {
    window.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
    });

    document.querySelectorAll('a, button, .card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });
  }

  loop() {
    this.dotPos.x += (this.pos.x - this.dotPos.x) * 0.25;
    this.dotPos.y += (this.pos.y - this.dotPos.y) * 0.25;

    this.ringPos.x += (this.pos.x - this.ringPos.x) * 0.12;
    this.ringPos.y += (this.pos.y - this.ringPos.y) * 0.12;

    this.dot.style.transform = `translate3d(${this.dotPos.x - 2}px, ${this.dotPos.y - 2}px, 0)`;
    this.ring.style.transform = `translate3d(${this.ringPos.x - 18}px, ${this.ringPos.y - 18}px, 0)`;

    requestAnimationFrame(() => this.loop());
  }
}
