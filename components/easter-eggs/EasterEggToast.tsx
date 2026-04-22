"use client";
import { motion, AnimatePresence } from 'motion/react';
import { useEasterEggStore } from '@/store/easterEggStore';

export function EasterEggToast() {
  const toastMessage = useEasterEggStore((s) => s.toastMessage);
  const clearToast = useEasterEggStore((s) => s.clearToast);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9000] max-w-sm"
          onClick={clearToast}
        >
          <div className="px-6 py-3 rounded-xl border border-cyan/30 bg-bg-elevated/95 backdrop-blur-xl shadow-2xl shadow-cyan/10">
            <p className="text-sm font-mono text-text-0 text-center whitespace-nowrap">
              {toastMessage}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
