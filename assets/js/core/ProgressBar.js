// ProgressBar.js
export class ProgressBar {
  constructor() {
    this.bar = document.createElement('div');
    this.bar.className = 'progress-bar';
    this.bar.style.cssText = \`
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      height: 4px; background: transparent;
    \`;

    this.fill = document.createElement('div');
    this.fill.className = 'fill';
    this.fill.style.cssText = \`
      height: 100%; background: var(--dual);
      transform-origin: left; transform: scaleX(0);
      transition: transform 0.1s linear;
    \`;
    this.bar.appendChild(this.fill);
    document.body.appendChild(this.bar);

    window.addEventListener('scroll', () => this.update());
    this.update();
  }

  update() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) || 0;
    this.fill.style.transform = \`scaleX(\${scrolled})\`;
  }
}
