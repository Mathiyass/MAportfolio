"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'motion/react';

export default function ContactPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <div className="grid lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                        Network Portal
                    </span>
                    <h1 className="text-6xl lg:text-8xl font-display font-bold mb-12 text-text-0 tracking-tight">
                        Get in <span className="gradient-text">Touch</span>.
                    </h1>
                    
                    <p className="text-xl text-text-2 font-body max-w-md mb-16 leading-relaxed">
                        Establishing a connection for strategic partnerships, technical inquiries, or system collaborations.
                    </p>

                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-4">Direct Frequency</h3>
                            <a href="mailto:hello@mathiya.dev" className="text-2xl font-display font-bold text-text-1 hover:text-cyan transition-colors block">
                                hello@mathiya.dev
                            </a>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-4">Nodes</h3>
                            <div className="flex gap-8 font-head text-sm uppercase tracking-widest text-text-1">
                                <a href="https://github.com/Mathiyass" target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors">GitHub</a>
                                <a href="https://linkedin.com/in/mathiya" target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors">LinkedIn</a>
                            </div>
                        </div>

                        <div className="p-8 rounded-[var(--radius-xl)] bg-cyan/5 border border-cyan/20 w-fit">
                            <div className="flex items-center gap-3">
                                <span className="flex h-2 w-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#22D3EE]" />
                                <span className="font-mono text-[10px] text-cyan uppercase tracking-[0.2em]">Ready for Dispatch</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="lg:col-span-6 lg:pl-12">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="p-10 rounded-[var(--radius-2xl)] border border-border-1 bg-bg-muted/30 backdrop-blur-xl relative overflow-hidden mesh-card"
                >
                    <form className="space-y-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.3em] ml-1">Origin Identification</label>
                            <Input placeholder="Your Name" className="h-14 bg-bg-base/50 border-border-2 rounded-[var(--radius-md)] focus:border-cyan transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.3em] ml-1">Encrypted Address</label>
                            <Input type="email" placeholder="email@domain.com" className="h-14 bg-bg-base/50 border-border-2 rounded-[var(--radius-md)] focus:border-cyan transition-all" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.3em] ml-1">Data Payload</label>
                            <Textarea placeholder="Initialize transmission..." className="min-h-[180px] bg-bg-base/50 border-border-2 rounded-[var(--radius-md)] focus:border-cyan transition-all py-4" />
                        </div>
                        <Button variant="primary" className="w-full h-14 text-sm tracking-widest uppercase">
                            Initialize Signal
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
      </section>
    </PageWrapper>
  );
}
