/**
 * ParticleSystem.js
 * Advanced interactive particle background using Canvas.
 */

export class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.config = {
            particleCount: 100,
            connectionDistance: 120,
            mouseDistance: 150,
            color: '#00FFDE', // Cyan
            colorSecondary: '#FF3366' // Red/Pink
        };

        this.mouse = { x: null, y: null };

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Track mouse
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        this.initParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.initParticles(); // Re-init to distribute evenly
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: Math.random() > 0.8 ? this.config.colorSecondary : this.config.color
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(p => {
            // Movement
            p.x += p.vx;
            p.y += p.vy;

            // Bounce
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            // Mouse Interaction (Repel/Attract)
            if (this.mouse.x != null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < this.config.mouseDistance) {
                    const forceDirectionX = dx / dist;
                    const forceDirectionY = dy / dist;
                    const force = (this.config.mouseDistance - dist) / this.config.mouseDistance;
                    const directionMultiplier = -2; // Repel

                    p.vx += forceDirectionX * force * directionMultiplier * 0.05;
                    p.vy += forceDirectionY * force * directionMultiplier * 0.05;
                }
            }

            // Draw
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        });

        // Connections
        this.connectParticles();

        requestAnimationFrame(() => this.animate());
    }

    connectParticles() {
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    this.ctx.strokeStyle = `rgba(0, 255, 222, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}
