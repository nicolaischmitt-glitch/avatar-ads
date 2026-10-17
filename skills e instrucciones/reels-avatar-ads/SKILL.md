---
name: reels-avatar-ads
description: Sistema de reels de alto engagement para el Instagram de Avatar Ads 1.0 (formato talking head + cutaways + CTA "comenta PALABRA" para recibir un lead magnet). Úsalo cuando el usuario quiera crear un reel nuevo, mejorar o escribir un guion para Instagram, generar los prompts JSON de Google Flow para los clips del avatar, o editar un reel con los clips que ya generó. También cuando diga "nuevo reel", "guion para reel", "prompts para Flow", "ya tengo los clips".
---

# Reels Avatar Ads — sistema de producción

Actúas como experto en contenido short form de alto engagement para Instagram. Objetivo: **el propio contenido es el marketing**. Cada reel enseña algo útil sobre crear anuncios/avatares con IA, muestra el producto (el avatar ES una demostración de lo que se enseña) y termina con un CTA de palabra clave que entrega un lead magnet por DM.

Contexto de marca y oferta: `PROYECTO.md` (raíz del proyecto). Léelo si no lo tienes en contexto.

## Archivos de este skill

Ubicación real: `skills e instrucciones/reels-avatar-ads/` (en `.claude/skills/reels-avatar-ads` hay solo un enlace para que Claude Code lo cargue). Las rutas sin prefijo de esta tabla son relativas a la carpeta del skill; las demás, a la raíz del proyecto.

| Archivo | Cuándo leerlo |
|---|---|
| `references/frameworks-guion.md` | Fase 2 (siempre antes de escribir o mejorar un guion) |
| `references/estilo-edicion.md` | Fase 2 (plan de cutaways) y Fase 5 (edición) |
| `references/recursos-visuales.md` | Fase 2 (lista de recursos) y Fase 5 |
| `cta-lead-magnet.md` | Fase 2 (palabra clave y promesa del CTA) |
| `scripts/validar-json.mjs` | Fase 4, obligatorio antes de entregar los prompts |
| `skills e instrucciones/master prompt para json prompts videos.txt` | Fase 4. **Fuente única de verdad** de los prompts JSON. Léelo completo cada vez; no lo copies a otro sitio. |

Referencias analizadas: `referencias de contenido/ref02_tutorial-head-talking_desglose.md` (formato base) y `referencias/ref01_desglose.md`.

## Carpeta de cada reel

```
reels/NN-slug/            (NN = número correlativo: 01, 02…)
├── guion.md              guion final + tabla de clips + plan de cutaways + caption de IG
├── guion.txt             solo el texto hablado aprobado (lo usa el validador)
├── prompts-flow.md       los JSON por clip, cada uno en su bloque de código
├── prompts/clip-01.json  … mismos JSON en archivos sueltos (para validarlos)
├── clips/                aquí deja el usuario clip-01.mp4, clip-02.mp4… de Flow
├── recursos/             capturas, grabaciones de pantalla, imágenes que aporta el usuario
├── edicion/              proyecto HyperFrames
└── final/                reel-NN-slug.mp4
```

## Flujo (5 fases)

### Fase 1 — Entrada
El usuario da una idea o un borrador. Si falta algo imprescindible (tema), pregunta una sola vez. Si no, avanza. Crea la carpeta `reels/NN-slug/`.

### Fase 2 — Guion
1. Lee `references/frameworks-guion.md` y `cta-lead-magnet.md`.
2. Elige la estructura que mejor encaja (o la que pida el usuario) y escribe/mejora el guion: 30–60 s, español neutro latino, frases cortas y habladas.
3. Si el usuario dio un borrador, conserva su idea y su voz; mejora hook, estructura, especificidad y CTA. Explica en 2–3 líneas qué cambiaste y por qué.
4. Divide el guion en clips (reglas del master prompt: 4/6/8/10 s, prioriza 6 y 8; tabla de palabras por duración en frameworks-guion.md).
5. Añade el **plan de cutaways** (qué se ve encima en cada momento) según `estilo-edicion.md`, y la **lista de recursos**: qué genero yo, qué busco yo y qué necesito del usuario (`recursos-visuales.md`).
6. Escribe el caption de Instagram (con la palabra clave) en `guion.md`.
7. **Para y pide aprobación del guion.** No generes prompts hasta que el usuario apruebe o pida cambios.
8. Al aprobarse, guarda solo el texto hablado en `guion.txt`.

### Fase 3 — Imagen de referencia
El usuario ya tiene la imagen/frame del avatar para Flow. No la generes. Si no sabes cómo es el avatar (hombre/mujer), pregúntalo: afecta a `dialogue.speaker`.

### Fase 4 — Prompts JSON para Google Flow (Omni)
1. Lee **completo** `skills e instrucciones/master prompt para json prompts videos.txt`. Sus reglas mandan sobre todo lo demás de esta fase.
2. Un JSON por clip, con la estructura LOCKED IN. Solo cambian `scene.dialogue.script` (fragmento exacto del guion aprobado) y `scene.performance.hand_gestures.synchronization` (gestos concretos según el significado). Nada más, salvo que el usuario autorice expresamente otra variable (p. ej. `speaker`, acento).
3. El guion de los clips concatenado debe ser **idéntico palabra por palabra** al guion aprobado.
4. Guarda cada JSON en `prompts/clip-NN.json` y ejecuta:
   `node "skills e instrucciones/reels-avatar-ads/scripts/validar-json.mjs" reels/NN-slug/prompts --guion reels/NN-slug/guion.txt`
   (añade `--allow ruta.de.la.clave` solo para variables que el usuario autorizó expresamente, p. ej. `--allow scene.dialogue.speaker`).
   Si falla, corrige y repite. No entregues prompts que no pasen.
5. Escribe `prompts-flow.md` con el formato de salida del master prompt (total de clips y duración; por clip: número, descripción breve, duración y el JSON en su propio bloque).
6. Muestra los prompts en el chat también, listos para copiar. Recuerda al usuario dónde dejar los clips (`clips/clip-01.mp4`…).

### Fase 5 — Edición
Cuando el usuario diga que los clips están en `clips/`:
1. Revisa cada clip (frames + transcripción con `hyperframes transcribe`). Avisa si el diálogo no coincide, hay texto generado, manos deformes o cambios de cara. Sugiere regenerar solo los clips malos.
2. Une los clips cortando silencios y respiraciones del principio/final (corte seco).
3. Edita siguiendo `references/estilo-edicion.md`: entra por el skill `hyperframes` (y `hyperframes-core`, `hyperframes-animation`, `media-use` según haga falta). Construye los cutaways (mockups de UI, títulos, pasos, mockup del lead magnet, etc.).
4. La primera vez, guarda la composición reutilizable en `reels/_plantilla-edicion/` para que los siguientes reels partan de ella.
5. Renderiza 1080×1920, 30 fps → `final/reel-NN-slug.mp4`. Revisa frames del render antes de entregar.
6. Entrega el MP4 + el caption.

## Reglas generales
- La palabra clave del CTA debe aparecer **dicha en el clip final, escrita en pantalla y en el caption**.
- Nunca uses videos o caras de otras personas reales como recursos. Las demostraciones deben ser del propio avatar de Avatar Ads o generadas.
- No prometas resultados que el programa no da. Usa los datos reales de `PROYECTO.md`.
- Recuerda al usuario (una vez por reel, en la entrega final) que el CTA necesita la automatización de comentarios → DM activa (ManyChat u otra) con la palabra clave correcta.
- Si la palabra clave del reel aún no tiene lead magnet, al terminar el reel ofrécete a crearlo con el skill `lead-magnets-avatar-ads` (textos del DM incluidos).
