'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { NoiseFieldFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function NoiseFieldShader(props: Props) {
  return <BaseShader {...props} fragmentShader={NoiseFieldFrag} />
}