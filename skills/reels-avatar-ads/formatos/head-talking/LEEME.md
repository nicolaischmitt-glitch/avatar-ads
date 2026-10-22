# Formato D · Head talking de una toma + B-rolls (anuncio directo)

Un solo avatar habla a cámara en un plano fijo, como si se grabara con su iPhone (una sola toma), y la edición lo intercala con **B-rolls y gráficos de marca** al ritmo del reel 07. Sirve para **anuncios pagados** (venta directa → landing) y también para reels orgánicos (en ese caso, CTA "comenta PALABRA").
Primer anuncio con este formato (aprobado por el usuario, 21 oct 2026): `anuncios/03-calidad-seedance-centavos/` → `finales/anuncio-03-calidad-seedance-centavos.mp4`.

**Objetivo:** vender. Plantea la idea en el hook, demuestra con cifras y pruebas reales, y cierra con un CTA a la landing. El avatar es IA, así que el propio anuncio prueba lo que se vende.

## Proceso completo (el mismo que se enseña en el taller)
1. **Copy** → 2. **Avatar** (imagen) → 3. **Prompts JSON** → 4. **Clips en Flow** → 5. **Revisión de clips** → 6. **Storyboard** → 7. **Edición** → 8. **Render y verificación**.
Se avanza paso a paso y se pide aprobación al final de cada paso (copy, imagen, storyboard).

### 1 · Copy
- Si el usuario trae su copy, **respetar su estructura y su orden**: solo pulir claridad, persuasión y que se pueda generar. Si se reescribe más a fondo, guardar esa versión aparte como otro anuncio (así nació `anuncios/04-yo-no-existo/`).
- **Evergreen** (anuncios pagados): sin precio ni fecha, ni en la voz ni en pantalla. Los detalles viven en la landing.
- **Datos reales**: toda cifra se investiga y se cita (p. ej. Seedance: `BASE-CONOCIMIENTO.md` §5.2). Usar "te puede costar", no "cuesta siempre". En pantalla va la fuente en letra pequeña.
- **Escrito para la voz**: cifras en palabras ("sesenta y siete centavos"), sin símbolos; "inteligencia artificial" en vez de "IA" (Flow puede leer "ía"); evitar repetir palabras ("solo… solo").
- Pruebas de clientes: solo con permiso y con la etiqueta "resultado de un cliente". Nunca presentarlos como alumnos.
- 35–45 s generados (≈ 100–120 palabras). Termina con CTA al botón ("Reserva tu lugar en el botón de abajo").
- Dividir en clips de 6/8/10 s (tabla en `references/frameworks-guion.md`). Cada clip termina en una pausa natural.

### 2 · Avatar (frame de la toma única)
- Desde cero con Nano Banana: estructura fija de `skills/master prompt para json prompts imagenes.md` (prompt en inglés, encuadre con espacio arriba para gráficos, manos visibles, boca cerrada).
- **Luz frontal pareja** en toda la cara: nunca una ventana o lámpara al lado.
- El usuario genera 4 variaciones y elige una → `avatar/avatar.jpg`. Es el primer frame de **todos** los clips (de ahí sale la "toma única").

### 3 · Prompts JSON (Google Flow)
- Master prompt LOCKED IN (`skills/master prompt para json prompts videos.txt`). Por clip solo cambian `dialogue.script` y `hand_gestures.synchronization`.
- Gestos concretos por frase (el índice en "un solo segundo", los dedos casi juntos en "centavos", tocar el reloj en "minutos", señalar hacia abajo en "botón").
- Generar los JSON con un script desde la plantilla del master (no a mano) → `prompts/clip-NN.json` + `guion.txt` → validar:
  `node skills/reels-avatar-ads/scripts/validar-json.mjs <carpeta>/prompts --guion <carpeta>/guion.txt`
- Se puede probar primero el clip 01 y, si al usuario le gusta, generar el resto.

### 4 · Clips
- El usuario los deja en `clips/`. Renombrarlos a `clip-01.mp4` … `clip-NN.mp4` (unir-clips los busca así).

### 5 · Revisión de clips
- Hoja de frames (1 por segundo) para ver cara, manos y continuidad.
- Transcribir cada clip (`hyperframes transcribe clip -l es`) para confirmar el texto. **Ojo:** en clips sueltos Parakeet adelanta los tiempos ~0,4 s, así que los cortes **no** se sacan de ahí.
- Medir la voz por nivel de audio: `node skills/reels-avatar-ads/scripts/medir-voz.mjs clips` → inicio, fin y huecos > 0,2 s de cada clip.
- Avisar de palabras mal pronunciadas (p. ej. "Seedance") para regenerar solo ese clip.

### 6 · Storyboard
- **Solo los frames** (lámina 1920×1080, 2 filas × 8 viñetas), cada uno con su número, una etiqueta corta y la frase. Sin paneles de reglas, recursos, paleta ni tipografía.
- Cada viñeta es el lienzo real 1080×1920 escalado: frames reales de los clips + los gráficos con las mismas clases que la edición. Plantilla: `anuncios/03-calidad-seedance-centavos/moodboard/moodboard.html` → PNG con Chrome headless.
- **Estilo = render final del reel 07** (no su moodboard viejo): subtítulos palabra por palabra siempre, muchos B-rolls y gráficos.
- **Avatar en cámara ≈ 60–65 %** (contando la tarjeta de la escena "misma calidad"). Si da menos, pasar B-rolls a **gráficos sobre la cara** (tarjeta pequeña en el tercio superior) y dejar a pantalla completa solo lo que necesita espacio: pruebas reales, comparaciones, la cuadrícula de anuncios y la galería. Calcular el % con los tiempos reales antes de mostrarlo.
- En el chat, aparte: los recursos que faltan del usuario.

### 7 · Edición (plantilla en `formatos/head-talking/edicion/`)
Copiar `unir-clips.mjs` y `build.mjs` a `<anuncio>/edicion/`.
1. **`cortes.txt`** (ejemplo: `cortes-ejemplo-anuncio-03.txt`): por clip, desde el inicio de la voz − 0,04 s hasta el fin + ~0,05 s; los huecos > 0,3 s se recortan a ~0,15 s. El último clip deja ~0,8 s de cola para el botón.
   - **Quitar una palabra** (p. ej. un nombre): ubicarla con `medir-voz.mjs clip --desde a --hasta b` (cortar en los valles < −35 dB) y partir el clip en dos filas. Si el corte coincide con un cambio de escena, mejor.
   - Ningún tramo de menos de ~0,8 s.
2. `node unir-clips.mjs` → `base.mp4` (1080×1920, 24 fps, cortes en fotogramas exactos) + `base-cortes.json`.
3. `hyperframes transcribe base.mp4 -l es` → `transcript.json` (en `base.mp4` los tiempos sí cuadran). Comprobar que la palabra quitada ya no aparece.
4. Audio de la composición: `ffmpeg -i base.mp4 -c:v copy -af "highpass=f=70,acompressor=threshold=-22dB:ratio=3:attack=5:release=90:makeup=2,loudnorm=I=-14:TP=-1.5:LRA=7" -c:a aac -b:a 192k -ar 48000 public/input-video.mp4`.
5. `public/`: `fonts/`, `vendor/gsap.min.js`, `audio/` (SFX), copiados del reel 07 o del anuncio 03; los B-rolls van en `public/broll/`.
6. **`build.mjs`** — editar solo la CONFIG: `FIX` (palabras mal transcritas), `KEY` (palabras que quedan en verde), `ZOOM` por segmento, `PUNCH`, los momentos `T` (anclados con `at("palabra", desde)` o con cortes `S(i)`), los SFX y el HTML de cada escena. Imprime el % de avatar en cámara.
7. `hyperframes lint public` (0 errores; los avisos de "sub-composition" son normales) → `hyperframes snapshot public -o snaps --no-end --at …` con un tiempo por escena → revisar la hoja de contacto y corregir.

### 8 · Render y verificación
- `hyperframes render public -o ../finales/render-crudo.mp4 --fps 24 --quality delivery --workers 1` (~10 min, en segundo plano).
- Normalizar: `ffmpeg -i render-crudo.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000" -c:a aac -b:a 192k -movflags +faststart <final>.mp4`.
- Verificar: ≈ −14 LUFS y pico ≤ −1,5 dB (`ebur128=peak=true`); 0 silencios > 0,3 s (`silencedetect=n=-35dB:d=0.3`); detección de escenas sin cortes dobles (dos cortes a 1 fotograma = un elemento que entra tarde; revisar esos fotogramas).
- Entregar el MP4 y recordar copiarlo a Drive.

## Catálogo de escenas (anuncio 03, todas en `build.mjs`)
| Escena | Cuándo usarla | Cómo es |
|---|---|---|
| Cara + punch-in | Hook y frases de impacto | Zoom distinto en cada corte (≥ 0,1), golpe de +0,06–0,08 en la palabra clave |
| Nuestros anuncios | "anuncios hiperrealistas" | 3 videos reales de la landing en tarjetas + chip "100% HECHOS CON IA" |
| Misma calidad | Comparar con una herramienta cara | **El propio video del avatar se encoge a la tarjeta izquierda y sigue hablando** (`#video-wrap` escalado, fondo B-roll detrás) = tarjeta de la herramienta |
| Cronómetro | "un solo segundo…" | Anillo que se dibuja + 0:00.00 → 0:01.00 + tag del modelo |
| Cifra sobre la cara | Precio de la competencia | Tarjeta pequeña arriba con contador ($0,00 → $0,68) + fuente |
| Chip sobre la cara | Afirmaciones cortas | "ESTE AVATAR ES 100% IA", "HECHO EN 20 MIN" |
| Galería + costo | "me creó por…" | Captura de la galería de Nano Banana/Flow (recortada, sin la foto de perfil del usuario) + contador del costo + "vs. …" |
| Íconos de anuncio | "testear más anuncios" | Cuadrícula 10×3 de íconos "AD" (no frames de videos): de 4 a 30 en cascada |
| Varios ganadores | "encontrar a los ganadores" | Se iluminan **varios** (~7 de 30, la proporción de 1 de cada 4 de la landing) + "Más tests = más ganadores". Nunca un solo ganador |
| Curva sobre la cara | "el secreto para escalar" | Tarjeta pequeña con la curva que se dibuja |
| Prueba en teléfono | Ventas / resultados | Video de Hotmart en un teléfono (tramo donde la cifra sube 930 → 1.759) + etiqueta con la cifra cuando aparece; chat del cliente **sin nombre ni foto** |
| Logo + días + botón | CTA | Logo (mezcla "screen"), tarjetas Día 1 / Día 2 sobre la cara, botón verde "Reservar mi lugar ↓" que rebota en "botón" |

## Variantes y reglas añadidas (anuncio 04)
- **Animaciones distintas en cada anuncio**: si el anuncio anterior usó un set de escenas, el siguiente propone otro (el usuario lo pidió en el 04). Set alternativo probado en `anuncios/04-yo-no-existo/moodboard/moodboard.html`: subtítulos en mayúsculas con píldora verde, pantalla dividida, video en burbuja sobre las pruebas, escaneo IA + glitch, taxímetro, sellos "WINNER", escalera de barras, teléfono 3D con marcador, calendario, botón con toque.
- **Pantalla dividida (gráfico arriba, avatar abajo)**: el subtítulo va **sobre la línea divisoria** (franja), el panel de arriba ocupa ~43 % (0–820 px) y el video de abajo se encuadra con la cara justo debajo de la franja. Si el subtítulo queda en su posición normal, le tapa la cara.
- **Nunca subtítulos ni gráficos clave en el ~20 % inferior**: lo tapa la interfaz de Reels/Stories (texto del anuncio, botón de Meta).
- **Varias tomas**: se puede cambiar de lugar cuando el guion cambia de tema (anuncio 04: carro para el hook y el precio → casa para el argumento de negocio). La segunda imagen se genera adjuntando la primera para mantener a la misma persona; en Flow cada clip usa la imagen de su toma. El cambio de toma es un corte de escena (transición whip), no necesita zoom.
- **Selfie sostenido con la mano**: en esos clips gesticula con la mano libre; con un objeto en la mano (taza), gesticula con la otra.

## Errores ya resueltos (no repetir)
- **Logo con fondo negro**: `mix-blend-mode: screen` va en el **contenedor** `.g` del logo (capa propia), no en la imagen dentro de otra capa.
- **Video dentro de un B-roll**: no animarle la opacidad al entrar (deja un fotograma negro) y no aplicarle `settle` al fondo si el video no escala igual (desfasa el marco del teléfono).
- **Etiqueta tapada por un video**: los videos de B-roll van en z-index 9; las etiquetas encima, en una capa `.g` (z 10).
- **Capturas verticales en el teléfono**: `object-fit: contain` (con `cover` se cortan los lados del texto).
- **Dígitos que se salen del círculo**: el cronómetro usa 96 px.
- **Escalas de zoom iguales en cortes seguidos** = salto visible. Revisar la tabla `ZOOM` contra los golpes (`PUNCH`) del segmento anterior.
- **Animaciones más largas que su escena** (p. ej. los ganadores): calcularlas desde el inicio de la escena, no desde la palabra.
