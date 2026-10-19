// Limpia y mejora la voz en off del reel 02.
// 1) Cortes: silencio inicial, tropiezo "La razón es que el dinero," y pausas largas (→ ~0,25 s).
// 2) Mejora: repara picos recortados, quita graves sobrantes, EQ de presencia, de-esser,
//    compresión suave y loudness a -14 LUFS (estándar de Instagram), pico máx. -1,5 dBTP.
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const REEL = path.resolve(import.meta.dirname, "..", "..");
const SRC = path.join(REEL, "voz-original.mp4");
const OUT = path.join(REEL, "edicion", "public", "audio", "voz.wav");
mkdirSync(path.dirname(OUT), { recursive: true });

// Tramos que se conservan (segundos del archivo original)
const KEEP = [
  [1.82, 5.97],
  [6.15, 9.3],
  [9.41, 14.72],
  [15.0, 18.5], //  ← aquí se quita "La razón es que el dinero," (tropiezo)
  [21.47, 26.95],
  [27.13, 31.27],
  [31.52, 36.73],
  [36.88, 39.57],
  [39.72, 40.99],
  [41.14, 42.6],
  [42.8, 51.45],
];
const XF = 0.03; // micro-crossfade en cada corte

const f = [];
KEEP.forEach(([a, b], i) => {
  const pre = i > 0 ? XF / 2 : 0;
  const post = i < KEEP.length - 1 ? XF / 2 : 0;
  f.push(`[0:a]atrim=${(a - pre).toFixed(3)}:${(b + post).toFixed(3)},asetpts=PTS-STARTPTS[s${i}]`);
});
let prev = "s0";
for (let i = 1; i < KEEP.length; i++) {
  const out = `x${i}`;
  f.push(`[${prev}][s${i}]acrossfade=d=${XF}:c1=tri:c2=tri[${out}]`);
  prev = out;
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
console.log(`OK → ${OUT} (~${dur.toFixed(2)} s)`);
