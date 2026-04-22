"use client"
import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { cn } from '@/lib/utils'

export function ThreeScene({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 bg-transparent', className)}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <Preload all />
        {children}
      </Canvas>
    </div>
  )
}
