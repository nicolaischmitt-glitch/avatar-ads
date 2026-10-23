# Estructuras de copy por pieza

Las estructuras de guion de reels (A–G) viven en `skills/reels-avatar-ads/references/frameworks-guion.md` y las de carrusel en `skills/carruseles-avatar-ads/references/estructuras.md`. Aquí está lo común a todo el copy y las piezas que no tienen skill propio.

## Fórmulas de hook y de título
| Fórmula | Ejemplo |
|---|---|
| Resultado + cómo + objeción resuelta | "Crea anuncios con IA que venden. Hiperrealistas, en volumen y por menos de un dólar cada uno." |
| Contraste / mito roto | "Un video que parece real no es un anuncio que vende." |
| Revelación | "Yo no existo." · "Este anuncio no lo grabó nadie." |
| Pregunta "¿y si…?" con un precio | "¿Y si pudieras crear anuncios con la calidad de Seedance… pero por centavos?" |
| Dato concreto | "581 leads a 35 centavos, con anuncios que no grabó nadie." |
| Llamado al dolor | "Si te pasas horas grabándote y editando cada anuncio, mira esto." |
| Enemigo común | "No necesitas Seedance para hacer esto." |

Un buen título se entiende en 3 segundos, promete un resultado y tiene una palabra que se puede resaltar (en la landing va en verde con `<span class="b">`).

## Anuncio en video (30–45 s, evergreen)
1. **Hook (0–3 s):** revelación, contraste o dato. Que pare el scroll.
2. **Problema o contraste:** el costo, el tiempo o el "se ve falso".
3. **Giro hacia las ventas:** "Y no se trata solo de ahorrar…" → testear más → encontrar ganadores → escalar.
4. **Prueba:** ventas en Hotmart, resultado de un cliente, CPL $0,35.
5. **CTA:** uno solo, hacia la landing ("Toca el botón y…"). Sin precio ni fecha.
Después de aprobar el texto, el skill `reels-avatar-ads` lo divide en clips.

## Texto de Meta Ads (lo que acompaña al video)
- **Texto principal:** la primera línea es otro hook (se corta a ~125 caracteres). 3–6 líneas cortas: hook → beneficio → prueba → CTA. Sin precio ni fecha.
- **Título** (debajo del video, ~40 caracteres): la promesa. Ej.: "Anuncios con IA que venden".
- **Descripción** (opcional, ~25 caracteres): refuerzo. Ej.: "Por menos de $1 cada uno".
- Políticas de Meta: no aludir a características personales del lector ("¿Estás quebrado?"), no prometer ingresos, no mostrar antes/después engañosos.
- Entrega 2–3 variantes de texto principal para testear.

## Landing (sección por sección)
- **Hero:** título (promesa) + subtítulo (cómo / para quién) + prueba visual + CTA.
- Cada sección: etiqueta corta (`label`) → h2 con contraste y una parte en verde → una frase que explica → la prueba o el gráfico.
- **Oferta:** lo que compran es el Sistema Avatar Ads de por vida; el taller es donde se enseña a usarlo. Primero el sistema, después el taller y los bonos.
- **FAQ:** una objeción real por pregunta (sección 6 de BASE-CONOCIMIENTO), respuesta en 1–2 frases.
- **Cierre:** repite la promesa del hero con otras palabras + CTA.

## Email
- **Asunto:** curiosidad o beneficio en 3–7 palabras; 2–3 opciones.
- **Primera línea:** continúa el asunto, no saluda en vacío.
- **Cuerpo:** una idea, párrafos de 1–3 líneas, tono de mensaje personal.
- **CTA:** un enlace, con `src=emailN` + `utm_*` (ver `emails/`).
- Lista fría: reconectar antes de vender (ver BASE-CONOCIMIENTO, "Lista de email").

## Caption de Instagram
- Primera línea = hook (es lo único que se ve antes de "más").
- 3–6 líneas de valor o contexto.
- CTA: "Comenta PALABRA y te envío…" (orgánico) o hacia la landing.
- Hashtags según el skill del formato.

## DM / mensaje directo
- Corto, personal, una pregunta o un enlace. Nada que parezca automático.
