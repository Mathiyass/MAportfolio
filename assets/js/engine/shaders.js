export const VERT_SHARED = `#version 300 es
precision highp float;
in vec2 a_position;
out vec2 v_uv;
out vec2 v_ndc;
void main() {
  v_ndc = a_position;
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const GLSL_HELPERS = `
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float hash(float n) { return fract(sin(n) * 43758.5453123); }
vec2 hash2(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}
float noise(vec2 p) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2 i = floor(p + (p.x+p.y)*K1);
    vec2 a = p - i + (i.x+i.y)*K2;
    float m = step(a.y,a.x);
    vec2 o = vec2(m,1.0-m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0);
    vec3 n = h*h*h*h*vec3( dot(a,hash2(i+0.0)), dot(b,hash2(i+o)), dot(c,hash2(i+1.0)));
    return dot(n, vec3(70.0));
}
float fbm(vec2 p, int oct) {
    float f = 0.0; float w = 0.5;
    for(int i=0; i<oct; i++) {
        f += w * noise(p);
        p *= 2.0; w *= 0.5;
    }
    return f;
}
vec2 rotate2D(vec2 v, float a) {
    float s = sin(a); float c = cos(a);
    return mat2(c, -s, s, c) * v;
}
float sdHex(vec2 p, float r) {
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}
float sdCircle(vec2 p, float r) { return length(p) - r; }
float smoothEdge(float d, float w) { return smoothstep(w, -w, d); }
float remap(float v, float a, float b, float c, float d) { return c + (v-a)/(b-a)*(d-c); }
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`;

export const SHADER_01_HEXGRID = {
  vert: VERT_SHARED,
  frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
"uniform vec2 u_res;\n" +
"uniform vec2 u_mouse;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    vec2 p = (v_uv - 0.5) * u_res / min(u_res.x, u_res.y);\n" +
"    float hexSize = 0.05;\n" +
"    \n" +
"    // Hex coords (pointy-top)\n" +
"    vec2 q = vec2(p.x * 2.0/3.0, p.x * -1.0/3.0 + sqrt(3.0)/3.0 * p.y) / hexSize;\n" +
"    vec3 cube = vec3(q.x, q.y, -q.x-q.y);\n" +
"    vec3 rCube = round(cube);\n" +
"    vec3 dCube = abs(rCube - cube);\n" +
"    if (dCube.x > dCube.y && dCube.x > dCube.z) rCube.x = -rCube.y - rCube.z;\n" +
"    else if (dCube.y > dCube.z) rCube.y = -rCube.x - rCube.z;\n" +
"    else rCube.z = -rCube.x - rCube.y;\n" +
"    \n" +
"    vec2 hexCentre = vec2(rCube.x * 1.5, (rCube.x + rCube.y * 2.0) * sqrt(3.0)/2.0) * hexSize;\n" +
"    vec2 localP = p - hexCentre;\n" +
"    float dist = sdHex(localP, hexSize);\n" +
"    \n" +
"    float border = smoothEdge(dist - (hexSize - 0.005), 0.002);\n" +
"    \n" +
"    vec3 voidCol = vec3(0.01, 0.01, 0.04);\n" +
"    vec3 cyan = vec3(0.0, 0.9, 1.0);\n" +
"    vec3 red = vec3(1.0, 0.3, 0.4);\n" +
"    \n" +
"    vec2 mouseP = (u_mouse - 0.5) * u_res / min(u_res.x, u_res.y);\n" +
"    float dMouse = length(hexCentre - mouseP);\n" +
"    float intA = max(0.0, sin(u_time*2.0 - dMouse*10.0) * 0.5 + 0.5) * exp(-dMouse*3.0);\n" +
"    \n" +
"    vec2 anchor = vec2(hash(floor(u_time/4.0)), hash(floor(u_time/4.0)+1.0)) - 0.5;\n" +
"    float dAnchor = length(hexCentre - anchor);\n" +
"    float intB = max(0.0, sin(u_time*2.5 - dAnchor*8.0) * 0.5 + 0.5) * exp(-dAnchor*2.0);\n" +
"    \n" +
"    vec3 col = voidCol;\n" +
"    col = mix(col, cyan, intA);\n" +
"    col = mix(col, red, intB);\n" +
"    if(intA > 0.1 && intB > 0.1) col += vec3(0.5); // white hot overlap\n" +
"    \n" +
"    if(hash(rCube.xy) < 0.05) col += sin(u_time * 5.0 + hash(rCube.xy)*10.0) > 0.0 ? cyan*0.5 : vec3(0.0);\n" +
"    \n" +
"    col += border * max(intA, intB);\n" +
"    \n" +
"    fragColor = vec4(col, 1.0);\n" +
"}\n"
};

export const SHADER_02_NOISE_FIELD = {
  vert: VERT_SHARED,
  frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
"uniform vec2 u_res;\n" +
"uniform vec2 u_mouse;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    vec2 p = v_uv * 2.5 + vec2(u_time*0.03, u_time*0.015);\n" +
"    vec2 q = vec2(fbm(p, 4), fbm(p + vec2(5.2, 1.3), 4));\n" +
"    vec2 r = vec2(fbm(p + q + vec2(1.7, 9.2) + u_time*0.015, 4), fbm(p + q + vec2(8.3, 2.8) + u_time*0.012, 4));\n" +
"    float f = fbm(p + r, 4);\n" +
"    \n" +
"    vec3 c1 = vec3(0.03, 0.03, 0.06);\n" +
"    vec3 c2 = vec3(0.0, 0.05, 0.15);\n" +
"    vec3 c3 = vec3(0.0, 0.9, 1.0) * 0.25;\n" +
"    \n" +
"    vec3 col;\n" +
"    if(f < 0.3) col = mix(vec3(0.0), c1, f/0.3);\n" +
"    else if(f < 0.6) col = mix(c1, c2, (f-0.3)/0.3);\n" +
"    else col = mix(c2, c3, (f-0.6)/0.4);\n" +
"    \n" +
"    float dMouse = length(v_uv - u_mouse);\n" +
"    col += vec3(0.0, 0.9, 1.0) * exp(-dMouse*dMouse/0.02) * 0.5;\n" +
"    \n" +
"    fragColor = vec4(col, 0.6);\n" +
"}\n"
};

export const SHADER_03_CIRCUIT = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    float hRow = hash(floor(v_uv.y * 40.0));\n" +
"    float hCol = hash(floor(v_uv.x * 40.0));\n" +
"    \n" +
"    bool isH = abs(fract(v_uv.y*40.0) - 0.5) < 0.02 && hRow < 0.3;\n" +
"    bool isV = abs(fract(v_uv.x*40.0) - 0.5) < 0.02 && hCol < 0.3;\n" +
"    \n" +
"    vec3 col = vec3(0.0, 0.07, 0.02); // dark bg\n" +
"    vec3 cyan = vec3(0.0, 0.9, 1.0);\n" +
"    vec3 red = vec3(1.0, 0.3, 0.4);\n" +
"    \n" +
"    if(isH) col += cyan * 0.4;\n" +
"    if(isV) col += red * 0.3;\n" +
"    if(isH && isV) col += cyan * (sin(u_time*10.0)+1.0)*0.5;\n" +
"    \n" +
"    float px = fract(u_time * hash(floor(v_uv.y*40.0)) * 0.3);\n" +
"    float py = fract(u_time * hash(floor(v_uv.x*40.0)) * 0.25);\n" +
"    \n" +
"    if(isH) {\n" +
"        float d = abs(v_uv.x - px);\n" +
"        col += exp(-d*d/0.0001) * cyan * 3.0;\n" +
"    }\n" +
"    if(isV) {\n" +
"        float d = abs(v_uv.y - py);\n" +
"        col += exp(-d*d/0.0001) * red * 2.5;\n" +
"    }\n" +
"    \n" +
"    fragColor = vec4(col, 1.0);\n" +
"}\n"
};

export const SHADER_04_DATA_STREAM = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    float colId = floor(v_uv.x * 60.0);\n" +
"    float speed = 0.3 + hash(colId) * 0.4;\n" +
"    \n" +
"    float yPos = fract(v_uv.y + u_time * speed);\n" +
"    float head = fract(u_time*speed + hash(colId));\n" +
"    float dist = v_uv.y - head;\n" +
"    if (dist < 0.0) dist += 1.0; // wrap\n" +
"    \n" +
"    float bright = exp(-dist * 8.0);\n" +
"    \n" +
"    vec3 color = hash(colId) > 0.9 ? vec3(1.0, 0.3, 0.4) : vec3(0.0, 0.9, 1.0);\n" +
"    float cellY = fract(v_uv.y * 60.0);\n" +
"    \n" +
"    vec3 finalCol = color * bright;\n" +
"    if(dist < 0.02) finalCol += vec3(0.5); // white head\n" +
"    \n" +
"    fragColor = vec4(finalCol, 0.12 * bright);\n" +
"}\n"
};

export const SHADER_05_HOLOGRAM = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform sampler2D u_tex;\n" +
"uniform float u_trigger;\n" +
"uniform float u_time;\n" +
"uniform vec2 u_res;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    vec3 base = texture(u_tex, v_uv).rgb;\n" +
"    float scanline = step(0.5, fract(v_uv.y * u_res.y * 0.5)) * 0.12;\n" +
"    \n" +
"    float split = sin(u_time * 3.0) * 0.004 * u_trigger;\n" +
"    float r = texture(u_tex, v_uv + vec2(split, 0.0)).r;\n" +
"    float b = texture(u_tex, v_uv - vec2(split, 0.0)).b;\n" +
"    vec3 holo = vec3(r, base.g, b) - scanline;\n" +
"    \n" +
"    if(fract(u_time/3.0) < 0.05) {\n" +
"        float row = floor(v_uv.y * 20.0);\n" +
"        if(hash(row + floor(u_time*100.0)) > 0.85) {\n" +
"            float off = (hash(row + floor(u_time)) * 0.06 - 0.03);\n" +
"            holo = texture(u_tex, vec2(fract(v_uv.x + off), v_uv.y)).rgb;\n" +
"        }\n" +
"    }\n" +
"    \n" +
"    float vig = smoothstep(0.0, 0.3, v_uv.x) * smoothstep(1.0, 0.7, v_uv.x);\n" +
"    holo = mix(holo, vec3(0.0, 0.9, 1.0), (1.0-vig)*0.2); // cyan edges\n" +
"    \n" +
"    fragColor = vec4(mix(base, holo, u_trigger * 0.65), 1.0);\n" +
"}\n"
};

export const SHADER_06_PARTICLE_FIELD = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform sampler2D u_tex; // particle data\n" +
"uniform float u_time;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    vec3 col = vec3(0.0);\n" +
"    fragColor = vec4(col, 1.0);\n" +
"}\n"
};

export const SHADER_07_WORMHOLE = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    vec2 p = v_uv * 2.0 - 1.0;\n" +
"    float r = length(p);\n" +
"    float theta = atan(p.y, p.x);\n" +
"    \n" +
"    float t = fract(1.0/r - u_time * 0.5);\n" +
"    float stripe = step(0.5, t) * (1.0 - r*0.5);\n" +
"    \n" +
"    theta += u_time * 0.3 + 2.0/r;\n" +
"    float rDist = r + sin(theta*6.0 + u_time) * 0.08 * (1.0-r);\n" +
"    \n" +
"    vec3 cyan = vec3(0.0, 0.9, 1.0);\n" +
"    vec3 red = vec3(1.0, 0.3, 0.4);\n" +
"    vec3 voidCol = vec3(0.01, 0.01, 0.04);\n" +
"    \n" +
"    vec3 col;\n" +
"    if(rDist < 0.1) col = mix(vec3(1.0), cyan, rDist/0.1);\n" +
"    else if(rDist < 0.5) col = mix(cyan, red, (rDist-0.1)/0.4);\n" +
"    else col = mix(red, voidCol, (rDist-0.5)/0.5);\n" +
"    \n" +
"    float vig = smoothstep(1.0, 0.7, r);\n" +
"    col *= vig;\n" +
"    col += cyan * stripe * 0.3;\n" +
"    \n" +
"    fragColor = vec4(col, 1.0);\n" +
"}\n"
};

export const SHADER_08_GLITCH = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform sampler2D u_tex;\n" +
"uniform float u_intensity;\n" +
"uniform float u_time;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    vec2 uv = v_uv;\n" +
"    \n" +
"    float triggerA = step(0.92, sin(u_time * 2.5)) * u_intensity;\n" +
"    float rowA = floor(hash(floor(u_time*0.4)) * 20.0);\n" +
"    if(abs(uv.y - rowA/20.0) < 0.05) {\n" +
"        uv.x = fract(uv.x + (hash(u_time)-0.5)*0.08 * triggerA);\n" +
"    }\n" +
"    \n" +
"    float split = sin(u_time * 2.5) * 0.008 * u_intensity;\n" +
"    float r = texture(u_tex, uv + vec2(split, 0.0)).r;\n" +
"    float b = texture(u_tex, uv - vec2(split, 0.0)).b;\n" +
"    \n" +
"    float jitterY = (hash(floor(uv.y * 200.0) + floor(u_time*8.0)) - 0.5) * 0.003 * u_intensity;\n" +
"    vec3 base = texture(u_tex, vec2(uv.x, uv.y + jitterY)).rgb;\n" +
"    \n" +
"    vec3 glitchCol = vec3(r, base.g, b);\n" +
"    \n" +
"    fragColor = vec4(mix(texture(u_tex, v_uv).rgb, glitchCol, u_intensity), 1.0);\n" +
"}\n"
};

export const SHADER_09_BLACK_HOLE = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
"uniform vec2 u_res;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    vec2 c = vec2(0.5);\n" +
"    vec2 d = v_uv - c;\n" +
"    float r = length(d);\n" +
"    float theta = atan(d.y, d.x);\n" +
"    \n" +
"    float lensStr = 0.04 / (r*r + 0.001);\n" +
"    vec2 dir = normalize(d);\n" +
"    vec2 lensedUV = v_uv + dir * lensStr * (1.0 - smoothstep(0.0, 0.3, r));\n" +
"    \n" +
"    float starBright = step(0.998, hash(floor(lensedUV*300.0)));\n" +
"    vec3 starCol = mix(vec3(0.0, 0.9, 1.0), vec3(1.0, 0.3, 0.4), hash(floor(lensedUV*300.0+1.0)));\n" +
"    vec3 col = starCol * starBright;\n" +
"    \n" +
"    if(r < 0.06) col = vec3(0.0); // Event horizon\n" +
"    else if(r < 0.12) { // Accretion disk\n" +
"        float mixFact = fract(theta/(2.0*3.14159) + u_time*0.1);\n" +
"        col += mix(vec3(0.0, 0.9, 1.0)*3.0, vec3(1.0, 0.3, 0.4)*2.5, mixFact) * smoothstep(0.12, 0.06, r);\n" +
"    }\n" +
"    \n" +
"    fragColor = vec4(col, 1.0);\n" +
"}\n"
};

export const SHADER_10_AURORA = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    float t = u_time * 0.5;\n" +
"    \n" +
"    float yA = 0.3 * sin(v_uv.x * 2.5 + t*0.5) + fbm(v_uv*vec2(1.0, 0.5) + t*0.02, 3)*0.1;\n" +
"    float yB = 0.2 * sin(v_uv.x * 3.8 + t*0.35 + 2.1) + fbm(v_uv*vec2(1.0, 0.5) - t*0.02, 3)*0.1;\n" +
"    float yC = 0.15 * sin(v_uv.x * 5.2 + t*0.7 + 4.7);\n" +
"    \n" +
"    float waveA = exp(-pow((v_uv.y - 0.6 - yA)*8.0, 2.0));\n" +
"    float waveB = exp(-pow((v_uv.y - 0.6 - yB)*8.0, 2.0));\n" +
"    float waveC = exp(-pow((v_uv.y - 0.6 - yC)*8.0, 2.0));\n" +
"    \n" +
"    vec3 cyan = vec3(0.0, 0.9, 1.0);\n" +
"    vec3 red = vec3(1.0, 0.3, 0.4);\n" +
"    \n" +
"    vec3 col = waveA * cyan * (1.0-v_uv.y);\n" +
"    col += waveB * red * (1.0-v_uv.y);\n" +
"    col += waveC * cyan * 1.5;\n" +
"    \n" +
"    fragColor = vec4(col, 0.55);\n" +
"}\n"
};

export const SHADER_11_PLASMA = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    float v1 = sin(v_uv.x * 10.0 + u_time);\n" +
"    float v2 = sin(v_uv.y * 10.0 + u_time * 0.8);\n" +
"    float v3 = sin((v_uv.x + v_uv.y) * 8.0 + u_time * 1.2);\n" +
"    float v4 = sin(sqrt(v_uv.x*v_uv.x + v_uv.y*v_uv.y) * 12.0 + u_time * 0.6);\n" +
"    \n" +
"    float cx = v_uv.x + 0.5 * sin(u_time/5.0);\n" +
"    float cy = v_uv.y + 0.5 * cos(u_time/3.0);\n" +
"    float v5 = sin(sqrt(cx*cx+cy*cy) * 12.0);\n" +
"    \n" +
"    float p = (v1+v2+v3+v4+v5) / 5.0 * 0.5 + 0.5;\n" +
"    \n" +
"    vec3 col = hsv2rgb(vec3(mix(0.5, 0.75, p), 0.8, 0.9));\n" +
"    col = mix(col, vec3(1.0, 0.3, 0.4), step(0.85, p));\n" +
"    \n" +
"    fragColor = vec4(col, 1.0);\n" +
"}\n"
};

export const SHADER_12_PORTAL = {
    vert: VERT_SHARED,
    frag: "#version 300 es\n" +
"precision highp float;\n" +
"in vec2 v_uv;\n" +
"out vec4 fragColor;\n" +
"uniform float u_time;\n" +
"uniform vec2 u_mouse;\n" +
GLSL_HELPERS +
"\nvoid main() {\n" +
"    vec2 p = v_uv * 2.0 - 1.0;\n" +
"    vec2 off = (u_mouse - 0.5) * 0.3;\n" +
"    p += off;\n" +
"    \n" +
"    float r = length(p);\n" +
"    float theta = atan(p.y, p.x);\n" +
"    \n" +
"    float arm = sin(theta * 3.0 - r * 8.0 + u_time * 2.0);\n" +
"    float ring = smoothstep(0.95, 1.0, 1.0 - abs(r - 0.3));\n" +
"    \n" +
"    vec3 cyan = vec3(0.0, 0.9, 1.0);\n" +
"    vec3 red = vec3(1.0, 0.3, 0.4);\n" +
"    \n" +
"    vec3 col = vec3(0.0);\n" +
"    if(r < 0.3) col = mix(vec3(1.0), cyan, r/0.3);\n" +
"    else col = mix(cyan * max(0.0, arm), vec3(0.0), r);\n" +
"    \n" +
"    col += ring * red * 4.0;\n" +
"    \n" +
"    fragColor = vec4(col, 1.0);\n" +
"}\n"
};
