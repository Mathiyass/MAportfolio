"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'motion/react';

const arsenal = [
  {
    category: "Core Stack",
    skills: ["TypeScript", "Next.js 15", "React 19", "Node.js"]
  },
  {
    category: "Graphics & Animation",
    skills: ["GLSL Shaders", "Three.js", "R3F", "Framer Motion", "GSAP"]
  },
  {
    category: "Mobile & Systems",
    skills: ["Kotlin", "Android SDK", "Room/SQLite", "Supabase"]
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "Vercel", "Docker", "GitHub Actions"]
  }
];

export default function SkillsPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-32"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-red mb-6 block">
                System Registry
            </span>
            <h1 className="text-6xl lg:text-8xl font-display font-bold mb-8 text-text-0">
                Skills & <span className="gradient-text">Arsenal</span>.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                The technical primitives and high-level abstractions deployed across my development lifecycle.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {arsenal.map((group, i) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <h2 className="text-2xl font-display font-bold text-text-1 uppercase tracking-widest flex items-center gap-4">
                <span className="w-8 h-px bg-red/30" />
                {group.category}
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                {group.skills.map((skill) => (
                  <div 
                    key={skill}
                    className="group relative flex items-center justify-between p-6 rounded-[var(--radius-lg)] border border-border-1 bg-bg-muted/30 hover:border-red/30 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 font-body text-lg text-text-1 group-hover:text-text-0 transition-colors">
                        {skill}
                    </span>
                    <span className="relative z-10 font-mono text-[10px] text-text-4 group-hover:text-red transition-colors uppercase tracking-widest">
                        System Ready
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
