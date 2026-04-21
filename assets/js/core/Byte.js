/**
 * BYTE — THE ROBOT MASCOT
 * IK Tracking + Page Reactions
 */
export class Byte {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'byte-panel';
    this.setupStyles();
    this.render();
    this.setupTracking();
  }

  setupStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .byte-panel {
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 120px;
        height: 120px;
        z-index: 950;
        pointer-events: none;
        transition: transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .byte-body {
        width: 100%;
        height: 100%;
        background: var(--bg-elevated);
        border: 1px solid var(--border-c);
        border-radius: var(--r-lg);
        position: relative;
        overflow: hidden;
        box-shadow: var(--glow-c-m);
      }
      .byte-eye-row {
        position: absolute;
        top: 30%;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding-inline: 20%;
      }
      .byte-eye {
        width: 12px;
        height: 12px;
        background: var(--cyan);
        border-radius: 50%;
        box-shadow: var(--glow-c-s);
      }
      .byte-mouth {
        position: absolute;
        bottom: 25%;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: var(--cyan-border);
      }
    `;
    document.head.appendChild(style);
  }

  render() {
    this.container.innerHTML = `
      <div class="byte-body">
        <div class="byte-eye-row">
          <div class="byte-eye" id="byte-eye-l"></div>
          <div class="byte-eye" id="byte-eye-r"></div>
        </div>
        <div class="byte-mouth"></div>
      </div>
    `;
    document.body.appendChild(this.container);
  }

  setupTracking() {
    const eyeL = document.getElementById('byte-eye-l');
    const eyeR = document.getElementById('byte-eye-r');
    
    window.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;
      const rect = this.container.getBoundingClientRect();
      const bx = rect.left + rect.width / 2;
      const by = rect.top + rect.height / 2;
      
      const dx = x - bx;
      const dy = y - by;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      const angle = Math.atan2(dy, dx);
      const move = Math.min(dist / 20, 6);
      
      const mx = Math.cos(angle) * move;
      const my = Math.sin(angle) * move;
      
      eyeL.style.transform = `translate(${mx}px, ${my}px)`;
      eyeR.style.transform = `translate(${mx}px, ${my}px)`;
    });
  }

  react(type) {
    if (type === 'happy') {
      this.container.style.transform = 'scale(1.1) translateY(-10px)';
      this.setEyes('^ ^');
      setTimeout(() => {
        this.container.style.transform = '';
        this.setEyes('o o');
      }, 1000);
    } else if (type === 'alert') {
      this.container.style.transform = 'translateX(5px)';
      this.setEyes('> <');
      setTimeout(() => this.container.style.transform = '', 100);
    }
  }

  setEyes(pattern) {
    const eyeL = document.getElementById('byte-eye-l');
    const eyeR = document.getElementById('byte-eye-r');
    if (pattern === '^ ^') {
      eyeL.style.borderRadius = '2px';
      eyeR.style.borderRadius = '2px';
      eyeL.style.height = '4px';
      eyeR.style.height = '4px';
    } else {
      eyeL.style.borderRadius = '50%';
      eyeR.style.borderRadius = '50%';
      eyeL.style.height = '12px';
      eyeR.style.height = '12px';
    }
  }
}

