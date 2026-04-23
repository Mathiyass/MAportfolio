uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

// Complex Number Math
vec2 cMul(vec2 a, vec2 b) {
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    vec2 z = uv * 2.5;
    
    // Mouse-driven Julia Set parameters
    vec2 c = u_mouse * 2.0 - 1.0;
    c += vec2(sin(u_time * 0.1), cos(u_time * 0.13)) * 0.2; // Slow drift
    
    float iter = 0.0;
    const float MAX_ITER = 64.0;
    
    for(float i=0.0; i<MAX_ITER; i++) {
        z = cMul(z, z) + c;
        if(length(z) > 4.0) break;
        iter++;
    }
    
    float f = iter / MAX_ITER;
    
    // High-tech coloring
    vec3 col1 = vec3(0.0, 0.94, 1.0); // Cyan
    vec3 col2 = vec3(1.0, 0.32, 0.36); // Red
    
    vec3 color = mix(vec3(0.01), col1, pow(f, 0.5));
    color = mix(color, col2, pow(f, 2.0));
    
    // Add glowing outlines
    float glow = exp(-3.0 * fract(f * 10.0 + u_time));
    color += col1 * glow * 0.2;
    
    gl_FragColor = vec4(color, u_opacity * smoothstep(0.0, 0.1, f));
}