// Cursor.js
export class Cursor {
  constructor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.cursor = document.createElement('div');
    this.cursor.id = 'mathiya-cursor';
    this.cursor.style.cssText = `
      position: fixed; top: 0; left: 0; width: 36px; height: 36px;
      border-radius: 50%; border: 1px solid var(--cyan);
      pointer-events: none; z-index: var(--z-cursor);
      transform: translate(-50%, -50%); transition: width 0.2s, height 0.2s;
      mix-blend-mode: difference;
    `;

    this.dot = document.createElement('div');
    this.dot.style.cssText = `
      position: fixed; top: 0; left: 0; width: 6px; height: 6px;
      border-radius: 50%; background: var(--dual);
      pointer-events: none; z-index: var(--z-cursor);
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(this.cursor);
    document.body.appendChild(this.dot);

    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.mouse = { x: this.pos.x, y: this.pos.y };

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.dot.style.transform = \`translate(calc(\${this.mouse.x}px - 50%), calc(\${this.mouse.y}px - 50%))\`;
    });

    document.querySelectorAll('a, button, input, .card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.width = '60px';
        this.cursor.style.height = '60px';
        this.cursor.style.background = 'rgba(34,211,238,0.1)';
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.style.width = '36px';
        this.cursor.style.height = '36px';
        this.cursor.style.background = 'transparent';
      });
    });

    this.render();
  }

  render() {
    this.pos.x += (this.mouse.x - this.pos.x) * 0.15;
    this.pos.y += (this.mouse.y - this.pos.y) * 0.15;
    this.cursor.style.transform = \`translate(calc(\${this.pos.x}px - 50%), calc(\${this.pos.y}px - 50%))\`;
    requestAnimationFrame(() => this.render());
  }
}
