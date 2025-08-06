// Signature-style MATHIYA loading animation
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signature-canvas');
    const ctx = canvas.getContext('2d');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.getElementById('loading-progress');

    if (!canvas || !loadingScreen) {
        console.error('Signature loader elements not found!');
        return;
    }

    // Set canvas size
    canvas.width = 800;
    canvas.height = 200;

    let particles = [];
    let stars = [];
    let currentPath = 0;
    let currentPoint = 0;
    let progress = 0;
    let isComplete = false;

    // Signature paths for MATHIYA (handwriting style)
    const signaturePaths = [
        // M
        [
            {x: 50, y: 150}, {x: 50, y: 50}, {x: 80, y: 100}, 
            {x: 110, y: 50}, {x: 110, y: 150}
        ],
        // A
        [
            {x: 140, y: 150}, {x: 165, y: 50}, {x: 190, y: 150},
            {x: 175, y: 100}, {x: 155, y: 100}
        ],
        // T
        [
            {x: 210, y: 60}, {x: 260, y: 60}, {x: 235, y: 60}, {x: 235, y: 150}
        ],
        // H
        [
            {x: 280, y: 50}, {x: 280, y: 150}, {x: 280, y: 100}, 
            {x: 320, y: 100}, {x: 320, y: 50}, {x: 320, y: 150}
        ],
        // I
        [
            {x: 340, y: 60}, {x: 380, y: 60}, {x: 360, y: 60}, 
            {x: 360, y: 140}, {x: 340, y: 150}, {x: 380, y: 150}
        ],
        // Y
        [
            {x: 400, y: 50}, {x: 425, y: 100}, {x: 450, y: 50}, 
            {x: 425, y: 100}, {x: 425, y: 150}
        ],
        // A
        [
            {x: 470, y: 150}, {x: 495, y: 50}, {x: 520, y: 150},
            {x: 505, y: 100}, {x: 485, y: 100}
        ]
    ];

    // Create star field
    function createStars() {
        stars = [];
        for (let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.8 + 0.2,
                twinkle: Math.random() * 0.02 + 0.01
            });
        }
    }

    // Particle class for signature trail
    class SignatureParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.life = 1.0;
            this.decay = Math.random() * 0.02 + 0.01;
            this.size = Math.random() * 3 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.vx *= 0.98;
            this.vy *= 0.98;
        }

        draw() {
            if (this.life <= 0) return;
            
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = '#00FFDE';
            ctx.shadowColor = '#00FFDE';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Draw stars
    function drawStars() {
        stars.forEach(star => {
            star.alpha += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
            star.alpha = Math.max(0.2, Math.min(1, star.alpha));
            
            ctx.save();
            ctx.globalAlpha = star.alpha;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    // Draw signature path
    function drawSignature() {
        if (currentPath >= signaturePaths.length) {
            if (!isComplete) {
                isComplete = true;
                setTimeout(finishLoading, 1000);
            }
            return;
        }

        const path = signaturePaths[currentPath];
        
        // Draw completed paths
        ctx.strokeStyle = '#00FFDE';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = '#00FFDE';
        ctx.shadowBlur = 15;

        for (let i = 0; i < currentPath; i++) {
            const completedPath = signaturePaths[i];
            ctx.beginPath();
            ctx.moveTo(completedPath[0].x, completedPath[0].y);
            for (let j = 1; j < completedPath.length; j++) {
                ctx.lineTo(completedPath[j].x, completedPath[j].y);
            }
            ctx.stroke();
        }

        // Draw current path up to current point
        if (currentPoint > 0) {
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i <= Math.min(currentPoint, path.length - 1); i++) {
                ctx.lineTo(path[i].x, path[i].y);
            }
            ctx.stroke();
        }

        // Animate to next point
        if (currentPoint < path.length - 1) {
            currentPoint++;
            
            // Add particles at current position
            const point = path[currentPoint];
            for (let i = 0; i < 5; i++) {
                particles.push(new SignatureParticle(point.x, point.y));
            }
            
            // Update progress
            const totalPoints = signaturePaths.reduce((sum, p) => sum + p.length, 0);
            const completedPoints = signaturePaths.slice(0, currentPath).reduce((sum, p) => sum + p.length, 0) + currentPoint;
            progress = (completedPoints / totalPoints) * 100;
            
        } else {
            currentPath++;
            currentPoint = 0;
        }
    }

    // Update and draw particles
    function updateParticles() {
        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.life > 0;
        });
    }

    // Animation loop
    function animate() {
        // Clear canvas with fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawStars();
        drawSignature();
        updateParticles();

        // Update progress bar
        if (loadingProgress) {
            loadingProgress.style.width = progress + '%';
        }

        if (!isComplete) {
            requestAnimationFrame(animate);
        }
    }

    // Finish loading animation
    function finishLoading() {
        // Final glow effect
        ctx.shadowBlur = 30;
        ctx.strokeStyle = '#00FFDE';
        ctx.lineWidth = 6;
        
        signaturePaths.forEach(path => {
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i < path.length; i++) {
                ctx.lineTo(path[i].x, path[i].y);
            }
            ctx.stroke();
        });

        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        loadingScreen.remove();
                        if (typeof window.startMainContentAnimation === 'function') {
                            window.startMainContentAnimation();
                        }
                    }
                });
            } else {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.remove();
                    if (typeof window.startMainContentAnimation === 'function') {
                        window.startMainContentAnimation();
                    }
                }, 1000);
            }
        }, 500);
    }

    // Initialize
    createStars();
    animate();
});