// Genera prompts/clip-NN-pX.json a partir de las plantillas del formato podcast.
// Uso (desde la raíz del proyecto): node Contenido/reels/07-podcast-seedance-centavos/generar-prompts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const fmt = path.resolve(here, "../../../skills/reels-avatar-ads/formatos/podcast");
const tpl = { p1: "plantilla-personaje-1.json", p2: "plantilla-personaje-2.json" };

const clips = [
  ["p1", "Oye, una pregunta… ¿De verdad se pueden crear anuncios hiperrealistas con inteligencia artificial sin gastar una fortuna?",
   "al decir 'Oye, una pregunta', levanta ligeramente una mano con la palma abierta hacia su interlocutor; al decir 'anuncios hiperrealistas', junta los dedos de una mano como señalando algo preciso; al decir 'sin gastar una fortuna', abre ambas manos hacia los lados con expresión de duda"],
  ["p2", "Sí, claro. Mis videos me cuestan centavos y tienen la misma calidad que Seedance si sabes cómo hacerlo bien.",
   "al decir 'Sí, claro', asiente con la cabeza y abre ligeramente una mano; al decir 'me cuestan centavos', junta el pulgar y el índice indicando algo muy pequeño; al decir 'la misma calidad', pone ambas manos a la misma altura una junto a la otra; al decir 'si sabes cómo hacerlo bien', señala suavemente con el índice hacia su interlocutor"],
  ["p2", "De hecho, este video costó solo cincuenta y tres centavos.",
   "al decir 'De hecho, este video', señala con la palma abierta hacia abajo, hacia la mesa frente a él; al decir 'solo cincuenta y tres centavos', junta el pulgar y el índice casi tocándose y esboza una media sonrisa"],
  ["p1", "Pero… ¿cómo es posible? A mí Seedance me cuesta casi un dólar el segundo.",
   "manteniendo la cabeza girada y la mirada fija en su interlocutor a la derecha de la imagen todo el tiempo: al decir 'Pero… ¿cómo es posible?', abre ambas manos con las palmas hacia arriba en dirección a él, incrédulo; al decir 'a mí', se toca suavemente el pecho con una mano; al decir 'casi un dólar el segundo', levanta el índice marcando la cifra mientras lo sigue mirando a los ojos"],
  ["p2", "Ese es justamente el problema. El noventa y nueve por ciento de las personas usan las herramientas más caras solo por desconocimiento,",
   "al decir 'Ese es justamente el problema', señala hacia su interlocutor con la mano abierta y asiente; al decir 'el noventa y nueve por ciento de las personas', abre ambas manos en un gesto amplio que abarca a mucha gente; al decir 'las herramientas más caras', sube una mano con la palma hacia abajo marcando algo alto; al decir 'por desconocimiento', gira levemente la mano con la palma hacia arriba"],
  ["p2", "no saben que existen métodos económicos que dan la misma calidad.",
   "al decir 'no saben que existen', abre las manos frente al torso con las palmas hacia arriba; al decir 'métodos económicos', mueve una mano suavemente hacia delante; al decir 'la misma calidad', pone ambas manos a la misma altura una junto a la otra"],
  ["p1", "¿Y dónde puedo aprender estos métodos?",
   "se inclina ligeramente hacia delante con interés y abre una mano con la palma hacia arriba hacia su interlocutor al decir 'dónde puedo aprender'"],
  ["p2", "Tengo un documento donde explico todo mi proceso. Dile a tu audiencia que comente guía y se lo envío.",
   "al decir 'Tengo un documento', junta las yemas de los dedos de ambas manos formando un rectángulo pequeño; al decir 'todo mi proceso', mueve una mano en pequeños pasos de izquierda a derecha; al decir 'dile a tu audiencia', señala con la mano abierta hacia su interlocutor; al decir 'comente guía y se lo envío', hace un gesto breve de énfasis con el índice y sonríe"],
];

clips.forEach(([p, script, sync], i) => {
  const t = JSON.parse(fs.readFileSync(path.join(fmt, tpl[p]), "utf8"));
  t.scene.dialogue.script = script;
  t.scene.performance.hand_gestures.synchronization = sync;
  fs.writeFileSync(path.join(here, "prompts", `clip-${String(i + 1).padStart(2, "0")}-${p}.json`), JSON.stringify(t, null, 2) + "\n");
});
fs.writeFileSync(path.join(here, "guion.txt"), clips.map((c) => c[1]).join("\n") + "\n");
console.log(`${clips.length} clips generados`);
