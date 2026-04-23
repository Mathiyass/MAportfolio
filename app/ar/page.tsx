"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Box, Scan, Zap } from 'lucide-react';

const arModules = [
  {
    title: "Voxel Engine Alpha",
    id: "MOD_01_VOXEL",
    description: "Real-time spatial mapping using WebXR and custom voxel tessellation algorithms.",
    status: "Beta",
    tech: "WebGL2 / XR"
  },
  {
    title: "Neural Marker tracking",
    id: "MOD_02_NEURAL",
    description: "Deep learning based image marker recognition for stable object anchoring.",
    status: "Research",
    tech: "TensorFlow.js"
  },
  {
    title: "Atmospheric Occlusion",
    id: "MOD_03_OCCLUSION",
    description: "Advanced depth-sensing integration for realistic virtual object interactions.",
    status: "Stable",
    tech: "R3F / Drei"
  }
];

export default function ARPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                Spatial Computing
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-12 text-text-0">
                AR <span className="gradient-text">Studio</span>.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Augmented reality modules and spatial experiments bridging the gap between digital logic and physical reality.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {arModules.map((mod, i) => (
                <motion.div
                    key={mod.id}
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
                            <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{mod.id}</span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-text-0 mb-3 group-hover:text-cyan transition-colors">{mod.title}</h3>
                        <p className="text-sm text-text-2 font-body leading-relaxed mb-8 flex-grow">{mod.description}</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <span className="font-mono text-[10px] text-cyan uppercase tracking-widest flex items-center gap-2">
                                <Zap size={10} /> {mod.tech}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[8px] text-text-3 uppercase tracking-tighter">
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
