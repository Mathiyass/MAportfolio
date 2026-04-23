"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Code, Cpu, Database, Globe, Layers, 
  Layout, Terminal, Zap, Server, Shield, Activity
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const domains = [
  {
    id: 'COG_AI',
    title: 'Cognitive AI',
    description: 'Developing autonomous agent swarms and neural orchestration layers.',
    icon: <Brain size={24} />,
    color: 'cyan',
    tech: ['LLMs', 'Neural Nets', 'LangChain'],
    metric: '92% EFFICIENCY'
  },
  {
    id: 'SPA_SYS',
    title: 'Spatial Systems',
    description: 'Immersive WebGL environments and real-time volumetric rendering.',
    icon: <Globe size={24} />,
    color: 'red',
    tech: ['Three.js', 'GLSL', 'Shaders'],
    metric: '144 FPS_STABLE'
  },
  {
    id: 'DIS_ARCH',
    title: 'Distributed Arch',
    description: 'High-performance cloud infrastructure and microservice patterns.',
    icon: <Server size={24} />,
    color: 'cyan',
    tech: ['Node.js', 'PostgreSQL', 'Docker'],
    metric: '99.9% UPTIME'
  },
  {
    id: 'INT_CORE',
    title: 'Interface Core',
    description: 'System-driven UI/UX with mathematical precision and motion depth.',
    icon: <Layout size={24} />,
    color: 'red',
    tech: ['React 19', 'Next.js 15', 'Framer'],
    metric: '0.4s RESPONSE'
  }
];

export function DigitalEcosystem() {
  return (
    <section className="mt-40 px-6 md:px-12 max-w-[1920px] mx-auto mb-40">
      <div className="flex flex-col items-center mb-24 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.5em] mb-6"
        >
          <Activity size={14} />
          SYSTEM // ECOSYSTEM_SURVEY
        </motion.div>
        <h2 className="text-5xl md:text-8xl font-display font-black text-text-0 uppercase tracking-tighter mb-8">
          Digital <span className="gradient-text">Ecosystem</span>.
        </h2>
        <p className="text-text-2 text-xl font-body max-w-2xl leading-relaxed">
          A multidimensional map of technical domains integrated into the Nexus Prime framework. 
          Each node represents a critical pillar of computational innovation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {domains.map((domain, i) => (
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="glass" className="group p-8 h-full flex flex-col border-white/5 hover:border-cyan/30 transition-all duration-700 relative overflow-hidden">
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${domain.color}/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
              
              <div className="flex items-center justify-between mb-10">
                <div className={`p-4 rounded-2xl bg-white/5 text-${domain.color} border border-white/10 group-hover:bg-${domain.color}/10 group-hover:border-${domain.color}/20 transition-all duration-500`}>
                  {domain.icon}
                </div>
                <span className="font-mono text-[8px] text-text-4 uppercase tracking-widest">{domain.id}</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-text-0 mb-4 group-hover:text-cyan transition-colors">{domain.title}</h3>
              <p className="text-text-2 text-sm font-body leading-relaxed mb-8 flex-grow">
                {domain.description}
              </p>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {domain.tech.map(t => (
                    <span key={t} className="font-mono text-[8px] text-text-3 px-2 py-1 rounded bg-white/5 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full bg-${domain.color}`} />
                    <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{domain.metric}</span>
                  </div>
                  <Shield size={12} className="text-text-4 opacity-40" />
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/5 group-hover:border-cyan/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/5 group-hover:border-cyan/40 transition-colors" />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
