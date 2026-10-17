# Plantilla de edición — reels Avatar Ads

Punto de partida para editar cada reel nuevo (Fase 5 del skill `reels-avatar-ads`). Basada en el reel 01.

## Pasos
1. Copia `unir-clips.mjs` a `reels/NN-slug/edicion/` y crea ahí `cortes.txt` (clip, inicio, fin en segundos).
   Para encontrar los cortes: `ffmpeg -i clip-0N.mp4 -af silencedetect=n=-35dB:d=0.25 -vn -f null -`
2. `node edicion/unir-clips.mjs` → `edicion/base.mp4` (1080×1920, 30 fps, con enfoque suave).
3. `hyperframes transcribe edicion/base.mp4 -d edicion -l es --json` → `transcript.json` con el tiempo de cada palabra.
4. Copia `public/` de esta plantilla a `edicion/public/`, re-encodea `base.mp4` a `public/input-video.mp4` con `-g 30 -keyint_min 30`, y pon las imágenes del reel en `public/img/`.
5. Parte de `index-ejemplo-reel-01.html` → `index.html`. Cambia los bloques (`.layer.clip`) y los tiempos según el transcript.
6. `hyperframes lint public` → `hyperframes snapshot public --at …` (revisar) → `hyperframes render public -o ../final/reel-NN-slug.mp4 --fps 30 --quality delivery`.

## Cómo funciona la composición (sin escribir GSAP a mano)
Cada elemento se anima con atributos; el script del final los compila:
| Atributo | Efecto |
|---|---|
| `data-t="12.24"` | la palabra aparece (sube + fade) en ese segundo — usar con los tiempos del transcript |
| `data-pop="1.92"` | entrada con rebote (títulos grandes, chips, etiquetas) |
| `data-in="4.7"` | entrada suave (sube + fade) para tarjetas y capturas |
| `data-out="8.45"` | desaparece en ese segundo |

## Bloques disponibles (clases CSS)
- Texto sobre la cara: `.ftext` + `.serif .s76/.s64/.s56`; palabra clave `.acc` (verde) o `.red`; impacto `.big`.
- Cutaway a pantalla completa: `.layer.full.clip` (fondo oscuro de marca con rejilla).
- Rótulos: `.chip.bad` (✕ FORMA INCORRECTA), `.chip.good` (✓ / PASO N), `.step` (k = kicker, t = frase).
- Capturas: `.shot` (marco redondeado), `.tag`, `.pill` + `.dot` (señalar zonas), `.polaroid`, `.flash`.
- Antes → después: `.wipe` con `#wipe-after` y `#wipe-line`.
- CTA: `.prompt-box` (palabra clave), `.magnet` (tarjeta del lead magnet), `.arrow`.
- Imagen hecha con IA tachada: `.stamp` (círculo rojo con X), `.play`, `.bar`.

## Audio
- **Sin música.** Solo voz + SFX.
- Voz a −14 LUFS: al crear `public/input-video.mp4` añadir
  `-af "highpass=f=70,acompressor=threshold=-22dB:ratio=3:attack=5:release=90:makeup=2,loudnorm=I=-14:TP=-1.5:LRA=7,aresample=48000"`.
- SFX incluidos y cuándo usarlos: tabla en `skills e instrucciones/reels-avatar-ads/references/estilo-edicion.md` (sección Audio).

## Zooms
El video va dentro de `<div id="zoom">`; los tweens de `scale` están al final del script del ejemplo (intro lenta + golpes en frases de impacto).

## Colores
Ningún texto en rojo: blanco o verde `#C5F740`. El rojo solo en iconos ✕.
