# Anuncio 07 · Ejemplo generación de leads (clase gratuita de inglés) — Prompts para Google Flow

Voz: **3 clips · 22 s** generados (≈ 18 s editado). Imagen de referencia de todos: `avatar/avatar.jpg`.
Validados con `validar-json.mjs` (sin variables autorizadas: voz de hombre).
Guarda los clips como `clips/clip-01.mp4` … y los B-rolls: primero el frame (`broll/broll-01.jpg`) y después el video (`clips/broll-01.mp4`).

---

# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)

Genera 4 variaciones con este prompt y guarda la elegida como `avatar/avatar.jpg`. Es la imagen de referencia de todos los clips de voz.

```json
{
  "task": "Generate one photorealistic still frame in the style of a casual vertical selfie video an original fictional man films of himself with his phone front camera, at the desk of his home office, to talk to his audience. It will be used as the first frame of a talking-head video, so it should feel candid and authentic, like a frame from an everyday phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone front-camera video frame, not a professional photo"
  },
  "subject": {
    "identity": "an original, non-famous Latin American man, 31 years old, an English teacher",
    "face": "medium tan skin with natural texture (visible pores, slight unevenness, faint under-eye lines), dark brown eyes, thick dark brows, slight natural facial asymmetry",
    "hair": "short dark brown hair, slightly longer and tousled on top, a few strands out of place",
    "facial_hair": "short, well-kept stubble",
    "accessories": "a simple black wristwatch, no glasses, no jewelry",
    "build": "average build"
  },
  "wardrobe": {
    "top": "light blue oxford button-down shirt with the sleeves rolled up to the forearms, top button open, natural fabric wrinkles",
    "style": "smart casual, nothing flashy, no visible logos"
  },
  "pose_and_expression": {
    "position": "seated at his desk, upper body leaning very slightly toward the camera",
    "gaze": "looking directly into the lens, making eye contact with the viewer",
    "expression": "calm, confident and friendly, a subtle natural half-smile, as if about to start talking; mouth closed or barely parted, relaxed jaw",
    "hands": "both forearms resting on the desk, hands relaxed in the lower part of the frame, fingers relaxed, all fingers anatomically correct and fully visible",
    "posture": "shoulders relaxed and square to the camera, natural and unposed"
  },
  "environment": {
    "location": "his small, bright home office, during the day",
    "background": "a warm white wall, a simple wooden bookshelf with a few books and a small plant, a cork board with a couple of blank paper notes, over-ear headphones hanging on a hook, softly out of focus, uncluttered",
    "foreground": "the corner of an open laptop at the lower edge of the frame, its screen angled away (no readable content), next to an open notebook and a pen, slightly out of focus",
    "atmosphere": "tidy, real, lived-in home office, not a staged studio set"
  },
  "camera": {
    "device": "iPhone front camera propped on the desk in front of him at chest-to-eye height, slightly below eye level",
    "lens": "wide-angle selfie lens (about 24mm equivalent) with its natural mild perspective",
    "framing": "medium close-up from the waist up, subject centered horizontally; his head sits in the upper-middle of the frame (eyes at about 38% of the frame height from the top), leaving clean empty space above his head for on-screen graphics",
    "focus": "face sharp, background softly in focus as a phone would render it (no artificial heavy bokeh)",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft, diffused frontal daylight from a large window directly in front of him, behind the phone, lighting his whole face evenly from the front",
    "fill": "warm ambient room light",
    "mood": "bright, clean and realistic; both sides of the face equally lit with the same brightness and no side shadows, only very soft natural shading under the chin and nose; accurate skin tones, low contrast"
  },
  "realism_rules": [
    "natural and authentic, like an everyday phone video, not a stock photo",
    "real skin texture, no smoothing, no beauty filter, no plastic or waxy skin",
    "natural fabric folds and wrinkles on the shirt",
    "correct human anatomy: two hands, five fingers each, natural proportions",
    "realistic eyes with natural catchlights from the window in front of him",
    "even, symmetrical illumination on the face, as when someone films himself facing a window"
  ],
  "negative": [
    "text, captions, subtitles, logos, watermarks, UI elements, readable laptop screen, readable writing on the notes or books",
    "side lighting, split lighting, one half of the face darker than the other, strong shadows on one side of the face, a window beside him lighting the face from the side",
    "backlighting, silhouette, overexposed background",
    "studio lighting, ring light reflections, cinematic color grading, heavy bokeh",
    "extra or deformed fingers, distorted hands, asymmetrical eyes, warped face",
    "smooth or airbrushed skin, 3D render, cartoon, illustration, CGI look",
    "glasses, headphones on his head, a microphone",
    "big smile showing teeth, exaggerated expression, posing",
    "cluttered background, other people, mirrors"
  ]
}
```

---

# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)

## Clip 01 · 6 s — Hook: el bloqueo

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
        "synchronization": "al decir 'Si entiendes inglés', se toca suavemente la sien con el índice; al decir 'te bloqueas cuando tienes que hablarlo', cierra la mano frente a la boca y la abre despacio, como si las palabras no salieran; al decir 'no te falta vocabulario', niega con la cabeza y con el índice, seguro",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Si entiendes inglés pero te bloqueas cuando tienes que hablarlo, no te falta vocabulario.",
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

## Clip 02 · 8 s — La solución: la clase gratuita

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
        "synchronization": "al decir 'Te falta práctica guiada', abre ambas palmas hacia la cámara; al decir 'preparé una clase gratuita', se lleva una mano al pecho; al decir 'las frases que más se usan', cuenta con los dedos de una mano uno, dos y tres; al decir 'en una reunión de trabajo', abre las manos hacia los lados como presentando una mesa de reunión",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Te falta práctica guiada. Por eso preparé una clase gratuita con las frases que más se usan en una reunión de trabajo.",
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

## Clip 03 · 8 s — CTA: registrarse

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
        "synchronization": "al decir 'Regístrate gratis', abre una palma hacia la cámara en gesto de invitación; al decir 'en el botón de abajo', señala hacia abajo con el índice; al decir 'te envío el enlace de la clase', mueve la mano hacia delante como si entregara algo y sonríe",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Regístrate gratis en el botón de abajo y te envío el enlace de la clase.",
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

## B-roll 01 · Reunión de trabajo por videollamada → guárdala como `broll/broll-01.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: an over-the-shoulder shot of a young Latin American woman in a work video call at her desk. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the back of her shoulder and the side of her head (face not visible), dark hair tied back, her hand resting near the laptop trackpad",
  "environment": {
    "location": "a small shared office, during the day",
    "details": "a laptop whose screen is blurred and unreadable, a notebook, a reusable water bottle, an empty office chair and a plant in the background",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, over the shoulder, the laptop screen out of focus",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft daylight from a window in front of her, behind the laptop",
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
    "her face visible",
    "readable screen, faces on the screen"
  ]
}
```

## B-roll 02 · Apuntes de la clase → guárdala como `broll/broll-02.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a top-down shot of a light wooden desk with an open notebook. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "a man's hand in a rolled-up light blue oxford shirt sleeve holding a pen over an open notebook with blurred handwriting (no readable words)",
  "environment": {
    "location": "a home office, during the day",
    "details": "a coffee mug with a faint stain ring, the corner of a laptop, a phone face down, a few blank sticky notes",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical top-down, the notebook centered",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft daylight from a window",
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
    "readable words or letters"
  ]
}
```

---

# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)

Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como `clips/broll-01.mp4`, `clips/broll-02.mp4`…

## B-roll 01 · 6 s · imagen inicial `broll/broll-01.jpg` — Reunión de trabajo por videollamada

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano muy estable, con un acercamiento lento",
    "action": "levanta la mano libre y gesticula un poco, como si empezara a hablar en la reunión",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave de oficina, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 02 · 6 s · imagen inicial `broll/broll-02.jpg` — Apuntes de la clase

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara casi fija con un deslizamiento muy lento",
    "action": "la mano escribe con calma una línea en la libreta",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el sonido suave del bolígrafo sobre el papel, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```
