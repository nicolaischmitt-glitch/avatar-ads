// Reel 06 (lanzamiento): une los 5 clips de cámara del usuario quitando silencios,
// con micro-crossfade de audio en cada corte y la misma mejora de voz que los reels de voz en off
// (adeclip → highpass → EQ presencia/aire → de-esser → compresión suave → -14 LUFS).
// Salida: edicion/base.mp4 (576×1024, 30 fps, GOP 30 para que el render pueda buscar cualquier cuadro).
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";

const REEL = path.resolve(import.meta.dirname, "..", "..");
const FPS = 30;
const XF = 0.04;
// [clip, LUFS medido, tramos [inicio, fin]]
const PLAN = [
  ["clip-01.mp4", -22.9, [[2.68, 14.5]]],
  ["clip-02.mp4", -21.9, [[1.3, 11.85], [12.04, 20.18], [21.42, 25.03]]],
  ["clip-03.mp4", -23.4, [[1.1, 11.74], [11.91, 16.58], [16.84, 20.5]]],
  ["clip-04.mp4", -23.3, [[0.96, 19.25]]],
  ["clip-05.mp4", -22.9, [[1.42, 6.34]]],
];
const snap = (t) => Math.round(t * FPS) / FPS;
const segs = [];
PLAN.forEach(([file, lufs, ranges], ci) => ranges.forEach(([a, b]) => segs.push({ ci, file, gain: -16 - lufs, a: snap(a), b: snap(b) })));

const args = ["-y", "-hide_banner", "-loglevel", "error"];
PLAN.forEach(([file]) => args.push("-i", path.join(REEL, "clips", file)));
const f = [];
let t = 0;
const timeline = [];
segs.forEach((s, i) => {
  const pre = i > 0 ? XF / 2 : 0, post = i < segs.length - 1 ? XF / 2 : 0;
  f.push(`[${s.ci}:v]trim=start=${s.a.toFixed(4)}:end=${s.b.toFixed(4)},setpts=PTS-STARTPTS,fps=${FPS}[v${i}]`);
  f.push(`[${s.ci}:a]atrim=start=${(s.a - pre).toFixed(4)}:end=${(s.b + post).toFixed(4)},asetpts=PTS-STARTPTS,aresample=48000,volume=${s.gain.toFixed(2)}dB[a${i}]`);
  timeline.push({ clip: s.ci + 1, srcStart: s.a, srcEnd: s.b, start: +t.toFixed(4) });
  t += s.b - s.a;
});
f.push(`${segs.map((_, i) => `[v${i}]`).join("")}concat=n=${segs.length}:v=1:a=0[v]`);
let prev = "a0";
for (let i = 1; i < segs.length; i++) { const o = i === segs.length - 1 ? "ax" : `x${i}`; f.push(`[${prev}][a${i}]acrossfade=d=${XF}:c1=tri:c2=tri[${o}]`); prev = o; }
f.push(
  `[ax]adeclip,highpass=f=75,equalizer=f=250:t=q:w=1.2:g=-2.5,equalizer=f=3200:t=q:w=1.0:g=2.5,equalizer=f=10000:t=h:w=0.7:g=1.5,` +
    `deesser=i=0.35:m=0.5:f=0.55,acompressor=threshold=-22dB:ratio=3:attack=8:release=120:makeup=2,loudnorm=I=-14:TP=-1.5:LRA=7[a]`,
);
args.push("-filter_complex", f.join(";"), "-map", "[v]", "-map", "[a]", "-r", String(FPS), "-c:v", "libx264", "-preset", "medium", "-crf", "16",
  "-g", String(FPS), "-keyint_min", String(FPS), "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart",
  path.join(REEL, "edicion", "base.mp4"));
const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
if (r.status !== 0) process.exit(r.status ?? 1);
writeFileSync(path.join(REEL, "edicion", "segmentos.json"), JSON.stringify({ total: +t.toFixed(4), segments: timeline }, null, 2));
console.log(`OK → edicion/base.mp4 (${t.toFixed(2)} s, ${segs.length} tramos)`);
timeline.forEach((s) => console.log(`  clip${s.clip} ${s.srcStart.toFixed(2)}–${s.srcEnd.toFixed(2)} → ${s.start.toFixed(2)}`));
