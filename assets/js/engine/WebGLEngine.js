export class WebGLEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false,
      ...options
    });

    if (!this.gl) throw new Error("WebGL2 not supported");

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.getExtension('EXT_color_buffer_float');
    this.gl.getExtension('OES_texture_float_linear');

    this.programs = new Map();
    this.vaos = new Map();
    this.textures = new Map();
    this.fbos = new Map();
    this.uniforms = new Map();
    this.rafId = null;
    this.t = 0;
    this.startMs = performance.now();
    this.mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 };
    this.dpr = Math.min(window.devicePixelRatio, 2);
    this.paused = false;

    this._initEventListeners();
    this._resize();
    this.createFullscreenQuad('fullscreen');
  }

  _initEventListeners() {
    window.addEventListener('resize', this._throttle(() => this._resize(), 16));
    this.canvas.addEventListener('mousemove', (e) => this._trackMouse(e));
    this.canvas.addEventListener('mouseleave', () => this._releaseMouse());
    this.canvas.addEventListener('touchstart', (e) => this._trackTouch(e), { passive: true });
    this.canvas.addEventListener('touchmove', (e) => this._trackTouch(e), { passive: true });
    document.addEventListener('visibilitychange', () => {
      this.paused = document.hidden;
    });
  }

  _throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  _trackMouse(e) {
    const rect = this.canvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = 1.0 - ((e.clientY - rect.top) / rect.height);
    this.mouse.vx = nx - this.mouse.tx;
    this.mouse.vy = ny - this.mouse.ty;
    this.mouse.tx = nx;
    this.mouse.ty = ny;
  }

  _trackTouch(e) {
    if(e.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      const nx = (e.touches[0].clientX - rect.left) / rect.width;
      const ny = 1.0 - ((e.touches[0].clientY - rect.top) / rect.height);
      this.mouse.vx = nx - this.mouse.tx;
      this.mouse.vy = ny - this.mouse.ty;
      this.mouse.tx = nx;
      this.mouse.ty = ny;
    }
  }

  _releaseMouse() {
    this.mouse.tx = 0.5;
    this.mouse.ty = 0.5;
  }

  _resize() {
    this.canvas.width = this.canvas.clientWidth * this.dpr;
    this.canvas.height = this.canvas.clientHeight * this.dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  compileProgram(name, vertSrc, fragSrc) {
    const vertShader = this._compileShader(this.gl.VERTEX_SHADER, vertSrc);
    const fragShader = this._compileShader(this.gl.FRAGMENT_SHADER, fragSrc);
    
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertShader);
    this.gl.attachShader(program, fragShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error(`Program linking failed: ${this.gl.getProgramInfoLog(program)}`);
      this.gl.deleteProgram(program);
      return null;
    }

    this.programs.set(name, program);
    
    // Pre-cache standard uniforms
    ['u_time', 'u_res', 'u_mouse', 'u_mouse_vel', 'u_frame', 'u_dpr'].forEach(u => {
      this.getUniform(name, u);
    });

    return program;
  }

  _compileShader(type, src) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, src);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(`Shader compilation failed: ${this.gl.getShaderInfoLog(shader)}`);
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  getUniform(programName, uniformName) {
    const key = `${programName}_${uniformName}`;
    if (this.uniforms.has(key)) return this.uniforms.get(key);
    
    const prog = this.programs.get(programName);
    if(!prog) return null;

    const loc = this.gl.getUniformLocation(prog, uniformName);
    this.uniforms.set(key, loc);
    return loc;
  }

  createFullscreenQuad(name) {
    const vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]), this.gl.STATIC_DRAW);

    this.gl.enableVertexAttribArray(0);
    this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.bindVertexArray(null);
    this.vaos.set(name, vao);
  }

  createPingPongFBO(name, width, height) {
    const createFBO = () => {
      const tex = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, width, height, 0, this.gl.RGBA, this.gl.FLOAT, null);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

      const fbo = this.gl.createFramebuffer();
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, tex, 0);
      
      return { fbo, tex };
    };

    let fboA = createFBO();
    let fboB = createFBO();

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

    this.fbos.set(name, {
      read: fboA,
      write: fboB,
      swap: function() {
        let temp = this.read;
        this.read = this.write;
        this.write = temp;
      }
    });
  }

  async loadTexture(name, source) {
    const tex = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

    if (typeof source === 'string') {
        const response = await fetch(source);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, bitmap);
    } else {
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, source);
    }

    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    this.textures.set(name, tex);
    return tex;
  }

  render(programName, userUniforms = {}, postDrawCallback = null) {
    cancelAnimationFrame(this.rafId);

    const loop = (ms) => {
      if (this.paused) {
        this.rafId = requestAnimationFrame(loop);
        return;
      }
      
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      const prog = this.programs.get(programName);
      if(!prog) return;

      this.gl.useProgram(prog);

      this.gl.uniform1f(this.getUniform(programName, 'u_time'), (ms - this.startMs) / 1000);
      this.gl.uniform2f(this.getUniform(programName, 'u_res'), this.canvas.width, this.canvas.height);
      
      this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.06;
      this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.06;
      
      this.gl.uniform2f(this.getUniform(programName, 'u_mouse'), this.mouse.x, this.mouse.y);
      this.gl.uniform2f(this.getUniform(programName, 'u_mouse_vel'), this.mouse.vx, this.mouse.vy);
      this.gl.uniform1i(this.getUniform(programName, 'u_frame'), this.t);
      this.gl.uniform1f(this.getUniform(programName, 'u_dpr'), this.dpr);

      for (const [uname, val] of Object.entries(userUniforms)) {
        const l = this.getUniform(programName, uname);
        if(l === null) continue;
        if (Array.isArray(val)) {
          if (val.length === 2) this.gl.uniform2fv(l, val);
          else if (val.length === 3) this.gl.uniform3fv(l, val);
          else if (val.length === 4) this.gl.uniform4fv(l, val);
        } else if (Number.isInteger(val)) {
             this.gl.uniform1i(l, val);
        }
        else this.gl.uniform1f(l, val);
      }

      const vao = this.vaos.get('fullscreen') || this.vaos.values().next().value;
      this.gl.bindVertexArray(vao);
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
      this.gl.bindVertexArray(null);

      if (postDrawCallback) postDrawCallback(this.gl, ms);

      this.t++;
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  pause() { this.paused = true; }
  resume() { this.paused = false; }

  renderTo(fboName, programName, userUniforms) {
      const fboObj = this.fbos.get(fboName);
      if(!fboObj) return;
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fboObj.write.fbo);
      this.render(programName, userUniforms);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    this.programs.forEach(p => this.gl.deleteProgram(p));
    this.vaos.forEach(v => this.gl.deleteVertexArray(v));
    this.textures.forEach(t => this.gl.deleteTexture(t));
    this.fbos.forEach(f => {
        this.gl.deleteFramebuffer(f.read.fbo);
        this.gl.deleteTexture(f.read.tex);
        this.gl.deleteFramebuffer(f.write.fbo);
        this.gl.deleteTexture(f.write.tex);
    });
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }
}
