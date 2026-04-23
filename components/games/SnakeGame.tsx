'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioStore } from '@/store/audioStore';

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
  const [isGlitching, setIsGlitching] = useState(false);
  const { actions: audio } = useAudioStore();

  const gameBoardRef = useRef<HTMLDivElement>(null);

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);
  }, []);

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
        triggerGlitch();
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        triggerGlitch();
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
  }, [direction, food, gameOver, isPaused, generateFood, triggerGlitch]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
    <div className="flex flex-col items-center justify-center p-4 glass-light rounded-2xl border-border-c relative overflow-hidden">
      <svg className="hidden">
        <defs>
          <filter id="glitch-filter">
            <feColorMatrix in="SourceGraphic" type="hueRotate" values="90" />
            <feOffset dx="4" dy="0" />
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {isGlitching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 pointer-events-none bg-red/20 backdrop-invert-[0.1]"
            style={{ filter: 'url(#glitch-filter)' }}
          />
        )}
      </AnimatePresence>

      <div className="flex justify-between w-full max-w-md mb-4 items-center">
        <h3 className="text-xl font-display font-bold text-white uppercase tracking-tighter">System // Snake</h3>
        <div className="text-cyan font-stat text-2xl tracking-wider">SCORE: {String(score).padStart(3, '0')}</div>
      </div>

      <div
        ref={gameBoardRef}
        className="relative bg-bg-base border border-cyan/30 rounded-lg overflow-hidden shadow-glow-c-s"
        style={{
          width: 'min(100vw - 2rem, 400px)',
          height: 'min(100vw - 2rem, 400px)',
        }}
      >
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,240,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.2) 1px, transparent 1px)`,
            backgroundSize: `${100 / GRID_SIZE}% ${100 / GRID_SIZE}%`
          }}
        />

        {snake.map((segment, index) => (
          <motion.div
            key={`${index}-${segment.x}-${segment.y}`}
            className="absolute rounded-sm"
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(segment.x / GRID_SIZE) * 100}%`,
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              backgroundColor: index === 0 ? 'var(--color-cyan)' : 'var(--color-cyan-dim)',
              boxShadow: index === 0 ? 'var(--glow-c-s)' : 'none',
              zIndex: 10
            }}
            initial={false}
            animate={{ 
              left: `${(segment.x / GRID_SIZE) * 100}%`, 
              top: `${(segment.y / GRID_SIZE) * 100}%`,
              scale: isGlitching ? 1.2 : 1
            }}
            transition={{ type: 'tween', duration: 0.1 }}
          />
        ))}

        <motion.div
          className="absolute bg-red rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
            boxShadow: 'var(--glow-r-s)',
          }}
        />

        {gameOver && (
          <div className="absolute inset-0 bg-bg-base/90 flex flex-col items-center justify-center z-20 backdrop-blur-md border border-red/50">
            <h2 className="text-4xl font-display font-black text-red mb-2 italic tracking-tighter">CONNECTION_LOST</h2>
            <p className="text-text-2 mb-6 font-mono text-xs opacity-60 uppercase">Final Data Payload: {score} Units</p>
            <button
              onClick={resetGame}
              className="px-8 py-2 bg-red text-white font-bold rounded-sm hover:skew-x-[-12deg] transition-transform uppercase tracking-widest text-xs border border-red/20"
            >
              RE-ESTABLISH LINK
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-bg-base/60 flex items-center justify-center z-20 backdrop-blur-sm">
            <h2 className="text-2xl font-display font-bold text-white tracking-[0.5em] italic animate-pulse">PAUSED</h2>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-text-3 text-[10px] font-mono uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">WASD</kbd>
          <span>MANEUVER</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded">SPACE</kbd>
          <span>SUSPEND</span>
        </div>
      </div>
    </div>
  );
}