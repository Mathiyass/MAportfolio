/**
 * MatrixRain.js
 * The classic digital rain effect.
 */

export class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.fontSize = 16;
        this.columns = 0;
        this.drops = [];
        this.characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;

        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        for (let x = 0; x < this.columns; x++) {
            this.drops[x] = 1;
        }
    }

    animate() {
        // Semi-transparent black to create trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0'; // Green text
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));

            // Randomly switch colors for glitch effect
            if (Math.random() > 0.98) {
                this.ctx.fillStyle = '#FFF';
            } else if (Math.random() > 0.95) {
                this.ctx.fillStyle = '#00FFDE'; // Cyan
            } else {
                this.ctx.fillStyle = '#0F0'; // Classic Green
            }

            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}
