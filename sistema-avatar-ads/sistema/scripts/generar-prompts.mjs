#!/usr/bin/env node
// Genera los prompts JSON de Google Flow de un anuncio a partir de su plan de clips, y los valida.
//
// Uso (desde la raíz del kit):  node sistema/scripts/generar-prompts.mjs anuncios/NN-slug
//
// Lee  anuncios/NN-slug/clips-plan.json:
//   {
//     "anuncio": "Anuncio 01 — Curso de repostería",
//     "speaker": "mujer",                  // voz del avatar: "hombre" o "mujer"
//     "acento": "colombiano",              // acento del público (negocio/marca.md)
//     "tomas": { "a": "avatar/avatar.jpg" },   // imagen de referencia de cada toma
//     "clips": [
//       { "n": "01", "dur": 8, "toma": "a", "desc": "Hook", "texto": "…fragmento exacto…", "gestos": "al decir '…', …" }
//     ]
//   }
// Escribe: prompts/clip-NN.json · prompts-flow.md (listo para copiar en Flow)
// y ejecuta validar-json.mjs contra guion.txt (el guion aprobado: los clips deben decirlo palabra por palabra). Solo cambian el diálogo y los gestos (+ voz y acento): la estructura del master no se toca.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

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

fs.mkdirSync(path.join(dir, "prompts"), { recursive: true });
for (const f of fs.readdirSync(path.join(dir, "prompts"))) if (/^clip-\d+\.json$/.test(f)) fs.rmSync(path.join(dir, "prompts", f));

const total = plan.clips.reduce((a, c) => a + c.dur, 0);
const tomas = plan.tomas ?? {};
let md = `# ${plan.anuncio} — Prompts JSON para Google Flow\n\n` +
  `Total: **${plan.clips.length} clips · ${total} s** generados.\n` +
  Object.entries(tomas).map(([k, img]) => `- Toma **${k}** → imagen de referencia \`${img}\``).join("\n") +
  `\n\nEn Flow: sube la imagen de la toma, pega el JSON del clip y genera. Guarda cada video como \`clips/clip-01.mp4\`, \`clips/clip-02.mp4\`…\n`;

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
  const img = c.toma && tomas[c.toma] ? ` · toma ${c.toma} (\`${tomas[c.toma]}\`)` : "";
  md += `\n## Clip ${c.n} · ${c.dur} s${img} — ${c.desc ?? ""}\n\n\`\`\`json\n${txt}\n\`\`\`\n`;
}
// guion.txt = el guion aprobado (se guarda al aprobarlo). Si no existe, se crea con el texto de los clips.
const guionTxt = path.join(dir, "guion.txt");
if (!fs.existsSync(guionTxt)) fs.writeFileSync(guionTxt, plan.clips.map((c) => c.texto.trim()).join(" ") + "\n");
fs.writeFileSync(path.join(dir, "prompts-flow.md"), md);
console.log(`${plan.clips.length} prompts → ${dir}/prompts/ · prompts-flow.md (${total} s)`);
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
