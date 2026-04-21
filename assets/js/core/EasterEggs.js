import { toast } from './Toast.js';

export class EasterEggHandler {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('easter-egg:konami', () => {
      document.body.style.filter = 'invert(1) hue-rotate(180deg)';
      toast('CHEATER! [INV-MODE ACTIVE]');
      setTimeout(() => document.body.style.filter = '', 5000);
    });

    window.addEventListener('easter-egg:mathiya', () => {
      document.documentElement.style.setProperty('--cyan', '#FB7185');
      document.documentElement.style.setProperty('--red', '#22D3EE');
      toast('SIGNATURE COLOR SWAP');
    });

    window.addEventListener('easter-egg:sudo', () => {
      toast('ACCESS GRANTED. COMMANDS: hire, signal, konami.');
      window.sudo_access = true;
    });
  }
}

