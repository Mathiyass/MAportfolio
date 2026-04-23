'use client';

import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion';

const items = [
  "/// STATUS: OPTIMAL ///",
  "NODE.JS V20.x INTEGRATED",
  "///",
  "TAILWIND V4 COMPILER ACTIVE",
  "///",
  "WEBGL CONTEXT SECURED",
  "///",
  "LATENCY: 0.002ms",
  "///",
  "NEURAL_LINK: STABLE",
  "///",
  "MEMORY_CORE: NOMINAL",
  "///"
];

export function TechnicalTicker() {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef<number>(-1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * 0.005 * delta;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-nav border-t-0 py-2 overflow-hidden z-[var(--z-nav)] pointer-events-none">
      <motion.div 
        className="flex whitespace-nowrap font-mono text-[9px] tracking-[0.3em] text-cyan uppercase opacity-60 w-fit"
        style={{ x }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}
