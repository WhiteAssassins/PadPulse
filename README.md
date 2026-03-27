# PadPulse

PadPulse is a browser based controller tester for PS5, Xbox and generic gamepads. It focuses on stick drift checks, trigger response, button state inspection, browser polling estimates and quick model identification when the Gamepad API exposes enough hardware data.

## Espanol

### Que es

PadPulse es una web estatica para probar mandos desde el navegador. Sirve para revisar drift, zona muerta, botones, gatillos, traza de ejes y una estimacion de respuesta basada en la Gamepad API.

### Funciones

- Deteccion de familia y modelo aproximado del mando.
- Lectura de `vendorId` y `productId` cuando el navegador los expone en `gamepad.id`.
- Interfaz bilingue en espanol e ingles.
- Visualizacion en vivo de sticks, zona muerta y drift.
- Historial de ejes en canvas.
- Vista de botones y gatillos.
- Calibracion del centro y reinicio rapido de metricas.
- Servidor local minimo incluido para abrir la app en `localhost`.

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

### Notas

- La latencia real del hardware no se puede medir con precision desde una web. PadPulse muestra una estimacion basada en `timestamp`, `requestAnimationFrame` y cambios visibles en la entrada.
- La deteccion exacta del modelo depende de lo que exponga cada navegador y cada sistema operativo.
- La app funciona mejor en navegadores Chromium modernos.

## English

### What it is

PadPulse is a static browser app for testing controllers directly from the web. It helps you inspect drift, deadzone behavior, buttons, triggers, axis history and an estimated response signal built on top of the Gamepad API.

### Features

- Approximate controller family and model detection.
- `vendorId` and `productId` extraction when the browser exposes them through `gamepad.id`.
- Spanish and English interface.
- Live stick, deadzone and drift visualization.
- Axis history canvas.
- Buttons and triggers monitoring.
- Center calibration and fast metric reset.
- Tiny local server included for `localhost` usage.

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

### Notes

- True hardware latency cannot be measured accurately from the browser. PadPulse shows an estimate based on `timestamp`, `requestAnimationFrame` and visible input changes.
- Exact model detection depends on what each browser and operating system expose.
- The app works best on modern Chromium based browsers.

## Project structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- server.js
|-- package.json
|-- README.md
`-- LICENSE
```

## Publish on GitHub

- Push the repository as a public GitHub project.
- Enable GitHub Pages if you want a hosted version.
- Keep `LICENSE` and `README.md` in the root so GitHub renders them automatically.
- If you deploy to Pages, use a static host or the provided files directly.

## License

MIT
