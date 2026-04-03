import { on } from '../utils/dom.js';

export class Konami {
  constructor() {
    this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.madevSeq = ['m', 'a', 'd', 'e', 'v'];
    this.sudoSeq = ['s', 'u', 'd', 'o'];
    
    this.konamiIndex = 0;
    this.madevIndex = 0;
    this.sudoIndex = 0;

    this._bindEvents();
  }

  _bindEvents() {
    on(window, 'keydown', (e) => {
      const key = e.key;
      
      // Konami
      if (key === this.sequence[this.konamiIndex] || (this.sequence[this.konamiIndex] && key.toLowerCase() === this.sequence[this.konamiIndex].toLowerCase())) {
        this.konamiIndex++;
        if (this.konamiIndex === this.sequence.length) {
          window.dispatchEvent(new CustomEvent('konami'));
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }

      // MADEV
      if (key.toLowerCase() === this.madevSeq[this.madevIndex]) {
        this.madevIndex++;
        if (this.madevIndex === this.madevSeq.length) {
          window.dispatchEvent(new CustomEvent('madev-code'));
          this.madevIndex = 0;
        }
      } else {
        this.madevIndex = 0;
      }

      // SUDO
      if (key.toLowerCase() === this.sudoSeq[this.sudoIndex]) {
        this.sudoIndex++;
        if (this.sudoIndex === this.sudoSeq.length) {
          window.dispatchEvent(new CustomEvent('sudo-code'));
          this.sudoIndex = 0;
        }
      } else {
        this.sudoIndex = 0;
      }
    });
  }
}
