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
│   ├── resultados/      ← pruebas reales: video del panel de ventas de Hotmart, 3 mensajes de clientes y captura de Meta (CPL $0,35)
│   └── recursos/        ← lead magnets publicados (PDF/.txt) → https://taller.droilab.com/recursos/…
├── anuncios/            ← anuncios terminados (una carpeta por anuncio: clips/ → edicion/ → finales/)
│   ├── 01-avatar-ads/   ← el anuncio de Avatar Ads (portada de la landing)
│   │   ├── clips/       ← tomas originales: clip 1–4 + nuevo clip 5–7
│   │   ├── edicion/     ← proyecto HyperFrames (public/index.html, scripts/, música, SFX)
│   │   ├── edicion-v2/  ← reedición estilo reel 07 podcast (cortes.txt → unir-clips.mjs → build.mjs; sin "solo 10 puestos", sin música)
│   │   └── finales/     ← avatar-ads-anuncio-v2.mp4 (v2, 1080×1920, estilo podcast) · avatar-ads-anuncio-subtitulos.mp4 (v1) · avatar-ads-anuncio-limpio.mp4 (v1 sin texto; franja negra de 18 px arriba)
│   ├── 02-labial-auto/  ← avatar en el auto con labial: 5 clips → subtítulos blancos + zooms
│   │   ├── clips/       ← clip 1–5 originales (traen un botón "<" que la edición borra con delogo)
│   │   ├── edicion/     ← proyecto HyperFrames (mismo flujo que 01-avatar-ads)
│   │   └── finales/nuevo-video-subtitulos.mp4
│   ├── 03-calidad-seedance-centavos/ ← PRIMER ANUNCIO PAGADO (Meta): talking head de una toma, avatar nuevo (Nano Banana) + B-rolls y gráficos
│   │                    avatar/ · prompts/ · clips/ · moodboard/ (storyboard) · edicion/ (build.mjs, igual que el reel 07) · finales/anuncio-03-calidad-seedance-centavos.mp4
│   ├── 04-yo-no-existo/ ← anuncio 2 tomas (carro → casa), mujer creada con Nano Banana, set de animaciones propio · finales/anuncio-04-yo-no-existo.mp4
│   └── ejemplos-ugc/    ← los 3 ejemplos UGC originales (airpods, MAKE UP, MODELO)
├── Contenido/           ← todo el contenido orgánico de Instagram
│   ├── reels/           ← reels (skill `reels-avatar-ads`), una carpeta por reel: NN-slug/
│   │   ├── 01 … 04      ← reels hechos (formato B: la voz original va en NN-slug/voz-original.mp4)
│   │   ├── 05-clon-ia-anda-saluda/ ← réplica de referencias/ref01 (guion + prompts; esperando clips)
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
├── lead-magnets/        ← un lead magnet por palabra clave (índice en lead-magnets/README.md)
├── tracking/            ← tracking de Meta Ads: configuración actual (pixel + Hotmart nativo) y plan B con n8n (LEEME.md)
├── referencias/         ← videos de referencia de otros creadores y sus desgloses (ref01, ref02, ejemplos de voz en off)
├── skills/
│   ├── master prompt para json prompts videos.txt ← reglas LOCKED IN de los prompts JSON de Google Flow
│   ├── master prompt para json prompts imagenes.md ← estructura fija de prompts JSON para crear el frame del avatar desde cero (Nano Banana)
│   ├── reels-avatar-ads/        ← skill del sistema de reels (guion → prompts Flow → edición). Editar aquí.
│   │                               formatos/podcast/ = plantillas JSON por personaje + reglas del formato podcast
│   │                               formatos/head-talking/ = reglas + plantilla de edición del formato D (anuncio head talking de una toma + B-rolls)
│   ├── lead-magnets-avatar-ads/ ← skill del sistema de lead magnets (promesa del reel → PDF → DM → landing)
│   └── carruseles-avatar-ads/   ← skill del sistema de carruseles (guion → diseño HTML → PNG → caption)
│                             (.claude/skills/<skill> son solo enlaces a estas carpetas; no borrarlos)
└── archivo/             ← material viejo, guardado por si acaso (solo en Google Drive; se puede borrar)
    ├── version-1/            primera edición, hecha con los clips equivocados (video 1–7)
    ├── clips-reemplazados/   clip 5–7 originales, sustituidos por "nuevo clip 5–7"
    ├── renders-viejos/       primera versión limpia
    └── publicar-duplicado/   copia antigua de la landing
```
Dónde va cada cosa nueva: anuncio → `anuncios/NN-slug/` · reel → `Contenido/reels/NN-slug/` · carrusel → `Contenido/carruseles/NN-slug/` · historias → `Contenido/Historias de ig/<secuencia>/` · fotos y capturas propias → `Contenido/imagenes y recursos (para usar)/` · lead magnet → `lead-magnets/NN-slug/` · video de referencia → `referencias/` · material del programa/talleres → `programa/` (crear cuando empiece).
Para volver a renderizar el anuncio: desde `anuncios/01-avatar-ads/edicion/` → `hyperframes render public -o ../finales/<nombre>.mp4 --fps 24 --quality delivery --workers 1`.
La versión limpia sin franja se puede rehacer con `anuncios/01-avatar-ads/edicion/versiones/index-v2-sin-texto.html` (ya corregida).

## Misión actual
Objetivo del negocio: hacer crecer Avatar Ads 1.0 vendiéndolo con **talleres en vivo semanales de $37** (mecanismo de marketing; cada taller da acceso al programa). El primero es el lunes 26 de octubre de 2026 (proceso completo para crear anuncios UGC hiperrealistas); después, un taller cada semana.

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
- **Fechas:** lunes 26 de octubre de 2026 (1 día intenso de taller) + clase bonus el martes 27; ambas en vivo a las 7:00 p.m. hora de Ecuador (UTC-5). Decidido el 21 oct 2026 (antes eran 2 días + bonus el miércoles 28; solo 2 compradores, el usuario les avisa).
- **Dinámica:** los alumnos observan; el usuario crea en vivo **2 anuncios** con el Sistema Avatar Ads, de productos ficticios: uno para un **producto digital** y otro para un **servicio** (formatos por definir). Método "programa de cocina": los clips de Flow se generan antes; en vivo se hace brief → guion → storyboard → prompts → un clip de muestra → edición. Después, cada alumno lo implementa solo con la grabación, los tutoriales, la guía de instalación y el grupo de WhatsApp. El taller probablemente se da desde una Mac (por confirmar).
- **Modalidad:** online, clases en vivo
- **Cupo:** sin límite (se eliminó el límite de 15 el 20 oct 2026)
- **Inversión:** $27, pago único (sin cupones ni descuentos)
- **Precio futuro:** incrementará en próximas ediciones (aún sin cifra). Quien entra en la apertura conserva acceso vitalicio + todas las futuras actualizaciones.
- **Ángulo diferencial:** "sistema económico" — anuncios de alta calidad sin depender de herramientas costosas (p. ej. Seedance).

## Público
1. Emprendedores y anunciantes que quieren producir creatividades para probar, optimizar y escalar campañas.
2. Freelancers / futuros proveedores que quieren vender anuncios con IA a negocios.

## Incluye
(Oferta única de la landing, en orden: taller → clase bonus.) Taller en vivo (lun 26) · **Sistema Avatar Ads** con guía de instalación · herramientas · prompts.

## Bonos
1. **Clase bonus en vivo (mar 27): cómo conseguir clientes** para este servicio de alta demanda: qué oferta vender, captación orgánica y captación con anuncios.
2. **Grupo privado de WhatsApp:** feedback de sus ads, ideas y actualización con los mejores sistemas que vayamos encontrando (la IA evoluciona cada semana).
3. **Grabación completa del taller.**
4. **Acceso vitalicio al curso Avatar Ads** (con todas las futuras actualizaciones).
5. **Cliente Cero** ($97): flujo para vender anuncios a $50 c/u, scripts de prospección y seguimiento, plantilla de oferta, guía de brief del cliente.
(Eliminados: UGC Realism Vault y Low-Cost Production System. Ya no se promete "3 anuncios listos" ni proyecto práctico de 3 anuncios.)

## Temario
- Taller (lun 26) — Un día intenso: setup y alternativas económicas · ángulos y formatos · script · storyboard · personaje e imágenes · prompts de video · generación y corrección · edición automatizada · exportación → dos anuncios completos en vivo (producto digital + servicio).
- Clase bonus (mar 27) — Cómo conseguir clientes para este servicio: qué oferta vender, captación orgánica y con anuncios.

## Sistema Avatar Ads (el producto que se enseña y se vende)
Nombre oficial: **Sistema Avatar Ads**. Vive en **Claude Code** (app de escritorio de Claude, pestaña Code): una carpeta con skills + la base de conocimiento del negocio del alumno, que Claude mantiene actualizada mientras el alumno conversa. Guía al alumno con preguntas de la idea al anuncio editado; la edición es automatizada con HyperFrames y el alumno la decide en el storyboard e itera conversando (vista previa en el navegador → render final).
- Ubicación: `sistema-avatar-ads/` (kit que se entrega al alumno; ver su `LEEME.md`). Se separa lo nuestro (`sistema/`, reemplazable con cada actualización) de lo del alumno (`negocio/`, `anuncios/`, nunca se tocan).
- Se actualiza de forma continua a medida que el usuario crea anuncios y encuentra formatos nuevos; el alumno recibe cada versión (acceso vitalicio).
- Prioridad Windows (~70–80 % de la audiencia, estimado) y también Mac.
- Nosotros también lo usamos para los anuncios nuevos (un solo sistema, probado de verdad).
- Versión actual: 1.0.0 (21 oct 2026): formato head talking. Los master prompts del kit son copias de `skills/master prompt…`: si se cambia uno, actualizar el otro y anotar el cambio en `sistema/CAMBIOS.md` (subir `VERSION`).
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
  `mklink /J ".claude\skills\carruseles-avatar-ads" "skills\carruseles-avatar-ads"`
  Landing: instalar GitHub CLI (`winget install GitHub.cli`), `gh auth login --web` y publicar con `node publicar-landing.mjs` (crea `.deploy-landing/` solo).

## Pendientes de la landing
- [x] Links de los botones CTA → checkout de Hotmart: https://pay.hotmart.com/G108061829I?checkoutMode=10 (los 4 botones).
- [x] Videos en la landing (`landing/videos/`): 01 = anuncio de Avatar Ads (portada, en el hero), 02 = reel de podcast (`Contenido/reels/07-podcast-seedance-centavos`), 03 = avatar con labial (`anuncios/02-labial-auto`), 04–06 = ejemplos de `anuncios/ejemplos-ugc/` (airpods, skincare, suplemento). La sección de ejemplos va justo después del hero. Se reproducen en silencio al entrar en pantalla y tienen botón "Activar sonido".
- [x] Estructura actual (20 oct 2026): hero → ejemplos (videos) → resultados reales (video de ventas en Hotmart + 3 mensajes de clientes, con visor) → "el sistema más económico" (mosaico animado: cuántos anuncios de 30 s salen con $27 en Avatar Ads ~70, Wan 2.5 ~9, Seedance 2.0 2–9) → "testea más, encuentra más ganadores" (gráfico XY animado, ilustrativo: ads con IA 20–30/mes vs ads normales 4/mes → 1 ganador, + captura de Meta CPL $0,35) → para quién / qué aprenderás → oferta única (taller lun 26 → clase bonus mar 27 con temario desplegable, Sistema Avatar Ads, herramientas, prompts + bonos destacados + $27 + CTA) → FAQ → cierre.
- [ ] Confirmar cifras de la comparativa: Wan 2.5 ~$0,10/s y Seedance 2.0 $0,11–$0,46/s son precios públicos de API (oct 2026); el usuario mencionó ~$1/s para Seedance en el reel 07. Precios verificados el 21 oct 2026 (tabla completa en `anuncios/03-calidad-seedance-centavos/guion.md`): Seedance 2.0 en 1080p cuesta $0,682/s en fal.ai y $0,37/s en la API oficial de BytePlus ($0,41–$0,91/s con video de referencia); Seedance 2.5 en 1080p, $0,569/s (hasta $2,38/s con video de referencia).
