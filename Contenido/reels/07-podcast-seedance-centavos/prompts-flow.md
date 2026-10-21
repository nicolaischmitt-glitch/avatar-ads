# Reel 07 — Prompts para Google Flow (formato podcast)

Total: **8 clips · ~58 s generados** (≈ 40–45 s editado).
Cada clip se genera con la imagen de SU personaje: `p1` → `personajes/personaje-1-esceptico.jpg` · `p2` → `personajes/personaje-2-experto.jpg`.
Guarda cada resultado en `clips/` con el mismo nombre (`clip-01-p1.mp4`…).

## Clip 01 · P1 escéptico · 8 s — pregunta inicial (hook)
Imagen: personaje-1-esceptico.jpg

```json
{
  "scene": {
    "style": "grabación hiperrealista de un podcast real en estudio, apariencia raw, natural y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre de la imagen de referencia durante toda la toma",
      "cuts": "una sola toma continua, sin cortes; el personaje empieza a hablar desde el primer instante del clip",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente la misma persona de la imagen de referencia, con la misma ropa",
      "location_consistency": "mantener el mismo estudio de podcast, el mismo micrófono, los mismos objetos y la misma iluminación",
      "eye_contact": "cabeza y ojos girados en todo momento hacia su interlocutor, sentado fuera de cuadro a la derecha de la imagen, con el mismo ángulo de cabeza y la misma dirección de mirada de la imagen de referencia; le habla directamente a él durante todo el clip; nunca mira al frente, a la cámara ni al vacío"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "natural y conversacional, como una charla real entre dos personas; voz masculina media y cálida de un hombre de unos 35 años, igual en todos los clips",
      "tone": "curioso, sorprendido y un poco incrédulo",
      "facial_expression": "curiosidad y sorpresa genuina, cejas ligeramente levantadas, sin exagerar",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos naturales de conversación con una o ambas manos sobre la mesa o por encima de ella, sin tocar ni mover el micrófono",
        "synchronization": "al decir 'Oye, una pregunta', levanta ligeramente una mano con la palma abierta hacia su interlocutor; al decir 'anuncios hiperrealistas', junta los dedos de una mano como señalando algo preciso; al decir 'sin gastar una fortuna', abre ambas manos hacia los lados con expresión de duda",
        "body_language": "sentado frente al micrófono, postura relajada, ligeramente inclinado hacia su interlocutor, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Oye, una pregunta… ¿De verdad se pueden crear anuncios hiperrealistas con inteligencia artificial sin gastar una fortuna?",
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
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente a este personaje sentado frente al micrófono, hablando y gesticulando de forma natural mientras conversa con su interlocutor fuera de cuadro. Solo se escucha la voz de este personaje: sin otras voces, sin música y sin efectos de sonido."
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
    "Mantener la cabeza y la mirada giradas hacia su interlocutor, a la derecha de la imagen, durante todo el clip, como en la imagen de referencia; nunca mirar al frente, a la cámara ni al vacío.",
    "Realizar gestos visibles y naturales con las manos durante el diálogo, sin tocar el micrófono.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con naturalidad, en tono de conversación, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros, música ni elementos visuales no solicitados.",
    "Mantener la misma persona, el mismo estudio y el mismo encuadre."
  ]
}
```

## Clip 02 · P2 experto · 8 s — sí, centavos y calidad Seedance
Imagen: personaje-2-experto.jpg

```json
{
  "scene": {
    "style": "grabación hiperrealista de un podcast real en estudio, apariencia raw, natural y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre de la imagen de referencia durante toda la toma",
      "cuts": "una sola toma continua, sin cortes; el personaje empieza a hablar desde el primer instante del clip",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente la misma persona de la imagen de referencia, con la misma ropa",
      "location_consistency": "mantener el mismo estudio de podcast, el mismo micrófono, los mismos objetos y la misma iluminación",
      "eye_contact": "cabeza y ojos girados en todo momento hacia su interlocutor, sentado fuera de cuadro a la izquierda de la imagen, con el mismo ángulo de cabeza y la misma dirección de mirada de la imagen de referencia; le habla directamente a él durante todo el clip; nunca mira al frente, a la cámara ni al vacío"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "natural y conversacional, como una charla real entre dos personas; voz masculina grave, calmada y segura de un hombre de unos 38 años, igual en todos los clips",
      "tone": "seguro, tranquilo y convincente, como alguien que domina el tema",
      "facial_expression": "media sonrisa segura y expresión relajada, sin exagerar",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos naturales de conversación con una o ambas manos sobre la mesa o por encima de ella, sin tocar ni mover el micrófono",
        "synchronization": "al decir 'Sí, claro', asiente con la cabeza y abre ligeramente una mano; al decir 'me cuestan centavos', junta el pulgar y el índice indicando algo muy pequeño; al decir 'la misma calidad', pone ambas manos a la misma altura una junto a la otra; al decir 'si sabes cómo hacerlo bien', señala suavemente con el índice hacia su interlocutor",
        "body_language": "sentado frente al micrófono, postura relajada, ligeramente inclinado hacia su interlocutor, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Sí, claro. Mis videos me cuestan centavos y tienen la misma calidad que Seedance si sabes cómo hacerlo bien.",
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
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente a este personaje sentado frente al micrófono, hablando y gesticulando de forma natural mientras conversa con su interlocutor fuera de cuadro. Solo se escucha la voz de este personaje: sin otras voces, sin música y sin efectos de sonido."
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
    "Mantener la cabeza y la mirada giradas hacia su interlocutor, a la izquierda de la imagen, durante todo el clip, como en la imagen de referencia; nunca mirar al frente, a la cámara ni al vacío.",
    "Realizar gestos visibles y naturales con las manos durante el diálogo, sin tocar el micrófono.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con naturalidad, en tono de conversación, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros, música ni elementos visuales no solicitados.",
    "Mantener la misma persona, el mismo estudio y el mismo encuadre."
  ]
}
```

## Clip 03 · P2 experto · 6 s — costó 53 centavos
Imagen: personaje-2-experto.jpg

```json
{
  "scene": {
    "style": "grabación hiperrealista de un podcast real en estudio, apariencia raw, natural y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre de la imagen de referencia durante toda la toma",
      "cuts": "una sola toma continua, sin cortes; el personaje empieza a hablar desde el primer instante del clip",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente la misma persona de la imagen de referencia, con la misma ropa",
      "location_consistency": "mantener el mismo estudio de podcast, el mismo micrófono, los mismos objetos y la misma iluminación",
      "eye_contact": "cabeza y ojos girados en todo momento hacia su interlocutor, sentado fuera de cuadro a la izquierda de la imagen, con el mismo ángulo de cabeza y la misma dirección de mirada de la imagen de referencia; le habla directamente a él durante todo el clip; nunca mira al frente, a la cámara ni al vacío"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "natural y conversacional, como una charla real entre dos personas; voz masculina grave, calmada y segura de un hombre de unos 38 años, igual en todos los clips",
      "tone": "seguro, tranquilo y convincente, como alguien que domina el tema",
      "facial_expression": "media sonrisa segura y expresión relajada, sin exagerar",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos naturales de conversación con una o ambas manos sobre la mesa o por encima de ella, sin tocar ni mover el micrófono",
        "synchronization": "al decir 'De hecho, este video', señala con la palma abierta hacia abajo, hacia la mesa frente a él; al decir 'solo cincuenta y tres centavos', junta el pulgar y el índice casi tocándose y esboza una media sonrisa",
        "body_language": "sentado frente al micrófono, postura relajada, ligeramente inclinado hacia su interlocutor, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "De hecho, este video costó solo cincuenta y tres centavos.",
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
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente a este personaje sentado frente al micrófono, hablando y gesticulando de forma natural mientras conversa con su interlocutor fuera de cuadro. Solo se escucha la voz de este personaje: sin otras voces, sin música y sin efectos de sonido."
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
    "Mantener la cabeza y la mirada giradas hacia su interlocutor, a la izquierda de la imagen, durante todo el clip, como en la imagen de referencia; nunca mirar al frente, a la cámara ni al vacío.",
    "Realizar gestos visibles y naturales con las manos durante el diálogo, sin tocar el micrófono.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con naturalidad, en tono de conversación, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros, música ni elementos visuales no solicitados.",
    "Mantener la misma persona, el mismo estudio y el mismo encuadre."
  ]
}
```

## Clip 04 · P1 escéptico · 8 s — incredulidad: un dólar el segundo
Imagen: personaje-1-esceptico.jpg

```json
{
  "scene": {
    "style": "grabación hiperrealista de un podcast real en estudio, apariencia raw, natural y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre de la imagen de referencia durante toda la toma",
      "cuts": "una sola toma continua, sin cortes; el personaje empieza a hablar desde el primer instante del clip",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente la misma persona de la imagen de referencia, con la misma ropa",
      "location_consistency": "mantener el mismo estudio de podcast, el mismo micrófono, los mismos objetos y la misma iluminación",
      "eye_contact": "cabeza y ojos girados en todo momento hacia su interlocutor, sentado fuera de cuadro a la derecha de la imagen, con el mismo ángulo de cabeza y la misma dirección de mirada de la imagen de referencia; le habla directamente a él durante todo el clip; nunca mira al frente, a la cámara ni al vacío"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "natural y conversacional, como una charla real entre dos personas; voz masculina media y cálida de un hombre de unos 35 años, igual en todos los clips",
      "tone": "curioso, sorprendido y un poco incrédulo",
      "facial_expression": "curiosidad y sorpresa genuina, cejas ligeramente levantadas, sin exagerar",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos naturales de conversación con una o ambas manos sobre la mesa o por encima de ella, sin tocar ni mover el micrófono",
        "synchronization": "manteniendo la cabeza girada y la mirada fija en su interlocutor a la derecha de la imagen todo el tiempo: al decir 'Pero… ¿cómo es posible?', abre ambas manos con las palmas hacia arriba en dirección a él, incrédulo; al decir 'a mí', se toca suavemente el pecho con una mano; al decir 'casi un dólar el segundo', levanta el índice marcando la cifra mientras lo sigue mirando a los ojos",
        "body_language": "sentado frente al micrófono, postura relajada, ligeramente inclinado hacia su interlocutor, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Pero… ¿cómo es posible? A mí Seedance me cuesta casi un dólar el segundo.",
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
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente a este personaje sentado frente al micrófono, hablando y gesticulando de forma natural mientras conversa con su interlocutor fuera de cuadro. Solo se escucha la voz de este personaje: sin otras voces, sin música y sin efectos de sonido."
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
    "Mantener la cabeza y la mirada giradas hacia su interlocutor, a la derecha de la imagen, durante todo el clip, como en la imagen de referencia; nunca mirar al frente, a la cámara ni al vacío.",
    "Realizar gestos visibles y naturales con las manos durante el diálogo, sin tocar el micrófono.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con naturalidad, en tono de conversación, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros, música ni elementos visuales no solicitados.",
    "Mantener la misma persona, el mismo estudio y el mismo encuadre."
  ]
}
```

## Clip 05 · P2 experto · 10 s — el problema: desconocimiento
Imagen: personaje-2-experto.jpg

```json
{
  "scene": {
    "style": "grabación hiperrealista de un podcast real en estudio, apariencia raw, natural y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre de la imagen de referencia durante toda la toma",
      "cuts": "una sola toma continua, sin cortes; el personaje empieza a hablar desde el primer instante del clip",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente la misma persona de la imagen de referencia, con la misma ropa",
      "location_consistency": "mantener el mismo estudio de podcast, el mismo micrófono, los mismos objetos y la misma iluminación",
      "eye_contact": "cabeza y ojos girados en todo momento hacia su interlocutor, sentado fuera de cuadro a la izquierda de la imagen, con el mismo ángulo de cabeza y la misma dirección de mirada de la imagen de referencia; le habla directamente a él durante todo el clip; nunca mira al frente, a la cámara ni al vacío"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "natural y conversacional, como una charla real entre dos personas; voz masculina grave, calmada y segura de un hombre de unos 38 años, igual en todos los clips",
      "tone": "seguro, tranquilo y convincente, como alguien que domina el tema",
      "facial_expression": "media sonrisa segura y expresión relajada, sin exagerar",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos naturales de conversación con una o ambas manos sobre la mesa o por encima de ella, sin tocar ni mover el micrófono",
        "synchronization": "al decir 'Ese es justamente el problema', señala hacia su interlocutor con la mano abierta y asiente; al decir 'el noventa y nueve por ciento de las personas', abre ambas manos en un gesto amplio que abarca a mucha gente; al decir 'las herramientas más caras', sube una mano con la palma hacia abajo marcando algo alto; al decir 'por desconocimiento', gira levemente la mano con la palma hacia arriba",
        "body_language": "sentado frente al micrófono, postura relajada, ligeramente inclinado hacia su interlocutor, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Ese es justamente el problema. El noventa y nueve por ciento de las personas usan las herramientas más caras solo por desconocimiento,",
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
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente a este personaje sentado frente al micrófono, hablando y gesticulando de forma natural mientras conversa con su interlocutor fuera de cuadro. Solo se escucha la voz de este personaje: sin otras voces, sin música y sin efectos de sonido."
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
    "Mantener la cabeza y la mirada giradas hacia su interlocutor, a la izquierda de la imagen, durante todo el clip, como en la imagen de referencia; nunca mirar al frente, a la cámara ni al vacío.",
    "Realizar gestos visibles y naturales con las manos durante el diálogo, sin tocar el micrófono.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con naturalidad, en tono de conversación, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros, música ni elementos visuales no solicitados.",
    "Mantener la misma persona, el mismo estudio y el mismo encuadre."
  ]
}
```

## Clip 06 · P2 experto · 6 s — métodos económicos
Imagen: personaje-2-experto.jpg

```json
{
  "scene": {
    "style": "grabación hiperrealista de un podcast real en estudio, apariencia raw, natural y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre de la imagen de referencia durante toda la toma",
      "cuts": "una sola toma continua, sin cortes; el personaje empieza a hablar desde el primer instante del clip",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente la misma persona de la imagen de referencia, con la misma ropa",
      "location_consistency": "mantener el mismo estudio de podcast, el mismo micrófono, los mismos objetos y la misma iluminación",
      "eye_contact": "cabeza y ojos girados en todo momento hacia su interlocutor, sentado fuera de cuadro a la izquierda de la imagen, con el mismo ángulo de cabeza y la misma dirección de mirada de la imagen de referencia; le habla directamente a él durante todo el clip; nunca mira al frente, a la cámara ni al vacío"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "natural y conversacional, como una charla real entre dos personas; voz masculina grave, calmada y segura de un hombre de unos 38 años, igual en todos los clips",
      "tone": "seguro, tranquilo y convincente, como alguien que domina el tema",
      "facial_expression": "media sonrisa segura y expresión relajada, sin exagerar",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos naturales de conversación con una o ambas manos sobre la mesa o por encima de ella, sin tocar ni mover el micrófono",
        "synchronization": "al decir 'no saben que existen', abre las manos frente al torso con las palmas hacia arriba; al decir 'métodos económicos', mueve una mano suavemente hacia delante; al decir 'la misma calidad', pone ambas manos a la misma altura una junto a la otra",
        "body_language": "sentado frente al micrófono, postura relajada, ligeramente inclinado hacia su interlocutor, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "no saben que existen métodos económicos que dan la misma calidad.",
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
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente a este personaje sentado frente al micrófono, hablando y gesticulando de forma natural mientras conversa con su interlocutor fuera de cuadro. Solo se escucha la voz de este personaje: sin otras voces, sin música y sin efectos de sonido."
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
    "Mantener la cabeza y la mirada giradas hacia su interlocutor, a la izquierda de la imagen, durante todo el clip, como en la imagen de referencia; nunca mirar al frente, a la cámara ni al vacío.",
    "Realizar gestos visibles y naturales con las manos durante el diálogo, sin tocar el micrófono.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con naturalidad, en tono de conversación, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros, música ni elementos visuales no solicitados.",
    "Mantener la misma persona, el mismo estudio y el mismo encuadre."
  ]
}
```

## Clip 07 · P1 escéptico · 4 s — ¿dónde aprendo?
Imagen: personaje-1-esceptico.jpg

```json
{
  "scene": {
    "style": "grabación hiperrealista de un podcast real en estudio, apariencia raw, natural y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre de la imagen de referencia durante toda la toma",
      "cuts": "una sola toma continua, sin cortes; el personaje empieza a hablar desde el primer instante del clip",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente la misma persona de la imagen de referencia, con la misma ropa",
      "location_consistency": "mantener el mismo estudio de podcast, el mismo micrófono, los mismos objetos y la misma iluminación",
      "eye_contact": "cabeza y ojos girados en todo momento hacia su interlocutor, sentado fuera de cuadro a la derecha de la imagen, con el mismo ángulo de cabeza y la misma dirección de mirada de la imagen de referencia; le habla directamente a él durante todo el clip; nunca mira al frente, a la cámara ni al vacío"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "natural y conversacional, como una charla real entre dos personas; voz masculina media y cálida de un hombre de unos 35 años, igual en todos los clips",
      "tone": "curioso, sorprendido y un poco incrédulo",
      "facial_expression": "curiosidad y sorpresa genuina, cejas ligeramente levantadas, sin exagerar",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos naturales de conversación con una o ambas manos sobre la mesa o por encima de ella, sin tocar ni mover el micrófono",
        "synchronization": "se inclina ligeramente hacia delante con interés y abre una mano con la palma hacia arriba hacia su interlocutor al decir 'dónde puedo aprender'",
        "body_language": "sentado frente al micrófono, postura relajada, ligeramente inclinado hacia su interlocutor, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "¿Y dónde puedo aprender estos métodos?",
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
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente a este personaje sentado frente al micrófono, hablando y gesticulando de forma natural mientras conversa con su interlocutor fuera de cuadro. Solo se escucha la voz de este personaje: sin otras voces, sin música y sin efectos de sonido."
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
    "Mantener la cabeza y la mirada giradas hacia su interlocutor, a la derecha de la imagen, durante todo el clip, como en la imagen de referencia; nunca mirar al frente, a la cámara ni al vacío.",
    "Realizar gestos visibles y naturales con las manos durante el diálogo, sin tocar el micrófono.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con naturalidad, en tono de conversación, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros, música ni elementos visuales no solicitados.",
    "Mantener la misma persona, el mismo estudio y el mismo encuadre."
  ]
}
```

## Clip 08 · P2 experto · 8 s — CTA: comenta guía
Imagen: personaje-2-experto.jpg

```json
{
  "scene": {
    "style": "grabación hiperrealista de un podcast real en estudio, apariencia raw, natural y sin editar",
    "camera": {
      "shot": "plano fijo",
      "movement": "sin movimiento de cámara",
      "framing": "mantener exactamente el mismo encuadre de la imagen de referencia durante toda la toma",
      "cuts": "una sola toma continua, sin cortes; el personaje empieza a hablar desde el primer instante del clip",
      "reframing": false
    },
    "character": {
      "reference_image": true,
      "identity_consistency": "mantener exactamente la misma persona de la imagen de referencia, con la misma ropa",
      "location_consistency": "mantener el mismo estudio de podcast, el mismo micrófono, los mismos objetos y la misma iluminación",
      "eye_contact": "cabeza y ojos girados en todo momento hacia su interlocutor, sentado fuera de cuadro a la izquierda de la imagen, con el mismo ángulo de cabeza y la misma dirección de mirada de la imagen de referencia; le habla directamente a él durante todo el clip; nunca mira al frente, a la cámara ni al vacío"
    },
    "performance": {
      "language_accent": "español con acento ecuatoriano",
      "delivery": "natural y conversacional, como una charla real entre dos personas; voz masculina grave, calmada y segura de un hombre de unos 38 años, igual en todos los clips",
      "tone": "seguro, tranquilo y convincente, como alguien que domina el tema",
      "facial_expression": "media sonrisa segura y expresión relajada, sin exagerar",
      "hand_gestures": {
        "enabled": true,
        "style": "gestos naturales de conversación con una o ambas manos sobre la mesa o por encima de ella, sin tocar ni mover el micrófono",
        "synchronization": "al decir 'Tengo un documento', junta las yemas de los dedos de ambas manos formando un rectángulo pequeño; al decir 'todo mi proceso', mueve una mano en pequeños pasos de izquierda a derecha; al decir 'dile a tu audiencia', señala con la mano abierta hacia su interlocutor; al decir 'comente guía y se lo envío', hace un gesto breve de énfasis con el índice y sonríe",
        "body_language": "sentado frente al micrófono, postura relajada, ligeramente inclinado hacia su interlocutor, con movimientos fluidos de manos, muñecas y antebrazos; evitar permanecer rígido o inmóvil"
      }
    },
    "dialogue": {
      "speaker": "hombre",
      "script": "Tengo un documento donde explico todo mi proceso. Dile a tu audiencia que comente guía y se lo envío.",
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
      "rule": "No añadir subtítulos, textos, títulos, gráficos, efectos visuales, filtros, transiciones, animaciones ni elementos digitales. No aplicar edición ni postproducción. Mostrar únicamente a este personaje sentado frente al micrófono, hablando y gesticulando de forma natural mientras conversa con su interlocutor fuera de cuadro. Solo se escucha la voz de este personaje: sin otras voces, sin música y sin efectos de sonido."
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
    "Mantener la cabeza y la mirada giradas hacia su interlocutor, a la izquierda de la imagen, durante todo el clip, como en la imagen de referencia; nunca mirar al frente, a la cámara ni al vacío.",
    "Realizar gestos visibles y naturales con las manos durante el diálogo, sin tocar el micrófono.",
    "Sincronizar los gestos con el significado del discurso.",
    "Evitar manos inmóviles, brazos rígidos y movimientos robóticos.",
    "Hablar con naturalidad, en tono de conversación, en español con acento ecuatoriano.",
    "Respetar el diálogo palabra por palabra.",
    "No generar subtítulos ni ningún tipo de texto en pantalla.",
    "No añadir efectos, transiciones, filtros, música ni elementos visuales no solicitados.",
    "Mantener la misma persona, el mismo estudio y el mismo encuadre."
  ]
}
```
