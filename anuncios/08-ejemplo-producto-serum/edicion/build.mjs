// Anuncio 08 · versión 1: la chica a cámara (clips de Flow) + B-rolls. Storyboard aprobado: ../storyboard/storyboard.png
// Estilo UGC natural, igual que la versión voz en off (../edicion-voz-en-off/): cortes secos, subtítulos blancos con sombra sin caja,
// un solo botón al final, marca de agua abajo al centro y SIN música (el usuario lo pidió el 27 oct 2026).
// Antes: cortes.txt → node unir-clips.mjs → base.mp4 + base-cortes.json → hyperframes transcribe base.mp4 -l es → transcript.json
// Este script: 1) public/voz.wav = el audio de base.mp4 (tratado) · 2) public/base-video.mp4 = la imagen: tramos de ella (desde base.mp4,
// en sincronía con la voz, con un zoom distinto cuando dos tomas de ella se juntan) y tramos de B-roll · 3) public/index.html
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

const segs = JSON.parse(fs.readFileSync(path.join(here, "base-cortes.json"), "utf8"));
const S = (i) => segs[i].start;

// ───────────────────────── CONFIG ─────────────────────────
const ID = "anuncio-08-chica";
const COLA = 0.6;                         // silencio extra al final para leer el botón (sobre el B-roll del frasco)
const FIX = { "8": "ocho", serum: "sérum", consiguen: "consigues" };   // palabras mal transcritas

const PHRASES = [
  "Dormía ocho horas", "y aún así mi cara decía", "que no había dormido nada.",
  "Probé cremas caras,", "mascarillas, de todo,", "y mi piel seguía apagada,", "como sin vida,",
  "hasta que empecé a usar", "este sérum de vitamina C.", "Dos gotas cada mañana,", "nada más.",
  "Es súper ligero,", "se absorbe en segundos", "y no te deja|la piel grasosa.",
  "Hoy me miro al espejo", "y me veo despierta,", "fresca, con brillo,", "y eso que no llevo|maquillaje.",
  "Si tu piel también", "se ve cansada,", "pruébalo.", "Lo consigues en el|botón de abajo.",
];

// Tramos en orden: ["cara", entrada, zoom] o [B-roll, entrada, segundo de entrada del B-roll, altura del subtítulo].
// entrada = palabra (el corte cae ~0,08 s antes), ["palabra", "siguiente"] si se repite, o un número (segundos; S(i) = inicio de un segmento de base.mp4).
// Los cortes internos de base.mp4 (pausas recortadas) quedan siempre tapados por un B-roll o por un cambio de zoom ≥ 0,1.
const SUB_CARA = 1510;                    // debajo del frasco que ella sostiene (con zoom 1,1 el frasco baja: 1645)
const PLAN = [
  ["cara", 0, 1.0],                       // 01 hook: "Dormía ocho horas…"
  ["broll-01", "mi", 0.0, 1290],          // 02 se mira cansada: "mi cara decía que no había dormido nada."
  ["cara", S(1), 1.0],                    // 03 cuenta con los dedos: "Probé cremas caras, mascarillas,"
  ["broll-02", "de", 1.2, 1290],          // 04 aparta las cremas: "de todo, y mi piel seguía apagada,"
  ["cara", "como", 1.0],                  // 05 frustración: "como sin vida,"
  ["broll-03", "hasta", 0.6, 1330],       // 06 su mano toma ALBA: "hasta que empecé a usar"
  ["cara", "este", 1.0],                  // 07 acerca el frasco: "este sérum de vitamina C."
  ["broll-04", S(3), 0.8, 1290],          // 08 dos gotas (tapa el corte de la pausa): "Dos gotas cada mañana, nada más."
  ["broll-05", "Es", 2.3, 1290],          // 09 la textura: "Es súper ligero,"
  ["broll-06", "se", 0.4, 1110],          // 10 se lo aplica: "se absorbe en segundos"
  ["cara", ["y", "no"], 1.0],             // 11 niega con el dedo: "y no te deja la piel grasosa."
  ["cara", S(5), 1.1, 1645],                 // 12 mira a su reflejo (otro zoom: unión de clips): "Hoy me miro al espejo"
  ["broll-07", S(6), 0.1, 1290],          // 13 piel luminosa: "y me veo despierta, fresca, con brillo,"
  ["cara", ["y", "eso"], 1.0],            // 14 se señala la cara: "y eso que no llevo maquillaje."
  ["cara", S(7), 1.1, 1645],                 // 15a CTA (otro zoom: unión de clips): "Si tu piel también se ve cansada,"
  ["cara", S(8), 1.0],                    // 15b "pruébalo." (otro zoom: tapa la pausa recortada)
  ["broll-08", S(9), 0.3, 250],           // 16 el frasco + botón: "Lo consigues en el botón de abajo."
];
const BTN_WORD = "Lo";
// ────────────────────────────────────────────────────────────

const BASE_DUR = segs.at(-1).end;
const DUR = q(BASE_DUR + COLA);

// ── palabras
const raw = JSON.parse(fs.readFileSync(path.join(here, "transcript.json"), "utf8"));
const words = (Array.isArray(raw) ? raw : raw.words).map((w) => {
  const clean = w.text.replace(/[.,]/g, "").toLowerCase();
  return { text: FIX[clean] ? w.text.toLowerCase().replace(clean, FIX[clean]) : w.text, start: w.start, end: w.end };
});
const norm = (s) => s.toLowerCase().replace(/[¿?¡!.,]/g, "").normalize("NFD").replace(/[̀-ͯ]/g, "");
const at = (txt, from = 0, next) => {
  const i = words.findIndex((x, k) => x.start >= from - 0.05 && norm(x.text) === norm(txt) && (!next || norm(words[k + 1]?.text ?? "") === norm(next)));
  if (i < 0) throw new Error(`No encuentro "${txt}" desde ${from}`);
  return words[i];
};

// ── 1 · audio: el de base.mp4, tratado, con la cola en silencio
ff(["-i", path.join(here, "base.mp4"), "-vn", "-af", `highpass=f=70,acompressor=threshold=-22dB:ratio=3:attack=5:release=90:makeup=2,apad=whole_dur=${DUR}`, "-ar", "48000", "-ac", "1", path.join(here, "public", "voz.wav")]);

// ── 2 · imagen
let from = 0;
const cuts = PLAN.map(([kind, entry, a, b]) => {
  let t = typeof entry === "number" ? q(entry) : q((Array.isArray(entry) ? at(entry[0], from, entry[1]) : at(entry, from)).start - 0.08);
  const s = segs.find((x) => x.start > 0 && x.start <= t + 0.001 && x.start > t - 0.25);   // si cae justo después de un corte de base.mp4, se alinea con él
  if (s) t = s.start;
  from = t + 0.1;
  return kind === "cara" ? { kind, t, zoom: a, subY: b ?? SUB_CARA } : { kind, t, src: a, subY: b };
});
cuts.forEach((c, i) => { c.end = cuts[i + 1]?.t ?? DUR; c.frames = Math.round((c.end - c.t) * FPS); if (c.frames < 12) throw new Error(`Tramo ${i + 1} dura ${c.frames} fotogramas`); });
// ningún corte interno de base.mp4 puede verse sobre la cara
segs.slice(1).forEach((s, k) => {
  const c = cuts.find((x) => x.t <= s.start + 0.001 && x.end > s.start + 0.001);
  if (c?.kind === "cara" && Math.abs(c.t - s.start) > 0.001) throw new Error(`El corte de base.mp4 en ${f3(s.start)} s se ve sobre la cara (tramo desde ${c.t})`);
});
const inputs = [], filt = [];
cuts.forEach((c, i) => {
  if (c.kind === "cara") {
    inputs.push("-i", path.join(here, "base.mp4"));
    const crop = c.zoom === 1 ? "" : `crop=iw/${c.zoom}:ih/${c.zoom}:(iw-iw/${c.zoom})/2:(ih-ih/${c.zoom})*0.32,scale=1080:1920:flags=lanczos,`;
    filt.push(`[${i}:v]trim=start=${c.t},setpts=PTS-STARTPTS,fps=${FPS},trim=end_frame=${c.frames},${crop}setsar=1[v${i}]`);
  } else {
    const srcFile = path.join(anuncio, "clips", `${c.kind}.mp4`);
    const len = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", srcFile]).toString();
    if (c.src + c.frames / FPS > len + 0.01) throw new Error(`${c.kind}: pide ${f3(c.src + c.frames / FPS)} s y dura ${f3(len)} s`);
    inputs.push("-i", srcFile);
    filt.push(`[${i}:v]trim=start=${c.src},setpts=PTS-STARTPTS,fps=${FPS},trim=end_frame=${c.frames},scale=1080:1920:flags=lanczos,setsar=1[v${i}]`);
  }
});
// la última imagen de base.mp4 se acaba antes que la cola: el último tramo es un B-roll, así que no hace falta congelar
filt.push(`${cuts.map((_, i) => `[v${i}]`).join("")}concat=n=${cuts.length}:v=1:a=0[out]`);
ff([...inputs, "-filter_complex", filt.join(";"), "-map", "[out]", "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-pix_fmt", "yuv420p", "-r", String(FPS), path.join(here, "public", "base-video.mp4")]);

// ── 3 · subtítulos (la altura depende del tramo en pantalla)
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
const subY = (t) => [...cuts].reverse().find((c) => c.t <= t + 0.15).subY;   // la altura del tramo donde se lee la frase (no la del tramo que termina)
blocks.forEach((ws, i) => {
  const start = Math.max(0, q(ws[0].start - 0.05));
  const end = blocks[i + 1] ? q(blocks[i + 1][0].start - 0.05) : DUR;
  subsHtml += `      <div class="sub clip" id="sub-${i}" style="top:${subY(start)}px" data-start="${f3(start)}" data-duration="${f3(end - start)}" data-track-index="3"><span>${PHRASES[i].replace(/\|/g, "<br>")}</span></div>\n`;
  subsJs += `          tl.fromTo("#sub-${i} span", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" }, ${f3(start)});\n`;
});
const tBtn = q(at(BTN_WORD, cuts.at(-1).t - 0.1).start - 0.04);
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
      <video id="base" src="base-video.mp4" muted playsinline data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video>
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
const cara = cuts.filter((c) => c.kind === "cara").reduce((s, c) => s + (c.end - c.t), 0);
console.log(`anuncio ${f3(DUR)} s · ${blocks.length} frases · ${cuts.length} tramos · ella a cámara ${Math.round((cara / DUR) * 100)} %`);
cuts.forEach((c) => console.log(`  ${String(f3(c.t)).padStart(6)} → ${String(f3(c.end)).padEnd(6)} ${c.kind}${c.kind === "cara" ? ` (zoom ${c.zoom})` : ` (desde ${c.src} s)`}`));
