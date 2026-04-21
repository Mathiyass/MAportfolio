// Loader.js
export class Loader {
  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'mathiya-loader';
    this.container.style.cssText = `
      position: fixed; inset: 0; z-index: var(--z-loader);
      background: var(--bg-base); display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      transition: opacity var(--dur-epic) var(--ease-expo);
    `;

    const text = document.createElement('div');
    text.className = 'loader-text';
    text.style.cssText = `
      font-family: var(--font-display); font-size: clamp(32px, 5vw, 64px);
      color: var(--text-0); letter-spacing: 2px;
      background: var(--dual-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    `;
    text.textContent = 'MATHIYA';

    const barContainer = document.createElement('div');
    barContainer.style.cssText = `
      position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
      background: var(--bg-muted);
    `;

    this.bar = document.createElement('div');
    this.bar.style.cssText = `
      height: 100%; width: 0%; background: var(--dual);
      transition: width 1600ms var(--ease-expo);
    `;
    barContainer.appendChild(this.bar);

    this.container.appendChild(text);
    this.container.appendChild(barContainer);
    document.body.appendChild(this.container);

    this.init();
  }

  init() {
    // Quick mode if returning visitor
    const returning = sessionStorage.getItem('visited');
    const delay = returning ? 400 : 1600;
    
    setTimeout(() => {
      this.bar.style.width = '100%';
    }, 50);

    setTimeout(() => {
      this.container.style.opacity = '0';
      setTimeout(() => {
        this.container.remove();
        document.body.querySelectorAll('.content-hidden').forEach(el => {
          el.style.transition = 'opacity var(--dur-mid)';
          el.style.opacity = '1';
          el.classList.remove('content-hidden');
        });
        window.dispatchEvent(new Event('loader:complete'));
      }, 1100);
    }, delay);

    sessionStorage.setItem('visited', 'true');
  }
}
