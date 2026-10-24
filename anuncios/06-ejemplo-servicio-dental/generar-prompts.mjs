// Genera prompts/clip-NN.json (voz) y prompts-broll/broll-NN.json desde la plantilla LOCKED IN del master prompt + guion.txt + prompts-flow.md.
// Variable autorizada en este anuncio: scene.dialogue.speaker = "mujer" (validar con --allow scene.dialogue.speaker).
// Uso (desde la raíz del proyecto): node anuncios/06-ejemplo-servicio-dental/generar-prompts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { brollImagen, brollVideo, brollMarkdown } from "../../skills/reels-avatar-ads/scripts/broll-plantilla.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const t = fs.readFileSync(path.join(here, "../../skills/master prompt para json prompts videos.txt"), "utf8");
const s = t.slice(t.indexOf("## 4."), t.indexOf("## 5."));
const tpl = s.slice(s.indexOf("{"), s.lastIndexOf("}") + 1);

const SPEAKER = "mujer";
// [clip, duración, texto exacto, gestos, descripción]
const clips = [
  ["01", 6, "¿Te da pena sonreír en las fotos? Lo veo todos los días en la clínica.",
    "al decir '¿Te da pena sonreír en las fotos?', inclina un poco la cabeza con empatía y abre una mano hacia la cámara, como preguntando; al decir 'Lo veo todos los días', asiente despacio; al decir 'en la clínica', abre la mano hacia un lado señalando suavemente el consultorio",
    "Hook: el dolor"],
  ["02", 8, "Con el diseño de sonrisa planificamos tu cambio en digital, y antes de empezar ya ves cómo vas a quedar.",
    "al decir 'Con el diseño de sonrisa', junta las yemas de los dedos de ambas manos frente al torso como si armara algo con cuidado; al decir 'planificamos tu cambio en digital', separa las manos despacio como si mostrara un plano; al decir 'antes de empezar ya ves cómo vas a quedar', abre ambas palmas hacia la cámara con una sonrisa tranquila y segura",
    "La solución: diseño de sonrisa"],
  ["03", 8, "Agenda tu primera valoración en el botón de abajo y te mostramos tu nueva sonrisa, sin compromiso.",
    "al decir 'Agenda tu primera valoración', abre una palma hacia la cámara en gesto de invitación; al decir 'en el botón de abajo', señala hacia abajo con el índice; al decir 'te mostramos tu nueva sonrisa', sonríe con calidez; al decir 'sin compromiso', mueve la mano abierta suavemente de lado a lado, tranquilizando",
    "CTA: agendar la valoración"],
];

// B-rolls en 2 etapas: frame en Nano Banana (se elige) → video en Flow desde ese frame. Plantilla: skills/reels-avatar-ads/scripts/broll-plantilla.mjs
const brolls = [
  { n: "01", dur: 8, desc: "Consultorio dental",
    shot: "a slow handheld shot of a small, real dental clinic consultation room in Latin America, with no people",
    subject: "a white and light-gray dental chair with a slightly worn seat cushion, the folded dental light arm and a small instrument tray",
    location: "a modest, well-kept neighborhood dental clinic, during the day",
    details: "white cabinets with a light wood countertop, a box of gloves and a cup of cotton rolls on the counter, a small plant, a framed diploma on the wall (unreadable)",
    framing: "vertical, at eye level from the doorway, the chair slightly off-center",
    light: "soft daylight from a window in front of the camera plus the neutral ceiling light of the clinic",
    negative: ["people, a patient in the chair", "futuristic high-tech clinic, neon or blue lighting"],
    action: "la cámara avanza muy despacio hacia el sillón, como alguien que entra al consultorio",
    camera_movement: "avance lento en mano, con un leve balanceo natural",
    audio: "solo sonido ambiente suave de la clínica, sin música ni voces" },
  { n: "02", dur: 6, desc: "Sonrisa natural en primer plano",
    shot: "a close-up of the lower half of a young Latin American woman's face while she sits in a dental chair, from the nose down",
    subject: "natural lips with no heavy makeup, mouth closed in a relaxed neutral expression, real skin texture with pores, a paper patient bib clipped at her neck",
    location: "a dental clinic consultation room",
    details: "the blurred dental light above, a light-gray headrest behind her head",
    framing: "tight vertical close-up, from the tip of the nose to the chin and neck",
    light: "soft frontal light from the dental lamp, slightly warm",
    negative: ["eyes or full face visible", "dental instruments in the mouth, gloves, blood"],
    action: "pasa de la boca cerrada y relajada a una sonrisa amplia, natural y segura, con dientes naturales y parejos, no perfectos ni blanqueados en exceso",
    camera_movement: "cámara casi fija con un acercamiento muy lento",
    audio: "solo sonido ambiente suave, sin música ni voces" },
];

fs.mkdirSync(path.join(here, "prompts"), { recursive: true });
fs.mkdirSync(path.join(here, "prompts-broll"), { recursive: true });
const total = clips.reduce((a, c) => a + c[1], 0);
let md = `# Anuncio 06 · Ejemplo servicio (clínica dental) — Prompts para Google Flow\n\n` +
  `Voz: **${clips.length} clips · ${total} s** generados (≈ 20 s editado). Imagen de referencia de todos: \`avatar/avatar.jpg\`.\n` +
  `Validados con \`validar-json.mjs --allow scene.dialogue.speaker\` (variable autorizada: voz de mujer).\n` +
  `Guarda los clips como \`clips/clip-01.mp4\` … y los B-rolls: primero el frame (\x60broll/broll-01.jpg\x60) y después el video (\x60clips/broll-01.mp4\x60).\n`;
const img = fs.readFileSync(path.join(here, "avatar", "prompt-nano-banana.json"), "utf8").trim();
md += `\n---\n\n# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)\n\nGenera 4 variaciones con este prompt y guarda la elegida como \`avatar/avatar.jpg\`. Es la imagen de referencia de todos los clips de voz.\n\n\`\`\`json\n${img}\n\`\`\`\n\n---\n\n# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)\n`;
for (const [n, dur, script, sync, desc] of clips) {
  const j = JSON.parse(tpl);
  j.scene.dialogue.speaker = SPEAKER;
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
