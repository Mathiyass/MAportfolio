import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 1. Quantum Core Shader (Hero)
export const QuantumCoreMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColorBase: new THREE.Color('#080C14'),
    uColorCyan: new THREE.Color('#22D3EE'),
    uColorRed: new THREE.Color('#FB7185'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColorBase;
    uniform vec3 uColorCyan;
    uniform vec3 uColorRed;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = vUv;
      
      // Distort based on mouse
      float distToMouse = distance(st, uMouse);
      float mouseInfluence = smoothstep(0.5, 0.0, distToMouse);
      
      vec2 distortedUv = st + vec2(
        snoise(st * 3.0 + uTime * 0.1) * 0.1,
        snoise(st * 3.0 - uTime * 0.1) * 0.1
      ) * (1.0 + mouseInfluence * 2.0);

      float n1 = snoise(distortedUv * 2.0 + uTime * 0.2);
      float n2 = snoise(distortedUv * 4.0 - uTime * 0.3);
      
      float intensity = smoothstep(0.0, 1.0, n1 * 0.5 + n2 * 0.5 + 0.5);
      
      // Color mixing
      vec3 color = mix(uColorBase, uColorCyan, intensity * 0.4);
      color = mix(color, uColorRed, smoothstep(0.6, 1.0, intensity) * 0.3);
      
      // Mouse glow
      color += uColorCyan * mouseInfluence * 0.15;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// 2. Cyber Grid Shader (Lab)
export const CyberGridMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColorBase: new THREE.Color('#080C14'),
    uColorLine: new THREE.Color('#22D3EE'),
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uColorBase;
    uniform vec3 uColorLine;
    varying vec2 vUv;

    void main() {
      vec2 st = vUv * 20.0;
      
      // Perspective transform for the grid
      st.y += uTime * 0.5;
      
      vec2 grid = abs(fract(st - 0.5) - 0.5) / fwidth(st);
      float line = min(grid.x, grid.y);
      float glow = 1.0 - min(line, 1.0);
      
      // Distance fade
      float fade = 1.0 - smoothstep(0.0, 1.0, distance(vUv, vec2(0.5)));
      
      // Mouse interaction
      float distToMouse = distance(vUv, uMouse);
      float interaction = smoothstep(0.3, 0.0, distToMouse);
      
      vec3 color = mix(uColorBase, uColorLine, glow * fade * 0.5);
      color += uColorLine * interaction * glow;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// We will register these via React Three Fiber's extend later
