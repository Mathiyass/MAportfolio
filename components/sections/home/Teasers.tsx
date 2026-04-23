"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Terminal, Cpu, Database, Box } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function Teasers() {
  return (
    <section className="py-24 max-w-screen-2xl mx-auto px-4 md:px-12 relative z-10 overflow-hidden">
        {/* Explore More Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
            >
                <span className="font-mono text-cyan tracking-[0.3em] uppercase text-xs mb-4 block">Navigation Terminal</span>
                <h2 className="font-display font-black text-6xl md:text-8xl tracking-[-0.04em] text-text-0 leading-[0.9]">
                    EXPLORE <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-blue-500">THE CORE.</span>
                </h2>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-right hidden md:block"
            >
                <p className="text-text-2 font-mono text-sm max-w-[280px]">SYSTEM STATUS: OPERATIONAL. NAVIGATE THROUGH THE NEURAL INTERFACE TO UNLOCK ARCHIVED DATA SEGMENTS.</p>
            </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-stretch">
            {/* 1. Nexus Core (About) - Vertical Long Card */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 md:col-span-5 h-full"
            >
                <Link href="/about" className="block h-full">
                    <Card variant="glass" className="relative min-h-[700px] h-full flex flex-col justify-between p-10 transition-all duration-500 hover:rotate-y-2 hover:scale-[1.01]">
                        {/* Background Glow Elements */}
                        <div className="absolute inset-0 z-0 opacity-40">
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 blur-[120px] rounded-full"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red/10 blur-[100px] rounded-full"></div>
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[length:32px_32px] opacity-30"></div>
                        </div>

                        <div className="relative z-10">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan font-mono text-[10px] tracking-widest uppercase mb-8">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span> Identity Matrix
                            </span>
                            <h3 className="font-display font-bold text-5xl tracking-tight text-text-0 mb-6 group-hover:text-cyan transition-colors uppercase leading-none">Nexus <br/>Core.</h3>
                            <p className="text-text-2 text-lg leading-relaxed max-w-[80%] font-light">
                                Architecting digital experiences where human intuition meets algorithmic precision. A journey through the mind of a full-stack visionary.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col gap-6 mt-12">
                            <div className="flex gap-12">
                                <div>
                                    <span className="block font-mono text-red text-2xl font-bold">04+</span>
                                    <span className="block font-mono text-[10px] tracking-widest text-text-3 uppercase mt-1">Years active</span>
                                </div>
                                <div>
                                    <span className="block font-mono text-cyan text-2xl font-bold">50+</span>
                                    <span className="block font-mono text-[10px] tracking-widest text-text-3 uppercase mt-1">Deployments</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan group-hover:text-bg-base transition-all duration-300">
                                <span className="font-mono font-bold uppercase tracking-widest text-sm">Decode Origins</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Card>
                </Link>
            </motion.div>

            {/* Column Wrapper for right side */}
            <div className="col-span-12 md:col-span-7 flex flex-col gap-8 h-full">
                {/* 2. Technological Arsenal (Skills) - Wide Bento */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1"
                >
                    <Link href="/skills" className="block h-full">
                        <Card variant="glass" className="relative min-h-[330px] h-full p-8 transition-all duration-500 hover:-rotate-x-2 hover:scale-[1.01] flex flex-col justify-between border-red/10 hover:border-red/30">
                            {/* Background Tech Elements */}
                            <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
                                <div className="absolute left-10 w-px h-[100px] bg-gradient-to-b from-transparent via-red to-transparent animate-[flow_3s_linear_infinite]" style={{ animationDelay: '0s' }}></div>
                                <div className="absolute left-1/3 w-px h-[100px] bg-gradient-to-b from-transparent via-red to-transparent animate-[flow_3s_linear_infinite]" style={{ animationDelay: '1.2s' }}></div>
                                <div className="absolute right-20 w-px h-[100px] bg-gradient-to-b from-transparent via-red to-transparent animate-[flow_3s_linear_infinite]" style={{ animationDelay: '2.1s' }}></div>
                            </div>

                            <div className="relative z-10 flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="font-display font-bold text-4xl tracking-tight text-text-0 mb-2 group-hover:text-red transition-colors uppercase">Technological Arsenal</h3>
                                    <p className="text-text-2 font-mono text-[10px] uppercase tracking-widest opacity-60">Protocol: High-Performance Engineering</p>
                                </div>
                                <Terminal className="text-red w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto">
                                {[
                                    { icon: <Terminal size={24} />, label: "REACT_NODE" },
                                    { icon: <Cpu size={24} />, label: "RUST_CARGO" },
                                    { icon: <Box size={24} />, label: "WEBGL_3JS" },
                                    { icon: <Database size={24} />, label: "POSTGRES" }
                                ].map((tech, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-bg-base/50 border border-border-1 flex flex-col items-center justify-center gap-3 group/icon hover:bg-red/10 transition-colors">
                                        <div className="text-red opacity-50 group-hover/icon:opacity-100 transition-opacity">
                                            {tech.icon}
                                        </div>
                                        <span className="font-mono text-[10px] text-text-3 group-hover/icon:text-text-1 tracking-tighter transition-colors">{tech.label}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Link>
                </motion.div>

                {/* 3. The Simulation (Arcade) - Wide Bento */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1"
                >
                    <Link href="/games" className="block h-full">
                        <Card variant="glass-light" className="relative min-h-[330px] h-full p-8 transition-all duration-500 hover:scale-[1.01] flex flex-col md:flex-row items-center gap-8 md:gap-12 border-cyan/20 hover:border-cyan/50">
                            {/* Retro-Futuristic Grid */}
                            <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 to-transparent"></div>
                                <div className="w-[200%] h-[200%] absolute -top-1/2 -left-1/2 rotate-12 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.1)_1px,transparent_1px)]"></div>
                            </div>

                            <div className="relative z-10 flex-1">
                                <span className="font-mono text-cyan text-[10px] tracking-[0.4em] uppercase mb-4 block">Level 99 Unlocked</span>
                                <h3 className="font-display font-black text-5xl tracking-tight text-text-0 mb-4 uppercase group-hover:text-cyan transition-colors leading-none">The <br/>Simulation.</h3>
                                <p className="text-text-2 font-body mb-8 max-w-sm">A retro-futuristic playground of micro-games and experimental UI components. Ready Player One?</p>
                                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-cyan/50 text-cyan font-mono font-bold uppercase tracking-widest group-hover:bg-cyan group-hover:text-bg-base transition-all duration-300 text-xs">
                                    Enter Arcade
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="relative w-48 h-48 shrink-0 hidden sm:block">
                                <div className="absolute inset-0 bg-cyan/20 rounded-full blur-3xl group-hover:animate-pulse"></div>
                                <div className="w-full h-full rounded-2xl border border-white/5 rotate-6 shadow-[var(--glow-c-s)] transition-transform duration-500 group-hover:rotate-0 overflow-hidden relative">
                                  <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-red/10" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <Cpu className="text-cyan opacity-40 group-hover:scale-110 transition-transform" size={64} />
                                  </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
  );
}
