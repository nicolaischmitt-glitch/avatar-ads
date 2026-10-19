// Limpia y mejora una voz en off para reels de formato "voz + motion graphics".
// Uso (desde la raíz del proyecto):
//   node "Contenido/reels/_plantilla-voz-en-off/scripts/voz.mjs" Contenido/reels/NN-slug
// Lee   Contenido/reels/NN-slug/cortes.json  →  { "fuente": "Contenido/reels/03-regla-7-11-4/voz-original.mp4", "conservar": [[ini, fin], …] }
// Crea  Contenido/reels/NN-slug/edicion/public/audio/voz.wav
// Proceso: cortes con micro-crossfade (30 ms) → repara picos recortados → quita graves sobrantes →
// EQ de presencia y aire → de-esser → compresión suave → -14 LUFS (Instagram), pico máx. -1,5 dBTP.
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const reel = process.argv[2];
if (!reel) { console.error("Uso: node voz.mjs Contenido/reels/NN-slug"); process.exit(1); }
const ROOT = process.cwd();
const REEL = path.resolve(ROOT, reel);
const cfg = JSON.parse(readFileSync(path.join(REEL, "cortes.json"), "utf8"));
const SRC = path.resolve(ROOT, cfg.fuente);
const KEEP = cfg.conservar;
const OUT = path.join(REEL, "edicion", "public", "audio", "voz.wav");
mkdirSync(path.dirname(OUT), { recursive: true });

const XF = 0.03;
const f = [];
KEEP.forEach(([a, b], i) => {
  const pre = i > 0 ? XF / 2 : 0;
  const post = i < KEEP.length - 1 ? XF / 2 : 0;
  f.push(`[0:a]atrim=${(a - pre).toFixed(3)}:${(b + post).toFixed(3)},asetpts=PTS-STARTPTS[s${i}]`);
});
let prev = "s0";
for (let i = 1; i < KEEP.length; i++) {
  f.push(`[${prev}][s${i}]acrossfade=d=${XF}:c1=tri:c2=tri[x${i}]`);
  prev = `x${i}`;
}
f.push(
  `[${prev}]aresample=48000,adeclip,` +
    `highpass=f=75,` +
    `equalizer=f=250:t=q:w=1.2:g=-2.5,` + //   menos "caja"/barro
    `equalizer=f=3200:t=q:w=1.0:g=2.5,` + //   presencia / inteligibilidad
    `equalizer=f=10000:t=h:w=0.7:g=1.5,` + //  aire
    `deesser=i=0.35:m=0.5:f=0.55,` +
    `acompressor=threshold=-22dB:ratio=3:attack=8:release=120:makeup=2,` +
    `loudnorm=I=-14:TP=-1.5:LRA=7,` +
    `afade=t=in:d=0.02[v]`,
);

const r = spawnSync(
  "ffmpeg",
  ["-y", "-hide_banner", "-loglevel", "error", "-i", SRC, "-filter_complex", f.join(";"), "-map", "[v]", "-ac", "1", "-ar", "48000", "-c:a", "pcm_s16le", OUT],
  { stdio: "inherit" },
);
if (r.status !== 0) process.exit(r.status ?? 1);
const dur = KEEP.reduce((t, [a, b]) => t + (b - a), 0) - XF * (KEEP.length - 1);
console.log(`OK → ${path.relative(ROOT, OUT)} (~${dur.toFixed(2)} s)`);
