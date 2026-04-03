import { $, on, createElement, addStyles } from '../utils/dom.js';

export class AudioSystem {
  constructor() {
    this.audioEnabled = localStorage.getItem('madev_audio') === 'true';
    this.ctx = null;
    this.masterGain = null;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.filter = null;
    
    this._createUI();
    this._bindEvents();
    
    if (this.audioEnabled) {
      this._initAudio();
    }
  }

  _createUI() {
    this.ui = createElement('button', { className: 'audio-toggle' });
    addStyles(this.ui, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      fontFamily: 'var(--font-mono)',
      fontSize: '10px',
      color: this.audioEnabled ? 'var(--cyan)' : 'var(--text-2)',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: '100',
      letterSpacing: '0.2em'
    });
    this._updateUI();
    document.body.appendChild(this.ui);
  }

  _updateUI() {
    this.ui.textContent = this.audioEnabled ? '◉ SIGNAL' : '○ SIGNAL';
    this.ui.style.color = this.audioEnabled ? 'var(--cyan)' : 'var(--text-2)';
  }

  async _initAudio() {
    if (this.ctx) return;
    
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.ctx.destination);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 100;
    this.filter.connect(this.masterGain);

    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc1.type = 'sine';
    this.ambientOsc1.frequency.value = 40;
    this.ambientOsc1.connect(this.filter);

    this.ambientOsc2 = this.ctx.createOscillator();
    this.ambientOsc2.type = 'sine';
    this.ambientOsc2.frequency.value = 80;
    this.ambientOsc2.connect(this.filter);

    this.ambientOsc1.start();
    this.ambientOsc2.start();

    // Fade in
    this.masterGain.gain.setTargetAtTime(0.015, this.ctx.currentTime, 0.8);
  }

  _bindEvents() {
    on(this.ui, 'click', async () => {
      this.audioEnabled = !this.audioEnabled;
      localStorage.setItem('madev_audio', this.audioEnabled.toString());
      this._updateUI();

      if (this.audioEnabled) {
        await this._initAudio();
        if (this.ctx.state === 'suspended') await this.ctx.resume();
        this.masterGain.gain.setTargetAtTime(0.015, this.ctx.currentTime, 0.8);
      } else {
        if (this.masterGain) {
          this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
        }
      }
    });

    // Hover click
    on(document, 'mouseover', (e) => {
      if (this.audioEnabled && e.target.closest('a, button, [data-interactive]')) {
        this.playHover();
      }
    });

    on(document, 'click', (e) => {
      if (this.audioEnabled && e.target.closest('a, button, [data-interactive]')) {
        this.playClick();
      }
    });
  }

  playHover() {
    if (!this.ctx || !this.audioEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 800;
    gain.gain.value = 0.04;
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.006);
    osc.stop(this.ctx.currentTime + 0.01);
  }

  playClick() {
    if (!this.ctx || !this.audioEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1200;
    gain.gain.value = 0.06;
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.01);
    osc.stop(this.ctx.currentTime + 0.015);
  }
}
