"use client";

import * as React from "react";
import { useEffect, useRef } from "react";

export interface BlackHoleHeroSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  distance?: number;
  elevation?: number;
  azimuth?: number;
  orbitSpeed?: number;
  roll?: number;
  fov?: number;
  diskInner?: number;
  diskOuter?: number;
  diskThickness?: number;
  diskDensity?: number;
  brightness?: number;
  spinSpeed?: number;
  grain?: number;
  doppler?: number;
  hotColor?: string;
  midColor?: string;
  coolColor?: string;
  starBrightness?: number;
  glow?: number;
  exposure?: number;
  vignette?: number;
  steps?: number;
  resolution?: number;
  maxDpr?: number;
  focus?: [number, number];
  scrim?: "none" | "left" | "right" | "top" | "bottom";
  scrimStrength?: number;
  paused?: boolean;
  children?: React.ReactNode;
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const SCENE_FRAG = `
precision highp float;
#define MAX_STEPS 460
#define WIND_CYCLE 46.0
varying vec2 vUv;
uniform vec2  uRes;
uniform float uTime;
uniform vec3  uCamPos;
uniform vec3  uRight;
uniform vec3  uUp;
uniform vec3  uFwd;
uniform float uTanHalf;
uniform vec2  uFocus;
uniform float uSteps;
uniform float uSkyR;
uniform float uDiskIn;
uniform float uDiskOut;
uniform float uThick;
uniform float uDensity;
uniform float uSpin;
uniform float uGrain;
uniform float uBright;
uniform float uDoppler;
uniform vec3  uHot;
uniform vec3  uMid;
uniform vec3  uCool;
uniform float uStars;
uniform float uEncode;
uniform vec2  uJitter;
uniform float uSeed;
float hash13(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float vnoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash13(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash13(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash13(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash13(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash13(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash13(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash13(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash13(i + vec3(1.0, 1.0, 1.0));
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z
  );
}
float fbm(vec3 p, float lod) {
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += (i == 3 ? a * lod : a) * vnoise(p);
    p = p * 2.03 + vec3(11.3, 7.1, 3.7);
    a *= 0.5;
  }
  return s;
}
void gasAt(vec3 p, float rd, float dt, out float dens, out vec3 tint, out float heat) {
  float rn = clamp((rd - uDiskIn) / max(0.001, uDiskOut - uDiskIn), 0.0, 1.0);
  float tk = uThick * (0.35 + 1.25 * rn);
  float v = p.y / tk;
  float sheet = exp(-v * v);
  float lod = clamp(1.0 - dt * uGrain * 14.0, 0.0, 1.0);
  float phi = atan(p.z, p.x);
  float omega = uSpin * pow(uDiskIn / rd, 1.5);
  float lr = log(rd) * 1.1 + uSpin * uTime * 0.05;
  float u = uTime / WIND_CYCLE;
  float fA = fract(u);
  float fB = fract(u + 0.5);
  float w = abs(2.0 * fA - 1.0);
  float cloudsA = fbm(vec3(vec2(cos(phi + omega * fA * WIND_CYCLE), sin(phi + omega * fA * WIND_CYCLE)) * (rd * uGrain), lr), lod);
  float cloudsB = fbm(vec3(vec2(cos(phi + omega * fB * WIND_CYCLE), sin(phi + omega * fB * WIND_CYCLE)) * (rd * uGrain), lr + 40.0), lod);
  float clouds = mix(cloudsA, cloudsB, w);
  float filaments = clouds * clouds * 1.75;
  float inner = smoothstep(0.0, 0.07, rn);
  float outer = 1.0 - smoothstep(0.45, 1.0, rn);
  float prof = inner * outer * pow(uDiskIn / rd, 2.0);
  dens = max(0.0, filaments * 1.5 - 0.30) * sheet * prof * uDensity * 4.6;
  heat = pow(uDiskIn / rd, 0.8) * (0.72 + 0.55 * clouds);
  tint = mix(uCool, uMid, smoothstep(0.10, 0.52, heat));
  tint = mix(tint, uHot, smoothstep(0.52, 1.05, heat));
}
vec3 starField(vec3 d) {
  vec3 a = abs(d);
  vec2 uv;
  float face;
  if (a.x >= a.y && a.x >= a.z)      { uv = d.yz / a.x; face = d.x > 0.0 ? 0.0 : 1.0; }
  else if (a.y >= a.z)               { uv = d.xz / a.y; face = d.y > 0.0 ? 2.0 : 3.0; }
  else                               { uv = d.xy / a.z; face = d.z > 0.0 ? 4.0 : 5.0; }
  vec3 col = vec3(0.0);
  for (int k = 0; k < 3; k++) {
    float sc = 90.0 * pow(2.2, float(k));
    vec2 p = uv * sc;
    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;
    float h = hash13(vec3(id, face * 19.0));
    if (h > 0.965) {
      vec2 off = vec2(hash13(vec3(id, face + 11.0)), hash13(vec3(id, face + 23.0)));
      float dd = length(f - (off - 0.5) * 0.7);
      float s = smoothstep(0.055, 0.0, dd);
      float warm = hash13(vec3(id, face + 51.0));
      col += s * (0.6 + 4.5 * fract(h * 97.0)) * mix(vec3(0.72, 0.82, 1.0), vec3(1.0, 0.88, 0.72), warm) / pow(2.2, float(k));
    }
  }
  col += vec3(0.013, 0.017, 0.030) * fbm(d * 2.6, 1.0);
  return col;
}
void main() {
  vec2 uv = (gl_FragCoord.xy + uJitter - uFocus * uRes) / uRes.y;
  vec3 dir = normalize(uFwd + (uv.x * uRight + uv.y * uUp) * 2.0 * uTanHalf);
  vec3 pos = uCamPos;
  vec3 vel = dir;
  vec3 hv = cross(pos, vel);
  float h2 = dot(hv, hv);
  float h = sqrt(h2);
  float swept = 0.0;
  vec3 col = vec3(0.0);
  float transmit = 1.0;
  bool captured = false;
  float jitter = fract(sin(dot(gl_FragCoord.xy + uSeed, vec2(12.9898, 78.233))) * 43758.5453);
  for (int i = 0; i < MAX_STEPS; i++) {
    if (float(i) >= uSteps) break;
    float r2 = dot(pos, pos);
    float r = sqrt(r2);
    if (r < 1.0) { captured = true; break; }
    if (r > uSkyR && dot(pos, vel) > 0.0) break;
    if (transmit < 0.004) break;
    float dt = clamp(0.14 * (r - 1.0), 0.025, 1.1);
    if (r < uDiskOut * 1.25) {
      float rn = clamp((r - uDiskIn) / max(0.001, uDiskOut - uDiskIn), 0.0, 1.0);
      float tk = uThick * (0.35 + 1.25 * rn);
      dt = min(dt, max(tk * 0.38, abs(pos.y) * 0.5));
    }
    swept += h * dt / r2;
    float deep = exp(-1.3 * max(0.0, swept - 4.6));
    jitter = fract(jitter + 0.6180339887);
    vec3 mid = pos + vel * (dt * jitter);
    float rd = length(mid.xz);
    if (rd > uDiskIn && rd < uDiskOut && abs(mid.y) < uThick * 5.0) {
      float dens;
      float heat;
      vec3 tint;
      gasAt(mid, rd, dt, dens, tint, heat);
      if (dens > 0.001) {
        vec3 tang = normalize(cross(vec3(0.0, 1.0, 0.0), vec3(mid.x, 0.0, mid.z)));
        float beta = min(0.85, sqrt(0.5 / max(rd, 1.5)));
        float gam = inversesqrt(max(1e-4, 1.0 - beta * beta));
        vec3 toObs = -normalize(vel);
        float g = 1.0 / (gam * (1.0 - beta * dot(tang, toObs)));
        g *= sqrt(max(0.05, 1.0 - 1.0 / rd));
        float boost = pow(max(g, 0.02), 3.0 * uDoppler);
        vec3 shift = mix(vec3(1.0), g > 1.0 ? vec3(0.86, 0.94, 1.14) : vec3(1.15, 0.82, 0.62), clamp(abs(g - 1.0) * 1.6, 0.0, 1.0) * uDoppler);
        float emit = uBright * (0.26 + 2.0 * heat * heat);
        col += tint * shift * (emit * boost * dens * transmit * dt * deep);
        transmit *= exp(-dens * 0.30 * dt);
      }
    }
    vec3 acc = -1.5 * h2 * pos / (r2 * r2 * r);
    vel += acc * dt;
    pos += vel * dt;
  }
  if (!captured && uStars > 0.001) {
    vec3 toHole = normalize(-uCamPos);
    float sI = length(cross(normalize(dir), toHole));
    float sS = length(cross(normalize(vel), toHole));
    float stretch = clamp(sI / max(1e-3, sS), 1.0, 40.0);
    col += starField(normalize(vel)) * uStars * transmit / stretch;
  }
  if (uEncode > 0.5) col = col / (1.0 + col);
  gl_FragColor = vec4(col, 1.0);
}
`;

const BLEND_FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uCur;
uniform sampler2D uPrev;
uniform float uAlpha;
void main() {
  vec3 c = texture2D(uCur, vUv).rgb;
  vec3 p = texture2D(uPrev, vUv).rgb;
  gl_FragColor = vec4(mix(p, c, uAlpha), 1.0);
}
`;

const BRIGHT_FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uTexel;
uniform float uDecode;
uniform float uPack;
uniform float uThreshold;
void main() {
  vec3 s = texture2D(uTex, vUv + uTexel * vec2(-1.0, -1.0)).rgb
         + texture2D(uTex, vUv + uTexel * vec2( 1.0, -1.0)).rgb
         + texture2D(uTex, vUv + uTexel * vec2(-1.0,  1.0)).rgb
         + texture2D(uTex, vUv + uTexel * vec2( 1.0,  1.0)).rgb;
  s *= 0.25;
  if (uDecode > 0.5) s = s / max(vec3(0.002), 1.0 - s);
  float l = max(s.r, max(s.g, s.b));
  s *= max(0.0, l - uThreshold) / max(0.0001, l);
  gl_FragColor = vec4(s * uPack, 1.0);
}
`;

const BLUR_FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uStep;
void main() {
  vec3 s = texture2D(uTex, vUv).rgb * 0.2270270;
  s += (texture2D(uTex, vUv + uStep * 1.3846154).rgb + texture2D(uTex, vUv - uStep * 1.3846154).rgb) * 0.3162162;
  s += (texture2D(uTex, vUv + uStep * 3.2307692).rgb + texture2D(uTex, vUv - uStep * 3.2307692).rgb) * 0.0702702;
  gl_FragColor = vec4(s, 1.0);
}
`;

const COMPOSITE_FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform vec2  uRes;
uniform float uDecode;
uniform float uPack;
uniform float uGlow;
uniform float uExposure;
uniform float uVignette;
uniform float uScrimDir;
uniform float uScrimAmt;
uniform float uSeed;
vec3 aces(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}
void main() {
  vec3 scene = texture2D(uScene, vUv).rgb;
  if (uDecode > 0.5) scene = scene / max(vec3(0.002), 1.0 - scene);
  vec3 bloom = texture2D(uBloom, vUv).rgb / uPack;
  vec3 c = scene + bloom * uGlow;
  c = aces(c * uExposure);
  c = pow(max(c, 0.0), vec3(0.4545));
  vec2 d = vUv - 0.5;
  c *= 1.0 - uVignette * dot(d, d) * 1.9;
  if (uScrimDir > 0.5) {
    float x = uScrimDir < 1.5 ? vUv.x : uScrimDir < 2.5 ? 1.0 - vUv.x : uScrimDir < 3.5 ? 1.0 - vUv.y : vUv.y;
    c *= 1.0 - uScrimAmt * pow(1.0 - clamp(x, 0.0, 1.0), 2.4);
  }
  float n = fract(sin(dot(gl_FragCoord.xy + uSeed, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) / 255.0;
  gl_FragColor = vec4(c, 1.0);
}
`;

const RAD = Math.PI / 180;

function hexToLinear(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2] : h.slice(0, 6);
  const n = parseInt(full, 16);
  const srgb = [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  return srgb.map((v) => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)) as [number, number, number];
}

type Prog = { program: WebGLProgram; u: Record<string, WebGLUniformLocation | null> };
type Target = { fb: WebGLFramebuffer; tex: WebGLTexture; w: number; h: number };

export function BlackHoleHeroSection({
  distance = 24, elevation = -5.5, azimuth = 0, orbitSpeed = 0, roll = -20,
  fov = 42, diskInner = 3, diskOuter = 15, diskThickness = 0.26, diskDensity = 1,
  brightness = 1, spinSpeed = 0.06, grain = 0.48, doppler = 0.35,
  hotColor = "#FFF3DE", midColor = "#FF9838", coolColor = "#8E3A0B",
  starBrightness = 0, glow = 1, exposure = 0.9, vignette = 0.28,
  steps = 300, resolution = 0.7, maxDpr = 1.75, focus = [0.72, 0.46] as [number, number],
  scrim = "none", scrimStrength = 0.9, paused = false,
  className = "", children, ...rest
}: BlackHoleHeroSectionProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const props = useRef({
    distance, elevation, azimuth, orbitSpeed, roll, fov, diskInner, diskOuter,
    diskThickness, diskDensity, brightness, spinSpeed, grain, doppler, hotColor,
    midColor, coolColor, starBrightness, glow, exposure, vignette, steps,
    resolution, maxDpr, focus, scrim, scrimStrength, paused,
  });
    props.current = {
    distance, elevation, azimuth, orbitSpeed, roll, fov, diskInner, diskOuter,
    diskThickness, diskDensity, brightness, spinSpeed, grain, doppler, hotColor,
    midColor, coolColor, starBrightness, glow, exposure, vignette, steps,
    resolution, maxDpr, focus, scrim, scrimStrength, paused,
  };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opts: WebGLContextAttributes = { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: "high-performance", preserveDrawingBuffer: false };
    const gl = (canvas.getContext("webgl2", opts) || canvas.getContext("webgl", opts)) as WebGL2RenderingContext | WebGLRenderingContext | null;

    function giveUp(why: string) { host!.dataset.webgl = why; canvas!.style.display = "none"; }
    if (!gl) { giveUp("unsupported"); return; }

    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg ? String(gl.getParameter((dbg as any).UNMASKED_RENDERER_WEBGL) || "") : "";
    const software = /swiftshader|llvmpipe|softpipe|software|microsoft basic/i.test(renderer);
    const isGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;

    function compile(type: number, src: string): WebGLShader | null {
      const sh = gl!.createShader(type);
      if (!sh) return null;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        console.error("blackhole: shader failed —", gl!.getShaderInfoLog(sh) || "no log");
        gl!.deleteShader(sh);
        return null;
      }
      return sh;
    }

    function link(fragSrc: string): Prog | null {
      const vs = compile(gl!.VERTEX_SHADER, VERT);
      const fs = compile(gl!.FRAGMENT_SHADER, fragSrc);
      if (!vs || !fs) return null;
      const program = gl!.createProgram();
      if (!program) return null;
      gl!.attachShader(program, vs);
      gl!.attachShader(program, fs);
      gl!.bindAttribLocation(program, 0, "aPos");
      gl!.linkProgram(program);
      gl!.deleteShader(vs);
      gl!.deleteShader(fs);
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) { console.error(gl!.getProgramInfoLog(program)); return null; }
      const u: Record<string, WebGLUniformLocation | null> = {};
      const n = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) { const info = gl!.getActiveUniform(program, i); if (info) u[info.name] = gl!.getUniformLocation(program, info.name); }
      return { program, u };
    }

    let hdr = true;
    let texType: number = gl.UNSIGNED_BYTE;
    let internal: number = gl.RGBA;
    if (isGL2) {
      const g2 = gl as WebGL2RenderingContext;
      const ok = g2.getExtension("EXT_color_buffer_half_float") || g2.getExtension("EXT_color_buffer_float");
      if (ok) { texType = g2.HALF_FLOAT; internal = g2.RGBA16F; } else hdr = false;
    } else {
      const hf = gl.getExtension("OES_texture_half_float");
      const cb = gl.getExtension("EXT_color_buffer_half_float");
      if (hf && cb) texType = (hf as any).HALF_FLOAT_OES; else hdr = false;
    }
    if (!hdr) { texType = gl.UNSIGNED_BYTE; internal = gl.RGBA; }
    const linearOK = isGL2 || !!gl.getExtension("OES_texture_half_float_linear") || !hdr;
    const filter = linearOK ? gl.LINEAR : gl.NEAREST;
    const pack = hdr ? 1 : 0.12;

    function makeTarget(w: number, h: number): Target | null {
      const tex = gl!.createTexture();
      const fb = gl!.createFramebuffer();
      if (!tex || !fb) return null;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internal, w, h, 0, gl!.RGBA, texType, null);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fb);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
      const status = gl!.checkFramebufferStatus(gl!.FRAMEBUFFER);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      if (status !== gl!.FRAMEBUFFER_COMPLETE) { gl!.deleteTexture(tex); gl!.deleteFramebuffer(fb); return null; }
      return { fb, tex, w, h };
    }

    let sceneProg: Prog | null = null, blendProg: Prog | null = null, brightProg: Prog | null = null, blurProg: Prog | null = null, compProg: Prog | null = null;
    let vbo: WebGLBuffer | null = null;
    let scene: Target | null = null, histA: Target | null = null, histB: Target | null = null, bloomA: Target | null = null, bloomB: Target | null = null;
    let settled = 0, width = 0, height = 0, sceneW = 0, sceneH = 0;

    function build(): boolean {
      sceneProg = link(SCENE_FRAG); blendProg = link(BLEND_FRAG); brightProg = link(BRIGHT_FRAG); blurProg = link(BLUR_FRAG); compProg = link(COMPOSITE_FRAG);
      if (!sceneProg || !blendProg || !brightProg || !blurProg || !compProg) return false;
      vbo = gl!.createBuffer();
      gl!.bindBuffer(gl!.ARRAY_BUFFER, vbo);
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl!.STATIC_DRAW);
      gl!.enableVertexAttribArray(0);
      gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
      gl!.disable(gl!.DEPTH_TEST);
      gl!.disable(gl!.BLEND);
      return true;
    }

    function dropTargets() {
      for (const t of [scene, histA, histB, bloomA, bloomB]) { if (!t) continue; gl!.deleteTexture(t.tex); gl!.deleteFramebuffer(t.fb); }
      scene = histA = histB = bloomA = bloomB = null;
    }

    function syncSize(): boolean {
      const p = props.current;
      const rect = host!.getBoundingClientRect();
      const dpr = reduced ? 1 : Math.min(window.devicePixelRatio || 1, p.maxDpr);
      const cw = Math.max(1, Math.floor(rect.width * dpr));
      const ch = Math.max(1, Math.floor(rect.height * dpr));
      let sw = Math.max(1, Math.floor(cw * p.resolution));
      let sh = Math.max(1, Math.floor(ch * p.resolution));
      if (software) { sw = Math.min(sw, 512); sh = Math.min(sh, 512); }
      if (cw === width && ch === height && sw === sceneW && sh === sceneH) return true;
      width = cw; height = ch; sceneW = sw; sceneH = sh;
      canvas!.width = width; canvas!.height = height;
      dropTargets();
      scene = makeTarget(sceneW, sceneH);
      histA = makeTarget(sceneW, sceneH);
      histB = makeTarget(sceneW, sceneH);
      const bw = Math.max(1, Math.floor(width / 4));
      const bh = Math.max(1, Math.floor(height / 4));
      bloomA = makeTarget(bw, bh);
      bloomB = makeTarget(bw, bh);
      settled = 0;
      return !!(scene && histA && histB && bloomA && bloomB);
    }

    if (!build()) { giveUp("shader_error"); return; }
    host.dataset.webgl = "ok";

    let animId = 0, lastTime = 0, timePhase = 0, camPhase = 0;
    let flip = false;

    function render(now: number) {
      animId = requestAnimationFrame(render);
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;
      const p = props.current;
      if (p.paused) return;
      if (!syncSize()) return;

      const rate = reduced ? 0 : 1;
      timePhase += (dt * 0.001 * rate);
      camPhase += (dt * 0.001 * p.orbitSpeed * rate);
      const dist = p.distance;
      const el = p.elevation * RAD;
      const az = (p.azimuth + camPhase) * RAD;
      const camY = Math.sin(el) * dist;
      const xz = Math.cos(el) * dist;
      const camX = Math.sin(az) * xz;
      const camZ = Math.cos(az) * xz;
      const camPos = [camX, camY, camZ];
      const r = p.roll * RAD;
      const fwd = [-camX, -camY, -camZ];
      const len = Math.hypot(fwd[0], fwd[1], fwd[2]);
      fwd[0] /= len; fwd[1] /= len; fwd[2] /= len;
      const ref = [Math.sin(r), Math.cos(r), 0];
      const right = [
        fwd[1] * ref[2] - fwd[2] * ref[1],
        fwd[2] * ref[0] - fwd[0] * ref[2],
        fwd[0] * ref[1] - fwd[1] * ref[0],
      ];
      const rlen = Math.hypot(right[0], right[1], right[2]);
      right[0] /= rlen; right[1] /= rlen; right[2] /= rlen;
      const up = [
        right[1] * fwd[2] - right[2] * fwd[1],
        right[2] * fwd[0] - right[0] * fwd[2],
        right[0] * fwd[1] - right[1] * fwd[0],
      ];
      const tanHalf = Math.tan(p.fov * 0.5 * RAD);

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, scene!.fb);
      gl!.viewport(0, 0, sceneW, sceneH);
      gl!.useProgram(sceneProg!.program);
      const su = sceneProg!.u;
      gl!.uniform2f(su.uRes, sceneW, sceneH);
      gl!.uniform1f(su.uTime, timePhase);
      gl!.uniform3f(su.uCamPos, camPos[0], camPos[1], camPos[2]);
      gl!.uniform3f(su.uRight, right[0], right[1], right[2]);
      gl!.uniform3f(su.uUp, up[0], up[1], up[2]);
      gl!.uniform3f(su.uFwd, fwd[0], fwd[1], fwd[2]);
      gl!.uniform1f(su.uTanHalf, tanHalf);
      gl!.uniform2f(su.uFocus, p.focus[0], p.focus[1]);
      gl!.uniform1f(su.uSteps, p.steps * (reduced ? 0.3 : 1));
      gl!.uniform1f(su.uSkyR, Math.max(dist * 1.5, p.diskOuter * 1.5));
      gl!.uniform1f(su.uDiskIn, p.diskInner);
      gl!.uniform1f(su.uDiskOut, p.diskOuter);
      gl!.uniform1f(su.uThick, p.diskThickness);
      gl!.uniform1f(su.uDensity, p.diskDensity);
      gl!.uniform1f(su.uSpin, p.spinSpeed);
      gl!.uniform1f(su.uGrain, p.grain);
      gl!.uniform1f(su.uBright, p.brightness);
      gl!.uniform1f(su.uDoppler, p.doppler);
      gl!.uniform3fv(su.uHot, hexToLinear(p.hotColor));
      gl!.uniform3fv(su.uMid, hexToLinear(p.midColor));
      gl!.uniform3fv(su.uCool, hexToLinear(p.coolColor));
      gl!.uniform1f(su.uStars, p.starBrightness);
      gl!.uniform1f(su.uEncode, hdr ? 0 : 1);
      const sx = (Math.random() - 0.5) * 1.5, sy = (Math.random() - 0.5) * 1.5;
      gl!.uniform2f(su.uJitter, sx, sy);
      gl!.uniform1f(su.uSeed, Math.random() * 999);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      const cur = flip ? histA : histB;
      const prev = flip ? histB : histA;
      flip = !flip;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, cur!.fb);
      gl!.viewport(0, 0, sceneW, sceneH);
      gl!.useProgram(blendProg!.program);
      gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, scene!.tex); gl!.uniform1i(blendProg!.u.uCur, 0);
      gl!.activeTexture(gl!.TEXTURE1); gl!.bindTexture(gl!.TEXTURE_2D, prev!.tex); gl!.uniform1i(blendProg!.u.uPrev, 1);
      settled = Math.min(settled + 1, 30);
      const alpha = reduced ? 0.0 : (settled < 4 ? 0.0 : 0.85);
      gl!.uniform1f(blendProg!.u.uAlpha, alpha);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, bloomA!.fb);
      gl!.viewport(0, 0, bloomA!.w, bloomA!.h);
      gl!.useProgram(brightProg!.program);
      gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, cur!.tex); gl!.uniform1i(brightProg!.u.uTex, 0);
      gl!.uniform2f(brightProg!.u.uTexel, 1 / sceneW, 1 / sceneH);
      gl!.uniform1f(brightProg!.u.uDecode, hdr ? 0 : 1);
      gl!.uniform1f(brightProg!.u.uPack, pack);
      gl!.uniform1f(brightProg!.u.uThreshold, 1.0);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      let bSrc = bloomA, bDst = bloomB;
      gl!.useProgram(blurProg!.program);
      const passes = 3;
      for (let i = 0; i < passes; i++) {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, bDst!.fb);
        gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, bSrc!.tex); gl!.uniform1i(blurProg!.u.uTex, 0);
        gl!.uniform2f(blurProg!.u.uStep, (1.5 + i) / bSrc!.w, 0);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
        const tmp = bSrc; bSrc = bDst; bDst = tmp;
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, bDst!.fb);
        gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, bSrc!.tex);
        gl!.uniform2f(blurProg!.u.uStep, 0, (1.5 + i) / bSrc!.h);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
        const tmp2 = bSrc; bSrc = bDst; bDst = tmp2;
      }

      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      gl!.viewport(0, 0, width, height);
      gl!.useProgram(compProg!.program);
      gl!.activeTexture(gl!.TEXTURE0); gl!.bindTexture(gl!.TEXTURE_2D, cur!.tex); gl!.uniform1i(compProg!.u.uScene, 0);
      gl!.activeTexture(gl!.TEXTURE1); gl!.bindTexture(gl!.TEXTURE_2D, bSrc!.tex); gl!.uniform1i(compProg!.u.uBloom, 1);
      gl!.uniform2f(compProg!.u.uRes, width, height);
      gl!.uniform1f(compProg!.u.uDecode, hdr ? 0 : 1);
      gl!.uniform1f(compProg!.u.uPack, pack);
      gl!.uniform1f(compProg!.u.uGlow, p.glow);
      gl!.uniform1f(compProg!.u.uExposure, p.exposure);
      gl!.uniform1f(compProg!.u.uVignette, p.vignette);
      const sMap = { none: 0, left: 1, right: 2, top: 3, bottom: 4 };
      gl!.uniform1f(compProg!.u.uScrimDir, sMap[p.scrim as keyof typeof sMap] || 0);
      gl!.uniform1f(compProg!.u.uScrimAmt, p.scrimStrength);
      gl!.uniform1f(compProg!.u.uSeed, Math.random() * 999);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }
    
    lastTime = performance.now();
    animId = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animId); dropTargets(); gl!.deleteBuffer(vbo); };
  }, []);

  return (
    <div ref={hostRef} className={`relative w-full h-full bg-black overflow-hidden ${className}`} {...rest}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      <div className="absolute inset-0 pointer-events-none">{children}</div>
    </div>
  );
}
