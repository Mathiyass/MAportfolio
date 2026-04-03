import { $, on, createElement, addStyles } from '../utils/dom.js';
import { lerp } from '../utils/math.js';

export class CustomCursor {
  constructor() {
    this.isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (this.isCoarse) return;

    this.ring = createElement('div', { className: 'custom-cursor-ring' });
    this.canvas = createElement('canvas', { className: 'custom-cursor-canvas' });
    this.ctx = this.canvas.getContext('2d');
    
    addStyles(this.ring, {
      position: 'fixed',
      width: '22px',
      height: '22px',
      border: '1.5px solid var(--cyan)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.15s ease-out, border-color 0.2s, mix-blend-mode 0.2s',
      mixBlendMode: 'normal'
    });

    addStyles(this.canvas, {
      position: 'fixed',
      inset: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '9998'
    });

    document.body.appendChild(this.ring);
    document.body.appendChild(this.canvas);

    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.lastPos = { x: this.pos.x, y: this.pos.y };
    this.particles = [];
    this.mode = 'cyan'; // 'cyan', 'red', 'dual'

    this._resize();
    this._bindEvents();
    this._loop();
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  _bindEvents() {
    on(window, 'resize', () => this._resize());
    on(document, 'mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;
      this._spawnParticles(3);
    });

    const interactiveElements = 'a, button, input, textarea, select, [data-interactive]';
    on(document, 'mouseover', (e) => {
      if (e.target.closest(interactiveElements)) {
        addStyles(this.ring, {
          transform: 'translate(-50%, -50%) scale(2.4)',
          borderColor: 'var(--red)',
          mixBlendMode: 'difference'
        });
      }
    });

    on(document, 'mouseout', (e) => {
      if (e.target.closest(interactiveElements)) {
        addStyles(this.ring, {
          transform: 'translate(-50%, -50%) scale(1)',
          borderColor: 'var(--cyan)',
          mixBlendMode: 'normal'
        });
      }
    });

    on(document, 'mousedown', () => {
      addStyles(this.ring, { transform: 'translate(-50%, -50%) scale(0.75)' });
    });

    on(document, 'mouseup', () => {
      addStyles(this.ring, { transform: 'translate(-50%, -50%) scale(1)' });
    });
  }

  _spawnParticles(count) {
    const dx = this.target.x - this.lastPos.x;
    const dy = this.target.y - this.lastPos.y;
    
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= 48) this.particles.shift();
      
      this.particles.push({
        x: this.target.x + (Math.random() - 0.5) * 4,
        y: this.target.y + (Math.random() - 0.5) * 4,
        vx: dx * 0.05 + (Math.random() - 0.5) * 2,
        vy: dy * 0.05 + (Math.random() - 0.5) * 2,
        life: 1.0,
        size: Math.random() * 2 + 1
      });
    }
  }

  setMode(mode) {
    this.mode = mode;
  }

  _loop() {
    this.pos.x = lerp(this.pos.x, this.target.x, 0.2);
    this.pos.y = lerp(this.pos.y, this.target.y, 0.2);
    
    if (Math.abs(this.pos.x - this.target.x) > 0.1 || Math.abs(this.pos.y - this.target.y) > 0.1) {
      this.ring.style.left = \`\${this.pos.x}px\`;
      this.ring.style.top = \`\${this.pos.y}px\`;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.03;
      p.size *= 0.95;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      let hue;
      if (this.mode === 'cyan') hue = 180;
      else if (this.mode === 'red') hue = 350;
      else hue = lerp(0, 180, p.life); // Dual: red (0) to cyan (180) based on life

      this.ctx.fillStyle = \`hsla(\${hue}, 100%, 50%, \${p.life})\`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.lastPos.x = this.target.x;
    this.lastPos.y = this.target.y;
    
    requestAnimationFrame(() => this._loop());
  }
}
