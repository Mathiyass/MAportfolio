"use client"
import * as React from 'react';
import { motion } from 'framer-motion';

export function AsciiPortrait() {
  const ascii = `
      ...:::::..
   .:::::::::::::..
 .:::::::::::::::::::
.:::::::::::::::::::::
::::::::::::::::::::::
::::::::::::::::::::::
::::::::::::::::::::::
::::::::::::::::::::::
 ::::::::::::::::::::
  '::::::::::::::::'
    '::::::::::::'
       '::::::'
  `;

  return (
    <div className="relative aspect-square rounded-[var(--radius-2xl)] border border-border-1 bg-bg-muted/50 overflow-hidden flex flex-col items-center justify-center group">
      <div className="absolute inset-0 mesh-card opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      
      {/* ASCII Art Overlay */}
      <motion.pre 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="font-mono text-[6px] leading-[1] text-cyan/40 select-none pointer-events-none"
      >
        {ascii}
      </motion.pre>

      <div className="relative z-10 mt-8 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan/60 mb-2 block">
          Biometric Scan
        </span>
        <h3 className="font-display text-lg font-bold text-text-0">Mathisha Angirasa</h3>
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent w-full" />
      </div>
    </div>
  );
}
