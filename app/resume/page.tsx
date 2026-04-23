"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { FileText, Download, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ResumePage() {
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
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                <FileText size={14} />
                PROFESSIONAL BACKGROUND
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter leading-none">
                Resume <br/>
                <span className="text-text-4 font-black tracking-tighter">// Manifest.</span>
            </h1>
            
            <div className="flex flex-wrap gap-6 mt-12 pt-12 border-t border-white/5">
                <Button variant="primary" className="h-14 px-8 gap-3 text-[10px] uppercase tracking-widest font-black shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                    <Download size={16} /> Download PDF
                </Button>
            </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-24">
                {/* Experience Section */}
                <section className="space-y-12">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                        <Briefcase className="text-cyan" size={20} />
                        <h2 className="font-display font-bold text-2xl text-text-0 uppercase tracking-widest">Experience</h2>
                    </div>
                    
                    <div className="space-y-16">
                        {[
                            {
                                title: "Lead Systems Architect",
                                company: "NEXUS PRIME",
                                period: "2024 — Present",
                                desc: "Orchestrating high-fidelity digital systems using Next.js 15 and React Three Fiber. Developed a modular UI framework with 60+ components.",
                                id: "EXP_01"
                            },
                            {
                                title: "Full Stack Engineer",
                                company: "TECH_LOGIC",
                                period: "2023 — 2024",
                                desc: "Architected distributed Node.js services and optimized GLSL rendering pipelines for immersive web experiences.",
                                id: "EXP_02"
                            }
                        ].map((exp) => (
                            <div key={exp.id} className="relative pl-10 border-l-2 border-white/5 group hover:border-cyan/30 transition-all">
                                <div className="absolute left-[-6px] top-0 size-2.5 rounded-full bg-bg-base border-2 border-text-4 group-hover:border-cyan transition-colors" />
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-text-0 uppercase tracking-tight">{exp.title}</h3>
                                        <p className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em] mt-1">{exp.company}</p>
                                    </div>
                                    <span className="font-mono text-[9px] text-text-4 bg-white/5 px-2 py-1 rounded">{exp.period}</span>
                                </div>
                                <p className="text-base text-text-2 font-body leading-relaxed max-w-2xl">{exp.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education Section */}
                <section className="space-y-12">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                        <GraduationCap className="text-red" size={20} />
                        <h2 className="font-display font-bold text-2xl text-text-0 uppercase tracking-widest">Education</h2>
                    </div>
                    
                    <div className="relative pl-10 border-l-2 border-white/5 group hover:border-red/30 transition-all">
                        <div className="absolute left-[-6px] top-0 size-2.5 rounded-full bg-bg-base border-2 border-text-4 group-hover:border-red transition-colors" />
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-text-0 uppercase tracking-tight">Software Engineering</h3>
                                <p className="font-mono text-[10px] text-red uppercase tracking-[0.2em] mt-1">Professional Institute</p>
                            </div>
                            <span className="font-mono text-[9px] text-text-4 bg-white/5 px-2 py-1 rounded">2022 — 2026</span>
                        </div>
                        <p className="text-base text-text-2 font-body leading-relaxed max-w-2xl">Specializing in high-performance web systems and interactive graphics architecture.</p>
                    </div>
                </section>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-4 space-y-8">
                <Card variant="glass" className="p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan to-transparent opacity-40" />
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan mb-8">Skill Matrix</h3>
                    <div className="space-y-6">
                        {[
                            { label: "Architecture", value: "95%" },
                            { label: "Engineering", value: "98%" },
                            { label: "Performance", value: "92%" },
                            { label: "Visuals", value: "90%" }
                        ].map((skill) => (
                            <div key={skill.label} className="space-y-2">
                                <div className="flex justify-between text-[9px] font-mono text-text-3 uppercase tracking-widest">
                                    <span>{skill.label}</span>
                                    <span className="text-cyan">{skill.value}</span>
                                </div>
                                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan shadow-[0_0_8px_#00f0ff]" style={{ width: skill.value }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card variant="glass-light" className="p-8 border-white/5 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <Award className="text-red" size={20} />
                        <h4 className="font-display font-bold text-lg text-text-1 uppercase tracking-tight">Achievements</h4>
                    </div>
                    <ul className="space-y-4 font-body text-sm text-text-3">
                        <li className="flex gap-3"><div className="size-1 rounded-full bg-red shrink-0 mt-2" /> System-wide production deployment.</li>
                        <li className="flex gap-3"><div className="size-1 rounded-full bg-red shrink-0 mt-2" /> High-performance graphics orchestration.</li>
                        <li className="flex gap-3"><div className="size-1 rounded-full bg-red shrink-0 mt-2" /> Distributed system architecture.</li>
                    </ul>
                </Card>
            </div>
        </div>
      </section>
    </PageWrapper>
  );
}
