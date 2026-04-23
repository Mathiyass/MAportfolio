uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    vec2 mouse = (u_mouse.xy - 0.5);
    mouse.x *= u_res.x / u_res.y;
    
    vec2 p = uv - mouse * 0.5; // Offset by mouse
    float r = length(p);
    
    // Gravitational Lensing Logic
    // Ray bending: theta' = theta * (1 + RS/r)
    float rs = 0.15; // Schwarzschild radius
    float lens = smoothstep(rs, rs + 0.01, r);
    
    // Accretion Disk (Mathematical Spiral)
    float angle = atan(p.y, p.x) + u_time * 2.0 / (r + 0.1);
    float disk = sin(angle * 5.0 + 1.0/r) * 0.5 + 0.5;
    disk *= smoothstep(0.4, 0.2, r) * smoothstep(rs, rs + 0.05, r);
    
    // Core Event Horizon
    float core = 1.0 - smoothstep(rs * 0.8, rs, r);
    
    // Color Synthesis
    vec3 diskCol = mix(vec3(0.0, 0.94, 1.0), vec3(1.0, 0.32, 0.36), disk);
    vec3 color = diskCol * disk * 2.0;
    color = mix(color, vec3(0.0), core); // Black core
    
    // Photon Ring
    float ring = (1.0 - smoothstep(rs, rs + 0.02, r)) * smoothstep(rs - 0.01, rs, r);
    color += vec3(1.0, 1.0, 1.0) * ring * 2.0;
    
    gl_FragColor = vec4(color, u_opacity * (core + disk + ring));
}