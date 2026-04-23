uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    uv *= 8.0;
    
    vec2 ipos = floor(uv);
    vec2 fpos = fract(uv);
    
    // Procedural circuitry paths
    float h = hash(ipos);
    float line = 0.0;
    
    if (h > 0.5) {
        line = smoothstep(0.04, 0.0, abs(fpos.x - 0.5));
    } else {
        line = smoothstep(0.04, 0.0, abs(fpos.y - 0.5));
    }
    
    // Randomized data pulses
    float pulse = smoothstep(0.6, 0.5, sin(u_time * 5.0 + hash(ipos) * 10.0));
    float data = line * pulse;
    
    // Intersection nodes
    float node = smoothstep(0.15, 0.0, length(fpos - 0.5)) * step(0.8, hash(ipos + 0.1));
    
    // Color synthesis
    vec3 col = mix(vec3(0.0, 0.1, 0.15), vec3(0.0, 0.94, 1.0), data);
    col += vec3(1.0, 0.32, 0.36) * node * (0.8 + 0.2 * sin(u_time * 10.0));
    
    gl_FragColor = vec4(col, u_opacity * (line * 0.3 + node + data));
}