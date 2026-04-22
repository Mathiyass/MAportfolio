"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'motion/react';

export default function UsesPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                System Configuration
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-12 text-text-0">
                Uses.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed mb-20">
                Hardware primitives and software abstractions deployed daily.
            </p>

            <div className="p-12 rounded-[var(--radius-2xl)] border border-dashed border-border-1 text-center bg-bg-muted/20">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-4">
                    [MODULE IN ACTIVE DEVELOPMENT — SYNCING DATA]
                </p>
            </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
