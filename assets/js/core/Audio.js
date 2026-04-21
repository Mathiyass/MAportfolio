// Audio.js
export class AudioSystem {
  constructor() {
    this.ctx = null;
    this.drone = null;
    this.harmonic = null;
    this.gain = null;
    this.enabled = localStorage.getItem('audio_enabled') === 'true';

    // Wait for user gesture
    const initAudio = () => {
      if (this.enabled) this.init();
      document.removeEventListener('click', initAudio);
    };
    document.addEventListener('click', initAudio);
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    this.gain = this.ctx.createGain();
    this.gain.gain.value = 0.015;
    this.gain.connect(this.ctx.destination);

    // 40Hz drone
    this.drone = this.ctx.createOscillator();
    this.drone.type = 'sine';
    this.drone.frequency.value = 40;
    this.drone.connect(this.gain);
    this.drone.start();

    // 80Hz harmonic
    this.harmonic = this.ctx.createOscillator();
    this.harmonic.type = 'triangle';
    this.harmonic.frequency.value = 80;
    const hGain = this.ctx.createGain();
    hGain.gain.value = 0.5;
    this.harmonic.connect(hGain);
    hGain.connect(this.gain);
    this.harmonic.start();

    // Add UI toggle listener
    this.bindEvents();
  }

  playPing() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.frequency.value = 1320;
    osc.type = 'sine';
    g.gain.setValueAtTime(0, this.ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playHover() {
    if (!this.enabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.frequency.value = 880;
    osc.type = 'sine';
    g.gain.setValueAtTime(0, this.ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  bindEvents() {
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => this.playHover());
      el.addEventListener('click', () => this.playPing());
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('audio_enabled', this.enabled);
    if (this.enabled) {
      this.init();
      this.ctx.resume();
    } else if (this.ctx) {
      this.ctx.suspend();
    }
  }
}
