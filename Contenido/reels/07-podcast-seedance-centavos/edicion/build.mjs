// Construye public/index.html del reel podcast a partir de:
//   transcript.json (palabras con tiempos de base.mp4) · base-cortes.json (segmentos, alineados a fotogramas) · la CONFIG de abajo.
// Uso: node build.mjs (desde esta carpeta) → hyperframes lint public → hyperframes render public -o … --fps 24
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "transcript.json"), "utf8"));
const segs = JSON.parse(fs.readFileSync(path.join(here, "base-cortes.json"), "utf8"));
const FPS = 24;
const DUR = segs.at(-1).end;

// ── utilidades de tiempo
const q = (t) => Math.round(t * FPS) / FPS;            // al fotograma más cercano
const f3 = (n) => +n.toFixed(3);
const cut = (t) => Math.floor(t * 1000) / 1000;         // inicio de un corte (nunca después del fotograma del corte)
const ZE = 0.002;                                       // los cambios de zoom van 2 ms antes del corte → mismo fotograma
const norm = (s) => s.toLowerCase();
const at = (txt, from = 0) => {
  const w = words.find((x) => x.start >= from && norm(x.text) === norm(txt));
  if (!w) throw new Error(`No encuentro la palabra "${txt}" desde ${from}`);
  return w;
};
const S = (i) => segs[i].start;                         // inicio del segmento i (= un corte real del video)
const segOf = (t) => segs.findIndex((s) => t >= s.start && t < s.end);

// ───────────────────────── CONFIG DEL REEL ─────────────────────────
const ID = "reel-07";
// Cómo escribir en el subtítulo lo que Whisper transcribe mal (no cambia el audio).
const FIX = { "sidans,": "Seedance,", "sidans": "Seedance", "sidance": "Seedance", "posible.": "posible?", "pero": "Pero…", "guía": "GUIA" };
// Palabras que se quedan en verde después de decirlas.
const KEY = new Set(["fortuna?", "centavos", "Seedance", "53", "99%", "desconocimiento", "calidad", "GUIA"]);

// Zoom por segmento de base-cortes.json: [escala al entrar, escala al salir].
// Regla: cada corte cambia la escala (≥ 0,1 si es el mismo personaje) → parece otra cámara, no un salto.
const ZOOM = [
  [1.0, 1.04], [1.14, 1.18], [1.0, 1.1],                 // 0–2  P1 pregunta (2 = bajo el B-roll del labial y vuelve)
  [1.0, 1.05], [1.12, 1.14], [1.14, 1.18],               // 3–5  P2 sí, claro / Seedance (4 bajo B-roll)
  [1.0, 1.03],                                           // 6    P2 de hecho… (B-roll de Flow)
  [1.0, 1.05], [1.16, 1.19], [1.1, 1.12],                // 7–9  P1 pero… cómo es posible (9 bajo B-roll)
  [1.0, 1.05], [1.1, 1.12], [1.14, 1.18], [1.0, 1.04],   // 11–14 P2 el problema / 99 % (12 bajo B-roll)
  [1.16, 1.2],                                           // 15   P2 métodos económicos (barras arriba)
  [1.0, 1.05], [1.15, 1.18],                             // 16–17 P1 ¿y dónde?
  [1.0, 1.02], [1.1, 1.1], [1.0, 1.04], [1.1, 1.14],     // 18–21 P2 documento (18–19 bajo B-roll) / CTA
];
// Golpes de zoom en palabras de impacto (solo cuando se ve la cara): [palabra, desde (s), +escala]
const PUNCH = [["fortuna?", 0, 0.08], ["centavos", 0, 0.07], ["desconocimiento.", 0, 0.06], ["guía", 0, 0.06]];

// Momentos clave (todos anclados a palabras o a cortes reales)
const T = {
  b1: [S(2), at("artificial").start],                        // anuncio del labial: "anuncios hiperrealistas con inteligencia…"
  b2: [S(4), S(5)], b2logo: at("sidans,").start,              // "y tienen la misma calidad que Seedance"
  b3: [at("este", 14).start - 0.05, S(7)],                    // "este video costó solo 53 centavos" → editor de Flow + $0,53
  b3num: at("solo", at("costó").start).start, b3_53: at("53").start,
  b4: [S(9), S(10)], b4row2: at("segundo.").start,           // "casi un dólar el segundo" → comparación de costos
  b5: [S(11), S(12)], b5num: at("99%").start,                 // "el 99 % de las personas"
  b6: [S(17), S(19)],                                         // "tengo un documento donde explico todo mi proceso"
  bars: [at("métodos", at("existen").start).start - 0.1, S(15)], barsMisma: at("misma", at("existen").start).start,
  cta: [at("comente").start - 0.08, DUR], guia: at("guía").start,
};
// ────────────────────────────────────────────────────────────────────

// ── subtítulos: bloques de máx. 3 palabras, cortan en puntuación, pausa o cambio de personaje
const display = (w) => (FIX[norm(w.text)] ?? w.text).replace(/[.,]$/, "");
const chunks = [];
let cur = [];
words.forEach((w, i) => {
  const prev = words[i - 1];
  const speakerChange = prev && segs[segOf(prev.start)]?.clip !== segs[segOf(w.start)]?.clip;
  if (cur.length && (cur.length >= 3 || /[.,?]$/.test(prev.text) || w.start - prev.end > 0.3 || speakerChange)) { chunks.push(cur); cur = []; }
  cur.push(w);
});
if (cur.length) chunks.push(cur);

let subsHtml = "", subsJs = "";
chunks.forEach((c, i) => {
  const start = Math.max(0, q(c[0].start - 0.04));
  const next = chunks[i + 1];
  const end = q(next ? Math.min(next[0].start - 0.04, c.at(-1).end + 0.5) : DUR);
  const id = `sub-${i}`;
  subsHtml += `      <div class="sub clip" id="${id}" data-start="${f3(start)}" data-duration="${f3(end - start)}" data-track-index="3">` +
    c.map((w, j) => `<span id="${id}-w${j}" class="w">${display(w)}</span>`).join(" ") + `</div>\n`;
  subsJs += `          tl.fromTo("#${id}", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, ${f3(start)});\n`;
  c.forEach((w, j) => {
    subsJs += `          tl.set("#${id}-w${j}", { color: "#C5F740" }, ${f3(q(w.start))});\n`;
    const after = c[j + 1] ? q(c[j + 1].start) : end;
    if (after < end && !KEY.has(display(w))) subsJs += `          tl.set("#${id}-w${j}", { color: "#FFFFFF" }, ${f3(after)});\n`;
  });
});

// ── zooms: escala distinta en cada corte + empuje lento + golpes (sin tweens solapados)
const punches = PUNCH.map(([txt, from, add]) => ({ t: at(txt, from).start, add }));
let zoomJs = "";
segs.forEach((s, i) => {
  const [a, b] = ZOOM[i];
  const t0 = s.start, t1 = s.end;
  const lerp = (t) => a + (b - a) * ((t - t0) / (t1 - t0));
  zoomJs += `          tl.set(Z, { scale: ${a} }, ${f3(Math.max(0, t0 - ZE))});\n`;
  let t = t0, extra = 0;
  punches.filter((p) => p.t >= t0 && p.t < t1).forEach((p) => {
    const tp = q(p.t);
    if (tp > t) zoomJs += `          tl.to(Z, { scale: ${f3(lerp(tp) + extra)}, duration: ${f3(tp - t)}, ease: "none" }, ${f3(t)});\n`;
    extra += p.add;
    const tq = Math.min(tp + 0.18, t1 - 0.05);
    zoomJs += `          tl.to(Z, { scale: ${f3(lerp(tq) + extra)}, duration: ${f3(tq - tp)}, ease: "power3.out" }, ${f3(tp)});\n`;
    t = tq;
  });
  if (t1 - t > 0.06) zoomJs += `          tl.to(Z, { scale: ${f3(b + extra)}, duration: ${f3(t1 - t - 0.05)}, ease: "none" }, ${f3(t)});\n`;
});

const clip = ([a, b], track) => `data-start="${cut(a)}" data-duration="${f3(cut(b) - cut(a))}" data-track-index="${track}"`;

// ── efectos de sonido (por debajo de la voz)
const sfx = [
  ["whoosh-short", T.b1[0], 0.574, 0.18],
  ["click-soft", T.b1[0] + 0.25, 0.365, 0.35],
  ["whoosh-short", T.b2[0], 0.574, 0.18],
  ["pop", T.b2logo, 0.72, 0.32],
  ["whoosh-short", T.b3[0], 0.574, 0.18],
  ["impact-bass-1", T.b3_53, 1, 0.24],
  ["whoosh-short", T.b4[0], 0.574, 0.18],
  ["click-soft", T.b4row2, 0.365, 0.4],
  ["whoosh-short", T.b5[0], 0.574, 0.18],
  ["impact-bass-1", T.b5num, 1, 0.2],
  ["click-soft", T.bars[0], 0.365, 0.4],
  ["whoosh-short", T.b6[0], 0.574, 0.18],
  ["pop", T.cta[0], 0.72, 0.38],
  ["ping", T.guia + 0.3, f3(Math.min(1.32, DUR - q(T.guia + 0.3))), 0.28],
];
const sfxHtml = sfx.map(([n, t, d, v], i) =>
  `      <audio id="sfx-${String(i + 1).padStart(2, "0")}-${n}" src="audio/${n}.mp3" data-start="${f3(q(t))}" data-duration="${d}" data-track-index="${11 + (i % 4)}" data-volume="${v}"></audio>`).join("\n");

// ── rejilla de 100 puntos (B-roll del 99 %)
const dots = Array.from({ length: 100 }, (_, i) => `<i class="dot${i === 99 ? " off" : ""}" id="dot-${i}"></i>`).join("");

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: "Archivo"; src: url("fonts/Archivo-800.woff2") format("woff2"); font-weight: 800; font-display: block; }
      @font-face { font-family: "Inter"; src: url("fonts/Inter-700.woff2") format("woff2"); font-weight: 500 700; font-display: block; }
      @font-face { font-family: "JBM"; src: url("fonts/JetBrainsMono-500.woff2") format("woff2"); font-weight: 500; font-display: block; }
      :root { --bg: #020604; --card: #090f0b; --border: #305e4a; --accent: #c5f740; --text: #f8f8f8; --muted: #dddad7; --meta: #9f9587; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; font-family: "Inter", sans-serif; color: var(--text); }
      #stage { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #000; }
      #video-wrap { position: absolute; inset: 0; overflow: hidden; }
      #zoom { position: absolute; inset: 0; transform-origin: 50% 32%; }
      #zoom video { width: 100%; height: 100%; object-fit: cover; }
      .shade { position: absolute; inset: 0; pointer-events: none; z-index: 2;
        background: linear-gradient(180deg, rgba(2,6,4,.55) 0%, rgba(2,6,4,0) 22%, rgba(2,6,4,0) 62%, rgba(2,6,4,.62) 100%); }
      .mono { font-family: "JBM", monospace; text-transform: uppercase; }
      .tag { font-family: "JBM", monospace; font-size: 24px; letter-spacing: 5px; text-transform: uppercase; color: var(--accent); }
      .big { font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; color: var(--text); line-height: 1; letter-spacing: -1px; }
      .glow { text-shadow: 0 0 40px rgba(197,247,64,.45), 0 6px 26px rgba(0,0,0,.6); }
      .center { position: absolute; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; }
      /* subtítulos (siempre arriba de todo) */
      .sub { position: absolute; z-index: 20; left: 70px; width: 940px; top: 1395px; text-align: center; pointer-events: none;
        font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 62px; line-height: 1.12; letter-spacing: -0.5px;
        color: #fff; text-shadow: 0 4px 22px rgba(0,0,0,.75), 0 1px 3px rgba(0,0,0,.75); }
      .sub .w { display: inline-block; color: #fff; }
      /* gráficos sobre la cara (franja superior) */
      .g { position: absolute; z-index: 10; left: 0; top: 0; width: 1080px; height: 1920px; pointer-events: none; }
      /* B-roll a pantalla completa */
      .broll { position: absolute; z-index: 8; left: 0; top: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none;
        background: radial-gradient(120% 70% at 50% 0%, #0f2418 0%, var(--bg) 62%); }
      .broll.grid::after { content: ""; position: absolute; inset: 0;
        background-image: linear-gradient(rgba(48,94,74,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(48,94,74,.12) 1px, transparent 1px);
        background-size: 60px 60px; }
      .broll > .in { position: absolute; inset: 0; z-index: 1; }
      .bvid { position: absolute; z-index: 7; left: 0; top: 0; width: 1080px; height: 1920px; object-fit: cover; }
      .chip { display: inline-flex; align-items: center; gap: 14px; padding: 16px 30px; border-radius: 999px; border: 2px solid var(--accent);
        background: rgba(2,6,4,.82); font-family: "JBM", monospace; font-size: 28px; letter-spacing: 3px; color: var(--accent); white-space: nowrap; }
      .chip b { width: 14px; height: 14px; border-radius: 50%; background: var(--accent); display: block; box-shadow: 0 0 12px rgba(197,247,64,.8); }
      .card { border-radius: 30px; overflow: hidden; border: 2px solid var(--border); background: var(--card); box-shadow: 0 30px 80px rgba(0,0,0,.6); }
      /* B2: misma calidad */
      .vs { position: absolute; top: 470px; left: 70px; right: 70px; display: grid; grid-template-columns: 1fr 120px 1fr; align-items: center; }
      .vs .card { height: 660px; position: relative; }
      .vs img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .vs .lab { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px; text-align: center; background: linear-gradient(0deg, rgba(2,6,4,.92), rgba(2,6,4,0));
        font-family: "JBM", monospace; font-size: 24px; letter-spacing: 3px; color: var(--muted); }
      .vs .eq { text-align: center; font-family: "Archivo", sans-serif; font-weight: 800; font-size: 110px; color: var(--accent); text-shadow: 0 0 30px rgba(197,247,64,.5); }
      .seed { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 22px;
        background: radial-gradient(90% 60% at 50% 40%, #16261d 0%, #090f0b 70%); }
      .seed .mark { width: 120px; height: 120px; border-radius: 34px; background: linear-gradient(135deg, #f8f8f8, #9f9587); position: relative; }
      .seed .mark::after { content: ""; position: absolute; inset: 30px; border-radius: 50%; border: 10px solid #090f0b; border-right-color: transparent; transform: rotate(-30deg); }
      .seed .name { font-family: "Inter", sans-serif; font-weight: 700; font-size: 64px; letter-spacing: -1px; color: var(--text); }
      /* B3: editor de Flow */
      .flow { position: absolute; left: 50px; width: 980px; top: 520px; height: 538px; }
      .flow img { width: 100%; height: 100%; object-fit: cover; display: block; transform-origin: 50% 40%; }
      .price { position: absolute; left: 0; right: 0; top: 1110px; display: flex; flex-direction: column; align-items: center; }
      /* B4: comparación de costos */
      .rows { position: absolute; left: 80px; right: 80px; top: 470px; display: flex; flex-direction: column; gap: 34px; }
      .row { border-radius: 30px; border: 2px solid var(--border); background: rgba(9,15,11,.92); padding: 38px 46px; display: flex; justify-content: space-between; align-items: center; }
      .row .who { font-family: "JBM", monospace; font-size: 26px; letter-spacing: 4px; color: var(--meta); text-transform: uppercase; }
      .row .who em { display: block; font-style: normal; margin-top: 10px; font-family: "Inter", sans-serif; font-size: 40px; letter-spacing: 0; color: var(--text); text-transform: none; }
      .row .val { font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 92px; color: var(--text); white-space: nowrap; }
      .row .val small { font-size: 34px; color: var(--meta); font-family: "JBM", monospace; font-weight: 500; margin-left: 8px; letter-spacing: 1px; }
      .row.win { border-color: var(--accent); box-shadow: 0 0 50px rgba(197,247,64,.18); }
      .row.win .val { color: var(--accent); text-shadow: 0 0 30px rgba(197,247,64,.4); }
      /* B5: 99 de 100 */
      .dots { position: absolute; left: 190px; width: 700px; top: 640px; display: grid; grid-template-columns: repeat(10, 1fr); gap: 20px; }
      .dot { display: block; width: 46px; height: 46px; border-radius: 50%; background: #13201a; border: 2px solid #1f3328; }
      .dot.off { background: transparent; border: 2px dashed var(--meta); }
      /* B6: documento */
      .doc { position: absolute; width: 560px; height: 760px; left: 260px; top: 420px; border-radius: 26px; border: 2px solid var(--border);
        background: linear-gradient(180deg, #0d1711, #070c09); box-shadow: 0 40px 90px rgba(0,0,0,.65); padding: 56px 50px; }
      .doc.back { background: #0b130e; }
      .doc .k { font-family: "JBM", monospace; font-size: 22px; letter-spacing: 5px; color: var(--accent); }
      .doc h2 { margin: 26px 0 0; font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 64px; line-height: 1; color: var(--text); letter-spacing: -1px; }
      .doc h2 span { color: var(--accent); }
      .doc .ln { height: 14px; border-radius: 7px; background: #182a20; margin-top: 22px; }
      .doc .step { display: flex; gap: 18px; align-items: center; margin-top: 26px; font-family: "Inter"; font-size: 26px; color: var(--muted); }
      .doc .step i { width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--accent); color: var(--accent); font-style: normal; font-family: "JBM"; font-size: 20px;
        display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
      /* sobre la cara: barras y CTA */
      .bars { width: 760px; padding: 26px 34px; border-radius: 26px; border: 2px solid var(--border); background: rgba(9,15,11,.88);
        display: flex; flex-direction: column; gap: 20px; box-shadow: 0 14px 40px rgba(0,0,0,.45); }
      .bar { display: grid; grid-template-columns: 1fr auto; gap: 10px 14px; font-family: "JBM", monospace; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
      .track { grid-column: 1 / -1; height: 10px; border-radius: 6px; background: #13201a; overflow: hidden; }
      .fill { height: 100%; width: 94%; border-radius: 6px; background: var(--border); transform-origin: 0 50%; }
      .win .fill { background: var(--accent); box-shadow: 0 0 18px rgba(197,247,64,.55); }
      .cta { padding: 26px 48px; border-radius: 26px; background: var(--accent); color: #071006; font-family: "Archivo", sans-serif; font-weight: 800;
        font-stretch: 125%; font-size: 62px; letter-spacing: -0.5px; box-shadow: 0 0 60px rgba(197,247,64,.35), 0 14px 40px rgba(0,0,0,.45); }
      .dm { margin-top: 20px; padding: 14px 24px; border-radius: 22px 22px 6px 22px; border: 2px solid var(--border); background: rgba(9,15,11,.9);
        font-family: "Inter", sans-serif; font-size: 28px; color: var(--muted); display: flex; gap: 12px; align-items: center; }
      .dm b { font-family: "JBM", monospace; font-weight: 500; color: var(--accent); }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <div id="video-wrap">
        <div id="zoom"><video id="bg-video" src="input-video.mp4" playsinline data-has-audio="true" data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video></div>
        <div class="shade"></div>
      </div>

      <!-- B1 · anuncio del labial (hecho con IA) -->
      <video class="bvid clip" id="b1-vid" src="broll/labial.mp4" muted playsinline ${clip(T.b1, 6)}></video>
      <div class="g clip" id="b1" ${clip(T.b1, 7)}>
        <div class="center" style="top:150px"><div class="chip" id="b1-chip"><b></b>ANUNCIO 100% HECHO CON IA</div></div>
      </div>

      <!-- B2 · misma calidad que Seedance -->
      <div class="broll grid clip" id="b2" ${clip(T.b2, 5)}><div class="in">
        <div class="center" style="top:330px"><div class="tag" id="b2-tag">Misma calidad</div></div>
        <div class="vs">
          <div class="card" id="b2-a"><img src="broll/experto.jpg" alt=""><div class="lab">MI MÉTODO</div></div>
          <div class="eq" id="b2-eq">=</div>
          <div class="card" id="b2-b"><div class="seed"><div class="name">Seedance</div><div class="tag" style="color:var(--meta);font-size:20px;letter-spacing:3px">video con IA</div></div><div class="lab">SEEDANCE</div></div>
        </div>
      </div></div>

      <!-- B3 · editor de Google Flow + $0,53 -->
      <div class="broll grid clip" id="b3" ${clip(T.b3, 5)}><div class="in">
        <div class="center" style="top:380px"><div class="tag">Google Flow · imágenes y videos de este reel</div></div>
        <div class="flow card" id="b3-card"><img id="b3-img" src="broll/flow-editor.png" alt=""></div>
        <div class="price" id="b3-price"><div class="tag">Costo de este video</div><div class="big glow" id="b3-num" style="font-size:170px;margin-top:14px">$0,00</div></div>
      </div></div>

      <!-- B4 · Seedance ~$1/segundo vs. este video $0,53 -->
      <div class="broll grid clip" id="b4" ${clip(T.b4, 5)}><div class="in">
        <div class="center" style="top:330px"><div class="tag">Lo que cuesta</div></div>
        <div class="rows">
          <div class="row" id="b4-r1"><div class="who">Seedance<em>cada segundo de video</em></div><div class="val">~$1<small>/ s</small></div></div>
          <div class="row win" id="b4-r2"><div class="who">Este video<em>completo</em></div><div class="val">$0,53</div></div>
        </div>
      </div></div>

      <!-- B5 · 99 de cada 100 -->
      <div class="broll grid clip" id="b5" ${clip(T.b5, 5)}><div class="in">
        <div class="center" style="top:250px"><div class="big glow" id="b5-num" style="font-size:180px">0%</div>
          <div class="tag" style="margin-top:18px">usa las herramientas más caras</div></div>
        <div class="dots" style="top:610px">${dots}</div>
      </div></div>

      <!-- B6 · el documento con todo el proceso -->
      <div class="broll grid clip" id="b6" ${clip(T.b6, 5)}><div class="in">
        <div class="doc back" id="b6-back" style="transform: rotate(-7deg) translate(-70px, 20px)"></div>
        <div class="doc" id="b6-doc">
          <div class="k">GUÍA · PASO A PASO</div>
          <h2>Anuncios hiperrealistas <span>por centavos</span></h2>
          <div class="step" id="b6-s1"><i>01</i>Referencia real</div>
          <div class="step" id="b6-s2"><i>02</i>Imagen del avatar</div>
          <div class="step" id="b6-s3"><i>03</i>Animación en Flow</div>
          <div class="step" id="b6-s4"><i>04</i>Edición y subtítulos</div>
          <div class="ln" style="width:80%;margin-top:40px"></div><div class="ln" style="width:60%"></div>
        </div>
      </div></div>

      <!-- sobre la cara: barras de calidad -->
      <div class="g clip" id="g-bars" ${clip(T.bars, 4)}>
        <div class="center" style="top:130px"><div class="bars" id="bars">
          <div class="tag">Calidad</div>
          <div class="bar"><span>Herramientas caras</span><span>$$$</span><div class="track"><div class="fill" id="fill-a"></div></div></div>
          <div class="bar win"><span>Método económico</span><span style="color:var(--accent)">¢</span><div class="track"><div class="fill" id="fill-b"></div></div></div>
        </div></div>
      </div>
      <!-- CTA -->
      <div class="g clip" id="g-cta" ${clip(T.cta, 4)}>
        <div class="center" style="top:150px"><div class="cta" id="cta">Comenta GUIA</div>
          <div class="dm" id="dm"><b>GUIA</b> → te llega por DM</div></div>
      </div>

${subsHtml}
${sfxHtml}

      <script src="vendor/gsap.min.js"></script>
      <script>
        (function () {
          const tl = window.gsap.timeline({ paused: true });
          const Z = "#zoom";
          // ── zooms
${zoomJs}
          // ── subtítulos: palabra activa en verde
${subsJs}
          const pop = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.36, ease: "back.out(2)" }, t);
          const rise = (sel, t, d = 0.35) => tl.fromTo(sel, { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "power3.out" }, t);
          const settle = (sel, t, d) => tl.fromTo(sel, { scale: 1.06 }, { scale: 1, duration: d, ease: "power2.out" }, t);

          // ── B1 labial: empuje lento + chip
          tl.fromTo("#b1-vid", { scale: 1.0 }, { scale: 1.08, duration: ${f3(T.b1[1] - T.b1[0])}, ease: "none" }, ${cut(T.b1[0])});
          rise("#b1-chip", ${f3(T.b1[0] + 0.2)});
          // ── B2 misma calidad
          settle("#b2 .in", ${cut(T.b2[0])}, 0.5);
          rise("#b2-a", ${f3(T.b2[0] + 0.05)});
          pop("#b2-eq", ${f3(T.b2[0] + 0.35)});
          pop("#b2-b", ${f3(q(T.b2logo))});
          // ── B3 Flow + $0,53
          settle("#b3 .in", ${cut(T.b3[0])}, 0.5);
          tl.fromTo("#b3-img", { scale: 1.0, x: 0 }, { scale: 1.18, x: -40, duration: ${f3(T.b3[1] - T.b3[0])}, ease: "none" }, ${cut(T.b3[0])});
          rise("#b3-price", ${f3(q(T.b3num))});
          const c = { v: 0 };
          tl.to(c, { v: 53, duration: 0.7, ease: "power2.out", onUpdate: () => { document.getElementById("b3-num").textContent = "$0," + String(Math.round(c.v)).padStart(2, "0"); } }, ${f3(q(T.b3_53 - 0.25))});
          // ── B4 comparación de costos
          settle("#b4 .in", ${cut(T.b4[0])}, 0.5);
          rise("#b4-r1", ${f3(T.b4[0] + 0.05)});
          rise("#b4-r2", ${f3(q(T.b4row2))});
          // ── B5 99 de 100
          settle("#b5 .in", ${cut(T.b5[0])}, 0.5);
          const r = { v: 0 };
          tl.to(r, { v: 99, duration: 0.9, ease: "power2.out", onUpdate: () => { document.getElementById("b5-num").textContent = Math.round(r.v) + "%"; } }, ${f3(q(T.b5num))});
          for (let i = 0; i < 99; i++) tl.set("#dot-" + i, { background: "#C5F740", borderColor: "#C5F740", boxShadow: "0 0 10px rgba(197,247,64,.55)" }, ${f3(q(T.b5num))} + Math.pow(i / 98, 0.6) * 0.9);
          // ── B6 documento
          settle("#b6 .in", ${cut(T.b6[0])}, 0.5);
          rise("#b6-doc", ${f3(T.b6[0] + 0.05)}, 0.45);
          ["#b6-s1", "#b6-s2", "#b6-s3", "#b6-s4"].forEach((s, i) => rise(s, ${f3(T.b6[0] + 0.6)} + i * 0.32, 0.3));
          // ── barras sobre la cara
          rise("#bars", ${f3(q(T.bars[0]))});
          tl.fromTo("#fill-a", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, ${f3(q(T.bars[0] + 0.3))});
          tl.fromTo("#fill-b", { scaleX: 0 }, { scaleX: 0.25, duration: 0.5, ease: "power2.out" }, ${f3(q(T.bars[0] + 0.5))});
          tl.to("#fill-b", { scaleX: 1, duration: 0.6, ease: "power2.out" }, ${f3(q(T.barsMisma))});
          tl.to("#bars", { opacity: 0, duration: 0.12 }, ${f3(cut(T.bars[1]) - 0.13)});
          // ── CTA
          pop("#cta", ${f3(q(T.cta[0]))});
          tl.to("#cta", { scale: 1.06, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, ${f3(q(T.guia))});
          tl.fromTo("#dm", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${f3(q(T.guia + 0.3))});

          window.__timelines = window.__timelines || {};
          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(here, "public", "index.html"), html);
const broll = ["b1", "b2", "b3", "b4", "b5", "b6"].reduce((s, k) => s + (T[k][1] - T[k][0]), 0);
console.log(`index.html: ${chunks.length} bloques de subtítulos, ${segs.length} segmentos, ${f3(DUR)} s · B-roll ${broll.toFixed(1)} s (${Math.round((broll / DUR) * 100)} %)`);
