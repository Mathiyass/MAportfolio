"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { projects } from '@/lib/projects';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, Layers, Tag, Code2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  // Generate JSON-LD for the project list
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": projects.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": p.title,
        "description": p.seoDescription || p.description,
        "applicationCategory": p.category,
        "operatingSystem": p.category === 'Mobile' ? 'Android' : 'Web',
        "url": `https://mathiya.github.io/MAportfolio${p.link}`
      }
    }))
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        {/* Header Protocol */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <div className="flex items-center gap-3 text-cyan font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
                <Layers size={14} />
                SYSTEM // CATEGORIZATION // PROJECTS_PORTFOLIO
            </div>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-8 text-text-0 uppercase tracking-tighter text-balance leading-none">
                Project <br/>
                <span className="text-text-4 font-black tracking-tighter">// Archive.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Accessing high-fidelity engineering records. Exploring {projects.length} distinct system prototypes and production architectures.
            </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[400px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative",
                i % 3 === 0 ? "md:col-span-8" : "md:col-span-4"
              )}
            >
              <Card variant="glass" className="h-full group/card-item cursor-pointer overflow-hidden relative border-white/5 hover:border-cyan/20">
                {/* Power Rail */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan/50 to-transparent opacity-0 group-hover/card-item:opacity-100 transition-opacity duration-700" />
                
                <Link href={project.link} className="flex flex-col h-full relative z-10">
                    <div className="relative aspect-[21/9] md:aspect-auto md:flex-1 bg-bg-base overflow-hidden border-b border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 via-transparent to-red/5 opacity-0 group-hover/card-item:opacity-100 transition-opacity duration-700 z-0" />
                        
                        <div className="absolute inset-0 flex items-center justify-center font-display text-text-4 text-[10vw] font-black opacity-5 group-hover/card-item:scale-110 group-hover/card-item:opacity-10 transition-all duration-1000 select-none uppercase tracking-tighter italic z-0">
                            {project.category}
                        </div>

                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover/card-item:opacity-40 group-hover/card-item:scale-110 transition-all duration-1000 z-0"
                        />

                        <div className="absolute top-8 left-8 z-20">
                           <div className="px-3 py-1 rounded bg-bg-muted/80 backdrop-blur-md border border-white/10 font-mono text-[9px] text-cyan tracking-[0.2em] flex items-center gap-2">
                              <Tag size={10} />
                              ID: {project.id}
                           </div>
                        </div>

                        <div className="absolute top-8 right-8 z-20 flex gap-2">
                            {project.github && (
                                <a 
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-text-2 hover:text-cyan hover:border-cyan/30 transition-all duration-300 backdrop-blur-md"
                                    title="View Source"
                                >
                                    <Code2 size={12} />
                                </a>
                            )}
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan opacity-0 group-hover/card-item:opacity-100 translate-x-4 group-hover/card-item:translate-x-0 transition-all duration-500">
                                <span className="font-mono text-[9px] uppercase tracking-widest font-bold">ACCESS_CORE</span>
                                <ArrowUpRight size={12} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-10 flex flex-col bg-bg-muted/30 backdrop-blur-xl group-hover/card-item:bg-bg-muted/50 transition-colors">
                        <div className="flex gap-3 flex-wrap mb-6">
                            {project.tech.map(tag => (
                                <span key={tag} className="font-mono text-[8px] text-text-3 uppercase tracking-widest px-2 py-0.5 border border-white/5 rounded bg-white/5 group-hover/card-item:border-cyan/20 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-4 text-text-0 group-hover/card-item:text-cyan transition-colors tracking-tighter uppercase italic">
                            {project.title}
                        </h3>
                        <p className="text-text-2 font-body text-sm leading-relaxed line-clamp-2 max-w-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                            {project.seoDescription || project.description}
                        </p>
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