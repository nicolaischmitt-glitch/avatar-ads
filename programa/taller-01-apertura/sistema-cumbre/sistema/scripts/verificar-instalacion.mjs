#!/usr/bin/env node
// Revisa que la computadora tenga todo lo que necesita el Sistema Avatar Ads (Windows y Mac).
// Uso (desde la raíz del kit): node sistema/scripts/verificar-instalacion.mjs
// Imprime ✓ / ✗ por herramienta y, si falta algo, el comando exacto para instalarlo en este sistema operativo.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const WIN = process.platform === "win32";
const MAC = process.platform === "darwin";
const run = (cmd) => {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"], timeout: 60000 }).toString().trim();
  } catch {
    return null;
  }
};

const checks = [];
const add = (nombre, ok, detalle, arreglo) => checks.push({ nombre, ok, detalle, arreglo });

// 1. Node.js 20 o más
const major = +process.versions.node.split(".")[0];
add("Node.js", major >= 20, `v${process.versions.node}`,
  WIN ? "winget install OpenJS.NodeJS.LTS   (o descárgalo de https://nodejs.org, versión LTS)" : "brew install node   (o descárgalo de https://nodejs.org, versión LTS)");

// 2. FFmpeg y FFprobe
const ff = run("ffmpeg -version");
const fp = run("ffprobe -version");
add("FFmpeg", !!ff && !!fp, ff ? ff.split("\n")[0].slice(0, 60) : "no encontrado",
  WIN ? "winget install Gyan.FFmpeg   (después cierra y vuelve a abrir la app de Claude)" : "brew install ffmpeg");

// 3. HyperFrames (editor de video automatizado)
const hf = run("hyperframes --version");
add("HyperFrames", !!hf, hf ? `v${hf}` : "no encontrado", "npm install -g hyperframes");

// 4. Skills de HyperFrames para Claude Code
const skillsDir = path.join(os.homedir(), ".claude", "skills", "hyperframes");
add("Skills de HyperFrames en Claude", fs.existsSync(skillsDir), fs.existsSync(skillsDir) ? "instalados" : "no instalados",
  "hyperframes skills   (instala los skills de edición en Claude Code)");

// 5. Homebrew (solo Mac: se usa para instalar lo demás)
if (MAC) {
  const brew = run("brew --version");
  add("Homebrew (Mac)", !!brew, brew ? brew.split("\n")[0] : "no encontrado",
    '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"');
}

// 6. Memoria (los renders necesitan al menos ~8 GB)
const gb = os.totalmem() / 1024 ** 3;
add("Memoria RAM", gb >= 7.5, `${gb.toFixed(1)} GB`,
  "Con menos de 8 GB el render puede fallar o tardar mucho: cierra otras apps antes de renderizar.");

const fallas = checks.filter((c) => !c.ok);
console.log(`Sistema Avatar Ads · verificación (${WIN ? "Windows" : MAC ? "Mac" : process.platform})\n`);
for (const c of checks) console.log(`${c.ok ? "✓" : "✗"} ${c.nombre.padEnd(32)} ${c.detalle}`);
if (fallas.length) {
  console.log("\nFalta instalar o revisar:");
  for (const c of fallas) console.log(`  • ${c.nombre}: ${c.arreglo}`);
  console.log("\nCuando termines, vuelve a ejecutar esta verificación.");
} else {
  console.log("\nTodo listo. Para un diagnóstico completo del editor: hyperframes doctor");
}
process.exit(fallas.some((c) => c.nombre !== "Memoria RAM") ? 1 : 0);
