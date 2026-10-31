# Instalación del Sistema Avatar Ads

Tiempo: 20–30 minutos, una sola vez. Al final, Claude revisa que todo quedó bien.

## Qué necesitas
- Una computadora con **Windows 10/11** o **Mac** (recomendado 8 GB de RAM o más; con menos, el render tarda mucho).
- Una cuenta de **Claude** con un plan pago que incluya Claude Code (revisa los planes vigentes en https://claude.com/pricing).
- Una cuenta de **Google** con acceso a **Google Flow** (video) y **Nano Banana** (imágenes).

---

## Windows

**1. Claude.** Descarga la app de escritorio desde https://claude.ai/download, instálala e inicia sesión.

**2. Abre el "Símbolo del sistema".** Tecla Windows → escribe `cmd` → Enter. (Usa este y no PowerShell: PowerShell a veces bloquea los comandos de instalación.)

**3. Copia y pega estos comandos, uno por uno** (Enter después de cada uno y espera a que termine):
```
winget install OpenJS.NodeJS.LTS
```
```
winget install Git.Git
```
```
winget install Gyan.FFmpeg
```
Si pregunta si aceptas los términos, escribe `Y` y Enter.

**4. Cierra el Símbolo del sistema y ábrelo de nuevo** (para que reconozca lo que instalaste). Luego:
```
npm install -g hyperframes
```
```
hyperframes skills
```

**5. Abre el sistema en Claude.** Descomprime la carpeta `sistema-avatar-ads` donde quieras guardarla (por ejemplo en Documentos). En la app de Claude, ve a la pestaña **Code**, elige **esa carpeta** y escribe:
> Hola, quiero empezar.

Claude revisa la instalación, te ayuda con lo que falte y te hace unas preguntas sobre tu negocio.

---

## Mac

**1. Claude.** Descarga la app de escritorio desde https://claude.ai/download, instálala e inicia sesión.

**2. Abre la Terminal.** Cmd + Espacio → escribe `Terminal` → Enter.

**3. Instala Homebrew** (el instalador de programas de Mac). Pega esto y Enter:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Te pedirá la contraseña de tu Mac: escríbela (no se ve mientras escribes, es normal) y Enter. Al terminar, si muestra "Next steps" con dos comandos, cópialos y ejecútalos también.

**4. Instala las herramientas**, uno por uno:
```
brew install node ffmpeg
```
```
npm install -g hyperframes
```
```
hyperframes skills
```

**5. Abre el sistema en Claude.** Descomprime la carpeta `sistema-avatar-ads` (por ejemplo en Documentos). En la app de Claude, pestaña **Code**, elige **esa carpeta** y escribe:
> Hola, quiero empezar.

---

## Si algo falla
- **"no se reconoce como un comando" / "command not found"**: cierra la ventana (y la app de Claude) y ábrela de nuevo. Si sigue, repite el paso de instalación de esa herramienta.
- **npm da error de permisos en Mac**: ejecuta `sudo npm install -g hyperframes` (pide tu contraseña).
- **Cualquier otra cosa**: abre Claude en la carpeta del sistema y escribe "algo falló en la instalación" pegando el mensaje de error. Si no se resuelve, escribe en el grupo de WhatsApp con una captura.
