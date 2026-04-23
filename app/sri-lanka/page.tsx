"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { MapPin, Globe, Map as MapIcon, Landmark } from 'lucide-react';

const technicalHubs = [
  {
    name: "Colombo Tech District",
    id: "HUB_01_CMB",
    role: "Primary Innovation Center",
    stats: "High Connectivity",
    description: "The heartbeat of Sri Lankan software engineering, hosting major global tech firms and startups."
  },
  {
    name: "Kandy Knowledge Park",
    id: "HUB_02_KDY",
    role: "Academic & Research Node",
    stats: "Established 2012",
    description: "Centrally located hub focusing on engineering excellence and academic research collaboration."
  },
  {
    name: "Jaffna Digital Gateway",
    id: "HUB_03_JAF",
    role: "Emerging Tech Frontier",
    stats: "Rapid Growth",
    description: "Accelerating the digital transformation of the northern peninsula with a focus on web systems."
  }
];

export default function SriLankaPage() {
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
                Origin Node Protocol
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-12 text-text-0">
                Sri <span className="gradient-text">Lanka</span>.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Analyzing the digital infrastructure and geographical nodes of my primary development environment.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicalHubs.map((hub, i) => (
                <motion.div
                    key={hub.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                    <Card variant="glass" className="p-8 h-full flex flex-col group hover:border-cyan/30 transition-all overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <MapIcon size={80} />
                        </div>
                        
                        <div className="flex items-center justify-between mb-8">
                            <div className="p-3 rounded-xl bg-cyan/10 text-cyan">
                                <MapPin size={24} />
                            </div>
                            <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{hub.id}</span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-text-0 mb-2 group-hover:text-cyan transition-colors">{hub.name}</h3>
                        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.2em] mb-4 block">{hub.role}</span>
                        <p className="text-sm text-text-2 font-body leading-relaxed mb-8 flex-grow">{hub.description}</p>
                        
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                            <span className="font-mono text-[9px] text-cyan uppercase tracking-widest">{hub.stats}</span>
                            <Globe size={14} className="text-text-4" />
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-12 rounded-[var(--radius-2xl)] border border-border-1 bg-bg-muted/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
            <div className="flex items-center gap-6">
                <Landmark size={48} className="text-text-4" />
                <div>
                    <h4 className="font-display font-bold text-2xl text-text-0 mb-1">Cultural Operating System</h4>
                    <p className="text-text-2 font-body">Merging rich heritage with future-ready technical precision.</p>
                </div>
            </div>
            <span className="font-mono text-[10px] text-text-4 uppercase tracking-[0.4em]">SYNC_READY</span>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
