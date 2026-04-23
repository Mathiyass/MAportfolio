"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Terminal, Cpu, Database, Code2, Layers, 
  LayoutPanelLeft, Activity, Brain, Bot, 
  Workflow, Zap, Sparkles, Network 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const arsenal = [
  {
    category: "AI & Neural Engineering",
    id: "SEC_AI_CORE",
    skills: [
      { name: "LLM Orchestration (Autogen/CrewAI)", level: 98, icon: <Brain size={16} /> },
      { name: "Agentic Systems & Swarms", level: 96, icon: <Bot size={16} /> },
      { name: "RAG Pipeline Engineering", level: 94, icon: <Database size={16} /> },
      { name: "Fine-tuning & Quantization", level: 90, icon: <Cpu size={16} /> },
      { name: "Neural Architectures (PyTorch)", level: 88, icon: <Network size={16} /> },
      { name: "Computer Vision (YOLO/OpenCV)", level: 85, icon: <Zap size={16} /> }
    ]
  },
  {
    category: "Core Frameworks",
    id: "SEC_CORE",
    skills: [
      { name: "Next.js 15 (App Router)", level: 98, icon: <LayoutPanelLeft size={16} /> },
      { name: "React 19 & Concurrent UI", level: 95, icon: <Code2 size={16} /> },
      { name: "TypeScript 5 (Strict Mode)", level: 94, icon: <Terminal size={16} /> }
    ]
  },
  {
    category: "Graphics & Simulation",
    id: "SEC_GRAPH",
    skills: [
      { name: "GLSL Shaders & GPGPU", level: 90, icon: <Sparkles size={16} /> },
      { name: "Three.js / R3F Scene Graph", level: 94, icon: <Layers size={16} /> },
      { name: "Framer Motion 11", level: 97, icon: <Activity size={16} /> }
    ]
  },
  {
    category: "System Logic",
    id: "SEC_SYS",
    skills: [
      { name: "FastAPI / Python 3.12", level: 95, icon: <Terminal size={16} /> },
      { name: "Node.js / Bun Runtime", level: 92, icon: <Zap size={16} /> },
      { name: "PostgreSQL / Vector DB", level: 90, icon: <Database size={16} /> }
    ]
  }
];

export default function SkillsPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32 relative">
        {/* Background Energy Mesh */}
        <div className="absolute inset-0 energy-mesh opacity-40 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24 relative z-10"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                SYSTEM // CATEGORIZATION // CAPABILITY_MATRIX
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 text-text-0 uppercase tracking-tight text-balance">
                Technical <br/>
                <span className="text-text-4 font-black tracking-tighter">// Arsenal.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                A granular analysis of technical proficiencies across the AI and engineering lifecycle. v12.0 capability secured.
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 relative z-10">
            {/* Proficiency Matrix (Main Column) */}
            <div className="lg:col-span-8 space-y-20">
                {arsenal.map((group, i) => (
                    <motion.div 
                        key={group.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="font-display font-bold text-2xl text-text-0 uppercase tracking-widest">{group.category}</h2>
                            <span className="font-mono text-[10px] text-text-4 uppercase tracking-[0.3em]">{group.id}</span>
                        </div>

                        <div className="grid gap-6">
                            {group.skills.map((skill) => (
                                <Card key={skill.name} variant="glass" className="p-8 relative overflow-hidden group border-white/5 hover:border-cyan/30 transition-all duration-500 bg-[#0F131C]/60 backdrop-blur-xl">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    {/* Technical Accents */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-cyan/50 transition-colors" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyan/50 transition-colors" />
                                    
                                    <div className="space-y-6 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2.5 rounded-lg bg-cyan/10 text-cyan border border-cyan/20 group-hover:bg-cyan/30 group-hover:scale-110 transition-all duration-300">
                                                    {skill.icon}
                                                </div>
                                                <h3 className="font-display font-bold text-lg lg:text-xl text-text-1 group-hover:text-text-0 transition-colors">{skill.name}</h3>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="font-mono text-sm text-cyan font-bold tabular-nums drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
                                                    {skill.level}%
                                                </span>
                                                <span className="text-[8px] font-mono text-text-4 uppercase tracking-tighter opacity-50">Mastery_Index</span>
                                            </div>
                                        </div>

                                         <div className="relative h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]">
                                            {/* Progress Bar Container */}
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                                className="relative h-full bg-gradient-to-r from-cyan/40 via-cyan to-white/90 rounded-full"
                                            >
                                                {/* Pulsing Core */}
                                                <div className="absolute inset-0 bg-cyan shadow-[0_0_20px_rgba(0,240,255,0.6)]" />
                                                
                                                {/* Active Scanline */}
                                                <motion.div 
                                                    animate={{ x: ["-100%", "300%"] }}
                                                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                                    className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                                                />
                                                
                                                {/* Glow Tip */}
                                                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white shadow-[0_0_15px_#fff] z-20" />
                                            </motion.div>
                                        </div>

                                        {/* Technical Metadata Footer */}
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-mono text-[7px] text-text-4 uppercase tracking-[0.2em] opacity-60 italic">
                                                STATUS__{skill.level > 90 ? "SUPERIOR" : "NOMINAL"} // VERIFIED_V12
                                            </span>
                                            <div className="flex gap-1.5">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(dot => (
                                                    <div 
                                                        key={dot} 
                                                        className={cn(
                                                            "size-1 rounded-full transition-all duration-700", 
                                                            dot <= Math.round(skill.level/12.5) 
                                                                ? "bg-cyan shadow-[0_0_5px_rgba(0,240,255,0.8)] scale-110" 
                                                                : "bg-white/10"
                                                        )} 
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Side Intel Column */}
            <div className="lg:col-span-4 space-y-8">
                <Card variant="glass-light" className="p-8 sticky top-32 border-cyan/20 glass-refraction shadow-[0_0_30px_rgba(0,240,255,0.05)] hover:shadow-[0_0_40px_rgba(0,240,255,0.1)] transition-all bg-[#0F131C]/40">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan mb-8 flex items-center gap-2">
                        <Activity size={10} className="animate-pulse" />
                        System Diagnostics
                    </h3>
                    <div className="space-y-6">
                        {[
                            { label: "Neural Engine", value: "Optimal", color: "text-cyan" },
                            { label: "Agentic Arch", value: "Unified", color: "text-text-1" },
                            { label: "SIVION Sync", value: "Active", color: "text-cyan" },
                            { label: "Cognitive Load", value: "0.04%", color: "text-text-3" }
                        ].map((stat) => (
                            <div key={stat.label} className="flex justify-between items-center">
                                <span className="text-xs text-text-3 font-body">{stat.label}</span>
                                <span className={cn("font-mono text-[10px] uppercase tracking-widest font-bold", stat.color)}>{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 space-y-4">
                        <div className="p-4 rounded-lg bg-black/40 border border-white/5 font-mono text-[8px] text-text-4 leading-relaxed">
                            <span className="text-cyan block mb-2">&gt;&gt; CORE_DIRECTIVE:</span>
                            ENGINEERING_HIGH_FIDELITY_AI_ECOSYSTEMS_THROUGH_AGENTIC_SYNERGY.
                        </div>
                        <Button variant="ghost" size="sm" className="w-full h-12 gap-2 text-[10px] uppercase tracking-widest border border-white/10 hover:border-cyan/30 group transition-all">
                            <Zap size={12} className="group-hover:text-cyan transition-colors" />
                            INITIALIZE_SYSTEM_REPORT
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
      </section>
    </PageWrapper>
  );
}
