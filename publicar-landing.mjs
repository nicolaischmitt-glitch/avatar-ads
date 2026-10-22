#!/usr/bin/env node
// Publica la carpeta landing/ en GitHub Pages (repositorio público nicolaischmitt-glitch/avatar-ads-landing → https://taller.droilab.com).
// Uso (desde la raíz del proyecto): node publicar-landing.mjs ["mensaje del cambio"]
// Copia landing/ a .deploy-landing/ (un repositorio git aparte, ignorado por el repo principal), añade CNAME y .nojekyll,
// y sube solo si algo cambió. GitHub Pages se actualiza en ~1 minuto.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(root, "landing");
const dst = path.join(root, ".deploy-landing");
const REMOTE = "https://github.com/nicolaischmitt-glitch/avatar-ads-landing.git";
const DOMAIN = "taller.droilab.com";
const msg = process.argv[2] || `Landing ${new Date().toISOString().slice(0, 16).replace("T", " ")}`;
const git = (...a) => execFileSync("git", a, { cwd: dst, stdio: ["ignore", "pipe", "inherit"] }).toString().trim();

if (!fs.existsSync(path.join(dst, ".git"))) {
  fs.mkdirSync(dst, { recursive: true });
  git("init", "-q", "-b", "main");
  git("remote", "add", "origin", REMOTE);
  git("config", "core.autocrlf", "false");
}
// Misma identidad de autor que el repositorio principal
for (const k of ["user.name", "user.email"]) {
  const v = execFileSync("git", ["config", k], { cwd: root }).toString().trim();
  git("config", k, v);
}
// Vaciar todo menos .git y copiar la landing tal cual
for (const f of fs.readdirSync(dst)) if (f !== ".git") fs.rmSync(path.join(dst, f), { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
fs.writeFileSync(path.join(dst, "CNAME"), DOMAIN + "\n");
fs.writeFileSync(path.join(dst, ".nojekyll"), "");

git("add", "-A");
if (!git("status", "--porcelain")) {
  console.log("Sin cambios: la landing publicada ya es igual a landing/.");
  process.exit(0);
}
git("commit", "-q", "-m", msg);
execFileSync("git", ["push", "-q", "-u", "origin", "main"], { cwd: dst, stdio: "inherit" });
console.log(`✓ Publicado: "${msg}" → https://${DOMAIN} (GitHub Pages tarda ~1 min en actualizar)`);
