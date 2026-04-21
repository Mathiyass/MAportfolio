// CountUp.js
export class CountUp {
  constructor(el, endVal, duration = 2000) {
    this.el = el;
    this.endVal = parseInt(endVal, 10);
    this.duration = duration;
    this.frameVal = 0;
    
    this.observer = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        this.start();
        this.observer.disconnect();
      }
    });
    this.observer.observe(el);
  }

  start() {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / this.duration, 1);
      
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      this.frameVal = Math.floor(ease * this.endVal);
      
      this.el.innerHTML = this.frameVal;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        this.el.innerHTML = this.endVal;
      }
    };
    window.requestAnimationFrame(step);
  }
}
