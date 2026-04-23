"use client"
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Database, Network, Shield, AlertCircle } from 'lucide-react';

const LOG_MESSAGES = [
  "INITIALIZING NEXUS_PRIME_CORE v12.0...",
  "AGENT_SWARM_ORCHESTRATION: ACTIVE",
  "LLM_CONTEXT_WINDOW: 128k_OPTIMIZED",
  "VECTOR_SIMILARITY_SEARCH: 0.04ms",
  "NEURAL_LINK_ESTABLISHED: 99.9% UPTIME",
  "BYTE_MASCOT_HEURISTICS: OPTIMAL",
  "MONITORING SYSTEM_TELEMETRY...",
  "FIREWALL_STATUS: ACTIVE",
  "DECRYPTING ARCHIVE_LOGS...",
  "UPDATING GLOBAL_STATE: ZUSTAND_SYNC",
  "COGNITIVE_LOAD: BALANCED",
  "NEXUS_PROTOCOL: ENGAGED",
];

export function SystemTerminal() {
  const [logs, setLogs] = React.useState<string[]>([]);
  const [isMinimized, setIsMinimized] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    let index = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, LOG_MESSAGES[index]];
        if (next.length > 8) return next.slice(1);
        return next;
      });
      index = (index + 1) % LOG_MESSAGES.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="container mx-auto px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative group">
          {/* Decorative Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan/20 to-red/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative glass border-white/5 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Terminal size={14} className="text-cyan" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-2">
                  System // Diagnostics // Terminal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red/40" />
                <div className="size-2 rounded-full bg-yellow-400/40" />
                <div className="size-2 rounded-full bg-green-400/40" />
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-8 font-mono text-xs md:text-sm space-y-3 min-h-[280px] bg-bg-base/60 backdrop-blur-sm">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div
                    key={log + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex gap-4 items-start"
                  >
                    <span className="text-cyan/40 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                    <span className="text-cyan/60 shrink-0">SYS_LOG:</span>
                    <span className="text-text-1 tracking-tight">{log}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-cyan ml-1 align-middle"
              />
            </div>

            {/* Status Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-white/5">
                {[
                    { label: "CPU_LOAD", value: "12%", icon: <Cpu size={12} /> },
                    { label: "MEM_USAGE", value: "2.4GB", icon: <Database size={12} /> },
                    { label: "NET_UPTIME", value: "99.9%", icon: <Network size={12} /> },
                    { label: "SEC_STATUS", value: "SHIELDED", icon: <Shield size={12} />, color: "text-green-400" },
                ].map((stat) => (
                    <div key={stat.label} className="p-4 glass-light border-white/5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-text-4">
                            {stat.icon}
                            <span className="text-[8px] uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <span className={`text-xs font-bold tracking-tighter ${stat.color || 'text-text-0'}`}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
