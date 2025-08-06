
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signature-canvas');
    const loadingProgress = document.getElementById('loading-progress');
    const loadingScreen = document.getElementById('loading-screen');
    
    // Check if elements exist before proceeding
    if (!canvas || !loadingProgress || !loadingScreen) {
        // If loading elements don't exist, start main content immediately
        if (typeof window.startMainContentAnimation === 'function') {
            window.startMainContentAnimation();
        }
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const width = canvas.width = 400;
    const height = canvas.height = 150;
    
    // Animation variables
    let progress = 0;
    let currentLetter = 0;
    let currentPoint = 0;
    let particles = [];
    
    // MATHIYA letter paths (simplified signature style)
    const letterPaths = {
        M: [[50, 120], [50, 40], [75, 80], [100, 40], [100, 120]],
        A: [[120, 120], [135, 40], [150, 120], [127, 85], [143, 85]],
        T: [[170, 40], [210, 40], [190, 40], [190, 120]],
        H: [[230, 40], [230, 120], [230, 80], [260, 80], [260, 40], [260, 120]],
        I: [[280, 40], [300, 40], [290, 40], [290, 120], [280, 120], [300, 120]],
        Y: [[320, 40], [335, 80], [350, 40], [335, 80], [335, 120]],
        A2: [[370, 120], [385, 40], [400, 120], [377, 85], [393, 85]]
    };
    
    const letters = Object.keys(letterPaths);
    let allPoints = [];
    
    // Flatten all points
    letters.forEach(letter => {
        allPoints = allPoints.concat(letterPaths[letter]);
    });
    
    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.life = 60;
            this.maxLife = 60;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
        }
        
        draw() {
            const alpha = this.life / this.maxLife;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#00FFDE';
            ctx.shadowColor = '#00FFDE';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    function drawSignature() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw completed paths
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
                
                // Add particles at current drawing point
                if (pointsToDraw < allPoints.length) {
                    const currentPoint = allPoints[pointsToDraw - 1];
                    if (Math.random() < 0.3) {
                        particles.push(new Particle(currentPoint[0], currentPoint[1]));
                    }
                }
            }
        }
        
        // Update and draw particles
        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.life > 0;
        });
        
        // Draw current point glow
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
            progress += 1.5;
            loadingProgress.style.width = progress + '%';
            requestAnimationFrame(animate);
        } else {
            // Wait a moment then fade out
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.remove();
                    // Start main content animations
                    if (typeof window.startMainContentAnimation === 'function') {
                        window.startMainContentAnimation();
                    }
                }, 1000);
            }, 500);
        }
    }
    
    // Start animation
    animate();
});
