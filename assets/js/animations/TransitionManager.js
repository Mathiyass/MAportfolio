/**
 * TransitionManager.js
 * Handles smooth page transitions and entrance animations.
 */

export class TransitionManager {
    constructor() {
        this.transitionOverlay = this.createOverlay();
        this.init();
    }

    createOverlay() {
        let overlay = document.getElementById('transition-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'transition-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0a0a;
                z-index: 99999;
                transform: scaleY(0);
                transform-origin: bottom;
                transition: transform 0.6s cubic-bezier(0.83, 0, 0.17, 1);
            `;
            // Add a logo or loader in the center
            overlay.innerHTML = `
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-4xl font-orbitron text-cyber-cyan font-bold tracking-widest animate-pulse">
                        LOADING
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        return overlay;
    }

    init() {
        // Intercept all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');

            // Check if link exists, is internal, and not a hash link or new tab
            if (link &&
                link.href.startsWith(window.location.origin) &&
                !link.hash &&
                link.target !== '_blank' &&
                !link.hasAttribute('data-no-transition')) {

                e.preventDefault();
                const targetUrl = link.href;

                // Don't transition if it's the same page
                if (targetUrl === window.location.href) return;

                this.startTransition(targetUrl);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            // Ideally we would handle history transitions here too
            // For now, simple reload is safer without a SPA router
            // window.location.reload();
        });

        // Initial entry animation
        this.entranceAnimation();
    }

    startTransition(targetUrl) {
        // 1. Animate overlay in
        this.transitionOverlay.style.transformOrigin = 'bottom';
        this.transitionOverlay.style.transform = 'scaleY(1)';

        // 2. Wait for animation, then navigate
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    }

    entranceAnimation() {
        // This runs when the new page loads
        if (this.transitionOverlay) {
            // Ensure overlay covers screen initially (simulated)
            // But since this is MPA, the overlay is fresh DOM.
            // We can simulate "unveiling"

            this.transitionOverlay.style.transformOrigin = 'top';
            this.transitionOverlay.style.transform = 'scaleY(1)';

            // Force reflow
            this.transitionOverlay.offsetHeight;

            setTimeout(() => {
                this.transitionOverlay.style.transform = 'scaleY(0)';
            }, 100);
        }

        // Trigger AOS refresh
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.transitionManager = new TransitionManager();
});
