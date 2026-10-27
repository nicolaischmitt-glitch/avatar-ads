// Genera prompts/clip-NN.json (voz) y prompts-broll/broll-NN.json desde la plantilla LOCKED IN del master prompt + guion.txt + prompts-flow.md.
// Variable autorizada en este anuncio: scene.dialogue.speaker = "mujer" (validar con --allow scene.dialogue.speaker).
// Sostiene el frasco en la mano derecha: gesticula sobre todo con la izquierda.
// LOCKED IN del producto (27 oct 2026): PRODUCTO se copia igual en el prompt del producto (Paso 0), en el del avatar y en los
// B-rolls donde sale el frasco, y en todos se adjunta producto/producto.png como referencia.
// Uso (desde la raíz del proyecto): node anuncios/08-ejemplo-producto-serum/generar-prompts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { brollImagen, brollVideo, brollMarkdown } from "../../skills/reels-avatar-ads/scripts/broll-plantilla.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const t = fs.readFileSync(path.join(here, "../../skills/master prompt para json prompts videos.txt"), "utf8");
const s = t.slice(t.indexOf("## 4."), t.indexOf("## 5."));
const tpl = s.slice(s.indexOf("{"), s.lastIndexOf("}") + 1);

const SPEAKER = "mujer";

// Producto ficticio: sérum de vitamina C de la marca ALBA. Mismo bloque, palabra por palabra, en cada prompt de imagen.
const ETIQUETA = "ALBA / VITAMINA C";
const PRODUCTO = {
  name: "ALBA vitamin C face serum (a fictional brand)",
  bottle: "a small 30 ml amber-brown glass Boston round dropper bottle with rounded shoulders, about 9 cm tall including the dropper (roughly the length of an adult index finger), smooth glass with subtle real reflections",
  dropper: "a glossy black rubber bulb on top of a black ribbed plastic screw collar; when the dropper is out, a clear glass pipette with a narrow tip",
  label: "a matte cream paper label (#F4EDE2) wrapped around the middle of the bottle, covering about half of its height, with a thin solid orange band (#F28C28) along its bottom edge; flat, clean print, no gloss",
  label_text: "exactly two centered lines and nothing else: 'ALBA' in large bold dark-brown sans-serif capital letters, and below it 'VITAMINA C' in smaller dark-brown sans-serif capital letters; no other words, numbers, icons or symbols",
  serum: "a clear, slightly golden, light and fluid liquid",
  rule: "the product must look exactly like this in every image: same shape, proportions, colors, materials, label design and label text",
};
const PRODUCTO_REF = { ref: "producto/producto.png", bloque: PRODUCTO, texto: ETIQUETA };

// Paso 0: la foto de referencia del producto (fondo neutro, de frente, etiqueta nítida).
const productoPrompt = {
  task: "Generate one photorealistic reference photo of a single skincare product, front view, to be used as the exact visual reference of this product in every later image. The product must match \"product\" exactly; the label must be perfectly legible and correctly spelled.",
  output: { aspect_ratio: "1:1", look: "clean, realistic product reference photo taken with a phone, true-to-life colors" },
  product: PRODUCTO,
  composition: {
    view: "straight front view at the bottle's mid-height, the label facing the camera and centered, the dropper cap on",
    framing: "the whole bottle in frame, centered, filling about 60% of the image height, with even space around it",
    surface: "standing upright on a plain light warm-gray matte surface, a soft natural contact shadow under it",
    background: "plain light warm-gray seamless background, nothing else in the image",
  },
  lighting: {
    key: "soft, even, diffused daylight from the front, like a window behind the camera",
    mood: "neutral and accurate colors, low contrast, a soft natural highlight on the glass, no harsh reflections over the label",
  },
  realism_rules: [
    "real amber glass with true transparency and subtle reflections",
    "real paper label texture, perfectly flat print, crisp letters",
    "correct proportions, perfectly upright, no distortion",
  ],
  negative: [
    "any text other than 'ALBA' and 'VITAMINA C' on the label, misspelled letters, extra lines of small text, numbers, icons, barcodes",
    "a second bottle, props, hands, people, flowers, water splashes, decorations",
    "a different bottle shape, a frosted or clear bottle, a pump or spray cap, a gold or white cap",
    "3D render, CGI, illustration, heavy studio advertising look, dramatic lighting, reflections covering the label",
  ],
};

const FRASCO = "sostiene el mismo frasco ámbar de ALBA de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, con la etiqueta siempre hacia la cámara y sin taparla con los dedos, y gesticula con la mano izquierda";
// [clip, duración, texto exacto, gestos, descripción]
const clips = [
  ["01", 6, "Dormía ocho horas y aun así mi cara decía que no había dormido nada.",
    `${FRASCO}: al decir 'Dormía ocho horas', levanta la mano izquierda con la palma abierta como quien no lo puede creer; al decir 'mi cara decía', se señala la cara con el índice izquierdo y hace una mueca de cansancio; al decir 'que no había dormido nada', se toca suavemente debajo del ojo con las yemas y niega levemente con la cabeza`,
    "Hook: cara de cansada"],
  ["02", 6, "Probé cremas caras, mascarillas, de todo… y mi piel seguía apagada, como sin vida.",
    `${FRASCO}: al decir 'Probé cremas caras, mascarillas, de todo', va contando con los dedos de la mano izquierda, uno por cada cosa; al decir 'y mi piel seguía apagada', deja caer la mano con resignación; al decir 'como sin vida', se pasa las yemas por la mejilla con una expresión de frustración suave`,
    "Lo que probó: nada funcionaba"],
  ["03", 8, "Hasta que empecé a usar este sérum de vitamina C. Dos gotas cada mañana, nada más.",
    `${FRASCO}: al decir 'Hasta que empecé a usar', se le ilumina la cara y sonríe; al decir 'este sérum de vitamina C', acerca el frasco a la cámara con la etiqueta hacia delante y lo sostiene ahí un momento; al decir 'Dos gotas', muestra dos dedos con la mano izquierda; al decir 'nada más', abre la mano izquierda con naturalidad, como quien dice que es así de simple`,
    "Descubrimiento: el sérum ALBA"],
  ["04", 6, "Es súper ligero, se absorbe en segundos y no te deja la piel grasosa.",
    `${FRASCO}: al decir 'Es súper ligero', frota suavemente las yemas del pulgar y el índice de la mano izquierda; al decir 'se absorbe en segundos', se da dos toquecitos en la mejilla con las yemas; al decir 'no te deja la piel grasosa', niega suavemente con el índice de la mano izquierda`,
    "Demostración: textura ligera"],
  ["05", 8, "Hoy me miro al espejo y me veo despierta, fresca, con brillo… y eso que no llevo maquillaje.",
    `${FRASCO}: al decir 'Hoy me miro al espejo', mira un instante hacia un lado como si viera su reflejo y vuelve a la cámara; al decir 'me veo despierta, fresca, con brillo', sonríe de verdad y se toca el pómulo con las yemas; al decir 'y eso que no llevo maquillaje', se señala la cara con la mano izquierda abierta, orgullosa y cómplice`,
    "Cómo se ve ahora"],
  ["06", 6, "Si tu piel también se ve cansada, pruébalo. Lo consigues en el botón de abajo.",
    `${FRASCO}: al decir 'Si tu piel también se ve cansada', señala a la cámara con la palma abierta, cercana; al decir 'pruébalo', levanta un poco el frasco hacia la cámara; al decir 'Lo consigues en el botón de abajo', señala hacia abajo con el índice de la mano izquierda`,
    "CTA: comprar"],
];

// B-rolls en 2 etapas: frame en Nano Banana (se elige) → video en Flow desde ese frame. Plantilla: skills/reels-avatar-ads/scripts/broll-plantilla.mjs
// Numerados en el orden en que aparecen. Donde sale el frasco se adjunta producto/producto.png; donde sale ella, avatar/avatar.jpg con mismaPersona.
const REF = "avatar/avatar.jpg";
const LUGAR = "white rectangular tiles, the wooden shelf with rolled beige towels and the small green plant softly out of focus behind her";
const brolls = [
  { n: "01", dur: 6, desc: "Recién levantada, se mira cansada (\"no había dormido nada\")", referencia: REF, mismaPersona: true,
    shot: "a close-up of the same woman just after waking up, looking at herself in the bathroom mirror (the phone is propped where the mirror is), touching the skin under her eye with a fingertip",
    subject: "the same woman from the reference, face and shoulders in frame, hair a bit messier than in the reference, sleepy eyes, faint under-eye shadows, dull tired skin, a slightly disappointed expression, no product in her hands",
    location: "the same home bathroom, early morning",
    details: LUGAR,
    framing: "vertical close-up from the shoulders up, face in the upper-middle of the frame",
    light: "the same soft frontal light from the vanity light bar, slightly dimmer and cooler, early morning",
    negative: ["heavy makeup, beauty filter, glossy skin", "a visible mirror frame or reflection"],
    action: "se toca debajo del ojo con la yema, se estira un poco la piel y suelta un pequeño suspiro de cansancio",
    camera_movement: "cámara fija" },
  { n: "02", dur: 6, desc: "Cremas que no funcionaron (\"probé cremas caras, mascarillas…\")", referencia: REF,
    shot: "a close-up of several skincare jars and tubes crowded on a white bathroom counter, a woman's hand pushing them aside",
    subject: "five or six generic skincare products (white and pastel jars, tubes and a sheet-mask pouch) with blank or unreadable labels, half-used, a young woman's hand with natural short nails sliding them to the side",
    location: "the same home bathroom in the morning",
    details: "the white sink edge, a ceramic cup, a folded beige towel, white tiles behind",
    framing: "vertical, camera a bit above counter height, products filling the middle of the frame",
    light: "soft morning light from the front",
    negative: ["an amber dropper bottle", "readable brand names on the products"],
    action: "la mano aparta los frascos hacia un lado con desgano, como quien ya se cansó de probar",
    camera_movement: "cámara fija" },
  { n: "03", dur: 6, desc: "Aparece ALBA: su mano toma el frasco (\"hasta que empecé a usar este sérum\")", referencia: REF, producto: PRODUCTO_REF,
    shot: "a close-up of the ALBA bottle standing alone on the clean bathroom counter in the morning light, a woman's hand reaching for it",
    subject: "the ALBA bottle exactly as in \"product\", dropper cap on, label facing the camera and fully legible; a young woman's hand with natural short nails entering from the right, fingers about to pick it up by the glass shoulder",
    location: "the same home bathroom in the morning",
    details: "a clean white counter with a few water droplets, a ceramic cup and the small plant blurred behind, white tiles",
    framing: "vertical, the bottle centered, camera at counter height",
    light: "warm morning daylight from the front, a soft glow through the amber glass",
    action: "la mano toma el frasco y lo levanta despacio, con la etiqueta siempre hacia la cámara",
    camera_movement: "acercamiento muy lento de frente" },
  { n: "04", dur: 6, desc: "Macro: dos gotas sobre el dorso de la mano (\"dos gotas cada mañana\")", referencia: REF, producto: PRODUCTO_REF,
    shot: "a macro close-up of a drop of serum about to fall from the ALBA glass dropper onto the back of a woman's hand, over a white bathroom sink",
    subject: "the back of a young woman's hand with real skin texture, fine lines and natural short unpolished nails; the black-bulb glass dropper of the ALBA bottle above it, held by her other hand at the top of the frame, with a drop of clear, slightly golden serum at its tip",
    location: "a home bathroom in the morning",
    details: "a white sink with a few water droplets, the open ALBA bottle without its dropper standing on the counter slightly out of focus with its label facing the camera, a folded beige towel",
    framing: "vertical macro, the hand filling the lower half of the frame, the dropper entering from the top",
    light: "soft morning light from the front",
    action: "caen exactamente dos gotas del gotero sobre el dorso de la mano y brillan con la luz",
    camera_movement: "cámara fija con un acercamiento muy lento" },
  { n: "05", dur: 6, desc: "Macro: textura ligera entre los dedos (\"es súper ligero\")",
    shot: "a macro close-up of a young woman's thumb and index fingertips with a drop of serum between them",
    subject: "thumb and index fingertips with real skin texture and fingerprints, a small drop of clear, light, fluid serum between them",
    location: "a home bathroom in the morning",
    details: "the white sink blurred in the background",
    framing: "vertical macro, the fingertips centered",
    light: "soft morning light from the front",
    action: "los dedos se separan y se juntan despacio, mostrando que el sérum es ligero y no pegajoso; luego lo frotan y desaparece en la piel",
    camera_movement: "cámara fija" },
  { n: "06", dur: 6, desc: "Se aplica el sérum en la cara (\"se absorbe en segundos\")", referencia: REF, producto: PRODUCTO_REF, mismaPersona: true,
    shot: "a close-up of the same woman applying a drop of serum to her cheek with her fingertips, filmed with her phone propped against the bathroom mirror",
    subject: "the same woman from the reference, face and shoulders in frame, gently pressing the fingertips of her left hand on her cheekbone where a small glossy drop of serum is spreading; her right hand holds the ALBA bottle at chin height in the lower corner of the frame, label facing the camera; eyes soft and relaxed, looking slightly off-camera toward the mirror, a calm hint of a smile",
    location: "the same home bathroom in the morning",
    details: LUGAR,
    framing: "vertical close-up from the shoulders up, face in the upper-middle of the frame, a little closer than the talking-head shot",
    light: "the same soft, even frontal light from the vanity light bar in front of her, a fresh natural sheen on her skin",
    negative: ["heavy makeup, glossy plastic skin, beauty filter", "towel on the head, face mask, foam"],
    action: "da toquecitos suaves con las yemas sobre la mejilla y extiende el sérum hacia la sien; la piel queda con un brillo fresco y natural",
    camera_movement: "cámara fija" },
  { n: "07", dur: 6, desc: "Piel luminosa: se mira y sonríe (\"me veo despierta, fresca, con brillo\")", referencia: REF, mismaPersona: true,
    shot: "a close-up of the same woman looking at herself in the bathroom mirror (the phone is propped where the mirror is), glowing fresh skin, smiling",
    subject: "the same woman from the reference, face and shoulders in frame, hair neatly pulled back, bright awake eyes, fresh skin with a soft healthy natural glow on the cheekbones (still real texture and pores), a genuine relaxed smile, no makeup, no product in her hands",
    location: "the same home bathroom in the morning",
    details: LUGAR,
    framing: "vertical close-up from the shoulders up, face in the upper-middle of the frame",
    light: "the same soft, even frontal light, slightly warmer and brighter, morning sun",
    negative: ["heavy makeup, beauty filter, airbrushed or plastic skin, oily shine", "a visible mirror frame or reflection"],
    action: "gira un poco la cara hacia un lado y hacia el otro mirándose la piel, se toca el pómulo con las yemas y sonríe satisfecha",
    camera_movement: "cámara fija con un acercamiento muy lento" },
  { n: "08", dur: 6, desc: "El frasco sobre el lavabo (CTA: \"lo consigues en el botón de abajo\")", referencia: REF, producto: PRODUCTO_REF,
    shot: "a close-up of the ALBA amber glass dropper bottle standing on a bathroom counter, label facing the camera",
    subject: "the ALBA bottle exactly as in \"product\", dropper cap on, label facing the camera and fully legible, a few water droplets on the counter",
    location: "a home bathroom in the morning",
    details: "a rolled beige towel, a ceramic cup, a small plant blurred behind, white wall tiles",
    framing: "vertical, the bottle slightly off-center to the left, empty space at the bottom of the frame for the button, camera at counter height",
    light: "soft warm morning daylight from the front, a gentle highlight on the glass",
    negative: ["many products"],
    action: "la luz de la mañana hace brillar el vidrio ámbar; el frasco no se mueve",
    camera_movement: "acercamiento muy lento de frente al frasco, sin girar a su alrededor (la etiqueta siempre de frente)" },
];

fs.mkdirSync(path.join(here, "prompts"), { recursive: true });
fs.mkdirSync(path.join(here, "prompts-broll"), { recursive: true });
const total = clips.reduce((a, c) => a + c[1], 0);
let md = `# Anuncio 08 · Ejemplo producto físico (sérum de vitamina C) — Prompts para Google Flow\n\n` +
  `Protagonista: **mujer** · producto: sérum de vitamina C **ALBA** (marca ficticia).\n` +
  `Voz: **${clips.length} clips · ${total} s** generados (≈ 35–38 s editado; de cada B-roll se usan 2–4 s). Imagen de referencia de todos: \`avatar/avatar.jpg\`.\n` +
  `Validados con \`validar-json.mjs --allow scene.dialogue.speaker\` (variable autorizada: voz de mujer).\n` +
  `**Producto LOCKED IN:** primero se crea \`producto/producto.png\` (Paso 0) y se adjunta en el avatar y en cada B-roll donde sale el frasco; el bloque \`product\` es idéntico en todos los prompts. Antes de animar, compara cada imagen con \`producto.png\`: si el frasco o la etiqueta cambian, regenera esa imagen.\n` +
  `Guarda los clips como \`clips/clip-01.mp4\` … y los B-rolls: primero el frame (\x60broll/broll-01.jpg\x60) y después el video (\x60clips/broll-01.mp4\x60).\n`;
fs.mkdirSync(path.join(here, "producto"), { recursive: true });
const prod = JSON.stringify(productoPrompt, null, 2);
fs.writeFileSync(path.join(here, "producto", "prompt-producto.json"), prod + "\n");
md += `\n---\n\n# Paso 0 · Imagen del producto (Nano Banana Pro, 1:1)\n\nGenera 4 variaciones y elige la que tenga la etiqueta perfecta (\`ALBA\` / \`VITAMINA C\`, bien escrito, sin texto de más). Guárdala como \`producto/producto.png\`: desde aquí el frasco ya no cambia.\n\n\`\`\`json\n${prod}\n\`\`\`\n`;
const avatarPath = path.join(here, "avatar", "prompt-nano-banana.json");
const av = JSON.parse(fs.readFileSync(avatarPath, "utf8"));
const { task, output, ...resto } = av;
delete resto.product;
const img = JSON.stringify({ task, output, product: PRODUCTO, ...resto }, null, 2);
fs.writeFileSync(avatarPath, img + "\n");
md += `\n---\n\n# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16) · adjunta \`producto/producto.png\`\n\nGenera 4 variaciones con este prompt y guarda la elegida como \`avatar/avatar.jpg\`: la etiqueta ALBA debe verse igual que en \`producto.png\`. Es la imagen de referencia de todos los clips de voz.\n\n\`\`\`json\n${img}\n\`\`\`\n\n---\n\n# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)\n`;
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
