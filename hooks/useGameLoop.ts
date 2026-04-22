'use client';
import { useRef, useCallback, useEffect } from 'react';

interface GameLoopOptions {
  update: (dt: number) => void;
  render: () => void;
  fps?: number;
}

export function useGameLoop({ update, render, fps = 60 }: GameLoopOptions) {
  const raf = useRef<number>(0);
  const lastTime = useRef(0);
  const isRunning = useRef(false);
  const interval = 1000 / fps;

  const loop = useCallback(
    (time: number) => {
      if (!isRunning.current) return;
      raf.current = requestAnimationFrame(loop);
      const delta = time - lastTime.current;
      if (delta >= interval) {
        lastTime.current = time - (delta % interval);
        update(delta / 1000);
        render();
      }
    },
    [update, render, interval]
  );

  const start = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;
    lastTime.current = performance.now();
    raf.current = requestAnimationFrame(loop);
  }, [loop]);

  const stop = useCallback(() => {
    isRunning.current = false;
    cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      stop();
    };
  }, [start, stop]);

  return { start, stop, isRunning: isRunning.current };
}
