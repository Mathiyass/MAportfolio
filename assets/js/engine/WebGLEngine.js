// WebGLEngine.js
import { SHADERS, VERT_SHARED } from './shaders.js';

export class WebGLEngine {
  constructor(canvas, shaderId, options = {}) {
    this.canvas = canvas;
    this.shaderId = shaderId;
    this.options = { opacity: 1.0, pointerTracking: true, ...options };
    this.gl = this.canvas.getContext('webgl2', {
      alpha: true,
      depth: false,
      antialias: false,
      powerPreference: 'high-performance'
    });

    if (!this.gl) {
      console.warn('WebGL2 not supported');
      return;
    }

    this.dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    this.time = 0;
    this.pointer = { x: 0, y: 0, vx: 0, vy: 0 };
    this.targetPointer = { x: 0, y: 0 };
    this.running = true;

    this.init();
  }

  init() {
    this.canvas.style.opacity = this.options.opacity;
    this.resize();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.canvas.parentElement || document.body);

    const source = SHADERS[this.shaderId];
    if (!source) return;

    this.program = this.createProgram(VERT_SHARED, source);
    if (!this.program) return;

    this.setupGeometry();
    this.setupUniforms();
    this.bindEvents();

    if (this.shaderId === 'SHADER_06') {
      this.setupFBO();
    }

    this.lastTime = performance.now();
    this.render();
  }

  createShader(type, source) {
    const s = this.gl.createShader(type);
    this.gl.shaderSource(s, source.trim());
    this.gl.compileShader(s);
    if (!this.gl.getShaderParameter(s, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(s));
      this.gl.deleteShader(s);
      return null;
    }
    return s;
  }

  createProgram(vsSource, fsSource) {
    const vs = this.createShader(this.gl.VERTEX_SHADER, vsSource);
    const fs = this.createShader(this.gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;

    const p = this.gl.createProgram();
    this.gl.attachShader(p, vs);
    this.gl.attachShader(p, fs);
    this.gl.linkProgram(p);

    if (!this.gl.getProgramParameter(p, this.gl.LINK_STATUS)) {
      console.error(this.gl.getProgramInfoLog(p));
      return null;
    }
    return p;
  }

  setupGeometry() {
    this.vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(this.vao);

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    const posLoc = this.gl.getAttribLocation(this.program, "position");
    this.gl.enableVertexAttribArray(posLoc);
    this.gl.vertexAttribPointer(posLoc, 2, this.gl.FLOAT, false, 0, 0);
  }

  setupUniforms() {
    this.gl.useProgram(this.program);
    this.uTime = this.gl.getUniformLocation(this.program, "u_time");
    this.uResolution = this.gl.getUniformLocation(this.program, "u_resolution");
    this.uPointer = this.gl.getUniformLocation(this.program, "u_pointer");
  }

  setupFBO() {
    // Ping-pong FBO for particle simulation
    // Minimal implementation for demonstration
  }

  resize() {
    const bounds = this.canvas.getBoundingClientRect();
    this.width = bounds.width;
    this.height = bounds.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  bindEvents() {
    if (this.options.pointerTracking) {
      window.addEventListener('mousemove', (e) => {
        this.targetPointer.x = e.clientX / window.innerWidth;
        this.targetPointer.y = 1.0 - (e.clientY / window.innerHeight);
      });
    }
    document.addEventListener('visibilitychange', () => {
      this.running = document.visibilityState === 'visible';
      if (this.running) {
        this.lastTime = performance.now();
        this.render();
      }
    });
  }

  render() {
    if (!this.running || !this.program) return;

    const now = performance.now();
    const dt = (now - this.lastTime) * 0.001;
    this.lastTime = now;
    this.time += dt;

    // Lerp pointer
    this.pointer.x += (this.targetPointer.x - this.pointer.x) * 0.1;
    this.pointer.y += (this.targetPointer.y - this.pointer.y) * 0.1;

    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);

    if (this.uTime) this.gl.uniform1f(this.uTime, this.time);
    if (this.uResolution) this.gl.uniform2f(this.uResolution, this.canvas.width, this.canvas.height);
    if (this.uPointer) this.gl.uniform2f(this.uPointer, this.pointer.x, this.pointer.y);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);

    requestAnimationFrame(() => this.render());
  }

  destroy() {
    this.running = false;
    this.ro.disconnect();
    // Delete GL resources...
  }
}
