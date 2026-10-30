// Anuncio 08 · versión 2: voice over + B-rolls (sin los clips de la chica a cámara). Estilo UGC natural: cortes secos, casi sin gráficos.
// Pasos (todo desde aquí): 1) voz.wav = el voice over con el ritmo natural (arranque en el fotograma 0, pausas > 0,6 s → ~0,5 s)
// 2) base.mp4 = los B-rolls cortados y unidos en fotogramas exactos (1080×1920, 24 fps, sin audio)
// 3) public/index.html = subtítulos naturales (blanco con sombra, sin caja), botón "Comprar ↓" al final y marca de agua abajo al centro. Sin música (30 oct 2026, pedido del usuario).
// Uso: node build.mjs → hyperframes lint public → hyperframes render public -o ../final/… --fps 24 --quality delivery --workers 1
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
const ID = "anuncio-08-voz-en-off";
// Voz v2 (30 oct 2026): acento latino neutro, nota de voz, sin tono de comercial (prompts en ../voz/prompt-voz-v2.md).
// La v1 (Aoede, "audio voice over.wav") quedó en build-v1-voz-aoede.mjs.
const VOZ = path.join(anuncio, "voz", "voz-v2.wav");
const TRANSCRIPT = path.join(anuncio, "voz", "transcript.json");
const INICIO = 0.23;                      // primer sonido de la voz a 0,045 s (la primera palabra en el fotograma 0)
// Pausas de más de 0,6 s (silencedetect −40 dB): se quita el centro y quedan ~0,5 s.
const QUITAR = [[5.70, 6.14], [10.40, 10.60], [14.55, 15.22], [17.95, 18.31], [26.67, 27.36], [34.74, 35.70], [38.79, 39.14]];
const FIN = 41.12;                        // fin del archivo (la voz termina en 40,76)
const COLA = 0.6;                         // silencio extra al final para leer el botón

// Frases del subtítulo (en orden). Natural: frases cortas, sin palabra resaltada. "|" = salto de línea.
const PHRASES = [
  "Dormía ocho horas", "y aún así mi cara decía", "que no había dormido nada.",
  "Probé cremas caras,", "mascarillas, de todo,", "y mi piel seguía apagada,", "como sin vida,",
  "hasta que empecé a usar", "este sérum de vitamina C.", "Dos gotas cada mañana,", "nada más.",
  "Es súper ligero,", "se absorbe en segundos", "y no te deja|la piel grasosa.",
  "Hoy me miro al espejo", "y me veo despierta,", "fresca, con brillo,", "y eso que no llevo|maquillaje.",
  "Si tu piel también", "se ve cansada,", "pruébalo.", "Lo consigues en el|botón de abajo.",
];
const FIX = { serum: "sérum" };           // palabras mal transcritas

// B-rolls en orden: [archivo, palabra donde entra (o null), desde qué segundo del B-roll, altura del subtítulo, palabra siguiente (si se repite), velocidad (1 por defecto)]
// El corte cae ~0,08 s antes de la palabra. Cada B-roll acompaña lo que dice la voz.
const PLAN = [
  ["broll-01", null, 0.0, 1290],            // recién levantada, se mira cansada · "Dormía ocho horas… no había dormido nada."
  ["broll-02", "Probé", 0.0, 1290, null, 0.86], // aparta las cremas (al 86 %: esta voz es más lenta) · "Probé cremas caras… Y mi piel seguía apagada"
  ["broll-01", "como", 4.3, 1290],          // cierra los ojos, cansada · "como sin vida."
  ["broll-03", "hasta", 0.6, 1330],         // su mano toma ALBA · "Hasta que empecé a usar este sérum de vitamina C."
  ["broll-04", "Dos", 0.8, 1290],           // dos gotas · "Dos gotas cada mañana. Nada más."
  ["broll-05", "Es", 2.3, 1290],            // la textura entre los dedos · "Es súper ligero,"
  ["broll-06", "se", 0.4, 1110],            // se lo aplica en la mejilla · "se absorbe en segundos… grasosa." (subtítulo entre el mentón y el frasco)
  ["broll-06", "Hoy", 4.1, 1110],           // termina de aplicarlo · "Hoy me miro al espejo"
  ["broll-07", "y", 0.1, 1290, "me"],       // piel luminosa, sonríe · "y me veo despierta, fresca, con brillo… maquillaje."
  ["broll-08", "Si", 0.2, 250],             // el frasco y el botón · "Si tu piel también… botón de abajo."
];
const BTN_WORD = "Lo";                    // el botón entra con "Lo consigues…"
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
const cuts = PLAN.map(([file, word, src, subY, next, vel = 1], i) => {
  const t = word ? q(at(word, from, next).start - 0.08) : 0;
  from = t + 0.1;
  return { file, t, src, subY, vel };
});
cuts.forEach((c, i) => { c.end = cuts[i + 1]?.t ?? DUR; c.frames = Math.round((c.end - c.t) * FPS); });
const inputs = [], filt = [];
cuts.forEach((c, i) => {
  const srcFile = path.join(anuncio, "clips", `${c.file}.mp4`);
  const len = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", srcFile]).toString();
  if (c.src + (c.frames / FPS) * c.vel > len + 0.01) throw new Error(`${c.file}: pide ${f3(c.src + (c.frames / FPS) * c.vel)} s y dura ${f3(len)} s`);
  inputs.push("-i", srcFile);
  filt.push(`[${i}:v]trim=start=${c.src},setpts=(PTS-STARTPTS)/${c.vel},fps=${FPS},trim=end_frame=${c.frames},scale=1080:1920:flags=lanczos,setsar=1[v${i}]`);
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
const tBoton = q(at("botón", tBtn).start);

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: "InterB"; src: url("fonts/Inter-700.woff2") format("woff2"); font-weight: 700; font-display: block; }
      @font-face { font-family: "ArchivoWM"; src: url("fonts/Archivo-800.woff2") format("woff2"); font-weight: 800; font-display: block; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; }
      #stage { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #000; font-family: "InterB", sans-serif; }
      #base { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
      .g { position: absolute; z-index: 10; left: 0; top: 0; width: 1080px; height: 1920px; pointer-events: none; }
      /* subtítulo natural: frase corta, texto blanco con sombra, sin caja (el botón es la única píldora) */
      .sub { position: absolute; z-index: 20; left: 70px; right: 70px; text-align: center; pointer-events: none; }
      .sub span { display: inline-block; color: #fff; font-weight: 700; font-size: 64px; line-height: 1.18; letter-spacing: -0.3px;
        text-shadow: 0 3px 4px rgba(0,0,0,.55), 0 0 26px rgba(0,0,0,.45); }
      /* CTA: píldora naranja de la marca ALBA, con un anillo que late */
      .btnw { position: absolute; left: 50%; top: 1500px; transform: translateX(-50%); }
      .btn { position: relative; display: inline-flex; align-items: center; gap: 20px; background: #F28C28; color: #fff; font-weight: 700; font-size: 58px;
        padding: 32px 76px; border-radius: 999px; box-shadow: 0 18px 50px rgba(0,0,0,.3); white-space: nowrap; }
      .btn svg { width: 52px; height: 52px; }
      .ring { position: absolute; inset: 0; border-radius: 999px; border: 6px solid #F28C28; opacity: 0; }
      /* marca de agua de los ejemplos de la landing: abajo al centro, fija, encima de todo */
      #wm { position: absolute; left: 0; right: 0; top: 1800px; z-index: 99; display: flex; justify-content: center; align-items: center; gap: 12px; opacity: .6; pointer-events: none;
        font-family: "ArchivoWM", sans-serif; font-weight: 800; font-size: 30px; letter-spacing: 2px; color: #fff; text-shadow: 0 1px 6px rgba(0,0,0,.45); }
      #wm svg { width: 30px; height: 30px; filter: drop-shadow(0 1px 4px rgba(0,0,0,.4)); }
      #wm b { color: #C5F740; font-weight: 800; }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <video id="base" src="base.mp4" muted playsinline data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video>
      <audio id="voz" src="voz.wav" data-start="0" data-duration="${f3(DUR)}" data-track-index="2" data-volume="1"></audio>

      <!-- botón: "Lo consigues en el botón de abajo." -->
      <div class="g clip" id="cta" data-start="${f3(tBtn)}" data-duration="${f3(DUR - tBtn)}" data-track-index="7">
        <div class="btnw" id="btn-w"><div class="ring" id="ring"></div><div class="btn">Comprar <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg></div></div>
      </div>

${subsHtml}
      <div id="wm"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="#C5F740"/></svg>AVATAR <b>ADS</b> 1.0</div>
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
