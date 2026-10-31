#!/usr/bin/env node
// Mide la voz de cada clip por nivel de audio (no depende de la transcripción).
// Parakeet, en clips sueltos que empiezan con silencio, entrega los tiempos ~0,4 s adelantados;
// por eso los cortes de cortes.txt se deciden con este script y la transcripción solo confirma el texto.
//
// Uso:
//   node medir-voz.mjs <carpeta-o-archivo>              → inicio y fin de la voz + huecos > 0,2 s por clip
//   node medir-voz.mjs <archivo> --desde 1.1 --hasta 2.8 → nivel cada 20 ms (para ubicar una palabra a cortar)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const target = args[0];
if (!target) { console.error("Uso: node medir-voz.mjs <carpeta-o-archivo> [--desde s --hasta s]"); process.exit(2); }
const opt = (k) => { const i = args.indexOf(k); return i > 0 ? +args[i + 1] : null; };
const SR = 16000, WIN = 320, STEP = WIN / SR; // ventanas de 20 ms

function levels(file, a, b) {
  const ff = ["-v", "error"];
  if (a != null) ff.push("-ss", String(a));
  if (b != null) ff.push("-to", String(b));
  ff.push("-i", file, "-ac", "1", "-ar", String(SR), "-f", "f32le", "-");
  const buf = execFileSync("ffmpeg", ff, { maxBuffer: 1 << 28 });
  const s = new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4);
  const db = [];
  for (let i = 0; i + WIN <= s.length; i += WIN) {
    let e = 0; for (let j = i; j < i + WIN; j++) e += s[j] * s[j];
    db.push(10 * Math.log10(e / WIN + 1e-12));
  }
  return db;
}

const desde = opt("--desde"), hasta = opt("--hasta");
if (desde != null) {
  levels(target, desde, hasta).forEach((d, i) =>
    console.log(`${(desde + i * STEP).toFixed(2)} ${d.toFixed(0).padStart(4)} ${"#".repeat(Math.max(0, Math.round((d + 60) / 2)))}`));
  process.exit(0);
}

const files = fs.statSync(target).isDirectory()
  ? fs.readdirSync(target).filter((f) => /\.(mp4|mov|wav|mp3|m4a)$/i.test(f) && !/^broll-/i.test(f)).sort().map((f) => path.join(target, f))
  : [target];
for (const f of files) {
  const db = levels(f);
  const on = db.findIndex((d) => d > -35);
  const off = db.length - 1 - [...db].reverse().findIndex((d) => d > -35);
  const gaps = []; let st = -1;
  for (let i = on; i <= off; i++) {
    if (db[i] < -38) { if (st < 0) st = i; }
    else { if (st >= 0 && (i - st) * STEP >= 0.2) gaps.push(`${(st * STEP).toFixed(2)}–${(i * STEP).toFixed(2)} (${((i - st) * STEP).toFixed(2)})`); st = -1; }
  }
  console.log(`${path.basename(f)}: voz ${(on * STEP).toFixed(2)} → ${((off + 1) * STEP).toFixed(2)} · dura ${(db.length * STEP).toFixed(2)} s · huecos ${gaps.join("  ") || "—"}`);
}
