# Anuncio 01 — CUMBRE a las cinco — Prompts

Todo en orden: **0)** crea la foto del producto · **1)** crea la imagen del avatar y quédate con la que más te guste · **2)** genera todos los clips de voz con esa imagen · **3)** genera los B-rolls.
Voz: **6 clips · 50 s** generados · B-rolls: **10**.

**Producto LOCKED IN:** `producto/producto.png` se adjunta en cada imagen donde sale el producto y su descripción (`product`) es idéntica en todos los prompts. Antes de animar, compara cada imagen con `producto/producto.png`: si el producto o la etiqueta cambian, regenera esa imagen.

---

# Paso 0 · Imagen del producto (Nano Banana Pro, 1:1)

Si el producto es real, usa una foto real (de frente, bien iluminada, etiqueta legible) y guárdala como `producto/producto.png`. Si no, genera 4 variaciones con este prompt y guarda la de etiqueta perfecta (CUMBRE / CAFÉ DE ALTURA, bien escrita, sin texto de más).

```json
{
  "task": "Generate one photorealistic reference photo of a single product, front view, to be used as the exact visual reference of this product in every later image. The product must match \"product\" exactly; the label must be perfectly legible and correctly spelled.",
  "output": {
    "aspect_ratio": "1:1",
    "look": "clean, realistic product reference photo taken with a phone, true-to-life colors"
  },
  "product": {
    "name": "CUMBRE specialty ground coffee, 340 g bag (a fictional brand)",
    "bag": "a stand-up coffee pouch (doypack) with a flat bottom gusset, about 22 cm tall and 13 cm wide (roughly the length of an adult open hand), made of matte coffee-black paper (#16110D) with a smooth, non-glossy finish, no window, standing upright, filled and naturally creased",
    "top": "the top edge is heat-sealed straight across, with a thin solid copper (#C8833A) strip along the seal",
    "label": "printed directly on the front of the bag, centered in its upper-middle part, flat matte print, no paper sticker",
    "artwork": "above the text, a minimalist mountain drawn with only a few thin copper (#C8833A) lines: one continuous outline of two overlapping peaks, the taller one in the center, no fill, no shading, no sun, no other shapes",
    "label_text": "exactly two centered lines of text and nothing else: 'CUMBRE' in large, tall, condensed cream (#F3EBDD) sans-serif capital letters (Oswald style), and below it 'CAFÉ DE ALTURA' in small copper (#C8833A) sans-serif capital letters with wide letter spacing; no other words or numbers, and no graphics besides the thin-line mountain",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, mountain drawing, label design and label text"
  },
  "composition": {
    "view": "straight front view at the product's mid-height, the label facing the camera and centered",
    "framing": "the whole product in frame, centered, filling about 60% of the image height, with even space around it",
    "surface": "standing upright on a plain light warm-gray matte surface, a soft natural contact shadow under it",
    "background": "plain light warm-gray seamless background, nothing else in the image"
  },
  "lighting": {
    "key": "soft, even, diffused daylight from the front, like a window behind the camera",
    "mood": "neutral and accurate colors, low contrast, soft natural highlights, no harsh reflections over the label"
  },
  "realism_rules": [
    "true-to-life materials with their real texture, transparency and reflections",
    "real printed label, flat print, crisp letters",
    "correct proportions, perfectly upright, no distortion"
  ],
  "negative": [
    "any text other than the label (CUMBRE / CAFÉ DE ALTURA), misspelled letters, extra lines of small text, numbers, icons, barcodes",
    "a second product, props, hands, people, flowers, splashes, decorations",
    "a different shape, color, cap or label than described in \"product\"",
    "3D render, CGI, illustration, heavy studio advertising look, dramatic lighting, reflections covering the label"
  ]
}
```

---

# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)

Pon el formato 9:16, pega el prompt, genera 4 variaciones y guarda la elegida con el nombre que se indica. Revisa manos, ojos, piel y que no haya letras inventadas.

Guárdala como `avatar/avatar.jpg`.

**Adjunta `producto/producto.png`** al generar: el producto de la imagen debe ser idéntico.

```json
{
  "task": "Generate one photorealistic still frame in the style of a casual vertical selfie video an original fictional man films of himself with his phone front camera, in his kitchen at five in the morning, to talk to his audience about the coffee he drinks every morning. It will be used as the first frame of a talking-head video, so it should feel candid and authentic, like a frame from an everyday phone video. The attached reference image is the exact coffee bag on the counter behind him: replicate it identically (same bag shape, size, materials, colors, mountain drawing, label design and label text), as described in \"product\".",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone front-camera video frame, not a professional photo"
  },
  "product": {
    "name": "CUMBRE specialty ground coffee, 340 g bag (a fictional brand)",
    "bag": "a stand-up coffee pouch (doypack) with a flat bottom gusset, about 22 cm tall and 13 cm wide (roughly the length of an adult open hand), made of matte coffee-black paper (#16110D) with a smooth, non-glossy finish, no window, standing upright, filled and naturally creased",
    "top": "the top edge is heat-sealed straight across, with a thin solid copper (#C8833A) strip along the seal",
    "label": "printed directly on the front of the bag, centered in its upper-middle part, flat matte print, no paper sticker",
    "artwork": "above the text, a minimalist mountain drawn with only a few thin copper (#C8833A) lines: one continuous outline of two overlapping peaks, the taller one in the center, no fill, no shading, no sun, no other shapes",
    "label_text": "exactly two centered lines of text and nothing else: 'CUMBRE' in large, tall, condensed cream (#F3EBDD) sans-serif capital letters (Oswald style), and below it 'CAFÉ DE ALTURA' in small copper (#C8833A) sans-serif capital letters with wide letter spacing; no other words or numbers, and no graphics besides the thin-line mountain",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, mountain drawing, label design and label text"
  },
  "subject": {
    "identity": "an original, non-famous Latin American man, 34 years old, an entrepreneur who trains every morning",
    "face": "light-olive warm skin with natural texture (visible pores, slight unevenness, faint under-eye lines from waking up early), dark brown eyes, defined brows, slight natural facial asymmetry",
    "hair": "short dark brown hair, slightly messy from just waking up, a few strands out of place",
    "facial_hair": "short, neatly trimmed dark beard",
    "accessories": "a plain black sports watch on his left wrist, no other jewelry, no glasses",
    "build": "athletic, fit build from regular training, not bulky"
  },
  "wardrobe": {
    "top": "plain dark heather-gray cotton training t-shirt, crew neck, soft fabric, natural fabric wrinkles",
    "style": "ready to train, simple and functional, nothing flashy, no visible logos"
  },
  "pose_and_expression": {
    "position": "standing at his kitchen counter, upper body leaning very slightly toward the camera",
    "gaze": "looking directly into the lens, making eye contact with the viewer",
    "expression": "calm, confident and friendly, a subtle natural half-smile, as if about to start talking; mouth closed or barely parted, relaxed jaw",
    "hands": "his right hand holds a matte black ceramic coffee mug with freshly served black coffee at chest height, fingers through the handle, a faint wisp of steam; his left hand rests relaxed on the counter edge in the lower part of the frame; fingers relaxed, all fingers anatomically correct and fully visible; nothing else in his hands",
    "posture": "shoulders relaxed and square to the camera, natural and unposed"
  },
  "environment": {
    "location": "his modern but lived-in home kitchen at five in the morning, before sunrise",
    "background": "a light wooden counter behind him with the coffee bag standing upright slightly to one side of his shoulder, label facing the camera, next to a glass French press half full of coffee; white rectangular wall tiles; a small green plant; a window in the back wall showing a deep blue pre-dawn sky; softly in focus, uncluttered",
    "foreground": "the edge of the counter at the lower edge of the frame with a plate holding a half-eaten piece of toast, slightly out of focus",
    "atmosphere": "tidy, real, lived-in home kitchen, quiet early morning, not a staged studio set"
  },
  "camera": {
    "device": "iPhone front camera propped against a shelf on the counter in front of him at chest-to-eye height, slightly below eye level",
    "lens": "wide-angle selfie lens (about 24mm equivalent) with its natural mild perspective",
    "framing": "medium close-up from the waist up, subject centered horizontally; his head sits in the upper-middle of the frame (eyes at about 38% of the frame height from the top), leaving clean empty space above his head for on-screen graphics",
    "focus": "face and mug sharp, the coffee bag label readable, background softly in focus as a phone would render it (no artificial heavy bokeh)",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft, diffused warm-white light from a ceiling lamp and the under-cabinet lights on the cabinets directly in front of him, behind the phone, lighting his whole face evenly from the front",
    "fill": "faint cool blue pre-dawn light from the window behind him, very soft, never backlighting his face",
    "mood": "warm, calm, early-morning and realistic; both sides of the face equally lit with the same brightness and no side shadows, only very soft natural shading under the chin and nose; accurate skin tones, low contrast"
  },
  "realism_rules": [
    "natural and authentic, like an everyday phone video, not a stock photo",
    "real skin texture, no smoothing, no beauty filter, no plastic or waxy skin",
    "natural fabric folds and wrinkles on the t-shirt",
    "correct human anatomy: two hands, five fingers each, natural proportions, a natural grip on the mug handle",
    "realistic eyes with natural catchlights from the light in front of him",
    "even, symmetrical illumination on the face, as when someone films himself facing the kitchen lights",
    "the coffee bag is identical to the attached product image, at a realistic size on the counter"
  ],
  "negative": [
    "text, captions, subtitles, logos, watermarks, UI elements; any text other than the coffee bag label (CUMBRE / CAFÉ DE ALTURA)",
    "a different bag, a changed or blank label, a missing or different mountain drawing, misspelled label text, a second bag, extra coffee packages, text or logos on the mug",
    "side lighting, split lighting, one half of the face darker than the other, strong shadows on one side of the face, a window beside him lighting the face from the side",
    "backlighting, silhouette, overexposed window",
    "studio lighting, ring light reflections, cinematic color grading, heavy bokeh",
    "extra or deformed fingers, distorted hands, a floating or deformed mug, asymmetrical eyes, warped face",
    "smooth or airbrushed skin, 3D render, cartoon, illustration, CGI look",
    "suit, shirt with collar, gym equipment in the kitchen, sweat",
    "big smile showing teeth, exaggerated expression, posing",
    "cluttered counter, coffee machines, other people, mirrors"
  ]
}
```

---

# Paso 2 · Clips de voz (Google Flow)

Sube la imagen de la toma como imagen inicial, pega el JSON del clip y genera (2 variaciones por clip; quédate con la mejor). Guarda cada video como `clips/clip-01.mp4`, `clips/clip-02.mp4`…

## Clip 01 · 8 s — Hook

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
      "language_accent": "español con acento neutro latino",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene la taza con la mano derecha a la altura del pecho durante todo el clip y gesticula solo con la mano izquierda; al decir 'a las cinco', levanta la mano izquierda mostrando los cinco dedos; al decir 'ganarle al día', cierra la mano izquierda en un puño suave y la mueve un poco hacia delante; al decir 'un café cualquiera', mueve la mano izquierda con la palma hacia abajo hacia un lado, como descartando algo",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Si te levantas a las cinco para ganarle al día, no lo empieces con un café cualquiera.",
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
    "audio": {
      "voice_only": true,
      "ambient_sound": false,
      "background_noise": false,
      "music": false,
      "sound_effects": false,
      "room_tone": "habitación silenciosa, sin eco ni reverberación",
      "rule": "Se escucha únicamente la voz del avatar, clara y cercana, como grabada en una habitación silenciosa. Sin sonido ambiente, sin ruido de aire acondicionado, refrigerador, ventilador, tráfico ni zumbido eléctrico, y sin música ni efectos de sonido."
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
    "Hablar con energía y naturalidad, en español con acento neutro latino.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 02 · 10 s — El contraste

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
      "language_accent": "español con acento neutro latino",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene la taza con la mano derecha durante todo el clip y gesticula solo con la mano izquierda; al decir 'Entrenas', 'cuidas lo que comes' y 'te exiges en todo', cuenta con los dedos de la mano izquierda: uno, dos y tres; al decir 'instantáneo, amargo', hace una mueca leve de disgusto y mueve la mano izquierda de lado a lado con la palma hacia abajo; al decir 'que ni disfrutas', encoge levemente los hombros",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Entrenas, cuidas lo que comes, te exiges en todo… y tu primer café es uno instantáneo, amargo, que ni disfrutas.",
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
    "audio": {
      "voice_only": true,
      "ambient_sound": false,
      "background_noise": false,
      "music": false,
      "sound_effects": false,
      "room_tone": "habitación silenciosa, sin eco ni reverberación",
      "rule": "Se escucha únicamente la voz del avatar, clara y cercana, como grabada en una habitación silenciosa. Sin sonido ambiente, sin ruido de aire acondicionado, refrigerador, ventilador, tráfico ni zumbido eléctrico, y sin música ni efectos de sonido."
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
    "Hablar con energía y naturalidad, en español con acento neutro latino.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 03 · 8 s — El producto

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
      "language_accent": "español con acento neutro latino",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene la taza con la mano derecha durante todo el clip y gesticula solo con la mano izquierda; al decir 'CUMBRE', levanta un poco la taza hacia la cámara; al decir 'de altura', sube la mano izquierda con la palma hacia abajo, como marcando algo alto; al decir 'intenso, pero sin amargura', junta el pulgar y el índice de la mano izquierda en un gesto de precisión y asiente suavemente",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "CUMBRE es café de especialidad de altura. Tostado medio: intenso, pero sin amargura.",
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
    "audio": {
      "voice_only": true,
      "ambient_sound": false,
      "background_noise": false,
      "music": false,
      "sound_effects": false,
      "room_tone": "habitación silenciosa, sin eco ni reverberación",
      "rule": "Se escucha únicamente la voz del avatar, clara y cercana, como grabada en una habitación silenciosa. Sin sonido ambiente, sin ruido de aire acondicionado, refrigerador, ventilador, tráfico ni zumbido eléctrico, y sin música ni efectos de sonido."
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
    "Hablar con energía y naturalidad, en español con acento neutro latino.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 04 · 8 s — Fácil de preparar

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
      "language_accent": "español con acento neutro latino",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene la taza con la mano derecha durante todo el clip y gesticula solo con la mano izquierda; al decir 'ya viene molido', abre la mano izquierda con la palma hacia arriba; al decir 'igual que siempre', hace un pequeño movimiento tranquilo con la mano izquierda, restándole importancia; al decir 'en tu cafetera o en tu prensa francesa', mueve la mano izquierda hacia un lado y luego hacia el otro, como mostrando dos opciones",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Y ya viene molido: lo preparas igual que siempre, en tu cafetera o en tu prensa francesa.",
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
    "audio": {
      "voice_only": true,
      "ambient_sound": false,
      "background_noise": false,
      "music": false,
      "sound_effects": false,
      "room_tone": "habitación silenciosa, sin eco ni reverberación",
      "rule": "Se escucha únicamente la voz del avatar, clara y cercana, como grabada en una habitación silenciosa. Sin sonido ambiente, sin ruido de aire acondicionado, refrigerador, ventilador, tráfico ni zumbido eléctrico, y sin música ni efectos de sonido."
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
    "Hablar con energía y naturalidad, en español con acento neutro latino.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 05 · 8 s — El ritual

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
      "language_accent": "español con acento neutro latino",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene la taza con la mano derecha durante todo el clip y gesticula solo con la mano izquierda; al decir 'tu ritual', lleva la mano izquierda al pecho un instante; al decir 'antes de que empiece todo', abre la mano izquierda hacia delante; al decir 'a la altura de tu día', sube la mano izquierda con la palma hacia abajo hasta la altura del hombro",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Es tu ritual antes de que empiece todo. Y merece estar a la altura de tu día.",
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
    "audio": {
      "voice_only": true,
      "ambient_sound": false,
      "background_noise": false,
      "music": false,
      "sound_effects": false,
      "room_tone": "habitación silenciosa, sin eco ni reverberación",
      "rule": "Se escucha únicamente la voz del avatar, clara y cercana, como grabada en una habitación silenciosa. Sin sonido ambiente, sin ruido de aire acondicionado, refrigerador, ventilador, tráfico ni zumbido eléctrico, y sin música ni efectos de sonido."
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
    "Hablar con energía y naturalidad, en español con acento neutro latino.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 06 · 8 s — CTA

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
      "language_accent": "español con acento neutro latino",
      "delivery": "rápida, energética y natural",
      "tone": "seguro, confiado y persuasivo",
      "facial_expression": "sonrisa natural, cercanía y simpatía",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos visibles, espontáneos y naturales con ambas manos frente al torso",
        "synchronization": "sostiene la taza con la mano derecha durante todo el clip y gesticula solo con la mano izquierda; al decir 'desde la primera taza', levanta un poco la taza hacia la cámara, como un brindis breve; al decir 'Toca el botón de abajo', señala hacia abajo con el índice de la mano izquierda; al decir 'pide tu CUMBRE', asiente con una media sonrisa",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Gánale al día desde la primera taza. Toca el botón de abajo y pide tu CUMBRE.",
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
    "audio": {
      "voice_only": true,
      "ambient_sound": false,
      "background_noise": false,
      "music": false,
      "sound_effects": false,
      "room_tone": "habitación silenciosa, sin eco ni reverberación",
      "rule": "Se escucha únicamente la voz del avatar, clara y cercana, como grabada en una habitación silenciosa. Sin sonido ambiente, sin ruido de aire acondicionado, refrigerador, ventilador, tráfico ni zumbido eléctrico, y sin música ni efectos de sonido."
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
    "Hablar con energía y naturalidad, en español con acento neutro latino.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

---

# Paso 3 · Frames de los B-rolls (Nano Banana Pro, 9:16)

Primero la imagen: es barata, así que prueba 4 variaciones y quédate con la toma que te guste. Guárdala como se indica.

## B-roll 01 · Alarma a las 5 (hook) · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-01.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: the same man in bed in his dark bedroom before sunrise, reaching for his phone on the nightstand to turn off the alarm. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the same man from the reference, lying in bed under a gray duvet, propping himself up on one elbow as his right hand reaches for the phone glowing on the nightstand; sleepy but determined face, messy hair; the phone screen glows without readable content",
  "environment": {
    "location": "his simple bedroom at five in the morning, still dark (not the kitchen from the reference image)",
    "details": "a wooden nightstand with the glowing phone face up and a glass of water, rumpled gray bedsheets, a window with closed curtains and a faint blue light at their edge, the dark gray t-shirt from the reference",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "handheld vertical shot from beside the bed at mattress height, medium shot of his upper body and the nightstand",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the cool glow of the phone screen and the faint blue pre-dawn light from the curtains, dim but his face clearly visible",
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
    "the kitchen from the reference image",
    "a readable clock or readable screen",
    "a woman or another person in the bed",
    "pitch black frame"
  ]
}
```

## B-roll 02 · Desayuno sencillo (cuidas lo que comes) · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-02.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: the same man at his kitchen counter preparing a simple healthy breakfast, slicing a banana over a bowl of oatmeal. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the same man from the reference, seen from the chest down to the counter and slightly from the side, his hands slicing a banana with a small knife over a ceramic bowl of oatmeal, the black sports watch on his wrist",
  "environment": {
    "location": "the same kitchen as the reference image, early morning",
    "details": "the light wooden counter, a white ceramic bowl of oatmeal, a small wooden cutting board, a few blueberries, white wall tiles",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "handheld vertical close-medium shot of his hands, the bowl and his torso in the dark gray t-shirt, his face partly out of frame at the top",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the same warm kitchen lights from the reference, plus faint blue pre-dawn light from the window",
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
    "the coffee bag",
    "packaged food with labels",
    "protein powder tubs"
  ]
}
```

## B-roll 03 · El café de siempre: instantáneo (contraste) → guárdala como `broll/broll-03.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of a hand stirring instant coffee granules into hot water in a plain white mug. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "a man's hand with a cheap metal teaspoon stirring dark instant coffee in a plain white ceramic mug, a few undissolved granules on the surface; next to it an open generic glass jar of instant coffee granules with no label",
  "environment": {
    "location": "a plain countertop in a dull, ordinary kitchen corner",
    "details": "a few spilled coffee granules on the counter, a cheap electric kettle partly in frame, a crumpled paper napkin",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "handheld vertical close-up from slightly above, the mug centered, no face in frame",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "flat, cold overhead fluorescent light, slightly dull colors",
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
    "any coffee bag",
    "labels or brand names on the jar or mug",
    "a face",
    "steam art"
  ]
}
```

## B-roll 04 · Abre la bolsa CUMBRE (CUMBRE es…) · adjunta `producto/producto.png` + `avatar/avatar.jpg` → guárdala como `broll/broll-04.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: the same man's hands scooping ground coffee out of the open CUMBRE bag on his kitchen counter. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. Attached image 1 is the exact product: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in \"product\". Attached image 2 shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the CUMBRE bag standing on the counter with its top seal cut open and folded down once, label and mountain drawing facing the camera and fully visible; his right hand dips a small metal measuring spoon into the bag and lifts out dark, evenly ground coffee; the black watch on his wrist",
  "product": {
    "name": "CUMBRE specialty ground coffee, 340 g bag (a fictional brand)",
    "bag": "a stand-up coffee pouch (doypack) with a flat bottom gusset, about 22 cm tall and 13 cm wide (roughly the length of an adult open hand), made of matte coffee-black paper (#16110D) with a smooth, non-glossy finish, no window, standing upright, filled and naturally creased",
    "top": "the top edge is heat-sealed straight across, with a thin solid copper (#C8833A) strip along the seal",
    "label": "printed directly on the front of the bag, centered in its upper-middle part, flat matte print, no paper sticker",
    "artwork": "above the text, a minimalist mountain drawn with only a few thin copper (#C8833A) lines: one continuous outline of two overlapping peaks, the taller one in the center, no fill, no shading, no sun, no other shapes",
    "label_text": "exactly two centered lines of text and nothing else: 'CUMBRE' in large, tall, condensed cream (#F3EBDD) sans-serif capital letters (Oswald style), and below it 'CAFÉ DE ALTURA' in small copper (#C8833A) sans-serif capital letters with wide letter spacing; no other words or numbers, and no graphics besides the thin-line mountain",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, mountain drawing, label design and label text"
  },
  "environment": {
    "location": "the same kitchen as the reference image, early morning",
    "details": "the light wooden counter, the empty glass French press next to the bag, white wall tiles, the plant softly out of focus",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "handheld vertical close-up of the bag and his hand at counter height, the bag centered and upright, his torso in the dark gray t-shirt partly visible, no face",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the same warm kitchen lights from the reference, falling on the front of the bag so the label is clear",
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
    "any text other than the product label (CUMBRE / CAFÉ DE ALTURA), captions, subtitles, other logos or brand names, watermarks, UI elements, readable signs or screens",
    "a different bottle, a changed or blank label, misspelled label text, extra products, a second bottle",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "a different person, a changed face, a likeness of any real person",
    "a sealed or different bag",
    "coffee beans instead of ground coffee",
    "spilled coffee covering the label"
  ]
}
```

## B-roll 05 · Prepara en la prensa francesa (ya viene molido) · adjunta `producto/producto.png` + `avatar/avatar.jpg` → guárdala como `broll/broll-05.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: the same man pouring hot water from a kettle into a glass French press with ground coffee on his kitchen counter. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. Attached image 1 is the exact product: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in \"product\". Attached image 2 shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "his hand pouring hot water from a matte black gooseneck kettle into the glass French press; the dark coffee blooms and rises with a light foam; the open CUMBRE bag stands next to it with its label facing the camera; his torso in the dark gray t-shirt partly visible, no face",
  "product": {
    "name": "CUMBRE specialty ground coffee, 340 g bag (a fictional brand)",
    "bag": "a stand-up coffee pouch (doypack) with a flat bottom gusset, about 22 cm tall and 13 cm wide (roughly the length of an adult open hand), made of matte coffee-black paper (#16110D) with a smooth, non-glossy finish, no window, standing upright, filled and naturally creased",
    "top": "the top edge is heat-sealed straight across, with a thin solid copper (#C8833A) strip along the seal",
    "label": "printed directly on the front of the bag, centered in its upper-middle part, flat matte print, no paper sticker",
    "artwork": "above the text, a minimalist mountain drawn with only a few thin copper (#C8833A) lines: one continuous outline of two overlapping peaks, the taller one in the center, no fill, no shading, no sun, no other shapes",
    "label_text": "exactly two centered lines of text and nothing else: 'CUMBRE' in large, tall, condensed cream (#F3EBDD) sans-serif capital letters (Oswald style), and below it 'CAFÉ DE ALTURA' in small copper (#C8833A) sans-serif capital letters with wide letter spacing; no other words or numbers, and no graphics besides the thin-line mountain",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, mountain drawing, label design and label text"
  },
  "environment": {
    "location": "the same kitchen as the reference image, early morning",
    "details": "the light wooden counter, the plunger lid of the French press resting beside it, a matte black ceramic mug waiting, white wall tiles",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "handheld vertical medium close-up at counter height, the French press centered and the bag to one side",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the same warm kitchen lights from the reference, faint blue pre-dawn light from the window",
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
    "any text other than the product label (CUMBRE / CAFÉ DE ALTURA), captions, subtitles, other logos or brand names, watermarks, UI elements, readable signs or screens",
    "a different bottle, a changed or blank label, misspelled label text, extra products, a second bottle",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "a different person, a changed face, a likeness of any real person",
    "a coffee machine",
    "a second bag",
    "steam covering the label"
  ]
}
```

## B-roll 06 · Sirve el café (intenso, sin amargura) · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-06.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of freshly brewed coffee being poured from a glass French press into a matte black ceramic mug. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the product/place: keep it exactly the same (shape, materials, colors, label), but do not include the person from the reference.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "a stream of rich dark-brown coffee falling into the matte black mug, a light golden-brown crema forming on top, soft steam rising",
  "environment": {
    "location": "the same kitchen counter as the reference image, early morning",
    "details": "the light wooden counter, a few coffee grounds on the counter, white wall tiles out of focus",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "handheld vertical close-up at mug height, the mug in the lower-middle of the frame",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the same warm kitchen lights from the reference, catching the steam and the coffee stream",
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
    "a face",
    "a coffee machine",
    "latte art",
    "milk"
  ]
}
```

## B-roll 07 · El ritual: primer sorbo al amanecer (selfie) · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-07.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a vlog-style selfie of the same man next to his kitchen window at sunrise, holding the matte black mug close, about to take the first sip. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the same man from the reference, holding the phone at arm's length with one hand and the steaming matte black mug in the other, a calm, focused look; he does not talk",
  "environment": {
    "location": "the same kitchen as the reference image, by the window, at sunrise",
    "details": "the window behind him to one side showing the first orange light of sunrise over rooftops, the plant on the windowsill, the dark gray t-shirt",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "handheld front-camera selfie, vertical, chest-up, slightly from below eye level",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft warm sunrise light falling on his face from the front, through the window next to the phone",
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
    "talking with an open mouth",
    "a readable view of signs",
    "lens flare"
  ]
}
```

## B-roll 08 · Entrena (entrenas / gánale al día) · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-08.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: the same man training in his small home garage gym at dawn, doing kettlebell swings. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the same man from the reference in the same dark gray t-shirt, now slightly sweaty, swinging a black kettlebell with both hands, focused face",
  "environment": {
    "location": "a small, simple home garage gym at dawn (not the kitchen from the reference image)",
    "details": "a rubber floor mat, a pull-up bar on the wall, two more kettlebells on the floor, a half-open garage door with cool morning light, a water bottle with no label",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "phone propped on the floor a few meters away, vertical, full body slightly from below",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "cool dawn light coming through the half-open garage door in front of him, plus a warm bulb overhead",
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
    "the kitchen from the reference image",
    "other people",
    "gym brand logos",
    "mirrors"
  ]
}
```

## B-roll 09 · Trabaja con su taza (a la altura de tu día) · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-09.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: the same man working at his home desk in the morning, typing on his laptop and taking a sip from the matte black mug. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the same man from the reference, freshly showered, wearing a plain navy cotton t-shirt, focused on his laptop; the steaming matte black mug next to the keyboard",
  "environment": {
    "location": "a simple home office corner in the morning (not the kitchen from the reference image)",
    "details": "a wooden desk, an open laptop seen from the side with the screen not visible, a paper notebook with a pen, a small plant, a window with soft morning daylight",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "phone propped on the desk at a three-quarter side angle, vertical, medium shot from the chest up",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft morning daylight from the window in front of him, behind the laptop",
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
    "the kitchen from the reference image",
    "a readable screen",
    "the coffee bag",
    "a second monitor with readable content"
  ]
}
```

## B-roll 10 · Cierre: bolsa y taza en el escritorio (botón) · adjunta `producto/producto.png` + `broll/broll-09.jpg` → guárdala como `broll/broll-10.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: the CUMBRE bag standing on his home desk next to the steaming matte black mug in soft morning light. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. Attached image 1 is the exact product: replicate it identically (same bottle shape, size, materials, colors, label design and label text), as described in \"product\". Attached image 2 only shows the place: match its location and light, but do not include the person from it.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the CUMBRE bag upright, sealed, label and mountain drawing facing the camera and fully visible, with the steaming matte black mug beside it; no person",
  "product": {
    "name": "CUMBRE specialty ground coffee, 340 g bag (a fictional brand)",
    "bag": "a stand-up coffee pouch (doypack) with a flat bottom gusset, about 22 cm tall and 13 cm wide (roughly the length of an adult open hand), made of matte coffee-black paper (#16110D) with a smooth, non-glossy finish, no window, standing upright, filled and naturally creased",
    "top": "the top edge is heat-sealed straight across, with a thin solid copper (#C8833A) strip along the seal",
    "label": "printed directly on the front of the bag, centered in its upper-middle part, flat matte print, no paper sticker",
    "artwork": "above the text, a minimalist mountain drawn with only a few thin copper (#C8833A) lines: one continuous outline of two overlapping peaks, the taller one in the center, no fill, no shading, no sun, no other shapes",
    "label_text": "exactly two centered lines of text and nothing else: 'CUMBRE' in large, tall, condensed cream (#F3EBDD) sans-serif capital letters (Oswald style), and below it 'CAFÉ DE ALTURA' in small copper (#C8833A) sans-serif capital letters with wide letter spacing; no other words or numbers, and no graphics besides the thin-line mountain",
    "rule": "the product must look exactly like this in every image: same shape, proportions, colors, materials, mountain drawing, label design and label text"
  },
  "environment": {
    "location": "the same home office desk as in the reference image, morning",
    "details": "the wooden desk, the closed paper notebook and pen, the edge of the closed laptop, the small plant, the window softly out of focus",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "handheld vertical shot at desk height, the bag and mug in the upper-middle of the frame, the lower third of the frame calm and empty (the desk surface) to leave room for an on-screen button",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft morning daylight from the window behind the camera, evenly lighting the front of the bag",
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
    "any text other than the product label (CUMBRE / CAFÉ DE ALTURA), captions, subtitles, other logos or brand names, watermarks, UI elements, readable signs or screens",
    "a different bottle, a changed or blank label, misspelled label text, extra products, a second bottle",
    "CGI, 3D render, illustration, overly glossy or plastic surfaces, futuristic or sci-fi look",
    "stock photo look, advertising look, studio lighting, cinematic color grading, HDR, oversaturated colors, heavy bokeh",
    "perfect symmetry, empty sterile spaces, everything brand new",
    "deformed hands, extra fingers, warped objects",
    "recognizable faces, a likeness of any real person",
    "a person",
    "a second bag",
    "an open laptop screen"
  ]
}
```

---

# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)

Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como `clips/broll-01.mp4`, `clips/broll-02.mp4`…

## B-roll 01 · 6 s · imagen inicial `broll/broll-01.jpg` — Alarma a las 5 (hook)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano casi fija, con el leve temblor natural de un celular",
    "action": "el celular vibra en la mesa de noche; él estira el brazo, apaga la alarma con el pulgar y se sienta en el borde de la cama frotándose la cara con una mano",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo la vibración suave del celular y el silencio de la madrugada, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 02 · 6 s · imagen inicial `broll/broll-02.jpg` — Desayuno sencillo (cuidas lo que comes)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano casi fija, con el leve temblor natural de un celular",
    "action": "corta rodajas de plátano sobre el bowl de avena con movimientos tranquilos y precisos",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el sonido suave del cuchillo sobre la tabla y el ambiente silencioso de la cocina, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 03 · 6 s · imagen inicial `broll/broll-03.jpg` — El café de siempre: instantáneo (contraste)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano casi fija, con el leve temblor natural de un celular",
    "action": "la cuchara gira dentro de la taza y los gránulos se disuelven de a poco en el agua oscura",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el tintineo de la cuchara contra la taza, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 04 · 6 s · imagen inicial `broll/broll-04.jpg` — Abre la bolsa CUMBRE (CUMBRE es…)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "acercamiento muy lento de frente a la bolsa, sin girar alrededor de ella",
    "action": "mete la cuchara medidora en la bolsa abierta, saca una cucharada de café molido y la levanta despacio; la bolsa no se mueve y la etiqueta queda siempre de frente",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "product_consistency": "el producto es exactamente el de la imagen: misma forma, tamaño, colores y etiqueta (CUMBRE / CAFÉ DE ALTURA); no cambia, no se deforma y el texto de la etiqueta no se reescribe",
    "audio": "solo el roce suave de la cuchara con el café y la bolsa de papel, sin música ni voces",
    "restrictions": "Sin subtítulos, textos añadidos, letreros legibles, logotipos (salvo la etiqueta del producto), marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 05 · 6 s · imagen inicial `broll/broll-05.jpg` — Prepara en la prensa francesa (ya viene molido)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano casi fija, con el leve temblor natural de un celular",
    "action": "vierte el agua caliente despacio en la prensa; el café molido sube y forma una espuma oscura; se ve un poco de vapor",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "product_consistency": "el producto es exactamente el de la imagen: misma forma, tamaño, colores y etiqueta (CUMBRE / CAFÉ DE ALTURA); no cambia, no se deforma y el texto de la etiqueta no se reescribe",
    "audio": "solo el sonido del agua cayendo en la prensa y el ambiente silencioso de la cocina, sin música ni voces",
    "restrictions": "Sin subtítulos, textos añadidos, letreros legibles, logotipos (salvo la etiqueta del producto), marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 06 · 6 s · imagen inicial `broll/broll-06.jpg` — Sirve el café (intenso, sin amargura)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano casi fija, con el leve temblor natural de un celular",
    "action": "el café oscuro cae desde la prensa a la taza negra, se forma una crema dorada y sube un poco de vapor",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el sonido del café cayendo en la taza, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 07 · 6 s · imagen inicial `broll/broll-07.jpg` — El ritual: primer sorbo al amanecer (selfie)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "selfie en mano con el leve movimiento natural del brazo",
    "action": "acerca la taza, sopla un poco el vapor y toma un sorbo despacio; luego mira por la ventana, tranquilo",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el ambiente silencioso de la madrugada y algún pájaro lejano, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 08 · 6 s · imagen inicial `broll/broll-08.jpg` — Entrena (entrenas / gánale al día)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara fija apoyada en el suelo",
    "action": "hace tres balanceos de kettlebell con buena técnica, respirando fuerte y enfocado",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo su respiración y el sonido del kettlebell, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 09 · 6 s · imagen inicial `broll/broll-09.jpg` — Trabaja con su taza (a la altura de tu día)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara fija apoyada en el escritorio",
    "action": "teclea unos segundos, toma la taza, da un sorbo y vuelve a escribir, concentrado",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el tecleo suave y el ambiente tranquilo, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 10 · 6 s · imagen inicial `broll/broll-10.jpg` — Cierre: bolsa y taza en el escritorio (botón)

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "acercamiento muy lento de frente a la bolsa, sin girar alrededor de ella",
    "action": "el vapor sube despacio de la taza; nada más se mueve",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "product_consistency": "el producto es exactamente el de la imagen: misma forma, tamaño, colores y etiqueta (CUMBRE / CAFÉ DE ALTURA); no cambia, no se deforma y el texto de la etiqueta no se reescribe",
    "audio": "solo el ambiente tranquilo de la mañana, sin música ni voces",
    "restrictions": "Sin subtítulos, textos añadidos, letreros legibles, logotipos (salvo la etiqueta del producto), marcas de agua, gráficos, transiciones ni filtros."
  }
}
```
