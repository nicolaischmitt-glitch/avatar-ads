# Anuncio 04 — "Yo no existo"
Estado: **en producción** (21 oct 2026) · paso 2: imágenes del avatar.
**Dos tomas** (primera vez en este formato):
- **Toma 1 · carro** (selfie en tres cuartos, cuero coñac, chaqueta de cuero): del hook hasta "¡Un solo segundo!" (lo personal, la revelación y el precio). Imagen elegida: `avatar/avatar-carro.jpg` (prompt `avatar/prompt-toma1-carro.json` + referencia `avatar/referencia-angulo.png`).
- **Toma 2 · casa/oficina** (escritorio, ropa de casa, laptop visible): desde "Y no se trata solo de ahorrar" hasta el final (el argumento de negocio: testear, escalar, pruebas, CTA). Prompt `avatar/prompt-toma2-casa.json`, generado **adjuntando `avatar-carro.jpg`** para mantener a la misma mujer.
- En Flow, cada clip usa la imagen de su toma. El cambio de toma es un corte de escena (no hace falta taparlo con zoom).
Historial del avatar: v1 bloqueada por el filtro · v2 se veía falsa (frontal, volante, interior básico; `avatar/v2-resultado-falso.jpg`) · v3 con la referencia de ángulo = elegida.
Origen: versión reescrita del copy del anuncio 03 (`anuncios/03-calidad-seedance-centavos/`).
Formato: **D · head talking de una toma + B-rolls** (`skills/reels-avatar-ads/formatos/head-talking/LEEME.md`). Duración estimada: 35–40 s.
Avatar: **mujer de ~30 años en su carro de lujo** (estacionado, luz frontal por el parabrisas), creada desde cero con Nano Banana. Nacionalidad sin definir: el prompt usa "latinoamericana".
Ángulos: revelación del avatar (la propia pieza es la prueba) + sistema económico + volumen de testeo → escalar.

## Guion (versión del usuario, 21 oct 2026)
> **[HOOK]** Yo no existo. Mi creador me hizo con inteligencia artificial por sesenta y siete centavos… y en menos de veinte minutos.
> Con Seedance, un solo segundo de video te puede costar casi un dólar. ¡Un solo segundo!
> Y no se trata solo de ahorrar. Si cada anuncio te cuesta centavos, puedes testear decenas, encontrar tus anuncios ganadores mucho más rápido… y ese es el secreto para escalar.
> Así se escalan productos digitales… *(video de ventas de Hotmart)*
> y también servicios tradicionales. *(chat de Sebastian)*
> Si quieres aprender a hacerlo, únete al taller en vivo de Avatar Ads: dos días, paso a paso. Toca el botón y reserva tu lugar.

## Clips (propuesta, 7 clips · 52 s generados ≈ 42 s editado)
| Clip | Toma | Duración | Texto exacto |
|---|---|---|---|
| 01 | carro | 8 s | Yo no existo. Mi creador me hizo con inteligencia artificial por sesenta y siete centavos… |
| 02 | carro | 4 s | y en menos de veinte minutos. |
| 03 | carro | 8 s | Con Seedance, un solo segundo de video te puede costar casi un dólar. ¡Un solo segundo! |
| 04 | casa | 8 s | Y no se trata solo de ahorrar. Si cada anuncio te cuesta centavos, puedes testear decenas, |
| 05 | casa | 8 s | encontrar tus anuncios ganadores mucho más rápido… y ese es el secreto para escalar. |
| 06 | casa | 6 s | Así se escalan productos digitales… y también servicios tradicionales. |
| 07 | casa | 10 s | Si quieres aprender a hacerlo, únete al taller en vivo de Avatar Ads: dos días, paso a paso. Toca el botón y reserva tu lugar. |

## Storyboard
`moodboard/storyboard-anuncio-04.png` (fuente `moodboard/moodboard.html`). 16 escenas: 7 en el carro (01–07) y 9 en la casa (08–16). Las caras salen de las imágenes base porque todavía no hay clips; se reemplazan por frames reales al editar.
**Lenguaje visual propio (el usuario pidió animaciones distintas a las del anuncio 03):** subtítulos en mayúsculas con la palabra clave en píldora verde; pantalla dividida (gráfico arriba, avatar abajo) en vez de B-roll a pantalla completa; video del avatar en burbuja sobre las pruebas; escaneo IA + glitch en el hook; galería de Nano Banana en abanico (`moodboard/assets/gal-1..3.png`); etiqueta de precio colgante; píldora con reloj que gira; taxímetro de Seedance (tiempo → dinero); "1s" gigante con contorno + destello; transición whip al cambiar de toma; muro de anuncios en perspectiva + sellos "WINNER" (7); escalera de barras; teléfono en 3D con marcador a mano y resaltador; logo con brillo + "TALLER EN VIVO"; calendario "2 DÍAS" (sin detallar qué se ve cada día); botón con toque y ondas.
**Subtítulos en pantalla dividida (decisión del usuario, opción 1):** en las escenas 02, 05, 06 y 11 el subtítulo se apoya sobre la línea divisoria como una franja; el panel de arriba baja al ~43 % de la altura (0–820 px) y el video de abajo se encuadra con la cara justo debajo de la franja. En las escenas a pantalla completa el subtítulo sigue a la altura del pecho. Nunca subtítulos en el ~20 % inferior (lo tapa la interfaz de Reels/Stories).

## Hooks alternativos para testear (solo cambia el primer clip)
- A: "Yo no existo. Nicolai, mi creador, me hizo con IA por sesenta y siete centavos…"
- B: "¿Y si pudieras crear anuncios con la calidad de Seedance… pero por centavos?"
- C: "Este anuncio no lo grabó nadie. Y costó menos que un café."

## Antes de producirlo
- **Cifra de Seedance:** "te puede costar casi un dólar" se sostiene con el precio oficial de BytePlus: Seedance 2.0 en 1080p con video de referencia, hasta $0,91/s (Seedance 2.5, hasta $2,38/s). En pantalla, la fuente: "Seedance 2.0 · 1080p con video de referencia · BytePlus · oct 2026". Tabla completa en `anuncios/03-calidad-seedance-centavos/guion.md`.
- **$0,67 y 20 minutos:** usar el costo real de este anuncio (anotar créditos al generar).
- **Evergreen:** sin precio ni fecha del taller, ni en la voz ni en pantalla (los detalles están en la landing).
- **Sebastian:** resultados con anuncios de IA (confirmado por el usuario). Mostrarlo como resultado de un cliente, nunca como alumno ni como promesa.

## Edición (21 oct 2026)
`edicion/` (mismo flujo del formato D): `cortes.txt` → `unir-clips.mjs` → `base.mp4` → `transcript.json` → `build.mjs` (set de animaciones propio, ver arriba) → `finales/anuncio-04-yo-no-existo.mp4` (38,4 s, 1080×1920, −14,9 LUFS).
Pendiente de confirmar por el usuario: clip 02 ("veinte" sonó como "dos" para la transcripción) y clip 06 (dura 4 s; "tradicionales" puede quedar cortado al final). Galería de la escena 2 en baja resolución (465 px).

## Edición v3 · "Keynote premium" (22 oct 2026, la que vale)
La v2 (set de animaciones propio) se descartó: cortes que comían finales de palabra y silencios largos (archivada en `_v2-descartada/`). La v3 sigue el storyboard `moodboard/storyboard-anuncio-04-v4.png`: gráficos solo sobre la cabeza, cutaways con su video desenfocado de fondo, tipografía fina, la cara nunca se tapa. Cortes nuevos con la regla dura (verificado en `base.mp4`: 0 huecos > 0,3 s entre palabras). Final: `finales/anuncio-04-yo-no-existo-v3.mp4` (36,9 s).
