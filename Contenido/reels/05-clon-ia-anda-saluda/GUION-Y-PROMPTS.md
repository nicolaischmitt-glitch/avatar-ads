# Reel "Clon que se mueve" — guion + prompts

Réplica de `referencias/ref01` adaptada a Avatar Ads 1.0 · 9:16 · ~20 s · 5 tomas
Avatar: el presentador del anuncio principal → `referencia-avatar.png` (adjúntala SIEMPRE como referencia de cara).

---

## 1. Guion (≈ 52 palabras · ~20 s)

| # | Tiempo | Lugar / acción | Diálogo (lo que dice el avatar) | Gráficos en edición |
|---|---|---|---|---|
| 1 | 0–4,5 s | Oficina, escritorio con laptop, gesticula | "Para hacer anuncios con IA no necesitas esos avatares que parecen una foto hablando." | Título-gancho detrás de la cabeza (0–2,4 s) → PiP de avatar rígido con ❌ (2,4–4,5 s) |
| 2 | 4,5–8 s | Cafetería, sentado, toma un sorbo de café al final | "Yo soy un avatar hecho con IA… y sí, me puedo tomar un café." | Subtítulos |
| 3 | 8–12 s | Calle, caminando hacia la cámara | "Camino, me muevo y grabo donde quiera, sin cámara ni estudio." | Subtítulos |
| 4 | 12–15,5 s | Sala de casa, plano cercano, enseña el celular | "Y todo con un sistema económico, sin herramientas caras." | Subtítulos |
| 5 | 15,5–20,5 s | Cenital (desde arriba), de pie, mira hacia arriba | "En Avatar Ads te enseño a crearlo en tres días. Solo quince cupos." | Subtítulos + cierre sin texto: guiño + saludo (~0,7 s) |

**Título-gancho (escena 1):**
```
NO PAGUES
DE MÁS          ← grande, verde #C5F740, sombra dura
POR TU AVATAR
```
(alternativa: "TU AVATAR NO ES UNA FOTO")

**Caption de Instagram:**
> Este avatar camina, toma café y habla… y lo hicimos con IA y un sistema low cost 👀
> Taller en vivo Avatar Ads 1.0 · 26–28 oct · solo 15 cupos → link en la bio

---

## 2. Cómo generar (flujo recomendado)

1. **Voz primero:** genera las 5 frases con tu clon de voz (ElevenLabs u otro) → 5 audios. Así la voz es idéntica en todas las tomas.
2. **Imagen inicial por toma:** con un modelo de imagen con referencia de cara (Nano Banana, Seedream, Flux Kontext…) + `referencia-avatar.png` → usa el **PROMPT DE IMAGEN**.
3. **Animar:** modelo imagen→video con lip-sync/audio (Kling, Veo 3, OmniHuman, Hedra…) con la imagen + el audio + el **PROMPT DE VIDEO**. Si el modelo genera su propia voz (ej. Veo 3), pega el diálogo dentro del prompt.
4. Genera cada toma 1–2 s más larga de lo que dura la frase; el corte se hace en edición.
5. Deja los clips en `Contenido/reels/05-clon-ia-anda-saluda/clips/` como `toma 1.mp4` … `toma 5.mp4` y yo hago la edición.

**Vestuario fijo en las 5 tomas** (es lo que vende el "es la misma persona"):
camisa azul marino oscuro de botones, mangas largas · gafas negras rectangulares · reloj plateado en la muñeca izquierda.

> Los prompts están en inglés porque los modelos responden mejor; el diálogo va en español.

---

## 3. Prompts

### Toma 1 — Oficina (gancho)

**Imagen:**
```
Vertical 9:16 smartphone selfie-style photo of the man from the reference image, same face, same black rectangular glasses, short dark hair, wearing a dark navy long-sleeve button-up shirt and a silver watch. He sits at a white desk in a bright modern office, a silver laptop in the lower right corner, white ceiling panels and a window with a small plant behind him. Medium shot from chest up, camera slightly above eye level, looking straight into the lens, mid-sentence expression, hands raised in a natural explaining gesture. Soft natural daylight, realistic skin texture, iPhone front camera look, no text, no watermark.
```
**Video:**
```
The man talks directly to the camera in a friendly, confident tone, speaking Latin American Spanish: "Para hacer anuncios con IA no necesitas esos avatares que parecen una foto hablando." He gestures naturally with both hands while explaining, small head movements, natural blinking, slight handheld camera shake. Realistic lip sync, no cuts, no zoom.
```

### Toma 2 — Cafetería (interactúa con un objeto)

**Imagen:**
```
Vertical 9:16 candid photo of the man from the reference image, same face and black rectangular glasses, dark navy long-sleeve button-up shirt, silver watch. He sits at a small wooden table in a cozy specialty coffee shop, holding a white ceramic coffee cup in his right hand, warm interior lights and blurred background with plants and shelves. Three-quarter angle, camera at table height, he looks at the lens with a playful half smile. Natural window light, realistic skin, shallow depth of field, smartphone photo look, no text.
```
**Video:**
```
The man looks at the camera and says playfully in Latin American Spanish: "Yo soy un avatar hecho con IA… y sí, me puedo tomar un café." On the last words he lifts the coffee cup and takes a real sip, then lowers it and smiles. Natural hand-cup interaction, the cup stays solid and consistent, subtle handheld camera, background people slightly moving out of focus.
```

### Toma 3 — Calle caminando (movimiento)

**Imagen:**
```
Vertical 9:16 photo of the man from the reference image, same face and black rectangular glasses, dark navy long-sleeve button-up shirt, silver watch, dark jeans. He is walking on a sunny city sidewalk with trees and modern buildings, holding a smartphone in his left hand, mid-stride, body facing the camera. Medium shot from the waist up, camera at chest height walking backwards in front of him, golden late-afternoon light. Realistic, natural vlog look, no text.
```
**Video:**
```
Tracking shot: the camera moves backwards while the man walks toward it at a relaxed pace, talking in Latin American Spanish: "Camino, me muevo y grabo donde quiera, sin cámara ni estudio." Natural walking motion with body sway, free hand gesturing, the phone in the other hand, cars and pedestrians passing softly in the background, slight vlog-style camera bounce. Realistic lip sync.
```

### Toma 4 — Casa, plano cercano (argumento económico)

**Imagen:**
```
Vertical 9:16 close-up photo of the man from the reference image, same face and black rectangular glasses, dark navy long-sleeve button-up shirt, silver watch. He stands in a modern living room with beige walls, a wooden frame and a plant behind him, holding a smartphone up near his chest with the screen facing the camera (screen shows a blurred video editing app). Camera at eye level, chest-up framing, sincere expression. Soft indoor daylight, realistic skin texture, smartphone front camera look, no text.
```
**Video:**
```
The man speaks directly to the camera with a sincere, convincing tone in Latin American Spanish: "Y todo con un sistema económico, sin herramientas caras." He briefly tilts the phone toward the camera, then lowers it and gestures with his free hand. Natural blinking, small head nods, handheld camera. Realistic lip sync, no cuts.
```

### Toma 5 — Cenital (CTA + gesto final)

**Imagen:**
```
Vertical 9:16 high-angle top-down photo of the man from the reference image, same face and black rectangular glasses, dark navy long-sleeve button-up shirt, silver watch, dark jeans and white sneakers. He stands on a light grey tiled patio next to a plant pot, looking up at the camera, full body visible, the camera is held high above his head pointing down. Bright soft daylight, realistic, smartphone photo look, no text.
```
**Video:**
```
High-angle static shot from above. The man looks up at the camera and says energetically in Latin American Spanish: "En Avatar Ads te enseño a crearlo en tres días. Solo quince cupos." Right after finishing, he winks and gives a casual two-finger salute from his forehead toward the camera, then smiles. Natural body movement, hands moving while talking, realistic lip sync.
```

### Extra — clip "antes" para el PiP con ❌ (opcional)
```
Vertical 9:16 video of a generic AI-looking presenter (not the man from the reference) sitting perfectly still in front of a plain studio background, stiff posture, only the lips moving, no hand gestures, no head movement, slightly artificial, overly smooth skin.
```
(Usa una persona genérica generada, no un video de otra persona real.)

---

## 4. Checklist de calidad antes de pasarme los clips
- [ ] Misma cara, gafas y camisa en las 5 tomas
- [ ] Manos con 5 dedos y la taza/celular sin deformarse
- [ ] Labios sincronizados con el audio
- [ ] Sin texto, logos ni marcas de agua generadas
- [ ] Toma 5: el guiño + saludo se ve completo
