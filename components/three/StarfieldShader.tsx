'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { StarfieldFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function StarfieldShader(props: Props) {
  return <BaseShader {...props} fragmentShader={StarfieldFrag} />
}
