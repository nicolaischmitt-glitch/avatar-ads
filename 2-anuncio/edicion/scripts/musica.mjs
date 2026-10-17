// Prepara la cama musical (Pixabay "Instrumental Minimal", The_Mountain) para el ad:
// - el tiempo fuerte de 65,02 s de la pista cae en 5,167 s del video ("Ahora con la IA…")
// - en 35,167 s del video se salta 16 s atrás (8 compases exactos a 120 BPM) para que
//   la sección con ritmo cubra hasta el final en vez de bajar antes del CTA
// - intro suave levantada +8 dB, cama ~18 LU por debajo de la voz, fundidos de entrada/salida
import { spawnSync } from "node:child_process";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "descargas", "musica", "instrumental-minimal.mp3");
const OUT = path.join(ROOT, "public", "audio", "bgm.wav");

const DUR = 40.125; // duración del video
const DROP_TRACK = 65.02; // tiempo fuerte en la pista
const DROP_VIDEO = 5.1667; // "Ahora con la IA"
const S = DROP_TRACK - DROP_VIDEO; // inicio en la pista
const SPLICE_VIDEO = DROP_VIDEO + 30; // 15 compases después del drop
const JUMP = 16; // 8 compases
const A_END = S + SPLICE_VIDEO; // = 95.02
const B_START = A_END - JUMP; // = 79.02
const B_END = B_START + (DUR - SPLICE_VIDEO);
const BED_GAIN_DB = -19;
const INTRO_BOOST = 2.5; // ≈ +8 dB en la intro suave
const F = 0.008;

const filter = [
  `[0:a]atrim=${S.toFixed(4)}:${A_END.toFixed(4)},asetpts=PTS-STARTPTS,afade=t=out:st=${(A_END - S - F).toFixed(4)}:d=${F}[a]`,
  `[0:a]atrim=${B_START.toFixed(4)}:${B_END.toFixed(4)},asetpts=PTS-STARTPTS,afade=t=in:d=${F}[b]`,
  `[a][b]concat=n=2:v=0:a=1,` +
    `volume='if(lt(t,${(DROP_VIDEO - 0.03).toFixed(3)}),${INTRO_BOOST},1)':eval=frame,` +
    `volume=${BED_GAIN_DB}dB,` +
    `afade=t=in:d=0.4,afade=t=out:st=${(DUR - 1.6).toFixed(3)}:d=1.6,` +
    `aresample=48000,atrim=0:${DUR}[m]`,
].join(";");

const r = spawnSync(
  "ffmpeg",
  ["-y", "-hide_banner", "-loglevel", "error", "-i", SRC, "-filter_complex", filter, "-map", "[m]", "-ac", "2", "-c:a", "pcm_s16le", OUT],
  { stdio: "inherit" },
);
if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`OK → ${OUT}  (pista ${S.toFixed(3)}–${A_END.toFixed(3)} + ${B_START.toFixed(3)}–${B_END.toFixed(3)})`);
