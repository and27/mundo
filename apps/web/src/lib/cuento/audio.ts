// Audio del cuento con Web Audio: voz por frase, ambiente y efectos, todo agendado
// sobre el mismo reloj (AudioContext). El reloj de la animación se lee de aquí,
// así voz, texto y efectos quedan siempre sincronizados, también al pausar.

import type { Timeline } from "./engine";
import type { Scene } from "./types";

interface Playing {
  key: number;
  bus: GainNode;
  sources: AudioBufferSourceNode[];
  /** ctx.currentTime en el que la escena estaría en t = 0 */
  origin: number;
}

export class CuentoAudio {
  ctx: AudioContext;
  private master: GainNode;
  private buffers = new Map<string, Promise<AudioBuffer | null>>();
  private playing: Playing[] = [];

  constructor() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.connect(this.ctx.destination);
  }

  load(url: string) {
    let p = this.buffers.get(url);
    if (!p) {
      p = fetch(url)
        .then((r) => r.arrayBuffer())
        .then((b) => this.ctx.decodeAudioData(b))
        .catch(() => null);
      this.buffers.set(url, p);
    }
    return p;
  }

  static urls(scene: Scene) {
    const u = new Set<string>();
    if (scene.bed) u.add(scene.bed);
    scene.lines.forEach((l) => l.audio && u.add(l.audio));
    scene.sounds?.forEach((s) => u.add(s.src));
    return [...u];
  }

  preload(scene: Scene) {
    return Promise.all(CuentoAudio.urls(scene).map((u) => this.load(u)));
  }

  /** Agenda una escena empezando en `offset` segundos. Devuelve su clave. */
  async start(key: number, scene: Scene, tl: Timeline, offset: number) {
    await this.preload(scene);
    const now = this.ctx.currentTime + 0.05;
    const origin = now - offset;
    const bus = this.ctx.createGain();
    bus.connect(this.master);
    const sources: AudioBufferSourceNode[] = [];
    const play = async (url: string, at: number, gain = 1, loop = false, fadeIn = 0) => {
      const buf = await this.load(url);
      if (!buf) return;
      const startAt = origin + at;
      const skip = Math.max(0, now - startAt);
      if (!loop && skip >= buf.duration) return;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      src.loop = loop;
      const g = this.ctx.createGain();
      g.gain.value = gain;
      if (fadeIn > 0) {
        g.gain.setValueAtTime(0, Math.max(now, startAt));
        g.gain.linearRampToValueAtTime(gain, Math.max(now, startAt) + fadeIn);
      }
      src.connect(g).connect(bus);
      src.start(Math.max(now, startAt), loop ? skip % buf.duration : skip);
      sources.push(src);
    };
    if (scene.bed) await play(scene.bed, 0, scene.bedGain ?? 1, true, 1.2);
    for (let i = 0; i < scene.lines.length; i++) {
      const l = scene.lines[i];
      if (l.audio) await play(l.audio, tl.start[i]);
    }
    for (const s of scene.sounds ?? []) await play(s.src, tl.cue(s.at), s.gain ?? 1);
    this.playing.push({ key, bus, sources, origin });
    return origin;
  }

  /** Tiempo actual de la escena `key` según el reloj de audio. */
  time(key: number) {
    const p = this.playing.find((x) => x.key === key);
    return p ? this.ctx.currentTime - p.origin : null;
  }

  fadeOut(key: number, seconds: number) {
    const p = this.playing.find((x) => x.key === key);
    if (!p) return;
    const t = this.ctx.currentTime;
    p.bus.gain.setValueAtTime(p.bus.gain.value, t);
    p.bus.gain.linearRampToValueAtTime(0, t + seconds);
    setTimeout(() => this.stop(key), seconds * 1000 + 100);
  }

  stop(key: number) {
    const i = this.playing.findIndex((x) => x.key === key);
    if (i < 0) return;
    const p = this.playing[i];
    p.sources.forEach((s) => {
      try {
        s.stop();
      } catch {}
    });
    p.bus.disconnect();
    this.playing.splice(i, 1);
  }

  stopAll() {
    [...this.playing].forEach((p) => this.stop(p.key));
  }

  pause() {
    return this.ctx.suspend();
  }

  resume() {
    return this.ctx.resume();
  }

  close() {
    this.stopAll();
    this.ctx.close().catch(() => {});
  }
}
