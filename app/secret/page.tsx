"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lock, ShieldAlert, EyeOff, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const encryptedNodes = [
  {
    title: "Project: DARK_MATTER",
    id: "NODE_01_SEC",
    security: "Level 5",
    description: "Classified research into automated zero-day vulnerability detection systems."
  },
  {
    title: "Archive: VOID_WALKER",
    id: "NODE_02_SEC",
    security: "Restricted",
    description: "Experimental data on user behavior prediction in virtual environments."
  },
  {
    title: "Protocol: GHOST_SHELL",
    id: "NODE_03_SEC",
    security: "Top Secret",
    description: "Low-level system overrides and hardware-level performance optimizations."
  }
];

export default function SecretPage() {
  const [authorized, setAuthorized] = React.useState(false);

  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen text-center flex flex-col items-center">
        {!authorized ? (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full"
            >
                <div className="mb-12 inline-flex items-center justify-center p-6 rounded-full bg-red/10 text-red border border-red/20 shadow-[0_0_30px_rgba(251,113,133,0.2)]">
                    <Lock size={48} />
                </div>
                <h1 className="text-4xl font-display font-bold text-text-0 mb-6">Access Restricted.</h1>
                <p className="text-text-2 font-body mb-12 leading-relaxed">This sector contains classified engineering documentation. Authorization required to proceed.</p>
                
                <Card variant="glass" className="p-8 space-y-6 text-left border-red/20">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-text-4 uppercase tracking-[0.3em]">Access Code</label>
                        <div className="h-12 bg-bg-base/50 border border-border-2 rounded-[var(--radius-md)] flex items-center px-4 font-mono text-text-3">
                            **** **** ****
                        </div>
                    </div>
                    <Button 
                        variant="secondary" 
                        className="w-full h-12 border-red/20 text-red hover:bg-red/10"
                        onClick={() => setAuthorized(true)}
                    >
                        Initialize Bypass
                    </Button>
                </Card>
            </motion.div>
        ) : (
            <div className="w-full text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mb-24"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-red mb-6 block flex items-center gap-2">
                        <ShieldAlert size={14} /> Unauthorized Access Detected
                    </span>
                    <h1 className="text-6xl lg:text-8xl font-display font-bold mb-12 text-text-0">
                        Secret <span className="gradient-text">Log</span>.
                    </h1>
                    <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                        Accessing the encrypted archives of experimental sub-routines and unstable system prototypes.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {encryptedNodes.map((node, i) => (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card variant="glass" className="p-8 group hover:border-red/40 border-white/5 transition-all h-full flex flex-col">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-3 rounded-xl bg-red/10 text-red">
                                        <Terminal size={24} />
                                    </div>
                                    <span className="font-mono text-[8px] text-text-4 uppercase tracking-widest">{node.id}</span>
                                </div>
                                
                                <h3 className="text-2xl font-display font-bold text-text-0 mb-2 group-hover:text-red transition-colors">{node.title}</h3>
                                <div className="inline-flex items-center gap-2 mb-6">
                                    <EyeOff size={10} className="text-text-4" />
                                    <span className="font-mono text-[9px] text-text-3 uppercase tracking-widest">{node.security} Clearance</span>
                                </div>
                                <p className="text-sm text-text-2 font-body leading-relaxed flex-grow">{node.description}</p>
                                
                                <Button variant="ghost" size="sm" className="mt-8 h-9 border border-white/5 hover:bg-white/5 font-mono text-[10px] uppercase tracking-widest gap-2">
                                    Decrypt File
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        )}
      </section>
    </PageWrapper>
  );
}
