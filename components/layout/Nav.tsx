"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Nav() {
  const pathname = usePathname();
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/skills', label: 'Arsenal' },
    { href: '/projects', label: 'Projects' },
    { href: '/games', label: 'Arcade' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-border-1 glass-nav">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 sm:px-12">
        <Link href="/" className="font-display font-bold text-2xl tracking-widest group">
          <span className="text-text-0 group-hover:text-cyan transition-all duration-300">MATHIYA</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10">
          {links.map(link => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "font-head text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:text-cyan relative py-2",
                pathname === link.href ? "text-cyan" : "text-text-2"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan shadow-[0_0_10px_#22D3EE]" 
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
            <Link href="/contact">
                <button className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] border border-cyan/30 px-6 py-2.5 rounded-full hover:bg-cyan/10 hover:border-cyan transition-all duration-300 text-cyan">
                    Initialize Project
                </button>
            </Link>
            {/* Mobile menu could be expanded here */}
            <button className="md:hidden text-text-2 hover:text-cyan p-2">
                <div className="w-6 h-0.5 bg-current mb-1.5" />
                <div className="w-6 h-0.5 bg-current" />
            </button>
        </div>
      </div>
    </header>
  );
}
