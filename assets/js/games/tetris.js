document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tetrisCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-tetris-btn');
    const scoreElement = document.getElementById('tetris-score');

    const ROW = 20;
    const COL = 10;
    const SQ = 20; // Square size (240 width / 12 cols = 20) ... Canvas width is 240. 240/10 = 24.
    // Wait, canvas width is 240. 240 / 10 cols = 24 pixels per square.
    const TILE_SIZE = 24;

    // Canvas dimensions: 240 x 360.
    // 360 / 24 = 15 rows.
    // So 10 cols x 15 rows.
    const ROWS = 15;
    const COLS = 10;

    const VACANT = "#0a0a0a"; // Empty square color

    let board = [];
    let score = 0;
    let isGameRunning = false;
    let gameInterval;
    let currentPiece;

    // Pieces and Colors
    const PIECES = [
        [Z, "#FF3366"],
        [S, "#00FFDE"],
        [T, "#FF10F0"],
        [O, "#FFFF00"],
        [L, "#0080FF"],
        [I, "#00FFFF"],
        [J, "#FFA500"]
    ];

    // Tetromino definitions
    // Z
    const Z = [
        [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
        [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
        [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
        [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
    ];
    // S
    const S = [
        [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
        [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
        [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
        [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
    ];
    // T
    const T = [
        [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
        [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
        [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
        [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
    ];
    // O
    const O = [
        [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
        [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]
    ];
    // L
    const L = [
        [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
        [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
        [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
        [[1, 1, 0], [0, 1, 0], [0, 1, 0]]
    ];
    // I
    const I = [
        [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
        [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
        [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
        [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
    ];
    // J
    const J = [
        [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
        [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
        [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
        [[0, 1, 0], [0, 1, 0], [1, 1, 0]]
    ];

    // Wait, the PIECES array I constructed earlier:
    // `[Z, "#FF3366"]` - Z is not defined yet in that scope if I hoist variables weirdly, but in JS function scope it is fine if defined before.
    // Actually, I need to restructure the variable definitions.
    // Let's redefine.

    const shapes = [Z, S, T, O, L, I, J];
    const colors = ["#FF3366", "#00FFDE", "#FF10F0", "#FFFF00", "#0080FF", "#00FFFF", "#FFA500"];

    // Initialize board
    function createBoard() {
        for (let r = 0; r < ROWS; r++) {
            board[r] = [];
            for (let c = 0; c < COLS; c++) {
                board[r][c] = VACANT;
            }
        }
    }

    function drawSquare(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        ctx.strokeStyle = "#1a1a2e"; // Grid line color
        ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    function drawBoard() {
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                drawSquare(c, r, board[r][c]);
            }
        }
    }

    class Piece {
        constructor(tetromino, color) {
            this.tetromino = tetromino;
            this.color = color;
            this.tetrominoN = 0; // Rotation index
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.x = 3;
            this.y = -2;
        }

        fill(color) {
            for (let r = 0; r < this.activeTetromino.length; r++) {
                for (let c = 0; c < this.activeTetromino.length; c++) {
                    if (this.activeTetromino[r][c]) {
                        drawSquare(this.x + c, this.y + r, color);
                    }
                }
            }
        }

        draw() {
            this.fill(this.color);
        }

        unDraw() {
            this.fill(VACANT);
        }

        moveDown() {
            if (!this.collision(0, 1, this.activeTetromino)) {
                this.unDraw();
                this.y++;
                this.draw();
            } else {
                this.lock();
                currentPiece = randomPiece();
            }
        }

        moveRight() {
            if (!this.collision(1, 0, this.activeTetromino)) {
                this.unDraw();
                this.x++;
                this.draw();
            }
        }

        moveLeft() {
            if (!this.collision(-1, 0, this.activeTetromino)) {
                this.unDraw();
                this.x--;
                this.draw();
            }
        }

        rotate() {
            let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
            let kick = 0;

            if (this.collision(0, 0, nextPattern)) {
                if (this.x > COLS / 2) {
                    // Wall kick left
                    kick = -1;
                } else {
                    // Wall kick right
                    kick = 1;
                }
            }

            if (!this.collision(kick, 0, nextPattern)) {
                this.unDraw();
                this.x += kick;
                this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
                this.activeTetromino = this.tetromino[this.tetrominoN];
                this.draw();
            }
        }

        lock() {
            for (let r = 0; r < this.activeTetromino.length; r++) {
                for (let c = 0; c < this.activeTetromino.length; c++) {
                    if (!this.activeTetromino[r][c]) continue;

                    if (this.y + r < 0) {
                        // Game Over
                        gameOver();
                        return;
                    }
                    board[this.y + r][this.x + c] = this.color;
                }
            }

            // Remove full rows
            for (let r = 0; r < ROWS; r++) {
                let isRowFull = true;
                for (let c = 0; c < COLS; c++) {
                    isRowFull = isRowFull && (board[r][c] != VACANT);
                }
                if (isRowFull) {
                    // Move down all rows above
                    for (let y = r; y > 1; y--) {
                        for (let c = 0; c < COLS; c++) {
                            board[y][c] = board[y - 1][c];
                        }
                    }
                    for (let c = 0; c < COLS; c++) {
                        board[0][c] = VACANT;
                    }
                    score += 10;
                    scoreElement.textContent = score;
                }
            }
            drawBoard();
        }

        collision(x, y, piece) {
            for (let r = 0; r < piece.length; r++) {
                for (let c = 0; c < piece.length; c++) {
                    if (!piece[r][c]) continue;

                    let newX = this.x + c + x;
                    let newY = this.y + r + y;

                    if (newX < 0 || newX >= COLS || newY >= ROWS) {
                        return true;
                    }
                    if (newY < 0) continue;
                    if (board[newY][newX] != VACANT) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    function randomPiece() {
        let r = Math.floor(Math.random() * shapes.length);
        return new Piece(shapes[r], colors[r]);
    }

    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        startBtn.textContent = "Restart Game";
        score = 0;
        scoreElement.textContent = score;
        createBoard();
        drawBoard();
        currentPiece = randomPiece();

        let dropStart = Date.now();

        function update() {
            if (!isGameRunning) return;
            let now = Date.now();
            let delta = now - dropStart;

            if (delta > 1000) {
                currentPiece.moveDown();
                dropStart = Date.now();
            }

            gameInterval = requestAnimationFrame(update);
        }

        if (gameInterval) cancelAnimationFrame(gameInterval);
        update();
    }

    function gameOver() {
        isGameRunning = false;
        cancelAnimationFrame(gameInterval);
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "20px Orbitron";
        ctx.fillText("Game Over", 60, canvas.height / 2);
        startBtn.textContent = "Try Again";
    }

    document.addEventListener("keydown", (e) => {
        if (!isGameRunning) return;
        if (e.key === "ArrowLeft") currentPiece.moveLeft();
        if (e.key === "ArrowUp") currentPiece.rotate();
        if (e.key === "ArrowRight") currentPiece.moveRight();
        if (e.key === "ArrowDown") currentPiece.moveDown();
    });

    startBtn.addEventListener('click', startGame);

    // Initial Render
    createBoard();
    drawBoard();
    ctx.fillStyle = 'white';
    ctx.font = '16px Orbitron';
    ctx.fillText("Press Start", 75, canvas.height / 2);
});
