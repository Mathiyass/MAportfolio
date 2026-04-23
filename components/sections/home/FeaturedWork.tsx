"use client"
import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
          const icon = ['deployed_code', 'monitoring', 'token', 'terminal'][i % 4];
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group glass rounded-[16px] p-1 overflow-hidden transition-all duration-500 hover:-translate-y-2 ${isRed ? 'lg:mt-12' : ''}`}
            >
              <div className="relative bg-[#080C14]/80 rounded-[15px] p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-12">
                  <span className={`material-symbols-outlined text-4xl ${colorText}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  <span className="font-mono text-xs text-text-3 opacity-50 uppercase">{project.date.split('-')[0]} {'//'} SYSTEM_ARCH</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-4 text-text-0 group-hover:text-cyan transition-colors">{project.title}</h3>
                <p className="font-body text-text-2 mb-8 line-clamp-3 leading-relaxed flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.slice(0, 3).map(tag => (
                    <span key={tag} className={`px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono ${colorText} border ${colorBorder} uppercase`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={project.link} className={`inline-flex items-center gap-2 font-bold text-sm text-text-0 group-hover:${colorText} transition-colors`}>
                  Explore Case Study <span className="material-symbols-outlined text-sm">arrow_outward</span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
