// Genera los bloques de código del PDF a partir de la fuente única (master prompt) y del clip 1 real del reel 01
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const mark = (line) => {
  const e = esc(line);
  return /"(script|synchronization)"/.test(line) ? `<span class="hl">${e}</span>` : e;
};

export default async function () {
  const master = fs.readFileSync(path.join(root, "skills/master prompt para json prompts videos.txt"), "utf8");
  const sec = master.slice(master.indexOf("## 4."), master.indexOf("## 5."));
  const tpl = JSON.parse(sec.slice(sec.indexOf("{"), sec.lastIndexOf("}") + 1));
  const lines = JSON.stringify(tpl, null, 2).split("\n");
  const cut = lines.findIndex((l) => l.includes('"visual_restrictions"'));
  const clip = JSON.parse(fs.readFileSync(path.join(root, "Contenido/reels/01-forma-correcta-hiperrealismo/prompts/clip-01.json"), "utf8"));
  const ejemplo = [
    `"script": ${JSON.stringify(clip.scene.dialogue.script)}`,
    ``,
    `"synchronization": ${JSON.stringify(clip.scene.performance.hand_gestures.synchronization)}`,
  ].join("\n");
  return {
    JSON_A: lines.slice(0, cut).map(mark).join("\n") + "\n    …",
    JSON_B: "  …\n" + lines.slice(cut).map(mark).join("\n"),
    EJEMPLO: ejemplo.split("\n").map(mark).join("\n"),
  };
}
