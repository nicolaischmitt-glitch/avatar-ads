#!/usr/bin/env node
// Genera el paquete de prompts de un anuncio a partir de su plan de clips, y valida los de voz.
// prompts-flow.md va por pasos, en el orden en que el usuario los usa:
//   [Paso 0 · Imagen del producto, solo con producto físico] → Paso 1 · Imagen del avatar (Nano Banana Pro) → Paso 2 · Clips de voz (Google Flow)
//   → Paso 3 · Frames de los B-rolls (Nano Banana Pro) → Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)
//
// Uso (desde la raíz del kit):  node sistema/scripts/generar-prompts.mjs anuncios/NN-slug
//
// Lee  anuncios/NN-slug/clips-plan.json:
//   {
//     "anuncio": "Anuncio 01 — Curso de repostería",
//     "speaker": "mujer",                  // voz del avatar: "hombre" o "mujer"
//     "acento": "colombiano",              // acento del público (negocio/marca.md)
//     "tomas": { "a": "avatar/avatar.jpg" },   // imagen de referencia de cada toma
//     "prompts_imagen": { "a": "avatar/prompt-nano-banana.json" },   // opcional; por defecto avatar/prompt-nano-banana.json (1 toma) o avatar/prompt-<toma>.json
//     "clips": [
//       { "n": "01", "dur": 8, "toma": "a", "desc": "Hook", "texto": "…fragmento exacto…", "gestos": "al decir '…', …" }
//     ],
//     "producto": {   // SOLO si el anuncio muestra un producto físico (master-prompt-imagen.md, sección 7). Si no, no se pone.
//       "texto": "ALBA / VITAMINA C",        // el texto exacto de la etiqueta (lo único escrito que puede salir)
//       "bloque": { "name": "…", "bottle (o body, box, bag…)": "…", "cap": "…", "label": "…", "label_text": "…", "rule": "…" },   // en inglés; se copia igual en todo
//       "corto": "the ALBA serum bottle",    // cómo se nombra en el prompt de corrección (inglés)
//       "donde": { "a": "in her right hand, label facing the camera" }   // dónde queda el producto en la imagen de cada toma (inglés)
//     },                                    // → Paso 0 (producto/producto.png; si ya existe una foto real, no se genera)
//                                           // → si el prompt del avatar tiene la clave "product", se reemplaza por este bloque
//                                           // → debajo de cada imagen con producto, un prompt de corrección por si el producto sale distinto
//     (en un B-roll con producto, "producto_donde": "on the counter, next to the sink" = dónde queda, para su prompt de corrección)
//     (en un B-roll, "mismaPersona": true + "referencia": "avatar/avatar.jpg" = sale el mismo avatar, p. ej. aplicándose el producto)
//     "looks": {   // SOLO si la historia los pide (antes y después, un día que avanza, otros lugares u otra ropa); máx. 3. Si no, no se pone.
//       "5am":   { "imagen": "avatar/look-5am.jpg", "desc": "…pelo, ropa, cómo se ve su piel…", "location": "…", "details": "…", "pose": "…", "light": "…" },   // en inglés
//       "listo": { "imagen": "avatar/avatar.jpg", "desc": "…" }   // el look de quien habla a cámara usa la imagen del avatar: no se genera aparte
//     },                                    // → en el Paso 1, cada look con imagen propia se genera adjuntando avatar/avatar.jpg
//     "identidad": "…",   // con looks: lo que se ve DE VERDAD en avatar/avatar.jpg (Claude mira la imagen elegida y lo escribe, en inglés):
//                         // forma de la cara, frente y entradas, cantidad y largo del pelo, barba, rasgos. Sin esto, los looks y sus B-rolls esperan.
//     (en un B-roll, "look": "5am" = sale el mismo avatar con ese look y en el lugar de "location"; reemplaza a "mismaPersona" + "referencia")
//     "brolls": [   // ideas de B-roll que propone Claude: sin diálogo, 4 o 6 s (regla de duración en el skill avatar-ads-anuncio, paso 5). Campos en broll-plantilla.mjs
//       { "n": "01", "dur": 4, "desc": "Macro del producto", "referencia": "avatar/avatar.jpg", "producto": true,   // referencia: opcional (mismo lugar) · producto: true si sale el producto
//         "shot": "…", "subject": "…", "location": "…", "details": "…", "framing": "…", "light": "…",   // el frame (inglés)
//         "action": "…", "camera_movement": "…", "audio": "…" }                                           // la animación (español)
//     ]
//   }
// Escribe: prompts/clip-NN.json · prompts-broll/broll-NN-imagen.json + broll-NN-video.json · prompts-flow.md (todo en orden, listo para copiar)
// y ejecuta validar-json.mjs contra guion.txt (el guion aprobado: los clips deben decirlo palabra por palabra). Solo cambian el diálogo y los gestos (+ voz y acento): la estructura del master no se toca.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { brollImagen, brollVideo, brollMarkdown, productoImagen, lookImagen, correccionMarkdown } from "./broll-plantilla.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = process.argv[2];
if (!dir) {
  console.error("Uso: node sistema/scripts/generar-prompts.mjs anuncios/NN-slug");
  process.exit(2);
}
const plan = JSON.parse(fs.readFileSync(path.join(dir, "clips-plan.json"), "utf8"));
const master = fs.readFileSync(path.join(here, "../prompts/master-prompt-video.txt"), "utf8");
const sec = master.slice(master.indexOf("## 4."), master.indexOf("## 5."));
const tpl = sec.slice(sec.indexOf("{"), sec.lastIndexOf("}") + 1);

const DUR_OK = [4, 6, 8, 10];
const PALABRAS = { 4: [8, 10], 6: [13, 16], 8: [18, 22], 10: [23, 27] };
const avisos = [];
const bloque = (txt) => "```json\n" + txt + "\n```\n";

fs.mkdirSync(path.join(dir, "prompts"), { recursive: true });
for (const f of fs.readdirSync(path.join(dir, "prompts"))) if (/^clip-\d+\.json$/.test(f)) fs.rmSync(path.join(dir, "prompts", f));

plan.clips = plan.clips ?? [];   // formato voz en off: sin clips de voz (la voz se genera aparte, ver formatos/voz-en-off/LEEME.md)
// sílabas aproximadas (grupos de vocales): sirven para medir la velocidad de habla de cada clip
const silabas = (t) => t.toLowerCase().split(/[^a-záéíóúüñ]+/).filter(Boolean).reduce((a, w) => a + (w.match(/[aeiouáéíóúü]+/g) || []).length, 0);
const ritmos = [];
const total = plan.clips.reduce((a, c) => a + c.dur, 0);
const tomas = Object.keys(plan.tomas ?? {}).length ? plan.tomas : { a: "avatar/avatar.jpg" };
// Producto físico LOCKED IN (solo si el plan trae "producto"): un bloque fijo + producto/producto.png adjunta en todo.
const PROD_IMG = "producto/producto.png";
const prod = plan.producto ? { ref: PROD_IMG, bloque: plan.producto.bloque, texto: plan.producto.texto, corto: plan.producto.corto } : null;
if (plan.producto && (!prod.bloque || !prod.texto)) avisos.push("producto: faltan \"bloque\" o \"texto\" (master-prompt-imagen.md, sección 7)");
// Looks del avatar: la misma cara con otro pelo, ropa o estado de la piel (solo si el plan trae "looks").
const looks = plan.looks ?? {};
if (Object.keys(looks).length > 3) avisos.push(`looks: ${Object.keys(looks).length} (máx. 3; junta los que se parezcan)`);
const brolls = (plan.brolls ?? []).map((b) => {
  if (![4, 6, 8].includes(b.dur)) avisos.push(`B-roll ${b.n}: duración ${b.dur} s (usa 4 o 6; ver la regla de duración)`);
  if (b.look) {
    const l = looks[b.look];
    if (!l) avisos.push(`B-roll ${b.n}: dice "look": "${b.look}" pero el plan no tiene ese look`);
    else b = { ...b, referencia: l.imagen, mismaPersona: true, look: { id: b.look, desc: l.desc, identidad: plan.identidad } };
  }
  if (!b.producto) return b;
  if (!prod) { avisos.push(`B-roll ${b.n}: dice "producto": true pero el plan no tiene "producto"`); return { ...b, producto: undefined }; }
  if (!b.producto_donde) avisos.push(`B-roll ${b.n}: falta "producto_donde" (dónde queda el producto, para su prompt de corrección)`);
  return { ...b, producto: prod };
});
let md = `# ${plan.anuncio} — Prompts\n\n` +
  `Todo en orden: ` + (prod ? `**0)** crea la foto del producto · ` : "") +
  `**1)** crea la imagen del avatar y quédate con la que más te guste · ` +
  (plan.clips.length ? `**2)** genera todos los clips de voz con esa imagen · **3)** genera los B-rolls.\n` : `**3)** genera los B-rolls (la voz en off se genera aparte).\n`) +
  (plan.clips.length ? `Voz: **${plan.clips.length} clips · ${total} s** generados` : `Voz en off: se genera aparte (formatos/voz-en-off/LEEME.md)`) + (brolls.length ? ` · B-rolls: **${brolls.length}**` : "") + `.\n`;

// Paso 0 · imagen del producto (solo con producto físico)
if (prod) {
  md += `\n**Producto LOCKED IN:** \`${PROD_IMG}\` se adjunta en cada imagen donde sale el producto y su descripción (\`product\`) es idéntica en todos los prompts. ` +
    `Antes de animar, compara cada imagen con \`${PROD_IMG}\`: si el producto o la etiqueta cambian, regenera esa imagen.\n`;
  md += `\n---\n\n# Paso 0 · Imagen del producto (Nano Banana Pro, 1:1)\n\n`;
  if (fs.existsSync(path.join(dir, PROD_IMG))) md += `Ya tienes la foto del producto (\`${PROD_IMG}\`): no hace falta generarla.\n`;
  else {
    const txt = JSON.stringify(productoImagen(prod), null, 2);
    fs.mkdirSync(path.join(dir, "producto"), { recursive: true });
    fs.writeFileSync(path.join(dir, "producto", "prompt-producto.json"), txt + "\n");
    md += `Si el producto es real, usa una foto real (de frente, bien iluminada, etiqueta legible) y guárdala como \`${PROD_IMG}\`. Si no, genera 4 variaciones con este prompt y guarda la de etiqueta perfecta (${prod.texto}, bien escrita, sin texto de más).\n\n` + bloque(txt);
  }
}

// Paso 1 · imagen de cada toma
const listaTomas = Object.entries(tomas);
md += `\n---\n\n# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)\n\n` +
  `Pon el formato 9:16, pega el prompt, genera 4 variaciones y guarda la elegida con el nombre que se indica. Revisa manos, ojos, piel y que no haya letras inventadas.\n`;
for (const [k, img] of listaTomas) {
  const rel = plan.prompts_imagen?.[k] ?? (listaTomas.length === 1 ? "avatar/prompt-nano-banana.json" : `avatar/prompt-${k}.json`);
  const conProducto = (j) => prod && j && typeof j === "object" && "product" in j;
  let titulo = listaTomas.length > 1 ? `\n## Toma ${k} → guárdala como \`${img}\`\n\n` : `\nGuárdala como \`${img}\`.\n\n`;
  if (fs.existsSync(path.join(dir, rel))) {
    let txt = fs.readFileSync(path.join(dir, rel), "utf8").trim();
    const j = JSON.parse(txt);
    if (conProducto(j)) {
      j.product = prod.bloque;   // el mismo bloque del Paso 0, palabra por palabra
      txt = JSON.stringify(j, null, 2);
      fs.writeFileSync(path.join(dir, rel), txt + "\n");
      titulo += `**Adjunta \`${PROD_IMG}\`** al generar: el producto de la imagen debe ser idéntico.\n\n`;
    }
    md += titulo + bloque(txt);
    if (conProducto(j)) {
      if (!plan.producto.donde?.[k]) avisos.push(`toma ${k}: falta producto.donde.${k} (dónde queda el producto, para el prompt de corrección)`);
      md += correccionMarkdown(prod, plan.producto.donde?.[k]);
    }
  }
  else if (fs.existsSync(path.join(dir, img))) md += titulo + "Ya tienes esta imagen: no hace falta generarla.\n";
  else avisos.push(`toma ${k}: faltan el prompt de la imagen (${rel}) y la imagen (${img})`);
}
// Looks con imagen propia (los que no son la imagen de una toma): misma persona, otro look
const baseLook = listaTomas[0][1];
const looksAparte = Object.entries(looks).filter(([, l]) => !Object.values(tomas).includes(l.imagen));
// Sin "identidad" (lo que se ve en el avatar elegido) los looks inventan pelo o cambian la cara: esperan a que exista el avatar.
const sinIdentidad = Object.keys(looks).length > 0 && !plan.identidad;
if (sinIdentidad) {
  avisos.push(`looks: falta "identidad". Cuando el usuario guarde ${baseLook}, mírala, describe lo que se ve (cara, frente, entradas, pelo, barba) y vuelve a generar`);
  md += `\n**Looks del avatar y escenas donde sale él:** primero guarda \`${baseLook}\` y dile a Claude "ya tengo el avatar". Claude lo mira, anota cómo es de verdad (para que la cara y el pelo no cambien) y te arma esos prompts.\n`;
}
else if (looksAparte.length) md += `\n**Looks del avatar:** la misma persona con otro look. Genera cada uno **adjuntando \`${baseLook}\`** (la cara tiene que ser idéntica) y guárdalo con el nombre que se indica. Si la cara, el pelo o la barba cambian, regenera.\n`;
for (const [id, l] of sinIdentidad ? [] : looksAparte) {
  if (!l.imagen || !l.desc || !l.location) { avisos.push(`look ${id}: faltan "imagen", "desc" o "location"`); continue; }
  const txt = JSON.stringify(lookImagen({ ...l, identidad: plan.identidad }), null, 2);
  fs.mkdirSync(path.join(dir, "avatar"), { recursive: true });
  fs.writeFileSync(path.join(dir, "avatar", `prompt-look-${id}.json`), txt + "\n");
  md += `\n## Look ${id} · adjunta \`${baseLook}\` → guárdala como \`${l.imagen}\`\n\n` +
    (fs.existsSync(path.join(dir, l.imagen)) ? "Ya tienes esta imagen: no hace falta generarla.\n" : bloque(txt));
}

// Paso 2 · clips de voz (no hay en el formato voz en off)
if (plan.clips.length) md += `\n---\n\n# Paso 2 · Clips de voz (Google Flow)\n\n` +
  `Sube la imagen de la toma como imagen inicial, pega el JSON del clip y genera (2 variaciones por clip; quédate con la mejor). Guarda cada video como \`clips/clip-01.mp4\`, \`clips/clip-02.mp4\`…\n`;
for (const c of plan.clips) {
  if (!DUR_OK.includes(c.dur)) avisos.push(`clip ${c.n}: duración ${c.dur} s (usa 4, 6, 8 o 10)`);
  const n = c.texto.trim().split(/\s+/).length;
  const [min, max] = PALABRAS[c.dur] ?? [0, 99];
  if (n > max + 2) avisos.push(`clip ${c.n}: ${n} palabras para ${c.dur} s (máx. ~${max}); súbelo de duración o divídelo`);
  if (n < min - 4) avisos.push(`clip ${c.n}: ${n} palabras para ${c.dur} s (pocas; el avatar puede quedarse callado al final)`);
  const sil = silabas(c.texto), sps = sil / c.dur;
  ritmos.push([c.n, sps]);
  if (sps > 4.5) avisos.push(`clip ${c.n}: ${sil} sílabas en ${c.dur} s (${sps.toFixed(1)} por segundo): el avatar va a acelerar; súbelo de duración o divídelo (meta ~3,2–4,3)`);
  if (/[$%/]/.test(c.texto)) avisos.push(`clip ${c.n}: tiene símbolos ($ % /); escríbelos en palabras`);

  const j = JSON.parse(tpl);
  if (plan.speaker) j.scene.dialogue.speaker = plan.speaker;
  if (plan.acento) {
    j.scene.performance.language_accent = `español con acento ${plan.acento}`;
    j.instructions = j.instructions.map((x) => x.replace("acento ecuatoriano", `acento ${plan.acento}`));
  }
  j.scene.dialogue.script = c.texto.trim();
  j.scene.performance.hand_gestures.synchronization = c.gestos.trim();
  const txt = JSON.stringify(j, null, 2);
  fs.writeFileSync(path.join(dir, "prompts", `clip-${c.n}.json`), txt + "\n");
  const img = c.toma && tomas[c.toma] && listaTomas.length > 1 ? ` · toma ${c.toma} (\`${tomas[c.toma]}\`)` : "";
  md += `\n## Clip ${c.n} · ${c.dur} s${img} — ${c.desc ?? ""}\n\n` + bloque(txt);
}

// Pasos 3 y 4 · B-rolls en 2 etapas: primero el frame (barato, se elige entre 4) y después el video desde ese frame.
// Van en prompts-broll/ para que el validador de voz no los lea.
fs.mkdirSync(path.join(dir, "prompts-broll"), { recursive: true });
for (const f of fs.readdirSync(path.join(dir, "prompts-broll"))) if (/^broll-\d+.*\.json$/.test(f)) fs.rmSync(path.join(dir, "prompts-broll", f));
// sin identidad, los B-rolls donde sale él con un look esperan; los demás se pueden generar ya
const brollsListos = sinIdentidad ? brolls.filter((b) => !b.look) : brolls;
for (const b of brollsListos) {
  fs.writeFileSync(path.join(dir, "prompts-broll", `broll-${b.n}-imagen.json`), JSON.stringify(brollImagen(b), null, 2) + "\n");
  fs.writeFileSync(path.join(dir, "prompts-broll", `broll-${b.n}-video.json`), JSON.stringify(brollVideo(b), null, 2) + "\n");
}
if (brollsListos.length) md += brollMarkdown(brollsListos);
if (brollsListos.length < brolls.length) md += `\nFaltan los B-rolls ${brolls.filter((b) => b.look).map((b) => b.n).join(", ")}: salen cuando Claude tenga la identidad del avatar.\n`;

// guion.txt = el guion aprobado (se guarda al aprobarlo). Si no existe, se crea con el texto de los clips.
const guionTxt = path.join(dir, "guion.txt");
if (plan.clips.length && !fs.existsSync(guionTxt)) fs.writeFileSync(guionTxt, plan.clips.map((c) => c.texto.trim()).join(" ") + "\n");
fs.writeFileSync(path.join(dir, "prompts-flow.md"), md);
// misma velocidad de habla en todos los clips: ninguno mucho más rápido (>0,7) o más lento (>1,0) que la mediana
// (los clips cortos dan un poco menos porque el avatar tarda ~0,6 s en arrancar)
if (ritmos.length > 1) {
  const m = [...ritmos].map((r) => r[1]).sort((a, b) => a - b)[Math.floor(ritmos.length / 2)];
  for (const [n, s] of ritmos) if ((s - m > 0.7 || m - s > 1.0) && s <= 4.5)
    avisos.push(`clip ${n}: ${s.toFixed(1)} sílabas por segundo contra ${m.toFixed(1)} de los demás; ${s > m ? "sonará más rápido" : "sonará más lento"} (ajusta la duración o el texto)`);
}
console.log(`${plan.clips.length} prompts de voz → ${dir}/prompts/ · ${brolls.length} B-rolls → prompts-broll/ · prompts-flow.md (${total} s)`);
if (avisos.length) console.log("\nAvisos:\n" + avisos.map((a) => "  - " + a).join("\n"));

if (!plan.clips.length) process.exit(0);
const args = [path.join(here, "validar-json.mjs"), path.join(dir, "prompts"), "--guion", path.join(dir, "guion.txt")];
if (plan.speaker) args.push("--speaker", plan.speaker);
if (plan.acento) args.push("--acento", plan.acento);
console.log("");
try {
  execFileSync(process.execPath, args, { stdio: "inherit" });
} catch {
  process.exit(1);
}
