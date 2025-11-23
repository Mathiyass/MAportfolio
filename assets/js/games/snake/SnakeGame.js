import { GameEngine } from '../core/GameEngine.js';

export class SnakeGame extends GameEngine {
    constructor(canvasId) {
        super(canvasId, { frameRate: 10 }); // Slower frame rate for Snake

        this.gridSize = 20;
        this.snake = [];
        this.food = { x: 0, y: 0 };
        this.direction = 'RIGHT';
        this.nextDirection = 'RIGHT';

        // Colors from CSS variables (hardcoded fallback for canvas)
        this.colors = {
            snakeHead: '#00FFDE',
            snakeBody: 'rgba(0, 255, 222, 0.6)',
            food: '#FF3366',
            grid: 'rgba(255, 255, 255, 0.05)'
        };

        this.bindControls();
    }

    onStart() {
        this.reset();
        super.onStart();
    }

    reset() {
        // Initialize Snake in the middle
        const startX = Math.floor(this.canvas.width / this.gridSize / 2);
        const startY = Math.floor(this.canvas.height / this.gridSize / 2);
        this.snake = [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ];
        this.direction = 'RIGHT';
        this.nextDirection = 'RIGHT';
        this.spawnFood();
    }

    spawnFood() {
        const cols = Math.floor(this.canvas.width / this.gridSize);
        const rows = Math.floor(this.canvas.height / this.gridSize);

        let validPosition = false;
        while (!validPosition) {
            this.food = {
                x: Math.floor(Math.random() * cols),
                y: Math.floor(Math.random() * rows)
            };

            // Check if food spawns on snake
            validPosition = !this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y);
        }
    }

    bindControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.isRunning || this.isPaused) return;

            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (this.direction !== 'DOWN') this.nextDirection = 'UP';
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (this.direction !== 'UP') this.nextDirection = 'DOWN';
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (this.direction !== 'RIGHT') this.nextDirection = 'LEFT';
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (this.direction !== 'LEFT') this.nextDirection = 'RIGHT';
                    break;
            }
        });

        // Touch controls support could be added here
    }

    update(deltaTime) {
        this.direction = this.nextDirection;

        const head = { ...this.snake[0] };

        switch(this.direction) {
            case 'UP': head.y--; break;
            case 'DOWN': head.y++; break;
            case 'LEFT': head.x--; break;
            case 'RIGHT': head.x++; break;
        }

        // Check Wall Collision
        const cols = Math.floor(this.canvas.width / this.gridSize);
        const rows = Math.floor(this.canvas.height / this.gridSize);

        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
            this.onGameOver();
            return;
        }

        // Check Self Collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.onGameOver();
            return;
        }

        this.snake.unshift(head);

        // Check Food Collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.addScore(10);
            this.spawnFood();
            // Don't pop the tail, so snake grows
        } else {
            this.snake.pop();
        }
    }

    draw() {
        super.draw(); // Clear canvas

        // Draw Grid (Optional)
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 0.5;
        // ... grid drawing logic if desired ...

        // Draw Food
        this.ctx.fillStyle = this.colors.food;
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = this.colors.food;
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize/2,
            this.food.y * this.gridSize + this.gridSize/2,
            this.gridSize/2 - 2,
            0, Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Draw Snake
        this.snake.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? this.colors.snakeHead : this.colors.snakeBody;

            if (index === 0) {
                // Glow for head
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = this.colors.snakeHead;
            } else {
                this.ctx.shadowBlur = 0;
            }

            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
    }
}
