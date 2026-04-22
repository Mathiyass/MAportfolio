'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const gameBoardRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback(() => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      // Check collision with walls
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent default scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === ' ') {
        setIsPaused((p) => !p);
        return;
      }

      if (isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPaused]);

  useEffect(() => {
    const speed = Math.max(50, INITIAL_SPEED - Math.floor(score / 50) * 10);
    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [moveSnake, score]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background-2/50 rounded-2xl border border-white/10">
      <div className="flex justify-between w-full max-w-md mb-4 items-center">
        <h3 className="text-xl font-display font-bold text-white">Neon Snake</h3>
        <div className="text-cyan font-mono text-lg">SCORE: {score}</div>
      </div>

      <div
        ref={gameBoardRef}
        className="relative bg-background border border-white/20 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.1)]"
        style={{
          width: 'min(100vw - 2rem, 400px)',
          height: 'min(100vw - 2rem, 400px)',
        }}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <motion.div
            key={`${segment.x}-${segment.y}`}
            className="absolute rounded-sm"
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              backgroundColor: index === 0 ? '#22D3EE' : '#0891B2',
              boxShadow: index === 0 ? '0 0 10px #22D3EE' : 'none',
              zIndex: 10
            }}
            initial={false}
            animate={{ left: `${(segment.x / GRID_SIZE) * 100}%`, top: `${(segment.y / GRID_SIZE) * 100}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-rose-500 rounded-full"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            boxShadow: '0 0 15px #F43F5E',
          }}
        />

        {/* Overlays */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 backdrop-blur-sm">
            <h2 className="text-4xl font-display font-bold text-red mb-2">GAME OVER</h2>
            <p className="text-text-2 mb-6 font-mono">FINAL SCORE: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-cyan text-black font-bold rounded-full hover:bg-cyan/80 transition-colors"
            >
              PLAY AGAIN
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 backdrop-blur-sm">
            <h2 className="text-3xl font-display font-bold text-white tracking-widest">PAUSED</h2>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-text-2 text-sm font-mono text-center">
        <span><kbd className="px-2 py-1 bg-white/10 rounded mr-1">WASD</kbd> or <kbd className="px-2 py-1 bg-white/10 rounded mr-1">ARROWS</kbd> to move</span>
        <span><kbd className="px-2 py-1 bg-white/10 rounded mr-1">SPACE</kbd> to pause</span>
      </div>
    </div>
  );
}
