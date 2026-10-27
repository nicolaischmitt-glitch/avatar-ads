# Formato · Voz en off + B-rolls (en preparación)

> **Estado: idea guardada (27 oct 2026), aún no probada.** Todavía no hay anuncio hecho con este formato ni plantilla de edición. Cuando hagamos el primero, este archivo se completa con el proceso real y el formato pasa a "Disponible".

Anuncio sin avatar hablando a cámara: **solo una voz narrando + B-rolls** (y gráficos/pruebas encima). Es uno de los formatos que se enseñan en Avatar Ads y parece de los más fáciles de ejecutar: no hay que cuidar la sincronía de labios, la continuidad de una toma ni la consistencia del personaje.

## La voz: Google AI Studio (text-to-speech)
- Descubrimiento del usuario: los generadores **text-to-speech de Google AI Studio** dan voces en off de calidad profesional y **gratis**.
- **Pendiente de comprobar:** límites de uso gratis (cuántas generaciones o minutos por día), qué voces suenan mejor en español latino, cómo controlar ritmo, tono y emoción, y si hay restricciones de uso comercial.
- La voz es la pieza central: va primero, se mide su duración y los B-rolls se planifican sobre ella.

## Para qué tipo de anuncios sirve (propuesta inicial)
- **Producto físico / ecommerce:** el producto en macro, en uso, antes/después, unboxing. Aquí el producto es el protagonista, no una persona.
- **Problema → solución / historia:** escenas de la situación de dolor del cliente y luego el resultado ("¿Te pasa que…?").
- **Explicativos y listas:** "3 razones…", "cómo funciona…", con gráficos y textos animados sobre los B-rolls.
- **Servicios y negocios locales:** recorrido del lugar, el equipo trabajando, el resultado entregado (clínica, restaurante, inmobiliaria, gimnasio).
- **Infoproductos con prueba:** voz sobre capturas, pantallas, resultados y gráficos.
- **Variaciones de un ganador:** misma voz/guion con otros B-rolls, u otro hook narrado sobre los mismos B-rolls. Muy barato de variar (encaja con el ciclo crear → testear → escalar).
- **Nichos donde una cara "de IA" no conviene** o donde el cliente no quiere un portavoz.

Menos indicado cuando lo que vende es la confianza en una persona (testimonio, experto, marca personal): ahí va mejor head talking.

## Referencias internas
- (Nota interna, quitar al publicar el formato) Formato orgánico parecido ya hecho en el proyecto de Avatar Ads, fuera de este kit: `Contenido/reels/_plantilla-voz-en-off/` y el reel 02.
- B-rolls: mismas reglas que head talking (frame primero en la imagen, después video; nunca texto a video directo).

## Por definir cuando lo probemos
- Duración, ritmo de cortes y cuántos B-rolls por anuncio.
- Plantilla de edición (subtítulos, gráficos, música o solo SFX).
- Paso de la voz dentro de `prompts-flow.md` y del flujo del skill `avatar-ads-anuncio`.
