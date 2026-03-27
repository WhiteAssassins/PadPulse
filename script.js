const MAX_HISTORY = 180;
const BUTTON_COUNT = 18;
const DEFAULT_LANGUAGE = "es";
const LANGUAGE_STORAGE_KEY = "padpulse-language";

const MODEL_DATABASE = {
  "054c:05c4": { vendor: "Sony", family: "playstation", model: "DualShock 4" },
  "054c:09cc": { vendor: "Sony", family: "playstation", model: "DualShock 4 v2" },
  "054c:0ce6": { vendor: "Sony", family: "playstation", model: "DualSense" },
  "054c:0df2": { vendor: "Sony", family: "playstation", model: "DualSense Edge" },
  "045e:028e": { vendor: "Microsoft", family: "xbox", model: "Xbox 360 Controller" },
  "045e:02d1": { vendor: "Microsoft", family: "xbox", model: "Xbox One Controller" },
  "045e:02dd": { vendor: "Microsoft", family: "xbox", model: "Xbox One Controller" },
  "045e:02e0": { vendor: "Microsoft", family: "xbox", model: "Xbox One S Controller" },
  "045e:02ea": { vendor: "Microsoft", family: "xbox", model: "Xbox One S Controller" },
  "045e:02fd": { vendor: "Microsoft", family: "xbox", model: "Xbox One S Controller" },
  "045e:0b12": { vendor: "Microsoft", family: "xbox", model: "Xbox Series X|S Controller" },
  "045e:0b13": { vendor: "Microsoft", family: "xbox", model: "Xbox Series X|S Controller" },
};

const BUTTON_LABELS = {
  playstation: [
    "Cross",
    "Circle",
    "Square",
    "Triangle",
    "L1",
    "R1",
    "L2",
    "R2",
    "Create",
    "Options",
    "L3",
    "R3",
    "D-pad Up",
    "D-pad Down",
    "D-pad Left",
    "D-pad Right",
    "PS",
    "Touchpad",
  ],
  xbox: [
    "A",
    "B",
    "X",
    "Y",
    "LB",
    "RB",
    "LT",
    "RT",
    "View",
    "Menu",
    "LS",
    "RS",
    "D-pad Up",
    "D-pad Down",
    "D-pad Left",
    "D-pad Right",
    "Xbox",
    "Share",
  ],
};

const TRANSLATIONS = {
  es: {
    pageTitle: "PadPulse | Test de mandos PS5 y Xbox",
    pageDescription:
      "Web de prueba para mandos PS5, Xbox y gamepads genericos con drift, respuesta, polling y diagnostico de sticks.",
    heroTitle: "Test en vivo para mandos PS5 y Xbox",
    heroText:
      "Conecta un mando por USB o Bluetooth y revisa sticks, botones, gatillos, drift, polling del navegador y una estimacion de retardo construida con la Gamepad API.",
    badgePrivate: "Solo local",
    badgeBrowser: "Basado en navegador",
    badgeSupport: "PS5, Xbox y mandos genericos",
    calibrateBtn: "Calibrar centro",
    resetBtn: "Reiniciar metricas",
    statusKicker: "Estado",
    statusTitle: "Conexion y captura",
    stateLabel: "Estado",
    familyLabel: "Familia",
    modelLabel: "Modelo",
    idsLabel: "Vendor / Product",
    mappingLabel: "Mapping",
    samplesLabel: "Muestras",
    activeControllerLabel: "Mando activo",
    deadzoneLabel: "Zona muerta",
    noteLabel: "Nota",
    latencyNote:
      "La latencia real del hardware no es accesible desde el navegador. Esta demo muestra una estimacion basada en timestamp, requestAnimationFrame y cambios de entrada visibles.",
    rawIdLabel: "ID bruto del gamepad",
    privacyLabel: "Privacidad",
    privacyText:
      "Todo se ejecuta localmente en tu navegador. No se sube ningun dato del mando a ningun servidor.",
    sticksKicker: "Sticks",
    sticksTitle: "Drift y precision",
    leftStickTitle: "Stick izquierdo",
    rightStickTitle: "Stick derecho",
    traceKicker: "Traza",
    traceTitle: "Historial en tiempo real",
    inputsKicker: "Entradas",
    inputsTitle: "Botones y gatillos",
    footerLineOne:
      "PadPulse es un proyecto web estatico pensado para probar mandos sin instalar software nativo.",
    footerLineTwo:
      "Funciona mejor en localhost y en navegadores Chromium modernos con soporte para Gamepad API.",
    noControllerConnected: "Sin mando conectado",
    notDetected: "No detectado",
    unknownModel: "Modelo desconocido",
    notExposed: "No expuesto",
    noMapping: "sin mapping",
    selectNoControllers: "Sin mandos",
    connectedStatus: "Conectado (#{{index}})",
    waitingSignal: "Esperando senal",
    connectToStart: "Conecta un mando para empezar",
    outsideDeadzone: "Entrada fuera de la zona muerta",
    insideDeadzone: "Reposo / dentro de zona muerta",
    genericFamily: "Gamepad generico",
    playStationFamily: "PlayStation",
    xboxFamily: "Xbox",
    unsupportedFamily: "Controlador desconocido",
    estimatedPolling: "Polling estimado",
    averageFrame: "Frame medio",
    jitter: "Jitter",
    estimatedLatency: "Retardo estimado",
    lastVisibleChange: "Ultimo cambio visible",
    timestamp: "Timestamp",
    unavailable: "No disponible",
    rawX: "X crudo",
    rawY: "Y crudo",
    magnitude: "Magnitud",
    peak: "Pico",
    idleAverage: "Promedio en reposo",
    filtered: "Filtrado",
    genericButton: "Boton {{index}}",
    noData: "-",
    noRawId: "-",
  },
  en: {
    pageTitle: "PadPulse | PS5 and Xbox controller tester",
    pageDescription:
      "Browser based tester for PS5, Xbox and generic gamepads with drift, response, polling and stick diagnostics.",
    heroTitle: "Live PS5 and Xbox controller tester",
    heroText:
      "Connect a controller over USB or Bluetooth and inspect sticks, buttons, triggers, drift, browser polling and a latency estimate built from the Gamepad API.",
    badgePrivate: "Local only",
    badgeBrowser: "Browser based",
    badgeSupport: "PS5, Xbox and generic pads",
    calibrateBtn: "Calibrate center",
    resetBtn: "Reset metrics",
    statusKicker: "Status",
    statusTitle: "Connection and capture",
    stateLabel: "State",
    familyLabel: "Family",
    modelLabel: "Model",
    idsLabel: "Vendor / Product",
    mappingLabel: "Mapping",
    samplesLabel: "Samples",
    activeControllerLabel: "Active controller",
    deadzoneLabel: "Deadzone",
    noteLabel: "Note",
    latencyNote:
      "Real hardware latency is not exposed to the browser. This demo shows an estimate based on timestamp, requestAnimationFrame cadence and visible input changes.",
    rawIdLabel: "Raw gamepad id",
    privacyLabel: "Privacy",
    privacyText:
      "Everything runs locally in your browser. No controller data is uploaded to any server.",
    sticksKicker: "Sticks",
    sticksTitle: "Drift and precision",
    leftStickTitle: "Left stick",
    rightStickTitle: "Right stick",
    traceKicker: "Trace",
    traceTitle: "Realtime history",
    inputsKicker: "Inputs",
    inputsTitle: "Buttons and triggers",
    footerLineOne:
      "PadPulse is a static browser project built to test controllers without installing native software.",
    footerLineTwo:
      "It works best on localhost and on modern Chromium based browsers with Gamepad API support.",
    noControllerConnected: "No controller connected",
    notDetected: "Not detected",
    unknownModel: "Unknown model",
    notExposed: "Not exposed",
    noMapping: "no mapping",
    selectNoControllers: "No controllers",
    connectedStatus: "Connected (#{{index}})",
    waitingSignal: "Waiting for signal",
    connectToStart: "Connect a controller to begin",
    outsideDeadzone: "Input outside the deadzone",
    insideDeadzone: "Idle / inside deadzone",
    genericFamily: "Generic gamepad",
    playStationFamily: "PlayStation",
    xboxFamily: "Xbox",
    unsupportedFamily: "Unknown controller",
    estimatedPolling: "Estimated polling",
    averageFrame: "Average frame",
    jitter: "Jitter",
    estimatedLatency: "Estimated latency",
    lastVisibleChange: "Last visible change",
    timestamp: "Timestamp",
    unavailable: "Unavailable",
    rawX: "Raw X",
    rawY: "Raw Y",
    magnitude: "Magnitude",
    peak: "Peak",
    idleAverage: "Idle average",
    filtered: "Filtered",
    genericButton: "Button {{index}}",
    noData: "-",
    noRawId: "-",
  },
};

const dom = {
  calibrateBtn: document.getElementById("calibrateBtn"),
  resetBtn: document.getElementById("resetBtn"),
  langEsBtn: document.getElementById("langEsBtn"),
  langEnBtn: document.getElementById("langEnBtn"),
  gamepadSelect: document.getElementById("gamepadSelect"),
  deadzoneRange: document.getElementById("deadzoneRange"),
  deadzoneValue: document.getElementById("deadzoneValue"),
  connectionState: document.getElementById("connectionState"),
  controllerType: document.getElementById("controllerType"),
  controllerModel: document.getElementById("controllerModel"),
  hardwareIds: document.getElementById("hardwareIds"),
  mappingState: document.getElementById("mappingState"),
  sampleCounter: document.getElementById("sampleCounter"),
  rawIdState: document.getElementById("rawIdState"),
  leftStickStatus: document.getElementById("leftStickStatus"),
  rightStickStatus: document.getElementById("rightStickStatus"),
  leftStickMetrics: document.getElementById("leftStickMetrics"),
  rightStickMetrics: document.getElementById("rightStickMetrics"),
  timingMetrics: document.getElementById("timingMetrics"),
  leftStickArena: document.getElementById("leftStickArena"),
  rightStickArena: document.getElementById("rightStickArena"),
  historyCanvas: document.getElementById("historyCanvas"),
  buttonsGrid: document.getElementById("buttonsGrid"),
  leftTriggerLabel: document.getElementById("leftTriggerLabel"),
  rightTriggerLabel: document.getElementById("rightTriggerLabel"),
  leftTriggerValue: document.getElementById("leftTriggerValue"),
  rightTriggerValue: document.getElementById("rightTriggerValue"),
  leftTriggerFill: document.getElementById("leftTriggerFill"),
  rightTriggerFill: document.getElementById("rightTriggerFill"),
  metricTemplate: document.getElementById("metricTemplate"),
  translatable: Array.from(document.querySelectorAll("[data-i18n]")),
  metaDescription: document.querySelector('meta[name="description"]'),
};

const state = {
  language: resolveInitialLanguage(),
  deadzone: Number(dom.deadzoneRange.value),
  selectedIndex: null,
  sampleCount: 0,
  baseline: {
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  },
  stats: createEmptyStats(),
  history: {
    leftX: [],
    leftY: [],
    rightX: [],
    rightY: [],
  },
  timing: {
    lastFrameTime: performance.now(),
    frameDeltaHistory: [],
    estimatedLatencyHistory: [],
    lastSignature: "",
    lastInputChange: 0,
  },
  buttons: [],
  lastControllerInfo: null,
};

const ctx = dom.historyCanvas.getContext("2d");

function resolveInitialLanguage() {
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved && TRANSLATIONS[saved]) {
    return saved;
  }

  const browserLanguage = (navigator.language || DEFAULT_LANGUAGE).toLowerCase();
  return browserLanguage.startsWith("es") ? "es" : "en";
}

function t(key, replacements = {}) {
  const dictionary = TRANSLATIONS[state.language] || TRANSLATIONS[DEFAULT_LANGUAGE];
  let value = dictionary[key] || TRANSLATIONS[DEFAULT_LANGUAGE][key] || key;

  Object.entries(replacements).forEach(([replacementKey, replacementValue]) => {
    value = value.replace(`{{${replacementKey}}}`, replacementValue);
  });

  return value;
}

function createEmptyStats() {
  return {
    left: makeStickStats(),
    right: makeStickStats(),
  };
}

function makeStickStats() {
  return {
    peak: 0,
    idleSamples: 0,
    idleMagnitudeSum: 0,
  };
}

function parseIdsFromGamepadId(id) {
  if (!id) {
    return { vendorId: null, productId: null };
  }

  const vendorProductMatch = id.match(/vendor[:\s]*([0-9a-f]{4}).*product[:\s]*([0-9a-f]{4})/i);
  if (vendorProductMatch) {
    return {
      vendorId: vendorProductMatch[1].toLowerCase(),
      productId: vendorProductMatch[2].toLowerCase(),
    };
  }

  const genericHexMatch = id.match(/([0-9a-f]{4})[-: ]([0-9a-f]{4})/i);
  if (genericHexMatch) {
    return {
      vendorId: genericHexMatch[1].toLowerCase(),
      productId: genericHexMatch[2].toLowerCase(),
    };
  }

  return { vendorId: null, productId: null };
}

function inferProfileFromId(id, vendorId, productId) {
  const normalized = (id || "").toLowerCase();
  const hardwareKey = vendorId && productId ? `${vendorId}:${productId}` : "";
  const exact = hardwareKey ? MODEL_DATABASE[hardwareKey] : null;

  if (exact) {
    return exact;
  }

  if (normalized.includes("dualsense edge")) {
    return { vendor: "Sony", family: "playstation", model: "DualSense Edge" };
  }

  if (normalized.includes("dualsense")) {
    return { vendor: "Sony", family: "playstation", model: "DualSense" };
  }

  if (normalized.includes("dualshock") || normalized.includes("wireless controller") || vendorId === "054c") {
    return { vendor: "Sony", family: "playstation", model: "PlayStation Controller" };
  }

  if (normalized.includes("xbox elite")) {
    return { vendor: "Microsoft", family: "xbox", model: "Xbox Elite Controller" };
  }

  if (normalized.includes("xbox") || normalized.includes("xinput") || vendorId === "045e") {
    return { vendor: "Microsoft", family: "xbox", model: "Xbox Wireless Controller" };
  }

  return { vendor: null, family: "generic", model: t("unknownModel") };
}

function buildControllerInfo(gamepad) {
  const { vendorId, productId } = parseIdsFromGamepadId(gamepad.id);
  const inferred = inferProfileFromId(gamepad.id, vendorId, productId);
  const family = inferred.family || "generic";
  const vendorName = inferred.vendor || t("notDetected");
  const hardwareIds = vendorId && productId ? `${vendorId.toUpperCase()}:${productId.toUpperCase()}` : t("notExposed");
  const rawId = gamepad.id && gamepad.id.trim() ? gamepad.id : t("noRawId");

  return {
    family,
    familyLabel: familyLabelFor(family),
    model: inferred.model || t("unknownModel"),
    vendorName,
    vendorId,
    productId,
    hardwareIds,
    rawId,
    mapping: gamepad.mapping || t("noMapping"),
    leftTrigger: family === "playstation" ? "L2" : family === "xbox" ? "LT" : "Trigger L",
    rightTrigger: family === "playstation" ? "R2" : family === "xbox" ? "RT" : "Trigger R",
    buttons: buttonLabelsForFamily(family),
  };
}

function familyLabelFor(family) {
  if (family === "playstation") {
    return t("playStationFamily");
  }
  if (family === "xbox") {
    return t("xboxFamily");
  }
  if (family === "generic") {
    return t("genericFamily");
  }
  return t("unsupportedFamily");
}

function buttonLabelsForFamily(family) {
  if (BUTTON_LABELS[family]) {
    return BUTTON_LABELS[family];
  }

  return Array.from({ length: BUTTON_COUNT }, (_, index) => t("genericButton", { index }));
}

function getConnectedGamepads() {
  return Array.from(navigator.getGamepads?.() || []).filter(Boolean);
}

function updateGamepadSelect() {
  const connected = getConnectedGamepads();
  const previousValue = state.selectedIndex;
  dom.gamepadSelect.innerHTML = "";

  if (!connected.length) {
    const option = document.createElement("option");
    option.textContent = t("selectNoControllers");
    option.value = "";
    dom.gamepadSelect.append(option);
    state.selectedIndex = null;
    return;
  }

  connected.forEach((pad) => {
    const info = buildControllerInfo(pad);
    const option = document.createElement("option");
    option.value = String(pad.index);
    option.textContent = `#${pad.index} - ${info.model}`;
    dom.gamepadSelect.append(option);
  });

  const hasPrevious = connected.some((pad) => pad.index === previousValue);
  state.selectedIndex = hasPrevious ? previousValue : connected[0].index;
  dom.gamepadSelect.value = String(state.selectedIndex);
}

function getSelectedGamepad() {
  const connected = getConnectedGamepads();
  if (!connected.length) {
    return null;
  }

  if (state.selectedIndex == null) {
    state.selectedIndex = connected[0].index;
  }

  return connected.find((pad) => pad.index === state.selectedIndex) || connected[0];
}

function applyDeadzone(value, deadzone) {
  const magnitude = Math.abs(value);
  if (magnitude <= deadzone) {
    return 0;
  }

  const scaled = (magnitude - deadzone) / (1 - deadzone);
  return Math.sign(value) * scaled;
}

function clampAxis(value) {
  return Math.max(-1, Math.min(1, value));
}

function resetBaseline() {
  state.baseline.left.x = 0;
  state.baseline.left.y = 0;
  state.baseline.right.x = 0;
  state.baseline.right.y = 0;
}

function updateStickVisual(arena, raw, filtered, deadzone) {
  const radius = arena.clientWidth / 2;
  const travel = radius - 16;
  const deadzoneRing = arena.querySelector(".deadzone-ring");
  const rawPoint = arena.querySelector(".stick-point-raw");
  const filteredPoint = arena.querySelector(".stick-point-filtered");
  const insetPercent = 50 - deadzone * 50;

  deadzoneRing.style.inset = `${insetPercent}%`;
  rawPoint.style.transform = `translate(${raw.x * travel}px, ${raw.y * travel}px)`;
  filteredPoint.style.transform = `translate(${filtered.x * travel}px, ${filtered.y * travel}px)`;
}

function upsertMetrics(container, metrics) {
  container.innerHTML = "";

  metrics.forEach((item) => {
    const node = dom.metricTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".label").textContent = item.label;
    node.querySelector("strong").textContent = item.value;
    container.append(node);
  });
}

function updateButtonsGrid(controllerInfo, buttons) {
  if (!state.buttons.length) {
    dom.buttonsGrid.innerHTML = "";
    controllerInfo.buttons.forEach((label, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "button-indicator";
      wrapper.dataset.buttonIndex = String(index);
      wrapper.innerHTML = `<span>${label}</span><strong>0%</strong>`;
      dom.buttonsGrid.append(wrapper);
    });
    state.buttons = Array.from(dom.buttonsGrid.children);
  }

  state.buttons.forEach((buttonNode, index) => {
    const button = buttons[index] || { value: 0, pressed: false };
    buttonNode.querySelector("span").textContent = controllerInfo.buttons[index] || t("genericButton", { index });
    buttonNode.querySelector("strong").textContent = `${Math.round(button.value * 100)}%`;
    buttonNode.classList.toggle("active", Boolean(button.pressed || button.value > 0.02));
  });
}

function captureTiming(gamepad, signature, now) {
  const frameDelta = now - state.timing.lastFrameTime;
  state.timing.lastFrameTime = now;
  pushHistoryValue(state.timing.frameDeltaHistory, frameDelta);

  const timestamp = Number(gamepad.timestamp || 0);
  if (signature !== state.timing.lastSignature) {
    if (timestamp > 0) {
      const latency = Math.max(0, now - timestamp);
      pushHistoryValue(state.timing.estimatedLatencyHistory, latency);
    }
    state.timing.lastSignature = signature;
    state.timing.lastInputChange = now;
  }
}

function pushHistoryValue(collection, value) {
  collection.push(value);
  if (collection.length > MAX_HISTORY) {
    collection.shift();
  }
}

function average(values) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values) {
  if (values.length < 2) {
    return 0;
  }

  const mean = average(values);
  const variance = average(values.map((value) => (value - mean) ** 2));
  return Math.sqrt(variance);
}

function buildSignature(gamepad) {
  const axes = gamepad.axes.map((value) => value.toFixed(3)).join("|");
  const buttons = gamepad.buttons
    .map((button) => `${button.pressed ? 1 : 0}:${button.value.toFixed(2)}`)
    .join("|");
  return `${axes}#${buttons}`;
}

function updateStickStats(side, raw) {
  const stickStats = state.stats[side];
  const magnitude = Math.hypot(raw.x, raw.y);
  stickStats.peak = Math.max(stickStats.peak, magnitude);

  if (magnitude < 0.25) {
    stickStats.idleSamples += 1;
    stickStats.idleMagnitudeSum += magnitude;
  }

  return {
    current: magnitude,
    peak: stickStats.peak,
    idleAverage: stickStats.idleSamples ? stickStats.idleMagnitudeSum / stickStats.idleSamples : 0,
  };
}

function pushAxisHistory(values) {
  pushHistoryValue(state.history.leftX, values.left.x);
  pushHistoryValue(state.history.leftY, values.left.y);
  pushHistoryValue(state.history.rightX, values.right.x);
  pushHistoryValue(state.history.rightY, values.right.y);
}

function drawHistory() {
  const dpr = window.devicePixelRatio || 1;
  const rect = dom.historyCanvas.getBoundingClientRect();
  const width = Math.max(320, Math.floor(rect.width * dpr));
  const height = Math.max(200, Math.floor(rect.height * dpr));

  if (dom.historyCanvas.width !== width || dom.historyCanvas.height !== height) {
    dom.historyCanvas.width = width;
    dom.historyCanvas.height = height;
  }

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.scale(dpr, dpr);

  const cssWidth = width / dpr;
  const cssHeight = height / dpr;
  const midY = cssHeight / 2;
  const chartHeight = cssHeight * 0.38;
  const leftPadding = 10;
  const usableWidth = cssWidth - leftPadding * 2;

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let index = 0; index < 5; index += 1) {
    const y = (cssHeight / 4) * index;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(cssWidth, y);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(0, midY);
  ctx.lineTo(cssWidth, midY);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.stroke();

  drawSeries(state.history.leftX, "#45f0d1", leftPadding, usableWidth, midY, chartHeight);
  drawSeries(state.history.leftY, "#6cc8ff", leftPadding, usableWidth, midY, chartHeight);
  drawSeries(state.history.rightX, "#ffb84d", leftPadding, usableWidth, midY, chartHeight);
  drawSeries(state.history.rightY, "#ff6b7d", leftPadding, usableWidth, midY, chartHeight);

  ctx.restore();
}

function drawSeries(series, color, leftPadding, usableWidth, midY, chartHeight) {
  if (series.length < 2) {
    return;
  }

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;

  series.forEach((value, index) => {
    const x = leftPadding + (usableWidth * index) / Math.max(series.length - 1, 1);
    const y = midY + value * chartHeight;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
}

function resetMetrics() {
  state.sampleCount = 0;
  state.stats = createEmptyStats();
  state.history = {
    leftX: [],
    leftY: [],
    rightX: [],
    rightY: [],
  };
  state.timing.frameDeltaHistory = [];
  state.timing.estimatedLatencyHistory = [];
  state.timing.lastSignature = "";
  state.timing.lastInputChange = 0;
}

function calibrateCurrentCenter() {
  const gamepad = getSelectedGamepad();
  if (!gamepad) {
    return;
  }

  state.baseline.left.x = Number(gamepad.axes[0] || 0);
  state.baseline.left.y = Number(gamepad.axes[1] || 0);
  state.baseline.right.x = Number(gamepad.axes[2] || 0);
  state.baseline.right.y = Number(gamepad.axes[3] || 0);
}

function formatSigned(value) {
  const rounded = value.toFixed(3);
  return value > 0 ? `+${rounded}` : rounded;
}

function setDisconnectedState() {
  dom.connectionState.textContent = t("noControllerConnected");
  dom.controllerType.textContent = t("notDetected");
  dom.controllerModel.textContent = t("unknownModel");
  dom.hardwareIds.textContent = t("notExposed");
  dom.mappingState.textContent = "-";
  dom.sampleCounter.textContent = "0";
  dom.rawIdState.textContent = t("noRawId");
  dom.leftStickStatus.textContent = t("connectToStart");
  dom.rightStickStatus.textContent = t("connectToStart");
  dom.leftTriggerLabel.textContent = "L2 / LT";
  dom.rightTriggerLabel.textContent = "R2 / RT";
  dom.leftTriggerValue.textContent = "0%";
  dom.rightTriggerValue.textContent = "0%";
  dom.leftTriggerFill.style.width = "0%";
  dom.rightTriggerFill.style.width = "0%";
  dom.buttonsGrid.innerHTML = "";
  state.buttons = [];
  upsertMetrics(dom.leftStickMetrics, []);
  upsertMetrics(dom.rightStickMetrics, []);
  upsertMetrics(dom.timingMetrics, []);
  ctx.clearRect(0, 0, dom.historyCanvas.width, dom.historyCanvas.height);
}

function renderControllerIdentity(gamepad, controllerInfo) {
  dom.connectionState.textContent = t("connectedStatus", { index: gamepad.index });
  dom.controllerType.textContent = controllerInfo.familyLabel;
  dom.controllerModel.textContent = controllerInfo.model;
  dom.hardwareIds.textContent = controllerInfo.hardwareIds;
  dom.mappingState.textContent = controllerInfo.mapping;
  dom.rawIdState.textContent = controllerInfo.rawId;
  dom.leftTriggerLabel.textContent = controllerInfo.leftTrigger;
  dom.rightTriggerLabel.textContent = controllerInfo.rightTrigger;
  state.lastControllerInfo = controllerInfo;
}

function buildStickMetricList(stickStats, raw, filtered) {
  return [
    { label: t("rawX"), value: formatSigned(raw.x) },
    { label: t("rawY"), value: formatSigned(raw.y) },
    { label: t("magnitude"), value: stickStats.current.toFixed(3) },
    { label: t("peak"), value: stickStats.peak.toFixed(3) },
    { label: t("idleAverage"), value: stickStats.idleAverage.toFixed(3) },
    { label: t("filtered"), value: `${formatSigned(filtered.x)} / ${formatSigned(filtered.y)}` },
  ];
}

function buildTimingMetricList(gamepad, now) {
  const avgFrameDelta = average(state.timing.frameDeltaHistory);
  const pollHz = avgFrameDelta > 0 ? 1000 / avgFrameDelta : 0;
  const frameJitter = standardDeviation(state.timing.frameDeltaHistory);
  const estimatedLatency = average(state.timing.estimatedLatencyHistory);
  const lastVisibleChange = state.timing.lastInputChange ? now - state.timing.lastInputChange : 0;

  return [
    { label: t("estimatedPolling"), value: pollHz ? `${pollHz.toFixed(1)} Hz` : t("noData") },
    { label: t("averageFrame"), value: avgFrameDelta ? `${avgFrameDelta.toFixed(2)} ms` : t("noData") },
    { label: t("jitter"), value: `${frameJitter.toFixed(2)} ms` },
    {
      label: t("estimatedLatency"),
      value: estimatedLatency ? `${estimatedLatency.toFixed(2)} ms` : t("unavailable"),
    },
    { label: t("lastVisibleChange"), value: `${lastVisibleChange.toFixed(1)} ms` },
    {
      label: t("timestamp"),
      value: gamepad.timestamp ? `${gamepad.timestamp.toFixed(1)} ms` : t("notExposed"),
    },
  ];
}

function render() {
  const gamepad = getSelectedGamepad();
  if (!gamepad) {
    setDisconnectedState();
    requestAnimationFrame(render);
    return;
  }

  const controllerInfo = buildControllerInfo(gamepad);
  const now = performance.now();

  renderControllerIdentity(gamepad, controllerInfo);

  const leftRaw = {
    x: clampAxis((gamepad.axes[0] || 0) - state.baseline.left.x),
    y: clampAxis((gamepad.axes[1] || 0) - state.baseline.left.y),
  };
  const rightRaw = {
    x: clampAxis((gamepad.axes[2] || 0) - state.baseline.right.x),
    y: clampAxis((gamepad.axes[3] || 0) - state.baseline.right.y),
  };

  const leftFiltered = {
    x: applyDeadzone(leftRaw.x, state.deadzone),
    y: applyDeadzone(leftRaw.y, state.deadzone),
  };
  const rightFiltered = {
    x: applyDeadzone(rightRaw.x, state.deadzone),
    y: applyDeadzone(rightRaw.y, state.deadzone),
  };

  updateStickVisual(dom.leftStickArena, leftRaw, leftFiltered, state.deadzone);
  updateStickVisual(dom.rightStickArena, rightRaw, rightFiltered, state.deadzone);

  const leftStats = updateStickStats("left", leftRaw);
  const rightStats = updateStickStats("right", rightRaw);

  dom.leftStickStatus.textContent =
    leftStats.current > state.deadzone ? t("outsideDeadzone") : t("insideDeadzone");
  dom.rightStickStatus.textContent =
    rightStats.current > state.deadzone ? t("outsideDeadzone") : t("insideDeadzone");

  upsertMetrics(dom.leftStickMetrics, buildStickMetricList(leftStats, leftRaw, leftFiltered));
  upsertMetrics(dom.rightStickMetrics, buildStickMetricList(rightStats, rightRaw, rightFiltered));

  const leftTrigger = gamepad.buttons[6]?.value || 0;
  const rightTrigger = gamepad.buttons[7]?.value || 0;

  dom.leftTriggerValue.textContent = `${Math.round(leftTrigger * 100)}%`;
  dom.rightTriggerValue.textContent = `${Math.round(rightTrigger * 100)}%`;
  dom.leftTriggerFill.style.width = `${leftTrigger * 100}%`;
  dom.rightTriggerFill.style.width = `${rightTrigger * 100}%`;

  updateButtonsGrid(controllerInfo, gamepad.buttons);

  state.sampleCount += 1;
  dom.sampleCounter.textContent = String(state.sampleCount);
  pushAxisHistory({ left: leftRaw, right: rightRaw });

  const signature = buildSignature(gamepad);
  captureTiming(gamepad, signature, now);
  drawHistory();
  upsertMetrics(dom.timingMetrics, buildTimingMetricList(gamepad, now));

  requestAnimationFrame(render);
}

function applyLanguageToUi() {
  document.documentElement.lang = state.language;
  document.title = t("pageTitle");
  dom.metaDescription.setAttribute("content", t("pageDescription"));
  dom.translatable.forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  dom.deadzoneValue.textContent = state.deadzone.toFixed(2);
  dom.langEsBtn.classList.toggle("active", state.language === "es");
  dom.langEnBtn.classList.toggle("active", state.language === "en");

  updateGamepadSelect();
}

function changeLanguage(language) {
  if (!TRANSLATIONS[language]) {
    return;
  }

  state.language = language;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  applyLanguageToUi();
  state.buttons = [];
}

function bindEvents() {
  window.addEventListener("gamepadconnected", () => {
    updateGamepadSelect();
  });

  window.addEventListener("gamepaddisconnected", () => {
    updateGamepadSelect();
    resetBaseline();
    resetMetrics();
    state.buttons = [];
  });

  dom.gamepadSelect.addEventListener("change", (event) => {
    const value = event.target.value;
    state.selectedIndex = value === "" ? null : Number(value);
    resetBaseline();
    state.buttons = [];
    resetMetrics();
  });

  dom.deadzoneRange.addEventListener("input", (event) => {
    state.deadzone = Number(event.target.value);
    dom.deadzoneValue.textContent = state.deadzone.toFixed(2);
  });

  dom.calibrateBtn.addEventListener("click", () => {
    calibrateCurrentCenter();
    resetMetrics();
  });

  dom.resetBtn.addEventListener("click", () => {
    resetMetrics();
  });

  dom.langEsBtn.addEventListener("click", () => {
    changeLanguage("es");
  });

  dom.langEnBtn.addEventListener("click", () => {
    changeLanguage("en");
  });

  window.addEventListener("resize", () => {
    drawHistory();
  });
}

function init() {
  applyLanguageToUi();
  bindEvents();
  setDisconnectedState();
  render();
}

init();
