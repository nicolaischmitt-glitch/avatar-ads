# Catálogo de componentes (carruseles/_plantilla/base.css)

Lienzo: 1080×1350. Zona de contenido: 920 px de ancho; ~1050 px de alto entre las barras. Todo el ejemplo vivo está en `carruseles/01-prompt-json/carrusel.html`.

## Elegir el componente según el mensaje

| El slide dice… | Componente | Ejemplo en 01 |
|---|---|---|
| "Esto vs. esto" / antes → después | `.cover-visual` o `.after-before` con dos `.phone` + flecha, o `.compare` | slides 1, 7 |
| "Así funciona / así lo hace la mayoría" (secuencia) | `.flow.v` (vertical) o `.flow` (horizontal) con `.node` + `.arr` | slide 2 |
| "Fíjate en estos detalles" | `.annot.wide` + `.phone` + `.pin` (izq. con `.left`) | slides 3, 5 |
| "Los N pasos" (mapa) | `.stepper` con `.st.on` | slide 4 |
| "Paso N" | `.step-head` (`.big-n` + `.of`) + título + un gráfico | slides 5–8 |
| "Elige este momento / frame" | `.player` (`.frames` + `img.on` + `.track`) | slide 6 |
| "Escribe esto" (prompt) | `.chat` + `.msg.user` (`.good` / `.bad`) | slide 7 |
| "Código / JSON / configuración" | `.window` + `pre.code` (`.k` clave, `.s` texto, `.hl` resaltado, `.c` comentario) | slide 8 |
| "Lo que ganas / revisa esto" | `ul.checks` (`.checks.bad` para errores) | slides 8, 9 |
| Etiquetas cortas | `.pill` (`.acc`, `.solid`, `.bad`) con icono opcional | varios |
| Veredicto rápido | `.badge` (✓) / `.badge.bad` (✕) sobre un `.phone` | slide 1 |
| Resultado / conclusión | `.card.hi` o el bloque `.result` | slide 2 |
| CTA | `.keyword` + `.ig-comment` + `.doc-stack` (portada del lead magnet) + `ul.checks` | slide 9 |

## Piezas
- **Texto:** `.kicker` (etiqueta superior con punto verde), `h1` (solo portada, 92 px), `h2` (títulos, 70 px), `h3` (dentro de nodos/pasos), `.lead` (apoyo, 38 px), `.small`. Resaltados: `.mark` (fondo verde), `.acc` (texto verde), `.bad-t` (rojo, una palabra), `.strike` (tachado rojo).
- **Iconos:** `<i class="ic" data-i="NOMBRE"></i>` — x, check, arrow, down, play, image, video, chat, frame, user, swap, spark, code, comment, send, download, file, eye, sun, angle, pose, box, search, wand, lock, clock, coin, target, layers, curve. Contenedor: `.dot-ic` (`.solid`, `.bad`). Para añadir uno: path SVG 24×24 en `slides.js`.
- **Imágenes:** `.phone` (9:16, `.sm` 300 px, `.lg` 460 px; `.tilt-l/.tilt-r`; `.dim` apaga el "malo"), `.shot` (captura con borde), `.crop` + `<i class="c tl|tr|bl|br">` (esquinas de captura).
- **Layout:** `.grow` (ocupa el resto y centra; **siempre envuelve el gráfico principal**), `.row`, `.stack`, `.center`, `.mt-s/.mt/.mt-l/.mt-0`. `.deco` excluye un elemento del chequeo de zona segura (solo para adornos que pueden sobresalir).
- **Fondo:** `.slide` trae degradado + cuadrícula; `.slide.glow-bottom` para el CTA; `.slide.no-chrome` quita barras (casi nunca).

## Mínimos de legibilidad (en el celular el slide se ve a ~35 %)
- Texto de lectura ≥ 28 px; código ≥ 21 px; etiquetas `.pill` ≥ 22 px.
- Máximo ~45 palabras visibles por slide (incluido el gráfico).
- Contraste: texto sobre fondo oscuro con `--text`/`--muted`; nunca `--meta` para información clave.

## Pins de anotación (`.annot.wide` = 920×620, teléfono centrado de 349 px: x 285–634)
- A la derecha: `style="left:540px; top:Ypx; --l:60px"` (el punto cae dentro de la imagen y la etiqueta sale hacia fuera).
- A la izquierda: clase `.left` y `style="right:560px; top:Ypx; --l:60px"`.
- Alterna lados y separa ≥ 100 px en vertical. Si una etiqueta choca con el borde, acorta el texto o `--l`.
