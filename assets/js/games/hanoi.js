document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hanoi-container');
    const movesDisplay = document.getElementById('hanoi-moves');
    const restartBtn = document.getElementById('restart-hanoi-btn');

    if (!container) return;

    let moves = 0;
    let selectedDisk = null;
    const towers = [[], [], []];
    const diskCount = 4; // Adjustable

    function initGame() {
        moves = 0;
        if (movesDisplay) movesDisplay.textContent = moves;
        selectedDisk = null;

        // Clear towers
        towers[0] = [];
        towers[1] = [];
        towers[2] = [];

        // Create disks
        for (let i = diskCount; i >= 1; i--) {
            towers[0].push(i);
        }

        render();
    }

    function render() {
        container.innerHTML = '';

        // Create 3 towers
        for (let i = 0; i < 3; i++) {
            const towerEl = document.createElement('div');
            towerEl.classList.add('hanoi-tower', 'relative', 'flex', 'flex-col-reverse', 'items-center', 'justify-bottom', 'w-1/3', 'h-48', 'border-b-4', 'border-gray-500', 'cursor-pointer');
            towerEl.dataset.index = i;

            // Tower pole
            const pole = document.createElement('div');
            pole.classList.add('absolute', 'bottom-0', 'w-2', 'h-full', 'bg-gray-700', 'z-0');
            towerEl.appendChild(pole);

            // Render disks
            towers[i].forEach(diskSize => {
                const disk = document.createElement('div');
                disk.classList.add('h-6', 'rounded-full', 'z-10', 'mb-1', 'transition-all');

                // Color based on size
                if (diskSize === 1) disk.classList.add('bg-cyan-400');
                if (diskSize === 2) disk.classList.add('bg-green-400');
                if (diskSize === 3) disk.classList.add('bg-yellow-400');
                if (diskSize === 4) disk.classList.add('bg-red-500');
                if (diskSize === 5) disk.classList.add('bg-purple-500');

                // Width based on size
                disk.style.width = `${diskSize * 20 + 20}px`;

                if (selectedDisk && selectedDisk.towerIndex === i && selectedDisk.diskSize === diskSize) {
                    disk.classList.add('ring-2', 'ring-white', 'transform', '-translate-y-4');
                }

                towerEl.appendChild(disk);
            });

            towerEl.addEventListener('click', () => handleTowerClick(i));
            container.appendChild(towerEl);
        }
    }

    function handleTowerClick(towerIndex) {
        // If no disk selected, try to select top disk of tower
        if (!selectedDisk) {
            if (towers[towerIndex].length > 0) {
                const disk = towers[towerIndex][towers[towerIndex].length - 1];
                selectedDisk = { towerIndex, diskSize: disk };
                render();
            }
        } else {
            // Try to move selected disk to this tower
            const sourceTower = selectedDisk.towerIndex;
            const targetTower = towerIndex;

            if (sourceTower === targetTower) {
                // Deselect
                selectedDisk = null;
                render();
                return;
            }

            const targetTopDisk = towers[targetTower].length > 0 ? towers[targetTower][towers[targetTower].length - 1] : Infinity;

            if (selectedDisk.diskSize < targetTopDisk) {
                // Valid move
                towers[sourceTower].pop();
                towers[targetTower].push(selectedDisk.diskSize);
                moves++;
                if (movesDisplay) movesDisplay.textContent = moves;
                selectedDisk = null;
                render();
                checkWin();
            } else {
                // Invalid move
                // Flash error or shake?
                selectedDisk = null; // Just deselect for now
                render();
            }
        }
    }

    function checkWin() {
        if (towers[2].length === diskCount) {
            setTimeout(() => alert(`You won in ${moves} moves!`), 100);
        }
    }

    if (restartBtn) restartBtn.addEventListener('click', initGame);

    initGame();
});
