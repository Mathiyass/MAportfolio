(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,94624,e=>{"use strict";var t=e.i(43476),i=e.i(88653),a=e.i(46932),r=e.i(18566);let o={initial:{opacity:0,filter:"blur(8px)",scale:.99},animate:{opacity:1,filter:"blur(0px)",scale:1,transition:{duration:.5,ease:[.16,1,.3,1]}},exit:{opacity:0,filter:"blur(4px)",transition:{duration:.3,ease:[.4,0,.2,1]}}};e.s(["PageWrapper",0,function({children:e}){let s=(0,r.usePathname)();return(0,t.jsx)(i.AnimatePresence,{mode:"wait",children:(0,t.jsx)(a.motion.div,{variants:o,initial:"initial",animate:"animate",exit:"exit",className:"min-h-screen",children:e},s)})}],94624)},51737,e=>{"use strict";let t=(0,e.i(75254).default)("shield-alert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);e.s(["ShieldAlert",0,t],51737)},18639,e=>{"use strict";var t=e.i(43476),i=e.i(75056),a=e.i(8560),r=e.i(90072),o=e.i(71645),s=e.i(39014);function n({all:e,scene:t,camera:i}){let c=(0,s.useThree)(({gl:e})=>e),l=(0,s.useThree)(({camera:e})=>e),u=(0,s.useThree)(({scene:e})=>e);return o.useLayoutEffect(()=>{let o=[];e&&(t||u).traverse(e=>{!1===e.visible&&(o.push(e),e.visible=!0)}),c.compile(t||u,i||l);let s=new a.WebGLCubeRenderTarget(128);new r.CubeCamera(.01,1e5,s).update(c,t||u),s.dispose(),o.forEach(e=>e.visible=!1)},[]),null}var c=e.i(47163);e.s(["ThreeScene",0,function({children:e,className:a}){return(0,t.jsx)("div",{className:(0,c.cn)("pointer-events-none absolute inset-0 -z-10 bg-transparent",a),children:(0,t.jsxs)(i.Canvas,{camera:{position:[0,0,1]},dpr:Math.min(window.devicePixelRatio,2),gl:{alpha:!0,antialias:!1,powerPreference:"high-performance"},frameloop:"always",children:[(0,t.jsx)(n,{all:!0}),e]})})}],18639)},76705,40597,e=>{"use strict";var t=e.i(43476),i=e.i(71645),a=e.i(80931),r=e.i(39014),o=e.i(74104),s=e.i(90072);let n=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;e.s(["BaseShader",0,function({opacity:e=1,blendMode:c,fragmentShader:l}){let u=(0,i.useRef)(null),{size:v}=(0,r.useThree)(),d=(0,o.useMouse)(),m=(0,i.useMemo)(()=>({u_time:{value:0},u_res:{value:new s.Vector2(v.width,v.height)},u_mouse:{value:new s.Vector2(.5,.5)},u_opacity:{value:e}}),[v.width,v.height,e]);return(0,a.useFrame)(e=>{if(!u.current)return;let t=u.current.material;t.uniforms.u_time.value=e.clock.elapsedTime,t.uniforms.u_mouse.value.lerp(new s.Vector2(d.nx,d.ny),.06),t.uniforms.u_res.value.set(v.width,v.height)}),(0,t.jsxs)("mesh",{ref:u,children:[(0,t.jsx)("planeGeometry",{args:[2,2]}),(0,t.jsx)("shaderMaterial",{vertexShader:n,fragmentShader:l,uniforms:m,transparent:!0,depthWrite:!1,blending:c??s.AdditiveBlending})]})}],76705);let c=`
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
`,l=`
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
`,u=`
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
`,v=`
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
`;e.s(["BlackHoleFrag",0,u,"HexGridFrag",0,c,"NoiseFieldFrag",0,l,"StarfieldFrag",0,v],40597)},36768,e=>{"use strict";var t=e.i(43476),i=e.i(71645),a=e.i(94624);let r=(0,e.i(75254).default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var o=e.i(51737),s=e.i(22016),n=e.i(18639),c=e.i(76705),l=e.i(40597);function u(e){return(0,t.jsx)(c.BaseShader,{...e,fragmentShader:l.BlackHoleFrag})}function v(e){return(0,t.jsx)(c.BaseShader,{...e,fragmentShader:l.StarfieldFrag})}var d=e.i(67881),m=e.i(96100),x=e.i(46932);e.s(["default",0,function(){let{actions:e}=(0,m.useByteStore)();return i.useEffect(()=>{e.setMood("sad"),e.showSpeech("Error 404: Dimensional fracture detected.")},[e]),(0,t.jsx)(a.PageWrapper,{children:(0,t.jsxs)("div",{className:"relative min-h-screen w-full flex items-center justify-center overflow-hidden",children:[(0,t.jsxs)(n.ThreeScene,{className:"fixed inset-0 z-0",children:[(0,t.jsx)(v,{opacity:.4}),(0,t.jsx)(u,{opacity:.8})]}),(0,t.jsx)("div",{className:"container mx-auto px-4 relative z-10 text-center",children:(0,t.jsxs)(x.motion.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.8,ease:[.16,1,.3,1]},className:"space-y-8",children:[(0,t.jsxs)("div",{className:"inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red/30 bg-red/10 text-red font-mono text-[10px] uppercase tracking-[0.3em] mb-8",children:[(0,t.jsx)(o.ShieldAlert,{size:14,className:"animate-pulse"})," Critical Dimensional Failure"]}),(0,t.jsx)("h1",{className:"text-[clamp(120px,20vw,240px)] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 via-white/5 to-transparent leading-none select-none",children:"404"}),(0,t.jsxs)("div",{className:"space-y-4 max-w-md mx-auto",children:[(0,t.jsx)("h2",{className:"text-3xl font-display font-bold text-text-0 uppercase tracking-tight",children:"Sector Missing."}),(0,t.jsx)("p",{className:"text-lg text-text-2 font-body leading-relaxed",children:"The requested module has been lost to the void. Dimensional link severed."})]}),(0,t.jsx)("div",{className:"pt-12",children:(0,t.jsx)(s.default,{href:"/",passHref:!0,children:(0,t.jsxs)(d.Button,{variant:"secondary",className:"h-14 px-8 gap-3 border-white/10 glass hover:border-cyan/50 hover:text-cyan group transition-all",children:[(0,t.jsx)(r,{size:18,className:"group-hover:-translate-x-1 transition-transform"}),"Return to Base"]})})}),(0,t.jsx)("div",{className:"pt-24 font-mono text-[8px] text-text-4 uppercase tracking-[0.5em] opacity-50",children:"STATUS_CODE: DIMENSIONAL_FRACTURE_V12"})]})})]})})}],36768)}]);