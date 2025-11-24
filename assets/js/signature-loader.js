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
    const width = canvas.width = 800;
    const height = canvas.height = 400;
    
    let progress = 0;
    let particles = [];
    let circuitNodes = [];
    let frame = 0;
    let exitTriggered = false;
    let shakeIntensity = 0;
    
    // Define letter paths for "MATHIYAN"
    // Canvas size: 800x400
    // We scale everything to fit nicely in the center.
    const letterPaths = {
        M: [[100, 260], [100, 100], [150, 180], [200, 100], [200, 260]],
        A: [[240, 260], [270, 100], [300, 260], [255, 190], [285, 190]],
        T: [[340, 100], [400, 100], [370, 100], [370, 260]],
        H: [[440, 100], [440, 260], [440, 180], [490, 180], [490, 100], [490, 260]],
        I: [[530, 100], [560, 100], [545, 100], [545, 260], [530, 260], [560, 260]],
        Y: [[600, 100], [625, 180], [650, 100], [625, 180], [625, 260]],
        A2: [[690, 260], [720, 100], [750, 260], [705, 190], [735, 190]],
        N: [[790, 260], [790, 100], [840, 260], [840, 100]]
    };

    // Calculate scale and offset to center the text
    // Total logical width from 100 to 840 is 740.
    const scale = 0.85;
    const logicalWidth = 740;
    const offsetX = (width - (logicalWidth * scale)) / 2 - (100 * scale);
    const offsetY = 20;

    const allPoints = Object.values(letterPaths).flat().map(point => {
        return [point[0] * scale + offsetX, point[1] * scale + offsetY];
    });
    
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
        constructor(x, y, type = 'normal') {
            this.x = x;
            this.y = y;
            this.type = type;
            this.size = Math.random() * 2 + 1;
            this.life = Math.random() * 60 + 40;
            this.maxLife = this.life;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;

            if (this.type === 'spark') {
                this.color = Math.random() < 0.5 ? '#FFFF00' : '#FFFFFF';
                this.vx *= 3;
                this.vy *= 3;
                this.life = 40;
                this.size = Math.random() * 3 + 1;
            } else if (this.type === 'glow') {
                this.color = '#FF10F0';
                this.vx *= 0.5;
                this.vy *= 0.5;
                this.life = 30;
            } else {
                this.color = Math.random() < 0.5 ? '#00FFDE' : '#FF3366';
            }
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            this.size *= 0.95;
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

    // Circuit Background Logic
    class CircuitNode {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
             // Slowly float
             this.x += (Math.random() - 0.5) * 0.2;
             this.y += (Math.random() - 0.5) * 0.2;

             // Wrap around
             if (this.x < 0) this.x = width;
             if (this.x > width) this.x = 0;
             if (this.y < 0) this.y = height;
             if (this.y > height) this.y = 0;
        }
    }

    // Create circuit nodes
    for (let i = 0; i < 25; i++) {
        circuitNodes.push(new CircuitNode());
    }

    function drawCircuitBackground() {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 222, 0.08)';
        ctx.lineWidth = 1;

        // Draw Nodes and Update
        circuitNodes.forEach(node => {
            node.update();
            ctx.fillStyle = 'rgba(0, 255, 222, 0.2)';
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw Lines (occasionally pulsing)
        if (frame % 3 === 0) { // Optimize drawing
            ctx.beginPath();
            circuitNodes.forEach((node, i) => {
                // Connect to nearest 2 nodes
                for (let j = i + 1; j < circuitNodes.length; j++) {
                    const other = circuitNodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < 150) {
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                    }
                }
            });
            ctx.stroke();
        }
        ctx.restore();
    }
    
    function drawScanner() {
        const scanY = (frame * 3) % height;
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 16, 240, 0.2)'; // Neon pink scanner
        ctx.lineWidth = 2;
        ctx.shadowColor = '#FF10F0';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();

        // Scanner trail
        const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY);
        gradient.addColorStop(0, 'rgba(255, 16, 240, 0)');
        gradient.addColorStop(1, 'rgba(255, 16, 240, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, scanY - 50, width, 50);

        ctx.restore();
    }

    function drawSignature() {
        ctx.save();

        // Shake effect
        if (shakeIntensity > 0) {
            const dx = (Math.random() - 0.5) * shakeIntensity;
            const dy = (Math.random() - 0.5) * shakeIntensity;
            ctx.translate(dx, dy);
            shakeIntensity *= 0.9;
            if (shakeIntensity < 0.5) shakeIntensity = 0;
        }

        ctx.clearRect(0, 0, width, height);
        
        drawCircuitBackground();
        drawScanner();

        // Connect particles
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 222, 0.15)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            // Only connect if close enough
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 50) {
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
            if (Math.random() < 0.03) {
                glitchOffsetX = (Math.random() - 0.5) * 8;
                glitchOffsetY = (Math.random() - 0.5) * 8;
                ctx.shadowColor = '#FF3366'; // Glitch color
                ctx.strokeStyle = '#FF3366';
            } else {
                ctx.shadowColor = '#00FFDE';
                ctx.strokeStyle = '#00FFDE';
            }

            ctx.translate(glitchOffsetX, glitchOffsetY);
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowBlur = 15;
            
            // Calculate how many points to draw based on progress
            // Clamp to allPoints.length
            const pointsToDraw = Math.min(Math.floor((progress / 100) * allPoints.length), allPoints.length);
            
            if (pointsToDraw > 1) {
                ctx.beginPath();
                ctx.moveTo(allPoints[0][0], allPoints[0][1]);
                
                for (let i = 1; i < pointsToDraw; i++) {
                    ctx.lineTo(allPoints[i][0], allPoints[i][1]);
                }
                ctx.stroke();
                
                // Spawn particles at the "pen" tip
                if (pointsToDraw < allPoints.length && progress < 100) {
                    const currentPoint = allPoints[pointsToDraw - 1];
                    // Spawn more particles
                    for(let k=0; k<3; k++){
                        if (Math.random() < 0.5) {
                            particles.push(new Particle(currentPoint[0], currentPoint[1], Math.random() < 0.2 ? 'spark' : 'normal'));
                        }
                    }
                }
            }
            ctx.restore();

            // Draw Subtitle when near completion
            if (progress > 85) {
                 ctx.save();
                 const opacity = Math.min((progress - 85) / 15, 1);
                 ctx.globalAlpha = opacity;
                 ctx.font = '700 24px Orbitron';
                 ctx.fillStyle = '#00FFDE';
                 ctx.textAlign = 'center';
                 ctx.shadowColor = '#00FFDE';
                 ctx.shadowBlur = 10;
                 ctx.fillText('SOFTWARE ENGINEER', width/2, height - 40);

                 // Glitch text occasionally
                 if (Math.random() < 0.05) {
                     ctx.fillStyle = '#FF3366';
                     ctx.fillText('SOFTWARE ENGINEER', width/2 + Math.random()*4 - 2, height - 40 + Math.random()*4 - 2);
                 }
                 ctx.restore();
            }
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
                ctx.arc(point[0], point[1], 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        ctx.restore(); // Restore shake
    }
    
    function animate() {
        drawSignature();
        frame++;
        
        if (progress < 100) {
            progress += 0.5; // Speed
            if (progress > 100) progress = 100;
            loadingProgress.style.width = progress + '%';
        } else {
            // Animation finished
            if (!exitTriggered) {
                exitTriggered = true;
                loadingText.innerText = "IDENTITY VERIFIED";
                loadingText.classList.add("text-neon-pink", "text-lg");

                // Explosion effect
                shakeIntensity = 20;
                 for(let i=0; i<80; i++) {
                    particles.push(new Particle(width/2 + (Math.random()-0.5)*200, height/2 + (Math.random()-0.5)*50, 'spark'));
                 }

                 // Flash
                 const flash = document.createElement('div');
                 flash.className = 'fixed inset-0 bg-white z-[101] pointer-events-none transition-opacity duration-300';
                 flash.style.opacity = '0.8';
                 document.body.appendChild(flash);
                 requestAnimationFrame(() => {
                     flash.style.opacity = '0';
                     setTimeout(() => flash.remove(), 300);
                 });

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
                }, 1500); // Wait a bit to show the "SOFTWARE ENGINEER" text
            }
        }

        if (loadingScreen.style.opacity !== '0') {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
});
