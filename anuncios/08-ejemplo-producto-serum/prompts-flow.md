# Anuncio 08 · Ejemplo producto físico (sérum de vitamina C) — Prompts para Google Flow

Voz: **3 clips · 22 s** generados (≈ 20 s editado). Imagen de referencia de todos: `avatar/avatar.jpg`.
Validados con `validar-json.mjs` (sin variables autorizadas: voz de hombre).
B-rolls: adjunta también `avatar/avatar.jpg` como referencia para que el frasco sea el mismo.
Guarda los clips como `clips/clip-01.mp4` … y los B-rolls: primero el frame (`broll/broll-01.jpg`) y después el video (`clips/broll-01.mp4`).

---

# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)

Genera 4 variaciones con este prompt y guarda la elegida como `avatar/avatar.jpg`. Es la imagen de referencia de todos los clips de voz.

```json
{
  "task": "Generate one photorealistic still frame in the style of a casual vertical selfie video an original fictional man films of himself with his phone front camera, in his bathroom in the morning, to show his audience a skincare product he uses. It will be used as the first frame of a talking-head video, so it should feel candid and authentic, like a frame from an everyday phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone front-camera video frame, not a professional photo"
  },
  "subject": {
    "identity": "an original, non-famous Latin American man, 28 years old",
    "face": "light-medium olive skin with natural texture (visible pores, a couple of tiny blemishes, faint under-eye lines), hazel-brown eyes, natural brows, slight natural facial asymmetry",
    "hair": "short black hair, slightly damp and casually pushed back, a few strands falling forward",
    "facial_hair": "clean-shaven with a faint natural shadow on the jaw",
    "accessories": "no glasses, no jewelry",
    "build": "average build"
  },
  "wardrobe": {
    "top": "plain heather-gray crew-neck cotton t-shirt, a soft well-worn fabric, natural fabric wrinkles",
    "style": "relaxed morning at-home clothes, nothing flashy, no visible logos"
  },
  "pose_and_expression": {
    "position": "standing at the bathroom counter, upper body leaning very slightly toward the camera",
    "gaze": "looking directly into the lens, making eye contact with the viewer",
    "expression": "calm, confident and friendly, a subtle natural half-smile, as if about to start talking; mouth closed or barely parted, relaxed jaw",
    "hands": "his right hand holds a small amber glass dropper bottle with a black rubber dropper cap and a plain cream-colored label with no text, at chest height, the bottle clearly visible; his left hand rests relaxed on the counter edge in the lower part of the frame; fingers relaxed, all fingers anatomically correct and fully visible",
    "posture": "shoulders relaxed and square to the camera, natural and unposed"
  },
  "environment": {
    "location": "a clean, simple bathroom in the morning",
    "background": "a wall of white rectangular tiles, a wooden shelf with two rolled beige towels and a small green plant, a matte black towel ring, softly out of focus, uncluttered",
    "foreground": "the edge of a white sink counter at the lower edge of the frame with a ceramic cup and a folded hand towel, slightly out of focus",
    "atmosphere": "tidy, real, lived-in home bathroom, not a staged studio set"
  },
  "camera": {
    "device": "iPhone front camera propped against the bathroom mirror at chest-to-eye height, slightly below eye level, facing him",
    "lens": "wide-angle selfie lens (about 24mm equivalent) with its natural mild perspective",
    "framing": "medium close-up from the waist up, subject centered horizontally; his head sits in the upper-middle of the frame (eyes at about 38% of the frame height from the top), leaving clean empty space above his head for on-screen graphics",
    "focus": "face and bottle sharp, background softly in focus as a phone would render it (no artificial heavy bokeh)",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft, diffused frontal light from a warm-white vanity light bar above the mirror, directly in front of him, behind the phone, lighting his whole face evenly from the front",
    "fill": "soft morning daylight bouncing off the white tiles",
    "mood": "bright, fresh and realistic; both sides of the face equally lit with the same brightness and no side shadows, only very soft natural shading under the chin and nose; accurate skin tones, low contrast"
  },
  "realism_rules": [
    "natural and authentic, like an everyday phone video, not a stock photo",
    "real skin texture, no smoothing, no beauty filter, no plastic or waxy skin",
    "natural fabric folds and wrinkles on the t-shirt",
    "correct human anatomy: two hands, five fingers each, natural proportions, a natural grip on the bottle",
    "realistic eyes with natural catchlights from the light in front of him",
    "even, symmetrical illumination on the face, as when someone films himself facing the mirror light"
  ],
  "negative": [
    "text, captions, subtitles, logos, watermarks, UI elements, any writing or brand on the bottle label",
    "side lighting, split lighting, one half of the face darker than the other, strong shadows on one side of the face",
    "backlighting, silhouette, overexposed background",
    "studio lighting, ring light reflections, cinematic color grading, heavy bokeh",
    "extra or deformed fingers, distorted hands, a deformed or floating bottle, asymmetrical eyes, warped face",
    "smooth or airbrushed skin, 3D render, cartoon, illustration, CGI look",
    "shirtless, towel around the neck, shaving foam, steam",
    "big smile showing teeth, exaggerated expression, posing",
    "cluttered counter, many products, other people, a visible mirror reflection"
  ]
}
```

---

# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)

## Clip 01 · 6 s — Hook: piel apagada

```json
{
  "scene": {
    "style": "UGC hiperrealista grabado con un iPhone, apariencia raw y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre durante toda la toma",
      "cuts": "una sola toma, sin cortes bruscos",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente el mismo avatar de la imagen de referencia",
      "location_consistency": "mantener la misma ubicación y la misma iluminación",
      "eye_contact": "contacto visual directo con la cámara"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene el mismo frasco ámbar con gotero de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, y gesticula con la mano izquierda: al decir 'Si tu piel se ve apagada', se toca suavemente la mejilla con las yemas de la mano izquierda; al decir 'por la mañana', hace una media sonrisa cómplice; al decir 'mira lo que hago antes de salir', levanta un poco el frasco hacia la cámara para mostrarlo",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Si tu piel se ve apagada por la mañana, mira lo que hago antes de salir.",
      "must_follow_exactly": true,
      "allow_rephrasing": false,
      "allow_additional_words": false
    },
    "visual_restrictions": {
      "subtitles": false,
      "captions": false,
      "on_screen_text": false,
      "text_overlays": false,
      "titles": false,
      "added_logos": false,
      "watermarks": false,
      "graphic_elements": false,
      "visual_effects": false,
      "transitions": false,
      "filters": false,
      "editing": false,
      "style": "video completamente raw, natural y sin editar",
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente al avatar hablando y gesticulando de forma natural frente a la cámara."
    },
    "continuity": {
      "same_avatar": true,
      "same_location": true,
      "same_camera_framing": true,
      "no_camera_reframing": true
    }
  },
  "instructions": [
    "Utilizar el personaje de la imagen de referencia.",
    "Mantener contacto visual directo con la cámara.",
    "Realizar gestos visibles y naturales con ambas manos durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 02 · 8 s — Demostración: gotas y textura

```json
{
  "scene": {
    "style": "UGC hiperrealista grabado con un iPhone, apariencia raw y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre durante toda la toma",
      "cuts": "una sola toma, sin cortes bruscos",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente el mismo avatar de la imagen de referencia",
      "location_consistency": "mantener la misma ubicación y la misma iluminación",
      "eye_contact": "contacto visual directo con la cámara"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene el mismo frasco ámbar con gotero de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, y gesticula con la mano izquierda: al decir 'Dos gotas', muestra dos dedos con la mano izquierda; al decir 'de este sérum de vitamina C', acerca el frasco a la cámara con la etiqueta hacia delante; al decir 'Mira la textura', frota suavemente las yemas del pulgar y el índice de la mano izquierda; al decir 'se absorbe en segundos', se pasa las yemas de la mano izquierda por la mejilla con un movimiento corto y suave",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Dos gotas de este sérum de vitamina C. Mira la textura: es ligera y se absorbe en segundos.",
      "must_follow_exactly": true,
      "allow_rephrasing": false,
      "allow_additional_words": false
    },
    "visual_restrictions": {
      "subtitles": false,
      "captions": false,
      "on_screen_text": false,
      "text_overlays": false,
      "titles": false,
      "added_logos": false,
      "watermarks": false,
      "graphic_elements": false,
      "visual_effects": false,
      "transitions": false,
      "filters": false,
      "editing": false,
      "style": "video completamente raw, natural y sin editar",
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente al avatar hablando y gesticulando de forma natural frente a la cámara."
    },
    "continuity": {
      "same_avatar": true,
      "same_location": true,
      "same_camera_framing": true,
      "no_camera_reframing": true
    }
  },
  "instructions": [
    "Utilizar el personaje de la imagen de referencia.",
    "Mantener contacto visual directo con la cámara.",
    "Realizar gestos visibles y naturales con ambas manos durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 03 · 8 s — CTA: comprar

```json
{
  "scene": {
    "style": "UGC hiperrealista grabado con un iPhone, apariencia raw y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre durante toda la toma",
      "cuts": "una sola toma, sin cortes bruscos",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente el mismo avatar de la imagen de referencia",
      "location_consistency": "mantener la misma ubicación y la misma iluminación",
      "eye_contact": "contacto visual directo con la cámara"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene el mismo frasco ámbar con gotero de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, y gesticula con la mano izquierda: al decir 'No deja la piel grasosa', niega suavemente con la mano izquierda; al decir 'la sientes fresca todo el día', se toca la mejilla y sonríe satisfecho; al decir 'Lo consigues en el botón de abajo', señala hacia abajo con el índice de la mano izquierda",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "No deja la piel grasosa y la sientes fresca todo el día. Lo consigues en el botón de abajo.",
      "must_follow_exactly": true,
      "allow_rephrasing": false,
      "allow_additional_words": false
    },
    "visual_restrictions": {
      "subtitles": false,
      "captions": false,
      "on_screen_text": false,
      "text_overlays": false,
      "titles": false,
      "added_logos": false,
      "watermarks": false,
      "graphic_elements": false,
      "visual_effects": false,
      "transitions": false,
      "filters": false,
      "editing": false,
      "style": "video completamente raw, natural y sin editar",
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente al avatar hablando y gesticulando de forma natural frente a la cámara."
    },
    "continuity": {
      "same_avatar": true,
      "same_location": true,
      "same_camera_framing": true,
      "no_camera_reframing": true
    }
  },
  "instructions": [
    "Utilizar el personaje de la imagen de referencia.",
    "Mantener contacto visual directo con la cámara.",
    "Realizar gestos visibles y naturales con ambas manos durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

---

# Paso 3 · Frames de los B-rolls (Nano Banana Pro, 9:16)

Primero la imagen: es barata, así que prueba 4 variaciones y quédate con la toma que te guste. Guárdala como se indica.

## B-roll 01 · Macro: dos gotas sobre el dorso de la mano · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-01.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a macro close-up of a drop of serum about to fall from a glass dropper onto the back of a man's hand, over a white bathroom sink. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the product/place: keep it exactly the same (shape, materials, colors, label), but do not include the person from the reference.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the back of a man's hand with real skin texture, fine hairs and visible veins; the glass dropper of the amber bottle above it, with a drop of clear, slightly golden serum at its tip",
  "environment": {
    "location": "a home bathroom in the morning",
    "details": "a white sink with a few water droplets, the amber dropper bottle standing on the counter slightly out of focus, a folded beige towel",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical macro, the hand filling the lower half of the frame, the dropper entering from the top",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft morning light from the front",
    "mood": "natural and realistic, low contrast, accurate colors, no dramatic lighting"
  },
  "realism_rules": [
    "must look like an ordinary frame from a phone video, not AI-generated and not a stock photo",
    "small real-world imperfections: light dust, slight wear, small scratches, uneven surfaces, a few things slightly out of place",
    "nothing too clean, too glossy or perfectly symmetrical",
    "true-to-life materials, textures and reflections",
    "if hands or skin appear: real skin texture with pores and fine lines, correct anatomy, five fingers"
  ],
  "negative": [
    "text, captions, subtitles, logos, brand names, watermarks, UI elements, readable signs or screens",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "recognizable faces, a likeness of any real person"
  ]
}
```

## B-roll 02 · Macro: textura ligera que se absorbe → guárdala como `broll/broll-02.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a macro close-up of a man's thumb and index fingertips with a drop of serum between them. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "thumb and index fingertips with real skin texture and fingerprints, a small drop of clear, light, fluid serum between them",
  "environment": {
    "location": "a home bathroom in the morning",
    "details": "the white sink blurred in the background",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical macro, the fingertips centered",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft morning light from the front",
    "mood": "natural and realistic, low contrast, accurate colors, no dramatic lighting"
  },
  "realism_rules": [
    "must look like an ordinary frame from a phone video, not AI-generated and not a stock photo",
    "small real-world imperfections: light dust, slight wear, small scratches, uneven surfaces, a few things slightly out of place",
    "nothing too clean, too glossy or perfectly symmetrical",
    "true-to-life materials, textures and reflections",
    "if hands or skin appear: real skin texture with pores and fine lines, correct anatomy, five fingers"
  ],
  "negative": [
    "text, captions, subtitles, logos, brand names, watermarks, UI elements, readable signs or screens",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "recognizable faces, a likeness of any real person"
  ]
}
```

## B-roll 03 · Producto sobre el lavabo · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-03.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of the small amber glass dropper bottle standing on a bathroom counter. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the product/place: keep it exactly the same (shape, materials, colors, label), but do not include the person from the reference.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the amber glass bottle with a black rubber dropper cap and a plain cream label with no text, a few water droplets on the counter",
  "environment": {
    "location": "a home bathroom in the morning",
    "details": "a rolled beige towel, a ceramic cup, a small plant blurred behind, white wall tiles",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, the bottle slightly off-center, camera at counter height",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft warm morning daylight from the front, a gentle highlight on the glass",
    "mood": "natural and realistic, low contrast, accurate colors, no dramatic lighting"
  },
  "realism_rules": [
    "must look like an ordinary frame from a phone video, not AI-generated and not a stock photo",
    "small real-world imperfections: light dust, slight wear, small scratches, uneven surfaces, a few things slightly out of place",
    "nothing too clean, too glossy or perfectly symmetrical",
    "true-to-life materials, textures and reflections",
    "if hands or skin appear: real skin texture with pores and fine lines, correct anatomy, five fingers"
  ],
  "negative": [
    "text, captions, subtitles, logos, brand names, watermarks, UI elements, readable signs or screens",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "recognizable faces, a likeness of any real person",
    "text or brand on the label",
    "many products"
  ]
}
```

---

# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)

Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como `clips/broll-01.mp4`, `clips/broll-02.mp4`…

## B-roll 01 · 6 s · imagen inicial `broll/broll-01.jpg` — Macro: dos gotas sobre el dorso de la mano

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara fija con un acercamiento muy lento",
    "action": "caen exactamente dos gotas del gotero sobre el dorso de la mano y brillan con la luz",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 02 · 6 s · imagen inicial `broll/broll-02.jpg` — Macro: textura ligera que se absorbe

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara fija",
    "action": "los dedos se separan y se juntan despacio, mostrando que el sérum es ligero y no pegajoso; luego lo frotan y desaparece en la piel",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 03 · 6 s · imagen inicial `broll/broll-03.jpg` — Producto sobre el lavabo

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "deslizamiento lateral muy lento alrededor del frasco",
    "action": "la luz de la mañana hace brillar el vidrio ámbar",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```
