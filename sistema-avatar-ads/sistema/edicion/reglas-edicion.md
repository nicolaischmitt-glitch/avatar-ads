# Reglas de edición (todos los formatos)

## Formato y ritmo
- 1080×1920 vertical, 24 fps (la velocidad de Google Flow; nunca convertir antes de cortar).
- Un cambio visual cada **~2 s** (corte, zoom, chip, B-roll). Nunca más de 4 s seguidos sin que pase nada.
- Subtítulos palabra por palabra, bloques de máx. 3 palabras; la palabra que se dice se enciende con el color de acento de la marca y las palabras clave se quedan encendidas.
- Colores, tipografías y logo: de `negocio/marca.md`. Sin rojo en textos (se lee como error); el rojo solo en íconos de ✕.

## Zonas seguras
- Nada importante en el **~20 % inferior** (lo tapan el texto del anuncio y el botón de Meta/TikTok) ni en el 8 % superior.
- Evitar la franja derecha (botones de Instagram/TikTok).
- Los gráficos sobre la cara van en el tercio superior, sin taparle los ojos.

## Voz fluida (se aplica siempre, sin que el usuario lo pida)
1. **Arranque inmediato**: la primera palabra suena en el primer fotograma.
2. **Pausas naturales, sin silencios largos**: recorta solo las pausas de más de ~0,3 s, dejándolas en ~0,15–0,25 s, cortando dentro del silencio. Las pausas cortas entre palabras se dejan: si se recortan de más, el video se ve acelerado y poco natural. Nunca cortes la cola suave de la última palabra (fin = fin de la voz que da `medir-voz.mjs` + ≥ 0,06 s). Revisa `base.mp4` con `node sistema/scripts/pausas.mjs base.mp4 --min 0.3`. Al final, ~0,5–0,8 s de cola para leer el CTA.
3. **Sin palabras estiradas**: si una vocal se sostiene de más, se corta dentro de ella dejando ~0,15 s y se salta a la palabra siguiente. Para encontrarlas: `node sistema/scripts/detectar-estiramientos.mjs <carpeta de clips>`.
4. **Cada corte interno se tapa** con un cambio de zoom (diferencia ≥ 0,1) o con un B-roll.
5. **Cortes alineados a fotogramas** (24 fps); ningún plano de menos de ~0,8 s a la vista (bajo un B-roll pueden ser más cortos).

## Cada elemento con un propósito
- No añadas cosas solo por añadir: nada de títulos arriba que repitan lo que dice el subtítulo.
- Cada gráfico aporta algo que la voz no dice: autoridad (rótulo de quien habla), explicar (proceso), mostrar (B-roll), actuar (botón), quién (marca al cierre).
- **El botón del CTA nunca se parece a los subtítulos**: si los subtítulos llevan caja, el botón usa otra forma y color (o los subtítulos van sin caja y el botón es la única píldora).

## Audio
- Voz a **−14 LUFS**, pico ≤ −1,5 dB (filtro en el paso de "audio limpio" del formato).
- **Música**: por defecto sin música (la voz y los SFX se escuchan mejor en anuncios). Si el usuario quiere música, va muy baja, por debajo de la voz.
- **SFX** en cada animación (volumen 0,25–0,5, por debajo de la voz), archivos en `public/audio/`:

| Animación | Sonido |
|---|---|
| Corte a B-roll / entrada de tarjeta grande | `whoosh-short` |
| Transición larga | `whoosh-cinematic` |
| Chip, título con rebote, sello | `pop` |
| Etiquetas, pasos dentro de una tarjeta | `click-soft` |
| Texto que se escribe | `typing` |
| Golpe de zoom en palabra de impacto | `impact-bass-1` |
| Algo "falso" o un error | `glitch-1` |
| Acierto, resultado positivo | `chime` |
| Revelación | `sparkle` |
| Contador que sube | `riser` |
| Botón del CTA | `ping` |

Dos sonidos que se solapan van en pistas distintas (`data-track-index`).
