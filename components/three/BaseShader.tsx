'use client'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
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

export function BaseShader({ opacity = 1, blendMode, fragmentShader }: Props) {
  const mesh = useRef<THREE.Mesh>(null)
  const { size, gl } = useThree()
  const isVisible = useRef(true)

  const uniforms = useMemo(() => ({
    u_time: { value: 0 },
    u_res: { value: new THREE.Vector2(size.width, size.height) },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    u_opacity: { value: opacity },
  }), [size.width, size.height, opacity])

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetMouse.current.set(
        e.clientX / window.innerWidth,
        1.0 - (e.clientY / window.innerHeight)
      );
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
    }, { rootMargin: '100px' });
    
    if (gl.domElement) {
      observer.observe(gl.domElement);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
    };
  }, [gl.domElement]);

  useFrame((state) => {
    if (!isVisible.current || !mesh.current) return
    const mat = mesh.current.material as THREE.ShaderMaterial
    mat.uniforms.u_time.value = state.clock.elapsedTime
    mat.uniforms.u_mouse.value.lerp(targetMouse.current, 0.06)
    // Only update u_res when size actually changes (handled by useMemo dependency in a real scenario, but R3F size is stable here unless resized)
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
