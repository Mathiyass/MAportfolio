// lib/shaders/index.ts

export const HexGridFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

float hexDist(vec2 p) {
    p = abs(p);
    float c = dot(p, normalize(vec2(1.0, 1.73)));
    return max(c, p.x);
}

vec4 hexGrid(vec2 uv) {
    vec2 grid = vec2(1.0, 1.73);
    vec2 a = mod(uv, grid) - grid * 0.5;
    vec2 b = mod(uv - grid * 0.5, grid) - grid * 0.5;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    float d = hexDist(gv);
    return vec4(gv, d, 0.0);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    uv *= 15.0;
    
    vec4 h = hexGrid(uv + u_time * 0.1);
    float d = h.z;
    
    float mask = smoothstep(0.4, 0.42, d) - smoothstep(0.45, 0.47, d);
    mask += (1.0 - smoothstep(0.02, 0.05, abs(d - 0.38))) * 0.5;
    
    vec3 col = mix(vec3(0.0), vec3(0.13, 0.82, 0.93), mask);
    col *= sin(u_time + length(uv) * 0.5) * 0.5 + 0.5;
    
    gl_FragColor = vec4(col, mask * u_opacity);
}
`;

export const NoiseFieldFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ; m = m*m ;
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
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    float n = snoise(uv * 3.0 + u_time * 0.2);
    n += 0.5 * snoise(uv * 6.0 - u_time * 0.1);
    
    vec3 col = mix(vec3(0.05, 0.07, 0.12), vec3(0.13, 0.82, 0.93), n * 0.5 + 0.5);
    col = mix(col, vec3(0.98, 0.44, 0.52), clamp(n * n * n, 0.0, 1.0));
    
    gl_FragColor = vec4(col, u_opacity);
}
`;

export const CircuitFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    vec2 grid = floor(uv * 10.0);
    vec2 f = fract(uv * 10.0);
    
    float h = hash(grid);
    vec3 col = vec3(0.0);
    
    if (h > 0.7) {
        float line = smoothstep(0.02, 0.0, abs(f.x - 0.5)) + smoothstep(0.02, 0.0, abs(f.y - 0.5));
        float pulse = smoothstep(0.4, 0.5, sin(u_time * 2.0 + h * 10.0));
        col = vec3(0.13, 0.82, 0.93) * line * pulse;
    }
    
    gl_FragColor = vec4(col, col.r * u_opacity);
}
`;

export const DataStreamFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

float text(vec2 p) {
    p = fract(p);
    p -= 0.5;
    return step(0.1, 0.5 - max(abs(p.x), abs(p.y)));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    uv.y += u_time * 0.5;
    vec2 g = floor(uv * vec2(20.0, 10.0));
    float h = fract(sin(g.x * 123.45) * 678.90);
    
    float char = text(uv * vec2(20.0, 10.0));
    float rain = fract(uv.y - u_time * (0.2 + h * 0.5));
    rain = smoothstep(0.8, 1.0, rain);
    
    vec3 col = vec3(0.13, 0.82, 0.93) * rain * char;
    gl_FragColor = vec4(col, col.r * u_opacity);
}
`;

export const HologramFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    float scanline = sin(uv.y * 200.0 + u_time * 10.0) * 0.1 + 0.9;
    float flicker = fract(sin(u_time * 10.0)) > 0.9 ? 0.8 : 1.0;
    
    vec3 col = vec3(0.13, 0.82, 0.93) * scanline * flicker;
    float edge = 1.0 - smoothstep(0.4, 0.5, length(uv - 0.5));
    
    gl_FragColor = vec4(col, edge * u_opacity * 0.3);
}
`;

export const ParticleFieldFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    vec3 col = vec3(0.0);
    
    for(float i=0.0; i<20.0; i++) {
        float h = fract(sin(i * 123.45) * 678.90);
        vec2 p = vec2(sin(u_time * (0.1 + h) + h * 10.0), cos(u_time * (0.12 + h) + h * 20.0)) * 0.4;
        float d = length(uv - p);
        col += vec3(0.13, 0.82, 0.93) * (0.002 / d);
    }
    
    gl_FragColor = vec4(col, length(col) * u_opacity);
}
`;

export const WormholeFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    float a = atan(uv.y, uv.x);
    float r = length(uv);
    
    vec2 st = vec2(a / 6.28 + 0.5, 0.1 / r + u_time * 0.5);
    float val = sin(st.x * 20.0) * sin(st.y * 20.0);
    
    vec3 col = mix(vec3(0.0), vec3(0.13, 0.82, 0.93), smoothstep(0.0, 0.1, val));
    col *= r;
    
    gl_FragColor = vec4(col, u_opacity);
}
`;

export const GlitchFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    float g = step(0.9, fract(sin(floor(uv.y * 20.0) + u_time * 10.0) * 123.45));
    uv.x += g * 0.05 * sin(u_time * 100.0);
    
    vec3 col = vec3(0.13, 0.82, 0.93);
    if (g > 0.5) col = vec3(0.98, 0.44, 0.52);
    
    gl_FragColor = vec4(col, u_opacity * 0.5);
}
`;

export const BlackHoleFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    float r = length(uv);
    float hole = smoothstep(0.1, 0.11, r);
    float ring = (1.0 - smoothstep(0.12, 0.25, r)) * hole;
    
    vec3 col = mix(vec3(0.0), vec3(0.98, 0.44, 0.52), ring);
    gl_FragColor = vec4(col, u_opacity);
}
`;

export const AuroraFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    float n = sin(uv.x * 5.0 + u_time) * cos(uv.y * 3.0 + u_time * 0.5);
    vec3 col = mix(vec3(0.13, 0.82, 0.93), vec3(0.6, 0.2, 0.9), n * 0.5 + 0.5);
    gl_FragColor = vec4(col, u_opacity * 0.2);
}
`;

export const PlasmaFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    float v = sin(uv.x * 10.0 + u_time) + sin(uv.y * 10.0 + u_time) + sin((uv.x + uv.y) * 10.0 + u_time);
    vec3 col = vec3(0.5 + 0.5 * sin(v), 0.5 + 0.5 * cos(v), 1.0);
    gl_FragColor = vec4(col * vec3(0.13, 0.82, 0.93), u_opacity * 0.4);
}
`;

export const PortalFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    float a = atan(uv.y, uv.x);
    float r = length(uv);
    float swirl = sin(a * 5.0 + r * 10.0 - u_time * 5.0);
    vec3 col = mix(vec3(0.0), vec3(0.13, 0.82, 0.93), smoothstep(-0.1, 0.1, swirl) * (1.0 - r));
    gl_FragColor = vec4(col, u_opacity);
}
`;

export const LoaderBlobsFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    float d = length(uv + 0.2 * sin(u_time + vec2(0.0, 1.5)));
    d = min(d, length(uv + 0.2 * sin(u_time * 0.8 + vec2(2.0, 0.5))));
    vec3 col = vec3(0.13, 0.82, 0.93) * smoothstep(0.2, 0.18, d);
    gl_FragColor = vec4(col, u_opacity * 0.5);
}
`;

export const ByteAmbientFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    float pulse = sin(u_time * 2.0) * 0.1 + 0.9;
    vec3 col = vec3(0.13, 0.82, 0.93) * pulse;
    gl_FragColor = vec4(col, u_opacity * 0.1);
}
`;

export const FractalFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    vec2 c = vec2(-0.8, 0.156) + 0.1 * sin(u_time * 0.2);
    vec2 z = uv * 2.0;
    float iter = 0.0;
    for(float i=0.0; i<20.0; i++) {
        z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
        if(length(z) > 2.0) break;
        iter++;
    }
    vec3 col = vec3(0.13, 0.82, 0.93) * (iter / 20.0);
    gl_FragColor = vec4(col, u_opacity);
}
`;

export const StarfieldFrag = `
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

float hash(float n) { return fract(sin(n) * 43758.5453); }

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    vec3 col = vec3(0.0);
    for(float i=0.0; i<50.0; i++) {
        float h = hash(i);
        vec2 p = vec2(hash(i*12.3), hash(i*45.6)) * 2.0 - 1.0;
        p.x *= u_res.x / u_res.y;
        float d = length(uv - p * fract(u_time * 0.1 + h));
        col += vec3(1.0) * smoothstep(0.005, 0.0, d) * fract(u_time * 0.1 + h);
    }
    gl_FragColor = vec4(col * vec3(0.13, 0.82, 0.93), u_opacity);
}
`;
