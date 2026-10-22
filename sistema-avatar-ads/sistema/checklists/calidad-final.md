# Calidad final (antes de entregar el anuncio)

Comprueba tú cada punto; al usuario solo le das el resultado.

## Técnico
- [ ] 1080×1920, 24 fps, H.264 + AAC: `ffprobe -v error -show_entries stream=width,height,r_frame_rate,codec_name final/anuncio-NN-slug.mp4`
- [ ] Audio ≈ −14 LUFS y pico ≤ −1,5 dB: `ffmpeg -i final/anuncio-NN-slug.mp4 -af ebur128=peak=true -f null -` (mira el resumen del final)
- [ ] Ningún silencio de más de 0,3 s: `ffmpeg -i final/anuncio-NN-slug.mp4 -af silencedetect=n=-35dB:d=0.3 -f null -` (solo se permite la cola del final)
- [ ] Sin cortes dobles: `ffmpeg -i final/anuncio-NN-slug.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null -` → dos cortes a 1 fotograma de distancia = un elemento que entra tarde; revisa esos fotogramas
- [ ] Hoja de frames del render (1 cada 2 s) revisada: nada cortado, nada tapando la cara

## Contenido
- [ ] Lo que dice el avatar coincide con el guion aprobado (transcribe el render)
- [ ] Subtítulos sin errores de escritura (marcas y cifras bien escritas)
- [ ] Hook visible en el primer segundo
- [ ] Nada importante en el 20 % inferior
- [ ] Toda cifra y prueba es real y está en `negocio.md` o la aportó el usuario
- [ ] Anuncio pagado: sin fechas ni precios que caduquen
- [ ] CTA dicho y visible (botón) al final

## Entrega
- [ ] Ruta del MP4 al usuario + texto para el anuncio (texto principal, título, descripción)
- [ ] Aprendizajes anotados en `negocio/aprendizajes.md`
