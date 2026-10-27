# Estilo de edición — reels Avatar Ads

Basado en `referencias/ref02` (tutorial head talking), adaptado a la marca de `PROYECTO.md`.

## Formato
- 1080×1920, 30 fps, 30–60 s.
- **Base**: el avatar en plano fijo (los clips de Flow). Siempre el mismo encuadre.
- **Ritmo**: un cambio visual cada **~2 s** (corte a cutaway, entrada de overlay o texto). No dejar más de 4 s seguidos de cara sin que pase nada en pantalla.
- Cortes secos entre clips y cutaways. Las animaciones van dentro de los overlays.
- **Zooms sobre el avatar (obligatorio)**: el video va dentro de un wrapper `#zoom` (origen 50% 42%) y se anima su `scale`:
  - Intro: acercamiento lento 1 → 1.12 y **golpe (punch-in, 0,18 s)** a ~1.26 en la palabra clave del hook; sigue empujando hasta ~1.3.
  - Cada vuelta a la cara después de un cutaway arranca con una escala distinta (1.0 / 1.1 / 1.2) para que el corte se sienta.
  - Golpe de zoom en cada frase de impacto ("parece IA", "este video", la palabra del CTA). Entre golpes, empuje lento lineal.
  - Máximo ~1.34: la cara nunca debe quedar tapada por los textos de arriba.

## Patrón por bloque

| Bloque | Visual |
|---|---|
| Hook (0–~5 s) | Cara arriba (o completa) + **título del hook arriba** palabra por palabra, palabras clave en acento. Abajo, un elemento de prueba (tarjetas de reels/anuncios con métricas, o el antes/después). |
| "Paso N" | Cara + rótulo grande "Paso N" arriba + iconos de la herramienta que entran escalonados. |
| Explicación del paso | **Cutaway a pantalla completa** de 1,5–4 s mostrando lo que se dice: mockup de UI, grabación de pantalla, resultado, etc. |
| Paso del producto (avatar/IA) | Secuencia demostrativa: foto de referencia → flecha que se dibuja → "AVATAR CON IA" → 2–3 clips del avatar en distintas escenas. |
| Resultado / prueba | Dashboard o métricas animadas (contadores que suben, el número ganador en verde). |
| Puente al CTA | **Mockup del lead magnet** (portada/guía) con fade-in y leve escala. |
| CTA final | Cara + texto "Comenta **"PALABRA"** y te lo envío", palabra en acento; el avatar debería señalar hacia abajo si el clip lo permite. |

## Texto en pantalla
- **No hay subtítulos completos.** Solo frases clave: hook, "Paso N", nombre de la herramienta, frase resumen del paso y CTA.
- Posición: tercio superior (zona segura: no por encima del 8 % ni debajo del 75 % de la altura; evitar la franja derecha donde van los botones de IG).
- Tipografía: serif condensada elegante, blanca, sombra suave (como ref01/ref02) para frases. Archivo extendida para rótulos tipo "PASO 1" y mockups. Inter para UI.
- **Color de acento de palabras clave: verde neón `#C5F740`** (en lugar del amarillo de la referencia).
- **Prohibido el rojo en textos** (decisión del usuario): todo texto va en blanco `#F8F8F8` o verde `#C5F740`, incluidas las palabras "negativas" (FALSOS, PARECE IA) y los rótulos de "forma incorrecta" (chip oscuro `#090F0B` con borde `#305E4A`). El rojo solo se permite en iconos de ✕ (círculo pequeño, sello sobre una imagen), nunca en letras, fondos de texto ni bordes.
- Aparición palabra por palabra o línea a línea, sincronizada con la voz (usar la transcripción con tiempos).

## Paleta de cutaways (marca)
- Fondos UI: `#020604` / tarjetas `#090F0B`, bordes `#305E4A`, acento `#C5F740`, texto `#F8F8F8` / `#DDDAD7`.
- Fondo "papel/editorial" cálido para secuencias de proceso (como el "AI cloning" de la referencia): crema con textura suave, sombras.

## Audio
- **Sin música de fondo** (decisión del usuario, para todos los reels). Solo voz + efectos de sonido.
- **Voz normalizada a −14 LUFS** (estándar de Instagram), pico ≤ −1,5 dBTP: al re-encodear `input-video.mp4` aplicar
  `highpass=f=70,acompressor=threshold=-22dB:ratio=3:attack=5:release=90:makeup=2,loudnorm=I=-14:TP=-1.5:LRA=7`. Medir con `ebur128` antes de renderizar.
  El render baja ~1,5 dB: **después del render** normalizar el MP4 final sin tocar la imagen:
  `ffmpeg -i final.mp4 -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000" -c:a aac -b:a 192k -movflags +faststart out.mp4` y comprobar ≈ −14 LUFS.
- **SFX en cada animación** (volumen 0,25–0,5, por debajo de la voz):
  | Animación | Sonido |
  |---|---|
  | Corte a cutaway / entrada de tarjeta grande | `whoosh-short` |
  | Antes → después, transición larga | `whoosh-cinematic` (1,5 s) |
  | Chip "PASO N", título con rebote, sello | `pop` |
  | Rótulos, etiquetas, tags, pasos dentro del cutaway | `click-soft` |
  | Captura de pantalla de un prompt apareciendo | `typing` (1,5 s) |
  | Golpe de zoom en palabra de impacto | `impact-bass-1` (1 s) |
  | Palabra negativa con temblor | `glitch-1` (1 s) |
  | "Forma correcta" / acierto | `pop` + `chime` suave |
  | Flash de captura | `click` |
  | Revelación ("así hice este video") | `sparkle` |
  | Flecha del CTA | `ping` |
  Dos sonidos que se solapen van en `data-track-index` distintos.

## Checklist de entrega
- [ ] Hook escrito en pantalla en los primeros 0,5 s
- [ ] Ningún tramo de más de 4 s sin cambio visual
- [ ] Palabra clave dicha, escrita en pantalla y en el caption
- [ ] Textos dentro de la zona segura
- [ ] Ritmo natural (regla general del `SKILL.md`): habla desde el fotograma 0, hook sin cortes, ~0,45–0,55 s en cada unión entre clips, ningún silencio > ~0,6 s, sin palabras estiradas, sin dobles cortes
- [ ] Render revisado frame a frame en los cortes
- [ ] Sin música · voz a −14 LUFS · ningún texto en rojo
- [ ] Zooms en la intro y golpes en las frases de impacto
- [ ] Cada animación con su efecto de sonido
