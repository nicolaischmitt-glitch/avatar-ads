# Voz v2 del sérum (voz en off + B-rolls)

Motivo (30 oct 2026): la v1 (Aoede) sonaba a chica mexicana "fresita" y a comercial (entonación y velocidad de anuncio). La v2 tiene que sonar a una chica que graba su voz con el celular: acento latino neutro, su tono y su entonación natural.

## Dónde
Google AI Studio → Playground → **Composer** → **Gemini 3.1 Flash TTS Preview** · temperatura 1 · un solo speaker.

## Voz (probar 2–3 y quedarse con la más natural)
Candidatas de tono tranquilo y cercano: **Callirrhoe** (easy-going) · **Achernar** (soft) · **Sulafat** (warm) · **Vindemiatrix** (gentle) · **Despina** (smooth).
Evitar las "bright / upbeat / breezy" (Aoede, Zephyr, Puck, Laomedeia): suenan más a locución.

## Scene
```
A 27-year-old woman sits in her bathroom in the morning and records a voice note on her phone, holding it close, in a quiet room. She is not reading a script: she is just telling a friend, in her own words, what happened with her skin. Plain, relaxed, everyday moment. No studio, no microphone, no production.
```

## Sample Context
```
Speak in neutral Latin American Spanish with no regional accent: not Mexican, not Argentine, not from Spain, no sing-song or posh intonation. Her normal everyday speaking voice, as if she were talking to one friend, not to an audience. Calm, unhurried, natural pace (a normal conversation speed, never fast), relaxed and slightly low energy, with the small pauses and soft breaths of real speech. Flat, natural intonation: no announcer melody, no emphasis on product words, no selling tone, no smiling-voice. It must never sound like a commercial, a voice-over or a TikTok ad. She sounds a little tired and honest at the beginning, genuinely pleased (but understated) when she talks about how her skin looks now, and the last two sentences are a casual, friendly suggestion, not a call to action.
```

## Texto (bloque del speaker, tal cual)
```
Dormía ocho horas y aun así mi cara decía que no había dormido nada. Probé cremas caras, mascarillas, de todo… y mi piel seguía apagada, como sin vida. Hasta que empecé a usar este sérum de vitamina C. Dos gotas cada mañana, nada más. Es súper ligero, se absorbe en segundos y no te deja la piel grasosa. Hoy me miro al espejo y me veo despierta, fresca, con brillo… y eso que no llevo maquillaje. Si tu piel también se ve cansada, pruébalo. Lo consigues en el botón de abajo.
```

## Variante con expresiones (para comparar con la de texto limpio)
Mismo Scene y Sample Context; en el bloque del speaker, este texto. Las etiquetas no se leen en voz alta, y las palabras son las mismas del guion (los subtítulos no cambian). Pocas etiquetas y suaves: con muchas suena actuado.
```
[tired, sighs softly] Dormía ocho horas y aun así mi cara decía que no había dormido nada. [slightly frustrated] Probé cremas caras, mascarillas, de todo… y mi piel seguía apagada, como sin vida. [pause] [warmer, a little relieved] Hasta que empecé a usar este sérum de vitamina C. Dos gotas cada mañana, nada más. [casual] Es súper ligero, se absorbe en segundos y no te deja la piel grasosa. [softly pleased] Hoy me miro al espejo y me veo despierta, fresca, con brillo… [small soft laugh] y eso que no llevo maquillaje. [friendly, casual] Si tu piel también se ve cansada, pruébalo. Lo consigues en el botón de abajo.
```
Guárdala como `voz/voz-v2-expresiones.wav`.

## Al terminar
Descarga el audio y guárdalo como `videos-landing/08-ejemplo-producto-serum/voz/voz-v2.wav`. Si dura mucho más de ~36 s (habla más lento que la v1, es lo esperado), no pasa nada: la edición se ajusta a la voz.
Si suena a locutora: baja la energía en el Sample Context ("even more casual, almost mumbling at times") o prueba otra voz. Si suena con acento: repite "neutral Latin American Spanish, no regional accent" al principio del Sample Context.
