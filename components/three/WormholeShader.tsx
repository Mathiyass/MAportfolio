'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { WormholeFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function WormholeShader(props: Props) {
  return <BaseShader {...props} fragmentShader={WormholeFrag} />
}