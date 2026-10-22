// Detecta en cada clip las vocales sostenidas (palabras estiradas: "cuestaaa…") y las pausas.
// Uso (desde la raíz del kit): node sistema/scripts/detectar-estiramientos.mjs <carpeta con .mp4/.wav> [--min 0.3]
// Salida por clip: tramos con voz estable (mucha energía y espectro casi sin cambios) más largos que --min s,
// y silencios > 0,25 s. Sirve para decidir dónde recortar en cortes.txt (cortar dentro de la vocal sostenida
// dejando ~0,12 s de vocal, y saltar a la siguiente palabra).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const dir = process.argv[2];
const minIdx = process.argv.indexOf("--min");
const MIN = minIdx > -1 ? +process.argv[minIdx + 1] : 0.3;
const SR = 16000, N = 512, HOP = 160; // 32 ms de ventana, 10 ms de paso

function analyze(file) {
  const raw = execFileSync("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", String(SR), "-f", "s16le", "-"], { maxBuffer: 1 << 28 });
  const x = new Float32Array(raw.length / 2);
  for (let i = 0; i < x.length; i++) x[i] = raw.readInt16LE(i * 2) / 32768;
  const bins = 96; // hasta 3 kHz
  const cos = [], sin = [];
  for (let k = 1; k <= bins; k++) {
    const c = new Float32Array(N), s = new Float32Array(N);
    for (let n = 0; n < N; n++) { const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * n) / N); c[n] = w * Math.cos((2 * Math.PI * k * n) / N); s[n] = w * Math.sin((2 * Math.PI * k * n) / N); }
    cos.push(c); sin.push(s);
  }
  const frames = [];
  for (let p = 0; p + N < x.length; p += HOP) {
    let e = 0; for (let n = 0; n < N; n++) e += x[p + n] ** 2;
    const db = 10 * Math.log10(e / N + 1e-12);
    const mag = new Float32Array(bins);
    for (let k = 0; k < bins; k++) { let re = 0, im = 0; for (let n = 0; n < N; n++) { re += x[p + n] * cos[k][n]; im += x[p + n] * sin[k][n]; } mag[k] = Math.log1p(Math.hypot(re, im)); }
    frames.push({ t: (p + N / 2) / SR, db, mag });
  }
  // flujo espectral normalizado
  for (let i = 1; i < frames.length; i++) {
    let d = 0, s = 0;
    for (let k = 0; k < bins; k++) { d += (frames[i].mag[k] - frames[i - 1].mag[k]) ** 2; s += frames[i].mag[k] ** 2; }
    frames[i].flux = Math.sqrt(d / (s + 1e-9));
  }
  frames[0].flux = 1;
  const smooth = frames.map((f, i) => { const a = frames.slice(Math.max(0, i - 3), i + 4); return a.reduce((s, g) => s + g.flux, 0) / a.length; });
  const steady = [], silent = [];
  let a = null, b = null;
  frames.forEach((f, i) => {
    const isSteady = f.db > -32 && smooth[i] < 0.3;
    if (isSteady && a === null) a = f.t;
    if (!isSteady && a !== null) { if (f.t - a >= MIN) steady.push([a, f.t]); a = null; }
    const isSilent = f.db < -45;
    if (isSilent && b === null) b = f.t;
    if (!isSilent && b !== null) { if (f.t - b >= 0.25) silent.push([b, f.t]); b = null; }
  });
  if (b !== null) silent.push([b, frames.at(-1).t]);
  return { steady, silent };
}

const fmt = (r) => r.map(([a, b]) => `${a.toFixed(2)}–${b.toFixed(2)} (${(b - a).toFixed(2)})`).join("  ");
for (const f of fs.readdirSync(dir).filter((f) => /.(mp4|mov|wav|mp3|m4a)$/i.test(f)).sort()) {
  const { steady, silent } = analyze(path.join(dir, f));
  console.log(`${f}\n  sostenidas: ${fmt(steady) || "—"}\n  silencios:  ${fmt(silent) || "—"}`);
}
