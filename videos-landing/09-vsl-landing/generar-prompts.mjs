// Genera prompts/clip-NN.json (voz) y prompts-broll/broll-NN-*.json desde la plantilla LOCKED IN del master prompt + guion.txt + prompts-flow.md.
// VSL de la landing: copy del usuario tal cual (28 oct 2026); solo las cifras van en palabras para la voz ("entre diez y treinta videos").
// Sin variables autorizadas: voz de hombre (la de la plantilla).
// Uso (desde la raíz del proyecto): node videos-landing/09-vsl-landing/generar-prompts.mjs
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
  ["01", 10, "Encontrar un anuncio ganador te cuesta entre diez y treinta videos. Con el método tradicional, eso son semanas de trabajo y miles de dólares.",
    "al decir 'Encontrar un anuncio ganador', levanta el índice como si señalara uno solo; al decir 'entre diez y treinta videos', separa las manos poco a poco como mostrando una cantidad que crece; al decir 'semanas de trabajo', inclina un poco la cabeza y abre una palma; al decir 'miles de dólares', frota el pulgar con el índice y el medio en gesto de dinero",
    "Hook: lo que cuesta encontrar un ganador"],
  ["02", 8, "Planeación, creadores, grabación, editores. O herramientas de inteligencia artificial que cobran una fortuna por un solo video.",
    "al decir 'Planeación, creadores, grabación, editores', cuenta con los dedos de una mano uno, dos, tres y cuatro; al decir 'herramientas de inteligencia artificial que cobran una fortuna', abre ambas manos con las palmas hacia arriba en gesto de incredulidad; al decir 'por un solo video', levanta un solo dedo",
    "El costo del método tradicional"],
  ["03", 8, "Y si lo haces tú mismo, te pasas horas grabándote y editando, en vez de vender.",
    "al decir 'si lo haces tú mismo', señala suavemente hacia la cámara con la palma abierta; al decir 'te pasas horas grabándote y editando', gira las manos una sobre otra como algo que no termina; al decir 'en vez de vender', mueve ambas manos hacia delante con énfasis",
    "El costo en tiempo"],
  ["04", 10, "Por eso creamos el Sistema Avatar Ads: un sistema automatizado que crea anuncios hiperrealistas, en volumen, y por menos de un dólar cada uno.",
    "al decir 'Por eso creamos el Sistema Avatar Ads', abre las manos hacia delante como presentando algo; al decir 'un sistema automatizado', gira una mano en un pequeño círculo como un engranaje; al decir 'en volumen', separa bien las manos hacia los lados; al decir 'menos de un dólar cada uno', junta el índice y el pulgar casi tocándose",
    "La solución: el Sistema Avatar Ads"],
  ["05", 10, "Primero, encuentra los mejores ángulos de venta para tu producto. Luego, escribe guiones con la estructura de miles de anuncios ganadores.",
    "al decir 'Primero', levanta un dedo; al decir 'los mejores ángulos de venta', inclina la mano abierta hacia un lado como señalando una dirección; al decir 'Luego', levanta dos dedos; al decir 'escribe guiones', mueve brevemente la mano como si escribiera en el aire; al decir 'miles de anuncios ganadores', abre ambas manos de forma amplia",
    "Cómo funciona: ángulos y guiones"],
  ["06", 10, "Crea tu avatar realista. Genera las escenas y los videos. Edita el anuncio por completo. Y te lo entrega listo para probar.",
    "al decir 'Crea tu avatar realista', se señala a sí mismo con ambas manos y sonríe; al decir 'Genera las escenas y los videos', mueve las manos de un lado a otro como colocando escenas en fila; al decir 'Edita el anuncio por completo', junta las manos como cerrando algo; al decir 'listo para probar', abre las palmas hacia la cámara como si lo entregara",
    "Cómo funciona: avatar, escenas, edición"],
  ["07", 8, "Y funciona para cualquier tipo de negocio. Si vendes productos digitales, productos físicos o servicios tradicionales,",
    "al decir 'cualquier tipo de negocio', abre ambos brazos hacia los lados; al decir 'productos digitales, productos físicos o servicios tradicionales', cuenta con los dedos uno, dos y tres",
    "Para qué negocios sirve"],
  ["08", 6, "o si necesitas generar leads, el sistema crea el anuncio que tu oferta necesita.",
    "al decir 'o si necesitas generar leads', levanta un cuarto dedo y luego mueve la mano hacia sí como atrayendo algo; al decir 'el sistema crea el anuncio que tu oferta necesita', mueve una mano hacia delante con énfasis y asiente",
    "Para qué negocios sirve (leads)"],
  ["09", 8, "No son solo anuncios que parecen reales. Son anuncios con estructuras probadas para escalar rápido.",
    "al decir 'No son solo anuncios que parecen reales', niega suavemente con el índice; al decir 'estructuras probadas', pone una palma sobre la otra como apilando niveles; al decir 'para escalar rápido', sube una mano en diagonal hacia arriba",
    "Más que realismo: estructuras para vender"],
  ["10", 8, "Además, el sistema es tuyo para siempre, con todas sus actualizaciones, porque la inteligencia artificial cambia cada semana.",
    "al decir 'el sistema es tuyo para siempre', extiende la palma hacia la cámara como ofreciéndolo; al decir 'con todas sus actualizaciones', gira la mano hacia delante como algo que avanza; al decir 'cambia cada semana', mueve ambas manos alternándolas",
    "Oferta: el sistema y sus actualizaciones"],
  ["11", 10, "Y tienes acceso vitalicio al curso paso a paso, clases en vivo y soporte para que revisemos tus anuncios y te demos feedback.",
    "al decir 'acceso vitalicio al curso paso a paso', baja la mano en pequeños escalones; al decir 'clases en vivo', se lleva una mano al pecho; al decir 'soporte para que revisemos tus anuncios', abre ambas palmas hacia la cámara; al decir 'te demos feedback', asiente con la mano abierta",
    "Oferta: curso, clases y soporte"],
  ["12", 8, "Si quieres tu propia máquina de anuncios, toca el botón de abajo y mira todo lo que incluye.",
    "al decir 'Si quieres tu propia máquina de anuncios', abre las manos hacia la cámara; al decir 'toca el botón de abajo', señala hacia abajo con el índice; al decir 'mira todo lo que incluye', sonríe y abre una palma",
    "CTA: el botón de abajo"],
];

// B-rolls en 2 etapas: frame en Nano Banana (se elige) → video en Flow desde ese frame. Plantilla: skills/reels-avatar-ads/scripts/broll-plantilla.mjs
const brolls = [
  { n: "01", dur: 6, desc: "Semanas de trabajo (noche en el escritorio) · clip 01",
    shot: "a close shot of a messy home-office desk late at night, a man's hands rubbing his tired eyes behind a laptop",
    subject: "a man's forearms and hands in a wrinkled grey t-shirt, one hand rubbing his eyes, his face mostly hidden by the hand and cropped at the top of the frame",
    location: "a small home office at night",
    details: "an open laptop with a blurred unreadable screen, two empty coffee mugs, scattered printed papers with blurred unreadable text, a phone face down, a desk lamp",
    framing: "vertical, from the side and slightly above, the desk filling the lower half",
    light: "warm light from a desk lamp in front of him and the cold glow of the laptop screen, the room dark around",
    negative: ["his face clearly visible", "readable screen or papers"],
    action: "se frota los ojos con cansancio, suspira y deja caer la mano sobre el escritorio",
    camera_movement: "cámara en mano muy estable, casi fija",
    audio: "solo un suspiro suave y el zumbido leve de la laptop, sin música ni voces" },
  { n: "02", dur: 6, desc: "Creadora grabando con aro de luz · clip 02 ('creadores, grabación')",
    shot: "an over-the-shoulder shot of a young woman content creator setting up a phone on a tripod with a ring light in a small room",
    subject: "the back of her head and shoulder (face not visible), long dark hair in a loose bun, her hand adjusting the phone on the tripod",
    location: "a small bedroom turned into a recording corner, during the day",
    details: "a ring light, a phone on a tripod with its screen out of focus, a plain wall, a small table with a skincare bottle without label, a tangled cable on the floor",
    framing: "vertical, over her shoulder, the phone and ring light in the center",
    light: "the ring light on in front of her plus soft daylight from a window behind the camera",
    negative: ["her face visible", "readable screen", "a label or brand on the bottle"],
    action: "ajusta la altura del teléfono en el trípode y lo inclina un poco",
    camera_movement: "cámara en mano muy estable, con un acercamiento lento",
    audio: "solo el clic del trípode y sonido ambiente suave, sin música ni voces" },
  { n: "03", dur: 6, desc: "Editor en su computadora · clip 02 ('editores')",
    shot: "a close shot of a video editor's hands on a keyboard and mouse in front of a large monitor",
    subject: "a man's hands with a dark hoodie sleeve, one hand on the mouse and the other on the keyboard",
    location: "a dim editing room in the evening",
    details: "a large monitor with a blurred unreadable editing timeline in soft colors, headphones on the desk, an energy drink can without label, sticky notes without writing",
    framing: "vertical, from behind and to the side of his hands, the monitor glowing softly out of focus",
    light: "the soft glow of the monitor in front of him and a small warm lamp, the room dim",
    negative: ["readable screen, readable timeline or interface", "his face"],
    action: "mueve el ratón y pulsa varias teclas con rapidez, como cortando un video",
    camera_movement: "cámara casi fija con un deslizamiento lateral muy lento",
    audio: "solo clics de ratón y teclado, sin música ni voces" },
  { n: "04", dur: 6, desc: "Grabándose a sí mismo otra vez · clip 03",
    shot: "a shot from behind of a man sitting on a sofa in front of his phone on a small tripod, about to record himself again",
    subject: "the back of a man's head and shoulders in a casual blue shirt (face not visible), his arm reaching toward the phone",
    location: "a living room at home, in the afternoon",
    details: "a phone on a small tripod on a coffee table with its screen out of focus, a notebook with blurred handwriting, a glass of water, a cushion",
    framing: "vertical, from behind his shoulder, the phone in the center of the frame",
    light: "soft daylight from a window in front of him, behind the phone",
    negative: ["his face visible", "readable screen or writing"],
    action: "estira la mano, toca el teléfono para volver a grabar y baja la mano con resignación",
    camera_movement: "cámara en mano muy estable, casi fija",
    audio: "solo sonido ambiente suave de casa, sin música ni voces" },
  { n: "05", dur: 6, desc: "El avatar trabajando en su laptop · clip 04 ('Por eso creamos el Sistema')",
    shot: "a close-up of the same man's hands typing on his open silver laptop at his desk",
    subject: "the hands, wristwatch and navy shirt sleeves of the man in the reference image, typing on the laptop keyboard; his face is out of frame",
    location: "the same office as in the reference image, during the day",
    details: "the light oak desk, the silver laptop with its screen out of focus and unreadable, a ceramic mug, the plant on the shelf softly in the background",
    framing: "vertical, from the side at desk height, the keyboard and his hands in the center",
    light: "soft daylight from the window in front of him, as in the reference image",
    referencia: "avatar/avatar.jpg", mismaPersona: true,
    negative: ["readable screen", "his face"],
    action: "escribe con calma en el teclado y pulsa una última tecla con decisión",
    camera_movement: "cámara en mano muy estable, con un acercamiento lento",
    audio: "solo el sonido suave del teclado, sin música ni voces" },
  { n: "06", dur: 6, desc: "Producto digital: trabajando en un café · clip 07",
    shot: "an over-the-shoulder shot of a young woman working on her laptop in a neighborhood café",
    subject: "her shoulder and the side of her head (face not visible), headphones around her neck, her hands on the laptop trackpad",
    location: "a small neighborhood café, in the morning",
    details: "a laptop with a blurred unreadable screen, a cup of coffee, a croissant on a small plate, a wooden table with slight scratches, plants in the background",
    framing: "vertical, over the shoulder, the laptop screen out of focus",
    light: "soft daylight from the café window in front of her, behind the laptop",
    negative: ["her face visible", "readable screen", "café signs or menus with text"],
    action: "desliza el dedo por el trackpad y toma un sorbo de café",
    camera_movement: "cámara en mano muy estable, con un acercamiento lento",
    audio: "solo sonido ambiente suave de café, sin música ni voces" },
  { n: "07", dur: 6, desc: "Producto físico: empacando un pedido · clip 07",
    shot: "a close shot of a person's hands sealing a cardboard shipping box with packing tape on a work table",
    subject: "a woman's hands with a few simple rings, sealing a plain brown cardboard box with a tape dispenser",
    location: "a small home business packing corner, during the day",
    details: "a stack of plain cardboard boxes without labels, crinkled kraft paper, a roll of tape, a pair of scissors, small plain product boxes without branding",
    framing: "vertical, from slightly above, the box in the center",
    light: "soft daylight from a window in front of the table",
    negative: ["labels, printed logos or shipping labels with text", "her face"],
    action: "pasa el dispensador de cinta sobre la caja y la sella con un movimiento rápido",
    camera_movement: "cámara casi fija con un acercamiento muy lento",
    audio: "solo el sonido de la cinta adhesiva y el cartón, sin música ni voces" },
  { n: "08", dur: 6, desc: "Servicio tradicional: barbería de barrio · clip 07",
    shot: "a close shot of a barber's hands trimming the hair of a client in a neighborhood barbershop",
    subject: "the barber's hands with a comb and scissors working on the back of the client's head (no faces visible), the client wearing a black barber cape",
    location: "a small, slightly worn neighborhood barbershop, during the day",
    details: "a classic barber chair, combs and clippers on a counter, a spray bottle, hair on the cape, a mirror only partially and softly out of focus without reflections of faces",
    framing: "vertical, from behind and slightly to the side of the client's head",
    light: "soft daylight from the shop's front window, in front of the barber",
    negative: ["faces visible, reflections of faces in the mirror", "signs or posters with text"],
    action: "peina un mechón y lo corta con las tijeras con un movimiento preciso",
    camera_movement: "cámara en mano muy estable, casi fija",
    audio: "solo el sonido de las tijeras y ambiente suave del local, sin música ni voces" },
  { n: "09", dur: 6, desc: "Clase en vivo desde casa · clip 11",
    shot: "an over-the-shoulder shot of a man taking notes while watching an online class on his laptop at home in the evening",
    subject: "his shoulder and the side of his head (face not visible), one hand writing in a notebook next to the laptop",
    location: "a home desk in the evening",
    details: "a laptop with a blurred unreadable screen, an open notebook with blurred handwriting, a pen, a cup of tea, a small desk lamp",
    framing: "vertical, over the shoulder, the laptop and notebook in frame, the screen out of focus",
    light: "a warm desk lamp in front of him and the soft glow of the laptop screen",
    negative: ["his face visible", "readable screen or writing", "faces on the screen"],
    action: "escribe una línea en la libreta y levanta la mirada hacia la laptop",
    camera_movement: "cámara en mano muy estable, con un acercamiento lento",
    audio: "solo el sonido suave del bolígrafo sobre el papel, sin música ni voces" },
];

fs.mkdirSync(path.join(here, "prompts"), { recursive: true });
fs.mkdirSync(path.join(here, "prompts-broll"), { recursive: true });
const total = clips.reduce((a, c) => a + c[1], 0);
let md = `# Anuncio 09 · VSL de la landing — Prompts para Google Flow\n\n` +
  `Voz: **${clips.length} clips · ${total} s** generados (≈ 1:35–1:40 editado). Imagen de referencia de todos: \`avatar/avatar.jpg\`.\n` +
  `B-rolls: **${brolls.length}**, de 6 s cada uno. Validados con \`validar-json.mjs\` (sin variables autorizadas: voz de hombre).\n` +
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
console.log(`${clips.length} clips (${total} s) + ${brolls.length} B-rolls → prompts/ · prompts-broll/ · guion.txt · prompts-flow.md`);
