import { $$, on } from '../utils/dom.js';

export class LazyLoad {
  constructor() {
    this.images = $$('img[data-src]');
    if (!this.images.length) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          this.observer.unobserve(img);
        }
      });
    }, { rootMargin: '0px 0px 200px 0px' });

    this.images.forEach(img => {
      if (img.dataset.placeholder) {
        img.src = img.dataset.placeholder;
        img.style.filter = 'blur(10px)';
        img.style.transition = 'filter 0.5s var(--ease-expo), opacity 0.5s';
      }
      this.observer.observe(img);
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    const tempImage = new Image();
    tempImage.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      img.style.filter = 'blur(0)';
      img.removeAttribute('data-src');
    };
    tempImage.src = src;
  }
}

