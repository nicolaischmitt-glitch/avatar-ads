# Formato · Head talking de una toma + B-rolls

Un avatar habla a cámara en un plano fijo, como si se grabara con su teléfono (una sola toma), y la edición lo intercala con **B-rolls, gráficos y pruebas reales** con un ritmo rápido. Sirve para anuncios pagados (venta directa → botón) y para orgánico.
Ejemplo terminado: `ejemplo-storyboard-anuncio-03.png` (storyboard del anuncio con el que se creó este formato).

## Pasos específicos de este formato (se suman al flujo de `avatar-ads-anuncio`)

### Guion
- 35–45 s generados (≈ 100–120 palabras), clips de 6/8/10 s. El último clip termina con el CTA al botón ("Toca el botón de abajo y …").

### Avatar (la toma única)
- Una sola imagen (`avatar/avatar.jpg`) es el primer frame de **todos** los clips: de ahí sale la sensación de "una sola grabación".
- Luz frontal pareja, manos visibles, boca cerrada, espacio libre arriba de la cabeza (ver `sistema/prompts/master-prompt-imagen.md`).
- **2 tomas** (opcional): si el guion cambia de tema, se puede cambiar de lugar (p. ej. carro → casa). La segunda imagen se genera adjuntando la primera a Nano Banana para mantener a la misma persona; en `clips-plan.json` cada clip apunta a su toma. El cambio de toma es un corte de escena (transición rápida), no necesita zoom.
- Selfie sostenido con la mano (carro): en los gestos, "con la mano libre". Con un objeto en la mano (taza), gesticula con la otra.

### B-rolls (los propone Claude, pasos 3 y 4 de `prompts-flow.md`)
- 2–3 por anuncio, de 6 s, sin diálogo: el producto en macro, el lugar sin personas, la situación del dolor del cliente o el resultado.
- **Primero el frame, después el video**: el frame se crea en Nano Banana Pro (4 variaciones, se elige una → `broll/broll-01.jpg`) y Flow lo anima (→ `clips/broll-01.mp4`). Nunca directo de texto a video: quema créditos y se ve "de IA".
- En la edición van en `public/broll/`. Cubren cortes internos y suben el ritmo, pero el avatar sigue en cámara ≈ 60–65 % del tiempo.

### Producto físico LOCKED IN (solo si se ve un producto físico)
- Paso 0: la foto del producto (`producto/producto.png`, real o generada) fija cómo se ve. Se adjunta en la imagen del avatar y en cada B-roll donde sale, y su descripción (`product`) es idéntica en todos los prompts. Detalle: sección 7 de `sistema/prompts/master-prompt-imagen.md`.
- Antes de animar, cada imagen se compara con `producto.png`; si el producto o la etiqueta cambian, se regenera esa imagen.
- Para servicios, cursos o productos digitales no se usa.

### Storyboard
- Lámina 1920×1080 con 2 filas × 8 viñetas. Cada viñeta es el lienzo real 1080×1920 escalado (frames reales de los clips + los gráficos con las mismas clases que la edición), con su número, una etiqueta corta y la frase.
- Estructura de referencia: `storyboard/ejemplo-storyboard-anuncio-03.html` (las rutas de fuentes e imágenes de ese ejemplo son de otro proyecto: copia la estructura, no las rutas). Colores y tipografías de `negocio/marca.md`.
- PNG: `node sistema/scripts/captura-html.mjs anuncios/NN-slug/storyboard/storyboard.html`.
- **Avatar en cámara ≈ 60–65 %** del tiempo. Si da menos, pasa B-rolls a **gráficos sobre la cara** (tarjeta pequeña en el tercio superior) y deja a pantalla completa solo lo que necesita espacio (pruebas, comparaciones, demostraciones).
- Subtítulos palabra por palabra siempre.

## Catálogo de escenas
| Escena | Cuándo usarla | Cómo es |
|---|---|---|
| Cara + punch-in | Hook y frases de impacto | Zoom distinto en cada corte (diferencia ≥ 0,1) y golpe de +0,06–0,08 en la palabra clave |
| Chip sobre la cara | Afirmaciones cortas | Píldora con texto corto en el tercio superior ("100 % ONLINE", "EN 30 DÍAS") |
| Cifra sobre la cara | Un número importante | Tarjeta pequeña arriba con contador que sube ($0 → $X) y la fuente en letra pequeña |
| Comparación | "en vez de…", "mientras otros…" | Dos tarjetas lado a lado (lo caro / lo nuestro) o el video del avatar se encoge a una tarjeta y sigue hablando |
| Cronómetro / calendario | Tiempo ("en 20 minutos", "30 días") | Anillo que se dibuja + reloj que corre, o calendario que avanza |
| Producto en pantalla | Mostrar qué es | Captura de la página, mockup del curso o foto del producto en un teléfono o tarjeta |
| Pasos | "en 3 pasos" | Tres tarjetas que entran escalonadas con número |
| Prueba en teléfono | Resultados / testimonios | Captura o video de resultados dentro de un teléfono + etiqueta con la cifra; testimonios sin nombre ni foto si no hay permiso, rotulados "resultado de un cliente" |
| Curva o barras | Crecimiento | Tarjeta pequeña con la curva que se dibuja o barras que suben |
| Logo + botón | CTA | Logo de la marca (si tiene fondo negro: `mix-blend-mode: screen` en su capa) + botón con el color de acento que rebota en la palabra "botón" |
| Pantalla dividida | Mostrar algo largo sin perder la cara | Gráfico arriba (~43 %, 0–820 px) y avatar abajo; el subtítulo va sobre la línea divisoria |

**Animaciones distintas en cada anuncio:** si el anuncio anterior del negocio usó un set de escenas, el siguiente propone otro (mira `negocio/aprendizajes.md`).

## Edición (plantillas en `edicion/`)
Reglas generales de voz, audio, zonas seguras y SFX: `sistema/edicion/reglas-edicion.md` (léelas antes).
1. Copia `edicion/unir-clips.mjs`, `edicion/build.mjs` y `edicion/audio.mjs` a `anuncios/NN-slug/edicion/`, y `edicion/public-base/` (fuentes, GSAP y SFX) a `anuncios/NN-slug/edicion/public/`.
2. **Medir la voz**: `node sistema/scripts/medir-voz.mjs anuncios/NN-slug/clips` → inicio, fin y huecos de cada clip.
3. **`cortes.txt`** (ejemplo: `edicion/cortes-ejemplo-anuncio-07.txt`): sin cortar la cola de la última palabra (fin ≥ voz + 0,06 s); hook de una sola toma, ~0,45–0,55 s de silencio en cada unión entre clips y pausas internas > ~0,35 s recortadas a ~0,2–0,3 s (regla "Ritmo natural del habla" de `reglas-edicion.md`), cada corte tapado con B-roll, gráfico o cambio de zoom; el último clip deja ~0,8 s de cola para el botón. Ningún tramo de menos de ~0,8 s. Para quitar una palabra: ubicarla con `medir-voz.mjs clip --desde a --hasta b` y partir el clip en dos filas.
4. `node unir-clips.mjs` (dentro de `edicion/`) → `base.mp4` (1080×1920, 24 fps, cortes en fotogramas exactos) + `base-cortes.json`.
5. `hyperframes transcribe base.mp4 -l es` → `transcript.json`.
6. **Audio limpio para la composición (siempre): `node audio.mjs ninguna`** → `public/input-video.mp4`. Quita el ruido de fondo que Flow mete en algunos clips (un zumbido grave, como de aire acondicionado) para que todos suenen igual: filtro de graves, reducción de ruido y una puerta suave en las pausas, y deja la voz a −14 LUFS.
   - **Si el usuario quiere música**: búscala con `npx hyperframes media-use resolve --type bgm --intent "…" --project .`, haz una muestra de 30 s con `node audio.mjs bgm_00N --muestra` para que la escuche, y mézclala con `node audio.mjs bgm_00N` (se repite con fundidos hasta cubrir el video, va muy por debajo de la voz y baja sola cuando el avatar habla). También acepta la ruta de un archivo propio: `node audio.mjs musica/mi-pista.mp3`.
7. **`build.mjs`**: es la plantilla del anuncio 03. Edita la CONFIG (`FIX` = palabras mal transcritas, `KEY` = palabras que quedan resaltadas, `ZOOM` por segmento, `PUNCH`, los momentos `T` anclados con `at("palabra", desde)` o con cortes `S(i)`, los SFX) y **reemplaza el HTML y las animaciones de las escenas** por las del storyboard aprobado. Pon los colores de `marca.md` en las variables de `:root` y, si la marca usa otras tipografías, descárgalas de Google Fonts (woff2) a `public/fonts/`. El logo y los B-rolls van en `public/broll/`. `node build.mjs` imprime el % de avatar en cámara.
8. `hyperframes lint public` (0 errores; los avisos de "sub-composition" son normales) → vista previa (`hyperframes preview public --background`) o `hyperframes snapshot public -o snaps --at …` con un tiempo por escena → revisar y corregir.

## Render y verificación
- `hyperframes render public -o ../final/render-crudo.mp4 --fps 24 --quality delivery --workers 1` (en segundo plano; 5–15 min según la computadora).
- Normalizar el audio: `ffmpeg -i render-crudo.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000" -c:a aac -b:a 192k -movflags +faststart anuncio-NN-slug.mp4`.
- Luego `sistema/checklists/calidad-final.md`.

## Errores ya resueltos (no repetir)
- **Logo con fondo negro**: `mix-blend-mode: screen` va en el **contenedor** del logo (capa propia), no en la imagen dentro de otra capa.
- **Video dentro de un B-roll**: no animarle la opacidad al entrar (deja un fotograma negro).
- **Etiqueta tapada por un video**: los videos de B-roll van en z-index 9; las etiquetas encima, en otra capa (z 10).
- **Capturas verticales en el teléfono**: `object-fit: contain` (con `cover` se cortan los lados).
- **Escalas de zoom iguales en cortes seguidos** = salto visible. Revisa `ZOOM` contra los golpes (`PUNCH`) del segmento anterior.
- **Animaciones más largas que su escena**: calcúlalas desde el inicio de la escena, no desde la palabra.
- **Subtítulo sobre la cara en pantalla dividida**: va sobre la línea divisoria.
