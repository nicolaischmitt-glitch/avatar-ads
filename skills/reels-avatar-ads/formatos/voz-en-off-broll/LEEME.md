# Formato E · Voz en off + B-rolls (anuncio UGC narrado)

Solo una voz narrando en primera persona sobre **B-rolls que cuentan la historia** (la persona en su rutina, el producto, el uso, el resultado), con cortes secos y casi sin gráficos. No hay nadie hablando a cámara, así que no hay sincronía de labios ni continuidad de una toma que cuidar.
**Probado en el anuncio 08 (sérum ALBA, 27 oct 2026):** al usuario le gustó mucho, dijo que "se ve muy realista". Final: `videos-landing/08-ejemplo-producto-serum/final/anuncio-08-serum-voz-en-off.mp4` · edición: `videos-landing/08-ejemplo-producto-serum/edicion-voz-en-off/build.mjs`.
Es distinto del formato B (voz del usuario + motion graphics para orgánico): aquí la imagen es footage hiperrealista y el objetivo es vender.

## Cuándo usarlo
- **Producto físico / skincare / ecommerce**: el producto y su uso son los protagonistas (gotas, textura, aplicación, resultado).
- Historias problema → solución contadas como testimonio ("dormía ocho horas y aun así…").
- **Variaciones baratas de un ganador**: el mismo guion de un head talking se convierte en esta versión con la misma voz y los B-rolls (en el 08 salieron dos anuncios del mismo material: head talking + esta versión).
- Menos indicado cuando lo que vende es la autoridad de una persona a cámara (experto, marca personal): ahí, head talking.

## Guion (lo que funcionó)
- 30–40 s, ~90 palabras, en primera persona, con historia: **problema que se siente → lo que ya probó → descubrimiento → demostración → cómo se ve ahora → CTA**. La emoción sale de contar algo que le pasaba, no de describir el producto.
- Cada frase tiene que poder **mostrarse**: si no se puede filmar, no va (o va como subtítulo sobre el producto).
- Sin cifras ni promesas de resultado ("en 7 días", "elimina manchas").

## Prompts
- **La persona igual se crea como avatar** (Paso 1, imagen 9:16) aunque nadie hable a cámara: es la referencia de identidad de todos los B-rolls donde sale (`mismaPersona: true`). Con producto físico, primero el Paso 0 (producto LOCKED IN).
- **6–10 B-rolls, uno por idea del guion y en su orden**, todos de 6 s, primero el frame y después el video. Mezclar: la persona (cansada, aplicándose el producto, el resultado), el producto (en la mano, en el lavabo), el uso en macro (gotas, textura) y la situación del problema (las cremas que no funcionaron).
- En las tomas donde sale ella: cámara apoyada "donde está el espejo", sin marco ni reflejo visible; expresiones que acompañan la historia (cansada → sonríe).
- La última toma deja espacio para el botón (el producto con aire arriba o abajo).

## La voz
- Va primero: es la que marca el tiempo de todo. En el 08: `audio voice over.wav`, 34,9 s, mono 24 kHz.
- **Cómo se generó (27 oct 2026, se enseña en el curso):** Google AI Studio → Playground → modo **Composer** → modelo **Gemini 3.1 Flash TTS Preview** (`gemini-3.1-flash-tts-preview`), temperatura 1, un solo speaker (en el 08, **Aoede**: "Breezy, middle pitch"; la voz es una variable que cambia en cada anuncio). Se escriben tres cosas y se le da Run; se descarga el audio con el botón de descarga.
  - **Scene** (quién habla, dónde y cómo se graba; en inglés). La del 08:
    > A 25-year-old woman records a selfie-style video in her bedroom, lit by soft natural morning light. She talks straight to the camera as if telling a close friend about a product she genuinely loves. Intimate, casual, unpolished atmosphere with no professional production.
  - **Sample Context** (idioma, acento, tono, ritmo y cambios de emoción por parte del guion; en inglés). La del 08:
    > Speak in Spanish with a young Latin American voice. Spontaneous, warm and genuine tone, like a real TikTok testimonial. Slightly fast pace with natural pauses, subtle breaths and small hesitations. Authentic, restrained enthusiasm: never sounding like an announcer or a commercial. Raise the energy when describing the mirror result, then drop to a confiding, softer tone for the final recommendation.
  - **El guion** en el bloque del speaker, tal cual se aprobó, con puntos suspensivos donde va una pausa ("de todo… y mi piel…", "con brillo… y eso que…"). Se puede añadir `[ ] + Expression` para marcar emociones puntuales.
  - **Esa v1 no le gustó al usuario (30 oct 2026):** sonaba a chica mexicana "fresita" y a comercial (entonación y velocidad de anuncio). Culpables: "TikTok testimonial", "slightly fast pace", "enthusiasm", "raise the energy" y no pedir un acento neutro. **v2** (`videos-landing/08-ejemplo-producto-serum/voz/prompt-voz-v2.md`): Scene = nota de voz en el celular, en el mismo baño de los B-rolls, contándole a una amiga con sus palabras; Sample Context = "neutral Latin American Spanish with no regional accent: not Mexican, not Argentine…", ritmo de conversación normal (nunca fast), energía baja, entonación plana, sin énfasis en el producto, "never sound like a commercial, a voice-over or a TikTok ad", curva emocional contenida y el CTA como sugerencia casual. Voces de tono tranquilo: Callirrhoe, Achernar, Sulafat, Vindemiatrix, Despina (evitar las bright/upbeat/breezy).
  - Lo que hace que suene real: nota de voz, contárselo a una amiga, ritmo y energía de conversación, acento neutro pedido de forma explícita, entonación plana y emoción contenida.
  - En los anuncios nunca se nombra la herramienta; en el curso, sí.
- `hyperframes transcribe voz.wav -l es` → tiempos de cada palabra (en un archivo de voz completo los tiempos sí cuadran; el adelanto de ~0,4 s es de los clips sueltos de Flow).
- `silencedetect=n=-40dB:d=0.15` → silencios. Ritmo natural: el primer sonido en el fotograma 0 (en el 08 se quitaron 0,27 s del inicio) y las pausas de más de ~0,6 s se recortan a ~0,5 s quitando su centro (`QUITAR` en `build.mjs`, con fundidos de 10 ms para que no haga clic). Las demás pausas se dejan: son las del habla.

## Edición (plantilla: `videos-landing/08-ejemplo-producto-serum/edicion-voz-en-off/build.mjs`)
1. **Asignar cada B-roll a su frase, mirando los B-rolls, no solo en orden.** Hoja de frames de cada B-roll (1 por segundo) → para cada frase, la toma y el **segundo exacto** que muestra lo que dice la voz. Lo que se hizo en el 08:
   - el corte entra **~0,08 s antes de la palabra** que abre la frase (`PLAN`: archivo, palabra, segundo de entrada);
   - **punto de entrada elegido por el gesto**: la textura entra en el segundo 2,3, cuando los dedos ya frotan; la aplicación en el 0,4, con los dedos ya en la mejilla;
   - **la cola de un B-roll sirve para otra frase**: el final del B-roll 1 (ella cierra los ojos, cansada) cubre "como sin vida", aunque el principio del mismo B-roll abrió el anuncio;
   - **un B-roll largo se parte en dos** si la frase lo pide (la aplicación cubre "se absorbe en segundos… grasosa" y su final cubre "Hoy me miro al espejo");
   - si una frase dura más que su B-roll, se reparte con la toma vecina; ninguna toma de menos de ~1,2 s ni de más de ~5,6 s.
2. **`base.mp4`**: ffmpeg corta y une las tomas en fotogramas exactos (24 fps), escaladas de 720×1280 a 1080×1920 con lanczos, sin audio. Cortes secos: sin transiciones ni zooms (el movimiento ya viene en los B-rolls).
3. **Subtítulos naturales**: frase corta (2–5 palabras), blanco con sombra, sin caja, sin palabra resaltada, salto de línea manual con `|` en las frases largas. **La altura cambia según la toma** (`PLAN`): nunca encima de la etiqueta del producto ni de la cara (en la aplicación iba entre el mentón y el frasco, a 1110 px; en la toma final, arriba, a 250 px).
4. **Un solo gráfico**: el botón "Comprar ↓" (píldora con el color de la marca, anillo que late y rebota en "botón") en la última toma. Nada de chips de marca ni etiquetas que repitan lo que dice la voz: el producto ya se ve en las tomas.
5. **Sin música de fondo por defecto.** En el 08 se puso una música suave y al usuario no le gustó cómo quedó (la dejó así en esa versión, pero no se repite). Como mucho, un efecto suave en el botón.
6. Ejemplos de la landing: marca de agua "▶ AVATAR ADS 1.0" abajo al centro (top 1800 px).
7. Revisar con `hyperframes snapshot public --at …` un tiempo por toma: ningún subtítulo tapa la etiqueta ni la cara, las frases se parten bien.
8. Render: `hyperframes render public -o ../final/render-crudo.mp4 --fps 24 --quality delivery --workers 1` → `loudnorm=I=-14:TP=-1.5:LRA=9`. Verificar ≈ −14 LUFS y pico ≤ −1,5 dB, 0 silencios > 0,6 s (`silencedetect=n=-35dB:d=0.6`), un corte por toma (detección de escenas) y la transcripción del final con todas las palabras.
