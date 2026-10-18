// Mapa de energía de audio (10 ms) por clip: lista las pausas reales y el
// volumen percibido de cada clip, para elegir cortes en los valles de energía.
// Uso: TH=20 node analizar.mjs  (umbral de pausa = pico del clip - TH dB)
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const CLIPS = path.join(ROOT, "clips"); // fuentes: anuncios/01-avatar-ads/clips/
const SR = 16000;
const WIN = 160; // 10 ms
const files = readdirSync(CLIPS)
  .filter((f) => new RegExp(process.env.MATCH || "^clip \\d+\\.mp4$", "i").test(f))
  .sort((a, b) => parseInt(a.replace(/\D/g, "")) - parseInt(b.replace(/\D/g, "")));

for (const f of files) {
  const p = path.join(CLIPS, f);
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", p, "-ac", "1", "-ar", String(SR), "-f", "s16le", "-"], {
    maxBuffer: 1 << 28,
  });
  const buf = r.stdout;
  const n = buf.length / 2;
  const db = [];
  for (let i = 0; i + WIN <= n; i += WIN) {
    let s = 0;
    for (let j = 0; j < WIN; j++) {
      const v = buf.readInt16LE((i + j) * 2) / 32768;
      s += v * v;
    }
    db.push(10 * Math.log10(s / WIN + 1e-12));
  }
  const peak = Math.max(...db);
  const TH = (process.env.TH ? peak - Number(process.env.TH) : peak - 32); // umbral relativo al pico del clip
  // pausas: tramos >= 150 ms bajo el umbral
  const pauses = [];
  let st = -1;
  db.forEach((v, i) => {
    if (v < TH && st < 0) st = i;
    if ((v >= TH || i === db.length - 1) && st >= 0) {
      const en = v >= TH ? i : i + 1;
      if (en - st >= 12) {
        let mi = st;
        for (let k = st; k < en; k++) if (db[k] < db[mi]) mi = k;
        pauses.push(`${(st / 100).toFixed(2)}-${(en / 100).toFixed(2)} (min ${db[mi].toFixed(0)}dB @${(mi / 100).toFixed(2)})`);
      }
      st = -1;
    }
  });
  const lu = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", p, "-af", "ebur128", "-f", "null", "-"], {
    encoding: "utf8",
  }).stderr;
  const I = (lu.match(/I:\s+(-?[\d.]+) LUFS/g) || []).pop();
  console.log(`== ${f} | ${(db.length / 100).toFixed(2)}s | pico ${peak.toFixed(1)}dB | ${I}`);
  console.log("   pausas: " + (pauses.join(" | ") || "ninguna"));
}

