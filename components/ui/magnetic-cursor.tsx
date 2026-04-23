'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursorStore } from '@/store/cursorStore';
import { useIsMobile } from '@/hooks/useMediaQuery';

export function MagneticCursor() {
  const isMobile = useIsMobile();
  const { isHovering, isVisible, hoverTarget } = useCursorStore();
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    if (isMobile) return;

    const updateMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const nx = (e.clientX / window.innerWidth) * 100;
      const ny = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${nx}`);
      document.documentElement.style.setProperty('--mouse-y', `${ny}`);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 'var(--z-cursor)' }}>
      {/* Layer 1: Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Layer 2: Springy Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500/50"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          backgroundColor: isHovering ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(34, 211, 238, 0.8)' : 'rgba(34, 211, 238, 0.5)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Layer 3: Magnetic Pull Tracker (Trailing Ring) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-red-500/20"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible && !isHovering ? 1 : 0,
        }}
      />

      {/* Layer 4: Ambient Glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Label Text when hovering */}
      <motion.div
        className="fixed top-0 left-0 font-mono text-[10px] text-cyan-300 tracking-widest uppercase pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '16px',
          translateY: '16px',
        }}
        animate={{
          opacity: isHovering && hoverTarget ? 1 : 0,
        }}
      >
        {hoverTarget}
      </motion.div>
    </div>
  );
}
