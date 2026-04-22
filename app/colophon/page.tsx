"use client"
import * as React from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { motion } from 'motion/react';

export default function ColophonPage() {
  return (
    <PageWrapper>
      <section className="container mx-auto px-8 py-32 lg:py-48">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
        >
            <h1 className="font-display text-6xl lg:text-8xl font-bold mb-12 text-text-0">Colophon.</h1>
            <p className="font-body text-xl text-text-2 mb-20 leading-relaxed">
                A technical deep dive into the architecture, tools, and philosophy powering the MATHIYA Nexus Prime ecosystem.
            </p>

            <div className="grid gap-24">
                <div className="space-y-8">
                    <h2 className="font-display text-3xl font-bold text-cyan uppercase tracking-wider">Engine</h2>
                    <div className="grid md:grid-cols-2 gap-12 text-text-1 font-body text-lg leading-relaxed">
                        <p>
                            Built on the bleeding edge of the web using **Next.js 15** and **React 19**. 
                            The architecture leverages Server Components for performance and Client Components for high-interactivity 3D and physics-based animations.
                        </p>
                        <p>
                            Styling is handled by **Tailwind CSS v4**, utilizing a pure CSS-first approach with zero-runtime design tokens. 
                            The layout system follows a modular grid with a strictly enforced radius and spacing hierarchy.
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="font-display text-3xl font-bold text-red uppercase tracking-wider">Visuals & 3D</h2>
                    <div className="grid md:grid-cols-2 gap-12 text-text-1 font-body text-lg leading-relaxed">
                        <p>
                            Interactive 3D elements and mascot logic are powered by **React Three Fiber** and **Drei**. 
                            A custom library of **16 GLSL shaders** provides real-time atmospheric effects, from noise-field backgrounds to holographic card projections.
                        </p>
                        <p>
                            Animations are orchestrated via **Framer Motion 11** for layout transitions and **GSAP 3** for complex character IK and scroll-driven revelations.
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="font-display text-3xl font-bold text-text-0 uppercase tracking-wider">The Mascot: BYTE</h2>
                    <div className="text-text-1 font-body text-lg leading-relaxed max-w-2xl">
                        <p>
                            BYTE is a custom-engineered mascot with a reactive brain managed by **Zustand**. 
                            It utilizes Inverse Kinematics (IK) to track the user's cursor in real-time across both 2D SVG and 3D R3F rendering modes. 
                            BYTE reacts to page changes, game events, and user interactions with a dynamic personality engine.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
