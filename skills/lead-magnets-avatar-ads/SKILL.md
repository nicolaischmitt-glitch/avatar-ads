---
name: lead-magnets-avatar-ads
description: Sistema creador de lead magnets de Avatar Ads 1.0 (PDF de alto valor que entrega lo prometido en un reel y funciona como funnel hacia la landing). Úsalo cuando el usuario quiera crear, actualizar o publicar un lead magnet, la guía/plantilla/checklist de una palabra clave de un reel ("comenta PALABRA"), o los mensajes del DM automático de ManyChat.
---

# Lead magnets · Avatar Ads 1.0

Cada reel termina con "Comenta PALABRA". Quien comenta recibe por DM un lead magnet: un PDF **simple, rápido de consumir y de alto valor** que entrega **exactamente lo prometido en el reel**. Es un funnel: aporta valor y lleva a la landing de Avatar Ads.

Antes de escribir, ten en contexto `PROYECTO.md` (oferta, fechas, branding) y `BASE-CONOCIMIENTO.md` (ángulos, público, tono). Todo vive en `lead-magnets/` (índice en `lead-magnets/README.md`).

## Flujo

### 1. Definir (en el chat, 3–5 líneas)
- **Reel y palabra clave.** Lee el `guion.md` del reel: qué se prometió exactamente en el CTA.
- **Promesa → formato.** Elige el formato más simple que cumpla la promesa:
  | Promesa del reel | Formato |
  |---|---|
  | "el prompt / los prompts que uso" | Guía corta + plantilla copiable (.txt aparte) |
  | "los pasos / el proceso" | Guía paso a paso con capturas |
  | "la lista / las herramientas" | Checklist o stack con para qué sirve cada una |
  | "los ejemplos / hooks / guiones" | Swipe file (banco de ejemplos listos para adaptar) |
- **Título** orientado al resultado ("El prompt JSON para videos UGC que no parecen IA"), no al tema.
- Si la promesa del reel no está clara o falta un dato (no inventar), pregunta antes de escribir.

### 2. Estructura (8–12 páginas verticales 1080×1920)
1. **Portada**: logo, kicker "Guía + plantilla · Comentaste PALABRA", título, una línea de promesa y una **prueba visual** (antes/después, el avatar del reel).
2. **Contexto en 1 página**: por qué funciona / el error que evita (enlaza con el ángulo del reel).
3. **El entregable** (lo prometido): plantilla, pasos o lista. Es el corazón; nunca se recorta por "dejar algo para el curso".
4. **Cómo usarlo** paso a paso (acciones concretas, herramientas reales).
5. **Ejemplo real** del propio contenido de Avatar Ads (el reel, sus clips, su prompt).
6. **Personalización / errores comunes** (tabla problema → solución).
7. **CTA final**: "Esto es una pieza del sistema completo" → qué incluye Avatar Ads + una mención simple al taller en vivo + botón **"Ver más información"** a la landing. **Sin fechas, horarios, cupos ni precio** (decisión del usuario): el lead magnet no vende el taller, solo lleva a la landing, que es donde se vende.

### 3. Reglas de contenido
- Entrega completa y accionable: el lector debe poder aplicarlo hoy sin comprar nada.
- Frases cortas, tuteo, español latino neutro; una idea por bloque; sin relleno.
- No inventar datos (resultados, métricas, testimonios, precios futuros, funciones de herramientas que no hayas visto).
- Las plantillas/prompts salen de su **fuente única** (p. ej. el JSON se genera desde el master prompt en `preparar.mjs`, nunca copiado a mano).
- Lo que el usuario compartió en el reel (su prompt real, sus capturas) es la mejor prueba: úsalo.
- Caras: solo el avatar de Avatar Ads o gente con permiso; las referencias de terceros van difuminadas.

### 4. Diseño (plantilla de marca)
- Copia la estructura de una carpeta existente (p. ej. `lead-magnets/01-prompt-json/`) a `lead-magnets/NN-slug/`.
- `lead-magnet.src.html` usa `../_plantilla/base.css` (fondo `#020604`, acento `#C5F740`, Archivo/Inter/JetBrains Mono). **Ningún texto en rojo**; el rojo solo en iconos ✕.
- Clases disponibles: `.page`, `.kicker`, `h1/h2/h3`, `.lead`, `ul.clean`, `.card(.hi)`, `.steps/.step/.num`, `pre.code` (+ `.hl` resaltado), `table.t`, `.btn`, `.chip`, `.note`, `.foot` (pie con logo + link a la landing, en todas las páginas).
- Cada `.page` mide 1080×1920 y corta lo que sobra: **todo debe caber**. Presupuesto: ~45 líneas de código por página (20px) o ~6 bloques de texto.

### 5. Funnel (links)
- `config.json`: `landing` = `https://taller.droilab.com/?utm_source=instagram&utm_medium=lead-magnet&utm_campaign=<slug-corto>`; extras (p. ej. `.txt`) en `https://taller.droilab.com/recursos/<archivo>`.
- Link a la landing en el pie de **cada** página + página final de CTA con botón. Una mención suave en medio solo si cabe sin apretar.
- `dm-manychat.md`: respuesta pública al comentario (3 variantes), DM 1 con botones al PDF (y extras), DM 2 a los minutos con un tip + mención al taller + botón "Ver más información" a la landing (UTM `utm_medium=dm`). Tampoco aquí fechas ni precio.

### 6. Construir y revisar (obligatorio)
```bash
node lead-magnets/_plantilla/construir.mjs lead-magnets/NN-slug
```
Revisa **cada página** con una captura (el lector de PDF no está disponible):
```bash
chrome --headless=new --hide-scrollbars --allow-file-access-from-files --virtual-time-budget=4000 \
  --window-size=1080,<1920×páginas> --screenshot=full.png file:///…/lead-magnet.html
```
Recorta por páginas con ffmpeg y mira que nada pise el pie ni se corte. El número de páginas del PDF debe coincidir con las `<section class="page">`.

### 7. Publicar y registrar
1. Copia el PDF y los extras a `landing/recursos/` y despliega: `netlify.cmd deploy --prod --dir landing` (desde la raíz). Comprueba que los links respondan 200.
2. Añade la fila al índice `lead-magnets/README.md`.
3. Registra la palabra en `skills/reels-avatar-ads/cta-lead-magnet.md` y en la sección de lead magnets de `BASE-CONOCIMIENTO.md`.
4. Recuerda al usuario configurar la automatización en ManyChat con los textos de `dm-manychat.md`.

### 8. Cuando cambie la oferta
Como los lead magnets no llevan fechas ni precio, no hay que tocarlos cuando cambie la oferta; solo si cambia la URL de la landing (`config.json`) o el nombre del programa.
