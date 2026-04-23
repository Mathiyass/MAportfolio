"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';

export default function BlogPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-red mb-6 block">
                Information Feed // SIVION_INTEL
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 text-text-0">
                The <span className="gradient-text">Log</span>.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Strategic technical write-ups, architecture retrospectives, and deep-dives into SIVION's autonomous AI infrastructure.
            </p>
        </motion.div>

        <div className="grid gap-8 max-w-5xl">
            {blogPosts.map((post, i) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                    <Link href={`/blog/${post.id.toLowerCase()}`}>
                        <Card variant="glass" className="p-8 group hover:border-red/30 transition-all flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <Badge variant="outline" className="text-red border-red/20">{post.category}</Badge>
                                    <span className="font-mono text-[9px] text-text-4 uppercase tracking-widest">{post.id}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-text-0 group-hover:text-red transition-colors mb-4">{post.title}</h2>
                                <p className="text-text-2 font-body text-base leading-relaxed line-clamp-2 max-w-2xl">{post.excerpt}</p>
                            </div>
                            
                            <div className="flex flex-col gap-4 md:items-end shrink-0 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-border-1 md:pl-8">
                                <div className="flex items-center gap-2 text-text-3 font-mono text-[10px] uppercase">
                                    <Calendar size={12} />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2 text-text-3 font-mono text-[10px] uppercase">
                                    <Clock size={12} />
                                    {post.readTime}
                                </div>
                                <div className="mt-4 md:mt-8 flex items-center gap-2 text-red font-mono text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                    Read Analysis <ArrowRight size={12} />
                                </div>
                            </div>
                        </Card>
                    </Link>
                </motion.div>
            ))}
        </div>
      </section>
    </PageWrapper>
  );
}
