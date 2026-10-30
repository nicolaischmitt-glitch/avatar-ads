// Renderiza imagen.html → final/NOMBRE[-variante].png (feed 1080×1350) + NOMBRE[-variante]-historia.png (1080×1920)
// + final/_revision.jpg (todas las imágenes lado a lado, con la zona segura de las historias en rojo) + aviso de desbordes.
// Uso (desde la raíz del proyecto):  node anuncios/imagenes/NN-slug/render.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";

const NOMBRE = "nombre-del-anuncio";
// [sufijo del archivo, parámetros de imagen.html]. "" = versión principal. Nunca reutilices un sufijo para otra cosa.
const VARIANTES = [["", ""]];

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((b) => fs.existsSync(b));
if (!browser) throw new Error("No encontré Chrome ni Edge");
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "estatico-chrome-"));
const base = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--disable-extensions",
  `--user-data-dir=${profile}`, "--allow-file-access-from-files", "--virtual-time-budget=5000"];
fs.mkdirSync(path.join(dir, "final"), { recursive: true });

const pngs = [];
for (const [sufijo, params] of VARIANTES) {
  for (const historia of [false, true]) {
    const alto = historia ? 1920 : 1350;
    const query = [params, historia ? "historia" : ""].filter(Boolean).join("&");
    const url = pathToFileURL(path.join(dir, "imagen.html")).href + (query ? "?" + query : "");
    const nombre = `${NOMBRE}${sufijo ? "-" + sufijo : ""}${historia ? "-historia" : ""}.png`;
    const png = path.join(dir, "final", nombre);
    execFileSync(browser, [...base, `--window-size=1080,${alto}`, `--screenshot=${png}`, url], { stdio: "ignore" });
    // imagen.html marca <html data-desborde="si"> si algo se sale del lienzo o de la zona segura
    const dom = execFileSync(browser, [...base, `--window-size=1080,${alto}`, "--dump-dom", url], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    const desborde = /data-desborde="si"/.test(dom);
    console.log(`${desborde ? "⚠ DESBORDE" : "✓"} ${path.relative(process.cwd(), png)}`);
    pngs.push({ png, historia });
  }
}
fs.rmSync(profile, { recursive: true, force: true });

// Hoja de revisión: todo a 1/3 de tamaño; en las historias, líneas rojas en 250 px y 1580 px (zona segura)
try {
  const inputs = pngs.flatMap(({ png }) => ["-i", png]);
  const filtros = pngs.map(({ historia }, i) => historia
    ? `[${i}]scale=360:640,drawbox=y=83:w=iw:h=2:color=red,drawbox=y=527:w=iw:h=2:color=red[v${i}]`
    : `[${i}]scale=360:450,pad=360:640:0:95:white[v${i}]`);
  const hoja = `${filtros.join(";")};${pngs.map((_, i) => `[v${i}]`).join("")}hstack=${pngs.length}`;
  execFileSync("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", hoja, path.join(dir, "final", "_revision.jpg")]);
  console.log(`✓ ${path.relative(process.cwd(), path.join(dir, "final", "_revision.jpg"))}`);
} catch { console.log("(sin ffmpeg: no se hizo la hoja de revisión)"); }
