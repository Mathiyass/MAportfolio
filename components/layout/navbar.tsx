'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/data';
import { useCursorStore } from '@/store/cursorStore';
import { cn } from '@/lib/utils';
import { Zap, ChevronDown, Menu, X, Terminal, Cpu, Activity, Globe, Shield, User, Info, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { actions: cursorActions } = useCursorStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const coreLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Blog', href: '/blog' },
    { name: 'Games', href: '/games' },
  ];

  const secondaryLinks = [
    { name: 'Contact', href: '/contact', icon: <Terminal size={14} />, category: 'Core' },
    { name: 'Gallery', href: '/gallery', icon: <Activity size={14} />, category: 'Research' },
    { name: 'Lab', href: '/lab', icon: <Cpu size={14} />, category: 'Research' },
    { name: 'Marketplace', href: '/marketplace', icon: <Globe size={14} />, category: 'Research' },
    { name: 'AR', href: '/ar', icon: <Cpu size={14} />, category: 'Research' },
    { name: 'Resume', href: '/resume', icon: <FileText size={14} />, category: 'Personal' },
    { name: 'Now', href: '/now', icon: <Activity size={14} />, category: 'Personal' },
    { name: 'Uses', href: '/uses', icon: <Info size={14} />, category: 'Personal' },
    { name: 'Certifications', href: '/certifications', icon: <Shield size={14} />, category: 'Personal' },
    { name: 'Timeline', href: '/timeline', icon: <Activity size={14} />, category: 'Personal' },
    { name: 'Open Source', href: '/open-source', icon: <Globe size={14} />, category: 'Research' },
    { name: 'Sri Lanka', href: '/sri-lanka', icon: <Globe size={14} />, category: 'Personal' },
    { name: 'Colophon', href: '/colophon', icon: <Info size={14} />, category: 'Legal' },
    { name: 'Secret', href: '/secret', icon: <Shield size={14} />, category: 'Legal' },
    { name: 'Admin', href: '/admin', icon: <Shield size={14} />, category: 'Legal' },
  ];

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-nav transition-all duration-500",
          isScrolled ? "glass-nav py-3" : "bg-transparent py-6"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-3 group relative z-[100]"
            onMouseEnter={() => cursorActions.setHovering(true, 'HOME')}
            onMouseLeave={() => cursorActions.setHovering(false)}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-cyan/5 border border-white/5 overflow-hidden group-hover:border-cyan/40 transition-all duration-500">
              <Zap className="w-5 h-5 text-cyan group-hover:scale-110 transition-transform shadow-[0_0_15px_#00f0ff]" />
              <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col gap-0.5">
                <span className="font-display font-black text-xl tracking-tighter text-text-0 group-hover:text-cyan transition-colors">
                    MATHIYA.
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-text-4 group-hover:text-cyan/60 transition-colors">Nexus_Prime_v12</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {coreLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative font-head font-bold text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-lg transition-all hover:bg-white/5",
                    isActive ? "text-cyan" : "text-text-2 hover:text-text-0"
                  )}
                  onMouseEnter={() => cursorActions.setHovering(true, item.name.toUpperCase())}
                  onMouseLeave={() => cursorActions.setHovering(false)}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-1.5 left-5 right-5 h-[1px] bg-cyan shadow-[0_0_10px_#00f0ff]"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger 
                className="flex items-center gap-2 font-head font-bold text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-lg text-text-2 hover:text-text-0 hover:bg-white/5 transition-all outline-none"
                onMouseEnter={() => cursorActions.setHovering(true, 'MORE')}
                onMouseLeave={() => cursorActions.setHovering(false)}
              >
                Modules <ChevronDown size={14} className="text-text-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-refraction p-2 border-white/5 translate-y-2">
                <DropdownMenuLabel className="font-mono text-[8px] uppercase tracking-[0.3em] text-text-4 mb-2 ml-1">Advanced Protocols</DropdownMenuLabel>
                
                {['Core', 'Research', 'Personal', 'Legal'].map((cat) => (
                    <div key={cat} className="mb-2 last:mb-0">
                        <div className="px-2 py-1 text-[9px] font-mono text-cyan/40 uppercase tracking-widest border-l border-cyan/20 ml-1 mb-1">{cat}</div>
                        {secondaryLinks.filter(l => l.category === cat).map((link) => (
                            <DropdownMenuItem key={link.href} className="p-0 focus:bg-transparent">
                                <Link 
                                    href={link.href} 
                                    className="flex items-center gap-3 px-3 py-2 cursor-pointer group/item w-full"
                                    onMouseEnter={() => cursorActions.setHovering(true, link.name.toUpperCase())}
                                    onMouseLeave={() => cursorActions.setHovering(false)}
                                >
                                    <div className="p-1.5 rounded bg-white/5 text-text-3 group-hover/item:text-cyan group-hover/item:bg-cyan/10 transition-all">
                                        {link.icon}
                                    </div>
                                    <span className="font-head font-bold text-[10px] uppercase tracking-widest text-text-2 group-hover/item:text-text-0">{link.name}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex h-11 items-center justify-center rounded-xl border border-cyan/20 bg-cyan/5 px-8 font-head font-black text-[10px] tracking-[0.2em] uppercase text-cyan transition-all hover:bg-cyan/10 hover:border-cyan/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] active:scale-95"
              onMouseEnter={() => cursorActions.setHovering(true, 'UPLINK')}
              onMouseLeave={() => cursorActions.setHovering(false)}
            >
              Initialize Uplink
            </Link>
            
            {/* Mobile menu toggle */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative z-[100] p-3 rounded-xl bg-white/5 border border-white/5 text-text-2 hover:text-cyan transition-all"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-bg-base flex flex-col p-8 pt-32 overflow-y-auto"
          >
            {/* Ambient Background for Menu */}
            <div className="absolute inset-0 energy-mesh opacity-20 pointer-events-none" />

            <div className="container mx-auto space-y-16 relative z-10">
                <div className="space-y-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyan block mb-4">Core Architecture</span>
                    <div className="grid gap-4">
                        {[...coreLinks, { name: 'Home', href: '/' }].map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href}
                                className="text-4xl font-display font-black text-text-0 hover:text-cyan transition-colors uppercase tracking-tighter"
                            >
                                {link.name}.
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-8 pb-20">
                    <div className="space-y-6">
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-red block border-l border-red/30 pl-4">Research</span>
                        <div className="flex flex-col gap-4 pl-4">
                            {secondaryLinks.filter(l => l.category === 'Research').map((link) => (
                                <Link key={link.href} href={link.href} className="text-sm font-head font-bold text-text-2 hover:text-text-0 uppercase tracking-widest">{link.name}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-text-4 block border-l border-white/10 pl-4">Personal</span>
                        <div className="flex flex-col gap-4 pl-4">
                            {secondaryLinks.filter(l => l.category === 'Personal').map((link) => (
                                <Link key={link.href} href={link.href} className="text-sm font-head font-bold text-text-2 hover:text-text-0 uppercase tracking-widest">{link.name}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Footer Stats */}
            <div className="mt-auto pt-12 border-t border-white/5 flex flex-col gap-8 relative z-10">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="font-mono text-[8px] text-text-4 uppercase tracking-widest">Uptime</span>
                        <span className="text-cyan font-head font-bold">99.98%</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="font-mono text-[8px] text-text-4 uppercase tracking-widest">Latency</span>
                        <span className="text-red font-head font-bold">0.002ms</span>
                    </div>
                </div>
                <Button variant="primary" className="w-full h-16 uppercase tracking-[0.3em] font-black text-xs">
                    Connect Uplink
                </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
