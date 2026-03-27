# PadPulse

PadPulse is a browser based controller tester for PS5, Xbox and generic gamepads. It helps you inspect drift, deadzone behavior, triggers, buttons, axis history, browser polling and approximate controller model detection from the Gamepad API.

Created by **Christopher David Alberto Roque - White Assassins** with **AEWhiteDevs**.

## Espanol

### Que es

PadPulse es una web estatica para probar mandos desde el navegador. Esta pensada para revisar drift, zona muerta, sticks, botones, gatillos, historial de ejes y una estimacion de respuesta basada en la Gamepad API.

### Funciones principales

- Deteccion de familia y modelo aproximado del mando.
- Extraccion de `vendorId` y `productId` cuando el navegador los expone en `gamepad.id`.
- Interfaz bilingue en espanol e ingles.
- Modo adaptativo `Auto / Full / Consola` con deteccion del entorno de acceso.
- Navegacion por pestañas para evitar una pagina excesivamente larga.
- Visualizacion en vivo de drift y zona muerta en ambos sticks.
- Historial de ejes en tiempo real.
- Vista de botones y gatillos.
- Test guiado paso a paso para validar un mando completo.
- Analisis avanzado de gatillos con curva, umbral, resolucion y suavidad.
- Base local de compatibilidad por navegador y sistema.
- Historial persistente de sesiones en `localStorage`.
- Instalacion como PWA y soporte offline basico.
- Compartir resultados mediante Web Share API o portapapeles.
- Prueba de vibracion cuando la Gamepad API lo permite.
- Calibracion del centro y reinicio rapido de metricas.
- Branding, favicon, manifest y metadata social listos para despliegue.
- Workflow de despliegue automatico a GitHub Pages.

### Inicio rapido

1. Clona el repositorio.
2. Entra en la carpeta del proyecto.
3. Ejecuta:

```bash
node server.js
```

4. Abre `http://localhost:4173`.

Tambien puedes usar:

```bash
npm start
```

Si PowerShell bloquea `npm.ps1`, usa `node server.js` directamente.

### Despliegue en GitHub Pages

1. Sube el repositorio a GitHub.
2. Ve a `Settings > Pages`.
3. En `Source`, selecciona `GitHub Actions`.
4. Haz push a `main` o `master`.
5. El workflow `.github/workflows/deploy-pages.yml` publicara la web automaticamente.

### Notas importantes

- La latencia real del hardware no se puede medir con precision desde una web. PadPulse muestra una estimacion basada en `timestamp`, `requestAnimationFrame` y cambios visibles en la entrada.
- La deteccion exacta del modelo depende de lo que exponga cada navegador y cada sistema operativo.
- El modo `Auto` intenta detectar escritorio, movil o navegador de consola para adaptar la presentacion, pero la experiencia completa sigue disponible si el usuario fuerza `Full`.
- La aplicacion funciona mejor en navegadores Chromium modernos.
- No se suben datos del mando a ningun servidor desde la propia web.

## English

### What it is

PadPulse is a static browser app for testing controllers directly from the web. It lets you inspect drift, deadzone behavior, buttons, triggers, axis history and an estimated response signal built on top of the Gamepad API.

### Main features

- Approximate controller family and model detection.
- `vendorId` and `productId` extraction when the browser exposes them through `gamepad.id`.
- Spanish and English interface.
- Adaptive `Auto / Full / Console` view mode with environment detection.
- Live stick drift and deadzone visualization.
- Realtime axis history.
- Buttons and triggers monitoring.
- Guided end to end controller test flow.
- Advanced trigger analysis with curve, threshold, resolution and smoothness.
- Local compatibility database per browser and platform.
- Persistent local session history via `localStorage`.
- PWA install support with basic offline caching.
- Tabbed navigation to avoid an overly long single-page layout.
- Result sharing through Web Share API or clipboard.
- Rumble test when the Gamepad API exposes vibration support.
- Center calibration and fast metric reset.
- Branding, favicon, manifest and social metadata ready for publishing.
- Automatic GitHub Pages deployment workflow.

### Quick start

1. Clone the repository.
2. Move into the project folder.
3. Run:

```bash
node server.js
```

4. Open `http://localhost:4173`.

You can also run:

```bash
npm start
```

If PowerShell blocks `npm.ps1`, run `node server.js` directly.

### GitHub Pages deployment

1. Push the repository to GitHub.
2. Go to `Settings > Pages`.
3. Choose `GitHub Actions` as the source.
4. Push to `main` or `master`.
5. The `.github/workflows/deploy-pages.yml` workflow will publish the site automatically.

### Important notes

- True hardware latency cannot be measured accurately from the browser. PadPulse shows an estimate based on `timestamp`, `requestAnimationFrame` and visible input changes.
- Exact model detection depends on what each browser and operating system expose.
- `Auto` mode tries to detect desktop, mobile or console-like browsers to adapt the presentation, but the full experience remains available if the user switches to `Full`.
- The app works best on modern Chromium based browsers.
- The site itself does not upload controller data anywhere.

## Project structure

```text
.
|-- .github/
|-- favicon.svg
|-- index.html
|-- script.js
|-- site.webmanifest
|-- social-card.svg
|-- styles.css
|-- server.js
|-- package.json
|-- CONTRIBUTING.md
|-- CODE_OF_CONDUCT.md
|-- SECURITY.md
|-- LICENSE
`-- README.md
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening major pull requests.

## Code of Conduct

This project follows the rules described in [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Security

Please read [SECURITY.md](./SECURITY.md) before reporting vulnerabilities.

## License

This project is released under the **MIT License**. See [LICENSE](./LICENSE).

## Credits

- Creator: **Christopher David Alberto Roque - White Assassins**
- Development group: **AEWhiteDevs**
