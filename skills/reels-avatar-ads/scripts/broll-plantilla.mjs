// Plantillas de los B-rolls en 2 etapas (decisión del usuario, 22 oct 2026):
//   1) brollImagen(spec) → prompt JSON (inglés) del frame inicial en Nano Banana Pro: se prueban 4 variaciones baratas y el usuario elige.
//   2) brollVideo(spec)  → prompt JSON (español) para animar ESE frame en Google Flow (imagen a video).
// Generar video directo desde texto quemaba créditos y daba tomas "de IA" que el usuario no habría elegido.
//
// spec = {
//   n, dur, desc,
//   shot:      "a slow close-up of …"              (qué es la toma, en una frase, inglés)
//   subject:   "…"                                 (qué se ve: objetos / manos / persona sin cara reconocible)
//   location:  "…" · details: "3–5 objetos concretos del lugar"
//   framing:   "…" · light: "…"                    (encuadre y fuente de luz)
//   negative:  ["…"]                               (opcional, lo específico de esta toma)
//   referencia: "avatar/avatar.jpg"                 (opcional: adjuntarla en Nano Banana para que el producto o el lugar sean los mismos)
//   mismaPersona: true                              (opcional: en la toma sale el avatar de "referencia" (su cara, pelo y ropa), p. ej. aplicándose el producto)
//   producto:  { ref: "producto/producto.png", bloque: {…}, texto: "ALBA / VITAMINA C" }
//              (opcional, LOCKED IN del producto físico: su imagen se adjunta como primera referencia, el bloque se copia
//               igual en cada prompt y el único texto permitido en la toma es el de la etiqueta)
//   action:    "…" · camera_movement: "…" · audio: "…"   (la animación, en español)
// }

// Paso 0 (solo con producto físico): foto de referencia del producto solo, de frente, fondo neutro y etiqueta nítida → producto/producto.png.
// p = { bloque, texto }  (el mismo bloque que va en el avatar y en los B-rolls)
export function productoImagen(p) {
  return {
    task: "Generate one photorealistic reference photo of a single product, front view, to be used as the exact visual reference of this product in every later image. The product must match \"product\" exactly; the label must be perfectly legible and correctly spelled.",
    output: { aspect_ratio: "1:1", look: "clean, realistic product reference photo taken with a phone, true-to-life colors" },
    product: p.bloque,
    composition: {
      view: "straight front view at the product's mid-height, the label facing the camera and centered",
      framing: "the whole product in frame, centered, filling about 60% of the image height, with even space around it",
      surface: "standing upright on a plain light warm-gray matte surface, a soft natural contact shadow under it",
      background: "plain light warm-gray seamless background, nothing else in the image",
    },
    lighting: {
      key: "soft, even, diffused daylight from the front, like a window behind the camera",
      mood: "neutral and accurate colors, low contrast, soft natural highlights, no harsh reflections over the label",
    },
    realism_rules: [
      "true-to-life materials with their real texture, transparency and reflections",
      "real printed label, flat print, crisp letters",
      "correct proportions, perfectly upright, no distortion",
    ],
    negative: [
      `any text other than the label (${p.texto}), misspelled letters, extra lines of small text, numbers, icons, barcodes`,
      "a second product, props, hands, people, flowers, splashes, decorations",
      "a different shape, color, cap or label than described in \"product\"",
      "3D render, CGI, illustration, heavy studio advertising look, dramatic lighting, reflections covering the label",
    ],
  };
}

export function brollImagen(s) {
  const p = s.producto;
  let ref = s.referencia
    ? ` The attached reference image shows the product/place: keep it exactly the same (shape, materials, colors, label), but do not include the person from the reference.`
    : "";
  const persona = ` shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.`;
  if (s.mismaPersona && s.referencia && !p) ref = ` The attached reference image${persona}`;
  if (p) ref = ` Attached image 1 is the exact product: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in "product".` +
    (s.referencia ? (s.mismaPersona ? ` Attached image 2${persona}` : ` Attached image 2 only shows the place: match its location and light, but do not include the person from it.`) : "");
  return {
    task: `Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: ${s.shot}. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.${ref}`,
    output: {
      aspect_ratio: "9:16",
      orientation: "vertical",
      look: "raw, unedited iPhone video frame, not a professional photo",
    },
    subject: s.subject,
    ...(p ? { product: p.bloque } : {}),
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
      p ? `any text other than the product label (${p.texto}), captions, subtitles, other logos or brand names, watermarks, UI elements, readable signs or screens`
        : "text, captions, subtitles, logos, brand names, watermarks, UI elements, readable signs or screens",
      ...(p ? ["a different bottle, a changed or blank label, misspelled label text, extra products, a second bottle"] : []),
      "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
      "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
      "perfect symmetry, empty sterile spaces, everything brand new",
      "deformed hands, extra fingers, warped objects",
      s.mismaPersona ? "a different person, a changed face, a likeness of any real person" : "recognizable faces, a likeness of any real person",
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
      consistency: s.mismaPersona
        ? "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas"
        : "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
      ...(s.producto ? { product_consistency: `el producto es exactamente el de la imagen: misma forma, tamaño, colores y etiqueta (${s.producto.texto}); no cambia, no se deforma y el texto de la etiqueta no se reescribe` } : {}),
      audio: s.audio ?? "solo sonido ambiente suave, sin música ni voces",
      restrictions: s.producto
        ? "Sin subtítulos, textos añadidos, letreros legibles, logotipos (salvo la etiqueta del producto), marcas de agua, gráficos, transiciones ni filtros."
        : "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros.",
    },
  };
}

// Bloque de prompts-flow.md: Paso 3 (frames) y Paso 4 (videos).
export function brollMarkdown(brolls) {
  const j = (o) => "```json\n" + JSON.stringify(o, null, 2) + "\n```\n";
  let md = `\n---\n\n# Paso 3 · Frames de los B-rolls (Nano Banana Pro, 9:16)\n\n` +
    `Primero la imagen: es barata, así que prueba 4 variaciones y quédate con la toma que te guste. Guárdala como se indica.\n`;
  for (const b of brolls) {
    const refs = [b.producto?.ref, b.referencia].filter(Boolean).map((r) => `\`${r}\``);
    const ref = refs.length ? ` · adjunta ${refs.join(" + ")}` : "";
    md += `\n## B-roll ${b.n} · ${b.desc}${ref} → guárdala como \`broll/broll-${b.n}.jpg\`\n\n` + j(brollImagen(b));
  }
  md += `\n---\n\n# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)\n\n` +
    `Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como \`clips/broll-01.mp4\`, \`clips/broll-02.mp4\`…\n`;
  for (const b of brolls) md += `\n## B-roll ${b.n} · ${b.dur} s · imagen inicial \`broll/broll-${b.n}.jpg\` — ${b.desc}\n\n` + j(brollVideo(b));
  return md;
}
