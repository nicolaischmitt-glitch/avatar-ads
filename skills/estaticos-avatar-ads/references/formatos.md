# Formatos de estáticos probados

Cada formato tiene un anuncio de referencia en `anuncios/imagenes/`: ábrelo, cópialo y cambia el contenido. Lo nuevo que funcione se agrega aquí.

| # | Formato | Ángulo | Referencia | Estado |
|---|---|---|---|---|
| A | Mosaico de avatares | realismo / prueba | `13-estatico-ninguna-existe/` (`?seis`) | aprobado (29 oct 2026) |
| B | Comparación rojo vs. verde con cifras | precio | `14-estatico-13-veces-mas-barato/` (`?30s`) | se pauta la de $13 (29 oct 2026) |
| C | Encuesta "¿Real o IA?" | realismo | `15-estatico-real-o-ia/` | hecho |
| D | Meme de las dos puertas (dibujo de línea) | precio | `10-estatico-puertas-precio/` | aprobado (28 oct 2026) |
| E | Camino enredado vs. línea recta (dibujo de línea) | proceso / tiempo | `11-estatico-camino-proceso/` | aprobado (28 oct 2026) |

## A · Mosaico de avatares
- **Idea:** "Ninguna de estas personas existe." La imagen es la prueba: muchos avatares de nuestros anuncios, cada uno con su tipo de negocio.
- **Estructura:** título (palabra clave en verde) → 2 líneas de apoyo → cuadrícula 3×2 con etiqueta centrada abajo de cada foto → CTA.
- **Reglas:** 6 avatares, no 9 (se veía cargado). Personas distintas, mezcla de hombres y mujeres, de lugares (oficina, carro, estudio, clínica). Etiquetas = tipo de negocio ("Skincare", "Clínica dental", "Video de ventas"…), no nombres.
- **Variantes posibles:** otro título ("Ninguno de estos anuncios lo grabó una persona"), 4 avatares grandes (2×2), un solo negocio con 6 avatares distintos ("6 anuncios para tu clínica, sin grabar uno").

## B · Comparación rojo vs. verde con cifras
- **Idea:** con lo que cuesta 1 anuncio en otras herramientas haces 13 con el sistema.
- **Estructura:** título ("Con lo que pagas por 1 anuncio, haz 13.") → apoyo → recuadro rojo angosto (otras herramientas, ~$13 = 1 anuncio, 1 foto grande) + recuadro verde ancho (Con Avatar Ads, ~$13 = 13 anuncios, 13 fotos pequeñas) → nota de qué mide la cifra → CTA.
- **Cifras:** las de la sección de costos de la landing (`landing/index.html`, `#economico`): ~$13 por anuncio de 30 s en otras herramientas (promedio de Wan 2.5, Seedance 2.0 API oficial y fal.ai, Seedance 2.5) vs ~$1 con el sistema → 13 veces. Variante de 1 minuto: ~$26 vs ~$2. Cuidado: el ~$0,02 por crédito es un dato de terceros "por confirmar" (ver `PROYECTO.md`).
- El contraste visual (1 foto vs. 13) dice el mensaje sin leer.

## C · Encuesta "¿Real o IA?"
- **Idea:** una pregunta que frena el scroll y se responde en la misma imagen.
- **Estructura:** "¿Persona real o IA?" en grande → la foto más creíble que tengamos (piel con textura, lugar real) → encuesta tipo historia de Instagram abajo de la foto ("Real" tachado, "IA ✓" en verde) → "Nadie grabó este anuncio. Ella no existe." → CTA.
- **Reglas:** la encuesta nunca sobre la cara. Sin porcentajes en la encuesta (serían datos inventados).

## D · Meme de las dos puertas
- Dibujo de línea en SVG, fondo blanco: una puerta verde con una persona ("PAGAR ~$1 POR ANUNCIO") y una roja con la multitud ("PAGARLE ~$20 A SEEDANCE POR ANUNCIO"). Sin fotos. Ver `10-estatico-puertas-precio/imagen.html`.

## E · Camino enredado vs. línea recta
- Dibujo de línea: el camino rojo "GRABARTE TÚ · 2–3 horas por anuncio" (idea → guion → lugar → micrófono → luz → grabar → me equivoqué → … → 1 anuncio) contra la línea verde "CON AVATAR ADS" (idea → 1 anuncio). El usuario prefirió la versión **sin pasos** en la línea verde. El proceso tradicional es el suyo real (se graba él); no usar "buscar creadores" ni "enviar productos".

## Ideas aún sin probar
- "La misma persona, en cualquier lugar": un avatar en 3 escenas (carro, casa, con el producto) → consistencia del personaje.
- "De una idea a un anuncio": tira de 3 pasos con frames reales (avatar → clip → anuncio con subtítulos).
- "Un feed de anuncios que no grabó nadie": 3–4 teléfonos con nuestros anuncios.
