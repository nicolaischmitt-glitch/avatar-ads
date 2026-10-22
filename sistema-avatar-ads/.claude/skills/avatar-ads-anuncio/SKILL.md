---
name: avatar-ads-anuncio
description: Flujo principal del Sistema Avatar Ads para crear un anuncio UGC hiperrealista con IA de la idea al video editado, guiando al usuario paso a paso - brief, ángulo y formato, guion, avatar (prompt de Nano Banana), prompts JSON de Google Flow, revisión de clips, storyboard, edición automática con HyperFrames y render. Úsalo cuando el usuario quiera crear un anuncio o un video, escribir o mejorar un guion, generar prompts para Flow o Nano Banana, hacer el storyboard, o cuando diga "ya tengo los clips", "edítalo", "nuevo anuncio".
---

# Crear un anuncio con el Sistema Avatar Ads

Antes de empezar, lee `negocio/negocio.md`, `negocio/marca.md` y `negocio/aprendizajes.md`. Si `negocio.md` está vacío, usa primero el skill `avatar-ads-inicio`.

## Los 9 pasos
| # | Paso | Resultado | ¿Pide aprobación? |
|---|---|---|---|
| 1 | Brief | carpeta del anuncio + `brief.md` | no |
| 2 | Ángulo y formato | ángulo y formato elegidos | sí (elige) |
| 3 | Guion | `guion.md` + `guion.txt` | **sí** |
| 4 | Avatar | prompt de Nano Banana → `avatar/avatar.jpg` | **sí** (elige la imagen) |
| 5 | Prompts de video | `prompts-flow.md` listo para Flow | no |
| 6 | Revisión de clips | lista de clips buenos y a regenerar | sí, si hay que regenerar |
| 7 | Storyboard | `storyboard/storyboard.png` | **sí** |
| 8 | Edición | vista previa en el navegador | sí (itera conversando) |
| 9 | Render y entrega | `final/anuncio-NN-slug.mp4` | — |

Al empezar, muéstrale al usuario esta lista en una línea ("Vamos por 9 pasos: brief → ángulo → guion → …") y dile en qué paso está cada vez que avances.
**Retomar:** si el usuario vuelve a un anuncio a medias, mira qué archivos existen en su carpeta y continúa desde el primer paso que falte. Si ya hay videos en `clips/`, ve directo al paso 6.

## Carpeta de cada anuncio
```
anuncios/NN-slug/          (NN = 01, 02…; slug corto en minúsculas: 01-curso-reposteria)
├── brief.md · guion.md · guion.txt · clips-plan.json · prompts-flow.md
├── avatar/                prompt-nano-banana.json + avatar.jpg (la imagen elegida)
├── prompts/               clip-01.json …
├── clips/                 aquí el usuario deja los videos de Flow: clip-01.mp4 …
├── recursos/              capturas, pruebas, fotos del producto que aporta el usuario
├── storyboard/            storyboard.html + storyboard.png
├── edicion/               proyecto de edición (HyperFrames)
└── final/                 anuncio-NN-slug.mp4
```

---

## 1 · Brief
Con lo que ya sabes del negocio, confirma en **una sola pregunta** lo que falte:
- Qué producto o servicio anuncia (si tiene varios).
- Objetivo: venta directa, leads, mensajes.
- Destino del botón (página de venta, WhatsApp, formulario).
- Si es anuncio pagado (por defecto **evergreen**: sin fechas ni precios que caduquen, ni en la voz ni en pantalla) u orgánico.
Crea la carpeta y guarda `brief.md` (5–8 líneas).

## 2 · Ángulo y formato
1. Lee `sistema/guion/guion-anuncios.md`. Propón **3 ángulos**, cada uno con su hook escrito tal cual se diría, y una línea de por qué funcionaría con este público. Marca tu recomendado.
2. Lee `sistema/formatos/README.md` y recomienda el formato (hoy: head talking). Si el formato tiene su `LEEME.md`, léelo completo antes del paso 3.

## 3 · Guion
1. Escribe el guion con la estructura de `guion-anuncios.md`: hook → problema/deseo → solución (el producto) → prueba → CTA. 35–45 s (≈ 100–120 palabras), escrito para la voz.
2. Divídelo en clips de 4/6/8/10 s (prioriza 6 y 8; tabla de palabras en `guion-anuncios.md`). Cada clip termina en una pausa natural.
3. Muestra el guion completo y la tabla de clips. Explica en 2 líneas por qué funciona. **Pide aprobación.**
4. Al aprobarse: guarda `guion.md` (plantilla en `guion-anuncios.md`) y el texto hablado exacto en `guion.txt`.
Si el usuario trae su propio guion: respeta su estructura y su orden; solo pule claridad, persuasión y que se pueda generar.

## 4 · Avatar
1. Si el negocio ya tiene un avatar aprobado (`negocio/avatar/`) y el usuario quiere usarlo, cópialo a `avatar/avatar.jpg` y salta al paso 5.
2. Si no, lee completo `sistema/prompts/master-prompt-imagen.md`. Pregunta solo lo necesario (hombre o mujer, edad aproximada, dónde graba: oficina, carro, cocina…; si tiene una foto de referencia del ángulo o el lugar, mejor). Escribe el JSON en inglés con su estructura fija → `avatar/prompt-nano-banana.json` y muéstralo en un bloque listo para copiar.
3. Instrucciones para el usuario: abrir Nano Banana, poner 9:16, pegar el JSON, generar 4 variaciones, elegir una y guardarla como `anuncios/NN-slug/avatar/avatar.jpg`.
4. Cuando la deje, **mírala** (ábrela con Read) y revisa: manos y dedos, ojos, dientes, piel no plástica, luz pareja en la cara, sin letras inventadas en el fondo, espacio libre arriba de la cabeza. Si algo falla, dile qué corregir o ajusta el prompt.
5. Si el usuario quiere reutilizar este avatar en otros anuncios, cópialo a `negocio/avatar/` y anótalo en `marca.md`.

## 5 · Prompts de video (Google Flow)
1. Lee completo `sistema/prompts/master-prompt-video.txt`: sus reglas mandan en este paso.
2. Escribe `clips-plan.json` (formato en la cabecera de `sistema/scripts/generar-prompts.mjs`): voz (`speaker`) y `acento` desde `marca.md`, una toma por imagen, y por clip el **fragmento exacto** del guion + gestos concretos según el significado ("al decir 'tres pasos', muestra tres dedos"; "al decir 'el botón', señala hacia abajo").
3. Ejecuta `node sistema/scripts/generar-prompts.mjs anuncios/NN-slug`. Si falla la validación o hay avisos de palabras de más, corrige el plan y repite. Nunca entregues prompts que no pasen.
4. Dale al usuario las instrucciones: en Flow, subir `avatar/avatar.jpg` como imagen inicial, pegar el JSON de cada clip (están en `prompts-flow.md`, ábreselo) y guardar los videos como `clips/clip-01.mp4`, `clip-02.mp4`… Recomienda generar primero el clip 01 y, si le gusta, el resto. Genera 2 variaciones por clip y quédate con la mejor.

## 6 · Revisión de clips
Cuando diga que los clips están listos, sigue `sistema/checklists/revision-clips.md`: renombra si hace falta, revisa frames, transcribe y mide la voz. Dile qué clips están bien y cuáles regenerar (solo esos), con el motivo en una línea.

## 7 · Storyboard (aquí el usuario decide la edición)
1. Lee el `LEEME.md` del formato (catálogo de escenas y reglas de edición) y `sistema/edicion/reglas-edicion.md`.
2. Propón el plan de edición frase por frase: qué se ve en cada momento (cara con zoom, chip de texto, cifra, prueba real, comparación, CTA con botón). Usa los colores y el logo de `marca.md`.
3. Haz la lámina del storyboard (`storyboard/storyboard.html` → PNG, ver el `LEEME.md` del formato): **solo los frames**, cada viñeta con su número, una etiqueta corta y la frase. Sin paneles de reglas ni paleta.
4. Muéstrasela y pide lo que falte del usuario (capturas de resultados, fotos del producto, testimonios) para `recursos/`. El usuario puede cambiar lo que quiera: "aquí quiero mostrar mi página", "menos texto", "otro color". **Pide aprobación.**

## 8 · Edición
Sigue el proceso de edición del `LEEME.md` del formato (unir clips con voz fluida → transcribir → construir la composición → revisar).
- Abre la vista previa para que el usuario la vea sin esperar el render: `hyperframes preview edicion/public --background` desde la carpeta del anuncio (abre el navegador; se detiene con `--stop`). Si la computadora es lenta, muestra snapshots por escena en su lugar.
- El usuario pide cambios conversando ("el subtítulo más grande", "quita ese zoom", "la prueba antes"): aplícalos y vuelve a mostrar. Iteren hasta que lo apruebe.

## 9 · Render y entrega
1. Render final según el `LEEME.md` del formato (en segundo plano; avisa cuánto suele tardar).
2. Pasa `sistema/checklists/calidad-final.md` antes de entregar.
3. Entrega la ruta del MP4 y, si es anuncio pagado, propone el texto del anuncio (texto principal, título y descripción para Meta), con el mismo ángulo.
4. Anota en `negocio/aprendizajes.md` lo aprendido (hook usado, errores de generación, cambios que pidió el usuario), con la fecha.

## Reglas
- No inventes cifras, testimonios ni resultados. Toda prueba sale de `negocio.md` o de lo que el usuario aporte.
- Si el anuncio muestra resultados de clientes, rotúlalos como "resultado de un cliente" y quita nombres y fotos si no hay permiso.
- Escrito para la voz: cifras en palabras ("diecinueve dólares"), sin símbolos; siglas como se pronuncian.
- Si una regla de un formato choca con lo que pide el usuario, explícale la consecuencia en una línea y haz lo que decida.
