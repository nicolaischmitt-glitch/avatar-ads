// Anuncio 07 · ejemplo de generación de leads (clase gratuita de inglés). Construye public/index.html.
// Misma mecánica que el 06 (transcript.json + base-cortes.json + CONFIG), con un set de escenas distinto:
// azul marino + coral, subtítulos en caja azul rectangular, B-roll de videollamada, pantalla dividida (vocabulario ✓ / práctica guiada),
// rótulo del profesor en tarjeta blanca, frases de reunión en cascada sobre los apuntes, botón coral, notificación de correo y cierre con la marca.
// Los subtítulos nunca se parecen a ningún otro gráfico (rótulo, logo y notificación en blanco; el botón es la única píldora coral).
// Marca de agua "AVATAR ADS 1.0" fija (ejemplos de la landing, aprobada el 27 oct 2026). Storyboard aprobado: ../storyboard/storyboard.png
// Uso: node build.mjs → hyperframes lint public → hyperframes render public -o ../final/… --fps 24
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const words = JSON.parse(fs.readFileSync(path.join(here, "transcript.json"), "utf8"));
const segs = JSON.parse(fs.readFileSync(path.join(here, "base-cortes.json"), "utf8"));
const FPS = 24;
const HOLD = 0.7;                                       // cierre congelado al final (input-video.mp4 ya lo trae)
const DUR = Math.round((segs.at(-1).end + HOLD) * FPS) / FPS;

const q = (t) => Math.round(t * FPS) / FPS;
const f3 = (n) => +n.toFixed(3);
const cut = (t) => Math.floor(t * 1000) / 1000;
const ZE = 0.002;
const norm = (s) => s.toLowerCase().replace(/[¿?¡!.,]/g, "");
const at = (txt, from = 0) => {
  const w = words.find((x) => x.start >= from - 0.05 && norm(x.text) === norm(txt));
  if (!w) throw new Error(`No encuentro la palabra "${txt}" desde ${from}`);
  return w;
};
const S = (i) => segs[i].start;

// ───────────────────────── CONFIG ─────────────────────────
const ID = "anuncio-07";
// Segmentos (v2, 27 oct 2026): 0 Si entiendes inglés, pero te bloqueas… hablarlo (una sola toma, sin corte) · 1 no te falta vocabulario · 2 Te falta práctica guiada
//            3 Por eso preparé una clase gratuita · 4 con las frases… reunión de trabajo · 5 Regístrate gratis… abajo · 6 y te envío… clase
// Frases del subtítulo (en orden) y la palabra clave de cada una (en coral).
const PHRASES = [
  ["Si entiendes inglés,", "inglés"], ["pero te bloqueas", "bloqueas"], ["cuando tienes que hablarlo,", "hablarlo"],
  ["no te falta vocabulario.", "vocabulario"], ["Te falta práctica guiada.", "práctica guiada"],
  ["Por eso preparé una clase gratuita", "clase gratuita"], ["con las frases que más se usan", "frases"], ["en una reunión de trabajo.", "reunión de trabajo"],
  ["Regístrate gratis", "gratis"], ["en el botón de abajo", "botón de abajo"], ["y te envío el enlace de la clase.", "enlace"],
];
const SPLIT_SUBS = [3, 4];                                // frases que van en la franja de la pantalla dividida
// Zoom por segmento [entrada, salida]. Cada corte visible cambia la escala ≥ 0,1. Los segmentos 1–2 (dividida) no se ven a pantalla completa.
const ZOOM = [[1.0, 1.06], [1.0, 1.0], [1.0, 1.0], [1.0, 1.04], [1.14, 1.18], [1.0, 1.04], [1.12, 1.15]];
const SPLIT_Y = 740;                                      // cuánto baja el video del avatar en la pantalla dividida (la cara queda bajo la franja)
const T = {
  split: [S(1), S(3)],                                           // pantalla dividida: "no te falta vocabulario. Te falta práctica guiada."
  vocab: at("vocabulario").start, practica: at("práctica").start,
  lower: [S(3) + 0.1, S(4)],                                     // rótulo del profesor: "Por eso preparé una clase gratuita" (quién te la da)
  notes: [S(4), at("en", S(4) + 1).start - 0.04],                // frases sobre el fondo desenfocado: "con las frases que más se usan"
  phT: [S(4) + 0.05, at("más", S(4)).start - 0.1, at("usan", S(4)).start - 0.05],
  gratis: at("gratis").start,
  btn: [at("en", S(5) + 0.5).start - 0.04, S(6)], boton: at("botón").start, // botón: "en el botón de abajo"
  notif: [S(6) + 0.05, 0],                                       // notificación de correo: "y te envío el enlace de la clase"
  end: [q(segs.at(-1).end - 0.45), DUR],                         // marca + botón al terminar de hablar, hasta el final
};
T.notif[1] = T.end[0];
// Sin B-rolls en esta versión (el usuario los quitó el 27 oct 2026): las frases van sobre el propio video desenfocado.
const PH = [
  ["Could you repeat that?", "¿Puedes repetirlo?"],
  ["Let me share my screen.", "Déjame compartir pantalla."],
  ["I'll follow up by email.", "Te escribo por correo."],
];
// ────────────────────────────────────────────────────────────

// ── subtítulos por frase
let wi = 0, subsHtml = "", subsJs = "";
const blocks = PHRASES.map(([text]) => {
  const n = text.split(/\s+/).length;
  const ws = words.slice(wi, wi + n);
  ws.forEach((w, k) => { if (norm(w.text) !== norm(text.split(/\s+/)[k])) throw new Error(`Frase "${text}": la palabra ${k + 1} es "${w.text}"`); });
  wi += n;
  return ws;
});
if (wi !== words.length) throw new Error(`Las frases cubren ${wi} de ${words.length} palabras`);
blocks.forEach((ws, i) => {
  const [text, key] = PHRASES[i];
  let start = Math.max(0, q(ws[0].start - 0.06));
  if (i === SPLIT_SUBS.at(-1) + 1) start = Math.max(start, q(T.split[1]));   // la frase siguiente espera a que termine la dividida
  if (SPLIT_SUBS.includes(i) && i === SPLIT_SUBS[0]) start = q(T.split[0]);
  let end = blocks[i + 1] ? q(blocks[i + 1][0].start - 0.06) : T.end[0];
  if (i === SPLIT_SUBS.at(-1)) end = q(T.split[1]);
  const html = text.replace(key, `<b>${key}</b>`);
  const cls = SPLIT_SUBS.includes(i) ? "sub split" : "sub";
  subsHtml += `      <div class="${cls} clip" id="sub-${i}" data-start="${f3(start)}" data-duration="${f3(end - start)}" data-track-index="3"><span>${html}</span></div>\n`;
  subsJs += `          tl.fromTo("#sub-${i} span", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, ${f3(start)});\n`;
});

// ── zooms + golpe en "gratis"
let zoomJs = "";
segs.forEach((s, i) => {
  const [a, b] = ZOOM[i];
  zoomJs += `          tl.set(Z, { scale: ${a} }, ${f3(Math.max(0, s.start - ZE))});\n`;
  const end = i === segs.length - 1 ? DUR : s.end;
  if (i === 5) {
    const tg = q(T.gratis);
    zoomJs += `          tl.to(Z, { scale: ${b}, duration: ${f3(tg - s.start)}, ease: "none" }, ${f3(s.start)});\n`;
    zoomJs += `          tl.to(Z, { scale: ${b + 0.07}, duration: 0.3, ease: "power3.out" }, ${f3(tg)});\n`;
  } else if (a !== b) {
    zoomJs += `          tl.to(Z, { scale: ${b}, duration: ${f3(end - s.start - 0.05)}, ease: "none" }, ${f3(s.start)});\n`;
  }
});

const clip = ([a, b], track) => `data-start="${cut(a)}" data-duration="${f3(cut(b) - cut(a))}" data-track-index="${track}"`;

// ── sonido: música suave + pocos efectos, muy por debajo de la voz
const sfx = [
  ["whoosh-short", T.split[0] - 0.1, 0.574, 0.1],
  ["click-soft", T.vocab, 0.365, 0.3],
  ["pop", T.practica, 0.72, 0.18],
  ["pop", T.lower[0] + 0.05, 0.72, 0.14],
  ["whoosh-short", T.notes[0] - 0.1, 0.574, 0.1],
  ...T.phT.map((t) => ["click-soft", t, 0.365, 0.22]),
  ["chime", T.boton, 1, 0.16],
  ["pop", T.notif[0] + 0.05, 0.72, 0.16],
  ["pop", T.end[0] + 0.05, 0.72, 0.14],
];
const sfxHtml = sfx.map(([n, t, d, v], i) =>
  `      <audio id="sfx-${String(i + 1).padStart(2, "0")}-${n}" src="audio/${n}.mp3" data-start="${f3(q(t))}" data-duration="${f3(Math.min(d, DUR - q(t)))}" data-track-index="${11 + (i % 4)}" data-volume="${v}"></audio>`).join("\n");

const CHECK = (c) => `<svg viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>`;
const BTN = (id) => `<div class="btnw"><div class="ring" id="${id}-ring"></div><div class="btn">Registrarme gratis ${ARROW}</div></div>`;
const phHtml = PH.map(([en, es], i) => `<div class="ph" id="ph-${i}" style="margin-left:${i * 50}px"><div class="k">${i + 1}</div><div><div class="en">${en}</div><div class="es">${es}</div></div></div>`).join("\n          ");

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: "Jakarta"; src: url("fonts/PlusJakartaSans.woff2") format("woff2"); font-weight: 200 800; font-display: block; }
      @font-face { font-family: "ArchivoWM"; src: url("fonts/Archivo-800.woff2") format("woff2"); font-weight: 800; font-display: block; }
      :root { --navy: #13294B; --navy-2: #1E3A66; --coral: #FF6B4A; --ink: #13294B; --soft: #6A7A93; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; font-family: "Jakarta", sans-serif; color: var(--ink); }
      #stage { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #000; }
      #video-wrap { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
      #zoom { position: absolute; inset: 0; transform-origin: 50% 33%; }
      #zoom video { width: 100%; height: 100%; object-fit: cover; }
      .g { position: absolute; z-index: 10; left: 0; top: 0; width: 1080px; height: 1920px; pointer-events: none; }
      .center { position: absolute; left: 0; right: 0; display: flex; justify-content: center; }
      /* subtítulo por frase: caja azul marino rectangular, palabra clave en coral (altura del pecho, fuera del 20 % inferior) */
      .sub { position: absolute; z-index: 20; left: 0; right: 0; top: 1330px; display: flex; justify-content: center; pointer-events: none; }
      .sub span { display: inline-block; background: rgba(19,41,75,.94); color: #fff; font-weight: 800; font-size: 62px; line-height: 1.15; letter-spacing: -0.5px;
        padding: 20px 40px; border-radius: 16px; box-shadow: 0 14px 40px rgba(0,0,0,.28); text-align: center; max-width: 960px; }
      .sub b { color: var(--coral); font-weight: 800; }
      /* en la pantalla dividida el subtítulo va en la franja (sobre la línea divisoria) */
      .sub.split { top: 770px; height: 120px; align-items: center; }
      .sub.split span { background: none; box-shadow: none; padding: 0 30px; }
      /* fondo desenfocado del propio video (para las frases) */
      .full { position: absolute; z-index: 8; inset: 0; overflow: hidden; }
      .full .bg { position: absolute; inset: -60px; width: calc(100% + 120px); height: calc(100% + 120px); object-fit: cover; filter: blur(28px) saturate(.85); }
      .full .veil { position: absolute; inset: 0; background: rgba(19,41,75,.55); }
      /* pantalla dividida: panel arriba (0–820) + franja */
      .split-top { position: absolute; left: 0; right: 0; top: 0; height: 820px; background: var(--navy); display: flex; flex-direction: column; justify-content: center; padding: 0 90px 60px; gap: 34px; }
      .strip { position: absolute; left: 0; right: 0; top: 770px; height: 120px; background: var(--navy); border-bottom: 6px solid var(--coral); }
      .row { position: relative; display: flex; align-items: center; gap: 30px; background: var(--navy-2); border-radius: 30px; padding: 36px 40px; overflow: hidden; }
      .row .hl { position: absolute; inset: 0; background: var(--coral); opacity: 0; }
      .row .ic, .row .t, .row .tag { position: relative; }
      .row .ic { width: 84px; height: 84px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex: none; background: rgba(255,255,255,.14); }
      .row .ic svg { width: 48px; height: 48px; }
      .row .t { font-weight: 800; font-size: 56px; color: #fff; }
      .row .tag { margin-left: auto; font-weight: 800; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; color: var(--navy); background: #fff; padding: 12px 22px; border-radius: 999px; opacity: 0; }
      .row .bang { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #fff; opacity: 0; }
      /* rótulo del profesor: tarjeta blanca (nunca como el subtítulo) */
      .lower { position: absolute; left: 70px; top: 1090px; display: flex; align-items: center; gap: 26px; background: rgba(255,255,255,.97); border-radius: 30px; padding: 24px 40px 24px 24px; box-shadow: 0 14px 40px rgba(0,0,0,.22); }
      .lower .av { width: 92px; height: 92px; border-radius: 50%; background: var(--coral); display: flex; align-items: center; justify-content: center; flex: none; }
      .lower .av svg { width: 54px; height: 54px; }
      .lower .n { font-weight: 800; font-size: 46px; color: var(--ink); }
      .lower .r { font-weight: 600; font-size: 30px; color: var(--soft); margin-top: 4px; }
      /* frases de reunión */
      .phrases { position: absolute; left: 80px; right: 80px; top: 260px; display: flex; flex-direction: column; gap: 28px; }
      .ph { background: rgba(255,255,255,.97); border-radius: 30px; padding: 30px 38px; box-shadow: 0 18px 50px rgba(19,41,75,.28); display: flex; gap: 26px; align-items: flex-start; }
      .ph .k { flex: none; width: 66px; height: 66px; border-radius: 18px; background: var(--coral); color: #fff; font-weight: 800; font-size: 34px; display: flex; align-items: center; justify-content: center; }
      .ph .en { font-weight: 800; font-size: 46px; color: var(--ink); line-height: 1.15; }
      .ph .es { font-weight: 600; font-size: 30px; color: var(--soft); margin-top: 6px; }
      /* botón: la única píldora, coral */
      .btnw { position: relative; display: inline-block; }
      .btn { position: relative; display: inline-flex; align-items: center; gap: 22px; background: var(--coral); color: #fff; font-weight: 800; font-size: 58px; padding: 34px 62px; border-radius: 999px;
        box-shadow: 0 18px 50px rgba(255,107,74,.5); white-space: nowrap; }
      .btn svg { width: 54px; height: 54px; }
      .ring { position: absolute; inset: 0; border-radius: 999px; border: 6px solid var(--coral); opacity: 0; }
      /* notificación de correo */
      .notif { position: absolute; left: 70px; right: 70px; top: 1090px; background: rgba(255,255,255,.97); border-radius: 36px; padding: 30px 34px; display: flex; gap: 28px; align-items: center; box-shadow: 0 20px 60px rgba(0,0,0,.3); }
      .notif .ic { flex: none; width: 96px; height: 96px; border-radius: 24px; background: var(--navy); display: flex; align-items: center; justify-content: center; }
      .notif .ic svg { width: 56px; height: 56px; }
      .notif .h { display: flex; justify-content: space-between; font-weight: 800; font-size: 34px; color: var(--ink); }
      .notif .h span { font-weight: 600; color: var(--soft); font-size: 28px; }
      .notif .m { font-weight: 600; font-size: 34px; color: var(--ink); margin-top: 6px; }
      .notif .m b { color: var(--coral); }
      /* marca al cierre: tarjeta blanca */
      .brand { display: inline-flex; align-items: center; gap: 20px; background: rgba(255,255,255,.97); padding: 22px 42px; border-radius: 26px; box-shadow: 0 12px 34px rgba(0,0,0,.3); }
      .brand svg { width: 56px; height: 56px; }
      .brand b { font-weight: 800; font-size: 46px; color: var(--ink); }
      .brand b span { color: var(--coral); }
      .note { position: absolute; left: 0; right: 0; top: 1300px; text-align: center; font-weight: 800; font-size: 40px; color: #fff; text-shadow: 0 3px 12px rgba(0,0,0,.55); }
      /* marca de agua de los ejemplos de la landing: borde derecho a la altura del hombro, fija, encima de todo */
      #wm { position: absolute; right: 44px; top: 940px; z-index: 99; display: flex; align-items: center; gap: 12px; opacity: .6; pointer-events: none;
        font-family: "ArchivoWM", sans-serif; font-weight: 800; font-size: 30px; letter-spacing: 2px; color: #fff; text-shadow: 0 1px 6px rgba(0,0,0,.45); }
      #wm svg { width: 30px; height: 30px; filter: drop-shadow(0 1px 4px rgba(0,0,0,.4)); }
      #wm b { color: #C5F740; font-weight: 800; }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <div id="video-wrap">
        <div id="zoom"><video id="bg-video" src="input-video.mp4" playsinline data-has-audio="true" data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video></div>
      </div>
      <audio id="bgm" src="audio/bgm.wav" data-start="0" data-duration="${f3(DUR)}" data-track-index="2" data-volume="1"></audio>

      <!-- 03–04 · pantalla dividida -->
      <div class="g clip" id="split" ${clip(T.split, 8)}>
        <div class="split-top">
          <div class="row" id="row-0"><div class="ic"><div class="bang" id="chk" style="background:rgba(255,255,255,.14)">${CHECK("#fff")}</div></div><div class="t">Vocabulario</div></div>
          <div class="row" id="row-1"><div class="hl" id="row-1-hl"></div><div class="ic"><div class="bang" id="bang"><svg viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" stroke-width="3.2" stroke-linecap="round"><path d="M12 6v7M12 17.5v.5"/></svg></div></div><div class="t">Práctica guiada</div><div class="tag" id="tag">Te falta</div></div>
        </div>
        <div class="strip"></div>
      </div>

      <!-- 05 · rótulo del profesor -->
      <div class="g clip" id="lower" ${clip(T.lower, 6)}>
        <div class="lower" id="lower-box"><div class="av"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c2 2 10 2 12 0v-5"/></svg></div>
          <div><div class="n">Daniel Ríos</div><div class="r">Profesor de inglés para el trabajo</div></div></div>
      </div>

      <!-- 06 · frases de reunión sobre el video desenfocado -->
      <div class="full clip" id="phrases" ${clip(T.notes, 8)}>
        <img class="bg" src="broll/avatar-bg.jpg" alt=""><div class="veil"></div>
        <div class="phrases">
          ${phHtml}
        </div>
      </div>

      <!-- 09 · botón -->
      <div class="g clip" id="btn1" ${clip(T.btn, 7)}>
        <div class="center" style="top:1110px"><div id="btn1-b">${BTN("btn1")}</div></div>
      </div>

      <!-- 10 · notificación de correo -->
      <div class="g clip" id="notif" ${clip(T.notif, 7)}>
        <div class="notif" id="notif-card">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 7l9 6 9-6"/></svg></div>
          <div style="flex:1"><div class="h">Speak Up Academy <span>ahora</span></div><div class="m">Aquí tienes el <b>enlace de tu clase</b></div></div>
        </div>
      </div>

      <!-- 11 · cierre: marca + botón -->
      <div class="g clip" id="end" ${clip(T.end, 7)}>
        <div class="center" style="top:50px"><div class="brand" id="end-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 11h6M9 14h4"/></svg>
          <b>Speak Up <span>Academy</span></b></div></div>
        <div class="center" style="top:1110px"><div id="end-btn">${BTN("end")}</div></div>
        <div class="note" id="end-note">✓ 100% gratis · clase online</div>
      </div>

${subsHtml}
      <div id="wm"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="#C5F740"/></svg>AVATAR <b>ADS</b> 1.0</div>
${sfxHtml}

      <script src="vendor/gsap.min.js"></script>
      <script>
        (function () {
          const tl = window.gsap.timeline({ paused: true });
          const Z = "#zoom";
${zoomJs}
${subsJs}
          const rise = (sel, t, d = 0.4) => tl.fromTo(sel, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: d, ease: "power3.out" }, t);
          const soft = (sel, t) => tl.fromTo(sel, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, t);
          const fadeIn = (sel, t, d = 0.25) => tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: "power1.out" }, t);

          // 03–04 · pantalla dividida: el video del avatar baja bajo la franja
          tl.set("#zoom", { y: ${SPLIT_Y} }, ${f3(T.split[0] - ZE)});
          tl.set("#zoom", { y: 0 }, ${f3(T.split[1] - ZE)});
          tl.fromTo("#row-0", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, ${f3(T.split[0] + 0.05)});
          tl.fromTo("#row-1", { opacity: 0, x: -40 }, { opacity: 0.35, x: 0, duration: 0.35, ease: "power3.out" }, ${f3(T.split[0] + 0.15)});
          tl.fromTo("#chk", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, ${f3(q(T.vocab))});
          tl.to("#row-0", { opacity: 0.75, duration: 0.3 }, ${f3(q(T.practica) - 0.1)});
          tl.to("#row-1", { opacity: 1, duration: 0.2 }, ${f3(q(T.practica))});
          tl.to("#row-1-hl", { opacity: 1, duration: 0.25 }, ${f3(q(T.practica))});
          tl.fromTo("#row-1", { scale: 1 }, { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${f3(q(T.practica))});
          tl.fromTo("#bang", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, ${f3(q(T.practica) + 0.05)});
          tl.fromTo("#tag", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, ${f3(q(T.practica) + 0.2)});
          // 05 · rótulo
          tl.fromTo("#lower-box", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, ${f3(T.lower[0])});
          // 06 · frases en cascada sobre el fondo desenfocado
          fadeIn("#phrases", ${cut(T.notes[0])}, 0.15);
          ${JSON.stringify(T.phT.map(q))}.forEach((t, i) => tl.fromTo("#ph-" + i, { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" }, t));
          // 09 · botón (entra y rebota en "botón")
          soft("#btn1-b", ${f3(T.btn[0] + 0.03)});
          tl.to("#btn1-b", { y: 12, duration: 0.22, yoyo: true, repeat: 3, ease: "sine.inOut" }, ${f3(q(T.boton))});
          const pulse = (id, t, n) => { for (let k = 0; k < n; k++) tl.fromTo(id, { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.18, duration: 0.7, ease: "power2.out" }, t + k * 0.75); };
          pulse("#btn1-ring", ${f3(T.btn[0] + 0.3)}, 1);
          // 10 · notificación (baja como una notificación del celular)
          tl.fromTo("#notif-card", { opacity: 0, y: -50, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }, ${f3(T.notif[0])});
          // 11 · cierre
          rise("#end-brand", ${f3(T.end[0] + 0.03)});
          soft("#end-btn", ${f3(T.end[0] + 0.08)});
          rise("#end-note", ${f3(T.end[0] + 0.2)}, 0.35);
          pulse("#end-ring", ${f3(T.end[0] + 0.45)}, 2);

          window.__timelines = window.__timelines || {};
          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(here, "public", "index.html"), html);
const off = [T.notes].reduce((s, [a, b]) => s + (b - a), 0);
console.log(`index.html: ${blocks.length} frases, ${segs.length} segmentos, ${f3(DUR)} s · fuera de cámara ${off.toFixed(1)} s · avatar en cámara ${Math.round(((DUR - off) / DUR) * 100)} %`);
console.log("Escenas:", JSON.stringify(T, (k, v) => (typeof v === "number" ? f3(v) : v)));
