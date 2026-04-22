'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { FractalFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function FractalShader(props: Props) {
  return <BaseShader {...props} fragmentShader={FractalFrag} />
}