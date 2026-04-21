/**
 * PREMIUM CINEMATIC LOADER
 * 5-Phase Reveal System
 */
export class Loader {
  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'mathiya-loader';
    this.setupStyles();
    this.render();
    this.start();
  }

  setupStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #mathiya-loader {
        position: fixed;
        inset: 0;
        background: #080C14;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 800;
        transition: opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .loader-brand {
        font-family: 'Clash Display', sans-serif;
        font-size: 32px;
        font-weight: 700;
        color: #F8FAFC;
        letter-spacing: 0.2em;
        opacity: 0;
        transform: translateY(20px);
        transition: all 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .loader-progress-container {
        width: 200px;
        height: 1px;
        background: rgba(148, 163, 184, 0.1);
        margin-top: 40px;
        overflow: hidden;
        opacity: 0;
        transition: opacity 600ms ease;
      }
      .loader-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #22D3EE, #FB7185);
        width: 0%;
        transition: width 200ms ease;
      }
    `;
    document.head.appendChild(style);
  }

  render() {
    this.container.innerHTML = `
      <div class="loader-brand">MATHIYA</div>
      <div class="loader-progress-container">
        <div class="loader-progress-bar"></div>
      </div>
    `;
    document.body.appendChild(this.container);
    document.body.style.overflow = 'hidden';
  }

  async start() {
    const brand = this.container.querySelector('.loader-brand');
    const progressContainer = this.container.querySelector('.loader-progress-container');
    const progressBar = this.container.querySelector('.loader-progress-bar');

    // Phase 1: Brand Reveal
    await this.wait(300);
    brand.style.opacity = '1';
    brand.style.transform = 'translateY(0)';

    // Phase 2: Progress Reveal
    await this.wait(500);
    progressContainer.style.opacity = '1';

    // Phase 3: Simulated Progress
    for (let i = 0; i <= 100; i += Math.random() * 15) {
      const p = Math.min(i, 100);
      progressBar.style.width = p + '%';
      await this.wait(100 + Math.random() * 200);
    }
    progressBar.style.width = '100%';

    // Phase 4: Verification
    brand.textContent = 'IDENTITY VERIFIED';
    brand.style.color = '#22D3EE';
    await this.wait(800);

    // Phase 5: Exit
    this.container.style.opacity = '0';
    this.container.style.pointerEvents = 'none';
    document.body.style.overflow = '';
    
    setTimeout(() => {
      this.container.remove();
      window.dispatchEvent(new CustomEvent('loader:complete'));
    }, 1100);
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

