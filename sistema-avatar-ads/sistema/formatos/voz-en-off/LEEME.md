# Formato · Voz en off + B-rolls (anuncio UGC narrado)

Una voz cuenta una historia en primera persona y **los B-rolls la muestran**: la persona en su rutina, el producto, cómo se usa y el resultado. Cortes secos, subtítulos naturales y un solo botón al final. Nadie habla a cámara, así que no hay que cuidar la sincronía de labios ni la continuidad de una toma. Se ve muy realista: parece un video que alguien grabó de su día.

## Cuándo usarlo
- **Producto físico, skincare, ecommerce**: el producto y su uso son los protagonistas (gotas, textura, aplicación, resultado).
- Historias **problema → solución** contadas como testimonio.
- **Variación barata de un anuncio ganador**: el mismo guion de un head talking, con la voz y los B-rolls. Del mismo material salen dos anuncios para testear.
- Menos indicado cuando lo que vende es la autoridad de una persona a cámara (experto, marca personal): ahí va mejor head talking.

## Cómo encaja en el flujo de `avatar-ads-anuncio`
Los 9 pasos son los mismos; cambia lo siguiente:

### 3 · Guion
- 30–40 s, ~90 palabras, en primera persona, con historia: **problema que se siente → lo que ya probó → descubrimiento → demostración → cómo se ve ahora → CTA**. La emoción sale de contar algo que le pasaba, no de describir el producto.
- Cada frase tiene que poder **mostrarse** con un B-roll. Si no se puede filmar, se cambia.
- Sin cifras ni promesas de resultado ("en 7 días", "elimina manchas").

### 4 · Avatar y producto
- **La persona igual se crea como avatar** (imagen 9:16) aunque no hable: es la referencia de su cara en todos los B-rolls donde sale.
- Este formato casi siempre cuenta un antes y después o un día que avanza: revisa si hacen falta **looks** (sección 8 de `master-prompt-imagen.md`). Por ejemplo, "un día en su vida": la misma persona recién levantada en casa, entrenando y en la oficina = 3 looks, y cada B-roll lleva `"look"` con su lugar en `location`. Si el anuncio muestra un producto físico, primero el producto LOCKED IN (sección 7 de `master-prompt-imagen.md`).

### 5 · Paquete de prompts
- `clips-plan.json` **sin `clips`** (no hay clips de voz en Flow): el paquete queda en Paso 0 (producto, si hay) → Paso 1 (avatar) → Paso 3 y 4 (B-rolls).
- **6–10 B-rolls, uno por idea del guion y en su orden, de 4 o 6 s:** aquí son lo principal, así que cada uno dura según la frase que sostiene (regla de duración en el paso 5 de `avatar-ads-anuncio`: hasta ~9 palabras → 4 s; más, o una acción que necesita tiempo → 6 s). Mezcla: la persona (con el problema, usando el producto, el resultado) con `"mismaPersona": true` + `"referencia": "avatar/avatar.jpg"`; el producto (en la mano, en el lugar) con `"producto": true`; el uso en macro (gotas, textura); y la situación del problema (lo que no le funcionó).
- Cuando ella sale "mirándose al espejo", la cámara está donde está el espejo: sin marco ni reflejo visible.
- La última toma es el producto con espacio libre para el botón.

### La voz (Google AI Studio, gratis)
La voz se genera aparte y va primero, porque marca el tiempo de todo.
1. Entra a Google AI Studio → **Playground** → modo **Composer** → modelo **Gemini 3.1 Flash TTS Preview** (`gemini-3.1-flash-tts-preview`). Temperatura 1. Un solo speaker.
2. **Elige la voz** en Speaker settings (es una variable: cambia en cada anuncio según la persona). Prueba 2–3 de tono tranquilo y cercano (p. ej. Callirrhoe, Achernar, Sulafat, Vindemiatrix, Despina) y evita las "bright / upbeat / breezy", que suenan más a locución.
3. Escribe la **Scene** (en inglés: quién habla, dónde y cómo se graba). Plantilla:
   > A [EDAD]-year-old [woman/man] sits in [LUGAR, el mismo de los B-rolls] and records a voice note on [her/his] phone, holding it close, in a quiet room. [She/He] is not reading a script: [she/he] is just telling a friend, in [her/his] own words, what happened with [el problema]. Plain, relaxed, everyday moment. No studio, no microphone, no production.
4. Escribe el **Sample Context** (en inglés: idioma, acento, tono, ritmo y la curva emocional del guion). Plantilla:
   > Speak in neutral Latin American Spanish with no regional accent: not Mexican, not Argentine, not from Spain, no sing-song or posh intonation. [Si el público es de un país concreto: "with a [colombiano…] accent" en lugar de lo anterior.] [Her/His] normal everyday speaking voice, as if talking to one friend, not to an audience. Calm, unhurried, natural pace (a normal conversation speed, never fast), relaxed and slightly low energy, with the small pauses and soft breaths of real speech. Flat, natural intonation: no announcer melody, no emphasis on product words, no selling tone, no smiling-voice. It must never sound like a commercial, a voice-over or a TikTok ad. [Curva emocional en tono contenido: p. ej. a little tired and honest at the beginning, genuinely pleased (but understated) about the result], and the last two sentences are a casual, friendly suggestion, not a call to action.
5. Pega el **guion aprobado** en el bloque del speaker, tal cual, con puntos suspensivos donde quieres una pausa ("de todo… y mi piel…"). Con `[ ] + Expression` puedes marcar una emoción puntual.
6. **Run**, escucha y, si algo suena a locutor o a comercial, ajusta el Sample Context y repite. Descarga el audio y guárdalo como `anuncios/NN-slug/voz/voz.wav`.
Lo que hace que suene real: "voice note on her phone", "telling a friend", ritmo de conversación normal (**nunca "fast"**), energía baja y entonación plana, **pedir el acento neutro de forma explícita** (si no, sale un acento regional) y una curva emocional **contenida** (sin "subir la energía"). No pedir "TikTok testimonial", "enthusiasm" ni "fast pace": suenan a comercial (pasó en el primer anuncio con este formato). En el anuncio nunca se nombra la herramienta.

### 6 · Revisión
- B-rolls: como siempre (`sistema/checklists/revision-clips.md`), más el producto comparado con `producto.png`.
- Voz: `hyperframes transcribe voz/voz.wav -l es` (deja `voz/transcript.json` con el tiempo de cada palabra; en un audio completo los tiempos cuadran) y compárala con el guion. Silencios: `ffmpeg -i voz/voz.wav -af silencedetect=n=-40dB:d=0.15 -f null -`.

### 7 · Storyboard
Igual que en head talking (lámina de frames), pero **cada viñeta es un B-roll**: en qué frase entra y qué gesto se ve.

### 8 · Edición (plantilla: `edicion/build.mjs`)
Copia `edicion/build.mjs` a `anuncios/NN-slug/edicion/` y en `edicion/public/` pon `fonts/Inter-700.woff2`, `vendor/gsap.min.js` y `audio/pop.mp3` (de `sistema/formatos/head-talking/edicion/public-base/`). Edita solo la CONFIG:
1. **Ritmo de la voz**: `INICIO` (el primer sonido queda en el fotograma 0) y `QUITAR` (cada pausa de más de ~0,6 s se recorta a ~0,5 s quitando su centro). Las demás pausas se dejan: son las del habla.
2. **Asigna cada B-roll a su frase mirándolos, no solo en orden** (`PLAN`). Haz una hoja de frames de cada B-roll (1 por segundo) y para cada frase elige la toma y el **segundo exacto** en que se ve lo que dice la voz:
   - el corte entra ~0,08 s antes de la palabra que abre la frase;
   - el segundo de entrada lo decide el gesto (la textura cuando los dedos ya frotan, la aplicación con los dedos ya en la mejilla);
   - la **cola de un B-roll sirve para otra frase** (el final de "cansada frente al espejo", cuando cierra los ojos, cubre "como sin vida");
   - un B-roll se puede **partir en dos** si la frase lo pide, y si una frase dura más que su B-roll se reparte con la toma vecina;
   - ninguna toma de menos de ~1,2 s ni de más de ~5,6 s.
3. **Subtítulos** (`PHRASES`): frases cortas (2–5 palabras), blanco con sombra, sin caja, sin palabra resaltada, `|` para el salto de línea. La altura va por toma en `PLAN`: **nunca encima de la etiqueta del producto ni de la cara** (por defecto ~1290 px; entre el mentón y el producto ~1110; arriba ~250).
4. **Un solo gráfico**: el botón (`BOTON`, en el `COLOR` de la marca), que entra con la frase del CTA y rebota en "botón". Nada de etiquetas o chips que repitan lo que dice la voz.
5. **Sin música de fondo.** Como mucho, un efecto suave en el botón.
6. `node build.mjs` → `hyperframes lint public` → `hyperframes snapshot public --at …` (un tiempo por toma) y revisa que ningún subtítulo tape la etiqueta o la cara.

### 9 · Render
`hyperframes render public -o ../final/render-crudo.mp4 --fps 24 --quality delivery --workers 1` → `ffmpeg -i render-crudo.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000" -c:a aac -b:a 192k -movflags +faststart ../final/anuncio-NN-slug.mp4`. Verifica ≈ −14 LUFS y pico ≤ −1,5 dB, ningún silencio de más de 0,6 s (`silencedetect=n=-35dB:d=0.6`), un corte por toma y que la transcripción del video final tenga todas las palabras.
