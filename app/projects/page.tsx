"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { projects } from '@/lib/projects';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                Work Archive
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 text-text-0">
                All <span className="gradient-text">Work</span>.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                A comprehensive registry of production systems, experimental prototypes, and academic research.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="h-full group/card-item cursor-pointer">
                <Link href={project.link} className="flex flex-col h-full">
                    <div className="relative aspect-[16/10] bg-bg-muted overflow-hidden border-b border-border-1">
                        <div className="absolute inset-0 bg-cyan/5 group-hover/card-item:bg-cyan/10 transition-colors duration-500 z-10" />
                        <div className="absolute inset-0 flex items-center justify-center font-display text-text-4 text-6xl font-bold opacity-10 group-hover/card-item:scale-110 group-hover/card-item:opacity-20 transition-all duration-1000">
                            {project.id.toUpperCase()}
                        </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                        <div className="flex gap-2 flex-wrap mb-6">
                            {project.tech.map(tag => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h3 className="text-2xl font-display font-bold mb-3 text-text-0 group-hover/card-item:text-cyan transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-text-2 mb-8 flex-grow font-body text-sm leading-relaxed line-clamp-3">
                            {project.description}
                        </p>
                        <div className="mt-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/70 group-hover/card-item:text-cyan transition-colors">
                            Initialize Link <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
