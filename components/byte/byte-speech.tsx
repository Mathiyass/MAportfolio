'use client';

import { useByteStore } from '@/store/byteStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ByteSpeech() {
  const { currentSpeech, isGenerating } = useByteStore();

  return (
    <AnimatePresence>
      {currentSpeech && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
          animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
          className={cn(
            "absolute -top-16 left-1/2 min-w-[120px] max-w-[200px] rounded-lg p-3 shadow-card glass overflow-hidden",
            isGenerating ? "border-cyan/50" : "border-cyan-500/30"
          )}
          style={{ zIndex: 10 }}
        >
          {/* Animated Gradient Background when generating */}
          {isGenerating && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 via-red/20 to-cyan/20 animate-gradient bg-[length:200%_auto] -z-10" />
          )}

          {/* Speech Bubble Tail */}
          <div className={cn(
            "absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 border-b border-r transform rotate-45",
            isGenerating ? "bg-cyan/10 border-cyan/50" : "bg-bg-elevated border-cyan-500/30"
          )} />
          
          <p className="text-xs font-mono text-cyan-50 relative z-10 text-center">
            {currentSpeech.text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
