"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { AsciiPortrait } from '@/components/sections/about/AsciiPortrait';
import { Timeline } from '@/components/sections/about/Timeline';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Target, Eye, Zap, Info, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        {/* Header Protocol restored */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-32"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
                <Info size={14} />
                SYSTEM // CATEGORIZATION // IDENTITY_PROTOCOL
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-12 text-text-0 tracking-tighter leading-none uppercase text-balance">
                MATHISHA<br/>
                <span className="text-text-4 font-black mix-blend-difference">// ANGIRASA.</span>
            </h1>
            
            <div className="flex items-center gap-6 pt-12 border-t border-white/5">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">Role</span>
                    <span className="text-cyan font-head font-bold text-sm tracking-wider uppercase">Systems Architect</span>
                </div>
                <div className="h-10 w-px bg-white/5" />
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">Location</span>
                    <span className="text-text-1 font-head font-bold text-sm tracking-wider uppercase">Sri Lanka // Node_01</span>
                </div>
                <div className="h-10 w-px bg-white/5" />
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">Clearance</span>
                    <span className="text-red font-head font-bold text-sm tracking-wider uppercase">Level 5 Alpha</span>
                </div>
            </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
          
          <div className="lg:col-span-7 space-y-32">
            <div className="space-y-12">
                <h2 className="text-2xl font-display font-bold text-text-0 uppercase tracking-widest flex items-center gap-4">
                    <span className="w-8 h-px bg-cyan/30" />
                    Biometric Summary
                </h2>
                <div className="space-y-8 font-body text-xl lg:text-2xl text-text-2 leading-relaxed max-w-2xl border-l-2 border-cyan/10 pl-10 py-2">
                    <p>
                        Dedicated <span className="text-text-0 font-semibold">Software Engineering Student</span> driven by the intersection of performance and aesthetics.
                    </p>
                    <p>
                        My focus lies in building scalable, production-grade applications that don&apos;t just function perfectly, but feel alive. From **Next.js** ecosystems to low-level **GLSL shaders**, I thrive on technical complexity.
                    </p>
                </div>
            </div>

            <div className="space-y-16">
                <h2 className="text-2xl font-display font-bold text-text-0 uppercase tracking-widest flex items-center gap-4">
                    <span className="w-8 h-px bg-red/30" />
                    Neural Timeline
                </h2>
                <Timeline />
            </div>
          </div>

          <div className="lg:col-span-5 sticky top-32 space-y-8">
            <div className="relative group">
                <div className="absolute -inset-4 bg-cyan/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <AsciiPortrait />
            </div>
            
            <Card variant="glass" className="p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red to-transparent opacity-40" />
                
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-4 mb-10">System Core Values</h3>
                <ul className="space-y-8">
                    {[
                        { label: "Precision Engineering", icon: <Target size={18} />, color: "text-cyan", desc: "Pixel-perfect logic execution." },
                        { label: "Intent-Driven Design", icon: <Zap size={18} />, color: "text-red", desc: "Purposeful atmospheric aesthetics." },
                        { label: "Radical Transparency", icon: <Eye size={18} />, color: "text-text-1", desc: "Zero-trust system architecture." }
                    ].map((value) => (
                        <li key={value.label} className="flex gap-6 group/item">
                            <div className={cn("shrink-0 p-3 rounded-xl bg-white/5 border border-white/5 transition-all group-hover/item:border-current group-hover/item:bg-white/10", value.color)}>
                                {value.icon}
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-text-0 text-lg group-hover/item:text-cyan transition-colors">{value.label}</h4>
                                <p className="text-xs text-text-3 font-body mt-1 uppercase tracking-widest">{value.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>

            <Card variant="glass-light" className="p-6 text-center border-white/5 opacity-50 hover:opacity-100 transition-opacity">
                <span className="font-mono text-[8px] text-text-4 uppercase tracking-[0.5em]">Identity_Verification_Secure</span>
            </Card>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}
