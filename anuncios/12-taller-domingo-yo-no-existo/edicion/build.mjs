// Anuncio 12 · Taller del domingo, «Yo no existo» (head talking de una toma, sin B-rolls). Construye public/index.html.
// Misma mecánica que el 09 (transcript.json + base-cortes.json + CONFIG). Set de escenas propio ("evento en vivo", marca Avatar Ads):
// flecha en el hook, boleto del taller, tachados, línea de producción con el video del sérum, barras de costo, mazo de anuncios,
// recibo "incluido", etiqueta de bonus, butacas y botón neón. Sin pantalla dividida: el avatar queda entero; gráficos en la banda
// superior o en cutaways de 2–3 s (preferencia del usuario). Subtítulos sin caja; el botón es la única píldora. Nada tapa la cara.
// Storyboard aprobado (29 oct 2026, v2): ../storyboard/storyboard.png
// Uso: node build.mjs → hyperframes lint public → hyperframes render public -o ../final/… --fps 24
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "transcript.json"), "utf8"));
const segs = JSON.parse(fs.readFileSync(path.join(here, "base-cortes.json"), "utf8"));
const FPS = 24;
const DUR = Math.round(segs.at(-1).end * FPS) / FPS;     // la cola del último clip ya deja ~0,8 s para el botón

const q = (t) => Math.round(t * FPS) / FPS;
const f3 = (n) => +n.toFixed(3);
const cut = (t) => Math.floor(t * 1000) / 1000;
const ZE = 0.002;
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[¿?¡!.,:;]/g, "");

// ───────────────────────── CONFIG ─────────────────────────
const ID = "anuncio-12";
// Frases del subtítulo: [texto en pantalla, palabra clave en neón, nº de palabras de la transcripción (si difiere del texto)]
const PHRASES = [
  ["Yo no existo.", "no existo."],                          // 0  flecha + chip IA
  ["Este anuncio costó", "costó"],                          // 1  costo
  ["menos de dos dólares.", "menos de dos dólares."],       // 2
  ["Y este domingo, en vivo,", "en vivo,"],                 // 3  boleto
  ["te enseño cómo hacerlo", "cómo hacerlo"],               // 4
  ["para tus propios anuncios", "tus propios anuncios"],    // 5  dos usos
  ["o los de tus clientes.", "tus clientes."],              // 6
  ["Es un taller en vivo", "taller en vivo"],               // 7
  ["de un día.", "un día."],                                // 8  golpe de zoom
  ["Creamos un anuncio completo", "anuncio completo"],      // 9
  ["para un producto,", "producto,"],                       // 10 línea de producción (cutaway)
  ["de la idea al video editado.", "video editado."],       // 11
  ["Sin cámaras,", "cámaras,"],                             // 12 tachados
  ["sin actores", "actores"],                               // 13
  ["y sin tener que editar manualmente.", "editar manualmente."], // 14
  ["Anuncios hiperrealistas,", "hiperrealistas,"],          // 15
  ["hasta 13 veces más baratos", "13 veces más baratos"],   // 16 barras (cutaway)
  ["que con otras herramientas.", "otras herramientas."],   // 17
  ["Eso significa probar", "probar"],                       // 18 mazo (cutaway)
  ["decenas de ángulos,", "decenas de ángulos,"],           // 19
  ["encontrar tus ganadores", "tus ganadores"],             // 20
  ["y escalar.", "escalar."],                               // 21
  ["Entras al taller", "taller"],                           // 22 recibo
  ["y te quedas con", "te quedas"],                         // 23
  ["el Sistema Avatar Ads de por vida,", "Sistema Avatar Ads", 6], // 24 (la transcripción junta "Avatar Ads")
  ["el curso completo", "curso completo"],                  // 25
  ["y la grabación.", "grabación."],                        // 26
  ["Y si quieres vender esto", "vender esto"],              // 27
  ["como servicio,", "servicio,"],                          // 28 golpe de zoom
  ["hay una clase bonus en vivo,", "clase bonus"],          // 29 bonus
  ["donde te enseño", "te enseño"],                         // 30
  ["cómo conseguir clientes.", "conseguir clientes."],      // 31
  ["Los puestos son limitados.", "limitados."],             // 32 butacas
  ["Toca el botón", "botón"],                               // 33 CTA
  ["y reserva tu lugar.", "reserva tu lugar."],             // 34
];
const PUNCH = { 0: 0.06, 8: 0.08, 24: 0.07, 28: 0.07 };   // golpe de zoom en la palabra clave de esas frases
// ────────────────────────────────────────────────────────────

// ── reparto de palabras por frase (el texto en pantalla manda; la transcripción solo da los tiempos)
let wi = 0;
const blocks = PHRASES.map(([text, , n]) => {
  const k = n ?? text.split(/\s+/).length;
  const ws = words.slice(wi, wi + k);
  if (ws.length < k) throw new Error(`Faltan palabras en la frase "${text}"`);
  if (norm(ws[0].text) !== norm(text.split(/\s+/)[0])) console.warn(`  aviso · frase "${text}" empieza con "${ws[0].text}"`);
  wi += k;
  return ws;
});
if (wi !== words.length) throw new Error(`Las frases cubren ${wi} de ${words.length} palabras`);
const P0 = (i) => q(Math.max(0, blocks[i][0].start - 0.06));          // inicio de la frase
const P1 = (i) => (blocks[i + 1] ? P0(i + 1) : DUR);                  // fin de la frase = inicio de la siguiente
const W = (i, txt) => {                                               // inicio de una palabra dentro de la frase i
  const k = PHRASES[i][0].split(/\s+/).findIndex((w) => norm(w) === norm(txt));
  if (k < 0) throw new Error(`"${txt}" no está en la frase ${i}`);
  return q(blocks[i][Math.min(k, blocks[i].length - 1)].start);
};

// ── cutaways a pantalla completa (2–3 s, solo la frase que ilustran)
const FU = {
  prod: [W(10, "para") - 0.06, P1(11)],
  bars: [P0(16), W(17, "otras")],
  deck: [W(18, "probar") - 0.06, P1(20)],
};

// ── subtítulos
let subsHtml = "", subsJs = "";
PHRASES.forEach(([text, key], i) => {
  const start = P0(i), end = i === PHRASES.length - 1 ? DUR : P1(i);
  const html = text.replace(key, `<b>${key}</b>`);
  subsHtml += `      <div class="sub clip" id="sub-${i}" data-start="${f3(start)}" data-duration="${f3(end - start)}" data-track-index="3"><span>${html}</span></div>\n`;
  subsJs += `          tl.fromTo("#sub-${i} span", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, ${f3(start)});\n`;
});

// ── zooms: cada corte cambia la escala ≥ 0,1; golpe en las palabras de PUNCH
const punchAt = Object.fromEntries(Object.entries(PUNCH).map(([i, d]) => [i, { t: W(+i, PHRASES[i][1].split(" ")[0]), d }]));
let zoomJs = "";
segs.forEach((s, i) => {
  const [a, b] = i % 2 ? [1.12, 1.15] : [1.0, 1.04];
  const end = i === segs.length - 1 ? DUR : s.end;
  zoomJs += `          tl.set(Z, { scale: ${a} }, ${f3(Math.max(0, s.start - ZE))});\n`;
  const p = Object.values(punchAt).find((x) => x.t >= s.start && x.t < end);
  if (p) {
    if (p.t > s.start) zoomJs += `          tl.to(Z, { scale: ${b}, duration: ${f3(p.t - s.start)}, ease: "none" }, ${f3(s.start)});\n`;
    zoomJs += `          tl.to(Z, { scale: ${f3(b + p.d)}, duration: 0.3, ease: "power3.out" }, ${f3(p.t)});\n`;
  } else {
    zoomJs += `          tl.to(Z, { scale: ${b}, duration: ${f3(end - s.start - 0.05)}, ease: "none" }, ${f3(s.start)});\n`;
  }
});

const clip = ([a, b], track) => `data-start="${cut(a)}" data-duration="${f3(cut(b) - cut(a))}" data-track-index="${track}"`;

// ── momentos de cada escena
const T = {
  arrow: [0, P0(1)],
  chip: [0, P0(3)],
  cost: [P0(1), P0(3)], costN: W(2, "menos"),
  ticket: [P0(3), P0(5)],
  uses: [P0(5), P0(7)], useA: W(5, "propios"), useB: W(6, "clientes."),
  rail: [W(10, "para"), W(11, "idea"), W(11, "video")],
  nos: [P0(12), P0(15)], cross: [W(12, "cámaras,"), W(13, "actores"), W(14, "editar")],
  barsX: W(16, "13"),
  deckWin: W(20, "ganadores"),
  rec: [P0(22), P0(27)], rows: [W(22, "taller"), W(24, "Sistema"), W(25, "curso"), W(26, "grabación.")],
  bonus: [P0(29), P0(32)], bonusAt: W(29, "clase"),
  seats: [P0(32), P0(33)],
  cta: [P0(33) - 0.05, DUR], boton: W(33, "botón"),
};

// ── sonido: sin música (regla del proyecto); pocos efectos, muy por debajo de la voz
const sfx = [
  ["whoosh-short", 0, 0.574, 0.14], ["impact-bass-1", 0.36, 0.8, 0.12],     // flecha del hook
  ["click-soft", T.costN, 0.365, 0.2],
  ["whoosh-short", T.ticket[0] - 0.1, 0.574, 0.1],
  ["click-soft", T.useA, 0.365, 0.2], ["click-soft", T.useB, 0.365, 0.2],
  ["whoosh-short", FU.prod[0] - 0.1, 0.574, 0.1], ["click-soft", T.rail[1], 0.365, 0.2], ["click-soft", T.rail[2], 0.365, 0.2],
  ...T.cross.map((t) => ["glitch-1", t + 0.1, 0.4, 0.07]),
  ["whoosh-short", FU.bars[0] - 0.1, 0.574, 0.1], ["pop", T.barsX + 0.3, 0.72, 0.14],
  ["whoosh-short", FU.deck[0] - 0.1, 0.574, 0.1], ["ping", T.deckWin, 0.6, 0.12],
  ...T.rows.map((t) => ["click-soft", t, 0.365, 0.2]),
  ["pop", T.bonusAt, 0.72, 0.14],
  ["pop", T.cta[0] + 0.05, 0.72, 0.14], ["chime", T.boton, 1, 0.14],
];
const sfxHtml = sfx.map(([n, t, d, v], i) =>
  `      <audio id="sfx-${String(i + 1).padStart(2, "0")}-${n}" src="audio/${n}.mp3" data-start="${f3(q(t))}" data-duration="${f3(Math.min(d, DUR - q(t)))}" data-track-index="${11 + (i % 4)}" data-volume="${v}"></audio>`).join("\n");

// ── piezas
const ICON = (d, c = "#C5F740", w = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I = {
  idea: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 11h7M9 15h7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  vid: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
  cut: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  timeline: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M8 5v5M14 5v5"/>',
  gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1.5S10 8 12 8zM12 8c2-4 6-4 6-1.5S14 8 12 8z"/>',
};
const rail = [["idea", "Idea"], ["doc", "Guion"], ["user", "Avatar"], ["vid", "Video"], ["cut", "Edición"]]
  .map(([ic, t], i) => `<div class="node" id="node-${i}"><div class="d">${ICON(I[ic])}</div><div class="t">${t}</div></div>`).join("");
const nos = [["camera", "Cámaras"], ["user", "Actores"], ["timeline", "Edición"]]
  .map(([ic, t], i) => `<div class="glass no" id="no-${i}">${ICON(I[ic], "#DDDAD7", 1.8)}<span class="t">${t}</span><i class="x" id="x-${i}"></i></div>`).join("");
const WINS = [2, 10, 12, 21];
const deck = Array.from({ length: 24 }, (_, i) => `<div class="ad" id="ad-${i}">AD${WINS.includes(i) ? `<div class="w" id="w-${WINS.indexOf(i)}">AD<span>✓</span></div>` : ""}</div>`).join("");
const recRows = ["Taller en vivo", "Sistema de por vida", "Curso completo", "Grabación"]
  .map((t, i) => `<div class="row" id="row-${i}"><b>${t}</b><span class="ok">✓ Incluido</span></div>`).join("");
const seats = Array.from({ length: 10 }, (_, i) => `<i id="seat-${i}"></i>`).join("");
const ARROW = ICON('<path d="M12 5v14M6 13l6 6 6-6"/>', "#020604", 3);
const FULL = (id, inner) => `<div class="full clip" id="${id}" ${clip(FU[id], 8)}>
        <img class="bg" src="img/avatar-bg.jpg" alt=""><div class="veil"></div>
        ${inner}
      </div>`;
const TOP = (id, r, inner, top = 60) => `<div class="g clip" id="${id}" ${clip(r, 6)}>
        <div class="center" style="top:${top}px">${inner}</div>
      </div>`;

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: "Archivo"; src: url("fonts/Archivo-800.woff2") format("woff2"); font-weight: 800; font-display: block; }
      @font-face { font-family: "Inter"; src: url("fonts/Inter-500.woff2") format("woff2"); font-weight: 500; font-display: block; }
      @font-face { font-family: "Inter"; src: url("fonts/Inter-700.woff2") format("woff2"); font-weight: 700; font-display: block; }
      @font-face { font-family: "Mono"; src: url("fonts/JetBrainsMono-500.woff2") format("woff2"); font-weight: 500; font-display: block; }
      :root { --bg: #020604; --card: #090F0B; --neon: #C5F740; --white: #F8F8F8; --t2: #DDDAD7; --meta: #9F9587; --forest: #305E4A; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { width: 100%; height: 100%; overflow: hidden; background: #000; font-family: "Inter", sans-serif; color: var(--t2); }
      #stage { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #000; }
      #video-wrap { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
      #zoom { position: absolute; inset: 0; transform-origin: 50% 33%; }
      #zoom video { width: 100%; height: 100%; object-fit: cover; }
      .g { position: absolute; z-index: 10; left: 0; top: 0; width: 1080px; height: 1920px; pointer-events: none; }
      .center { position: absolute; left: 0; right: 0; display: flex; justify-content: center; }
      .lbl { font-family: "Mono"; font-weight: 500; font-size: 30px; letter-spacing: .12em; text-transform: uppercase; color: var(--meta); }
      .lbl.n { color: var(--neon); }
      .glass { background: rgba(9,15,11,.88); border: 3px solid rgba(48,94,74,.9); border-radius: 44px; box-shadow: 0 30px 80px rgba(0,0,0,.55); }
      .chip { display: inline-flex; align-items: center; gap: 22px; padding: 22px 38px; border-radius: 26px; background: rgba(2,6,4,.82); border: 3px solid rgba(48,94,74,.9);
        font-family: "Mono"; font-size: 34px; letter-spacing: .1em; color: var(--white); text-transform: uppercase; }
      .chip i { width: 18px; height: 18px; border-radius: 50%; background: var(--neon); box-shadow: 0 0 18px var(--neon); display: block; }
      /* subtítulo: sin caja, blanco con sombra; palabra clave en neón (altura del pecho, fuera del 20 % inferior) */
      .sub { position: absolute; z-index: 20; left: 60px; right: 60px; top: 1230px; display: flex; justify-content: center; pointer-events: none; }
      .sub span { display: block; text-align: center; font-family: "Archivo"; font-weight: 800; font-size: 70px; line-height: 1.1; color: #fff; letter-spacing: -0.5px;
        text-shadow: 0 4px 18px rgba(0,0,0,.8), 0 0 3px rgba(0,0,0,.9); }
      .sub b { color: var(--neon); font-weight: 800; }
      /* cutaway: fondo desenfocado del propio video */
      .full { position: absolute; z-index: 8; inset: 0; overflow: hidden; background: var(--bg); }
      .full .bg { position: absolute; inset: -80px; width: calc(100% + 160px); height: calc(100% + 160px); object-fit: cover; filter: blur(30px) saturate(.7) brightness(.8); }
      .full .veil { position: absolute; inset: 0; background: linear-gradient(rgba(2,6,4,.78), rgba(2,6,4,.9)); }
      /* 01 · flecha (al lado de la cabeza, nunca encima) */
      #arrow { position: absolute; left: 650px; top: 300px; width: 380px; height: 420px; overflow: visible; filter: drop-shadow(0 0 18px rgba(197,247,64,.7)) drop-shadow(0 6px 16px rgba(0,0,0,.6)); }
      /* 02 · costo */
      .cost { padding: 30px 46px; display: flex; align-items: center; gap: 34px; }
      .cost .v { font-family: "Archivo"; font-weight: 800; font-size: 110px; color: var(--neon); line-height: 1; white-space: nowrap; }
      .cost .k { display: flex; flex-direction: column; gap: 8px; }
      .cost .k b { font-family: "Archivo"; font-weight: 800; font-size: 40px; color: var(--white); }
      /* 03 · boleto */
      .ticket { display: flex; width: 900px; height: 230px; border-radius: 34px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.55); }
      .ticket .l { flex: 1; background: rgba(9,15,11,.92); border: 3px solid rgba(48,94,74,.9); border-right: 0; border-radius: 34px 0 0 34px; padding: 34px 46px; display: flex; flex-direction: column; justify-content: center; gap: 12px; }
      .ticket .l b { font-family: "Archivo"; font-weight: 800; font-size: 64px; color: var(--white); line-height: 1; }
      .ticket .r { width: 270px; background: var(--neon); border-radius: 0 34px 34px 0; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; font-family: "Mono"; color: var(--bg); }
      .ticket .r::before { content: ""; position: absolute; left: -2px; top: 18px; bottom: 18px; border-left: 6px dotted var(--bg); }
      .ticket .r .d { font-size: 30px; letter-spacing: .1em; }
      .ticket .r .n { font-family: "Archivo"; font-weight: 800; font-size: 76px; line-height: .9; }
      .live { display: inline-flex; align-items: center; gap: 14px; }
      .live i { width: 20px; height: 20px; border-radius: 50%; background: #FF4D4D; box-shadow: 0 0 0 8px rgba(255,77,77,.25); display: block; }
      /* 04 · dos usos */
      .two { display: flex; gap: 26px; }
      .two .chip { opacity: .45; }
      /* 06 · línea de producción + teléfono con el video del sérum */
      .rail { position: absolute; left: 80px; right: 80px; top: 120px; display: flex; justify-content: space-between; }
      .rline { position: absolute; left: 85px; right: 85px; top: 47px; height: 6px; border-radius: 3px; background: rgba(48,94,74,.6); overflow: hidden; }
      .rline i { position: absolute; inset: 0; background: var(--neon); transform-origin: 0 50%; transform: scaleX(0); }
      .node { position: relative; display: flex; flex-direction: column; align-items: center; gap: 18px; width: 170px; opacity: .4; }
      .node .d { width: 100px; height: 100px; border-radius: 50%; background: var(--bg); border: 6px solid var(--neon); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 26px rgba(197,247,64,.35); }
      .node .d svg { width: 48px; height: 48px; }
      .node .t { font-family: "Mono"; font-size: 26px; letter-spacing: .06em; text-transform: uppercase; color: var(--t2); }
      .phone { position: absolute; left: 305px; top: 340px; width: 470px; height: 836px; border-radius: 56px; border: 14px solid #111A14; outline: 3px solid rgba(48,94,74,.9); background: #000; box-shadow: 0 40px 100px rgba(0,0,0,.7); }
      #serum { position: absolute; z-index: 9; left: 319px; top: 354px; width: 442px; height: 808px; object-fit: cover; border-radius: 42px; }
      /* 07 · tachados */
      .nos { display: flex; gap: 30px; }
      .no { width: 230px; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; position: relative; border-radius: 36px; }
      .no svg { width: 84px; height: 84px; }
      .no .t { font-family: "Mono"; font-size: 24px; letter-spacing: .06em; text-transform: uppercase; color: var(--meta); }
      .no .x { position: absolute; left: 30px; right: 30px; top: 50%; height: 8px; border-radius: 4px; background: #FF5A5A; transform: rotate(-24deg) scaleX(0); box-shadow: 0 0 16px rgba(255,90,90,.6); }
      /* 08 · barras de costo */
      .bars { position: absolute; left: 90px; right: 90px; top: 220px; padding: 56px 56px 46px; display: flex; flex-direction: column; gap: 46px; }
      .bar2 .h { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 18px; }
      .bar2 .h b { font-family: "Archivo"; font-weight: 800; font-size: 46px; color: var(--white); }
      .bar2 .h span { font-family: "Archivo"; font-weight: 800; font-size: 64px; color: var(--meta); }
      .bar2 .track { height: 70px; border-radius: 20px; background: rgba(48,94,74,.25); overflow: hidden; }
      .bar2 .track i { display: block; height: 100%; border-radius: 20px; background: #5B6B60; transform-origin: 0 50%; }
      .bar2.us .h span { color: var(--neon); }
      .bar2.us .track i { background: var(--neon); box-shadow: 0 0 30px rgba(197,247,64,.6); width: 8%; }
      .x13 { font-family: "Archivo"; font-weight: 800; font-size: 210px; color: var(--neon); line-height: .9; text-align: center; }
      .x13 small { display: block; font-family: "Mono"; font-size: 30px; letter-spacing: .12em; color: var(--white); margin-top: 12px; text-transform: uppercase; }
      .src { font-size: 24px; color: var(--meta); line-height: 1.35; text-align: center; }
      /* 09 · mazo de anuncios */
      .deck { position: absolute; left: 90px; right: 90px; top: 180px; display: grid; grid-template-columns: repeat(6, 1fr); gap: 18px; }
      .ad { aspect-ratio: 9/16; border-radius: 18px; background: #0E1A13; border: 2px solid rgba(48,94,74,.8); position: relative; display: flex; align-items: center; justify-content: center;
        font-family: "Mono"; font-size: 26px; color: rgba(221,218,215,.35); }
      .ad .w { position: absolute; inset: -2px; border-radius: 18px; background: #1B2A12; border: 4px solid var(--neon); color: var(--neon); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 34px rgba(197,247,64,.45); opacity: 0; }
      .ad .w span { position: absolute; top: -18px; right: -18px; width: 50px; height: 50px; border-radius: 50%; background: var(--neon); color: var(--bg); display: flex; align-items: center; justify-content: center; font-family: "Inter"; font-weight: 700; font-size: 30px; }
      .up { position: absolute; left: 0; right: 0; top: 920px; display: flex; justify-content: center; }
      .up .chip { border-color: var(--neon); color: var(--neon); }
      /* 11 · recibo "incluido" */
      .rec { width: 900px; padding: 30px 44px; display: flex; flex-direction: column; gap: 6px; }
      .rec .row { display: flex; align-items: center; gap: 24px; padding: 11px 0; border-bottom: 2px dashed rgba(48,94,74,.8); }
      .rec .row:last-child { border-bottom: 0; }
      .rec .row b { font-family: "Archivo"; font-weight: 800; font-size: 44px; color: var(--white); }
      .rec .row .ok { margin-left: auto; font-family: "Mono"; font-size: 26px; letter-spacing: .1em; color: var(--neon); }
      /* 13 · bonus */
      .bonus { display: flex; align-items: center; gap: 30px; padding: 30px 46px; border-color: var(--neon); box-shadow: 0 0 50px rgba(197,247,64,.25), 0 30px 80px rgba(0,0,0,.55); }
      .bonus .ic { width: 110px; height: 110px; border-radius: 30px; background: var(--neon); display: flex; align-items: center; justify-content: center; flex: none; }
      .bonus .ic svg { width: 64px; height: 64px; }
      .bonus b { display: block; font-family: "Archivo"; font-weight: 800; font-size: 50px; color: var(--white); line-height: 1.05; margin-top: 6px; }
      /* 14 · butacas (ilustrativo, sin número) */
      .seats { padding: 30px 44px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
      .seats .rowS { display: flex; gap: 14px; }
      .seats .rowS i { width: 52px; height: 46px; border-radius: 12px 12px 6px 6px; background: rgba(48,94,74,.5); display: block; }
      /* 15 · logo + botón (la única píldora) */
      .btnw { position: relative; display: inline-block; }
      .btn { position: relative; display: inline-flex; align-items: center; gap: 26px; background: var(--neon); color: var(--bg); font-family: "Archivo"; font-weight: 800; font-size: 58px;
        padding: 36px 64px; border-radius: 999px; box-shadow: 0 20px 60px rgba(197,247,64,.45); white-space: nowrap; }
      .btn svg { width: 56px; height: 56px; }
      .ring { position: absolute; inset: 0; border-radius: 999px; border: 6px solid var(--neon); opacity: 0; }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <div id="video-wrap">
        <div id="zoom"><video id="bg-video" src="input-video.mp4" playsinline data-has-audio="true" data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video></div>
      </div>

      <!-- 01 · chip IA + flecha -->
      ${TOP("chip", T.chip, `<div class="chip" id="chip-ia"><i></i>100% inteligencia artificial</div>`)}
      <div class="g clip" id="arrow-l" ${clip(T.arrow, 7)}>
        <svg id="arrow" viewBox="0 0 380 420" fill="none" stroke="#C5F740" stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
          <path id="arrow-body" d="M340 20 C 340 220, 250 320, 90 345" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
          <path id="arrow-head" d="M170 268 L 80 347 L 178 405"/>
        </svg>
      </div>

      <!-- 02 · costo de este anuncio -->
      ${TOP("cost", T.cost, `<div class="glass cost" id="cost-card"><div class="v">&lt;$<span id="cost-n">0</span></div><div class="k"><span class="lbl">Costo de</span><b>este anuncio</b></div></div>`, 190)}

      <!-- 03 · boleto del taller (sin fecha ni precio) -->
      ${TOP("ticket", T.ticket, `<div class="ticket" id="ticket-card"><div class="l"><span class="lbl live"><i></i>En vivo</span><b>Taller Avatar Ads</b></div><div class="r" id="stub"><span class="d">ESTE</span><span class="n">DOM</span></div></div>`)}

      <!-- 04 · tus anuncios / tus clientes -->
      ${TOP("uses", T.uses, `<div class="two"><div class="chip" id="use-0">Tus anuncios</div><div class="chip" id="use-1">Tus clientes</div></div>`)}

      <!-- 06 · línea de producción + video del sérum (sin sonido) -->
      ${FULL("prod", `<div class="rail"><div class="rline"><i id="rline"></i></div>${rail}</div><div class="phone" id="phone"></div>`)}
      <video class="clip" id="serum" src="video/serum.mp4" muted playsinline ${clip(FU.prod, 9)}></video>

      <!-- 07 · sin cámaras, sin actores, sin edición manual -->
      ${TOP("nos", T.nos, `<div class="nos">${nos}</div>`)}

      <!-- 08 · barras de costo -->
      ${FULL("bars", `<div class="glass bars" id="bars-card"><div class="lbl">1 anuncio de 30 s</div>
          <div class="bar2"><div class="h"><b>Otras herramientas</b><span>~$13</span></div><div class="track"><i id="bar-a" style="width:100%"></i></div></div>
          <div class="bar2 us"><div class="h"><b>Avatar Ads</b><span>~$1</span></div><div class="track"><i id="bar-b"></i></div></div>
          <div class="x13" id="x13">13×<small>más barato</small></div>
          <div class="src">Promedio de Wan 2.5, Seedance 2.0 y Seedance 2.5 (precios públicos de API, oct 2026) · Avatar Ads con el plan de pago de Google</div>
        </div>`)}

      <!-- 09 · mazo de anuncios con varios ganadores -->
      ${FULL("deck", `<div class="deck">${deck}</div><div class="up"><div class="chip" id="deck-chip"><i></i>Más tests = más ganadores</div></div>`)}

      <!-- 11 · recibo "incluido" (sin precio) -->
      ${TOP("rec", T.rec, `<div class="glass rec" id="rec-card">${recRows}</div>`, 36)}

      <!-- 13 · bonus -->
      ${TOP("bonus", T.bonus, `<div class="glass bonus" id="bonus-card"><div class="ic">${ICON(I.gift, "#020604", 2.2)}</div><div><span class="lbl n">Bonus · clase en vivo</span><b>Cómo conseguir clientes</b></div></div>`)}

      <!-- 14 · butacas -->
      ${TOP("seats", T.seats, `<div class="glass seats" id="seats-card"><span class="lbl n">Cupo limitado</span><div class="rowS">${seats}</div></div>`)}

      <!-- 15 · CTA: logo (capa propia con mezcla "screen") + botón -->
      <div class="g clip" id="cta-logo-layer" style="mix-blend-mode: screen" ${clip(T.cta, 6)}>
        <div class="center" style="top:60px"><div id="cta-logo"><img src="img/logo-avatar-ads.webp" alt="" style="width:470px;display:block"></div></div>
      </div>
      <div class="g clip" id="cta" ${clip(T.cta, 7)}>
        <div class="center" style="top:1040px"><div id="cta-btn"><div class="btnw"><div class="ring" id="cta-ring"></div><div class="btn">Reservar mi lugar ${ARROW}</div></div></div></div>
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
          const rise = (sel, t, d = 0.4) => tl.fromTo(sel, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: d, ease: "power3.out" }, t);
          const drop = (sel, t, d = 0.4) => tl.fromTo(sel, { opacity: 0, y: -40 }, { opacity: 1, y: 0, duration: d, ease: "power3.out" }, t);
          const soft = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, t);
          const fadeIn = (sel, t, d = 0.15) => tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: "power1.out" }, t);
          const count = (id, to, t, d, fmt) => { const o = { v: 0 }; tl.to(o, { v: to, duration: d, ease: "power2.out", onUpdate: () => { document.getElementById(id).textContent = fmt(o.v); } }, t); };
          const D = ${JSON.stringify({ FU, T }, (k, v) => (typeof v === "number" ? f3(v) : v))};

          // 01 · chip con parpadeo + flecha que se dibuja hacia él y golpea al llegar
          tl.fromTo("#chip-ia", { opacity: 0 }, { opacity: 1, duration: 0.06, repeat: 3, yoyo: true, ease: "none" }, 0.02);
          tl.set("#chip-ia", { opacity: 1 }, 0.3);
          tl.fromTo("#arrow-body", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.32, ease: "power2.in" }, 0.04);
          tl.fromTo("#arrow-head", { opacity: 0, scale: 0.4, svgOrigin: "80 347" }, { opacity: 1, scale: 1, svgOrigin: "80 347", duration: 0.25, ease: "back.out(3)" }, 0.34);
          tl.fromTo("#arrow", { x: 0, y: 0 }, { x: -14, y: 10, duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.38);
          tl.to("#arrow", { opacity: 0, duration: 0.15 }, D.T.arrow[1] - 0.15);

          // 02 · costo
          drop("#cost-card", D.T.cost[0] + 0.05);
          count("cost-n", 2, D.T.costN - 0.05, 0.5, (v) => Math.round(v));

          // 03 · boleto: baja girando y el talón se separa un poco
          tl.fromTo("#ticket-card", { opacity: 0, y: -60, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.6)" }, D.T.ticket[0] + 0.05);
          tl.to("#stub", { x: 14, rotation: 3, duration: 0.3, ease: "power2.out" }, D.T.ticket[0] + 0.7);

          // 04 · dos usos: se enciende cada uno con su palabra
          drop("#use-0", D.T.uses[0] + 0.05, 0.3); drop("#use-1", D.T.uses[0] + 0.12, 0.3);
          tl.to("#use-0", { opacity: 1, borderColor: "#C5F740", color: "#C5F740", duration: 0.2 }, D.T.useA);
          tl.to("#use-1", { opacity: 1, borderColor: "#C5F740", color: "#C5F740", duration: 0.2 }, D.T.useB);

          // 06 · línea de producción: avanza mientras corre el video del sérum
          fadeIn("#prod", D.FU.prod[0]);
          fadeIn("#serum", D.FU.prod[0]);
          tl.fromTo("#phone", { scale: 0.92 }, { scale: 1, duration: 0.4, ease: "power3.out" }, D.FU.prod[0]);
          tl.fromTo("#serum", { scale: 0.92 }, { scale: 1, duration: 0.4, ease: "power3.out" }, D.FU.prod[0]);
          tl.to("#rline", { scaleX: 1, duration: D.FU.prod[1] - D.FU.prod[0] - 0.3, ease: "none" }, D.FU.prod[0] + 0.1);
          for (let i = 0; i < 5; i++) tl.to("#node-" + i, { opacity: 1, duration: 0.15 }, D.FU.prod[0] + 0.1 + i * ((D.FU.prod[1] - D.FU.prod[0] - 0.4) / 4));

          // 07 · tachados: una raya roja por palabra
          for (let i = 0; i < 3; i++) drop("#no-" + i, D.T.nos[0] + 0.05 + i * 0.07, 0.3);
          D.T.cross.forEach((t, i) => tl.to("#x-" + i, { scaleX: 1, duration: 0.18, ease: "power2.out" }, t + 0.1));

          // 08 · barras: la gris se llena, la verde apenas arranca, cae el 13×
          fadeIn("#bars", D.FU.bars[0]);
          rise("#bars-card", D.FU.bars[0], 0.3);
          tl.fromTo("#bar-a", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power2.out" }, D.FU.bars[0] + 0.15);
          tl.fromTo("#bar-b", { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, D.FU.bars[0] + 0.35);
          tl.fromTo("#x13", { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, D.T.barsX + 0.3);

          // 09 · mazo: caen en cascada y se marcan varios ganadores
          fadeIn("#deck", D.FU.deck[0]);
          for (let i = 0; i < 24; i++) tl.fromTo("#ad-" + i, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.22, ease: "power3.out" }, D.FU.deck[0] + 0.05 + i * 0.04);
          for (let k = 0; k < 4; k++) {
            tl.to("#w-" + k, { opacity: 1, duration: 0.15 }, D.T.deckWin + k * 0.1);
            tl.fromTo("#ad-" + ${JSON.stringify(WINS)}[k], { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, D.T.deckWin + k * 0.1);
          }
          soft("#deck-chip", D.T.deckWin + 0.3);

          // 11 · recibo: una línea por palabra
          drop("#rec-card", D.T.rec[0] + 0.05, 0.35);
          for (let i = 0; i < 4; i++) tl.set("#row-" + i, { opacity: 0 }, D.T.rec[0]);
          D.T.rows.forEach((t, i) => tl.fromTo("#row-" + i, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.25, ease: "power3.out" }, t - 0.05));

          // 13 · bonus con rebote
          tl.fromTo("#bonus-card", { opacity: 0, y: -50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2)" }, D.T.bonusAt - 0.1);

          // 14 · butacas que se van ocupando (ilustrativo)
          drop("#seats-card", D.T.seats[0] + 0.05, 0.3);
          for (let i = 0; i < 6; i++) tl.to("#seat-" + i, { backgroundColor: "#C5F740", boxShadow: "0 0 14px rgba(197,247,64,.5)", duration: 0.12 }, D.T.seats[0] + 0.3 + i * 0.12);

          // 15 · CTA: logo + botón que rebota en "botón"
          rise("#cta-logo", D.T.cta[0] + 0.05);
          soft("#cta-btn", D.T.cta[0] + 0.1);
          tl.to("#cta-btn", { y: 12, duration: 0.22, yoyo: true, repeat: 3, ease: "sine.inOut" }, D.T.boton);
          for (let k = 0; k < 3; k++) tl.fromTo("#cta-ring", { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.18, duration: 0.7, ease: "power2.out" }, D.T.boton + 0.3 + k * 0.8);

          window.__timelines = window.__timelines || {};
          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(here, "public", "index.html"), html);
const off = Object.values(FU).reduce((s, [a, b]) => s + (b - a), 0);
console.log(`index.html: ${PHRASES.length} frases, ${segs.length} segmentos, ${f3(DUR)} s · fuera de cámara ${off.toFixed(1)} s · avatar en cámara ${Math.round(((DUR - off) / DUR) * 100)} %`);
console.log("Cutaways:", JSON.stringify(FU, (k, v) => (typeof v === "number" ? f3(v) : v)));
console.log("Momentos:", JSON.stringify(T, (k, v) => (typeof v === "number" ? f3(v) : v)));
