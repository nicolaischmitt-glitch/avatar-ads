// Analiza una grabación de voz en off antes de editarla.
// Uso (desde la raíz del proyecto):
//   node "reels/_plantilla-voz-en-off/scripts/analizar-voz.mjs" "reels/03-regla-7-11-4/voz-original.mp4"
// Muestra: palabras con tiempos (transcripción local Parakeet), pausas reales (energía cada 10 ms),
// volumen (LUFS) y picos recortados. Con eso se escribe reels/NN-slug/cortes.json.
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const src = process.argv[2];
if (!src) { console.error('Uso: node analizar-voz.mjs "reels/NN-slug/voz-original.mp4"'); process.exit(1); }

// 1) Transcripción con tiempos por palabra
const tmp = mkdtempSync(path.join(os.tmpdir(), "voz-"));
// En Windows "hyperframes" es un .cmd y necesita shell: se pasa una sola línea con las rutas entre comillas
// (las rutas con espacios, como "audio 2.mp4", se rompían si no).
const win = process.platform === "win32";
const args = ["transcribe", src, "-d", tmp, "-l", "es", "-e", "parakeet", "--json"];
if (win) spawnSync(["hyperframes", ...args.map((a) => `"${a}"`)].join(" "), { stdio: "ignore", shell: true });
else spawnSync("hyperframes", args, { stdio: "ignore" });
let words = [];
try { words = JSON.parse(readFileSync(path.join(tmp, "transcript.json"), "utf8")); } catch { console.error("No se pudo transcribir (¿hyperframes instalado?)."); }
console.log(`\n== PALABRAS (${words.length}) ==`);
console.log(words.map((w) => `${w.text}[${w.start.toFixed(2)}-${w.end.toFixed(2)}]`).join(" "));

// 2) Pausas reales por energía (umbral = pico - 30 dB, mínimo 120 ms)
const pcm = spawnSync("ffmpeg", ["-v", "error", "-i", src, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], { maxBuffer: 1 << 28 }).stdout;
const W = 160, db = [];
for (let i = 0; i + W <= pcm.length / 2; i += W) {
  let s = 0;
  for (let j = 0; j < W; j++) { const v = pcm.readInt16LE((i + j) * 2) / 32768; s += v * v; }
  db.push(10 * Math.log10(s / W + 1e-12));
}
const peak = Math.max(...db), TH = peak - 30, pauses = [];
let st = -1;
db.forEach((v, i) => {
  if (v < TH && st < 0) st = i;
  if ((v >= TH || i === db.length - 1) && st >= 0) {
    const en = v >= TH ? i : i + 1;
    if (en - st >= 12) pauses.push(`${(st / 100).toFixed(2)}-${(en / 100).toFixed(2)}`);
    st = -1;
  }
});
console.log(`\n== PAUSAS (≥120 ms bajo ${TH.toFixed(1)} dB) ==\n${pauses.join(" | ")}`);

// 3) Volumen y picos recortados
const lu = spawnSync("ffmpeg", ["-hide_banner", "-nostats", "-i", src, "-af", "ebur128=peak=true", "-f", "null", "-"], { encoding: "utf8" }).stderr;
const pick = (re) => (lu.match(re) || []).pop();
const f32 = spawnSync("ffmpeg", ["-v", "error", "-i", src, "-ac", "1", "-f", "f32le", "-"], { maxBuffer: 1 << 28 }).stdout;
let clipped = 0;
for (let i = 0; i < f32.length / 4; i++) if (Math.abs(f32.readFloatLE(i * 4)) >= 0.995) clipped++;
console.log(`\n== AUDIO ==\n${pick(/I:\s+-?[\d.]+ LUFS/g)} · ${pick(/LRA:\s+[\d.]+ LU/g)} · ${pick(/Peak:\s+-?[\d.]+ dBFS/g)} · muestras recortadas: ${clipped}`);
console.log("\nSiguiente: escribe reels/NN-slug/cortes.json (ver LEEME.md) y corre scripts/voz.mjs");
