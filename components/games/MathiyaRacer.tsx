"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'wall' | 'bug' | 'firewall';
  speed: number;
}

interface Boost {
  x: number;
  y: number;
  collected: boolean;
  type: 'speed' | 'shield';
}

const CANVAS_W = 500;
const CANVAS_H = 300;
const PLAYER_W = 30;
const PLAYER_H = 20;
const LANE_COUNT = 3;
const LANE_HEIGHT = CANVAS_H / LANE_COUNT;

export function MathiyaRacer() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  const playerRef = useRef({
    lane: 1,
    x: 60,
    targetY: LANE_HEIGHT * 1 + LANE_HEIGHT / 2,
    y: LANE_HEIGHT * 1 + LANE_HEIGHT / 2,
    hasShield: false,
    shieldTimer: 0,
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const boostsRef = useRef<Boost[]>([]);
  const speedRef = useRef(3);
  const frameRef = useRef(0);
  const scoreRef = useRef(0);

  const startGame = useCallback(() => {
    playerRef.current = {
      lane: 1,
      x: 60,
      targetY: LANE_HEIGHT * 1 + LANE_HEIGHT / 2,
      y: LANE_HEIGHT * 1 + LANE_HEIGHT / 2,
      hasShield: false,
      shieldTimer: 0,
    };
    obstaclesRef.current = [];
    boostsRef.current = [];
    speedRef.current = 3;
    frameRef.current = 0;
    scoreRef.current = 0;
    setScore(0);
    setGameState('playing');
  }, []);

  const endGame = useCallback(() => {
    setGameState('gameover');
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    setHighScore(prev => Math.max(prev, scoreRef.current));
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKey = (e: KeyboardEvent) => {
      const player = playerRef.current;
      if ((e.key === 'ArrowUp' || e.key === 'w') && player.lane > 0) {
        player.lane--;
        player.targetY = LANE_HEIGHT * player.lane + LANE_HEIGHT / 2;
      }
      if ((e.key === 'ArrowDown' || e.key === 's') && player.lane < LANE_COUNT - 1) {
        player.lane++;
        player.targetY = LANE_HEIGHT * player.lane + LANE_HEIGHT / 2;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      const player = playerRef.current;
      const frame = frameRef.current++;
      const speed = speedRef.current;

      // Smooth lane transition
      player.y += (player.targetY - player.y) * 0.15;

      // Increase speed over time
      if (frame % 300 === 0) speedRef.current += 0.3;

      // Spawn obstacles
      if (frame % Math.max(30, 60 - Math.floor(speed)) === 0) {
        const lane = Math.floor(Math.random() * LANE_COUNT);
        const rng = Math.random();
        const type: Obstacle['type'] = rng < 0.2 ? 'firewall' : rng < 0.5 ? 'bug' : 'wall';
        obstaclesRef.current.push({
          x: CANVAS_W + 20,
          y: LANE_HEIGHT * lane + LANE_HEIGHT / 2,
          width: type === 'firewall' ? 15 : 20,
          height: type === 'firewall' ? LANE_HEIGHT * 0.7 : 18,
          type,
          speed: speed + Math.random(),
        });
      }

      // Spawn boosts
      if (frame % 180 === 0 && Math.random() < 0.4) {
        const lane = Math.floor(Math.random() * LANE_COUNT);
        boostsRef.current.push({
          x: CANVAS_W + 20,
          y: LANE_HEIGHT * lane + LANE_HEIGHT / 2,
          collected: false,
          type: Math.random() < 0.5 ? 'shield' : 'speed',
        });
      }

      // Move obstacles
      for (const obs of obstaclesRef.current) {
        obs.x -= obs.speed;
      }
      obstaclesRef.current = obstaclesRef.current.filter(o => o.x > -50);

      // Move boosts
      for (const b of boostsRef.current) {
        b.x -= speed;
      }
      boostsRef.current = boostsRef.current.filter(b => b.x > -50 && !b.collected);

      // Shield timer
      if (player.hasShield) {
        player.shieldTimer--;
        if (player.shieldTimer <= 0) player.hasShield = false;
      }

      // Collision with boosts
      for (const b of boostsRef.current) {
        if (b.collected) continue;
        if (Math.abs(b.x - player.x) < 25 && Math.abs(b.y - player.y) < 25) {
          b.collected = true;
          if (b.type === 'shield') {
            player.hasShield = true;
            player.shieldTimer = 300;
          } else {
            scoreRef.current += 25;
          }
        }
      }

      // Collision with obstacles
      for (const obs of obstaclesRef.current) {
        const dx = Math.abs(obs.x - player.x);
        const dy = Math.abs(obs.y - player.y);
        if (dx < (obs.width / 2 + PLAYER_W / 2 - 4) && dy < (obs.height / 2 + PLAYER_H / 2 - 4)) {
          if (player.hasShield) {
            player.hasShield = false;
            player.shieldTimer = 0;
            obs.x = -100; // remove it
          } else {
            endGame();
            return;
          }
        }
      }

      // Score
      scoreRef.current++;
      if (frame % 5 === 0) setScore(scoreRef.current);

      // ---- DRAW ----
      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Lane lines
      for (let i = 1; i < LANE_COUNT; i++) {
        const ly = LANE_HEIGHT * i;
        ctx.setLineDash([8, 8]);
        ctx.strokeStyle = 'rgba(34,211,238,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, ly);
        ctx.lineTo(CANVAS_W, ly);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Scrolling grid lines (road effect)
      const gridOffset = (frame * speed * 0.5) % 40;
      ctx.strokeStyle = 'rgba(34,211,238,0.05)';
      ctx.lineWidth = 1;
      for (let gx = -gridOffset; gx < CANVAS_W; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, CANVAS_H);
        ctx.stroke();
      }

      // Obstacles
      for (const obs of obstaclesRef.current) {
        if (obs.type === 'firewall') {
          ctx.fillStyle = '#FB7185';
          ctx.shadowColor = '#FB7185';
          ctx.shadowBlur = 10;
          ctx.fillRect(obs.x - obs.width / 2, obs.y - obs.height / 2, obs.width, obs.height);
          ctx.shadowBlur = 0;
        } else if (obs.type === 'bug') {
          ctx.fillStyle = '#FBBF24';
          ctx.font = '16px monospace';
          ctx.fillText('🐛', obs.x - 8, obs.y + 5);
        } else {
          ctx.fillStyle = '#475569';
          ctx.fillRect(obs.x - obs.width / 2, obs.y - obs.height / 2, obs.width, obs.height);
        }
      }

      // Boosts
      for (const b of boostsRef.current) {
        if (b.collected) continue;
        ctx.fillStyle = b.type === 'shield' ? '#A78BFA' : '#34D399';
        ctx.shadowColor = b.type === 'shield' ? '#A78BFA' : '#34D399';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#080C14';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(b.type === 'shield' ? 'S' : '⚡', b.x, b.y + 3);
        ctx.textAlign = 'start';
      }

      // Player (MATHIYA racer)
      const px = player.x;
      const py = player.y;

      // Shield aura
      if (player.hasShield) {
        ctx.strokeStyle = 'rgba(167,139,250,0.6)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#A78BFA';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Body
      ctx.fillStyle = '#22D3EE';
      ctx.shadowColor = '#22D3EE';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(px + PLAYER_W / 2, py);
      ctx.lineTo(px - PLAYER_W / 2, py - PLAYER_H / 2);
      ctx.lineTo(px - PLAYER_W / 2 + 8, py);
      ctx.lineTo(px - PLAYER_W / 2, py + PLAYER_H / 2);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      // Engine trail
      ctx.fillStyle = `rgba(251,113,133,${0.3 + Math.random() * 0.4})`;
      ctx.beginPath();
      ctx.moveTo(px - PLAYER_W / 2, py - 4);
      ctx.lineTo(px - PLAYER_W / 2 - 10 - Math.random() * 8, py);
      ctx.lineTo(px - PLAYER_W / 2, py + 4);
      ctx.closePath();
      ctx.fill();

      // HUD
      ctx.fillStyle = '#22D3EE';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(`DISTANCE: ${scoreRef.current}`, 10, 22);
      ctx.fillStyle = '#A78BFA';
      ctx.fillText(`SPEED: ${speed.toFixed(1)}x`, CANVAS_W - 120, 22);

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, endGame]);

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
              <h3 className="text-3xl font-display font-bold text-cyan mb-2">MATHIYA Racer</h3>
              <p className="text-text-2 text-sm mb-6">Dodge obstacles • Survive as long as possible</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-cyan/20 border border-cyan/40 text-cyan rounded-lg hover:bg-cyan/30 transition-colors font-mono text-sm"
              >
                [ IGNITE ]
              </button>
              <p className="text-text-3 text-xs mt-4">↑ ↓ or W/S to switch lanes</p>
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
              <h3 className="text-2xl font-display font-bold text-red mb-2">CRASHED</h3>
              <p className="text-text-2 text-lg font-mono mb-1">Distance: {score}</p>
              <p className="text-text-3 text-sm font-mono mb-6">Best: {highScore}</p>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-red/20 border border-red/40 text-red rounded-lg hover:bg-red/30 transition-colors font-mono text-sm"
              >
                [ RETRY ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
