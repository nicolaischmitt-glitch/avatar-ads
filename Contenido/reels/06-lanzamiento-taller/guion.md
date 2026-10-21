# Reel 06 — Lanzamiento del taller (estilo Matt Gray)

Formato C (nuevo): **el usuario hablando a cámara** + edición estilo Matt Gray (referencia `referencias/matt gray reel style.mp4`).
Clips: `clips/clip-01.mp4` … `clip-05.mp4` (grabados en el carro, 576×1024, 30 fps).
Palabra clave del CTA: **TALLER** (dicha en el video, escrita en pantalla y en el caption).

## Edición
- `edicion/scripts/unir.mjs` → `edicion/base.mp4` (76,3 s): cortes de silencios (pausas a ~0,25 s), micro-crossfade de audio y la misma mejora de voz de los reels de voz en off (−14 LUFS).
- `edicion/scripts/fondo.mjs` → `edicion/public/base-blur.mp4`: **fondo del carro desenfocado** y algo más oscuro. Recorte con IA (u2net_human_seg de HyperFrames) de 1 cuadro cada ~1,5 s → máscara fija por toma (cámara fija): cabeza = recorte IA; cuello/hombros = recorte IA limitado a un ancho que se abre hacia los hombros (la IA unía los reposacabezas con los hombros); pecho = todo. Recortar los 2.292 cuadros tardaba >4 h en esta PC.
- `edicion/public/index.html`: composición. Sin subtítulos (decisión del usuario: las animaciones bastan). Sin música; solo SFX.

## Estilo Matt Gray (lo que se tomó de la referencia)
- Pantalla dividida: arriba el gráfico/B-roll sobre fondo oscuro, abajo la persona. Se alterna con la persona a pantalla completa con zoom lento en las frases de impacto.
- Acento verde lima (el `#C5F740` de la marca), chips y tarjetas, listas con línea vertical luminosa ("1. DÍA 1 · 2. DÍA 2 · 3. DÍA BONO").
- Cambio visual cada 2–4 s.

## Escenas
| Tiempo | Voz | Modo | Gráfico |
|---|---|---|---|
| 0–5,9 | Probé todas las herramientas de IA… | dividida | Cuadrícula de 9 apps de IA genéricas · "PARA VIDEOS HIPERREALISTAS" |
| 5,9–7,4 | Gasté cientos de dólares | dividida | Lista de cargos −$$ · "CIENTOS DE DÓLARES" |
| 7,4–10,0 | solo una metodología me funcionó | dividida | Las apps se tachan, una queda en verde ✓ |
| 10,0–11,9 | la más económica de todas | completa | chip "LA MÁS ECONÓMICA" |
| 11,9–15,3 | Este lunes 26 de octubre… taller | dividida | Calendario OCTUBRE 26 LUNES · "TALLER EN VIVO · 7:00 PM (ECUADOR)" |
| 15,3–19,0 | todo el proceso | dividida | 1. Guion · 2. Imágenes · 3. Animación · 4. Edición |
| 19,0–22,6 | anuncios hiperrealistas… lo más económico | dividida | Teléfono con el anuncio del labial (hecho con IA) |
| 22,6–26,9 | no gastar cientos de dólares… Seedance | dividida | Tarjeta SEEDANCE $$$ tachada |
| 26,9–30,6 | cada anuncio en centavos | completa | "CADA ANUNCIO · EN CENTAVOS" |
| 30,6–33,9 | altísima calidad | dividida | Ejemplos airpods + skincare reproduciéndose |
| 33,9–39,5 | 2 días + tercer día de bono | dividida | Lista Día 1 · Día 2 · Día bono |
| 39,5–43,4 | ofrecerlo como servicio | completa | "¿QUIERES OFRECERLO COMO SERVICIO?" |
| 43,4–48,4 | mi flujo de trabajo | dividida | Prospectar → Propuesta → Producir → Entregar → Cobrar |
| 48,4–53,1 | vender a negocios locales | dividida | Restaurante · Clínica · Tienda con sello "anuncio vendido ✓" |
| 53,1–55,3 | le sirve a 2 personas | dividida | "2 PERFILES" |
| 55,3–60,4 | si ya tienes un negocio | dividida | Gráfico de ventas que sube + anuncios que se multiplican |
| 60,4–64,9 | ofrecer esta habilidad como servicio | dividida | "2. FREELANCER" |
| 64,9–71,5 | cobrar $30–$50… por centavos | dividida | Cobras $30–$50 vs te cuesta ¢ |
| 71,5–76,4 | Comenta TALLER | completa | Caja de comentario escribiendo TALLER + "COMENTA TALLER" |

## Caption de Instagram
Probé todas las herramientas de IA para crear videos hiperrealistas. Gasté cientos de dólares… y solo una metodología me funcionó. Y es la más económica de todas.

Este lunes 26 de octubre abro el taller en vivo de Avatar Ads 1.0:
→ 2 días en vivo para crear anuncios UGC hiperrealistas de principio a fin, por centavos
→ + un día bonus para aprender a vender este servicio a negocios
→ 7:00 p.m. (hora de Ecuador) · cupo para 15 personas

Comenta TALLER y te envío toda la información por DM.
