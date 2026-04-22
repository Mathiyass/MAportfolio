'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { PlasmaFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function PlasmaShader(props: Props) {
  return <BaseShader {...props} fragmentShader={PlasmaFrag} />
}