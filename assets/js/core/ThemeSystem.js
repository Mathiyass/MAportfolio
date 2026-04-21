// ThemeSystem.js
export class ThemeSystem {
  constructor() {
    this.settings = {
      cursorEnabled: localStorage.getItem('cursor_enabled') !== 'false',
      audioEnabled: localStorage.getItem('audio_enabled') === 'true',
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches || localStorage.getItem('reduced_motion') === 'true',
      matrixMode: false,
      byteVisible: localStorage.getItem('byte_visible') !== 'false'
    };
    this.applySettings();
  }

  applySettings() {
    if (this.settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    }
  }

  toggle(key) {
    if (key in this.settings) {
      this.settings[key] = !this.settings[key];
      localStorage.setItem(key, this.settings[key]);
      this.applySettings();
    }
  }
}
