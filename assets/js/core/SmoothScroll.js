export class SmoothScroll {
    constructor() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) {
            document.body.style.overflow = 'auto';
            return;
        }

        this.container = document.querySelector('.scroll-container');
        if (!this.container) return;

        document.body.style.height = `${this.container.getBoundingClientRect().height}px`;

        this.sy = 0;
        this.dy = 0;
        this.ease = 0.09;
        this.progress = 0;

        this.callbacks = new Set();

        window.addEventListener('resize', () => {
            document.body.style.height = `${this.container.getBoundingClientRect().height}px`;
        });

        this._loop();
    }

    _loop() {
        this.sy = window.scrollY;
        this.dy += (this.sy - this.dy) * this.ease;

        this.progress = this.dy / (document.body.scrollHeight - window.innerHeight);

        this.container.style.transform = `translate3d(0, -${this.dy}px, 0)`;

        for (let cb of this.callbacks) {
            cb(this.progress, this.sy - this.dy, this.sy > this.dy ? 1 : -1);
        }

        requestAnimationFrame(() => this._loop());
    }
    
    onScroll(callback) {
        this.callbacks.add(callback);
    }
}
