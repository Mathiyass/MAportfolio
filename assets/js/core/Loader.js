/**
 * EPIC CINEMATIC LOADER — v10.0 PREMIUM
 * 5-Phase structure with Apple-level motion design.
 */
export class Loader {
  constructor(options = {}) {
    this.container = document.createElement('div');
    this.container.id = 'premium-loader';
    this.setupStyles();
    this.render();
    this.isReturning = localStorage.getItem('mathiya_visited') === 'true';
    this.start();
  }

  setupStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #premium-loader {
        position: fixed;
        inset: 0;
        background: var(--bg-base);
        z-index: var(--z-loader);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: opacity var(--dur-slow) var(--ease-expo);
      }
      .loader-logo {
        font-family: var(--font-display);
        font-size: 72px;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: 0.1em;
        display: flex;
        overflow: hidden;
      }
      .loader-char {
        display: inline-block;
        transform: translateY(100%);
        opacity: 0;
      }
      .loader-tagline {
        font-family: var(--font-body);
        font-size: 18px;
        color: var(--text-secondary);
        margin-top: 24px;
        opacity: 0;
      }
      .loader-progress-line {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1px;
        background: var(--dual);
        width: 0%;
        transition: width 1.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .loader-status {
        position: fixed;
        bottom: 24px;
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--text-tertiary);
        opacity: 0;
      }
    `;
    document.head.appendChild(style);
  }

  render() {
    const chars = "MATHIYA".split('').map(c => `<span class="loader-char">${c}</span>`).join('');
    this.container.innerHTML = `
      <div class="loader-logo">${chars}</div>
      <div class="loader-tagline">I build things that matter.</div>
      <div class="loader-progress-line"></div>
      <div class="loader-status">Loading</div>
    `;
    document.body.appendChild(this.container);
    document.body.style.overflow = 'hidden';
  }

  async start() {
    const chars = this.container.querySelectorAll('.loader-char');
    const tagline = this.container.querySelector('.loader-tagline');
    const progress = this.container.querySelector('.loader-progress-line');
    const status = this.container.querySelector('.loader-status');

    if (this.isReturning) {
      progress.style.transitionDuration = '600ms';
      progress.style.width = '100%';
      await this.wait(600);
      this.exit();
      return;
    }

    // L1: Logo Reveal
    await this.wait(300);
    chars.forEach((c, i) => {
      setTimeout(() => {
        c.style.transition = 'all 800ms var(--ease-expo)';
        c.style.transform = 'translateY(0)';
        c.style.opacity = '1';
      }, i * 60);
    });

    // Tagline
    setTimeout(() => {
      tagline.style.transition = 'opacity 800ms ease';
      tagline.style.opacity = '1';
    }, chars.length * 60 + 400);

    // L2: Progress
    await this.wait(500);
    status.style.opacity = '1';
    progress.style.width = '100%';

    // L4: Exit
    await this.wait(2000);
    this.exit();
  }

  exit() {
    this.container.style.opacity = '0';
    document.body.style.overflow = '';
    localStorage.setItem('mathiya_visited', 'true');
    setTimeout(() => {
      this.container.remove();
      window.dispatchEvent(new CustomEvent('loader:complete'));
    }, 600);
  }

  wait(ms) { return new Promise(r => setTimeout(resolve, ms)); }
}
