# Anuncio 08 · Ejemplo para la landing: producto físico (sérum de vitamina C)

Ejemplo del carrusel de la landing (`#ejemplos`). Producto **ficticio**. Formato D (head talking de una toma + B-rolls), demostración de producto, ~20 s.
Aprobado por el usuario el 22 oct 2026.

## Guion (voz de hombre en su baño, con el frasco en la mano)
1. Si tu piel se ve apagada por la mañana, mira lo que hago antes de salir. *(6 s)*
2. Dos gotas de este sérum de vitamina C. Mira la textura: es ligera y se absorbe en segundos. *(8 s)*
3. No deja la piel grasosa y la sientes fresca todo el día. Lo consigues en el botón de abajo. *(8 s)*

## Producción
- Avatar: `avatar/prompt-nano-banana.json` (frasco ámbar con gotero y etiqueta lisa: el nombre de la marca se pone en la edición, no en el frasco) → `avatar/avatar.jpg`.
- Voz: `prompts/clip-01…03.json`. B-rolls: `prompts-broll/` (dos gotas, textura, producto en el lavabo), con `avatar/avatar.jpg` como referencia del frasco. Todo en `prompts-flow.md`.
- Edición: marca ficticia (nombre por confirmar), paleta crema (#F4EDE2) + naranja (#F28C28). Etiquetas "Ligera", "Sin grasa" y botón "Comprar ↓".
- Para la landing: título "Demostración de producto".
