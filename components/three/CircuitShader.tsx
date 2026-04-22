'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { CircuitFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function CircuitShader(props: Props) {
  return <BaseShader {...props} fragmentShader={CircuitFrag} />
}