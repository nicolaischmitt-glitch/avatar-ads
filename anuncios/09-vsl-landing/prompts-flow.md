# Anuncio 09 · VSL de la landing — Prompts para Google Flow

Voz: **12 clips · 104 s** generados (≈ 1:35–1:40 editado). Imagen de referencia de todos: `avatar/avatar.jpg`.
B-rolls: **9**, de 6 s cada uno. Validados con `validar-json.mjs` (sin variables autorizadas: voz de hombre).
Guarda los clips como `clips/clip-01.mp4` … y los B-rolls: primero el frame (`broll/broll-01.jpg`) y después el video (`clips/broll-01.mp4`).

---

# Paso 1 · Imagen del avatar (Nano Banana Pro, 9:16)

Genera 4 variaciones con este prompt y guarda la elegida como `avatar/avatar.jpg`. Es la imagen de referencia de todos los clips de voz.

```json
{
  "task": "Generate one photorealistic still frame in the style of a casual vertical selfie video an original fictional man films of himself with his phone front camera, in his office, to talk to his audience. It will be used as the first frame of a talking-head video, so it should feel candid and authentic, like a frame from an everyday phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone front-camera video frame, not a professional photo"
  },
  "subject": {
    "identity": "an original, non-famous Ecuadorian man (Latin American mestizo), 38 years old",
    "face": "medium tan skin with natural texture (visible pores, slight unevenness, faint under-eye lines and light expression lines on the forehead), dark brown eyes, friendly and expressive features, slight natural facial asymmetry",
    "hair": "short dark brown hair, slightly longer on top and combed back naturally, short on the sides, a few loose strands",
    "facial_hair": "light, even stubble, about three days, natural edges",
    "accessories": "thin black rectangular glasses with clear lenses, simple steel wristwatch on the left wrist, no other jewelry",
    "build": "average, healthy build"
  },
  "wardrobe": {
    "top": "navy blue button-up shirt in matte cotton, top button undone, sleeves buttoned at the wrists, natural fabric wrinkles",
    "style": "smart casual entrepreneur, polished but relaxed, nothing flashy, no visible logos"
  },
  "pose_and_expression": {
    "position": "seated at his desk, upper body leaning very slightly toward the camera",
    "gaze": "looking directly into the lens, making eye contact with the viewer",
    "expression": "calm, confident and friendly, a subtle natural half-smile, as if about to start talking; mouth closed or barely parted, relaxed jaw",
    "hands": "both hands resting loosely on the desk in front of him in the lower part of the frame, fingers relaxed and slightly apart, all fingers anatomically correct and fully visible",
    "posture": "shoulders relaxed and square to the camera, natural and unposed"
  },
  "environment": {
    "location": "his own modern, bright office in a business building, during the day",
    "background": "a warm white wall, a light oak shelf behind him with a few plain closed binders without labels, a small ceramic pot with a green plant and a ceramic mug, a black ergonomic office chair, a glass partition far in the background showing a softly lit empty hallway; uncluttered; no window visible at his sides",
    "foreground": "an open silver laptop at the bottom right edge of the frame, its screen facing him and not visible, slightly out of focus, on a light oak desk",
    "atmosphere": "tidy, real, lived-in workspace, not a staged studio set"
  },
  "camera": {
    "device": "iPhone front camera propped on the desk at chest-to-eye height, slightly below eye level",
    "lens": "wide-angle selfie lens (about 24mm equivalent) with its natural mild perspective",
    "framing": "medium close-up from the waist up, subject centered horizontally; his head sits in the upper-middle of the frame (eyes at about 38% of the frame height from the top), leaving clean empty wall above his head for on-screen graphics",
    "focus": "face sharp, background softly in focus as a phone would render it (no artificial heavy bokeh)",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft, diffused frontal daylight from a large window directly in front of him, behind the phone, lighting his whole face evenly from the front",
    "fill": "neutral white overhead office lights that brighten the room evenly",
    "mood": "bright, clean and realistic; both sides of the face equally lit with the same brightness and no side shadows, only very soft natural shading under the chin and nose; accurate skin tones, low contrast"
  },
  "realism_rules": [
    "must look like an ordinary person recorded on a phone, natural and authentic, not a stock photo",
    "real skin texture, no smoothing, no beauty filter, no plastic or waxy skin",
    "natural fabric folds and wrinkles on the shirt",
    "correct human anatomy: two hands, five fingers each, natural proportions",
    "realistic eyes behind the glasses with natural catchlights from the window in front of him, only faint natural reflections on the lenses",
    "even, symmetrical illumination on the face, as when someone films himself facing a window"
  ],
  "negative": [
    "text, captions, subtitles, logos, watermarks, UI elements, readable labels on the binders",
    "side lighting, split lighting, one half of the face darker than the other, strong shadows on one side of the face, a window beside him lighting the face from the side",
    "backlighting, silhouette, overexposed background",
    "studio lighting, ring light reflections, cinematic color grading, heavy bokeh",
    "strong glare on the glasses hiding the eyes",
    "extra or deformed fingers, distorted hands, asymmetrical eyes, warped face",
    "smooth or airbrushed skin, 3D render, cartoon, illustration, CGI look",
    "suit and tie, formal wear, flashy clothes, visible brand logos",
    "cluttered background, other people, mirrors"
  ]
}
```

---

# Paso 2 · Clips de voz (Google Flow, con avatar/avatar.jpg)

## Clip 01 · 10 s — Hook: lo que cuesta encontrar un ganador

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
        "synchronization": "al decir 'Encontrar un anuncio ganador', levanta el índice como si señalara uno solo; al decir 'entre diez y treinta videos', separa las manos poco a poco como mostrando una cantidad que crece; al decir 'semanas de trabajo', inclina un poco la cabeza y abre una palma; al decir 'miles de dólares', frota el pulgar con el índice y el medio en gesto de dinero",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Encontrar un anuncio ganador te cuesta entre diez y treinta videos. Con el método tradicional, eso son semanas de trabajo y miles de dólares.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 02 · 8 s — El costo del método tradicional

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
        "synchronization": "al decir 'Planeación, creadores, grabación, editores', cuenta con los dedos de una mano uno, dos, tres y cuatro; al decir 'herramientas de inteligencia artificial que cobran una fortuna', abre ambas manos con las palmas hacia arriba en gesto de incredulidad; al decir 'por un solo video', levanta un solo dedo",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Planeación, creadores, grabación, editores. O herramientas de inteligencia artificial que cobran una fortuna por un solo video.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 03 · 8 s — El costo en tiempo

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
        "synchronization": "al decir 'si lo haces tú mismo', señala suavemente hacia la cámara con la palma abierta; al decir 'te pasas horas grabándote y editando', gira las manos una sobre otra como algo que no termina; al decir 'en vez de vender', mueve ambas manos hacia delante con énfasis",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Y si lo haces tú mismo, te pasas horas grabándote y editando, en vez de vender.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 04 · 10 s — La solución: el Sistema Avatar Ads

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
        "synchronization": "al decir 'Por eso creamos el Sistema Avatar Ads', abre las manos hacia delante como presentando algo; al decir 'un sistema automatizado', gira una mano en un pequeño círculo como un engranaje; al decir 'en volumen', separa bien las manos hacia los lados; al decir 'menos de un dólar cada uno', junta el índice y el pulgar casi tocándose",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Por eso creamos el Sistema Avatar Ads: un sistema automatizado que crea anuncios hiperrealistas, en volumen, y por menos de un dólar cada uno.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 05 · 10 s — Cómo funciona: ángulos y guiones

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
        "synchronization": "al decir 'Primero', levanta un dedo; al decir 'los mejores ángulos de venta', inclina la mano abierta hacia un lado como señalando una dirección; al decir 'Luego', levanta dos dedos; al decir 'escribe guiones', mueve brevemente la mano como si escribiera en el aire; al decir 'miles de anuncios ganadores', abre ambas manos de forma amplia",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Primero, encuentra los mejores ángulos de venta para tu producto. Luego, escribe guiones con la estructura de miles de anuncios ganadores.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 06 · 10 s — Cómo funciona: avatar, escenas, edición

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
        "synchronization": "al decir 'Crea tu avatar realista', se señala a sí mismo con ambas manos y sonríe; al decir 'Genera las escenas y los videos', mueve las manos de un lado a otro como colocando escenas en fila; al decir 'Edita el anuncio por completo', junta las manos como cerrando algo; al decir 'listo para probar', abre las palmas hacia la cámara como si lo entregara",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Crea tu avatar realista. Genera las escenas y los videos. Edita el anuncio por completo. Y te lo entrega listo para probar.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 07 · 8 s — Para qué negocios sirve

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
        "synchronization": "al decir 'cualquier tipo de negocio', abre ambos brazos hacia los lados; al decir 'productos digitales, productos físicos o servicios tradicionales', cuenta con los dedos uno, dos y tres",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Y funciona para cualquier tipo de negocio. Si vendes productos digitales, productos físicos o servicios tradicionales,",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 08 · 6 s — Para qué negocios sirve (leads)

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
        "synchronization": "al decir 'o si necesitas generar leads', levanta un cuarto dedo y luego mueve la mano hacia sí como atrayendo algo; al decir 'el sistema crea el anuncio que tu oferta necesita', mueve una mano hacia delante con énfasis y asiente",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "o si necesitas generar leads, el sistema crea el anuncio que tu oferta necesita.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 09 · 8 s — Más que realismo: estructuras para vender

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
        "synchronization": "al decir 'No son solo anuncios que parecen reales', niega suavemente con el índice; al decir 'estructuras probadas', pone una palma sobre la otra como apilando niveles; al decir 'para escalar rápido', sube una mano en diagonal hacia arriba",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "No son solo anuncios que parecen reales. Son anuncios con estructuras probadas para escalar rápido.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 10 · 8 s — Oferta: el sistema y sus actualizaciones

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
        "synchronization": "al decir 'el sistema es tuyo para siempre', extiende la palma hacia la cámara como ofreciéndolo; al decir 'con todas sus actualizaciones', gira la mano hacia delante como algo que avanza; al decir 'cambia cada semana', mueve ambas manos alternándolas",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Además, el sistema es tuyo para siempre, con todas sus actualizaciones, porque la inteligencia artificial cambia cada semana.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 11 · 10 s — Oferta: curso, clases y soporte

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
        "synchronization": "al decir 'acceso vitalicio al curso paso a paso', baja la mano en pequeños escalones; al decir 'clases en vivo', se lleva una mano al pecho; al decir 'soporte para que revisemos tus anuncios', abre ambas palmas hacia la cámara; al decir 'te demos feedback', asiente con la mano abierta",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Y tienes acceso vitalicio al curso paso a paso, clases en vivo y soporte para que revisemos tus anuncios y te demos feedback.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "No generar sonido ambiente, ruido de fondo, música ni efectos de sonido: solo la voz del avatar.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre."
  ]
}
```

## Clip 12 · 8 s — CTA: el botón de abajo

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
        "synchronization": "al decir 'Si quieres tu propia máquina de anuncios', abre las manos hacia la cámara; al decir 'toca el botón de abajo', señala hacia abajo con el índice; al decir 'mira todo lo que incluye', sonríe y abre una palma",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Si quieres tu propia máquina de anuncios, toca el botón de abajo y mira todo lo que incluye.",
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
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
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

## B-roll 01 · Semanas de trabajo (noche en el escritorio) · clip 01 → guárdala como `broll/broll-01.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close shot of a messy home-office desk late at night, a man's hands rubbing his tired eyes behind a laptop. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "a man's forearms and hands in a wrinkled grey t-shirt, one hand rubbing his eyes, his face mostly hidden by the hand and cropped at the top of the frame",
  "environment": {
    "location": "a small home office at night",
    "details": "an open laptop with a blurred unreadable screen, two empty coffee mugs, scattered printed papers with blurred unreadable text, a phone face down, a desk lamp",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, from the side and slightly above, the desk filling the lower half",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "warm light from a desk lamp in front of him and the cold glow of the laptop screen, the room dark around",
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
    "his face clearly visible",
    "readable screen or papers"
  ]
}
```

## B-roll 02 · Creadora grabando con aro de luz · clip 02 ('creadores, grabación') → guárdala como `broll/broll-02.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: an over-the-shoulder shot of a young woman content creator setting up a phone on a tripod with a ring light in a small room. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the back of her head and shoulder (face not visible), long dark hair in a loose bun, her hand adjusting the phone on the tripod",
  "environment": {
    "location": "a small bedroom turned into a recording corner, during the day",
    "details": "a ring light, a phone on a tripod with its screen out of focus, a plain wall, a small table with a skincare bottle without label, a tangled cable on the floor",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, over her shoulder, the phone and ring light in the center",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the ring light on in front of her plus soft daylight from a window behind the camera",
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
    "readable screen",
    "a label or brand on the bottle"
  ]
}
```

## B-roll 03 · Editor en su computadora · clip 02 ('editores') → guárdala como `broll/broll-03.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close shot of a video editor's hands on a keyboard and mouse in front of a large monitor. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "a man's hands with a dark hoodie sleeve, one hand on the mouse and the other on the keyboard",
  "environment": {
    "location": "a dim editing room in the evening",
    "details": "a large monitor with a blurred unreadable editing timeline in soft colors, headphones on the desk, an energy drink can without label, sticky notes without writing",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, from behind and to the side of his hands, the monitor glowing softly out of focus",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "the soft glow of the monitor in front of him and a small warm lamp, the room dim",
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
    "readable screen, readable timeline or interface",
    "his face"
  ]
}
```

## B-roll 04 · Grabándose a sí mismo otra vez · clip 03 → guárdala como `broll/broll-04.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a shot from behind of a man sitting on a sofa in front of his phone on a small tripod, about to record himself again. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the back of a man's head and shoulders in a casual blue shirt (face not visible), his arm reaching toward the phone",
  "environment": {
    "location": "a living room at home, in the afternoon",
    "details": "a phone on a small tripod on a coffee table with its screen out of focus, a notebook with blurred handwriting, a glass of water, a cushion",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, from behind his shoulder, the phone in the center of the frame",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft daylight from a window in front of him, behind the phone",
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
    "his face visible",
    "readable screen or writing"
  ]
}
```

## B-roll 05 · El avatar trabajando en su laptop · clip 04 ('Por eso creamos el Sistema') · adjunta `avatar/avatar.jpg` → guárdala como `broll/broll-05.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close-up of the same man's hands typing on his open silver laptop at his desk. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad. The attached reference image shows the same person and place: keep her or his exact face, skin, hair, clothes, the place and the light, as if this frame came from the same phone video.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the hands, wristwatch and navy shirt sleeves of the man in the reference image, typing on the laptop keyboard; his face is out of frame",
  "environment": {
    "location": "the same office as in the reference image, during the day",
    "details": "the light oak desk, the silver laptop with its screen out of focus and unreadable, a ceramic mug, the plant on the shelf softly in the background",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, from the side at desk height, the keyboard and his hands in the center",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft daylight from the window in front of him, as in the reference image",
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
    "readable screen",
    "his face"
  ]
}
```

## B-roll 06 · Producto digital: trabajando en un café · clip 07 → guárdala como `broll/broll-06.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: an over-the-shoulder shot of a young woman working on her laptop in a neighborhood café. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "her shoulder and the side of her head (face not visible), headphones around her neck, her hands on the laptop trackpad",
  "environment": {
    "location": "a small neighborhood café, in the morning",
    "details": "a laptop with a blurred unreadable screen, a cup of coffee, a croissant on a small plate, a wooden table with slight scratches, plants in the background",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, over the shoulder, the laptop screen out of focus",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft daylight from the café window in front of her, behind the laptop",
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
    "readable screen",
    "café signs or menus with text"
  ]
}
```

## B-roll 07 · Producto físico: empacando un pedido · clip 07 → guárdala como `broll/broll-07.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close shot of a person's hands sealing a cardboard shipping box with packing tape on a work table. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "a woman's hands with a few simple rings, sealing a plain brown cardboard box with a tape dispenser",
  "environment": {
    "location": "a small home business packing corner, during the day",
    "details": "a stack of plain cardboard boxes without labels, crinkled kraft paper, a roll of tape, a pair of scissors, small plain product boxes without branding",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, from slightly above, the box in the center",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft daylight from a window in front of the table",
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
    "labels, printed logos or shipping labels with text",
    "her face"
  ]
}
```

## B-roll 08 · Servicio tradicional: barbería de barrio · clip 07 → guárdala como `broll/broll-08.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: a close shot of a barber's hands trimming the hair of a client in a neighborhood barbershop. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "the barber's hands with a comb and scissors working on the back of the client's head (no faces visible), the client wearing a black barber cape",
  "environment": {
    "location": "a small, slightly worn neighborhood barbershop, during the day",
    "details": "a classic barber chair, combs and clippers on a counter, a spray bottle, hair on the cape, a mirror only partially and softly out of focus without reflections of faces",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, from behind and slightly to the side of the client's head",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft daylight from the shop's front window, in front of the barber",
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
    "faces visible, reflections of faces in the mirror",
    "signs or posters with text"
  ]
}
```

## B-roll 09 · Clase en vivo desde casa · clip 11 → guárdala como `broll/broll-09.jpg`

```json
{
  "task": "Generate one photorealistic still frame from a casual vertical video someone recorded with an iPhone: an over-the-shoulder shot of a man taking notes while watching an online class on his laptop at home in the evening. It will be the first frame of a short B-roll clip, so it must feel candid and authentic, like a frame from an everyday phone video, not a stock photo or an ad.",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone video frame, not a professional photo"
  },
  "subject": "his shoulder and the side of his head (face not visible), one hand writing in a notebook next to the laptop",
  "environment": {
    "location": "a home desk in the evening",
    "details": "a laptop with a blurred unreadable screen, an open notebook with blurred handwriting, a pen, a cup of tea, a small desk lamp",
    "atmosphere": "real, lived-in and slightly imperfect, like a real everyday place, not a staged set or a showroom"
  },
  "camera": {
    "device": "iPhone main camera, handheld, at a natural human height",
    "framing": "vertical, over the shoulder, the laptop and notebook in frame, the screen out of focus",
    "focus": "natural phone depth of field, no artificial heavy bokeh",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "a warm desk lamp in front of him and the soft glow of the laptop screen",
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
    "his face visible",
    "readable screen or writing",
    "faces on the screen"
  ]
}
```

---

# Paso 4 · Videos de los B-rolls (Google Flow, sin diálogo)

Sube el frame elegido como imagen inicial y pega el JSON. Guarda cada video como `clips/broll-01.mp4`, `clips/broll-02.mp4`…

## B-roll 01 · 6 s · imagen inicial `broll/broll-01.jpg` — Semanas de trabajo (noche en el escritorio) · clip 01

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano muy estable, casi fija",
    "action": "se frota los ojos con cansancio, suspira y deja caer la mano sobre el escritorio",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo un suspiro suave y el zumbido leve de la laptop, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 02 · 6 s · imagen inicial `broll/broll-02.jpg` — Creadora grabando con aro de luz · clip 02 ('creadores, grabación')

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano muy estable, con un acercamiento lento",
    "action": "ajusta la altura del teléfono en el trípode y lo inclina un poco",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el clic del trípode y sonido ambiente suave, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 03 · 6 s · imagen inicial `broll/broll-03.jpg` — Editor en su computadora · clip 02 ('editores')

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara casi fija con un deslizamiento lateral muy lento",
    "action": "mueve el ratón y pulsa varias teclas con rapidez, como cortando un video",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo clics de ratón y teclado, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 04 · 6 s · imagen inicial `broll/broll-04.jpg` — Grabándose a sí mismo otra vez · clip 03

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano muy estable, casi fija",
    "action": "estira la mano, toca el teléfono para volver a grabar y baja la mano con resignación",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave de casa, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 05 · 6 s · imagen inicial `broll/broll-05.jpg` — El avatar trabajando en su laptop · clip 04 ('Por eso creamos el Sistema')

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano muy estable, con un acercamiento lento",
    "action": "escribe con calma en el teclado y pulsa una última tecla con decisión",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente a la misma persona (cara, piel, pelo y ropa), el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el sonido suave del teclado, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 06 · 6 s · imagen inicial `broll/broll-06.jpg` — Producto digital: trabajando en un café · clip 07

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano muy estable, con un acercamiento lento",
    "action": "desliza el dedo por el trackpad y toma un sorbo de café",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo sonido ambiente suave de café, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 07 · 6 s · imagen inicial `broll/broll-07.jpg` — Producto físico: empacando un pedido · clip 07

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara casi fija con un acercamiento muy lento",
    "action": "pasa el dispensador de cinta sobre la caja y la sella con un movimiento rápido",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el sonido de la cinta adhesiva y el cartón, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 08 · 6 s · imagen inicial `broll/broll-08.jpg` — Servicio tradicional: barbería de barrio · clip 07

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano muy estable, casi fija",
    "action": "peina un mechón y lo corta con las tijeras con un movimiento preciso",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el sonido de las tijeras y ambiente suave del local, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```

## B-roll 09 · 6 s · imagen inicial `broll/broll-09.jpg` — Clase en vivo desde casa · clip 11

```json
{
  "scene": {
    "duration_seconds": 6,
    "reference_image": true,
    "start_frame": "usar la imagen de referencia como primer fotograma exacto",
    "style": "video real grabado con un iPhone, apariencia raw y sin editar",
    "camera_movement": "cámara en mano muy estable, con un acercamiento lento",
    "action": "escribe una línea en la libreta y levanta la mirada hacia la laptop",
    "motion": "movimiento sutil, realista y a velocidad natural; nada se deforma ni cambia de forma",
    "consistency": "mantener exactamente el lugar, los objetos, los colores y la luz de la imagen; no añadir objetos ni personas nuevas",
    "audio": "solo el sonido suave del bolígrafo sobre el papel, sin música ni voces",
    "restrictions": "Sin subtítulos, textos, letreros legibles, logotipos, marcas de agua, gráficos, transiciones ni filtros."
  }
}
```
