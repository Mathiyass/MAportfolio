export class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-reveal]');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target); // One-shot
                }
            });
        }, {
            threshold: [0, 0.1, 0.2, 0.3],
            rootMargin: '0px 0px -10% 0px'
        });

        this._initStaggers();

        this.elements.forEach(el => this.observer.observe(el));
    }

    _initStaggers() {
        const staggers = document.querySelectorAll('.stagger');
        staggers.forEach(container => {
            const children = container.children;
            Array.from(children).forEach((child, i) => {
                child.style.setProperty('--i', i);
                child.setAttribute('data-reveal', '');
                this.elements = document.querySelectorAll('[data-reveal]'); // Update list
            });
        });
    }
}
