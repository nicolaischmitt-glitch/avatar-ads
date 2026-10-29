# Anuncio 08 · Ejemplo producto físico (sérum de vitamina C) — Prompts para Google Flow

Protagonista: **mujer** · producto: sérum de vitamina C **ALBA** (marca ficticia).
Voz: **6 clips · 40 s** generados (≈ 35–38 s editado; de cada B-roll se usan 2–4 s). Imagen de referencia de todos: `avatar/avatar.jpg`.
Validados con `validar-json.mjs --allow scene.dialogue.speaker` (variable autorizada: voz de mujer).
**Producto LOCKED IN:** primero se crea `producto/producto.png` (Paso 0) y se adjunta en el avatar y en cada B-roll donde sale el frasco; el bloque `product` es idéntico en todos los prompts. Antes de animar, compara cada imagen con `producto.png`: si el frasco o la etiqueta cambian, regenera esa imagen.
Guarda los clips como `clips/clip-01.mp4` … y los B-rolls: primero el frame (`broll/broll-01.jpg`) y después el video (`clips/broll-01.mp4`).

---

# Paso 0 · Imagen del producto (Nano Banana Pro, 1:1)

Genera 4 variaciones y elige la que tenga la etiqueta perfecta (`ALBA` / `VITAMINA C`, bien escrito, sin texto de más). Guárdala como `producto/producto.png`: desde aquí el frasco ya no cambia.

```json
{
  "task": "Generate one photorealistic reference photo of a single skincare product, front view, to be used as the exact visual reference of this product in every later image. The product must match \"product\" exactly; the label must be perfectly legible and correctly spelled.",
  "output": {
    "aspect_ratio": "1:1",
    "look": "clean, realistic product reference photo taken with a phone, true-to-life colors"
  },
  "product": {
    "name": "ALBA vitamin C face serum (a fictional brand)",
    "bottle": "a small 30 ml amber-brown glass Boston round dropper bottle with rounded shoulders, about 9 cm tall including the dropper (roughly the length of an adult index finger), smooth glass with subtle real reflections",
    "dropper": "a glossy black rubber bulb on top of a black ribbed plastic screw collar; when the dropper is out, a clear glass pipette with a narrow tip",
    "label": "a matte cream paper label (#F4EDE2) wrapped around the middle of the bottle, covering about half of its height, with a thin solid orange band (#F28C28) along its bottom edge; flat, clean print, no gloss",
    "label_text": "exactly two centered lines and nothing else: 'ALBA' in large bold dark-brown sans-serif capital letters, and below it 'VITAMINA C' in smaller dark-brown sans-serif capital letters; no other words, numbers, icons or symbols",
    "serum": "a clear, slightly golden, light and fluid liquid",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, label design and label text"
  },
  "composition": {
    "view": "straight front view at the bottle's mid-height, the label facing the camera and centered, the dropper cap on",
    "framing": "the whole bottle in frame, centered, filling about 60% of the image height, with even space around it",
    "surface": "standing upright on a plain light warm-gray matte surface, a soft natural contact shadow under it",
    "background": "plain light warm-gray seamless background, nothing else in the image"
  },
  "lighting": {
    "key": "soft, even, diffused daylight from the front, like a window behind the camera",
    "mood": "neutral and accurate colors, low contrast, a soft natural highlight on the glass, no harsh reflections over the label"
  },
  "realism_rules": [
    "real amber glass with true transparency and subtle reflections",
    "real paper label texture, perfectly flat print, crisp letters",
    "correct proportions, perfectly upright, no distortion"
  ],
  "negative": [
    "any text other than 'ALBA' and 'VITAMINA C' on the label, misspelled letters, extra lines of small text, numbers, icons, barcodes",
    "a second bottle, props, hands, people, flowers, water splashes, decorations",
    "a different bottle shape, a frosted or clear bottle, a pump or spray cap, a gold or white cap",
    "3D render, CGI, illustration, heavy studio advertising look, dramatic lighting, reflections covering the label"
  ]
}
```

---

# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16) · adjunta `producto/producto.png`

Genera 4 variaciones con este prompt y guarda la elegida como `avatar/avatar.jpg`: la etiqueta ALBA debe verse igual que en `producto.png`. Es la imagen de referencia de todos los clips de voz.

```json
{
  "task": "Generate one photorealistic still frame in the style of a casual vertical selfie video an original fictional woman films of herself with her phone front camera, in her bathroom in the morning, to show her audience a skincare product she uses. It will be used as the first frame of a talking-head video, so it should feel candid and authentic, like a frame from an everyday phone video. The attached reference image is the exact product she holds: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in \"product\".",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone front-camera video frame, not a professional photo"
  },
  "product": {
    "name": "ALBA vitamin C face serum (a fictional brand)",
    "bottle": "a small 30 ml amber-brown glass Boston round dropper bottle with rounded shoulders, about 9 cm tall including the dropper (roughly the length of an adult index finger), smooth glass with subtle real reflections",
    "dropper": "a glossy black rubber bulb on top of a black ribbed plastic screw collar; when the dropper is out, a clear glass pipette with a narrow tip",
    "label": "a matte cream paper label (#F4EDE2) wrapped around the middle of the bottle, covering about half of its height, with a thin solid orange band (#F28C28) along its bottom edge; flat, clean print, no gloss",
    "label_text": "exactly two centered lines and nothing else: 'ALBA' in large bold dark-brown sans-serif capital letters, and below it 'VITAMINA C' in smaller dark-brown sans-serif capital letters; no other words, numbers, icons or symbols",
    "serum": "a clear, slightly golden, light and fluid liquid",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, label design and label text"
  },
  "subject": {
    "identity": "an original, non-famous Latin American woman, 27 years old",
    "face": "light-medium warm skin with natural texture (visible pores, a few tiny blemishes on the chin, faint under-eye shadows), dark brown eyes, natural full brows, slight natural facial asymmetry",
    "hair": "long dark brown hair pulled back in a loose claw clip, a few loose strands framing her face, slightly messy morning hair",
    "makeup": "no makeup, bare natural skin, natural lips",
    "accessories": "small simple gold stud earrings, no other jewelry",
    "build": "slim, natural build"
  },
  "wardrobe": {
    "top": "plain heather-gray crew-neck cotton t-shirt, a soft well-worn fabric, natural fabric wrinkles",
    "style": "relaxed morning at-home clothes, nothing flashy, no visible logos"
  },
  "pose_and_expression": {
    "position": "standing at the bathroom counter, upper body leaning very slightly toward the camera",
    "gaze": "looking directly into the lens, making eye contact with the viewer",
    "expression": "calm, confident and friendly, a subtle natural half-smile, as if about to start talking; mouth closed or barely parted, relaxed jaw",
    "hands": "her right hand holds the product bottle at chest height, label facing the camera and fully visible, fingers holding the bottle by the glass shoulder and the base without covering the label; her left hand rests relaxed on the counter edge in the lower part of the frame; fingers relaxed, all fingers anatomically correct and fully visible; nothing else in her hands",
    "posture": "shoulders relaxed and square to the camera, natural and unposed"
  },
  "environment": {
    "location": "a clean, simple bathroom in the morning",
    "background": "a wall of white rectangular tiles, a wooden shelf with two rolled beige towels and a small green plant, softly out of focus, uncluttered",
    "foreground": "the edge of a white sink counter at the lower edge of the frame with a ceramic cup and a folded hand towel, slightly out of focus",
    "atmosphere": "tidy, real, lived-in home bathroom, not a staged studio set"
  },
  "camera": {
    "device": "iPhone front camera propped against the bathroom mirror at chest-to-eye height, slightly below eye level, facing her",
    "lens": "wide-angle selfie lens (about 24mm equivalent) with its natural mild perspective",
    "framing": "medium close-up from the waist up, subject centered horizontally; her head sits in the upper-middle of the frame (eyes at about 38% of the frame height from the top), leaving clean empty space above her head for on-screen graphics",
    "focus": "face and bottle sharp, the label text crisp and readable, background softly in focus as a phone would render it (no artificial heavy bokeh)",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft, diffused frontal light from a warm-white vanity light bar above the mirror, directly in front of her, behind the phone, lighting her whole face evenly from the front",
    "fill": "soft morning daylight bouncing off the white tiles",
    "mood": "bright, fresh and realistic; both sides of the face equally lit with the same brightness and no side shadows, only very soft natural shading under the chin and nose; accurate skin tones, low contrast"
  },
  "realism_rules": [
    "natural and authentic, like an everyday phone video, not a stock photo",
    "real skin texture, no smoothing, no beauty filter, no plastic or waxy skin",
    "natural fabric folds and wrinkles on the t-shirt",
    "correct human anatomy: two hands, five fingers each, natural proportions, a natural grip on the bottle",
    "realistic eyes with natural catchlights from the light in front of her",
    "even, symmetrical illumination on the face, as when someone films herself facing the mirror light",
    "the bottle is identical to the attached product image, at a realistic size in her hand"
  ],
  "negative": [
    "text, captions, subtitles, logos, watermarks, UI elements; any text other than the product label (ALBA / VITAMINA C)",
    "a different bottle, a changed or blank label, misspelled label text, a second bottle, extra products, rings or other objects in her hand",
    "side lighting, split lighting, one half of the face darker than the other, strong shadows on one side of the face",
    "backlighting, silhouette, overexposed background",
    "studio lighting, ring light reflections, cinematic color grading, heavy bokeh",
    "extra or deformed fingers, distorted hands, a deformed or floating bottle, asymmetrical eyes, warped face",
    "smooth or airbrushed skin, heavy makeup, 3D render, cartoon, illustration, CGI look",
    "towel on the head, bathrobe, face mask, skincare foam, steam",
    "big smile showing teeth, exaggerated expression, posing",
    "cluttered counter, many products, other people, a visible mirror reflection"
  ]
}
```

---

# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)

## Clip 01 · 6 s — Hook: cara de cansada

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
        "synchronization": "sostiene el mismo frasco ámbar de ALBA de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, con la etiqueta siempre hacia la cámara y sin taparla con los dedos, y gesticula con la mano izquierda: al decir 'Dormía ocho horas', levanta la mano izquierda con la palma abierta como quien no lo puede creer; al decir 'mi cara decía', se señala la cara con el índice izquierdo y hace una mueca de cansancio; al decir 'que no había dormido nada', se toca suavemente debajo del ojo con las yemas y niega levemente con la cabeza",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "Dormía ocho horas y aun así mi cara decía que no había dormido nada.",
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

## Clip 02 · 6 s — Lo que probó: nada funcionaba

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
        "synchronization": "sostiene el mismo frasco ámbar de ALBA de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, con la etiqueta siempre hacia la cámara y sin taparla con los dedos, y gesticula con la mano izquierda: al decir 'Probé cremas caras, mascarillas, de todo', va contando con los dedos de la mano izquierda, uno por cada cosa; al decir 'y mi piel seguía apagada', deja caer la mano con resignación; al decir 'como sin vida', se pasa las yemas por la mejilla con una expresión de frustración suave",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "Probé cremas caras, mascarillas, de todo… y mi piel seguía apagada, como sin vida.",
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

## Clip 03 · 8 s — Descubrimiento: el sérum ALBA

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
        "synchronization": "sostiene el mismo frasco ámbar de ALBA de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, con la etiqueta siempre hacia la cámara y sin taparla con los dedos, y gesticula con la mano izquierda: al decir 'Hasta que empecé a usar', se le ilumina la cara y sonríe; al decir 'este sérum de vitamina C', acerca el frasco a la cámara con la etiqueta hacia delante y lo sostiene ahí un momento; al decir 'Dos gotas', muestra dos dedos con la mano izquierda; al decir 'nada más', abre la mano izquierda con naturalidad, como quien dice que es así de simple",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "Hasta que empecé a usar este sérum de vitamina C. Dos gotas cada mañana, nada más.",
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

## Clip 04 · 6 s — Demostración: textura ligera

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
        "synchronization": "sostiene el mismo frasco ámbar de ALBA de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, con la etiqueta siempre hacia la cámara y sin taparla con los dedos, y gesticula con la mano izquierda: al decir 'Es súper ligero', frota suavemente las yemas del pulgar y el índice de la mano izquierda; al decir 'se absorbe en segundos', se da dos toquecitos en la mejilla con las yemas; al decir 'no te deja la piel grasosa', niega suavemente con el índice de la mano izquierda",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "Es súper ligero, se absorbe en segundos y no te deja la piel grasosa.",
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

## Clip 05 · 8 s — Cómo se ve ahora

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
        "synchronization": "sostiene el mismo frasco ámbar de ALBA de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, con la etiqueta siempre hacia la cámara y sin taparla con los dedos, y gesticula con la mano izquierda: al decir 'Hoy me miro al espejo', mira un instante hacia un lado como si viera su reflejo y vuelve a la cámara; al decir 'me veo despierta, fresca, con brillo', sonríe de verdad y se toca el pómulo con las yemas; al decir 'y eso que no llevo maquillaje', se señala la cara con la mano izquierda abierta, orgullosa y cómplice",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "Hoy me miro al espejo y me veo despierta, fresca, con brillo… y eso que no llevo maquillaje.",
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

## Clip 06 · 6 s — CTA: comprar

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
        "synchronization": "sostiene el mismo frasco ámbar de ALBA de la imagen de referencia en la mano derecha durante todo el clip, sin soltarlo, con la etiqueta siempre hacia la cámara y sin taparla con los dedos, y gesticula con la mano izquierda: al decir 'Si tu piel también se ve cansada', señala a la cámara con la palma abierta, cercana; al decir 'pruébalo', levanta un poco el frasco hacia la cámara; al decir 'Lo consigues en el botón de abajo', señala hacia abajo con el índice de la mano izquierda",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "mujer",
      "script": "Si tu piel también se ve cansada, pruébalo. Lo consigues en el botón de abajo.",
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

## B-roll 01 · Recién levantada, se mira cansada ("no había dormido nada") · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-01.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of the same woman just after waking up, looking at herself in the bathroom mirror (the phone is propped where the mirror is), touching the skin under her eye with a fingertip. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the same woman from the reference, face and shoulders in frame, hair a bit messier than in the reference, sleepy eyes, faint under-eye shadows, dull tired skin, a slightly disappointed expression, no product in her hands",
  "environment": {
    "location": "the same home bathroom, early morning",
    "details": "white rectangular tiles, the wooden shelf with rolled beige towels and the small green plant softly out of focus behind her",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical close-up from the shoulders up, face in the upper-middle of the frame",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the same soft frontal light from the vanity light bar, slightly dimmer and cooler, early morning",
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
    "a different person, a changed face, a likeness of any real person",
    "heavy makeup, beauty filter, glossy skin",
    "a visible mirror frame or reflection"
  ]
}
```

## B-roll 02 · Cremas que no funcionaron ("probé cremas caras, mascarillas…") · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-02.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of several skincare jars and tubes crowded on a white bathroom counter, a woman's hand pushing them aside. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the product/place: keep it exactly the same (shape, materials, colors, label), but do not include the person from the reference.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "five or six generic skincare products (white and pastel jars, tubes and a sheet-mask pouch) with blank or unreadable labels, half-used, a young woman's hand with natural short nails sliding them to the side",
  "environment": {
    "location": "the same home bathroom in the morning",
    "details": "the white sink edge, a ceramic cup, a folded beige towel, white tiles behind",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, camera a bit above counter height, products filling the middle of the frame",
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
    "recognizable faces, a likeness of any real person",
    "an amber dropper bottle",
    "readable brand names on the products"
  ]
}
```

## B-roll 03 · Aparece ALBA: su mano toma el frasco ("hasta que empecé a usar este sérum") · adjunta `producto/producto.png` + `avatar/avatar.jpg` → guárdala como `broll/broll-03.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of the ALBA bottle standing alone on the clean bathroom counter in the morning light, a woman's hand reaching for it. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. Attached image 1 is the exact product: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in \"product\". Attached image 2 only shows the place: match its location and light, but do not include the person from it.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the ALBA bottle exactly as in \"product\", dropper cap on, label facing the camera and fully legible; a young woman's hand with natural short nails entering from the right, fingers about to pick it up by the glass shoulder",
  "product": {
    "name": "ALBA vitamin C face serum (a fictional brand)",
    "bottle": "a small 30 ml amber-brown glass Boston round dropper bottle with rounded shoulders, about 9 cm tall including the dropper (roughly the length of an adult index finger), smooth glass with subtle real reflections",
    "dropper": "a glossy black rubber bulb on top of a black ribbed plastic screw collar; when the dropper is out, a clear glass pipette with a narrow tip",
    "label": "a matte cream paper label (#F4EDE2) wrapped around the middle of the bottle, covering about half of its height, with a thin solid orange band (#F28C28) along its bottom edge; flat, clean print, no gloss",
    "label_text": "exactly two centered lines and nothing else: 'ALBA' in large bold dark-brown sans-serif capital letters, and below it 'VITAMINA C' in smaller dark-brown sans-serif capital letters; no other words, numbers, icons or symbols",
    "serum": "a clear, slightly golden, light and fluid liquid",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, label design and label text"
  },
  "environment": {
    "location": "the same home bathroom in the morning",
    "details": "a clean white counter with a few water droplets, a ceramic cup and the small plant blurred behind, white tiles",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, the bottle centered, camera at counter height",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "warm morning daylight from the front, a soft glow through the amber glass",
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
    "any text other than the product label (ALBA / VITAMINA C), captions, subtitles, other logos or brand names, watermarks, UI elements, readable signs or screens",
    "a different bottle, a changed or blank label, misspelled label text, extra products, a second bottle",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "recognizable faces, a likeness of any real person"
  ]
}
```

## B-roll 04 · Macro: dos gotas sobre el dorso de la mano ("dos gotas cada mañana") · adjunta `producto/producto.png` + `avatar/avatar.jpg` → guárdala como `broll/broll-04.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a macro close-up of a drop of serum about to fall from the ALBA glass dropper onto the back of a woman's hand, over a white bathroom sink. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. Attached image 1 is the exact product: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in \"product\". Attached image 2 only shows the place: match its location and light, but do not include the person from it.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the back of a young woman's hand with real skin texture, fine lines and natural short unpolished nails; the black-bulb glass dropper of the ALBA bottle above it, held by her other hand at the top of the frame, with a drop of clear, slightly golden serum at its tip",
  "product": {
    "name": "ALBA vitamin C face serum (a fictional brand)",
    "bottle": "a small 30 ml amber-brown glass Boston round dropper bottle with rounded shoulders, about 9 cm tall including the dropper (roughly the length of an adult index finger), smooth glass with subtle real reflections",
    "dropper": "a glossy black rubber bulb on top of a black ribbed plastic screw collar; when the dropper is out, a clear glass pipette with a narrow tip",
    "label": "a matte cream paper label (#F4EDE2) wrapped around the middle of the bottle, covering about half of its height, with a thin solid orange band (#F28C28) along its bottom edge; flat, clean print, no gloss",
    "label_text": "exactly two centered lines and nothing else: 'ALBA' in large bold dark-brown sans-serif capital letters, and below it 'VITAMINA C' in smaller dark-brown sans-serif capital letters; no other words, numbers, icons or symbols",
    "serum": "a clear, slightly golden, light and fluid liquid",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, label design and label text"
  },
  "environment": {
    "location": "a home bathroom in the morning",
    "details": "a white sink with a few water droplets, the open ALBA bottle without its dropper standing on the counter slightly out of focus with its label facing the camera, a folded beige towel",
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
    "any text other than the product label (ALBA / VITAMINA C), captions, subtitles, other logos or brand names, watermarks, UI elements, readable signs or screens",
    "a different bottle, a changed or blank label, misspelled label text, extra products, a second bottle",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "recognizable faces, a likeness of any real person"
  ]
}
```

## B-roll 05 · Macro: textura ligera entre los dedos ("es súper ligero") → guárdala como `broll/broll-05.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a macro close-up of a young woman's thumb and index fingertips with a drop of serum between them. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
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

## B-roll 06 · Se aplica el sérum en la cara ("se absorbe en segundos") · adjunta `producto/producto.png` + `avatar/avatar.jpg` → guárdala como `broll/broll-06.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of the same woman applying a drop of serum to her cheek with her fingertips, filmed with her phone propped against the bathroom mirror. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. Attached image 1 is the exact product: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in \"product\". Attached image 2 shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the same woman from the reference, face and shoulders in frame, gently pressing the fingertips of her left hand on her cheekbone where a small glossy drop of serum is spreading; her right hand holds the ALBA bottle at chin height in the lower corner of the frame, label facing the camera; eyes soft and relaxed, looking slightly off-camera toward the mirror, a calm hint of a smile",
  "product": {
    "name": "ALBA vitamin C face serum (a fictional brand)",
    "bottle": "a small 30 ml amber-brown glass Boston round dropper bottle with rounded shoulders, about 9 cm tall including the dropper (roughly the length of an adult index finger), smooth glass with subtle real reflections",
    "dropper": "a glossy black rubber bulb on top of a black ribbed plastic screw collar; when the dropper is out, a clear glass pipette with a narrow tip",
    "label": "a matte cream paper label (#F4EDE2) wrapped around the middle of the bottle, covering about half of its height, with a thin solid orange band (#F28C28) along its bottom edge; flat, clean print, no gloss",
    "label_text": "exactly two centered lines and nothing else: 'ALBA' in large bold dark-brown sans-serif capital letters, and below it 'VITAMINA C' in smaller dark-brown sans-serif capital letters; no other words, numbers, icons or symbols",
    "serum": "a clear, slightly golden, light and fluid liquid",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, label design and label text"
  },
  "environment": {
    "location": "the same home bathroom in the morning",
    "details": "white rectangular tiles, the wooden shelf with rolled beige towels and the small green plant softly out of focus behind her",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical close-up from the shoulders up, face in the upper-middle of the frame, a little closer than the talking-head shot",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the same soft, even frontal light from the vanity light bar in front of her, a fresh natural sheen on her skin",
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
    "any text other than the product label (ALBA / VITAMINA C), captions, subtitles, other logos or brand names, watermarks, UI elements, readable signs or screens",
    "a different bottle, a changed or blank label, misspelled label text, extra products, a second bottle",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "a different person, a changed face, a likeness of any real person",
    "heavy makeup, glossy plastic skin, beauty filter",
    "towel on the head, face mask, foam"
  ]
}
```

## B-roll 07 · Piel luminosa: se mira y sonríe ("me veo despierta, fresca, con brillo") · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-07.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of the same woman looking at herself in the bathroom mirror (the phone is propped where the mirror is), glowing fresh skin, smiling. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the same woman from the reference, face and shoulders in frame, hair neatly pulled back, bright awake eyes, fresh skin with a soft healthy natural glow on the cheekbones (still real texture and pores), a genuine relaxed smile, no makeup, no product in her hands",
  "environment": {
    "location": "the same home bathroom in the morning",
    "details": "white rectangular tiles, the wooden shelf with rolled beige towels and the small green plant softly out of focus behind her",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical close-up from the shoulders up, face in the upper-middle of the frame",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the same soft, even frontal light, slightly warmer and brighter, morning sun",
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
    "a different person, a changed face, a likeness of any real person",
    "heavy makeup, beauty filter, airbrushed or plastic skin, oily shine",
    "a visible mirror frame or reflection"
  ]
}
```

## B-roll 08 · El frasco sobre el lavabo (CTA: "lo consigues en el botón de abajo") · adjunta `producto/producto.png` + `avatar/avatar.jpg` → guárdala como `broll/broll-08.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of the ALBA amber glass dropper bottle standing on a bathroom counter, label facing the camera. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. Attached image 1 is the exact product: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in \"product\". Attached image 2 only shows the place: match its location and light, but do not include the person from it.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the ALBA bottle exactly as in \"product\", dropper cap on, label facing the camera and fully legible, a few water droplets on the counter",
  "product": {
    "name": "ALBA vitamin C face serum (a fictional brand)",
    "bottle": "a small 30 ml amber-brown glass Boston round dropper bottle with rounded shoulders, about 9 cm tall including the dropper (roughly the length of an adult index finger), smooth glass with subtle real reflections",
    "dropper": "a glossy black rubber bulb on top of a black ribbed plastic screw collar; when the dropper is out, a clear glass pipette with a narrow tip",
    "label": "a matte cream paper label (#F4EDE2) wrapped around the middle of the bottle, covering about half of its height, with a thin solid orange band (#F28C28) along its bottom edge; flat, clean print, no gloss",
    "label_text": "exactly two centered lines and nothing else: 'ALBA' in large bold dark-brown sans-serif capital letters, and below it 'VITAMINA C' in smaller dark-brown sans-serif capital letters; no other words, numbers, icons or symbols",
    "serum": "a clear, slightly golden, light and fluid liquid",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, label design and label text"
  },
  "environment": {
    "location": "a home bathroom in the morning",
    "details": "a rolled beige towel, a ceramic cup, a small plant blurred behind, white wall tiles",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, the bottle slightly off-center to the left, empty space at the bottom of the frame for the button, camera at counter height",
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
    "any text other than the product label (ALBA / VITAMINA C), captions, subtitles, other logos or brand names, watermarks, UI elements, readable signs or screens",
    "a different bottle, a changed or blank label, misspelled label text, extra products, a second bottle",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "recognizable faces, a likeness of any real person",
    "many products"
  ]
}
```

---

# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)

Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como `clips/broll-01.mp4`, `clips/broll-02.mp4`…

## B-roll 01 · 6 s · imagen inicial `broll/broll-01.jpg` — Recién levantada, se mira cansada ("no había dormido nada")

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara fija",
    "action": "se toca debajo del ojo con la yema, se estira un poco la piel y suelta un pequeño suspiro de cansancio",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 02 · 6 s · imagen inicial `broll/broll-02.jpg` — Cremas que no funcionaron ("probé cremas caras, mascarillas…")

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara fija",
    "action": "la mano aparta los frascos hacia un lado con desgano, como quien ya se cansó de probar",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 03 · 6 s · imagen inicial `broll/broll-03.jpg` — Aparece ALBA: su mano toma el frasco ("hasta que empecé a usar este sérum")

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "acercamiento muy lento de frente",
    "action": "la mano toma el frasco y lo levanta despacio, con la etiqueta siempre hacia la cámara",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "product_consistency": "el producto es exactamente el de la imagen: misma forma, tamaño, colores y etiqueta (ALBA / VITAMINA C); no cambia, no se deforma y el texto de la etiqueta no se reescribe",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos añadidos, letreros legibles, logotipos (salvo la etiqueta del producto), marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 04 · 6 s · imagen inicial `broll/broll-04.jpg` — Macro: dos gotas sobre el dorso de la mano ("dos gotas cada mañana")

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
    "product_consistency": "el producto es exactamente el de la imagen: misma forma, tamaño, colores y etiqueta (ALBA / VITAMINA C); no cambia, no se deforma y el texto de la etiqueta no se reescribe",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos añadidos, letreros legibles, logotipos (salvo la etiqueta del producto), marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 05 · 6 s · imagen inicial `broll/broll-05.jpg` — Macro: textura ligera entre los dedos ("es súper ligero")

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

## B-roll 06 · 6 s · imagen inicial `broll/broll-06.jpg` — Se aplica el sérum en la cara ("se absorbe en segundos")

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara fija",
    "action": "da toquecitos suaves con las yemas sobre la mejilla y extiende el sérum hacia la sien; la piel queda con un brillo fresco y natural",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "product_consistency": "el producto es exactamente el de la imagen: misma forma, tamaño, colores y etiqueta (ALBA / VITAMINA C); no cambia, no se deforma y el texto de la etiqueta no se reescribe",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos añadidos, letreros legibles, logotipos (salvo la etiqueta del producto), marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 07 · 6 s · imagen inicial `broll/broll-07.jpg` — Piel luminosa: se mira y sonríe ("me veo despierta, fresca, con brillo")

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara fija con un acercamiento muy lento",
    "action": "gira un poco la cara hacia un lado y hacia el otro mirándose la piel, se toca el pómulo con las yemas y sonríe satisfecha",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 08 · 6 s · imagen inicial `broll/broll-08.jpg` — El frasco sobre el lavabo (CTA: "lo consigues en el botón de abajo")

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "acercamiento muy lento de frente al frasco, sin girar a su alrededor (la etiqueta siempre de frente)",
    "action": "la luz de la mañana hace brillar el vidrio ámbar; el frasco no se mueve",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "product_consistency": "el producto es exactamente el de la imagen: misma forma, tamaño, colores y etiqueta (ALBA / VITAMINA C); no cambia, no se deforma y el texto de la etiqueta no se reescribe",
    "audio": "solo sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos añadidos, letreros legibles, logotipos (salvo la etiqueta del producto), marcas de agua, gráficos, transiciones ni filtros."
  }
}
```
