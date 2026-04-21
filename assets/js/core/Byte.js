/**
 * BYTE — THE ROBOT MASCOT — v10.0 PREMIUM
 * IK Tracking + Page Reactions + Premium UI
 */
export class Byte {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'byte-panel glass';
    this.setupStyles();
    this.render();
    this.setupTracking();
    this.state = 'idle';
  }

  setupStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .byte-panel {
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 130px;
        height: 130px;
        z-index: var(--z-byte);
        border-radius: 20px;
        padding: 16px;
        cursor: pointer;
        transition: all var(--dur-mid) var(--ease-spring);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--glow-cyan-m);
      }
      .byte-panel:hover {
        width: 200px;
        transform: translateY(-5px);
        border-color: var(--cyan);
      }
      .byte-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 8px rgba(34,211,238,0.3));
      }
      .byte-eye {
        fill: var(--cyan);
        transition: transform 0.1s ease-out;
      }
      .byte-heart {
        fill: var(--red);
        animation: heartPulse 2s infinite;
      }
      @keyframes heartPulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      .byte-bubble {
        position: absolute;
        bottom: 100%;
        right: 0;
        background: var(--bg-overlay);
        color: var(--text-primary);
        padding: 12px 18px;
        border-radius: 12px;
        font-family: var(--font-body);
        font-size: 14px;
        margin-bottom: 16px;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s var(--ease-spring);
        pointer-events: none;
        white-space: nowrap;
        border: 1px solid var(--border-subtle);
      }
      .byte-panel:hover .byte-bubble {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  render() {
    this.container.innerHTML = `
      <div class="byte-bubble">Hey! I'm BYTE 👾</div>
      <svg class="byte-svg" viewBox="0 0 100 100">
        <!-- Body -->
        <rect x="25" y="30" width="50" height="50" rx="8" fill="var(--bg-muted)" stroke="var(--cyan-border)" stroke-width="2"/>
        <!-- Head -->
        <rect x="30" y="10" width="40" height="25" rx="6" fill="var(--bg-muted)" stroke="var(--cyan-border)" stroke-width="2"/>
        <!-- Eyes -->
        <circle id="eye-l" class="byte-eye" cx="40" cy="22" r="3"/>
        <circle id="eye-r" class="byte-eye" cx="60" cy="22" r="3"/>
        <!-- Heart -->
        <path class="byte-heart" d="M50 60 L54 55 A3 3 0 0 0 46 55 Z" transform="translate(0, -2)"/>
      </svg>
    `;
    document.body.appendChild(this.container);
  }

  setupTracking() {
    const eyeL = document.getElementById('eye-l');
    const eyeR = document.getElementById('eye-r');
    
    window.addEventListener('mousemove', (e) => {
      const { clientX: x, clientY: y } = e;
      const rect = this.container.getBoundingClientRect();
      const bx = rect.left + rect.width / 2;
      const by = rect.top + rect.height / 2;
      
      const dx = x - bx;
      const dy = y - by;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      const angle = Math.atan2(dy, dx);
      const move = Math.min(dist / 25, 4);
      
      const mx = Math.cos(angle) * move;
      const my = Math.sin(angle) * move;
      
      eyeL.setAttribute('transform', `translate(${mx}, ${my})`);
      eyeR.setAttribute('transform', `translate(${mx}, ${my})`);
    });
  }

  say(text, duration = 3000) {
    const bubble = this.container.querySelector('.byte-bubble');
    bubble.textContent = text;
    this.container.classList.add('speaking');
    setTimeout(() => this.container.classList.remove('speaking'), duration);
  }
}
