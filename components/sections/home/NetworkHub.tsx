"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/data';
import { 
  Github, Linkedin, Twitter, Facebook, Instagram, 
  Music, MessageSquare, MessageCircle, Gamepad2, 
  ExternalLink, Radio, ShieldAlert
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const nodes = [
  { id: 'GITHUB', label: 'GitHub', icon: <Github size={18} />, handle: '@Mathiyass', href: siteConfig.links.github, color: 'cyan' },
  { id: 'LINKEDIN', label: 'LinkedIn', icon: <Linkedin size={18} />, handle: 'Mathisha Angirasa', href: siteConfig.links.linkedin, color: 'cyan' },
  { id: 'X_CORP', label: 'X (Twitter)', icon: <Twitter size={18} />, handle: '@__Mathiya__', href: siteConfig.links.twitter, color: 'cyan' },
  { id: 'DISCORD', label: 'Discord', icon: <MessageSquare size={18} />, handle: 'Join Server', href: siteConfig.links.discord, color: 'cyan' },
  { id: 'WHATSAPP', label: 'WhatsApp', icon: <MessageCircle size={18} />, handle: '+94 71 592 1984', href: siteConfig.links.whatsapp, color: 'cyan' },
  { id: 'INSTAGRAM', label: 'Instagram', icon: <Instagram size={18} />, handle: '@mathi_ya_', href: siteConfig.links.instagram, color: 'cyan' },
  { id: 'SPOTIFY', label: 'Spotify', icon: <Music size={18} />, handle: 'M_MATHIYA', href: siteConfig.links.spotify, color: 'red' },
  { id: 'STEAM_VR', label: 'Steam', icon: <Gamepad2 size={18} />, handle: 'MATHIYA', href: siteConfig.links.steam, color: 'red' },
  { id: 'EPIC_GAMES', label: 'Epic Games', icon: <Gamepad2 size={18} />, handle: 'MATHIYA', href: siteConfig.links.epic, color: 'red' },
  { id: 'FACEBOOK', label: 'Facebook', icon: <Facebook size={18} />, handle: 'Mathisha Angirasa', href: siteConfig.links.facebook, color: 'cyan' },
  { id: 'EA_ID', label: 'EA ID', icon: <ShieldAlert size={18} />, handle: siteConfig.links.eaid, href: '#', color: 'red' },
  { id: 'GMAIL', label: 'Gmail', icon: <ExternalLink size={18} />, handle: 'Send Data', href: `mailto:${siteConfig.links.email}`, color: 'cyan' },
];

export function NetworkHub() {
  return (
    <section className="mt-40 px-6 md:px-12 max-w-[1920px] mx-auto relative z-10 mb-40">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Descriptive Text */}
        <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-32">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Radio size={14} className="text-cyan animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan">Global Linkage</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-display font-bold text-text-0 uppercase tracking-tighter leading-none">
              Network <br/>
              <span className="text-text-4 font-black tracking-tighter">// Command.</span>
            </h2>
          </div>
          <p className="text-xl text-text-2 font-body max-w-md leading-relaxed border-l border-white/10 pl-8">
            Integrated neural-link infrastructure connecting professional, social, and gaming protocols. 
            Establishing high-bandwidth synchronization across all major nodes in the Nexus Ecosystem.
          </p>
          
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-1">
                <span className="font-mono text-[8px] text-text-4 uppercase tracking-[0.3em]">Protocol Status</span>
                <span className="text-cyan font-head font-bold text-xs">ENCRYPTED_SECURE</span>
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-mono text-[8px] text-text-4 uppercase tracking-[0.3em]">Neural Bandwidth</span>
                <span className="text-red font-head font-bold text-xs">10GBPS_NOMINAL</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-dashed border-white/5 bg-white/[0.01] flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <ShieldAlert size={14} className="text-red" />
              <span className="font-mono text-[9px] text-text-4 uppercase tracking-[0.2em]">Verification Required</span>
            </div>
            <p className="text-[10px] text-text-3 font-body opacity-60">
              External system verification is required for full encrypted link access. Some nodes may operate on public bandwidth protocols.
            </p>
          </div>
        </div>

        {/* Right Side: Node Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {nodes.map((node, i) => (
              <motion.a
                key={node.id}
                href={node.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-full"
              >
                <Card variant="glass" className="p-8 h-full flex flex-col items-start gap-8 group-hover:border-cyan/40 transition-all duration-500 overflow-hidden relative min-h-[220px]">
                  {/* Internal Glow */}
                  <div className={`absolute -inset-20 bg-${node.color}/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/5 group-hover:border-cyan/20" />
                  <div className="absolute top-4 right-4 font-mono text-[7px] text-text-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    {node.id}
                  </div>

                  <div className={`p-5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-${node.color}/30 group-hover:bg-${node.color}/10 group-hover:text-${node.color} transition-all duration-500 relative z-10`}>
                    {node.icon}
                  </div>
                  
                  <div className="space-y-3 relative z-10 w-full">
                    <h3 className="font-display font-bold text-xl text-text-0 group-hover:text-cyan transition-colors">{node.label}</h3>
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-text-3 tracking-widest uppercase">{node.handle}</span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-60 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                        <span className="font-mono text-[7px] uppercase tracking-tighter">UPLINK_STATUS: STABLE</span>
                        <ExternalLink size={8} className="text-cyan" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between px-4">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                   <span className="font-mono text-[9px] text-text-3 uppercase tracking-widest">Global Synced</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
                   <span className="font-mono text-[9px] text-text-3 uppercase tracking-widest">Entertainment Node Active</span>
                </div>
             </div>
             <span className="font-mono text-[9px] text-text-4 uppercase tracking-[0.4em]">v12.0.SYSTEM_MESH</span>
          </div>
        </div>
      </div>
    </section>
  );
}

