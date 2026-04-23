'use client';

import { motion } from 'framer-motion';

const items = [
  "/// STATUS: OPTIMAL ///",
  "NODE.JS V20.x INTEGRATED",
  "///",
  "TAILWIND V4 COMPILER ACTIVE",
  "///",
  "WEBGL CONTEXT SECURED",
  "///",
  "LATENCY: 0.002ms",
  "///",
  "NEURAL_LINK: STABLE",
  "///",
  "MEMORY_CORE: NOMINAL",
  "///"
];

export function TechnicalTicker() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-muted/90 backdrop-blur-md border-t border-white/5 py-2 overflow-hidden z-nav">
      <motion.div 
        className="flex whitespace-nowrap font-mono text-[9px] tracking-[0.3em] text-cyan uppercase opacity-60"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}
