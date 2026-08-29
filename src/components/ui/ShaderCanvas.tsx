"use client";

import { useEffect, useRef } from "react";

/**
 * ShaderCanvas — a bespoke, dependency-free WebGL aurora.
 *
 * Design goals (aligned with the performance budget):
 *  - Raw WebGL1, no three.js. One fullscreen triangle + one fragment shader.
 *  - Pauses the render loop when off-screen (IntersectionObserver) or when the
 *    tab is hidden (visibilitychange).
 *  - Caps devicePixelRatio to avoid 3x-retina overdraw.
 *  - Respects prefers-reduced-motion: renders a single static frame.
 *  - Falls back to a CSS gradient if WebGL is unavailable or the context dies.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.y)
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.7, 5.3);
    a *= 0.5;
  }
  return v;
}

const vec3 INK  = vec3(0.043, 0.067, 0.125);   // #0B1120
const vec3 DEEP = vec3(0.114, 0.306, 0.847);   // #1D4ED8
const vec3 ACC  = vec3(0.145, 0.388, 0.922);   // #2563EB
const vec3 SOFT = vec3(0.478, 0.647, 0.961);   // #7AA5F5
const vec3 TEAL = vec3(0.110, 0.540, 0.640);

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0);

  float t = u_time * 0.05;

  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, -t)));
  vec2 r = vec2(
    fbm(p * 1.8 + 3.1 * q + vec2(1.7, 9.2) + t * 0.6),
    fbm(p * 1.8 + 3.1 * q + vec2(8.3, 2.8) - t * 0.4)
  );
  float f = fbm(p * 1.6 + 2.6 * r);

  vec3 col = mix(INK, DEEP, clamp(f * f * 2.4, 0.0, 1.0));
  col = mix(col, ACC, clamp(length(q) * 0.55, 0.0, 0.75));
  col = mix(col, SOFT, clamp(r.x * r.x * 0.7, 0.0, 0.5) * smoothstep(0.35, 1.0, uv.y));
  col = mix(col, TEAL, 0.16 * smoothstep(0.2, 0.9, f) * (1.0 - uv.y));

  float vig = smoothstep(1.25, 0.35, length(uv - vec2(0.5, 0.55)));
  col *= mix(0.72, 1.0, vig);
  col = mix(col, col * 0.82, smoothstep(0.55, 0.0, uv.y));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function ShaderCanvas({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power",
      }) ?? canvas.getContext("experimental-webgl");

    /* No WebGL at all → hide canvas; the parent CSS gradient shows instead */
    if (!gl) {
      canvas.style.display = "none";
      return;
    }
    const ctx = gl as WebGLRenderingContext;

    const vs = compile(ctx, ctx.VERTEX_SHADER, VERT);
    const fs = compile(ctx, ctx.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.display = "none";
      return;
    }
    const prog = ctx.createProgram();
    ctx.attachShader(prog, vs);
    ctx.attachShader(prog, fs);
    ctx.linkProgram(prog);
    if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
      canvas.style.display = "none";
      return;
    }
    ctx.useProgram(prog);

    /* Fullscreen triangle — no quad, no index buffer */
    const buf = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      ctx.STATIC_DRAW,
    );
    const loc = ctx.getAttribLocation(prog, "a_pos");
    ctx.enableVertexAttribArray(loc);
    ctx.vertexAttribPointer(loc, 2, ctx.FLOAT, false, 0, 0);

    const uRes = ctx.getUniformLocation(prog, "u_res");
    const uTime = ctx.getUniformLocation(prog, "u_time");

    let raf = 0;
    let visible = true;
    let running = false;
    const start = performance.now();
    const MAX_DPR = 1.75;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        ctx.viewport(0, 0, w, h);
      }
    };

    const draw = (now: number) => {
      resize();
      ctx.uniform2f(uRes, canvas.width, canvas.height);
      ctx.uniform1f(uTime, (now - start) / 1000);
      ctx.drawArrays(ctx.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (running || !visible) return;
      if (reduced.matches) {
        draw(performance.now()); // single static frame
        return;
      }
      running = true;
      raf = requestAnimationFrame(frame);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    /* Pause when the hero scrolls out of view */
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startLoop();
        else stopLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    /* Pause when the tab is hidden */
    const onVis = () => (document.hidden ? stopLoop() : startLoop());
    document.addEventListener("visibilitychange", onVis);

    /* Keep the drawing buffer matched to layout size */
    const ro = new ResizeObserver(() => {
      if (reduced.matches && !running) draw(performance.now());
    });
    ro.observe(canvas);

    /* Context loss → CSS gradient fallback */
    const onLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
      canvas.style.display = "none";
    };
    canvas.addEventListener("webglcontextlost", onLost);

    startLoop();

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      ctx.deleteProgram(prog);
      ctx.deleteShader(vs);
      ctx.deleteShader(fs);
      ctx.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ background: "linear-gradient(180deg, #0E1628 0%, #0B1120 100%)" }}
    />
  );
}

