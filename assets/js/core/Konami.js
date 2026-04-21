import { on } from '../utils/dom.js';

export class Konami {
  constructor() {
    this.sequences = {
      konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
      mathiya: ['m', 'a', 't', 'h', 'i', 'y', 'a'],
      sudo: ['s', 'u', 'd', 'o']
    };
    
    this.indices = {
      konami: 0,
      mathiya: 0,
      sudo: 0
    };

    this.bindEvents();
  }

  bindEvents() {
    on(window, 'keydown', (e) => {
      const key = e.key.toLowerCase();
      
      for (const [name, seq] of Object.entries(this.sequences)) {
        const targetKey = seq[this.indices[name]].toLowerCase();
        
        if (key === targetKey || (e.key === seq[this.indices[name]])) {
          this.indices[name]++;
          if (this.indices[name] === seq.length) {
            window.dispatchEvent(new CustomEvent(`easter-egg:${name}`));
            this.indices[name] = 0;
          }
        } else {
          this.indices[name] = 0;
        }
      }
    });
  }
}

