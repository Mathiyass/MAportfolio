"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { AsciiPortrait } from '@/components/sections/about/AsciiPortrait';
import { Timeline } from '@/components/sections/about/Timeline';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48">
        <div className="grid lg:grid-cols-12 gap-20 items-start">
          
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                    Identity Protocol
                </span>
                <h1 className="font-display text-6xl lg:text-8xl font-bold mb-12 text-text-0">
                    About <span className="gradient-text">Me</span>.
                </h1>
                
                <div className="space-y-8 font-body text-lg lg:text-xl text-text-2 leading-relaxed max-w-2xl">
                    <p>
                        I am <span className="text-text-0 font-semibold">Mathisha Angirasa</span>, a dedicated Software Engineering Student and systems architect driven by the intersection of performance and aesthetics.
                    </p>
                    <p>
                        My focus lies in building scalable, production-grade applications that don&apos;t just function perfectly, but feel alive. From **Next.js** ecosystems to **native Android** development and low-level **GLSL shaders**, I thrive on technical complexity.
                    </p>
                    <p>
                        Currently pursuing excellence at <span className="text-cyan">JIAT</span>, I spend my cycles researching AI-driven UI patterns and optimizing the boundaries of browser-based 3D experiences.
                    </p>
                </div>

                <div className="mt-24">
                    <h2 className="font-display text-3xl font-bold text-text-0 mb-12 uppercase tracking-tight">Timeline</h2>
                    <Timeline />
                </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 sticky top-32">
            <AsciiPortrait />
            
            <div className="mt-12 p-8 rounded-[var(--radius-xl)] border border-border-1 bg-bg-subtle/50">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-4 mb-6">Core Values</h3>
                <ul className="space-y-4 font-head text-sm text-text-1 uppercase tracking-widest">
                    <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan" />
                        Precision Engineering
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red" />
                        Intent-Driven Design
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        Radical Transparency
                    </li>
                </ul>
            </div>
          </div>

        </div>
      </section>
    </PageWrapper>
  );
}
