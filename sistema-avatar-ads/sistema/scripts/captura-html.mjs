#!/usr/bin/env node
// Convierte una página HTML en PNG con Chrome o Edge sin ventana (para el storyboard).
// Uso: node sistema/scripts/captura-html.mjs anuncios/NN-slug/storyboard/storyboard.html [ancho alto]   (por defecto 1920 1080)
// Sale: el mismo nombre con .png. Funciona en Windows y Mac; si no hay Chrome ni Edge, usa el Chrome de HyperFrames.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const html = path.resolve(process.argv[2] ?? "");
if (!fs.existsSync(html)) {
  console.error("Uso: node sistema/scripts/captura-html.mjs ruta/al/archivo.html [ancho alto]");
  process.exit(2);
}
const [w, h] = [+(process.argv[3] ?? 1920), +(process.argv[4] ?? 1080)];

const hfChrome = () => {
  const base = path.join(os.homedir(), ".cache", "hyperframes", "chrome", "chrome-headless-shell");
  if (!fs.existsSync(base)) return null;
  for (const v of fs.readdirSync(base)) {
    for (const exe of ["chrome-headless-shell-win64/chrome-headless-shell.exe", "chrome-headless-shell-mac-arm64/chrome-headless-shell", "chrome-headless-shell-mac-x64/chrome-headless-shell"]) {
      const p = path.join(base, v, exe);
      if (fs.existsSync(p)) return p;
    }
  }
  return null;
};
const browser = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
].find((b) => fs.existsSync(b)) ?? hfChrome();
if (!browser) {
  console.error("No encontré Chrome ni Edge. Instala Google Chrome o ejecuta un render de HyperFrames una vez.");
  process.exit(1);
}

const profile = fs.mkdtempSync(path.join(os.tmpdir(), "avatar-ads-chrome-"));
const png = html.replace(/\.html?$/i, ".png");
execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--disable-extensions",
  `--user-data-dir=${profile}`, "--allow-file-access-from-files", "--virtual-time-budget=5000",
  `--window-size=${w},${h}`, `--screenshot=${png}`, pathToFileURL(html).href], { stdio: "ignore" });
fs.rmSync(profile, { recursive: true, force: true });
console.log(`✓ ${png}`);
