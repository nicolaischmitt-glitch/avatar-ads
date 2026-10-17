# Reel 01 — Prompts JSON para Google Flow

**Total: 8 clips · duración estimada ≈ 56 s** (estimación de producción; el modelo no garantiza duración ni pronunciación exactas)

Imagen de referencia: `recursos/frame-avatar.jpg` · Idioma y acento en todos los clips: español con acento ecuatoriano

## Clip 1 — Hook: el problema de los videos falsos · 6 s

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
        "style": "gestos visibles, espontáneos y naturales con la mano libre frente al torso, mientras la otra mano sostiene el plátano como micrófono",
        "synchronization": "al decir 'si tus videos con IA se ven falsos', inclina ligeramente la cabeza y abre la mano libre con la palma hacia arriba mientras mantiene el plátano cerca de la boca como micrófono; al decir 'es porque los estás creando así', señala suavemente hacia la cámara con la mano libre",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Si tus videos con IA se ven falsos, es porque los estás creando así.",
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
    "Realizar gestos visibles y naturales con la mano libre durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre.",
    "Sostener el plátano durante todo el video en la misma mano que en la imagen de referencia, cerca de la boca, y usarlo como si fuera un micrófono. No cambiarlo de mano, no soltarlo ni apartarlo de la boca. Gesticular solo con la mano libre."
  ]
}
```

## Clip 2 — Forma incorrecta: pasos uno y dos · 8 s

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
        "style": "gestos visibles, espontáneos y naturales con la mano libre frente al torso, mientras la otra mano sostiene el plátano como micrófono",
        "synchronization": "al decir 'paso uno', levanta un dedo de la mano libre; al decir 'una imagen desde cero', dibuja un pequeño rectángulo en el aire con la mano libre; al decir 'paso dos', levanta dos dedos; al decir 'conviertes esa imagen en video', gira la mano libre hacia delante como si transformara algo",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Paso uno: le pides a ChatGPT una imagen desde cero. Paso dos: conviertes esa imagen en video.",
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
    "Realizar gestos visibles y naturales con la mano libre durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre.",
    "Sostener el plátano durante todo el video en la misma mano que en la imagen de referencia, cerca de la boca, y usarlo como si fuera un micrófono. No cambiarlo de mano, no soltarlo ni apartarlo de la boca. Gesticular solo con la mano libre."
  ]
}
```

## Clip 3 — Por qué se ve falso · 6 s

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
        "style": "gestos visibles, espontáneos y naturales con la mano libre frente al torso, mientras la otra mano sostiene el plátano como micrófono",
        "synchronization": "al decir 'ese es el problema', lleva la mano libre al pecho con un gesto breve; al decir 'inventa todo desde cero', abre la mano libre hacia el lado en un gesto amplio; al decir 'parece IA', hace un breve gesto de negación con la mano libre",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Ese es el problema: si la IA inventa todo desde cero, parece IA.",
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
    "Realizar gestos visibles y naturales con la mano libre durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre.",
    "Sostener el plátano durante todo el video en la misma mano que en la imagen de referencia, cerca de la boca, y usarlo como si fuera un micrófono. No cambiarlo de mano, no soltarlo ni apartarlo de la boca. Gesticular solo con la mano libre."
  ]
}
```

## Clip 4 — Forma correcta: paso uno · 8 s

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
        "style": "gestos visibles, espontáneos y naturales con la mano libre frente al torso, mientras la otra mano sostiene el plátano como micrófono",
        "synchronization": "al decir 'si quieres hiperrealismo, hazlo así', mueve la mano libre con firmeza hacia delante; al decir 'paso uno', levanta un dedo de la mano libre; al decir 'busca un video real de referencia', señala ligeramente hacia un lado como si mostrara algo",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Si quieres hiperrealismo, hazlo así. Paso uno: busca un video real de referencia que te guste.",
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
    "Realizar gestos visibles y naturales con la mano libre durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre.",
    "Sostener el plátano durante todo el video en la misma mano que en la imagen de referencia, cerca de la boca, y usarlo como si fuera un micrófono. No cambiarlo de mano, no soltarlo ni apartarlo de la boca. Gesticular solo con la mano libre."
  ]
}
```

## Clip 5 — Paso dos: qué observar y capturar · 8 s

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
        "style": "gestos visibles, espontáneos y naturales con la mano libre frente al torso, mientras la otra mano sostiene el plátano como micrófono",
        "synchronization": "al decir 'el ángulo, la luz, la postura y los objetos', cuenta con los dedos de la mano libre un elemento por palabra; al decir 'paso dos', levanta dos dedos; al decir 'haz captura de ese momento', hace un gesto breve como si tomara una foto con la mano libre",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Fíjate en el ángulo, la luz, la postura y los objetos. Paso dos: haz captura de ese momento.",
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
    "Realizar gestos visibles y naturales con la mano libre durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre.",
    "Sostener el plátano durante todo el video en la misma mano que en la imagen de referencia, cerca de la boca, y usarlo como si fuera un micrófono. No cambiarlo de mano, no soltarlo ni apartarlo de la boca. Gesticular solo con la mano libre."
  ]
}
```

## Clip 6 — Paso tres: cambiar al personaje · 6 s

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
        "style": "gestos visibles, espontáneos y naturales con la mano libre frente al torso, mientras la otra mano sostiene el plátano como micrófono",
        "synchronization": "al decir 'paso tres', levanta tres dedos de la mano libre; al decir 'cambiar al personaje', gira la mano libre de un lado a otro como si intercambiara algo; al decir 'sin tocar la escena', abre la mano libre con la palma hacia abajo en un gesto de calma",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Paso tres: usa ChatGPT solo para cambiar al personaje, sin tocar la escena.",
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
    "Realizar gestos visibles y naturales con la mano libre durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre.",
    "Sostener el plátano durante todo el video en la misma mano que en la imagen de referencia, cerca de la boca, y usarlo como si fuera un micrófono. No cambiarlo de mano, no soltarlo ni apartarlo de la boca. Gesticular solo con la mano libre."
  ]
}
```

## Clip 7 — Paso cuatro y revelación · 8 s

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
        "style": "gestos visibles, espontáneos y naturales con la mano libre frente al torso, mientras la otra mano sostiene el plátano como micrófono",
        "synchronization": "al decir 'paso cuatro', levanta cuatro dedos de la mano libre; al decir 'sube esa imagen', eleva ligeramente la mano libre; al decir 'un prompt JSON estructurado', marca el ritmo con la mano libre de forma ordenada; al decir 'así hice este video', sonríe con complicidad sin apartar el plátano de la boca",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Paso cuatro: sube esa imagen a Google Flow y anímala con un prompt JSON estructurado. Así hice este video.",
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
    "Realizar gestos visibles y naturales con la mano libre durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre.",
    "Sostener el plátano durante todo el video en la misma mano que en la imagen de referencia, cerca de la boca, y usarlo como si fuera un micrófono. No cambiarlo de mano, no soltarlo ni apartarlo de la boca. Gesticular solo con la mano libre."
  ]
}
```

## Clip 8 — CTA: comenta PROMPT · 6 s

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
        "style": "gestos visibles, espontáneos y naturales con la mano libre frente al torso, mientras la otra mano sostiene el plátano como micrófono",
        "synchronization": "al decir 'comenta PROMPT', señala hacia abajo con la mano libre con un gesto breve de énfasis; al decir 'te envío el prompt', mueve la mano libre hacia la cámara como si entregara algo; al decir 'para generar estos videos', abre la mano libre con una sonrisa natural",
        "body_language": "postura relajada y dinámica, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Comenta PROMPT y te envío el prompt que uso para generar estos videos.",
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
    "Realizar gestos visibles y naturales con la mano libre durante el diálogo.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con energía y naturalidad, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros ni elementos visuales no solicitados.",
    "Mantener el mismo avatar, la misma ubicación y el mismo encuadre.",
    "Sostener el plátano durante todo el video en la misma mano que en la imagen de referencia, cerca de la boca, y usarlo como si fuera un micrófono. No cambiarlo de mano, no soltarlo ni apartarlo de la boca. Gesticular solo con la mano libre."
  ]
}
```

---
Deja los videos generados en `clips/` como `clip-01.mp4` … `clip-08.mp4`.
