# MASTER PROMPT — JSON PROMPTS PARA IMÁGENES HIPERREALISTAS (FRAMES DE AVATAR)

Estructura fija para generar **desde cero** (sin imagen de referencia) el frame inicial de un avatar con Nano Banana. Ese frame es después la imagen de referencia de los clips en Google Flow (prompts de video: `skills/master prompt para json prompts videos.txt`).
Probada por primera vez en el anuncio 03 (21 oct 2026): el resultado se ve como un video real de iPhone. Se enseña en el taller.
Prompt de ejemplo: `anuncios/03-calidad-seedance-centavos/avatar/prompt-nano-banana.json` · resultado: `…/avatar/avatar.jpg`.

## 1. Cuándo usarla
- **Es el método principal** (decisión del 21 oct 2026): crear el avatar desde cero con este JSON en **Nano Banana Pro** dio mejor calidad que partir de un frame de un UGC real y cambiar al personaje (anuncios 03 y 04).
- Partir de una referencia (una foto con el ángulo, el lugar y la luz buscados) sigue siendo una opción: se adjunta la imagen y se usa la frase opcional del `task`, creando siempre a una persona original.

## 2. Estructura fija
Conserva siempre las mismas claves, la misma jerarquía y el mismo orden. El prompt se escribe **en inglés** (Nano Banana lo sigue mejor). Solo cambian los valores marcados como **variables**.

| Bloque | Claves | Qué cambia |
|---|---|---|
| `task` | texto | Fijo: "paused vertical video recorded with the iPhone front camera… first frame of a talking-head video". Solo se ajusta el lugar ("in his office", "in her car"…) y el género. |
| `output` | `aspect_ratio`, `orientation`, `look` | Fijo: 9:16, vertical, "raw, unedited iPhone front-camera video frame, not a professional photo". |
| `subject` | `identity`, `face`, `hair`, `facial_hair`, `accessories`, `build` | **Variable**: quién es (nacionalidad, edad exacta, "original, non-famous"). La cara siempre con textura real: poros, pequeñas imperfecciones y asimetría natural. |
| `wardrobe` | `top`, `style` | **Variable**: prenda concreta (color, tela, cómo la lleva) + estilo. Siempre "natural fabric wrinkles" y "no visible logos". |
| `pose_and_expression` | `position`, `gaze`, `expression`, `hands`, `posture` | Semi-fija: mirada a la lente, expresión tranquila con media sonrisa, **boca cerrada o apenas abierta**, **manos visibles y relajadas** en la parte baja del encuadre, postura natural. |
| `environment` | `location`, `background`, `foreground`, `atmosphere` | **Variable**: el lugar, descrito con 3–5 objetos concretos (ventana, planta, silla…) + un objeto en primer plano desenfocado (laptop, volante, taza) para que se sienta grabado por él. Siempre "real, lived-in, not a staged studio set". |
| `camera` | `device`, `lens`, `framing`, `focus`, `quality` | Fijo salvo el encuadre: iPhone apoyado un poco por debajo de los ojos, gran angular de selfie (~24 mm), los ojos al ~38 % de la altura (espacio libre arriba para los gráficos), sin bokeh artificial, 1080×1920 con ruido y compresión de teléfono. |
| `lighting` | `key`, `fill`, `mood` | Semi-fija: **luz frontal pareja en toda la cara** (decisión del usuario, 21 oct 2026): la fuente principal está delante de él, detrás del teléfono (p. ej. una ventana grande frente a él), y los dos lados del rostro quedan igual de iluminados. Nunca una ventana o lámpara a un lado (deja media cara en sombra). Solo cambia la fuente según el lugar + la luz de relleno ambiente. Siempre suave, realista y de bajo contraste. |
| `realism_rules` | lista | Fija: persona real grabada con teléfono, piel sin suavizar, arrugas de tela, anatomía correcta, brillos naturales en los ojos. |
| `negative` | lista | Fija + lo específico del avatar (p. ej. "glasses" si no debe llevar lentes). Siempre: textos/logos, luz lateral o media cara en sombra, contraluz, iluminación de estudio, manos deformes, piel plástica, CGI, ropa formal si no aplica, fondo recargado, otras personas, parecido con alguien real. |

## 3. Plantilla
```json
{
  "task": "Generate one photorealistic still frame in the style of a casual vertical selfie video an original fictional [man/woman] films of [himself/herself] with [his/her] phone front camera, [LUGAR], to talk to [his/her] audience. It will be used as the first frame of a talking-head video, so it should feel candid and authentic, like a frame from an everyday phone video. [Opcional: If a reference image is attached, copy its camera angle, framing, setting and lighting, but create a completely different original person.]",
  "output": {
    "aspect_ratio": "9:16",
    "orientation": "vertical",
    "look": "raw, unedited iPhone front-camera video frame, not a professional photo"
  },
  "subject": {
    "identity": "an original, non-famous [NACIONALIDAD] [man/woman], [EDAD] years old",
    "face": "[tono de piel] with natural texture (visible pores, slight unevenness, faint under-eye lines), [ojos], [rasgos], slight natural facial asymmetry",
    "hair": "[pelo, con algún mechón suelto]",
    "facial_hair": "[barba / none]",
    "accessories": "[accesorios, o 'no glasses, no jewelry']",
    "build": "[complexión]"
  },
  "wardrobe": {
    "top": "[prenda, color, tela, cómo la lleva], natural fabric wrinkles",
    "style": "[estilo], nothing flashy, no visible logos"
  },
  "pose_and_expression": {
    "position": "[sentado/de pie, dónde], upper body leaning very slightly toward the camera",
    "gaze": "looking directly into the lens, making eye contact with the viewer",
    "expression": "calm, confident and friendly, a subtle natural half-smile, as if about to start talking; mouth closed or barely parted, relaxed jaw",
    "hands": "[dónde descansan las manos], fingers relaxed, all fingers anatomically correct and fully visible",
    "posture": "shoulders relaxed and square to the camera, natural and unposed"
  },
  "environment": {
    "location": "[el lugar y el momento del día]",
    "background": "[3–5 elementos concretos del fondo], uncluttered",
    "foreground": "[objeto en primer plano en un borde, slightly out of focus]",
    "atmosphere": "tidy, real, lived-in [lugar], not a staged studio set"
  },
  "camera": {
    "device": "iPhone front camera propped [dónde] at chest-to-eye height, slightly below eye level",
    "lens": "wide-angle selfie lens (about 24mm equivalent) with its natural mild perspective",
    "framing": "medium close-up from the waist up, subject centered horizontally; [his/her] head sits in the upper-middle of the frame (eyes at about 38% of the frame height from the top), leaving clean empty space above [his/her] head for on-screen graphics",
    "focus": "face sharp, background softly in focus as a phone would render it (no artificial heavy bokeh)",
    "quality": "1080x1920 vertical video frame, slight phone sensor noise, mild compression, true-to-life colors"
  },
  "lighting": {
    "key": "soft, diffused frontal [fuente de luz, p. ej. daylight from a large window] directly in front of [him/her], behind the phone, lighting [his/her] whole face evenly from the front",
    "fill": "[luz de relleno del lugar]",
    "mood": "bright, clean and realistic; both sides of the face equally lit with the same brightness and no side shadows, only very soft natural shading under the chin and nose; accurate skin tones, low contrast"
  },
  "realism_rules": [
    "must look like a real person recorded on a phone, not AI-generated and not a stock photo",
    "real skin texture, no smoothing, no beauty filter, no plastic or waxy skin",
    "natural fabric folds and wrinkles on the clothes",
    "correct human anatomy: two hands, five fingers each, natural proportions",
    "realistic eyes with natural catchlights from the [fuente de luz] in front of [him/her]",
    "even, symmetrical illumination on the face, as when someone films [himself/herself] facing a window"
  ],
  "negative": [
    "text, captions, subtitles, logos, watermarks, UI elements",
    "side lighting, split lighting, one half of the face darker than the other, strong shadows on one side of the face, a window beside [him/her] lighting the face from the side",
    "backlighting, silhouette, overexposed background",
    "studio lighting, ring light reflections, cinematic color grading, heavy bokeh",
    "extra or deformed fingers, distorted hands, asymmetrical eyes, warped face",
    "smooth or airbrushed skin, 3D render, cartoon, illustration, CGI look",
    "cluttered background, other people, mirrors",
    "a likeness of any real or famous person"
  ]
}
```

## 4. Por qué funciona (lo que se enseña)
1. **Se pide un frame de video, no una foto**: "paused vertical video… iPhone front camera". Así se evita la estética de stock y de estudio.
2. **Imperfección controlada**: poros, asimetría, arrugas de tela, ruido del sensor y compresión. La perfección es lo que delata a la IA.
3. **Encuadre pensado para la edición**: los ojos al ~38 % de la altura dejan espacio arriba para títulos y gráficos sin tapar la cara.
4. **Pensado para animarse en Flow**: boca cerrada (el clip no arranca a mitad de una palabra), manos visibles (Flow tiene de dónde sacar la gesticulación), cámara fija apoyada.
5. **Escenario concreto y vivido**: 3–5 objetos reales y un objeto en primer plano desenfocado, que da la sensación de "lo grabó él mismo".
6. **Negativos explícitos** de lo que suele fallar (manos, piel plástica, luz de estudio, textos).
7. **Luz frontal pareja**: la luz viene de delante (como cuando alguien se graba mirando a una ventana) y el fondo no tiene ventanas a los lados de la persona. Si la ventana aparece al lado, el modelo ilumina media cara y deja la otra en sombra (pasó en la v1 del anuncio 03). Por eso la ventana se describe "frente a él, detrás del teléfono".

8. **Ángulo según el lugar** (anuncio 04, 21 oct 2026): en una oficina, el teléfono apoyado de frente funciona. En un **carro**, el frontal con todo el volante se ve falso: mejor el selfie sostenido con la mano, un poco por encima de los ojos y en tres cuartos, sin volante ni tablero en cuadro. Pedir una expresión relajada (sonrisa leve, sin dientes); la sonrisa grande se ve posada.
9. **"Premium" hay que describirlo**: la palabra sola da un interior básico beige. Nombrar materiales y colores concretos: cuero napa coñac con costura acolchada, techo negro, techo panorámico de vidrio.
10. **Opción: partir de una referencia real**: adjuntar una foto con el ángulo, el carro y la luz buscados, y pedir que copie todo eso pero con una mujer distinta y original.

### Si el generador lo bloquea ("podría infringir nuestras políticas")
Pasó con la v1 del anuncio 04 (mujer en un carro). Evitar:
- frases que suenan a hacer pasar la imagen por real: "indistinguishable from a real recording", "not AI-generated", "a real woman". Usar "original fictional", "natural and authentic";
- conducción insegura: "seatbelt not fastened", el carro en movimiento;
- descripciones del cuerpo de una mujer ("slim", "fitted");
- mencionar a personas reales, aunque sea para negarlo ("a likeness of any real person").
Si sigue bloqueando en Flow, probar en la app de Gemini o en Google AI Studio.

## 5. Al generar
1. Usa **Nano Banana Pro** y pon 9:16 también en su interfaz (algunos modos ignoran el aspect ratio del JSON).
2. Genera 4 variaciones y revisa con lupa las manos, los ojos, los dientes, la textura de la piel y el texto del fondo (no debe haber letras inventadas).
3. Guarda la elegida en la carpeta del anuncio o del reel (`avatar/avatar.jpg`). Es el primer frame de todos los clips de esa toma.
