"use client"
import * as React from 'react';
import { motion } from 'framer-motion';

interface StatsBarProps {
  stats?: {
    repos: number;
    stars: number;
    followers: number;
  };
}

export function StatsBar({ stats }: StatsBarProps) {
  const displayStats = [
    { label: 'GitHub Repositories', value: `${stats?.repos ?? 124}+`, colorClass: 'text-red' },
    { label: 'Total Stars Earned', value: `${stats?.stars ? (stats.stars > 1000 ? (stats.stars/1000).toFixed(1) + 'k' : stats.stars) : '2.4k'}`, colorClass: 'text-cyan' },
    { label: 'Global Followers', value: `${stats?.followers ?? 850}+`, colorClass: 'text-text-0' },
  ];

  return (
    <section className="mt-20 px-6 md:px-12 max-w-[1920px] mx-auto">
      <div className="glass rounded-[24px] p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-t-0">
        {displayStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-4"
          >
            <div className="w-full h-px bg-gradient-to-r from-cyan to-transparent opacity-30 mb-2"></div>
            <span className={`font-mono text-4xl font-bold ${stat.colorClass}`}>
              {stat.value}
            </span>
            <span className="font-head text-xs uppercase tracking-[0.2em] text-text-2">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
