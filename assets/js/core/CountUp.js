export class CountUp {
    constructor(element, target, options = {}) {
        if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.textContent = target;
            return;
        }

        this.el = element;
        this.target = target;
        this.duration = options.duration || 2000;
        this.prefix = options.prefix || '';
        this.suffix = options.suffix || '';
        this.locale = options.locale || 'en-US';
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this._start();
                    this.observer.unobserve(this.el);
                    setTimeout(() => this.observer.observe(this.el), 30000); // Re-arm after 30s
                }
            });
        });

        this.observer.observe(this.el);
    }

    _start() {
        const start = performance.now();
        let lastTick = -1;

        const loop = (now) => {
            let progress = (now - start) / this.duration;
            if (progress > 1) progress = 1;

            // easeOutExpo
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const current = Math.floor(this.target * ease);

            if (current !== lastTick) {
                this.el.textContent = `${this.prefix}${current.toLocaleString(this.locale)}${this.suffix}`;
                this.el.dispatchEvent(new CustomEvent('countBeat'));
                this.el.style.animation = 'none';
                this.el.offsetHeight; // trigger reflow
                this.el.style.animation = 'countBeat 100ms ease-out';
                lastTick = current;
            }

            if (progress < 1) requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}
