// Snake.js
import { randomInt } from '../utils/math.js';

export class SnakeGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = 30;
    this.cols = canvas.width / this.size;
    this.rows = canvas.height / this.size;
    
    this.reset();
    
    document.addEventListener('keydown', e => {
      if (['ArrowUp','w'].includes(e.key) && this.dy === 0) { this.dx=0; this.dy=-1; }
      if (['ArrowDown','s'].includes(e.key) && this.dy === 0) { this.dx=0; this.dy=1; }
      if (['ArrowLeft','a'].includes(e.key) && this.dx === 0) { this.dx=-1; this.dy=0; }
      if (['ArrowRight','d'].includes(e.key) && this.dx === 0) { this.dx=1; this.dy=0; }
      
      // Easter egg "MADEV"
      this.inputCode += e.key.toLowerCase();
      if (this.inputCode.includes('madev')) {
        this.rainbowMode = true;
        this.inputCode = '';
        window.dispatchEvent(new CustomEvent('toast:show', {detail: {message: 'Rainbow mode unlocked!'}}));
      }
    });
  }

  reset() {
    this.snake = [{x: 5, y: 5}];
    this.dx = 1; this.dy = 0;
    this.score = 0;
    this.food = this.spawnFood();
    this.state = 'PLAYING';
    this.inputCode = '';
    this.rainbowMode = false;
  }

  spawnFood() {
    let f = { x: randomInt(0, this.cols-1), y: randomInt(0, this.rows-1) };
    while (this.snake.some(s => s.x === f.x && s.y === f.y)) {
      f = { x: randomInt(0, this.cols-1), y: randomInt(0, this.rows-1) };
    }
    return f;
  }

  update() {
    if (this.state !== 'PLAYING') return;

    const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

    // Walls
    if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.rows ||
        this.snake.some(s => s.x === head.x && s.y === head.y)) {
      this.state = 'GAME_OVER';
      this.canvas.parentElement.style.animation = 'clipRevealH 0.2s';
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.food = this.spawnFood();
    } else {
      this.snake.pop();
    }
  }

  draw() {
    this.ctx.fillStyle = 'rgba(8, 12, 20, 1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Food
    this.ctx.fillStyle = this.rainbowMode ? '#FFFFFF' : '#FB7185';
    this.ctx.beginPath();
    this.ctx.arc(this.food.x * this.size + this.size/2, this.food.y * this.size + this.size/2, this.size/2 - 2, 0, Math.PI*2);
    this.ctx.fill();

    // Snake
    this.snake.forEach((s, i) => {
      if (this.rainbowMode) {
        this.ctx.fillStyle = \`hsl(\${(i * 10 + Date.now() * 0.1) % 360}, 100%, 50%)\`;
      } else {
        const t = 1 - (i / this.snake.length);
        this.ctx.fillStyle = \`rgba(34, 211, 238, \${0.2 + 0.8 * t})\`;
      }
      this.ctx.fillRect(s.x * this.size + 1, s.y * this.size + 1, this.size - 2, this.size - 2);
    });

    if (this.state === 'GAME_OVER') {
      this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
      this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
      this.ctx.fillStyle = '#FB7185';
      this.ctx.font = '40px "Syne"';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('GAME OVER', this.canvas.width/2, this.canvas.height/2);
    }
  }

  loop() {
    this.update();
    this.draw();
    setTimeout(() => requestAnimationFrame(() => this.loop()), 100);
  }

  start() {
    this.reset();
    this.loop();
  }
}
