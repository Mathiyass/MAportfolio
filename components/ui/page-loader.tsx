'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoaderStore } from '@/store/loaderStore';
import { useAudioStore } from '@/store/audioStore';

export function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { done, actions } = useLoaderStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (done) return;

    const ctx = gsap.context(() => {
      // Fake progress simulation
      const tl = gsap.timeline({
        onComplete: () => {
          actions.complete();
        }
      });

      // Progress bar animation
      tl.to({ val: 0 }, {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        }
      }, 0);

      // Bar width
      tl.to(progressRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut",
      }, 0);

      // Text glitch effect
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.5,
      }, 0.2);

      // Exit animation
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        delay: 0.5,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [done, actions]);

  // Audio start handler
  const handleStartAudio = () => {
    useAudioStore.getState().actions.toggle();
  };

  if (done) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-bg-base text-cyan-400"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        <div ref={textRef} className="opacity-0 mb-8 font-mono text-sm tracking-[0.2em] text-center">
          <p className="mb-2">INITIALIZING NEXUS_PRIME v12.0</p>
          <p className="text-cyan-600">DECRYPTING ASSETS... {progress}%</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-cyan-950/50 rounded-full overflow-hidden relative">
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-cyan-400 w-0 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        </div>

        <button 
          onClick={handleStartAudio}
          className="mt-12 text-[10px] font-mono tracking-widest text-text-3 hover:text-cyan-400 transition-colors opacity-50 hover:opacity-100"
        >
          [ ENABLE SYSTEM AUDIO ]
        </button>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-cyan-500/30" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-cyan-500/30" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-cyan-500/30" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-cyan-500/30" />
    </div>
  );
}
