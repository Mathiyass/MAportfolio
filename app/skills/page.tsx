"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Terminal, Cpu, Database, Code2, Layers, LayoutPanelLeft, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const arsenal = [
  {
    category: "Core Frameworks",
    id: "SEC_CORE",
    skills: [
      { name: "Next.js 15", level: 98, icon: <LayoutPanelLeft size={16} /> },
      { name: "React 19", level: 95, icon: <Code2 size={16} /> },
      { name: "TypeScript 5", level: 92, icon: <Terminal size={16} /> }
    ]
  },
  {
    category: "Graphics & Simulation",
    id: "SEC_GRAPH",
    skills: [
      { name: "GLSL Shaders", level: 88, icon: <Cpu size={16} /> },
      { name: "Three.js / R3F", level: 94, icon: <Layers size={16} /> },
      { name: "Framer Motion", level: 97, icon: <Activity size={16} /> }
    ]
  },
  {
    category: "System Logic",
    id: "SEC_SYS",
    skills: [
      { name: "Kotlin / Android", level: 85, icon: <Cpu size={16} /> },
      { name: "Node.js / Bun", level: 90, icon: <Terminal size={16} /> },
      { name: "Supabase / SQL", level: 82, icon: <Database size={16} /> }
    ]
  }
];

export default function SkillsPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                SYSTEM // CATEGORIZATION // CAPABILITY_MATRIX
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 text-text-0 uppercase tracking-tight text-balance">
                Technical <br/>
                <span className="text-text-4 font-black tracking-tighter">// Arsenal.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                A granular analysis of technical proficiencies across the engineering lifecycle. v12.0 capability secured.
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">
            {/* Proficiency Matrix (Main Column) */}
            <div className="lg:col-span-8 space-y-20">
                {arsenal.map((group, i) => (
                    <motion.div 
                        key={group.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <h2 className="font-display font-bold text-2xl text-text-0 uppercase tracking-widest">{group.category}</h2>
                            <span className="font-mono text-[10px] text-text-4 uppercase tracking-[0.3em]">{group.id}</span>
                        </div>

                        <div className="grid gap-6">
                            {group.skills.map((skill) => (
                                <Card key={skill.name} variant="glass" className="p-8 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    
                                    <div className="flex flex-col gap-6 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 rounded bg-cyan/10 text-cyan">
                                                    {skill.icon}
                                                </div>
                                                <h3 className="font-display font-bold text-xl text-text-1">{skill.name}</h3>
                                            </div>
                                            <span className="font-mono text-sm text-cyan font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]">{skill.level}%</span>
                                        </div>

                                        <div className="w-full h-1 bg-bg-base rounded-full overflow-hidden border border-white/5">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                                className="h-full bg-cyan shadow-[0_0_15px_#00f0ff]"
                                            />
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
                <Card variant="glass-light" className="p-8 sticky top-32 border-cyan/20">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan mb-8">System Diagnostics</h3>
                    <div className="space-y-6">
                        {[
                            { label: "Compiler", value: "Optimal", color: "text-cyan" },
                            { label: "Architecture", value: "Unified", color: "text-text-1" },
                            { label: "Deployment", value: "Green", color: "text-red" },
                            { label: "Cognitive Load", value: "Nominal", color: "text-cyan" }
                        ].map((stat) => (
                            <div key={stat.label} className="flex justify-between items-center">
                                <span className="text-xs text-text-3 font-body">{stat.label}</span>
                                <span className={cn("font-mono text-[10px] uppercase tracking-widest font-bold", stat.color)}>{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5">
                        <Button variant="ghost" size="sm" className="w-full h-12 gap-2 text-[10px] uppercase tracking-widest border border-white/5 hover:border-cyan/30">
                            INITIALIZE_OVERRIDE
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
      </section>
    </PageWrapper>
  );
}
