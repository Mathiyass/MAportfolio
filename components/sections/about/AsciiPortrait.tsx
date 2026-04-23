"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function AsciiPortrait() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="relative aspect-[4/5] rounded-[var(--radius-2xl)] border border-border-1 bg-bg-muted/50 overflow-hidden flex flex-col items-center justify-center group">
      {/* Background Mesh */}
      <div className="absolute inset-0 mesh-card opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      
      {/* Profile Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/img/profile_photo/me.png"
          alt="Mathisha Angirasa"
          fill
          className={`object-cover transition-all duration-700 ${isLoaded ? 'opacity-70 grayscale-[0.5] group-hover:opacity-100 group-hover:grayscale-0 scale-100' : 'opacity-0 scale-110'}`}
          onLoad={() => setIsLoaded(true)}
        />
        {/* Scanline Effect Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,118,0.03))] z-10 pointer-events-none bg-[length:100%_4px,4px_100%]" />
        
        {/* Cyan Tint Overlay */}
        <div className="absolute inset-0 bg-cyan/5 mix-blend-color z-20 pointer-events-none" />
      </div>

      {/* Decorative Biometric Borders */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan" />
      </div>

      <div className="relative z-40 mt-auto w-full p-8 bg-gradient-to-t from-bg-base via-bg-base/80 to-transparent text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan/60 mb-2 block">
            Biometric ID: M_ANGIRASA
          </span>
          <h3 className="font-display text-xl font-bold text-text-0 tracking-tight">Mathisha Angirasa</h3>
        </motion.div>
      </div>

      {/* Animated Scan Line */}
      <motion.div 
        className="absolute left-0 right-0 h-px bg-cyan/50 z-50 shadow-[0_0_15px_rgba(0,240,255,0.5)]"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
