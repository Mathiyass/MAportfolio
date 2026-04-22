"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';

export default function NowPage() {
  const current = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48">
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
                Last System Sync: {current}
            </p>

            <div className="space-y-20">
                <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-text-1">Focusing On</h2>
                    <ul className="space-y-4 font-body text-lg text-text-2 list-disc list-inside marker:text-cyan">
                        <li>Completing the Nexus Prime v12.0 core architecture.</li>
                        <li>Researching advanced AI-driven UI patterns and spatial computing.</li>
                        <li>Perfecting the BYTE personality engine for better user guidance.</li>
                        <li>Exploring the limits of raw WebGL2 performance in modern browsers.</li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h2 className="font-display text-2xl font-bold text-text-1">Learning</h2>
                    <ul className="space-y-4 font-body text-lg text-text-2 list-disc list-inside marker:text-red">
                        <li>Advanced GLSL techniques for complex noise generators.</li>
                        <li>Next.js 15 Partial Prerendering (PPR) optimizations.</li>
                        <li>Kotlin Multiplatform (KMP) for cross-platform system components.</li>
                    </ul>
                </div>

                <div className="pt-20 border-t border-border-1">
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
