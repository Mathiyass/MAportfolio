"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Send, Github, Linkedin, Radio } from 'lucide-react';

export default function ContactPage() {
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
                <Radio size={14} className="animate-pulse" />
                SYSTEM {'//'} CATEGORIZATION {'//'} SECURE_UPLINK
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-12 text-text-0 uppercase tracking-tighter leading-none">
                Connect <br/>
                <span className="text-text-4 font-black tracking-tighter">{'//'} Uplink.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Establishing a high-bandwidth connection for strategic partnerships, technical inquiries, or system collaborations.
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
            <div className="lg:col-span-5 space-y-16">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan opacity-60">Frequency</h3>
                        <a href="mailto:hello@mathiya.dev" className="group flex items-center gap-4 text-3xl font-display font-bold text-text-0 hover:text-cyan transition-all">
                            hello@mathiya.dev
                            <Send size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-cyan" />
                        </a>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-red opacity-60">Network Nodes</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "GitHub", icon: <Github size={16} />, href: "https://github.com/Mathiyass" },
                                { label: "LinkedIn", icon: <Linkedin size={16} />, href: "https://linkedin.com/in/mathiya" }
                            ].map((node) => (
                                <a 
                                    key={node.label}
                                    href={node.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl glass border-white/5 hover:border-cyan/30 hover:bg-cyan/5 transition-all group"
                                >
                                    <div className="p-2 rounded-lg bg-white/5 text-text-4 group-hover:text-cyan transition-colors">
                                        {node.icon}
                                    </div>
                                    <span className="font-head font-bold text-sm uppercase tracking-widest text-text-1">{node.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <Card variant="glass-light" className="p-8 border-cyan/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan to-transparent opacity-40" />
                    <div className="flex items-center gap-4 mb-4">
                        <div className="size-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#00f0ff]" />
                        <span className="font-mono text-[10px] text-cyan uppercase tracking-[0.3em]">Signal Optimized</span>
                    </div>
                    <p className="text-sm text-text-3 font-body leading-relaxed">
                        Currently processing requests at <span className="text-text-1">0.002ms</span> latency. Neural link established.
                    </p>
                </Card>
            </div>

            <div className="lg:col-span-7">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Card variant="glass" className="p-12 relative overflow-hidden">
                        {/* Power Rail */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red to-transparent opacity-30" />
                        
                        <form className="space-y-10 relative z-10">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.4em] ml-1">Origin_ID</label>
                                    <Input 
                                        placeholder="Identification Name" 
                                        className="h-14 bg-bg-base/40 border-white/5 rounded-xl focus:border-cyan transition-all font-body text-base" 
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.4em] ml-1">Comm_Address</label>
                                    <Input 
                                        type="email" 
                                        placeholder="email@protocol.net" 
                                        className="h-14 bg-bg-base/40 border-white/5 rounded-xl focus:border-cyan transition-all font-body text-base" 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.4em] ml-1">Data_Payload</label>
                                <Textarea 
                                    placeholder="Initialize transmission sequence..." 
                                    className="min-h-[200px] bg-bg-base/40 border-white/5 rounded-xl focus:border-cyan transition-all font-body text-base py-6 resize-none" 
                                />
                            </div>

                            <Button variant="primary" className="w-full h-16 text-xs font-black tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:scale-[1.02] active:scale-95 transition-all">
                                <Radio size={16} className="mr-3" /> Initialize Signal
                            </Button>

                            <div className="flex items-center justify-center gap-4 pt-4">
                                <div className="h-px flex-1 bg-white/5" />
                                <span className="font-mono text-[8px] text-text-4 uppercase tracking-[0.5em]">Encryption: AES-256</span>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
      </section>
    </PageWrapper>
  );
}
