// Renderiza un carrusel: carrusel.html → png/slide-01.png … + png/_resumen.jpg (hoja de contactos para revisar)
// Uso (desde la raíz del proyecto):  node Contenido/carruseles/_plantilla/render.mjs Contenido/carruseles/01-prompt-json [--solo 3]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const dir = path.resolve(process.argv[2] || ".");
const soloIdx = process.argv.indexOf("--solo");
const solo = soloIdx > -1 ? +process.argv[soloIdx + 1] : null;
const html = path.join(dir, "carrusel.html");
if (!fs.existsSync(html)) throw new Error(`No existe ${html}`);
const n = (fs.readFileSync(html, "utf8").match(/<section class="slide[\s"]/g) || []).length;
if (!n) throw new Error("No encontré ningún <section class=\"slide\">");

const browser = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"]
  .find((b) => fs.existsSync(b));
if (!browser) throw new Error("No encontré Chrome ni Edge");
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "carrusel-chrome-")); // perfil limpio: sin caché ni extensiones
const flags = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--disable-extensions",
  `--user-data-dir=${profile}`, "--allow-file-access-from-files", "--virtual-time-budget=5000"];
const url = (i) => `${pathToFileURL(html).href}?s=${i}`;

const out = path.join(dir, "png");
fs.mkdirSync(out, { recursive: true });
if (!solo) for (const f of fs.readdirSync(out)) if (/^slide-\d+\.png$/.test(f)) fs.rmSync(path.join(out, f));

// 1) chequeo de zona segura de todos los slides de una vez (slides.js lo deja en <body data-issues>)
const dom = execFileSync(browser, [...flags, "--window-size=1080,1350", "--dump-dom", pathToFileURL(html).href],
  { encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "ignore"] });
const m = dom.match(/data-issues="([^"]*)"/);
const issues = m ? JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")) : [];

// 2) un PNG por slide
for (let i = 1; i <= n; i++) {
  if (solo && i !== solo) continue;
  const png = path.join(out, `slide-${String(i).padStart(2, "0")}.png`);
  execFileSync(browser, [...flags, "--window-size=1080,1350", `--screenshot=${png}`, url(i)], { stdio: "ignore" });
  console.log(`✓ ${path.relative(process.cwd(), png)}`);
}

if (!solo) {
  const cols = Math.min(n, 5), rows = Math.ceil(n / cols);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", path.join(out, "slide-%02d.png"),
    "-vf", `scale=432:-1,tile=${cols}x${rows}:padding=16:margin=16:color=0x000000`, "-frames:v", "1", "-q:v", "3",
    path.join(out, "_resumen.jpg")]);
  console.log(`✓ ${path.relative(process.cwd(), path.join(out, "_resumen.jpg"))}`);
}

fs.rmSync(profile, { recursive: true, force: true });
const uniq = [...new Set(issues)];
if (n > 10) uniq.unshift(`El carrusel tiene ${n} slides: el máximo es 10.`);
if (uniq.length) { console.log("\n⚠ Revisar:"); uniq.forEach((x) => console.log("  - " + x)); process.exitCode = 1; }
else console.log(`\nListo: ${n} slides, sin contenido fuera de la zona segura.`);
