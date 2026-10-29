// Anuncio 09 · VSL de la landing (head talking de una toma, sin B-rolls por ahora). Construye public/index.html.
// Misma mecánica que el 07 (transcript.json + base-cortes.json + CONFIG). Set de escenas propio ("Keynote premium" oscuro, marca Avatar Ads):
// pantalla dividida con franja, tarjetas de vidrio con borde verde bosque, proceso de 6 pasos, líneas de versiones y botón neón.
// Subtítulos sin caja (blanco con sombra, palabra clave en neón); el botón es la única píldora. Nada tapa la cara.
// Storyboard aprobado (28 oct 2026): ../storyboard/storyboard.png
// Uso: node build.mjs → hyperframes lint public → hyperframes render public -o ../final/… --fps 24
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "transcript.json"), "utf8"));
const segs = JSON.parse(fs.readFileSync(path.join(here, "base-cortes.json"), "utf8"));
const FPS = 24;
const HOLD = 0.0;                                       // la cola del último clip ya deja ~0,8 s para el botón
const DUR = Math.round((segs.at(-1).end + HOLD) * FPS) / FPS;

const q = (t) => Math.round(t * FPS) / FPS;
const f3 = (n) => +n.toFixed(3);
const cut = (t) => Math.floor(t * 1000) / 1000;
const ZE = 0.002;
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[¿?¡!.,:;]/g, "");

// ───────────────────────── CONFIG ─────────────────────────
const ID = "anuncio-09";
// Frases del subtítulo: [texto en pantalla, palabra clave en neón, nº de palabras de la transcripción (si difiere del texto)]
const PHRASES = [
  ["Encontrar un anuncio ganador", "ganador"],                        // 0
  ["te cuesta entre 10 y 30 videos.", "10 y 30 videos"],              // 1  dividida · 30 videos
  ["Con el método tradicional,", "método tradicional"],               // 2
  ["eso son semanas de trabajo", "semanas"],                          // 3  calendario + dinero
  ["y miles de dólares.", "miles de dólares"],                        // 4
  ["Planeación, creadores,", "creadores"],                            // 5  recibo
  ["grabación, editores.", "editores"],                               // 6
  ["O herramientas de inteligencia artificial", "inteligencia artificial"], // 7
  ["que cobran una fortuna", "fortuna"],                              // 8  dividida · precio
  ["por un solo video.", "un solo video"],                            // 9
  ["Y si lo haces tú mismo,", "tú mismo"],                            // 10
  ["te pasas horas grabándote y editando,", "horas"],                 // 11 reloj arriba
  ["en vez de vender.", "vender"],                                    // 12 golpe de zoom
  ["Por eso creamos el Sistema Avatar Ads", "Sistema Avatar Ads", 6],    // 13 logo
  ["un sistema automatizado", "automatizado"],                        // 14
  ["que crea anuncios hiperrealistas,", "hiperrealistas"],            // 15
  ["en volumen", "volumen"],                                          // 16 nuestros anuncios
  ["y por menos de un dólar cada uno.", "menos de un dólar"],         // 17
  ["Primero, encuentra", "encuentra"],                                // 18 dividida · proceso
  ["los mejores ángulos de venta", "ángulos de venta"],               // 19
  ["para tu producto.", "producto"],                                  // 20
  ["Luego, escribe guiones", "guiones"],                              // 21
  ["con la estructura", "estructura"],                                // 22
  ["de miles de anuncios ganadores.", "anuncios ganadores"],          // 23
  ["Crea tu avatar realista.", "avatar realista"],                    // 24 el propio avatar
  ["Genera las escenas y los videos,", "escenas"],                    // 25 dividida · proceso listo
  ["edita el anuncio por completo", "por completo"],                  // 26
  ["y te lo entrega", "entrega"],                                     // 27
  ["listo para probar.", "listo"],                                    // 28
  ["Y funciona para", "funciona"],                                    // 29
  ["cualquier tipo de negocio.", "cualquier tipo"],                   // 30 tipos de negocio
  ["Si vendes productos digitales,", "productos digitales"],          // 31
  ["productos físicos", "productos físicos"],                         // 32
  ["o servicios tradicionales,", "servicios"],                        // 33
  ["o si necesitas generar leads,", "leads"],                         // 34
  ["el sistema crea el anuncio", "anuncio"],                          // 35 prueba real
  ["que tu oferta necesita.", "oferta"],                              // 36
  ["No son solo anuncios", "solo"],                                   // 37
  ["que parecen reales,", "reales"],                                  // 38
  ["son anuncios con estructuras", "estructuras"],                    // 39 dividida · curva (el clip sí dice "probadas")
  ["probadas para escalar rápido.", "escalar rápido"],               // 40
  ["Además, el sistema es tuyo", "tuyo"],                             // 41
  ["para siempre,", "para siempre"],                                  // 42 dividida · versiones
  ["con todas sus actualizaciones,", "actualizaciones"],              // 43
  ["porque la inteligencia artificial", "inteligencia artificial"],   // 44
  ["cambia cada semana.", "cada semana"],                             // 45
  ["Y tienes acceso vitalicio", "vitalicio"],                         // 46
  ["al curso paso a paso,", "curso"],                                 // 47 lo que incluye
  ["clases en vivo", "clases en vivo"],                               // 48
  ["y soporte", "soporte"],                                           // 49
  ["para que revisemos tus anuncios", "revisemos"],                   // 50
  ["y te demos feedback.", "feedback"],                               // 51
  ["Si quieres tu propia", "propia"],                                 // 52
  ["máquina de anuncios,", "máquina de anuncios"],                    // 53
  ["toca el botón de abajo", "botón de abajo"],                       // 54 CTA
  ["y mira todo lo que incluye.", "todo lo que incluye"],             // 55
];
// Escenas por rango de frases [primera, última]
const SPLITS = { tiles: [1, 1], price: [8, 9], stepsA: [18, 23], stepsB: [25, 28], curve: [39, 40], vers: [42, 43] };
const FULLS = { cal: [3, 4], receipt: [5, 6], logo: [13, 13], fan: [16, 17], biz: [30, 34], proof: [35, 36], incl: [47, 51] };
const SPLIT_Y = 600;                                    // cuánto baja el video en la pantalla dividida (la cara queda bajo la franja)
const PUNCH = { 12: 0.09, 54: 0.06 };                   // golpe de zoom en la palabra clave de esas frases
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
const P0 = (i) => q(blocks[i][0].start - 0.06);                       // inicio de la frase
const P1 = (i) => (blocks[i + 1] ? P0(i + 1) : DUR);                  // fin de la frase = inicio de la siguiente
const W = (i, txt) => {                                               // inicio de una palabra dentro de la frase i
  const k = PHRASES[i][0].split(/\s+/).findIndex((w) => norm(w) === norm(txt));
  if (k < 0) throw new Error(`"${txt}" no está en la frase ${i}`);
  return q(blocks[i][Math.min(k, blocks[i].length - 1)].start);
};
const range = ([a, b]) => [P0(a), P1(b)];
const SP = Object.fromEntries(Object.entries(SPLITS).map(([k, r]) => [k, range(r)]));
const FU = Object.fromEntries(Object.entries(FULLS).map(([k, r]) => [k, range(r)]));
const inSplit = (i) => Object.values(SPLITS).some(([a, b]) => i >= a && i <= b);

// ── subtítulos
let subsHtml = "", subsJs = "";
PHRASES.forEach(([text, key], i) => {
  const start = P0(i), end = i === PHRASES.length - 1 ? DUR : P1(i);
  const html = text.replace(key, `<b>${key}</b>`);
  const long = inSplit(i) && text.length > 27 ? " long" : "";
  subsHtml += `      <div class="${inSplit(i) ? "sub split" + long : "sub"} clip" id="sub-${i}" data-start="${f3(start)}" data-duration="${f3(end - start)}" data-track-index="3"><span>${html}</span></div>\n`;
  subsJs += `          tl.fromTo("#sub-${i} span", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, ${f3(start)});\n`;
});

// ── zooms: cada corte cambia la escala ≥ 0,1; golpe en las palabras de PUNCH
const S = (i) => segs[i].start;
const punchAt = Object.fromEntries(Object.entries(PUNCH).map(([i, d]) => [i, { t: W(+i, PHRASES[i][1].split(" ")[0]), d }]));
let zoomJs = "";
segs.forEach((s, i) => {
  const [a, b] = i % 2 ? [1.12, 1.15] : [1.0, 1.04];
  const end = i === segs.length - 1 ? DUR : s.end;
  zoomJs += `          tl.set(Z, { scale: ${a} }, ${f3(Math.max(0, s.start - ZE))});\n`;
  const p = Object.values(punchAt).find((x) => x.t >= s.start && x.t < end);
  if (p) {
    zoomJs += `          tl.to(Z, { scale: ${b}, duration: ${f3(p.t - s.start)}, ease: "none" }, ${f3(s.start)});\n`;
    zoomJs += `          tl.to(Z, { scale: ${f3(b + p.d)}, duration: 0.3, ease: "power3.out" }, ${f3(p.t)});\n`;
  } else {
    zoomJs += `          tl.to(Z, { scale: ${b}, duration: ${f3(end - s.start - 0.05)}, ease: "none" }, ${f3(s.start)});\n`;
  }
});

const clip = ([a, b], track) => `data-start="${cut(a)}" data-duration="${f3(cut(b) - cut(a))}" data-track-index="${track}"`;

// ── momentos de cada escena
const T = {
  tilesWin: W(1, "videos"),
  days: [W(3, "semanas"), W(4, "y")], bills: W(4, "miles"),
  rows: [W(5, "Planeación,"), W(5, "creadores,"), W(6, "grabación,"), W(6, "editores.")],
  fortuna: W(8, "fortuna"),
  clock: [P0(11), P0(12)],
  fanTag: W(17, "menos"),
  steps: [P0(18), P0(21)],                                // pasos 01 y 02 (proceso A)
  avatar: [P0(24), P1(24)],
  stepsB: [P0(25), P0(26), P0(28)],                       // 04, 05, 06 (el 03 ya marcado)
  biz: [W(31, "digitales,"), W(32, "físicos"), W(33, "servicios"), W(34, "leads,")],
  vers: [W(42, "siempre,"), W(43, "todas"), W(43, "actualizaciones,")],
  incl: [W(47, "curso"), P0(48), P0(49)],
  cta: [P0(54) - 0.05, DUR], boton: W(54, "botón"),
};

// ── sonido: sin música (regla del proyecto); pocos efectos, muy por debajo de la voz
const sfx = [
  ["whoosh-short", SP.tiles[0] - 0.1, 0.574, 0.1], ["ping", T.tilesWin, 0.6, 0.12],
  ["whoosh-short", FU.cal[0] - 0.1, 0.574, 0.1],
  ["whoosh-short", FU.receipt[0] - 0.1, 0.574, 0.1], ...T.rows.map((t) => ["click-soft", t, 0.365, 0.22]),
  ["whoosh-short", SP.price[0] - 0.1, 0.574, 0.1],
  ["pop", T.clock[0] + 0.05, 0.72, 0.12],
  ["whoosh-cinematic", FU.logo[0] - 0.15, 1.2, 0.12],
  ["whoosh-short", FU.fan[0] - 0.1, 0.574, 0.1], ["pop", T.fanTag, 0.72, 0.16],
  ["whoosh-short", SP.stepsA[0] - 0.1, 0.574, 0.1], ["click-soft", T.steps[1], 0.365, 0.22],
  ["pop", T.avatar[0] + 0.05, 0.72, 0.12],
  ["whoosh-short", SP.stepsB[0] - 0.1, 0.574, 0.1], ...T.stepsB.map((t) => ["click-soft", t, 0.365, 0.22]),
  ["whoosh-short", FU.biz[0] - 0.1, 0.574, 0.1], ...T.biz.map((t) => ["click-soft", t, 0.365, 0.2]),
  ["whoosh-short", FU.proof[0] - 0.1, 0.574, 0.1],
  ["whoosh-short", SP.curve[0] - 0.1, 0.574, 0.1],
  ["whoosh-short", SP.vers[0] - 0.1, 0.574, 0.1],
  ["whoosh-short", FU.incl[0] - 0.1, 0.574, 0.1], ...T.incl.map((t) => ["pop", t, 0.72, 0.12]),
  ["pop", T.cta[0] + 0.05, 0.72, 0.14], ["chime", T.boton, 1, 0.14],
];
const sfxHtml = sfx.map(([n, t, d, v], i) =>
  `      <audio id="sfx-${String(i + 1).padStart(2, "0")}-${n}" src="audio/${n}.mp3" data-start="${f3(q(t))}" data-duration="${f3(Math.min(d, DUR - q(t)))}" data-track-index="${11 + (i % 4)}" data-volume="${v}"></audio>`).join("\n");

// ── piezas
const ICON = (d, c = "#C5F740", w = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I = {
  plan: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  cam: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
  cut: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/>',
  laptop: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  leads: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.3-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c2 .7 3.2 2.6 3.5 5.5"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M9 8h6"/>',
  live: '<rect x="3" y="5" width="18" height="13" rx="2"/><circle cx="12" cy="11.5" r="2.5" fill="#C5F740"/><path d="M8 21h8"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
};
const tiles = Array.from({ length: 30 }, (_, i) => `<div class="tile${i === 17 ? " win" : ""}" id="tile-${i}"></div>`).join("");
const days = Array.from({ length: 28 }, (_, i) => `<i id="day-${i}"></i>`).join("");
const receipt = [["plan", "Planeación", "$$"], ["user", "Creadores", "$$$"], ["cam", "Grabación", "$$"], ["cut", "Editores", "$$$"]]
  .map(([ic, t, p], i) => `<div class="rrow" id="rrow-${i}"><div class="ic">${ICON(I[ic])}</div><div class="t">${t}</div><div class="p">${p}</div></div>`).join("\n          ");
const STEPS = ["Ángulos de venta", "Guiones", "Avatar realista", "Escenas y videos", "Edición completa", "Listo para probar"];
const steps = (p) => STEPS.map((t, i) => `<div class="st" id="${p}-st-${i}"><div class="k">0${i + 1}</div><div class="t">${t}</div><div class="ok" id="${p}-ok-${i}">${ICON(I.check, "#C5F740", 3.2)}</div></div>`).join("\n            ");
const fan = ["serum", "dental", "ingles", "serum-voz", "podcast", "labial"].map((n, i) => `<img id="fan-${i}" src="img/ejemplo-${n}.jpg" alt="">`).join("");
const biz = [["laptop", "Productos digitales"], ["box", "Productos físicos"], ["brief", "Servicios tradicionales"], ["leads", "Generar leads"]]
  .map(([ic, t], i) => `<div class="glass bz" id="bz-${i}"><div class="ic">${ICON(I[ic])}</div><div class="t">${t}</div></div>`).join("\n          ");
const vers = [["1.1", "Head talking"], ["1.2", "Producto físico"], ["1.3", "Voz en off"], ["+", "Lo que viene"]]
  .map(([v, t], i) => `<div class="vn${i === 3 ? " next" : ""}" id="vn-${i}"><div class="d">${v}</div><div class="t">${t}</div></div>`).join("\n            ");
const incl = [["book", "Curso paso a paso", "Acceso vitalicio"], ["live", "Clases en vivo", "Aprende a usar el sistema"], ["chat", "Soporte y feedback", "Revisamos tus anuncios"]]
  .map(([ic, t, s], i) => `<div class="glass in" id="in-${i}"><div class="ic">${ICON(I[ic])}</div><div><div class="t">${t}</div><div class="s">${s}</div></div></div>`).join("\n          ");
const ARROW = ICON('<path d="M12 5v14M6 13l6 6 6-6"/>', "#020604", 3);
const FULL = (id, inner) => `<div class="full clip" id="${id}" ${clip(FU[id], 8)}>
        <img class="bg" src="img/avatar-bg.jpg" alt=""><div class="veil"></div>
        ${inner}
      </div>`;
const SPLIT = (id, inner) => `<div class="g clip" id="${id}" ${clip(SP[id], 8)}>
        <div class="split-top">${inner}</div><div class="strip"></div>
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
      /* subtítulo: sin caja, blanco con sombra; palabra clave en neón (altura del pecho, fuera del 20 % inferior) */
      .sub { position: absolute; z-index: 20; left: 60px; right: 60px; top: 1230px; display: flex; justify-content: center; pointer-events: none; }
      .sub span { display: block; text-align: center; font-family: "Archivo"; font-weight: 800; font-size: 70px; line-height: 1.1; color: #fff; letter-spacing: -0.5px;
        text-shadow: 0 4px 18px rgba(0,0,0,.8), 0 0 3px rgba(0,0,0,.9); }
      .sub b { color: var(--neon); font-weight: 800; }
      /* en la pantalla dividida el subtítulo va en la franja */
      .sub.split { top: 760px; height: 130px; left: 30px; right: 30px; align-items: center; }
      .sub.split span { font-size: 56px; text-shadow: none; white-space: nowrap; }
      .sub.split.long span { font-size: 48px; }
      /* fondo desenfocado del propio video */
      .full { position: absolute; z-index: 8; inset: 0; overflow: hidden; background: var(--bg); }
      .full .bg { position: absolute; inset: -80px; width: calc(100% + 160px); height: calc(100% + 160px); object-fit: cover; filter: blur(30px) saturate(.7) brightness(.8); }
      .full .veil { position: absolute; inset: 0; background: linear-gradient(rgba(2,6,4,.78), rgba(2,6,4,.88)); }
      /* pantalla dividida */
      .split-top { position: absolute; left: 0; right: 0; top: 0; height: 800px; padding: 90px 80px 60px; display: flex; flex-direction: column; justify-content: center; gap: 26px;
        background: radial-gradient(80% 60% at 50% 0%, rgba(48,94,74,.5), transparent 70%), var(--bg); }
      .strip { position: absolute; left: 0; right: 0; top: 760px; height: 130px; background: var(--bg); border-top: 2px solid rgba(48,94,74,.9); border-bottom: 2px solid rgba(48,94,74,.9); }
      /* 02 · 30 videos */
      .tiles { display: grid; grid-template-columns: repeat(10, 1fr); gap: 14px; }
      .tile { aspect-ratio: 9/16; border-radius: 14px; background: #16281D; border: 2px solid rgba(48,94,74,.8); position: relative; }
      .tile::after { content: ""; position: absolute; left: 50%; top: 50%; transform: translate(-35%,-50%); border-left: 16px solid rgba(221,218,215,.55); border-top: 10px solid transparent; border-bottom: 10px solid transparent; }
      .tile .w { position: absolute; inset: -2px; border-radius: 14px; background: var(--neon); box-shadow: 0 0 40px rgba(197,247,64,.7); opacity: 0; }
      .wintag { align-self: center; font-family: "Mono"; font-size: 32px; letter-spacing: .14em; color: var(--neon); opacity: 0; }
      /* 03 · calendario + dinero */
      .cards { position: absolute; left: 90px; right: 90px; top: 230px; display: flex; flex-direction: column; gap: 40px; }
      .cal { padding: 46px 50px; }
      .cal .grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 14px; margin-top: 26px; }
      .cal .grid i { display: block; aspect-ratio: 1; border-radius: 12px; background: rgba(48,94,74,.35); position: relative; overflow: hidden; }
      .cal .grid i::after { content: ""; position: absolute; inset: 0; background: rgba(197,247,64,.75); opacity: var(--on, 0); }
      .money { padding: 46px 50px; display: flex; align-items: center; gap: 40px; }
      .bills { display: flex; flex-direction: column-reverse; gap: 12px; }
      .bills i { display: block; width: 230px; height: 46px; border-radius: 10px; background: linear-gradient(90deg, #6B8F3A, #8DB34A); border: 2px solid #A9CF5E; }
      .money .t { font-family: "Archivo"; font-weight: 800; font-size: 92px; color: var(--white); line-height: 1; }
      /* 04 · recibo */
      .receipt { position: absolute; left: 110px; right: 110px; top: 220px; padding: 56px 60px; }
      .rrow { display: flex; align-items: center; gap: 34px; padding: 30px 0; border-bottom: 2px dashed rgba(48,94,74,.8); }
      .rrow:last-child { border-bottom: 0; }
      .rrow .ic { width: 96px; height: 96px; border-radius: 26px; background: rgba(48,94,74,.35); display: flex; align-items: center; justify-content: center; flex: none; }
      .rrow .ic svg { width: 54px; height: 54px; }
      .rrow .t { font-family: "Archivo"; font-weight: 800; font-size: 58px; color: var(--white); }
      .rrow .p { margin-left: auto; font-family: "Mono"; font-size: 44px; color: var(--meta); }
      /* 05 · precio */
      .price { padding: 50px 56px; }
      .price .v { white-space: nowrap; font-family: "Archivo"; font-weight: 800; font-size: 190px; color: var(--white); line-height: .95; margin: 14px 0 10px; }
      .price .v small { font-size: 80px; color: var(--meta); }
      .price .src { font-size: 26px; color: var(--meta); line-height: 1.35; }
      /* 06 · reloj sobre la cabeza */
      .chip { display: inline-flex; align-items: center; gap: 22px; padding: 22px 38px; border-radius: 26px; background: rgba(2,6,4,.82); border: 3px solid rgba(48,94,74,.9);
        font-family: "Mono"; font-size: 34px; letter-spacing: .1em; color: var(--white); text-transform: uppercase; }
      .chip svg { width: 52px; height: 52px; }
      .chip i { width: 18px; height: 18px; border-radius: 50%; background: var(--neon); box-shadow: 0 0 18px var(--neon); display: block; }
      /* 08 · logo */
      .logo { position: absolute; left: 0; right: 0; top: 470px; display: flex; flex-direction: column; align-items: center; gap: 40px; }
      .logo .lg { mix-blend-mode: screen; }
      .logo img { width: 760px; display: block; }
      .glow { position: absolute; left: 50%; top: 640px; width: 900px; height: 600px; transform: translate(-50%,-50%); background: radial-gradient(closest-side, rgba(197,247,64,.24), transparent); }
      /* 09 · nuestros anuncios */
      .fan { position: absolute; left: 70px; right: 70px; top: 170px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
      .fan img { width: 100%; aspect-ratio: 9/16; object-fit: cover; border-radius: 24px; border: 3px solid rgba(48,94,74,.9); display: block; }
      .tag { position: absolute; left: 0; right: 0; top: 760px; display: flex; justify-content: center; }
      .tag div { transform: rotate(-3deg); padding: 26px 48px; border-radius: 28px; background: var(--bg); border: 4px solid var(--neon); box-shadow: 0 0 50px rgba(197,247,64,.45);
        font-family: "Archivo"; font-weight: 800; font-size: 74px; color: var(--neon); white-space: nowrap; }
      .tag small { font-family: "Mono"; font-size: 30px; color: var(--white); letter-spacing: .08em; margin-left: 12px; }
      /* 10/12 · proceso */
      .steps { display: flex; flex-direction: column; gap: 14px; }
      .st { position: relative; display: flex; align-items: center; gap: 28px; padding: 18px 28px; border-radius: 26px; border: 2px solid rgba(48,94,74,.55); background: rgba(9,15,11,.7); }
      .st .k { font-family: "Mono"; font-size: 30px; color: var(--meta); width: 60px; }
      .st .t { font-family: "Archivo"; font-weight: 800; font-size: 44px; color: rgba(248,248,248,.45); }
      .st .ok { margin-left: auto; width: 54px; height: 54px; border-radius: 50%; background: rgba(197,247,64,.16); display: flex; align-items: center; justify-content: center; opacity: 0; }
      .st .ok svg { width: 32px; height: 32px; }
      .st.act { border-color: var(--neon); background: rgba(197,247,64,.1); box-shadow: 0 0 40px rgba(197,247,64,.25); }
      .st.act .k { color: var(--neon); } .st.act .t { color: var(--white); } .st.done .t { color: var(--t2); }
      /* 11 · marco alrededor de la cara (no la tapa) */
      .brk { position: absolute; width: 120px; height: 120px; border-color: var(--neon); border-style: solid; filter: drop-shadow(0 0 12px rgba(197,247,64,.7)); }
      .brk.a { left: 210px; top: 250px; border-width: 8px 0 0 8px; border-radius: 26px 0 0 0; }
      .brk.b { right: 210px; top: 250px; border-width: 8px 8px 0 0; border-radius: 0 26px 0 0; }
      .brk.c { left: 210px; top: 990px; border-width: 0 0 8px 8px; border-radius: 0 0 0 26px; }
      .brk.d { right: 210px; top: 990px; border-width: 0 8px 8px 0; border-radius: 0 0 26px 0; }
      /* 13 · tipos de negocio */
      .biz { position: absolute; left: 80px; right: 80px; top: 240px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
      .bz { padding: 50px 40px; display: flex; flex-direction: column; gap: 30px; opacity: .35; }
      .bz .ic { width: 120px; height: 120px; border-radius: 34px; background: rgba(197,247,64,.12); display: flex; align-items: center; justify-content: center; }
      .bz .ic svg { width: 68px; height: 68px; }
      .bz .t { font-family: "Archivo"; font-weight: 800; font-size: 54px; color: var(--white); line-height: 1.05; }
      /* 14 · prueba real */
      .proof { position: absolute; left: 70px; right: 70px; top: 150px; display: flex; flex-direction: column; gap: 34px; align-items: center; }
      .nums { display: flex; gap: 30px; width: 100%; }
      .nums .glass { flex: 1; padding: 36px 40px; }
      .nums .v { font-family: "Archivo"; font-weight: 800; font-size: 128px; color: var(--neon); line-height: 1; margin-top: 10px; }
      .shot-img { width: 100%; border-radius: 32px; border: 3px solid rgba(48,94,74,.9); display: block; box-shadow: 0 30px 80px rgba(0,0,0,.6); }
      /* 15 · curva */
      .chart { padding: 44px 50px 36px; }
      .chart svg { width: 100%; height: 400px; display: block; margin-top: 10px; overflow: visible; }
      .chart .lg { display: flex; justify-content: space-between; font-family: "Mono"; font-size: 28px; color: var(--meta); letter-spacing: .08em; text-transform: uppercase; }
      .chart .lg b { color: var(--neon); font-weight: 500; }
      /* 16 · versiones */
      .vers { display: flex; align-items: center; justify-content: space-between; position: relative; margin-top: 30px; }
      .vline { position: absolute; left: 110px; right: 110px; top: 57px; height: 6px; background: rgba(48,94,74,.6); border-radius: 3px; overflow: hidden; }
      .vline i { position: absolute; inset: 0; background: var(--neon); transform-origin: 0 50%; transform: scaleX(0); }
      .vn { position: relative; display: flex; flex-direction: column; align-items: center; gap: 24px; width: 220px; opacity: .35; }
      .vn .d { width: 120px; height: 120px; border-radius: 50%; background: var(--bg); border: 6px solid var(--neon); display: flex; align-items: center; justify-content: center;
        font-family: "Mono"; font-size: 34px; color: var(--neon); box-shadow: 0 0 30px rgba(197,247,64,.35); }
      .vn .t { font-size: 30px; color: var(--t2); text-align: center; line-height: 1.25; }
      .vn.next .d { border-style: dashed; border-color: var(--forest); color: var(--meta); box-shadow: none; }
      .vn.next .t { color: var(--meta); }
      /* 17 · lo que incluye */
      .incl { position: absolute; left: 90px; right: 90px; top: 250px; display: flex; flex-direction: column; gap: 34px; }
      .in { display: flex; align-items: center; gap: 38px; padding: 44px 48px; }
      .in .ic { width: 120px; height: 120px; border-radius: 34px; background: rgba(197,247,64,.12); display: flex; align-items: center; justify-content: center; flex: none; }
      .in .ic svg { width: 66px; height: 66px; }
      .in .t { font-family: "Archivo"; font-weight: 800; font-size: 60px; color: var(--white); line-height: 1.05; }
      .in .s { font-size: 32px; color: var(--meta); margin-top: 8px; }
      /* 18 · logo + botón (la única píldora) */
      .toplogo { mix-blend-mode: screen; }
      .toplogo img { width: 470px; display: block; }
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

      <!-- 02 · 30 videos -->
      ${SPLIT("tiles", `<div class="tiles">${tiles.replace('id="tile-17">', 'id="tile-17"><div class="w" id="win"></div>')}</div><div class="wintag" id="wintag">★ 1 ganador</div>`)}

      <!-- 03 · calendario + dinero -->
      ${FULL("cal", `<div class="cards">
          <div class="glass cal" id="cal-card"><div class="lbl">Semanas de trabajo</div><div class="grid">${days}</div></div>
          <div class="glass money" id="money-card"><div class="bills"><i id="bill-0"></i><i id="bill-1"></i><i id="bill-2"></i><i id="bill-3"></i></div><div class="t">$$$</div></div>
        </div>`)}

      <!-- 04 · recibo de producción -->
      ${FULL("receipt", `<div class="glass receipt" id="receipt-card"><div class="lbl" style="margin-bottom:14px">Producir 1 anuncio</div>
          ${receipt}
        </div>`)}

      <!-- 05 · precio de otras herramientas -->
      ${SPLIT("price", `<div class="glass price" id="price-card"><div class="lbl">1 anuncio de 30 s · otras herramientas</div>
          <div class="v">~$<span id="price-n">0</span><small> c/u</small></div>
          <div class="src">Promedio de Wan 2.5, Seedance 2.0 y Seedance 2.5 · precios públicos de API, oct 2026</div></div>`)}

      <!-- 06 · reloj sobre la cabeza -->
      <div class="g clip" id="clock" ${clip(T.clock, 6)}>
        <div class="center" style="top:70px"><div class="chip" id="clock-chip"><svg viewBox="0 0 24 24" fill="none" stroke="#C5F740" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line id="hand" x1="12" y1="12" x2="12" y2="6.5"/><circle cx="12" cy="12" r="1" fill="#C5F740"/></svg>Grabar · editar · repetir</div></div>
      </div>

      <!-- 08 · logo -->
      ${FULL("logo", `<div class="glow" id="glow"></div><div class="logo"><div class="lg" id="logo-img"><img src="img/logo-avatar-ads.webp" alt=""></div><div class="lbl n" id="logo-lbl">Tu máquina de anuncios</div></div>`)}

      <!-- 09 · nuestros anuncios -->
      ${FULL("fan", `<div class="fan">${fan}</div><div class="tag"><div id="fan-tag">&lt; $1<small>/ ANUNCIO</small></div></div>`)}

      <!-- 10 · proceso (pasos 01–02) -->
      ${SPLIT("stepsA", `<div class="steps">\n            ${steps("a")}\n          </div>`)}

      <!-- 11 · el propio avatar -->
      <div class="g clip" id="avatar" ${clip(T.avatar, 6)}>
        <div id="brks"><div class="brk a"></div><div class="brk b"></div><div class="brk c"></div><div class="brk d"></div></div>
        <div class="center" style="top:70px"><div class="chip" id="avatar-chip"><i></i>Avatar · 100% IA</div></div>
      </div>

      <!-- 12 · proceso (pasos 03–06) -->
      ${SPLIT("stepsB", `<div class="steps">\n            ${steps("b")}\n          </div>`)}

      <!-- 13 · tipos de negocio -->
      ${FULL("biz", `<div class="biz">\n          ${biz}\n        </div>`)}

      <!-- 14 · prueba real -->
      ${FULL("proof", `<div class="proof">
          <div class="nums"><div class="glass" id="num-0"><div class="lbl">Leads</div><div class="v" id="leads-n">0</div></div><div class="glass" id="num-1"><div class="lbl">Costo por lead</div><div class="v">$0,35</div></div></div>
          <img class="shot-img" id="proof-img" src="img/fb-ads-costo-por-lead.webp" alt="">
          <div class="lbl">Campaña real en Meta</div>
        </div>`)}

      <!-- 15 · curva -->
      ${SPLIT("curve", `<div class="glass chart" id="chart-card"><div class="lg"><span>Testea</span><span>Gana</span><b>Escala</b></div>
          <svg viewBox="0 0 800 400" fill="none">
            <path d="M0 360 H800 M0 250 H800 M0 140 H800 M0 30 H800" stroke="rgba(48,94,74,.45)" stroke-width="2"/>
            <path id="curve-fill" d="M20 350 C 200 340, 330 300, 450 230 S 680 60, 780 30 V 380 H 20 Z" fill="rgba(197,247,64,.1)"/>
            <path id="curve-line" d="M20 350 C 200 340, 330 300, 450 230 S 680 60, 780 30" stroke="#C5F740" stroke-width="10" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
            <circle id="curve-dot" cx="780" cy="30" r="20" fill="#C5F740"/>
          </svg></div>`)}

      <!-- 16 · versiones -->
      ${SPLIT("vers", `<div class="lbl" style="text-align:center">Tuyo para siempre</div>
          <div class="vers"><div class="vline"><i id="vline"></i></div>
            ${vers}
          </div>`)}

      <!-- 17 · lo que incluye -->
      ${FULL("incl", `<div class="incl">\n          ${incl}\n        </div>`)}

      <!-- 18 · CTA: logo (capa propia con mezcla "screen") + botón -->
      <div class="g clip" id="cta-logo-layer" style="mix-blend-mode: screen" ${clip(T.cta, 6)}>
        <div class="center" style="top:60px"><div id="cta-logo"><img src="img/logo-avatar-ads.webp" alt="" style="width:470px;display:block"></div></div>
      </div>
      <div class="g clip" id="cta" ${clip(T.cta, 7)}>
        <div class="center" style="top:1040px"><div id="cta-btn"><div class="btnw"><div class="ring" id="cta-ring"></div><div class="btn">Ver todo lo que incluye ${ARROW}</div></div></div></div>
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
          const soft = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, t);
          const fadeIn = (sel, t, d = 0.2) => tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: "power1.out" }, t);
          const count = (id, to, t, d, fmt) => { const o = { v: 0 }; tl.to(o, { v: to, duration: d, ease: "power2.out", onUpdate: () => { document.getElementById(id).textContent = fmt(o.v); } }, t); };
          const split = (a, b) => { tl.set(Z, { y: ${SPLIT_Y} }, a - ${ZE}); tl.set(Z, { y: 0 }, b - ${ZE}); };
          const D = ${JSON.stringify({ SP, FU, T }, (k, v) => (typeof v === "number" ? f3(v) : v))};

          // pantallas divididas: el video baja bajo la franja
          Object.values(D.SP).forEach(([a, b]) => split(a, b));
          // fondos desenfocados (si siguen a otra pantalla completa, entran sin fundido: si no, la cara asoma un fotograma)
          ${Object.keys(FULLS).map((k) => (Object.values(FU).some(([, e]) => Math.abs(e - FU[k][0]) < 0.01)
            ? `tl.set("#${k}", { opacity: 1 }, ${cut(FU[k][0])});`
            : `fadeIn("#${k}", ${cut(FU[k][0])}, 0.15);`)).join("\n          ")}

          // 02 · 30 videos: entran en cascada y se enciende el ganador
          for (let i = 0; i < 30; i++) tl.fromTo("#tile-" + i, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, D.SP.tiles[0] + 0.05 + i * ((D.T.tilesWin - D.SP.tiles[0] - 0.2) / 30));
          tl.to("#win", { opacity: 1, duration: 0.2 }, D.T.tilesWin);
          tl.fromTo("#tile-17", { scale: 1 }, { scale: 1.25, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, D.T.tilesWin);
          fadeIn("#wintag", D.T.tilesWin + 0.15, 0.25);

          // 03 · calendario + dinero
          rise("#cal-card", D.FU.cal[0] + 0.05);
          for (let i = 0; i < 21; i++) tl.set("#day-" + i, { "--on": 1 }, D.T.days[0] + i * ((D.T.days[1] - D.T.days[0]) / 21));
          rise("#money-card", D.FU.cal[0] + 0.25);
          for (let i = 0; i < 4; i++) tl.fromTo("#bill-" + i, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }, D.T.bills - 0.2 + i * 0.14);

          // 04 · recibo: una línea por palabra
          rise("#receipt-card", D.FU.receipt[0] + 0.02, 0.3);
          D.T.rows.forEach((t, i) => tl.fromTo("#rrow-" + i, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, t - 0.05));

          // 05 · precio: el contador sube en "fortuna"
          rise("#price-card", D.SP.price[0] + 0.05);
          count("price-n", 13, D.T.fortuna - 0.1, 0.8, (v) => Math.round(v));

          // 06 · reloj: las manecillas giran rápido
          soft("#clock-chip", D.T.clock[0] + 0.05);
          tl.fromTo("#hand", { rotation: 0, svgOrigin: "12 12" }, { rotation: 1080, svgOrigin: "12 12", duration: D.T.clock[1] - D.T.clock[0], ease: "none" }, D.T.clock[0]);

          // 08 · logo
          tl.fromTo("#logo-img", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, D.FU.logo[0] + 0.05);
          tl.fromTo("#glow", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power1.out" }, D.FU.logo[0] + 0.1);
          rise("#logo-lbl", D.FU.logo[0] + 0.45, 0.35);

          // 09 · nuestros anuncios en cascada + etiqueta del precio
          for (let i = 0; i < 6; i++) tl.fromTo("#fan-" + i, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.5)" }, D.FU.fan[0] + 0.05 + i * 0.09);
          tl.fromTo("#fan-tag", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, D.T.fanTag);

          // 10 · proceso A: 01 y luego 02
          for (let i = 0; i < 6; i++) tl.fromTo("#a-st-" + i, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, D.SP.stepsA[0] + 0.05 + i * 0.06);
          tl.set("#a-st-0", { className: "st act" }, D.T.steps[0] + 0.1);
          tl.set("#a-st-0", { className: "st done" }, D.T.steps[1]);
          tl.set("#a-ok-0", { opacity: 1 }, D.T.steps[1]);
          tl.set("#a-st-1", { className: "st act" }, D.T.steps[1]);

          // 11 · el propio avatar: esquinas + chip
          tl.fromTo("#brks", { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", transformOrigin: "50% 33%" }, D.T.avatar[0] + 0.05);
          soft("#avatar-chip", D.T.avatar[0] + 0.15);

          // 12 · proceso B: 01–03 hechos; 04, 05 y 06 al ritmo de la voz
          for (let i = 0; i < 6; i++) tl.set("#b-st-" + i, { className: i < 3 ? "st done" : "st" }, D.SP.stepsB[0]);
          for (let i = 0; i < 3; i++) tl.set("#b-ok-" + i, { opacity: 1 }, D.SP.stepsB[0]);
          fadeIn("#stepsB .steps", D.SP.stepsB[0], 0.15);
          D.T.stepsB.forEach((t, k) => {
            const i = 3 + k;
            if (i > 3) { tl.set("#b-st-" + (i - 1), { className: "st done" }, t); tl.set("#b-ok-" + (i - 1), { opacity: 1 }, t); }
            tl.set("#b-st-" + i, { className: "st act" }, t);
          });

          // 13 · tipos de negocio: una tarjeta por palabra
          for (let i = 0; i < 4; i++) tl.fromTo("#bz-" + i, { y: 40 }, { y: 0, duration: 0.35, ease: "power3.out" }, D.FU.biz[0] + 0.05 + i * 0.07);
          D.T.biz.forEach((t, i) => {
            tl.to("#bz-" + i, { opacity: 1, borderColor: "#C5F740", boxShadow: "0 0 50px rgba(197,247,64,.22)", duration: 0.2 }, t);
            tl.fromTo("#bz-" + i, { scale: 1 }, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, t);
          });

          // 14 · prueba real
          rise("#num-0", D.FU.proof[0] + 0.05, 0.35); rise("#num-1", D.FU.proof[0] + 0.15, 0.35);
          count("leads-n", 581, D.FU.proof[0] + 0.1, 0.9, (v) => Math.round(v));
          rise("#proof-img", D.FU.proof[0] + 0.25);

          // 15 · curva
          rise("#chart-card", D.SP.curve[0] + 0.05);
          tl.fromTo("#curve-line", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, D.SP.curve[0] + 0.2);
          tl.fromTo("#curve-fill", { opacity: 0 }, { opacity: 1, duration: 0.5 }, D.SP.curve[0] + 0.9);
          tl.fromTo("#curve-dot", { scale: 0, svgOrigin: "780 30" }, { scale: 1, svgOrigin: "780 30", duration: 0.3, ease: "back.out(2.5)" }, D.SP.curve[0] + 1.25);

          // 16 · versiones: se encienden una a una
          tl.to("#vline", { scaleX: 0.72, duration: D.T.vers[2] - D.T.vers[0] + 0.3, ease: "power1.inOut" }, D.T.vers[0]);
          D.T.vers.forEach((t, i) => tl.to("#vn-" + i, { opacity: 1, duration: 0.25 }, t));
          tl.to("#vn-3", { opacity: 1, duration: 0.3 }, D.T.vers[2] + 0.35);

          // 17 · lo que incluye, en cascada
          D.T.incl.forEach((t, i) => tl.fromTo("#in-" + i, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, t - 0.05));

          // 18 · CTA: logo + botón que rebota en "botón"
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
console.log("Divididas:", JSON.stringify(SP, (k, v) => (typeof v === "number" ? f3(v) : v)));
console.log("Completas:", JSON.stringify(FU, (k, v) => (typeof v === "number" ? f3(v) : v)));
