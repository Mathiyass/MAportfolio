"use client";
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoaderStore } from '@/store/loaderStore';
import { letterReveal } from '@/lib/animations';

const LETTERS = ['M','A','T','H','I','Y','A'];

export function PageLoader() {
  const phase = useLoaderStore((s) => s.phase);
  const done = useLoaderStore((s) => s.done);
  const { nextPhase, complete } = useLoaderStore((s) => s.actions);

  useEffect(() => {
    const QUICK_RETURN = typeof window !== 'undefined' && sessionStorage.getItem('mathiya_visited') === 'true';

    if (QUICK_RETURN) {
      setTimeout(complete, 100); // Quick hide
      return;
    }

    // Full sequence
    const t1 = setTimeout(() => nextPhase(), 150);   // Phase 1: Letters
    const t2 = setTimeout(() => nextPhase(), 900);   // Phase 2: Progress line
    const t3 = setTimeout(() => nextPhase(), 1800);  // Phase 3: Tagline/BYTE
    const t4 = setTimeout(() => {
      nextPhase();
      setTimeout(() => {
        complete();
        sessionStorage.setItem('mathiya_visited', 'true');
      }, 500);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [complete, nextPhase]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[800] bg-bg-base flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* MATHIYA letters */}
          <div className="relative z-10 flex gap-1 sm:gap-2">
            {phase >= 1 && LETTERS.map((letter, i) => (
              <motion.span
                key={letter + i}
                className="font-display font-bold text-[clamp(40px,7vw,80px)] text-text-0"
                custom={i}
                variants={letterReveal}
                initial="hidden"
                animate="visible"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Tagline */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.p
                className="font-body text-base sm:text-lg text-text-2 mt-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                I build things that matter.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Progress line */}
          <AnimatePresence>
            {phase >= 2 && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-bg-elevated">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan to-red"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
