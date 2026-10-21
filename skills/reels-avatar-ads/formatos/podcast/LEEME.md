# Formato C · Podcast (conversación entre 2 personajes)

Reel/anuncio que parece un fragmento de podcast real: dos personas sentadas frente a sus micrófonos en un estudio, cada una en su propio plano vertical, mirándose entre sí (nunca a cámara). El que **pregunta** (personaje 1, el escéptico) pone en voz alta la objeción del público; el que **responde** (personaje 2, el experto) la desmonta y cierra con el CTA "comenta PALABRA".
Primer reel con este formato: `Contenido/reels/07-podcast-seedance-centavos/`.

## Por qué funciona
- No parece un anuncio: parece un clip sacado de una conversación real → baja la guardia.
- La objeción la dice otra persona, no la marca: el espectador se identifica con el escéptico.
- Los dos personajes son IA: el propio video es la prueba de lo que se vende.

## Imágenes de referencia (lo que trae el usuario)
- Una imagen por personaje, **9:16**, mismo estudio visto desde dos ángulos (plano/contraplano), micrófono delante, cada uno mirando hacia el lado donde está el otro:
  - Personaje 1 mira hacia la **derecha** de la imagen.
  - Personaje 2 mira hacia la **izquierda** de la imagen.
  Si en un video nuevo los personajes miran al revés, cambia "derecha/izquierda" en `eye_contact` e `instructions[1]` de las plantillas.
- Se guardan en `Contenido/reels/NN-slug/personajes/`.

## Plantillas JSON
- `plantilla-personaje-1.json` (el que pregunta) y `plantilla-personaje-2.json` (el experto).
- Derivan del master prompt (`skills/master prompt para json prompts videos.txt`): **misma estructura LOCKED IN** (mismas claves, jerarquía y tipos). Solo cambian valores, autorizados por el usuario para este formato:
  - `style` → podcast en estudio; `eye_contact` → mira al interlocutor fuera de cuadro, nunca a la cámara.
  - `delivery` → conversacional + **descripción fija de la voz** de cada personaje (para que suene igual en todos sus clips).
  - `tone` / `facial_expression` → escéptico (curioso, sorprendido) vs. experto (seguro, tranquilo).
  - gestos sobre la mesa **sin tocar el micrófono**; `rule` → solo se escucha la voz de ese personaje, sin música ni SFX (Flow tiende a inventar la voz del otro).
  - `cuts` → empieza a hablar desde el primer instante (menos silencio que recortar).
- En cada clip solo cambian `dialogue.script` y `hand_gestures.synchronization` (igual que en el master). Si cambian los personajes (otra voz, edad, mujer…), edita las plantillas una vez y quedan para todos los clips.

## Flujo
1. **Guion**: diálogo de 30–50 s, máximo ~6 intervenciones. Cifras y símbolos escritos como se dicen ("cincuenta y tres centavos", "noventa y nueve por ciento"). La palabra clave del CTA en minúsculas y con tilde si la lleva ("guía"), para que no la deletree; en pantalla y caption va en mayúsculas sin tilde (GUIA).
2. **División en clips** (reglas del master: 4/6/8/10 s, tabla de palabras en `references/frameworks-guion.md`). **Cada clip = un solo personaje.** Si una intervención no cabe en 10 s, se parte en dos clips del mismo personaje en una pausa natural.
3. **Archivos**: `prompts/clip-NN-p1.json` / `clip-NN-p2.json` (el sufijo dice qué plantilla y qué imagen usar). Se generan con `generar-prompts.mjs` del reel (copia el del reel 07 y cambia la lista de clips); también escribe `guion.txt`.
4. **Validar**:
   ```
   node skills/reels-avatar-ads/scripts/validar-json.mjs Contenido/reels/NN-slug/prompts --guion Contenido/reels/NN-slug/guion.txt --plantilla p1=skills/reels-avatar-ads/formatos/podcast/plantilla-personaje-1.json --plantilla p2=skills/reels-avatar-ads/formatos/podcast/plantilla-personaje-2.json
   ```
5. **Generar en Flow**: cada clip con la imagen de **su** personaje. Clips → `clips/clip-NN-p1.mp4`…

## Edición — procedimiento (probado en el reel 07, versión 2)
Plantilla en `formatos/podcast/edicion/`: `unir-clips.mjs`, `build.mjs` y un `cortes` de ejemplo (el detector de estiramientos está en `scripts/`, es común a todos los reels). Copiar `unir-clips.mjs` y `build.mjs` a `Contenido/reels/NN-slug/edicion/`.
1. **Medir cada clip**:
   - `hyperframes transcribe clips/clip-NN-pX.mp4 -d edicion/trans/clip-NN-pX -l es --json` (texto y tiempos aproximados de cada palabra).
   - `node skills/reels-avatar-ads/scripts/detectar-estiramientos.mjs Contenido/reels/NN-slug/clips` → silencios y **vocales sostenidas** (palabras estiradas tipo "cuestaaa…"; en el reel 07 apareció en el clip 4, 4,05–4,48 s).
   - Revisar que el texto coincida con el guion: en el reel 07 el clip 7 repetía "estos métodos" y se cortó.
2. **`cortes.txt`** (clip, inicio, fin):
   - Cada clip empieza ~0,03 s antes de la primera palabra (el reel arranca hablando en el fotograma 0) y termina ~0,08 s después de la última. Al final dejar ~0,5 s para que se lea el CTA.
   - **Toda pausa interna > 0,3 s se recorta** partiendo el clip en dos segmentos.
   - **Palabra estirada**: cortar dentro de la vocal sostenida dejando ~0,15 s de vocal y saltar al inicio de la palabra siguiente.
   - Cada corte interno se tapa con un cambio de zoom o, mejor, cae justo donde empieza un B-roll.
3. `node edicion/unir-clips.mjs` → `base.mp4` a **24 fps** (la velocidad de Flow) con cada corte en un fotograma exacto, y `base-cortes.json`. Comprobar con `ffmpeg -i base.mp4 -vf "select='gt(scene,0.08)',showinfo" -an -f null -` que los cambios de personaje caen exactamente en los `start` de `base-cortes.json`.
   ⚠ Nunca convertir a 30 fps antes de cortar: en la versión 1 los cortes reales llegaban 1–5 fotogramas después del cambio de zoom y se veía un **doble corte** (un salto de microsegundos).
4. Transcribir `base.mp4` → `transcript.json` y comprobar que no queden huecos > 0,25 s entre palabras.
5. Copiar `audio/ fonts/ vendor/` de `Contenido/reels/_plantilla-edicion/public/` (+ `JetBrainsMono-500.woff2` de los carruseles) a `edicion/public/`; crear `public/input-video.mp4` con `-r 24 -g 24 -keyint_min 24` y el filtro de voz a −14 LUFS. Los recursos de B-roll van en `public/broll/` (videos a 24 fps, sin audio).
6. Editar la CONFIG de `build.mjs`:
   - `FIX` (cómo escribir lo que Whisper transcribe mal, p. ej. "Sidans" → Seedance) y `KEY` (palabras que quedan en verde).
   - `ZOOM`: una pareja [entrada, salida] por segmento de `base-cortes.json`. `PUNCH`: golpes en palabras de impacto (solo donde se ve la cara).
   - `T`: tiempos de cada B-roll y gráfico, anclados a palabras (`at("palabra")`) o a cortes reales (`S(i)` = inicio del segmento i).
   - Los bloques HTML de cada B-roll están en la plantilla del reel 07 (video a pantalla completa con chip, comparación "=", captura con Ken Burns + cifra que cuenta, filas de costos, rejilla de 100 puntos, maqueta del documento).
   `node build.mjs` → `public/index.html` (imprime el % de B-roll).
7. `hyperframes lint public` → `hyperframes snapshot public -o snaps --at …` (gráficos sin tocar la cabeza ni los subtítulos) → `hyperframes render public -o ../final/render-raw.mp4 --fps 24 --quality delivery` → normalizar audio a −14 LUFS (ver `references/estilo-edicion.md`).

Reglas de zoom (origen 50% 32%, así la cabeza se queda en su sitio y los gráficos de arriba no la tocan):
- Cambio de personaje: alternar plano abierto (1.0) y cerrado (~1.15) + empuje lento (+0,04 por segmento).
- Mismo personaje en dos segmentos seguidos: diferencia de escala ≥ 0,1 (si no, se nota el salto).
- Golpe (0,18 s, +0,05–0,1) en la palabra clave del hook, frases de impacto y CTA. Con un gráfico arriba, escala ≤ ~1,2.
- Los cambios de zoom se programan 2 ms antes del corte (`ZE`) para caer en el mismo fotograma que la imagen.

## B-roll (momentos sin los personajes)
Objetivo: que no sean solo dos personas hablando, sin saturar. Reel 07: 6 B-roll, ~16 s de 43 s (≈ 35–40 %).
- La voz sigue sonando y los subtítulos siguen encima.
- Duración 1,5–3 s cada uno (máx. ~4 s). Nunca dos B-roll seguidos: siempre vuelve a una cara entre medio.
- El hook (primeros ~3 s) y el CTA final van con la cara.
- **Entrar y salir en los cortes** (`S(i)`): el B-roll tapa el salto de imagen y el corte se vuelve invisible.
- Qué mostrar (ideas que funcionaron):
  - Una demo propia cuando se habla del resultado ("anuncios hiperrealistas" → anuncio del labial con chip "ANUNCIO 100% HECHO CON IA").
  - Comparación visual cuando se compara ("misma calidad que Seedance" → tarjeta = tarjeta).
  - Prueba real del proceso ("este video costó…" → captura del editor de Flow + cifra que cuenta).
  - Números grandes y simples para datos (filas de costos, rejilla de 99 de 100).
  - Maqueta del recurso cuando se menciona (el documento del lead magnet).
- Logos de marcas de terceros: solo el archivo oficial que dé el usuario; si no hay, el nombre escrito (nunca un logo inventado).
- SFX: `whoosh-short` (vol. ~0,18) al entrar a cada B-roll, `pop`/`click-soft` en elementos, `impact-bass-1` en cifras.

## Edición — criterios (que parezca una sola conversación, sin huecos)
- Recortar el silencio inicial y final de cada clip; entre intervenciones dejar ~0,1–0,2 s.
- Plano/contraplano: cada corte cambia de cámara, así que el corte no se nota.
- Audio: igualar volumen entre los dos personajes, sin música (o una cama muy baja si el usuario la pide). Si una voz cambia de timbre entre clips, regenerar ese clip.
- Subtítulos blancos de palabra activa (verde) abajo; la palabra clave del CTA escrita grande en pantalla al final.
- Opcional: rótulo pequeño tipo podcast arriba (p. ej. "AVATAR ADS · PODCAST") solo si el usuario lo pide.
- Render 1080×1920, **24 fps** → `final/reel-NN-slug.mp4`.
- Revisión final: extraer fotogramas justo antes y después de cada corte del render y comprobar que no haya cortes dobles.

## Checklist de revisión de clips
- [ ] Cada personaje mira al otro (no a cámara) y no toca el micrófono. Si mira al frente o "al vacío" (pasó en el clip 04 del reel 07), los gestos de ese clip deben empezar con "manteniendo la cabeza girada y la mirada fija en su interlocutor…" y evitar gestos de echarse hacia atrás, que hacen que gire la cabeza al frente.
- [ ] Solo habla un personaje por clip; no hay voces fantasma ni música.
- [ ] Misma voz del mismo personaje en todos sus clips.
- [ ] Diálogo exacto (transcribir con `hyperframes transcribe`), sin texto generado en pantalla.
- [ ] Manos, cara y ropa estables.
