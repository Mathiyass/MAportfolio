// Byte.js
import { easeOutExpo, lerp, distVec2 } from '../utils/math.js';

export class Byte {
  constructor() {
    this.createDOM();
    
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.pos = { x: this.mouse.x, y: this.mouse.y };
    this.isMobile = window.matchMedia('(pointer: coarse)').matches;
    this.state = 'IDLE'; // IDLE, HAPPY, SAD, SURPRISED, SLEEP
    
    this.lastInteraction = performance.now();
    this.bindEvents();
    this.render();
  }

  createDOM() {
    this.container = document.createElement('div');
    this.container.className = 'byte-panel';
    this.container.style.cssText = \`
      position: fixed; bottom: 32px; right: 32px; z-index: var(--z-byte);
      width: 140px; height: 180px; transition: all var(--dur-mid) var(--ease-spring);
      transform-origin: bottom right; cursor: pointer;
    \`;

    this.container.innerHTML = \`
      <div style="background: var(--bg-glass); backdrop-filter: blur(20px); border: 1px solid var(--border-c); border-radius: 24px; padding: 16px; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 12px 32px rgba(34,211,238,0.15);">
        <svg viewBox="0 0 100 120" width="100%" height="100%">
          <!-- Antenna -->
          <line x1="50" y1="20" x2="50" y2="5" stroke="var(--text-3)" stroke-width="2" id="byte-antenna" />
          <circle cx="50" cy="5" r="3" fill="var(--red)" id="byte-led" />
          <!-- Head -->
          <rect x="25" y="20" width="50" height="40" rx="8" fill="var(--bg-elevated)" stroke="var(--cyan)" stroke-width="1.5" id="byte-head" />
          <!-- Eyes -->
          <g id="byte-eyes">
            <rect x="32" y="30" width="12" height="8" rx="4" fill="var(--cyan)" id="eye-l" />
            <rect x="56" y="30" width="12" height="8" rx="4" fill="var(--cyan)" id="eye-r" />
          </g>
          <!-- Mouth -->
          <path d="M 40 48 Q 50 52 60 48" stroke="var(--cyan)" stroke-width="2" fill="none" stroke-linecap="round" id="byte-mouth" />
          <!-- Body -->
          <rect x="35" y="65" width="30" height="35" rx="6" fill="var(--bg-subtle)" stroke="var(--text-3)" stroke-width="1" id="byte-body" />
          <!-- Heart -->
          <path d="M 46 75 A 3 3 0 0 0 50 80 A 3 3 0 0 0 54 75 Q 50 72 46 75" fill="var(--red)" id="byte-heart" />
        </svg>
      </div>
      <div id="byte-speech" style="position: absolute; bottom: 100%; right: 0; background: var(--bg-glass); border: 1px solid var(--border-c); padding: 8px 16px; border-radius: 12px; font-family: var(--font-body); font-size: 13px; color: var(--text-0); opacity: 0; transform: translateY(10px); transition: all 0.3s; white-space: nowrap; pointer-events: none; margin-bottom: 12px;"></div>
    \`;

    document.body.appendChild(this.container);

    this.head = this.container.querySelector('#byte-head');
    this.eyes = this.container.querySelector('#byte-eyes');
    this.mouth = this.container.querySelector('#byte-mouth');
    this.heart = this.container.querySelector('#byte-heart');
    this.speech = this.container.querySelector('#byte-speech');
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.lastInteraction = performance.now();
      if (this.state === 'SLEEP') this.wake();
    });

    this.container.addEventListener('mouseenter', () => {
      this.setExpression('HAPPY');
      this.container.style.transform = 'scale(1.1)';
    });

    this.container.addEventListener('mouseleave', () => {
      this.setExpression('IDLE');
      this.container.style.transform = 'scale(1)';
    });

    this.container.addEventListener('click', () => {
      this.jump();
      this.say("Hi! 👋");
    });
  }

  setExpression(expr) {
    this.state = expr;
    if (expr === 'HAPPY') {
      this.mouth.setAttribute('d', 'M 36 46 Q 50 56 64 46');
    } else if (expr === 'SAD') {
      this.mouth.setAttribute('d', 'M 40 50 Q 50 44 60 50');
    } else if (expr === 'SURPRISED') {
      this.mouth.setAttribute('d', 'M 45 48 Q 50 56 55 48 Q 50 40 45 48');
    } else if (expr === 'SLEEP') {
      this.mouth.setAttribute('d', 'M 45 48 Q 50 48 55 48');
      this.eyes.style.transform = 'scaleY(0.1)';
      this.eyes.style.transformOrigin = '50% 34px';
    } else { // IDLE
      this.mouth.setAttribute('d', 'M 40 48 Q 50 52 60 48');
      this.eyes.style.transform = 'scaleY(1)';
    }
  }

  wake() {
    this.setExpression('IDLE');
    this.say("I'm awake!");
  }

  jump() {
    this.container.animate([
      { transform: 'translateY(0) scale(1.1)' },
      { transform: 'translateY(-24px) scale(1.15)' },
      { transform: 'translateY(0) scale(1.1)' }
    ], { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
  }

  say(text, duration = 3000) {
    this.speech.textContent = text;
    this.speech.style.opacity = '1';
    this.speech.style.transform = 'translateY(0)';
    
    if (this.speechTimeout) clearTimeout(this.speechTimeout);
    this.speechTimeout = setTimeout(() => {
      this.speech.style.opacity = '0';
      this.speech.style.transform = 'translateY(10px)';
    }, duration);
  }

  render() {
    const now = performance.now();
    
    if (this.state !== 'SLEEP' && now - this.lastInteraction > 60000) {
      this.setExpression('SLEEP');
    }

    if (this.state !== 'SLEEP' && !this.isMobile) {
      // IK Eye tracking
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = this.mouse.x - centerX;
      const dy = this.mouse.y - centerY;
      const dist = Math.hypot(dx, dy);
      
      const maxEyeMove = 4;
      const moveX = clamp(dx * 0.02, -maxEyeMove, maxEyeMove);
      const moveY = clamp(dy * 0.02, -maxEyeMove, maxEyeMove);
      
      this.eyes.style.transform = \`translate(\${moveX}px, \${moveY}px)\`;
      
      // Fast cursor shock
      if (distVec2(this.pos, this.mouse) > 100) {
        if (this.state === 'IDLE') {
          this.setExpression('SURPRISED');
          setTimeout(() => { if (this.state === 'SURPRISED') this.setExpression('IDLE'); }, 800);
        }
      }
    }

    this.pos.x = this.mouse.x;
    this.pos.y = this.mouse.y;

    // Heartbeat
    const heartScale = 1 + Math.sin(now * 0.005) * 0.15;
    this.heart.style.transform = \`scale(\${heartScale})\`;
    this.heart.style.transformOrigin = '50px 75px';

    requestAnimationFrame(() => this.render());
  }
}

// clamp helper
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
