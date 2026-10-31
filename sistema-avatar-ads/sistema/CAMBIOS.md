# Cambios del Sistema Avatar Ads

## 1.5.0 — 30 oct 2026
- **Looks del avatar.** La imagen del avatar fijaba su pelo y su ropa: si se creaba "despeinado porque se acaba de levantar", salía así en todas las escenas, y una escena con la misma persona copiaba también el lugar (no podía estar en el gimnasio ni en la oficina). Ahora se separa **quién es** (la cara, de `avatar/avatar.jpg`, que no cambia nunca) de **cómo se ve** (pelo, ropa, cómo se ve su piel), y cada escena tiene su propio lugar.
  - Solo se activa cuando la historia lo pide: un antes y después, un día que avanza, o la misma persona en otros lugares o con otra ropa. Si la persona solo habla a cámara, todo sigue igual y el sistema no menciona nada. Máximo 3 looks.
  - El sistema los propone en el paso del avatar (skill `avatar-ads-anuncio`), cada look se genera adjuntando `avatar/avatar.jpg` (Paso 1 del paquete) y cada B-roll dice qué look usa (`"look"` en `clips-plan.json`).
  - Reglas en la sección 8 de `prompts/master-prompt-imagen.md`; plantilla `lookImagen` en `scripts/broll-plantilla.mjs`. El formato voz en off avisa que casi siempre los necesita ("un día en su vida").

## 1.4.2 — 30 oct 2026
- **Voz en off más natural** (`formatos/voz-en-off/LEEME.md`): plantillas nuevas de Scene y Sample Context. La voz suena a una persona grabando una nota de voz en su celular, con **acento latino neutro pedido de forma explícita**, ritmo de conversación normal, energía baja y emoción contenida. Se quitan "TikTok testimonial", "slightly fast pace" y "raise the energy", que la hacían sonar a comercial. Voces sugeridas de tono tranquilo (Callirrhoe, Achernar, Sulafat, Vindemiatrix, Despina).

## 1.4.1 — 29 oct 2026
- **La misma velocidad de habla en todos los clips.** Google Flow hace que el avatar diga todo el texto dentro del clip: si le sobra texto, acelera, y al unir los clips se nota (en un anuncio real, un clip de 10 s con demasiadas sílabas sonaba apurado al lado de los demás). Ahora la tabla de `guion/guion-anuncios.md` se mide en sílabas por segundo (~3,2–4,3, máx. ~4,5) y `generar-prompts.mjs` avisa si un clip pasa de 4,5 o se aleja de los demás.

## 1.4.0 — 28 oct 2026
- **Audio limpio en todos los anuncios.** Google Flow inventa el sonido ambiente de cada clip: en un anuncio real, la mayoría de los clips trajo un zumbido grave de fondo (como de aire acondicionado) y uno salió limpio, y al unirlos se notaba el cambio. Ahora hay dos defensas:
  - el master prompt de video tiene un bloque nuevo, `audio`, que pide solo la voz: sin ambiente, ruido, música ni efectos (`sistema/prompts/master-prompt-video.txt`; los prompts se siguen generando con `generar-prompts.mjs`, que ya lo incluye);
  - la edición limpia siempre la voz con `edicion/audio.mjs` (filtro de graves + reducción de ruido + puerta suave en las pausas), así todos los clips quedan con el mismo fondo aunque Flow meta ruido.
- **Música de fondo opcional** con el mismo script: `node audio.mjs <pista>` la repite con fundidos hasta cubrir el video, la deja muy por debajo de la voz, la baja sola cuando habla el avatar y la desvanece al final. `--muestra` hace una muestra de 30 s para elegir.
- Checklist de calidad final: punto nuevo "fondo parejo" entre clips.

## 1.3.0 — 27 oct 2026
- **Formato nuevo: voz en off + B-rolls** (`sistema/formatos/voz-en-off/`), probado en un anuncio real de skincare: una voz en primera persona cuenta una historia y 6–10 B-rolls la muestran, con cortes secos, subtítulos naturales, un solo botón y sin música. Se ve muy realista. Incluye cómo generar la voz gratis en Google AI Studio (Gemini 3.1 Flash TTS, con plantillas de Scene y Sample Context), cómo asignar cada B-roll a su frase mirando los clips y la plantilla de edición `edicion/build.mjs`.
- `generar-prompts.mjs` acepta un `clips-plan.json` sin `clips` (formato voz en off: solo producto, avatar y B-rolls).

## 1.2.0 — 27 oct 2026
- **Producto físico LOCKED IN** (solo se activa cuando en el anuncio se ve un producto físico; en servicios, cursos o productos digitales todo sigue igual): sin esto, la IA inventaba un producto distinto en cada imagen. Ahora hay un **Paso 0**, la foto del producto (`producto/producto.png`, real o generada), que se adjunta en la imagen del avatar y en los B-rolls donde sale; su descripción (`product`) va idéntica en todos los prompts, con una etiqueta definida (nunca en blanco). Antes de animar, cada imagen se compara con esa foto. Reglas: sección 7 de `master-prompt-imagen.md`. `generar-prompts.mjs` acepta `producto` en `clips-plan.json` y `"producto": true` en cada B-roll.
- **B-roll con el mismo avatar**: `"mismaPersona": true` (con `"referencia": "avatar/avatar.jpg"`) para tomas donde sale la misma persona, como aplicarse el producto en la cara. Antes, la referencia del avatar solo servía para el lugar y pedía sacar a la persona.

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
