'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

export function useMousePosition(): MousePosition {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0.5, ny: 0.5 });
  const raf = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      setPos((prev) => {
        const lerp = 0.12;
        const x = prev.x + (target.current.x - prev.x) * lerp;
        const y = prev.y + (target.current.y - prev.y) * lerp;
        return {
          x,
          y,
          nx: x / (window.innerWidth || 1),
          ny: 1 - y / (window.innerHeight || 1),
        };
      });
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, [handleMouseMove]);

  return pos;
}

export { useMousePosition as useMouse };
