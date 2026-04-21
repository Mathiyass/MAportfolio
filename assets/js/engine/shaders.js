export const VERT_SHARED = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 v_uv;
out vec2 v_ndc;
void main() {
  v_ndc = a_position;
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG_HELPERS = `
precision highp float;
in vec2 v_uv;
in vec2 v_ndc;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec2 u_mouse_vel;
uniform int u_frame;
uniform float u_dpr;

const float PI = 3.14159265359;

float hash(float n) { return fract(sin(n) * 1e4); }
float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
vec2 hash2(vec2 p) { return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p, int oct) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < oct; i++) {
        v += a * noise(p);
        p = rot * p * 2.0 + vec2(100.0, 100.0);
        a *= 0.5;
    }
    return v;
}

vec2 rotate2D(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float sdHex(vec2 p, float r) {
    const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
    p = abs(p);
    p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
    p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
    return length(p) * sign(p.y);
}

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

float smoothEdge(float d, float w) {
    return smoothstep(w, -w, d);
}

float remap(float v, float a, float b, float c, float d) {
    return clamp(c + (v - a) * (d - c) / (b - a), c, d);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 void_col = vec3(0.012, 0.012, 0.039);
vec3 cyan_col = vec3(0.0, 0.898, 1.0);
vec3 red_col = vec3(1.0, 0.302, 0.427);
`;

export const SHADER_01_HEXGRID = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    vec2 uv = (v_uv - 0.5) * u_res / u_res.y;
    float r = 0.04;
    vec2 q = vec2((2.0/3.0 * uv.x) / r, (-1.0/3.0 * uv.x + sqrt(3.0)/3.0 * uv.y) / r);
    vec3 cube = vec3(q.x, -q.x - q.y, q.y);
    vec3 r_cube = round(cube);
    vec3 d = abs(r_cube - cube);
    if(d.x > d.y && d.x > d.z) r_cube.x = -r_cube.y - r_cube.z;
    else if(d.y > d.z) r_cube.y = -r_cube.x - r_cube.z;
    else r_cube.z = -r_cube.x - r_cube.y;
    
    vec2 hex_id = vec2(r_cube.x, r_cube.z);
    vec2 hex_center = vec2(r * 1.5 * hex_id.x, r * sqrt(3.0) * (hex_id.y + hex_id.x/2.0));
    
    float dist = sdHex(uv - hex_center, r * 0.95);
    float border = smoothEdge(dist, 0.002) - smoothEdge(dist + 0.003, 0.002);
    
    vec2 mouse_uv = (u_mouse - 0.5) * u_res / u_res.y;
    float d_mouse = length(hex_center - mouse_uv);
    float wave_a = sin(u_time * 2.0 - d_mouse * 10.0) * 0.5 + 0.5;
    float falloff_a = exp(-d_mouse * 3.0);
    
    vec2 anchor_b = hash2(vec2(floor(u_time/4.0))) * vec2(u_res.x/u_res.y, 1.0) - vec2(0.5);
    float d_b = length(hex_center - anchor_b);
    float wave_b = sin(u_time * 2.0 - d_b * 10.0) * 0.5 + 0.5;
    float falloff_b = exp(-d_b * 3.0);
    
    vec3 col = mix(void_col, cyan_col, wave_a * falloff_a * 0.5);
    col = mix(col, red_col, wave_b * falloff_b * 0.5);
    if(wave_a * falloff_a > 0.1 && wave_b * falloff_b > 0.1) col *= 1.5;
    
    if(hash(hex_id) < 0.05 && fract(u_time * 0.3 + hash(hex_id.x)) < 0.5) col *= 1.5;
    
    col += border * max(wave_a * falloff_a, wave_b * falloff_b) * 2.0;
    
    fragColor = vec4(col, length(col)*0.5);
}
`
};

export const SHADER_02_NOISE_FIELD = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    vec2 p0 = v_uv * 2.5 + vec2(u_time*0.03, u_time*0.015);
    vec2 q = vec2(fbm(p0, 4), fbm(p0 + vec2(5.2, 1.3), 4));
    vec2 r = vec2(fbm(p0 + q + vec2(1.7, 9.2) + u_time*0.015, 4),
                  fbm(p0 + q + vec2(8.3, 2.8) + u_time*0.012, 4));
    float f = fbm(p0 + r, 4);
    
    vec3 col;
    vec3 deep_teal = vec3(0.0, 0.05, 0.15);
    vec3 surface = vec3(0.035, 0.035, 0.086);
    if(f < 0.3) col = mix(void_col, surface, f/0.3);
    else if(f < 0.6) col = mix(surface, deep_teal, (f-0.3)/0.3);
    else col = mix(deep_teal, cyan_col * 0.25, (f-0.6)/0.4);
    
    float d_mouse = length((v_uv - u_mouse) * u_res / u_res.y);
    col += cyan_col * 0.15 * exp(-d_mouse*d_mouse / 0.05);
    
    fragColor = vec4(col, 0.6);
}
`
};

export const SHADER_03_CIRCUIT = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    float row_y = floor(v_uv.y * 40.0);
    float col_x = floor(v_uv.x * u_res.x/u_res.y * 40.0);
    
    float h_active = step(0.7, hash(row_y));
    float v_active = step(0.7, hash(col_x));
    
    float h_line = step(abs(fract(v_uv.y * 40.0) - 0.5), 0.05) * h_active;
    float v_line = step(abs(fract(v_uv.x * u_res.x/u_res.y * 40.0) - 0.5), 0.05) * v_active;
    
    vec3 col = vec3(0.0, 0.07, 0.02);
    col += h_line * cyan_col * 0.4;
    col += v_line * red_col * 0.3;
    if(h_line > 0.0 && v_line > 0.0) col += cyan_col;
    
    float pos_x = fract(u_time * hash(row_y) * 0.3);
    float d_h = length(vec2(v_uv.x - pos_x, v_uv.y - (row_y+0.5)/40.0) * vec2(u_res.x/u_res.y, 1.0));
    col += exp(-d_h*d_h / 0.0001) * cyan_col * 3.0 * h_active;
    
    float pos_y = fract(u_time * hash(col_x) * 0.25);
    float d_v = length(vec2(v_uv.x - (col_x+0.5)/(40.0*u_res.x/u_res.y), v_uv.y - pos_y) * vec2(u_res.x/u_res.y, 1.0));
    col += exp(-d_v*d_v / 0.0001) * red_col * 2.5 * v_active;
    
    fragColor = vec4(col, 1.0);
}
`
};

export const SHADER_04_DATA_STREAM = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    float col = floor(v_uv.x * 60.0);
    float speed = 0.3 + hash(col) * 0.4;
    float y_pos = fract(v_uv.y + u_time * speed);
    
    float head = exp(-(1.0 - y_pos) * 8.0);
    vec3 base_col = (hash(col) > 0.9) ? red_col : cyan_col;
    
    float cell_y = fract(v_uv.y * 60.0);
    float active_cell = step(0.1, cell_y) * step(cell_y, 0.9);
    
    vec3 c = base_col * head * active_cell;
    if(1.0 - y_pos < 0.02) c += vec3(1.0) * active_cell;
    
    fragColor = vec4(c, length(c) * 0.12);
}
`
};

export const SHADER_05_HOLOGRAM = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
uniform sampler2D u_tex;
uniform float u_trigger;
void main() {
    vec3 base = texture(u_tex, v_uv).rgb;
    float scanline = step(0.5, fract(v_uv.y * u_res.y * 0.5)) * 0.12;
    base -= scanline;
    
    float split = sin(u_time * 3.0) * 0.004 * u_trigger;
    float r = texture(u_tex, v_uv + vec2(split, 0)).r;
    float b = texture(u_tex, v_uv - vec2(split, 0)).b;
    vec3 holo = vec3(r, base.g, b);
    
    float hue_shift = sin(u_time)*8.0/360.0;
    vec3 hsv = fract(vec3(hue_shift, 0.0, 0.0) + vec3(0.5, 0.5, 0.5)); // simplification
    
    if(fract(u_time/3.0) < 0.05 && hash(floor(v_uv.y*20.0 + u_time*100.0)) > 0.85) {
        float offset = hash(floor(v_uv.y * 20.0) + floor(u_time)) * 0.06 - 0.03;
        holo = texture(u_tex, v_uv + vec2(offset, 0)).rgb;
    }
    
    float vignette = smoothstep(0.0, 0.3, v_uv.x) * smoothstep(1.0, 0.7, v_uv.x);
    holo *= vignette;
    
    vec3 dual = mix(cyan_col, red_col, smoothstep(0.3, 0.7, length(v_uv - 0.5)));
    holo = mix(holo, dual * length(holo), 0.3);
    
    fragColor = vec4(mix(base, holo, u_trigger * 0.65), 1.0);
}
`
};

export const SHADER_06_PARTICLE_FIELD = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
uniform sampler2D u_particles;
void main() {
    vec3 col = vec3(0.0);
    // Simple mock accumulation since loops over texture limit can be tricky
    // Real implementation would read ping-pong buffer
    // Doing a simplified point accumulation
    for(int i=0; i<64; i++) {
        vec4 p = texture(u_particles, vec2((float(i)+0.5)/64.0, 0.5));
        float d = length((v_uv - p.xy) * u_res / u_res.y);
        float speed = length(p.zw);
        vec3 pcol = mix(cyan_col, red_col, min(speed*50.0, 1.0));
        col += pcol * exp(-d*d / 0.0004);
    }
    fragColor = vec4(col * 0.8, length(col));
}
`
};

export const SHADER_07_WORMHOLE = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    vec2 p = (v_uv * 2.0 - 1.0) * vec2(u_res.x/u_res.y, 1.0);
    float r = length(p);
    float theta = atan(p.y, p.x);
    
    float t = fract(1.0/r - u_time * 0.5);
    float stripe = step(0.5, t) * (1.0 - r*0.5);
    
    theta += u_time * 0.3 + 2.0/(r+0.1);
    float r_dist = r + sin(theta*6.0 + u_time) * 0.08 * (1.0-r);
    
    vec3 col;
    if(r_dist < 0.1) col = mix(vec3(1.0), cyan_col, r_dist/0.1);
    else if(r_dist < 0.5) col = mix(cyan_col, red_col, (r_dist-0.1)/0.4);
    else col = mix(red_col, void_col, min((r_dist-0.5)/0.5, 1.0));
    
    col += stripe * cyan_col * 0.2;
    col *= smoothstep(1.0, 0.7, r);
    
    fragColor = vec4(col, 1.0);
}
`
};

export const SHADER_08_GLITCH = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
uniform sampler2D u_tex;
uniform float u_intensity;
void main() {
    vec2 uv = v_uv;
    if(u_intensity > 0.0) {
        float trigger_a = step(0.92, sin(u_time * 2.5)) * u_intensity;
        float row_a = floor(hash(floor(u_time*0.4)) * 20.0);
        if(abs(uv.y - row_a/20.0) < 0.05) uv.x = fract(uv.x + (hash(u_time) - 0.5) * 0.08 * trigger_a);
        
        float jitter_y = (hash(floor(uv.y * 200.0) + floor(u_time*8.0)) - 0.5) * 0.003 * u_intensity;
        uv.y += jitter_y;
    }
    
    float split = sin(u_time * 2.5) * 0.008 * u_intensity;
    vec3 clean = texture(u_tex, v_uv).rgb;
    float r = texture(u_tex, uv + vec2(split, 0)).r;
    float g = texture(u_tex, uv).g;
    float b = texture(u_tex, uv - vec2(split, 0)).b;
    vec3 glitched = vec3(r,g,b);
    
    fragColor = vec4(mix(clean, glitched, u_intensity), 1.0);
}
`
};

export const SHADER_09_BLACK_HOLE = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    vec2 c = vec2(0.5) * vec2(u_res.x/u_res.y, 1.0);
    vec2 uv = v_uv * vec2(u_res.x/u_res.y, 1.0);
    vec2 d = uv - c;
    float r = length(d);
    float theta = atan(d.y, d.x);
    
    float lensStrength = 0.04 / (r*r + 0.001);
    vec2 dir = normalize(d);
    vec2 uv_lensed = v_uv + dir * lensStrength * (1.0 - smoothstep(0.0, 0.3, r));
    
    float stars = step(0.998, hash(floor(uv_lensed*300.0)));
    vec3 col = vec3(stars);
    
    if(r < 0.06) col = void_col;
    else if(r < 0.12) {
        float mix_val = fract(theta/(2.0*PI) + u_time*0.1);
        col = mix(cyan_col * 3.0, red_col * 2.5, mix_val);
        col *= (0.12 - r)/0.06;
    }
    else if(abs(r - 0.13) < 0.005) col += cyan_col * 0.5;
    
    if(r > 0.12) {
        if(r < 0.3) col *= cyan_col * 2.0;
        else col *= mix(vec3(1.0), red_col, 0.2);
    }
    
    fragColor = vec4(col, 1.0);
}
`
};

export const SHADER_10_AURORA = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    float y1 = 0.3 * sin(v_uv.x * 2.5 + u_time * 0.5) + fbm(v_uv*vec2(1.0,0.5)+u_time*0.02, 3)*0.1;
    float y2 = 0.2 * sin(v_uv.x * 3.8 + u_time * 0.35 + 2.1) + fbm(v_uv*vec2(1.0,0.5)+u_time*0.02, 3)*0.1;
    float y3 = 0.15 * sin(v_uv.x * 5.2 + u_time * 0.7 + 4.7);
    
    float y_base = v_uv.y - 0.6 - u_time*0.04;
    float b1 = exp(-pow((y_base - y1)*8.0, 2.0));
    float b2 = exp(-pow((y_base - y2)*8.0, 2.0));
    float b3 = exp(-pow((y_base - y3)*8.0, 2.0));
    
    vec3 col = b1 * cyan_col;
    col += b2 * red_col;
    col += b3 * cyan_col * 1.5;
    
    float stars = step(0.995, hash(floor(v_uv*400.0))) * 0.4;
    if(v_uv.y < 0.6) col += vec3(stars);
    
    fragColor = vec4(col * 0.55, 1.0);
}
`
};

export const SHADER_11_PLASMA = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    float v1 = sin(v_uv.x * 10.0 + u_time);
    float v2 = sin(v_uv.y * 10.0 + u_time * 0.8);
    float v3 = sin((v_uv.x + v_uv.y) * 8.0 + u_time * 1.2);
    float v4 = sin(length(v_uv) * 12.0 + u_time * 0.6);
    float cx = v_uv.x + 0.5 * sin(u_time/5.0);
    float cy = v_uv.y + 0.5 * cos(u_time/3.0);
    float v5 = sin(sqrt(cx*cx+cy*cy) * 12.0);
    
    float plasma = (v1+v2+v3+v4+v5) / 5.0;
    float p = plasma * 0.5 + 0.5;
    
    vec3 c = hsv2rgb(vec3(mix(0.5, 0.75, p), 0.8, 0.9));
    c = mix(c, red_col, step(0.85, p));
    
    fragColor = vec4(c, 1.0);
}
`
};

export const SHADER_12_PORTAL = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    vec2 p = (v_uv * 2.0 - 1.0) * vec2(u_res.x/u_res.y, 1.0);
    p += (u_mouse - 0.5) * 0.3;
    float r = length(p);
    float theta = atan(p.y, p.x);
    
    float arm = sin(theta * 3.0 - r * 8.0 + u_time * 2.0) * 0.5 + 0.5;
    float ring = smoothstep(0.95, 1.0, 1.0 - abs(r - 0.3));
    float pulse = sin(r * 15.0 - u_time * 3.0) * 0.5 + 0.5;
    
    vec3 col = void_col;
    if(r < 0.3) col = mix(vec3(1.0), cyan_col, r/0.3);
    else if(abs(r-0.3) < 0.05) col = red_col * 4.0;
    else col = mix(cyan_col * arm, void_col, min(r, 1.0));
    
    col += ring * red_col;
    col += pulse * cyan_col * 0.2;
    
    fragColor = vec4(col, min(1.0 - r, 1.0));
}
`
};

export const SHADER_13_LIQUID = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    vec2 uv = v_uv;
    for(float i = 1.0; i < 4.0; i++){
        uv.x += 0.3 / i * sin(i * 3.0 * uv.y + u_time + i);
        uv.y += 0.3 / i * cos(i * 3.0 * uv.x + u_time + i);
    }
    vec3 col = mix(cyan_col, red_col, 0.5 + 0.5 * sin(u_time + uv.x + uv.y));
    fragColor = vec4(col * 0.5, 0.4);
}
`
};

export const SHADER_14_VAPORWAVE_SUN = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    vec2 p = v_uv * 2.0 - 1.0;
    float r = length(p);
    float sun = smoothstep(0.5, 0.48, r);
    float glow = exp(-r * 3.0) * 0.5;
    
    float scanlines = step(0.05, fract(p.y * 15.0 + u_time * 0.5));
    vec3 col = mix(red_col, cyan_col, v_uv.y) * (sun * scanlines + glow);
    fragColor = vec4(col, sun * scanlines + glow * 0.5);
}
`
};

export const SHADER_15_STARFIELD = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
void main() {
    vec3 col = vec3(0.0);
    vec2 uv = (v_uv - 0.5) * 2.0;
    for(float i=0.0; i<3.0; i++) {
        vec2 p = uv * (1.0 + i * 0.5);
        float star = step(0.995, hash(floor(p * 100.0 + u_time * 0.05)));
        col += star * mix(cyan_col, red_col, hash(i));
    }
    fragColor = vec4(col, length(col));
}
`
};

export const SHADER_16_CHROMATIC = {
  vert: VERT_SHARED,
  frag: `#version 300 es
${FRAG_HELPERS}
uniform sampler2D u_tex;
void main() {
    float amount = 0.005 * sin(u_time);
    float r = texture(u_tex, v_uv + vec2(amount, 0.0)).r;
    float g = texture(u_tex, v_uv).g;
    float b = texture(u_tex, v_uv - vec2(amount, 0.0)).b;
    fragColor = vec4(r, g, b, 1.0);
}
`
};

