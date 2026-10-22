// Anuncio 04 · v3 "Keynote premium" (storyboard aprobado: ../moodboard/storyboard-anuncio-04-v4.png).
// Reglas: la cara nunca se tapa (gráficos solo en la banda superior; subtítulo a la altura del pecho);
// lo que necesita espacio va en un cutaway: su propio video desenfocado de fondo + el objeto flotando.
// Tipografía fina y grande, mucho aire, movimientos lentos, sin golpes de zoom.
// Uso: node build.mjs → hyperframes lint public → hyperframes render public -o … --fps 24
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
const ID = "anuncio-04-v3";
// Lo que la transcripción escribe mal (no cambia el audio).
const FIX = { "sidans,": "Seedance,", "sidans": "Seedance", "concidance,": "Con Seedance,", "2": "veinte", "nikolai,": "" };
// Palabras que se ven en verde.
const KEY = new Set(["existo", "artificial", "centavos", "minutos", "veinte", "segundo", "dólar", "ahorrar", "decenas", "ganadores", "escalar", "digitales", "tradicionales", "ads", "paso", "botón"]);

// Segmentos (15): 0 "Yo no existo… artificial" · 1 "por 67 centavos" · 2 "y en menos de veinte minutos" · 3 "Con Seedance"
// 4 "un solo segundo de video" · 5 "te puede costar casi un dólar" · 6 "¡Un solo segundo!" · 7 "Y no se trata solo de ahorrar"
// 8 "Si cada anuncio te cuesta centavos" · 9 "puedes testear decenas" · 10 c5 · 11 c6 · 12 "Si quieres aprender a hacerlo"
// 13 "únete… paso a paso" · 14 "Toca el botón y reserva tu lugar"  (con el clip 6 nuevo: 11 "Así… digitales" · 12 "y también servicios tradicionales" y todo lo de c7 sube un índice)
// Empuje lento por segmento [escala al entrar, al salir]; cada corte cambia la escala ≥ 0,08 (se siente como otra cámara).
const ZOOM = [
  [1.0, 1.05], [1.14, 1.18], [1.04, 1.08], [1.16, 1.18], [1.06, 1.08], [1.0, 1.04], [1.14, 1.2],
  [1.0, 1.04], [1.0, 1.02], [1.0, 1.02], [1.1, 1.14], [1.0, 1.0], [1.0, 1.0], [1.12, 1.15], [1.02, 1.06], [1.12, 1.16],
];

const T = {
  title: [0, at("mi").start - 0.04],
  gal: [at("mi").start - 0.04, S(1)],
  c67: [S(1), E(1)], c67n: at("67", S(1)).start,
  min: [S(2), E(2)],
  sec: [S(3), S(5)], secBar: at("segundo", S(4)).start,
  c91: [S(5), E(5)], c91n: at("dólar", S(5)).start,
  cmp: [S(6), E(6)],
  chap: [S(7), E(7)],
  dots: [S(8), at("y", S(10)).start - 0.04], dotsOn: at("puedes", S(9)).start, dotsWin: S(10),
  curve: [at("y", S(10)).start - 0.04, E(10)],
  hot: [S(11), S(12)],
  chat: [S(12), E(12)],
  logo: [S(13), at("dos", S(14)).start - 0.04],
  days: [at("dos", S(14)).start - 0.04, E(14)],
  cta: [S(15), DUR], boton: at("botón", S(15)).start,
};
const CUTAWAYS = [T.gal, T.dots, [T.hot[0], T.chat[1]]];   // escenas a pantalla completa (su video desenfocado de fondo)
const inR = (t, rs) => rs.some(([a, b]) => t >= a - 0.01 && t < b - 0.01);
// ────────────────────────────────────────────────────────────

// ── subtítulos elegantes: frases de hasta 4 palabras, sin cambios de color palabra a palabra
const display = (w) => (FIX[w.text.toLowerCase()] ?? w.text).replace(/[.,:…]$/, "");
const chunks = [];
let cur = [];
words.forEach((w, i) => {
  const prev = words[i - 1];
  if (cur.length && (cur.length >= 4 || (norm(w.text) === "y" && cur.length >= 2) || /[.,?!:…]$/.test(prev.text) || w.start - prev.end > 0.3 || inR(prev.start, CUTAWAYS) !== inR(w.start, CUTAWAYS))) { chunks.push(cur); cur = []; }
  cur.push(w);
});
if (cur.length) chunks.push(cur);
let subsHtml = "", subsJs = "", nSub = 0;
chunks.forEach((c, i) => {
  const txt = c.map(display).filter(Boolean);
  if (!txt.length) return;
  const start = Math.max(0, q(c[0].start - 0.04));
  const next = chunks[i + 1];
  const end = q(next ? Math.min(next[0].start - 0.04, c.at(-1).end + 0.45) : DUR);
  const id = `sub-${i}`; nSub++;
  const low = inR(c[0].start, CUTAWAYS) ? " low" : "";
  subsHtml += `      <div class="sub${low} clip" id="${id}" data-start="${f3(start)}" data-duration="${f3(end - start)}" data-track-index="3">` +
    txt.map((t) => (KEY.has(norm(t)) ? `<b>${t}</b>` : t)).join(" ") + `</div>\n`;
  subsJs += `          tl.fromTo("#${id}", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, ${f3(start)});\n`;
});

// ── empuje lento (sin golpes)
let zoomJs = "";
segs.forEach((s, i) => {
  const [a, b] = ZOOM[i];
  zoomJs += `          tl.set(Z, { scale: ${a} }, ${f3(Math.max(0, s.start - ZE))});\n`;
  zoomJs += `          tl.to(Z, { scale: ${b}, duration: ${f3(s.end - s.start - 0.04)}, ease: "none" }, ${f3(s.start)});\n`;
});

const clip = ([a, b], track) => `data-start="${cut(a)}" data-duration="${f3(cut(b) - cut(a))}" data-track-index="${track}"`;

// ── SFX discretos
const sfx = [
  ["whoosh-short", T.gal[0], 0.574, 0.12],
  ["click-soft", T.c67[0] + 0.05, 0.365, 0.25],
  ["click-soft", T.min[0] + 0.05, 0.365, 0.25],
  ["click-soft", T.sec[0] + 0.05, 0.365, 0.25],
  ["click-soft", T.c91[0] + 0.05, 0.365, 0.25],
  ["whoosh-cinematic", T.chap[0] - 0.3, 1.2, 0.12],
  ["whoosh-short", T.dots[0], 0.574, 0.12],
  ["sparkle", T.dotsWin, 1, 0.14],
  ["whoosh-short", T.hot[0], 0.574, 0.12],
  ["click-soft", T.chat[0] + 0.1, 0.365, 0.22],
  ["chime", T.boton, 1, 0.18],
];
const sfxHtml = sfx.map(([n, t, d, v], i) =>
  `      <audio id="sfx-${String(i + 1).padStart(2, "0")}-${n}" src="audio/${n}.mp3" data-start="${f3(q(t))}" data-duration="${f3(Math.min(d, DUR - q(t)))}" data-track-index="${11 + (i % 4)}" data-volume="${v}"></audio>`).join("\n");

const WIN = [3, 8, 13, 16, 22, 27, 29];
const dotsHtml = Array.from({ length: 30 }, (_, i) => `<i id="d-${i}"></i>`).join("");
const top = (id, rng, inner, track = 4, blend = false) => `      <div class="g clip" id="${id}"${blend ? " style=\"mix-blend-mode:screen\"" : ""} ${clip(rng, track)}><div class="hl" id="${id}-in" style="top:140px">${inner}</div></div>`;

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: "Archivo"; src: url("fonts/Archivo-800.woff2") format("woff2"); font-weight: 800; font-display: block; }
      @font-face { font-family: "Inter"; src: url("fonts/Inter-400.woff2") format("woff2"); font-weight: 300 400; font-display: block; }
      @font-face { font-family: "Inter"; src: url("fonts/Inter-600.woff2") format("woff2"); font-weight: 500 700; font-display: block; }
      @font-face { font-family: "JBM"; src: url("fonts/JetBrainsMono-500.woff2") format("woff2"); font-weight: 500; font-display: block; }
      :root { --accent: #c5f740; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #000; font-family: "Inter", sans-serif; color: #fff; }
      #stage { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #000; }
      #video-wrap { position: absolute; inset: 0; overflow: hidden; z-index: 1; }
      #zoom { position: absolute; inset: 0; transform-origin: 50% 42%; }
      #zoom video { width: 100%; height: 100%; object-fit: cover; }
      .top { position: absolute; z-index: 2; inset: 0 0 auto 0; height: 760px; pointer-events: none;
        background: linear-gradient(180deg, rgba(2,6,4,.82) 0%, rgba(2,6,4,.5) 55%, rgba(2,6,4,0) 100%); }
      .bot { position: absolute; z-index: 2; inset: auto 0 0 0; height: 760px; pointer-events: none; background: linear-gradient(0deg, rgba(2,6,4,.75) 0%, rgba(2,6,4,0) 100%); }
      .grain { position: absolute; z-index: 30; inset: 0; opacity: .04; mix-blend-mode: overlay; pointer-events: none;
        background-image: repeating-radial-gradient(circle at 17% 32%, #fff 0 1px, transparent 1px 3px), repeating-radial-gradient(circle at 71% 64%, #000 0 1px, transparent 1px 4px); }
      .g { position: absolute; z-index: 10; left: 0; top: 0; width: 1080px; height: 1920px; pointer-events: none; }
      .hl { position: absolute; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; text-align: center; }
      .label { font-family: "JBM", monospace; font-size: 26px; letter-spacing: 8px; text-transform: uppercase; color: var(--accent); }
      .thin { font-family: "Inter", sans-serif; font-weight: 300; color: #fff; letter-spacing: -4px; line-height: 1; }
      .rule { width: 220px; height: 2px; background: var(--accent); margin-top: 26px; box-shadow: 0 0 14px rgba(197,247,64,.5); transform-origin: 50% 50%; }
      .foot { font-family: "Inter"; font-weight: 400; font-size: 24px; color: rgba(255,255,255,.55); margin-top: 18px; letter-spacing: .5px; }
      .sub { position: absolute; z-index: 20; left: 90px; width: 900px; top: 1340px; text-align: center; font-family: "Inter", sans-serif; font-weight: 600; font-size: 56px; line-height: 1.2;
        color: #fff; text-shadow: 0 2px 18px rgba(0,0,0,.6); letter-spacing: -.5px; pointer-events: none; }
      .sub b { color: var(--accent); font-weight: 700; }
      .sub.low { top: 1450px; }
      /* cutaway keynote: su propio video desenfocado + objeto flotando */
      #frost { position: absolute; z-index: 7; left: -80px; top: -80px; width: 1240px; height: 2080px; object-fit: cover; filter: blur(46px) brightness(.42) saturate(1.1); opacity: 0; }
      .k { position: absolute; z-index: 8; left: 0; top: 0; width: 1080px; height: 1920px; pointer-events: none; }
      .float { position: absolute; border-radius: 34px; overflow: hidden; box-shadow: 0 60px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.12); }
      .float img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .device { position: absolute; left: 260px; top: 230px; width: 560px; height: 1150px; border-radius: 72px; padding: 18px; background: linear-gradient(145deg, #2b2f2d, #0c0e0d);
        box-shadow: 0 70px 140px rgba(0,0,0,.7), inset 0 0 0 2px rgba(255,255,255,.12); }
      .device .scr { width: 100%; height: 100%; border-radius: 56px; overflow: hidden; background: #0b141a; }
      .device .scr img { width: 100%; height: 100%; object-fit: contain; object-position: top; display: block; }
      .ring { position: absolute; border: 4px solid var(--accent); border-radius: 18px; box-shadow: 0 0 30px rgba(197,247,64,.45); }
      .dots { display: grid; grid-template-columns: repeat(6, 70px); gap: 34px; }
      .dots i { display: block; width: 70px; height: 70px; border-radius: 50%; border: 2px solid rgba(255,255,255,.28); }
      .cmp { display: grid; grid-template-columns: 1fr 2px 1fr; gap: 50px; align-items: end; }
      .cmp .kk { font-family: "JBM", monospace; font-size: 22px; letter-spacing: 5px; color: rgba(255,255,255,.6); text-transform: uppercase; margin-bottom: 14px; }
      .cmp .sep { height: 160px; background: rgba(255,255,255,.25); }
      .logo { width: 440px; }
      .btn { display: inline-flex; align-items: center; gap: 22px; padding: 30px 54px; border-radius: 999px; background: #f8f8f8; color: #071006; font-family: "Inter"; font-weight: 700; font-size: 50px;
        box-shadow: 0 20px 50px rgba(0,0,0,.4); white-space: nowrap; }
      .btn i { font-style: normal; color: #4a7a10; display: inline-block; }
    </style>
  </head>
  <body>
    <div id="stage" data-composition-id="${ID}" data-start="0" data-duration="${f3(DUR)}" data-fps="${FPS}" data-width="1080" data-height="1920">
      <div id="video-wrap">
        <div id="zoom"><video id="bg-video" src="input-video.mp4" playsinline data-has-audio="true" data-start="0" data-duration="${f3(DUR)}" data-track-index="1"></video></div>
      </div>
      <div class="top"></div><div class="bot"></div>

      <!-- banda superior: una sola idea a la vez, por encima de la cabeza -->
${top("t-title", T.title, `<div class="label">Avatar · 100% IA</div><div class="thin" style="font-size:150px;margin-top:24px">Yo no existo.</div><div class="rule" id="t-title-rule"></div>`)}
${top("t-c67", T.c67, `<div class="label">Costo de este avatar</div><div class="thin" id="c67-n" style="font-size:230px;margin-top:10px">$0,00</div>`)}
${top("t-min", T.min, `<div class="label">Tiempo</div><div class="thin" style="font-size:230px;margin-top:10px">&lt;20 min</div>`)}
${top("t-sec", T.sec, `<div class="label">Seedance 2.0 · 1080p</div><div class="thin" style="font-size:230px;margin-top:10px">1 s</div><div style="width:640px;height:3px;background:rgba(255,255,255,.2);margin-top:30px"><div id="sec-bar" style="width:100%;height:100%;background:#c5f740;transform-origin:0 50%"></div></div>`)}
${top("t-c91", T.c91, `<div class="label">Seedance · por segundo</div><div class="thin" id="c91-n" style="font-size:230px;margin-top:10px">$0,00</div><div class="foot">Seedance 2.0 · 1080p · BytePlus · oct 2026</div>`)}
${top("t-cmp", T.cmp, `<div class="cmp"><div><div class="kk">1 segundo · Seedance</div><div class="thin" style="font-size:130px">$0,91</div></div><div class="sep"></div><div id="cmp-b"><div class="kk" style="color:#c5f740">Este avatar · completo</div><div class="thin" style="font-size:130px;color:#c5f740">$0,67</div></div></div>`)}
${top("t-chap", T.chap, `<div class="label" style="margin-top:30px">La verdadera ventaja</div><div class="rule" id="t-chap-rule" style="width:120px"></div>`)}
${top("t-curve", T.curve, `<div class="label">Más tests → escalar</div><svg viewBox="0 0 800 300" style="width:800px;margin-top:20px"><line x1="0" y1="290" x2="800" y2="290" stroke="rgba(255,255,255,.25)" stroke-width="2"/><path id="curve" d="M0 280 C 260 275, 420 240, 540 170 S 720 40, 800 20" fill="none" stroke="#c5f740" stroke-width="5" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000"/><circle id="curve-dot" cx="800" cy="20" r="10" fill="#c5f740"/></svg>`)}
${top("t-logo", T.logo, `<img class="logo" src="broll/logo-avatar-ads.webp" alt="">`, 4, true)}
${top("t-live", T.logo, `<div class="label" style="margin-top:190px">Taller en vivo</div>`, 6)}
${top("t-days", T.days, `<div class="label">En vivo</div><div class="thin" style="font-size:200px;margin-top:10px">2 días</div>`)}
${top("t-cta", T.cta, `<img class="logo" src="broll/logo-avatar-ads.webp" alt="">`, 4, true)}
      <div class="g clip" id="cta" ${clip(T.cta, 5)}><div class="hl" style="top:1190px"><div class="btn" id="cta-btn">Reservar mi lugar <i id="cta-arrow">↓</i></div></div></div>

      <!-- cutaways: su propio video desenfocado de fondo -->
      <video id="frost" src="input-video.mp4" muted playsinline data-start="0" data-media-start="0" data-duration="${f3(DUR)}" data-track-index="2"></video>
      <div class="k clip" id="k-gal" ${clip(T.gal, 8)}>
        <div class="hl" style="top:230px"><div class="label">Creada desde cero</div><div class="thin" style="font-size:86px;margin-top:20px">100% inteligencia artificial</div></div>
        <div class="float" id="g1" style="left:110px;top:560px;width:270px;height:476px"><img src="broll/gal-1.png" alt=""></div>
        <div class="float" id="g2" style="left:405px;top:540px;width:270px;height:476px"><img src="broll/gal-2.png" alt=""></div>
        <div class="float" id="g3" style="left:700px;top:560px;width:270px;height:476px;box-shadow:0 60px 120px rgba(0,0,0,.6),0 0 0 4px #c5f740"><img src="broll/gal-3.png" alt=""></div>
      </div>
      <div class="k clip" id="k-dots" ${clip(T.dots, 8)}>
        <div class="hl" style="top:250px"><div class="label" id="dots-lab1">Anuncios testeados</div><div class="thin" id="dots-n" style="font-size:200px;margin-top:10px">0</div></div>
        <div class="hl" style="top:250px"><div class="label" id="dots-lab2" style="opacity:0">Ganadores</div></div>
        <div class="hl" style="top:640px"><div class="dots">${dotsHtml}</div></div>
      </div>
      <div class="k clip" id="k-hot" ${clip(T.hot, 8)}>
        <div class="hl" style="top:110px"><div class="label">Producto digital · Hotmart</div></div>
        <div class="device" id="hot-dev"><div class="scr"></div></div>
      </div>
      <video class="clip" id="hot-vid" src="broll/hotmart.mp4" muted playsinline style="position:absolute;z-index:9;left:278px;top:248px;width:524px;height:1114px;object-fit:cover;object-position:top;border-radius:56px" ${clip(T.hot, 9)}></video>
      <div class="g clip" id="hot-ring" ${clip(T.hot, 10)}><div class="ring" id="hot-r" style="left:300px;top:470px;width:480px;height:110px;opacity:0"></div></div>
      <div class="k clip" id="k-chat" ${clip(T.chat, 8)}>
        <div class="hl" style="top:110px"><div class="label">Servicio · resultado de un cliente</div></div>
        <div class="device" id="chat-dev"><div class="scr"><img src="broll/sebastian-limpio.png" alt=""></div></div>
        <div class="ring" id="chat-r" style="left:286px;top:996px;width:300px;height:76px;border-radius:14px;opacity:0"></div>
      </div>
      <div class="grain"></div>

${subsHtml}
${sfxHtml}

      <script src="vendor/gsap.min.js"></script>
      <script>
        (function () {
          const tl = window.gsap.timeline({ paused: true });
          const Z = "#zoom";
${zoomJs}
${subsJs}
          const rise = (sel, t, d = 0.45) => tl.fromTo(sel, { opacity: 0, y: 24, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "power3.out" }, t);
          const fade = (sel, t, d = 0.25) => tl.to(sel, { opacity: 0, duration: d, ease: "power1.in" }, t);
          const count = (id, to, t, d) => { const o = { v: 0 }; tl.to(o, { v: to, duration: d, ease: "power2.out", onUpdate: () => { document.getElementById(id).textContent = "$0," + String(Math.round(o.v)).padStart(2, "0"); } }, t); };
          // banda superior: entra con desenfoque suave y sale con un fundido
          ${JSON.stringify(["t-title", "t-c67", "t-min", "t-sec", "t-c91", "t-cmp", "t-chap", "t-curve", "t-logo", "t-live", "t-days", "t-cta"].map((id) => { const k = id === "t-live" ? "logo" : id.replace("t-", ""); return [id, cut(T[k][0]), cut(T[k][1])]; }))}.forEach(([id, a, b]) => {
            rise("#" + id + "-in", a + 0.02);
            if (b < ${f3(DUR - 0.1)}) fade("#" + id + "-in", b - 0.22);
          });
          tl.fromTo("#t-title-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.out" }, 0.3);
          tl.fromTo("#t-chap-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.out" }, ${f3(T.chap[0] + 0.3)});
          count("c67-n", 67, ${f3(q(T.c67n) - 0.15)}, 0.7);
          tl.fromTo("#sec-bar", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, ${f3(q(T.secBar))});
          count("c91-n", 91, ${f3(T.c91[0] + 0.2)}, 1.1);
          rise("#cmp-b", ${f3(T.cmp[0] + 0.35)});
          tl.to("#curve", { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, ${f3(T.curve[0] + 0.2)});
          tl.fromTo("#curve-dot", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", transformOrigin: "50% 50%" }, ${f3(T.curve[0] + 1.35)});
          // cambio carro → casa: disolvencia con desenfoque
          tl.to("#video-wrap", { filter: "blur(14px) brightness(1.15)", duration: 0.2, ease: "power1.in" }, ${f3(T.chap[0] - 0.2)});
          tl.to("#video-wrap", { filter: "blur(0px) brightness(1)", duration: 0.35, ease: "power2.out" }, ${f3(T.chap[0])});
          // cutaways
          ${JSON.stringify(CUTAWAYS.map(([a, b]) => [cut(a), cut(b)]))}.forEach(([a, b]) => {
            tl.set("#frost", { opacity: 1 }, a - ${ZE});
            tl.set("#frost", { opacity: 0 }, b - ${ZE});
          });
          tl.set("#frost", { opacity: 0 }, 0);
          ["#g1", "#g2", "#g3"].forEach((g, k) => tl.fromTo(g, { opacity: 0, y: 90, rotate: 0 }, { opacity: 1, y: k === 1 ? 0 : 30, rotate: [-6, 0, 6][k], duration: 0.55, ease: "power3.out" }, ${f3(T.gal[0] + 0.05)} + k * 0.1));
          const DS = ${f3(T.dots[0] + 0.15)}, DD = ${f3(Math.max(0.9, T.dotsWin - T.dots[0] - 0.45))};
          for (let i = 0; i < 30; i++) tl.to("#d-" + i, { backgroundColor: "rgba(255,255,255,.85)", borderColor: "rgba(255,255,255,0)", duration: 0.12 }, DS + (i / 29) * DD);
          { const o = { v: 0 }; tl.to(o, { v: 30, duration: DD, ease: "none", onUpdate: () => { document.getElementById("dots-n").textContent = String(Math.round(o.v)); } }, DS); }
          tl.set("#dots-lab1", { opacity: 0 }, ${f3(T.dotsWin)}); tl.set("#dots-lab2", { opacity: 1 }, ${f3(T.dotsWin)});
          for (let i = 0; i < 30; i++) if (!${JSON.stringify(WIN)}.includes(i)) tl.to("#d-" + i, { backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,.22)", duration: 0.3 }, ${f3(T.dotsWin)});
          ${JSON.stringify(WIN)}.forEach((i, k) => tl.to("#d-" + i, { backgroundColor: "#c5f740", boxShadow: "0 0 30px rgba(197,247,64,.7)", duration: 0.2 }, ${f3(T.dotsWin + 0.1)} + k * 0.12));
          { const o = { v: 0 }; tl.to(o, { v: ${WIN.length}, duration: ${f3(WIN.length * 0.12 + 0.1)}, ease: "none", onUpdate: () => { const n = document.getElementById("dots-n"); n.textContent = String(Math.round(o.v)); n.style.color = "#c5f740"; } }, ${f3(T.dotsWin + 0.1)}); }
          tl.fromTo(["#hot-dev", "#hot-vid"], { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, ${cut(T.hot[0])});
          tl.to("#hot-r", { opacity: 1, duration: 0.3 }, ${f3(T.hot[0] + 1.15)});
          rise("#chat-dev", ${cut(T.chat[0])}, 0.4);
          tl.to("#chat-r", { opacity: 1, duration: 0.3 }, ${f3(T.chat[0] + 0.45)});
          // botón
          tl.fromTo("#cta-btn", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, ${f3(T.cta[0] + 0.1)});
          tl.to("#cta-arrow", { y: 10, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, ${f3(q(T.boton))});

          window.__timelines = window.__timelines || {};
          window.__timelines["${ID}"] = tl;
        })();
      </script>
    </div>
  </body>
</html>
`;
fs.writeFileSync(path.join(here, "public", "index.html"), html);
const full = CUTAWAYS.reduce((s, [a, b]) => s + (b - a), 0);
console.log(`index.html: ${nSub} subtítulos, ${segs.length} segmentos, ${f3(DUR)} s · avatar en cámara ${(DUR - full).toFixed(1)} s (${Math.round(((DUR - full) / DUR) * 100)} %)`);
