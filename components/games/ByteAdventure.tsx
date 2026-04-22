"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Platform {
  x: number;
  y: number;
  width: number;
  type: 'normal' | 'cyan' | 'red' | 'moving';
}

interface Collectible {
  x: number;
  y: number;
  collected: boolean;
  type: 'byte' | 'star';
}

const CANVAS_W = 400;
const CANVAS_H = 500;
const PLAYER_SIZE = 20;
const GRAVITY = 0.4;
const JUMP_FORCE = -9;
const MOVE_SPEED = 4;

export function ByteAdventure() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const keysRef = useRef<Set<string>>(new Set());

  const playerRef = useRef({
    x: CANVAS_W / 2,
    y: CANVAS_H - 60,
    vy: 0,
    vx: 0,
    onGround: false,
    facing: 1,
  });

  const platformsRef = useRef<Platform[]>([]);
  const collectiblesRef = useRef<Collectible[]>([]);
  const cameraYRef = useRef(0);
  const scoreRef = useRef(0);

  const generatePlatforms = useCallback((startY: number, count: number): Platform[] => {
    const platforms: Platform[] = [];
    for (let i = 0; i < count; i++) {
      const y = startY - i * 70 - Math.random() * 30;
      const width = 60 + Math.random() * 40;
      const x = Math.random() * (CANVAS_W - width);
      const rng = Math.random();
      const type: Platform['type'] = rng < 0.1 ? 'red' : rng < 0.25 ? 'cyan' : rng < 0.35 ? 'moving' : 'normal';
      platforms.push({ x, y, width, type });
    }
    return platforms;
  }, []);

  const startGame = useCallback(() => {
    playerRef.current = {
      x: CANVAS_W / 2,
      y: CANVAS_H - 60,
      vy: 0,
      vx: 0,
      onGround: false,
      facing: 1,
    };
    cameraYRef.current = 0;
    scoreRef.current = 0;

    const initialPlatforms: Platform[] = [
      { x: CANVAS_W / 2 - 40, y: CANVAS_H - 30, width: 80, type: 'normal' },
      ...generatePlatforms(CANVAS_H - 100, 20),
    ];
    platformsRef.current = initialPlatforms;

    collectiblesRef.current = initialPlatforms
      .filter(() => Math.random() < 0.3)
      .map(p => ({
        x: p.x + p.width / 2,
        y: p.y - 25,
        collected: false,
        type: Math.random() < 0.3 ? 'star' : 'byte',
      }));

    setScore(0);
    setGameState('playing');
  }, [generatePlatforms]);

  const endGame = useCallback(() => {
    setGameState('gameover');
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    setHighScore(prev => Math.max(prev, scoreRef.current));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => keysRef.current.add(e.key);
    const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      const player = playerRef.current;
      const keys = keysRef.current;

      // Input
      if (keys.has('ArrowLeft') || keys.has('a')) {
        player.vx = -MOVE_SPEED;
        player.facing = -1;
      } else if (keys.has('ArrowRight') || keys.has('d')) {
        player.vx = MOVE_SPEED;
        player.facing = 1;
      } else {
        player.vx *= 0.85;
      }

      // Physics
      player.vy += GRAVITY;
      player.x += player.vx;
      player.y += player.vy;
      player.onGround = false;

      // Wrap horizontal
      if (player.x < -PLAYER_SIZE) player.x = CANVAS_W;
      if (player.x > CANVAS_W) player.x = -PLAYER_SIZE;

      // Platform collision (only when falling)
      if (player.vy > 0) {
        for (const p of platformsRef.current) {
          const py = p.y - cameraYRef.current;
          if (
            player.x + PLAYER_SIZE > p.x &&
            player.x < p.x + p.width &&
            player.y + PLAYER_SIZE >= py &&
            player.y + PLAYER_SIZE <= py + 10
          ) {
            player.y = py - PLAYER_SIZE;
            player.vy = p.type === 'cyan' ? JUMP_FORCE * 1.5 : JUMP_FORCE;
            player.onGround = true;
            break;
          }
        }
      }

      // Camera follows player upward
      if (player.y < CANVAS_H * 0.4 - cameraYRef.current) {
        const diff = CANVAS_H * 0.4 - cameraYRef.current - player.y;
        cameraYRef.current -= diff;
        player.y = CANVAS_H * 0.4 - cameraYRef.current;
      }

      // Score based on height
      const heightScore = Math.floor(-cameraYRef.current / 10);
      if (heightScore > scoreRef.current) {
        scoreRef.current = heightScore;
        setScore(heightScore);
      }

      // Collectibles
      for (const c of collectiblesRef.current) {
        if (c.collected) continue;
        const cy = c.y - cameraYRef.current;
        const dist = Math.hypot(player.x + PLAYER_SIZE / 2 - c.x, player.y + PLAYER_SIZE / 2 - cy);
        if (dist < 20) {
          c.collected = true;
          scoreRef.current += c.type === 'star' ? 50 : 10;
          setScore(scoreRef.current);
        }
      }

      // Generate more platforms
      const topPlatformY = Math.min(...platformsRef.current.map(p => p.y));
      if (topPlatformY > cameraYRef.current - 200) {
        const newPlatforms = generatePlatforms(topPlatformY - 50, 10);
        platformsRef.current.push(...newPlatforms);
        newPlatforms.filter(() => Math.random() < 0.3).forEach(p => {
          collectiblesRef.current.push({
            x: p.x + p.width / 2,
            y: p.y - 25,
            collected: false,
            type: Math.random() < 0.3 ? 'star' : 'byte',
          });
        });
      }

      // Remove off-screen platforms
      platformsRef.current = platformsRef.current.filter(p => p.y - cameraYRef.current < CANVAS_H + 50);

      // Fall death
      if (player.y > CANVAS_H + 50) {
        endGame();
        return;
      }

      // ---- DRAW ----
      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Stars background
      for (let i = 0; i < 30; i++) {
        const sx = (i * 137 + 50) % CANVAS_W;
        const sy = ((i * 251 + cameraYRef.current * 0.2) % CANVAS_H + CANVAS_H) % CANVAS_H;
        ctx.fillStyle = `rgba(255,255,255,${0.2 + (i % 3) * 0.15})`;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Platforms
      for (const p of platformsRef.current) {
        const py = p.y - cameraYRef.current;
        if (py < -20 || py > CANVAS_H + 20) continue;
        ctx.fillStyle = p.type === 'cyan' ? '#22D3EE' : p.type === 'red' ? '#FB7185' : p.type === 'moving' ? '#A78BFA' : '#1E293B';
        ctx.fillRect(p.x, py, p.width, 6);
        if (p.type !== 'normal') {
          ctx.shadowColor = p.type === 'cyan' ? '#22D3EE' : p.type === 'red' ? '#FB7185' : '#A78BFA';
          ctx.shadowBlur = 8;
          ctx.fillRect(p.x, py, p.width, 6);
          ctx.shadowBlur = 0;
        }
      }

      // Collectibles
      for (const c of collectiblesRef.current) {
        if (c.collected) continue;
        const cy = c.y - cameraYRef.current;
        if (cy < -20 || cy > CANVAS_H + 20) continue;
        ctx.fillStyle = c.type === 'star' ? '#FBBF24' : '#22D3EE';
        ctx.beginPath();
        ctx.arc(c.x, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = c.type === 'star' ? '#FBBF24' : '#22D3EE';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(c.x, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Player (BYTE avatar)
      const px = player.x;
      const py = player.y;
      // Body
      ctx.fillStyle = '#22D3EE';
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 12;
      ctx.fillRect(px + 2, py + 4, PLAYER_SIZE - 4, PLAYER_SIZE - 6);
      ctx.shadowBlur = 0;
      // Eyes
      ctx.fillStyle = '#080C14';
      ctx.fillRect(px + 5, py + 8, 3, 3);
      ctx.fillRect(px + 12, py + 8, 3, 3);
      // Antenna
      ctx.strokeStyle = '#FB7185';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px + PLAYER_SIZE / 2, py + 4);
      ctx.lineTo(px + PLAYER_SIZE / 2 + player.facing * 4, py - 4);
      ctx.stroke();
      ctx.fillStyle = '#FB7185';
      ctx.beginPath();
      ctx.arc(px + PLAYER_SIZE / 2 + player.facing * 4, py - 4, 2, 0, Math.PI * 2);
      ctx.fill();

      // HUD
      ctx.fillStyle = '#22D3EE';
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`SCORE: ${scoreRef.current}`, 10, 25);

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, endGame, generatePlatforms]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-lg shadow-cyan/10">
        <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="block bg-bg-base" />

        <AnimatePresence>
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-bg-base/90 backdrop-blur-sm"
            >
              <h3 className="text-3xl font-display font-bold text-cyan mb-2">BYTE Adventure</h3>
              <p className="text-text-2 text-sm mb-6">Jump between platforms • Collect bytes</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-cyan/20 border border-cyan/40 text-cyan rounded-lg hover:bg-cyan/30 transition-colors font-mono text-sm"
              >
                [ LAUNCH ]
              </button>
              <p className="text-text-3 text-xs mt-4">← → or A/D to move</p>
            </motion.div>
          )}
          {gameState === 'gameover' && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-bg-base/90 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-display font-bold text-red mb-2">SYSTEM CRASH</h3>
              <p className="text-text-2 text-lg font-mono mb-1">Score: {score}</p>
              <p className="text-text-3 text-sm font-mono mb-6">Best: {highScore}</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-red/20 border border-red/40 text-red rounded-lg hover:bg-red/30 transition-colors font-mono text-sm"
              >
                [ REBOOT ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
