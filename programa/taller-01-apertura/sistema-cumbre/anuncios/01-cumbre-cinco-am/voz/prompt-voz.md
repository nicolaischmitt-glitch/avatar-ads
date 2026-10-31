# Voz en off · versión B (Google AI Studio)

La voz se genera primero: marca el tiempo de toda la versión B.

## Dónde
Google AI Studio → Playground → **Composer** → **Gemini 3.1 Flash TTS Preview** · temperatura 1 · un solo speaker.

## Voz (prueba 2–3 y quédate con la más natural)
Voces masculinas de tono tranquilo y cercano: **Umbriel** (easy-going) · **Achird** (friendly) · **Zubenelgenubi** (casual) · **Algieba** (smooth).
Evita las "upbeat / excitable" (Puck, Fenrir): suenan a locutor.

## Scene
```
A 34-year-old man stands in his kitchen at dawn, after his morning training, and records a voice note on his phone, holding it close, in a quiet room. He is not reading a script: he is just telling a friend who also gets up early, in his own words, why he cares about his first coffee of the day. Plain, relaxed, everyday moment. No studio, no microphone, no production.
```

## Sample Context
```
Speak in neutral Latin American Spanish with no regional accent: not Mexican, not Argentine, not from Spain, no sing-song or posh intonation. His normal everyday speaking voice, as if talking to one friend, not to an audience. Calm, unhurried, natural pace (a normal conversation speed, never fast), relaxed and grounded, with the small pauses and soft breaths of real speech. Flat, natural intonation: no announcer melody, no emphasis on product words, no selling tone, no smiling-voice. It must never sound like a commercial, a voice-over or a TikTok ad. He sounds direct and sure of himself at the beginning, a little dry and honest when he describes the bitter instant coffee, quietly satisfied (but understated) when he talks about his ritual, and the last two sentences are a casual, friendly suggestion, not a call to action.
```

## Texto (bloque del speaker, tal cual)
```
Si te levantas a las cinco para ganarle al día, no lo empieces con un café cualquiera. Entrenas, cuidas lo que comes, te exiges en todo… y tu primer café es uno instantáneo, amargo, que ni disfrutas. CUMBRE es café de especialidad de altura. Tostado medio: intenso, pero sin amargura. Y ya viene molido: lo preparas igual que siempre, en tu cafetera o en tu prensa francesa. Es tu ritual antes de que empiece todo. Y merece estar a la altura de tu día. Gánale al día desde la primera taza. Toca el botón de abajo y pide tu CUMBRE.
```

## Al terminar
Descarga el audio y guárdalo como `anuncios/01-cumbre-cinco-am/voz/voz.wav`. Debería durar unos 36–40 s; si dura un poco más, la edición se ajusta a la voz.
- Si suena a locutor: baja la energía en el Sample Context ("even more casual, almost mumbling at times") o prueba otra voz.
- Si sale con acento: repite "neutral Latin American Spanish, no regional accent" al principio del Sample Context.
- Si lee "CUMBRE" raro (deletreado o en inglés), escríbelo "Cumbre" en el texto.
