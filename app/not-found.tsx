"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { ThreeScene } from '@/components/three/Scene';
import { BlackHoleShader } from '@/components/three/BlackHoleShader';
import { StarfieldShader } from '@/components/three/StarfieldShader';
import { Button } from '@/components/ui/button';
import { useByteStore } from '@/store/byteStore';
import { motion } from 'framer-motion';

export default function NotFound() {
  const { actions } = useByteStore();

  React.useEffect(() => {
    actions.setMood('sad');
    actions.showSpeech("Error 404: Page not found.");
  }, [actions]);

  return (
    <PageWrapper>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Backdrop */}
        <ThreeScene className="fixed inset-0 z-0">
            <StarfieldShader opacity={0.4} />
            <BlackHoleShader opacity={0.8} />
        </ThreeScene>

        <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red/30 bg-red/10 text-red font-mono text-[10px] uppercase tracking-[0.3em] mb-8">
                    <AlertTriangle size={14} /> Page Not Found
                </div>

                <h1 className="text-[clamp(120px,20vw,240px)] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent leading-none select-none">
                    404
                </h1>

                <div className="space-y-4 max-w-md mx-auto">
                    <h2 className="text-3xl font-display font-bold text-text-0 uppercase tracking-tight">Access Error.</h2>
                    <p className="text-lg text-text-2 font-body leading-relaxed">
                        The page you are looking for has been moved or does not exist.
                    </p>
                </div>

                <div className="pt-12">
                    <Link href="/" passHref>
                        <Button variant="secondary" className="h-14 px-8 gap-3 border-white/10 glass hover:border-cyan/50 hover:text-cyan group transition-all rounded-full">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            Return Home
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
