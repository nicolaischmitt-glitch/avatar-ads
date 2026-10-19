// Une los clips según cortes.txt → base.mp4 (1080x1920, 30 fps) + base-cortes.json (dónde empieza cada segmento)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const reel = path.resolve(here, "..");
const rows = fs.readFileSync(path.join(here, "cortes.txt"), "utf8")
  .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
  .map((l) => { const [c, a, b] = l.split(/\s+/); return { clip: +c, a: +a, b: +b }; });

const args = ["-v", "error", "-y"];
let fc = "", cat = "", t = 0;
const segs = [];
rows.forEach((r, n) => {
  args.push("-i", path.join(reel, "clips", `clip-${String(r.clip).padStart(2, "0")}.mp4`));
  const d = r.b - r.a;
  fc += `[${n}:v]trim=${r.a}:${r.b},setpts=PTS-STARTPTS,fps=30,scale=1080:1920:flags=lanczos,unsharp=5:5:0.5,setsar=1[v${n}];`;
  fc += `[${n}:a]atrim=${r.a}:${r.b},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.02,afade=t=out:st=${(d - 0.02).toFixed(3)}:d=0.02[a${n}];`;
  cat += `[v${n}][a${n}]`;
  segs.push({ ...r, start: +t.toFixed(3), end: +(t + d).toFixed(3) });
  t += d;
});
args.push("-filter_complex", `${fc}${cat}concat=n=${rows.length}:v=1:a=1[v][a]`,
  "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "16", "-preset", "slow",
  "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", path.join(here, "base.mp4"));
execFileSync("ffmpeg", args, { stdio: "inherit" });
fs.writeFileSync(path.join(here, "base-cortes.json"), JSON.stringify(segs, null, 2));
console.log(`base.mp4 listo: ${rows.length} segmentos, ${t.toFixed(2)} s`);
