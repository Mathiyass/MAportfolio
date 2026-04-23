"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Download, Star, Package, Box, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
  {
    title: "Nexus UI Kit",
    id: "PROD_01_UI",
    price: "$49",
    description: "A comprehensive library of 60+ glassmorphic components for Next.js 15.",
    rating: 4.9,
    category: "Design",
    stock: "Available"
  },
  {
    title: "Quantum Shader Pack",
    id: "PROD_02_GLSL",
    price: "$29",
    description: "12 optimized GLSL noise and distortion shaders for React Three Fiber.",
    rating: 5.0,
    category: "Graphics",
    stock: "High Demand"
  },
  {
    title: "Agent Core Framework",
    id: "PROD_03_AGENT",
    price: "$199",
    description: "A high-performance multi-agent orchestration layer for Node.js systems.",
    rating: 4.8,
    category: "Architecture",
    stock: "Limited"
  }
];

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
                <Package size={14} />
                SYSTEM {'//'} CATEGORIZATION {'//'} ASSET_FORGE
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter">
                Asset <br/>
                <span className="text-text-4 font-black tracking-tighter">{'//'} Forge.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Premium digital assets, developer tools, and modular system components for high-fidelity builds. v12.0 assets synchronized.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                    <Card variant="glass" className="flex flex-col h-full group hover:border-cyan/30 transition-all relative overflow-hidden">
                        {/* Power Rail */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                        
                        <div className="aspect-[16/10] bg-bg-base flex items-center justify-center relative overflow-hidden border-b border-white/5">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[length:30px_30px] opacity-40" />
                            <Box className="text-text-4 group-hover:scale-110 group-hover:text-cyan/20 transition-all duration-700" size={80} />
                            <div className="absolute top-6 right-6">
                                <span className="px-4 py-1.5 rounded-full bg-cyan text-bg-base font-display font-black text-sm shadow-[var(--glow-c-s)]">
                                    {product.price}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex flex-col flex-grow bg-bg-muted/30 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-6">
                                <span className="font-mono text-[9px] text-text-4 uppercase tracking-[0.3em] font-bold">{product.id}</span>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5">
                                    <Star size={10} className="text-red fill-red" />
                                    <span className="font-mono text-[10px] text-text-2">{product.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-display font-bold text-text-0 mb-3 group-hover:text-cyan transition-colors tracking-tight uppercase">{product.title}</h3>
                            <p className="text-sm text-text-3 font-body leading-relaxed mb-8 flex-grow">{product.description}</p>

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

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-12 rounded-[var(--radius-2xl)] border border-white/5 bg-bg-muted/10 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-6 relative z-10">
                <Info size={32} className="text-cyan opacity-40" />
                <div>
                    <h4 className="font-display font-bold text-xl text-text-0 uppercase tracking-tight">Enterprise Protocol</h4>
                    <p className="text-text-3 font-body text-sm">Bulk licensing and custom system components available via secure uplink.</p>
                </div>
            </div>
            <span className="font-mono text-[10px] text-text-4 uppercase tracking-[0.4em] relative z-10">SYNC_READY</span>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
