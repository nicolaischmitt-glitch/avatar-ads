# ref01 — "Clon de IA que anda, saluda y se rasca un ojo"

Archivo: `ref01_clon-ia-anda-saluda.mp4` · 720×1280 (9:16) · 30 fps · 20,7 s · un solo hablante (clon IA de un creador de avatarhype.ai)

## Idea central
El video **es la demostración**: un clon IA habla de que los clones de HeyGen "parecen una foto hablando", mientras él mismo cambia de lugar, camina, toma café y termina con un saludo. El contenido prueba el argumento → el producto es el marketing.

## Estructura y tiempos

| # | Tiempo | Escena (plano) | Texto / voz | Recursos de edición |
|---|---|---|---|---|
| 1 | 0,00–2,40 | Sala, plano medio frontal, gesticula con manos | "Para clonarte no tienes que depender de HeyGen" | **Título-gancho** fijo detrás de la cabeza (ver abajo) |
| 1b | 2,40–4,37 | Igual | "y de esos avatares que parecen una foto hablando" | Sale el título (corte seco). Entra **PiP** de un avatar HeyGen con **❌ roja** arriba a la derecha |
| 1c | 4,37–5,47 | Jump cut, mismo plano | "y apenas tienen movimiento." | PiP sigue |
| 2 | 5,47–9,10 | Sofá, plano ¾, sostiene taza con forma de cara | "Yo soy un clon digital y no estoy hecho con HeyGen." | Al final **bebe de la taza** (prueba de interacción con objetos) |
| 3 | 9,10–13,23 | Exterior, pared de mármol, **caminando** con el celular en la mano | "Por eso puedo moverme con más naturalidad y tener mucho más control sobre cada escena." | Cámara en mano, sigue al sujeto |
| 4 | 13,23–16,07 | Pasillo, plano medio cerrado, frontal | "Y por mucho menos de lo que cuesta hacerlo con otras herramientas." | Argumento de precio |
| 5 | 16,07–20,69 | **Cenital** (desde arriba), de pie, mira a cámara | "En el nuevo Avatar Hype te enseñamos exactamente cómo crear clones como este." | CTA. Termina con **saludo militar + guiño** sin subtítulo (~0,7 s) |

Ritmo: 5 escenas en 20 s → un cambio de lugar cada ~4 s. Cada escena muestra **una habilidad distinta** (gesticular → objeto/beber → caminar → hablar cerca → plano picado + gesto).

## Elementos gráficos

**1. Título-gancho (0–2,4 s)** — "NO TE [logo HeyGen] / CLONES / CON HeyGen"
- "NO TE" y "CON": sans condensada pesada, blanca, mayúsculas, sombra dura negra desplazada.
- "CLONES": display ultra-bold redondeada, **verde lima (~#A8D84A)**, sombra dura gris oscuro (efecto 3D).
- "HeyGen": manuscrita/script blanca.
- Icono de HeyGen al lado de "NO TE".
- **Va detrás del sujeto**: la gorra tapa parte de "CLONES" y "HeyGen" (texto con máscara de persona = profundidad).
- Sin animación de entrada; aparece y desaparece con corte seco.

**2. PiP de "la competencia" (2,4–5,47 s)**
- Recuadro ~36 % del ancho, arriba a la derecha, con un clip de avatar HeyGen típico (estático, solo labios).
- Ligeramente torcido/en perspectiva, sin borde.
- Círculo rojo con ❌ blanca en la esquina; aparece 1 frame antes que el recuadro. Corte seco, sin animación.

**3. Subtítulos (todo el video)**
- Serif condensada elegante (tipo *Instrument Serif* / *PP Editorial*), blanca, minúsculas normales, sombra suave.
- 2–4 palabras por bloque, centradas, a ~72 % de la altura (sobre el pecho, encima del logo de la camiseta).
- Entrada con fundido muy corto (~2 frames), sin pop ni escala. Sin resaltar palabras.

**Audio**: voz clonada clara; no hay ningún silencio total → probablemente música/ambiente de fondo muy bajo (≈ −30 dB al final). Sin SFX evidentes.

## Cómo se produjo (deducción)
- Una sola identidad consistente en 5 lugares distintos → probablemente **imágenes generadas del clon por escena** (modelo de imagen con referencia de cara) + **modelo de video imagen→video con lip-sync / audio** (tipo Veo 3, Kling, OmniHuman, Hedra, Higgsfield…). La herramienta exacta no se puede saber por el video.
- Voz: clon de voz (tipo ElevenLabs) o generada por el propio modelo.
- Edición: CapCut/Premiere estándar. Cortes secos, subtítulos, título con recorte de sujeto, PiP.

## Plano de réplica para Avatar Ads
1. **Guion** (≈20 s, 5 frases): gancho contra la competencia → "yo soy un clon" → libertad de movimiento → precio → CTA del taller (26–28 oct).
2. **Generación** (fuera de Claude): 5 tomas del avatar Avatar Ads en 5 lugares, cada una con una acción distinta (beber, caminar, tocar un objeto, gesto final de guiño/saludo).
3. **Edición con HyperFrames** (Claude):
   - Título-gancho con la marca Avatar Ads (verde `#C5F740` en lugar del lima), **detrás del sujeto** con recorte (`embedded-captions` / remove-background).
   - PiP "antes" con ❌ — usar un ejemplo propio, no la cara de otra persona.
   - Subtítulos serif blancos 2–4 palabras, fundido corto.
   - Cortes secos, música baja, cierre sin texto con gesto.
4. Render 9:16, 30 fps.
