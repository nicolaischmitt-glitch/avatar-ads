// Voz en off del reel 08: voz/voz.wav (AI Studio a 1.1x) → public/audio/voz-p1.wav + voz-p2.wav (después: loudnorm → voz-p1-n / voz-p2-n.wav) + voz-map.json
// Parte 1 = hasta "¿Y crees que solo se mueve?" · Parte 2 = desde "Sí, también habla." (entre las dos habla la chica).
// Ritmo natural: las pausas de más de ~0,6 s se recortan a ~0,45 s (0,2 s tras la voz + 0,25 s antes de la siguiente palabra).
// Uso (desde esta carpeta): node voz.mjs
import fs from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";

const SRC = "../voz/voz.wav";
const OUT = "public/audio";
fs.mkdirSync(OUT, { recursive: true });

// silencios de la voz (silencedetect -40 dB, ≥ 0,25 s)
const log = spawnSync("ffmpeg", ["-nostdin", "-i", SRC, "-af", "silencedetect=n=-40dB:d=0.25", "-f", "null", "-"], { encoding: "utf8" }).stderr;
const sil = [];
for (const m of log.matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g)) sil.push([+m[1], +m[2]]);

// dónde se corta entre las dos partes: el silencio más largo después de ~22 s ("…se mueve?" | "Sí, también habla")
const split = sil.filter(([a]) => a > 21.5).sort((x, y) => (y[1] - y[0]) - (x[1] - x[0]))[0];
const dur = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", SRC]).toString();

function part(from, to, name) {
  // tramos de voz que se conservan dentro de [from, to]
  const keep = [];
  let cur = from;
  for (const [a, b] of sil) {
    if (a <= from || b >= to) continue;
    if (b - a > 0.6) { keep.push([cur, a + 0.2]); cur = b - 0.25; }
  }
  keep.push([cur, to]);
  const f = keep.map(([a, b], i) => `[0:a]atrim=${a.toFixed(3)}:${b.toFixed(3)},asetpts=PTS-STARTPTS[s${i}]`).join(";")
    + ";" + keep.map((_, i) => `[s${i}]`).join("") + `concat=n=${keep.length}:v=0:a=1,aresample=48000[o]`;
  execFileSync("ffmpeg", ["-nostdin", "-v", "error", "-y", "-i", SRC, "-filter_complex", f, "-map", "[o]", "-ac", "1", `${OUT}/${name}.wav`]);
  // mapa tiempo original → tiempo dentro de la parte (para ubicar cada paso en la palabra correcta)
  let acc = 0;
  const map = keep.map(([a, b]) => { const r = { a, b, at: acc }; acc += b - a; return r; });
  return { name, dur: acc, map };
}

const voiceStart = sil[0] && sil[0][0] < 0.05 ? sil[0][1] - 0.05 : 0;
const p1 = part(voiceStart, split[0] + 0.25, "voz-p1");
const p2 = part(split[1] - 0.12, Math.min(dur, (sil.at(-1)[1] > dur - 0.05 ? sil.at(-1)[0] : dur) + 0.3), "voz-p2");
fs.writeFileSync(`${OUT}/voz-map.json`, JSON.stringify({ split, p1, p2 }, null, 1));
console.log(`parte 1: ${p1.dur.toFixed(2)} s · parte 2: ${p2.dur.toFixed(2)} s · corte en ${split[0].toFixed(2)}–${split[1].toFixed(2)}`);
