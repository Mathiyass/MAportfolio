export class PageTransitions {
    constructor() {
        if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        this.wipe = document.createElement('div');
        Object.assign(this.wipe.style, {
            position: 'fixed',
            inset: 0,
            background: 'var(--void)',
            zIndex: '99999',
            pointerEvents: 'none',
            clipPath: 'inset(0 100% 0 0)' // Start hidden (wiped right)
        });
        document.body.appendChild(this.wipe);

        this._bindLinks();
        this._enter();
    }
    
    _bindLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.origin === window.location.origin && !link.hash && link.target !== '_blank') {
                e.preventDefault();
                this._exit(link.href);
            }
        });
    }

    _exit(url) {
        // Trigger glitch first
        document.dispatchEvent(new CustomEvent('madev:glitch', { detail: { intensity: 1.0 } }));
        
        setTimeout(() => {
            this.wipe.style.transition = 'clip-path 350ms var(--ease-expo)';
            this.wipe.style.clipPath = 'inset(0 0 0 0)';

            setTimeout(() => {
                window.location.href = url;
            }, 350);
        }, 200);
    }

    _enter() {
        // Assume page loaded with wipe active if transitioning from another page
        // But for initial load, we don't want a long wipe, so we handle it fast.
        this.wipe.style.clipPath = 'inset(0 0 0 0)';

        requestAnimationFrame(() => {
             this.wipe.style.transition = 'clip-path 350ms var(--ease-expo)';
             this.wipe.style.clipPath = 'inset(0 0 0 100%)';
        });
    }
}
