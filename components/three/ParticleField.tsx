'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { ParticleFieldFrag } from '@/lib/shaders/index'

export function ParticleField() {
  return (
    <group>
      <BaseShader fragmentShader={ParticleFieldFrag} blendMode={THREE.AdditiveBlending} />
    </group>
  )
}
