# Anuncio 08 · Ejemplo para la landing: producto físico (sérum de vitamina C)

Ejemplo del carrusel de la landing (`#ejemplos`). Producto **ficticio**: sérum de vitamina C de la marca **ALBA**. Formato D (head talking de una toma + B-rolls), UGC de skincare con historia y demostración, ~35–38 s.
Aprobado por el usuario el 22 oct 2026. 27 oct 2026: hook nuevo, protagonista mujer (antes hombre) y producto LOCKED IN.

## Guion v2 (27 oct 2026, aprobado: historia con emoción, ~35–38 s) · voz de mujer en su baño, con el frasco ALBA en la mano
1. Dormía ocho horas y aun así mi cara decía que no había dormido nada. *(6 s · hook)*
2. Probé cremas caras, mascarillas, de todo… y mi piel seguía apagada, como sin vida. *(6 s · lo que probó)*
3. Hasta que empecé a usar este sérum de vitamina C. Dos gotas cada mañana, nada más. *(8 s · descubrimiento)*
4. Es súper ligero, se absorbe en segundos y no te deja la piel grasosa. *(6 s · demostración)*
5. Hoy me miro al espejo y me veo despierta, fresca, con brillo… y eso que no llevo maquillaje. *(8 s · cómo se ve ahora)*
6. Si tu piel también se ve cansada, pruébalo. Lo consigues en el botón de abajo. *(6 s · CTA)*

Testimonio en primera persona de una marca ficticia: sin cifras ni promesas de resultado ("en 7 días", "elimina manchas").
Antes (v1, ~20 s): "Si tu piel se ve apagada por la mañana, ponte esto todas las mañanas antes de salir." → demostración → CTA. El usuario la sintió rápida, corta y sin emoción.

## B-rolls (en el orden en que aparecen)
| # | Qué se ve | Sobre |
|---|---|---|
| 01 | Ella recién levantada se mira cansada y se toca la ojera | "no había dormido nada" |
| 02 | Varias cremas sin marca; su mano las aparta | "probé cremas caras, mascarillas…" |
| 03 | El frasco ALBA con la luz de la mañana; su mano lo toma | "hasta que empecé a usar este sérum" |
| 04 | Dos gotas sobre el dorso de la mano | "dos gotas cada mañana" |
| 05 | La textura entre los dedos | "es súper ligero" |
| 06 | Se aplica el sérum en la mejilla | "se absorbe en segundos" |
| 07 | Piel luminosa: se mira y sonríe | "me veo despierta, fresca, con brillo" |
| 08 | El frasco sobre el lavabo + botón | "lo consigues en el botón de abajo" |

## Producción
- **Producto LOCKED IN** (27 oct 2026, porque en la primera prueba el frasco salía distinto en cada imagen): el frasco ámbar de 30 ml con gotero negro y etiqueta crema con franja naranja, que dice solo "ALBA" / "VITAMINA C", se describe una sola vez (`PRODUCTO` en `generar-prompts.mjs`) y ese bloque va idéntico en todos los prompts de imagen. Paso 0: `producto/prompt-producto.json` → `producto/producto.png`, que se adjunta en el avatar y en los B-rolls 03, 04, 06 y 08.
- Avatar: `avatar/prompt-nano-banana.json` (mujer latina de 27 años, sin maquillaje, con el frasco ALBA y la etiqueta hacia la cámara) → `avatar/avatar.jpg`.
- Voz: `prompts/clip-01…06.json` (speaker "mujer", variable autorizada). B-rolls: `prompts-broll/` (8; en los que sale ella, `mismaPersona` para que sea la misma chica). Todo en `prompts-flow.md`; se regenera con `node anuncios/08-ejemplo-producto-serum/generar-prompts.mjs`.
- Edición: marca ALBA, paleta crema (#F4EDE2) + naranja (#F28C28), los mismos colores de la etiqueta. Etiquetas "Vitamina C", "Ligera" y "Sin grasa" y botón "Comprar ↓".
- Para la landing: título "Demostración de producto".
