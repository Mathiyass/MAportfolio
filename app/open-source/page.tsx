"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star, GitFork, Cpu, Activity, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ossProjects = [
  {
    title: "Killer Quebes",
    id: "OSS_NODE_01",
    stars: "12.4k",
    forks: "1.2k",
    lang: "TypeScript",
    description: "High-dimensional state management container for distributed UI nodes."
  },
  {
    title: "Neural Mesh",
    id: "OSS_NODE_02",
    stars: "8.9k",
    forks: "842",
    lang: "Rust",
    description: "Peer-to-peer event bus with probabilistic routing algorithms."
  },
  {
    title: "Nexus Protocol",
    id: "OSS_NODE_03",
    stars: "21.1k",
    forks: "3.4k",
    lang: "Solidity",
    description: "Zero-knowledge proof verification layer for cross-chain communications."
  }
];

export default function OpenSourcePage() {
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
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                <Globe size={14} />
                SYSTEM {'//'} CATEGORIZATION {'//'} SINGULARITY_OS
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter leading-none">
                Open <br/>
                <span className="text-text-4 font-black tracking-tighter">{'//'} Source.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Next-generation distributed infrastructure powering the Mathiya ecosystem. High-performance, fault-tolerant, and radically open.
            </p>
        </motion.div>

        {/* Contribution Matrix (Stitch Pattern) */}
        <Card variant="glass" className="p-10 mb-12 relative overflow-hidden group min-h-[400px] flex flex-col">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={160} className="text-cyan" />
            </div>
            
            <div className="flex justify-between items-start mb-12 z-10">
                <div>
                    <h2 className="font-display text-2xl font-bold text-text-0 uppercase tracking-tight">Global Contribution Matrix</h2>
                    <p className="font-mono text-[10px] text-text-4 uppercase tracking-[0.2em] mt-1">REAL-TIME ARCHIVAL TELEMETRY</p>
                </div>
                <div className="flex gap-4 font-mono text-[10px]">
                    <span className="px-3 py-1 bg-cyan/10 text-cyan rounded border border-cyan/20 animate-pulse">LIVE</span>
                    <span className="px-3 py-1 bg-white/5 text-text-3 rounded border border-white/5">72.4k REQ/S</span>
                </div>
            </div>

            <div className="flex-grow flex items-end gap-2 md:gap-4 z-10 px-2 h-48">
                {[20, 45, 30, 70, 95, 50, 25, 60, 85, 40, 65, 35].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/5 rounded-t-md relative group/bar hover:bg-white/10 transition-all cursor-crosshair h-full overflow-hidden">
                        <motion.div 
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.05, ease: "circOut" }}
                            className={cn(
                                "absolute bottom-0 w-full rounded-t-md border-t-2",
                                h > 90 ? "bg-cyan/20 border-cyan shadow-[0_0_15px_#00f4fe]" : "bg-cyan/10 border-cyan/40"
                            )}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between font-mono text-[8px] text-text-4 mt-6 uppercase tracking-[0.2em]">
                <span>T-12H</span>
                <span>T-6H</span>
                <span>NODE_SYNC_READY</span>
            </div>

            {/* Terminal Overlay */}
            <div className="absolute bottom-6 left-10 right-10 h-24 bg-bg-base/60 backdrop-blur-xl border border-white/5 rounded-xl p-4 font-mono text-[10px] flex flex-col gap-1 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="text-text-4">&gt; <span className="text-cyan">tail -f /var/log/singularity/nodes.log</span></div>
                <div className="text-text-3">[14:32:01] Node eu-west-1a synced block #8921044</div>
                <div className="text-text-3">[14:32:02] <span className="text-red">WARN</span>: Peer connection timeout (id: 0x8f...)</div>
                <div className="text-text-2">Consensus reached. Validating payload...</div>
            </div>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ossProjects.map((project, i) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Card variant="glass" className="p-8 h-full flex flex-col group hover:border-cyan/30 transition-all relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-cyan/5 rounded-full blur-3xl group-hover:bg-cyan/10 transition-all" />
                        
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Cpu className="text-cyan" size={20} />
                                <h3 className="font-display font-bold text-xl text-text-0 uppercase tracking-tight">{project.title}</h3>
                            </div>
                            <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{project.id}</span>
                        </div>

                        <p className="text-sm text-text-3 font-body leading-relaxed mb-8 flex-grow">{project.description}</p>
                        
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex gap-4 font-mono text-[10px]">
                                <div className="flex items-center gap-1.5 text-text-2">
                                    <Star size={12} className="text-red fill-red" /> {project.stars}
                                </div>
                                <div className="flex items-center gap-1.5 text-text-2">
                                    <GitFork size={12} className="text-cyan" /> {project.forks}
                                </div>
                            </div>
                            <span className="text-text-4 font-mono text-[9px] uppercase tracking-widest">{project.lang}</span>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>

        <div className="mt-24 flex justify-center">
            <Button variant="secondary" className="h-16 px-12 rounded-full border-cyan/20 glass hover:border-cyan/50 hover:bg-cyan/5 group transition-all">
                <span className="font-display font-bold text-sm tracking-widest uppercase text-cyan group-hover:text-text-0 transition-colors">Initialize Local Node</span>
                <ArrowRight size={16} className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Button>
        </div>
      </section>
    </PageWrapper>
  );
}
