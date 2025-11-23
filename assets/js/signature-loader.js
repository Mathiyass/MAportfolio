document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signature-canvas');
    const loadingProgress = document.getElementById('loading-progress');
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!canvas || !loadingProgress || !loadingScreen) {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 400;
    const height = canvas.height = 150;
    
    let progress = 0;
    let particles = [];
    
    const letterPaths = {
        M: [[50, 120], [50, 40], [75, 80], [100, 40], [100, 120]],
        A: [[120, 120], [135, 40], [150, 120], [127, 85], [143, 85]],
        T: [[170, 40], [210, 40], [190, 40], [190, 120]],
        H: [[230, 40], [230, 120], [230, 80], [260, 80], [260, 40], [260, 120]],
        I: [[280, 40], [300, 40], [290, 40], [290, 120], [280, 120], [300, 120]],
        Y: [[320, 40], [335, 80], [350, 40], [335, 80], [335, 120]],
        A2: [[370, 120], [385, 40], [400, 120], [377, 85], [393, 85]]
    };
    
    const allPoints = Object.values(letterPaths).flat();
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.life = Math.random() * 60 + 40;
            this.maxLife = this.life;
            this.vx = (Math.random() - 0.5) * 2.5;
            this.vy = (Math.random() - 0.5) * 2.5;
            this.gravity = 0.05;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.life--;
        }
        
        draw() {
            const alpha = this.life / this.maxLife;
            ctx.save();
            ctx.globalAlpha = alpha * 0.8;
            ctx.fillStyle = Math.random() < 0.1 ? '#FF3366' : '#00FFDE';
            ctx.shadowColor = '#00FFDE';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function drawGrid() {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 222, 0.1)';
        ctx.lineWidth = 0.5;
        const gridSize = 20;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        ctx.restore();
    }
    
    function drawSignature() {
        ctx.clearRect(0, 0, width, height);
        drawGrid();
        
        if (allPoints.length > 0) {
            ctx.strokeStyle = '#00FFDE';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = '#00FFDE';
            ctx.shadowBlur = 15;
            
            const pointsToDraw = Math.floor((progress / 100) * allPoints.length);
            
            if (pointsToDraw > 1) {
                ctx.beginPath();
                ctx.moveTo(allPoints[0][0], allPoints[0][1]);
                
                for (let i = 1; i < pointsToDraw; i++) {
                    ctx.lineTo(allPoints[i][0], allPoints[i][1]);
                }
                ctx.stroke();
                
                if (pointsToDraw < allPoints.length) {
                    const currentPoint = allPoints[pointsToDraw - 1];
                    if (Math.random() < 0.6) { // Increased particle spawn rate
                        particles.push(new Particle(currentPoint[0], currentPoint[1]));
                    }
                }
            }
        }
        
        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.life > 0;
        });
        
        if (allPoints.length > 0 && progress < 100) {
            const currentIndex = Math.floor((progress / 100) * allPoints.length);
            if (currentIndex < allPoints.length) {
                const point = allPoints[currentIndex];
                ctx.save();
                ctx.fillStyle = '#FF3366';
                ctx.shadowColor = '#FF3366';
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(point[0], point[1], 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
    }
    
    function animate() {
        drawSignature();
        
        if (progress < 100) {
            // Slowed down the progress increment to extend duration
            progress += 0.35;
            loadingProgress.style.width = progress + '%';
            requestAnimationFrame(animate);
        } else {
            // Animation finished, start fade out
            if (loadingScreen.style.opacity !== '0') {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.pointerEvents = 'none';
                // After transition, hide it completely
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Signal that main content can animate
                    if (window.startMainContentAnimation) {
                        window.startMainContentAnimation();
                    } else {
                        // Fallback if main.js isn't ready or function is missing
                        document.body.classList.remove('overflow-hidden');
                        if (typeof AOS !== 'undefined') {
                            AOS.init();
                        }
                    }
                }, 1500);
            }
        }
    }
    
    animate();
});
