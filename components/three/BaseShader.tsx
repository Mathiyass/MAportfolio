'use client'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useMouse } from '@/hooks/useMousePosition'
import * as THREE from 'three'

interface Props {
  opacity?: number
  blendMode?: THREE.Blending
  className?: string
  fragmentShader: string
}

const vertSrc = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export function BaseShader({ opacity = 1, blendMode, className, fragmentShader }: Props) {
  const mesh = useRef<THREE.Mesh>(null)
  const { size } = useThree()
  const mouse = useMouse()
  const startTime = useRef(Date.now())

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector2(size.width, size.height) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_opacity: { value: opacity },
  }), [])

  useFrame(() => {
    if (!mesh.current) return
    const mat = mesh.current.material as THREE.ShaderMaterial
    mat.uniforms.u_time.value = (Date.now() - startTime.current) / 1000
    mat.uniforms.u_mouse.value.lerp(new THREE.Vector2(mouse.nx, mouse.ny), 0.06)
    mat.uniforms.u_res.value.set(size.width, size.height)
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertSrc}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={blendMode ?? THREE.AdditiveBlending}
      />
    </mesh>
  )
}