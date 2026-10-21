// Desenfoque del fondo (el carro) manteniendo a la persona nítida.
// La cámara está fija en cada toma, así que no hace falta recortar los 2.292 cuadros con IA
// (en esta PC tardaría horas): se recorta 1 cuadro cada ~1,5 s y, por toma, se unen esas siluetas
// en una máscara fija (con margen y borde suave para que las manos que gesticulan sigan nítidas).
//
// Paso 1:  node scripts/fondo.mjs muestras   → tmp-fondo/muestras.mp4  + recorte IA → tmp-fondo/muestras.webm
// Paso 2:  node scripts/fondo.mjs componer   → máscaras por toma → mascara.mp4 → base-blur.mp4
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const ED = path.resolve(import.meta.dirname, "..");
const TMP = path.join(ED, "tmp-fondo");
mkdirSync(TMP, { recursive: true });
const BASE = path.join(ED, "base.mp4");
const W = 576, H = 1024, FPS = 30;
const seg = JSON.parse(readFileSync(path.join(ED, "segmentos.json"), "utf8"));
const TOTAL = seg.total;

// Tomas (una por clip original): [inicio, fin] en base.mp4
const tomas = [];
seg.segments.forEach((s, i) => {
  const next = seg.segments[i + 1];
  const end = next ? next.start : TOTAL;
  const last = tomas[tomas.length - 1];
  if (last && last.clip === s.clip) last.fin = end; else tomas.push({ clip: s.clip, ini: s.start, fin: end });
});

const run = (cmd, args, opts = {}) => {
  const r = spawnSync(cmd, args, { stdio: "inherit", ...opts });
  if (r.status !== 0) { console.error("Falló:", cmd, args.join(" ")); process.exit(r.status ?? 1); }
};
const ff = (args) => run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", ...args]);

// muestras: cada ~1,5 s dentro de cada toma (evitando los bordes)
const muestras = [];
tomas.forEach((t, ti) => {
  const n = Math.max(3, Math.round((t.fin - t.ini) / 1.5));
  for (let k = 0; k < n; k++) muestras.push({ toma: ti, t: t.ini + 0.15 + ((t.fin - t.ini - 0.3) * k) / (n - 1) });
});

const paso = process.argv[2];
if (paso === "muestras") {
  muestras.forEach((m, i) => ff(["-ss", m.t.toFixed(3), "-i", BASE, "-frames:v", "1", path.join(TMP, `m_${String(i).padStart(3, "0")}.png`)]));
  ff(["-framerate", "1", "-i", path.join(TMP, "m_%03d.png"), "-c:v", "libx264", "-crf", "12", "-pix_fmt", "yuv420p", path.join(TMP, "muestras.mp4")]);
  writeFileSync(path.join(TMP, "muestras.json"), JSON.stringify({ tomas, muestras }, null, 2));
  console.log(`${muestras.length} muestras → tmp-fondo/muestras.mp4`);
  const win = process.platform === "win32";
  const a = ["remove-background", path.join(TMP, "muestras.mp4"), "-o", path.join(TMP, "muestras.webm"), "--quality", "best"];
  if (win) run(["hyperframes", ...a.map((x) => `"${x}"`)].join(" "), [], { shell: true });
  else run("hyperframes", a);
  console.log("Recorte IA listo → tmp-fondo/muestras.webm");
} else if (paso === "componer") {
  if (!existsSync(path.join(TMP, "muestras.webm"))) { console.error("Falta tmp-fondo/muestras.webm (corre el paso 'muestras')."); process.exit(1); }
  // alfa de cada muestra (gris 576×1024)
  const raw = spawnSync("ffmpeg", ["-v", "error", "-c:v", "libvpx-vp9", "-i", path.join(TMP, "muestras.webm"), "-vf", `alphaextract,scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 30 }).stdout;
  const N = Math.floor(raw.length / (W * H));
  console.log(`alfas leídas: ${N}`);
  // unión por toma (máximo de las siluetas)
  tomas.forEach((t, ti) => {
    const u = Buffer.alloc(W * H);
    // La IA a veces une el pelo con los reposacabezas en una sola mancha. Por cada muestra:
    // binarizar → adelgazar ~12 px (corta los puentes finos) → quedarse con la mancha conectada a la cara
    // → devolverle el grosor. Luego se unen todas las muestras de la toma.
    const R = 12;
    const minmax = (src, isMin) => {
      const tmp = new Uint8Array(W * H), out = new Uint8Array(W * H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let v = isMin ? 255 : 0;
        for (let k = -R; k <= R; k++) { const xx = Math.min(W - 1, Math.max(0, x + k)); const s = src[y * W + xx]; v = isMin ? Math.min(v, s) : Math.max(v, s); }
        tmp[y * W + x] = v;
      }
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        let v = isMin ? 255 : 0;
        for (let k = -R; k <= R; k++) { const yy = Math.min(H - 1, Math.max(0, y + k)); const s = tmp[yy * W + x]; v = isMin ? Math.min(v, s) : Math.max(v, s); }
        out[y * W + x] = v;
      }
      return out;
    };
    // La IA une los reposacabezas con los hombros. Se combina con una forma geométrica:
    // cabeza (filas < 42 % del alto) = tramo de la IA que contiene la cara;
    // cuello→hombros (42 %–74 %) = recorte de la IA limitado a un ancho que se abre del 30 % al 50 % por lado;
    // pecho (> 74 %) = todo (la camiseta llena el ancho).
    const yHead = Math.round(H * 0.42), yChest = Math.round(H * 0.74);
    muestras.forEach((m, i) => {
      if (m.toma !== ti || i >= N) return;
      const off = i * W * H;
      const on = (x, y) => raw[off + y * W + x] > 170;
      // centro de la cara: centro del tramo de la IA en la fila del 30 %
      const yr = Math.round(H * 0.3);
      let a = W >> 1, b = W >> 1;
      if (on(a, yr)) { while (a > 0 && on(a - 1, yr)) a--; while (b < W - 1 && on(b + 1, yr)) b++; }
      const cx = (a + b) >> 1;
      for (let y = 0; y < H; y++) {
        if (y >= yChest) { for (let x = 0; x < W; x++) u[y * W + x] = 255; continue; }
        if (y < yHead) {
          if (!on(cx, y)) continue;
          let l = cx, r = cx;
          while (l > 0 && on(l - 1, y)) l--; while (r < W - 1 && on(r + 1, y)) r++;
          for (let x = l; x <= r; x++) u[y * W + x] = 255;
        } else {
          const hw = W * (0.3 + 0.2 * (y - yHead) / (yChest - yHead));
          for (let x = Math.max(0, Math.round(cx - hw)); x <= Math.min(W - 1, Math.round(cx + hw)); x++) if (on(x, y)) u[y * W + x] = 255;
        }
      }
    });
    writeFileSync(path.join(TMP, `union_${ti}.gray`), u);
    // margen ~9 px + borde suave
    ff(["-f", "rawvideo", "-pix_fmt", "gray", "-s", `${W}x${H}`, "-i", path.join(TMP, `union_${ti}.gray`),
      "-vf", "dilation,".repeat(9) + "gblur=sigma=9", "-frames:v", "1", path.join(TMP, `mascara_${ti}.png`)]);
  });
  // video de máscara alineado con base.mp4
  let list = "";
  tomas.forEach((t, ti) => { list += `file 'mascara_${ti}.png'\nduration ${(t.fin - t.ini).toFixed(4)}\n`; });
  list += `file 'mascara_${tomas.length - 1}.png'\n`;
  writeFileSync(path.join(TMP, "mascaras.txt"), list);
  ff(["-f", "concat", "-safe", "0", "-i", path.join(TMP, "mascaras.txt"), "-vf", `fps=${FPS},format=gray`, "-t", TOTAL.toFixed(3), "-c:v", "libx264", "-crf", "8", "-pix_fmt", "yuv420p", path.join(TMP, "mascara.mp4")]);
  // fondo desenfocado y un poco más oscuro + persona nítida
  ff(["-i", BASE, "-i", path.join(TMP, "mascara.mp4"), "-filter_complex",
    `[0:v]split[a][b];[b]gblur=sigma=16,eq=brightness=-0.05:saturation=0.9[bl];[1:v]format=gray,scale=${W}:${H}[m];[bl][a][m]maskedmerge,format=yuv420p[v]`,
    "-map", "[v]", "-map", "0:a", "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-g", String(FPS), "-keyint_min", String(FPS), "-c:a", "copy", "-movflags", "+faststart",
    path.join(ED, "public", "base-blur.mp4")]);
  console.log("OK → public/base-blur.mp4");
} else {
  console.log("Uso: node scripts/fondo.mjs muestras | componer");
}
