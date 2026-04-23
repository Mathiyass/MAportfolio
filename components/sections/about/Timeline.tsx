"use client"
import * as React from 'react';
import { motion } from 'framer-motion';

const events = [
  { date: '2024 - Present', title: 'Software Engineering Student', company: 'JIAT / HHDPII', desc: 'Focusing on advanced full-stack systems and Android development.' },
  { date: '2023 - 2024', title: 'Full-Stack Developer', company: 'Freelance', desc: 'Delivered high-performance web applications for global clients.' },
  { date: '2022 - 2023', title: 'Systems Research', company: 'Personal Lab', desc: 'Explored WebGL, GLSL, and low-level engine architecture.' },
];

export function Timeline() {
  return (
    <div className="space-y-12">
      {events.map((event, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative pl-12 border-l border-border-1"
        >
          <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-cyan shadow-[0_0_10px_#22D3EE]" />
          
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-4 mb-2 block">
            {event.date}
          </span>
          <h3 className="font-display text-xl font-bold text-text-0 mb-1">{event.title}</h3>
          <p className="font-head text-xs text-cyan uppercase tracking-widest mb-4">{event.company}</p>
          <p className="font-body text-text-2 leading-relaxed max-w-xl">{event.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
