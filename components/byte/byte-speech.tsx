'use client';

import { useByteStore } from '@/store/byteStore';
import { motion, AnimatePresence } from 'framer-motion';

export function ByteSpeech() {
  const { currentSpeech } = useByteStore();

  return (
    <AnimatePresence>
      {currentSpeech && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
          animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
          className="absolute -top-16 left-1/2 min-w-[120px] max-w-[200px] bg-bg-elevated border border-cyan-500/30 rounded-lg p-3 shadow-card glass"
          style={{ zIndex: 10 }}
        >
          {/* Speech Bubble Tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-bg-elevated border-b border-r border-cyan-500/30 transform rotate-45" />
          
          <p className="text-xs font-mono text-cyan-50 relative z-10 text-center">
            {currentSpeech.text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
