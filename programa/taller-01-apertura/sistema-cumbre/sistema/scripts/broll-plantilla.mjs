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
//   mismaPersona: true                              (opcional: en la toma sale el avatar de "referencia" (su cara, pelo y ropa), p. ej. aplicándose el producto)
//   look:      { id, desc, identidad }               (opcional, lo pone generar-prompts.mjs a partir de "look": "<id>" del plan: sale la misma persona
//               con otro look (peinado, ropa, cómo se ve su piel) y en el lugar de "location"; de la referencia solo se copia quién es.
//               identidad = lo que se ve de verdad en avatar/avatar.jpg: cara, frente, entradas, cantidad de pelo, barba)
//   producto:  { ref: "producto/producto.png", bloque: {…}, texto: "ALBA / VITAMINA C", corto: "the ALBA serum bottle" }
//   producto_donde: "on the counter, next to the sink"   (con producto: dónde queda en la imagen, para el prompt de corrección)
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
  const persona = s.look
    ? ` shows the same person: keep exactly who he or she is, as described in "person_identity" (face, facial features, hairline, amount of hair, facial hair, skin tone, age and body), so it is clearly the same person. Only the look changes in this scene, as described in "person_look", and the place is the one in "environment", even if it differs from the reference.`
    : ` shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.`;
  if (s.mismaPersona && s.referencia && !p) ref = ` The attached reference image${persona}`;
  if (p) ref = ` Attached image 1 is the exact product: replicate it identically (same product shape, size, materials, colors, label design and label text), as described in "product".` +
    (s.referencia ? (s.mismaPersona ? ` Attached image 2${persona}` : ` Attached image 2 only shows the place: match its location and light, but do not include the person from it.`) : "");
  return {
    task: `Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: ${s.shot}. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.${ref}`,
    output: {
      aspect_ratio: "9:16",
      orientation: "vertical",
      look: "raw, unedited iPhone video frame, not a professional photo",
    },
    subject: s.subject,
    ...(s.look ? { person_identity: s.look.identidad, person_look: s.look.desc } : {}),
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
      ...(p ? ["a different product, a changed or blank label, misspelled label text, extra products, a second unit of the product"] : []),
      "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
      "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
      "perfect symmetry, empty sterile spaces, everything brand new",
      "deformed hands, extra fingers, warped objects",
      s.mismaPersona ? "a different person, a changed face, a likeness of any real person" : "recognizable faces, a likeness of any real person",
      ...(s.look ? [IDENTIDAD_NEG, "the hair styling, clothes or place of the reference image when they differ from \"person_look\" and \"environment\""] : []),
      ...(s.negative ?? []),
    ],
  };
}

// Corrección del producto: cuando la imagen gusta pero el producto salió un poco distinto. Nano Banana no edita solo una parte:
// vuelve a generar toda la imagen, así que el prompt nombra todo lo que NO cambia (si no, cambia la pose). Probado con CUMBRE (31 oct 2026).
// p = { corto, texto } · donde = dónde está el producto en esa imagen ("on the kitchen counter", "in his right hand"), en inglés
export function correccionProducto(p, donde) {
  const cual = p.corto ?? "the product";
  return `Edit this image. Change only ${cual}${donde ? ` ${donde}` : ""}: replace it with the exact product shown in the attached reference image (same shape, size, colors, materials, label design and label text: ${p.texto}).\n` +
    `Keep everything else exactly as it is, pixel for pixel: any person in it (face, expression, pose, arms and hands, clothes), every other object, the place, the framing, the camera angle and the light.\n` +
    `Do not move, add or remove anything. Do not regenerate the scene. Only ${cual} changes.`;
}

// Bloque de prompts-flow.md con la corrección, debajo de cada imagen donde sale el producto.
export function correccionMarkdown(p, donde) {
  return `\n**Si todo te gusta menos el producto:** no la regeneres. En Flow, abre la imagen → editar, adjunta \`${p.ref}\` y pega esto. Máximo 2 intentos: si cambia la pose, genera 4 variaciones nuevas con el prompt de arriba.\n\n` +
    "```text\n" + correccionProducto(p, donde) + "\n```\n";
}

// Looks del avatar (solo si la historia los pide: antes y después, un día que avanza, otros lugares u otra ropa).
// La misma persona de avatar/avatar.jpg con otro pelo, ropa o estado de la piel. Se genera adjuntando avatar/avatar.jpg.
// l = { id, desc, location, details, pose, light, identidad }   (en inglés)
//   identidad: lo que se ve de verdad en avatar/avatar.jpg (Claude mira la imagen y lo escribe): forma de la cara, frente y entradas, cantidad y largo del pelo, barba, rasgos.
//   desc: el look EN RELACIÓN a como es ("his same short hair, slightly messy"), nunca un corte nuevo ni más pelo.
// Es una imagen de referencia: cara despejada y de frente; las acciones (frotarse el ojo) van en el video del B-roll.
export const IDENTIDAD_NEG = "more or less hair than the reference, a different hairline, a different haircut length, a different beard, a different face shape";
export function lookImagen(l) {
  return {
    task: "Generate one photorealistic still frame from a casual vertical video recorded with an iPhone, showing the same person as in the attached reference image. Keep exactly who he or she is, as described in \"person_identity\": the same face and facial features, the same hairline and amount of hair, the same facial hair, skin tone, age and body, so it is clearly the same person. Change only the look described in \"person_look\" (never add hair or change the hairline) and the place described in \"environment\". It will be the reference of this person's look in later frames, so the face must be fully visible.",
    output: {
      aspect_ratio: "9:16",
      orientation: "vertical",
      look: "raw, unedited iPhone video frame, not a professional photo",
    },
    person_identity: l.identidad,
    person_look: l.desc,
    pose_and_expression: (l.pose ? l.pose + "; " : "") + "facing the camera, the whole face fully visible and unobstructed (no hands, hair or objects in front of it), hands relaxed and away from the face, all fingers anatomically correct",
    environment: {
      location: l.location,
      details: l.details,
      atmosphere: "real, lived-in and slightly imperfect, not a staged set",
    },
    camera: {
      device: "iPhone, handheld or propped, at a natural human height",
      framing: "medium shot from the waist up, the face clearly visible, so the hair, clothes and skin can be seen",
      focus: "face sharp, natural phone depth of field, no artificial heavy bokeh",
      quality: "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors",
    },
    lighting: {
      key: l.light ?? "soft natural light falling evenly on the face from the front",
      mood: "natural and realistic, low contrast, accurate skin tones",
    },
    realism_rules: [
      "the same person as the reference: identical face shape, eyes, nose, mouth, hairline, amount of hair, facial hair, skin tone, age and build",
      "real skin texture with pores and fine lines, no smoothing, no beauty filter",
      "natural fabric folds and wrinkles on the clothes",
      "correct human anatomy: two hands, five fingers each",
    ],
    negative: [
      "a different person, a changed face, different age, different skin tone, a likeness of any real person",
      IDENTIDAD_NEG,
      "hands covering or touching the face",
      "the hair styling, clothes or place of the reference image when they differ from \"person_look\" and \"environment\"",
      "text, captions, logos, brand names, watermarks, UI elements, readable signs or screens",
      "smooth or airbrushed skin, 3D render, CGI, stock photo look, studio lighting, cinematic color grading, heavy bokeh",
      "deformed hands, extra fingers, asymmetrical eyes, warped face",
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
    if (b.producto) md += correccionMarkdown(b.producto, b.producto_donde);
  }
  md += `\n---\n\n# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)\n\n` +
    `Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como \`clips/broll-01.mp4\`, \`clips/broll-02.mp4\`…\n`;
  for (const b of brolls) md += `\n## B-roll ${b.n} · ${b.dur} s · imagen inicial \`broll/broll-${b.n}.jpg\` — ${b.desc}\n\n` + j(brollVideo(b));
  return md;
}
