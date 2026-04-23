"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Download, Star, Box, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { marketplaceItems } from '@/lib/data';

export default function MarketplacePage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                <Box size={14} />
                SIVION // DIGITAL_ASSET_NEXUS
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter leading-none">
                The <br/>
                <span className="text-text-4 font-black tracking-tighter">// Store.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Strategic digital assets, enterprise AI components, and high-fidelity rendering frameworks developed by the SIVION team.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketplaceItems.map((product, i) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                    <Card variant="glass" className="flex flex-col h-full group hover:border-cyan/30 transition-all relative overflow-hidden">
                        <div className="aspect-[16/10] bg-bg-base flex items-center justify-center relative overflow-hidden border-b border-white/5">
                            <Box className="text-text-4 group-hover:scale-110 group-hover:text-cyan/20 transition-all duration-700" size={80} />
                            <div className="absolute top-6 right-6">
                                <span className="px-4 py-1.5 rounded-full bg-cyan text-bg-base font-display font-black text-sm shadow-[var(--glow-c-s)]">
                                    {product.price}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-grow bg-bg-muted/30 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                                    <Star size={10} className="text-red fill-red" />
                                    <span className="font-mono text-[10px] text-text-2">5.0</span>
                                </div>
                                <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{product.category}</span>
                            </div>

                            <h3 className="text-2xl font-display font-bold text-text-0 mb-3 group-hover:text-cyan transition-colors tracking-tight uppercase">{product.title}</h3>
                            <p className="text-sm text-text-3 font-body leading-relaxed mb-8 flex-grow">{product.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {product.tech.map((t) => (
                                    <span key={t} className="px-2 py-1 rounded bg-white/5 text-[8px] font-mono text-text-4 border border-white/5 uppercase tracking-widest">{t}</span>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/5 flex gap-4 mt-auto">
                                <Button variant="primary" className="flex-1 gap-2 text-[10px] uppercase tracking-[0.2em] font-black h-12 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                                    <ShoppingCart size={16} /> ACQUIRE
                                </Button>
                                <Button variant="secondary" className="px-4 h-12 border-white/10 hover:border-red/30 group/btn">
                                    <Download size={16} className="group-hover/btn:text-red transition-colors" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
      </section>
    </PageWrapper>
  );
}
