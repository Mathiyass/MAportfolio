'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { BlackHoleFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function BlackHoleShader(props: Props) {
  return <BaseShader {...props} fragmentShader={BlackHoleFrag} />
}
