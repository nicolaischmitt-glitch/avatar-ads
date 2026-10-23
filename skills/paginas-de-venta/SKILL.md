---
name: paginas-de-venta
description: Sistema para crear y mejorar landing pages y páginas de venta (y sus páginas de gracias) para Avatar Ads o cualquier otro producto, servicio o evento. Reúne las reglas del usuario sobre estructura, inicio, oferta, valores, comparativas, FAQ y proceso de cambios. Úsalo cuando el usuario quiera crear una landing o página de venta nueva, cambiar o mejorar una existente (título, secciones, oferta, bonos, precios, FAQ, botones), o armar un funnel o página de gracias.
---

# Páginas de venta

Reglas que el usuario fue definiendo al construir la landing de Avatar Ads (oct 2026). Sirven para **cualquier producto**: cambia el contenido, no las reglas. Ejemplo completo y vivo: `landing/index.html` (https://taller.droilab.com/).

El copy de cada sección se escribe con el skill **`copy-avatar-ads`** (opciones + checklist + banco aprobado). Este skill decide la **estructura, el diseño de la página y la oferta**.

## Proceso de trabajo (lo más importante)
1. **Cambia solo lo que el usuario pidió.** Nunca "mejores" de paso otra sección, aunque parezca alineada con el pedido. Si ves algo que convendría cambiar, **proponlo en texto y espera su sí** antes de tocarlo. (El 22 oct 2026 se cambió la oferta sin que él lo pidiera, justo cuando la estaba leyendo y le gustaba, y hubo que revertirla.)
2. Si el usuario dice "espera" o "no hagas cambios", no publiques nada más; si algo ya se publicó, revierte exactamente a la versión anterior.
3. Antes de publicar: revisar en tamaño de celular (375 px), sin scroll horizontal.
4. Publicar (en Avatar Ads: `node publicar-landing.mjs "qué cambió"`), guardar en GitHub y anotar las decisiones en `PROYECTO.md` / `BASE-CONOCIMIENTO.md`.
5. Si cambia la oferta, alinear también la **página de gracias** (lo que el comprador "ya tiene").

## 1. El inicio capta, no vende
Mientras más simple, mejor. Arriba solo va lo que capta la atención.
- **Arriba del todo:** solo el **logo, centrado**. Sin barra superior de fecha y hora, sin píldoras al lado del logo, sin etiquetas tipo "Apertura · Taller en vivo".
- **Hero = título + subtítulo + prueba visual (video) + un botón.** Nada más.
- **Sin precio, sin fechas, sin horarios, sin datos extra** (ni recuadros de "1 día · +1 clase · <$1").
- **El primer botón no va al checkout:** baja a la oferta ("Ver todo lo que incluye", con flecha hacia abajo). Los botones de compra aparecen desde la oferta.
- **Título:** el resultado que compran, no la característica. Ej.: "Crea anuncios con IA **que venden.**" + segunda frase más pequeña con las objeciones resueltas ("Hiperrealistas, en volumen y por menos de un dólar cada uno."). Una parte resaltada en el color de acento.
- **Subtítulo:** rompe la expectativa y presenta el sistema; incluye a todos los públicos ("…tu negocio o el de tus clientes").

## 2. Secciones
- **Sin etiquetas pequeñas** encima de los títulos ("Ejemplos hechos con el sistema", "Resultados reales", "La oferta"…). Cada sección empieza directo con su título (h2). Si una columna se queda sin título, se le pone un h2 corto ("Qué aprenderás.").
- Cada h2 con contraste y una parte en color de acento; debajo, una frase que explica; después la prueba o el gráfico.
- **Orden que funcionó:** hero → ejemplos (videos) → contraste "X no es Y" + el sistema/mecanismo en pasos → resultados reales → comparativa de costo → beneficio principal (testeo) con prueba → para quién / qué aprenderás → oferta → FAQ → cierre (repite la promesa + botón).
- **Hablar del sistema, no de "mis":** "el sistema que usamos para crear anuncios", no "el que uso para crear mis anuncios".
- Videos: carrusel horizontal, se reproducen en silencio al entrar en pantalla, botón "Activar sonido". Quitar los ejemplos que no aporten (menos es más).

## 3. Comparativas y números
- **Se tienen que entender en una sola lectura.** Nada de ejercicios mentales ("imagina que pones $27 en cada herramienta…"): el usuario lo leyó varias veces y no lo entendió.
- Formato claro: **costo por unidad** de nuestro sistema vs. **el promedio de las alternativas**, y la frase resultado ("con lo que te cuesta 1 afuera, haces ~35 con el sistema").
- Las alternativas van **agrupadas** ("Otras herramientas (promedio)") con el detalle de cada una **dentro del cuadro**, no como tarjetas sueltas.
- Cada número tiene que poder explicarse: de dónde sale y su fuente, en letra pequeña debajo. Si no sabemos de dónde sale un dato, no va.

## 4. La oferta
- **Lo que compran es el producto (el sistema), no el evento.** El taller o clase en vivo es la puerta de entrada donde se enseña a usarlo. No decir que el evento es un mecanismo de marketing.
- **Primero el producto principal**, destacado; después el evento en vivo, la clase bonus, lo demás y los bonos.
- **Valor tachado en cada componente** (`<s>Valor $X</s>`), también en los bonos. Los valores los propone Claude y el usuario los ajusta (Avatar Ads: sistema $497, taller $97, clase bonus $67, prompts $47, soporte $97, grabación $47).
- **Nunca listar lo que no se entrega:** ni "herramientas" de terceros que el cliente paga aparte, ni bonos que no existen, ni cursos o plataformas que todavía no están. No crear falsas expectativas.
- **Lo que vendrá va aparte**, en un cuadro "Próximamente" con la etiqueta "Futuro" y un estilo más tenue, explicando cómo lo recibirán (p. ej. "te lo enviamos a tu correo sin pagar nada más"). **Sin fecha en la página**; el estimado se da en el grupo.
- Nombres neutros: "Grupo privado de soporte" (no el nombre de la app).
- **Botón de compra con el nombre del producto + precio:** "Quiero el sistema · $27". No "Quiero mi cupo" / "Reservar cupo" (hace pensar que compran un lugar).
- Los textos de cada componente dicen el beneficio concreto ("Mi proceso para vender estos anuncios a negocios"), no frases genéricas ("para este servicio de alta demanda").

## 5. FAQ
- Una objeción real por pregunta, respuesta en 1–2 frases.
- Siempre: **"¿Qué estoy comprando exactamente?"** y **"¿Qué necesito para usarlo?"** (requisitos y costos de terceros, p. ej. Claude con Claude Code ~$20 al mes + Google Flow). Es mejor que lo sepan antes de comprar.
- Ninguna respuesta puede prometer algo que se eliminó de la oferta (revisar las FAQ cada vez que cambia la oferta).

## 6. Diseño y técnica
- Móvil primero (la mayoría entra desde Instagram y anuncios). Barra fija de compra solo en el celular y solo después del hero.
- Marca: colores y tipografías de `PROYECTO.md` (o los de la marca del producto nuevo).
- Pixel de Meta y parámetros de la visita copiados al link de pago (ver `tracking/LEEME.md`).
- Letra pequeña para fuentes y "resultados individuales".

## Checklist antes de publicar
- [ ] ¿Cambié solo lo que el usuario pidió?
- [ ] Inicio: solo logo centrado, título, subtítulo, video y un botón a la oferta. Sin precio, fechas ni etiquetas.
- [ ] Ninguna sección tiene etiqueta pequeña encima del título.
- [ ] Cada número se entiende en una lectura y tiene fuente.
- [ ] La oferta empieza por el producto, cada componente tiene valor tachado y no hay nada que no se entregue.
- [ ] Lo futuro está en "Próximamente", sin fecha.
- [ ] Las FAQ coinciden con la oferta actual y dicen qué se necesita para usar el producto.
- [ ] La página de gracias coincide con la oferta.
- [ ] Revisado a 375 px sin scroll horizontal.
