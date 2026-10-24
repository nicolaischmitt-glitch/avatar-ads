// Genera prompts/clip-NN.json (voz) y prompts-broll/broll-NN.json desde la plantilla LOCKED IN del master prompt + guion.txt + prompts-flow.md.
// Sin variables autorizadas: voz de hombre (la de la plantilla).
// Clip 03 (23 oct 2026): "te envío el acceso a tu correo" → "te envío el enlace de la clase": Flow lo bloqueaba por políticas ("acceso" + "correo" + "regístrate").
// Uso (desde la raíz del proyecto): node anuncios/07-ejemplo-leads-clase-ingles/generar-prompts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { brollImagen, brollVideo, brollMarkdown } from "../../skills/reels-avatar-ads/scripts/broll-plantilla.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const t = fs.readFileSync(path.join(here, "../../skills/master prompt para json prompts videos.txt"), "utf8");
const s = t.slice(t.indexOf("## 4."), t.indexOf("## 5."));
const tpl = s.slice(s.indexOf("{"), s.lastIndexOf("}") + 1);

// [clip, duración, texto exacto, gestos, descripción]
const clips = [
  ["01", 6, "Si entiendes inglés pero te bloqueas cuando tienes que hablarlo, no te falta vocabulario.",
    "al decir 'Si entiendes inglés', se toca suavemente la sien con el índice; al decir 'te bloqueas cuando tienes que hablarlo', cierra la mano frente a la boca y la abre despacio, como si las palabras no salieran; al decir 'no te falta vocabulario', niega con la cabeza y con el índice, seguro",
    "Hook: el bloqueo"],
  ["02", 8, "Te falta práctica guiada. Por eso preparé una clase gratuita con las frases que más se usan en una reunión de trabajo.",
    "al decir 'Te falta práctica guiada', abre ambas palmas hacia la cámara; al decir 'preparé una clase gratuita', se lleva una mano al pecho; al decir 'las frases que más se usan', cuenta con los dedos de una mano uno, dos y tres; al decir 'en una reunión de trabajo', abre las manos hacia los lados como presentando una mesa de reunión",
    "La solución: la clase gratuita"],
  ["03", 8, "Regístrate gratis en el botón de abajo y te envío el enlace de la clase.",
    "al decir 'Regístrate gratis', abre una palma hacia la cámara en gesto de invitación; al decir 'en el botón de abajo', señala hacia abajo con el índice; al decir 'te envío el enlace de la clase', mueve la mano hacia delante como si entregara algo y sonríe",
    "CTA: registrarse"],
];

// B-rolls en 2 etapas: frame en Nano Banana (se elige) → video en Flow desde ese frame. Plantilla: skills/reels-avatar-ads/scripts/broll-plantilla.mjs
const brolls = [
  { n: "01", dur: 6, desc: "Reunión de trabajo por videollamada",
    shot: "an over-the-shoulder shot of a young Latin American woman in a work video call at her desk",
    subject: "the back of her shoulder and the side of her head (face not visible), dark hair tied back, her hand resting near the laptop trackpad",
    location: "a small shared office, during the day",
    details: "a laptop whose screen is blurred and unreadable, a notebook, a reusable water bottle, an empty office chair and a plant in the background",
    framing: "vertical, over the shoulder, the laptop screen out of focus",
    light: "soft daylight from a window in front of her, behind the laptop",
    negative: ["her face visible", "readable screen, faces on the screen"],
    action: "levanta la mano libre y gesticula un poco, como si empezara a hablar en la reunión",
    camera_movement: "cámara en mano muy estable, con un acercamiento lento",
    audio: "solo sonido ambiente suave de oficina, sin música ni voces" },
  { n: "02", dur: 6, desc: "Apuntes de la clase",
    shot: "a top-down shot of a light wooden desk with an open notebook",
    subject: "a man's hand in a rolled-up light blue oxford shirt sleeve holding a pen over an open notebook with blurred handwriting (no readable words)",
    location: "a home office, during the day",
    details: "a coffee mug with a faint stain ring, the corner of a laptop, a phone face down, a few blank sticky notes",
    framing: "vertical top-down, the notebook centered",
    light: "soft daylight from a window",
    negative: ["readable words or letters"],
    action: "la mano escribe con calma una línea en la libreta",
    camera_movement: "cámara casi fija con un deslizamiento muy lento",
    audio: "solo el sonido suave del bolígrafo sobre el papel, sin música ni voces" },
];

fs.mkdirSync(path.join(here, "prompts"), { recursive: true });
fs.mkdirSync(path.join(here, "prompts-broll"), { recursive: true });
const total = clips.reduce((a, c) => a + c[1], 0);
let md = `# Anuncio 07 · Ejemplo generación de leads (clase gratuita de inglés) — Prompts para Google Flow\n\n` +
  `Voz: **${clips.length} clips · ${total} s** generados (≈ 18 s editado). Imagen de referencia de todos: \`avatar/avatar.jpg\`.\n` +
  `Validados con \`validar-json.mjs\` (sin variables autorizadas: voz de hombre).\n` +
  `Guarda los clips como \`clips/clip-01.mp4\` … y los B-rolls: primero el frame (\x60broll/broll-01.jpg\x60) y después el video (\x60clips/broll-01.mp4\x60).\n`;
const img = fs.readFileSync(path.join(here, "avatar", "prompt-nano-banana.json"), "utf8").trim();
md += `\n---\n\n# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)\n\nGenera 4 variaciones con este prompt y guarda la elegida como \`avatar/avatar.jpg\`. Es la imagen de referencia de todos los clips de voz.\n\n\`\`\`json\n${img}\n\`\`\`\n\n---\n\n# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)\n`;
for (const [n, dur, script, sync, desc] of clips) {
  const j = JSON.parse(tpl);
  j.scene.dialogue.script = script;
  j.scene.performance.hand_gestures.synchronization = sync;
  const txt = JSON.stringify(j, null, 2);
  fs.writeFileSync(path.join(here, "prompts", `clip-${n}.json`), txt + "\n");
  md += `\n## Clip ${n} · ${dur} s — ${desc}\n\n\`\`\`json\n${txt}\n\`\`\`\n`;
}
for (const f of fs.readdirSync(path.join(here, "prompts-broll"))) fs.rmSync(path.join(here, "prompts-broll", f));
for (const b of brolls) {
  fs.writeFileSync(path.join(here, "prompts-broll", `broll-${b.n}-imagen.json`), JSON.stringify(brollImagen(b), null, 2) + "\n");
  fs.writeFileSync(path.join(here, "prompts-broll", `broll-${b.n}-video.json`), JSON.stringify(brollVideo(b), null, 2) + "\n");
}
md += brollMarkdown(brolls);
fs.writeFileSync(path.join(here, "guion.txt"), clips.map((c) => c[2]).join(" ") + "\n");
fs.writeFileSync(path.join(here, "prompts-flow.md"), md);
console.log(`${clips.length} clips + ${brolls.length} B-rolls → prompts/ · prompts-broll/ · guion.txt · prompts-flow.md`);
