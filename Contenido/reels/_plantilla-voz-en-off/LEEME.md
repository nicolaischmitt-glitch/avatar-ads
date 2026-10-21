# Plantilla — reels de voz en off + motion graphics

Formato: **la voz del usuario** (enseñanza, pensamiento o consejo de marketing) + gráficos, ilustraciones, maquetas UI, logos y tipografía animada que retienen la atención.
Ejemplos terminados: `Contenido/reels/02-esfuerzo-vs-apalancamiento/` y `Contenido/reels/03-regla-7-11-4/` (partir de su `edicion/public/index.html`).
Referencias de estilo analizadas: `referencias/ejemplo-voz-en-off-1.mp4` (tipografía grande + UI + diagramas, cambio cada 1–2 s) y `referencias/ejemplo-voz-en-off-2.mp4` (negro, line art fino, una metáfora visual por idea). Análisis en `Contenido/reels/02-…/guion.md`.

## Reglas fijas (decisiones del usuario)
- **No** mencionar Avatar Ads ni poner su logo. **Sin música.** Solo voz + efectos de sonido que acompañan a los gráficos.
- La voz **debe sonar bien**: siempre pasa por `scripts/voz.mjs` (limpieza + mejora + -14 LUFS).
- Paleta de marca: fondo `#020604` con rejilla verde tenue, verde `#C5F740` para lo importante, bordes `#305E4A`, texto `#F8F8F8`, metadatos `#9F9587`. Ningún texto en rojo.
- Tipografía: **Archivo 800** (palabras grandes, números, MAYÚSCULAS), **Instrument Serif** (frases; la palabra clave en *itálica verde*), **Inter 700** (etiquetas pequeñas en mayúsculas espaciadas y subtítulos).
- Subtítulos blancos sobrios abajo (Inter 700, 44 px, top 1440) en todo el video: muchos ven sin sonido.
- Lienzo 1080×1920, 30 fps. Zona segura de contenido: x 60–1020, y 300–1380 (arriba y abajo los tapa la interfaz de Instagram).

## Ritmo y extensión del guion
Voz editada del usuario ≈ **2,7 palabras/s**. Duración del reel ≈ palabras ÷ 2,7 + 0,6 s.
40 s ≈ 108 palabras · 45 s ≈ 122 · 50 s ≈ 135 · 55 s ≈ 149 · 60 s ≈ 163. Ideal 125–140 palabras (≈ 46–52 s).
(Detalle en `skills/reels-avatar-ads/references/frameworks-guion.md`.)

## Flujo
1. **Carpeta**: `Contenido/reels/NN-slug/` con `edicion/public/` y `final/`. Copiar de esta plantilla `public/fonts`, `public/vendor`, `public/audio/*.mp3` (SFX) y los logos que hagan falta de `public/logos/`.
2. **Analizar la voz**: `node "Contenido/reels/_plantilla-voz-en-off/scripts/analizar-voz.mjs" "Contenido/reels/NN-slug/voz-original.mp4"` → palabras con tiempos, pausas reales, LUFS y picos recortados.
3. **Cortes** → `Contenido/reels/NN-slug/cortes.json`:
   ```json
   { "fuente": "Contenido/reels/NN-slug/voz-original.mp4", "conservar": [[ini, fin], [ini, fin]] }
   ```
   - Aplicar la regla general de **voz fluida** (`skills/reels-avatar-ads/SKILL.md` → Reglas generales). Para encontrar pausas y palabras estiradas: `node skills/reels-avatar-ads/scripts/detectar-estiramientos.mjs Contenido/reels/NN-slug`.
   - Quitar silencio inicial/final: la primera palabra suena desde el inicio (~0,05 s antes como máximo); ~0,18 s después de la última.
   - Quitar **arranques fallidos y frases repetidas** (avisar al usuario cuáles se quitaron).
   - Pausas > 0,3 s → dejarlas en ~0,1–0,2 s, cortando dentro del silencio (nunca en una palabra). Pausas dramáticas antes de una pregunta o del cierre: ~0,3 s.
   - Palabras estiradas (vocal sostenida > 0,3 s): cortar dentro de la vocal dejando ~0,15 s y saltar a la palabra siguiente.
4. **Voz**: `node "Contenido/reels/_plantilla-voz-en-off/scripts/voz.mjs" Contenido/reels/NN-slug` → `edicion/public/audio/voz.wav`.
   Cadena: micro-crossfade 30 ms en cada corte → `adeclip` → highpass 75 Hz → EQ −2,5 dB a 250 Hz, +2,5 dB a 3,2 kHz, +1,5 dB aire 10 kHz → de-esser → compresor 3:1 → loudnorm −14 LUFS / −1,5 dBTP.
5. **Transcribir la voz limpia**: `hyperframes transcribe edicion/public/audio/voz.wav -d edicion -l es -e parakeet --json` → `edicion/transcript.json` (tiempos definitivos). Corregir en pantalla lo que el reconocedor escriba mal (números, marcas: "71.4" → 7-11-4, "Avatarat" → …).
6. **Plan de escenas** (tabla en `guion.md`): una escena por idea, **cambio visual cada ≤ 3 s**, una metáfora visual concreta por idea:
   - números/estadísticas → número gigante en Archivo + anillo/contador/barra;
   - procesos o relaciones → diagrama (cadena de tarjetas, red de puntos, bifurcación, palanca);
   - acciones concretas → maquetas UI (anuncio, subida de video, llamada, chat, feed del teléfono, botón Seguir);
   - emociones o conceptos abstractos → line art (onda calmada → caótica, órbita sin fin, partículas, reloj);
   - marcas mencionadas → **logo oficial** (ver abajo).
7. **Composición**: copiar `edicion/public/index.html` del reel 03 y reemplazar escenas, tiempos, `WORDS` (subtítulos) y SFX. Cada escena es un `.scene.clip` con `data-start`/`data-duration`; los tiempos salen del transcript.
8. **Revisar**: `hyperframes lint public` → `hyperframes snapshot public --at t1 --no-end -o <dir>` en el medio de cada escena (una carpeta por tiempo) → corregir textos que se salgan, coincidencias con la voz, superposiciones.
9. **Render**: `hyperframes render public -o ../final/render-sin-normalizar.mp4 --fps 30 --quality delivery --workers 1` (en esta PC tarda ~8–10 min).
10. **Normalizar** (el render baja ~1,5 dB):
    `ffmpeg -i render-sin-normalizar.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000" -c:a aac -b:a 192k -movflags +faststart reel-NN-slug.mp4`
    Verificar ≈ −14 LUFS, sin errores de decodificación, y revisar una tira de fotogramas del MP4 final. Borrar el render intermedio.

## Logos e imágenes
- **Logos de marcas**: Simple Icons (licencia CC0) vía `https://cdn.jsdelivr.net/npm/simple-icons@14.15.0/icons/<nombre>.svg`. **Pedir permiso al usuario antes de descargar** (lista de archivos + fuente). Ya descargados en `public/logos/`: google, instagram, tiktok, youtube, facebook, meta.
  Se muestran como ícono de app (`.logo.lg-<marca>` con el SVG como máscara, color oficial). Para añadir una marca nueva: descargar su SVG y crear su clase `.lg-<marca>` con el color oficial.
- **Fotos/ilustraciones**: bancos gratuitos con licencia comercial (Pixabay, Unsplash), pidiendo permiso antes de descargar. Nunca caras de personas reales reconocibles.
- **Material propio del usuario** (capturas, fotos suyas): lo deja él en `Contenido/reels/NN-slug/recursos/`.

## Efectos de sonido (volumen 0,15–0,45, siempre por debajo de la voz)
| Momento | SFX |
|---|---|
| Cambio de escena | `whoosh-short` (empieza ~0,16 s antes del corte) |
| Aparece número, tarjeta, logo, botón | `pop` |
| Etiquetas, pasos de una cadena, contadores | `click-soft` |
| Botón presionado | `click` |
| Palabra negativa que tiembla (ruido, miedo, esfuerzo tachado) | `glitch-1` (0,15–0,2) |
| Revelación de un número o concepto clave | `impact-bass-1` (≤0,3) |
| Escribir / horas frente a la computadora | `typing` |
| Acierto, cierre, la respuesta correcta | `chime` (≤0,18) o `sparkle` |
| Llamada / notificación | `ping` |
Dos sonidos que se solapen van en `data-track-index` distintos (11, 12, 13).

## Reglas técnicas de la composición (aprendidas)
- Guardar los HTML **sin BOM** (no usar `Set-Content -Encoding utf8` de PowerShell 5): el BOM baja todo el lienzo 18 px y deja una franja negra arriba.
- Construir la línea de tiempo dentro de `document.fonts.ready.then(…)` para medir textos con las fuentes cargadas.
- Palabras grandes (`.big`): llevan `white-space: nowrap` y el script reduce su tamaño hasta que quepan en 940 px (sin `nowrap` se parten en dos líneas y tapan lo de abajo).
- En una frase serif con una palabra en itálica (`<span class="it">`), dejar `padding-right` en el span si va seguida de otra palabra: la itálica se "come" el espacio.
- Nada de `tl.call()` ni cambiar texto con código para contadores: cada valor es un elemento propio y se muestra con `tl.set(opacity)` (render seguro). Los `onUpdate` de números (reloj de horas) sí funcionan.
- Todas las animaciones con `fromTo` + `immediateRender: false`; aleatorios con semilla fija.
- Checklist: hook visual en los primeros 0,5 s · ningún tramo > 3–4 s sin cambio visual · texto en pantalla = lo que dice la voz · nada fuera de la zona segura · voz −14 LUFS · sin música · sin marca Avatar Ads.
