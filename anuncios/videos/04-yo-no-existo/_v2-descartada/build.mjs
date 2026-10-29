// Construye public/index.html del anuncio 04 (head talking en 2 tomas: carro → casa) a partir de:
//   transcript.json (palabras con tiempos de base.mp4) · base-cortes.json (segmentos) · la CONFIG de abajo.
// Set de animaciones propio (distinto al del anuncio 03): subtítulos en mayúsculas con píldora verde, pantalla dividida
// (subtítulo sobre la línea divisoria), video en burbuja, escaneo IA + glitch, etiqueta de precio, reloj, taxímetro, "1s",
// whip al cambiar de toma, muro de anuncios + sellos, escalera de barras, teléfono 3D con marcador/resaltador, calendario, toque en el botón.
// Uso: node build.mjs → hyperframes lint public → hyperframes render public -o … --fps 24. Storyboard: ../moodboard/storyboard-anuncio-04.png
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "transcript.json"), "utf8"));
const segs = JSON.parse(fs.readFileSync(path.join(here, "base-cortes.json"), "utf8"));
const FPS = 24;
const DUR = segs.at(-1).end;

const q = (t) => Math.round(t * FPS) / FPS;
const f3 = (n) => +n.toFixed(3);
const cut = (t) => Math.floor(t * 1000) / 1000;
const ZE = 0.002;
const norm = (s) => s.toLowerCase().replace(/[¿?¡!.,:…]/g, "");
const at = (txt, from = 0) => {
  const w = words.find((x) => x.start >= from - 0.05 && norm(x.text) === norm(txt));
  if (!w) throw new Error(`No encuentro la palabra "${txt}" desde ${from}`);
  return w;
};
const S = (i) => segs[i].start;
const E = (i) => segs[i].end;

// ───────────────────────── CONFIG ─────────────────────────
const ID = "anuncio-04";
const FIX = { "sidans,": "Seedance", "sidans": "Seedance", "concidance": "Con Seedance", "concidance,": "Con Seedance", "seedance,": "Seedance", "2": "veinte", "67": "67", "ads": "Ads" };
const KEY = new Set(["existo", "artificial", "centavos", "minutos", "segundo", "dólar", "ahorrar", "decenas", "ganadores", "escalar", "digitales", "tradicionales", "ads", "paso", "botón"]);

// Segmentos (11): 0 c1 · 1 c2 · 2 c3 · 3 "Y no se trata solo de ahorrar" · 4 "Si cada anuncio te cuesta centavos" · 5 "puedes testear decenas"
//                 6 c5 · 7 c6 · 8 "Si quieres aprender a hacerlo" · 9 "únete… paso a paso" · 10 "Toca el botón y reserva tu lugar"
const ZOOM = [
  [1.0, 1.08],                 // 0 carro (escaneo → split galería → etiqueta)
  [1.16, 1.2],                 // 1 carro · reloj
  [1.0, 1.06],                 // 2 carro · taxímetro (split) → "1s"
  [1.0, 1.04],                 // 3 casa · whip
  [1.0, 1.02], [1.0, 1.02],    // 4–5 bajo el muro de anuncios
  [1.12, 1.14],                // 6 bajo los sellos → split escalera
  [1.0, 1.0],                  // 7 bajo las pruebas
  [1.14, 1.18], [1.0, 1.06],   // 8 cara + logo · 9 logo → calendario
  [1.14, 1.2],                 // 10 CTA
];
const PUNCH = [["existo", 0, 0.08], ["segundo", at("dólar").start, 0.12], ["botón", S(10), 0.07]];

const T = {
  scan: [0, at("mi").start - 0.02],
  gal: [at("mi").start - 0.02, at("por").start - 0.02],
  tag: [at("por").start - 0.02, E(0)],
  clock: [S(1), E(1)],
  meter: [S(2), at("un", at("dólar").start).start - 0.04], meterMoney: at("te", S(2)).start, meterSeg: at("segundo", S(2)).start,
  one: [at("un", at("dólar").start).start - 0.04, E(2)],
  home: [S(3), E(3)],
  wall: [S(4), S(6)], wallMas: at("puedes", S(4)).start,
  stamps: [S(6), at("y", S(6)).start - 0.04],
  stairs: [at("y", S(6)).start - 0.04, E(6)],
  hot: [S(7), at("y", S(7)).start - 0.04],
  chat: [at("y", S(7)).start - 0.04, E(7)],
  logo: [S(8), at("dos", S(9)).start - 0.04],
  cal: [at("dos", S(9)).start - 0.04, E(9)],
  cta: [S(10), DUR], boton: at("botón", S(10)).start,
};
const SPLIT = [T.gal, T.meter, T.stairs];         // pantalla dividida: el video baja y el subtítulo va a la línea divisoria
const NOSUB = [T.scan];                           // el glitch "YO NO EXISTO" reemplaza al subtítulo
const PIP = [[T.hot[0], T.chat[1]]];              // video del avatar en burbuja
const inR = (t, rs) => rs.some(([a, b]) => t >= a - 0.01 && t < b - 0.01);
// ────────────────────────────────────────────────────────────

// ── subtítulos: mayúsculas, máx. 3 palabras; palabra activa en píldora verde (las KEY se quedan)
const display = (w) => (FIX[w.text.toLowerCase()] ?? w.text).replace(/[.,:…]$/, "").replace(/^¿|^¡/, (m) => m);
const chunks = [];
let cur = [];
words.forEach((w, i) => {
  const prev = words[i - 1];
  const splitChange = prev && inR(prev.start, SPLIT) !== inR(w.start, SPLIT);
  if (cur.length && (cur.length >= 3 || /[.,?!:…]$/.test(prev.text) || w.start - prev.end > 0.3 || splitChange)) { chunks.push(cur); cur = []; }
  cur.push(w);
});
if (cur.length) chunks.push(cur);

let subsHtml = "", subsJs = "", nSub = 0;
chunks.forEach((c, i) => {
  if (inR(c[0].start, NOSUB)) return;
  const start = Math.max(0, q(c[0].start - 0.04));
  const next = chunks[i + 1];
  const end = q(next ? Math.min(next[0].start - 0.04, c.at(-1).end + 0.5) : DUR);
  const id = `sub-${i}`; nSub++;
  const seam = inR(c[0].start, SPLIT) ? " seam" : "";
  subsHtml += `      <div class="sub${seam} clip" id="${id}" data-start="${f3(start)}" data-duration="${f3(end - start)}" data-track-index="3">` +
    c.map((w, j) => `<span id="${id}-w${j}" class="w">${display(w)}</span>`).join(" ") + `</div>\n`;
  subsJs += `          tl.fromTo("#${id}", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.12, ease: "back.out(2)" }, ${f3(start)});\n`;
  c.forEach((w, j) => {
    subsJs += `          tl.set("#${id}-w${j}", { backgroundColor: "#C5F740", color: "#071006", textShadow: "none" }, ${f3(q(w.start))});\n`;
    const after = c[j + 1] ? q(c[j + 1].start) : end;
    if (after < end && !KEY.has(norm(display(w)))) subsJs += `          tl.set("#${id}-w${j}", { backgroundColor: "rgba(0,0,0,0)", color: "#FFFFFF", textShadow: "0 4px 22px rgba(0,0,0,.8)" }, ${f3(after)});\n`;
  });
});

// ── zooms
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

// ── SFX
const WIN = [3, 8, 13, 16, 22, 27, 32];
const sfx = [
  ["glitch-1", 0.05, 0.6, 0.22],
  ["whoosh-short", T.gal[0], 0.574, 0.18],
  ["pop", T.tag[0] + 0.05, 0.72, 0.3],
  ["click-soft", T.clock[0] + 0.05, 0.365, 0.35],
  ["whoosh-short", T.meter[0], 0.574, 0.18],
  ["typing", T.meterSeg, 0.9, 0.18],
  ["typing", T.meterMoney, 1.0, 0.18],
  ["impact-bass-1", T.one[0], 1, 0.26],
  ["whoosh-cinematic", T.home[0] - 0.15, 1.2, 0.2],
  ["whoosh-short", T.wall[0], 0.574, 0.18],
  ...WIN.map((_, k) => ["impact-bass-1", T.stamps[0] + 0.12 + k * 0.16, 0.5, 0.1]),
  ["whoosh-short", T.stairs[0], 0.574, 0.16],
  ["whoosh-short", T.hot[0], 0.574, 0.18],
  ["click-soft", T.chat[0] + 0.2, 0.365, 0.3],
  ["sparkle", T.logo[0] + 0.1, 1, 0.22],
  ["pop", T.cal[0] + 0.05, 0.72, 0.3],
  ["pop", T.cta[0] + 0.1, 0.72, 0.36],
  ["click", T.boton, 0.4, 0.4],
  ["chime", T.boton + 0.2, 1, 0.2],
];
const sfxHtml = sfx.map(([n, t, d, v], i) =>
  `      <audio id="sfx-${String(i + 1).padStart(2, "0")}-${n}" src="audio/${n}.mp3" data-start="${f3(q(t))}" data-duration="${f3(Math.min(d, DUR - q(t)))}" data-track-index="${11 + (i % 4)}" data-volume="${v}"></audio>`).join("\n");

const wallHtml = Array.from({ length: 36 }, (_, i) => `<i class="ad" id="ad-${i}">${WIN.includes(i) ? `<b class="stamp" id="st-${i}">WINNER</b>` : ""}</i>`).join("");
const SPLIT_Y = 330;   // cuánto baja el video en pantalla dividida (la cara queda bajo la línea divisoria)

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
      #video-wrap { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
      #zoom { position: absolute; inset: 0; transform-origin: 50% 32%; }
      #zoom video { width: 100%; height: 100%; object-fit: cover; }
      .shade { position: absolute; inset: 0; pointer-events: none; z-index: 2;
        background: linear-gradient(180deg, rgba(2,6,4,.5) 0%, rgba(2,6,4,0) 22%, rgba(2,6,4,0) 60%, rgba(2,6,4,.6) 100%); }
      .center { position: absolute; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; }
      .tag { font-family: "JBM", monospace; font-size: 28px; letter-spacing: 5px; text-transform: uppercase; color: var(--accent); }
      .src { font-family: "JBM", monospace; font-size: 20px; letter-spacing: 3px; color: var(--meta); text-transform: uppercase; }
      .big { font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; color: var(--text); line-height: 1; letter-spacing: -1px; }
      .g { position: absolute; z-index: 10; left: 0; top: 0; width: 1080px; height: 1920px; pointer-events: none; }
      .bg { position: absolute; z-index: 8; left: 0; top: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none;
        background: radial-gradient(110% 80% at 50% 0%, #12301c 0%, #030805 70%); }
      /* subtítulos: mayúsculas, palabra clave en píldora verde */
      .sub { position: absolute; z-index: 20; left: 50px; width: 980px; top: 1420px; text-align: center; pointer-events: none;
        font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 66px; line-height: 1.3; letter-spacing: -1px; text-transform: uppercase;
        color: #fff; text-shadow: 0 4px 22px rgba(0,0,0,.8); }
      .sub .w { display: inline-block; padding: 0 14px; border-radius: 14px; color: #fff; }
      .sub.seam { top: 772px; font-size: 58px; }
      .sub.seam .w { background: rgba(2,6,4,.82); }
      /* pantalla dividida */
      .split { position: absolute; z-index: 8; left: 0; top: 0; width: 1080px; height: 820px; overflow: hidden; border-bottom: 5px solid var(--accent);
        background: radial-gradient(110% 90% at 50% 0%, #12301c 0%, #050b07 70%); box-shadow: 0 10px 40px rgba(0,0,0,.5); }
      .split::after { content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(197,247,64,.12) 2px, transparent 2px); background-size: 40px 40px; }
      .split > .in { position: absolute; inset: 0; z-index: 1; }
      /* escaneo IA + glitch */
      .scan { position: absolute; left: 0; right: 0; top: 0; height: 8px; background: var(--accent); box-shadow: 0 0 40px 10px rgba(197,247,64,.6); }
      .scanfield { position: absolute; left: 0; right: 0; top: 0; height: 1920px; background: linear-gradient(180deg, rgba(197,247,64,0) 0%, rgba(197,247,64,.22) 100%);
        -webkit-mask-image: radial-gradient(rgba(0,0,0,1) 2px, transparent 2.5px); -webkit-mask-size: 26px 26px; transform-origin: 50% 0; }
      .glitch { position: relative; font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 150px; line-height: .95; color: #fff; text-align: center; letter-spacing: -2px;
        text-shadow: 0 6px 30px rgba(0,0,0,.6); }
      .glitch .r, .glitch .c { position: absolute; inset: 0; }
      .glitch .c { color: #00e5ff; clip-path: inset(10% 0 55% 0); mix-blend-mode: screen; }
      .glitch .r { color: var(--accent); clip-path: inset(60% 0 8% 0); mix-blend-mode: screen; }
      /* galería en abanico */
      .fan .c { position: absolute; top: 150px; width: 250px; height: 441px; border-radius: 22px; overflow: hidden; border: 3px solid var(--border); box-shadow: 0 30px 60px rgba(0,0,0,.6); }
      .fan .c img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .fan .c.pick { border-color: var(--accent); box-shadow: 0 0 50px rgba(197,247,64,.5); }
      .arrowpill { display: inline-flex; gap: 14px; align-items: center; padding: 12px 26px; border-radius: 999px; background: var(--accent); color: #071006; font-family: "JBM", monospace; font-size: 26px; letter-spacing: 3px; }
      /* etiqueta de precio */
      .ptag { position: absolute; right: 150px; top: 100px; transform-origin: 50% 0; }
      .ptag .str { width: 4px; height: 120px; background: var(--muted); margin: 0 auto; }
      .ptag .body { position: relative; width: 340px; padding: 40px 30px 34px; border-radius: 20px 20px 26px 26px; background: var(--accent); color: #071006; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,.5); }
      .ptag .body::before { content: ""; position: absolute; top: 14px; left: 50%; width: 22px; height: 22px; margin-left: -11px; border-radius: 50%; background: #0b1a0d; }
      .ptag .k { font-family: "JBM", monospace; font-size: 22px; letter-spacing: 3px; margin-top: 10px; }
      .ptag .v { font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 108px; line-height: 1; margin-top: 6px; }
      /* reloj */
      .clockpill { display: inline-flex; align-items: center; gap: 22px; padding: 18px 36px 18px 20px; border-radius: 999px; background: rgba(2,6,4,.85); border: 3px solid var(--accent);
        font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 64px; color: var(--text); }
      .clock { position: relative; width: 80px; height: 80px; border-radius: 50%; border: 6px solid var(--accent); }
      .hand { position: absolute; left: 50%; bottom: 50%; width: 6px; margin-left: -3px; background: var(--accent); border-radius: 3px; transform-origin: 50% 100%; }
      /* taxímetro */
      .meter { width: 900px; border-radius: 34px; border: 3px solid var(--border); background: #050a06; padding: 34px 46px; box-shadow: inset 0 0 60px rgba(0,0,0,.8), 0 30px 70px rgba(0,0,0,.6); }
      .meter .row { display: flex; justify-content: space-between; align-items: baseline; }
      .meter .lab { font-family: "JBM", monospace; font-size: 24px; letter-spacing: 4px; color: var(--meta); text-transform: uppercase; }
      .meter .digits { font-family: "JBM", monospace; font-size: 160px; color: var(--accent); letter-spacing: 4px; text-shadow: 0 0 30px rgba(197,247,64,.55); line-height: 1.05; }
      .meter .bar { height: 18px; border-radius: 9px; background: #13201a; margin-top: 14px; overflow: hidden; }
      .meter .bar i { display: block; height: 100%; width: 100%; background: var(--accent); box-shadow: 0 0 20px rgba(197,247,64,.6); transform-origin: 0 50%; }
      .vsmini { margin-top: 22px; display: inline-flex; gap: 14px; align-items: center; padding: 12px 24px; border-radius: 999px; border: 2px solid var(--accent); background: rgba(2,6,4,.8);
        font-family: "JBM", monospace; font-size: 24px; letter-spacing: 2px; color: var(--text); }
      .vsmini b { color: var(--accent); font-weight: 500; }
      /* "1s" */
      .outline { font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 520px; line-height: .85; color: transparent; -webkit-text-stroke: 8px var(--accent);
        letter-spacing: -10px; filter: drop-shadow(0 0 30px rgba(197,247,64,.5)); }
      .flash { position: absolute; inset: 0; background: radial-gradient(60% 40% at 50% 35%, rgba(255,255,255,.55), rgba(255,255,255,0) 70%); }
      .streak { position: absolute; top: 0; bottom: 0; width: 700px; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.35), rgba(255,255,255,0)); filter: blur(30px); }
      /* muro de anuncios + sellos */
      .wallwrap { position: absolute; left: -120px; right: -120px; top: 360px; height: 1300px; perspective: 1400px; }
      .wall { display: grid; grid-template-columns: repeat(6, 1fr); gap: 22px; transform: rotateX(28deg) rotateZ(-8deg); transform-origin: 50% 0; }
      .ad { display: block; aspect-ratio: 9 / 16; border-radius: 18px; border: 2px solid var(--border); background: linear-gradient(180deg, #13261b, #0a130d); position: relative; overflow: visible; }
      .ad::before { content: ""; position: absolute; left: 14%; right: 14%; top: 14%; height: 44%; border-radius: 12px; background: #1d3426; }
      .ad::after { content: ""; position: absolute; left: 14%; right: 30%; top: 66%; height: 9%; border-radius: 6px; background: #1d3426; box-shadow: 0 34px 0 -4px #1a2e22; }
      .stamp { position: absolute; z-index: 3; left: 50%; top: 42%; margin-left: -70px; margin-top: -24px; width: 140px; text-align: center; transform: rotate(-14deg); padding: 6px 0; border: 5px solid var(--accent);
        border-radius: 10px; font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 28px; color: var(--accent); background: rgba(2,6,4,.75); box-shadow: 0 0 24px rgba(197,247,64,.5); opacity: 0; }
      .counter { display: inline-flex; align-items: baseline; gap: 16px; padding: 18px 36px; border-radius: 26px; background: rgba(2,6,4,.88); border: 3px solid var(--border); }
      .counter .n { font-family: "JBM", monospace; font-size: 120px; color: var(--accent); line-height: 1; }
      .counter .l { font-family: "JBM", monospace; font-size: 28px; letter-spacing: 4px; color: var(--muted); text-transform: uppercase; }
      /* escalera de barras */
      .bars { display: flex; align-items: flex-end; gap: 30px; height: 470px; }
      .bars i { display: block; width: 110px; border-radius: 18px 18px 6px 6px; background: linear-gradient(180deg, var(--accent), #6f9a1f); box-shadow: 0 0 30px rgba(197,247,64,.35); transform-origin: 50% 100%; }
      .bars i.lo { background: #1d3426; box-shadow: none; }
      /* teléfono 3D + marcador / resaltador */
      .p3d { position: absolute; left: 0; right: 0; top: 250px; display: flex; justify-content: center; perspective: 1600px; }
      .phone { width: 560px; height: 1060px; border-radius: 60px; border: 12px solid #1a2a21; background: #000; overflow: hidden; transform: rotateY(-16deg) rotateX(6deg);
        box-shadow: 40px 50px 110px rgba(0,0,0,.75), 0 0 0 2px var(--border); position: relative; }
      .phone img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
      .phone.chat { background: #0b141a; } .phone.chat img { object-fit: contain; }
      .hl { position: absolute; z-index: 3; height: 64px; background: rgba(197,247,64,.38); border-radius: 10px; transform-origin: 0 50%; box-shadow: 0 0 20px rgba(197,247,64,.4); }
      #pip-vid { position: absolute; z-index: 11; left: -110px; top: 790px; width: 700px; height: 1244px; object-fit: cover; clip-path: circle(170px at 350px 430px); opacity: 0; }
      .pipring { position: absolute; left: 70px; top: 1050px; width: 340px; height: 340px; border-radius: 50%; border: 8px solid var(--accent); box-shadow: 0 0 40px rgba(197,247,64,.35); }
      /* logo + EN VIVO + calendario + botón */
      .logo { width: 540px; mix-blend-mode: screen; }
      .live { display: inline-flex; gap: 14px; align-items: center; padding: 12px 24px; border-radius: 999px; background: rgba(2,6,4,.82); border: 2px solid var(--border);
        font-family: "JBM", monospace; font-size: 26px; letter-spacing: 4px; color: var(--text); }
      .live i { width: 18px; height: 18px; border-radius: 50%; background: #e5484d; display: block; box-shadow: 0 0 14px rgba(229,72,77,.8); }
      .cal { position: relative; width: 340px; border-radius: 30px; overflow: hidden; background: #f8f8f8; box-shadow: 0 30px 70px rgba(0,0,0,.6); text-align: center; }
      .cal .top { background: var(--accent); color: #071006; font-family: "JBM", monospace; font-size: 26px; letter-spacing: 4px; padding: 16px 0; }
      .cal .num { font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 230px; line-height: 1.05; color: #071006; }
      .cal .lab { font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 40px; color: #071006; padding-bottom: 26px; letter-spacing: 1px; }
      .cta { position: relative; padding: 30px 56px; border-radius: 28px; background: var(--accent); color: #071006; font-family: "Archivo", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 66px;
        box-shadow: 0 0 60px rgba(197,247,64,.35), 0 14px 40px rgba(0,0,0,.45); }
      .ripple { position: absolute; right: 60px; bottom: -40px; width: 160px; height: 160px; border-radius: 50%; border: 6px solid rgba(255,255,255,.85); opacity: 0; }
      .finger { position: absolute; right: 50px; bottom: -170px; font-size: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,.5)); }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <div id="video-wrap">
        <div id="zoom"><video id="bg-video" src="input-video.mp4" playsinline data-has-audio="true" data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video></div>
        <div class="shade"></div>
      </div>

      <!-- 01 · escaneo IA + glitch -->
      <div class="g clip" id="scan" ${clip(T.scan, 4)}>
        <div class="scanfield" id="scan-field"></div><div class="scan" id="scan-line"></div>
        <div class="center" style="top:1230px"><div class="glitch" id="glitch">YO NO EXISTO<span class="c" id="gl-c">YO NO EXISTO</span><span class="r" id="gl-r">YO NO EXISTO</span></div></div>
      </div>

      <!-- 02 · pantalla dividida + galería en abanico -->
      <div class="split clip" id="gal" ${clip(T.gal, 8)}><div class="in">
        <div class="center" style="top:70px"><div class="tag">Creada desde cero · Nano Banana</div></div>
        <div class="fan">
          <div class="c" id="gal-1" style="left:130px;transform:rotate(-10deg)"><img src="broll/gal-1.png" alt=""></div>
          <div class="c" id="gal-2" style="left:415px;top:120px"><img src="broll/gal-2.png" alt=""></div>
          <div class="c pick" id="gal-3" style="left:700px;transform:rotate(10deg)"><img src="broll/gal-3.png" alt=""></div>
        </div>
        <div class="center" style="top:660px"><div class="arrowpill" id="gal-pill">IMAGEN → VIDEO EN FLOW</div></div>
      </div></div>

      <!-- 03 · etiqueta de precio colgante -->
      <div class="g clip" id="tag" ${clip(T.tag, 4)}>
        <div class="ptag" id="ptag"><div class="str"></div><div class="body"><div class="k">ESTE AVATAR</div><div class="v">$0,67</div></div></div>
      </div>

      <!-- 04 · reloj que gira -->
      <div class="g clip" id="clock" ${clip(T.clock, 4)}>
        <div class="center" style="top:150px"><div class="clockpill" id="clockpill"><span class="clock"><i class="hand" id="hand-m" style="height:26px"></i><i class="hand" id="hand-h" style="height:18px;transform:rotate(200deg)"></i></span>&lt; 20 MIN</div></div>
      </div>

      <!-- 05–06 · taxímetro de Seedance (pantalla dividida) -->
      <div class="split clip" id="meter" ${clip(T.meter, 8)}><div class="in">
        <div class="center" style="top:110px"><div class="meter">
          <div class="row" style="position:relative"><span class="lab" id="m-lab1">Seedance 2.0 · 1080p · tiempo</span><span class="lab" id="m-lab2" style="position:absolute;left:0;opacity:0">Seedance · 1 segundo · USD</span></div>
          <div class="digits" id="m-num">0,0 s</div>
          <div class="bar"><i id="m-bar"></i></div>
        </div>
        <div class="vsmini" id="m-vs">ESTE AVATAR COMPLETO: <b>$0,67</b></div>
        <div class="src" id="m-src" style="margin-top:18px">Seedance 2.0 · 1080p · BytePlus · oct 2026</div></div>
      </div></div>

      <!-- 07 · "1s" gigante + destello -->
      <div class="g clip" id="one" ${clip(T.one, 4)}>
        <div class="flash" id="one-flash"></div>
        <div class="center" style="top:90px"><div class="outline" id="one-txt">1s</div></div>
      </div>

      <!-- 08 · whip a la casa -->
      <div class="g clip" id="whip" ${clip([T.home[0] - 0.15, T.home[0] + 0.3], 6)}><div class="streak" id="streak"></div></div>

      <!-- 09–10 · muro de anuncios + sellos WINNER -->
      <div class="bg clip" id="wall" ${clip([T.wall[0], T.stamps[1]], 8)}>
        <div class="wallwrap"><div class="wall" id="wall-grid">${wallHtml}</div></div>
        <div class="center" style="top:150px"><div class="counter"><span class="n" id="w-num">×4</span><span class="l" style="position:relative"><span id="w-lab1">anuncios</span><span id="w-lab2" style="position:absolute;left:0;opacity:0">ganadores</span></span></div></div>
      </div>

      <!-- 11 · escalera de barras (pantalla dividida) -->
      <div class="split clip" id="stairs" ${clip(T.stairs, 8)}><div class="in">
        <div class="center" style="top:80px"><div class="tag">Más tests → más ganadores → escalar</div></div>
        <div class="center" style="top:220px"><div class="bars"><i class="lo" id="b0" style="height:110px"></i><i class="lo" id="b1" style="height:170px"></i><i id="b2" style="height:250px"></i><i id="b3" style="height:350px"></i><i id="b4" style="height:460px"></i></div></div>
      </div></div>

      <!-- 12–13 · pruebas en teléfono 3D, con el avatar en burbuja -->
      <div class="bg clip" id="hot" ${clip(T.hot, 8)}>
        <div class="center" style="top:130px"><div class="tag">Producto digital · Hotmart</div></div>
        <div class="p3d"><div class="phone" id="hot-phone"></div></div>
      </div>
      <video class="clip" id="hot-vid" src="broll/hotmart.mp4" muted playsinline style="position:absolute;z-index:9;left:260px;top:262px;width:536px;height:1036px;object-fit:cover;object-position:top;border-radius:48px;transform:perspective(1600px) rotateY(-16deg) rotateX(6deg)" ${clip(T.hot, 9)}></video>
      <div class="g clip" id="hot-mark" ${clip(T.hot, 10)}>
        <svg viewBox="0 0 520 170" style="position:absolute;left:290px;top:470px;width:520px"><ellipse id="hot-ell" cx="260" cy="85" rx="240" ry="66" fill="none" stroke="#c5f740" stroke-width="10" transform="rotate(-4 260 85)" stroke-linecap="round" stroke-dasharray="1400" stroke-dashoffset="1400"/></svg>
      </div>
      <div class="bg clip" id="chat" ${clip(T.chat, 8)}>
        <div class="center" style="top:130px"><div class="tag">Servicio · resultado de un cliente</div></div>
        <div class="p3d"><div class="phone chat" id="chat-phone"><img src="broll/sebastian-limpio.png" alt=""></div></div>
        <div class="hl" id="chat-hl" style="left:300px;top:1040px;width:280px;transform:rotate(-3deg)"></div>
      </div>
      <video id="pip-vid" src="input-video.mp4" muted playsinline data-start="0" data-media-start="0" data-duration="${f3(DUR)}" data-track-index="2"></video>
      <div class="g clip" id="pip" ${clip(PIP[0], 12)}><div class="pipring" id="pipring"></div></div>

      <!-- 14 · logo con brillo + TALLER EN VIVO -->
      <div class="g clip" id="logo" style="mix-blend-mode:screen" ${clip(T.logo, 4)}>
        <div class="center" style="top:110px"><img class="logo" id="logo-img" src="broll/logo-avatar-ads.webp" alt=""></div>
      </div>
      <div class="g clip" id="live" ${clip(T.logo, 5)}>
        <div class="center" style="top:300px"><div class="live" id="live-pill"><i id="live-dot"></i>TALLER EN VIVO</div></div>
      </div>

      <!-- 15 · calendario "2 DÍAS" -->
      <div class="g clip" id="cal" ${clip(T.cal, 4)}>
        <div class="center" style="top:110px"><div class="cal" id="cal-card"><div class="top">EN VIVO</div><div class="num">2</div><div class="lab">DÍAS</div></div></div>
      </div>

      <!-- 16 · botón con toque -->
      <div class="g clip" id="cta" ${clip(T.cta, 4)}>
        <div class="center" style="top:1080px"><div class="cta" id="cta-btn">Reservar mi lugar<span class="ripple" id="rip-1"></span><span class="ripple" id="rip-2"></span><span class="finger" id="finger">👆</span></div></div>
      </div>

${subsHtml}
${sfxHtml}

      <script src="vendor/gsap.min.js"></script>
      <script>
        (function () {
          const tl = window.gsap.timeline({ paused: true });
          const Z = "#zoom";
${zoomJs}
${subsJs}
          const pop = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.36, ease: "back.out(2)" }, t);
          const rise = (sel, t, d = 0.35) => tl.fromTo(sel, { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "power3.out" }, t);
          const count = (id, from, to, t, d, fmt) => { const o = { v: from }; tl.to(o, { v: to, duration: d, ease: "power2.out", onUpdate: () => { document.getElementById(id).textContent = fmt(o.v); } }, t); };
          const W = "#video-wrap";
          // ── pantalla dividida: el video baja para que la cara quede bajo la línea divisoria
          ${JSON.stringify(SPLIT.map(([a, b]) => [cut(a), cut(b)]))}.forEach(([a, b]) => {
            tl.set(W, { y: ${SPLIT_Y} }, a - ${ZE});
            tl.set(W, { y: 0 }, b - ${ZE});
          });
          ${JSON.stringify([cut(T.gal[0]), cut(T.meter[0]), cut(T.stairs[0])])}.forEach((t) => tl.fromTo(t === ${cut(T.gal[0])} ? "#gal .in" : t === ${cut(T.meter[0])} ? "#meter .in" : "#stairs .in", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, t));

          // 01 escaneo + glitch
          tl.fromTo("#scan-line", { y: 120 }, { y: 1500, duration: ${f3(Math.min(1.1, T.scan[1] - 0.1))}, ease: "power1.inOut" }, 0);
          tl.fromTo("#scan-field", { scaleY: 0.06, opacity: 1 }, { scaleY: 0.8, opacity: 0.8, duration: ${f3(Math.min(1.1, T.scan[1] - 0.1))}, ease: "power1.inOut" }, 0);
          tl.fromTo("#glitch", { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" }, 0.05);
          [0.05, 0.18, 0.31, 0.6, 0.72].forEach((t, k) => { tl.set("#gl-c", { x: k % 2 ? 14 : -14 }, t); tl.set("#gl-r", { x: k % 2 ? -14 : 14 }, t); });
          tl.set("#gl-c", { x: -4 }, 0.85); tl.set("#gl-r", { x: 4 }, 0.85);
          // 02 galería
          [1, 2, 3].forEach((i) => tl.fromTo("#gal-" + i, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }, ${f3(T.gal[0] + 0.05)} + (i - 1) * 0.12));
          pop("#gal-pill", ${f3(T.gal[0] + 0.5)});
          // 03 etiqueta colgante
          tl.fromTo("#ptag", { y: -400, rotate: -16 }, { y: 0, rotate: 0, duration: 0.5, ease: "back.out(1.4)" }, ${f3(T.tag[0])});
          tl.to("#ptag", { rotate: 7, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 3 }, ${f3(T.tag[0] + 0.5)});
          // 04 reloj
          rise("#clockpill", ${f3(T.clock[0] + 0.02)});
          tl.fromTo("#hand-m", { rotate: 0 }, { rotate: 720, duration: ${f3(T.clock[1] - T.clock[0])}, ease: "none" }, ${f3(T.clock[0])});
          // 05–06 taxímetro
          tl.set("#m-bar", { scaleX: 0 }, ${f3(T.meter[0])});
          tl.set(["#m-vs", "#m-src"], { opacity: 0 }, ${f3(T.meter[0])});
          tl.to("#m-bar", { scaleX: 1, duration: 1, ease: "none" }, ${f3(q(T.meterSeg))});
          count("m-num", 0, 1, ${f3(q(T.meterSeg))}, 1, (v) => v.toFixed(1).replace(".", ",") + " s");
          tl.set("#m-lab1", { opacity: 0 }, ${f3(q(T.meterMoney))});
          tl.set("#m-lab2", { opacity: 1 }, ${f3(q(T.meterMoney))});
          tl.set("#m-bar", { scaleX: 0 }, ${f3(q(T.meterMoney))});
          tl.to("#m-bar", { scaleX: 1, duration: 1.1, ease: "power1.in" }, ${f3(q(T.meterMoney))});
          count("m-num", 0, 91, ${f3(q(T.meterMoney))}, 1.1, (v) => "$0," + String(Math.round(v)).padStart(2, "0"));
          rise("#m-vs", ${f3(q(T.meterMoney) + 1.0)}); rise("#m-src", ${f3(q(T.meterMoney) + 1.15)});
          // 07 "1s"
          tl.fromTo("#one-txt", { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power4.out" }, ${f3(T.one[0])});
          tl.fromTo("#one-flash", { opacity: 1 }, { opacity: 0, duration: 0.4, ease: "power2.out" }, ${f3(T.one[0])});
          // 08 whip carro → casa
          tl.to(W, { filter: "blur(18px)", x: 140, duration: 0.12, ease: "power2.in" }, ${f3(T.home[0] - 0.12)});
          tl.set(W, { x: -140 }, ${f3(T.home[0] - ZE)});
          tl.to(W, { filter: "blur(0px)", x: 0, duration: 0.22, ease: "power3.out" }, ${f3(T.home[0])});
          tl.fromTo("#streak", { x: -800 }, { x: 1200, duration: 0.4, ease: "power2.inOut" }, ${f3(T.home[0] - 0.15)});
          // 09 muro de anuncios
          tl.fromTo("#wall-grid", { y: 60 }, { y: -80, duration: ${f3(T.stamps[1] - T.wall[0])}, ease: "none" }, ${cut(T.wall[0])});
          for (let i = 0; i < 36; i++) tl.fromTo("#ad-" + i, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, (i < 4 ? ${f3(T.wall[0] + 0.05)} + i * 0.06 : ${f3(T.wallMas - 0.1)} + (i - 4) * 0.028));
          count("w-num", 4, 30, ${f3(T.wallMas - 0.1)}, 1.0, (v) => "×" + Math.round(v));
          // 10 sellos WINNER
          tl.set("#w-lab1", { opacity: 0 }, ${f3(T.stamps[0])});
          tl.set("#w-lab2", { opacity: 1 }, ${f3(T.stamps[0])});
          { const o = { v: 0 }; tl.to(o, { v: ${WIN.length}, duration: ${f3(WIN.length * 0.16)}, ease: "none", onUpdate: () => { document.getElementById("w-num").textContent = String(Math.min(${WIN.length}, Math.floor(o.v + 0.4))); } }, ${f3(T.stamps[0] + 0.12)}); }
          for (let i = 0; i < 36; i++) if (!${JSON.stringify(WIN)}.includes(i)) tl.to("#ad-" + i, { opacity: 0.3, duration: 0.3 }, ${f3(T.stamps[0] + 0.05)});
          ${JSON.stringify(WIN)}.forEach((i, k) => {
            const t = ${f3(T.stamps[0] + 0.12)} + k * 0.16;
            tl.fromTo("#st-" + i, { opacity: 0, scale: 2.6 }, { opacity: 1, scale: 1, duration: 0.14, ease: "power4.in" }, t);
          });
          // 11 escalera
          ["#b0", "#b1", "#b2", "#b3", "#b4"].forEach((b, k) => tl.fromTo(b, { scaleY: 0 }, { scaleY: 1, duration: 0.35, ease: "back.out(1.4)" }, ${f3(T.stairs[0] + 0.2)} + k * 0.12));
          // 12–13 pruebas + burbuja
          tl.set("#pip-vid", { opacity: 0 }, 0);
          tl.set("#pip-vid", { opacity: 1 }, ${f3(cut(PIP[0][0]))});
          tl.set("#pip-vid", { opacity: 0 }, ${f3(cut(PIP[0][1]) - ZE)});
          pop("#pipring", ${f3(PIP[0][0] + 0.05)});
          tl.fromTo("#pip-vid", { scale: 0.6 }, { scale: 1, duration: 0.36, ease: "back.out(2)" }, ${f3(PIP[0][0] + 0.05)});
          tl.fromTo("#hot-phone", { rotateY: -30 }, { rotateY: -16, duration: 0.5, ease: "power3.out" }, ${cut(T.hot[0])});
          tl.to("#hot-ell", { strokeDashoffset: 90, duration: 0.5, ease: "power2.out" }, ${f3(T.hot[0] + 1.15)});
          tl.fromTo("#chat-hl", { scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power2.out" }, ${f3(T.chat[0] + 0.35)});
          // 14 logo + EN VIVO
          tl.fromTo("#logo-img", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }, ${f3(T.logo[0] + 0.02)});
          rise("#live-pill", ${f3(T.logo[0] + 0.3)});
          tl.to("#live-dot", { opacity: 0.2, duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${f3(T.logo[0] + 0.6)});
          // 15 calendario
          tl.fromTo("#cal-card", { y: -420, rotate: -18 }, { y: 0, rotate: -4, duration: 0.5, ease: "back.out(1.5)" }, ${f3(T.cal[0])});
          // 16 botón con toque
          pop("#cta-btn", ${f3(T.cta[0] + 0.1)});
          tl.fromTo("#finger", { x: 120, y: 160, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, ${f3(q(T.boton) - 0.45)});
          tl.to("#cta-btn", { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1 }, ${f3(q(T.boton))});
          ["#rip-1", "#rip-2"].forEach((r, k) => tl.fromTo(r, { opacity: 0.9, scale: 0.3 }, { opacity: 0, scale: 2.2, duration: 0.7, ease: "power2.out" }, ${f3(q(T.boton))} + k * 0.2));

          window.__timelines = window.__timelines || {};
          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(here, "public", "index.html"), html);

// tiempo con el avatar en cámara (pantalla dividida cuenta la mitad; la burbuja no cuenta)
const full = [[T.wall[0], T.stamps[1]], T.hot, T.chat].reduce((s, [a, b]) => s + (b - a), 0);
const half = SPLIT.reduce((s, [a, b]) => s + (b - a), 0) / 2;
console.log(`index.html: ${nSub} subtítulos, ${segs.length} segmentos, ${f3(DUR)} s · avatar en cámara ≈ ${(DUR - full - half).toFixed(1)} s (${Math.round(((DUR - full - half) / DUR) * 100)} %)`);
