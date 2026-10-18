# Lead magnets · Avatar Ads 1.0

Cada reel termina con "Comenta PALABRA" → DM automático (ManyChat) → lead magnet → CTA a la landing.
Los lead magnets son **funnels**: entregan de verdad lo prometido en el reel y llevan al programa (link a la landing en el pie de cada página + página final de CTA).

Sistema: skill `lead-magnets-avatar-ads` (en `skills/lead-magnets-avatar-ads/`).

## Índice

| # | Palabra | Lead magnet | Reel | Formato | Link público | Estado |
|---|---|---|---|---|---|---|
| 01 | PROMPT | El prompt JSON para videos UGC que no parecen IA (guía + plantilla) | reels/01 | PDF 10 págs + .txt | https://taller.droilab.com/recursos/prompt-json-avatar-ads.pdf | Listo |

## Estructura
```
lead-magnets/
├── README.md                ← este índice
├── _plantilla/              ← diseño de marca compartido
│   ├── base.css             ← estilos (PDF vertical 1080×1920, legible en el celular)
│   ├── fonts/  logo.png
│   └── construir.mjs        ← lead-magnet.src.html → lead-magnet.html → PDF (Chrome)
└── NN-slug/                 ← un lead magnet por carpeta
    ├── config.json          ← slug, link a la landing con UTM, variables
    ├── preparar.mjs         ← (opcional) bloques generados, p. ej. el JSON desde el master prompt
    ├── lead-magnet.src.html ← contenido y diseño (fuente)
    ├── <slug>.pdf           ← el entregable
    ├── recursos extra (.txt, imágenes)
    └── dm-manychat.md       ← textos del DM automático
```

Construir: `node lead-magnets/_plantilla/construir.mjs lead-magnets/NN-slug`
Publicar: copiar el PDF y los extras a `landing/recursos/` y desplegar (`netlify.cmd deploy --prod --dir landing`).
