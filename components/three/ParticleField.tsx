'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { ParticleFieldFrag } from '@/lib/shaders/index'

export function ParticleField() {
  const fboMain = useFBO(2048, 2048)
  return (
    <group>
      <BaseShader fragmentShader={ParticleFieldFrag} blendMode={THREE.AdditiveBlending} />
    </group>
  )
}
