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
| 4 | Avatar | 3 caminos (tengo uno · referencia · desde cero) → ficha → prompt de Nano Banana Pro | **sí** (ficha) |
| 5 | Paquete de prompts | `prompts-flow.md` en 4 pasos: imagen del avatar → clips de voz → frames de los B-rolls → videos de los B-rolls (+ Paso 0, la foto del producto, solo si se ve un producto físico) | no |
| 6 | Revisión de clips | lista de clips buenos y a regenerar | sí, si hay que regenerar |
| 7 | Storyboard | `storyboard/storyboard.png` | **sí** |
| 8 | Edición | vista previa en el navegador | sí (itera conversando) |
| 9 | Render y entrega | `final/anuncio-NN-slug.mp4` | — |

Al empezar, muéstrale al usuario esta lista en una línea ("Vamos por 9 pasos: brief → ángulo → guion → …") y dile en qué paso está cada vez que avances.
**Retomar:** si el usuario vuelve a un anuncio a medias, mira qué archivos existen en su carpeta y continúa desde el primer paso que falte. Si ya hay videos en `clips/`, ve directo al paso 6.

## Carpeta de cada anuncio
```
anuncios/NN-slug/          (NN = 01, 02…; slug corto en minúsculas: 01-curso-reposteria)
├── brief.md · guion.md · guion.txt · clips-plan.json · prompts-flow.md (los 3 pasos, en orden)
├── producto/              solo con producto físico: prompt-producto.json + producto.png (la foto que fija el producto)
├── avatar/                prompt-nano-banana.json + avatar.jpg (la imagen elegida)
├── prompts/               clip-01.json … (voz)
├── prompts-broll/         broll-01-imagen.json + broll-01-video.json … (sin diálogo)
├── broll/                 los frames elegidos de cada B-roll: broll-01.jpg …
├── clips/                 aquí el usuario deja los videos de Flow: clip-01.mp4 … y broll-01.mp4 …
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
- Si en el anuncio se va a **ver un producto físico** (un frasco, una caja, una prenda, un aparato). Solo en ese caso se activa el **producto LOCKED IN** (ver "Producto físico" en el paso 4); si tiene una foto real del producto, pídesela. Si es un servicio, un curso o algo digital, no se activa.
Crea la carpeta y guarda `brief.md` (5–8 líneas).

## 2 · Ángulo y formato
1. Lee `sistema/guion/guion-anuncios.md`. Propón **3 ángulos**, cada uno con su hook escrito tal cual se diría, y una línea de por qué funcionaría con este público. Marca tu recomendado.
2. Lee `sistema/formatos/README.md` y recomienda el formato (head talking o voz en off + B-rolls; ver "Cómo elegir"). Si el formato tiene su `LEEME.md`, léelo completo antes del paso 3.

## 3 · Guion
1. Escribe el guion con la estructura de `guion-anuncios.md`: hook → problema/deseo → solución (el producto) → prueba → CTA. 35–45 s (≈ 100–120 palabras), escrito para la voz.
2. Divídelo en clips de 4/6/8/10 s (prioriza 6 y 8; tabla de palabras en `guion-anuncios.md`). Cada clip termina en una pausa natural.
3. Muestra el guion completo y la tabla de clips. Explica en 2 líneas por qué funciona. **Pide aprobación.**
4. Al aprobarse: guarda `guion.md` (plantilla en `guion-anuncios.md`) y el texto hablado exacto en `guion.txt`.
Si el usuario trae su propio guion: respeta su estructura y su orden; solo pule claridad, persuasión y que se pueda generar.

## 4 · Avatar
Pregunta: **"¿Cómo quieres crear a tu avatar?"** con tres opciones (si el negocio ya tiene un avatar en `negocio/avatar/`, menciónalo en la opción 1):
1. **Ya tengo un avatar**: uno aprobado antes o una imagen que trae el usuario.
2. **Partir de una referencia**: una foto o un frame de un video con el ángulo, el lugar y la luz que le gustan; se copia la escena con una persona original.
3. **Desde cero** *(recomendado: es el que da la mejor calidad)*.

### Camino 1 · Ya tengo un avatar
Copia la imagen a `avatar/avatar.jpg`, revísala (punto "Revisión" de abajo) y sigue al paso 5 (el Paso 1 del paquete dirá que ya la tiene). Si la imagen no sirve para Flow (manos fuera de cuadro, boca abierta, sin espacio arriba), dile qué falla y ofrécele el camino 3.

### Camino 2 · Partir de una referencia
Pide la imagen y guárdala en `avatar/referencia.jpg`; mírala. Haz las mismas 3 preguntas del camino 3 (la escena ya la pone la referencia, así que la tercera es solo para confirmar el lugar). En el JSON usa la frase opcional del `task` del master ("If a reference image is attached, copy its camera angle, framing, setting and lighting, but create a completely different original person") y dile al usuario que adjunte la referencia en Nano Banana junto con el prompt. Nunca copiar la cara de la persona de la referencia.

### Camino 3 · Desde cero
1. **Solo 3 preguntas, con opciones**, de a una:
   - ¿Hombre o mujer?
   - ¿Edad aproximada? (20–30 · 30–40 · 40–50 · 50+)
   - ¿Dónde graba? Ofrece 4–5 lugares que tengan sentido para su negocio (oficina, carro, cocina, sala, consultorio, gimnasio…).
   No preguntes el acento: ya está en `marca.md`.
2. **Ficha del avatar**: con esas respuestas y `negocio.md`, propón el resto pensando en **alguien en quien su cliente ideal confiaría** (el avatar es quien vende este producto): nacionalidad acorde al público, rasgos, pelo, ropa concreta (color, tela), estilo, 3–5 objetos del fondo y el objeto en primer plano. Muéstrala en 6–8 líneas cortas, por ejemplo:
   > **Valentina, 32 años, colombiana** · pelo castaño ondulado suelto · blusa de lino blanca, estilo casual cuidado · graba en su cocina luminosa: frutas en la mesa, plantas, repisa de madera · taza en primer plano · luz de ventana frente a ella.
   Pregunta "¿Va así o cambias algo?" y ajusta lo que pida ("más joven", "con lentes", "en su consultorio").
   La ficha describe a la persona **como habla a cámara**. Si el guion pide verla distinta en otras escenas (recién levantada, antes del resultado), eso no va en la ficha: va en los looks (abajo).
3. Con la ficha aprobada, lee completo `sistema/prompts/master-prompt-imagen.md` y escribe el JSON en inglés con su estructura fija → `avatar/prompt-nano-banana.json` (con 2 tomas: `avatar/prompt-a.json`, `avatar/prompt-b.json`). No se lo entregues suelto: va como **Paso 1** del paquete del paso 5, junto con todo lo demás.
   Si el avatar va a sostener el producto, ponlo ya en la imagen (Flow no añade objetos que no estén en ella). Si es un producto físico, sigue "Producto físico" (abajo): el prompt lleva la clave `product` y se genera adjuntando `producto/producto.png`.

### Generar y revisar (caminos 2 y 3)
1. El usuario genera la imagen con el **Paso 1** de `prompts-flow.md` (Nano Banana Pro, 9:16, 4 variaciones; en el camino 2, adjuntando la referencia), elige una, la guarda como `anuncios/NN-slug/avatar/avatar.jpg` y pasa directo a los clips. Si quiere, te la muestra antes.
2. **Revisión** (cuando te muestre la imagen, o en el paso 6 con el primer frame de los clips): abre la imagen con Read y revisa manos y dedos, ojos, dientes, piel no plástica, luz pareja en la cara, sin letras inventadas en el fondo, boca cerrada, espacio libre arriba de la cabeza. Si algo falla, dile qué corregir o ajusta el prompt.
3. Si el generador bloquea el prompt, sigue la sección "Si el generador lo bloquea" del master.
4. Si el usuario quiere reutilizar este avatar en otros anuncios, cópialo a `negocio/avatar/` y anota su ficha en `marca.md`.

### Looks del avatar (solo si la historia los pide)
La imagen del avatar fija su pelo y su ropa: si el avatar está despeinado, sale despeinado en todas las escenas. Por eso, antes de cerrar la ficha, lee el guion aprobado y decide:
- **Un solo look (lo normal; no digas nada de looks):** la persona habla a cámara desde un lugar (profesor, dentista, VSL), los B-rolls no la muestran, o la muestran en el mismo momento y lugar (aplicándose el producto en el mismo baño).
- **Más de un look:** el guion tiene un **antes y después** (cansada → con brillo, despeinado → arreglado), un **día que avanza** (la alarma, el gimnasio, la oficina) o la misma persona **en otros lugares o con otra ropa**.

Si hacen falta:
1. Explícalo en una línea ("Tu historia va de las 5 a.m. a la oficina: te propongo 2 looks") y propón **2–3 looks**, uno por línea: nombre corto, pelo, ropa, cómo se ve su piel y en qué escenas sale. El de quien habla a cámara es el de la ficha (casi siempre el del después). **Pide aprobación.**
2. Lee la sección 8 de `sistema/prompts/master-prompt-imagen.md` y ponlos en `clips-plan.json` como `looks` (`desc` en inglés). El look de quien habla apunta a `avatar/avatar.jpg`; los demás, a `avatar/look-<nombre>.jpg`. El generador arma su prompt y lo pone en el Paso 1, para generarlo adjuntando `avatar/avatar.jpg`.
   - **El look se describe en relación a como es él**, nunca como un corte nuevo: "his same short hair, slightly messy and flattened on one side", no "messy hair on top" (eso le inventa pelo). El pelo, las entradas, la barba y la forma de la cara son de quién es, no del look.
   - La `pose` del look deja **la cara despejada y de frente** (sin manos cerca): es una imagen de referencia. Las acciones como frotarse el ojo van en el video del B-roll.
3. **Identidad real (antes de los prompts de los looks):** los looks y los B-rolls donde sale él con un look **no se generan hasta que exista `avatar/avatar.jpg`**. Cuando el usuario la guarde, ábrela con Read y escribe `identidad` en el plan (inglés, 1–2 líneas): lo que **se ve de verdad**, no lo que pedía el prompt (la IA no siempre lo cumple): forma de la cara, frente y entradas, cantidad y largo del pelo, barba, cejas, rasgos que lo distinguen. Ejemplo: "lean oval face, high forehead with a receding hairline at the temples, very short dark brown hair, thin on top, short trimmed dark beard with a defined line on the cheeks, thick dark eyebrows". Después vuelve a ejecutar el generador: ahí salen los prompts que faltaban.
4. Al revisar cada look, compara con `avatar.jpg` la cara, el pelo (cantidad y entradas) y la barba: si algo cambió, se regenera.

### Producto físico (solo si en el anuncio se ve un producto físico)
Sin esto, la IA inventa un producto distinto en cada imagen (otra etiqueta, letras inventadas, otra tapa) y el anuncio pierde credibilidad. Si el anuncio no muestra un producto físico, sáltate esta parte.
1. Lee la sección 7 de `sistema/prompts/master-prompt-imagen.md`.
2. **Foto del producto:** si el usuario tiene una foto real (de frente, bien iluminada, etiqueta legible), cópiala a `anuncios/NN-slug/producto/producto.png` y revísala. Si el producto es nuevo o todavía no existe, se genera en el **Paso 0** del paquete.
3. **Ficha del producto:** propón en 4–6 líneas cómo es (forma, tamaño, colores, tapa, etiqueta y su texto exacto: la marca en grande y como mucho 2 líneas, nunca una etiqueta en blanco) y **pide aprobación**. Con una foto real, describe lo que se ve en ella.
4. Escribe el bloque `product` en inglés y ponlo en `clips-plan.json` como `producto` (`bloque` + `texto` de la etiqueta). Si el avatar lo sostiene, su prompt lleva la clave `product` (el generador la reemplaza por el bloque) y `hands` dice cómo lo sostiene, con la etiqueta hacia la cámara.
5. En los gestos de los clips de voz: "con la etiqueta siempre hacia la cámara, sin taparla con los dedos".

## 5 · Paquete de prompts (un solo archivo, en 4 pasos)
El usuario recibe **todo junto y en el orden en que lo usa**, en `prompts-flow.md`: **Paso 1** imagen del avatar → **Paso 2** clips de voz → **Paso 3** frames de los B-rolls → **Paso 4** videos de los B-rolls. Así crea la imagen, se queda con la que le gusta y genera todos los clips de corrido, sin volver a preguntar.
**Toda toma empieza por una imagen**: el B-roll nunca se genera directo de texto a video. Primero su frame en Nano Banana Pro (barato: 4 variaciones, el usuario elige la toma que le gusta) y después Flow anima ese frame. Generar el video directo quema créditos en cada intento y da tomas que se ven "de IA" y que el usuario no habría elegido.
1. Lee completo `sistema/prompts/master-prompt-video.txt`: sus reglas mandan en los clips de voz.
2. **Ideas de B-roll** (las propones tú, el usuario no tiene que pensarlas): 2–3 por anuncio, una por idea fuerte del guion, sin diálogo, de 6 s. Lo que funciona: el producto en macro (textura, gotas, detalles), el lugar del servicio sin personas, la situación del dolor del cliente (alguien en una reunión, frente al espejo), el resultado. Reglas: sin textos ni letreros legibles, pantallas sin contenido, sin marcas ni logos, sin música ni voces, sin caras reconocibles en primer plano; lugares reales y algo imperfectos (un consultorio de barrio, no una clínica futurista); si sale el lugar del avatar, pon `"referencia": "avatar/avatar.jpg"` para que sea el mismo; si en la toma sale el propio avatar (p. ej. aplicándose el producto en la cara), pon también `"mismaPersona": true` para que sea la misma persona; si el anuncio tiene looks, en vez de eso pon `"look": "<nombre>"` (misma cara, el pelo y la ropa de ese look, y el lugar que digas en `location`); si sale el producto físico, pon además `"producto": true` (adjunta `producto/producto.png` y copia su bloque). Con producto: nada de cámaras que giren alrededor de él (acercamiento lento de frente), coherencia física (si el gotero está en la mano, el frasco está abierto) y nada en el lugar que se parezca al producto. Por cada B-roll escribes el frame (`shot`, `subject`, `location`, `details`, `framing`, `light`, en inglés) y la animación (`action`, `camera_movement`, en español): la plantilla está en `sistema/scripts/broll-plantilla.mjs`. Los gráficos (cifras, formularios, botones) no son B-rolls: se hacen en la edición.
   **El frame es el primer instante del video.** `shot` y `subject` muestran el momento justo antes de la acción (la cuchara sobre la bolsa abierta, todavía sin entrar; la taza en el escritorio junto a su mano), y `action` cuenta lo que pasa desde ahí, una sola vez. Si el frame ya muestra la acción (la cuchara llena, la taza en la boca), el video la repite: vuelve a meter la cuchara o baja la taza y la sube otra vez, y se pierden segundos. Antes de generar, lee cada par `subject` + `action` como una toma continua.
   **Cada B-roll dura 6 s.** Así la acción tiene tiempo de completarse y se ve natural. Se probó con 4 s para ahorrar créditos (31 oct 2026) y no funcionó: el movimiento se aceleraba o quedaba cortado. En la edición se usa solo la parte que hace falta.
3. Escribe `clips-plan.json` (formato en la cabecera de `sistema/scripts/generar-prompts.mjs`): voz (`speaker`) y `acento` desde `marca.md`, una toma por imagen, por clip el **fragmento exacto** del guion + gestos concretos según el significado ("al decir 'tres pasos', muestra tres dedos"; "al decir 'el botón', señala hacia abajo"; con el producto en la mano, gesticula con la otra) y los `brolls`. Con producto físico, para el prompt de corrección: `producto.corto` (cómo se nombra: "the CUMBRE coffee bag"), `producto.donde` (dónde queda en la imagen de cada toma) y `producto_donde` en cada B-roll con producto, en inglés y con lo que dice su prompt ("in his right hand", "on the kitchen counter, behind him").
4. Ejecuta `node sistema/scripts/generar-prompts.mjs anuncios/NN-slug`. Si falla la validación o hay avisos, corrige el plan y repite. Nunca entregues prompts que no pasen.
5. Ábrele `prompts-flow.md` y explícale los 4 pasos en 4 líneas (con producto físico, primero el Paso 0: la foto del producto → `producto/producto.png`, que se adjunta en la imagen del avatar y en los B-rolls donde sale; antes de animar, cada imagen se compara con ella; si todo le gusta menos el producto, no la regenera: usa el **prompt de corrección** que va debajo de esa imagen (editar en Flow + `producto.png` adjunta), máximo 2 intentos): 1) imagen del avatar en Nano Banana Pro → `avatar/avatar.jpg`; 2) en Flow, esa imagen como imagen inicial + el JSON de cada clip → `clips/clip-01.mp4`…; 3) el frame de cada B-roll en Nano Banana Pro → `broll/broll-01.jpg`…; 4) en Flow, cada frame como imagen inicial + su JSON → `clips/broll-01.mp4`…. Genera 2 variaciones por clip y quédate con la mejor. Si un frame de B-roll no convence, ajusta su prompt antes de pasar al video.

## 6 · Revisión de clips
Cuando diga que los clips están listos, sigue `sistema/checklists/revision-clips.md`: renombra si hace falta, revisa frames, transcribe y mide la voz. Dile qué clips están bien y cuáles regenerar (solo esos), con el motivo en una línea.
**Si el usuario te muestra una imagen que le gusta pero con el producto distinto:** mírala y dale el prompt de corrección de esa imagen (está en `prompts-flow.md`). Si en su imagen el producto quedó en otro lugar que el del prompt (en la otra mano, en la mesa en vez de en la mano), reescribe el "dónde" según lo que ves y nombra lo que hay en la escena, con `correccionProducto` de `sistema/scripts/broll-plantilla.mjs` como plantilla.

## 7 · Storyboard (aquí el usuario decide la edición)
1. Lee el `LEEME.md` del formato (catálogo de escenas y reglas de edición) y `sistema/edicion/reglas-edicion.md`.
2. Propón el plan de edición frase por frase: qué se ve en cada momento (cara con zoom, chip de texto, cifra, prueba real, comparación, CTA con botón). Usa los colores y el logo de `marca.md`.
3. Haz la lámina del storyboard (`storyboard/storyboard.html` → PNG, ver el `LEEME.md` del formato): **solo los frames**, cada viñeta con su número, una etiqueta corta y la frase. Sin paneles de reglas ni paleta.
4. Muéstrasela y pide lo que falte del usuario (capturas de resultados, fotos del producto, testimonios) para `recursos/`. El usuario puede cambiar lo que quiera: "aquí quiero mostrar mi página", "menos texto", "otro color". **Pide aprobación.**

## 8 · Edición
Sigue el proceso de edición del `LEEME.md` del formato (unir clips con ritmo natural → transcribir → construir la composición → revisar).
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
