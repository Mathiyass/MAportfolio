document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('loading-canvas');
    const ctx = canvas.getContext('2d');
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.getElementById('loading-progress');

    if (!canvas || !loadingScreen) {
        console.error('Loader elements not found!');
        return;
    }

    let width = canvas.width;
    let height = canvas.height;
    let particles = [];
    let stars = [];
    const text = "MATHIYA";
    let letterPoints = [];
    let totalPathLength = 0;
    let pathTraveled = 0;
    let progress = 0;

    // Define points for each letter (simplified paths)
    const letterDefinitions = {
        'M': [
            {x: 0, y: 100}, {x: 0, y: 0}, {x: 25, y: 40}, 
            {x: 50, y: 0}, {x: 50, y: 100}
        ],
        'A': [
            {x: 0, y: 100}, {x: 25, y: 0}, {x: 50, y: 100},
            {x: 37.5, y: 50}, {x: 12.5, y: 50}
        ],
        'T': [
            {x: 0, y: 0}, {x: 50, y: 0}, {x: 25, y: 0}, {x: 25, y: 100}
        ],
        'H': [
            {x: 0, y: 0}, {x: 0, y: 100}, {x: 0, y: 50}, 
            {x: 50, y: 50}, {x: 50, y: 0}, {x: 50, y: 100}
        ],
        'I': [
            {x: 0, y: 0}, {x: 50, y: 0}, {x: 25, y: 0}, 
            {x: 25, y: 100}, {x: 0, y: 100}, {x: 50, y: 100}
        ],
        'Y': [
            {x: 0, y: 0}, {x: 25, y: 50}, {x: 50, y: 0}, 
            {x: 25, y: 50}, {x: 25, y: 100}
        ]
    };

    let drawer = { x: 0, y: 0, currentPathIndex: 0, currentPointIndex: 0 };

    function createStars() {
        stars = [];
        for (let i = 0; i < 100; i++) {
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
        const fontSize = 60;
        const letterSpacing = 70;
        const totalTextWidth = text.length * letterSpacing;
        let currentX = (width - totalTextWidth) / 2;
        const startY = height / 2 - fontSize / 2;

        for (const char of text) {
            const definition = letterDefinitions[char];
            const path = definition.map(p => ({
                x: currentX + (p.x / 50) * fontSize * 0.8,
                y: startY + (p.y / 100) * fontSize
            }));
            letterPoints.push(path);
            currentX += letterSpacing;
        }

        // Calculate total path length
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
            this.color = Math.random() > 0.5 ? '0, 255, 222' : '255, 51, 102';
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
        ctx.arc(drawer.x, drawer.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#00FFDE';
        ctx.shadowColor = '#00FFDE';
        ctx.shadowBlur = 15;
        ctx.fill();
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        ctx.fillRect(0, 0, width, height);
        ctx.shadowBlur = 0;

        // Draw stars
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.3})`;
            ctx.fill();
        });

        // Update and draw particles
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            if (p.life <= 0) {
                particles.splice(index, 1);
            }
        });
        
        drawDrawer();
        moveDrawer();

        // Update progress bar
        progress = Math.min((pathTraveled / totalPathLength) * 100, 100);
        loadingProgress.style.width = progress + '%';

        if (progress < 100) {
            requestAnimationFrame(animate);
        } else {
            setTimeout(finishLoading, 1000);
        }
    }

    function moveDrawer() {
        const speed = 3;
        const currentPath = letterPoints[drawer.currentPathIndex];
        if (!currentPath) return;

        const targetPoint = currentPath[drawer.currentPointIndex + 1];
        if (!targetPoint) {
            drawer.currentPathIndex++;
            drawer.currentPointIndex = 0;
            if (drawer.currentPathIndex >= letterPoints.length) {
                pathTraveled = totalPathLength;
                return;
            }
            const nextPath = letterPoints[drawer.currentPathIndex];
            if (nextPath && nextPath[0]) {
                drawer.x = nextPath[0].x;
                drawer.y = nextPath[0].y;
            }
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
        for(let i = 0; i < 2; i++) {
            particles.push(new Particle(
                drawer.x + (Math.random() - 0.5) * 10,
                drawer.y + (Math.random() - 0.5) * 10
            ));
        }
    }

    function finishLoading() {
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

    function start() {
        createStars();
        setupLetterPaths();
        animate();
    }

    start();
});