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
        constructor(x, y, color, size, life, velocity) {
            this.x = x;
            this.y = y;
            this.size = size || Math.random() * 3.5 + 1;
            this.life = life || Math.random() * 80 + 60;
            this.maxLife = this.life;
            this.color = color || ['#00FFDE', '#FF3366', '#FF10F0'][Math.floor(Math.random() * 3)];
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 4 + 1) * (velocity || 1);
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.gravity = 0.08;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.life--;
        }
        
        draw() {
            const alpha = Math.pow(this.life / this.maxLife, 2);
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function createBurst(x, y, count, color, size, life, velocity) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y, color, size, life, velocity));
        }
    }

    function drawSignature() {
        ctx.clearRect(0, 0, width, height);
        
        if (allPoints.length > 0 && progress < 100) {
            ctx.strokeStyle = '#00FFDE';
            ctx.lineWidth = 3.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = '#00FFDE';
            ctx.shadowBlur = 20;
            
            const pointsToDraw = Math.floor((progress / 100) * allPoints.length);
            
            if (pointsToDraw > 1) {
                ctx.beginPath();
                ctx.moveTo(allPoints[0][0], allPoints[0][1]);
                
                for (let i = 1; i < pointsToDraw; i++) {
                    const wobbleX = (Math.random() - 0.5) * 1.5;
                    const wobbleY = (Math.random() - 0.5) * 1.5;
                    ctx.lineTo(allPoints[i][0] + wobbleX, allPoints[i][1] + wobbleY);
                }
                ctx.stroke();
                
                const currentPoint = allPoints[pointsToDraw - 1];
                if (Math.random() < 0.8) {
                    particles.push(new Particle(currentPoint[0], currentPoint[1]));
                }
            }
        }
        
        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.life > 0;
        });
    }
    
    let finalBurstDone = false;
    function animate() {
        drawSignature();
        
        if (progress < 100) {
            progress += 0.5; // Slightly faster progress
            loadingProgress.style.width = progress + '%';
        } else {
            if (!finalBurstDone) {
                createBurst(width / 2, height / 2, 120, null, null, 100, 2.5);
                finalBurstDone = true;
            }
        }

        if (progress >= 100 && particles.length === 0) {
            if (loadingScreen.style.opacity !== '0') {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.pointerEvents = 'none';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }
            return; // Stop the animation loop
        }

        requestAnimationFrame(animate);
    }
    
    animate();
});
