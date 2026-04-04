export class ProgressBar {
    constructor(smoothScrollInstance) {
        this.bar = document.createElement('div');
        this.bar.className = 'progress';
        Object.assign(this.bar.style, {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: '9999',
            opacity: 1,
            transition: 'opacity var(--dur-fast)'
        });

        this.fill = document.createElement('div');
        this.fill.className = 'progress-fill';
        this.bar.appendChild(this.fill);
        document.body.appendChild(this.bar);

        if (smoothScrollInstance) {
            smoothScrollInstance.onScroll((progress, velocity, dir) => {
                this.fill.style.width = `${progress * 100}%`;
                if(progress >= 0.99) this.bar.style.opacity = 0;
                else this.bar.style.opacity = 1;
            });
        } else {
             window.addEventListener('scroll', () => {
                 const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                 const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                 const scrolled = (winScroll / height) * 100;
                 this.fill.style.width = scrolled + "%";
                 if(scrolled >= 99) this.bar.style.opacity = 0;
                 else this.bar.style.opacity = 1;
             });
        }
    }
}
