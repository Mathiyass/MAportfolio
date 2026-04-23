"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { SnakeGame } from '@/components/games/SnakeGame';
import { HexPuzzle } from '@/components/games/HexPuzzle';
import { TerminalTyper } from '@/components/games/TerminalTyper';
import { MemoryGame } from '@/components/games/MemoryGame';
import { ByteAdventure } from '@/components/games/ByteAdventure';
import { MathiyaRacer } from '@/components/games/MathiyaRacer';
import { motion } from 'framer-motion';

export default function GamesPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24 text-center mx-auto"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                Module 04 — The Simulation
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 text-text-0 uppercase tracking-tight">
                Nexus <span className="gradient-text">Arcade</span>.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl mx-auto leading-relaxed">
                Experimental browser-based environments designed to stress-test the limits of the human-machine interface.
            </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="col-span-1 md:col-span-2">
            <SnakeGame />
          </div>

          <div className="col-span-1">
            <HexPuzzle />
          </div>

          <div className="col-span-1">
            <TerminalTyper />
          </div>

          <div className="col-span-1 md:col-span-2">
            <MemoryGame />
          </div>

          <div className="col-span-1 md:col-span-2">
            <ByteAdventure />
          </div>

          <div className="col-span-1 md:col-span-2">
            <MathiyaRacer />
          </div>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-12 rounded-[var(--radius-2xl)] border border-dashed border-border-1 text-center"
        >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-4">
                [ADDITIONAL MODULES IN DEVELOPMENT]
            </p>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
