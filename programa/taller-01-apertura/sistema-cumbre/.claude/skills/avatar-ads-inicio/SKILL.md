---
name: avatar-ads-inicio
description: Primer paso del Sistema Avatar Ads. Revisa que la computadora tenga todo instalado (Node.js, FFmpeg, HyperFrames y sus skills) y guía la instalación de lo que falte, y después entrevista al usuario sobre su negocio y su marca para crear su base de conocimiento en negocio/. Úsalo cuando el usuario empiece ("hola", "empezar", "instalar", "configurar mi negocio", "¿qué hago?"), cuando negocio/negocio.md esté vacío, o cuando quiera cambiar de negocio o de cliente.
---

# Inicio del Sistema Avatar Ads

Dos partes: **A. instalación** y **B. entrevista del negocio**. Si la instalación ya está bien, pasa directo a B. Si el negocio ya está configurado, pregunta si quiere revisarlo o crear un anuncio.

## A · Instalación

1. Ejecuta `node sistema/scripts/verificar-instalacion.mjs`.
   - Si `node` no existe, el usuario todavía no instaló Node.js: dile que siga el paso 2 de `INSTALACION.md` y vuelva.
2. Por cada ✗, explícale en una frase qué es y para qué sirve, y ofrécete a instalarlo tú con el comando que imprime el script (el usuario aprueba el comando). Uno a la vez.
   - Windows: después de instalar Node.js o FFmpeg con `winget`, la app de Claude tiene que cerrarse y volver a abrirse para que los reconozca. Avísale antes.
   - Mac sin Homebrew: el instalador pide la contraseña de la computadora en la terminal. Eso lo hace el usuario, no tú: dale el comando y explícale que la contraseña no se ve mientras la escribe.
3. Repite la verificación hasta que todo dé ✓ (la memoria baja es solo un aviso).
4. Cierra con `hyperframes doctor` y explica solo las líneas importantes (✗ de Chrome o FFmpeg). Docker, whisper, Kokoro y MusicGen son opcionales: ignóralos.
5. Recuérdale qué cuentas necesita fuera de la computadora: una cuenta de Google con acceso a **Google Flow** (video) y a **Nano Banana** (imágenes; está en Flow, en la app de Gemini o en Google AI Studio). No inventes precios: si pregunta, dile que revise los planes vigentes en la página de Google.

## B · Entrevista del negocio

Objetivo: llenar `negocio/negocio.md` y `negocio/marca.md` con información real, en una conversación corta (~10 minutos).

1. Pregunta primero: **"¿Los anuncios son para tu propio negocio o para un cliente?"** Si es para clientes, cada cliente tendrá su propio `negocio/` (ver "Varios negocios" abajo).
2. Pide que te cuente su negocio con sus palabras, o que pegue el link de su página de venta / Instagram / un documento. Si da un link o un texto, **extrae tú toda la información** y solo pregunta lo que falte.
3. Completa, con preguntas de a una o dos:
   - Qué vende, tipo (producto digital · servicio · producto físico), precio, link de compra.
   - Cliente ideal, qué quiere lograr, sus dolores y sus objeciones.
   - Pruebas reales que puede mostrar (resultados, testimonios, capturas).
   - Dónde publicará los anuncios y con qué objetivo.
   - Marca: colores, tipografías, logo (pídele que lo deje en `negocio/logo.png`), tono, tuteo o usted.
   - **Acento del público** (va a los prompts de video) y si el avatar será hombre o mujer.
4. Con eso, **propón 3–5 ángulos de venta** (ver `sistema/guion/guion-anuncios.md`, sección "Ángulos por tipo de producto") y deja que elija o ajuste. Guárdalos en `negocio.md`.
5. Escribe los archivos y muéstrale un resumen de una pantalla. Pregunta si algo está mal.
6. Cierra: "Listo. Ya puedes crear tu primer anuncio: dime de qué producto y lo hacemos juntos."

Si el usuario no tiene marca definida, propón una paleta sobria (fondo oscuro, un color de acento, texto blanco) y tipografías gratuitas de Google Fonts, y pide su aprobación.

## Varios negocios (freelancers con clientes)
- Por defecto hay un solo negocio en `negocio/`.
- Si el usuario trabaja para varios clientes: crea `clientes/<nombre-del-cliente>/negocio.md`, `marca.md` y `aprendizajes.md`, y sus anuncios en `clientes/<nombre>/anuncios/`. Al empezar cada anuncio, pregunta para qué cliente es.
