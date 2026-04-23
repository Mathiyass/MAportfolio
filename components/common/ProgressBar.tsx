'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan via-red to-cyan bg-[length:200%_auto] animate-gradient z-[var(--z-nav)]"
      style={{ scaleX, transformOrigin: '0%' }}
    />
  );
}
