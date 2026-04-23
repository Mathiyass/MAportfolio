"use client"
import { motion } from 'framer-motion';
import { Github, Star, Users, Zap } from 'lucide-react';

interface StatsBarProps {
  stats?: {
    repos: number;
    stars: number;
    followers: number;
  };
}

export function StatsBar({ stats }: StatsBarProps) {
  const displayStats = [
    { label: 'System Repositories', value: `${stats?.repos ?? 124}+`, colorClass: 'text-red', icon: <Github size={20} />, id: 'METRIC_01' },
    { label: 'Technical Stars', value: `${stats?.stars ? (stats.stars > 1000 ? (stats.stars/1000).toFixed(1) + 'k' : stats.stars) : '2.4k'}`, colorClass: 'text-cyan', icon: <Star size={20} />, id: 'METRIC_02' },
    { label: 'Global Followers', value: `${stats?.followers ?? 850}+`, colorClass: 'text-text-0', icon: <Users size={20} />, id: 'METRIC_03' },
  ];

  return (
    <section className="mt-20 px-6 md:px-12 max-w-[1920px] mx-auto">
      <div className="glass rounded-[32px] p-8 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-16 relative overflow-hidden group">
        {/* Background Mesh Overlay */}
        <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        
        {displayStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6 relative z-10 group/item"
          >
            <div className="flex items-center justify-between w-full">
                <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 group-hover/item:border-cyan/30 transition-all ${stat.colorClass}`}>
                    {stat.icon}
                </div>
                <span className="font-mono text-[8px] text-text-4 uppercase tracking-[0.4em]">{stat.id}</span>
            </div>

            <div className="space-y-1">
                <span className={`font-stat text-6xl md:text-7xl font-bold tracking-[0.1em] ${stat.colorClass} block`}>
                    {stat.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-3 group-hover/item:text-text-1 transition-colors">
                    {stat.label}
                </span>
            </div>
            
            <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
