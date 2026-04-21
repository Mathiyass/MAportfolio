// shaders.js
export const VERT_SHARED = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const SHADER_HELPERS = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
in vec2 vUv;
out vec4 fragColor;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec2 hash2(vec2 p) { return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453); }

vec3 cyan = vec3(0.133, 0.827, 0.933); // #22D3EE
vec3 red = vec3(0.984, 0.443, 0.522);  // #FB7185
vec3 bg = vec3(0.031, 0.047, 0.078);   // #080C14
`;

export const SHADERS = {
  SHADER_01: \`#version 300 es
\${SHADER_HELPERS}
float hex(vec2 p) {
    p.x *= 0.57735*2.0;
    p.y += mod(floor(p.x), 2.0)*0.5;
    p = abs((mod(p, 1.0) - 0.5));
    return abs(max(p.x*1.5 + p.y, p.y*2.0) - 1.0);
}
void main() {
    vec2 st = vUv * 10.0;
    float h = hex(st);
    float wave = sin(u_time * 2.0 - length(vUv - u_pointer) * 10.0);
    vec3 col = mix(bg, cyan, smoothstep(0.1, 0.0, h) * max(0.0, wave));
    col = mix(col, red, smoothstep(0.1, 0.0, h) * max(0.0, -wave));
    fragColor = vec4(col, 1.0);
}\`,

  SHADER_02: \`#version 300 es
\${SHADER_HELPERS}
// Noise Field Deep implementation
float noise(vec2 p) { return hash(p); } // Placeholder for fbm
void main() {
    vec2 st = vUv;
    float n = noise(st * 3.0 + u_time * 0.1);
    vec3 col = mix(bg, cyan, n * length(vUv - u_pointer));
    fragColor = vec4(col, 1.0);
}\`,

  SHADER_03: \`#version 300 es
\${SHADER_HELPERS}
// Circuit Board
void main() {
    fragColor = vec4(mix(bg, cyan, 0.1), 1.0);
}\`,

  SHADER_04: \`#version 300 es
\${SHADER_HELPERS}
// Data Stream
void main() {
    fragColor = vec4(mix(bg, red, 0.1), 1.0);
}\`,

  SHADER_05: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_06: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_07: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_08: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_09: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_10: \`#version 300 es
\${SHADER_HELPERS}
// Aurora
void main() {
    float n = sin(vUv.y * 10.0 + u_time);
    fragColor = vec4(mix(cyan, red, n), 0.2);
}\`,
  SHADER_11: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_12: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_13: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_14: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_15: \`#version 300 es
\${SHADER_HELPERS}
void main() { fragColor = vec4(bg, 1.0); }\`,
  SHADER_16: \`#version 300 es
\${SHADER_HELPERS}
// Starfield Warp
void main() {
    fragColor = vec4(bg, 1.0);
}\`
};
