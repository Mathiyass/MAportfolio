import { $, on, createElement, addStyles } from '../utils/dom.js';

export class AudioSystem {
  constructor() {
    this.audioEnabled = localStorage.getItem('mathiya_audio') === 'true';
    this.ctx = null;
    this.masterGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.filter = null;
    
    this.createUI();
    this.bindEvents();
    
    if (this.audioEnabled) {
      this.initAudio();
    }
  }

  createUI() {
    this.ui = createElement('button', { className: 'audio-toggle' });
    addStyles(this.ui, {
      position: 'fixed',
      bottom: 'var(--s-8)',
      left: 'var(--s-8)',
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      color: this.audioEnabled ? 'var(--cyan)' : 'var(--text-3)',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: 'var(--z-nav)',
      letterSpacing: '0.2em'
    });
    this.updateUI();
    document.body.appendChild(this.ui);
  }

  updateUI() {
    this.ui.textContent = this.audioEnabled ? 'AUDIO: ENABLED' : 'AUDIO: MUTED';
    this.ui.style.color = this.audioEnabled ? 'var(--cyan)' : 'var(--text-3)';
  }

  async initAudio() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.ctx.destination);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 120;
    this.filter.connect(this.masterGain);

    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc1.type = 'sine';
    this.ambientOsc1.frequency.value = 42;
    this.ambientOsc1.connect(this.filter);

    this.ambientOsc1.start();
    this.masterGain.gain.setTargetAtTime(0.02, this.ctx.currentTime, 1.2);
  }

  bindEvents() {
    on(this.ui, 'click', async () => {
      this.audioEnabled = !this.audioEnabled;
      localStorage.setItem('mathiya_audio', this.audioEnabled.toString());
      this.updateUI();

      if (this.audioEnabled) {
        await this.initAudio();
        if (this.ctx.state === 'suspended') await this.ctx.resume();
        this.masterGain.gain.setTargetAtTime(0.02, this.ctx.currentTime, 1.2);
      } else {
        if (this.masterGain) {
          this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
        }
      }
    });

    on(document, 'mouseover', (e) => {
      if (this.audioEnabled && e.target.closest('a, button, .card')) {
        this.playHover();
      }
    });
  }

  playHover() {
    if (!this.ctx || !this.audioEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 600;
    gain.gain.value = 0.03;
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.02);
    osc.stop(this.ctx.currentTime + 0.03);
  }
}

