'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoaderStore } from '@/store/loaderStore';
import { useAudioStore } from '@/store/audioStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeScene } from '@/components/three/Scene';
import { LoaderBlobsShader } from '@/components/three/LoaderBlobsShader';

const statusLabels = [
  "INITIALIZING_SYSTEM",
  "LOADING_CREATIVE_ASSETS",
  "SECURING_CONTEXT",
  "OPTIMIZING_INTERFACE",
  "ESTABLISHING_LINK"
];

export function PageLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { done, actions } = useLoaderStore();
  const [activeLabel, setActiveLabel] = useState(statusLabels[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (done) return;

    // Timeline for labels
    const labelInterval = setInterval(() => {
      setActiveLabel(prev => {
        const nextIndex = statusLabels.indexOf(prev) + 1;
        return statusLabels[nextIndex] || prev;
      });
    }, 450);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Final exit sequence
          gsap.to(containerRef.current, {
            clipPath: 'circle(0% at 50% 50%)',
            duration: 1.5,
            ease: "expo.inOut",
            onComplete: () => actions.complete()
          });
        }
      });

      // Progress animation
      tl.to({ val: 0 }, {
        val: 100,
        duration: 3.5,
        ease: "power2.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        }
      });

      // Logo reveal
      tl.fromTo(logoRef.current, 
        { opacity: 0, scale: 0.9, filter: 'blur(40px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: "expo.out" },
        0.8
      );

      // Fade out overlay
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.in"
      }, "+=0.5");

    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(labelInterval);
    };
  }, [done, actions]);

  const handleStartAudio = () => {
    useAudioStore.getState().actions.toggle();
  };

  if (done) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[var(--z-loader)] flex flex-col items-center justify-center bg-bg-base/20 backdrop-blur-[40px] overflow-hidden"
      style={{ clipPath: 'circle(150% at 50% 50%)' }}
    >
      {/* Background Dimensional Layer */}
      <div ref={overlayRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-base z-10 opacity-60" />
        <ThreeScene className="w-full h-full">
            <LoaderBlobsShader opacity={0.6} />
        </ThreeScene>
      </div>

      {/* Signature Grid & Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-red/20 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center gap-16 max-w-4xl w-full px-12">
        
        {/* Cinematic Logo reveal */}
        <div ref={logoRef} className="relative">
            {/* Holographic under-glow */}
            <div className="absolute -inset-16 bg-cyan/10 blur-[100px] rounded-full animate-pulse" />
            
            <div className="flex flex-col items-center text-center relative z-10">
                <motion.div
                    initial={{ letterSpacing: '1em', opacity: 0 }}
                    animate={{ letterSpacing: '0.6em', opacity: 1 }}
                    transition={{ duration: 2.5, ease: "circOut" }}
                    className="font-mono text-[9px] text-cyan tracking-[0.6em] uppercase mb-8 ml-[0.6em] opacity-60"
                >
                    SYSTEM_EVOLUTION
                </motion.div>
                
                <h1 className="font-display font-black text-7xl md:text-[10rem] text-text-0 tracking-[-0.05em] leading-none select-none mix-blend-difference">
                    MATHIYA<span className="text-cyan">.</span>
                </h1>
                
                <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-red to-transparent opacity-40" />
            </div>
        </div>

        {/* Technical Telemetry */}
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            <div className="flex flex-col items-center gap-1.5 w-full">
                <div className="flex justify-between w-full font-mono text-[8px] tracking-[0.2em] text-text-4 uppercase mb-2">
                    <span>Synchronizing Nodes</span>
                    <span className="text-cyan">{progress}%</span>
                </div>
                
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div 
                        className="h-full bg-cyan shadow-[0_0_15px_#00f0ff]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>

                <div className="mt-4 h-4 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activeLabel}
                            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                            className="font-mono text-[9px] text-text-3 uppercase tracking-[0.4em]"
                        >
                            {activeLabel}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </div>

        {/* Interaction Prompt */}
        <motion.button 
          onClick={handleStartAudio}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          whileHover={{ opacity: 1, scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
          className="mt-8 flex items-center gap-4 px-8 py-3 rounded-full border border-white/5 bg-transparent text-[10px] font-mono tracking-[0.2em] text-text-2 uppercase transition-all"
        >
          <div className="size-1.5 rounded-full bg-red animate-pulse shadow-[0_0_8px_#ff525c]" />
          Enable Audio
        </motion.button>
      </div>

      {/* Structural Framing */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-bg-base to-transparent z-30 opacity-60" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-base to-transparent z-30 opacity-60" />

      {/* Decorative Corner Telemetry */}
      <div className="absolute top-16 left-16 font-mono text-[8px] text-text-4 flex flex-col gap-2 z-30 uppercase tracking-widest opacity-20">
          <div className="flex gap-2">LON 07.24.12</div>
          <div className="flex gap-2">LAT 12.04.26</div>
      </div>
      <div className="absolute bottom-16 right-16 font-mono text-[8px] text-text-4 flex flex-col items-end gap-2 z-30 uppercase tracking-widest text-right opacity-20">
          <div className="flex gap-2">Protocol NEXUS_ULTRA</div>
          <div className="flex gap-2">Core STABLE</div>
      </div>
    </div>
  );
}
