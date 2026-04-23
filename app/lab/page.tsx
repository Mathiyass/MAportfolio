"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Beaker, Cpu, Atom, Sparkles, Zap, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const experiments = [
  {
    title: "Quantum Noise Field",
    tech: "GLSL / WebGL2",
    description: "Simulating sub-atomic particle movement using recursive noise functions and vertex distortion.",
    status: "UNSTABLE",
    cpu: 14,
    stability: 68,
    icon: <Atom size={20} />
  },
  {
    title: "IK Solver v2.1",
    tech: "GSAP / Math",
    description: "Inverse Kinematics implementation for fluid character movement based on mouse acceleration vectors.",
    status: "TESTING",
    cpu: 8,
    stability: 92,
    icon: <Sparkles size={20} />
  },
  {
    title: "Glass Refraction",
    tech: "Tailwind / CSS",
    description: "High-performance backdrop filter orchestration with minimal paint-cost overhead.",
    status: "STABLE",
    cpu: 2,
    stability: 99,
    icon: <Zap size={20} />
  }
];

export default function LabPage() {
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
            <div className="flex items-center gap-3 text-red font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                <Beaker size={14} className="animate-pulse" />
                SYSTEM // EXPERIMENTAL_LAB // ALPHA_v12.2
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter leading-none">
                The <br/>
                <span className="text-red font-black tracking-tighter italic">// Lab.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                A high-fidelity testing ground for procedural prototypes, shader optimizations, and neural architecture experiments.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((exp, i) => (
                <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                    <Card variant="glass" className="p-8 h-full flex flex-col group hover:border-red/30 transition-all relative overflow-hidden">
                        {/* Status Rail */}
                        <div className={`absolute top-0 left-0 w-full h-[2px] ${exp.status === 'STABLE' ? 'bg-cyan/30' : 'bg-red/30'} opacity-50`} />
                        
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                            <Cpu size={80} className="text-red" />
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <div className="p-3 rounded-xl bg-red/10 text-red border border-red/20 shadow-[0_0_15px_rgba(255,82,92,0.1)]">
                                {exp.icon}
                            </div>
                            <div className="text-right">
                                <div className="text-[8px] font-mono text-text-4 tracking-widest uppercase mb-1">Compute Load</div>
                                <div className="text-xs font-stat text-red">{exp.cpu}%</div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-text-0 mb-2 group-hover:text-red transition-colors uppercase tracking-tight italic">{exp.title}</h3>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-text-3 uppercase tracking-widest border border-white/5">{exp.tech}</span>
                        </div>
                        
                        <p className="text-sm text-text-2 font-body leading-relaxed mb-8 flex-grow opacity-80 group-hover:opacity-100 transition-opacity">{exp.description}</p>
                        
                        {/* Metrics */}
                        <div className="mb-8 space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-[8px] font-mono text-text-4 tracking-[0.2em]">NEURAL_STABILITY</span>
                                <span className="text-[10px] font-stat text-text-2">{exp.stability}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${exp.stability}%` }}
                                    className={`h-full ${exp.stability > 90 ? 'bg-cyan' : 'bg-red'}`}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <Activity size={10} className={exp.status === 'STABLE' ? 'text-cyan' : 'text-red'} />
                                <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{exp.status}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 px-4 text-[9px] uppercase tracking-widest border border-white/5 hover:bg-red/10 hover:text-red hover:border-red/20 transition-all">
                                ACCESS_CORE
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
      </section>
    </PageWrapper>
  );
}