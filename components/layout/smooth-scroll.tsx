'use client';

import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: prefersReducedMotion ? 1 : 0.08,
        duration: prefersReducedMotion ? 0 : 1.2,
        smoothWheel: !prefersReducedMotion,
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
