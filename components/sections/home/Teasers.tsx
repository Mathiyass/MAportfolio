"use client"
import * as React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const teasers = [
  {
    id: "02",
    title: "Nexus Core",
    label: "About Me",
    desc: "A deep dive into the architect behind the systems and the vision driving the craft.",
    href: "/about",
    color: "from-cyan/20 to-transparent",
  },
  {
    id: "03",
    title: "Technological Arsenal",
    label: "Skills",
    desc: "The full stack of languages, frameworks, and tools deployed across production systems.",
    href: "/skills",
    color: "from-red/20 to-transparent",
  },
  {
    id: "04",
    title: "The Simulation",
    label: "Arcade",
    desc: "A collection of 6 experimental web games built to test the limits of browser performance.",
    href: "/games",
    color: "from-purple-500/20 to-transparent",
  }
];

export function Teasers() {
  return (
    <section className="py-32 relative z-10 bg-gradient-to-b from-transparent to-bg-base/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {teasers.map((teaser, i) => (
            <motion.div
              key={teaser.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={teaser.href} className="group block relative h-full overflow-hidden rounded-[var(--radius-xl)] border border-border-1 bg-bg-muted/50 p-10 hover:border-border-c transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${teaser.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-3 group-hover:text-cyan transition-colors">
                      {teaser.id} — {teaser.label}
                    </span>
                  </div>

                  <h3 className="text-3xl font-display font-bold mb-4 text-text-0 group-hover:text-white transition-colors">
                    {teaser.title}
                  </h3>
                  <p className="text-text-2 mb-12 flex-grow font-body leading-relaxed group-hover:text-text-1 transition-colors">
                    {teaser.desc}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                      Initialize Link
                    </span>
                    <div className="w-12 h-12 rounded-full border border-border-1 flex items-center justify-center group-hover:bg-cyan group-hover:border-cyan group-hover:text-bg-base group-hover:shadow-[var(--glow-c-s)] transition-all duration-500">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
