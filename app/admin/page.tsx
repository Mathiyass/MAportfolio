"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Shield, Database, Users, Terminal, Activity, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminPage() {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        {/* Header Protocol */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.3em] mb-6">
                <Terminal size={14} />
                SYSTEM // CATEGORIZATION // OVERSIGHT_DASHBOARD
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter leading-none">
                System <br/>
                <span className="text-text-4 font-black tracking-tighter">// Control.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Management protocols for site orchestration, data synchronization, and security.
            </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card variant="glass" className="p-10 group hover:border-cyan/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Database size={80} className="text-cyan" />
                </div>
                <Database className="text-cyan mb-8" size={32} />
                <h3 className="font-display font-bold text-2xl mb-2 uppercase tracking-tight">Database</h3>
                <p className="text-sm text-text-3 font-body mb-10 leading-relaxed">Manage project registry, asset inventory, and metadata logs.</p>
                <Button variant="secondary" className="w-full h-12 border-white/5 bg-white/5 hover:bg-white/10 uppercase tracking-widest text-[10px] font-bold">Sync Data</Button>
            </Card>

            <Card variant="glass" className="p-10 group hover:border-red/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Shield size={80} className="text-red" />
                </div>
                <Shield className="text-red mb-8" size={32} />
                <h3 className="font-display font-bold text-2xl mb-2 uppercase tracking-tight">Security</h3>
                <p className="text-sm text-text-3 font-body mb-10 leading-relaxed">Audit access logs, manage security keys, and monitor threats.</p>
                <Button variant="secondary" className="w-full h-12 border-white/5 bg-white/5 hover:bg-white/10 uppercase tracking-widest text-[10px] font-bold">Run Audit</Button>
            </Card>

            <Card variant="glass" className="p-10 group hover:border-text-1/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Users size={80} className="text-text-1" />
                </div>
                <Users className="text-text-1 mb-8" size={32} />
                <h3 className="font-display font-bold text-2xl mb-2 uppercase tracking-tight">User Access</h3>
                <p className="text-sm text-text-3 font-body mb-10 leading-relaxed">Monitor active sessions, task queues, and neural telemetry.</p>
                <Button variant="secondary" className="w-full h-12 border-white/5 bg-white/5 hover:bg-white/10 uppercase tracking-widest text-[10px] font-bold">View Status</Button>
            </Card>
        </div>

        <div className="space-y-8">
            <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-4 group transition-all"
            >
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-cyan/30 group-hover:bg-cyan/10 transition-all">
                    <ChevronDown size={14} className={cn("text-text-4 group-hover:text-cyan transition-transform duration-500", showAdvanced && "rotate-180")} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-4 group-hover:text-text-2 transition-colors">
                    {showAdvanced ? "Terminate Advanced Protocol" : "Initialize Advanced Protocol"}
                </span>
            </button>

            <AnimatePresence>
                {showAdvanced && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: 10, height: 0 }}
                        className="overflow-hidden"
                    >
                        <Card variant="glass-light" className="p-12 border-cyan/10">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
                                {[
                                    { label: "Stability", value: "99.9%", color: "text-cyan", icon: <Activity size={14} /> },
                                    { label: "Cache", value: "1.2GB", color: "text-red", icon: <Database size={14} /> },
                                    { label: "Security", value: "Locked", color: "text-text-0", icon: <Lock size={14} /> },
                                    { label: "Uptime", value: "342H", color: "text-cyan", icon: <Activity size={14} /> }
                                ].map((stat) => (
                                    <div key={stat.label} className="space-y-4">
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-text-4">
                                            {stat.icon}
                                            <span className="font-mono text-[9px] uppercase tracking-widest">{stat.label}</span>
                                        </div>
                                        <span className={cn("block font-display text-4xl font-bold tracking-tighter", stat.color)}>{stat.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 p-8 rounded-xl bg-bg-base/40 border border-white/5 font-mono text-[10px] text-cyan/60 leading-loose">
                                <p><span className="text-text-4">EVENT:</span> AUTH_BYPASS_INITIALIZED</p>
                                <p><span className="text-text-4">EVENT:</span> NETWORK_STABILIZED</p>
                                <p><span className="text-text-4">EVENT:</span> DATA_ENCRYPTION_SECURED</p>
                                <p className="animate-pulse">_</p>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  );
}
