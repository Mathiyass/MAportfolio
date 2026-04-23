"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Maximize2, Image as ImageIcon, Terminal, Cpu, Activity, Share2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const images = [
  {
    title: "QUANTUM FLUX MESH",
    id: "N-8472.A",
    description: "Procedural generation using sub-pixel sampling. Real-time vertex manipulation enabled.",
    stability: 94.2,
    category: "GALLERY",
    type: "FEATURE"
  },
  {
    title: "CORE MAINFRAME",
    id: "X-9921.V",
    description: "High-density logic gate array visualizer. Mapping neural pathways to GLSL fragments.",
    stability: 88.5,
    category: "LOGIC",
    type: "VERTICAL"
  },
  {
    title: "VOID SPHERE",
    id: "T-100.S",
    description: "Telemetric analysis of non-Euclidean geometry in browser-based 3D environments.",
    stability: 99.1,
    category: "SYSTEM",
    type: "SQUARE"
  }
];

export default function GalleryPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] tracking-[0.3em] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                SYSTEM // CATEGORIZATION // VISUAL_NEXUS
            </div>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter">
                Visual <br/>
                <span className="text-text-4 font-black tracking-tighter">// Nexus.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Creative Singularity framework initialized. Displaying high-fidelity artifacts and sub-pixel renders from the neural archive.
            </p>
        </motion.div>

        {/* Technical Ticker (Local) */}
        <div className="w-full bg-bg-muted border border-white/5 py-3 px-6 rounded-lg mb-12 flex items-center gap-6 overflow-hidden">
            <Cpu size={16} className="text-cyan shrink-0" />
            <div className="flex whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-cyan/70 uppercase animate-ticker">
                <span className="mx-8">CREATIVE PROCESSING: STABLE</span>
                <span className="mx-8">ASSET TELEMETRY: REAL-TIME</span>
                <span className="mx-8">NEURAL RENDERING ENGINE: ONLINE</span>
                <span className="mx-8">SHADER COMPILATION: COMPLETE</span>
                <span className="mx-8">DATA THROUGHPUT: 1.4TB/s</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[350px]">
            {images.map((img, i) => (
                <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className={cn(
                        "relative",
                        img.type === "FEATURE" ? "md:col-span-8 md:row-span-2" : "md:col-span-4",
                        img.type === "VERTICAL" ? "md:row-span-2" : ""
                    )}
                >
                    <Card variant="glass" className="h-full group border-white/5 hover:border-cyan/30 transition-all flex flex-col overflow-hidden relative">
                        {/* Power Rail */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                        
                        <div className="relative flex-1 overflow-hidden bg-bg-base">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-105 transition-transform duration-1000">
                                <ImageIcon size={img.type === "FEATURE" ? 120 : 64} />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent opacity-80" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-cyan/10 backdrop-blur-sm pointer-events-none">
                                <Maximize2 className="text-cyan" size={32} />
                            </div>

                            {/* Internal ID Label */}
                            <div className="absolute top-6 left-6 z-10">
                                <span className="px-3 py-1 rounded bg-bg-muted/80 backdrop-blur-md border border-white/10 font-mono text-[9px] text-cyan tracking-[0.2em]">ID: {img.id}</span>
                            </div>
                        </div>
                        
                        <div className="p-8 mt-auto relative z-10 bg-bg-muted/40 backdrop-blur-xl border-t border-white/5">
                            <h3 className={cn(
                                "font-display font-bold text-text-0 group-hover:text-cyan transition-colors mb-2",
                                img.type === "FEATURE" ? "text-3xl" : "text-xl"
                            )}>{img.title}</h3>
                            <p className="text-sm text-text-3 font-body leading-relaxed line-clamp-2">{img.description}</p>
                            
                            {/* Stability Bar */}
                            <div className="mt-8 space-y-2">
                                <div className="flex justify-between font-mono text-[8px] tracking-widest text-text-4">
                                    <span>RENDER STABILITY</span>
                                    <span className="text-cyan">{img.stability}%</span>
                                </div>
                                <div className="w-full h-1 bg-bg-base rounded-full overflow-hidden border border-white/5">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${img.stability}%` }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-cyan shadow-[0_0_10px_#00f0ff]"
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}

            {/* Terminal Block Asset */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="md:col-span-4 h-full"
            >
                <Card variant="glass" className="p-8 h-full border-white/5 flex flex-col justify-between bg-bg-base/40">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-text-4" />
                            <div className="w-2.5 h-2.5 rounded-full bg-cyan/80 animate-pulse shadow-[0_0_8px_#00f0ff]" />
                        </div>
                        <span className="font-mono text-[10px] text-text-4 uppercase tracking-[0.2em]">SYS_LOG</span>
                    </div>
                    <div className="font-mono text-[11px] text-cyan/80 leading-loose flex flex-col justify-end mt-8">
                        <p className="flex gap-2"><span className="opacity-40">&gt;</span> INITIATING RENDER SEQUENCE...</p>
                        <p className="flex gap-2"><span className="opacity-40">&gt;</span> ALLOCATING NEURAL NODES [4096]</p>
                        <p className="flex gap-2"><span className="opacity-40">&gt;</span> SHADER COMPILATION: SUCCESS</p>
                        <p className="flex gap-2"><span className="opacity-40">&gt;</span> <span className="animate-pulse">_</span></p>
                    </div>
                </Card>
            </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
