'use client';

/**
 * BYTE Contextual AI Hub - Core Container
 * Version: 1.0.2
 */

import * as React from 'react';
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useByteStore } from '@/store/byteStore';
import { useByteInteraction } from '@/hooks/useByteInteraction';
import { ByteModel } from './byte-model';
import { ByteNeuralInterface } from './byte-neural-interface';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const ROUTE_MESSAGES: Record<string, string> = {
  '/': "Welcome to the Nexus. Exploring main systems.",
  '/projects': "Accessing the project registry...",
  '/about': "Loading biographical data.",
  '/skills': "Scanning technical proficiencies...",
  '/contact': "Establishing secure communication link.",
  '/gallery': "Initializing visual assets.",
  '/games': "Arcade mode engaged. Ready to play?",
  '/blog': "Retrieving engineering logs.",
  '/secret': "WARNING: Classified area accessed.",
  '/ar': "Augmented Reality engine online.",
  '/marketplace': "Entering the developer marketplace."
};

export function ByteContainer() {
  const [mounted, setMounted] = React.useState(false);
  const { isVisible, isCollapsed, actions } = useByteStore();
  const { byteRef, updateTracking } = useByteInteraction();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    let msg = "Navigating subspace...";
    if (pathname && ROUTE_MESSAGES[pathname]) {
      msg = ROUTE_MESSAGES[pathname];
    } else if (pathname?.startsWith('/projects/')) {
      msg = "Analyzing project schematics.";
    }

    if (!isCollapsed) {
      actions.setMood('excited');
      actions.showSpeech(msg, 4000);
      setTimeout(() => actions.setMood('idle'), 2000);
    }
  }, [pathname, actions, isCollapsed, mounted]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      updateTracking(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [updateTracking]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[var(--z-byte)] flex flex-col items-end pointer-events-none">
      <motion.div
        ref={byteRef}
        role="button"
        tabIndex={0}
        className={`transition-all duration-500 ease-spring pointer-events-auto ${
          isCollapsed ? 'w-16 h-16 opacity-50' : 'w-48 h-64'
        }`}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => actions.toggleCollapsed()}
      >
        <div className="relative w-full h-full cursor-pointer group">
          <AnimatePresence>
            {!isCollapsed && <ByteNeuralInterface key="neural-interface" />}
          </AnimatePresence>
          
          <Canvas
            camera={{ position: [0, 1, 5], fov: 45 }}
            className="pointer-events-none relative z-10"
            gl={{ alpha: true, antialias: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <ByteModel />
          </Canvas>

          <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-colors z-0" />
        </div>
      </motion.div>
    </div>
  );
}
