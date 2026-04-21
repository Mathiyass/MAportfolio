import { createElement, addStyles } from '../utils/dom.js';

export class ToastSystem {
  constructor() {
    this.container = createElement('div', { className: 'toast-container' });
    document.body.appendChild(this.container);
    this.activeToasts = [];
  }

  show(message, type = 'success', duration = 4000) {
    const toast = createElement('div', { className: \`toast toast--\${type}\` }, [
      createElement('span', {}, [type === 'error' ? '!' : '✓']),
      createElement('span', {}, [message])
    ]);

    this.container.appendChild(toast);
    this.activeToasts.push(toast);

    if (this.activeToasts.length > 3) {
      const oldest = this.activeToasts.shift();
      this._dismiss(oldest);
    }

    setTimeout(() => {
      if (this.activeToasts.includes(toast)) {
        this._dismiss(toast);
        this.activeToasts = this.activeToasts.filter(t => t !== toast);
      }
    }, duration);
  }

  _dismiss(toast) {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 350);
  }
}

// Global instance
export const toast = (message, type, duration) => {
  if (!window.__toastSystem) {
    window.__toastSystem = new ToastSystem();
  }
  window.__toastSystem.show(message, type, duration);
};

