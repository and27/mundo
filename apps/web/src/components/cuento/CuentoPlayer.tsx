"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createSceneRenderer, type SceneRenderer } from "@/lib/cuento/engine";
import { CuentoAudio } from "@/lib/cuento/audio";
import type { CuentoStory } from "@/lib/cuento/types";

const LOGICAL_W = 1080;
const CROSSFADE = 1.2;

type Phase = "intro" | "loading" | "playing" | "end";

interface Live {
  idx: number;
  key: number;
  t: number;
  renderer: SceneRenderer;
  wrap: HTMLDivElement;
}

interface AudioPlan {
  duration: number;
  bed?: string;
  bedGain?: number;
  clips: { src: string; at: number; gain: number }[];
}

declare global {
  interface Window {
    __cuento?: {
      scenes: number;
      duration: (i: number) => number;
      seek: (i: number, t: number) => void;
      plan: (i: number) => AudioPlan;
    };
  }
}

let keySeq = 0;

export default function CuentoPlayer({ story }: { story: CuentoStory }) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [paused, setPaused] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [frame, setFrame] = useState({ h: 1920, scale: 0.3 });
  const [renderMode, setRenderMode] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const live = useRef<Live | null>(null);
  const outgoing = useRef<Live | null>(null);
  const audio = useRef<CuentoAudio | null>(null);
  const pausedRef = useRef(false);
  const frameH = useRef(1920);
  const rafRef = useRef<number>(0);
  const lastTs = useRef<number | null>(null);

  // ---------- tamaño: ancho lógico fijo 1080, alto según la pantalla ----------
  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const portrait = vh >= vw;
      const h = portrait ? Math.min(2340, Math.max(1500, (LOGICAL_W * vh) / vw)) : 1920;
      const scale = portrait ? vw / LOGICAL_W : vh / h;
      frameH.current = h;
      setFrame({ h, scale });
      live.current?.renderer.resize(LOGICAL_W, h);
      outgoing.current?.renderer.resize(LOGICAL_W, h);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // ---------- montar una escena ----------
  const mount = useCallback(
    (idx: number): Live => {
      const host = frameRef.current!;
      const wrap = document.createElement("div");
      Object.assign(wrap.style, { position: "absolute", inset: "0", opacity: "0" });
      host.appendChild(wrap);
      const renderer = createSceneRenderer(wrap, story.scenes[idx], LOGICAL_W, frameH.current);
      renderer.render(0);
      return { idx, key: ++keySeq, t: 0, renderer, wrap };
    },
    [story.scenes],
  );

  const unmount = (l: Live | null) => {
    if (!l) return;
    l.renderer.destroy();
    l.wrap.remove();
  };

  const goTo = useCallback(
    (idx: number, crossfade: boolean) => {
      const A = audio.current;
      if (crossfade && live.current) {
        unmount(outgoing.current);
        outgoing.current = live.current;
        A?.fadeOut(outgoing.current.key, CROSSFADE);
      } else {
        unmount(outgoing.current);
        outgoing.current = null;
        unmount(live.current);
        A?.stopAll();
      }
      const L = mount(idx);
      live.current = L;
      setSceneIdx(idx);
      if (A) {
        A.start(L.key, story.scenes[idx], L.renderer.timeline, 0);
        const next = story.scenes[idx + 1];
        if (next) A.preload(next);
      }
    },
    [mount, story.scenes],
  );

  // ---------- bucle de animación (el reloj lo marca el audio) ----------
  useEffect(() => {
    if (phase !== "playing") return;
    const loop = (ts: number) => {
      const dt = lastTs.current === null ? 0 : Math.min(0.1, (ts - lastTs.current) / 1000);
      lastTs.current = ts;
      const L = live.current;
      if (L && !pausedRef.current) {
        const A = audio.current;
        if (A) L.t = Math.max(0, A.time(L.key) ?? 0);
        else L.t += dt;
        const dur = L.renderer.timeline.duration;
        L.renderer.render(Math.min(L.t, dur));
        L.wrap.style.opacity = String(Math.min(1, L.t / (L.idx === 0 ? 1.1 : CROSSFADE)));
        const O = outgoing.current;
        if (O) {
          const k = Math.min(1, L.t / CROSSFADE);
          O.wrap.style.opacity = String(1 - k);
          if (k >= 1) {
            unmount(O);
            outgoing.current = null;
          }
        }
        progressRefs.current.forEach((p, i) => {
          if (!p) return;
          p.style.width = i < L.idx ? "100%" : i > L.idx ? "0%" : `${Math.min(100, (L.t / dur) * 100)}%`;
        });
        if (L.t >= dur) {
          if (L.idx + 1 < story.scenes.length) goTo(L.idx + 1, true);
          else {
            A?.fadeOut(L.key, 1.5);
            setPhase("end");
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTs.current = null;
    };
  }, [phase, goTo, story.scenes.length]);

  // ---------- modo grabación (?render=1): sin interfaz ni audio, control externo ----------
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("render")) return;
    pausedRef.current = true;
    setRenderMode(true);
    setPaused(true);
    setPhase("playing");
    const seek = (i: number, t: number) => {
      if (!live.current || live.current.idx !== i) {
        unmount(live.current);
        live.current = mount(i);
        live.current.wrap.style.opacity = "1";
      }
      live.current.renderer.render(t);
    };
    window.__cuento = {
      scenes: story.scenes.length,
      seek,
      duration: (i) => {
        seek(i, 0);
        return live.current!.renderer.timeline.duration;
      },
      plan: (i) => {
        seek(i, 0);
        const tl = live.current!.renderer.timeline;
        const sc = story.scenes[i];
        const clips = [
          ...sc.lines.flatMap((l, k) => (l.audio ? [{ src: l.audio, at: tl.start[k], gain: 1 }] : [])),
          ...(sc.sounds ?? []).map((s) => ({ src: s.src, at: tl.cue(s.at), gain: s.gain ?? 1 })),
        ];
        return { duration: tl.duration, bed: sc.bed, bedGain: sc.bedGain, clips };
      },
    };
  }, [mount, story.scenes]);

  const start = async () => {
    setPhase("loading");
    try {
      const A = audio.current ?? new CuentoAudio();
      audio.current = A;
      await A.resume(); // desbloquea el audio en iOS (requiere el toque del usuario)
      await A.preload(story.scenes[0]);
    } catch {
      audio.current = null; // sin audio: el cuento sigue con su propio reloj
    }
    pausedRef.current = false;
    setPaused(false);
    setPhase("playing");
    requestAnimationFrame(() => goTo(0, false));
  };

  const togglePause = useCallback(() => {
    const p = !pausedRef.current;
    pausedRef.current = p;
    setPaused(p);
    if (p) audio.current?.pause();
    else {
      audio.current?.resume();
      lastTs.current = null;
    }
  }, []);

  const jump = useCallback(
    (dir: 1 | -1) => {
      const L = live.current;
      if (!L) return;
      let idx = L.idx + dir;
      if (dir === -1 && L.t > 3) idx = L.idx;
      if (idx < 0) idx = 0;
      if (idx >= story.scenes.length) return;
      goTo(idx, false);
      if (live.current) live.current.wrap.style.opacity = "1";
      live.current?.renderer.render(0);
    },
    [goTo, story.scenes.length],
  );

  const restart = async () => {
    unmount(outgoing.current);
    outgoing.current = null;
    unmount(live.current);
    live.current = null;
    audio.current?.stopAll();
    await audio.current?.resume();
    pausedRef.current = false;
    setPaused(false);
    setPhase("playing");
    requestAnimationFrame(() => goTo(0, false));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "playing") return;
      if (e.key === " ") {
        e.preventDefault();
        togglePause();
      }
      if (e.key === "ArrowRight") jump(1);
      if (e.key === "ArrowLeft") jump(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, togglePause, jump]);

  useEffect(
    () => () => {
      unmount(outgoing.current);
      unmount(live.current);
      audio.current?.close();
    },
    [],
  );

  const preview = story.plannedScenes && story.plannedScenes > story.scenes.length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black select-none" style={{ touchAction: "manipulation" }}>
      {/* Lienzo lógico 1080 x alto, escalado a la pantalla */}
      <div
        className="absolute left-1/2 top-1/2 overflow-hidden"
        style={{
          width: LOGICAL_W,
          height: frame.h,
          transform: `translate(-50%,-50%) scale(${frame.scale})`,
          background: "#f3ead8",
        }}
      >
        <div ref={frameRef} className="absolute inset-0" onClick={() => phase === "playing" && togglePause()} />

        {/* Barra de progreso por escena */}
        {phase === "playing" && !renderMode && (
          <div className="pointer-events-none absolute left-[60px] right-[60px] top-[56px] flex gap-[14px]">
            {story.scenes.map((s, i) => (
              <div key={s.id} className="h-[7px] flex-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,.35)" }}>
                <div
                  ref={(el) => {
                    progressRefs.current[i] = el;
                  }}
                  className="h-full rounded-full"
                  style={{ width: i < sceneIdx ? "100%" : "0%", background: "rgba(255,255,255,.9)" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Controles: solo aparecen en pausa */}
        {phase === "playing" && paused && !renderMode && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(20,16,30,.35)" }} onClick={togglePause}>
            <Link
              href="/miedos"
              aria-label="Salir del cuento"
              onClick={(e) => e.stopPropagation()}
              className="absolute left-[56px] top-[110px] flex h-[110px] w-[110px] items-center justify-center rounded-full text-[64px] text-white"
              style={{ background: "rgba(0,0,0,.35)" }}
            >
              ×
            </Link>
            <button
              aria-label="Escena anterior"
              onClick={(e) => {
                e.stopPropagation();
                jump(-1);
              }}
              className="mx-[40px] flex h-[150px] w-[150px] items-center justify-center rounded-full text-[70px] text-white"
              style={{ background: "rgba(0,0,0,.35)" }}
            >
              ‹
            </button>
            <button
              aria-label="Seguir"
              onClick={(e) => {
                e.stopPropagation();
                togglePause();
              }}
              className="flex h-[230px] w-[230px] items-center justify-center rounded-full text-[96px]"
              style={{ background: "rgba(255,248,235,.95)", color: "#4a3324" }}
            >
              ▶
            </button>
            <button
              aria-label="Escena siguiente"
              onClick={(e) => {
                e.stopPropagation();
                jump(1);
              }}
              className="mx-[40px] flex h-[150px] w-[150px] items-center justify-center rounded-full text-[70px] text-white"
              style={{ background: "rgba(0,0,0,.35)" }}
            >
              ›
            </button>
          </div>
        )}

        {/* Portada */}
        {(phase === "intro" || phase === "loading") && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={story.cover} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "40% 30%" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(243,234,216,0) 35%, rgba(243,234,216,.92) 62%, #f3ead8 78%)" }} />
            <div className="absolute bottom-[180px] left-[92px] right-[92px]" style={{ color: "#4a3324" }}>
              <p className="mb-[18px] text-[36px]" style={{ fontFamily: "var(--font-figtree), sans-serif", color: "#9a6a3a", fontWeight: 600 }}>
                {story.subtitle} · {story.minutes} min
              </p>
              <h1 className="mb-[60px] text-[104px] leading-[1.05]" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}>
                {story.title}
              </h1>
              <button
                onClick={start}
                disabled={phase === "loading"}
                className="flex h-[150px] w-full items-center justify-center gap-[24px] rounded-full text-[52px] text-white"
                style={{ background: "#4a3324", fontFamily: "var(--font-figtree), sans-serif", fontWeight: 600 }}
              >
                {phase === "loading" ? "Preparando…" : "▶ Empezar el cuento"}
              </button>
              <p className="mt-[34px] text-center text-[32px]" style={{ fontFamily: "var(--font-figtree), sans-serif", color: "#7d6650" }}>
                Para escuchar juntos, con el volumen bajo. Toca la pantalla para pausar.
              </p>
            </div>
          </div>
        )}

        {/* Final: actividad para el adulto */}
        {phase === "end" && (
          <div className="absolute inset-0 overflow-y-auto" style={{ background: "#f3ead8", color: "#4a3324" }}>
            <div className="px-[92px] pb-[140px] pt-[150px]" style={{ fontFamily: "var(--font-figtree), sans-serif" }}>
              {preview && (
                <p className="mb-[50px] inline-block rounded-full px-[30px] py-[12px] text-[30px]" style={{ background: "#e9dcc2", color: "#7d6650" }}>
                  Vista previa · {story.scenes.length} de {story.plannedScenes} escenas
                </p>
              )}
              <h2 className="mb-[24px] text-[84px] leading-[1.1]" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: 500 }}>
                {story.activity.title}
              </h2>
              <p className="mb-[50px] text-[38px] leading-[1.45]" style={{ color: "#7d6650" }}>
                {story.activity.intro}
              </p>
              <ol className="mb-[60px] space-y-[28px]">
                {story.activity.steps.map((s, i) => (
                  <li key={i} className="flex gap-[26px] text-[38px] leading-[1.45]">
                    <span className="flex h-[64px] w-[64px] flex-none items-center justify-center rounded-full text-[34px] font-semibold text-white" style={{ background: "#b4592a" }}>
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mb-[60px] rounded-[36px] px-[50px] py-[44px]" style={{ background: "#fbf3e2", border: "3px solid #e6d5b5" }}>
                <p className="mb-[14px] text-[30px] uppercase tracking-[0.1em]" style={{ color: "#9a6a3a" }}>
                  La frase de la semana
                </p>
                <p className="text-[56px] leading-[1.3]" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                  «{story.activity.phrase}»
                </p>
              </div>
              <p className="mb-[20px] text-[30px] uppercase tracking-[0.1em]" style={{ color: "#9a6a3a" }}>
                Para conversar después
              </p>
              <ul className="mb-[80px] space-y-[18px]">
                {story.activity.questions.map((q) => (
                  <li key={q} className="text-[38px] leading-[1.45]">
                    · {q}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-[28px]">
                <button onClick={restart} className="h-[140px] rounded-full text-[46px] font-semibold text-white" style={{ background: "#4a3324" }}>
                  Volver a verlo
                </button>
                <Link href="/miedos" className="flex h-[140px] items-center justify-center rounded-full text-[46px] font-semibold" style={{ border: "4px solid #4a3324" }}>
                  Ver la semana 1 completa
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
