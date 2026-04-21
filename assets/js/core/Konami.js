// Konami.js
export class Konami {
  constructor() {
    this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.mathiya = ['m', 'a', 't', 'h', 'i', 'y', 'a'];
    this.input = [];
    this.mInput = [];
    
    window.addEventListener('keydown', (e) => {
      this.input.push(e.key);
      this.input.splice(-this.sequence.length - 1, this.input.length - this.sequence.length);
      
      if (this.input.join(',') === this.sequence.join(',')) {
        this.triggerKonami();
        this.input = [];
      }

      this.mInput.push(e.key.toLowerCase());
      this.mInput.splice(-this.mathiya.length - 1, this.mInput.length - this.mathiya.length);
      
      if (this.mInput.join('') === this.mathiya.join('')) {
        this.triggerMathiya();
        this.mInput = [];
      }
    });

    window.mathiya = {
      sudo: (cmd) => this.sudo(cmd),
      help: () => this.help()
    };
  }

  triggerKonami() {
    window.dispatchEvent(new CustomEvent('toast:show', {
      detail: { type: 'success', message: 'Konami Code Activated! Matrix Mode ON.' }
    }));
    document.body.style.filter = 'invert(1)';
    setTimeout(() => document.body.style.filter = 'none', 4000);
  }

  triggerMathiya() {
    window.dispatchEvent(new CustomEvent('toast:show', {
      detail: { type: 'success', message: 'Hello, Creator.' }
    }));
  }

  sudo(cmd) {
    console.log(\`Running: \${cmd}\`);
    switch(cmd) {
      case 'matrix': this.triggerKonami(); break;
      case 'help': this.help(); break;
      default: console.warn('Command not found. Try window.mathiya.help()');
    }
  }

  help() {
    console.table([
      { Command: 'matrix', Action: 'Activate matrix mode' },
      { Command: 'help', Action: 'Show this menu' }
    ]);
  }
}
