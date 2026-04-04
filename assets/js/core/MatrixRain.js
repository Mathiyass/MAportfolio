export class MatrixRain {
    constructor(canvas, options = {}) {
        if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.chars = "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        this.mode = options.mode || 'cyan';
        this.speed = options.speed || 1.0;
        this.density = options.density || 1.0;
        this.opacity = options.opacity || 0.04;

        this.fontSize = 16;
        this.columns = [];
        this.active = false;

        this._resize();
        window.addEventListener('resize', () => this._resize());
    }
    
    _resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        const numCols = Math.floor(this.canvas.width / this.fontSize * this.density);

        while(this.columns.length < numCols) {
             this.columns.push({
                 y: Math.random() * this.canvas.height,
                 speed: (0.4 + Math.random() * 1.4) * this.speed
             });
        }
        this.columns.length = numCols; // Truncate if resized smaller
    }
    
    _loop() {
        if (!this.active) return;

        this.ctx.fillStyle = `rgba(3, 3, 10, 0.05)`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < this.columns.length; i++) {
            const col = this.columns[i];
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];

            let isRed = false;
            if (this.mode === 'red' || (this.mode === 'dual' && i % 30 === 0)) isRed = true;

            // Draw body
            this.ctx.fillStyle = isRed ? `rgba(255, 77, 109, ${this.opacity})` : `rgba(0, 229, 255, ${this.opacity})`;
            this.ctx.fillText(char, i * this.fontSize, col.y);

            // Draw head (brighter)
            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(this.opacity * 2, 0.9)})`;
            this.ctx.fillText(char, i * this.fontSize, col.y + this.fontSize);

            col.y += col.speed * this.fontSize;

            if (col.y > this.canvas.height && Math.random() > 0.975) {
                col.y = 0;
            }
        }

        requestAnimationFrame(() => this._loop());
    }
    
    start() {
        if (!this.active) {
            this.active = true;
            this._loop();
        }
    }
    
    stop() {
        this.active = false;
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
    
    setOpacity(o) { this.opacity = o; }
    setDensity(d) { this.density = d; this._resize(); }
    setMode(m) { this.mode = m; }
    setSpeed(s) {
         this.speed = s;
         for(let col of this.columns) col.speed = (0.4 + Math.random() * 1.4) * this.speed;
    }
}
