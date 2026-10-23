---
name: reels-avatar-ads
description: Sistema de reels y anuncios en video de alto engagement para Avatar Ads 1.0 (talking head + cutaways/B-rolls, podcast, voz en off; CTA "comenta PALABRA" o CTA a la landing en anuncios pagados). Úsalo cuando el usuario quiera crear un reel o un anuncio en video nuevo, mejorar o escribir un guion o copy, generar los prompts JSON de Google Flow para los clips del avatar, hacer el storyboard, o editar un reel/anuncio con los clips que ya generó. También cuando diga "nuevo reel", "nuevo ad", "guion para reel", "prompts para Flow", "storyboard", "ya tengo los clips".
---

# Reels Avatar Ads — sistema de producción

Actúas como experto en contenido short form de alto engagement para Instagram. Objetivo: **el propio contenido es el marketing**. Cada reel enseña algo útil sobre crear anuncios/avatares con IA, muestra el producto (el avatar ES una demostración de lo que se enseña) y termina con un CTA de palabra clave que entrega un lead magnet por DM.

Contexto de marca y oferta: `PROYECTO.md` (raíz del proyecto). Léelo si no lo tienes en contexto.

## Formatos de reel
- **A · Avatar talking head** (flujo de 5 fases de abajo): guion → prompts JSON para Flow → clips del avatar → edición con cutaways y CTA "comenta PALABRA".
- **B · Voz en off del usuario + motion graphics**: el usuario deja su grabación en `Contenido/reels/` (al crear la carpeta del reel se mueve a `Contenido/reels/NN-slug/voz-original.mp4`) y se edita con gráficos, ilustraciones, maquetas UI y logos. Sin avatar, **sin mencionar Avatar Ads, sin música**, solo SFX. Todo el procedimiento y sus reglas están en **`Contenido/reels/_plantilla-voz-en-off/LEEME.md`** (léelo completo antes de editar uno). Ejemplos: `Contenido/reels/02-…` y `Contenido/reels/03-…`.
- **C · Podcast (2 personajes conversando)**: plano/contraplano de dos avatares en un estudio, el escéptico pregunta y el experto responde y cierra con el CTA. Sirve para reels y anuncios. Mismo flujo de 5 fases, pero los prompts usan las plantillas por personaje de **`formatos/podcast/`** (derivadas del master, misma estructura) y el validador con `--plantilla`. Lee **`formatos/podcast/LEEME.md`** completo antes de dividir el guion. Ejemplo: `Contenido/reels/07-podcast-seedance-centavos/`.
- **D · Head talking de una toma + B-rolls (anuncio directo)**: un avatar creado desde cero (Nano Banana) habla a cámara en una sola toma, intercalado con B-rolls, gráficos y pruebas reales al ritmo del reel 07; avatar en cámara ≈ 60–65 %. Objetivo: vender (anuncios pagados evergreen → landing; también sirve para orgánico). Proceso completo (copy → avatar → prompts → clips → revisión → storyboard → edición → render), catálogo de escenas, plantilla de `build.mjs` y errores ya resueltos en **`formatos/head-talking/LEEME.md`** (léelo completo antes de empezar uno). Ejemplo: `anuncios/03-calidad-seedance-centavos/`.

**Storyboard / moodboard** (cualquier formato): solo la lámina de frames visuales (frames reales + gráficos de la edición), sin paneles de reglas, recursos, paleta ni tipografía. El estilo de referencia es el **render final** del reel 07, no su moodboard viejo.

## Archivos de este skill

Ubicación real: `skills/reels-avatar-ads/` (en `.claude/skills/reels-avatar-ads` hay solo un enlace para que Claude Code lo cargue). Las rutas sin prefijo de esta tabla son relativas a la carpeta del skill; las demás, a la raíz del proyecto.

| Archivo | Cuándo leerlo |
|---|---|
| `references/frameworks-guion.md` | Fase 2 (siempre antes de escribir o mejorar un guion) |
| `references/estilo-edicion.md` | Fase 2 (plan de cutaways) y Fase 5 (edición) |
| `references/recursos-visuales.md` | Fase 2 (lista de recursos) y Fase 5 |
| `cta-lead-magnet.md` | Fase 2 (palabra clave y promesa del CTA) |
| `scripts/validar-json.mjs` | Fase 4, obligatorio antes de entregar los prompts |
| `scripts/detectar-estiramientos.mjs` | Fase 5 de todos los formatos: silencios y palabras estiradas (regla de voz fluida) |
| `scripts/medir-voz.mjs` | Fase 5: inicio, fin y huecos de la voz por nivel de audio (para `cortes.txt`; Parakeet adelanta ~0,4 s los tiempos en clips sueltos) y nivel cada 20 ms para ubicar una palabra a quitar |
| `formatos/head-talking/` | Formato D: `LEEME.md` + `edicion/` (plantillas `build.mjs`, `unir-clips.mjs`, `cortes` de ejemplo) |
| `skills/master prompt para json prompts imagenes.md` | Avatar desde cero (frame de Nano Banana) |
| `skills/master prompt para json prompts videos.txt` | Fase 4. **Fuente única de verdad** de los prompts JSON. Léelo completo cada vez; no lo copies a otro sitio. |

Referencias analizadas: `referencias/ref02_tutorial-head-talking_desglose.md` (formato base) y `referencias/ref01_desglose.md`.

## Carpeta de cada reel

```
Contenido/reels/NN-slug/            (NN = número correlativo: 01, 02…)
├── guion.md              guion final + tabla de clips + plan de cutaways + caption de IG
├── guion.txt             solo el texto hablado aprobado (lo usa el validador)
├── prompts-flow.md       los JSON por clip, cada uno en su bloque de código
├── prompts/clip-01.json  … mismos JSON en archivos sueltos (para validarlos)
├── clips/                aquí deja el usuario clip-01.mp4, clip-02.mp4… de Flow
├── recursos/             capturas, grabaciones de pantalla, imágenes que aporta el usuario
├── edicion/              proyecto HyperFrames
└── final/                reel-NN-slug.mp4
```

## Flujo (5 fases)

### Fase 1 — Entrada
El usuario da una idea o un borrador. Si falta algo imprescindible (tema), pregunta una sola vez. Si no, avanza. Crea la carpeta `Contenido/reels/NN-slug/`.

### Fase 2 — Guion
1. Lee `references/frameworks-guion.md` y `cta-lead-magnet.md`. El copy (ángulo, hook, mensaje, CTA) sigue el skill `copy-avatar-ads`: su flujo de opciones + checklist y su `banco-aprobado.md`.
2. Elige la estructura que mejor encaja (o la que pida el usuario) y escribe/mejora el guion: 30–60 s, español neutro latino, frases cortas y habladas.
3. Si el usuario dio un borrador, conserva su idea y su voz; mejora hook, estructura, especificidad y CTA. Explica en 2–3 líneas qué cambiaste y por qué.
4. Divide el guion en clips (reglas del master prompt: 4/6/8/10 s, prioriza 6 y 8; tabla de palabras por duración en frameworks-guion.md).
5. Añade el **plan de cutaways** (qué se ve encima en cada momento) según `estilo-edicion.md`, y la **lista de recursos**: qué genero yo, qué busco yo y qué necesito del usuario (`recursos-visuales.md`).
6. Escribe el caption de Instagram (con la palabra clave) en `guion.md`.
7. **Para y pide aprobación del guion.** No generes prompts hasta que el usuario apruebe o pida cambios.
8. Al aprobarse, guarda solo el texto hablado en `guion.txt`.

### Fase 3 — Imagen de referencia
Normalmente el usuario ya tiene la imagen/frame del avatar para Flow: no la generes. Si quiere crear el avatar desde cero, escríbele el JSON prompt para Nano Banana con la estructura fija de `skills/master prompt para json prompts imagenes.md` (él genera la imagen). Si no sabes cómo es el avatar (hombre/mujer), pregúntalo: afecta a `dialogue.speaker`.

### Fase 4 — Prompts JSON para Google Flow (Omni)
1. Lee **completo** `skills/master prompt para json prompts videos.txt`. Sus reglas mandan sobre todo lo demás de esta fase.
2. Un JSON por clip, con la estructura LOCKED IN. Solo cambian `scene.dialogue.script` (fragmento exacto del guion aprobado) y `scene.performance.hand_gestures.synchronization` (gestos concretos según el significado). Nada más, salvo que el usuario autorice expresamente otra variable (p. ej. `speaker`, acento).
3. El guion de los clips concatenado debe ser **idéntico palabra por palabra** al guion aprobado.
4. Guarda cada JSON en `prompts/clip-NN.json` y ejecuta:
   `node "skills/reels-avatar-ads/scripts/validar-json.mjs" Contenido/reels/NN-slug/prompts --guion Contenido/reels/NN-slug/guion.txt`
   (añade `--allow ruta.de.la.clave` solo para variables que el usuario autorizó expresamente, p. ej. `--allow scene.dialogue.speaker`).
   Si falla, corrige y repite. No entregues prompts que no pasen.
5. Escribe `prompts-flow.md` con el formato de salida del master prompt (total de clips y duración; por clip: número, descripción breve, duración y el JSON en su propio bloque).
6. Muestra los prompts en el chat también, listos para copiar. Recuerda al usuario dónde dejar los clips (`clips/clip-01.mp4`…).

### Fase 5 — Edición
Cuando el usuario diga que los clips están en `clips/`:
1. Revisa cada clip (frames + transcripción con `hyperframes transcribe`). Avisa si el diálogo no coincide, hay texto generado, manos deformes o cambios de cara. Sugiere regenerar solo los clips malos.
2. Une los clips aplicando la regla de **voz fluida** (Reglas generales): arranque inmediato, sin pausas > 0,3 s, sin palabras estiradas, cortes alineados a fotogramas.
3. Edita siguiendo `references/estilo-edicion.md`: entra por el skill `hyperframes` (y `hyperframes-core`, `hyperframes-animation`, `media-use` según haga falta). Construye los cutaways (mockups de UI, títulos, pasos, mockup del lead magnet, etc.).
4. La primera vez, guarda la composición reutilizable en `Contenido/reels/_plantilla-edicion/` para que los siguientes reels partan de ella.
5. Renderiza 1080×1920, 30 fps → `final/reel-NN-slug.mp4`. Revisa frames del render antes de entregar.
6. Entrega el MP4 + el caption.

## Reglas generales
- La palabra clave del CTA debe aparecer **dicha en el clip final, escrita en pantalla y en el caption**.
- Nunca uses videos o caras de otras personas reales como recursos. Las demostraciones deben ser del propio avatar de Avatar Ads o generadas.
- No prometas resultados que el programa no da. Usa los datos reales de `PROYECTO.md`.
- Recuerda al usuario (una vez por reel, en la entrega final) que el CTA necesita la automatización de comentarios → DM activa (ManyChat u otra) con la palabra clave correcta.
- Si la palabra clave del reel aún no tiene lead magnet, al terminar el reel ofrécete a crearlo con el skill `lead-magnets-avatar-ads` (textos del DM incluidos).
- **Voz fluida (todos los formatos: A, B, C y cualquier anuncio)**. Se aplica siempre en la edición, sin que el usuario lo pida:
  1. **Arranque inmediato**: la primera palabra suena en el primer fotograma del reel (máx. ~0,05 s antes). Nada de silencio, respiración ni gesto previo al inicio.
  2. **Sin espacios sin voz**: entre palabras y entre frases no queda ningún hueco de más de ~0,3 s. Toda pausa mayor se recorta a ~0,1–0,2 s, cortando dentro del silencio, nunca dentro de una palabra. Excepción: una pausa dramática intencional del guion ("Pero…") puede quedar en ~0,3–0,45 s. Al final, ~0,5 s de cola para que se lea el CTA.
  3. **Sin palabras estiradas**: si una vocal se sostiene de más ("me cuestaaa… casi"), se corta dentro de esa vocal dejando ~0,15 s de ella y se salta al inicio de la palabra siguiente.
  4. **Cómo encontrarlas**: `node skills/reels-avatar-ads/scripts/detectar-estiramientos.mjs <carpeta con los clips o la voz>` → lista los silencios y las vocales sostenidas (> 0,3 s) de cada archivo. Confirmar con la transcripción (`hyperframes transcribe`) y, si hay duda, con un espectrograma (`showspectrumpic`).
  5. **Cada corte interno se tapa**: con un cambio de zoom (formato A y C; si es el mismo plano, diferencia de escala ≥ 0,1) o haciéndolo coincidir con un cutaway/B-roll. En voz en off (formato B) los cortes son solo de audio.
  6. **Cortes alineados a fotogramas**: los cortes de imagen caen en un fotograma exacto de la velocidad de los clips (24 fps en Flow) y los cambios de zoom/overlay en ese mismo fotograma. Nunca convertir de fps antes de cortar (provoca "dobles cortes" de 1–5 fotogramas). Ningún plano debe durar menos de ~0,8 s (si un tramo queda más corto, unirlo con el vecino).
  7. **Verificación antes de entregar**: transcribir el render final y comprobar que no queden huecos > 0,3 s (`silencedetect=n=-35dB:d=0.3`), y revisar con detección de escenas que cada corte aparezca una sola vez.
