document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('spaceInvadersCanvas');
    if (!canvas) return; // Exit if element doesn't exist (e.g. on other pages)

    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-space-invaders-btn');
    const scoreElement = document.getElementById('space-invaders-score');
    const highScoreElement = document.getElementById('space-invaders-highscore');

    let score = 0;
    let highScore = localStorage.getItem('spaceInvadersHighScore') || 0;
    if (highScoreElement) highScoreElement.textContent = highScore;

    let gameInterval;
    let isGameRunning = false;

    // Game Objects
    const player = {
        x: canvas.width / 2 - 15,
        y: canvas.height - 30,
        width: 30,
        height: 20,
        speed: 5,
        dx: 0,
        color: '#00FFDE'
    };

    let bullets = [];
    let enemies = [];
    let enemyBullets = [];
    let particles = [];

    const enemyRows = 4;
    const enemyCols = 6;
    const enemyWidth = 25;
    const enemyHeight = 20;
    const enemyPadding = 15;
    const enemyOffsetTop = 30;
    const enemyOffsetLeft = 30;
    let enemyDirection = 1; // 1 right, -1 left
    let enemyStepDown = 10;

    function initGame() {
        score = 0;
        if (scoreElement) scoreElement.textContent = score;

        player.x = canvas.width / 2 - 15;
        bullets = [];
        enemyBullets = [];
        particles = [];
        enemies = [];

        for(let c=0; c<enemyCols; c++) {
            for(let r=0; r<enemyRows; r++) {
                enemies.push({
                    x: (c * (enemyWidth + enemyPadding)) + enemyOffsetLeft,
                    y: (r * (enemyHeight + enemyPadding)) + enemyOffsetTop,
                    width: enemyWidth,
                    height: enemyHeight,
                    status: 1
                });
            }
        }

        enemyDirection = 1;

        if (gameInterval) clearInterval(gameInterval);
        isGameRunning = true;
        if (startBtn) startBtn.textContent = "Restart Mission";

        gameLoop();
    }

    function drawPlayer() {
        ctx.fillStyle = player.color;
        // Simple ship shape
        ctx.beginPath();
        ctx.moveTo(player.x + player.width/2, player.y);
        ctx.lineTo(player.x + player.width, player.y + player.height);
        ctx.lineTo(player.x, player.y + player.height);
        ctx.fill();
    }

    function drawEnemies() {
        enemies.forEach(enemy => {
            if(enemy.status === 1) {
                ctx.fillStyle = '#FF3366';
                // Alien shape (simple rect for now with eyes)
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

                // Eyes
                ctx.fillStyle = '#000';
                ctx.fillRect(enemy.x + 5, enemy.y + 5, 5, 5);
                ctx.fillRect(enemy.x + enemy.width - 10, enemy.y + 5, 5, 5);
            }
        });
    }

    function drawBullets() {
        ctx.fillStyle = '#FFFF00';
        bullets.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });

        ctx.fillStyle = '#FF0000';
        enemyBullets.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
    }

    function drawParticles() {
        particles.forEach((p, index) => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.globalAlpha = 1.0;

            p.x += p.dx;
            p.y += p.dy;
            p.life -= 0.05;

            if(p.life <= 0) particles.splice(index, 1);
        });
    }

    function createExplosion(x, y, color) {
        for(let i=0; i<10; i++) {
            particles.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 4,
                dy: (Math.random() - 0.5) * 4,
                size: Math.random() * 3 + 1,
                color: color,
                life: 1.0
            });
        }
    }

    function update() {
        // Move Player
        player.x += player.dx;
        // Boundaries
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

        // Move Bullets
        bullets.forEach((bullet, bIndex) => {
            bullet.y -= bullet.speed;
            if (bullet.y < 0) bullets.splice(bIndex, 1);
        });

        enemyBullets.forEach((bullet, bIndex) => {
            bullet.y += bullet.speed;
            if (bullet.y > canvas.height) enemyBullets.splice(bIndex, 1);
        });

        // Move Enemies
        let hitWall = false;
        enemies.forEach(enemy => {
            if(enemy.status === 1) {
                enemy.x += 2 * enemyDirection; // Speed
                if(enemy.x + enemy.width > canvas.width || enemy.x < 0) {
                    hitWall = true;
                }
            }
        });

        if(hitWall) {
            enemyDirection *= -1;
            enemies.forEach(enemy => {
                enemy.y += enemyStepDown;
            });
        }

        // Collision Detection
        // Player Bullets hitting Enemies
        bullets.forEach((bullet, bIndex) => {
            enemies.forEach(enemy => {
                if(enemy.status === 1) {
                    if(bullet.x > enemy.x && bullet.x < enemy.x + enemy.width &&
                       bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
                        enemy.status = 0;
                        bullets.splice(bIndex, 1);
                        score += 10;
                        if(scoreElement) scoreElement.textContent = score;
                        createExplosion(enemy.x + enemy.width/2, enemy.y + enemy.height/2, '#FF3366');
                    }
                }
            });
        });

        // Enemy Bullets hitting Player
        enemyBullets.forEach((bullet, bIndex) => {
            if(bullet.x > player.x && bullet.x < player.x + player.width &&
               bullet.y > player.y && bullet.y < player.y + player.height) {
                gameOver();
            }
        });

        // Enemy hitting Player (Invasion success)
        enemies.forEach(enemy => {
            if(enemy.status === 1) {
                if(enemy.y + enemy.height > player.y) {
                    gameOver();
                }
            }
        });

        // Enemy Shooting
        if(Math.random() < 0.02 && isGameRunning) { // 2% chance per frame
            // Find active enemies
            const activeEnemies = enemies.filter(e => e.status === 1);
            if(activeEnemies.length > 0) {
                const shooter = activeEnemies[Math.floor(Math.random() * activeEnemies.length)];
                enemyBullets.push({
                    x: shooter.x + shooter.width/2,
                    y: shooter.y + shooter.height,
                    width: 4,
                    height: 10,
                    speed: 3
                });
            }
        }

        // Win Condition
        if(enemies.every(e => e.status === 0)) {
            // Respawn enemies but faster? For now just respawn
            bullets = [];
            enemyBullets = [];
            for(let c=0; c<enemyCols; c++) {
                for(let r=0; r<enemyRows; r++) {
                    const idx = c * enemyRows + r;
                    // Reusing the array is tricky if I filtered.
                    // Let's just reset statuses if I can find them.
                    // Actually simplest is to re-init enemies
                    // But let's just call initGame for now or "Level Up"
                }
                // Simple Win reset
                initGame();
                // Could add level multiplier here
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawEnemies();
        drawBullets();
        drawParticles();
    }

    function gameLoop() {
        if(!isGameRunning) return;
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    function gameOver() {
        isGameRunning = false;
        ctx.fillStyle = 'white';
        ctx.font = '30px Orbitron';
        ctx.fillText("GAME OVER", canvas.width/2 - 90, canvas.height/2);

        if(score > highScore) {
            highScore = score;
            localStorage.setItem('spaceInvadersHighScore', highScore);
            if(highScoreElement) highScoreElement.textContent = highScore;
        }

        if(startBtn) startBtn.textContent = "Try Again";
    }

    // Input handling
    document.addEventListener('keydown', (e) => {
        if(!isGameRunning) return;
        if(e.key === 'ArrowLeft') player.dx = -player.speed;
        if(e.key === 'ArrowRight') player.dx = player.speed;
        if(e.key === ' ' || e.key === 'ArrowUp') {
            e.preventDefault(); // Prevent scrolling
            // Shoot
            if(bullets.length < 3) { // Max bullets on screen
                bullets.push({
                    x: player.x + player.width/2 - 2,
                    y: player.y,
                    width: 4,
                    height: 10,
                    speed: 7
                });
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            player.dx = 0;
        }
    });

    if(startBtn) startBtn.addEventListener('click', initGame);

    // Initial Draw
    ctx.fillStyle = '#00FFDE';
    ctx.font = '20px Orbitron';
    ctx.fillText("Ready Pilot?", canvas.width/2 - 60, canvas.height/2);
});
