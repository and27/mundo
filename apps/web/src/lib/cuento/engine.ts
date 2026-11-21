// Motor de escena: arma el DOM de una escena y la dibuja en el tiempo `t` (segundos).
// Es determinista: render(t) siempre produce el mismo cuadro, así sirve igual para
// reproducir en el celular que para grabar un MP4 cuadro a cuadro.

import type { Cue, Effect, Point, Scene } from "./types";

const DEFAULT_GAP = 0.3;
const WORD_SPREAD = 0.72; // las palabras aparecen durante el 72% de la frase
const INK = "#4a3324";

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const ramp = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const mix = (a: number, b: number, k: number) => a + (b - a) * k;

function rng(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- texto ----------
interface Word {
  w: string;
  snd: boolean;
}
export function splitWords(text: string): Word[] {
  const out: Word[] = [];
  let snd = false;
  text.split(/(\*)/).forEach((seg) => {
    if (seg === "*") {
      snd = !snd;
      return;
    }
    seg.split(/\s+/).forEach((w) => {
      if (w.trim()) out.push({ w, snd });
    });
  });
  return out;
}

// ---------- línea de tiempo ----------
export interface Timeline {
  start: number[];
  end: number[];
  words: Word[][];
  duration: number;
  cue: (c?: Cue) => number;
  wordTime: (line: number, word: number) => number;
}

export function buildTimeline(scene: Scene): Timeline {
  const start: number[] = [];
  const end: number[] = [];
  const words = scene.lines.map((l) => splitWords(l.text));
  let t = scene.lead ?? 1;
  scene.lines.forEach((l, i) => {
    t += i === 0 ? (l.gap ?? 0) : (l.gap ?? DEFAULT_GAP);
    start.push(t);
    t += l.dur;
    end.push(t);
  });
  const duration = t + (scene.tail ?? 1.5);
  // Con voz: las palabras habladas se reparten según su largo durante la voz,
  // y las onomatopeyas (que son efectos, no voz) aparecen justo después.
  const voiced = words.map((ws, i) => {
    const v = scene.lines[i].voice;
    if (!v) return null;
    const spoken = ws.filter((w) => !w.snd);
    const total = spoken.reduce((a, w) => a + w.w.length + 1, 0) || 1;
    let acc = 0;
    let sndK = 0;
    return ws.map((w) => {
      if (w.snd) return v + 0.2 + 0.45 * sndK++;
      const at = (acc / total) * v * 0.92;
      acc += w.w.length + 1;
      return at;
    });
  });
  const wordTime = (line: number, word: number) => {
    const n = words[line]?.length ?? 1;
    const k = word < 0 ? n - 1 : Math.min(word, n - 1);
    const vt = voiced[line];
    if (vt) return start[line] + vt[k];
    return start[line] + scene.lines[line].dur * WORD_SPREAD * (k / Math.max(1, n));
  };
  const cue = (c?: Cue) => {
    if (!c) return Infinity;
    const base = c.word === undefined ? start[c.line] : wordTime(c.line, c.word);
    return base + (c.offset ?? 0);
  };
  return { start, end, words, duration, cue, wordTime };
}

// ---------- utilidades DOM ----------
const SVGNS = "http://www.w3.org/2000/svg";
function el<K extends keyof HTMLElementTagNameMap>(tag: K, style: Partial<CSSStyleDeclaration> = {}) {
  const e = document.createElement(tag);
  Object.assign(e.style, style);
  return e;
}
function svgEl(tag: string, attrs: Record<string, string | number> = {}) {
  const e = document.createElementNS(SVGNS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  return e;
}
let gradId = 0;
function radial(defs: SVGElement, stops: [number, string, number][]) {
  const id = `cg${++gradId}`;
  const g = svgEl("radialGradient", { id });
  stops.forEach(([o, c, a]) => g.appendChild(svgEl("stop", { offset: o, "stop-color": c, "stop-opacity": a })));
  defs.appendChild(g);
  return `url(#${id})`;
}

// ---------- renderer ----------
export interface SceneRenderer {
  timeline: Timeline;
  render: (t: number) => void;
  resize: (frameW: number, frameH: number) => void;
  destroy: () => void;
}

type Updater = (t: number) => void;

export function createSceneRenderer(host: HTMLElement, scene: Scene, frameW: number, frameH: number): SceneRenderer {
  const tl = buildTimeline(scene);
  const W = scene.width;
  const H = scene.height;
  let FW = frameW;
  let FH = frameH;

  const root = el("div", { position: "absolute", inset: "0", overflow: "hidden" });
  const cam = el("div", {
    position: "absolute",
    left: "0",
    top: "0",
    width: `${W}px`,
    height: `${H}px`,
    transformOrigin: "0 0",
    willChange: "transform",
  });
  root.appendChild(cam);
  const layer = (e: HTMLElement | SVGElement) => {
    const s = (e as HTMLElement).style;
    s.position = "absolute";
    s.left = "0";
    s.top = "0";
    cam.appendChild(e);
    return e;
  };

  const img = el("img", { width: `${W}px`, height: `${H}px`, display: "block" });
  img.src = scene.image;
  img.alt = scene.alt;
  img.decoding = "async";
  layer(img);

  const K = 1.5; // resolución de los canvas respecto a la imagen
  const mkCanvas = () => {
    const c = el("canvas", { width: `${W}px`, height: `${H}px`, pointerEvents: "none" });
    c.width = Math.round(W * K);
    c.height = Math.round(H * K);
    return c;
  };

  const updaters: Updater[] = [];
  const effects = scene.effects;
  const has = (type: Effect["type"]) => effects.some((e) => e.type === type);

  // Estrellas (detrás de todo lo demás)
  const skyCanvas = has("stars") ? (layer(mkCanvas()) as HTMLCanvasElement) : null;
  const sky = skyCanvas?.getContext("2d") ?? null;

  // Sprites y mariposas
  for (const fx of effects) {
    if (fx.type === "sprite") {
      const s = el("img", { width: `${fx.size[0]}px`, height: `${fx.size[1]}px`, opacity: "0" });
      s.src = fx.src;
      s.alt = "";
      layer(s);
      const t0 = tl.cue(fx.start);
      updaters.push((t) => {
        const k = ramp(t, t0, t0 + fx.dur);
        const x = mix(fx.from[0], fx.to[0], k);
        const y = mix(fx.from[1], fx.to[1], k) + 8 * Math.sin(t * 1.1);
        const bank = 6 * Math.sin(t * 0.8) - 4;
        s.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${bank.toFixed(1)}deg) scale(${mix(0.85, 1.1, k).toFixed(3)})`;
        s.style.opacity = k > 0 && k < 1 ? "1" : "0";
      });
    }
    if (fx.type === "butterfly") {
      const svg = svgEl("svg", { viewBox: "-35 -30 70 60", width: 70, height: 60, overflow: "visible" });
      const g = svgEl("g", { stroke: "#5e3f22", "stroke-width": 1.6, "stroke-linejoin": "round" });
      const wing = (side: 1 | -1) => {
        const w = svgEl("g");
        const sx = (n: number) => n * side;
        w.appendChild(svgEl("path", { d: `M${sx(-2)},-2 C${sx(-14)},-26 ${sx(-34)},-24 ${sx(-30)},-8 C${sx(-28)},0 ${sx(-14)},2 ${sx(-2)},0Z`, fill: "#efcd5c" }));
        w.appendChild(svgEl("path", { d: `M${sx(-2)},1 C${sx(-14)},4 ${sx(-24)},12 ${sx(-18)},20 C${sx(-12)},25 ${sx(-4)},14 ${sx(-2)},4Z`, fill: "#e8bd48" }));
        w.appendChild(svgEl("circle", { cx: sx(-19), cy: -11, r: 3, fill: "#7a5532", stroke: "none" }));
        return w;
      };
      const wl = wing(1);
      const wr = wing(-1);
      g.append(wl, wr);
      g.appendChild(svgEl("path", { d: "M0,-8 L0,14", "stroke-width": 3.2, "stroke-linecap": "round" }));
      g.appendChild(svgEl("path", { d: "M0,-8 C-3,-16 -7,-20 -9,-23 M0,-8 C3,-16 7,-20 9,-23", fill: "none", "stroke-width": 1.2 }));
      svg.appendChild(g);
      layer(svg);
      const leave = tl.cue(fx.leave);
      updaters.push((t) => {
        let x = fx.home[0] + 58 * Math.sin(t * 0.42) + 14 * Math.sin(t * 1.7);
        let y = fx.home[1] - 48 * Math.sin(t * 0.55 + 0.4) - 16 * Math.abs(Math.sin(t * 2.1));
        const away = ramp(t, leave, leave + 3);
        x -= away * away * 260;
        y -= away * away * 420;
        const f = 0.18 + 0.82 * Math.abs(Math.cos(t * Math.PI * 4.2));
        wl.setAttribute("transform", `scale(${f.toFixed(3)},1)`);
        wr.setAttribute("transform", `scale(${f.toFixed(3)},1)`);
        (svg as unknown as HTMLElement).style.transform = `translate(${(x - 35).toFixed(1)}px,${(y - 30).toFixed(1)}px) rotate(${(12 * Math.sin(t * 0.9)).toFixed(1)}deg) scale(0.92)`;
        (svg as unknown as HTMLElement).style.opacity = (ramp(t, 0.2, 0.8) * (1 - ramp(t, leave + 2.5, leave + 3.3))).toFixed(3);
      });
    }
  }

  // Oscurecer / atardecer: degradado desde arriba, la franja del texto queda clara.
  for (const fx of effects) {
    if (fx.type === "darken" || fx.type === "dusk") {
      const bg =
        fx.type === "dusk"
          ? "linear-gradient(to bottom,#1a2160 0%,#343884 26%,#7d5c9c 42%,#c99a9a 54%,#f1dccd 64%,#fff 72%,#fff 100%)"
          : "linear-gradient(to bottom,#20245a 0%,#2c3070 30%,#4d4f8e 52%,#a9a6cc 64%,#fff 72%,#fff 100%)";
      const d = el("div", { width: `${W}px`, height: `${H}px`, mixBlendMode: "multiply", opacity: "0", background: bg, pointerEvents: "none" });
      layer(d);
      const t0 = tl.cue(fx.at);
      const r = fx.ramp ?? 2;
      const amount = fx.type === "dusk" ? 0.82 : (fx.amount ?? 0.5);
      updaters.push((t) => {
        d.style.opacity = (amount * ease(ramp(t, t0, t0 + r))).toFixed(3);
      });
    }
  }

  // Rayos de luz (difuminados)
  const beams = effects.filter((e): e is Extract<Effect, { type: "beam" }> => e.type === "beam");
  if (beams.length) {
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H });
    (svg as unknown as HTMLElement).style.filter = "blur(18px)";
    (svg as unknown as HTMLElement).style.mixBlendMode = "screen";
    (svg as unknown as HTMLElement).style.pointerEvents = "none";
    const defs = svgEl("defs");
    svg.appendChild(defs);
    beams.forEach((b, i) => {
      const [ax, ay] = b.from;
      const [bx, by] = b.to;
      const len = Math.hypot(bx - ax, by - ay);
      const nx = -(by - ay) / len;
      const ny = (bx - ax) / len;
      const pts: Point[] = [
        [ax + nx * b.widthFrom, ay + ny * b.widthFrom],
        [ax - nx * b.widthFrom, ay - ny * b.widthFrom],
        [bx - nx * b.widthTo, by - ny * b.widthTo],
        [bx + nx * b.widthTo, by + ny * b.widthTo],
      ];
      const id = `cb${++gradId}`;
      const lg = svgEl("linearGradient", { id, gradientUnits: "userSpaceOnUse", x1: ax, y1: ay, x2: bx, y2: by });
      const c = b.color ?? "#bcd3ff";
      lg.appendChild(svgEl("stop", { offset: 0, "stop-color": c, "stop-opacity": 0.6 }));
      lg.appendChild(svgEl("stop", { offset: 0.6, "stop-color": c, "stop-opacity": 0.25 }));
      lg.appendChild(svgEl("stop", { offset: 1, "stop-color": c, "stop-opacity": 0 }));
      defs.appendChild(lg);
      const poly = svgEl("polygon", { points: pts.map((p) => p.join(",")).join(" "), fill: `url(#${id})` });
      svg.appendChild(poly);
      const boost = tl.cue(b.boost);
      updaters.push((t) => {
        const shimmer = 0.06 * Math.sin(t * 1.3 + i) + 0.04 * Math.sin(t * 2.9 + 1);
        poly.setAttribute("opacity", clamp(0.4 + 0.45 * ramp(t, boost, boost + 1.6) + shimmer).toFixed(3));
      });
    });
    layer(svg);
  }

  // Resplandores (sol, cueva, vela) y elementos encima de la imagen
  const glowSvg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H });
  (glowSvg as unknown as HTMLElement).style.pointerEvents = "none";
  const gdefs = svgEl("defs");
  glowSvg.appendChild(gdefs);
  const fxSvg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, width: W, height: H });
  (fxSvg as unknown as HTMLElement).style.pointerEvents = "none";
  const fdefs = svgEl("defs");
  fxSvg.appendChild(fdefs);
  let glowUsed = false;
  let fxUsed = false;

  for (const fx of effects) {
    if (fx.type === "sun") {
      glowUsed = true;
      const fill = radial(gdefs, [
        [0, "#fff6cf", 0.9],
        [0.4, "#ffe7a0", 0.35],
        [1, "#ffe2a0", 0],
      ]);
      const e = svgEl("ellipse", { cx: fx.at[0], cy: fx.at[1], rx: fx.radius[0], ry: fx.radius[1], fill, style: "mix-blend-mode:screen" });
      glowSvg.appendChild(e);
      const until = tl.cue(fx.until);
      updaters.push((t) => e.setAttribute("opacity", ((0.75 + 0.1 * Math.sin(t * 0.8)) * (1 - ramp(t, until, until + 2.5))).toFixed(3)));
    }
    if (fx.type === "glow") {
      glowUsed = true;
      const c = fx.color ?? "#ffc066";
      const fill = radial(gdefs, [
        [0, c, 0.95],
        [0.45, "#ff9a3c", 0.4],
        [1, "#ff8a2a", 0],
      ]);
      const e = svgEl("ellipse", { cx: fx.at[0], cy: fx.at[1], rx: fx.radius[0], ry: fx.radius[1], fill, style: "mix-blend-mode:screen", opacity: 0 });
      glowSvg.appendChild(e);
      const p = tl.cue(fx.pulse);
      const on = tl.cue(fx.on);
      updaters.push((t) => {
        const warm = 0.55 * Math.sin(Math.PI * ramp(t, p - 0.4, p + 2.2));
        const flick = 0.9 + 0.07 * Math.sin(t * 9) + 0.03 * Math.sin(t * 21);
        e.setAttribute("opacity", (Math.max(warm, 0.95 * ramp(t, on, on + 2.5)) * flick).toFixed(3));
      });
    }
    if (fx.type === "candle") {
      glowUsed = true;
      fxUsed = true;
      const fill = radial(gdefs, [
        [0, "#ffcf7a", 0.75],
        [0.35, "#ff9d3c", 0.25],
        [1, "#ff8a2a", 0],
      ]);
      const g = svgEl("ellipse", { cx: fx.flame[0], cy: fx.flame[1], rx: 200, ry: 180, fill, style: "mix-blend-mode:screen" });
      glowSvg.appendChild(g);
      const coverFill = radial(fdefs, [
        [0, fx.cover, 1],
        [0.65, fx.cover, 0.95],
        [1, fx.cover, 0],
      ]);
      const cover = svgEl("ellipse", { cx: fx.flame[0], cy: fx.flame[1] - 1, rx: 10, ry: 16, fill: coverFill, opacity: 0 });
      const wick = svgEl("rect", { x: fx.flame[0] - 1, y: fx.flame[1] + 6, width: 2, height: 5, rx: 1, fill: "#3b2a1c", opacity: 0 });
      fxSvg.append(cover, wick);
      const out = tl.cue(fx.out);
      updaters.push((t) => {
        const on = 1 - ramp(t, out, out + 0.35);
        const flick = 0.85 + 0.1 * Math.sin(t * 11) + 0.05 * Math.sin(t * 23 + 2);
        g.setAttribute("opacity", (0.9 * flick * on).toFixed(3));
        cover.setAttribute("opacity", (1 - on).toFixed(3));
        wick.setAttribute("opacity", (1 - on).toFixed(3));
      });
    }
    if (fx.type === "creep") {
      fxUsed = true;
      const fill = radial(fdefs, [
        [0, "#1b1840", 0.85],
        [1, "#1b1840", 0],
      ]);
      const e = svgEl("ellipse", { cx: fx.at[0], cy: fx.at[1], rx: fx.radius[0], ry: fx.radius[1], fill, opacity: 0 });
      fxSvg.appendChild(e);
      const s0 = tl.cue(fx.start);
      updaters.push((t) => {
        const m = ramp(t, s0, s0 + 1.2);
        e.setAttribute("opacity", (0.45 * m).toFixed(3));
        e.setAttribute("cx", (fx.at[0] + 16 * Math.sin((t - s0) * 1.6) * m).toFixed(1));
      });
    }
  }
  if (fxUsed) layer(fxSvg);
  if (glowUsed) layer(glowSvg);

  // Partículas: polvo en los rayos + polen
  const pollens = effects.filter((e): e is Extract<Effect, { type: "pollen" }> => e.type === "pollen");
  const partCanvas = beams.length || pollens.length ? (layer(mkCanvas()) as HTMLCanvasElement) : null;
  const pc = partCanvas?.getContext("2d") ?? null;
  const r = rng(7);
  const beamParts = beams.map((b) =>
    Array.from({ length: b.count ?? 200 }, () => ({
      u: r(),
      v: r() * 2 - 1,
      sp: 0.006 + r() * 0.014,
      ph: r() * 6.28,
      f: 0.4 + r() * 1.2,
      sz: r() < 0.12 ? 3.2 + r() * 3.5 : 0.8 + r() * 1.9,
      tw: 2 + r() * 5,
      k: r(),
    })),
  );
  const pollenParts = pollens.map((p) =>
    Array.from({ length: p.count ?? 80 }, () => ({
      x: p.area[0] + r() * p.area[2],
      y: r() * p.area[3],
      vx: 6 + r() * 14,
      vy: -(3 + r() * 9),
      ph: r() * 6.3,
      sz: 1.2 + r() * 2.6,
      tw: 1 + r() * 3,
    })),
  );
  const dot = (ctx: CanvasRenderingContext2D, x: number, y: number, R: number, rgb: string, a: number) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, R);
    g.addColorStop(0, `rgba(${rgb},${a})`);
    g.addColorStop(0.4, `rgba(${rgb},${a * 0.45})`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, R, 0, 6.2832);
    ctx.fill();
  };
  if (pc) {
    updaters.push((t) => {
      pc.setTransform(K, 0, 0, K, 0, 0);
      pc.clearRect(0, 0, W, H);
      pc.globalCompositeOperation = "lighter";
      const fadeIn = ramp(t, 0.3, 2.2);
      beams.forEach((b, i) => {
        const [ax, ay] = b.from;
        const AX = b.to[0] - ax;
        const AY = b.to[1] - ay;
        const len = Math.hypot(AX, AY);
        const NX = -AY / len;
        const NY = AX / len;
        const boost = tl.cue(b.boost);
        const g0 = tl.cue(b.gust);
        const beamI = 0.6 + 0.4 * ramp(t, boost, boost + 1.6);
        const gust = Math.sin(Math.PI * clamp((t - g0) / 3.2));
        for (const q of beamParts[i]) {
          const drift = q.sp * t * (1 + 0.9 * gust) + gust * 0.012 * q.k * Math.sin(t * 1.7 + q.ph);
          let u = (q.u + drift) % 1;
          if (u < 0) u += 1;
          const wob = 0.1 * Math.sin(t * q.f * 0.6 + q.ph) + 0.05 * Math.sin(t * q.f * 1.3 + q.ph * 2) + gust * 0.08 * Math.sin(t * 2.3 + q.ph);
          const v = clamp(q.v + wob, -1.2, 1.2);
          const half = mix(b.widthFrom, b.widthTo, u);
          const x = ax + AX * u + NX * v * half;
          const y = ay + AY * u + NY * v * half;
          const edge = Math.max(0, 1 - v * v);
          const ends = clamp(u / 0.08) * clamp((1 - u) / 0.25);
          const tw = 0.55 + 0.45 * Math.sin(t * q.tw + q.ph);
          const a = fadeIn * beamI * edge * ends * tw * (q.sz > 3 ? 0.3 : 1) * (1 - 0.45 * u);
          if (a < 0.01) continue;
          dot(pc, x, y, q.sz * (q.sz > 3 ? 2.2 : 1.6), "235,240,255", a);
        }
      });
      pollens.forEach((p, i) => {
        const until = tl.cue(p.until);
        const day = 1 - ramp(t, until, until + 1.6);
        if (day <= 0.01) return;
        const [ax0, ay0, aw, ah] = p.area;
        for (const q of pollenParts[i]) {
          const x = ((q.x + q.vx * t + 10 * Math.sin(t * 0.7 + q.ph)) % (aw + 32)) - 16 + ax0;
          let y = q.y + q.vy * t + 8 * Math.sin(t * 1.1 + q.ph);
          y = ((y % ah) + ah) % ah;
          const edgeFade = clamp(y / 50) * clamp((ah - y) / 50);
          const a = fadeIn * day * (0.35 + 0.35 * Math.sin(t * q.tw + q.ph)) * edgeFade;
          if (a < 0.02) continue;
          dot(pc, x, y + ay0, q.sz * 2.2, "255,246,210", a);
        }
      });
    });
  }

  // Estrellas
  const starsFx = effects.filter((e): e is Extract<Effect, { type: "stars" }> => e.type === "stars");
  if (sky) {
    const stars = starsFx.map((s) =>
      Array.from({ length: s.count ?? 40 }, () => ({
        x: s.area[0] + r() * s.area[2],
        y: s.area[1] + r() * s.area[3],
        sz: 0.8 + r() * 1.8,
        ph: r() * 6.3,
        tw: 1.5 + r() * 3,
        d: r() * 1.5,
      })),
    );
    updaters.push((t) => {
      sky.setTransform(K, 0, 0, K, 0, 0);
      sky.clearRect(0, 0, W, H);
      starsFx.forEach((s, i) => {
        const t0 = tl.cue(s.at);
        if (t < t0) return;
        for (const q of stars[i]) {
          const a = ramp(t, t0 + q.d, t0 + 1.2 + q.d) * (0.55 + 0.45 * Math.sin(t * q.tw + q.ph));
          dot(sky, q.x, q.y, q.sz * 3, "255,250,230", a);
        }
      });
    });
  }

  // Texto: palabra por palabra, en tinta sobre el papel
  const txt = el("div", { position: "absolute", left: "92px", right: "92px", bottom: "190px", minHeight: "380px", display: "flex", alignItems: "flex-end", pointerEvents: "none" });
  const lineEl = el("div", {
    fontFamily: "var(--font-fraunces), Georgia, serif",
    fontSize: "70px",
    lineHeight: "1.27",
    fontWeight: "400",
    color: INK,
    fontVariationSettings: '"opsz" 72',
  });
  txt.appendChild(lineEl);
  root.appendChild(txt);
  let shown = -2;
  let spans: HTMLSpanElement[] = [];
  const punches = effects.filter((e): e is Extract<Effect, { type: "punch" }> => e.type === "punch").map((p) => tl.cue(p.at));
  const setLine = (i: number) => {
    if (i === shown) return;
    shown = i;
    lineEl.textContent = "";
    spans = [];
    if (i < 0) return;
    tl.words[i].forEach((p, k) => {
      const s = document.createElement("span");
      s.style.display = "inline-block";
      if (p.snd) {
        s.style.fontStyle = "italic";
        s.style.fontWeight = "500";
        s.style.color = "#b4592a";
        s.style.transformOrigin = "20% 80%";
      }
      s.textContent = p.w;
      s.dataset.snd = p.snd ? "1" : "";
      lineEl.appendChild(s);
      spans.push(s);
      if (k < tl.words[i].length - 1) lineEl.appendChild(document.createTextNode(" "));
    });
  };
  updaters.push((t) => {
    const i = scene.lines.findIndex((_, k) => t >= tl.start[k] - 0.05 && t < tl.end[k] + 0.6);
    setLine(i);
    if (i < 0) return;
    const n = spans.length;
    const out = 1 - ramp(t, tl.end[i], tl.end[i] + 0.55);
    spans.forEach((s, k) => {
      const st = tl.wordTime(i, k);
      const a = easeOut(ramp(t, st, st + 0.55));
      let sc = 1;
      if (s.dataset.snd) {
        for (const p of punches) {
          const g = ramp(t, p - 0.1, p + 0.5);
          sc = Math.max(sc, 1 + 0.35 * Math.sin(Math.PI * g) * (1 - g));
        }
      }
      void n;
      s.style.opacity = (a * out).toFixed(3);
      s.style.transform = `translateY(${((1 - a) * 14).toFixed(2)}px) scale(${sc.toFixed(3)})`;
      s.style.filter = a < 1 ? `blur(${((1 - a) * 6).toFixed(2)}px)` : "none";
    });
  });

  // Cámara
  const renderCam = (t: number) => {
    const p = ease(clamp(t / tl.duration));
    const s0 = Math.max(FW / W, FH / H);
    let punch = 0;
    let shake = 0;
    for (const pt of punches) {
      const g = ramp(t, pt, pt + 0.9);
      punch += 0.022 * Math.sin(Math.PI * Math.min(1, g * 3)) * (1 - g);
      if (t > pt && t < pt + 0.45) shake += 3 * Math.sin(t * 90) * (1 - ramp(t, pt, pt + 0.45));
    }
    const s = s0 * (mix(scene.camera.zoom[0], scene.camera.zoom[1], p) + punch);
    const [fx0, fy] = scene.camera.focal;
    const pan = scene.camera.panX ? mix(scene.camera.panX[0], scene.camera.panX[1], p) : 0;
    // El foco se mantiene en su lugar de pantalla mientras la cámara se acerca.
    const F0x = fx0 * s0 + (FW - W * s0) / 2;
    const F0y = fy * s0 + (FH - H * s0) / 2;
    let tx = F0x - (fx0 + pan) * s + shake;
    let ty = F0y - fy * s + shake * 0.6;
    tx = clamp(tx, FW - W * s, 0);
    ty = clamp(ty, FH - H * s, 0);
    cam.style.transform = `translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px) scale(${s.toFixed(5)})`;
  };

  host.appendChild(root);

  return {
    timeline: tl,
    render(t: number) {
      renderCam(t);
      for (const u of updaters) u(t);
    },
    resize(w: number, h: number) {
      FW = w;
      FH = h;
    },
    destroy() {
      root.remove();
    },
  };
}
