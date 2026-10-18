# Avatar Ads 1.0

Curso/programa para crear contenido y anuncios hiperrealistas (UGC) con inteligencia artificial: reúne todo el contenido, los sistemas y las herramientas. Los talleres en vivo no son el producto: son un mecanismo de marketing para vender Avatar Ads (cada taller da acceso al programa).

## Estructura de carpetas
```
Avatar Ads 1.0/
├── PROYECTO.md          ← este archivo
├── BASE-CONOCIMIENTO.md ← ángulos de venta, público, dolores, objeciones, mensajes clave, tono
├── CLAUDE.md            ← instrucciones para Claude Code; carga PROYECTO.md y BASE-CONOCIMIENTO.md
├── .gitignore           ← qué NO se sube a GitHub (videos/audios pesados → Google Drive)
├── 1-landing/           ← la página. ESTA carpeta completa es la que se sube a Netlify
│   ├── index.html
│   ├── videos/          ← videos y portadas que usa la página (versiones comprimidas para web)
│   └── recursos/        ← lead magnets publicados (PDF/.txt) → https://taller.droilab.com/recursos/…
├── 2-anuncio/           ← el anuncio de Avatar Ads
│   ├── clips/           ← tomas originales: clip 1–4 + nuevo clip 5–7
│   ├── edicion/         ← proyecto HyperFrames (public/index.html, scripts/, música, SFX)
│   └── finales/         ← videos terminados en calidad completa
│       ├── avatar-ads-anuncio-subtitulos.mp4   (versión final: subtítulos, música, SFX)
│       └── avatar-ads-anuncio-limpio.mp4       (sin texto; tiene una franja negra de 18 px arriba)
├── 3-ejemplos-ugc/      ← los 3 ejemplos UGC originales (airpods, MAKE UP, MODELO)
├── 4-nuevo-video/       ← segundo video (avatar en el auto con labial): 5 clips → subtítulos blancos + zooms
│   ├── clips/           ← clip 1–5 originales (traen un botón "<" que la edición borra con delogo)
│   ├── edicion/         ← proyecto HyperFrames (mismo flujo que 2-anuncio/edicion)
│   └── finales/nuevo-video-subtitulos.mp4
├── 5-reel-clon/         ← réplica de referencias/ref01 (guion + prompts; esperando clips)
├── reels/               ← reels de Instagram hechos con el skill `reels-avatar-ads` (una carpeta por reel)
├── carruseles/          ← carruseles de Instagram (skill `carruseles-avatar-ads`): _plantilla/ (diseño + render a PNG) y una carpeta por carrusel
├── lead-magnets/        ← un lead magnet por palabra clave de reel (índice en lead-magnets/README.md)
├── referencias/ + referencias de contenido/   ← videos de referencia y sus desgloses
├── skills e instrucciones/
│   ├── master prompt para json prompts videos.txt ← reglas LOCKED IN de los prompts JSON de Google Flow
│   ├── reels-avatar-ads/   ← skill del sistema de reels (guion → prompts Flow → edición). Editar aquí.
│   ├── lead-magnets-avatar-ads/ ← skill del sistema de lead magnets (promesa del reel → PDF → DM → landing)
│   └── carruseles-avatar-ads/   ← skill del sistema de carruseles (guion → diseño HTML → PNG → caption)
│                             (.claude/skills/<skill> son solo enlaces a estas carpetas; no borrarlos)
└── 99-archivo/          ← material viejo, guardado por si acaso (se puede borrar)
    ├── version-1/            primera edición, hecha con los clips equivocados (video 1–7)
    ├── clips-reemplazados/   clip 5–7 originales, sustituidos por "nuevo clip 5–7"
    ├── renders-viejos/       primera versión limpia
    └── publicar-duplicado/   copia antigua de la landing
```
Para volver a renderizar el anuncio: desde `2-anuncio/edicion/` → `hyperframes render public -o ../finales/<nombre>.mp4 --fps 24 --quality delivery --workers 1`.
La versión limpia sin franja se puede rehacer con `2-anuncio/edicion/versiones/index-v2-sin-texto.html` (ya corregida).

## Misión actual
Objetivo del negocio: hacer crecer Avatar Ads 1.0 vendiéndolo con **talleres en vivo semanales de $37** (mecanismo de marketing; cada taller da acceso al programa). El primero es el lunes 26 de octubre de 2026 (proceso completo para crear anuncios UGC hiperrealistas); después, un taller cada semana.

1. **Sistema de creación de videos hiperrealistas**: el mejor sistema posible, lo más sistematizado posible, para contenido orgánico (reels) y anuncios: guion → prompts para Google Flow → generación → edición profesional. Se refina en paralelo a los talleres. Base actual: skill `skills e instrucciones/reels-avatar-ads/` + master prompt. Contenido orgánico complementario: carruseles (skill `carruseles-avatar-ads`), también con CTA a lead magnet.
2. **Contenido del programa Avatar Ads**: módulos, clases, sistemas, herramientas, materiales y recursos del programa, más el contenido del taller del 26 de oct y de los siguientes talleres semanales.

Terminado: landing de venta (`1-landing/`, publicada en https://taller.droilab.com/). Solo se toca para cambios puntuales.

## Branding
Logo: `Logo AVATAR ADS 1.0.png` (raíz). Versión web: `1-landing/logo-avatar-ads.webp` (aplanado sobre negro, se integra con `mix-blend-mode: screen`).
Estética premium, cinematográfica, tecnológica y minimalista; todo oscuro, brillos verdes moderados, bordes finos.
- Fondo principal `#020604` · fondo secundario / tarjetas `#090F0B`
- Acento (CTA, iconos, indicadores) verde neón `#C5F740`, botones con texto oscuro
- Títulos `#F8F8F8` · texto secundario `#DDDAD7` · metadatos `#9F9587`
- Bordes y degradados verde bosque `#305E4A`
- Tonos cálidos (`#271C12`, `#4A3221`) solo si las fotos lo piden
- Tipografía: Archivo extendida (títulos) + Inter (texto) + JetBrains Mono (etiquetas)

## Datos clave de la oferta
- **Edición:** apertura de Avatar Ads 1.0 → por eso el taller es en vivo
- **Fechas:** lunes 26 al miércoles 28 de octubre de 2026 (3 días), clases en vivo a las 7:00 p.m. hora de Ecuador (UTC-5)
- **Modalidad:** online, clases en vivo
- **Cupo:** 15 personas
- **Inversión:** $37, pago único
- **Precio futuro:** incrementará en próximas ediciones (aún sin cifra). Quien entra en la apertura conserva acceso vitalicio + todas las futuras actualizaciones.
- **Ángulo diferencial:** "sistema económico" — anuncios de alta calidad sin depender de herramientas costosas (p. ej. Seedance).

## Público
1. Emprendedores y anunciantes que quieren producir creatividades para probar, optimizar y escalar campañas.
2. Freelancers / futuros proveedores que quieren vender anuncios con IA a negocios.

## Incluye
Clases en vivo · grabaciones · grupo privado de WhatsApp · prompts y workflows · proyecto práctico (3 anuncios) · acceso vitalicio + futuras actualizaciones.

## Bonos
1. **Cliente Cero** ($97): flujo para vender anuncios a $50 c/u, scripts de prospección y seguimiento, plantilla de oferta, guía de brief del cliente.
2. **UGC Realism Vault:** biblioteca de prompts para avatares hiperrealistas (gestos, expresión, voz, encuadre, naturalidad).
3. **Low-Cost Production System:** guía paso a paso del proceso low cost.

## Temario
- Día 1 (lun 26) — Estrategia y preproducción → guion terminado y escenas planificadas.
- Día 2 (mar 27) — Creación de imágenes → storyboard visual con frames finales.
- Día 3 (mié 28) — Animación, edición y anuncio final → primer anuncio terminado (antes eran los días 3 y 4).

## Publicación
Sitio en Netlify: https://taller.droilab.com/ — se sube la carpeta `1-landing/` completa (`index.html` + `videos/`, ~16 MB).
Nunca subir la carpeta raíz del proyecto: contiene clips y renders pesados que no deben publicarse.
Publicación automática con Netlify CLI (instalada y con sesión iniciada; proyecto vinculado al sitio `avatarads`, id `6a82e943-68a7-43f0-9346-abf24c07d754`, en `.netlify/`).
Desde la raíz del proyecto, en la terminal de Windows (usar `netlify.cmd`, porque los scripts `.ps1` están bloqueados):
`netlify.cmd deploy --prod --dir 1-landing`

## Respaldo (GitHub + Google Drive)
- **GitHub (repositorio privado):** documentos, skills, guiones, prompts, lead magnets, proyectos de edición y la landing completa (con sus videos). Es la copia con historial: cada commit es un punto al que se puede volver. Qué se excluye: ver `.gitignore`.
- **Google Drive:** todo lo pesado que no va a GitHub: videos y audios (`*.mp4`, `*.wav`, `*.mp3`…) de `2-anuncio/`, `3-ejemplos-ugc/`, `4-nuevo-video/`, `reels/`, y la carpeta `99-archivo/` completa.
- **Rutina:** al terminar algo importante, guardar en GitHub (`git add -A`, `git commit -m "qué cambió"`, `git push`) o pedírselo a Claude Code. Los videos nuevos, copiarlos a Drive.
- **En una computadora nueva:** clonar el repositorio, copiar los videos desde Drive a sus mismas carpetas y recrear los enlaces de los skills (en `cmd`, desde la raíz del proyecto):
  `mkdir .claude\skills` ·
  `mklink /J ".claude\skills\reels-avatar-ads" "skills e instrucciones\reels-avatar-ads"` ·
  `mklink /J ".claude\skills\lead-magnets-avatar-ads" "skills e instrucciones\lead-magnets-avatar-ads"` ·
  `mklink /J ".claude\skills\carruseles-avatar-ads" "skills e instrucciones\carruseles-avatar-ads"`
  Netlify: `netlify.cmd login` y `netlify.cmd link --id 6a82e943-68a7-43f0-9346-abf24c07d754`.

## Pendientes de la landing
- [x] Links de los botones CTA → checkout de Hotmart: https://pay.hotmart.com/G108061829I?checkoutMode=10 (los 4 botones).
- [x] Videos en la landing (`1-landing/videos/`): 01 = anuncio de Avatar Ads (portada), 02 = avatar con labial (`4-nuevo-video`), 03–05 = ejemplos de `3-ejemplos-ugc/` (airpods, skincare, suplemento). Se reproducen en silencio al entrar en pantalla y tienen botón "Activar sonido".
