// Genera prompts/clip-NN.json (voz) desde la plantilla LOCKED IN del master prompt + guion.txt + prompts-flow.md.
// Anuncio 12: copy del usuario (29 oct 2026), sin B-rolls; mismo avatar que el VSL 09 (avatar/avatar.jpg).
// Sin variables autorizadas: voz de hombre (la de la plantilla).
// Uso (desde la raíz del proyecto): node anuncios/12-taller-domingo-yo-no-existo/generar-prompts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const t = fs.readFileSync(path.join(here, "../../skills/master prompt para json prompts videos.txt"), "utf8");
const s = t.slice(t.indexOf("## 4."), t.indexOf("## 5."));
const tpl = s.slice(s.indexOf("{"), s.lastIndexOf("}") + 1);

// [clip, duración, texto exacto, gestos, descripción]
const clips = [
  ["01", 6, "Yo no existo. Este anuncio costó menos de dos dólares.",
    "al decir 'Yo no existo', se señala el pecho con ambas manos y sonríe con complicidad; al decir 'Este anuncio costó', abre una palma hacia la cámara; al decir 'menos de dos dólares', levanta dos dedos y luego junta el índice y el pulgar casi tocándose",
    "Hook: el avatar no existe y costó menos de $2"],
  ["02", 8, "Y este domingo, en vivo, te enseño cómo hacerlo para tus propios anuncios o los de tus clientes.",
    "al decir 'este domingo, en vivo', señala hacia abajo con el índice como marcando un momento; al decir 'te enseño cómo hacerlo', abre ambas manos hacia la cámara; al decir 'tus propios anuncios', señala suavemente hacia la cámara; al decir 'o los de tus clientes', mueve la mano hacia un lado como señalando a otras personas",
    "La promesa: taller en vivo este domingo"],
  ["03", 8, "Es un taller en vivo de un día. Creamos un anuncio completo para un producto, de la idea al video editado.",
    "al decir 'de un día', levanta un dedo; al decir 'Creamos un anuncio completo', junta las manos frente al pecho como formando algo; al decir 'de la idea al video editado', mueve una mano de un lado a otro como trazando un camino",
    "Qué vas a ver: un anuncio completo"],
  ["04", 6, "Sin cámaras, sin actores y sin tener que editar manualmente.",
    "al decir 'Sin cámaras', niega suavemente con el índice; al decir 'sin actores', abre una palma hacia un lado; al decir 'sin tener que editar manualmente', mueve ambas manos hacia los lados como descartando algo",
    "Sin cámaras, actores ni edición manual"],
  ["05", 10, "Anuncios hiperrealistas, hasta trece veces más baratos que con otras herramientas. Eso significa probar decenas de ángulos, encontrar tus ganadores y escalar.",
    "al decir 'Anuncios hiperrealistas', abre las manos hacia delante como presentando algo; al decir 'hasta trece veces más baratos', baja una mano con la palma hacia abajo; al decir 'probar decenas de ángulos', mueve las manos alternándolas como probando opciones; al decir 'encontrar tus ganadores', señala con el índice como eligiendo uno; al decir 'y escalar', sube una mano en diagonal hacia arriba",
    "Por qué importa: más barato, más tests, escalar"],
  ["06", 8, "Entras al taller y te quedas con el Sistema Avatar Ads de por vida, el curso completo y la grabación.",
    "al decir 'Entras al taller', mueve una mano hacia delante como invitando; al decir 'el Sistema Avatar Ads de por vida', extiende la palma hacia la cámara como ofreciéndolo; al decir 'el curso completo y la grabación', cuenta con los dedos uno y dos",
    "Oferta: sistema, curso y grabación"],
  ["07", 8, "Y si quieres vender esto como servicio, hay una clase bonus en vivo donde te enseño cómo conseguir clientes.",
    "al decir 'si quieres vender esto como servicio', abre una palma hacia arriba como ofreciendo algo; al decir 'una clase bonus en vivo', levanta un dedo; al decir 'cómo conseguir clientes', mueve la mano hacia sí como atrayendo algo y asiente",
    "Bonus: clase para conseguir clientes"],
  ["08", 6, "Los puestos son limitados. Toca el botón y reserva tu lugar.",
    "al decir 'Los puestos son limitados', junta un poco las manos como mostrando algo pequeño; al decir 'Toca el botón', señala hacia abajo con el índice; al decir 'reserva tu lugar', sonríe y abre una palma hacia la cámara",
    "CTA: el botón de abajo"],
];

fs.mkdirSync(path.join(here, "prompts"), { recursive: true });
const total = clips.reduce((a, c) => a + c[1], 0);
const creditos = { 4: 7, 6: 10, 8: 12, 10: 15 };
const cr = clips.reduce((a, c) => a + creditos[c[1]], 0);
let md = `# Anuncio 12 · Taller del domingo ("Yo no existo") — Prompts para Google Flow\n\n` +
  `Voz: **${clips.length} clips · ${total} s** generados (≈ 50 s editado) · ${cr} créditos (Omni 1.1 720p). Sin B-rolls.\n` +
  `Validados con \`validar-json.mjs\` (sin variables autorizadas: voz de hombre).\n` +
  `Guarda los clips como \`clips/clip-01.mp4\` … \`clips/clip-${clips.at(-1)[0]}.mp4\`.\n` +
  `\n---\n\n# Paso 1 · Imagen del avatar\n\nYa la tienes: es la misma del VSL de la landing (\`anuncios/09-vsl-landing\`), copiada en \`avatar/avatar.jpg\`. No hay que generar nada.\n` +
  `\n---\n\n# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)\n`;
for (const [n, dur, script, sync, desc] of clips) {
  const j = JSON.parse(tpl);
  j.scene.dialogue.script = script;
  j.scene.performance.hand_gestures.synchronization = sync;
  const txt = JSON.stringify(j, null, 2);
  fs.writeFileSync(path.join(here, "prompts", `clip-${n}.json`), txt + "\n");
  md += `\n## Clip ${n} · ${dur} s — ${desc}\n\n\`\`\`json\n${txt}\n\`\`\`\n`;
}
fs.writeFileSync(path.join(here, "guion.txt"), clips.map((c) => c[2]).join(" ") + "\n");
fs.writeFileSync(path.join(here, "prompts-flow.md"), md);
console.log(`${clips.length} clips (${total} s, ${cr} créditos) → prompts/ · guion.txt · prompts-flow.md`);
