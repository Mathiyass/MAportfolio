import { $, createElement, addStyles } from '../utils/dom.js';

export class MatrixRain {
  constructor(container = document.body) {
    this.container = container;
    this.canvas = createElement('canvas', { className: 'matrix-rain-canvas' });
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    
    addStyles(this.canvas, {
      position: 'fixed',
      inset: '0',
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: '9997',
      opacity: '0',
      transition: 'opacity 2s ease-out'
    });

    this.container.appendChild(this.canvas);

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Characters
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    this.chars = (katakana + latin + nums).split('');

    this.fontSize = 16;
    this.columns = [];
    this.drops = [];
    this.speeds = [];
    this.modes = [];

    this.rafId = null;
    this.mode = 'cyan'; // 'cyan', 'red', 'dual'
    this.active = false;

    this._resize();
    window.addEventListener('resize', () => this._resize());
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    const colCount = Math.floor(this.canvas.width / this.fontSize);
    
    // Keep existing drops if resizing, otherwise init
    const newDrops = [];
    const newSpeeds = [];
    const newModes = [];
    
    for (let i = 0; i < colCount; i++) {
      newDrops[i] = this.drops[i] !== undefined ? this.drops[i] : Math.random() * -100;
      newSpeeds[i] = this.speeds[i] || (Math.random() * 1.4 + 0.4);
      newModes[i] = this.modes[i] || (Math.random() > 0.9 ? 'red' : 'cyan'); // 10% red
    }
    
    this.drops = newDrops;
    this.speeds = newSpeeds;
    this.modes = newModes;
  }

  start() {
    if (this.isReducedMotion || this.active) return;
    this.active = true;
    this.canvas.style.opacity = '1';
    this._loop();
  }

  stop() {
    if (!this.active) return;
    this.active = false;
    this.canvas.style.opacity = '0';
    cancelAnimationFrame(this.rafId);
  }

  setOpacity(n) {
    this.canvas.style.opacity = n.toString();
    if (n > 0 && !this.active) this.start();
  }

  setMode(mode) {
    this.mode = mode;
  }

  _loop() {
    if (!this.active) return;

    this.ctx.fillStyle = 'rgba(3, 3, 10, 0.05)'; // Trail fade
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = \`\${this.fontSize}px 'JetBrains Mono', monospace\`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)];
      
      let colMode = this.modes[i];
      if (this.mode === 'cyan') colMode = 'cyan';
      else if (this.mode === 'red') colMode = 'red';
      // else 'dual' keeps the 10% red generated in _resize

      if (Math.random() > 0.9) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Bright head
      } else {
        this.ctx.fillStyle = colMode === 'red' ? '#FF4D6D' : '#00E5FF';
      }

      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i] += this.speeds[i];
    }

    this.rafId = requestAnimationFrame(() => this._loop());
  }
}

