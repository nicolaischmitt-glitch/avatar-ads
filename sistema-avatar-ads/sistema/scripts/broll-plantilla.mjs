// Plantillas de los B-rolls en 2 etapas:
//   1) brollImagen(spec) → prompt JSON (inglés) del frame inicial en Nano Banana Pro: se prueban 4 variaciones baratas y el usuario elige.
//   2) brollVideo(spec)  → prompt JSON (español) para animar ESE frame en Google Flow (imagen a video).
// Generar el video directo desde texto quema créditos y da tomas "de IA" que no habrías elegido.
//
// spec = {
//   n, dur, desc,
//   shot:      "a slow close-up of …"              (qué es la toma, en una frase, inglés)
//   subject:   "…"                                 (qué se ve: objetos / manos / persona sin cara reconocible)
//   location:  "…" · details: "3–5 objetos concretos del lugar"
//   framing:   "…" · light: "…"                    (encuadre y fuente de luz)
//   negative:  ["…"]                               (opcional, lo específico de esta toma)
//   referencia: "avatar/avatar.jpg"                 (opcional: adjuntarla en Nano Banana para que el producto o el lugar sean los mismos)
//   action:    "…" · camera_movement: "…" · audio: "…"   (la animación, en español)
// }

export function brollImagen(s) {
  const ref = s.referencia
    ? ` The attached reference image shows the product/place: keep it exactly the same (shape, materials, colors, label), but do not include the person from the reference.`
    : "";
  return {
    task: `Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: ${s.shot}. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.${ref}`,
    output: {
      aspect_ratio: "9:16",
      orientation: "vertical",
      look: "raw, unedited iPhone video frame, not a professional photo",
    },
    subject: s.subject,
    environment: {
      location: s.location,
      details: s.details,
      atmosphere: "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom",
    },
    camera: {
      device: "iPhone main camera, handheld, at a natural human height",
      framing: s.framing,
      focus: "natural phone depth of field, no artificial heavy bokeh",
      quality: "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors",
    },
    lighting: {
      key: s.light,
      mood: "natural and realistic, low contrast, accurate colors, no dramatic lighting",
    },
    realism_rules: [
      "must look like an ordinary frame from a phone video, not AI-generated and not a stock photo",
      "small real-world imperfections: light dust, slight wear, small scratches, uneven surfaces, a few things slightly out of place",
      "nothing too clean, too glossy or perfectly symmetrical",
      "true-to-life materials, textures and reflections",
      "if hands or skin appear: real skin texture with pores and fine lines, correct anatomy, five fingers",
    ],
    negative: [
      "text, captions, subtitles, logos, brand names, watermarks, UI elements, readable signs or screens",
      "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
      "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
      "perfect symmetry, empty sterile spaces, everything brand new",
      "deformed hands, extra fingers, warped objects",
      "recognizable faces, a likeness of any real person",
      ...(s.negative ?? []),
    ],
  };
}

export function brollVideo(s) {
  return {
    scene: {
      duration_seconds: s.dur,
      reference_image: true,
      start_frame: "usar la imagen de referencia como primer fotograma exacto",
      style: "video real grabado con un iPhone, apariencia raw y sin editar",
      camera_movement: s.camera_movement,
      action: s.action,
      motion: "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
      consistency: "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
      audio: s.audio ?? "solo sonido ambiente suave, sin música ni voces",
      restrictions: "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros.",
    },
  };
}

// Bloque de prompts-flow.md: Paso 3 (frames) y Paso 4 (videos).
export function brollMarkdown(brolls) {
  const j = (o) => "```json\n" + JSON.stringify(o, null, 2) + "\n```\n";
  let md = `\n---\n\n# Paso 3 · Frames de los B-rolls (Nano Banana Pro, 9:16)\n\n` +
    `Primero la imagen: es barata, así que prueba 4 variaciones y quédate con la toma que te guste. Guárdala como se indica.\n`;
  for (const b of brolls) {
    const ref = b.referencia ? ` · adjunta \`${b.referencia}\`` : "";
    md += `\n## B-roll ${b.n} · ${b.desc}${ref} → guárdala como \`broll/broll-${b.n}.jpg\`\n\n` + j(brollImagen(b));
  }
  md += `\n---\n\n# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)\n\n` +
    `Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como \`clips/broll-01.mp4\`, \`clips/broll-02.mp4\`…\n`;
  for (const b of brolls) md += `\n## B-roll ${b.n} · ${b.dur} s · imagen inicial \`broll/broll-${b.n}.jpg\` — ${b.desc}\n\n` + j(brollVideo(b));
  return md;
}
