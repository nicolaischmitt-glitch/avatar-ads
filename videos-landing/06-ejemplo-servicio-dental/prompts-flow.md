# Anuncio 06 · Ejemplo servicio (clínica dental) — Prompts para Google Flow

Voz: **3 clips · 22 s** generados (≈ 20 s editado). Imagen de referencia de todos: `avatar/avatar.jpg`.
Validados con `validar-json.mjs --allow scene.dialogue.speaker` (variable autorizada: voz de mujer).
Guarda los clips como `clips/clip-01.mp4` … y los B-rolls: primero el frame (`broll/broll-01.jpg`) y después el video (`clips/broll-01.mp4`).

---

# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)

Genera 4 variaciones con este prompt y guarda la elegida como `avatar/avatar.jpg`. Es la imagen de referencia de todos los clips de voz.

```json
{
  "task": "Generate one photorealistic still frame in the style of a casual vertical selfie video an original fictional woman films of herself with her phone front camera, in the consultation room of her dental clinic, to talk to her audience. It will be used as the first frame of a talking-head video, so it should feel candid and authentic, like a frame from an everyday phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone front-camera video frame, not a professional photo"
  },
  "subject": {
    "identity": "an original, non-famous Latin American woman, 34 years old, a dentist",
    "face": "light-medium warm skin with natural texture (visible pores, slight unevenness, faint under-eye lines), warm brown eyes, softly defined brows, minimal natural makeup, slight natural facial asymmetry",
    "hair": "dark brown hair tied back in a neat low ponytail, a few loose strands framing the face",
    "facial_hair": "none",
    "accessories": "small silver stud earrings, no glasses, no necklace",
    "build": "average build"
  },
  "wardrobe": {
    "top": "short-sleeved teal medical scrub top with a V-neck, matte cotton fabric, natural fabric wrinkles",
    "style": "clean professional clinic look, nothing flashy, no visible logos, no name tag"
  },
  "pose_and_expression": {
    "position": "standing in the consultation room, upper body leaning very slightly toward the camera",
    "gaze": "looking directly into the lens, making eye contact with the viewer",
    "expression": "calm, confident and friendly, a subtle natural half-smile, as if about to start talking; mouth closed or barely parted, relaxed jaw",
    "hands": "hands loosely clasped in front of her waist in the lower part of the frame, fingers relaxed, all fingers anatomically correct and fully visible",
    "posture": "shoulders relaxed and square to the camera, natural and unposed"
  },
  "environment": {
    "location": "a bright, modern dental clinic consultation room, during the day",
    "background": "a white and light-gray dental chair slightly behind her to one side, a dental light arm folded up, white cabinets with a light wood countertop, a small green plant, softly out of focus, uncluttered",
    "foreground": "the edge of a white countertop at the lower edge of the frame with a small tray of neatly arranged dental instruments, slightly out of focus",
    "atmosphere": "tidy, real, working dental clinic, not a staged studio set"
  },
  "camera": {
    "device": "iPhone front camera propped on a small tripod on the countertop at chest-to-eye height, slightly below eye level",
    "lens": "wide-angle selfie lens (about 24mm equivalent) with its natural mild perspective",
    "framing": "medium close-up from the waist up, subject centered horizontally; her head sits in the upper-middle of the frame (eyes at about 38% of the frame height from the top), leaving clean empty space above her head for on-screen graphics",
    "focus": "face sharp, background softly in focus as a phone would render it (no artificial heavy bokeh)",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft, diffused frontal daylight from a large window directly in front of her, behind the phone, lighting her whole face evenly from the front",
    "fill": "soft neutral ceiling light of the clinic",
    "mood": "bright, clean and realistic; both sides of the face equally lit with the same brightness and no side shadows, only very soft natural shading under the chin and nose; accurate skin tones, low contrast"
  },
  "realism_rules": [
    "natural and authentic, like an everyday phone video, not a stock photo",
    "real skin texture, no smoothing, no beauty filter, no plastic or waxy skin",
    "natural fabric folds and wrinkles on the scrubs",
    "correct human anatomy: two hands, five fingers each, natural proportions",
    "realistic eyes with natural catchlights from the window in front of her",
    "even, symmetrical illumination on the face, as when someone films herself facing a window"
  ],
  "negative": [
    "text, captions, subtitles, logos, watermarks, UI elements, name tags, readable signs",
    "side lighting, split lighting, one half of the face darker than the other, strong shadows on one side of the face, a window beside her lighting the face from the side",
    "backlighting, silhouette, overexposed background",
    "studio lighting, ring light reflections, cinematic color grading, heavy bokeh",
    "extra or deformed fingers, distorted hands, asymmetrical eyes, warped face",
    "smooth or airbrushed skin, 3D render, cartoon, illustration, CGI look",
    "surgical mask, gloves, face shield, blood, a patient in the chair",
    "big smile showing teeth, exaggerated expression, posing",
    "cluttered background, other people, mirrors"
  ]
}
```

---

# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)

## Clip 01 · 6 s — Hook: el dolor

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
        "synchronization": "al decir '¿Te da pena sonreír en las fotos?', inclina un poco la cabeza con empatía y abre una mano hacia la cámara, como preguntando; al decir 'Lo veo todos los días', asiente despacio; al decir 'en la clínica', abre la mano hacia un lado señalando suavemente el consultorio",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "¿Te da pena sonreír en las fotos? Lo veo todos los días en la clínica.",
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

## Clip 02 · 8 s — La solución: diseño de sonrisa

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
        "synchronization": "al decir 'Con el diseño de sonrisa', junta las yemas de los dedos de ambas manos frente al torso como si armara algo con cuidado; al decir 'planificamos tu cambio en digital', separa las manos despacio como si mostrara un plano; al decir 'antes de empezar ya ves cómo vas a quedar', abre ambas palmas hacia la cámara con una sonrisa tranquila y segura",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "Con el diseño de sonrisa planificamos tu cambio en digital, y antes de empezar ya ves cómo vas a quedar.",
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

## Clip 03 · 8 s — CTA: agendar la valoración

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
        "synchronization": "al decir 'Agenda tu primera valoración', abre una palma hacia la cámara en gesto de invitación; al decir 'en el botón de abajo', señala hacia abajo con el índice; al decir 'te mostramos tu nueva sonrisa', sonríe con calidez; al decir 'sin compromiso', mueve la mano abierta suavemente de lado a lado, tranquilizando",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "Agenda tu primera valoración en el botón de abajo y te mostramos tu nueva sonrisa, sin compromiso.",
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

## B-roll 01 · Consultorio dental → guárdala como `broll/broll-01.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a slow handheld shot of a small, real dental clinic consultation room in Latin America, with no people. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "a white and light-gray dental chair with a slightly worn seat cushion, the folded dental light arm and a small instrument tray",
  "environment": {
    "location": "a modest, well-kept neighborhood dental clinic, during the day",
    "details": "white cabinets with a light wood countertop, a box of gloves and a cup of cotton rolls on the counter, a small plant, a framed diploma on the wall (unreadable)",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, at eye level from the doorway, the chair slightly off-center",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft daylight from a window in front of the camera plus the neutral ceiling light of the clinic",
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
    "people, a patient in the chair",
    "futuristic high-tech clinic, neon or blue lighting"
  ]
}
```

## B-roll 02 · Sonrisa natural en primer plano → guárdala como `broll/broll-02.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of the lower half of a young Latin American woman's face while she sits in a dental chair, from the nose down. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "natural lips with no heavy makeup, mouth closed in a relaxed neutral expression, real skin texture with pores, a paper patient bib clipped at her neck",
  "environment": {
    "location": "a dental clinic consultation room",
    "details": "the blurred dental light above, a light-gray headrest behind her head",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "tight vertical close-up, from the tip of the nose to the chin and neck",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft frontal light from the dental lamp, slightly warm",
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
    "eyes or full face visible",
    "dental instruments in the mouth, gloves, blood"
  ]
}
```

---

# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)

Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como `clips/broll-01.mp4`, `clips/broll-02.mp4`…

## B-roll 01 · 8 s · imagen inicial `broll/broll-01.jpg` — Consultorio dental

```json
{
  "scene": {
    "duration_seconds": 8,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "avance lento en mano, con un leve balanceo natural",
    "action": "la cámara avanza muy despacio hacia el sillón, como alguien que entra al consultorio",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave de la clínica, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 02 · 6 s · imagen inicial `broll/broll-02.jpg` — Sonrisa natural en primer plano

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara casi fija con un acercamiento muy lento",
    "action": "pasa de la boca cerrada y relajada a una sonrisa amplia, natural y segura, con dientes naturales y parejos, no perfectos ni blanqueados en exceso",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```
