uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

// Classic Perlin Noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float noise(vec2 v){
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
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_res.x / u_res.y;

    float t = u_time * 0.5;
    
    // Create multi-layered aurora bands
    float n1 = noise(p * 1.5 + vec2(t * 0.2, t * 0.1));
    float n2 = noise(p * 3.0 - vec2(t * 0.1, t * 0.3));
    float n3 = noise(p * 6.0 + vec2(t * 0.4, -t * 0.2));
    
    float strength = smoothstep(0.1, 0.8, n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
    strength *= (1.0 - length(p * 0.5)); // Vignette
    
    // Mathematical color synthesis (Nexus Prime Cyan to Red-ish shift)
    vec3 col1 = vec3(0.0, 0.94, 1.0); // Cyan
    vec3 col2 = vec3(1.0, 0.32, 0.36); // Red-ish
    vec3 color = mix(col1, col2, strength * 0.5 + 0.5 * sin(t + p.x));
    
    // Add pulsing intensity
    color *= strength * (1.2 + 0.2 * sin(u_time));
    
    gl_FragColor = vec4(color, strength * u_opacity);
}