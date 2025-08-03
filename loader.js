document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('loading-canvas');
    const ctx = canvas.getContext('2d');
    const loadingScreen = document.getElementById('loading-screen');

    if (!canvas || !loadingScreen) {
        console.error('Loader elements not found!');
        return;
    }

    let width, height;
    let particles = [];
    let stars = [];
    const text = "MATHIYA";
    let letterPoints = [];
    let totalPathLength = 0;
    let pathTraveled = 0;

    // --- Path Definitions ---
    // Define points for each letter. This is a complex and manual process.
    // Each point is {x, y}. The coordinates are relative to a baseline.
    const letterDefinitions = {
        'M': [ {x:0,y:100},{x:0,y:0},{x:50,y:50},{x:100,y:0},{x:100,y:100} ],
        'A': [ {x:0,y:100},{x:50,y:0},{x:100,y:100},{x:75,y:50},{x:25,y:50} ],
        'T': [ {x:0,y:0},{x:100,y:0},{x:50,y:0},{x:50,y:100} ],
        'H': [ {x:0,y:0},{x:0,y:100},{x:0,y:50},{x:100,y:50},{x:100,y:0},{x:100,y:100} ],
        'I': [ {x:50,y:0},{x:50,y:100} ],
        'Y': [ {x:0,y:0},{x:50,y:50},{x:100,y:0},{x:50,y:50},{x:50,y:100} ],
        'A': [ {x:0,y:100},{x:50,y:0},{x:100,y:100},{x:75,y:50},{x:25,y:50} ]
    };

    let drawer = { x: 0, y: 0, currentPathIndex: 0, currentPointIndex: 0 };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        stars = [];
        createStars();
        setupLetterPaths();
    }

    function createStars() {
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5,
                alpha: Math.random() * 0.5 + 0.5
            });
        }
    }

    function setupLetterPaths() {
        letterPoints = [];
        totalPathLength = 0;
        const fontSize = Math.min(width / 10, 100);
        const totalTextWidth = text.length * (fontSize * 0.8);
        let currentX = (width - totalTextWidth) / 2;
        const startY = height / 2 - fontSize / 2;

        for (const char of text) {
            const definition = letterDefinitions[char];
            const path = definition.map(p => {
                return {
                    x: currentX + (p.x / 100) * fontSize * 0.7,
                    y: startY + (p.y / 100) * fontSize
                };
            });
            letterPoints.push(path);
            currentX += fontSize * 0.8;
        }

        // Calculate total path length for progress bar
        letterPoints.forEach(path => {
            for (let i = 0; i < path.length - 1; i++) {
                const dx = path[i+1].x - path[i].x;
                const dy = path[i+1].y - path[i].y;
                totalPathLength += Math.sqrt(dx*dx + dy*dy);
            }
        });

        // Set initial drawer position
        if (letterPoints.length > 0 && letterPoints[0].length > 0) {
            drawer.x = letterPoints[0][0].x;
            drawer.y = letterPoints[0][0].y;
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.alpha = 1;
            this.life = 30 + Math.random() * 20;
            this.color = Math.random() > 0.1 ? '255, 85, 85' : '255, 184, 108'; // Mostly red, some orange
        }

        update() {
            this.life--;
            this.alpha = this.life / 50;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.shadowColor = `rgba(${this.color}, 1)`;
            ctx.shadowBlur = 10;
            ctx.fill();
        }
    }

    function drawDrawer() {
        ctx.beginPath();
        ctx.arc(drawer.x, drawer.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 15;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(drawer.x, drawer.y + 10, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    function animate() {
        ctx.fillStyle = 'rgba(40, 42, 54, 0.25)'; // Fading trail
        ctx.fillRect(0, 0, width, height);
        ctx.shadowBlur = 0;

        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(248, 248, 242, ${star.alpha})`;
            ctx.fill();
        });

        particles.forEach((p, index) => {
            p.update();
            p.draw();
            if (p.life <= 0) {
                particles.splice(index, 1);
            }
        });
        
        drawDrawer();

        if (pathTraveled < totalPathLength) {
            requestAnimationFrame(animate);
        } else {
            finishLoading();
        }
    }

    function moveDrawer() {
        const speed = 5; // pixels per frame
        const currentPath = letterPoints[drawer.currentPathIndex];
        if (!currentPath) return;

        const targetPoint = currentPath[drawer.currentPointIndex + 1];
        if (!targetPoint) {
            drawer.currentPathIndex++;
            drawer.currentPointIndex = 0;
            if (drawer.currentPathIndex >= letterPoints.length) {
                pathTraveled = totalPathLength; // End animation
                return;
            }
            const nextPath = letterPoints[drawer.currentPathIndex];
            drawer.x = nextPath[0].x;
            drawer.y = nextPath[0].y;
            return;
        }

        const dx = targetPoint.x - drawer.x;
        const dy = targetPoint.y - drawer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < speed) {
            drawer.x = targetPoint.x;
            drawer.y = targetPoint.y;
            drawer.currentPointIndex++;
            pathTraveled += dist;
        } else {
            drawer.x += (dx / dist) * speed;
            drawer.y += (dy / dist) * speed;
            pathTraveled += speed;
        }

        // Emit particles
        for(let i = 0; i < 3; i++) {
            particles.push(new Particle(drawer.x, drawer.y));
        }

        if (pathTraveled < totalPathLength) {
            requestAnimationFrame(moveDrawer);
        }
    }

    function finishLoading() {
        // Final fade out of particles
        const interval = setInterval(() => {
            if (particles.length === 0) {
                clearInterval(interval);
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
            }
        }, 50);
    }

    function start() {
        resize();
        window.addEventListener('resize', resize);
        animate();
        moveDrawer();
    }

    start();
});
