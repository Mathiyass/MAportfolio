// HexPuzzle.js
export class HexPuzzle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
  }
  
  reset() {
    this.grid = [];
    this.state = 'IDLE';
    this.score = 0;
    this.size = 30;
    // Basic hex grid init
    for(let i=0; i<7; i++) {
      this.grid[i] = [];
      for(let j=0; j<7; j++) {
        this.grid[i][j] = Math.floor(Math.random() * 5);
      }
    }
  }

  drawHex(x, y, r, color) {
    this.ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = 2 * Math.PI / 6 * (i + 0.5);
      const px = x + r * Math.cos(angle);
      const py = y + r * Math.sin(angle);
      if (i === 0) this.ctx.moveTo(px, py);
      else this.ctx.lineTo(px, py);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    this.ctx.stroke();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const colors = ['#22D3EE', '#FB7185', '#0891B2', '#E11D48', '#192336'];
    
    for(let i=0; i<7; i++) {
      for(let j=0; j<7; j++) {
        const x = 100 + i * this.size * 1.5;
        const y = 100 + j * this.size * 1.732 + (i%2 ? this.size*0.866 : 0);
        this.drawHex(x, y, this.size - 2, colors[this.grid[i][j]]);
      }
    }
  }

  start() {
    this.reset();
    this.draw();
  }
}
