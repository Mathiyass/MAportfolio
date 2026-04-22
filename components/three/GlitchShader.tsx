'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { GlitchFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function GlitchShader(props: Props) {
  return <BaseShader {...props} fragmentShader={GlitchFrag} />
}