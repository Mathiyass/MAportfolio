uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_opacity;
varying vec2 vUv;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec3 color = vec3(0.13, 0.82, 0.93) * (0.5 + 0.5 * sin(u_time + uv.x * 10.0));
    gl_FragColor = vec4(color, u_opacity * 0.5);
}