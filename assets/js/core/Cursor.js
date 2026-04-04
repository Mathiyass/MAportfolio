export class CustomCursor {
    constructor() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        this.ring = document.createElement('div');
        this.ring.className = 'custom-cursor';
        Object.assign(this.ring.style, {
            position: 'fixed',
            width: '22px',
            height: '22px',
            border: '1.5px solid var(--cyan)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)',
            transition: 'transform 100ms ease, border-color 100ms ease, width 100ms, height 100ms'
        });
        document.body.appendChild(this.ring);

        this.canvas = document.createElement('canvas');
        Object.assign(this.canvas.style, {
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: '9998'
        });
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.particles = [];
        this.mouse = { x: -100, y: -100, vx: 0, vy: 0 };
        this.lastMouse = { x: -100, y: -100 };
        this.mode = 'cyan'; // 'cyan', 'red', 'dual'

        this._resize();
        this._bindEvents();
        this._loop();
    }
    
    _resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    _bindEvents() {
        window.addEventListener('resize', () => this._resize());
        window.addEventListener('mousemove', (e) => {
            this.lastMouse.x = this.mouse.x;
            this.lastMouse.y = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.vx = this.mouse.x - this.lastMouse.x;
            this.mouse.vy = this.mouse.y - this.lastMouse.y;

            this.ring.style.left = `${this.mouse.x}px`;
            this.ring.style.top = `${this.mouse.y}px`;

            for(let i=0; i<3; i++) this._spawn();
        });

        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, input, .interactable');
            if (target) {
                this.ring.style.transform = 'translate(-50%, -50%) scale(2.4)';
                this.ring.style.borderColor = 'var(--red)';
                this.ring.style.mixBlendMode = 'difference';
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('a, button, input, .interactable');
            if (target) {
                this.ring.style.transform = 'translate(-50%, -50%) scale(1)';
                this.ring.style.borderColor = 'var(--cyan)';
                this.ring.style.mixBlendMode = 'normal';
            }
        });

        document.addEventListener('mousedown', () => {
            this.ring.style.transform = 'translate(-50%, -50%) scale(0.75)';
        });
        document.addEventListener('mouseup', () => {
            this.ring.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }

    _spawn() {
        if(this.particles.length > 48) this.particles.shift();

        let hue = 180; // cyan
        if (this.mode === 'red') hue = 0;
        else if (this.mode === 'dual') hue = Math.random() > 0.5 ? 180 : 0;

        this.particles.push({
            x: this.mouse.x,
            y: this.mouse.y,
            vx: this.mouse.vx * 0.1 + (Math.random()-0.5),
            vy: this.mouse.vy * 0.1 + (Math.random()-0.5),
            life: 1.0,
            size: Math.random() * 2 + 1,
            hue: hue
        });
    }

    _loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            let currentHue = p.hue;
            if (this.mode !== 'dual') {
                currentHue = p.hue * p.life; // Lerp towards red (0) if cyan (180)
            }

            this.ctx.fillStyle = `hsla(${currentHue}, 100%, 50%, ${p.life})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fill();
        }

        requestAnimationFrame(() => this._loop());
    }
    
    setMode(mode) {
        this.mode = mode;
    }
}
