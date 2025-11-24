document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signature-canvas');
    const loadingProgress = document.getElementById('loading-progress');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    
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
    let frame = 0;
    
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
    
    // Decoding text effect
    const originalText = "INITIALIZING SYSTEMS...";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    let decodingInterval;

    if (loadingText) {
        let iterations = 0;
        decodingInterval = setInterval(() => {
            loadingText.innerText = originalText.split("")
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");

            if (iterations >= originalText.length) {
                clearInterval(decodingInterval);
                loadingText.classList.add('animate-pulse');
            }

            iterations += 1/3;
        }, 30);
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.life = Math.random() * 60 + 40;
            this.maxLife = this.life;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.color = Math.random() < 0.5 ? '#00FFDE' : '#FF3366';
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
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function drawHexGrid() {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 222, 0.05)';
        ctx.lineWidth = 1;
        const radius = 20;
        const a = 2 * Math.PI / 6;
        const r = radius;

        for (let y = 0; y < height + r * 2; y += r * 1.5) {
            for (let x = 0; x < width + r * 2; x += r * Math.sqrt(3)) {
                let xOffset = (Math.floor(y / (r * 1.5)) % 2) * (r * Math.sqrt(3) / 2);
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    ctx.lineTo(x + xOffset + r * Math.cos(a * i), y + r * Math.sin(a * i));
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
        ctx.restore();
    }
    
    function drawSignature() {
        ctx.clearRect(0, 0, width, height);
        drawHexGrid();
        
        // Connect particles
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 222, 0.2)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 40) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.restore();

        if (allPoints.length > 0) {
            ctx.save();

            // Glitch effect logic
            let glitchOffsetX = 0;
            let glitchOffsetY = 0;
            if (Math.random() < 0.05) {
                glitchOffsetX = (Math.random() - 0.5) * 5;
                glitchOffsetY = (Math.random() - 0.5) * 5;
                ctx.shadowColor = '#FF3366'; // Glitch color
            } else {
                ctx.shadowColor = '#00FFDE';
            }

            ctx.translate(glitchOffsetX, glitchOffsetY);
            ctx.strokeStyle = '#00FFDE';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 15;
            
            const pointsToDraw = Math.floor((progress / 100) * allPoints.length);
            
            if (pointsToDraw > 1) {
                ctx.beginPath();
                ctx.moveTo(allPoints[0][0], allPoints[0][1]);
                
                for (let i = 1; i < pointsToDraw; i++) {
                    ctx.lineTo(allPoints[i][0], allPoints[i][1]);
                }
                ctx.stroke();
                
                // Spawn particles at the "pen" tip
                if (pointsToDraw < allPoints.length) {
                    const currentPoint = allPoints[pointsToDraw - 1];
                    // Spawn more particles
                    if (Math.random() < 0.8) {
                        particles.push(new Particle(currentPoint[0], currentPoint[1]));
                    }
                }
            }
            ctx.restore();
        }
        
        // Update and draw particles
        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.life > 0;
        });
        
        // Glowing tip
        if (allPoints.length > 0 && progress < 100) {
            const currentIndex = Math.floor((progress / 100) * allPoints.length);
            if (currentIndex < allPoints.length && currentIndex > 0) {
                const point = allPoints[currentIndex];
                ctx.save();
                ctx.fillStyle = '#FF3366';
                ctx.shadowColor = '#FF3366';
                ctx.shadowBlur = 20;
                ctx.beginPath();
                ctx.arc(point[0], point[1], 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
    }
    
    function animate() {
        drawSignature();
        frame++;
        
        if (progress < 100) {
            progress += 0.4; // Slightly faster
            loadingProgress.style.width = progress + '%';

            requestAnimationFrame(animate);
        } else {
            // Animation finished
            if (loadingScreen.style.opacity !== '0') {
                loadingText.innerText = "SYSTEM READY";
                loadingText.classList.add("text-neon-pink");

                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.pointerEvents = 'none';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        if (window.startMainContentAnimation) {
                            window.startMainContentAnimation();
                        } else {
                            document.body.classList.remove('overflow-hidden');
                            if (typeof AOS !== 'undefined') {
                                AOS.init();
                            }
                        }
                    }, 1000);
                }, 500);
            }
        }
    }
    
    animate();
});
