'use client';

import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useByteStore } from '@/store/byteStore';
import { useByteInteraction } from '@/hooks/useByteInteraction';
import { ByteModel } from './byte-model';
import { ByteSpeech } from './byte-speech';
import { BytePanel } from './byte-panel';
import { motion } from 'framer-motion';

export function ByteContainer() {
  const { isVisible, isCollapsed, actions } = useByteStore();
  const { byteRef, updateTracking } = useByteInteraction();

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      updateTracking(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [updateTracking]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[var(--z-byte)] flex flex-col items-end">
      <BytePanel />
      
      <motion.div
        ref={byteRef}
        className={`transition-all duration-500 ease-spring ${
          isCollapsed ? 'w-16 h-16 opacity-50' : 'w-48 h-64'
        }`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          actions.toggleCollapsed();
          if (isCollapsed) {
            actions.wake();
            actions.showSpeech("I'm back!");
          } else {
            actions.sleep();
          }
        }}
      >
        <div className="relative w-full h-full cursor-pointer group">
          {!isCollapsed && <ByteSpeech />}
          
          <Canvas
            camera={{ position: [0, 1, 5], fov: 45 }}
            className="pointer-events-none"
            gl={{ alpha: true, antialias: true }}
          >
            <ByteModel />
          </Canvas>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-colors" />
        </div>
      </motion.div>
    </div>
  );
}
