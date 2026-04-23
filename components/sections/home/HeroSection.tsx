"use client"
import * as React from 'react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThreeScene } from '@/components/three/Scene';
import { ByteR3F } from '@/components/three/ByteR3F';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Terminal } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 energy-mesh z-0 opacity-40"></div>
      
      <div className="container mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-1"
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-cyan uppercase opacity-70">Creative Developer</span>
            <div className="h-px w-12 bg-cyan/30" />
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-text-0 uppercase mix-blend-difference"
            >
              NEXUS <br/>
              <span className="text-cyan">FORGE.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-xl text-text-2 font-body leading-relaxed border-l border-white/10 pl-8"
            >
              Building high-fidelity digital interfaces and system-driven experiences where technical precision meets atmospheric depth.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-6 mt-4"
          >
            <Link href="/projects" passHref>
              <Button variant="primary" size="lg" className="h-16 px-10 gap-3 text-xs tracking-[0.2em] shadow-[0_0_40px_-10px_rgba(0,240,255,0.4)] hover:scale-105 transition-all">
                VIEW WORK <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button variant="secondary" size="lg" className="h-16 px-10 border-white/5 glass hover:border-cyan/30 hover:bg-cyan/5 transition-all">
                GET IN TOUCH
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-wrap gap-12 pt-12 border-t border-white/5 w-full max-w-lg"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-4">Status</span>
              <div className="flex items-center gap-2 text-cyan font-head font-bold text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#00f0ff]" />
                AVAILABLE
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-4">Focus</span>
              <div className="text-text-1 font-head font-bold text-sm uppercase">Full-Stack</div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-4">Experience</span>
              <div className="text-text-1 font-head font-bold text-sm uppercase">4+ Years</div>
            </div>
          </motion.div>
        </div>

        {/* Mascot Column */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
           <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
             className="relative w-full aspect-[4/5] max-w-md"
           >
             <div className="absolute top-6 right-6 flex flex-col items-end gap-1 text-right z-30 mix-blend-difference">
               <span className="font-mono text-[10px] tracking-widest text-text-1 uppercase">NODE_01</span>
             </div>

             {/* Glows */}
             <div className="absolute -inset-10 bg-gradient-to-tr from-cyan/20 via-red/10 to-transparent blur-[100px] rounded-full animate-pulse z-0" />
             
             <div className="w-full h-full rounded-[var(--radius-2xl)] glass-refraction border-white/5 relative overflow-hidden group z-10">
               <Suspense fallback={<Skeleton className="w-full h-full" variant="shimmer" />}>
                 <ThreeScene className="w-full h-full">
                   <ByteR3F />
                 </ThreeScene>
               </Suspense>
               
               <div className="absolute bottom-10 left-10 right-10 z-20 pointer-events-none">
                 <div className="flex items-center gap-3 mb-3">
                   <Terminal size={14} className="text-cyan" />
                   <span className="font-mono text-[10px] text-cyan tracking-widest uppercase">BYTE // INTERACTIVE</span>
                 </div>
                 <div className="font-display text-3xl font-black text-text-0 uppercase leading-none tracking-tight text-balance">The Neural Engine.</div>
               </div>
               
               <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
               </div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
