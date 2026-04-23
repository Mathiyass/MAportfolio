"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Cpu, Wind, MousePointer2 } from 'lucide-react';

export default function ColophonPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                Module 21 — Structural Integrity
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-12 text-text-0">Colophon.</h1>
            <p className="font-body text-xl text-text-2 mb-20 leading-relaxed max-w-2xl">
                A technical deep dive into the architecture, tools, and philosophy powering the MATHIYA Nexus Prime ecosystem.
            </p>

            <div className="grid gap-24 mb-32">
                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <Cpu className="text-cyan" size={32} />
                        <h2 className="font-display text-3xl font-bold text-text-0 uppercase tracking-wider">Engine</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card variant="glass" className="p-8">
                            <h3 className="font-display font-bold text-xl text-cyan mb-4">The Stack</h3>
                            <p className="text-sm text-text-1 font-body leading-relaxed mb-6">
                                Next.js 15 (App Router) + React 19. Leveraging Server Components for data integrity and Client Components for high-fidelity 3D interactions.
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                {['Turbopack', 'TypeScript 5', 'Tailwind v4', 'Zustand'].map(t => (
                                    <span key={t} className="px-3 py-1 rounded-full bg-cyan/5 border border-cyan/10 font-mono text-[9px] text-cyan uppercase tracking-widest">{t}</span>
                                ))}
                            </div>
                        </Card>
                        <Card variant="glass" className="p-8">
                            <h3 className="font-display font-bold text-xl text-red mb-4">Styling Laws</h3>
                            <p className="text-sm text-text-1 font-body leading-relaxed mb-6">
                                Strictly enforced design tokens. CSS-first variable architecture. Zero-runtime overhead for theme resolution.
                            </p>
                            <div className="flex gap-3 flex-wrap">
                                {['OKLCH Colors', 'Bezier Easing', 'Grid 12-col', 'Safe-Area Aware'].map(t => (
                                    <span key={t} className="px-3 py-1 rounded-full bg-red/5 border border-red/10 font-mono text-[9px] text-red uppercase tracking-widest">{t}</span>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <Wind className="text-red" size={32} />
                        <h2 className="font-display text-3xl font-bold text-text-0 uppercase tracking-wider">Visuals & 3D</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card variant="glass-light" className="p-8">
                            <h3 className="font-display font-bold text-xl mb-4">Graphics Pipeline</h3>
                            <p className="text-sm text-text-1 leading-relaxed mb-6">
                                16 GLSL shaders orchestrated via R3F. Real-time FBO ping-pong simulations. Post-processing bloom and noise grain layers.
                            </p>
                            <code className="block p-4 rounded-lg bg-black/40 font-mono text-[10px] text-text-3 border border-white/5">
                                gl_FragColor = vec4(col * u_opacity, 1.0);
                            </code>
                        </Card>
                        <Card variant="glass-light" className="p-8">
                            <h3 className="font-display font-bold text-xl mb-4">Motion System</h3>
                            <p className="text-sm text-text-1 leading-relaxed mb-6">
                                Framer Motion for layout and entrance reveals. GSAP for scroll-triggered depth and complex mascot IK tracking.
                            </p>
                            <code className="block p-4 rounded-lg bg-black/40 font-mono text-[10px] text-text-3 border border-white/5">
                                transition: &#123; ease: [0.16, 1, 0.3, 1] &#125;
                            </code>
                        </Card>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="flex items-center gap-4">
                        <MousePointer2 className="text-text-0" size={32} />
                        <h2 className="font-display text-3xl font-bold text-text-0 uppercase tracking-wider">The Mascot: BYTE</h2>
                    </div>
                    <Card variant="glass" className="p-10 max-w-2xl">
                        <p className="text-lg text-text-1 font-body leading-relaxed">
                            BYTE is a custom-engineered mascot with a reactive brain managed by **Zustand**. 
                            It utilizes Inverse Kinematics (IK) to track the user&apos;s cursor in real-time across both 2D SVG and 3D R3F rendering modes. 
                            BYTE reacts to page changes, game events, and user interactions with a dynamic personality engine.
                        </p>
                    </Card>
                </div>
            </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
