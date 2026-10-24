#!/usr/bin/env node
// Lista TODAS las pausas de un audio/video a partir de un largo mínimo (por defecto 0,08 s), en ventanas de 10 ms.
// Sirve para dejar el anuncio como una sola toma: ninguna pausa entre palabras de una misma frase, ni "microsegundos" entre clips.
// Umbral = piso de ruido (percentil 15) + 10 dB, como medir-voz.mjs.
// Con --umbral -33 usa un umbral fijo en dB: así aparecen también las colas suaves y respiraciones entre palabras, que el oído nota como "espacio".
// Uso: node pausas.mjs <archivo> [--min 0.08] [--umbral -33]
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const file = args[0];
if (!file) { console.error("Uso: node pausas.mjs <archivo> [--min 0.08]"); process.exit(2); }
const i = args.indexOf("--min");
const MIN = i > 0 ? +args[i + 1] : 0.08;
const u = args.indexOf("--umbral");
const SR = 16000, WIN = 160, STEP = WIN / SR;

const buf = execFileSync("ffmpeg", ["-v", "error", "-i", file, "-ac", "1", "-ar", String(SR), "-f", "f32le", "-"], { maxBuffer: 1 << 28 });
const s = new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4);
const db = [];
for (let k = 0; k + WIN <= s.length; k += WIN) {
  let e = 0; for (let j = k; j < k + WIN; j++) e += s[j] * s[j];
  db.push(10 * Math.log10(e / WIN + 1e-12));
}
const floor = [...db].sort((a, b) => a - b)[Math.floor(db.length * 0.15)];
const thr = u > 0 ? +args[u + 1] : floor + 10;
const voiced = db.map((d) => d > thr);
const first = voiced.indexOf(true), last = voiced.lastIndexOf(true);
console.log(`${file}: piso ${floor.toFixed(0)} dB · umbral ${thr.toFixed(0)} dB · voz ${(first * STEP).toFixed(2)} → ${((last + 1) * STEP).toFixed(2)}`);
let k = first;
while (k <= last) {
  if (!voiced[k]) {
    let j = k; while (j <= last && !voiced[j]) j++;
    const d = (j - k) * STEP;
    if (d >= MIN) console.log(`  pausa ${(k * STEP).toFixed(2)}–${(j * STEP).toFixed(2)}  (${d.toFixed(2)} s)`);
    k = j;
  } else k++;
}
