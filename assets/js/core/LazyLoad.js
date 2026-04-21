// LazyLoad.js
export class LazyLoad {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          this.observer.unobserve(img);
        }
      });
    }, { rootMargin: "0px 0px 200px 0px" });

    document.querySelectorAll('img[data-src]').forEach(img => {
      this.observer.observe(img);
    });
  }
}
