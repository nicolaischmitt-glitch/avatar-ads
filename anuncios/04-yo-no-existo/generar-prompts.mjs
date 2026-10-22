// Genera prompts/clip-NN.json desde la plantilla LOCKED IN del master prompt + guion.txt + prompts-flow.md.
// Variable autorizada en este anuncio: scene.dialogue.speaker = "mujer" (validar con --allow scene.dialogue.speaker).
// Uso (desde la raíz del proyecto): node anuncios/04-yo-no-existo/generar-prompts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const t = fs.readFileSync(path.join(here, "../../skills/master prompt para json prompts videos.txt"), "utf8");
const s = t.slice(t.indexOf("## 4."), t.indexOf("## 5."));
const tpl = s.slice(s.indexOf("{"), s.lastIndexOf("}") + 1);

// [clip, duración, toma, texto exacto, gestos]
const CARRO = "con la mano libre (la otra sostiene el teléfono fuera de cuadro)";
const CASA = "con la mano libre (con la otra sostiene la taza de forma natural, sin soltarla)";
const clips = [
  ["01", 8, "carro", "Yo no existo. Mi creador me hizo con inteligencia artificial por sesenta y siete centavos…",
    `gesticula ${CARRO}: al decir 'Yo no existo', niega suavemente con la cabeza con una media sonrisa segura; al decir 'Mi creador me hizo', lleva la mano libre abierta al pecho; al decir 'con inteligencia artificial', abre la mano hacia la cámara; al decir 'sesenta y siete centavos', junta casi del todo el pulgar y el índice mostrando una cantidad muy pequeña`],
  ["02", 4, "carro", "y en menos de veinte minutos.",
    `gesticula ${CARRO}: al decir 'en menos de veinte minutos', levanta la mano libre con un gesto rápido y ligero, como diciendo 'así de fácil', y sonríe con complicidad`],
  ["03", 8, "carro", "Con Seedance, un solo segundo de video te puede costar casi un dólar. ¡Un solo segundo!",
    `gesticula ${CARRO}: al decir 'un solo segundo de video', levanta el dedo índice marcando el número uno; al decir 'casi un dólar', abre la mano y levanta un poco las cejas, sorprendida de lo caro que es; al decir '¡Un solo segundo!', vuelve a levantar el índice con énfasis e incredulidad`],
  ["04", 8, "casa", "Y no se trata solo de ahorrar. Si cada anuncio te cuesta centavos, puedes testear decenas,",
    `gesticula ${CASA}: al decir 'no se trata solo de ahorrar', mueve la mano libre de lado a lado negando con suavidad; al decir 'te cuesta centavos', junta casi del todo el pulgar y el índice; al decir 'puedes testear decenas', abre la mano y la mueve en pequeños pasos de un lado a otro, como colocando muchas cosas en fila`],
  ["05", 8, "casa", "encontrar tus anuncios ganadores mucho más rápido… y ese es el secreto para escalar.",
    `gesticula ${CASA}: al decir 'encontrar tus anuncios ganadores', señala hacia delante con el índice como si eligiera uno; al decir 'mucho más rápido', hace un movimiento rápido de la mano hacia delante; al decir 'el secreto para escalar', se inclina un poco hacia la cámara con complicidad y sube la mano en diagonal como si marcara escalones`],
  ["06", 6, "casa", "Así se escalan productos digitales… y también servicios tradicionales.",
    `gesticula ${CASA}: al decir 'productos digitales', abre la mano libre hacia un lado como si presentara una opción; al decir 'y también servicios tradicionales', la lleva hacia el otro lado como si presentara la segunda opción`],
  ["07", 10, "casa", "Si quieres aprender a hacerlo, únete al taller en vivo de Avatar Ads: dos días, paso a paso. Toca el botón y reserva tu lugar.",
    `gesticula ${CASA}: al decir 'Si quieres aprender a hacerlo', abre la palma hacia la cámara en gesto de invitación; al decir 'únete al taller en vivo', mueve la mano hacia sí en un gesto de bienvenida; al decir 'dos días', muestra dos dedos; al decir 'paso a paso', avanza la mano en pequeños movimientos; al decir 'Toca el botón', señala hacia abajo con el índice y sonríe`],
];
const IMG = { carro: "avatar/avatar-carro.jpg", casa: "avatar/avatar-casa.jpg" };
const DESC = { "01": "Hook: la revelación y el costo", "02": "En menos de 20 minutos", "03": "El precio de Seedance", "04": "Cambio de toma: no se trata solo de ahorrar",
  "05": "Ganadores y escalar", "06": "Productos digitales y servicios", "07": "CTA: el taller y el botón" };

fs.mkdirSync(path.join(here, "prompts"), { recursive: true });
let md = `# Anuncio 04 — Prompts JSON para Google Flow\n\nTotal: **${clips.length} clips · ${clips.reduce((a, c) => a + c[1], 0)} s** generados (≈ 42 s editado).\n` +
  `Imagen de referencia: clips 01–03 → \`${IMG.carro}\` · clips 04–07 → \`${IMG.casa}\`.\n` +
  `Validados con \`validar-json.mjs --allow scene.dialogue.speaker\` (variable autorizada: voz de mujer).\nGuarda cada clip como \`clips/clip-01.mp4\` … \`clips/clip-07.mp4\`.\n`;
for (const [n, dur, toma, script, sync] of clips) {
  const j = JSON.parse(tpl);
  j.scene.dialogue.speaker = "mujer";
  j.scene.dialogue.script = script;
  j.scene.performance.hand_gestures.synchronization = sync;
  const txt = JSON.stringify(j, null, 2);
  fs.writeFileSync(path.join(here, "prompts", `clip-${n}.json`), txt + "\n");
  md += `\n## Clip ${n} · ${dur} s · toma ${toma} (\`${IMG[toma]}\`) — ${DESC[n]}\n\n\`\`\`json\n${txt}\n\`\`\`\n`;
}
fs.writeFileSync(path.join(here, "guion.txt"), clips.map((c) => c[3]).join(" ") + "\n");
fs.writeFileSync(path.join(here, "prompts-flow.md"), md);
console.log(`${clips.length} prompts → prompts/ · guion.txt · prompts-flow.md`);
