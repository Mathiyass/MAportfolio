// Toast.js
export class Toast {
  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'toast-container';
    this.container.style.cssText = \`
      position: fixed; bottom: 24px; left: 24px; z-index: var(--z-toast);
      display: flex; flex-direction: column; gap: 8px;
    \`;
    document.body.appendChild(this.container);

    window.addEventListener('toast:show', (e) => {
      this.show(e.detail.message, e.detail.type);
    });
  }

  show(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = \`toast toast--\${type}\`;
    toast.style.cssText = \`
      position: relative; bottom: auto; left: auto; transform: translateX(-100%);
      transition: all var(--dur-mid) var(--ease-spring);
    \`;
    toast.innerHTML = \`
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-family: var(--font-body); font-weight: 500; font-size: 14px;">\${message}</span>
      </div>
    \`;

    this.container.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;

    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateX(-100%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
}
