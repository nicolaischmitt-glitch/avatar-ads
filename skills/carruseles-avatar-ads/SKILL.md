---
name: carruseles-avatar-ads
description: Sistema de carruseles de Instagram de Avatar Ads 1.0 (máx. 10 slides 1080×1350, diseño de marca con gráficos, esquemas y mockups UI, contenido práctico y CTA "comenta PALABRA" para recibir un lead magnet). Úsalo cuando el usuario quiera crear, diseñar, mejorar o renderizar un carrusel, convertir un reel o un lead magnet en carrusel, o escribir el caption de un carrusel. También cuando diga "nuevo carrusel", "post de carrusel", "slides para Instagram".
---

# Carruseles Avatar Ads — sistema de producción

Objetivo de cada carrusel: **que la gente comente la palabra clave para recibir un lead magnet** (funnel: comentario → DM de ManyChat → PDF → landing). Para lograrlo, el carrusel tiene que **dar algo práctico de verdad** (un método, pasos, un antes/después, una plantilla) y dejar claro que el recurso completo llega al comentar.

Antes de escribir, ten en contexto `PROYECTO.md` (oferta, branding) y `BASE-CONOCIMIENTO.md` (ángulos, dolores, tono, método).

## Archivos

| Archivo | Para qué |
|---|---|
| `references/estructuras.md` | Estructuras de carrusel probadas, reglas de copy y de hook. Leer en la fase 2. |
| `references/componentes.md` | Catálogo de componentes visuales (qué clase usar para cada tipo de mensaje). Leer en la fase 3. |
| `Contenido/carruseles/_plantilla/base.css` | Sistema de diseño (marca, tipografías, componentes). Cambios de estilo globales: aquí. |
| `Contenido/carruseles/_plantilla/slides.js` | Iconos, barra superior/inferior automática, modo `?s=N` y chequeo de zona segura. |
| `Contenido/carruseles/_plantilla/render.mjs` | HTML → `png/slide-NN.png` + `png/_resumen.jpg` + reporte de desbordes. |
| `Contenido/carruseles/01-prompt-json/` | Carrusel de ejemplo completo: cópialo como punto de partida. |
| `lead-magnets/README.md` | Palabras clave en uso y sus lead magnets (fuente única). |

## Carpeta de cada carrusel
```
Contenido/carruseles/NN-slug/
├── guion.md        ángulo, palabra clave, texto slide por slide, caption
├── carrusel.html   diseño (usa ../_plantilla/base.css y slides.js)
├── img/            imágenes que usa (frames del avatar, capturas, portada del lead magnet)
└── png/            slide-01.png … (lo que se sube a Instagram) + _resumen.jpg
```

## Flujo

### Fase 1 — Definir (en el chat, 4–6 líneas)
- **Tema y ángulo** (de `BASE-CONOCIMIENTO.md` §5) y **perfil** (anunciante o freelancer).
- **Palabra clave y lead magnet.** Revisa `lead-magnets/README.md`. Si ya existe un lead magnet que encaja, úsalo. Si no, propón palabra + promesa y avisa que habrá que crearlo con el skill `lead-magnets-avatar-ads` antes de publicar.
- **Lo práctico:** qué se lleva el lector solo con ver el carrusel (no lo guardes todo para el PDF: el carrusel da el mapa y el PDF da el detalle/la plantilla).
- **Activos visuales:** qué imágenes reales hay (frames de videos en `Contenido/reels/`, `landing/videos/*.jpg`, `lead-magnets/*/`, `Contenido/reels/*/recursos/`) y cuáles necesitas pedirle al usuario.

### Fase 2 — Guion (`guion.md`) → aprobación
1. Lee `references/estructuras.md` y elige estructura.
2. Escribe slide por slide: **mensaje único** del slide + título + (opcional) 1 línea de apoyo + qué gráfico lo explica.
3. Escribe el caption (ver estructuras.md).
4. **Para y pide aprobación** del guion (puede ser una tabla corta). Si el usuario ya dio todo el contenido y pidió ir directo, avanza.

### Fase 3 — Diseño (`carrusel.html`)
1. Copia `Contenido/carruseles/01-prompt-json/carrusel.html` como base y borra lo que no sirva.
2. Cada `<section class="slide">` = un slide. Estructura: cabecera (kicker o `step-head`) + título + `<div class="grow">` con **un** gráfico principal. La barra superior (logo + 01/09) y la inferior (progreso + DESLIZA) las añade `slides.js`: no las escribas.
3. Elige el componente según el mensaje (`references/componentes.md`). Regla: **cada slide lleva al menos un elemento visual** (gráfico, esquema, mockup, imagen anotada, iconos); un slide de solo texto se permite únicamente si es una frase-impacto corta.
4. Imágenes: copia a `img/` las que uses. Para la portada del lead magnet: captura de la página 1 de su `lead-magnet.html` (Chrome headless 1080×1920, ver el ejemplo) reducida a 540 px.
5. Estilos solo de ese carrusel: en el `<style>` del propio HTML. Si un ajuste sirve para todos, súbelo a `base.css`.

### Fase 4 — Render y revisión (obligatorio)
```bash
node Contenido/carruseles/_plantilla/render.mjs Contenido/carruseles/NN-slug          # todos
node Contenido/carruseles/_plantilla/render.mjs Contenido/carruseles/NN-slug --solo 3 # solo un slide al iterar
```
- Si el script reporta "no cabe" o "fuera de la zona segura": recorta texto o achica el gráfico (no reduzcas la letra por debajo de los mínimos de `componentes.md`) y repite.
- **Mira `png/_resumen.jpg` y luego cada slide a tamaño real** con Read. Revisa: textos cortados o con palabras sueltas en la última línea, elementos que se tocan, jerarquía clara (se entiende en 2 segundos), contraste, coherencia de la serie, que la portada funcione también como miniatura.
- Corrige y vuelve a renderizar hasta que esté limpio. Solo entonces entrega.

### Fase 5 — Entrega
- Envía el `_resumen.jpg` y di dónde están los PNG (`Contenido/carruseles/NN-slug/png/`), en orden.
- Muestra el caption listo para copiar.
- Recuerda (una vez) que la automatización comentario → DM de ManyChat debe estar activa con la palabra clave; si el lead magnet no existe aún, ofrece crearlo con `lead-magnets-avatar-ads`.
- Registra el carrusel en `Contenido/carruseles/README.md`.

## Reglas
- **Máximo 10 slides** (ideal 7–9). El render falla con más de 10.
- **Un mensaje por slide.** Título ≤ 8–9 palabras; texto de apoyo ≤ 15 palabras; máximo 3 viñetas.
- La **palabra clave** aparece en el último slide (grande, con el mockup del comentario) y en el caption.
- Marca: solo colores y fuentes de `base.css`. Rojo (`--bad`) solo para errores/❌, nunca para texto largo.
- No inventar datos: ni métricas, ni resultados, ni testimonios, ni funciones de herramientas que no hayas visto. Las citas de prompts salen de capturas reales o del master prompt.
- Caras: solo el avatar de Avatar Ads o imágenes generadas; referencias de personas reales, difuminadas (como `lead-magnets/01-prompt-json/referencia.jpg`).
- Mockups de apps: genéricos (chat, ventana de código, reproductor), sin logos de marcas de terceros.
- No poner precio, fechas ni cupos del taller en el carrusel: su trabajo es conseguir el comentario.
