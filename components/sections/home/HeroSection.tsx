"use client"
import * as React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center px-4 pt-20">
      <div className="container mx-auto grid lg:grid-cols-12 gap-12 items-center mesh-hero pb-20 pt-10 px-8 rounded-[var(--radius-2xl)] border border-border-1 relative overflow-hidden">
        
        <div className="lg:col-span-7 flex flex-col items-start gap-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border-c bg-bg-elevated px-4 py-1.5 text-xs font-mono font-medium text-cyan"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#22D3EE]" />
            <span>Available for new projects</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl !leading-[1.1] text-text-0"
          >
            I build things that <span className="gradient-text">matter.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-lg text-text-2 sm:text-xl font-body leading-relaxed"
          >
            Software Engineering Student & Full-Stack Developer. 
            Building systems, products, and experiences with precision.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Link href="/projects" passHref>
              <Button variant="primary" size="lg" className="h-14 px-8">
                View Projects
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button variant="secondary" size="lg" className="h-14 px-8">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center">
           <motion.div
             initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
             animate={{ opacity: 1, rotate: 0, scale: 1 }}
             transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
             className="relative w-full aspect-square max-w-md"
           >
             <div className="absolute -inset-10 bg-gradient-to-r from-cyan/20 to-red/10 blur-[80px] rounded-full animate-pulse" />
             <div className="w-full h-full rounded-[var(--radius-2xl)] border border-border-1 bg-bg-muted/40 backdrop-blur-xl shadow-elevated flex items-center justify-center relative overflow-hidden group">
               {/* Decorative Grid */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(var(--color-cyan) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
               
               <div className="relative z-10 flex flex-col items-center gap-4">
                 <div className="w-24 h-24 rounded-full border-2 border-cyan/30 flex items-center justify-center bg-cyan/5 group-hover:border-cyan/50 transition-colors duration-500">
                   <div className="w-12 h-12 rounded-full bg-cyan shadow-[0_0_20px_#22D3EE]" />
                 </div>
                 <span className="font-mono text-cyan/60 text-sm tracking-widest uppercase">
                   Byte OS Active
                 </span>
               </div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
