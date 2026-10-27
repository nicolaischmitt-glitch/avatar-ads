# Cambios del Sistema Avatar Ads

## En preparación (sin versión todavía)
- **Formato voz en off + B-rolls** (`sistema/formatos/voz-en-off/`): sin avatar a cámara, una voz de Google AI Studio (text-to-speech, gratis) sobre B-rolls. Idea guardada el 27 oct 2026; se publica cuando hagamos el primer anuncio.

## 1.1.1 — 27 oct 2026
- **Los subtítulos se distinguen de todo lo demás**: el rótulo de quien habla, el logo, las tarjetas y el botón nunca usan el mismo fondo y color que el subtítulo. Sin formularios visuales de registro en pantalla (`reglas-edicion.md`).
- **Ritmo natural del habla** (reemplaza a "sin silencios de más de 0,3 s"): el hook va de una sola toma, cada unión entre clips deja ~0,45–0,55 s de silencio humano y las pausas internas solo se recortan si pasan de ~0,35 s. Ningún silencio de más de ~0,6 s. Ejemplo nuevo: `formatos/head-talking/edicion/cortes-ejemplo-anuncio-07.txt`.

## 1.1.0 — 22 oct 2026
- **Paquete de prompts en 4 pasos**: `prompts-flow.md` trae todo junto y en el orden en que se usa: 1) imagen del avatar (Nano Banana Pro) → 2) clips de voz (Flow) → 3) frames de los B-rolls (Nano Banana Pro) → 4) videos de los B-rolls (Flow). Creas la imagen, te quedas con la que te gusta y generas todos los clips de corrido.
- **Ideas de B-roll**: Claude propone 2–3 B-rolls por anuncio con sus prompts (sin diálogo). `generar-prompts.mjs` acepta `brolls` en `clips-plan.json`.
- **B-roll = frame primero, video después**: cada B-roll se crea primero como imagen (barata: 4 variaciones, eliges la toma → `broll/broll-01.jpg`) y después Flow anima esa imagen (→ `clips/broll-01.mp4`). Generarlo directo de texto a video quemaba créditos y daba tomas que se veían "de IA". Plantilla nueva: `sistema/scripts/broll-plantilla.mjs`; sección 6 nueva en `master-prompt-imagen.md`.
- `medir-voz.mjs` ignora los B-rolls.
- **Pausas naturales**: script nuevo `pausas.mjs` para revisar que no queden silencios de más de ~0,3 s; las pausas cortas entre palabras se dejan (recortarlas todas se ve acelerado) y nunca se corta la cola de la última palabra.
- **Cada elemento con un propósito**: sin títulos que repitan el subtítulo, y el botón del CTA nunca se parece a los subtítulos (`reglas-edicion.md`).

## 1.0.0 — primera versión
- Copiloto en Claude Code con 3 skills: inicio (instalación + entrevista del negocio), anuncio (9 pasos de la idea al video editado) y actualizar.
- Base de conocimiento del negocio en `negocio/` que Claude mantiene al día.
- Formato **head talking** (una o dos tomas + B-rolls), con edición automatizada en HyperFrames.
- Avatar en 3 caminos: uno que ya tienes, a partir de una referencia o desde cero (recomendado, con Nano Banana Pro) con solo 3 preguntas y una ficha del avatar para aprobar.
- Master prompts de imagen (Nano Banana Pro) y video (Google Flow), generador y validador de prompts.
- Checklists de revisión de clips y de calidad final.
