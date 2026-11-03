import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { readToken } from "@/lib/tokens.js";
import { REDUCE } from "@/hooks/useGsap.js";

const LITE = "(max-width: 767px), (pointer: coarse)";
const RENDER_SCALE = 0.5;
const FADE_SECONDS = 1.2;
const MORPH_SECONDS = 0.8;
/* Brightest the river may get (relative luminance): full neon, just under the
   brand green. Text stays readable through its dark letter outline in index.css. */
const LUMINANCE_CAP = 0.45;
/* Pages whose path is mirrored left-to-right, so the river enters from the
   other side (Home starts top right). */
const MIRRORED = new Set(["/"]);

const VERT = `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform vec2 uView;
uniform float uScroll;
uniform float uTime;
uniform vec2 uSeed;
uniform vec2 uMirror;
uniform float uMorph;
uniform float uFade;
uniform vec3 uDeep;
uniform vec3 uGreen;
uniform vec3 uMint;
uniform vec3 uWhite;
uniform float uCap;

out vec4 outColor;

const float UNIT = 900.0;
const float PI = 3.14159265;
const vec3 GROUND = vec3(0.0392, 0.0392, 0.0431);

float lumOf(vec3 c) {
  vec3 l = pow(max(c, 0.0), vec3(2.2));
  return dot(l, vec3(0.2126, 0.7152, 0.0722));
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return v;
}

float h1(float x) {
  return fract(sin(x * 127.1) * 43758.5453);
}

// Each page's path has its own swing, number of bends, entry side and
// curve sharpness, all derived from the route seed.
float wind(float s, float seed, float mirror) {
  float a1 = 0.16 + 0.16 * h1(seed + 1.0);
  float f1 = 0.7 + 0.8 * h1(seed + 2.0);
  float a2 = 0.05 + 0.08 * h1(seed + 3.0);
  float f2 = 1.8 + 1.4 * h1(seed + 4.0);
  float side = (h1(seed + 5.0) - 0.5) * 0.3;
  float bend = 0.55 + 0.6 * h1(seed + 6.0);
  float swing = sin(s * f1 + seed * 3.0);
  swing = sign(swing) * pow(abs(swing), bend);
  float c = 0.5 + side + a1 * swing + a2 * sin(s * f2 + seed * 5.0 + 1.7) + 0.03 * sin(s * 4.1 - seed);
  c = clamp(c, 0.08, 0.92);
  return mix(c, 1.0 - c, mirror);
}

float centre(float s) {
  return mix(wind(s, uSeed.x, uMirror.x), wind(s, uSeed.y, uMirror.y), uMorph);
}

// Thickness along the page: from about half to 1.6x the base width.
float girth(float s, float seed) {
  float f = 0.6 + 0.5 * h1(seed + 7.0);
  float v = 0.5 + 0.5 * sin(s * f + seed * 2.0) + 0.25 * sin(s * 1.7 + seed * 4.0);
  return mix(0.5, 1.6, smoothstep(-0.2, 1.2, v));
}

// Each strand keeps one shade, from white through mint to the accent green,
// weighted toward green.
vec3 shade(float id, float layer) {
  float h = pow(hash(vec2(id * 7.13 + layer * 31.7, layer * 3.1 + 2.0)), 0.75);
  return h < 0.5 ? mix(uWhite, uMint, h * 2.0) : mix(uMint, uGreen, (h - 0.5) * 2.0);
}

// One layer of neon strands: lanes across the river, pulses racing down them.
// Returns premultiplied light (rgb) and its coverage (a).
vec4 strands(float d, float s, float warp, float k, float wob, float sharp, float freq, float speed, float layer) {
  float t = d * k + warp * wob + layer * 0.37;
  float lane = 1.0 - abs(sin(t * PI));
  float id = floor(t + 0.5);
  float pulse = 0.3 + 0.7 * smoothstep(0.4, 0.82, fbm(vec2(id * 1.7 + layer * 11.0, s * freq - uTime * speed)));
  float core = pow(lane, sharp) * pulse;
  float glow = pow(lane, sharp * 0.2) * pulse * 0.18;
  float a = core * 2.2 + glow;
  return vec4(shade(id, layer) * a, a);
}

void main() {
  vec2 frag = gl_FragCoord.xy / uRes * uView;
  float x = frag.x;
  float y = uScroll + (uView.y - frag.y);
  float s = y / UNIT;
  float w = uView.x;

  float e = 0.02;
  float c = centre(s) * w;
  float slope = (centre(s + e) - centre(s - e)) * w / (2.0 * e * UNIT);

  float width = max(w * 0.15, 170.0) * mix(girth(s, uSeed.x), girth(s, uSeed.y), uMorph);
  float d = (x - c) / sqrt(1.0 + slope * slope) / width;

  // Broad currents, about 400px/s down the page.
  vec2 q = vec2(d * 1.0, s * 1.6 - uTime * 0.72);
  float warp = fbm(q * 0.7 + vec2(uTime * 0.22, 0.0));
  float n = smoothstep(0.22, 0.78, fbm(q + vec2(warp * 1.4, warp * 0.5)));

  float body = exp(-d * d * 4.0);
  float bundle = exp(-d * d * 4.5);
  float bloom = exp(-abs(d) * 1.8);

  // Three layers of strands bundled toward the river's middle, racing at 375-450px/s.
  vec4 l1 = strands(d, s, warp, 9.0, 1.1, 12.0, 4.0, 1.8, 1.0);
  vec4 l2 = strands(d, s, warp, 14.0, 1.6, 16.0, 5.0, 2.5, 2.0);
  vec4 l3 = strands(d, s, warp, 5.0, 0.8, 8.0, 2.6, 1.15, 3.0);
  vec4 light = (l1 + l2 * 0.85 + l3) * bundle;

  // A thin dark-green current underneath, kept faint so the strands sit
  // straight on the page instead of behind a haze.
  float baseA = body * (0.1 + 0.6 * n) * 0.15 + bloom * 0.04;
  vec3 rgb = uDeep * baseA + light.rgb;
  float a = baseA + light.a;
  vec3 col = a > 0.0 ? rgb / a : uDeep;
  a = min(a * uFade, 1.0);

  // Luminance ceiling; a near-hard knee leaves strand cores at full strength
  // until they meet the cap.
  float lg = lumOf(GROUND);
  float room = uCap - lg;
  for (int i = 0; i < 4; i++) {
    float lc = lumOf(col * a + GROUND * (1.0 - a)) - lg;
    float r = lc / room;
    float target = room * r / pow(1.0 + pow(r, 8.0), 0.125);
    if (lc > target + 1e-6) a *= pow(target / lc, 1.0 / 2.2);
  }

  float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  a = clamp(a + dither, 0.0, 1.0);
  outColor = vec4(col * a, a);
}`;

function hexToRgb(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((ch) => ch + ch).join("");
  const n = parseInt(h, 16) || 0;
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/* Each route gets its own winding path, stable across visits. */
function seedFor(path) {
  let h = 7;
  for (const ch of path) h = (h * 31 + ch.charCodeAt(0)) | 0;
  return ((Math.abs(h) % 1000) / 1000) * Math.PI * 2;
}

const mirrorFor = (path) => (MIRRORED.has(path) ? 1 : 0);

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/* The site's living background: one fixed canvas behind every page, drawing a
   river of light whose path is set in page coordinates, so it winds from
   section to section as you scroll. A bundle of neon strands, white through
   mint to green, races down it; under reduced motion it is drawn still and
   only follows the scroll. */
function LightRiver() {
  const { pathname } = useLocation();
  const canvasRef = useRef(null);
  const routeRef = useRef(pathname);
  const wakeRef = useRef(() => {});
  const [generation, setGeneration] = useState(0);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    routeRef.current = pathname;
    wakeRef.current();
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      setFallback(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs) {
      setFallback(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    const u = {};
    for (const name of [
      "uRes", "uView", "uScroll", "uTime", "uSeed", "uMirror", "uMorph", "uFade",
      "uDeep", "uGreen", "uMint", "uWhite", "uCap",
    ]) {
      u[name] = gl.getUniformLocation(program, name);
    }
    gl.uniform3fv(u.uDeep, hexToRgb(readToken("brand-deep")));
    gl.uniform3fv(u.uGreen, hexToRgb(readToken("brand")));
    gl.uniform3fv(u.uMint, hexToRgb(readToken("brand-hover")));
    gl.uniform3fv(u.uWhite, hexToRgb(readToken("ink")));
    gl.uniform1f(u.uCap, LUMINANCE_CAP);

    const reduceMq = window.matchMedia(REDUCE);
    const liteMq = window.matchMedia(LITE);
    const first = routeRef.current;
    const state = {
      time: 0,
      fade: reduceMq.matches ? 1 : 0,
      drawn: false,
      route: first,
      seedFrom: seedFor(first),
      seedTo: seedFor(first),
      mirrorFrom: mirrorFor(first),
      mirrorTo: mirrorFor(first),
      morph: 1,
      view: [1, 1],
      last: 0,
      raf: 0,
    };
    let lost = false;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2) * RENDER_SCALE;
      canvas.width = Math.max(1, Math.round(w * ratio));
      canvas.height = Math.max(1, Math.round(h * ratio));
      state.view = [w, h];
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const frame = (now) => {
      state.raf = 0;
      if (lost) return;
      const reduce = reduceMq.matches;
      const dt = state.last ? Math.min((now - state.last) / 1000, 0.05) : 0;
      state.last = now;

      if (routeRef.current !== state.route) {
        state.route = routeRef.current;
        state.seedFrom = state.seedTo;
        state.mirrorFrom = state.mirrorTo;
        state.seedTo = seedFor(state.route);
        state.mirrorTo = mirrorFor(state.route);
        state.morph = reduce ? 1 : 0;
      }
      if (state.morph < 1) state.morph = Math.min(1, state.morph + dt / MORPH_SECONDS);
      if (!reduce) state.time += dt * (liteMq.matches ? 0.7 : 1);
      if (reduce) state.fade = 1;
      else if (state.drawn && state.fade < 1) state.fade = Math.min(1, state.fade + dt / FADE_SECONDS);

      const m = state.morph * state.morph * (3 - 2 * state.morph);
      const f = 1 - Math.pow(1 - state.fade, 3);
      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniform2f(u.uView, state.view[0], state.view[1]);
      gl.uniform1f(u.uScroll, window.scrollY);
      gl.uniform1f(u.uTime, state.time);
      gl.uniform2f(u.uSeed, state.seedFrom, state.seedTo);
      gl.uniform2f(u.uMirror, state.mirrorFrom, state.mirrorTo);
      gl.uniform1f(u.uMorph, m);
      gl.uniform1f(u.uFade, f);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      state.drawn = true;

      const busy = !reduce || state.fade < 1 || state.morph < 1;
      if (busy && !document.hidden) state.raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (!state.raf && !lost && !document.hidden) state.raf = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    const onResize = () => {
      resize();
      wake();
    };
    const onVisibility = () => {
      state.last = 0;
      wake();
    };
    const onLost = (e) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(state.raf);
      state.raf = 0;
    };
    const onRestored = () => setGeneration((g) => g + 1);

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", wake, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduceMq.addEventListener("change", wake);
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    resize();
    wake();

    return () => {
      cancelAnimationFrame(state.raf);
      wakeRef.current = () => {};
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", wake);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMq.removeEventListener("change", wake);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (!lost) {
        gl.deleteVertexArray(vao);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, [generation]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {fallback ? <div className="fx-river absolute inset-0" /> : <canvas ref={canvasRef} className="block size-full" />}
    </div>
  );
}

export default LightRiver;
