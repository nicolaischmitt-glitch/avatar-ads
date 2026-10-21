// Une los clips según cortes.txt → base.mp4 (1080x1920, 24 fps) + base-cortes.json (dónde empieza cada segmento)
// Cada corte se ajusta a un fotograma exacto de 24 fps (la velocidad de Google Flow). Así los tiempos de base-cortes.json
// coinciden fotograma a fotograma con los cortes reales del video y los cambios de zoom caen en el mismo fotograma
// (si no, se ve un "doble corte": el zoom cambia 1–5 fotogramas antes que la imagen).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const FPS = 24;
const here = path.dirname(fileURLToPath(import.meta.url));
const clipsDir = path.resolve(here, "..", "clips");
const clipPath = (n) => path.join(clipsDir, n <= 4 ? `clip ${n}.mp4` : `nuevo clip ${n}.mp4`);
const rows = fs.readFileSync(path.join(here, "cortes.txt"), "utf8")
  .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
  .map((l) => { const [c, a, b] = l.split(/\s+/); return { clip: +c, fa: Math.round(+a * FPS), fb: Math.round(+b * FPS) }; });

const args = ["-v", "error", "-y"];
let fc = "", cat = "", frames = 0;
const segs = [];
rows.forEach((r, n) => {
  args.push("-i", clipPath(r.clip));
  const a = r.fa / FPS, b = r.fb / FPS, d = b - a;
  fc += `[${n}:v]fps=${FPS},trim=start_frame=${r.fa}:end_frame=${r.fb},setpts=PTS-STARTPTS,scale=1080:1920:flags=lanczos,unsharp=5:5:0.5,setsar=1[v${n}];`;
  fc += `[${n}:a]atrim=${a.toFixed(5)}:${b.toFixed(5)},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.015,afade=t=out:st=${(d - 0.02).toFixed(4)}:d=0.02[a${n}];`;
  cat += `[v${n}][a${n}]`;
  segs.push({ clip: r.clip, a: +a.toFixed(4), b: +b.toFixed(4), frameStart: frames, frames: r.fb - r.fa,
    start: +(frames / FPS).toFixed(4), end: +((frames + r.fb - r.fa) / FPS).toFixed(4) });
  frames += r.fb - r.fa;
});
args.push("-filter_complex", `${fc}${cat}concat=n=${rows.length}:v=1:a=1[v][a]`,
  "-map", "[v]", "-map", "[a]", "-r", String(FPS), "-c:v", "libx264", "-crf", "16", "-preset", "slow",
  "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", path.join(here, "base.mp4"));
execFileSync("ffmpeg", args, { stdio: "inherit" });
fs.writeFileSync(path.join(here, "base-cortes.json"), JSON.stringify(segs, null, 2));
console.log(`base.mp4 listo: ${rows.length} segmentos, ${frames} fotogramas (${(frames / FPS).toFixed(3)} s a ${FPS} fps)`);
