/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 4;

type HexState = boolean;

export function HexPuzzle() {
  const [grid, setGrid] = useState<HexState[][]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize grid
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(false)
    );
    
    // Randomize initial state (simulate random clicks to ensure it's solvable)
    let tempGrid = [...newGrid.map(row => [...row])];
    for (let i = 0; i < 10; i++) {
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      tempGrid = toggleNeighbors(tempGrid, r, c);
    }
    
    setGrid(tempGrid);
    setMoves(0);
    setIsWon(false);
  };

  const toggleNeighbors = (currentGrid: HexState[][], row: number, col: number) => {
    const newGrid = [...currentGrid.map(r => [...r])];
    
    // Toggle clicked cell
    newGrid[row][col] = !newGrid[row][col];
    
    // Toggle neighbors
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    
    directions.forEach(([dr, dc]) => {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
        newGrid[nr][nc] = !newGrid[nr][nc];
      }
    });
    
    return newGrid;
  };

  const handleCellClick = (row: number, col: number) => {
    if (isWon) return;
    
    const newGrid = toggleNeighbors(grid, row, col);
    setGrid(newGrid);
    setMoves(m => m + 1);
    
    // Check win condition (all lights off)
    const allOff = newGrid.every(r => r.every(cell => !cell));
    if (allOff) {
      setIsWon(true);
    }
  };

  if (grid.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-background-2/50 rounded-2xl border border-white/10">
      <div className="flex justify-between w-full max-w-sm mb-6 items-center">
        <h3 className="text-xl font-display font-bold text-white">Lights Out</h3>
        <div className="text-cyan font-mono text-lg">MOVES: {moves}</div>
      </div>

      <div className="relative p-2 bg-background border border-white/20 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.05)]">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
          {grid.map((row, r) => (
            row.map((isOn, c) => (
              <motion.button
                key={`${r}-${c}`}
                className={`w-16 h-16 rounded-lg border flex items-center justify-center transition-colors ${
                  isOn 
                    ? 'bg-cyan border-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.6)]' 
                    : 'bg-background-2 border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCellClick(r, c)}
                disabled={isWon}
              />
            ))
          ))}
        </div>

        {isWon && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm rounded-xl"
          >
            <h2 className="text-3xl font-display font-bold text-cyan mb-2">PUZZLE SOLVED</h2>
            <p className="text-text-2 mb-6 font-mono">Moves: {moves}</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-cyan hover:text-black transition-colors"
            >
              NEXT LEVEL
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-8 text-center max-w-xs">
        <p className="text-text-2 text-sm font-mono leading-relaxed">
          Click a cell to toggle its state and the state of its orthogonal neighbors. Turn all lights off to win.
        </p>
      </div>
    </div>
  );
}
