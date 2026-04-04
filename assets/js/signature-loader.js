export class SignatureLoader {
    constructor() {
        this.canvas = document.getElementById('signature-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById('loader-overlay');
        
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.progress = 0;
        this.glitchPhase = 0;
        
        this.text = "MATHIYAN";
        this.subText = "SOFTWARE ENGINEER";

        this.raf = null;
        this.startTime = performance.now();

        this._loop();
    }
    
    _loop() {
        const now = performance.now();
        const elapsed = now - this.startTime;
        
        this.ctx.fillStyle = '#03030A';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Circuit lines
        this.ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        for(let i=0; i<10; i++) {
             this.ctx.moveTo(0, this.height/2 + (i-5)*20);
             this.ctx.lineTo(this.width * Math.min(1, elapsed/2000), this.height/2 + (i-5)*20);
        }
        this.ctx.stroke();

        this.ctx.font = '900 80px "Orbitron", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Glitch calculations
        let xOff = 0;
        let yOff = 0;
        let c1 = '#00E5FF';
        let c2 = '#FF4D6D';
        
        if (elapsed > 1500 && elapsed < 2000 && Math.random() > 0.7) {
            xOff = (Math.random() - 0.5) * 10;
            yOff = (Math.random() - 0.5) * 10;
        }
        
        // Draw Mathiyan
        const textWidth = this.ctx.measureText(this.text).width;
        const revealWidth = textWidth * Math.min(1, elapsed/1500);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(this.width/2 - textWidth/2, 0, revealWidth, this.height);
        this.ctx.clip();

        this.ctx.fillStyle = c2;
        this.ctx.fillText(this.text, this.width/2 + xOff, this.height/2 - 20 + yOff);
        this.ctx.fillStyle = c1;
        this.ctx.fillText(this.text, this.width/2 - xOff, this.height/2 - 20 - yOff);
        this.ctx.fillStyle = '#E8E8F8';
        this.ctx.fillText(this.text, this.width/2, this.height/2 - 20);

        this.ctx.restore();

        // Scanner line
        if (elapsed < 2000) {
            const scanX = this.width/2 - textWidth/2 + revealWidth;
            this.ctx.fillStyle = c1;
            this.ctx.fillRect(scanX, this.height/2 - 60, 2, 80);
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = c1;
            this.ctx.fillRect(scanX, this.height/2 - 60, 2, 80);
            this.ctx.shadowBlur = 0;
        }

        // Subtext
        if (elapsed > 1000) {
            this.ctx.font = '400 14px "JetBrains Mono", monospace';
            this.ctx.fillStyle = 'rgba(0, 229, 255, ' + Math.min(1, (elapsed-1000)/500) + ')';
            this.ctx.letterSpacing = '8px';
            this.ctx.fillText(this.subText, this.width/2, this.height/2 + 40);
            this.ctx.letterSpacing = '0px';
        }

        if (elapsed < 3000) {
            this.raf = requestAnimationFrame(() => this._loop());
        } else {
            this.finish();
        }
    }
    
    finish() {
        this.overlay.style.transition = 'opacity 0.8s ease-out';
        this.overlay.style.opacity = '0';
        setTimeout(() => {
            this.overlay.style.display = 'none';
            // Dispatch event for main.js or other systems
            document.dispatchEvent(new CustomEvent('signature-complete'));
        }, 800);
    }
}

// Auto-start
new SignatureLoader();
