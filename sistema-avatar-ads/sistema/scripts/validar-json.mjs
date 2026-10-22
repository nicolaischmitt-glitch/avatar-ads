#!/usr/bin/env node
// Valida que los JSON de cada clip respeten la estructura LOCKED IN del master prompt.
//
// Uso:
//   node validar-json.mjs <carpeta-prompts> [--guion guion.txt] [--allow ruta.clave ...]
//        [--speaker hombre|mujer] [--acento colombiano]
//        [--plantilla p1=ruta/plantilla-personaje-1.json --plantilla p2=...]
//
// - --speaker y --acento personalizan la plantilla del master (voz del avatar y acento del público del alumno)
//   antes de comparar: no son cambios de estructura, son las dos variables que cada negocio define una vez.
//
// - Con --plantilla, los archivos clip-NN-<sufijo>.json se validan contra esa plantilla de
//   formato (p. ej. podcast) en vez de la del master; la plantilla debe tener la misma estructura.
//
// - Toma la plantilla de sistema/prompts/master-prompt-video.txt (sección 4).
// - Cada clip debe tener exactamente las mismas claves, jerarquía, tipos y valores,
//   salvo scene.dialogue.script y scene.performance.hand_gestures.synchronization
//   (y las rutas que se pasen con --allow, solo si el usuario las autorizó).
// - Con --guion, comprueba que los diálogos concatenados sean idénticos al guion aprobado.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const MASTER = path.resolve(here, "../prompts/master-prompt-video.txt");
const ALWAYS_ALLOWED = ["scene.dialogue.script", "scene.performance.hand_gestures.synchronization"];

const args = process.argv.slice(2);
const dir = args[0];
if (!dir) {
  console.error("Uso: node validar-json.mjs <carpeta-prompts> [--guion guion.txt] [--allow ruta ...]");
  process.exit(2);
}
let guionFile = null, speaker = null, acento = null;
const allowed = new Set(ALWAYS_ALLOWED);
const plantillas = []; // [sufijo, ruta]: clip-NN-<sufijo>.json se valida contra esa plantilla
for (let i = 1; i < args.length; i++) {
  if (args[i] === "--guion") guionFile = args[++i];
  else if (args[i] === "--allow") allowed.add(args[++i]);
  else if (args[i] === "--speaker") speaker = args[++i];
  else if (args[i] === "--acento") acento = args[++i];
  else if (args[i] === "--plantilla") {
    const [sufijo, ruta] = args[++i].split("=");
    plantillas.push([sufijo, ruta]);
  }
}

function extractTemplate(text) {
  const start = text.indexOf("## 4.");
  const end = text.indexOf("## 5.", start);
  const section = text.slice(start, end);
  const json = section.slice(section.indexOf("{"), section.lastIndexOf("}") + 1);
  return JSON.parse(json);
}

const typeOf = (v) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);

function compare(tpl, val, p, errors) {
  const tt = typeOf(tpl), vt = typeOf(val);
  if (tt !== vt) return errors.push(`${p || "(raíz)"}: tipo ${vt}, se esperaba ${tt}`);
  if (tt === "object") {
    const tk = Object.keys(tpl), vk = Object.keys(val);
    for (const k of tk) if (!(k in val)) errors.push(`${p ? p + "." : ""}${k}: falta el campo`);
    for (const k of vk) if (!(k in tpl)) errors.push(`${p ? p + "." : ""}${k}: campo añadido (no existe en la plantilla)`);
    if (tk.join("|") !== vk.filter((k) => k in tpl).join("|") && tk.every((k) => k in val))
      errors.push(`${p || "(raíz)"}: el orden de las claves cambió`);
    for (const k of tk) if (k in val) compare(tpl[k], val[k], p ? `${p}.${k}` : k, errors);
  } else if (tt === "array") {
    if (allowed.has(p)) return;
    if (JSON.stringify(tpl) !== JSON.stringify(val)) errors.push(`${p}: la lista fue modificada`);
  } else if (!allowed.has(p) && tpl !== val) {
    errors.push(`${p}: valor modificado → ${JSON.stringify(val)}`);
  }
}

const norm = (s) => s.replace(/\s+/g, " ").trim();

function personalizar(tpl, { speaker, acento } = {}) {
  if (speaker) tpl.scene.dialogue.speaker = speaker;
  if (acento) {
    tpl.scene.performance.language_accent = `español con acento ${acento}`;
    tpl.instructions = tpl.instructions.map((x) => x.replace("acento ecuatoriano", `acento ${acento}`));
  }
  return tpl;
}
const template = personalizar(extractTemplate(fs.readFileSync(MASTER, "utf8")), { speaker, acento });

// Las plantillas de formato (p. ej. podcast) solo pueden cambiar valores, nunca la estructura del master.
function sameShape(a, b, p, errors) {
  const ta = typeOf(a), tb = typeOf(b);
  if (ta !== tb) return errors.push(`${p}: tipo ${tb}, se esperaba ${ta}`);
  if (ta !== "object") return;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.join("|") !== kb.join("|")) return errors.push(`${p || "(raíz)"}: claves distintas a las del master`);
  for (const k of ka) sameShape(a[k], b[k], p ? `${p}.${k}` : k, errors);
}
const formatTemplates = plantillas.map(([sufijo, ruta]) => {
  const tpl = JSON.parse(fs.readFileSync(ruta, "utf8"));
  const errors = [];
  sameShape(template, tpl, "", errors);
  if (errors.length) {
    console.log(`✗ Plantilla ${ruta} no respeta la estructura del master:`);
    for (const e of errors) console.log(`    - ${e}`);
    process.exit(1);
  }
  return [sufijo, tpl];
});
const templateFor = (f) => {
  const hit = formatTemplates.find(([sufijo]) => f.toLowerCase().endsWith(`-${sufijo.toLowerCase()}.json`));
  return hit ? hit[1] : template;
};
const files = fs.readdirSync(dir).filter((f) => /\.json$/i.test(f)).sort();
if (!files.length) {
  console.error(`No hay archivos .json en ${dir}`);
  process.exit(2);
}

let failed = false;
const scripts = [];
for (const f of files) {
  const errors = [];
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  } catch (e) {
    console.log(`✗ ${f}: JSON inválido (${e.message})`);
    failed = true;
    continue;
  }
  compare(templateFor(f), data, "", errors);
  const script = data?.scene?.dialogue?.script ?? "";
  const sync = data?.scene?.performance?.hand_gestures?.synchronization ?? "";
  if (!script.trim() || script.includes("[FRAGMENTO")) errors.push("scene.dialogue.script: vacío o sin rellenar");
  if (!sync.trim() || sync.includes("[GESTOS")) errors.push("scene.performance.hand_gestures.synchronization: vacío");
  scripts.push(script);
  if (errors.length) {
    failed = true;
    console.log(`✗ ${f}`);
    for (const e of errors) console.log(`    - ${e}`);
  } else {
    console.log(`✓ ${f}  (${norm(script).split(" ").length} palabras)`);
  }
}

if (guionFile) {
  const guion = norm(fs.readFileSync(guionFile, "utf8"));
  const joined = norm(scripts.join(" "));
  if (guion === joined) console.log("✓ Los diálogos coinciden palabra por palabra con el guion aprobado");
  else {
    failed = true;
    const a = guion.split(" "), b = joined.split(" ");
    let i = 0;
    while (i < a.length && a[i] === b[i]) i++;
    console.log(`✗ Los diálogos NO coinciden con el guion (primera diferencia en la palabra ${i + 1}):`);
    console.log(`    guion:  …${a.slice(Math.max(0, i - 4), i + 6).join(" ")}`);
    console.log(`    clips:  …${b.slice(Math.max(0, i - 4), i + 6).join(" ")}`);
  }
}

console.log(failed ? "\nRESULTADO: FALLA — corrige antes de entregar." : `\nRESULTADO: OK — ${files.length} clip(s) válidos.`);
process.exit(failed ? 1 : 0);
