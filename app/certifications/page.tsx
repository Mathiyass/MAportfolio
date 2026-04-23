"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const certifications = [
  {
    title: "Advanced React & Next.js",
    issuer: "Meta / Coursera",
    date: "2025",
    description: "Deep dive into React 19 concurrent features and Next.js 15 server components."
  },
  {
    title: "Android App Development",
    issuer: "Google / Udacity",
    date: "2024",
    description: "Native development using Kotlin, Jetpack Compose, and clean architecture."
  },
  {
    title: "WebGL & GLSL Masterclass",
    issuer: "Three.js Journey",
    date: "2025",
    description: "Advanced shader programming and 3D optimization techniques."
  }
];

export default function CertificationsPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48 min-h-screen pb-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan mb-6 block">
                VALIDATION REGISTRY
            </span>
            <h1 className="text-6xl lg:text-9xl font-display font-bold mb-12 text-text-0 uppercase tracking-tighter leading-none">
                Certifications.
            </h1>
            <p className="text-xl lg:text-2xl text-text-2 font-body max-w-2xl leading-relaxed">
                Formal credentials and verified technical proficiencies.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, i) => (
                <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                    <Card variant="glass" className="p-8 h-full flex flex-col group hover:border-cyan/30 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 rounded-xl bg-cyan/10 text-cyan">
                                <Award size={24} />
                            </div>
                        </div>
                        
                        <h3 className="text-xl font-display font-bold text-text-0 mb-2 group-hover:text-cyan transition-colors uppercase">{cert.title}</h3>
                        <p className="text-sm text-text-2 font-body mb-6 flex-grow">{cert.description}</p>
                        
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 text-text-3 font-mono text-[10px] uppercase">
                                <Calendar size={12} />
                                {cert.date}
                            </div>
                            <div className="flex items-center gap-1 text-cyan font-mono text-[10px] uppercase tracking-widest cursor-pointer hover:underline">
                                Verify <ExternalLink size={10} />
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
      </section>
    </PageWrapper>
  );
}
