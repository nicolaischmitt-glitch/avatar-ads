// Construye un lead magnet: lead-magnet.src.html → lead-magnet.html → <slug>.pdf
// Uso (desde la raíz del proyecto):  node lead-magnets/_plantilla/construir.mjs lead-magnets/01-prompt-json
//
// En la carpeta del lead magnet:
//   config.json        { "slug": "...", "landing": "https://...", "vars": { "CLAVE": "valor" } }
//   preparar.mjs       (opcional) export default async () => ({ CLAVE: "html" })  — para bloques generados (p. ej. JSON)
//   lead-magnet.src.html  usa {{LANDING}} y {{CLAVE}} como marcadores
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const dir = path.resolve(process.argv[2] || ".");
const cfg = JSON.parse(fs.readFileSync(path.join(dir, "config.json"), "utf8"));
let vars = { LANDING: cfg.landing, ...(cfg.vars || {}) };
const prep = path.join(dir, "preparar.mjs");
if (fs.existsSync(prep)) vars = { ...vars, ...(await (await import(pathToFileURL(prep).href)).default()) };

let html = fs.readFileSync(path.join(dir, "lead-magnet.src.html"), "utf8");
html = html.replace(/\{\{([A-Z_0-9]+)\}\}/g, (m, k) => {
  if (!(k in vars)) throw new Error(`Falta el valor para ${m}`);
  return vars[k];
});
const out = path.join(dir, "lead-magnet.html");
fs.writeFileSync(out, html);

const browsers = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];
const browser = browsers.find((b) => fs.existsSync(b));
if (!browser) throw new Error("No encontré Chrome ni Edge para exportar el PDF");
const pdf = path.join(dir, `${cfg.slug}.pdf`);
execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
  "--virtual-time-budget=4000", `--print-to-pdf=${pdf}`, pathToFileURL(out).href], { stdio: "ignore" });
const pages = (fs.readFileSync(pdf, "latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log(`PDF listo: ${pdf} · ${pages} páginas · ${(fs.statSync(pdf).size / 1024).toFixed(0)} KB`);
