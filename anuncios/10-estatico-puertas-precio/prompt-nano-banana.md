# Anuncio 10 · Las dos puertas (ángulo precio) · prompt para Nano Banana Pro

Copy aprobado (opción A, 28 oct 2026): 🟢 **PAGAR ~$1 POR ANUNCIO** · 🔴 **PAGARLE ~$20 A SEEDANCE POR ANUNCIO**.
Dato: Seedance 2.0 en 1080p ~$0,68/s en fal.ai → ~$20 por anuncio de 30 s (fuente: `anuncios/03-calidad-seedance-centavos/guion.md`). ~$1 = ~50 créditos de Flow con el plan de pago.

**Cómo usarlo:** adjunta `referencia-original.jpg` como imagen de referencia de estilo y pega el JSON. El formato se elige en Google Flow.
Si algún texto sale mal escrito, se corrige encima con la versión en `imagen.html` (o se pide "fix only the text").

```json
{
  "task": "Recreate the illustration style of the attached reference image as a new original illustration for a social media ad. Use the reference ONLY for style and composition; redraw every figure, do not copy it, and replace all text.",
  "style": {
    "medium": "clean flat vector line art, like a minimalist editorial cartoon",
    "background": "plain pure white, no texture, no shadows, no gradients",
    "linework": "uniform black outlines, medium weight, rounded line caps",
    "fills": "all people filled with plain white so overlapping figures hide the ones behind them",
    "color": "only black lines plus one green (#4BA86E) and one red (#D2322D); no other colors"
  },
  "composition": {
    "ground": "a single thin black horizontal ground line across the left two thirds of the image, at about 60% of the height",
    "left_door": {
      "position": "left half",
      "frame": "tall rectangular outline with rounded top corners, drawn in green, open at the bottom where it meets the ground",
      "doorway": "a black arched doorway centered inside the green frame",
      "label": "text inside the top of the green frame, centered, two lines: 'PAGAR ~$1' / 'POR ANUNCIO'",
      "people": "ONE single bald man seen from behind, standing calmly in front of the arched doorway, holding a small briefcase in his right hand, small glasses visible on the side of his head"
    },
    "right_door": {
      "position": "right half",
      "frame": "same shape as the left one, slightly wider, drawn in red",
      "doorway": "a black arched doorway, partly hidden by the crowd",
      "label": "text inside the top of the red frame, centered, three lines: 'PAGARLE ~$20' / 'A SEEDANCE' / 'POR ANUNCIO'",
      "people": "a huge dense crowd of identical bald people seen from behind, squeezed together and queuing into the red doorway; the crowd starts small at the door and fans out toward the viewer, filling the whole bottom-right of the image and going off the right and bottom edges"
    }
  },
  "typography": {
    "font": "bold geometric sans-serif (like Inter Bold), all caps",
    "rules": "text must be spelled exactly as written, in Spanish, including the tilde symbol '~' and the dollar sign; text stays inside its door frame; no other text anywhere"
  },
  "mood": "simple, instantly readable visual metaphor: almost everyone takes the expensive door, one smart person takes the cheap one",
  "negative": ["no English text", "no extra words, captions, logos or watermarks", "no color fills on people", "no realistic rendering", "no 3D", "no shading", "no background scenery", "no faces visible (everyone seen from behind)"]
}
```
