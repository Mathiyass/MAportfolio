export class AudioSystem {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.drone1 = null;
        this.drone2 = null;
        this.enabled = false;

        this.initUI();
    }
    
    initUI() {
        this.toggleBtn = document.createElement('button');
        this.toggleBtn.className = 'audio-toggle interactable';
        Object.assign(this.toggleBtn.style, {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-1)',
            zIndex: '9999',
            background: 'var(--surface-1)',
            border: '1px solid var(--cyan-border)',
            padding: '4px 8px'
        });
        this.updateBtnText();
        document.body.appendChild(this.toggleBtn);

        this.toggleBtn.addEventListener('click', () => {
            if (!this.enabled) this.enable();
            else this.disable();
        });

        // Init on first interaction if not yet enabled
        const firstInteraction = () => {
             if(this.enabled) return;
             this.toggleBtn.style.color = 'var(--cyan)'; // visual hint
             document.removeEventListener('click', firstInteraction);
        };
        document.addEventListener('click', firstInteraction);
    }

    updateBtnText() {
        this.toggleBtn.textContent = this.enabled ? '◉ SIGNAL' : '○ SIGNAL';
        this.toggleBtn.style.color = this.enabled ? 'var(--cyan)' : 'var(--text-1)';
    }
    
    async enable() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0; // start muted

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 100;

            this.masterGain.connect(filter);
            filter.connect(this.ctx.destination);

            this.drone1 = this.ctx.createOscillator();
            this.drone1.type = 'sine';
            this.drone1.frequency.value = 40;
            this.drone1.connect(this.masterGain);
            this.drone1.start();

            this.drone2 = this.ctx.createOscillator();
            this.drone2.type = 'sine';
            this.drone2.frequency.value = 80;
            this.drone2.connect(this.masterGain);
            this.drone2.start();

            this._bindUIEvents();
        }

        if (this.ctx.state === 'suspended') await this.ctx.resume();
        this.masterGain.gain.setTargetAtTime(0.015, this.ctx.currentTime, 0.8);
        this.enabled = true;
        this.updateBtnText();
    }

    disable() {
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.8);
            setTimeout(() => { if(this.ctx) this.ctx.suspend(); }, 1000);
        }
        this.enabled = false;
        this.updateBtnText();
    }
    
    _bindUIEvents() {
        document.addEventListener('mouseover', (e) => {
            if(e.target.closest('a.nav-link, button')) this.playClick(800, 0.006, 0.04);
        });
        document.addEventListener('click', (e) => {
            if(e.target.closest('button, .btn')) this.playClick(1200, 0.01, 0.06);
        });
    }
    
    playClick(freq, duration, gain) {
        if(!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gainNode.gain.value = gain;

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + duration);
        osc.stop(this.ctx.currentTime + duration);
    }
}
