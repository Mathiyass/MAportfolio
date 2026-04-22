'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '@/lib/data';
import { useCursorStore } from '@/store/cursorStore';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { actions } = useCursorStore();
  
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(8, 12, 20, 0)', 'rgba(8, 12, 20, 0.85)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(34, 211, 238, 0)', 'rgba(34, 211, 238, 0.1)']
  );

  const navBackdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(16px)']
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-nav transition-colors"
      style={{
        backgroundColor: navBackground,
        borderBottomWidth: '1px',
        borderBottomColor: navBorder,
        backdropFilter: navBackdropBlur,
        WebkitBackdropFilter: navBackdropBlur,
      }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          href="/"
          className="flex items-center gap-2 group"
          onMouseEnter={() => actions.setHovering(true, 'HOME')}
          onMouseLeave={() => actions.setHovering(false)}
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 overflow-hidden group-hover:border-cyan-400 transition-colors">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-display font-bold text-lg tracking-wide group-hover:text-cyan-400 transition-colors">
            MATHIYA.
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => {
            if (item.name === 'Home') return null;
            const isActive = pathname.startsWith(item.href) && item.href !== '/';
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative font-mono text-sm tracking-wider transition-colors hover:text-cyan-400 py-2",
                  isActive ? "text-cyan-400" : "text-text-2"
                )}
                onMouseEnter={() => actions.setHovering(true, item.name.toUpperCase())}
                onMouseLeave={() => actions.setHovering(false)}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:inline-flex h-10 items-center justify-center rounded-md border border-cyan-500/30 bg-cyan-500/10 px-6 font-mono text-sm tracking-wide text-cyan-400 transition-all hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            onMouseEnter={() => actions.setHovering(true, 'CONTACT')}
            onMouseLeave={() => actions.setHovering(false)}
          >
            INITIATE
          </Link>
          
          {/* Mobile menu toggle would go here */}
          <button className="md:hidden p-2 text-text-2 hover:text-cyan-400">
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-current rounded-full" />
              <span className="block w-6 h-0.5 bg-current rounded-full" />
              <span className="block w-4 h-0.5 bg-current rounded-full" />
            </div>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
