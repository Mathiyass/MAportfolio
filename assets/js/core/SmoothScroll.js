// SmoothScroll.js
export class SmoothScroll {
  constructor() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
        window.matchMedia('(pointer: coarse)').matches) return;

    this.scrollY = window.scrollY;
    this.targetY = window.scrollY;
    
    // Simplistic smooth scroll wrapping main content
    this.main = document.getElementById('main');
    if (!this.main) return;
    
    document.body.style.height = \`\${this.main.getBoundingClientRect().height}px\`;
    this.main.style.position = 'fixed';
    this.main.style.top = '0';
    this.main.style.left = '0';
    this.main.style.width = '100%';

    window.addEventListener('scroll', () => {
      this.targetY = window.scrollY;
    });

    window.addEventListener('resize', () => {
      document.body.style.height = \`\${this.main.getBoundingClientRect().height}px\`;
    });

    this.render();
  }

  render() {
    this.scrollY += (this.targetY - this.scrollY) * 0.09;
    this.main.style.transform = \`translateY(-\${this.scrollY}px)\`;
    requestAnimationFrame(() => this.render());
  }
}
