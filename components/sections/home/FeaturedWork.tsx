"use client"
import * as React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export function FeaturedWork() {
  const featured = projects.slice(0, 3);

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-4"
            >
              01 — Selected Projects
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold mb-6 text-text-0"
            >
              Featured <span className="gradient-text">Work</span>.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-2 text-lg sm:text-xl font-body max-w-xl leading-relaxed"
            >
              High-impact solutions combining technical depth with premium design standards.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/projects" className="group flex items-center gap-3 text-text-1 hover:text-cyan transition-all duration-300 font-mono uppercase tracking-[0.2em] text-xs py-2">
              Browse All Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="h-full flex flex-col group/item cursor-pointer">
                <Link href={project.link} className="flex flex-col h-full">
                  <div className="relative aspect-[16/10] bg-bg-muted overflow-hidden border-b border-border-1">
                    <div className="absolute inset-0 bg-cyan/5 group-hover/item:bg-cyan/10 transition-colors duration-500 z-10" />
                    <div className="absolute inset-0 flex items-center justify-center font-display text-text-4 text-6xl font-bold opacity-10 group-hover/item:scale-110 group-hover/item:opacity-20 transition-all duration-1000">
                      {project.id.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex gap-2 flex-wrap mb-6">
                      {project.tech.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold mb-3 text-text-0 group-hover/item:text-cyan transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-text-2 mb-8 flex-grow font-body line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/70 group-hover/item:text-cyan transition-colors">
                      Deep Dive <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
