export class ThemeSystem {
  constructor() {
    this.theme = localStorage.getItem('madev_theme') || 'dual';
    this.cursorEnabled = localStorage.getItem('madev_cursor') !== 'false';
    this.matrixMode = localStorage.getItem('madev_matrix') === 'true';
    // audio is handled in Audio.js, reducedMotion is native or override
    this.reducedMotion = localStorage.getItem('madev_motion') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.applyTheme();
  }

  applyTheme() {
    document.documentElement.dataset.theme = this.theme;
    
    if (this.reducedMotion) {
      document.documentElement.dataset.reducedMotion = 'true';
    } else {
      delete document.documentElement.dataset.reducedMotion;
    }
  }

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('madev_theme', theme);
    this.applyTheme();
  }

  setCursor(enabled) {
    this.cursorEnabled = enabled;
    localStorage.setItem('madev_cursor', enabled);
  }

  setMatrix(enabled) {
    this.matrixMode = enabled;
    localStorage.setItem('madev_matrix', enabled);
  }

  setReducedMotion(enabled) {
    this.reducedMotion = enabled;
    localStorage.setItem('madev_motion', enabled);
    this.applyTheme();
  }
}
