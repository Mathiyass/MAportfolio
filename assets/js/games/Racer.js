// Racer.js
export class MathiyaRacer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
  }

  reset() {
    this.player = { x: this.canvas.width/2, y: this.canvas.height - 100, w: 40, h: 80 };
    this.obstacles = [];
    this.coins = [];
    this.score = 0;
    this.speed = 5;
    this.state = 'PLAYING';
    
    document.addEventListener('mousemove', e => {
      if (this.state === 'PLAYING') {
        const rect = this.canvas.getBoundingClientRect();
        this.player.x = e.clientX - rect.left - this.player.w/2;
      }
    });

    // Mobile gyro support
    window.addEventListener('deviceorientation', e => {
      if (this.state === 'PLAYING' && e.gamma) {
        this.player.x += e.gamma;
        this.player.x = Math.max(0, Math.min(this.canvas.width - this.player.w, this.player.x));
      }
    });
  }

  update() {
    if(this.state !== 'PLAYING') return;

    this.speed += 0.001;
    this.score += this.speed * 0.1;

    if (Math.random() < 0.03) {
      this.obstacles.push({ x: Math.random() * (this.canvas.width - 40), y: -100, w: 40, h: 80 });
    }
    if (Math.random() < 0.02) {
      this.coins.push({ x: Math.random() * (this.canvas.width - 20), y: -50, r: 15 });
    }

    this.obstacles.forEach((o, i) => {
      o.y += this.speed;
      if (o.y > this.canvas.height) this.obstacles.splice(i, 1);
      
      // Collision
      if (this.player.x < o.x + o.w && this.player.x + this.player.w > o.x &&
          this.player.y < o.y + o.h && this.player.y + this.player.h > o.y) {
        this.state = 'GAME_OVER';
      }
    });

    this.coins.forEach((c, i) => {
      c.y += this.speed;
      if (c.y > this.canvas.height) this.coins.splice(i, 1);
      
      if (Math.hypot((this.player.x+this.player.w/2) - c.x, (this.player.y+this.player.h/2) - c.y) < 40) {
        this.coins.splice(i, 1);
        this.score += 500;
      }
    });
  }

  draw() {
    this.ctx.fillStyle = 'rgba(8, 12, 20, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Player
    this.ctx.fillStyle = '#22D3EE';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);

    // Obstacles
    this.ctx.fillStyle = '#FB7185';
    this.obstacles.forEach(o => this.ctx.fillRect(o.x, o.y, o.w, o.h));

    // Coins
    this.ctx.fillStyle = '#22D3EE';
    this.coins.forEach(c => {
      this.ctx.beginPath();
      this.ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
      this.ctx.fill();
    });
  }

  loop() {
    this.update();
    this.draw();
    if(this.state === 'PLAYING') requestAnimationFrame(() => this.loop());
  }

  start() {
    this.reset();
    this.loop();
  }
}
