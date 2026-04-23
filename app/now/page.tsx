"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Activity, Brain, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function NowPage() {
  const current = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
        >
            <div className="flex items-center gap-4 mb-12">
                <h1 className="font-display text-6xl lg:text-8xl font-bold text-text-0">Now.</h1>
                <Badge variant="outline" className="h-8 px-4 border-cyan/20 text-cyan">Active</Badge>
            </div>
            
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-text-3 mb-16">
                LAST UPDATED: {current}
            </p>

            <div className="space-y-12">
                <Card variant="glass" className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Activity className="text-cyan" size={20} />
                        <h2 className="font-display text-2xl font-bold text-text-1">Focusing On</h2>
                    </div>
                    <ul className="space-y-4 font-body text-lg text-text-2">
                        {[
                            "Building high-performance digital systems and creative interfaces.",
                            "Researching advanced AI-driven UI patterns and spatial computing.",
                            "Optimizing character IK solvers for web-based 3D simulations.",
                            "Exploring the boundaries of raw WebGL2 performance."
                        ].map(item => (
                            <li key={item} className="flex gap-4">
                                <Zap className="text-cyan shrink-0 mt-1.5" size={14} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card variant="glass" className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Brain className="text-red" size={20} />
                        <h2 className="font-display text-2xl font-bold text-text-1">Learning</h2>
                    </div>
                    <ul className="space-y-4 font-body text-lg text-text-2">
                        {[
                            "Advanced GLSL techniques for complex noise generators.",
                            "Next.js 15 partial prerendering (PPR) optimizations.",
                            "System architecture for distributed web agents."
                        ].map(item => (
                            <li key={item} className="flex gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-red shrink-0 mt-2.5" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Status", value: "Online", color: "text-cyan" },
                        { label: "Stability", value: "Nominal", color: "text-text-1" },
                        { label: "Energy", value: "High", color: "text-red" },
                        { label: "Sync", value: "Verified", color: "text-cyan" }
                    ].map(stat => (
                        <Card key={stat.label} variant="glass-light" className="p-4 text-center">
                            <span className="block font-mono text-[8px] uppercase tracking-widest text-text-4 mb-1">{stat.label}</span>
                            <span className={cn("block font-head text-xs font-bold uppercase", stat.color)}>{stat.value}</span>
                        </Card>
                    ))}
                </div>

                <div className="pt-20 border-t border-white/5">
                    <p className="font-body text-text-3 italic">
                        Inspired by Derek Sivers and the /now page movement.
                    </p>
                </div>
            </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
