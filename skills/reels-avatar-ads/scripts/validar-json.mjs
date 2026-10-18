#!/usr/bin/env node
// Valida que los JSON de cada clip respeten la estructura LOCKED IN del master prompt.
//
// Uso:
//   node validar-json.mjs <carpeta-prompts> [--guion guion.txt] [--allow ruta.clave ...]
//
// - Toma la plantilla de "master prompt para json prompts videos.txt" (sección 4).
// - Cada clip debe tener exactamente las mismas claves, jerarquía, tipos y valores,
//   salvo scene.dialogue.script y scene.performance.hand_gestures.synchronization
//   (y las rutas que se pasen con --allow, solo si el usuario las autorizó).
// - Con --guion, comprueba que los diálogos concatenados sean idénticos al guion aprobado.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const MASTER = path.resolve(here, "../../master prompt para json prompts videos.txt");
const ALWAYS_ALLOWED = ["scene.dialogue.script", "scene.performance.hand_gestures.synchronization"];

const args = process.argv.slice(2);
const dir = args[0];
if (!dir) {
  console.error("Uso: node validar-json.mjs <carpeta-prompts> [--guion guion.txt] [--allow ruta ...]");
  process.exit(2);
}
let guionFile = null;
const allowed = new Set(ALWAYS_ALLOWED);
for (let i = 1; i < args.length; i++) {
  if (args[i] === "--guion") guionFile = args[++i];
  else if (args[i] === "--allow") allowed.add(args[++i]);
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

const template = extractTemplate(fs.readFileSync(MASTER, "utf8"));
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
  compare(template, data, "", errors);
  const script = data?.scene?.dialogue?.script ?? "";
  const sync = data?.scene?.performance?.hand_gestures?.synchronization ?? "";
  if (!script.trim() || script.includes("[FRAGMENTO")) errors.push("scene.dialogue.script: vacío o sin rellenar");
  if (!sync.trim()) errors.push("scene.performance.hand_gestures.synchronization: vacío");
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
