// Genera prompts/clip-NN.json (voz) y prompts-broll/broll-NN.json desde la plantilla LOCKED IN del master prompt + guion.txt + prompts-flow.md.
// Sin variables autorizadas: voz de hombre (la de la plantilla). Sostiene el frasco en la mano derecha: gesticula sobre todo con la izquierda.
// Uso (desde la raíz del proyecto): node anuncios/08-ejemplo-producto-serum/generar-prompts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { brollImagen, brollVideo, brollMarkdown } from "../../skills/reels-avatar-ads/scripts/broll-plantilla.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const t = fs.readFileSync(path.join(here, "../../skills/master prompt para json prompts videos.txt"), "utf8");
const s = t.slice(t.indexOf("## 4."), t.indexOf("## 5."));
const tpl = s.slice(s.indexOf("{"), s.lastIndexOf("}") + 1);

const FRASCO = "sostiene el mismo frasco ámbar con gotero de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, y gesticula con la mano izquierda";
// [clip, duración, texto exacto, gestos, descripción]
const clips = [
  ["01", 6, "Si tu piel se ve apagada por la mañana, mira lo que hago antes de salir.",
    `${FRASCO}: al decir 'Si tu piel se ve apagada', se toca suavemente la mejilla con las yemas de la mano izquierda; al decir 'por la mañana', hace una media sonrisa cómplice; al decir 'mira lo que hago antes de salir', levanta un poco el frasco hacia la cámara para mostrarlo`,
    "Hook: piel apagada"],
  ["02", 8, "Dos gotas de este sérum de vitamina C. Mira la textura: es ligera y se absorbe en segundos.",
    `${FRASCO}: al decir 'Dos gotas', muestra dos dedos con la mano izquierda; al decir 'de este sérum de vitamina C', acerca el frasco a la cámara con la etiqueta hacia delante; al decir 'Mira la textura', frota suavemente las yemas del pulgar y el índice de la mano izquierda; al decir 'se absorbe en segundos', se pasa las yemas de la mano izquierda por la mejilla con un movimiento corto y suave`,
    "Demostración: gotas y textura"],
  ["03", 8, "No deja la piel grasosa y la sientes fresca todo el día. Lo consigues en el botón de abajo.",
    `${FRASCO}: al decir 'No deja la piel grasosa', niega suavemente con la mano izquierda; al decir 'la sientes fresca todo el día', se toca la mejilla y sonríe satisfecho; al decir 'Lo consigues en el botón de abajo', señala hacia abajo con el índice de la mano izquierda`,
    "CTA: comprar"],
];

// B-rolls en 2 etapas: frame en Nano Banana (se elige) → video en Flow desde ese frame. Plantilla: skills/reels-avatar-ads/scripts/broll-plantilla.mjs
// En los frames se adjunta avatar/avatar.jpg para que el frasco sea el mismo.
const REF = "avatar/avatar.jpg";
const brolls = [
  { n: "01", dur: 6, desc: "Macro: dos gotas sobre el dorso de la mano", referencia: REF,
    shot: "a macro close-up of a drop of serum about to fall from a glass dropper onto the back of a man's hand, over a white bathroom sink",
    subject: "the back of a man's hand with real skin texture, fine hairs and visible veins; the glass dropper of the amber bottle above it, with a drop of clear, slightly golden serum at its tip",
    location: "a home bathroom in the morning",
    details: "a white sink with a few water droplets, the amber dropper bottle standing on the counter slightly out of focus, a folded beige towel",
    framing: "vertical macro, the hand filling the lower half of the frame, the dropper entering from the top",
    light: "soft morning light from the front",
    action: "caen exactamente dos gotas del gotero sobre el dorso de la mano y brillan con la luz",
    camera_movement: "cámara fija con un acercamiento muy lento" },
  { n: "02", dur: 6, desc: "Macro: textura ligera que se absorbe",
    shot: "a macro close-up of a man's thumb and index fingertips with a drop of serum between them",
    subject: "thumb and index fingertips with real skin texture and fingerprints, a small drop of clear, light, fluid serum between them",
    location: "a home bathroom in the morning",
    details: "the white sink blurred in the background",
    framing: "vertical macro, the fingertips centered",
    light: "soft morning light from the front",
    action: "los dedos se separan y se juntan despacio, mostrando que el sérum es ligero y no pegajoso; luego lo frotan y desaparece en la piel",
    camera_movement: "cámara fija" },
  { n: "03", dur: 6, desc: "Producto sobre el lavabo", referencia: REF,
    shot: "a close-up of the small amber glass dropper bottle standing on a bathroom counter",
    subject: "the amber glass bottle with a black rubber dropper cap and a plain cream label with no text, a few water droplets on the counter",
    location: "a home bathroom in the morning",
    details: "a rolled beige towel, a ceramic cup, a small plant blurred behind, white wall tiles",
    framing: "vertical, the bottle slightly off-center, camera at counter height",
    light: "soft warm morning daylight from the front, a gentle highlight on the glass",
    negative: ["text or brand on the label", "many products"],
    action: "la luz de la mañana hace brillar el vidrio ámbar",
    camera_movement: "deslizamiento lateral muy lento alrededor del frasco" },
];

fs.mkdirSync(path.join(here, "prompts"), { recursive: true });
fs.mkdirSync(path.join(here, "prompts-broll"), { recursive: true });
const total = clips.reduce((a, c) => a + c[1], 0);
let md = `# Anuncio 08 · Ejemplo producto físico (sérum de vitamina C) — Prompts para Google Flow\n\n` +
  `Voz: **${clips.length} clips · ${total} s** generados (≈ 20 s editado). Imagen de referencia de todos: \`avatar/avatar.jpg\`.\n` +
  `Validados con \`validar-json.mjs\` (sin variables autorizadas: voz de hombre).\n` +
  `B-rolls: adjunta también \`avatar/avatar.jpg\` como referencia para que el frasco sea el mismo.\n` +
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
