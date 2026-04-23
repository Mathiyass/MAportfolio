'use client';

import Link from 'next/link';
import { useCursorStore } from '@/store/cursorStore';
import { Zap } from 'lucide-react';

import { siteConfig } from '@/lib/data';

export function Footer() {
  const { actions } = useCursorStore();
  
  const socialLinks = [
    { name: 'GitHub', href: siteConfig.links.github },
    { name: 'LinkedIn', href: siteConfig.links.linkedin },
    { name: 'X', href: siteConfig.links.twitter },
    { name: 'Discord', href: siteConfig.links.discord },
  ];

  const categories = [
    {
        name: 'Core',
        links: [
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            { name: 'Projects', href: '/projects' },
            { name: 'Skills', href: '/skills' },
            { name: 'Contact', href: '/contact' },
        ]
    },
    {
        name: 'Research',
        links: [
            { name: 'Gallery', href: '/gallery' },
            { name: 'Lab', href: '/lab' },
            { name: 'Marketplace', href: '/marketplace' },
            { name: 'AR Studio', href: '/ar' },
            { name: 'Open Source', href: '/open-source' },
        ]
    },
    {
        name: 'Personal',
        links: [
            { name: 'Resume', href: '/resume' },
            { name: 'Now', href: '/now' },
            { name: 'Uses', href: '/uses' },
            { name: 'Timeline', href: '/timeline' },
            { name: 'Certifications', href: '/certifications' },
            { name: 'Sri Lanka', href: '/sri-lanka' },
        ]
    },
    {
        name: 'System',
        links: [
            { name: 'Blog', href: '/blog' },
            { name: 'Arcade', href: '/games' },
            { name: 'Colophon', href: '/colophon' },
            { name: 'Secret', href: '/secret' },
            { name: 'Admin', href: '/admin' },
        ]
    }
  ];

  return (
    <footer className="relative z-10 border-t border-border-1 bg-bg-base py-24 lg:py-48 overflow-hidden mesh-footer">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-cyan/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-16 lg:gap-8">
          
          <div className="col-span-2 md:col-span-4 flex flex-col gap-10">
            <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-cyan/5 border border-white/5 group-hover:border-cyan/40 transition-all">
                    <Zap className="text-cyan" size={24} />
                </div>
                <h2 className="font-display text-4xl font-black text-text-0 uppercase tracking-tighter">MATHIYA.</h2>
            </div>
            <p className="text-text-2 font-body text-lg leading-relaxed max-w-sm">
              Architecting high-fidelity AI systems where technical precision meets atmospheric depth. v12.0 core stable.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {socialLinks.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[9px] uppercase tracking-[0.4em] text-text-4 hover:text-cyan transition-all"
                  onMouseEnter={() => actions.setHovering(true, 'LINK')}
                  onMouseLeave={() => actions.setHovering(false)}
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-span-2 md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {categories.map((cat) => (
                <div key={cat.name} className="space-y-10">
                    <h3 className="font-mono text-[9px] tracking-[0.5em] text-text-4 uppercase border-l border-white/10 pl-4">{cat.name}</h3>
                    <ul className="space-y-5 pl-4">
                    {cat.links.map((item) => (
                        <li key={item.href}>
                        <Link 
                            href={item.href}
                            className="text-text-2 hover:text-cyan transition-all duration-300 font-head font-bold text-xs uppercase tracking-widest block"
                        >
                            {item.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
            ))}
          </div>
          
        </div>
        
        <div className="mt-48 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-text-4 font-mono tracking-[0.4em] uppercase">
                © 2026 MATHIYA // INTEGRATED_SYSTEMS
            </p>
            <span className="text-[8px] text-cyan/40 font-mono tracking-[0.2em] uppercase">Built with Nexus Prime Architecture v12.0.4</span>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex flex-col items-end gap-1">
                <span className="font-mono text-[8px] text-text-4 uppercase tracking-widest">Latency</span>
                <span className="text-cyan font-mono text-[10px] font-bold tracking-widest">0.002ms</span>
            </div>
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="size-12 rounded-full border border-white/5 flex items-center justify-center hover:border-cyan/30 hover:bg-cyan/5 text-text-4 hover:text-cyan transition-all group"
            >
                <Zap size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
