'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { ByteAmbientFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function ByteAmbientShader(props: Props) {
  return <BaseShader {...props} fragmentShader={ByteAmbientFrag} />
}