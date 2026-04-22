'use client';

import Link from 'next/link';
import { useCursorStore } from '@/store/cursorStore';
import { motion } from 'motion/react';

export function Footer() {
  const { actions } = useCursorStore();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Arsenal', href: '/skills' },
    { name: 'Arcade', href: '/games' },
    { name: 'Lab', href: '/lab' },
  ];

  return (
    <footer className="relative z-10 border-t border-border-1 bg-bg-base py-20 lg:py-32 overflow-hidden mesh-footer">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="md:col-span-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-8 text-text-0">MATHIYA.</h2>
            <p className="text-text-2 font-body text-lg max-w-md mb-12 leading-relaxed">
              Software Engineering Student · Full-Stack Developer · Systems Builder. 
              Engineering digital products with a focus on precision and performance.
            </p>
            <div className="flex flex-wrap gap-6">
              {['GitHub', 'LinkedIn', 'X', 'Discord'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-3 hover:text-cyan transition-colors"
                  onMouseEnter={() => actions.setHovering(true, 'LINK')}
                  onMouseLeave={() => actions.setHovering(false)}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.4em] text-text-4 mb-10 uppercase">Index</h3>
            <ul className="space-y-6">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className="text-text-1 hover:text-cyan transition-all duration-300 font-head text-sm uppercase tracking-widest"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.4em] text-text-4 mb-10 uppercase">Connectivity</h3>
            <div className="flex flex-col gap-8">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan/20 bg-cyan/5 w-fit">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-cyan uppercase">System Online</span>
                </div>
                <div className="space-y-2">
                    <p className="text-xs text-text-3 font-mono tracking-widest uppercase">Location</p>
                    <p className="text-sm text-text-1 font-body">Sri Lanka, Global</p>
                </div>
            </div>
          </div>
          
        </div>
        
        <div className="mt-32 pt-12 border-t border-border-1 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-text-3 font-mono tracking-[0.2em] uppercase">
            © 2025 MATHIYA — Mathisha Angirasa
          </p>
          <div className="flex items-center gap-8 text-[10px] text-text-4 font-mono tracking-[0.2em] uppercase">
            <span>Built with Nexus Prime v12.0</span>
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="hover:text-cyan transition-colors"
            >
                Back to Surface
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
