---
name: avatar-ads-actualizar
description: Actualiza el Sistema Avatar Ads a una versión nueva sin tocar el negocio ni los anuncios del usuario. Úsalo cuando el usuario diga "actualiza mi sistema", "hay una versión nueva", "descargué la actualización", o pregunte qué versión tiene.
---

# Actualizar el Sistema Avatar Ads

La versión instalada está en `sistema/VERSION` y los cambios de cada versión en `sistema/CAMBIOS.md`.

## Qué se reemplaza y qué no
| Se reemplaza (es del sistema) | Nunca se toca (es del usuario) |
|---|---|
| `sistema/` · `.claude/skills/avatar-ads-*` · `CLAUDE.md` · `LEEME.md` · `INSTALACION.md` | `negocio/` · `anuncios/` · `clientes/` · cualquier otro archivo que haya creado el usuario |

## Pasos
1. Dile al usuario que descargue el `.zip` de la versión nueva desde su área de alumno y te diga dónde quedó (normalmente en Descargas). No busques ni descargues archivos de internet por tu cuenta.
2. Descomprímelo en una carpeta temporal (no encima de esta carpeta):
   - Windows: `powershell -NoProfile -Command "Expand-Archive -Path '<zip>' -DestinationPath '<temporal>' -Force"`
   - Mac: `unzip -q '<zip>' -d '<temporal>'`
3. Comprueba que adentro está la carpeta del sistema (con `sistema/VERSION`) y compara las versiones. Si la nueva no es mayor, avisa y para.
4. **Respaldo**: copia `sistema/`, `.claude/skills/avatar-ads-*`, `CLAUDE.md`, `LEEME.md` e `INSTALACION.md` actuales a `respaldo-sistema/<versión-actual>/`.
5. Reemplaza solo las rutas de la columna izquierda con las de la versión nueva. No copies `negocio/` ni `anuncios/` del zip, aunque vengan.
6. Si en `sistema/` había archivos que el usuario modificó a propósito (p. ej. ajustó una plantilla), están en el respaldo: avísale y pregunta si quiere conservar sus cambios.
7. Ejecuta `node sistema/scripts/verificar-instalacion.mjs` (una versión nueva puede pedir algo más).
8. Resume en 3–5 líneas qué trae la versión nueva (de `sistema/CAMBIOS.md`) y borra la carpeta temporal.
9. Dile que cierre y vuelva a abrir la sesión de Claude para que los skills nuevos se carguen.
