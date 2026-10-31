# Avatar Ads 1.0

Curso/programa para crear contenido y anuncios hiperrealistas (UGC) con inteligencia artificial: reúne todo el contenido, los sistemas y las herramientas. Los talleres en vivo no son el producto: son un mecanismo de marketing para vender Avatar Ads (cada taller da acceso al programa).

## Estructura de carpetas
```
Avatar Ads 1.0/
├── CLAUDE.md · PROYECTO.md · BASE-CONOCIMIENTO.md · README.md · .gitignore
│                        (PROYECTO = este archivo · BASE-CONOCIMIENTO = marketing · .gitignore = qué NO va a GitHub)
├── marca/               ← logo original (logo-avatar-ads.png)
├── landing/             ← la página. ESTA carpeta completa es la que se publica (GitHub Pages, con publicar-landing.mjs)
│   ├── index.html
│   ├── gracias/         ← página de gracias post compra (Hotmart redirige aquí) + .ics de las clases
│   ├── videos/          ← videos y portadas que usa la página (versiones comprimidas para web)
│   ├── resultados/      ← pruebas reales: video del panel de ventas de Hotmart, chat del cliente de servicios sin nombre (caso-servicio.webp) y captura de Meta (CPL $0,35)
│   └── recursos/        ← lead magnets publicados (PDF/.txt) → https://taller.droilab.com/recursos/…
├── landing-versiones/   ← copias guardadas de la landing (NO se publican): sistema-curso/ = versión que vende el sistema (para cuando ya no haya taller en vivo). Ver LEEME.md
├── anuncios/            ← SOLO los anuncios de Avatar Ads (los que pautamos para vender). Una carpeta por anuncio: NN-slug/ (clips/ → edicion/ → final/)
│   ├── videos/          ← anuncios en video
│   │   ├── 01-avatar-ads/   ← el primer anuncio de Avatar Ads (antes portada de la landing)
│   │   │   ├── clips/       ← tomas originales: clip 1–4 + nuevo clip 5–7
│   │   │   ├── edicion/     ← proyecto HyperFrames (public/index.html, scripts/, música, SFX)
│   │   │   ├── edicion-v2/  ← reedición estilo reel 07 podcast (cortes.txt → unir-clips.mjs → build.mjs; sin "solo 10 puestos", sin música)
│   │   │   └── finales/     ← avatar-ads-anuncio-v2.mp4 (v2, 1080×1920, estilo podcast) · avatar-ads-anuncio-subtitulos.mp4 (v1) · avatar-ads-anuncio-limpio.mp4 (v1 sin texto; franja negra de 18 px arriba)
│   │   ├── 03-calidad-seedance-centavos/ ← PRIMER ANUNCIO PAGADO (Meta): talking head de una toma, avatar nuevo (Nano Banana) + B-rolls y gráficos
│   │   │                    avatar/ · prompts/ · clips/ · moodboard/ (storyboard) · edicion/ (build.mjs, igual que el reel 07) · finales/anuncio-03-calidad-seedance-centavos.mp4
│   │   ├── 04-yo-no-existo/ ← anuncio 2 tomas (carro → casa), mujer creada con Nano Banana, set de animaciones propio · finales/anuncio-04-yo-no-existo.mp4
│   │   ├── 05-testea-mas-voz-en-off/ ← solo guion
│   │   └── 12-taller-domingo-yo-no-existo/ ← anuncio pagado del taller semanal (29 oct 2026): «Yo no existo», avatar del VSL 09, formato D sin B-rolls,
│   │                        "este domingo" sin fecha ni precio (sirve cada semana) · final/anuncio-12-taller-domingo-yo-no-existo.mp4 (50 s, con la música bgm_004 del VSL; también -sin-musica.mp4)
│   └── imagenes/        ← anuncios estáticos (imagen), skill `estaticos-avatar-ads`: 10-estatico-puertas-precio/ · 11-estatico-camino-proceso/ (imagen.html → render.mjs → final/*.png)
│                        13-estatico-ninguna-existe/ (mosaico; aprobada la de 6: final/ninguna-existe-6.png) · 14-estatico-13-veces-mas-barato/ (se pauta la de ~$13 por 30 s:
│                        final/13-veces-mas-barato-30s.png; sin sufijo = ~$26 por 1 minuto) · 15-estatico-real-o-ia/ (encuesta)
│                        → evergreen del taller (29 oct 2026), fondo blanco con fotos; _frames/ = banco de frames de nuestros avatares (README.md con encuadres)
├── videos-landing/      ← videos hechos para la landing (ejemplos del carrusel y VSL del hero). Una carpeta por video: NN-slug/. Lo que se publica es la versión comprimida en landing/videos/
│   ├── 02-labial-auto/  ← avatar en el auto con labial: 5 clips → subtítulos blancos + zooms
│   │   ├── clips/       ← clip 1–5 originales (traen un botón "<" que la edición borra con delogo)
│   │   ├── edicion/     ← proyecto HyperFrames (mismo flujo que anuncios/videos/01-avatar-ads)
│   │   └── finales/nuevo-video-subtitulos.mp4
│   ├── 06-ejemplo-servicio-dental/ · 07-ejemplo-leads-clase-ingles/ · 08-ejemplo-producto-serum/
│   │                    ← ejemplos propios en español para el carrusel de la landing (negocios ficticios, formato D, ~20 s; el 08 —sérum ALBA— es un UGC de skincare con historia de ~35 s y 8 B-rolls, en dos versiones: voz en off + B-rolls (`edicion-voz-en-off/`, `final/anuncio-08-serum-voz-en-off.mp4`, formato E) y la chica a cámara + B-rolls (`edicion/`)): guion.md · avatar/ · prompts/ (voz) · prompts-broll/
│   └── 09-vsl-landing/  ← VSL para el hero de la landing (28 oct 2026): copy del usuario, evergreen, empresario en su oficina, formato D
│                        sin B-rolls por ahora (prompts de 9 B-rolls listos en prompts-flow.md) · storyboard/ · edicion/ · final/anuncio-09-vsl-landing.mp4 (84 s)
├── Contenido/           ← todo el contenido orgánico de Instagram
│   ├── reels/           ← reels (skill `reels-avatar-ads`), una carpeta por reel: NN-slug/
│   │   ├── 01 … 04      ← reels hechos (formato B: la voz original va en NN-slug/voz-original.mp4)
│   │   ├── 05-clon-ia-anda-saluda/ ← réplica de referencias/ref01 (guion + prompts; esperando clips)
│   │   ├── 08-proceso-serum-taller/ ← formato F: el proceso del anuncio del sérum (izquierda) + el anuncio mudo (derecha), voz en off de AI Studio, pausa en la que habla la chica; CTA "comenta TALLER"
│   │   ├── 07-podcast-seedance-centavos/ ← primer reel formato podcast (2 personajes; final/reel-07-podcast-seedance-centavos.mp4)
│   │   ├── _plantilla-edicion/     plantilla del formato avatar (talking head)
│   │   └── _plantilla-voz-en-off/  plantilla + reglas del formato voz en off + motion graphics (LEEME.md, scripts de voz, SFX, logos)
│   ├── carruseles/      ← carruseles (skill `carruseles-avatar-ads`): _plantilla/ (diseño + render a PNG) y una carpeta por carrusel
│   ├── Historias de ig/ ← secuencias de historias ya publicadas (guía e inspiración de copy), una carpeta por secuencia
│   └── imagenes y recursos (para usar)/ ← material propio para usar en el contenido
│       ├── fotos mias para usar/
│       └── screnshots de dinero y ventas/
├── sistema-avatar-ads/  ← EL PRODUCTO: kit del Sistema Avatar Ads que se entrega al alumno (se abre con Claude Code)
│                          CLAUDE.md · LEEME.md · INSTALACION.md · .claude/skills/ (inicio, anuncio, actualizar)
│                          sistema/ (prompts, formatos, scripts, checklists; VERSION + CAMBIOS.md) · negocio/ · anuncios/
├── emails/              ← secuencias de email para la lista de Brevo (una carpeta por secuencia: NN-slug/)
├── lead-magnets/        ← un lead magnet por palabra clave (índice en lead-magnets/README.md)
├── tracking/            ← tracking de Meta Ads: configuración actual (pixel + Hotmart nativo) y plan B con n8n (LEEME.md)
├── referencias/         ← videos de referencia de otros creadores y sus desgloses (ref01, ref02, ejemplos de voz en off) + ejemplos-ugc/ (airpods, MAKE UP, MODELO: no son nuestros)
├── skills/
│   ├── master prompt para json prompts videos.txt ← reglas LOCKED IN de los prompts JSON de Google Flow
│   ├── master prompt para json prompts imagenes.md ← estructura fija de prompts JSON para crear el frame del avatar desde cero (Nano Banana)
│   ├── reels-avatar-ads/        ← skill del sistema de reels (guion → prompts Flow → edición). Editar aquí.
│   │                               formatos/podcast/ = plantillas JSON por personaje + reglas del formato podcast
│   │                               formatos/head-talking/ = reglas + plantilla de edición del formato D (anuncio head talking de una toma + B-rolls)
│   ├── lead-magnets-avatar-ads/ ← skill del sistema de lead magnets (promesa del reel → PDF → DM → landing)
│   ├── carruseles-avatar-ads/   ← skill del sistema de carruseles (guion → diseño HTML → PNG → caption)
│   ├── estaticos-avatar-ads/    ← skill de anuncios estáticos (brief → formato + copy → plantilla HTML → PNG feed + historia → checklist)
│   ├── copy-avatar-ads/         ← skill copywriter (brief → ángulo → 2–3 opciones → checklist → banco-aprobado.md)
│   └── paginas-de-venta/        ← skill de landing pages y páginas de venta: reglas del usuario (inicio, secciones, oferta, valores, FAQ, proceso)
│                             (.claude/skills/<skill> son solo enlaces a estas carpetas; no borrarlos)
└── archivo/             ← material viejo, guardado por si acaso (solo en Google Drive; se puede borrar)
    ├── version-1/            primera edición, hecha con los clips equivocados (video 1–7)
    ├── clips-reemplazados/   clip 5–7 originales, sustituidos por "nuevo clip 5–7"
    ├── renders-viejos/       primera versión limpia
    └── publicar-duplicado/   copia antigua de la landing
```
Dónde va cada cosa nueva (organización del 29 oct 2026: cada tipo de video en su carpeta, nunca todos juntos): anuncio de Avatar Ads en video → `anuncios/videos/NN-slug/` · anuncio estático (imagen) → `anuncios/imagenes/NN-slug/` · video para la landing (ejemplos, VSL) → `videos-landing/NN-slug/` · reel o video de contenido para Instagram → `Contenido/reels/NN-slug/` · carrusel → `Contenido/carruseles/NN-slug/` · historias → `Contenido/Historias de ig/<secuencia>/` · fotos y capturas propias → `Contenido/imagenes y recursos (para usar)/` · lead magnet → `lead-magnets/NN-slug/` · video de referencia → `referencias/` · material del programa/talleres → `programa/` (taller de apertura: `programa/taller-01-apertura/`, con su `ROADMAP.md`).
Para volver a renderizar el anuncio: desde `anuncios/videos/01-avatar-ads/edicion/` → `hyperframes render public -o ../finales/<nombre>.mp4 --fps 24 --quality delivery --workers 1`.
La versión limpia sin franja se puede rehacer con `anuncios/videos/01-avatar-ads/edicion/versiones/index-v2-sin-texto.html` (ya corregida).

## Visión (27 oct 2026, idea en desarrollo, aún no pulida)
**Avatar Ads es un sistema para crear, testear y escalar anuncios con IA.** No es solo un curso ni solo un sistema para hacer videos hiperrealistas.
- **Ciclo:** crear (lo que ya hace el sistema 1.x: de la idea al anuncio editado) → testear (se publican varios y los datos dicen cuál gana) → escalar (del ganador, el sistema crea variaciones controladas) → se vuelven a testear → nuevos ganadores. Así se encuentran ganadores y se escala más rápido.
- **Variaciones de un ganador** (ejemplos del usuario): mismo anuncio con 3 hooks distintos · mismo guion con otro personaje · copy completamente nuevo · otro formato. Cada variación cambia una cosa y deja el resto igual.
- **Alrededor del sistema:** formación (talleres, curso), soporte (grupo, feedback de anuncios) y actualizaciones continuas. El alumno compra el sistema + todo lo necesario para sacarle provecho.
- **Horizonte:** a futuro, posiblemente un software (SaaS) donde ocurra todo el ciclo.
- Implicación para el kit: guardar cada anuncio por piezas intercambiables (hook, guion, avatar, B-rolls, edición) para poder variarlo; un próximo paso natural es un módulo de variaciones ("este es mi ganador, dame 3 versiones cambiando X").

## Misión actual
Objetivo del negocio: hacer crecer Avatar Ads 1.0 vendiéndolo con **talleres en vivo semanales de $27** (mecanismo de marketing; cada taller da acceso al programa). El primero es el sábado 31 de octubre de 2026 (proceso completo para crear anuncios UGC hiperrealistas); después, un taller cada semana.

1. **Sistema de creación de videos hiperrealistas**: el mejor sistema posible, lo más sistematizado posible, para contenido orgánico (reels) y anuncios: guion → prompts para Google Flow → generación → edición profesional. Se refina en paralelo a los talleres. Base actual: skill `skills/reels-avatar-ads/` + master prompt. Contenido orgánico complementario: carruseles (skill `carruseles-avatar-ads`), también con CTA a lead magnet.
2. **Contenido del programa Avatar Ads**: módulos, clases, sistemas, herramientas, materiales y recursos del programa, más el contenido del taller del 26 de oct y de los siguientes talleres semanales.

Terminado: landing de venta (`landing/`, publicada en https://taller.droilab.com/). Solo se toca para cambios puntuales.

## Branding
Logo: `marca/logo-avatar-ads.png`. Versión web: `landing/logo-avatar-ads.webp` (aplanado sobre negro, se integra con `mix-blend-mode: screen`).
Estética premium, cinematográfica, tecnológica y minimalista; todo oscuro, brillos verdes moderados, bordes finos.
- Fondo principal `#020604` · fondo secundario / tarjetas `#090F0B`
- Acento (CTA, iconos, indicadores) verde neón `#C5F740`, botones con texto oscuro
- Títulos `#F8F8F8` · texto secundario `#DDDAD7` · metadatos `#9F9587`
- Bordes y degradados verde bosque `#305E4A`
- Tonos cálidos (`#271C12`, `#4A3221`) solo si las fotos lo piden
- Tipografía: Archivo extendida (títulos) + Inter (texto) + JetBrains Mono (etiquetas)

## Datos clave de la oferta
- **Edición:** apertura de Avatar Ads 1.0 → por eso el taller es en vivo
- **Fechas (cambio del 28 oct 2026):** taller en vivo el **domingo 1 de noviembre de 2026 a las 10:00 a.m.** + clase bonus el **lunes 2 de noviembre a las 7:00 p.m.**, hora de Ecuador (UTC-5). Actualizado en la landing (hero, sección del taller, oferta, FAQ, cierre, barra del celular, cuenta regresiva), la página de gracias y el `.ics`. Si en otro lugar de este documento dice "sáb 31" / "dom 1 nov", manda esta línea. Antes: sábado 31 de octubre + bonus el domingo 1, ambas a las 10:00 a.m. (decidido el 27 oct 2026 (antes: lunes 26 + bonus martes 27 a las 7 p.m.; y antes aún, 2 días + bonus el miércoles 28).
- **Dinámica:** los alumnos observan; el usuario crea en vivo **1 anuncio** con el Sistema Avatar Ads, para un **producto** ficticio (decisión del 29 oct 2026, por eficiencia; antes eran 2: producto digital + servicio). Producto físico (30 oct 2026): **CUMBRE, café de especialidad** (marca ficticia; ángulo de identidad para high achievers; personaje hombre; el negocio ya está cargado en la copia del kit `programa/taller-01-apertura/sistema-cumbre/` y en vivo se abre un chat nuevo para crear el anuncio, sin la configuración inicial); en el copy se dice solo "un producto". Como el sérum 08, en **dos versiones del mismo guion**: A = avatar hablando + B-rolls y B = "un día en su vida": el mismo personaje en escenas de su día usando el café, con voz en off (como la referencia de los audífonos). Método "programa de cocina": los clips de Flow, la edición y el render se llevan hechos; en vivo se hace brief → guion → producto y avatar → prompts → 1 clip de voz + 1 B-roll de muestra → voz en off (AI Studio) → storyboard A y B → se muestran los dos finales. Duración ~2 h. Se da desde una laptop HP (Windows). Plan completo: `programa/taller-01-apertura/ROADMAP.md`. Después, cada alumno lo implementa solo con la grabación, los tutoriales, la guía de instalación y el grupo de WhatsApp.
- **Modalidad:** online, clases en vivo
- **Cupo:** sin límite y **sin mostrar puestos en la landing** (31 oct 2026, pedido del usuario: se eliminó toda la escasez de 15 puestos —línea del hero, gráfico de puestos de la sección del taller, dato y gráfico de la oferta, barra del celular— y el script `PUESTOS`). Solo queda la cuenta regresiva. Del 28 al 31 oct se mostraron 15 puestos (4 → 5 reservados).
- **Inversión:** $27, pago único (sin cupones ni descuentos)
- **Precio futuro:** incrementará en próximas ediciones (aún sin cifra). Quien entra en la apertura conserva acceso vitalicio + todas las futuras actualizaciones.
- **Ángulo diferencial:** "sistema económico" — anuncios de alta calidad sin depender de herramientas costosas (p. ej. Seedance).
- **Valores tachados = offer stack (aclaración del usuario, 29 oct 2026):** los "Valor $X" de cada componente son solo anclas para elevar la percepción de valor, no precios reales. El único precio real hoy es **$27 por todo** (taller, curso, sistema y soporte). No usarlos como precios en ningún análisis ni copy fuera del offer stack.

## Oferta de los próximos talleres (decisión del 29 oct 2026, en construcción)
Motivo: por $27 se entregaba todo (taller + sistema + curso + soporte) y el funnel terminaba en el checkout. Lo que ya compraron la apertura se respeta tal cual (todo de por vida). Esto aplica a los talleres siguientes, hasta fin de año.
- **Funnel hasta fin de año:** el taller en vivo es la puerta de entrada (primer paso). Al final del taller se ofrece el **Sistema Avatar Ads + curso + soporte** por **$97 o más** (cifra exacta por definir).
- **Precio del taller:** entre **$9 y $15** (aún sin fijar; no publicar una cifra).
- **Incluye el taller:** taller en vivo + **grabación ilimitada** (no por unos días) + archivo de **prompts básicos**. Nada más.
- **Sin segundo día (desde el próximo taller; el de apertura mantiene su clase bonus en vivo del lun 2 nov):** ya no hay clase bonus en vivo sobre cómo vender estos anuncios como servicio. Se reemplaza por una **clase pregrabada de ~30 min** con todo el proceso para vender estos anuncios a negocios, como **order bump o upsell en el checkout de Hotmart** (precio por definir).
- **Pendiente (no urgente):** duración de la oferta de $97 después del taller y el bono que solo tiene quien compra en esa ventana. Claude lo propone cuando se arme el próximo taller.
- **Desde enero 2027:** sin talleres en vivo; se vende curso + sistema como un solo paquete a **$97**, directo con anuncios a una página de ventas (base: `landing-versiones/sistema-curso/`).
- Reemplaza la idea anterior de "talleres semanales de $37".

## Público
1. Emprendedores y anunciantes que quieren producir creatividades para probar, optimizar y escalar campañas.
2. Freelancers / futuros proveedores que quieren vender anuncios con IA a negocios.

## Incluye
(Oferta única de la landing, en orden, con su valor tachado.) **Sistema Avatar Ads** + todas sus futuras actualizaciones, con guía de instalación (valor $497) · Taller en vivo (sáb 31): aprende a usar el sistema (valor $97) · Clase bonus dom 1 nov (valor $67) · Curso Avatar Ads (valor $197, desde el 28 oct 2026) · Prompts (valor $47).
Para usar el sistema el alumno necesita Claude con Claude Code (plan Pro, ~$20 al mes) y una cuenta de Google con Google Flow: está en la FAQ "¿Qué necesito para usar el sistema?".

## Bonos
1. **Clase bonus en vivo (dom 1 nov): cómo conseguir clientes** — "mi proceso para vender estos anuncios a negocios": qué oferta vender, captación orgánica y captación con anuncios (valor $67).
2. **Grupo privado de soporte** (en la landing sin la palabra WhatsApp; es el grupo de WhatsApp de alumnos): feedback de sus ads, ideas y actualización con los mejores sistemas que vayamos encontrando (la IA evoluciona cada semana) (valor $97).
3. **Grabación completa del taller** (valor $47).
(22 oct 2026: se eliminaron "Herramientas" —no entregamos herramientas: Claude Code y Google Flow los paga el alumno—, el bono **Cliente Cero** —no existe— y el **acceso vitalicio al curso Avatar Ads** como bono actual —aún no hay curso ni plataforma; pasó al cuadro "Futuro"—. Valores de cada componente puestos por Claude como ancla, el usuario puede cambiarlos; el del sistema lo subió el usuario a $497.)
**Curso Avatar Ads (incluido, desde el 28 oct 2026; antes iba en un cuadro "Próximamente"):** pedido del usuario: ya no se presenta como futuro sino como parte de lo que se obtiene. En la oferta va bajo "Lo que te llevas por participar" (valor $197, puesto por Claude como ancla; el usuario puede cambiarlo): "El curso completo para implementar el sistema paso a paso, a tu ritmo. Te lo enviamos a tu correo, sin pagar nada más." Se prepara después del taller y se envía por correo a todos los que compraron esta edición. Estimado interno: 3–4 semanas; en la landing no se pone fecha.
(Eliminados: UGC Realism Vault y Low-Cost Production System. Ya no se promete "3 anuncios listos" ni proyecto práctico de 3 anuncios.)

## Temario
- Taller (sáb 31) — Un día intenso: setup y alternativas económicas · ángulos y formatos · script · storyboard · personaje e imágenes · prompts de video · generación y corrección · edición automatizada · exportación → un anuncio completo en vivo para un producto.
- Clase bonus (dom 1 nov) — Cómo conseguir clientes para este servicio: qué oferta vender, captación orgánica y con anuncios.

## Sistema Avatar Ads (el producto que se enseña y se vende)
Nombre oficial: **Sistema Avatar Ads**. Vive en **Claude Code** (app de escritorio de Claude, pestaña Code): una carpeta con skills + la base de conocimiento del negocio del alumno, que Claude mantiene actualizada mientras el alumno conversa. Guía al alumno con preguntas de la idea al anuncio editado; la edición es automatizada con HyperFrames y el alumno la decide en el storyboard e itera conversando (vista previa en el navegador → render final).
- Ubicación: `sistema-avatar-ads/` (kit que se entrega al alumno; ver su `LEEME.md`). Se separa lo nuestro (`sistema/`, reemplazable con cada actualización) de lo del alumno (`negocio/`, `anuncios/`, nunca se tocan).
- Se actualiza de forma continua a medida que el usuario crea anuncios y encuentra formatos nuevos; el alumno recibe cada versión (acceso vitalicio).
- Prioridad Windows (~70–80 % de la audiencia, estimado) y también Mac.
- Nosotros también lo usamos para los anuncios nuevos (un solo sistema, probado de verdad).
- Versión actual: 1.5.2 (31 oct 2026: **prompt de corrección del producto** debajo de cada imagen con producto, para corregirlo en la edición de Flow sin que cambie la pose; probado con CUMBRE). La 1.5.1 (31 oct 2026: las plantillas de producto dicen "product" y no "bottle", para cualquier tipo de producto). La 1.5.0 (30 oct 2026: **looks del avatar**: la cara sale de `avatar.jpg` y no cambia; el pelo, la ropa y cómo se ve la piel cambian por escena, solo cuando la historia lo pide (antes y después, un día que avanza, otros lugares); nació del anuncio del taller, café CUMBRE). La 1.4.2 (30 oct 2026: **voz en off más natural**: plantillas de voz con acento latino neutro explícito, ritmo de conversación y sin tono de comercial). La 1.4.1 (29 oct 2026: **misma velocidad de habla en todos los clips**: el texto de cada clip se mide en sílabas por segundo (~3,2–4,3, máx. ~4,5) porque si le sobra texto el avatar acelera; generar-prompts.mjs avisa). La 1.4.0 (28 oct 2026: **audio limpio**: bloque `audio` en el master prompt de video ("solo la voz", sin ambiente ni ruido) + limpieza fija de la voz en la edición con `audio.mjs` (filtro de graves + reducción de ruido + puerta en las pausas) y música opcional con ducking; nació del VSL 09, donde los clips 01–10 traían un zumbido de aire acondicionado y el 11 no). La 1.3.0 (27 oct 2026) trajo el **formato voz en off + B-rolls**, probado en el anuncio 08: voz de Google AI Studio (Gemini 3.1 Flash TTS) + 6–10 B-rolls que cuentan la historia, sin música; `sistema/formatos/voz-en-off/`). La 1.2.0 (27 oct 2026) trajo el **producto físico LOCKED IN**, solo cuando el anuncio muestra un producto físico: Paso 0 = foto del producto, bloque `product` idéntico en todos los prompts de imagen y `producto.png` adjunta; sección 7 del master prompt de imágenes). La 1.1.0 (22 oct) trajo: formato head talking + paquete de prompts en 4 pasos (imagen del avatar → clips de voz → frames de los B-rolls → videos de los B-rolls, propuestos por Claude) en un solo `prompts-flow.md`. Todo B-roll empieza por una imagen (nunca de texto a video directo). Los master prompts del kit son copias de `skills/master prompt…`: si se cambia uno, actualizar el otro y anotar el cambio en `sistema/CAMBIOS.md` (subir `VERSION`).
- Entrega al alumno: un `.zip` de la carpeta `sistema-avatar-ads/` (sin `anuncios/` propios) en el área de alumno; las actualizaciones, igual (skill `avatar-ads-actualizar`). Dónde se aloja el zip: por definir.

## Publicación
Sitio en **GitHub Pages** (desde el 21 oct 2026; antes Netlify, que pausó las publicaciones al agotar los créditos del plan gratis): https://taller.droilab.com/
- Repositorio **público** aparte, solo con la landing: https://github.com/nicolaischmitt-glitch/avatar-ads-landing (el repo principal sigue privado). Nunca publicar ahí nada que no esté en `landing/`.
- Publicar, desde la raíz del proyecto: `node publicar-landing.mjs "qué cambió"` → copia `landing/` a `.deploy-landing/` (repo aparte, ignorado), añade `CNAME` y `.nojekyll`, y sube. Se actualiza en ~1 min; sin límite de publicaciones.
- DNS (Namecheap, `droilab.com` → Advanced DNS): registro CNAME `taller` → `nicolaischmitt-glitch.github.io.`
- GitHub CLI instalada (`C:\Program Files\GitHub CLI\gh.exe`) y con sesión de `nicolaischmitt-glitch`.
- **Tracking de Meta** (22 oct 2026): pixel `602723701857782` en la landing → `PageView`, `ViewContent` (cuando la oferta de $27 entra en pantalla) y evento propio `ClicCheckout` en los botones (no `InitiateCheckout`: ese lo envía Hotmart). Los botones copian los parámetros de la visita (`fbclid`, `utm_*`) al link de Hotmart para atribuir la compra. En Hotmart va el mismo pixel + API de conversiones (token generado en Events Manager; el token **nunca** va en la landing ni en el repo). La landing no tiene API de conversiones propia (GitHub Pages no tiene servidor). Decisión: lanzamiento con la API nativa de Hotmart; si no atribuye bien, plan B con n8n. Todo el detalle, las correcciones y el script en `tracking/LEEME.md`.
- **Post compra** (22 oct 2026): Hotmart redirige a la página de gracias `landing/gracias/` → https://taller.droilab.com/gracias/ (noindex, no se enlaza desde la landing; pixel solo `PageView` + evento propio `ClicGrupoWhatsApp`; **no** `Purchase`, lo envía Hotmart). Pasos: 1) unirse al grupo de WhatsApp de alumnos (obligatorio), 2) agendar las dos clases (Google Calendar o `.ics`; se puso 7–9 p.m. como duración estimada), 3) revisar el correo. Arquitectura decidida: **un solo grupo de WhatsApp para todos los talleres, que es también el grupo de soporte de alumnos** (https://chat.whatsapp.com/G8zIpseAtyJDtDqVjw5FEh), con entrada automática por link (sin aprobación manual; si el link se filtra, restablecerlo en WhatsApp y cambiarlo en la página). Redirección configurada en Hotmart (página externa, solo "Compras aprobadas"; las URL de pago en espera y análisis de crédito quedan vacías a propósito: Hotmart muestra su página de estado y a esos compradores se les envía el link del grupo a mano). El día de cada taller se fija en el grupo el mensaje con el link (recordatorios 24 h y 1 h antes) y el mismo link se envía por correo a los compradores como respaldo. Se descartaron Telegram y un grupo por taller (por simplicidad).
- Netlify (sitio `avatarads`, id `6a82e943-68a7-43f0-9346-abf24c07d754`) queda solo como respaldo; ya no se usa para publicar.

## Respaldo (GitHub + Google Drive)
- **GitHub (repositorio privado, https://github.com/nicolaischmitt-glitch/avatar-ads):** documentos, skills, guiones, prompts, lead magnets, proyectos de edición y la landing completa (con sus videos). Es la copia con historial: cada commit es un punto al que se puede volver. Qué se excluye: ver `.gitignore`.
- **Google Drive:** todo lo pesado que no va a GitHub: videos y audios (`*.mp4`, `*.wav`, `*.mp3`…) de `anuncios/`, `Contenido/reels/` y `referencias/`, y la carpeta `archivo/` completa.
- **Rutina:** al terminar algo importante, guardar en GitHub (`git add -A`, `git commit -m "qué cambió"`, `git push`) o pedírselo a Claude Code. Los videos nuevos, copiarlos a Drive.
- **En una computadora nueva:** clonar el repositorio, copiar los videos desde Drive a sus mismas carpetas y recrear los enlaces de los skills (en `cmd`, desde la raíz del proyecto):
  `mkdir .claude\skills` ·
  `mklink /J ".claude\skills\reels-avatar-ads" "skills\reels-avatar-ads"` ·
  `mklink /J ".claude\skills\lead-magnets-avatar-ads" "skills\lead-magnets-avatar-ads"` ·
  `mklink /J ".claude\skills\carruseles-avatar-ads" "skills\carruseles-avatar-ads"` ·
  `mklink /J ".claude\skills\estaticos-avatar-ads" "skills\estaticos-avatar-ads"` ·
  `mklink /J ".claude\skills\copy-avatar-ads" "skills\copy-avatar-ads"` ·
  `mklink /J ".claude\skills\paginas-de-venta" "skills\paginas-de-venta"`
  Landing: instalar GitHub CLI (`winget install GitHub.cli`), `gh auth login --web` y publicar con `node publicar-landing.mjs` (crea `.deploy-landing/` solo).

## Pendientes de la landing
- [x] Links de los botones CTA → checkout de Hotmart: https://pay.hotmart.com/G108061829I?checkoutMode=10 (los 4 botones).
- [x] Videos en la landing (`landing/videos/`): 01 = **VSL nuevo** (portada, en el hero, desde el 28 oct 2026: `vsl-avatar-ads.mp4` = `videos-landing/09-vsl-landing`, 84 s, 720×1280 a ~0,9 Mbps; antes `avatar-ads-anuncio.mp4`, que se deja en la carpeta porque lo usa `landing-versiones/sistema-curso/`), 02 = reel de podcast (`Contenido/reels/07-podcast-seedance-centavos`), 03 = avatar con labial (`videos-landing/02-labial-auto`), 04 = dentista (`videos-landing/06`), 05 = profesor de inglés (`videos-landing/07`), 06 = sérum ALBA con la chica a cámara y 07 = sérum ALBA voz en off + B-rolls (`videos-landing/08`; desde el 30 oct 2026 con la voz v2, acento latino neutro y sin música, 37,9 s; la v1 con la voz Aoede quedó en `final/anuncio-08-serum-voz-en-off-v1-aoede.mp4`). El 27 oct 2026 se quitaron airpods y suplemento (no eran anuncios nuestros; el de skincare se había quitado el 22 oct). Orden del carrusel (30 oct 2026, pedido del usuario): sérum a cámara (etiqueta "Versión A", "Producto · avatar hablando") → sérum voz en off ("Versión B", "Producto · voice over", al lado para mostrar dos versiones del mismo anuncio) → dentista → profesor de inglés → podcast → labial. Debajo de cada video, tarjeta de costo (28 oct 2026): "Con Avatar Ads" = créditos de Flow (Omni 1.1 720p — 4 s = 7, 6 s = 10, 8 s = 12, 10 s = 15 créditos) × ~$0,02 = precio con el plan de pago de Google (AI Pro ~$19,99 por 1.000 créditos, dato de terceros; por confirmar), y en letra pequeña "o $0 con el plan gratuito" (el usuario usa el plan gratuito de 50 créditos diarios con varias cuentas; decisión: nunca mostrar solo $0, porque no es el costo real para un alumno) (letra pequeña: "O $0 siguiendo una de las metodologías del sistema") vs. "Con otras herramientas" = segundos generados × ~$0,43/s (promedio de la sección de costos, ~$13 por 30 s), sin contar repeticiones: sérum a cámara 144 créditos ~$2,88 / ~$38 · dentista 56 ~$1,12 / ~$16 · inglés 52 ~$1,04 / ~$14 · sérum voz en off 80 ~$1,60 / ~$21 · podcast 96 ~$1,92 / ~$27 · labial 55 ~$1,10 / ~$15. La sección de ejemplos va justo después del hero. Se reproducen en silencio al entrar en pantalla y tienen botón "Activar sonido".
- [x] Promesa nueva (28 oct 2026): título "Crea anuncios con IA que venden. Hiperrealistas, en volumen y 13 veces más baratos." (antes "…por menos de un dólar cada uno"); la sección de costos pasó a "Calidad hiperrealista, 13 veces más barata": ~$1 por anuncio de 30 s (plan de pago de Google) vs ~$13 → ~13 anuncios con $13, + "O $0 siguiendo una de las metodologías del sistema". FAQ, cierre y sección de testeo ajustados. Mensaje del 22 oct 2026: título + subtítulo del sistema (ver posicionamiento en BASE-CONOCIMIENTO.md, sección 1).
- [x] **El taller en vivo es la oferta principal** (28 oct 2026, pedido del usuario: en esta primera versión se vende el taller; el sistema y el curso son lo que se obtiene por participar. En el futuro se venderá como sistema + curso: esa versión quedó guardada en `landing-versiones/sistema-curso/`). Cambios: debajo del botón del hero, "Taller en vivo · sábado 31 de octubre" y el botón "Ver el taller" (→ #taller); sección nueva antes de la oferta "Este sábado lo creamos en vivo." con línea de tiempo (sáb 31 taller → dom 1 clase bonus → después te quedas con todo) + cuenta regresiva; oferta "Por $27, esto es todo lo que obtienes." (antes "Entra al taller en vivo por $27.") con el taller primero, la clase bonus y el separador "Lo que te llevas por participar" (sistema + prompts), bonos y próximamente; botones "Quiero entrar al taller · $27"; barra del celular "Taller en vivo · sáb 31 oct · faltan X d" + "Ver el taller"; FAQ "¿Qué estoy comprando exactamente?" = tu lugar en el taller + el sistema por participar; cierre "Nos vemos el sábado, en vivo." con cuenta regresiva. Pendiente: qué pasa si alguien se lo pierde / después del 31 (el usuario no lo ha definido; no hay FAQ sobre eso).
- [x] **Inicio con fecha del taller** (30 oct 2026, pedido del usuario): franja negra muy pequeña arriba del logo "● Taller en vivo · domingo 10 a.m. (hora Ecuador)"; el logo ahora va dentro del hero (mismo fondo que la sección de abajo, ya no se ve como un bloque negro aparte); cuenta regresiva entre el video del hero y el botón, con "para el taller en vivo · quedan X de 15 puestos"; se quitó la línea de debajo del botón ("Taller en vivo · domingo 1 de noviembre").
- [x] **Gráfico de costo = carrera de costo** (30 oct 2026, opción A elegida por el usuario; reemplaza los dos cuadros con mosaicos, que nunca lo convencieron): "Costo de 1 anuncio de 30 segundos", dos barras que crecen a la misma velocidad con contador de dólares; la verde (Sistema Avatar Ads) se detiene en $1,00 y la gris (otras herramientas, promedio) sigue hasta $13,00; debajo "13× más barato: con $13 haces ~13 anuncios en vez de 1", "O $0 siguiendo una de las metodologías del sistema" y el desglose Wan/Seedance. Descartadas: recibos, celulares (13 vs 1) y balanza.
- [x] **WhatsApp directo con el creador** (28 oct 2026): link discreto bajo el botón de compra ("¿Tienes dudas antes de entrar? Escríbeme por WhatsApp") + bloque después de las FAQ con la foto del usuario (`landing/nicolai.webp`, recorte de `imagenes y recursos (para usar)/fotos mias para usar/20211031_095621.jpg`): "¿Te quedó alguna duda? Escríbeme." · "Sin bots ni asistentes: me escribes a mí, Nicolai, el creador de Avatar Ads, y te respondo personalmente." · botón con borde "Hablar con Nicolai por WhatsApp" → https://wa.me/593990763150 con mensaje prellenado. Pixel: evento propio `ClicWhatsApp`. Sin burbuja flotante (chocaría con la barra del celular y parece bot).
- [x] Barra fija del celular (27 oct 2026, reemplazada el 28 oct por la del taller): ya no vende ni muestra precio; dice "Avatar Ads · tu máquina de anuncios" y el botón "Conoce el sistema" baja a la oferta (#inscripcion). Los botones de compra solo están en la oferta y en el cierre.
- [x] Sin etiquetas pequeñas encima de los títulos de las secciones (22 oct 2026); "Qué aprenderás" pasó a ser un h2.
- [x] Estructura actual (22 oct 2026): hero (solo el logo centrado arriba, sin etiqueta "Apertura · Taller en vivo", sin barra superior ni precio; CTA "Ver todo lo que incluye" → #inscripcion; los demás botones van al checkout) → ejemplos (videos) → "un video que parece real no es un anuncio que vende" (comparación + máquina de anuncios en 5 pasos) → "¿Para qué sirven los anuncios hiperrealistas?" (casos de uso: vender productos digitales = video de ventas en Hotmart; vender servicios = chat del cliente sin nombre ni foto, caso-servicio.webp; generar leads = captura de Meta (581 leads a $0,35) con las cifras grandes arriba, movida desde la sección de testeo; 22 oct 2026 se quitaron los otros 2 mensajes, "desliza" y la letra pequeña) → "el sistema más económico" (costo por anuncio de 30 s: Avatar Ads ~$0,37 vs. promedio de otras herramientas ~$13 → con $13 haces ~35 con el sistema y 1 afuera; el promedio sale de Wan 2.5 ~$3, Seedance 2.0 API oficial ~$11, Seedance 2.5 ~$17 y Seedance 2.0 fal.ai ~$20. El ~$0,37 es el costo real del reel 07: 43 s por $0,53) → "testea más, encuentra más ganadores" (gráfico XY animado, ilustrativo: ads con IA 20–30/mes vs ads normales 4/mes → 1 ganador, + captura de Meta CPL $0,35) → para quién / qué aprenderás → oferta única (primero el Sistema Avatar Ads + todas sus futuras actualizaciones, después el taller sáb 31 "aprende a usar el sistema" → clase bonus dom 1 nov con temario desplegable, herramientas, prompts + bonos destacados + $27 + CTA "Quiero el sistema · $27") → FAQ (incluye "¿Qué estoy comprando exactamente?") → FAQ → cierre.
- [ ] Confirmar cifras de la comparativa: Wan 2.5 ~$0,10/s y Seedance 2.0 $0,11–$0,46/s son precios públicos de API (oct 2026); el usuario mencionó ~$1/s para Seedance en el reel 07. Precios verificados el 21 oct 2026 (tabla completa en `anuncios/videos/03-calidad-seedance-centavos/guion.md`): Seedance 2.0 en 1080p cuesta $0,682/s en fal.ai y $0,37/s en la API oficial de BytePlus ($0,41–$0,91/s con video de referencia); Seedance 2.5 en 1080p, $0,569/s (hasta $2,38/s con video de referencia).
