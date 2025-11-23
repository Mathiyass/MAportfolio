document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('tictactoe-board');
    const status = document.getElementById('ttt-status');
    const resetBtn = document.getElementById('reset-ttt-btn');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function createBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('w-20', 'h-20', 'glass', 'flex', 'items-center', 'justify-center', 'text-4xl', 'font-bold', 'cursor-pointer', 'hover:bg-gray-700', 'transition-colors');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        handlePlayerPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();

        if (isGameActive && currentPlayer === 'O') {
            setTimeout(aiMove, 500); // AI Delay
        }
    }

    function handlePlayerPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer === 'X' ? 'text-cyber-cyan' : 'text-neon-pink');

        if (currentPlayer === 'X') {
            currentPlayer = 'O';
            status.textContent = "AI's Turn (O)";
        } else {
            currentPlayer = 'X';
            status.textContent = "Your Turn (X)";
        }
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = currentPlayer === 'O' ? "You Win!" : "AI Wins!"; // Logic flipped because turn changed
            status.classList.add('text-green-400');
            isGameActive = false;
            return;
        }

        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            status.textContent = "Draw!";
            status.classList.add('text-yellow-400');
            isGameActive = false;
            return;
        }
    }

    function aiMove() {
        if (!isGameActive) return;

        // Simple Random AI
        let availableIndices = [];
        gameState.forEach((cell, index) => {
            if (cell === '') availableIndices.push(index);
        });

        if (availableIndices.length > 0) {
            const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            const cell = document.querySelector(`[data-index='${randomIndex}']`);
            handlePlayerPlayed(cell, randomIndex);
            handleResultValidation();
        }
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        status.textContent = "Your Turn (X)";
        status.classList.remove('text-green-400', 'text-yellow-400');
        document.querySelectorAll('[data-index]').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('text-cyber-cyan', 'text-neon-pink');
        });
    }

    resetBtn.addEventListener('click', resetGame);
    createBoard();
});
