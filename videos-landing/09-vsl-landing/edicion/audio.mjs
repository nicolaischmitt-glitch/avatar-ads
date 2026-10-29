// Audio del VSL: limpia la voz de base.mp4 y le pone la música de fondo debajo → public/input-video.mp4
// Por qué: los clips 01–10 de Flow traen un retumbe grave de fondo (40–150 Hz, ~−46 dB, como de aire acondicionado)
// y el 11 viene limpio (~−68 dB): al pasar de uno a otro se notaba el cambio. Cadena de limpieza (probada en el clip 01:
// el silencio baja de −46 a −68 dB, igual que el clip 11, y la voz queda en el mismo nivel):
//   filtro de graves de 4 polos a 85 Hz → reducción de ruido (afftdn) → puerta suave en las pausas (baja ~18 dB, no corta).
// Música: la pista se repite con fundidos cruzados hasta cubrir el video, baja sola cuando él habla (sidechain) y se desvanece al final.
// Uso: node audio.mjs <bgm_00N | ruta.wav/.mp3>            → public/input-video.mp4 (voz limpia + música)
//      node audio.mjs <bgm_00N | ruta.wav/.mp3> --muestra  → muestras/muestra-<nombre>.mp3 (primeros 30 s, para elegir la música)
//      node audio.mjs ninguna                              → solo la voz limpia (paso fijo aunque no haya música)
// bgm_00N = pista guardada en .media/audio/bgm/ (media-use resolve --type bgm); también sirve cualquier archivo de audio.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const [track = "ninguna", flag] = process.argv.slice(2);
const muestra = flag === "--muestra";
const run = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
const dur = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(here, "base.mp4")]).toString();

const MUSIC_DB = -21;       // nivel de la música respecto a la voz (antes de que la voz la empuje hacia abajo)
const XFADE = 2.5;          // fundido cruzado entre repeticiones de la pista
const FADE_OUT = 2.0;       // fundido final

const VOZ = "highpass=f=85:poles=2,highpass=f=85:poles=2,afftdn=nr=40:nf=-48:tn=1," +
  "agate=threshold=0.012:ratio=4:attack=5:release=180:range=0.12," +
  "acompressor=threshold=-22dB:ratio=3:attack=5:release=90:makeup=2";

const base = path.join(here, "base.mp4");
const nombre = path.basename(track).replace(/\.(wav|mp3|m4a)$/i, "");
const out = muestra ? path.join(here, "muestras", `muestra-${nombre}.mp3`) : path.join(here, "public", "input-video.mp4");
fs.mkdirSync(path.dirname(out), { recursive: true });
const t = muestra ? ["-t", "30"] : [];

if (track === "ninguna") {
  run(["-i", base, "-c:v", muestra ? "none" : "copy", "-af", `${VOZ},loudnorm=I=-14:TP=-1.5:LRA=7`, "-c:a", "aac", "-b:a", "192k", "-ar", "48000", out]);
} else {
  const bgm = /\.(wav|mp3|m4a)$/i.test(track) ? path.resolve(here, track) : path.join(here, ".media", "audio", "bgm", `${track}.wav`);
  const len = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", bgm]).toString();
  const reps = Math.max(1, Math.ceil((dur - XFADE) / (len - XFADE)));
  // la pista n veces, unidas con fundidos cruzados
  let fc = "", last = "[1:a]";
  for (let i = 1; i < reps; i++) { fc += `${last}[${i + 1}:a]acrossfade=d=${XFADE}:c1=tri:c2=tri[m${i}];`; last = `[m${i}]`; }
  fc += `${last}atrim=0:${dur.toFixed(3)},asetpts=PTS-STARTPTS,afade=t=in:d=0.4,afade=t=out:st=${(dur - FADE_OUT).toFixed(3)}:d=${FADE_OUT},` +
    `aresample=48000,volume=${MUSIC_DB}dB[mus];`;
  fc += `[0:a]${VOZ},aresample=48000,asplit=2[voz][sc];`;
  fc += `[mus][sc]sidechaincompress=threshold=0.03:ratio=4:attack=30:release=400:makeup=1[duck];`;
  fc += `[voz][duck]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=7[a]`;
  const inputs = ["-i", base]; for (let i = 0; i < reps; i++) inputs.push("-i", bgm);
  const vid = muestra ? ["-vn"] : ["-map", "0:v", "-c:v", "copy"];
  run([...inputs, "-filter_complex", fc, ...vid, "-map", "[a]", ...t, ...(muestra ? ["-c:a", "libmp3lame", "-b:a", "192k"] : ["-c:a", "aac", "-b:a", "192k", "-ar", "48000"]), out]);
}
console.log(`${path.relative(here, out)} listo (${track}${muestra ? ", muestra de 30 s" : `, ${dur.toFixed(2)} s`})`);
