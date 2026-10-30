---
name: estaticos-avatar-ads
description: Sistema de anuncios estáticos (imagen) de Avatar Ads 1.0 para Meta Ads: feed 1080×1350 + historia 1080×1920, fondo blanco, frames reales de nuestros avatares, evergreen. Úsalo cuando el usuario quiera crear, variar, corregir o renderizar un anuncio de imagen, un estático, un "creativo de imagen", una versión en imagen de un anuncio en video, o cuando diga "nuevo estático", "anuncio de imagen", "imagen para Meta".
---

# Estáticos Avatar Ads — sistema de producción

Un estático tiene **un segundo** para frenar el scroll y una sola idea. Se entiende en el feed sin leer la letra pequeña, la prueba es la propia imagen (nuestros avatares) y lleva al taller.

Antes de empezar, ten en contexto `PROYECTO.md` (oferta, cifras) y `BASE-CONOCIMIENTO.md` (ángulos, tono). El copy lo escribe el skill `copy-avatar-ads`; este skill decide **cómo se ve**.

## Archivos

| Archivo | Para qué |
|---|---|
| `references/formatos.md` | Catálogo de formatos probados (mosaico, comparación, encuesta, puertas, camino) con su anuncio de referencia. Leer en la fase 2. |
| `references/checklist.md` | Revisión antes de mostrar nada al usuario. Leer en la fase 4. |
| `plantilla/` | `imagen.html` (sistema de diseño + componentes) · `render.mjs` (variantes → PNG + hoja de revisión + aviso de desbordes) · `fonts/`. Se copia entera para cada anuncio nuevo. |
| `anuncios/imagenes/_frames/README.md` | Banco de frames de nuestros avatares, con el encuadre que ya funciona para cada uno. |
| `anuncios/imagenes/NN-slug/` | Los anuncios hechos: cada uno es un ejemplo completo y se puede copiar. |
| `skills/copy-avatar-ads/banco-aprobado.md` | Copy de estáticos ya aprobado y las correcciones del usuario. |

## Carpeta de cada anuncio
```
anuncios/imagenes/NN-slug/        (NN = siguiente número libre en anuncios/, sumando videos e imágenes)
├── imagen.html   diseño (copia de plantilla/imagen.html; las variantes se eligen con ?parámetros)
├── render.mjs    NOMBRE + VARIANTES → final/*.png
├── fonts/
└── final/        NOMBRE.png (feed) · NOMBRE-historia.png · NOMBRE-<variante>.png … · _revision.jpg
```
Los frames no se copian: se usan desde `../_frames/`.

## Flujo

### Fase 1 — Brief (resume en 2–3 líneas lo que entendiste; pregunta solo lo que falte)
- **Qué anuncia:** casi siempre el taller (CTA "Aprende a crearlos en un taller en vivo →"). ¿Es evergreen? (por defecto, sí).
- **Ángulo** (BASE-CONOCIMIENTO §5): realismo ("no existe", "¿real o IA?"), precio (13 veces más barato), proceso (sin grabarte), volumen (decenas de anuncios).
- **Para qué perfil** y si hay un formato o una referencia que el usuario quiera imitar (p. ej. ejemplos que sugiere Meta).

### Fase 2 — Formato + copy
- Elige un formato de `references/formatos.md` (o propón uno nuevo si ninguno encaja, y dilo).
- Copy con el skill `copy-avatar-ads`: 2–3 títulos realmente distintos, uno recomendado. Si el usuario pidió "hazlo ya", usa el recomendado y muestra los otros como alternativas.
- Cifras: **cópialas de la landing/`PROYECTO.md`**, nunca de memoria (ver checklist).

### Fase 3 — Diseño y render
1. Copia `plantilla/` a `anuncios/imagenes/NN-slug/` y cambia `NOMBRE` en `render.mjs`.
2. Elige los frames en `_frames/README.md` con su encuadre (`object-position`). Si hace falta uno nuevo: sácalo del clip **sin subtítulos** (`ffmpeg -ss 2 -i clips/clip-NN.mp4 -frames:v 1 -q:v 2 _frames/<nombre>.jpg`) o usa el `avatar/avatar.jpg` del anuncio (mejor resolución), y anótalo en el README.
3. Escribe el contenido con los componentes de la plantilla. Cada idea alternativa = una variante con `?parámetro` y su propio sufijo de archivo.
4. `node anuncios/imagenes/NN-slug/render.mjs` → revisa `final/_revision.jpg` (todas las variantes con la zona segura de historias marcada) y lee el aviso de desbordes.

### Fase 4 — Revisar y mostrar
- Pasa `references/checklist.md`. Corrige antes de mostrar.
- Envía al usuario los PNG de feed (y los de historia si cambian algo). Di qué archivo es cada variante.

### Fase 5 — Al aprobarse
- Guarda el copy en `skills/copy-avatar-ads/banco-aprobado.md` con la reacción del usuario.
- Si nació un formato nuevo o una regla nueva, agrégalo a `references/formatos.md` / a este archivo.
- Registra la carpeta en `PROYECTO.md` (árbol de `anuncios/imagenes/`).

## Reglas (decisiones del usuario)
- **Fondo blanco** por defecto, tinta negra, verde `#4BA86E` = bueno / Avatar Ads, rojo `#D2322D` = malo / lo de siempre. Se entiende al instante en el feed. La versión oscura de marca solo como alternativa, si se pide.
- **Siempre feed 1080×1350 + historia 1080×1920.** En la historia todo va dentro de la zona segura (250 px arriba, 340 px abajo) y centrado en vertical (la plantilla lo hace sola).
- **Evergreen:** sin fecha, sin "este domingo", sin precio del taller, sin "puestos limitados". Las cifras de costo por anuncio sí se pueden usar (son el ángulo).
- **No nombrar ni mostrar nuestras herramientas** (Nano Banana, Flow…). Seedance solo como comparación de precio.
- **Menos es más:** el mosaico de 9 avatares se veía "muy conglomerado"; 6 respira. Una idea, un título grande, una línea de apoyo, un CTA.
- **Nunca tapar caras ni el producto.** Si el frame muestra un producto (frasco ALBA), se tiene que ver entero.
- **Etiquetas centradas** y todas en el mismo lugar ("izquierda y derecha mezcladas se ven desorganizadas").
- **Encuadres parejos:** misma altura de cabeza en todas las fotos de una cuadrícula; sin espacio vacío arriba de la cabeza.
- **Nunca sobrescribir una versión:** cada variante tiene su sufijo (`-6`, `-30s`, `-marca`…). Si cambias una cifra o el diseño de una versión que el usuario ya vio, crea una variante nueva en vez de reemplazarla, salvo que pida reemplazarla.
- Las cifras llevan `~` y una nota de qué miden ("Costo aproximado de un anuncio de 30 segundos.").
