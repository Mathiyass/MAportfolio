"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Beaker, Wind, Zap, Cpu, Atom, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experiments = [
  {
    title: "Quantum Noise Field",
    id: "LAB_EXT_01",
    tech: "GLSL / WebGL2",
    description: "Simulating sub-atomic particle movement using recursive noise functions and vertex distortion.",
    status: "UNSTABLE",
    icon: <Wind size={20} />
  },
  {
    title: "Neural IK Solver",
    id: "LAB_EXT_02",
    tech: "GSAP / Math",
    description: "Inverse Kinematics implementation for fluid character movement based on mouse acceleration vectors.",
    status: "TESTING",
    icon: <Atom size={20} />
  },
  {
    title: "Glass Refraction v4",
    id: "LAB_EXT_03",
    tech: "Tailwind / CSS",
    description: "High-performance backdrop filter orchestration with minimal paint-cost overhead.",
    status: "STABLE",
    icon: <Sparkles size={20} />
  }
];

export default function LabPage() {
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
            <div className="flex items-center gap-3 text-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                <Beaker size={14} />
                SYSTEM // CATEGORIZATION // EXPERIMENTAL_LAB
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter leading-none">
                The <br/>
                <span className="text-text-4 font-black tracking-tighter">{'//'} Lab.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                A high-frequency testing ground for unstable prototypes, shader optimizations, and architectural anomalies. 
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((exp, i) => (
                <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                    <Card variant="glass" className="p-8 h-full flex flex-col group hover:border-red/30 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Cpu size={80} className="text-red" />
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <div className="p-3 rounded-xl bg-red/10 text-red">
                                {exp.icon}
                            </div>
                            <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{exp.id}</span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-text-0 mb-2 group-hover:text-red transition-colors uppercase tracking-tight">{exp.title}</h3>
                        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.2em] mb-6 block">{exp.tech}</span>
                        <p className="text-sm text-text-2 font-body leading-relaxed mb-8 flex-grow">{exp.description}</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <div className={`size-1.5 rounded-full animate-pulse ${exp.status === 'STABLE' ? 'bg-cyan' : 'bg-red'}`} />
                                <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{exp.status}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 px-3 text-[9px] uppercase tracking-widest border border-white/5 hover:bg-white/5">
                                Initialize
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-12 rounded-[var(--radius-2xl)] border border-dashed border-white/10 bg-bg-muted/10 text-center"
        >
            <Zap className="mx-auto mb-6 text-text-4" size={32} />
            <h4 className="font-display font-bold text-xl text-text-1 uppercase tracking-wider mb-2">Neural Link Pending</h4>
            <p className="text-text-3 font-body text-sm">Synchronizing additional experimental data from the edge nodes.</p>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
