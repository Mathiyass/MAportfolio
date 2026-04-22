'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useMousePosition } from '@/hooks/useMousePosition';
import * as THREE from 'three';
import { QuantumCoreMaterial, CyberGridMaterial } from './shaders/materials';

// Register custom materials
extend({ QuantumCoreMaterial, CyberGridMaterial });

// Declare types for intrinsic elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      quantumCoreMaterial: any;
      cyberGridMaterial: any;
    }
  }
}

interface ShaderPlaneProps {
  type: 'quantum' | 'grid';
}

function ShaderPlane({ type }: ShaderPlaneProps) {
  const materialRef = useRef<any>(null);
  const mouse = useMousePosition();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Smoothly update mouse uniform
      materialRef.current.uMouse.lerp(
        new THREE.Vector2(mouse.nx, mouse.ny),
        0.1
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {type === 'quantum' && (
        // @ts-expect-error - Custom shader material injected via extend
        <quantumCoreMaterial 
          ref={materialRef} 
          uColorBase={new THREE.Color('#080C14')}
          uColorCyan={new THREE.Color('#22D3EE')}
          uColorRed={new THREE.Color('#FB7185')}
        />
      )}
      {type === 'grid' && (
        // @ts-expect-error - Custom shader material injected via extend
        <cyberGridMaterial 
          ref={materialRef}
          uColorBase={new THREE.Color('#080C14')}
          uColorLine={new THREE.Color('#22D3EE')}
        />
      )}
    </mesh>
  );
}

export function WebGLBackground({ type = 'quantum' }: { type?: 'quantum' | 'grid' }) {
  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ShaderPlane type={type} />
      </Canvas>
    </div>
  );
}
