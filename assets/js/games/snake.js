export class SnakeGame {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 20;
    this.tileCount = this.canvas.width / this.gridSize;
    
    this.score = 0;
    this.highScore = localStorage.getItem('mathiya-snake-hs') || 0;
    
    this.reset();
    this.bindEvents();
  }

  reset() {
    this.pos = { x: 10, y: 10 };
    this.vel = { x: 1, y: 0 };
    this.trail = [];
    this.tail = 5;
    this.apple = { x: 15, y: 15 };
    this.score = 0;
    this.isPaused = true;
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft': if(this.vel.x !== 1) this.vel = { x: -1, y: 0 }; break;
        case 'ArrowRight': if(this.vel.x !== -1) this.vel = { x: 1, y: 0 }; break;
        case 'ArrowUp': if(this.vel.y !== 1) this.vel = { x: 0, y: -1 }; break;
        case 'ArrowDown': if(this.vel.y !== -1) this.vel = { x: 0, y: 1 }; break;
      }
    });
  }

  start() {
    this.isPaused = false;
    this.loop();
  }

  loop() {
    if (this.isPaused) return;

    this.update();
    this.draw();
    setTimeout(() => requestAnimationFrame(() => this.loop()), 100);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x < 0) this.pos.x = this.tileCount - 1;
    if (this.pos.x > this.tileCount - 1) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = this.tileCount - 1;
    if (this.pos.y > this.tileCount - 1) this.pos.y = 0;

    for (let t of this.trail) {
      if (t.x === this.pos.x && t.y === this.pos.y) {
        this.reset();
        return;
      }
    }

    this.trail.push({ ...this.pos });
    while (this.trail.length > this.tail) this.trail.shift();

    if (this.pos.x === this.apple.x && this.pos.y === this.apple.y) {
      this.tail++;
      this.score += 10;
      this.spawnApple();
    }
  }

  spawnApple() {
    this.apple = {
      x: Math.floor(Math.random() * this.tileCount),
      y: Math.floor(Math.random() * this.tileCount)
    };
  }

  draw() {
    // Clear
    this.ctx.fillStyle = '#080C14';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid (subtle)
    this.ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
    for(let i=0; i<this.tileCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.gridSize, 0);
      this.ctx.lineTo(i * this.gridSize, this.canvas.height);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.gridSize);
      this.ctx.lineTo(this.canvas.width, i * this.gridSize);
      this.ctx.stroke();
    }

    // Snake
    this.ctx.fillStyle = '#22D3EE';
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = '#22D3EE';
    for(let t of this.trail) {
      this.ctx.fillRect(t.x * this.gridSize + 1, t.y * this.gridSize + 1, this.gridSize - 2, this.gridSize - 2);
    }

    // Apple
    this.ctx.fillStyle = '#FB7185';
    this.ctx.shadowColor = '#FB7185';
    this.ctx.fillRect(this.apple.x * this.gridSize + 2, this.apple.y * this.gridSize + 2, this.gridSize - 4, this.gridSize - 4);
    
    this.ctx.shadowBlur = 0;
  }
}

