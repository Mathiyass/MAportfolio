/**
 * EASTER EGGS — v10.0
 * Konami + Signature codes.
 */
export class Konami {
  constructor() {
    this.sequences = {
      konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
      mathiya: ['m', 'a', 't', 'h', 'i', 'y', 'a']
    };
    
    this.indices = {
      konami: 0,
      mathiya: 0
    };

    this.bind();
  }

  bind() {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      
      for (const [name, seq] of Object.entries(this.sequences)) {
        if (key === seq[this.indices[name]].toLowerCase()) {
          this.indices[name]++;
          if (this.indices[name] === seq.length) {
            this.trigger(name);
            this.indices[name] = 0;
          }
        } else {
          this.indices[name] = 0;
        }
      }
    });
  }

  trigger(name) {
    if (name === 'konami') {
      document.body.style.filter = 'invert(1) hue-rotate(180deg)';
      setTimeout(() => document.body.style.filter = '', 5000);
      window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'CHEAT CODE ACTIVE' } }));
    }
    if (name === 'mathiya') {
       window.dispatchEvent(new CustomEvent('toast', { detail: { message: 'BUILDER MODE: UNLOCKED' } }));
    }
  }
}
