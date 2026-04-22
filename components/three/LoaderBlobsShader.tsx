'use client'
import * as THREE from 'three'
import { BaseShader } from './BaseShader'
import { LoaderBlobsFrag } from '@/lib/shaders/index'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
}

export function LoaderBlobsShader(props: Props) {
  return <BaseShader {...props} fragmentShader={LoaderBlobsFrag} />
}