export class ToastManager {
    constructor() {
        this.container = document.createElement('div');
        Object.assign(this.container.style, {
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 'var(--z-toast)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            pointerEvents: 'none'
        });
        document.body.appendChild(this.container);
        this.queue = [];
        this.activeCount = 0;
    }

    show(message, type = 'success', duration = 4000) {
        if (this.activeCount >= 3) {
            this.queue.push({message, type, duration});
            return;
        }

        this._createToast(message, type, duration);
    }

    _createToast(message, type, duration) {
        this.activeCount++;
        const el = document.createElement('div');
        el.className = `toast toast--${type}`;
        el.textContent = message;

        this.container.appendChild(el);

        // Trigger reflow
        el.offsetHeight;
        el.classList.add('show');

        setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => {
                el.remove();
                this.activeCount--;
                if(this.queue.length > 0) {
                    const next = this.queue.shift();
                    this._createToast(next.message, next.type, next.duration);
                }
            }, 350); // wait for exit animation
        }, duration);
    }
}
