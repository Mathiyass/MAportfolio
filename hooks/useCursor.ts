'use client';
import { useEffect, useCallback } from 'react';
import { useCursorStore } from '@/store/cursorStore';

export function useCursor() {
  const store = useCursorStore();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const prevX = useCursorStore.getState().x;
    const prevY = useCursorStore.getState().y;
    store.actions.setPosition(e.clientX, e.clientY);
    store.actions.setVelocity(e.clientX - prevX, e.clientY - prevY);
  }, [store.actions]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return {
    x: store.x,
    y: store.y,
    velocityX: store.velocityX,
    velocityY: store.velocityY,
    isHovering: store.isHovering,
  };
}
