# Reel 08 — Así creamos este anuncio (proceso del sérum ALBA) → comenta TALLER

**Estado:** guion aprobado y editado (30 oct 2026) → `final/reel-08-proceso-serum-taller.mp4`.
**Objetivo:** llevar gente al taller del domingo con "comenta TALLER". Sirve cada semana: dice "este domingo", sin fecha ni precio.
**Formato:** voz en off generada en Google AI Studio, escrita como habla Nicolai, sobre una pantalla dividida. A la izquierda va el proceso en 6 pasos (paneles propios, sin mostrar herramientas); a la derecha, el anuncio del sérum con la chica a cámara, **en silencio y sin subtítulos**. Fondo hueso de la marca (`storyboard/storyboard.png`).
**Pausa:** a mitad del reel la voz en off se calla y la chica habla 7,3 s con su voz real ("Hoy me miro al espejo… y eso que no llevo maquillaje", del segundo 21,7 al 29,0 del anuncio). Mientras habla, el anuncio crece dentro de un marco de celular (~70–75 % de la pantalla, no a pantalla completa) y el panel del proceso se aparta.
**Duración estimada:** ~44 s (voz en off ~34 s + la chica 7,3 s + pausas).

## Hook (las opciones)
| | Voz | En pantalla | Por qué |
|---|---|---|---|
| A | "Esta chica no existe. Y apuesto a que no lo notaste." | Ella **no existe.** | Revelación + reto. Hace que vuelvan a mirarla buscando el error (más retención) y abre la pregunta que se cierra en la pausa: ¿también habla? Es la misma familia que "Yo no existo" y "Ninguna de estas personas existe", que ya funcionaron. |
| B | "Este anuncio no lo grabó nadie. Ni cámara, ni actriz, ni maquillaje." | Nadie **lo grabó.** | Contraste con la forma tradicional. El "ni maquillaje" se conecta después con su frase "eso que no llevo maquillaje". |
| C | "Te muestro cómo creamos este anuncio… sin grabar un solo segundo." | **Sin grabar** nada. | Promete el proceso de una vez. Es más clara, pero frena menos el scroll. |
| **C2 ✅ elegida** | "Te muestro cómo creamos este anuncio con inteligencia artificial, desde cero." | Así creamos este anuncio, **desde cero.** | Idea del usuario (30 oct 2026), a partir de la C. Promete el proceso completo y "este" señala el anuncio que se está viendo. La revelación "no existe" pasa al paso 3. |

## Guion completo (con el hook C2)
| Tiempo aprox. | Voz | Izquierda (proceso) | Derecha (anuncio, mudo) |
|---|---|---|---|
| 0–5 s | Te muestro cómo creamos este anuncio con inteligencia artificial, desde cero. | Los 6 pasos | Ella habla con el frasco en la mano (clip 1) |
| 4–8 s | Primero, el guion: le digo al sistema qué quiero vender. | 01 · Chat: brief → guion escribiéndose | Se toca la ojera (clip 2) |
| 8–14 s | Le paso una foto del producto… y queda idéntico en cada escena. | 02 · Foto del frasco + 3 checks | B-roll del frasco en su mano / en el lavabo |
| 14–17 s | Después, la creamos a ella. Sí: no existe. | 03 · Prompt → la imagen se "revela" | Ella a cámara |
| 17–21 s | Planeamos cada escena… y la convertimos en video. | 04 → 05 · Cuadrícula de escenas → clips generándose | B-rolls (gotero, gotas en la mano) |
| 21–23 s | ¿Y crees que solo se mueve? | (el panel se aparta) | El anuncio crece en el marco de celular |
| 23–30 s | *(habla la chica)* **"Hoy me miro al espejo y me veo despierta, fresca, con brillo… y eso que no llevo maquillaje."** | — | Ella a cámara, con su voz y con subtítulos solo aquí |
| 30–35 s | Sí, también habla. Y la edición, el sistema la hace solo. | 06 · Línea de tiempo → "Render ✓" | Vuelve a su lugar |
| 35–43 s | Este domingo creo uno así, en vivo. Comenta TALLER y te envío la información. | Tarjeta CTA + burbuja escribiendo TALLER | — |

**Texto de la voz en off (bloque para AI Studio, en dos partes):**
> **Parte 1:** Te muestro cómo creamos este anuncio con inteligencia artificial, desde cero. Primero, el guion: le digo al sistema qué quiero vender. Le paso una foto del producto… y queda idéntico en cada escena. Después, la creamos a ella. Sí: no existe. Planeamos cada escena… y la convertimos en video. ¿Y crees que solo se mueve?
>
> **Parte 2:** Sí, también habla. Y la edición, el sistema la hace solo. Este domingo creo uno así, en vivo. Comenta TALLER y te envío la información.

### Notas
- **Voz de Nicolai:** primera persona ("le digo", "creo uno así"), frases cortas, una pregunta suelta antes de la revelación (como "¿Lo difícil?" / "Vender." de sus correos) y un cierre directo.
- **"Creo uno así, en vivo" y no "desde cero":** en el taller, los clips se generan antes (método "programa de cocina"). "En vivo" es exacto; "desde cero" se podría tomar como que todo se genera en ese momento. Por lo mismo, la tarjeta del CTA del storyboard pasa a decir **"Este domingo creo uno así, en vivo."**
- **"El sistema"** = Sistema Avatar Ads. No se nombra ninguna herramienta.
- **Sin precio ni fecha exacta:** la información va en el DM de TALLER.

## Caption (borrador)
Esta chica no existe. Tampoco el anuncio que estás viendo: no hubo cámara, ni actriz, ni grabación.

Así lo creamos:
1. El guion
2. El producto, idéntico en cada escena
3. Ella, desde cero
4. Las escenas
5. De imagen a video
6. La edición

Este domingo creo un anuncio así, en vivo, y te muestro todo el proceso.

👉 Comenta TALLER y te envío la información por DM.

#inteligenciaartificial #anunciosconia #ugc #marketingdigital #avatarads

## Edición (cómo se rehace)
- **Voz:** `voz/voz-original.wav` (AI Studio) → `voz/voz.wav` a 1.1x (`atempo=1.1`, mismo tono) → `edicion/voz.mjs`: recorta las pausas de más de ~0,6 s a ~0,45 s y la parte en dos (`voz-p1` hasta "¿se mueve?" y `voz-p2` desde "Sí, también habla") → loudnorm −15 LUFS (`voz-p1-n.wav`, `voz-p2-n.wav`).
- **Anuncio:** `edicion/anuncio-limpio/base-video.mp4` (= el video del anuncio 08 sin subtítulos, botón ni marca de agua) recortado desde 0,28 s → `public/anuncio.mp4`. Con ese desfase, la frase del espejo cae justo en la pausa.
- **La chica:** `anuncio-limpio/voz.wav` de 21,58 a 28,92 s → `public/audio/ella.wav` (7,34 s), entra en el segundo 21,3 del reel.
- **Tiempos del reel:** voz 1 de 0 a 21,1 s · celular 19,95–20,9 s · la chica 21,3–28,6 s · voz 2 de 29,0 a 38,4 s · CTA desde 33,1 s · total 39,3 s.
- **Render:** desde `edicion/`: `hyperframes render public -o ../final/reel-08-proceso-serum-taller.mp4 --fps 24 --quality delivery --workers 2`.
