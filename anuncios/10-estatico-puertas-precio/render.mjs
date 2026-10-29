// Renderiza imagen.html → final/puertas-precio.png (1080×1350)
// Uso (desde la raíz del proyecto):  node anuncios/10-estatico-puertas-precio/render.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"]
  .find((b) => fs.existsSync(b));
if (!browser) throw new Error("No encontré Chrome ni Edge");
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "estatico-chrome-"));
fs.mkdirSync(path.join(dir, "final"), { recursive: true });
for (const [nombre, alto, query] of [["puertas-precio.png", 1350, ""], ["puertas-precio-historia.png", 1920, "?historia"]]) {
  const png = path.join(dir, "final", nombre);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--disable-extensions",
    `--user-data-dir=${profile}`, "--allow-file-access-from-files", "--virtual-time-budget=5000",
    `--window-size=1080,${alto}`, `--screenshot=${png}`, pathToFileURL(path.join(dir, "imagen.html")).href + query], { stdio: "ignore" });
  console.log(`✓ ${path.relative(process.cwd(), png)}`);
}
fs.rmSync(profile, { recursive: true, force: true });
