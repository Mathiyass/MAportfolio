// QuebeInvaders.js
export class QuebeInvaders {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
  }

  reset() {
    this.player = { x: this.canvas.width/2, y: this.canvas.height - 40, w: 40, h: 40 };
    this.bullets = [];
    this.enemies = [];
    this.particles = [];
    
    for(let i=0; i<4; i++) {
      for(let j=0; j<10; j++) {
        this.enemies.push({ x: 50 + j * 60, y: 50 + i * 50, w: 30, h: 30, type: i });
      }
    }
    
    this.state = 'PLAYING';
    this.score = 0;
    this.keys = {};
    
    document.addEventListener('keydown', e => this.keys[e.code] = true);
    document.addEventListener('keyup', e => this.keys[e.code] = false);
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' && this.state === 'PLAYING') {
        this.bullets.push({x: this.player.x + 18, y: this.player.y, w: 4, h: 15});
      }
    });
  }

  update() {
    if(this.state !== 'PLAYING') return;

    if (this.keys['ArrowLeft']) this.player.x -= 5;
    if (this.keys['ArrowRight']) this.player.x += 5;

    this.bullets.forEach((b, i) => {
      b.y -= 10;
      if (b.y < 0) this.bullets.splice(i, 1);
    });

    for(let i=this.enemies.length-1; i>=0; i--) {
      const e = this.enemies[i];
      e.x += Math.sin(Date.now() * 0.002) * 2;
      
      for(let j=this.bullets.length-1; j>=0; j--) {
        const b = this.bullets[j];
        if (b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
          this.enemies.splice(i, 1);
          this.bullets.splice(j, 1);
          this.score += 100;
          this.createExplosion(e.x + e.w/2, e.y + e.h/2);
          break;
        }
      }
    }

    this.particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.life--;
      if (p.life <= 0) this.particles.splice(i, 1);
    });

    if (this.enemies.length === 0) this.state = 'WIN';
  }

  createExplosion(x, y) {
    for(let i=0; i<15; i++) {
      this.particles.push({
        x, y, 
        vx: (Math.random()-0.5)*10, 
        vy: (Math.random()-0.5)*10, 
        life: 30,
        color: '#FB7185'
      });
    }
  }

  draw() {
    this.ctx.fillStyle = 'rgba(8, 12, 20, 1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#22D3EE';
    this.ctx.beginPath();
    this.ctx.moveTo(this.player.x + 20, this.player.y);
    this.ctx.lineTo(this.player.x + 40, this.player.y + 40);
    this.ctx.lineTo(this.player.x, this.player.y + 40);
    this.ctx.fill();

    this.ctx.fillStyle = '#22D3EE';
    this.bullets.forEach(b => this.ctx.fillRect(b.x, b.y, b.w, b.h));

    this.enemies.forEach(e => {
      this.ctx.strokeStyle = e.type === 0 ? '#22D3EE' : '#FB7185';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(e.x, e.y, e.w, e.h);
    });

    this.particles.forEach(p => {
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.life / 30;
      this.ctx.fillRect(p.x, p.y, 4, 4);
    });
    this.ctx.globalAlpha = 1;
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
