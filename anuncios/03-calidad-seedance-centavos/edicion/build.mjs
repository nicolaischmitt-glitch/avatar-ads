// Construye public/index.html del anuncio 03 (talking head de una toma + B-rolls) a partir de:
//   transcript.json (palabras con tiempos de base.mp4) · base-cortes.json (segmentos, alineados a fotogramas) · la CONFIG de abajo.
// Uso: node build.mjs (desde esta carpeta) → hyperframes lint public → hyperframes render public -o … --fps 24
// Basado en el build.mjs del reel 07 (mismo vocabulario visual). Storyboard: ../moodboard/storyboard-anuncio-03.png
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
const norm = (s) => s.toLowerCase().replace(/[¿?¡!.,]/g, "");
const at = (txt, from = 0) => {
  const w = words.find((x) => x.start >= from - 0.05 && norm(x.text) === norm(txt));
  if (!w) throw new Error(`No encuentro la palabra "${txt}" desde ${from}`);
  return w;
};
const S = (i) => segs[i].start;                         // inicio del segmento i (= un corte real del video)
const E = (i) => segs[i].end;

// ───────────────────────── CONFIG DEL ANUNCIO ─────────────────────────
const ID = "anuncio-03";
// Cómo escribir en el subtítulo lo que la transcripción escribe mal (no cambia el audio).
const FIX = { "seedance,": "Seedance", "seans": "Seedance", "sidans": "Seedance", "sidance": "Seedance", "sidans,": "Seedance", "mí,": "mí", "ads": "Ads" };
// Palabras que se quedan en verde después de decirlas.
const KEY = new Set(["hiperrealistas", "centavos?", "centavos", "Seedance", "70", "67", "20", "minutos", "ganadores", "escalar", "botón"]);

// Segmentos de base-cortes.json (17):
//  0 c1 · ¿Y si pudieras… pero por centavos?
//  1 c2 · Para que te des una idea… en alta calidad      2 c2 · te puede costar casi 70 centavos
//  3 c3 · En cambio, a mí   4 c3 · mi creador, me creó por apenas 67 centavos   5 c3 · y en solo 20 minutos
//  6 c4 · Los anuncios… muchos más anuncios   7 c4 · y encontrar a los ganadores mucho más rápido
//  8 c5 · Y ese es el secreto   9 c5 · para escalar   10 c5 · Estos anuncios escalan productos digitales   11 c5 · y también servicios tradicionales
// 12 c6 · Si quieres aprender a hacerlo   13 c6 · únete al taller de Avatar Ads   14 c6 · dos días en vivo   15 c6 · paso a paso   16 c6 · Reserva tu lugar… + cola
// Zoom por segmento: [escala al entrar, escala al salir]. Cada corte cambia la escala ≥ 0,1 (parece otra cámara, no un salto).
const ZOOM = [
  [1.0, 1.1],                                            // 0  hook (S3 encoge el video a la tarjeta)
  [1.0, 1.05], [1.12, 1.16],                             // 1 cara → cronómetro · 2 cara + $0,68
  [1.0, 1.04], [1.18, 1.2], [1.0, 1.04],                 // 3 cara "a mí" · 4 "mi creador" → galería · 5 cara 20 min
  [1.0, 1.08], [1.12, 1.14],                             // 6 cara → íconos · 7 ganadores → cara en "mucho más rápido"
  [1.0, 1.03], [1.14, 1.18],                             // 8–9 cara + curva
  [1.0, 1.02], [1.1, 1.1],                               // 10–11 pruebas (bajo B-roll)
  [1.0, 1.04], [1.14, 1.17], [1.02, 1.04], [1.14, 1.16], [1.0, 1.1], // 12–16
];
// Golpes de zoom en palabras de impacto (solo cuando se ve la cara): [palabra, desde (s), +escala]
const PUNCH = [["pudieras", 0, 0.08], ["mí", S(3), 0.06], ["minutos", S(5), 0.06], ["escalar", S(8), 0.07], ["botón", S(16), 0.08]];

// Momentos clave (anclados a palabras o a cortes reales)
const wSi = at("si", 0);
const T = {
  ads: [at("anuncios").start - 0.04, at("con").start - 0.02],     // S2 · nuestros anuncios
  vs: [at("con").start - 0.02, E(0)], vsSeed: at("seedance", 0).start, // S3 · misma calidad (el video del avatar se encoge a la tarjeta)
  watch: [at("segundo", S(1)).start - 0.06, S(2)], watchSeg: at("segundo", S(1)).start, // S4 · cronómetro
  c68: [S(2), E(2)], c68num: at("70", S(2)).start,                // S5 · cara + $0,68
  chip100: [S(3), E(3)],                                          // S6 · chip 100 % IA
  gal: [at("me", S(4)).start - 0.04, S(5)], gal67: at("67", S(4)).start,                 // S7 · galería + $0,67
  chip20: [S(5), E(5)],                                           // S8 · chip 20 min
  icons: [at("testear", S(6)).start - 0.04, S(7)], iconsMas: at("muchos", S(6)).start,
  win: [S(7), at("mucho", S(7)).start - 0.04], winGan: at("ganadores", S(7)).start,          // S11 · ganadores
  curve: [S(8), S(10)],                                           // S12 · cara + curva
  hot: [S(10), S(11)],                                            // S13 · Hotmart
  chat: [S(11), S(12)],                                           // S14 · chat del cliente
  logo: [S(13), S(14)],                                           // logo sobre la cara
  days: [S(14), S(16)], days2: S(15),                             // S15 · cara + días
  cta: [S(16), DUR], boton: at("botón", S(16)).start,              // S16 · logo + botón
};
// ────────────────────────────────────────────────────────────────────

// ── subtítulos: bloques de máx. 3 palabras, cortan en puntuación o pausa
const display = (w) => (FIX[w.text.toLowerCase()] ?? w.text).replace(/[.,]$/, "");
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
const N_ADS = 30, WINNERS = [2, 7, 11, 14, 19, 23, 27];
const sfx = [
  ["whoosh-short", T.ads[0], 0.574, 0.18],
  ["whoosh-short", T.vs[0], 0.574, 0.16],
  ["pop", T.vsSeed, 0.72, 0.3],
  ["whoosh-short", T.watch[0], 0.574, 0.18],
  ["click-soft", T.watchSeg, 0.365, 0.4],
  ["click-soft", T.watchSeg + 0.5, 0.365, 0.35],
  ["impact-bass-1", T.c68num, 1, 0.22],
  ["pop", T.chip100[0] + 0.05, 0.72, 0.28],
  ["whoosh-short", T.gal[0], 0.574, 0.18],
  ["impact-bass-1", T.gal67, 1, 0.24],
  ["pop", T.chip20[0] + 0.05, 0.72, 0.28],
  ["whoosh-short", T.icons[0], 0.574, 0.18],
  ["typing", T.iconsMas - 0.1, 1.2, 0.22],
  ...WINNERS.map((_, k) => ["ping", T.win[0] + 0.15 + k * 0.13, 0.6, 0.12]),
  ["click-soft", T.curve[0] + 0.05, 0.365, 0.35],
  ["whoosh-short", T.hot[0], 0.574, 0.18],
  ["whoosh-short", T.chat[0], 0.574, 0.18],
  ["pop", T.logo[0] + 0.05, 0.72, 0.28],
  ["click-soft", T.days[0] + 0.05, 0.365, 0.35],
  ["pop", T.cta[0] + 0.1, 0.72, 0.38],
  ["chime", T.boton, 1, 0.22],
];
const sfxHtml = sfx.map(([n, t, d, v], i) =>
  `      <audio id="sfx-${String(i + 1).padStart(2, "0")}-${n}" src="audio/${n}.mp3" data-start="${f3(q(t))}" data-duration="${f3(Math.min(d, DUR - q(t)))}" data-track-index="${11 + (i % 4)}" data-volume="${v}"></audio>`).join("\n");

// ── cuadrícula de anuncios (S10–S11)
const adsHtml = Array.from({ length: N_ADS }, (_, i) => `<i class="adi" id="ad-${i}"><b class="wl" id="wl-${i}"><span>WIN</span></b></i>`).join("");

// ── tarjetas de nuestros anuncios (S2): videos reales, posición fija
const ADV = ["labial", "airpods", "suplemento"];
const advHtml = ADV.map((v, i) =>
  `      <video class="advid clip" id="adv-${i}" src="broll/ad-${v}.mp4" muted playsinline style="left:${70 + i * 324}px" ${clip(T.ads, 9)}></video>`).join("\n");

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
      #video-wrap { position: absolute; inset: 0; overflow: hidden; z-index: 1; transform-origin: 0 0; }
      #zoom { position: absolute; inset: 0; transform-origin: 50% 32%; }
      #zoom video { width: 100%; height: 100%; object-fit: cover; }
      .shade { position: absolute; inset: 0; pointer-events: none; z-index: 2;
        background: linear-gradient(180deg, rgba(2,6,4,.55) 0%, rgba(2,6,4,0) 22%, rgba(2,6,4,0) 62%, rgba(2,6,4,.62) 100%); }
      .tag { font-family: "JBM", monospace; font-size: 26px; letter-spacing: 5px; text-transform: uppercase; color: var(--accent); }
      .src { font-family: "JBM", monospace; font-size: 22px; letter-spacing: 3px; color: var(--meta); text-transform: uppercase; }
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
      .broll.back { z-index: 0; }
      .broll.grid::after { content: ""; position: absolute; inset: 0;
        background-image: linear-gradient(rgba(48,94,74,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(48,94,74,.12) 1px, transparent 1px);
        background-size: 60px 60px; }
      .broll > .in { position: absolute; inset: 0; z-index: 1; }
      .chip { display: inline-flex; align-items: center; gap: 14px; padding: 16px 30px; border-radius: 999px; border: 2px solid var(--accent);
        background: rgba(2,6,4,.82); font-family: "JBM", monospace; font-size: 28px; letter-spacing: 3px; color: var(--accent); white-space: nowrap; }
      .chip b { width: 14px; height: 14px; border-radius: 50%; background: var(--accent); display: block; box-shadow: 0 0 12px rgba(197,247,64,.8); }
      .card { border-radius: 30px; overflow: hidden; border: 2px solid var(--border); background: var(--card); box-shadow: 0 30px 80px rgba(0,0,0,.6); }
      .card img { width: 100%; height: 100%; object-fit: cover; display: block; }
      /* S2: nuestros anuncios (videos en tarjetas) */
      .advid { position: absolute; z-index: 9; top: 420px; width: 292px; height: 520px; object-fit: cover; border-radius: 26px; border: 2px solid var(--border);
        box-shadow: 0 30px 80px rgba(0,0,0,.6); }
      /* S3: misma calidad (la tarjeta de la izquierda es el propio video, encogido) */
      .vsframe { position: absolute; z-index: 9; left: 60px; top: 440px; width: 435px; height: 773px; border-radius: 30px; border: 2px solid var(--border); }
      .vsframe .lab { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px; text-align: center; border-radius: 0 0 28px 28px;
        background: linear-gradient(0deg, rgba(2,6,4,.92), rgba(2,6,4,0)); font-family: "JBM", monospace; font-size: 24px; letter-spacing: 3px; color: var(--muted); }
      .live { position: absolute; top: 20px; left: 20px; display: flex; gap: 10px; align-items: center; padding: 8px 14px; border-radius: 999px; background: rgba(2,6,4,.75);
        font-family: "JBM", monospace; font-size: 20px; letter-spacing: 2px; color: var(--accent); }
      .live i { width: 12px; height: 12px; border-radius: 50%; background: var(--accent); display: block; }
      .eq { position: absolute; z-index: 9; left: 495px; width: 90px; top: 760px; text-align: center; font-family: "Archivo", sans-serif; font-weight: 800; font-size: 110px;
        color: var(--accent); text-shadow: 0 0 30px rgba(197,247,64,.5); }
      .seedcard { position: absolute; z-index: 9; left: 585px; top: 440px; width: 435px; height: 773px; }
      .seed { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 22px;
        background: radial-gradient(90% 60% at 50% 40%, #16261d 0%, #090f0b 70%); }
      .seed .name { font-family: "Inter", sans-serif; font-weight: 700; font-size: 64px; letter-spacing: -1px; color: var(--text); }
      .seedcard .lab { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px; text-align: center; font-family: "JBM", monospace; font-size: 24px; letter-spacing: 3px; color: var(--muted); }
      /* S4: cronómetro */
      .watch { position: relative; width: 560px; height: 560px; }
      .watch svg { position: absolute; inset: 0; }
      .watch .t { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
      /* tarjeta pequeña sobre la cara */
      .mcard { width: 820px; padding: 28px 40px; border-radius: 30px; border: 2px solid var(--border); background: rgba(9,15,11,.9); box-shadow: 0 14px 40px rgba(0,0,0,.45); text-align: center; }
      /* S7: galería */
      .gal { position: absolute; left: 50px; width: 980px; top: 470px; height: 464px; }
      .gal img { object-position: top left; transform-origin: 30% 30%; }
      /* S10–S11: íconos de anuncio */
      .ads { position: absolute; left: 70px; right: 70px; top: 640px; display: grid; grid-template-columns: repeat(10, 1fr); gap: 16px; }
      .adi { display: flex; align-items: center; justify-content: center; aspect-ratio: 9 / 16; border-radius: 14px; border: 2px solid var(--border);
        background: linear-gradient(180deg, #102018, #090f0b); position: relative; }
      .adi::before { content: ""; width: 0; height: 0; border-left: 22px solid var(--meta); border-top: 14px solid transparent; border-bottom: 14px solid transparent; margin-left: 5px; }
      .adi::after { content: "AD"; position: absolute; top: 7px; left: 7px; font-family: "JBM", monospace; font-size: 14px; letter-spacing: 1px; color: var(--meta);
        border: 1.5px solid var(--border); border-radius: 5px; padding: 0 5px; }
      .wl { position: absolute; inset: -2px; border-radius: 14px; border: 3px solid var(--accent); background: linear-gradient(180deg, rgba(197,247,64,.28), rgba(197,247,64,.08));
        box-shadow: 0 0 36px rgba(197,247,64,.6); opacity: 0; font-family: "JBM", monospace; font-weight: 500; font-size: 14px; letter-spacing: 1px; color: #071006;
        display: flex; align-items: flex-start; justify-content: flex-start; padding: 6px; }
      .wl span { background: var(--accent); border-radius: 4px; padding: 0 5px; }
      .swap { position: relative; height: 160px; width: 1000px; }
      .swap > div { position: absolute; left: 0; right: 0; text-align: center; }
      /* S13–S14: teléfono */
      .phone { position: absolute; left: 260px; top: 300px; width: 560px; height: 1060px; border-radius: 56px; border: 10px solid #1a2a21; background: #000;
        overflow: hidden; box-shadow: 0 40px 100px rgba(0,0,0,.7), 0 0 0 2px var(--border); }
      .phone img, .phone video { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
      #chat-phone { background: #0b141a; }
      #chat-img { object-fit: contain; object-position: top; transform-origin: 40% 75%; }
      .zoomtag { position: absolute; right: 70px; padding: 16px 24px; border-radius: 22px; background: rgba(2,6,4,.92); border: 2px solid var(--accent);
        font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 60px; color: var(--accent); box-shadow: 0 0 40px rgba(197,247,64,.3); }
      /* S15: días */
      .mdays { display: flex; gap: 22px; }
      .mday { padding: 22px 30px; border-radius: 24px; border: 2px solid var(--border); background: rgba(9,15,11,.9); display: flex; gap: 20px; align-items: center; box-shadow: 0 14px 40px rgba(0,0,0,.45); }
      .mday .n { font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 80px; color: var(--accent); line-height: .9; }
      .mday .t { font-family: "JBM", monospace; font-size: 22px; letter-spacing: 3px; color: var(--meta); text-transform: uppercase; }
      .mday .t em { display: block; font-style: normal; margin-top: 6px; font-family: "Inter"; font-weight: 700; font-size: 32px; letter-spacing: 0; color: var(--text); text-transform: none; }
      .rec { display: inline-flex; gap: 14px; align-items: center; }
      .rec i { width: 16px; height: 16px; border-radius: 50%; background: #e5484d; display: block; box-shadow: 0 0 14px rgba(229,72,77,.8); }
      /* S16: logo + botón */
      .logo { width: 520px; mix-blend-mode: screen; }
      .cta { padding: 28px 52px; border-radius: 26px; background: var(--accent); color: #071006; font-family: "Archivo", sans-serif; font-weight: 800;
        font-stretch: 125%; font-size: 64px; letter-spacing: -0.5px; box-shadow: 0 0 60px rgba(197,247,64,.35), 0 14px 40px rgba(0,0,0,.45); }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <!-- fondo de la escena 3 (detrás del video encogido) -->
      <div class="broll back grid clip" id="vs-bg" ${clip(T.vs, 2)}><div class="in">
        <div class="center" style="top:330px"><div class="tag">Misma calidad</div></div>
      </div></div>

      <div id="video-wrap">
        <div id="zoom"><video id="bg-video" src="input-video.mp4" playsinline data-has-audio="true" data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video></div>
        <div class="shade" id="shade"></div>
      </div>

      <!-- S2 · nuestros anuncios hechos con IA -->
      <div class="broll grid clip" id="ads-bg" ${clip(T.ads, 5)}><div class="in">
        <div class="center" style="top:290px"><div class="chip" id="ads-chip"><b></b>100% HECHOS CON IA</div></div>
      </div></div>
${advHtml}

      <!-- S3 · misma calidad que Seedance (el video del avatar sigue hablando en la tarjeta) -->
      <div class="g clip" id="vs" ${clip(T.vs, 6)}>
        <div class="vsframe" id="vs-frame"><div class="live"><i></i>VIDEO</div><div class="lab">AVATAR ADS</div></div>
        <div class="eq" id="vs-eq">=</div>
        <div class="seedcard card" id="vs-seed"><div class="seed"><div class="name">Seedance</div><div class="src">video con IA</div></div><div class="lab">SEEDANCE</div></div>
      </div>

      <!-- S4 · cronómetro: 1 segundo de Seedance -->
      <div class="broll grid clip" id="watch" ${clip(T.watch, 5)}><div class="in">
        <div class="center" style="top:330px"><div class="tag">Seedance 2.0 · 1080p</div></div>
        <div class="center" style="top:520px"><div class="watch">
          <svg viewBox="0 0 560 560"><circle cx="280" cy="280" r="250" fill="#070c09" stroke="#305e4a" stroke-width="4"/>
            <circle id="watch-ring" cx="280" cy="280" r="250" fill="none" stroke="#c5f740" stroke-width="12" stroke-linecap="round" transform="rotate(-90 280 280)"
              stroke-dasharray="1571" stroke-dashoffset="1571" style="filter:drop-shadow(0 0 14px rgba(197,247,64,.6))"/></svg>
          <div class="t"><div class="big glow" id="watch-num" style="font-size:96px">0:00.00</div></div>
        </div></div>
      </div></div>

      <!-- S5 · cara + $0,68 por segundo -->
      <div class="g clip" id="c68" ${clip(T.c68, 4)}>
        <div class="center" style="top:110px"><div class="mcard" id="c68-card"><div class="tag">Seedance · cada segundo de video</div>
          <div class="big glow" id="c68-num" style="font-size:150px;margin-top:14px">$0,00</div>
          <div class="src" style="margin-top:16px;font-size:20px">Seedance 2.0 · 1080p · fal.ai · oct 2026</div></div></div>
      </div>

      <!-- S6 · chip: este avatar es 100 % IA -->
      <div class="g clip" id="chip100" ${clip(T.chip100, 4)}>
        <div class="center" style="top:150px"><div class="chip" id="chip100-c"><b></b>ESTE AVATAR ES 100% IA</div></div>
      </div>

      <!-- S7 · creado desde cero + $0,67 -->
      <div class="broll grid clip" id="gal" ${clip(T.gal, 5)}><div class="in">
        <div class="center" style="top:360px"><div class="tag">Creado desde cero · Nano Banana + Flow</div></div>
        <div class="gal card" id="gal-card"><img id="gal-img" src="broll/flow-galeria-recorte.png" alt=""></div>
        <div class="center" id="gal-price" style="top:1000px"><div class="tag">Costo de este avatar</div>
          <div class="big glow" id="gal-num" style="font-size:170px;margin-top:14px">$0,00</div>
          <div class="src" id="gal-vs" style="margin-top:18px">vs. $0,68 por 1 segundo de Seedance</div></div>
      </div></div>

      <!-- S8 · chip: hecho en 20 min -->
      <div class="g clip" id="chip20" ${clip(T.chip20, 4)}>
        <div class="center" style="top:150px"><div class="chip" id="chip20-c"><b></b>HECHO EN 20 MIN</div></div>
      </div>

      <!-- S10–S11 · más anuncios testeados → más ganadores -->
      <div class="broll grid clip" id="icons" ${clip([T.icons[0], T.win[1]], 5)}><div class="in">
        <div class="center" style="top:300px"><div class="tag" id="icons-tag">Anuncios testeados</div>
          <div class="swap" style="margin-top:22px">
            <div class="big glow" id="icons-num" style="font-size:150px">4</div>
            <div class="big glow" id="icons-win" style="font-size:96px;line-height:1.1;opacity:0">Más tests =<br>más ganadores</div>
          </div></div>
        <div class="ads">${adsHtml}</div>
      </div></div>

      <!-- S12 · cara + curva de crecimiento -->
      <div class="g clip" id="curve" ${clip(T.curve, 4)}>
        <div class="center" style="top:110px"><div class="mcard" id="curve-card" style="padding:24px 30px"><div class="tag" style="font-size:22px">Más tests → más ganadores → escalar</div>
          <svg viewBox="0 0 920 340" style="width:100%;display:block;margin-top:10px">
            <line x1="20" y1="320" x2="900" y2="320" stroke="rgba(48,94,74,.6)" stroke-width="2"/>
            <path id="curve-fill" d="M20 310 C 220 305, 330 290, 450 250 S 700 110, 880 30 L 880 320 L 20 320 Z" fill="rgba(197,247,64,.08)"/>
            <path id="curve-line" d="M20 310 C 220 305, 330 290, 450 250 S 700 110, 880 30" fill="none" stroke="#c5f740" stroke-width="10" stroke-linecap="round"
              stroke-dasharray="1100" stroke-dashoffset="1100" style="filter:drop-shadow(0 0 12px rgba(197,247,64,.6))"/>
            <circle id="curve-dot" cx="880" cy="30" r="18" fill="#c5f740"/>
          </svg></div></div>
      </div>

      <!-- S13 · producto digital: ventas en Hotmart -->
      <div class="broll grid clip" id="hot" ${clip(T.hot, 5)}><div class="in">
        <div class="center" style="top:170px"><div class="chip"><b></b>PRODUCTO DIGITAL · HOTMART</div></div>
        <div class="phone" id="hot-phone"></div>
      </div></div>
      <video class="clip" id="hot-vid" src="broll/hotmart.mp4" muted playsinline style="position:absolute;z-index:9;left:270px;top:310px;width:540px;height:1040px;object-fit:cover;object-position:top;border-radius:46px" ${clip(T.hot, 9)}></video>
      <div class="g clip" id="hot-g" ${clip(T.hot, 10)}><div class="zoomtag" id="hot-tag" style="top:1000px">1.759 US$</div></div>

      <!-- S14 · servicio tradicional: resultado de un cliente (sin nombre ni foto) -->
      <div class="broll grid clip" id="chat" ${clip(T.chat, 5)}><div class="in">
        <div class="center" style="top:170px"><div class="chip"><b></b>SERVICIO · RESULTADO DE UN CLIENTE</div></div>
        <div class="phone" id="chat-phone"><img id="chat-img" src="broll/sebastian-limpio.png" alt=""></div>
        <div class="zoomtag" id="chat-tag" style="top:1080px">$10.537 USD</div>
      </div></div>

      <!-- logo sobre la cara -->
      <div class="g clip" id="logo1" style="mix-blend-mode:screen" ${clip(T.logo, 4)}>
        <div class="center" style="top:130px"><img class="logo" id="logo1-img" src="broll/logo-avatar-ads.webp" alt=""></div>
      </div>

      <!-- S15 · cara + días -->
      <div class="g clip" id="days" ${clip(T.days, 4)}>
        <div class="center" style="top:110px"><div class="tag" id="days-tag" style="margin-bottom:22px"><span class="rec"><i></i>Taller en vivo</span></div>
          <div class="mdays"><div class="mday" id="day1"><div class="n">1</div><div class="t">Día 1<em>Storyboard e imágenes</em></div></div>
          <div class="mday" id="day2"><div class="n">2</div><div class="t">Día 2<em>Videos y edición</em></div></div></div></div>
      </div>

      <!-- S16 · CTA -->
      <div class="g clip" id="logo2" style="mix-blend-mode:screen" ${clip(T.cta, 4)}>
        <div class="center" style="top:130px"><img class="logo" id="cta-logo" src="broll/logo-avatar-ads.webp" alt=""></div>
      </div>
      <div class="g clip" id="cta" ${clip(T.cta, 7)}>
        <div class="center" style="top:1150px"><div class="cta" id="cta-btn">Reservar mi lugar ↓</div></div>
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
          const count = (id, to, t, d, fmt) => { const o = { v: 0 }; tl.to(o, { v: to, duration: d, ease: "power2.out", onUpdate: () => { document.getElementById(id).textContent = fmt(o.v); } }, t); };
          const money = (v) => "$0," + String(Math.round(v)).padStart(2, "0");

          // ── S2 nuestros anuncios
          settle("#ads-bg .in", ${cut(T.ads[0])}, 0.5);
          rise("#ads-chip", ${f3(T.ads[0] + 0.05)});
          [0, 1, 2].forEach((i) => tl.fromTo("#adv-" + i, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${f3(T.ads[0])} + i * 0.08));
          // ── S3 el video del avatar se encoge a la tarjeta de la izquierda y vuelve
          tl.fromTo("#video-wrap", { scale: 1, x: 0, y: 0, borderRadius: 0 }, { scale: 0.4028, x: 60, y: 440, borderRadius: 74, duration: 0.32, ease: "power3.inOut" }, ${cut(T.vs[0])});
          tl.set("#shade", { opacity: 0 }, ${cut(T.vs[0])});
          tl.set("#video-wrap", { scale: 1, x: 0, y: 0, borderRadius: 0 }, ${f3(cut(T.vs[1]) - ZE)});
          tl.set("#shade", { opacity: 1 }, ${f3(cut(T.vs[1]) - ZE)});
          tl.fromTo("#vs-frame", { opacity: 0 }, { opacity: 1, duration: 0.2 }, ${f3(T.vs[0] + 0.2)});
          pop("#vs-eq", ${f3(T.vs[0] + 0.35)});
          pop("#vs-seed", ${f3(q(T.vsSeed))});
          // ── S4 cronómetro
          settle("#watch .in", ${cut(T.watch[0])}, 0.5);
          tl.to("#watch-ring", { strokeDashoffset: 0, duration: 1, ease: "none" }, ${f3(q(T.watchSeg))});
          count("watch-num", 100, ${f3(q(T.watchSeg))}, 1, (v) => "0:0" + (v >= 100 ? "1.00" : "0." + String(Math.round(v)).padStart(2, "0")));
          // ── S5 $0,68
          rise("#c68-card", ${f3(T.c68[0] + 0.02)});
          count("c68-num", 68, ${f3(q(T.c68num - 0.2))}, 0.6, money);
          // ── S6 / S8 chips
          rise("#chip100-c", ${f3(T.chip100[0] + 0.02)});
          rise("#chip20-c", ${f3(T.chip20[0] + 0.02)});
          // ── S7 galería + $0,67
          settle("#gal .in", ${cut(T.gal[0])}, 0.5);
          tl.fromTo("#gal-img", { scale: 1.0 }, { scale: 1.1, duration: ${f3(T.gal[1] - T.gal[0])}, ease: "none" }, ${cut(T.gal[0])});
          rise("#gal-price", ${f3(T.gal[0] + 0.3)});
          count("gal-num", 67, ${f3(q(T.gal67 - 0.25))}, 0.7, money);
          // ── S10 íconos: de 4 a 30
          settle("#icons .in", ${cut(T.icons[0])}, 0.5);
          for (let i = 0; i < ${N_ADS}; i++) {
            const t0 = i < 4 ? ${f3(T.icons[0] + 0.05)} + i * 0.06 : ${f3(T.iconsMas - 0.1)} + (i - 4) * 0.035;
            tl.fromTo("#ad-" + i, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(2)" }, t0);
          }
          count("icons-num", ${N_ADS}, ${f3(T.iconsMas - 0.1)}, ${f3(26 * 0.035 + 0.1)}, (v) => String(Math.max(4, Math.round(v))));
          // ── S11 se iluminan varios ganadores
          tl.to("#icons-num", { opacity: 0, y: -20, duration: 0.2 }, ${f3(T.win[0])});
          tl.fromTo("#icons-win", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, ${f3(T.win[0] + 0.1)});
          tl.to("#icons-tag", { opacity: 0, duration: 0.15 }, ${f3(T.win[0])});
          const W = ${JSON.stringify(WINNERS)};
          for (let i = 0; i < ${N_ADS}; i++) if (!W.includes(i)) tl.to("#ad-" + i, { opacity: 0.3, duration: 0.4 }, ${f3(T.win[0] + 0.1)});
          W.forEach((i, k) => {
            const t = ${f3(T.win[0] + 0.15)} + k * 0.13;
            tl.to("#wl-" + i, { opacity: 1, duration: 0.12 }, t);
            tl.fromTo("#ad-" + i, { scale: 1 }, { scale: 1.18, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, t);
          });
          // ── S12 curva
          rise("#curve-card", ${f3(T.curve[0] + 0.02)});
          tl.to("#curve-line", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, ${f3(T.curve[0] + 0.2)});
          tl.fromTo("#curve-fill", { opacity: 0 }, { opacity: 1, duration: 0.8 }, ${f3(T.curve[0] + 0.5)});
          pop("#curve-dot", ${f3(T.curve[0] + 1.35)});
          // ── S13 Hotmart
          pop("#hot-tag", ${f3(T.hot[0] + 1.15)});  // cuando el panel pasa de 7 a 14 días (930 → 1.759 US$)
          // ── S14 chat del cliente
          settle("#chat .in", ${cut(T.chat[0])}, 0.5);
          tl.fromTo("#chat-img", { scale: 1 }, { scale: 1.06, duration: ${f3(T.chat[1] - T.chat[0])}, ease: "none" }, ${cut(T.chat[0])});
          pop("#chat-tag", ${f3(T.chat[0] + 0.5)});
          // ── logo + días + CTA
          rise("#logo1-img", ${f3(T.logo[0] + 0.02)});
          rise("#days-tag", ${f3(T.days[0] + 0.02)});
          rise("#day1", ${f3(T.days[0] + 0.1)});
          rise("#day2", ${f3(T.days[0] + 0.3)});
          rise("#cta-logo", ${f3(T.cta[0] + 0.02)});
          pop("#cta-btn", ${f3(T.cta[0] + 0.1)});
          tl.to("#cta-btn", { y: 14, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${f3(q(T.boton))});

          window.__timelines = window.__timelines || {};
          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(here, "public", "index.html"), html);

// ── tiempo con el avatar en cámara (a pantalla completa o dentro de la tarjeta de S3)
const full = [T.ads, T.watch, T.gal, [T.icons[0], T.win[1]], T.hot, T.chat].reduce((s, [a, b]) => s + (b - a), 0);
console.log(`index.html: ${chunks.length} bloques de subtítulos, ${segs.length} segmentos, ${f3(DUR)} s · B-roll a pantalla completa ${full.toFixed(1)} s · avatar en cámara ${(DUR - full).toFixed(1)} s (${Math.round(((DUR - full) / DUR) * 100)} %)`);
