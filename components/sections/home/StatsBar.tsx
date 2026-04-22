"use client"
import * as React from 'react';
import { motion } from 'motion/react';

interface StatsBarProps {
  stats?: {
    repos: number;
    stars: number;
    followers: number;
  };
}

export function StatsBar({ stats }: StatsBarProps) {
  const displayStats = [
    { label: 'GitHub Repos', value: stats?.repos ?? '25+' },
    { label: 'Total Stars', value: stats?.stars ?? '150+' },
    { label: 'Followers', value: stats?.followers ?? '100+' },
    { label: 'Coffee Cups', value: '∞' },
  ];

  return (
    <section className="py-16 border-y border-border-1 bg-bg-subtle/50 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 mesh-section opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {displayStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center space-y-3"
            >
              <span className="text-5xl md:text-6xl font-display font-bold gradient-text">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-text-3 font-mono uppercase tracking-[0.2em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
