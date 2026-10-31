// Plantilla del formato voz en off + B-rolls. Cópiala a anuncios/NN-slug/edicion/ y edita solo la CONFIG.
// Pasos: 1) public/voz.wav = la voz con ritmo natural (primer sonido en el fotograma 0, pausas > 0,6 s → ~0,5 s)
// 2) public/base.mp4 = los B-rolls cortados y unidos en fotogramas exactos (1080×1920, 24 fps, sin audio)
// 3) public/index.html = subtítulos naturales (blanco con sombra, sin caja) + el botón al final. Sin música.
// Antes: la voz en anuncios/NN-slug/voz/voz.wav y "hyperframes transcribe voz/voz.wav -l es" (deja voz/transcript.json).
// public/: copia fonts/Inter-700.woff2, vendor/gsap.min.js y audio/pop.mp3 desde sistema/formatos/head-talking/edicion/public-base/.
// Uso: node build.mjs → hyperframes lint public → hyperframes snapshot public --at … → hyperframes render public -o ../final/render-crudo.mp4 --fps 24 --quality delivery --workers 1
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const anuncio = path.join(here, "..");
const FPS = 24;
const q = (t) => Math.round(t * FPS) / FPS;
const f3 = (n) => +n.toFixed(3);
const ff = (args) => execFileSync("ffmpeg", ["-nostdin", "-v", "error", "-y", ...args], { stdio: "inherit" });

// ───────────────────────── CONFIG ─────────────────────────
const ID = "anuncio-NN";
const VOZ = path.join(anuncio, "voz", "voz.wav");
const TRANSCRIPT = path.join(anuncio, "voz", "transcript.json");
const INICIO = 0.27;                      // dónde empieza la voz (silencedetect): el primer sonido queda en el fotograma 0
// Pausas de más de ~0,6 s (silencedetect=n=-40dB:d=0.15): se quita su centro y quedan ~0,5 s. [[desde, hasta], …] en segundos del archivo.
const QUITAR = [];
const FIN = 0;                            // duración del archivo de voz (ffprobe)
const COLA = 0.6;                         // silencio extra al final para leer el botón
const COLOR = "#F28C28";                  // color del botón: el de la marca (negocio/marca.md)
const BOTON = "Comprar";                  // texto del botón

// Frases del subtítulo, en orden, con las palabras exactas de la voz. Frases cortas (2–5 palabras). "|" = salto de línea.
const PHRASES = [
  "Primera frase,", "segunda frase…",
];
const FIX = {};                           // palabras mal transcritas: { serum: "sérum" }

// B-rolls en orden: [archivo de clips/, palabra donde entra (null en la primera), segundo del B-roll desde el que entra, altura del subtítulo en px, palabra siguiente (opcional, si la palabra se repite)]
// Elige cada toma y su segundo de entrada MIRANDO los B-rolls (hoja de frames, 1 por segundo): el gesto que muestra lo que dice la voz.
// El corte cae ~0,08 s antes de la palabra. La altura del subtítulo nunca tapa la etiqueta del producto ni la cara (por defecto ~1290; arriba ~250).
const PLAN = [
  ["broll-01", null, 0.0, 1290],
  ["broll-02", "palabra", 0.4, 1290],
];
const BTN_WORD = "Lo";                    // palabra con la que entra el botón (la frase del CTA)
const BTN_ANCLA = "botón";                // palabra en la que el botón rebota
// ────────────────────────────────────────────────────────────

// ── 1 · voz.wav con el ritmo natural
const keep = [];
let a = INICIO;
for (const [x, y] of QUITAR) { keep.push([a, x]); a = y; }
keep.push([a, FIN]);
const map = (t) => {                      // tiempo del archivo original → tiempo del anuncio
  let out = 0;
  for (const [x, y] of keep) { if (t <= y) return out + Math.max(0, t - x); out += y - x; }
  return out;
};
const VOZ_DUR = keep.reduce((s, [x, y]) => s + (y - x), 0);
const DUR = q(VOZ_DUR + COLA);
const fc = keep.map(([x, y], i) => `[0:a]atrim=${x}:${y},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,afade=t=out:st=${f3(y - x - 0.01)}:d=0.01[a${i}]`).join(";") +
  `;${keep.map((_, i) => `[a${i}]`).join("")}concat=n=${keep.length}:v=0:a=1,apad=whole_dur=${DUR}[out]`;
ff(["-i", VOZ, "-filter_complex", fc, "-map", "[out]", "-ar", "48000", "-ac", "1", path.join(here, "public", "voz.wav")]);

// ── palabras con tiempos del anuncio
const raw = JSON.parse(fs.readFileSync(TRANSCRIPT, "utf8"));
const words = (Array.isArray(raw) ? raw : raw.words).map((w) => {
  const clean = w.text.replace(/[.,]/g, "").toLowerCase();
  const text = FIX[clean] ? w.text.toLowerCase().replace(clean, FIX[clean]) : w.text;
  return { text, start: map(w.start), end: map(w.end) };
});
fs.writeFileSync(path.join(here, "transcript.json"), JSON.stringify(words, null, 1));
const norm = (s) => s.toLowerCase().replace(/[¿?¡!.,]/g, "").normalize("NFD").replace(/[̀-ͯ]/g, "");
const at = (txt, from = 0, next) => {
  const i = words.findIndex((x, k) => x.start >= from - 0.05 && norm(x.text) === norm(txt) && (!next || norm(words[k + 1]?.text ?? "") === norm(next)));
  if (i < 0) throw new Error(`No encuentro "${txt}" desde ${from}`);
  return words[i];
};

// ── 2 · base.mp4: B-rolls en fotogramas exactos
let from = 0;
const cuts = PLAN.map(([file, word, src, subY, next], i) => {
  const t = word ? q(at(word, from, next).start - 0.08) : 0;
  from = t + 0.1;
  return { file, t, src, subY };
});
cuts.forEach((c, i) => { c.end = cuts[i + 1]?.t ?? DUR; c.frames = Math.round((c.end - c.t) * FPS); });
const inputs = [], filt = [];
cuts.forEach((c, i) => {
  const srcFile = path.join(anuncio, "clips", `${c.file}.mp4`);
  const len = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", srcFile]).toString();
  if (c.src + c.frames / FPS > len + 0.01) throw new Error(`${c.file}: pide ${f3(c.src + c.frames / FPS)} s y dura ${f3(len)} s`);
  inputs.push("-i", srcFile);
  filt.push(`[${i}:v]trim=start=${c.src},setpts=PTS-STARTPTS,fps=${FPS},trim=end_frame=${c.frames},scale=1080:1920:flags=lanczos,setsar=1[v${i}]`);
});
filt.push(`${cuts.map((_, i) => `[v${i}]`).join("")}concat=n=${cuts.length}:v=1:a=0[out]`);
ff([...inputs, "-filter_complex", filt.join(";"), "-map", "[out]", "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-pix_fmt", "yuv420p", "-r", String(FPS), path.join(here, "public", "base.mp4")]);

// ── 3 · subtítulos por frase (la altura depende del B-roll que está en pantalla)
let wi = 0, subsHtml = "", subsJs = "";
const blocks = PHRASES.map((linea) => {
  const text = linea.replace(/\|/g, " ");
  const n = text.split(/\s+/).length;
  const ws = words.slice(wi, wi + n);
  ws.forEach((w, k) => { if (norm(w.text) !== norm(text.split(/\s+/)[k])) throw new Error(`Frase "${text}": la palabra ${k + 1} es "${w.text}"`); });
  wi += n;
  return ws;
});
if (wi !== words.length) throw new Error(`Las frases cubren ${wi} de ${words.length} palabras`);
const subY = (t) => [...cuts].reverse().find((c) => c.t <= t + 0.01).subY;
blocks.forEach((ws, i) => {
  const start = Math.max(0, q(ws[0].start - 0.05));
  const end = blocks[i + 1] ? q(blocks[i + 1][0].start - 0.05) : DUR;
  subsHtml += `      <div class="sub clip" id="sub-${i}" style="top:${subY(start)}px" data-start="${f3(start)}" data-duration="${f3(end - start)}" data-track-index="3"><span>${PHRASES[i].replace(/\|/g, "<br>")}</span></div>\n`;
  subsJs += `          tl.fromTo("#sub-${i} span", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }, ${f3(start)});\n`;
});

// ── botón al final
const tBtn = q(at(BTN_WORD, cuts.at(-1).t).start - 0.04);
const tBoton = q(at(BTN_ANCLA, tBtn).start);

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: "InterB"; src: url("fonts/Inter-700.woff2") format("woff2"); font-weight: 700; font-display: block; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
      #stage { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #000; font-family: "InterB", sans-serif; }
      #base { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
      .g { position: absolute; z-index: 10; left: 0; top: 0; width: 1080px; height: 1920px; pointer-events: none; }
      /* subtítulo natural: frase corta, texto blanco con sombra, sin caja (el botón es la única píldora) */
      .sub { position: absolute; z-index: 20; left: 70px; right: 70px; text-align: center; pointer-events: none; }
      .sub span { display: inline-block; color: #fff; font-weight: 700; font-size: 64px; line-height: 1.18; letter-spacing: -0.3px;
        text-shadow: 0 3px 4px rgba(0,0,0,.55), 0 0 26px rgba(0,0,0,.45); }
      /* CTA: la única píldora del video, en el color de la marca, con un anillo que late */
      .btnw { position: absolute; left: 50%; top: 1500px; transform: translateX(-50%); }
      .btn { position: relative; display: inline-flex; align-items: center; gap: 20px; background: ${COLOR}; color: #fff; font-weight: 700; font-size: 58px;
        padding: 32px 76px; border-radius: 999px; box-shadow: 0 18px 50px rgba(0,0,0,.3); white-space: nowrap; }
      .btn svg { width: 52px; height: 52px; }
      .ring { position: absolute; inset: 0; border-radius: 999px; border: 6px solid ${COLOR}; opacity: 0; }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <video id="base" src="base.mp4" muted playsinline data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video>
      <audio id="voz" src="voz.wav" data-start="0" data-duration="${f3(DUR)}" data-track-index="2" data-volume="1"></audio>

      <!-- botón: "Lo consigues en el botón de abajo." -->
      <div class="g clip" id="cta" data-start="${f3(tBtn)}" data-duration="${f3(DUR - tBtn)}" data-track-index="7">
        <div class="btnw" id="btn-w"><div class="ring" id="ring"></div><div class="btn">${BOTON} <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg></div></div>
      </div>

${subsHtml}
      <audio id="sfx-pop" src="audio/pop.mp3" data-start="${f3(tBtn + 0.05)}" data-duration="0.72" data-track-index="11" data-volume="0.14"></audio>

      <script src="vendor/gsap.min.js"></script>
      <script>
        (function () {
          const tl = window.gsap.timeline({ paused: true });
${subsJs}
          tl.fromTo("#btn-w", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, ${f3(tBtn + 0.03)});
          tl.to("#btn-w", { y: 12, duration: 0.22, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${f3(tBoton)});
          for (let k = 0; k < 2; k++) tl.fromTo("#ring", { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.18, duration: 0.7, ease: "power2.out" }, ${f3(tBtn + 0.35)} + k * 0.75);
          window.__timelines = window.__timelines || {};
          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(here, "public", "index.html"), html);
fs.writeFileSync(path.join(here, "base-cortes.json"), JSON.stringify(cuts.map(({ file, t, end, src }) => ({ file, start: f3(t), end: f3(end), src })), null, 1));
console.log(`voz ${f3(VOZ_DUR)} s · anuncio ${f3(DUR)} s · ${blocks.length} frases · ${cuts.length} tomas de B-roll`);
cuts.forEach((c) => console.log(`  ${String(f3(c.t)).padStart(6)} → ${String(f3(c.end)).padEnd(6)} ${c.file} (desde ${c.src} s, ${f3(c.frames / FPS)} s)`));
