// Une los 7 clips en orden quitando silencios muertos, con cortes en los valles
// de energía (ver analizar.mjs), volumen igualado por clip y crossfade de audio
// de 60 ms en cada unión. Los originales no se modifican.
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const CLIPS = path.join(ROOT, "clips"); // fuentes: anuncios/01-avatar-ads/clips/
const PUB = path.join(ROOT, "edicion", "public");
mkdirSync(PUB, { recursive: true });

const FPS = 24;
const XF = 0.06; // crossfade de audio
const TARGET_LUFS = -16;

// [archivo, LUFS medido, tramos [inicio, fin] en segundos del clip original]
// Pausas internas largas se recortan a ~0,22 s; las respiraciones cortas se mantienen.
const PLAN = [
  ["clip 1.mp4", -22.6, [[0.39, 3.1], [3.31, 5.75]]],
  ["clip 2.mp4", -22.4, [[0.5, 5.6]]],
  ["clip 3.mp4", -23.0, [[0.35, 2.01], [2.27, 7.57]]],
  ["clip 4.mp4", -22.8, [[0.51, 3.85]]],
  // Clips 5–7 reemplazados por las tomas nuevas ("nuevo clip 5/6/7").
  ["nuevo clip 5.mp4", -21.5, [[0.46, 2.51], [2.71, 5.39], [5.52, 7.8], [8.04, 8.93]]],
  ["nuevo clip 6.mp4", -23.7, [[0.74, 5.65], [5.78, 7.4]]],
  ["nuevo clip 7.mp4", -23.0, [[0.96, 2.42], [2.52, 4.46], [4.6, 6.3]]],
];

const snap = (t) => Math.round(t * FPS) / FPS; // cortes en la rejilla de fotogramas
const segs = [];
PLAN.forEach(([file, lufs, ranges], ci) =>
  ranges.forEach(([a, b]) => segs.push({ ci, file, gain: TARGET_LUFS - lufs, a: snap(a), b: snap(b) })),
);

const args = ["-y", "-hide_banner", "-loglevel", "error"];
PLAN.forEach(([file]) => args.push("-i", path.join(CLIPS, file)));

const f = [];
let t = 0;
const timeline = [];
segs.forEach((s, i) => {
  const pre = i > 0 ? XF / 2 : 0;
  const post = i < segs.length - 1 ? XF / 2 : 0;
  f.push(`[${s.ci}:v]trim=start=${s.a.toFixed(4)}:end=${s.b.toFixed(4)},setpts=PTS-STARTPTS[v${i}]`);
  f.push(
    `[${s.ci}:a]atrim=start=${(s.a - pre).toFixed(4)}:end=${(s.b + post).toFixed(4)},asetpts=PTS-STARTPTS,` +
      `volume=${s.gain.toFixed(2)}dB[a${i}]`,
  );
  timeline.push({ clip: s.ci + 1, file: s.file, srcStart: s.a, srcEnd: s.b, start: +t.toFixed(4), duration: +(s.b - s.a).toFixed(4) });
  t += s.b - s.a;
});
f.push(`${segs.map((_, i) => `[v${i}]`).join("")}concat=n=${segs.length}:v=1:a=0[v]`);
let prev = "a0";
for (let i = 1; i < segs.length; i++) {
  const out = i === segs.length - 1 ? "ax" : `x${i}`;
  f.push(`[${prev}][a${i}]acrossfade=d=${XF}:c1=tri:c2=tri[${out}]`);
  prev = out;
}
f.push(`[ax]alimiter=limit=0.89:level=false[a]`); // techo ~ -1 dBFS, solo seguridad

const OUT = path.join(PUB, "ugc-cortado.mp4");
args.push(
  "-filter_complex", f.join(";"),
  "-map", "[v]", "-map", "[a]",
  "-r", String(FPS), "-c:v", "libx264", "-preset", "medium", "-crf", "16",
  "-g", String(FPS), "-keyint_min", String(FPS), "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
  "-movflags", "+faststart", OUT,
);
const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
if (r.status !== 0) process.exit(r.status ?? 1);

writeFileSync(path.join(ROOT, "edicion", "segmentos.json"), JSON.stringify({ total: +t.toFixed(4), segments: timeline }, null, 2));
console.log(`OK → ${OUT} (${t.toFixed(3)}s, ${segs.length} tramos)`);
timeline.forEach((s) => console.log(`  clip${s.clip} ${s.srcStart.toFixed(3)}-${s.srcEnd.toFixed(3)} → ${s.start.toFixed(3)}`));
