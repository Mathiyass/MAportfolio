'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion';

export function TechnicalTicker() {
  const [latency, setLatency] = useState('0.002ms');
  const [time, setTime] = useState('');
  const [nodeId] = useState(() => Math.random().toString(16).substring(2, 10).toUpperCase());
  const [isMounted, setIsMounted] = useState(false);

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef<number>(-1);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setLatency(`${(Math.random() * 0.005 + 0.001).toFixed(3)}ms`);
      const now = new Date();
      setTime(now.toISOString().split('T')[1].split('.')[0] + ' UTC');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * 0.004 * delta;
    baseX.set(baseX.get() + moveBy);
  });

  if (!isMounted) return null;

  const items = [
    "/// STATUS: OPTIMAL ///",
    `NODE_${nodeId} ACTIVE`,
    "///",
    "TAILWIND V4 READY",
    "///",
    "WEBGL CONTEXT SECURED",
    "///",
    `LATENCY: ${latency}`,
    "///",
    `SYNC_TIME: ${time}`,
    "///",
    "NEURAL_LINK: STABLE",
    "///",
    "MEMORY_CORE: NOMINAL",
    "///"
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-nav border-t border-cyan-500/10 py-1.5 overflow-hidden z-[var(--z-nav)] pointer-events-none">
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0F131C] to-transparent z-10" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0F131C] to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap font-mono text-[8px] md:text-[9px] tracking-[0.3em] text-cyan uppercase opacity-50 w-fit"
        style={{ x }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}
