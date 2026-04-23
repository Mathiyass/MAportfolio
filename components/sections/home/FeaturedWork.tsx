"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github } from 'lucide-react';
import { projects } from '@/lib/projects';

export function FeaturedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section className="mt-40 px-6 md:px-12 max-w-[1920px] mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div className="max-w-2xl">
          <span className="font-mono text-xs text-red uppercase tracking-[0.3em] mb-4 block">Selected Archive</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-text-0">Engineering excellence <br/> in every layer</h2>
        </div>
        <div className="font-body text-text-2 max-w-xs pb-2 leading-relaxed">
          A curated selection of projects spanning systems architecture, full-stack, and high-fidelity interfaces.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {featured.map((project, i) => {
          const isRed = i % 2 !== 0;
          const colorText = isRed ? 'text-red' : 'text-cyan';
          const colorBorder = isRed ? 'border-red/20' : 'border-cyan/20';
          const colorBg = isRed ? 'bg-red/5' : 'bg-cyan/5';
          const icon = ['deployed_code', 'monitoring', 'token', 'terminal'][i % 4];
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group glass rounded-[24px] p-1 overflow-hidden transition-all duration-700 hover:-translate-y-3 ${isRed ? 'lg:mt-24' : ''}`}
            >
              <div className="relative bg-[#080C14]/90 rounded-[23px] p-10 h-full flex flex-col border border-white/5 group-hover:border-white/10 transition-colors">
                {/* Decorative Technical Markers */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/10 group-hover:border-cyan/40 transition-colors" />
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/10 group-hover:border-cyan/40 transition-colors" />

                <div className="flex justify-between items-start mb-16">
                  <div className={`p-4 rounded-2xl ${colorBg} border border-white/5 group-hover:border-current transition-all ${colorText}`}>
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-4">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-white/5 text-text-4 hover:text-cyan hover:bg-cyan/10 border border-white/5 transition-all"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      <span className="font-mono text-[9px] text-text-4 uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Record_{project.id}</span>
                    </div>
                    <span className="font-mono text-[8px] text-text-4 uppercase tracking-widest mt-1">{project.date.split('-')[0]} // STABLE</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                    <h3 className="font-display text-3xl font-black text-text-0 group-hover:text-cyan transition-colors uppercase tracking-tighter leading-none">{project.title}</h3>
                    <p className="font-body text-lg text-text-2 line-clamp-2 leading-relaxed flex-grow opacity-80 group-hover:opacity-100 transition-opacity">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-12">
                  {project.tech.slice(0, 3).map(tag => (
                    <span key={tag} className={`px-4 py-1.5 rounded-lg bg-white/5 text-[9px] font-mono ${colorText} border ${colorBorder} uppercase tracking-wider`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <Link 
                        href={project.link} 
                        className={`group/btn flex items-center justify-between w-full p-4 rounded-xl glass-nav hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.3em] ${colorText}`}
                    >
                        <span>Initialize Case Study</span>
                        <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
