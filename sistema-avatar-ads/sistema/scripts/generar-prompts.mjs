#!/usr/bin/env node
// Genera el paquete de prompts de un anuncio a partir de su plan de clips, y valida los de voz.
// prompts-flow.md va en 3 pasos, en el orden en que el usuario los usa:
//   Paso 1 · Imagen del avatar (Nano Banana Pro) → Paso 2 · Clips de voz (Google Flow) → Paso 3 · B-rolls (Google Flow, sin diálogo)
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
//     "brolls": [   // ideas de B-roll que propone Claude: sin diálogo, 6 u 8 s. Campos en broll-plantilla.mjs
//       { "n": "01", "dur": 6, "desc": "Macro del producto", "referencia": "avatar/avatar.jpg",   // referencia: opcional (mismo producto o lugar)
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
import { brollImagen, brollVideo, brollMarkdown } from "./broll-plantilla.mjs";

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

const total = plan.clips.reduce((a, c) => a + c.dur, 0);
const tomas = Object.keys(plan.tomas ?? {}).length ? plan.tomas : { a: "avatar/avatar.jpg" };
const brolls = plan.brolls ?? [];
let md = `# ${plan.anuncio} — Prompts\n\n` +
  `Todo en orden: **1)** crea la imagen del avatar y quédate con la que más te guste · **2)** genera todos los clips de voz con esa imagen · **3)** genera los B-rolls.\n` +
  `Voz: **${plan.clips.length} clips · ${total} s** generados` + (brolls.length ? ` · B-rolls: **${brolls.length}**` : "") + `.\n`;

// Paso 1 · imagen de cada toma
const listaTomas = Object.entries(tomas);
md += `\n---\n\n# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)\n\n` +
  `Pon el formato 9:16, pega el prompt, genera 4 variaciones y guarda la elegida con el nombre que se indica. Revisa manos, ojos, piel y que no haya letras inventadas.\n`;
for (const [k, img] of listaTomas) {
  const rel = plan.prompts_imagen?.[k] ?? (listaTomas.length === 1 ? "avatar/prompt-nano-banana.json" : `avatar/prompt-${k}.json`);
  const titulo = listaTomas.length > 1 ? `\n## Toma ${k} → guárdala como \`${img}\`\n\n` : `\nGuárdala como \`${img}\`.\n\n`;
  if (fs.existsSync(path.join(dir, rel))) md += titulo + bloque(fs.readFileSync(path.join(dir, rel), "utf8").trim());
  else if (fs.existsSync(path.join(dir, img))) md += titulo + "Ya tienes esta imagen: no hace falta generarla.\n";
  else avisos.push(`toma ${k}: faltan el prompt de la imagen (${rel}) y la imagen (${img})`);
}

// Paso 2 · clips de voz
md += `\n---\n\n# Paso 2 · Clips de voz (Google Flow)\n\n` +
  `Sube la imagen de la toma como imagen inicial, pega el JSON del clip y genera (2 variaciones por clip; quédate con la mejor). Guarda cada video como \`clips/clip-01.mp4\`, \`clips/clip-02.mp4\`…\n`;
for (const c of plan.clips) {
  if (!DUR_OK.includes(c.dur)) avisos.push(`clip ${c.n}: duración ${c.dur} s (usa 4, 6, 8 o 10)`);
  const n = c.texto.trim().split(/\s+/).length;
  const [min, max] = PALABRAS[c.dur] ?? [0, 99];
  if (n > max + 2) avisos.push(`clip ${c.n}: ${n} palabras para ${c.dur} s (máx. ~${max}); súbelo de duración o divídelo`);
  if (n < min - 4) avisos.push(`clip ${c.n}: ${n} palabras para ${c.dur} s (pocas; el avatar puede quedarse callado al final)`);
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
for (const b of brolls) {
  fs.writeFileSync(path.join(dir, "prompts-broll", `broll-${b.n}-imagen.json`), JSON.stringify(brollImagen(b), null, 2) + "\n");
  fs.writeFileSync(path.join(dir, "prompts-broll", `broll-${b.n}-video.json`), JSON.stringify(brollVideo(b), null, 2) + "\n");
}
if (brolls.length) md += brollMarkdown(brolls);

// guion.txt = el guion aprobado (se guarda al aprobarlo). Si no existe, se crea con el texto de los clips.
const guionTxt = path.join(dir, "guion.txt");
if (!fs.existsSync(guionTxt)) fs.writeFileSync(guionTxt, plan.clips.map((c) => c.texto.trim()).join(" ") + "\n");
fs.writeFileSync(path.join(dir, "prompts-flow.md"), md);
console.log(`${plan.clips.length} prompts de voz → ${dir}/prompts/ · ${brolls.length} B-rolls → prompts-broll/ · prompts-flow.md (${total} s)`);
if (avisos.length) console.log("\nAvisos:\n" + avisos.map((a) => "  - " + a).join("\n"));

const args = [path.join(here, "validar-json.mjs"), path.join(dir, "prompts"), "--guion", path.join(dir, "guion.txt")];
if (plan.speaker) args.push("--speaker", plan.speaker);
if (plan.acento) args.push("--acento", plan.acento);
console.log("");
try {
  execFileSync(process.execPath, args, { stdio: "inherit" });
} catch {
  process.exit(1);
}
