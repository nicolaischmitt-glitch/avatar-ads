# Revisión de clips (paso 6)

1. **Nombres**: los videos deben llamarse `clips/clip-01.mp4`, `clip-02.mp4`… (en el orden del guion). Si Flow les puso otro nombre, renómbralos tú y confirma el orden con el usuario si hay duda.
2. **Hoja de frames** (1 por segundo) de cada clip para revisar cara, manos y continuidad:
   `ffmpeg -v error -i clips/clip-01.mp4 -vf "fps=1,scale=270:-1,tile=8x1" -frames:v 1 -y edicion/revision/clip-01.jpg` → ábrela con Read.
3. **Texto**: `hyperframes transcribe clips/clip-01.mp4 -l es` y compáralo con el fragmento del guion. (En clips sueltos los tiempos salen ~0,4 s adelantados: sirven para el texto, no para cortar.)
4. **Voz**: `node sistema/scripts/medir-voz.mjs clips` → inicio, fin y huecos de cada clip.

## Qué se regenera (solo ese clip)
| Problema | Regenerar |
|---|---|
| Dice otra palabra, se salta o agrega palabras | Sí (si es una palabra al principio o al final, a veces se puede cortar en la edición) |
| Pronuncia mal una marca o un nombre | Sí; si se repite, escribe la palabra como se pronuncia en el plan y vuelve a generar el prompt |
| Manos deformes, dedos de más | Sí, si se ve claramente |
| La cara cambia respecto a la imagen | Sí |
| Aparece texto o subtítulos generados | Sí |
| Con producto físico: el producto o su etiqueta cambian respecto a `producto/producto.png` (otra forma, letras distintas, etiqueta en blanco) | Sí; si pasa en un frame de B-roll, regenera el frame antes de animarlo |
| Voz distinta entre clips (tono, acento) | Sí, el que desentona |
| Pausa larga o palabra estirada | No: se arregla en la edición (ritmo natural) |
| Se queda callado al final | No: se recorta |

Dile al usuario: "Los clips 01, 02 y 04 están perfectos. Regenera el 03 porque [motivo]." Una línea por clip malo.
