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
2. **Sin huecos**: ninguna pausa de más de ~0,3 s; las mayores se recortan a ~0,1–0,2 s, cortando dentro del silencio, nunca dentro de una palabra. Al final, ~0,5–0,8 s de cola para leer el CTA.
3. **Sin palabras estiradas**: si una vocal se sostiene de más, se corta dentro de ella dejando ~0,15 s y se salta a la palabra siguiente. Para encontrarlas: `node sistema/scripts/detectar-estiramientos.mjs <carpeta de clips>`.
4. **Cada corte interno se tapa** con un cambio de zoom (diferencia ≥ 0,1) o con un B-roll.
5. **Cortes alineados a fotogramas** (24 fps); ningún plano de menos de ~0,8 s.

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
