'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useCursorStore } from '@/store/cursorStore';
import { cn } from '@/lib/utils';
import { Zap, ChevronDown, Menu, X, Terminal, Cpu, Activity, Globe, Shield, Info, FileText, Clock, Radio, Search, LayoutPanelLeft } from 'lucide-react';
import { SivionLogo } from '@/components/ui/SivionLogo';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { actions: cursorActions } = useCursorStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [time, setTime] = useState('');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
    { name: 'Contact', href: '/contact', icon: <Terminal size={14} />, category: 'Main', desc: 'Get in touch' },
    { name: 'Gallery', href: '/gallery', icon: <Activity size={14} />, category: 'Creative', desc: 'Visual work' },
    { name: 'Lab', href: '/lab', icon: <Cpu size={14} />, category: 'Creative', desc: 'Experiments & Prototypes' },
    { name: 'Marketplace', href: '/marketplace', icon: <Globe size={14} />, category: 'Creative', desc: 'Digital assets' },
    { name: 'AR Studio', href: '/ar', icon: <Cpu size={14} />, category: 'Creative', desc: 'Spatial experiences' },
    { name: 'Resume', href: '/resume', icon: <FileText size={14} />, category: 'Personal', desc: 'Professional background' },
    { name: 'Now', href: '/now', icon: <Activity size={14} />, category: 'Personal', desc: 'Current focus' },
    { name: 'Uses', href: '/uses', icon: <Info size={14} />, category: 'Personal', desc: 'Toolkit & Specs' },
    { name: 'Certifications', href: '/certifications', icon: <Shield size={14} />, category: 'Personal', desc: 'Verified skills' },
    { name: 'Timeline', href: '/timeline', icon: <Activity size={14} />, category: 'Personal', desc: 'Experience log' },
    { name: 'Open Source', href: '/open-source', icon: <Globe size={14} />, category: 'Creative', desc: 'Community work' },
    { name: 'Sri Lanka', href: '/sri-lanka', icon: <Globe size={14} />, category: 'Personal', desc: 'Base of operations' },
    { name: 'Colophon', href: '/colophon', icon: <Info size={14} />, category: 'Site', desc: 'Build details' },
    { name: 'Secret', href: '/secret', icon: <Shield size={14} />, category: 'Site', desc: 'Classified' },
    { name: 'Admin', href: '/admin', icon: <Shield size={14} />, category: 'Site', desc: 'Management' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[var(--z-nav)] flex justify-center pointer-events-none p-4">
        <motion.header
          className={cn(
            "pointer-events-auto overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group/nav transition-colors duration-700",
            !isScrolled && "border-white/5 shadow-none"
          )}
          initial={{ y: -100, width: '98%', borderRadius: '24px' }}
          animate={{ 
            y: 0,
            width: isScrolled ? '80%' : '98%',
            maxWidth: isScrolled ? '1100px' : '1800px',
            borderRadius: isScrolled ? '9999px' : '24px',
            backgroundColor: isScrolled ? 'rgba(15, 19, 28, 0.5)' : 'rgba(15, 19, 28, 0.08)',
            backdropFilter: isScrolled ? 'blur(24px) saturate(2)' : 'blur(10px) saturate(1.2)',
            height: isScrolled ? '64px' : '96px',
          }}
          transition={{ 
            width: { duration: 3.0, ease: [0.22, 1, 0.36, 1] },
            maxWidth: { duration: 3.0, ease: [0.22, 1, 0.36, 1] },
            borderRadius: { duration: 3.0, ease: [0.22, 1, 0.36, 1] },
            height: { duration: 3.0, ease: [0.22, 1, 0.36, 1] },
            backgroundColor: { duration: 2.5 },
            backdropFilter: { duration: 2.5 },
            y: { duration: 0.8, ease: "easeOut" }
          }}
        >
          {/* Internal Noise Overlay */}
          <div className="absolute inset-0 noise opacity-[0.03] pointer-events-none" />
          
          <AnimatePresence>
            {isScrolled && (
              <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none z-0"
              >
                  <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(0,240,255,0.05),transparent)] animate-ticker" style={{ animationDuration: '6s' }} />
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red/10 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className={cn(
            "w-full h-full flex items-center justify-between transition-all duration-[3000ms] ease-[0.22,1,0.36,1] relative z-10",
            isScrolled ? "px-10" : "px-8"
          )}>
            {/* Logo Section */}
            <div className="flex items-center gap-4">
                <Link 
                  href="/"
                  className="flex items-center gap-3 group relative z-[2100]"
                  onMouseEnter={() => cursorActions.setHovering(true, 'HOME')}
                  onMouseLeave={() => cursorActions.setHovering(false)}
                >
                  <div className={cn(
                    "relative flex items-center justify-center rounded-full bg-cyan-500/5 border border-white/10 overflow-hidden group-hover:border-cyan-500/50 transition-all duration-[3000ms] ease-[0.22,1,0.36,1]",
                    isScrolled ? "w-9 h-9 shadow-[0_0_20px_rgba(0,240,255,0.2)]" : "w-14 h-14"
                  )}>
                    <SivionLogo size={isScrolled ? 24 : 32} />
                    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                      <span className={cn(
                        "font-display font-black tracking-tighter text-text-0 group-hover:text-cyan transition-colors whitespace-nowrap",
                        isScrolled ? "text-xl" : "text-2xl"
                      )}>
                          MATHIYA<span className="text-cyan">.</span>
                      </span>
                  </div>
                </Link>
            </div>

            {/* Desktop Nav Links */}
            <nav className={cn(
                "hidden lg:flex items-center transition-all duration-[3000ms] ease-[0.22,1,0.36,1]",
                isScrolled ? "gap-0.5" : "gap-2"
            )}>
              {coreLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative flex flex-col font-head font-bold uppercase transition-all duration-[3000ms] ease-[0.22,1,0.36,1] hover:bg-white/5 whitespace-nowrap group/link items-center",
                      isScrolled ? "text-[10px] tracking-[0.15em] px-5 py-2 rounded-full" : "text-[11px] tracking-[0.2em] px-6 py-2.5 rounded-xl",
                      isActive ? "text-cyan" : "text-text-2 hover:text-text-0"
                    )}
                    onMouseEnter={() => cursorActions.setHovering(true, item.name.toUpperCase())}
                    onMouseLeave={() => cursorActions.setHovering(false)}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bg-cyan shadow-[0_0_10px_#00f0ff] bottom-1.5 left-5 right-5 h-[1.5px]"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              <DropdownMenu>
                <DropdownMenuTrigger 
                  className={cn(
                    "flex items-center gap-2 font-head font-bold uppercase transition-all duration-[3000ms] ease-[0.22,1,0.36,1] outline-none hover:bg-white/5 rounded-full whitespace-nowrap",
                    isScrolled ? "text-[10px] tracking-[0.15em] px-5 py-2" : "text-[11px] tracking-[0.2em] px-6 py-2.5 text-text-2 hover:text-text-0"
                  )}
                  onMouseEnter={() => cursorActions.setHovering(true, 'MORE')}
                  onMouseLeave={() => cursorActions.setHovering(false)}
                >
                  More <ChevronDown size={14} className="text-text-4 transition-transform group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-[900px] bg-bg-base/95 backdrop-blur-[40px] p-0 border border-white/10 translate-y-4 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                    <div className="flex flex-col">
                        <div className="px-10 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan">Node // Hierarchy // Matrix</span>
                            <div className="flex gap-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-text-3">System Link Active</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-text-3">Encryption Secured</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-10">
                            <DropdownMenuGroup className="grid grid-cols-4 gap-x-12 gap-y-16">
                                {['Main', 'Creative', 'Personal', 'Site'].map((cat) => (
                                    <div key={cat} className="space-y-8">
                                        <div className="flex items-center gap-3 border-l-2 border-cyan/30 pl-4 py-1 bg-cyan/5">
                                            <span className="text-[10px] font-display font-black text-text-0 uppercase tracking-[0.3em]">{cat}</span>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {secondaryLinks.filter(l => l.category === cat).map((link) => (
                                                <DropdownMenuItem key={link.href} className="p-0 focus:bg-transparent group/item overflow-visible">
                                                    <Link 
                                                        href={link.href} 
                                                        className="flex items-start gap-4 p-4 cursor-pointer w-full rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all relative overflow-visible"
                                                        onMouseEnter={() => cursorActions.setHovering(true, link.name.toUpperCase())}
                                                        onMouseLeave={() => cursorActions.setHovering(false)}
                                                    >
                                                        {/* Advanced Hover Reveal (from screenshot) */}
                                                        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 rounded-full border border-cyan/20 opacity-0 group-hover/item:opacity-100 transition-all duration-500 scale-50 group-hover/item:scale-100 flex items-center justify-center bg-cyan/5">
                                                            <span className="font-mono text-[6px] text-cyan uppercase tracking-tighter opacity-40">{link.name}</span>
                                                        </div>

                                                        <div className="p-3 rounded-xl bg-bg-muted border border-white/5 text-text-4 group-hover/item:text-cyan group-hover/item:border-cyan/40 group-hover/item:bg-cyan/5 transition-all mt-0.5 relative z-10">
                                                            {link.icon}
                                                        </div>
                                                        <div className="flex flex-col gap-1 relative z-10">
                                                            <span className="font-head font-bold text-xs uppercase tracking-widest text-text-1 group-hover/item:text-cyan transition-colors">{link.name}</span>
                                                            <span className="text-[9px] text-text-4 font-body group-hover/item:text-text-3 transition-colors leading-relaxed">{link.desc}</span>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </DropdownMenuGroup>
                        </div>

                        <div className="bg-bg-muted/80 border-t border-white/5 py-3 px-10 flex justify-between items-center overflow-hidden">
                            <div className="flex items-center gap-4 text-cyan/20">
                                <Radio size={12} className="animate-pulse" />
                                <span className="font-mono text-[8px] uppercase tracking-[0.6em]">ESTABLISHING_NEURAL_LINK_BYPASS... VERIFIED</span>
                            </div>
                            <span className="font-mono text-[8px] text-text-4 uppercase tracking-[0.4em]">PORTFOLIO_V12.FINAL</span>
                        </div>
                    </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Action Group */}
            <div className="flex items-center gap-4">
                <Link
                    href="/contact"
                    className={cn(
                    "hidden lg:inline-flex items-center justify-center font-head font-black uppercase text-cyan transition-all duration-[3000ms] ease-[0.22,1,0.36,1] hover:bg-cyan/10 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] active:scale-95 whitespace-nowrap rounded-full border border-cyan/30",
                    isScrolled 
                        ? "h-9 px-8 bg-cyan/10 text-[9px] tracking-[0.2em]" 
                        : "h-11 px-10 bg-cyan/5 text-[11px] tracking-[0.3em]"
                    )}
                    onMouseEnter={() => cursorActions.setHovering(true, 'UPLINK')}
                    onMouseLeave={() => cursorActions.setHovering(false)}
                >
                    Say Hello
                </Link>
              
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={cn(
                        "lg:hidden relative z-[2100] rounded-full bg-white/5 border border-white/10 text-text-2 hover:text-cyan transition-all duration-[3000ms] ease-[0.22,1,0.36,1]",
                        isScrolled ? "p-3" : "p-4"
                    )}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[2050] bg-bg-base flex flex-col p-8 pt-32 overflow-y-auto"
          >
            <div className="absolute inset-0 energy-mesh opacity-30 pointer-events-none" />

            <div className="container mx-auto space-y-16 relative z-10">
                <div className="space-y-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyan block mb-4">Core</span>
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

                <div className="grid grid-cols-2 gap-x-12 gap-y-12 pb-20">
                    <div className="space-y-6">
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-red block border-l border-red/30 pl-4">Creative</span>
                        <div className="flex flex-col gap-4 pl-4">
                            {secondaryLinks.filter(l => l.category === 'Creative').map((link) => (
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
            
            <div className="mt-auto pt-12 border-t border-white/5 flex flex-col gap-8 relative z-10">
                <div className="flex justify-between items-center px-2">
                    <div className="flex flex-col">
                        <span className="font-mono text-[8px] text-text-4 uppercase tracking-widest">Uptime</span>
                        <span className="text-cyan font-head font-bold">99.98%</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="font-mono text-[8px] text-text-4 uppercase tracking-widest">Latency</span>
                        <span className="text-red font-head font-bold">0.002ms</span>
                    </div>
                </div>
                <Button variant="primary" className="w-full h-16 uppercase tracking-[0.3em] font-black text-xs rounded-full">
                    Say Hello
                </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
