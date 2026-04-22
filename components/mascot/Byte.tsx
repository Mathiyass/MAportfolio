"use client";
import * as React from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import { useByteStore } from '@/store/byteStore';
import { usePathname } from 'next/navigation';
import { useMousePosition } from '@/hooks/useMousePosition';

const PAGE_GREETINGS: Record<string, string> = {
  '/': 'Welcome to MATHIYA! I am BYTE.',
  '/projects': 'Scanning projects database...',
  '/games': 'Ready to play? Initializing arcade mode.',
  '/contact': 'Need to send a message? I can help route it.',
};

export function Byte() {
  const { currentSpeech, isVisible, actions, mood } = useByteStore();
  const pathname = usePathname();
  const mouse = useMousePosition();
  const byteRef = React.useRef<HTMLDivElement>(null);

  // IK tracking springs
  const eyeX = useSpring(0, { stiffness: 300, damping: 30 });
  const eyeY = useSpring(0, { stiffness: 300, damping: 30 });
  const headRotateX = useSpring(0, { stiffness: 100, damping: 20 });
  const headRotateY = useSpring(0, { stiffness: 100, damping: 20 });

  React.useEffect(() => {
    if (PAGE_GREETINGS[pathname]) {
      setTimeout(() => {
        actions.showSpeech(PAGE_GREETINGS[pathname]);
      }, 1000);
    }
  }, [pathname, actions]);

  React.useEffect(() => {
    if (!byteRef.current) return;
    const rect = byteRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = mouse.x - centerX;
    const dy = mouse.y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Limit eye movement
    const limit = 6;
    const angle = Math.atan2(dy, dx);
    eyeX.set(Math.cos(angle) * Math.min(dist / 20, limit));
    eyeY.set(Math.sin(angle) * Math.min(dist / 20, limit));
    
    // Head tilt
    headRotateY.set(Math.min(Math.max(dx / 10, -15), 15));
    headRotateX.set(Math.min(Math.max(-dy / 10, -15), 15));

    if (dist < 100 && mood !== 'surprised') {
      actions.setMood('surprised');
    } else if (dist > 200 && mood === 'surprised') {
      actions.setMood('idle');
    }
  }, [mouse, eyeX, eyeY, headRotateX, headRotateY, mood, actions]);

  if (!isVisible) return null;

  return (
    <div 
      ref={byteRef}
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none" 
      data-byte-panel
    >
      <AnimatePresence>
        {currentSpeech && (
          <motion.div
            className="mb-4 bg-bg-overlay/90 backdrop-blur-xl border border-cyan/30 rounded-2xl px-4 py-3 font-body text-sm text-text-0 shadow-[var(--glow-c-s)] max-w-xs relative pointer-events-auto"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {currentSpeech.text}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-bg-overlay/90 border-b border-r border-cyan/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative w-20 h-20 cursor-pointer pointer-events-auto group"
        style={{ 
          rotateX: headRotateX, 
          rotateY: headRotateY,
          perspective: 1000 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => actions.showSpeech("Searching for inspiration...", 3000)}
      >
        <div className="absolute inset-0 bg-cyan blur-2xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity" />
        
        {/* BYTE Body */}
        <div className="w-full h-full rounded-2xl border-2 border-cyan/50 bg-bg-elevated flex flex-col items-center justify-center shadow-[var(--glow-c-s)] relative overflow-hidden">
          {/* Eyes Container */}
          <div className="flex gap-3 mb-1">
            {[0, 1].map((i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-cyan/20 relative overflow-hidden border border-cyan/30">
                <motion.div 
                  style={{ x: eyeX, y: eyeY }}
                  className="w-2 h-2 bg-cyan rounded-full absolute top-1 left-1 shadow-[0_0_8px_#22D3EE]"
                />
              </div>
            ))}
          </div>
          {/* Mouth */}
          <motion.div 
            animate={{ 
              height: mood === 'surprised' ? 8 : 2,
              borderRadius: mood === 'surprised' ? '50%' : '2px'
            }}
            className="w-6 bg-cyan/80 rounded-full" 
          />
          
          {/* Decorative bits */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-cyan/40 rounded-full" />
          <div className="absolute top-1 right-1 w-1 h-1 bg-red/40 rounded-full" />
        </div>

        {/* Antenna */}
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan/60"
        >
          <div className="absolute -top-1 -left-0.5 w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#22D3EE]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
