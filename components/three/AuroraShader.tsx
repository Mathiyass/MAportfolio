'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { AuroraFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function AuroraShader(props: Props) {
  return <BaseShader {...props} fragmentShader={AuroraFrag} />
}