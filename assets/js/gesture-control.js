/**
 * Gesture Control System v7.0 - Polished & Interactive
 * - Removed Debug Text/Warnings
 * - Improved "Smart Click" for Social Icons/Buttons
 * - Restored Cyberpunk Aesthetics with Overlay Architecture
 */

class GestureControl {
  constructor() {
    this.video = null;
    this.canvas = null;
    this.ctx = null;
    this.handLandmarker = null;
    this.isRunning = false;
    this.overlay = null; 
    this.cursor = null;
    
    // State
    this.lastX = window.innerWidth / 2;
    this.lastY = window.innerHeight / 2;
    this.clickCooldown = 0;
    this.baseSmoothing = 0.12;

    this.init();
  }

  async init() {
    this.createRootOverlay();
    this.createUI();
    
    if (localStorage.getItem('gesture_enabled') === 'true') {
        this.toggle(true);
    }
  }

  createRootOverlay() {
      const existing = document.getElementById('gesture-root');
      if (existing) existing.remove();

      this.overlay = document.createElement('div');
      this.overlay.id = 'gesture-root';
      this.overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 2147483647;
          overflow: hidden;
      `;
      document.documentElement.appendChild(this.overlay);
  }

  createUI() {
    // 1. Toggle Button
    const btn = document.createElement('button');
    btn.id = 'gesture-toggle-btn';
    btn.className = 'fixed bottom-6 right-6 w-16 h-16 bg-dark-card border-2 border-cyber-cyan text-cyber-cyan rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,222,0.4)] z-[2147483647] hover:scale-110 transition-transform duration-300 cursor-pointer pointer-events-auto';
    btn.innerHTML = '<i class="fas fa-hand-sparkles text-2xl"></i>';
    btn.onclick = () => this.toggle();
    document.body.appendChild(btn);

    // 2. Video Preview
    const preview = document.createElement('div');
    preview.id = 'gesture-preview';
    preview.style.cssText = `
        position: absolute;
        bottom: 100px;
        right: 24px;
        width: 160px;
        height: 120px;
        background: black;
        border: 1px solid #00FFDE;
        border-radius: 8px;
        overflow: hidden;
        display: none;
        opacity: 0.8;
    `;
    
    this.video = document.createElement('video');
    this.video.autoplay = true;
    this.video.playsInline = true;
    this.video.style.cssText = "width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1);";
    
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; transform: scaleX(-1);";
    
    preview.appendChild(this.video);
    preview.appendChild(this.canvas);
    this.overlay.appendChild(preview);

    // 3. CYBERPUNK CURSOR
    this.cursor = document.createElement('div');
    this.cursor.id = 'gesture-cursor';
    this.cursor.style.cssText = `
        position: absolute;
        width: 24px;
        height: 24px;
        border: 2px solid #00FFDE;
        background: rgba(0, 255, 222, 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        display: none;
        box-shadow: 0 0 15px #00FFDE, inset 0 0 5px rgba(0, 255, 222, 0.5);
        transition: width 0.1s, height 0.1s, background-color 0.1s;
    `;
    
    // Dot center
    this.cursor.innerHTML = '<div style="position:absolute; top:50%; left:50%; width:4px; height:4px; background:white; transform:translate(-50%,-50%); border-radius:50%; box-shadow: 0 0 5px white;"></div>';
    
    this.overlay.appendChild(this.cursor);
  }

  async toggle(silent = false) {
    if (this.isRunning) {
      this.stop();
    } else {
      await this.start();
    }
  }

  async start() {
    if (!this.handLandmarker) {
        try {
            const vision = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/+esm");
            const FilesetResolver = vision.FilesetResolver;
            const HandLandmarker = vision.HandLandmarker;
            
            const wasm = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
            this.handLandmarker = await HandLandmarker.createFromOptions(wasm, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numHands: 1
            });
        } catch (e) {
            console.error(e);
            return;
        }
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.srcObject = stream;
      
      this.video.addEventListener("loadeddata", () => {
        this.isRunning = true;
        localStorage.setItem('gesture_enabled', 'true');
        
        document.getElementById('gesture-preview').style.display = 'block';
        this.cursor.style.display = 'block';
        document.getElementById('gesture-toggle-btn').classList.add('bg-cyber-cyan', 'text-black');
        
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.ctx = this.canvas.getContext('2d');
        
        this.loop();
      });
    } catch (err) {
      console.error(err);
    }
  }

  stop() {
    this.isRunning = false;
    localStorage.setItem('gesture_enabled', 'false');
    
    if (this.video.srcObject) {
      this.video.srcObject.getTracks().forEach(track => track.stop());
      this.video.srcObject = null;
    }
    
    document.getElementById('gesture-preview').style.display = 'none';
    this.cursor.style.display = 'none';
    document.getElementById('gesture-toggle-btn').classList.remove('bg-cyber-cyan', 'text-black');
  }

  async loop() {
    if (!this.isRunning) return;

    if (this.video.readyState < 2) {
        requestAnimationFrame(() => this.loop());
        return;
    }

    const results = this.handLandmarker.detectForVideo(this.video, performance.now());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (results.landmarks && results.landmarks.length > 0) {
      const landmarks = results.landmarks[0];
      this.drawSkeleton(landmarks);
      this.processGesture(landmarks);
    }

    requestAnimationFrame(() => this.loop());
  }

  processGesture(landmarks) {
      const indexTip = landmarks[8];
      
      const targetX = (1 - indexTip.x) * window.innerWidth;
      const targetY = indexTip.y * window.innerHeight;
      
      const dx = targetX - this.lastX;
      const dy = targetY - this.lastY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      // Smoothing
      let smooth = this.baseSmoothing;
      if (dist < 10) smooth = 0.08;
      
      this.lastX += dx * smooth;
      this.lastY += dy * smooth;
      
      // Update Cursor
      this.cursor.style.left = this.lastX + 'px';
      this.cursor.style.top = this.lastY + 'px';
      
      // Hover Detection (Visual Feedback)
      this.checkHover();

      // Click Logic
      const thumbTip = landmarks[4];
      const wrist = landmarks[0];
      const middleBase = landmarks[9];
      const handSize = Math.hypot(wrist.x - middleBase.x, wrist.y - middleBase.y);
      const pinchDist = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);
      const ratio = pinchDist / handSize;

      if (ratio < 0.25) {
          if (this.clickCooldown <= 0) {
              // Click Trigger
              this.cursor.style.backgroundColor = '#00FFDE';
              this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
              this.triggerClick();
              this.clickCooldown = 30;
          }
      } else {
          // Reset Visuals
          this.cursor.style.backgroundColor = 'rgba(0, 255, 222, 0.1)';
          this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      }
      
      if (this.clickCooldown > 0) this.clickCooldown--;

      // Edge Scroll
      if (this.lastY < window.innerHeight * 0.1) window.scrollBy(0, -10);
      else if (this.lastY > window.innerHeight * 0.9) window.scrollBy(0, 10);
  }

  checkHover() {
      // We look through the overlay to find elements below
      this.overlay.style.pointerEvents = 'none'; // Ensure we can see through
      const el = document.elementFromPoint(this.lastX, this.lastY);
      
      if (el) {
          const clickable = el.closest('a, button, input, .social-card, .enhanced-card');
          if (clickable) {
              this.cursor.style.width = '40px';
              this.cursor.style.height = '40px';
              this.cursor.style.borderColor = '#FF10F0';
              this.cursor.style.boxShadow = '0 0 20px #FF10F0';
          } else {
              this.cursor.style.width = '24px';
              this.cursor.style.height = '24px';
              this.cursor.style.borderColor = '#00FFDE';
              this.cursor.style.boxShadow = '0 0 15px #00FFDE';
          }
      }
  }

  triggerClick() {
      // Hide cursor/overlay momentarily to ensure click hits bottom element? 
      // Not needed if pointer-events: none on overlay.
      
      const el = document.elementFromPoint(this.lastX, this.lastY);
      if(el) {
          // SMART CLICK: Find the nearest interactive parent
          // This fixes the "can't click social icons" issue where you hit the <i> or <img>
          const clickable = el.closest('a, button, input, [role="button"]');
          if (clickable) {
              clickable.click();
              this.createRipple(true);
          } else {
              el.click();
              this.createRipple(false);
          }
      }
  }
  
  createRipple(success) {
      const ripple = document.createElement('div');
      const color = success ? '#00FFDE' : 'white';
      ripple.style.cssText = `
        position:absolute; 
        left:${this.lastX}px; 
        top:${this.lastY}px; 
        width:40px; 
        height:40px; 
        border:2px solid ${color}; 
        border-radius:50%; 
        transform:translate(-50%,-50%); 
        pointer-events:none; 
        animation: ping 0.5s linear forwards;
      `;
      this.overlay.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      
      // Inject animation if needed
      if(!document.getElementById('gesture-anims')) {
          const style = document.createElement('style');
          style.id = 'gesture-anims';
          style.innerHTML = `@keyframes ping { 0% { transform: translate(-50%,-50%) scale(0.5); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1.5); opacity: 0; } }`;
          document.head.appendChild(style);
      }
  }

  drawSkeleton(landmarks) {
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(0, 255, 222, 0.4)";
      ctx.fillStyle = "#FF10F0";
      
      for(const p of landmarks) {
          ctx.beginPath();
          ctx.arc(p.x * w, p.y * h, 2, 0, 2 * Math.PI);
          ctx.fill();
      }
  }
}

window.addEventListener('load', () => new GestureControl());
