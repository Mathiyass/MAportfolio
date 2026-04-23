'use client';

import { useAudioStore } from '@/store/audioStore';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AudioToggle() {
  const { isEnabled, actions } = useAudioStore();

  return (
    <div className="fixed bottom-6 left-6 z-[var(--z-nav)]">
      <Button
        variant="ghost"
        size="icon"
        onClick={actions.toggle}
        className="size-12 rounded-full glass border-white/5 hover:border-cyan/30 hover:bg-cyan/10 transition-all group"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isEnabled ? 'on' : 'off'}
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
            transition={{ duration: 0.2 }}
            className="text-text-3 group-hover:text-cyan transition-colors"
          >
            {isEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  );
}
