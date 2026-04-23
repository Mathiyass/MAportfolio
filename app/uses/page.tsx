"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Monitor, Laptop, Keyboard, Terminal, Code2, Globe } from 'lucide-react';

const equipment = [
  {
    category: "Hardware",
    id: "HW_REG_01",
    items: [
      { name: "MacBook Pro M3 Max", detail: "64GB Unified Memory / 2TB SSD", icon: <Laptop size={20} /> },
      { name: "Studio Display", detail: "5K Retina / Nano-texture", icon: <Monitor size={20} /> },
      { name: "Keychron Q1 Pro", detail: "Gateron Baby Raccoon Switches", icon: <Keyboard size={20} /> }
    ]
  },
  {
    category: "Software",
    id: "SW_REG_01",
    items: [
      { name: "VS Code / Cursor", detail: "Vitesse Theme / Geist Mono", icon: <Code2 size={20} /> },
      { name: "Warp Terminal", detail: "zsh / Oh My Zsh / Powerlevel10k", icon: <Terminal size={20} /> },
      { name: "Arc Browser", detail: "Primary Web Interaction Engine", icon: <Globe size={20} /> }
    ]
  }
];

export default function UsesPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                System Configuration
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-12 text-text-0">
                Uses.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Hardware primitives and software abstractions deployed daily to facilitate high-frequency development.
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
            {equipment.map((group, i) => (
                <div key={group.category} className="space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="font-display font-bold text-2xl text-text-0 uppercase tracking-widest">{group.category}</h2>
                        <span className="font-mono text-[10px] text-text-4 uppercase tracking-[0.3em]">{group.id}</span>
                    </div>

                    <div className="space-y-4">
                        {group.items.map((item, j) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (i * 3 + j) * 0.05 }}
                            >
                                <Card variant="glass" className="p-6 flex items-center gap-6 group hover:border-cyan/20 transition-all">
                                    <div className="p-3 rounded-lg bg-white/5 text-text-3 group-hover:text-cyan group-hover:bg-cyan/10 transition-all">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-lg text-text-1 group-hover:text-text-0 transition-colors">{item.name}</h3>
                                        <p className="text-xs text-text-4 font-mono uppercase tracking-wider">{item.detail}</p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </section>
    </PageWrapper>
  );
}
