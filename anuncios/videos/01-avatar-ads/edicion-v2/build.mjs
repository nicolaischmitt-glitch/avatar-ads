// Construye public/index.html del anuncio de Avatar Ads (v2, estilo del reel 07 podcast) a partir de:
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

// ───────────────────────── CONFIG DEL ANUNCIO ─────────────────────────
const ID = "avatar-ads-v2";
// Cómo escribir en el subtítulo lo que la transcripción entiende mal (no cambia el audio).
const FIX = { "sidance,": "Seedance,", "avatarats": "Avatar Ads", "tres": "3" };
// Palabras que se quedan en verde después de decirlas.
const KEY = new Set(["siempre", "hiperrealistas", "problema", "Seedance", "fortuna", "Avatar Ads", "1.0", "vivo", "paso", "centavos", "inteligencia", "artificial", "ya"]);

// Zoom por segmento de base-cortes.json: [escala al entrar, escala al salir].
// Un solo personaje: cada corte alterna plano abierto (1.0) y cerrado (~1.15) → parece otra cámara, no un salto.
const ZOOM = [
  [1.0, 1.04], [1.15, 1.18],                 // 0–1  hook
  [1.0, 1.05],                               // 2    "ahora con la IA…" (B1 encima desde "anuncios")
  [1.15, 1.18], [1.0, 1.03],                 // 3–4  "gran problema" / herramientas (B2 encima desde "como")
  [1.14, 1.17],                              // 5    "por eso hemos creado…" (logo arriba)
  [1.0, 1.04], [1.14, 1.16], [1.0, 1.02],    // 6–8  en vivo (chip) / B3 encima
  [1.16, 1.18],                              // 9    "por centavos"
  [1.0, 1.05], [1.12, 1.14],                 // 10–11 aprenderás… (B4 encima desde "que las personas")
  [1.0, 1.04], [1.12, 1.15],                 // 12–13 3 días / CTA
];
// Golpes de zoom en palabras de impacto (solo cuando se ve la cara): [palabra, desde (s), +escala]
const PUNCH = [["siempre,", 0, 0.07], ["atrás.", 0, 0.06], ["problema.", 0, 0.07], ["Avatarats", 0, 0.04], ["centavos.", 0, 0.06], ["ya.", 0, 0.05]];

// Momentos clave (anclados a palabras o a cortes reales)
const T = {
  b1: [at("anuncios", 6).start - 0.05, S(3)],                  // "anuncios hiperrealistas…" → mosaico de anuncios hechos con IA
  b2: [at("como").start - 0.04, S(5)],                          // "como Seedance, cuestan una fortuna, hasta un dólar por segundo"
  b2seed: at("sidance,").start, b2run: at("cuestan").start, b2usd: at("dólar").start,
  logo: [at("avatarats").start - 0.08, S(6)],                   // "el taller Avatar Ads 1.0"
  vivo: [at("100%").start - 0.05, S(7)],                        // "un taller 100% en vivo"
  b3: [at("sistema").start - 0.25, S(9)],                       // "el sistema paso a paso para crear anuncios hiperrealistas"
  b3steps: [at("sistema").start, at("paso").start, at("paso", at("a", 24).start).start, at("crear", 25).start],
  b4: [at("que", 31).start - 0.05, S(12)],                      // "que las personas ni siquiera se cuestionen si es IA"
  b4ia: at("inteligencia").start,
  dias: [S(12), DUR],                                           // "Serán 3 días de taller"
  cta: [at("así", 36).start - 0.05, DUR], ya: at("ya.").start,
};
// ────────────────────────────────────────────────────────────────────

// ── subtítulos: bloques de máx. 3 palabras, cortan en puntuación o pausa
const display = (w) => (FIX[norm(w.text)] ?? w.text).replace(/[.,]$/, "");
const chunks = [];
let cur = [];
words.forEach((w, i) => {
  const prev = words[i - 1];
  if (cur.length && (cur.length >= 3 || /[.,?]$/.test(prev.text) || w.start - prev.end > 0.3)) { chunks.push(cur); cur = []; }
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
  ["click-soft", T.b1[0] + 0.3, 0.365, 0.35],
  ["whoosh-short", T.b2[0], 0.574, 0.18],
  ["pop", T.b2seed, 0.72, 0.32],
  ["impact-bass-1", T.b2usd, 1, 0.24],
  ["sparkle", T.logo[0], 1.2, 0.22],
  ["pop", T.logo[0] + 0.05, 0.72, 0.3],
  ["click-soft", T.vivo[0], 0.365, 0.4],
  ["whoosh-short", T.b3[0], 0.574, 0.18],
  ...T.b3steps.map((t) => ["click-soft", t, 0.365, 0.3]),
  ["whoosh-short", T.b4[0], 0.574, 0.18],
  ["impact-bass-1", T.b4ia, 1, 0.22],
  ["pop", T.dias[0] + 0.05, 0.72, 0.3],
  ["pop", T.cta[0], 0.72, 0.38],
  ["ping", T.ya + 0.25, f3(Math.min(1.32, DUR - q(T.ya + 0.25))), 0.28],
];
const sfxHtml = sfx.map(([n, t, d, v], i) =>
  `      <audio id="sfx-${String(i + 1).padStart(2, "0")}-${n}" src="audio/${n}.mp3" data-start="${f3(q(t))}" data-duration="${d}" data-track-index="${11 + (i % 4)}" data-volume="${v}"></audio>`).join("\n");

// ── mosaico de anuncios hechos con IA (B1)
const tiles = ["airpods", "skincare", "suplemento", "podcast"];
const tilesHtml = tiles.map((n, i) =>
  `<div class="tile card" id="b1-t${i}"><video class="clip" id="b1-v${i}" src="broll/${n}.mp4" muted playsinline ${clip(T.b1, 20 + i)}></video></div>`).join("\n          ");

// ── pasos del sistema (B3)
const steps = [
  ["Referencia real", "un video UGC de redes"],
  ["Imagen del avatar", "cambias solo al personaje"],
  ["Animación en Flow", "prompt JSON estructurado"],
  ["Edición", "ritmo · subtítulos · CTA"],
];
const stepsHtml = steps.map(([t, s], i) =>
  `<div class="step" id="b3-s${i}"><i>0${i + 1}</i><div><b>${t}</b><span>${s}</span></div></div>`).join("\n          ");

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
      .broll.grid::after { content: ""; position: absolute; inset: 0; z-index: 0;
        background-image: linear-gradient(rgba(48,94,74,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(48,94,74,.12) 1px, transparent 1px);
        background-size: 60px 60px; }
      .broll > .in { position: absolute; inset: 0; z-index: 1; }
      .bvid { position: absolute; z-index: 7; left: 0; top: 0; width: 1080px; height: 1920px; object-fit: cover; }
      .chip { display: inline-flex; align-items: center; gap: 14px; padding: 16px 30px; border-radius: 999px; border: 2px solid var(--accent);
        background: rgba(2,6,4,.86); font-family: "JBM", monospace; font-size: 28px; letter-spacing: 3px; color: var(--accent); white-space: nowrap; }
      .chip b { width: 14px; height: 14px; border-radius: 50%; background: var(--accent); display: block; box-shadow: 0 0 12px rgba(197,247,64,.8); }
      .chip.live b { background: #ff4d4d; box-shadow: 0 0 12px rgba(255,77,77,.8); }
      .card { border-radius: 30px; overflow: hidden; border: 2px solid var(--border); background: var(--card); box-shadow: 0 30px 80px rgba(0,0,0,.6); }
      /* B1: mosaico */
      .mosaic { position: absolute; left: 209px; top: 215px; width: 662px; display: grid; grid-template-columns: 320px 320px; gap: 22px; }
      .tile { width: 320px; height: 569px; border-radius: 24px; position: relative; }
      .tile video { width: 100%; height: 100%; object-fit: cover; display: block; }
      /* B2: lo que cuesta Seedance */
      .seedrow { position: absolute; left: 80px; right: 80px; top: 470px; border-radius: 30px; border: 2px solid var(--border); background: rgba(9,15,11,.92);
        padding: 38px 46px; display: flex; align-items: center; gap: 30px; }
      .seedrow .mark { width: 96px; height: 96px; border-radius: 28px; background: linear-gradient(135deg, #f8f8f8, #9f9587); position: relative; flex: 0 0 auto; }
      .seedrow .mark::after { content: ""; position: absolute; inset: 24px; border-radius: 50%; border: 9px solid #090f0b; border-right-color: transparent; transform: rotate(-30deg); }
      .seedrow .name { font-family: "Inter", sans-serif; font-weight: 700; font-size: 60px; letter-spacing: -1px; color: var(--text); }
      .seedrow .name small { display: block; margin-top: 6px; font-family: "JBM", monospace; font-weight: 500; font-size: 24px; letter-spacing: 3px; color: var(--meta); text-transform: uppercase; }
      .meter { position: absolute; left: 0; right: 0; top: 780px; display: flex; flex-direction: column; align-items: center; }
      .meter .unit { font-family: "JBM", monospace; font-size: 30px; letter-spacing: 4px; color: var(--meta); text-transform: uppercase; margin-top: 18px; }
      /* logo sobre la cara */
      .logo { padding: 26px 46px; border-radius: 30px; background: rgba(2,6,4,.9); border: 2px solid var(--border); isolation: isolate;
        box-shadow: 0 0 60px rgba(197,247,64,.2), 0 14px 40px rgba(0,0,0,.45); }
      .logo img { display: block; width: 520px; height: auto; mix-blend-mode: screen; }
      /* B3: el sistema paso a paso */
      .steps { position: absolute; left: 90px; right: 90px; top: 430px; display: flex; flex-direction: column; gap: 26px; }
      .step { display: flex; gap: 30px; align-items: center; padding: 30px 40px; border-radius: 28px; border: 2px solid var(--border); background: rgba(9,15,11,.92); }
      .step i { width: 76px; height: 76px; border-radius: 50%; border: 3px solid var(--accent); color: var(--accent); font-style: normal; font-family: "JBM"; font-size: 30px;
        display: flex; align-items: center; justify-content: center; flex: 0 0 auto; }
      .step b { display: block; font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 46px; letter-spacing: -0.5px; color: var(--text); }
      .step span { display: block; margin-top: 8px; font-family: "JBM", monospace; font-size: 24px; letter-spacing: 2px; color: var(--meta); text-transform: uppercase; }
      /* días y CTA */
      .days { display: flex; gap: 18px; }
      .day { padding: 16px 26px; border-radius: 22px; border: 2px solid var(--border); background: rgba(9,15,11,.9); text-align: center;
        font-family: "JBM", monospace; font-size: 22px; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; }
      .day b { display: block; font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 34px; letter-spacing: 0; color: var(--text); margin-bottom: 4px; }
      .day.bonus { border-color: var(--accent); }
      .day.bonus b { color: var(--accent); }
      .cta { margin-top: 26px; padding: 26px 48px; border-radius: 26px; background: var(--accent); color: #071006; font-family: "Archivo", sans-serif; font-weight: 800;
        font-stretch: 125%; font-size: 56px; letter-spacing: -0.5px; white-space: nowrap; box-shadow: 0 0 60px rgba(197,247,64,.35), 0 14px 40px rgba(0,0,0,.45); }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <div id="video-wrap">
        <div id="zoom"><video id="bg-video" src="input-video.mp4" playsinline data-has-audio="true" data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video></div>
        <div class="shade"></div>
      </div>

      <!-- B1 · mosaico de anuncios hechos con IA -->
      <div class="broll grid clip" id="b1" ${clip(T.b1, 5)}><div class="in">
        <div class="center" style="top:120px"><div class="chip" id="b1-chip"><b></b>ANUNCIOS 100% HECHOS CON IA</div></div>
        <div class="mosaic">
          ${tilesHtml}
        </div>
      </div></div>

      <!-- B2 · Seedance cuesta ~$1 por segundo -->
      <div class="broll grid clip" id="b2" ${clip(T.b2, 5)}><div class="in">
        <div class="center" style="top:360px"><div class="tag">Lo que cuesta</div></div>
        <div class="seedrow" id="b2-row"><div class="mark"></div><div class="name">Seedance<small>video con IA</small></div></div>
        <div class="meter" id="b2-meter"><div class="big glow" id="b2-num" style="font-size:230px">$0,00</div><div class="unit">por cada segundo de video</div></div>
      </div></div>

      <!-- logo sobre la cara -->
      <div class="g clip" id="g-logo" ${clip(T.logo, 4)}>
        <div class="center" style="top:120px"><div class="logo" id="logo"><img src="broll/logo-avatar-ads.webp" alt="Avatar Ads 1.0"></div></div>
      </div>

      <!-- chip EN VIVO sobre la cara -->
      <div class="g clip" id="g-vivo" ${clip(T.vivo, 4)}>
        <div class="center" style="top:150px"><div class="chip live" id="vivo"><b></b>EN VIVO · 26–28 OCT · 7 PM (EC)</div></div>
      </div>

      <!-- B3 · el sistema paso a paso -->
      <div class="broll grid clip" id="b3" ${clip(T.b3, 5)}><div class="in">
        <div class="center" style="top:330px"><div class="tag">El sistema · paso a paso</div></div>
        <div class="steps">
          ${stepsHtml}
        </div>
      </div></div>

      <!-- B4 · ¿real o IA? (anuncio del labial) -->
      <video class="bvid clip" id="b4-vid" src="broll/labial-full.mp4" muted playsinline ${clip(T.b4, 6)}></video>
      <div class="g clip" id="b4" ${clip(T.b4, 7)}>
        <div class="center" style="top:150px"><div class="chip" id="b4-q"><b></b>¿REAL O IA?</div></div>
        <div class="center" style="top:150px"><div class="chip" id="b4-a" style="opacity:0"><b></b>100% HECHO CON IA</div></div>
      </div>

      <!-- 3 días + CTA -->
      <div class="g clip" id="g-end" ${clip(T.dias, 4)}>
        <div class="center" style="top:120px">
          <div class="days">
            <div class="day" id="d1"><b>DÍA 1</b>LUN 26</div>
            <div class="day" id="d2"><b>DÍA 2</b>MAR 27</div>
            <div class="day bonus" id="d3"><b>DÍA 3</b>BONO · MIÉ 28</div>
          </div>
          <div class="cta" id="cta" style="opacity:0">Reserva tu puesto · $27</div>
        </div>
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

          // ── B1 mosaico
          settle("#b1 .in", ${cut(T.b1[0])}, 0.5);
          rise("#b1-chip", ${f3(T.b1[0] + 0.1)});
          [0, 1, 2, 3].forEach((i) => pop("#b1-t" + i, ${f3(T.b1[0] + 0.05)} + i * 0.12));
          tl.fromTo(".mosaic", { scale: 1.0 }, { scale: 1.05, duration: ${f3(T.b1[1] - T.b1[0])}, ease: "none" }, ${cut(T.b1[0])});
          // ── B2 Seedance: el contador sube hasta $1 por segundo
          settle("#b2 .in", ${cut(T.b2[0])}, 0.5);
          pop("#b2-row", ${f3(q(T.b2seed) - 0.1)});
          rise("#b2-meter", ${f3(q(T.b2run))});
          const c = { v: 0 };
          tl.to(c, { v: 100, duration: ${f3(T.b2usd - T.b2run)}, ease: "power1.in", onUpdate: () => { const v = Math.round(c.v); document.getElementById("b2-num").textContent = "$" + Math.floor(v / 100) + "," + String(v % 100).padStart(2, "0"); } }, ${f3(q(T.b2run))});
          tl.fromTo("#b2-num", { scale: 1 }, { scale: 1.12, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, ${f3(q(T.b2usd))});
          tl.set("#b2-num", { color: "#C5F740" }, ${f3(q(T.b2usd))});
          // ── logo
          pop("#logo", ${f3(q(T.logo[0]))});
          tl.to("#logo", { opacity: 0, duration: 0.12 }, ${f3(cut(T.logo[1]) - 0.13)});
          // ── EN VIVO
          rise("#vivo", ${f3(q(T.vivo[0]))});
          tl.to("#vivo", { opacity: 0, duration: 0.12 }, ${f3(cut(T.vivo[1]) - 0.13)});
          // ── B3 pasos
          settle("#b3 .in", ${cut(T.b3[0])}, 0.5);
          ${JSON.stringify(T.b3steps.map(q))}.forEach((t, i) => {
            rise("#b3-s" + i, t, 0.3);
            tl.to("#b3-s" + i, { borderColor: "#C5F740", boxShadow: "0 0 40px rgba(197,247,64,.18)", duration: 0.2 }, t + 0.15);
          });
          // ── B4 ¿real o IA?
          tl.fromTo("#b4-vid", { scale: 1.0 }, { scale: 1.08, duration: ${f3(T.b4[1] - T.b4[0])}, ease: "none" }, ${cut(T.b4[0])});
          pop("#b4-q", ${f3(T.b4[0] + 0.15)});
          tl.to("#b4-q", { opacity: 0, scale: 0.8, duration: 0.12 }, ${f3(q(T.b4ia) - 0.08)});
          pop("#b4-a", ${f3(q(T.b4ia))});
          // ── 3 días + CTA
          ["#d1", "#d2", "#d3"].forEach((s, i) => rise(s, ${f3(T.dias[0] + 0.05)} + i * 0.12, 0.3));
          pop("#cta", ${f3(q(T.cta[0]))});
          tl.to("#cta", { scale: 1.06, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, ${f3(q(T.ya))});

          window.__timelines = window.__timelines || {};
          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(here, "public", "index.html"), html);
const broll = ["b1", "b2", "b3", "b4"].reduce((s, k) => s + (T[k][1] - T[k][0]), 0);
console.log(`index.html: ${chunks.length} bloques de subtítulos, ${segs.length} segmentos, ${f3(DUR)} s · B-roll ${broll.toFixed(1)} s (${Math.round((broll / DUR) * 100)} %)`);
