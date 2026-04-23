"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Search } from 'lucide-react';

const events = [
  {
    year: "2025",
    title: "Project Nexus Prime",
    role: "Lead Architect",
    id: "LOG_EVENT_25_01",
    description: "Architecting the v12.0 portfolio ecosystem with 16 WebGL shaders and Next.js 15."
  },
  {
    year: "2024",
    title: "Android Native Engine",
    role: "System Engineer",
    id: "LOG_EVENT_24_02",
    description: "Developed a custom UI framework for high-performance Android applications using Kotlin."
  },
  {
    year: "2023",
    title: "AI UI Research",
    role: "Frontend Specialist",
    id: "LOG_EVENT_23_03",
    description: "Initial exploration into AI-driven contextual prompting and generative design patterns."
  }
];

export default function TimelinePage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        {/* Header Protocol */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-32"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                <Search size={14} />
                SYSTEM {'//'} CATEGORIZATION {'//'} JOURNEY_PROTOCOL
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-12 text-text-0 uppercase tracking-tighter leading-none">
                Identity <br/>
                <span className="text-text-4 font-black tracking-tighter">{'//'} Timeline.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                A linear record of architectural milestones, career developments, and system deployments. v12.0 trajectory verified.
            </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative px-4">
            {/* Vertical Line (Stitch Style) */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/5 overflow-hidden">
                <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 2, ease: "circInOut" }}
                    className="w-full bg-gradient-to-b from-cyan via-red to-transparent opacity-40"
                />
            </div>

            <div className="space-y-32">
                {events.map((event, i) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className={`flex flex-col md:flex-row gap-12 md:gap-0 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Timeline Node with Pulse */}
                        <div className="absolute left-[-6px] md:left-1/2 md:ml-[-6px] z-20">
                            <div className="w-3 h-3 rounded-full bg-bg-base border-2 border-cyan shadow-[0_0_15px_#00f0ff]" />
                            <div className="absolute inset-0 w-full h-full rounded-full bg-cyan animate-ping opacity-20" />
                        </div>

                        {/* Content Card */}
                        <div className="md:w-1/2 md:px-20 w-full">
                            <Card variant="glass" className="p-10 group hover:border-cyan/30 transition-all relative overflow-hidden">
                                {/* Power Rail */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="flex justify-between items-start mb-8">
                                    <span className="font-display font-black text-4xl text-white/10 group-hover:text-cyan/20 transition-colors">{event.year}</span>
                                    <span className="font-mono text-[9px] text-text-4 uppercase tracking-[0.3em] bg-white/5 px-2 py-1 rounded">{event.id}</span>
                                </div>

                                <h3 className="text-3xl font-display font-bold text-text-0 group-hover:text-cyan transition-colors mb-2 uppercase tracking-tight">{event.title}</h3>
                                <p className="font-mono text-[10px] text-text-3 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                                    <div className="size-1 rounded-full bg-red" />
                                    {event.role}
                                </p>
                                
                                <p className="text-base text-text-2 font-body leading-relaxed">{event.description}</p>
                                
                                <div className="mt-10 flex items-center gap-3 pt-8 border-t border-white/5">
                                    <CheckCircle2 size={14} className="text-cyan opacity-60" />
                                    <span className="font-mono text-[9px] text-text-4 uppercase tracking-[0.4em]">Checkpoint_Verified</span>
                                </div>
                            </Card>
                        </div>

                        {/* Spacer Label for Desktop */}
                        <div className="md:w-1/2 hidden md:flex flex-col items-center justify-center gap-4 opacity-20">
                             <div className="h-px w-32 bg-white/10" />
                             <span className="font-mono text-[8px] uppercase tracking-[1em] text-text-4">{event.id}</span>
                             <div className="h-px w-32 bg-white/10" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-48 p-12 rounded-[var(--radius-2xl)] border border-white/5 bg-bg-muted/10 text-center relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent pointer-events-none" />
            <h4 className="font-display font-bold text-2xl text-text-0 uppercase tracking-tight mb-4">Continuing Trajectory</h4>
            <p className="text-text-3 font-body text-sm max-w-xl mx-auto leading-relaxed">System history is preserved. Future nodes are currently in a state of high-frequency generation.</p>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
