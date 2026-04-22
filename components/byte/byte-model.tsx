'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useByteStore } from '@/store/byteStore';
import { useByteInteraction } from '@/hooks/useByteInteraction';

export function ByteModel() {
  const { mood, mouthState, isSleeping } = useByteStore();
  const { 
    leftIrisX, leftIrisY, rightIrisX, rightIrisY, 
    leftArmAngle, rightArmAngle, headRotateX, headRotateY, antennaSway 
  } = useByteInteraction();

  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const eyeLRef = useRef<THREE.Mesh>(null);
  const eyeRRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Apply IK logic to meshes based on springs
    if (headRef.current) {
      headRef.current.rotation.y = headRotateY.get();
      headRef.current.rotation.x = headRotateX.get();
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = leftArmAngle.get() * (Math.PI / 180);
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = rightArmAngle.get() * (Math.PI / 180);
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = antennaSway.get();
    }
    if (eyeLRef.current && eyeRRef.current && !isSleeping) {
      eyeLRef.current.position.x = -0.4 + leftIrisX.get() * 0.05;
      eyeLRef.current.position.y = 0.2 + leftIrisY.get() * 0.05;
      eyeRRef.current.position.x = 0.4 + rightIrisX.get() * 0.05;
      eyeRRef.current.position.y = 0.2 + rightIrisY.get() * 0.05;
    }
  });

  const getBodyColor = () => {
    switch (mood) {
      case 'excited': return '#22D3EE';
      case 'sad': return '#64748B';
      case 'sleeping': return '#1E2C42';
      default: return '#E2E8F0';
    }
  };

  return (
    <group ref={groupRef} dispose={null}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.8} floatingRange={[-0.1, 0.1]}>
        {/* Head */}
        <mesh ref={headRef} position={[0, 1.2, 0]}>
          <boxGeometry args={[1.5, 1.2, 1.2]} />
          <meshStandardMaterial color={getBodyColor()} roughness={0.2} metalness={0.8} />
          
          {/* Screen (Face) */}
          <mesh position={[0, 0, 0.61]}>
            <planeGeometry args={[1.3, 0.9]} />
            <meshBasicMaterial color="#080C14" />
            
            {/* Eyes */}
            {!isSleeping ? (
              <>
                <mesh ref={eyeLRef} position={[-0.3, 0.1, 0.01]}>
                  <circleGeometry args={[0.15, 32]} />
                  <meshBasicMaterial color="#22D3EE" />
                </mesh>
                <mesh ref={eyeRRef} position={[0.3, 0.1, 0.01]}>
                  <circleGeometry args={[0.15, 32]} />
                  <meshBasicMaterial color="#22D3EE" />
                </mesh>
              </>
            ) : (
              <mesh position={[0, 0, 0.01]}>
                 <planeGeometry args={[0.8, 0.1]} />
                 <meshBasicMaterial color="#64748B" />
              </mesh>
            )}

            {/* Mouth */}
            {!isSleeping && (
              <mesh position={[0, -0.25, 0.01]}>
                <planeGeometry args={[mouthState === 'speaking' ? 0.4 : 0.6, mouthState === 'speaking' ? 0.2 : 0.05]} />
                <meshBasicMaterial color="#22D3EE" />
              </mesh>
            )}
          </mesh>

          {/* Antenna */}
          <group ref={antennaRef} position={[0, 0.6, 0]}>
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.4]} />
              <meshStandardMaterial color="#94A3B8" />
            </mesh>
            <mesh position={[0, 0.45, 0]}>
              <sphereGeometry args={[0.15]} />
              <meshStandardMaterial color={mood === 'excited' ? '#FB7185' : '#22D3EE'} emissive={mood === 'excited' ? '#FB7185' : '#22D3EE'} emissiveIntensity={2} />
            </mesh>
          </group>
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.6, 0.8, 1]} />
          <meshStandardMaterial color={getBodyColor()} roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Arms */}
        <mesh ref={leftArmRef} position={[-0.8, 0.5, 0]}>
          <capsuleGeometry args={[0.15, 0.6]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>
        <mesh ref={rightArmRef} position={[0.8, 0.5, 0]}>
          <capsuleGeometry args={[0.15, 0.6]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>

      </Float>
      
      <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={4} blur={2} far={2} />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 10, 5]} intensity={2} penumbra={1} castShadow />
    </group>
  );
}
