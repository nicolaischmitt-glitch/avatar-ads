# Taller de apertura · Roadmap

**Domingo 1 de noviembre de 2026, 10:00 a.m. (Ecuador) · ~2 horas · online, en vivo.**
Lo que se logra: los alumnos ven el proceso completo del Sistema Avatar Ads (teoría + práctica) y salen con dos versiones del mismo anuncio para un producto.
Notas de teoría del usuario: `notas-taller.docx` (copia de `Avatar Ads 1.0.docx` de Descargas, con los añadidos) → van a la presentación.

---

## 1. El anuncio del taller (decidido el 30 oct 2026)

- **Producto:** **CUMBRE**, café de especialidad de altura (marca ficticia), molido, bolsa de 340 g. En el copy del taller se dice "un producto".
- **Personaje:** un hombre (emprendedor que entrena); el resto se define en la ficha del avatar.
- **Dónde se trabaja:** `sistema-cumbre/` = copia del kit 1.4.2 con el negocio CUMBRE ya configurado (`negocio/negocio.md`, `marca.md`). Se abre esa carpeta en Claude Code, chat nuevo, y se pega `brief.txt`. El anuncio queda en `sistema-cumbre/anuncios/01-…/`. Esa misma carpeta se copia a la HP.
- **Ángulo: identidad, café para high achievers** (atletas, empresarios, emprendedores que madrugan y quieren ganar el día). Hook aprobado: **"Si te levantas a las cinco para ganarle al día, no lo empieces con un café cualquiera."** Guion: pendiente.
- **Dos versiones del mismo anuncio**, igual que el sérum 08 (A/B de la landing):
  - **Versión A · avatar hablando + B-rolls** (formato D): el personaje a cámara con el café, ~6 clips de voz de 6–8 s + escenas de su día encima.
  - **Versión B · "un día en su vida" con voz en off** (como la referencia de los audífonos, `referencias/ejemplos-ugc/airpods ugc ad.mp4`): el **mismo personaje** en varias escenas de su día usando el café (alarma 5 a.m., prepara el café, lo toma antes de entrenar, entrenando, en el trabajo con la taza…), con tomas tipo selfie/vlog en las que no habla. Encima, el mismo guion leído por una voz de Google AI Studio (de su mismo género), sin música. No son B-rolls bonitos del empaque: es una persona viviendo con el producto.
- **Mismo guion para las dos** (35–40 s). Así se ve que con un solo trabajo salen dos anuncios para testear, y lo único que cambia es el formato.
- **Producto LOCKED IN:** paso 0 = foto del producto (`producto/producto.png`), adjunta en el avatar y en cada escena donde sale el café.
- **Mismo personaje en todas las escenas:** cada escena parte de una imagen que se genera con la foto del avatar (`mismaPersona`) + la del producto. Las ~8–10 escenas de la versión B también sirven de B-rolls en la A, así que se generan una sola vez.
- **Llevar al kit:** el formato "un día en su vida" (voz en off + el personaje en escenas de vlog) es nuevo; si funciona, se agrega a `sistema/formatos/voz-en-off/` como variante.
- **Créditos estimados:** ~6 clips de voz + ~10 B-rolls ≈ 170 créditos de Flow por pasada; con 2 variaciones por clip, ~340. Con el plan gratuito (50 por cuenta al día) son ~7 cuentas.

## 2. Qué se hace en vivo y qué se lleva hecho ("programa de cocina")

| Paso | En vivo | Llevado hecho |
|---|---|---|
| Brief, ángulo, guion, división en clips | ✅ con el sistema en Claude Code | guion aprobado (el "plato ya horneado") |
| Ficha del producto + foto del producto | ✅ se muestra el prompt | `producto.png` |
| Avatar (ficha → JSON → imagen) | ✅ se genera 1 imagen en vivo | `avatar.jpg` elegido |
| Paquete de prompts (`prompts-flow.md`) | ✅ el sistema lo genera | — |
| Clips de voz y B-rolls en Flow | ✅ **1 clip de voz + 1 B-roll** de muestra | todos los clips |
| Voz en off (AI Studio) | ✅ se genera completa en vivo | la voz usada en el final |
| Storyboard A y B | ✅ | — |
| Edición + render | ❌ (riesgo de esperas) | **los dos MP4 finales** |

Por qué cortar en el storyboard: el storyboard es donde el alumno decide cómo se ve el anuncio; lo que sigue (edición y render) lo hace el sistema solo y tarda minutos que en vivo son tiempo muerto. Si sobra tiempo, se abre la vista previa de la edición en el navegador (sin render) para que vean que se puede iterar conversando.

**Cómo se usa el sistema en vivo (decisión del 30 oct 2026):** como si el alumno ya hubiera hecho la configuración inicial. El negocio del café ya está cargado en el kit (`negocio/negocio.md` y `marca.md`) y se abre **un chat nuevo para crear un anuncio**, igual que lo hacemos nosotros. En vivo se aclara: "cuando instalas el sistema, pasas por unas preguntas de ~10 minutos sobre tu negocio; eso está en el curso y es solo la configuración inicial, así que hoy vamos directo a crear el anuncio".

**Cómo evitar que lo de vivo no coincida con lo preparado:** se pega un brief escrito de antemano (`brief.txt`) para que el sistema llegue al mismo ángulo; al elegir entre los 3 ángulos se escoge el preparado. Cuando el guion o los prompts salgan un poco distintos, se dice abiertamente: "como en los programas de cocina, este es el que dejé listo ayer" y se abre la carpeta preparada.

## 3. Guion del día (~2 h)

| Hora | Bloque | Qué pasa |
|---|---|---|
| 10:00 | Bienvenida (5 min) | Qué vamos a lograr hoy. Se muestra el sérum A y B: "hoy creamos uno así, desde cero". |
| 10:05 | Teoría (35 min) | Presentación: las notas del docx (ver sección 4). |
| 10:40 | Práctica 1 · de la idea al guion (15 min) | Explicar en 1 minuto la configuración inicial (que nos saltamos) → chat nuevo en el sistema → brief → 3 ángulos → guion → clips. |
| 10:55 | Práctica 2 · producto y avatar (12 min) | Ficha del producto, ficha del avatar, JSON, generar la imagen en vivo. |
| 11:07 | Práctica 3 · prompts y generación (13 min) | `prompts-flow.md`; generar 1 clip de voz y 1 B-roll en Flow (mientras cargan, se explica). |
| 11:20 | Práctica 4 · voz en off (5 min) | Generar la voz en AI Studio. |
| 11:25 | Práctica 5 · storyboard (10 min) | Storyboard A y B; cambiar algo en vivo para mostrar que el alumno decide. |
| 11:35 | Revelación (10 min) | Versión A y versión B finales. Por qué hacer dos: testear. Vista previa de la edición si hay tiempo. |
| 11:45 | Cierre y preguntas (15 min) | Qué se llevan (sistema, grabación, guía de instalación, grupo, curso), clase bonus del lunes 2 nov, 7 p.m. |

## 4. Presentación (teoría, ~35 min)

Orden propuesto con las notas del docx, más 3 diapositivas que faltan (marcadas ➕):
1. Qué es el Sistema Avatar Ads (producir, testear y escalar; 1 hora por anuncio grabado vs. la resistencia del cliente a grabar; "¿rompe la confianza?" → el anuncio es la puerta).
2. Testear → ganador → iteraciones sobre el ganador.
3. ➕ Una versión A y una versión B del mismo anuncio (lo que van a ver hoy) = el primer paso del testeo.
4. Qué hace un buen anuncio (ángulo/guion/hook · ambiente · edición).
5. Tipos de anuncio (head talking, product review, unboxing, vlog, podcast) → mismo proceso.
6. El proceso en resumen (8 pasos) + "tu único trabajo: copiar, pegar y generar".
7. Herramientas (Claude Code Pro, Google Flow: opción A plan de pago / opción B varias cuentas).
8. El secreto: la imagen raíz es el 80 % del éxito, y por eso es donde pasamos el 80 % del tiempo. Los clips son la parte más simple; si la imagen no es buena, el video no va a ser bueno. (Punto clave del usuario: no perderlo.)
9. Buena imagen vs. mala imagen (+ las dos imágenes del docx).
10. Prompt humano vs. prompt JSON (lado a lado, el JSON resumido; el completo va en los materiales).
11. ➕ Producto consistente (LOCKED IN): la misma foto del producto en cada imagen, si no el producto cambia en cada toma.
12. ➕ Los clips: 6–10 s y la misma velocidad de habla (si sobra texto, el avatar acelera).
13. Motores: Nano Banana Pro (imagen) y Omni 1.1 (video).

Correcciones al texto del docx: "Nanabanana" → Nano Banana · la frase "Eso solo nos dará resultados" quedó incompleta.

## 5. Calendario de producción

- **Vie 30 oct (hoy):** guion aprobado · ficha del producto y del avatar · `prompts-flow.md` completo · esquema de la presentación.
- **Sáb 31, mañana:** generar producto, avatar, clips de voz y B-rolls en Flow · voz en off en AI Studio.
- **Sáb 31, tarde:** edición y render de A y B · presentación terminada · instalar el sistema en la HP y **ensayo completo en la HP**.
- **Dom 1, 9:00:** prueba técnica (pantalla, audio, sesiones abiertas, créditos para la demo).

## 6. Checklist de la laptop HP (sábado)

- [ ] Claude (app de escritorio) con sesión de la cuenta Pro, pestaña Code.
- [ ] Node, ffmpeg, Chrome y HyperFrames instalados siguiendo `sistema-avatar-ads/INSTALACION.md` (de paso se prueba la guía en un Windows limpio).
- [ ] Kit `sistema-avatar-ads/` (versión 1.4.2) copiado + la carpeta del anuncio preparado en `anuncios/`.
- [ ] Google Flow con sesión iniciada y créditos para 1 imagen + 1 clip + 1 B-roll; Google AI Studio abierto.
- [ ] Los dos MP4 finales y los del sérum en local (no depender de internet para mostrarlos).
- [ ] `brief.txt` listo para pegar.
- [ ] Presentación abierta + copia en PDF por si falla.
- [ ] Zoom/Meet probado: compartir pantalla con audio (para que se escuchen los anuncios).

## Pendiente
- [x] Marca ficticia del café (CUMBRE) cargada en `sistema-cumbre/negocio/`.
- [ ] Guion del anuncio (con el hook aprobado), hecho con el sistema en un chat nuevo (`brief.txt`).
- [ ] Ficha del producto.
- [ ] Ficha del avatar (quién vende este café y dónde graba).
- [ ] ¿Canva o Google Slides?
- [ ] Plataforma de la clase (Zoom, Meet…) y link para el grupo.
