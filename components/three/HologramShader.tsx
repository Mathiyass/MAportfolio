'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { HologramFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function HologramShader(props: Props) {
  return <BaseShader {...props} fragmentShader={HologramFrag} />
}