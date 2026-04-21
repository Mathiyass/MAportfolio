// MatrixRain.js
export class MatrixRain {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mode = 'dual'; // cyan, red, dual, rainbow
    this.opacity = 1;
    this.running = false;
    
    this.charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*)*&^%+-/~{[|`]}';
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.fontSize = 16;
    this.columns = this.canvas.width / this.fontSize;
    this.drops = Array.from({length: this.columns}).map(() => 1);
  }

  draw() {
    if (!this.running) return;

    this.ctx.fillStyle = \`rgba(8, 12, 20, 0.1)\`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.charset.charAt(Math.floor(Math.random() * this.charset.length));
      
      let color = '#22D3EE';
      if (this.mode === 'red') color = '#FB7185';
      else if (this.mode === 'dual') color = Math.random() > 0.5 ? '#22D3EE' : '#FB7185';

      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = this.opacity;
      this.ctx.font = this.fontSize + 'px "Geist Mono"';
      this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975)
        this.drops[i] = 0;

      this.drops[i]++;
    }
    
    requestAnimationFrame(() => this.draw());
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.draw();
  }

  stop() {
    this.running = false;
  }

  setOpacity(val) {
    this.opacity = val;
  }

  setMode(mode) {
    this.mode = mode;
  }
}
