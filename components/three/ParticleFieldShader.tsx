'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { ParticleFieldFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function ParticleFieldShader(props: Props) {
  return <BaseShader {...props} fragmentShader={ParticleFieldFrag} />
}