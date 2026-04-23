'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hexagonal coordinate system (Axial)
interface Hex {
  q: number;
  r: number;
  on: boolean;
}

const HEX_SIZE = 3; // Radius of the large hexagon

export function HexPuzzle() {
  const [grid, setGrid] = useState<Hex[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const generateHexGrid = useCallback(() => {
    const hexes: Hex[] = [];
    for (let q = -HEX_SIZE; q <= HEX_SIZE; q++) {
      const r1 = Math.max(-HEX_SIZE, -q - HEX_SIZE);
      const r2 = Math.min(HEX_SIZE, -q + HEX_SIZE);
      for (let r = r1; r <= r2; r++) {
        hexes.push({ q, r, on: false });
      }
    }
    return hexes;
  }, []);

  const getNeighbors = (q: number, r: number) => {
    const dirs = [
      { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
      { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }
    ];
    return dirs.map(d => ({ q: q + d.q, r: r + d.r }));
  };

  const resetGame = useCallback(() => {
    let initialGrid = generateHexGrid();
    
    // Simulate random clicks to ensure solvability
    for (let i = 0; i < 15; i++) {
      const target = initialGrid[Math.floor(Math.random() * initialGrid.length)];
      const neighbors = getNeighbors(target.q, target.r);
      
      initialGrid = initialGrid.map(h => {
        const isTarget = h.q === target.q && h.r === target.r;
        const isNeighbor = neighbors.some(n => n.q === h.q && n.r === h.r);
        if (isTarget || isNeighbor) {
          return { ...h, on: !h.on };
        }
        return h;
      });
    }

    setGrid(initialGrid);
    setMoves(0);
    setIsWon(false);
  }, [generateHexGrid]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleHexClick = (q: number, r: number) => {
    if (isWon) return;

    const neighbors = getNeighbors(q, r);
    const newGrid = grid.map(h => {
      const isTarget = h.q === q && h.r === r;
      const isNeighbor = neighbors.some(n => n.q === h.q && n.r === h.r);
      if (isTarget || isNeighbor) {
        return { ...h, on: !h.on };
      }
      return h;
    });

    setGrid(newGrid);
    setMoves(m => m + 1);

    if (newGrid.every(h => !h.on)) {
      setIsWon(true);
    }
  };

  // Convert Axial to Pixel coordinates for rendering
  const getPixelPos = (q: number, r: number) => {
    const size = 35; // Hex size in px
    const x = size * (3/2 * q);
    const y = size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
    return { x, y };
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 glass-light rounded-2xl border-border-c relative overflow-hidden min-h-[500px]">
      <div className="flex justify-between w-full max-w-md mb-12 items-center">
        <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter italic">System // Hex_Core</h3>
        <div className="text-cyan font-stat text-2xl tracking-wider">ENTROPY: {String(moves).padStart(3, '0')}</div>
      </div>

      <div className="relative w-full h-[300px] flex items-center justify-center scale-75 sm:scale-100">
        {grid.map((hex) => {
          const { x, y } = getPixelPos(hex.q, hex.r);
          return (
            <motion.button
              key={`${hex.q}-${hex.r}`}
              className="absolute w-[60px] h-[68px] cursor-pointer group"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
              }}
              onClick={() => handleHexClick(hex.q, hex.r)}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`w-full h-full transition-all duration-500 flex items-center justify-center ${
                hex.on 
                  ? 'bg-cyan/40 border-2 border-cyan shadow-[0_0_20px_rgba(0,240,255,0.4)]' 
                  : 'bg-bg-muted border border-white/10 hover:border-cyan/30'
              }`}>
                {/* Visual pulse for active nodes */}
                {hex.on && <div className="w-2 h-2 rounded-full bg-white animate-ping opacity-50" />}
              </div>
            </motion.button>
          );
        })}

        <AnimatePresence>
          {isWon && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-md bg-bg-base/80 border border-cyan/30 rounded-xl"
            >
              <h2 className="text-4xl font-display font-black text-cyan mb-2 italic tracking-tighter">CORE_STABILIZED</h2>
              <p className="text-text-3 font-mono text-[10px] uppercase tracking-widest mb-8">Containment Field Integrity: 100%</p>
              <button
                onClick={resetGame}
                className="px-10 py-2 bg-cyan text-black font-bold rounded-sm hover:skew-x-[-10deg] transition-transform uppercase tracking-widest text-xs"
              >
                NEXT_SEQUENCE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 text-center max-w-xs">
        <p className="text-text-4 text-[9px] font-mono leading-relaxed uppercase tracking-widest opacity-60">
          Reverse global parity by toggling neural nodes. Every interaction propagates to six adjacent vertices.
        </p>
      </div>
    </div>
  );
}