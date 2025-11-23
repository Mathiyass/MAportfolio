document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('connect4-grid');
    const statusDisplay = document.getElementById('connect4-status');
    const resetBtn = document.getElementById('reset-connect4-btn');

    if (!grid) return;

    const rows = 6;
    const cols = 7;
    let board = [];
    let currentPlayer = 1; // 1 (Red/You) or 2 (Yellow/AI)
    let isGameActive = true;
    let isAIEnabled = true; // Can toggle later if needed

    // Initialize
    function initGame() {
        board = Array(rows).fill().map(() => Array(cols).fill(0));
        currentPlayer = 1;
        isGameActive = true;
        if (statusDisplay) statusDisplay.textContent = "Your Turn (Red)";
        renderBoard();
    }

    function renderBoard() {
        grid.innerHTML = '';
        // Create grid cells
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('w-8', 'h-8', 'rounded-full', 'flex', 'items-center', 'justify-center', 'cursor-pointer', 'border', 'border-gray-700');

                // Styling based on value
                if (board[r][c] === 0) {
                    cell.classList.add('bg-dark-bg');
                } else if (board[r][c] === 1) {
                    cell.classList.add('bg-red-500', 'shadow-[0_0_10px_#ef4444]');
                } else if (board[r][c] === 2) {
                    cell.classList.add('bg-yellow-400', 'shadow-[0_0_10px_#facc15]');
                }

                // Add column click handler (entire column is clickable effectively)
                cell.dataset.col = c;
                cell.addEventListener('click', () => handleCellClick(c));

                grid.appendChild(cell);
            }
        }
    }

    function handleCellClick(colIndex) {
        if (!isGameActive) return;
        if (currentPlayer === 2 && isAIEnabled) return; // Wait for AI

        if (dropPiece(colIndex, currentPlayer)) {
            renderBoard();
            if (checkWin(currentPlayer)) {
                endGame(currentPlayer === 1 ? "You Win!" : "AI Wins!");
            } else if (checkDraw()) {
                endGame("Draw!");
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updateStatus();
                if (currentPlayer === 2 && isAIEnabled) {
                    setTimeout(aiMove, 500);
                }
            }
        }
    }

    function dropPiece(colIndex, player) {
        // Find lowest empty row in column
        for (let r = rows - 1; r >= 0; r--) {
            if (board[r][colIndex] === 0) {
                board[r][colIndex] = player;
                return true;
            }
        }
        return false; // Column full
    }

    function updateStatus() {
        if (!statusDisplay) return;
        if (currentPlayer === 1) {
            statusDisplay.textContent = "Your Turn (Red)";
            statusDisplay.className = "text-xl font-orbitron text-red-500";
        } else {
            statusDisplay.textContent = "AI Thinking... (Yellow)";
            statusDisplay.className = "text-xl font-orbitron text-yellow-400";
        }
    }

    function aiMove() {
        if (!isGameActive) return;

        // Simple AI:
        // 1. Check if can win
        // 2. Check if need to block
        // 3. Random valid move

        let moveCol = -1;

        // 1. Try to win
        for (let c = 0; c < cols; c++) {
            if (canPlay(c)) {
                makeMove(c, 2);
                if (checkWin(2)) {
                    moveCol = c;
                    undoMove(c);
                    break;
                }
                undoMove(c);
            }
        }

        // 2. Block opponent
        if (moveCol === -1) {
            for (let c = 0; c < cols; c++) {
                if (canPlay(c)) {
                    makeMove(c, 1);
                    if (checkWin(1)) {
                        moveCol = c;
                        undoMove(c);
                        break;
                    }
                    undoMove(c);
                }
            }
        }

        // 3. Random
        if (moveCol === -1) {
            const validCols = [];
            for (let c = 0; c < cols; c++) {
                if (canPlay(c)) validCols.push(c);
            }
            if (validCols.length > 0) {
                moveCol = validCols[Math.floor(Math.random() * validCols.length)];
            }
        }

        if (moveCol !== -1) {
            dropPiece(moveCol, 2);
            renderBoard();
            if (checkWin(2)) {
                endGame("AI Wins!");
            } else if (checkDraw()) {
                endGame("Draw!");
            } else {
                currentPlayer = 1;
                updateStatus();
            }
        }
    }

    function canPlay(col) {
        return board[0][col] === 0;
    }

    function makeMove(col, player) {
        for (let r = rows - 1; r >= 0; r--) {
            if (board[r][col] === 0) {
                board[r][col] = player;
                return;
            }
        }
    }

    function undoMove(col) {
        for (let r = 0; r < rows; r++) {
            if (board[r][col] !== 0) {
                board[r][col] = 0;
                return;
            }
        }
    }

    function checkWin(player) {
        // Horizontal
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols - 3; c++) {
                if (board[r][c] === player && board[r][c+1] === player && board[r][c+2] === player && board[r][c+3] === player) return true;
            }
        }
        // Vertical
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < cols; c++) {
                if (board[r][c] === player && board[r+1][c] === player && board[r+2][c] === player && board[r+3][c] === player) return true;
            }
        }
        // Diagonal /
        for (let r = 3; r < rows; r++) {
            for (let c = 0; c < cols - 3; c++) {
                if (board[r][c] === player && board[r-1][c+1] === player && board[r-2][c+2] === player && board[r-3][c+3] === player) return true;
            }
        }
        // Diagonal \
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < cols - 3; c++) {
                if (board[r][c] === player && board[r+1][c+1] === player && board[r+2][c+2] === player && board[r+3][c+3] === player) return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return board[0].every(cell => cell !== 0);
    }

    function endGame(msg) {
        isGameActive = false;
        if (statusDisplay) {
            statusDisplay.textContent = msg;
            if (msg.includes("Win")) {
                statusDisplay.classList.add('text-green-400');
            }
        }
    }

    if (resetBtn) resetBtn.addEventListener('click', initGame);

    initGame();
});
