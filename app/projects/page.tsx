"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { projects } from '@/lib/projects';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Layers } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        {/* Header Protocol */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
                <Layers size={14} />
                SYSTEM {'//'} CATEGORIZATION {'//'} NEXUS_FORGE
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter">
                Project <br/>
                <span className="text-text-4 font-black tracking-tighter">{'//'} Archive.</span>
            </h1>
            
            <div className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#00f0ff]" />
                    <span className="font-mono text-[9px] text-text-2 uppercase tracking-widest">Core Architecture</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
                    <span className="font-mono text-[9px] text-text-2 uppercase tracking-widest">Experimental Node</span>
                </div>
                <div className="flex items-center gap-3 opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-4" />
                    <span className="font-mono text-[9px] text-text-2 uppercase tracking-widest">Legacy Systems</span>
                </div>
            </div>
        </motion.div>

        {/* System Telemetry Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
                { label: "Rendering", value: "144 FPS", color: "text-cyan" },
                { label: "Memory", value: "Optimal", color: "text-text-1" },
                { label: "Engine", value: "Core v2.4", color: "text-red" },
                { label: "Link", value: "Secured", color: "text-cyan" }
            ].map((stat) => (
                <Card key={stat.label} variant="glass-light" className="p-4 flex flex-col gap-1 border-white/5">
                    <span className="font-mono text-[8px] text-text-4 uppercase tracking-[0.2em]">{stat.label}</span>
                    <span className={cn("font-display font-bold text-sm uppercase", stat.color)}>{stat.value}</span>
                </Card>
            ))}
        </div>

        {/* Luminous Monolith Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[400px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative",
                i % 3 === 0 ? "md:col-span-8" : "md:col-span-4"
              )}
            >
              <Card variant="glass" className="h-full group/card-item cursor-pointer overflow-hidden relative">
                {/* Power Rail */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan to-transparent opacity-0 group-hover/card-item:opacity-100 transition-opacity duration-500 z-30" />
                
                <Link href={project.link} className="flex flex-col h-full relative z-10">
                    <div className="relative aspect-[21/9] md:aspect-auto md:flex-1 bg-bg-base overflow-hidden border-b border-white/5">
                        {/* Holographic Mesh Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[length:20px_20px] opacity-40 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-red/5 opacity-0 group-hover/card-item:opacity-100 transition-opacity duration-700 z-0" />
                        
                        <div className="absolute inset-0 flex items-center justify-center font-display text-text-4 text-[10vw] font-black opacity-5 group-hover/card-item:scale-110 group-hover/card-item:opacity-10 transition-all duration-1000 select-none">
                            {project.id.toUpperCase()}
                        </div>

                        {/* ID Label (Stitch Style) */}
                        <div className="absolute top-8 left-8 z-20">
                            <span className="px-3 py-1.5 rounded-lg bg-bg-muted/80 backdrop-blur-xl border border-white/10 font-mono text-[9px] text-cyan tracking-[0.3em] uppercase">SYSTEM_ARCH {'//'} {project.id}</span>
                        </div>

                        <div className="absolute top-8 right-8 z-20">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan opacity-0 group-hover/card-item:opacity-100 translate-x-4 group-hover/card-item:translate-x-0 transition-all duration-500">
                                <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Initialize</span>
                                <ArrowUpRight size={12} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-10 flex flex-col bg-bg-muted/30 backdrop-blur-xl">
                        <div className="flex gap-3 flex-wrap mb-8">
                            {project.tech.map(tag => (
                                <span key={tag} className="font-mono text-[8px] text-text-3 uppercase tracking-widest px-2 py-0.5 border border-white/5 rounded bg-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-4 text-text-0 group-hover/card-item:text-cyan transition-colors tracking-tight">
                            {project.title}
                        </h3>
                        <p className="text-text-2 font-body text-base leading-relaxed line-clamp-2 max-w-2xl">
                            {project.description}
                        </p>
                    </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
