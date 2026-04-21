/**
 * PREMIUM WEBGL ENGINE — v10.0
 * Pure WebGL2 implementation with high-performance hooks.
 */
export class WebGLEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      ...options
    });

    if (!this.gl) throw new Error('WebGL2 not supported');

    this.programs = new Map();
    this.uniforms = new Map();
    this.startTime = performance.now();
    this.mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    this.dpr = Math.min(window.devicePixelRatio, 2);

    this.init();
  }

  init() {
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.trackMouse(e));
    this.resize();
  }

  resize() {
    this.canvas.width = this.canvas.clientWidth * this.dpr;
    this.canvas.height = this.canvas.clientHeight * this.dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  trackMouse(e) {
    this.mouse.tx = e.clientX / window.innerWidth;
    this.mouse.ty = 1.0 - (e.clientY / window.innerHeight);
  }

  compile(name, vert, frag) {
    const gl = this.gl;
    const vs = this.shader(gl.VERTEX_SHADER, vert);
    const fs = this.shader(gl.FRAGMENT_SHADER, frag);
    const prog = gl.createProgram();
    
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return null;
    }

    this.programs.set(name, prog);
    return prog;
  }

  shader(type, src) {
    const gl = this.gl;
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  render(name, userUniforms = {}) {
    const gl = this.gl;
    const prog = this.programs.get(name);
    if (!prog) return;

    gl.useProgram(prog);

    // Standard Uniforms
    const time = (performance.now() - this.startTime) / 1000;
    this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.1;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.1;

    const locTime = gl.getUniformLocation(prog, 'u_time');
    const locRes = gl.getUniformLocation(prog, 'u_res');
    const locMouse = gl.getUniformLocation(prog, 'u_mouse');

    if (locTime) gl.uniform1f(locTime, time);
    if (locRes) gl.uniform2f(locRes, this.canvas.width, this.canvas.height);
    if (locMouse) gl.uniform2f(locMouse, this.mouse.x, this.mouse.y);

    // Apply custom uniforms
    Object.entries(userUniforms).forEach(([key, val]) => {
      const loc = gl.getUniformLocation(prog, key);
      if (loc) {
        if (typeof val === 'number') gl.uniform1f(loc, val);
        else if (Array.isArray(val)) {
          if (val.length === 2) gl.uniform2fv(loc, val);
          if (val.length === 3) gl.uniform3fv(loc, val);
        }
      }
    });

    // Draw full-screen quad
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
