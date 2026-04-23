'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { HexGridFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function HexGridShader(props: Props) {
  return <BaseShader {...props} fragmentShader={HexGridFrag} />
}
