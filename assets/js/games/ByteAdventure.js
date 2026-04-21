// ByteAdventure.js
export class ByteAdventure {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
  }

  reset() {
    this.player = { x: 50, y: 50, vx: 0, vy: 0, w: 32, h: 40, grounded: false };
    this.platforms = [
      {x: 0, y: 350, w: 800, h: 100},
      {x: 300, y: 250, w: 100, h: 20},
      {x: 500, y: 150, w: 100, h: 20}
    ];
    this.coins = [{x: 340, y: 220}, {x: 540, y: 120}];
    this.score = 0;
    this.keys = {};
    
    document.addEventListener('keydown', e => this.keys[e.code] = true);
    document.addEventListener('keyup', e => this.keys[e.code] = false);
  }

  update() {
    if (this.keys['ArrowRight']) this.player.vx = 5;
    else if (this.keys['ArrowLeft']) this.player.vx = -5;
    else this.player.vx = 0;

    if (this.keys['ArrowUp'] && this.player.grounded) {
      this.player.vy = -12;
      this.player.grounded = false;
    }

    this.player.vy += 0.5; // gravity
    this.player.x += this.player.vx;
    this.player.y += this.player.vy;

    this.player.grounded = false;
    this.platforms.forEach(p => {
      // Basic AABB collision
      if (this.player.x < p.x + p.w && this.player.x + this.player.w > p.x &&
          this.player.y < p.y + p.h && this.player.y + this.player.h > p.y) {
        
        if (this.player.vy > 0 && this.player.y + this.player.h - this.player.vy <= p.y) {
          this.player.grounded = true;
          this.player.vy = 0;
          this.player.y = p.y - this.player.h;
        }
      }
    });

    this.coins.forEach((c, i) => {
      if (Math.hypot(this.player.x + 16 - c.x, this.player.y + 20 - c.y) < 30) {
        this.coins.splice(i, 1);
        this.score += 100;
      }
    });

    if (this.player.y > this.canvas.height) this.reset();
  }

  draw() {
    this.ctx.fillStyle = 'rgba(8, 12, 20, 1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Platforms
    this.ctx.fillStyle = '#192336';
    this.ctx.strokeStyle = '#22D3EE';
    this.ctx.lineWidth = 1;
    this.platforms.forEach(p => {
      this.ctx.fillRect(p.x, p.y, p.w, p.h);
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(p.x + p.w, p.y);
      this.ctx.stroke();
    });

    // Coins
    this.ctx.fillStyle = '#22D3EE';
    this.coins.forEach(c => {
      this.ctx.beginPath();
      this.ctx.arc(c.x, c.y, 10, 0, Math.PI*2);
      this.ctx.fill();
    });

    // Player (Simplified BYTE)
    this.ctx.fillStyle = '#FB7185';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  start() {
    this.reset();
    this.loop();
  }
}
