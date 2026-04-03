import { $, createElement, on } from '../utils/dom.js';

export class ProgressBar {
  constructor() {
    this.bar = createElement('div', { className: 'progress' });
    this.fill = createElement('div', { className: 'progress-fill' });
    this.bar.appendChild(this.fill);
    
    // Typically placed at top or bottom of viewport
    this.bar.style.position = 'fixed';
    this.bar.style.top = '0';
    this.bar.style.left = '0';
    this.bar.style.zIndex = '10001';
    
    document.body.appendChild(this.bar);
    
    this._bindEvents();
  }

  _bindEvents() {
    on(window, 'scroll:progress', (e) => {
      const p = e.detail.progress;
      this.fill.style.width = \`\${p * 100}%\`;
      
      if (p > 0.99) {
        this.bar.style.opacity = '0';
      } else {
        this.bar.style.opacity = '1';
      }
    });
  }
}
