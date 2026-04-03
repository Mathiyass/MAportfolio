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

    if (!this.gl) {
      throw new Error('WebGL2 not supported');
    }

    const gl = this.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('OES_texture_float_linear');

    this.programs = new Map();
    this.vaos = new Map();
    this.textures = new Map();
    this.fbos = new Map();
    this.uniforms = new Map();
    
    this.rafId = null;
    this.t = 0;
    this.startMs = performance.now();
    this.mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 };
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.paused = false;

    this._initEventListeners();
    this._resize();
  }

  _initEventListeners() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this._resize(), 16);
    });

    this.canvas.addEventListener('mousemove', (e) => this._trackMouse(e));
    this.canvas.addEventListener('mouseleave', () => this._releaseMouse());
    this.canvas.addEventListener('touchstart', (e) => this._trackTouch(e), { passive: true });
    this.canvas.addEventListener('touchmove', (e) => this._trackTouch(e), { passive: true });

    document.addEventListener('visibilitychange', () => {
      this.paused = document.hidden;
    });
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
    if (e.touches.length > 0) {
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
    const { canvas, gl, dpr } = this;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  compileProgram(name, vertSrc, fragSrc) {
    const gl = this.gl;
    const vert = this._compileShader(gl.VERTEX_SHADER, vertSrc);
    const frag = this._compileShader(gl.FRAGMENT_SHADER, fragSrc);
    const prog = gl.createProgram();
    
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(`Program Link Error (${name}):`, gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      return null;
    }

    this.programs.set(name, prog);
    
    // Pre-cache standard uniforms
    ['u_time', 'u_res', 'u_mouse', 'u_mouse_vel', 'u_frame', 'u_dpr'].forEach(u => {
      this.getUniform(name, u);
    });

    return prog;
  }

  _compileShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Shader Compile Error:`, gl.getShaderInfoLog(shader));
      console.error(source);
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  getUniform(programName, uniformName) {
    const key = `${programName}_${uniformName}`;
    if (this.uniforms.has(key)) return this.uniforms.get(key);
    
    const prog = this.programs.get(programName);
    if (!prog) return null;
    
    const loc = this.gl.getUniformLocation(prog, uniformName);
    this.uniforms.set(key, loc);
    return loc;
  }

  createFullscreenQuad(name) {
    const gl = this.gl;
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]), gl.STATIC_DRAW);

    // Assuming a_position is at location 0
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);
    this.vaos.set(name, vao);
    return vao;
  }

  createPingPongFBO(name, width, height) {
    const gl = this.gl;
    const createFBO = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, width, height, 0, gl.RGBA, gl.FLOAT, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      
      return { fbo, tex };
    };

    let read = createFBO();
    let write = createFBO();

    const fboPair = {
      get read() { return read; },
      get write() { return write; },
      swap() {
        const temp = read;
        read = write;
        write = temp;
      }
    };

    this.fbos.set(name, fboPair);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return fboPair;
  }

  async loadTexture(name, imageOrUrl) {
    const gl = this.gl;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    if (typeof imageOrUrl === 'string') {
      try {
        const res = await fetch(imageOrUrl);
        const blob = await res.blob();
        const bmp = await createImageBitmap(blob);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bmp);
        this.textures.set(name, tex);
      } catch (e) {
        console.error(`Failed to load texture ${name}:`, e);
      }
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageOrUrl);
      this.textures.set(name, tex);
    }
    return tex;
  }

  render(programName, userUniforms = {}, postDrawCallback = null) {
    cancelAnimationFrame(this.rafId);
    const gl = this.gl;

    const loop = (ms) => {
      if (this.paused) {
        this.rafId = requestAnimationFrame(loop);
        return;
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      const prog = this.programs.get(programName);
      if (!prog) return;
      
      gl.useProgram(prog);

      // Standard uniforms
      gl.uniform1f(this.getUniform(programName, 'u_time'), (ms - this.startMs) / 1000);
      gl.uniform2f(this.getUniform(programName, 'u_res'), this.canvas.width, this.canvas.height);
      
      // Lerp mouse
      this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.06;
      this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.06;
      
      gl.uniform2f(this.getUniform(programName, 'u_mouse'), this.mouse.x, this.mouse.y);
      gl.uniform2f(this.getUniform(programName, 'u_mouse_vel'), this.mouse.vx, this.mouse.vy);
      gl.uniform1i(this.getUniform(programName, 'u_frame'), this.t);
      gl.uniform1f(this.getUniform(programName, 'u_dpr'), this.dpr);

      // User uniforms
      for (const [uname, val] of Object.entries(userUniforms)) {
        const loc = this.getUniform(programName, uname);
        if (!loc) continue;
        
        if (Array.isArray(val)) {
          if (val.length === 2) gl.uniform2fv(loc, val);
          else if (val.length === 3) gl.uniform3fv(loc, val);
          else if (val.length === 4) gl.uniform4fv(loc, val);
        } else if (Number.isInteger(val)) {
          gl.uniform1i(loc, val);
        } else {
          gl.uniform1f(loc, val);
        }
      }

      const vao = this.vaos.get('fullscreen') ?? this.vaos.values().next().value;
      if (vao) {
        gl.bindVertexArray(vao);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        gl.bindVertexArray(null);
      }

      if (postDrawCallback) {
        postDrawCallback(gl, ms);
      }

      this.t++;
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  renderTo(fboName, programName, userUniforms) {
    const gl = this.gl;
    const fboPair = this.fbos.get(fboName);
    if (!fboPair) return;

    gl.bindFramebuffer(gl.FRAMEBUFFER, fboPair.write.fbo);
    gl.viewport(0, 0, fboPair.write.tex.width, fboPair.write.tex.height); // Note: assumes square or custom size known
    
    // Render logic similar to above but once-off and to FBO
    const prog = this.programs.get(programName);
    gl.useProgram(prog);
    // ... setup uniforms ...
    
    // Standard uniforms
    const ms = performance.now();
    gl.uniform1f(this.getUniform(programName, 'u_time'), (ms - this.startMs) / 1000);
    gl.uniform2f(this.getUniform(programName, 'u_res'), this.canvas.width, this.canvas.height);
    gl.uniform2f(this.getUniform(programName, 'u_mouse'), this.mouse.x, this.mouse.y);
    gl.uniform2f(this.getUniform(programName, 'u_mouse_vel'), this.mouse.vx, this.mouse.vy);
    gl.uniform1i(this.getUniform(programName, 'u_frame'), this.t);
    
    for (const [uname, val] of Object.entries(userUniforms)) {
      const loc = this.getUniform(programName, uname);
      if (loc) {
        if (Array.isArray(val)) {
          if (val.length === 2) gl.uniform2fv(loc, val);
        } else if (Number.isInteger(val)) {
          gl.uniform1i(loc, val);
        } else {
          gl.uniform1f(loc, val);
        }
      }
    }

    const vao = this.vaos.get('fullscreen') ?? this.vaos.values().next().value;
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindVertexArray(null);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    const gl = this.gl;
    this.programs.forEach(p => gl.deleteProgram(p));
    this.vaos.forEach(v => gl.deleteVertexArray(v));
    this.textures.forEach(t => gl.deleteTexture(t));
    this.fbos.forEach(f => {
      gl.deleteFramebuffer(f.read.fbo);
      gl.deleteTexture(f.read.tex);
      gl.deleteFramebuffer(f.write.fbo);
      gl.deleteTexture(f.write.tex);
    });
    
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();
  }
}
