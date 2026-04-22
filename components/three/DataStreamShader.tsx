'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { DataStreamFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function DataStreamShader(props: Props) {
  return <BaseShader {...props} fragmentShader={DataStreamFrag} />
}