document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('whack-grid');
    const scoreDisplay = document.getElementById('whack-score');
    const timeDisplay = document.getElementById('whack-time');
    const startBtn = document.getElementById('start-whack-btn');

    let holes = [];
    let bugs = [];
    let result = 0;
    let hitPosition;
    let currentTime = 30;
    let timerId = null;
    let countDownTimerId = null;
    let isGameRunning = false;

    // Create Grid
    function createGrid() {
        grid.innerHTML = '';
        holes = [];
        for (let i = 0; i < 9; i++) {
            const hole = document.createElement('div');
            hole.classList.add('relative', 'bg-gray-800', 'rounded-full', 'overflow-hidden', 'cursor-pointer', 'border-2', 'border-gray-700');
            hole.style.height = '100%';
            hole.id = i;

            // Bug Element
            const bug = document.createElement('div');
            bug.classList.add('absolute', 'w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'text-4xl', 'transition-all', 'duration-100', 'translate-y-full');
            bug.innerHTML = '<i class="fas fa-bug text-neon-pink"></i>';

            hole.appendChild(bug);
            grid.appendChild(hole);
            holes.push(hole);
            bugs.push(bug);

            hole.addEventListener('mouseup', () => {
                if (hole.id == hitPosition) {
                    result++;
                    scoreDisplay.textContent = result;
                    hitPosition = null;
                    // Visual feedback
                    bug.innerHTML = '<i class="fas fa-check text-green-400"></i>';
                    setTimeout(() => {
                        bug.classList.add('translate-y-full');
                    }, 200);
                }
            });
        }
    }

    function randomHole() {
        holes.forEach(hole => {
            const bug = hole.querySelector('div');
            bug.classList.add('translate-y-full');
            bug.innerHTML = '<i class="fas fa-bug text-neon-pink"></i>'; // Reset icon
        });

        let randomHole = holes[Math.floor(Math.random() * 9)];
        let bug = randomHole.querySelector('div');
        bug.classList.remove('translate-y-full');
        hitPosition = randomHole.id;
    }

    function moveBug() {
        timerId = setInterval(randomHole, 700);
    }

    function countDown() {
        currentTime--;
        timeDisplay.textContent = currentTime;

        if (currentTime == 0) {
            clearInterval(countDownTimerId);
            clearInterval(timerId);
            isGameRunning = false;
            startBtn.textContent = "Play Again";
            alert('GAME OVER! Final Score: ' + result);
        }
    }

    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        result = 0;
        currentTime = 30;
        scoreDisplay.textContent = 0;
        timeDisplay.textContent = 30;
        startBtn.textContent = "Fixing Bugs...";

        moveBug();
        countDownTimerId = setInterval(countDown, 1000);
    }

    startBtn.addEventListener('click', startGame);
    createGrid();
});
