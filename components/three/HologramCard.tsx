'use client'
import { useRef } from 'react'
import { BaseShader } from './BaseShader'
import { HologramFrag } from '@/lib/shaders/index'
import * as THREE from 'three'

export function HologramCard() {
  return <BaseShader fragmentShader={HologramFrag} blendMode={THREE.AdditiveBlending} />
}
