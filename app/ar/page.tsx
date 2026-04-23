"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Box, Scan, Zap } from 'lucide-react';

const arModules = [
  {
    title: "Voxel Engine",
    description: "Real-time spatial mapping using WebXR and custom voxel tessellation algorithms.",
    status: "BETA",
    tech: "WebGL2 / XR"
  },
  {
    title: "Neural Marker Tracking",
    description: "Deep learning based image marker recognition for stable object anchoring.",
    status: "RESEARCH",
    tech: "TensorFlow.js"
  },
  {
    title: "Atmospheric Occlusion",
    description: "Advanced depth-sensing integration for realistic virtual object interactions.",
    status: "STABLE",
    tech: "R3F / Drei"
  }
];

export default function ARPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
                <Scan size={14} />
                SPATIAL COMPUTING
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter leading-none">
                AR <span className="gradient-text">Studio</span>.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Augmented reality modules and spatial experiments bridging the gap between digital systems and the physical world.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {arModules.map((mod, i) => (
                <motion.div
                    key={mod.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                    <Card variant="glass" className="p-8 group hover:border-cyan/30 transition-all relative overflow-hidden h-full flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                            <Scan size={80} className="text-cyan" />
                        </div>
                        
                        <div className="flex items-center justify-between mb-8">
                            <div className="p-3 rounded-xl bg-cyan/10 text-cyan">
                                <Box size={24} />
                            </div>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-text-0 mb-3 group-hover:text-cyan transition-colors uppercase tracking-tight">{mod.title}</h3>
                        <p className="text-sm text-text-2 font-body leading-relaxed mb-8 flex-grow">{mod.description}</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <span className="font-mono text-[10px] text-cyan uppercase tracking-widest flex items-center gap-2">
                                <Zap size={10} /> {mod.tech}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[8px] text-text-3 uppercase">
                                {mod.status}
                            </span>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
      </section>
    </PageWrapper>
  );
}
