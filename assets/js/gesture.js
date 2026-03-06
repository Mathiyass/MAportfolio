/**
 * ========================================================
 * MTHISHA PORTFOLIO - V2 GESTURE NAVIGATION
 * gesture.js
 * Integrate MediaPipe Hands for Hand Tracking & Navigation
 * ========================================================
 */

class MthishaGestureSystem {
    constructor() {
        this.isActive = false;
        this.isLoading = false;
        this.hudCreated = false;
        this.scriptsLoaded = false;

        // Tracking state
        this.prevY = null;
        this.yThreshold = 0.05; // Normalised threshold for scrolling

        this.initButton();
    }

    initButton() {
        const btn = document.createElement('button');
        btn.id = 'neural-link-btn';
        btn.className = 'fixed bottom-6 left-6 z-[9990] glass-panel px-4 py-3 rounded-full border border-primary/30 text-primary text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-primary/20 hover:border-primary/60 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,221,0.2)]';
        btn.innerHTML = `<span class="material-symbols-outlined text-sm">waving_hand</span> <span>Init Neural Link</span>`;

        btn.onclick = () => {
            if (this.isActive) this.stop();
            else this.start();
        };

        document.body.appendChild(btn);
        this.btnEl = btn;
    }

    createHUD() {
        if (this.hudCreated) return;

        const hud = document.createElement('div');
        hud.id = 'gesture-hud';
        hud.className = 'fixed bottom-6 right-6 z-[9990] glass-panel p-2 rounded-xl flex flex-col items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300';
        hud.innerHTML = `
            <div class="relative w-48 h-36 rounded-lg overflow-hidden border border-primary/50 bg-black/50">
                <video id="gesture-video" class="relative z-10 w-full h-full object-cover scale-x-[-1]" playsinline></video>
                <canvas id="gesture-canvas" class="absolute inset-0 z-20 w-full h-full pointer-events-none scale-x-[-1]"></canvas>
            </div>
            <div class="flex items-center gap-2 mt-3 mb-1">
                <span id="gesture-indicator" class="w-2 h-2 rounded-full bg-accent-crimson shadow-[0_0_5px_#DC143C] animate-pulse"></span>
                <p id="gesture-status" class="text-[10px] text-primary font-bold tracking-widest uppercase">Initializing</p>
            </div>
        `;
        document.body.appendChild(hud);

        this.videoEl = document.getElementById('gesture-video');
        this.canvasEl = document.getElementById('gesture-canvas');
        this.canvasCtx = this.canvasEl.getContext('2d');
        this.statusEl = document.getElementById('gesture-status');
        this.indicatorEl = document.getElementById('gesture-indicator');
        this.hudEl = hud;

        this.hudCreated = true;
    }

    async loadDependencies() {
        if (this.scriptsLoaded) return Promise.resolve();

        this.statusEl.innerText = 'LOADING CORE...';

        const scripts = [
            'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
            'https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js',
            'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js',
            'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js'
        ];

        for (const src of scripts) {
            await new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = src;
                s.onload = resolve;
                s.onerror = reject;
                document.head.appendChild(s);
            });
        }

        this.scriptsLoaded = true;
    }

    async start() {
        if (this.isLoading) return;
        this.isLoading = true;
        this.btnEl.innerHTML = `<span class="material-symbols-outlined text-sm animate-spin">sync</span> <span>Booting...</span>`;

        this.createHUD();
        this.hudEl.classList.remove('opacity-0');
        this.hudEl.classList.add('opacity-100');

        try {
            await this.loadDependencies();
            this.statusEl.innerText = 'CALIBRATING...';

            this.hands = new window.Hands({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                }
            });

            this.hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.7
            });

            this.hands.onResults(this.onResults.bind(this));

            this.camera = new window.Camera(this.videoEl, {
                onFrame: async () => {
                    await this.hands.send({ image: this.videoEl });
                },
                width: 320,
                height: 240
            });

            await this.camera.start();

            this.isActive = true;
            this.statusEl.innerText = 'LINK ACTIVE';
            this.indicatorEl.classList.replace('bg-accent-crimson', 'bg-primary');
            this.indicatorEl.classList.replace('shadow-[0_0_5px_#DC143C]', 'shadow-[0_0_5px_#00ffdd]');
            this.btnEl.classList.add('border-accent-crimson');
            this.btnEl.innerHTML = `<span class="material-symbols-outlined text-sm text-accent-crimson">close</span> <span class="text-accent-crimson">Terminate Link</span>`;

        } catch (e) {
            console.error("Gesture Initialization failed:", e);
            this.statusEl.innerText = 'LINK FAILED';
            setTimeout(() => this.stop(), 2000);
        }

        this.isLoading = false;
    }

    stop() {
        if (this.camera) {
            this.camera.stop();
        }
        if (this.hudEl) {
            this.hudEl.classList.add('opacity-0');
            this.hudEl.classList.remove('opacity-100');
        }

        this.isActive = false;
        this.btnEl.classList.remove('border-accent-crimson');
        this.btnEl.innerHTML = `<span class="material-symbols-outlined text-sm">waving_hand</span> <span>Init Neural Link</span>`;
    }

    onResults(results) {
        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        this.canvasCtx.drawImage(results.image, 0, 0, this.canvasEl.width, this.canvasEl.height);

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            for (const landmarks of results.multiHandLandmarks) {
                window.drawConnectors(this.canvasCtx, landmarks, window.HAND_CONNECTIONS, { color: '#00FFDE', lineWidth: 2 });
                window.drawLandmarks(this.canvasCtx, landmarks, { color: '#DC143C', lineWidth: 1, radius: 2 });

                this.processGestures(landmarks);
            }
            this.statusEl.innerText = 'TRACKING';
        } else {
            this.statusEl.innerText = 'SEEKING...';
            this.prevY = null; // Reset scroll calc
        }
        this.canvasCtx.restore();
    }

    processGestures(landmarks) {
        // Simple Vertical Scroll using index finger tip (landmark 8)
        const indexTip = landmarks[8];

        if (this.prevY !== null) {
            const dy = indexTip.y - this.prevY;

            if (Math.abs(dy) > this.yThreshold) {
                // Scroll multiplier
                const scrollAmount = dy * 10000;
                window.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }

        this.prevY = indexTip.y;
    }
}

// Auto-init on page load
window.addEventListener('load', () => {
    window.AppGestures = new MthishaGestureSystem();
});
