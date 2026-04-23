'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { PortalFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function PortalShader(props: Props) {
  return <BaseShader {...props} fragmentShader={PortalFrag} />
}
