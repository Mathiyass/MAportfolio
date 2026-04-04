export class LazyLoad {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');

        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this._loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        this.images.forEach(img => {
            if(img.dataset.placeholder) {
                img.src = img.dataset.placeholder;
                img.style.filter = 'blur(10px)';
            }
            img.style.transition = 'opacity 300ms ease, filter 300ms ease';
            img.style.opacity = 0;
            this.observer.observe(img);
        });
    }

    _loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        img.src = src;
        img.onload = () => {
            img.style.opacity = 1;
            img.style.filter = 'none';
            img.removeAttribute('data-src');
        };
    }
}
