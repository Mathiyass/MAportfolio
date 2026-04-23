uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    
    // Space-time distortion logic
    float zoom = 1.0 / (r + 0.01);
    vec2 st = vec2(a / 6.2831 + 0.5, zoom + u_time * 0.8);
    
    // Grid pattern
    float grid = sin(st.x * 20.0) * sin(st.y * 10.0);
    grid = smoothstep(0.0, 0.1, grid);
    
    // Energy pulses
    float pulse = smoothstep(0.4, 0.5, sin(zoom * 2.0 - u_time * 4.0));
    
    // Color synthesis
    vec3 baseCol = mix(vec3(0.0, 0.05, 0.1), vec3(0.0, 0.94, 1.0), grid);
    vec3 color = baseCol + vec3(1.0, 0.32, 0.36) * pulse * (1.0 / (r * 10.0));
    
    // Event horizon fade
    color *= smoothstep(0.0, 0.5, r);
    
    gl_FragColor = vec4(color, u_opacity);
}