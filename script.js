const MAX_HISTORY = 180;
const BUTTON_COUNT = 18;
const DEFAULT_LANGUAGE = "es";
const LANGUAGE_STORAGE_KEY = "padpulse-language";
const VIEW_MODE_STORAGE_KEY = "padpulse-view-mode";
const COMPAT_STORAGE_KEY = "padpulse-compatibility-db";
const SESSION_STORAGE_KEY = "padpulse-session-history";
const VIEW_MODE_OPTIONS = ["auto", "full", "console"];
const GUIDE_STEP_IDS = [
  "center",
  "leftSweep",
  "rightSweep",
  "leftTrigger",
  "rightTrigger",
  "faceButtons",
  "dpad",
  "rumble",
];

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
      "La latencia real del hardware no es accesible desde el navegador. PadPulse muestra una estimacion basada en timestamp, requestAnimationFrame y cambios de entrada visibles.",
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
    guidedKicker: "Guiado",
    guidedTitle: "Test paso a paso del mando",
    guidedText:
      "Sigue la secuencia para validar centro, recorrido de sticks, gatillos, botones frontales, cruceta y vibracion.",
    currentStepLabel: "Paso actual",
    progressLabel: "Progreso",
    guidedStartBtn: "Iniciar test guiado",
    guidedResetBtn: "Reiniciar guiado",
    triggerLabKicker: "Trigger lab",
    triggerLabTitle: "Analisis avanzado de gatillos",
    triggerLabText:
      "Revisa la curva del gatillo, umbral de activacion, resolucion efectiva y una estimacion de suavidad.",
    toolsKicker: "Utilidades",
    toolsTitle: "Instalar, guardar y compartir",
    toolsText:
      "Guarda snapshots locales, comparte un resumen, instala PadPulse como app o prueba la vibracion si el navegador lo permite.",
    installBtnText: "Instalar app",
    saveSessionBtnText: "Guardar sesion",
    shareBtnText: "Compartir resultado",
    rumbleBtnText: "Probar vibracion",
    utilityStatusLabel: "Estado",
    compatKicker: "Compatibilidad",
    compatTitle: "Base local de compatibilidad",
    compatText:
      "PadPulse guarda localmente como reporta cada mando tu navegador y tu sistema operativo en este dispositivo.",
    historyKicker: "Historial",
    historyTitle: "Sesiones guardadas localmente",
    historyText:
      "Los snapshots quedan en tu navegador para comparar el mismo mando con el paso del tiempo.",
    tableModel: "Modelo",
    tableBrowser: "Navegador",
    tablePlatform: "Sistema",
    tableMapping: "Mapping",
    tableLastSeen: "Ultima vez",
    clearCompatBtn: "Limpiar base de compatibilidad",
    clearSessionsBtn: "Borrar sesiones guardadas",
    tabTester: "Tester",
    tabGuided: "Guiado",
    tabTriggers: "Gatillos",
    tabTools: "Utilidades",
    tabHistory: "Historial",
    consoleNoteLabel: "Modo adaptativo",
    consoleNoteText:
      "PadPulse detecta si entras desde escritorio, movil o navegador de consola para ajustar densidad, foco y tamano de controles, pero el workspace completo sigue disponible para cualquiera.",
    viewModeLabel: "Modo de vista",
    viewModeAuto: "Auto",
    viewModeFull: "Full",
    viewModeConsole: "Consola",
    detectedEnvironmentLabel: "Acceso detectado",
    appliedModeLabel: "Vista activa",
    detectedAccessDesktop: "Navegador de escritorio",
    detectedAccessMobile: "Navegador movil",
    detectedAccessTv: "Navegador de consola / TV",
    detectedAccessPlayStation: "Navegador de PlayStation",
    detectedAccessXbox: "Navegador de Xbox",
    detectedAccessNintendo: "Navegador de Nintendo Switch",
    viewModeSummaryAutoFull:
      "Auto ha elegido la vista Full para este acceso. Puedes cambiar a Consola manualmente si navegas desde lejos o con el mando.",
    viewModeSummaryAutoConsole:
      "Auto ha elegido la vista Consola para dar targets mas grandes y una composicion mas clara, sin ocultar ninguna herramienta.",
    viewModeSummaryFull:
      "La vista Full mantiene la densidad completa y deja todas las secciones igual de visibles.",
    viewModeSummaryConsole:
      "La vista Consola reordena la interfaz para TV y navegacion con mando, pero conserva todas las funciones.",
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
    guideIdle: "Inicia el test guiado para empezar.",
    stepCenter: "Deja ambos sticks quietos en el centro",
    stepLeftSweep: "Mueve el stick izquierdo por todo su rango",
    stepRightSweep: "Mueve el stick derecho por todo su rango",
    stepLeftTrigger: "Pulsa y suelta completamente el gatillo izquierdo",
    stepRightTrigger: "Pulsa y suelta completamente el gatillo derecho",
    stepFaceButtons: "Pulsa los 4 botones frontales principales",
    stepDpad: "Pulsa las 4 direcciones de la cruceta",
    stepRumble: "Ejecuta la prueba de vibracion",
    statusPending: "Pendiente",
    statusActive: "Activo",
    statusDone: "Hecho",
    statusSkipped: "Omitido",
    triggerStartThreshold: "Inicio",
    triggerResolution: "Resolucion",
    triggerSmoothness: "Suavidad",
    triggerPeak: "Pico",
    utilityIdle: "Listo para capturar o compartir resultados.",
    utilityInstallReady: "La app se puede instalar desde este navegador.",
    utilityInstalled: "PadPulse ya esta instalada o se esta ejecutando en modo app.",
    utilityInstallUnavailable: "La instalacion PWA no esta disponible en este navegador ahora mismo.",
    utilitySaved: "Snapshot guardado en el historial local.",
    utilityShared: "Resumen compartido correctamente.",
    utilityCopied: "Resumen copiado al portapapeles.",
    utilityShareUnavailable: "No se pudo compartir ni copiar el resumen desde este navegador.",
    utilityRumbleDone: "Prueba de vibracion ejecutada correctamente.",
    utilityRumbleUnsupported: "Este mando o navegador no expone vibracion mediante la Gamepad API.",
    utilityNeedController: "Conecta un mando para usar esta funcion.",
    utilityCompatibilityCleared: "Base de compatibilidad local limpiada.",
    utilitySessionsCleared: "Historial local eliminado.",
    supportInstall: "PWA",
    supportShare: "Compartir",
    supportRumble: "Vibracion",
    supportedYes: "Disponible",
    supportedNo: "No disponible",
    compatibilityEmpty: "Todavia no hay registros locales de compatibilidad.",
    compatibilityTrimmed: "Mostrando los {{count}} registros mas recientes.",
    historyEmpty: "Todavia no hay sesiones guardadas.",
    sessionAutosaved: "Auto guardada",
    sessionManual: "Manual",
    browserUnknown: "Navegador desconocido",
    platformUnknown: "Sistema desconocido",
    triggerLevelsUnit: "{{count}} niveles",
    smoothnessScore: "{{score}} / 100",
    installBtnInstalled: "App instalada",
    installBtnUnavailable: "Instalacion no disponible",
    currentStepDone: "Completado",
    savedAt: "Guardado",
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
      "Real hardware latency is not exposed to the browser. PadPulse shows an estimate based on timestamp, requestAnimationFrame cadence and visible input changes.",
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
    guidedKicker: "Guided",
    guidedTitle: "Step by step controller test",
    guidedText:
      "Follow the sequence to validate center position, stick travel, triggers, face buttons, D-pad and rumble.",
    currentStepLabel: "Current step",
    progressLabel: "Progress",
    guidedStartBtn: "Start guided test",
    guidedResetBtn: "Reset guided test",
    triggerLabKicker: "Trigger lab",
    triggerLabTitle: "Advanced trigger analysis",
    triggerLabText:
      "Inspect trigger curve, activation threshold, effective resolution and a smoothness estimate.",
    toolsKicker: "Tools",
    toolsTitle: "Install, save and share",
    toolsText:
      "Save local snapshots, share a summary, install PadPulse as an app or run rumble if the browser exposes it.",
    installBtnText: "Install app",
    saveSessionBtnText: "Save session",
    shareBtnText: "Share result",
    rumbleBtnText: "Run rumble test",
    utilityStatusLabel: "Status",
    compatKicker: "Compatibility",
    compatTitle: "Local compatibility base",
    compatText:
      "PadPulse stores how each controller is reported by your browser and operating system on this device.",
    historyKicker: "History",
    historyTitle: "Local saved sessions",
    historyText:
      "Saved snapshots stay in your browser so you can compare the same controller over time.",
    tableModel: "Model",
    tableBrowser: "Browser",
    tablePlatform: "Platform",
    tableMapping: "Mapping",
    tableLastSeen: "Last seen",
    clearCompatBtn: "Clear compatibility base",
    clearSessionsBtn: "Clear saved sessions",
    tabTester: "Tester",
    tabGuided: "Guided",
    tabTriggers: "Triggers",
    tabTools: "Tools",
    tabHistory: "History",
    consoleNoteLabel: "Adaptive mode",
    consoleNoteText:
      "PadPulse detects whether you arrive from desktop, mobile or a console-like browser so it can adapt density and focus targets without hiding any feature.",
    viewModeLabel: "View mode",
    viewModeAuto: "Auto",
    viewModeFull: "Full",
    viewModeConsole: "Console",
    detectedEnvironmentLabel: "Detected access",
    appliedModeLabel: "Active layout",
    detectedAccessDesktop: "Desktop browser",
    detectedAccessMobile: "Mobile browser",
    detectedAccessTv: "Console / TV browser",
    detectedAccessPlayStation: "PlayStation browser",
    detectedAccessXbox: "Xbox browser",
    detectedAccessNintendo: "Nintendo Switch browser",
    viewModeSummaryAutoFull:
      "Auto selected the Full layout for this access. You can switch to Console manually if you are browsing from a TV or with a gamepad.",
    viewModeSummaryAutoConsole:
      "Auto selected the Console layout to prioritize bigger targets and clearer composition without hiding any tool.",
    viewModeSummaryFull:
      "Full keeps the denser workspace and leaves every section equally exposed.",
    viewModeSummaryConsole:
      "Console reorganizes the interface for TV and gamepad navigation while keeping every feature available.",
    footerLineOne:
      "PadPulse is a static browser project built to test controller input without installing native software.",
    footerLineTwo:
      "It works best on localhost and modern Chromium based browsers with Gamepad API support.",
    noControllerConnected: "No controller connected",
    notDetected: "Not detected",
    unknownModel: "Unknown model",
    notExposed: "Not exposed",
    noMapping: "no mapping",
    selectNoControllers: "No controllers",
    connectedStatus: "Connected (#{{index}})",
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
    guideIdle: "Start the guided test to begin.",
    stepCenter: "Leave both sticks resting in the center",
    stepLeftSweep: "Move the left stick across its full travel",
    stepRightSweep: "Move the right stick across its full travel",
    stepLeftTrigger: "Press and release the left trigger fully",
    stepRightTrigger: "Press and release the right trigger fully",
    stepFaceButtons: "Press the 4 main face buttons",
    stepDpad: "Press the 4 D-pad directions",
    stepRumble: "Run the rumble test",
    statusPending: "Pending",
    statusActive: "Active",
    statusDone: "Done",
    statusSkipped: "Skipped",
    triggerStartThreshold: "Start",
    triggerResolution: "Resolution",
    triggerSmoothness: "Smoothness",
    triggerPeak: "Peak",
    utilityIdle: "Ready to capture or share results.",
    utilityInstallReady: "The app can be installed from this browser.",
    utilityInstalled: "PadPulse is already installed or running in app mode.",
    utilityInstallUnavailable: "PWA installation is not available in this browser right now.",
    utilitySaved: "Snapshot saved to local history.",
    utilityShared: "Summary shared successfully.",
    utilityCopied: "Summary copied to clipboard.",
    utilityShareUnavailable: "The browser could not share or copy the summary.",
    utilityRumbleDone: "Rumble test executed successfully.",
    utilityRumbleUnsupported: "This controller or browser does not expose rumble through the Gamepad API.",
    utilityNeedController: "Connect a controller to use this feature.",
    utilityCompatibilityCleared: "Local compatibility base cleared.",
    utilitySessionsCleared: "Local history removed.",
    supportInstall: "PWA",
    supportShare: "Share",
    supportRumble: "Rumble",
    supportedYes: "Available",
    supportedNo: "Unavailable",
    compatibilityEmpty: "There are no local compatibility records yet.",
    compatibilityTrimmed: "Showing the latest {{count}} records.",
    historyEmpty: "There are no saved sessions yet.",
    sessionAutosaved: "Autosaved",
    sessionManual: "Manual",
    browserUnknown: "Unknown browser",
    platformUnknown: "Unknown platform",
    triggerLevelsUnit: "{{count}} levels",
    smoothnessScore: "{{score}} / 100",
    installBtnInstalled: "App installed",
    installBtnUnavailable: "Install unavailable",
    currentStepDone: "Completed",
    savedAt: "Saved",
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
  tabTesterBtn: document.getElementById("tabTesterBtn"),
  tabGuidedBtn: document.getElementById("tabGuidedBtn"),
  tabTriggersBtn: document.getElementById("tabTriggersBtn"),
  tabToolsBtn: document.getElementById("tabToolsBtn"),
  tabHistoryBtn: document.getElementById("tabHistoryBtn"),
  tabPanels: Array.from(document.querySelectorAll(".tab-panel")),
  tabButtons: Array.from(document.querySelectorAll(".tab-btn")),
  guidedStartBtn: document.getElementById("guidedStartBtn"),
  guidedResetBtn: document.getElementById("guidedResetBtn"),
  guidedCurrentStep: document.getElementById("guidedCurrentStep"),
  guidedProgressFill: document.getElementById("guidedProgressFill"),
  guidedProgressText: document.getElementById("guidedProgressText"),
  guidedSteps: document.getElementById("guidedSteps"),
  leftTriggerAnalysisLabel: document.getElementById("leftTriggerAnalysisLabel"),
  rightTriggerAnalysisLabel: document.getElementById("rightTriggerAnalysisLabel"),
  leftTriggerAnalysisValue: document.getElementById("leftTriggerAnalysisValue"),
  rightTriggerAnalysisValue: document.getElementById("rightTriggerAnalysisValue"),
  leftTriggerCanvas: document.getElementById("leftTriggerCanvas"),
  rightTriggerCanvas: document.getElementById("rightTriggerCanvas"),
  leftTriggerMetrics: document.getElementById("leftTriggerMetrics"),
  rightTriggerMetrics: document.getElementById("rightTriggerMetrics"),
  installBtn: document.getElementById("installBtn"),
  saveSessionBtn: document.getElementById("saveSessionBtn"),
  shareBtn: document.getElementById("shareBtn"),
  rumbleBtn: document.getElementById("rumbleBtn"),
  utilityStatus: document.getElementById("utilityStatus"),
  supportMetrics: document.getElementById("supportMetrics"),
  compatTableBody: document.getElementById("compatTableBody"),
  savedSessionsList: document.getElementById("savedSessionsList"),
  clearCompatBtn: document.getElementById("clearCompatBtn"),
  clearSessionsBtn: document.getElementById("clearSessionsBtn"),
  viewModeSelect: document.getElementById("viewModeSelect"),
  detectedEnvironmentState: document.getElementById("detectedEnvironmentState"),
  appliedViewModeState: document.getElementById("appliedViewModeState"),
  experienceModeSummary: document.getElementById("experienceModeSummary"),
  metricTemplate: document.getElementById("metricTemplate"),
  translatable: Array.from(document.querySelectorAll("[data-i18n]")),
  metaDescription: document.querySelector('meta[name="description"]'),
};

const state = {
  language: resolveInitialLanguage(),
  viewModePreference: resolveInitialViewMode(),
  detectedEnvironment: detectAccessEnvironment(),
  effectiveViewMode: "full",
  activeTab: "tester",
  deadzone: Number(dom.deadzoneRange.value),
  selectedIndex: null,
  sampleCount: 0,
  baseline: {
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  },
  stats: createEmptyStats(),
  history: { leftX: [], leftY: [], rightX: [], rightY: [] },
  timing: {
    lastFrameTime: performance.now(),
    frameDeltaHistory: [],
    estimatedLatencyHistory: [],
    lastSignature: "",
    lastInputChange: 0,
  },
  triggerAnalytics: {
    left: createTriggerAnalytics(),
    right: createTriggerAnalytics(),
  },
  buttons: [],
  lastControllerInfo: null,
  lastCompatibilityKey: "",
  compatibilityRecords: loadStoredJson(COMPAT_STORAGE_KEY, []),
  savedSessions: loadStoredJson(SESSION_STORAGE_KEY, []),
  guided: createGuidedState(),
  installPrompt: null,
  utilityStatusKey: "utilityIdle",
};

const ctx = dom.historyCanvas.getContext("2d");
const leftTriggerCtx = dom.leftTriggerCanvas.getContext("2d");
const rightTriggerCtx = dom.rightTriggerCanvas.getContext("2d");

function resolveInitialLanguage() {
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved && TRANSLATIONS[saved]) {
    return saved;
  }

  return (navigator.language || DEFAULT_LANGUAGE).toLowerCase().startsWith("es") ? "es" : "en";
}

function resolveInitialViewMode() {
  const saved = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);
  return VIEW_MODE_OPTIONS.includes(saved) ? saved : "auto";
}

function loadStoredJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStoredJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function t(key, replacements = {}) {
  const dictionary = TRANSLATIONS[state.language] || TRANSLATIONS[DEFAULT_LANGUAGE];
  let value = dictionary[key] || TRANSLATIONS[DEFAULT_LANGUAGE][key] || key;
  Object.entries(replacements).forEach(([name, replacement]) => {
    value = value.replace(`{{${name}}}`, String(replacement));
  });
  return value;
}

function detectAccessEnvironment() {
  const ua = (navigator.userAgent || "").toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const narrowViewport = window.matchMedia?.("(max-width: 820px)").matches ?? window.innerWidth <= 820;
  const touchPoints = navigator.maxTouchPoints || 0;
  const appleTabletLike = platform === "macintel" && touchPoints > 1;

  if (/playstation/.test(ua)) {
    return { kind: "console", labelKey: "detectedAccessPlayStation" };
  }

  if (/xbox/.test(ua)) {
    return { kind: "console", labelKey: "detectedAccessXbox" };
  }

  if (/nintendobrowser|nintendo switch/.test(ua)) {
    return { kind: "console", labelKey: "detectedAccessNintendo" };
  }

  if (/smart-tv|smarttv|hbbtv|googletv|appletv|crkey|aft|web0s|webos|tizen|viera/.test(ua)) {
    return { kind: "console", labelKey: "detectedAccessTv" };
  }

  if (/iphone|ipad|ipod|android|mobile/.test(ua) || /android|ios/.test(platform) || appleTabletLike || (touchPoints > 1 && coarsePointer && narrowViewport)) {
    return { kind: "mobile", labelKey: "detectedAccessMobile" };
  }

  if (coarsePointer && !narrowViewport && !/win|mac|linux/.test(platform) && !/windows|macintosh|x11|linux/.test(ua)) {
    return { kind: "console", labelKey: "detectedAccessTv" };
  }

  return { kind: "desktop", labelKey: "detectedAccessDesktop" };
}

function resolveEffectiveViewMode() {
  if (state.viewModePreference === "auto") {
    return state.detectedEnvironment.kind === "console" ? "console" : "full";
  }

  return state.viewModePreference;
}

function getViewModeLabelKey(mode) {
  if (mode === "console") {
    return "viewModeConsole";
  }

  return "viewModeFull";
}

function getViewModeSummaryKey() {
  if (state.viewModePreference === "auto") {
    return state.effectiveViewMode === "console" ? "viewModeSummaryAutoConsole" : "viewModeSummaryAutoFull";
  }

  return state.effectiveViewMode === "console" ? "viewModeSummaryConsole" : "viewModeSummaryFull";
}

function applyViewMode({ refreshEnvironment = true } = {}) {
  if (refreshEnvironment) {
    state.detectedEnvironment = detectAccessEnvironment();
  }

  state.effectiveViewMode = resolveEffectiveViewMode();
  document.body.dataset.viewMode = state.effectiveViewMode;
  document.body.dataset.detectedEnvironment = state.detectedEnvironment.kind;

  if (dom.viewModeSelect) {
    dom.viewModeSelect.value = state.viewModePreference;
  }

  if (dom.detectedEnvironmentState) {
    dom.detectedEnvironmentState.textContent = t(state.detectedEnvironment.labelKey);
  }

  if (dom.appliedViewModeState) {
    dom.appliedViewModeState.textContent = t(getViewModeLabelKey(state.effectiveViewMode));
  }

  if (dom.experienceModeSummary) {
    dom.experienceModeSummary.textContent = t(getViewModeSummaryKey());
  }
}

function createEmptyStats() {
  return {
    left: { peak: 0, idleSamples: 0, idleMagnitudeSum: 0 },
    right: { peak: 0, idleSamples: 0, idleMagnitudeSum: 0 },
  };
}

function createTriggerAnalytics() {
  return {
    history: [],
    peak: 0,
    firstActive: null,
    uniqueLevels: [],
    deltas: [],
    lastValue: 0,
  };
}

function createGuidedState() {
  return {
    active: false,
    currentIndex: 0,
    steps: GUIDE_STEP_IDS.map((id) => ({ id, status: "pending" })),
    neutralFrames: 0,
    leftCoverage: { minX: 0, maxX: 0, minY: 0, maxY: 0 },
    rightCoverage: { minX: 0, maxX: 0, minY: 0, maxY: 0 },
    leftTriggerPressed: false,
    rightTriggerPressed: false,
    faceButtons: [false, false, false, false],
    dpadButtons: [false, false, false, false],
    rumbleConfirmed: false,
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

function buildControllerInfo(gamepad) {
  const ids = parseIdsFromGamepadId(gamepad.id);
  const inferred = inferProfileFromId(gamepad.id, ids.vendorId, ids.productId);
  const family = inferred.family || "generic";
  return {
    family,
    familyLabel: familyLabelFor(family),
    model: inferred.model || t("unknownModel"),
    vendor: inferred.vendor || t("notDetected"),
    vendorId: ids.vendorId,
    productId: ids.productId,
    hardwareIds: ids.vendorId && ids.productId ? `${ids.vendorId.toUpperCase()}:${ids.productId.toUpperCase()}` : t("notExposed"),
    rawId: gamepad.id && gamepad.id.trim() ? gamepad.id : t("noRawId"),
    mapping: gamepad.mapping || t("noMapping"),
    leftTrigger: family === "playstation" ? "L2" : family === "xbox" ? "LT" : "Trigger L",
    rightTrigger: family === "playstation" ? "R2" : family === "xbox" ? "RT" : "Trigger R",
    buttons: buttonLabelsForFamily(family),
  };
}

function getConnectedGamepads() {
  return Array.from(navigator.getGamepads?.() || []).filter(Boolean);
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

function updateGamepadSelect() {
  const connected = getConnectedGamepads();
  const previousValue = state.selectedIndex;
  dom.gamepadSelect.innerHTML = "";

  if (!connected.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = t("selectNoControllers");
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

function applyDeadzone(value, deadzone) {
  const magnitude = Math.abs(value);
  if (magnitude <= deadzone) {
    return 0;
  }
  return Math.sign(value) * ((magnitude - deadzone) / (1 - deadzone));
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

function resetMetrics() {
  state.sampleCount = 0;
  state.stats = createEmptyStats();
  state.history = { leftX: [], leftY: [], rightX: [], rightY: [] };
  state.timing.frameDeltaHistory = [];
  state.timing.estimatedLatencyHistory = [];
  state.timing.lastSignature = "";
  state.timing.lastInputChange = 0;
  state.triggerAnalytics.left = createTriggerAnalytics();
  state.triggerAnalytics.right = createTriggerAnalytics();
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
  return Math.sqrt(average(values.map((value) => (value - mean) ** 2)));
}

function formatSigned(value) {
  const rounded = value.toFixed(3);
  return value > 0 ? `+${rounded}` : rounded;
}

function formatDate(timestamp) {
  const locale = state.language === "es" ? "es-ES" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

function getBrowserEnvironment() {
  const ua = navigator.userAgent || "";
  const platform = navigator.userAgentData?.platform || navigator.platform || t("platformUnknown");
  let browser = t("browserUnknown");

  if (/Edg\//.test(ua)) {
    browser = "Microsoft Edge";
  } else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) {
    browser = "Google Chrome";
  } else if (/Firefox\//.test(ua)) {
    browser = "Mozilla Firefox";
  } else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) {
    browser = "Safari";
  }

  return { browser, platform };
}

function getCompatibilityKey(controllerInfo, environment) {
  return [
    controllerInfo.model,
    controllerInfo.hardwareIds,
    environment.browser,
    environment.platform,
    controllerInfo.mapping,
    controllerInfo.rawId,
  ].join("|");
}

function recordCompatibility(gamepad, controllerInfo) {
  const environment = getBrowserEnvironment();
  const key = getCompatibilityKey(controllerInfo, environment);
  if (key === state.lastCompatibilityKey) {
    return;
  }

  const now = Date.now();
  const existing = state.compatibilityRecords.find((record) => record.key === key);
  if (existing) {
    existing.count += 1;
    existing.lastSeen = now;
  } else {
    state.compatibilityRecords.unshift({
      key,
      model: controllerInfo.model,
      browser: environment.browser,
      platform: environment.platform,
      mapping: controllerInfo.mapping,
      rawId: controllerInfo.rawId,
      hardwareIds: controllerInfo.hardwareIds,
      firstSeen: now,
      lastSeen: now,
      count: 1,
    });
  }

  state.compatibilityRecords.sort((a, b) => b.lastSeen - a.lastSeen);
  state.compatibilityRecords = state.compatibilityRecords.slice(0, 40);
  state.lastCompatibilityKey = key;
  saveStoredJson(COMPAT_STORAGE_KEY, state.compatibilityRecords);
  renderCompatibilityTable();
}

function renderCompatibilityTable() {
  dom.compatTableBody.innerHTML = "";
  const visibleCount = state.effectiveViewMode === "console" ? 5 : 8;

  if (!state.compatibilityRecords.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.innerHTML = `<div class="empty-state">${t("compatibilityEmpty")}</div>`;
    row.append(cell);
    dom.compatTableBody.append(row);
    return;
  }

  state.compatibilityRecords.slice(0, visibleCount).forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHtml(record.model)}</strong><span class="table-subtitle">${escapeHtml(record.hardwareIds)}<br>${escapeHtml(record.rawId)}</span></td>
      <td>${escapeHtml(record.browser)}</td>
      <td>${escapeHtml(record.platform)}</td>
      <td>${escapeHtml(record.mapping)}</td>
      <td>${escapeHtml(formatDate(record.lastSeen))}<span class="table-subtitle">${record.count}x</span></td>
    `;
    dom.compatTableBody.append(row);
  });

  if (state.compatibilityRecords.length > visibleCount) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5"><div class="empty-state">${t("compatibilityTrimmed", { count: visibleCount })}</div></td>`;
    dom.compatTableBody.append(row);
  }
}

function setActiveTab(tabId) {
  state.activeTab = tabId;
  dom.tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    if (isActive) {
      button.removeAttribute("tabindex");
    } else {
      button.setAttribute("tabindex", "-1");
    }
  });

  dom.tabPanels.forEach((panel) => {
    const isActive = panel.id === `tab${capitalize(tabId)}`;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
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

function updateStickVisual(arena, raw, filtered, deadzone) {
  const radius = arena.clientWidth / 2;
  const travel = radius - 16;
  const deadzoneRing = arena.querySelector(".deadzone-ring");
  arena.querySelector(".stick-point-raw").style.transform = `translate(${raw.x * travel}px, ${raw.y * travel}px)`;
  arena.querySelector(".stick-point-filtered").style.transform = `translate(${filtered.x * travel}px, ${filtered.y * travel}px)`;
  deadzoneRing.style.inset = `${50 - deadzone * 50}%`;
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

function updateTriggerAnalytics(side, value) {
  const analytics = state.triggerAnalytics[side];
  analytics.peak = Math.max(analytics.peak, value);
  pushHistoryValue(analytics.history, value);

  if (value > 0.01) {
    if (analytics.firstActive == null) {
      analytics.firstActive = value;
    }
    const quantized = value.toFixed(2);
    if (!analytics.uniqueLevels.includes(quantized)) {
      analytics.uniqueLevels.push(quantized);
    }
  }

  const delta = Math.abs(value - analytics.lastValue);
  if (delta > 0) {
    analytics.deltas.push(delta);
    if (analytics.deltas.length > MAX_HISTORY) {
      analytics.deltas.shift();
    }
  }

  analytics.lastValue = value;
}

function buildTriggerMetricList(side) {
  const analytics = state.triggerAnalytics[side];
  const uniqueLevels = analytics.uniqueLevels.length;
  const jitter = standardDeviation(analytics.deltas);
  const smoothness = Math.max(
    0,
    Math.min(100, Math.round((Math.min(uniqueLevels, 40) / 40) * 65 + (1 - Math.min(jitter / 0.08, 1)) * 35)),
  );

  return [
    { label: t("triggerPeak"), value: `${Math.round(analytics.peak * 100)}%` },
    {
      label: t("triggerStartThreshold"),
      value: analytics.firstActive != null ? `${Math.round(analytics.firstActive * 100)}%` : t("unavailable"),
    },
    { label: t("triggerResolution"), value: t("triggerLevelsUnit", { count: uniqueLevels }) },
    { label: t("triggerSmoothness"), value: t("smoothnessScore", { score: smoothness }) },
  ];
}

function captureTiming(gamepad, signature, now) {
  const frameDelta = now - state.timing.lastFrameTime;
  state.timing.lastFrameTime = now;
  pushHistoryValue(state.timing.frameDeltaHistory, frameDelta);

  const timestamp = Number(gamepad.timestamp || 0);
  if (signature !== state.timing.lastSignature) {
    if (timestamp > 0) {
      pushHistoryValue(state.timing.estimatedLatencyHistory, Math.max(0, now - timestamp));
    }
    state.timing.lastSignature = signature;
    state.timing.lastInputChange = now;
  }
}

function buildSignature(gamepad) {
  const axes = gamepad.axes.map((value) => value.toFixed(3)).join("|");
  const buttons = gamepad.buttons.map((button) => `${button.pressed ? 1 : 0}:${button.value.toFixed(2)}`).join("|");
  return `${axes}#${buttons}`;
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
    { label: t("estimatedLatency"), value: estimatedLatency ? `${estimatedLatency.toFixed(2)} ms` : t("unavailable") },
    { label: t("lastVisibleChange"), value: `${lastVisibleChange.toFixed(1)} ms` },
    { label: t("timestamp"), value: gamepad.timestamp ? `${gamepad.timestamp.toFixed(1)} ms` : t("notExposed") },
  ];
}

function drawSeriesOnCanvas(context, canvas, series, color, min = -1, max = 1) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(240, Math.floor(rect.width * dpr));
  const height = Math.max(100, Math.floor(rect.height * dpr));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  context.clearRect(0, 0, width, height);
  context.save();
  context.scale(dpr, dpr);

  const cssWidth = width / dpr;
  const cssHeight = height / dpr;
  context.strokeStyle = "rgba(255,255,255,0.08)";
  context.lineWidth = 1;

  for (let index = 0; index < 4; index += 1) {
    const y = (cssHeight / 3) * index;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(cssWidth, y);
    context.stroke();
  }

  if (series.length > 1) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 2;

    series.forEach((value, index) => {
      const x = (cssWidth * index) / Math.max(series.length - 1, 1);
      const normalized = (value - min) / Math.max(max - min, 0.0001);
      const y = cssHeight - normalized * cssHeight;
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });

    context.stroke();
  }

  context.restore();
}

function drawHistory() {
  drawSeriesOnCanvas(ctx, dom.historyCanvas, state.history.leftX, "#45f0d1");
  overlayHistorySeries(state.history.leftY, "#6cc8ff");
  overlayHistorySeries(state.history.rightX, "#ffb84d");
  overlayHistorySeries(state.history.rightY, "#ff6b7d");
}

function overlayHistorySeries(series, color) {
  const dpr = window.devicePixelRatio || 1;
  const width = dom.historyCanvas.width;
  const height = dom.historyCanvas.height;
  ctx.save();
  ctx.scale(dpr, dpr);

  const cssWidth = width / dpr;
  const cssHeight = height / dpr;
  if (series.length > 1) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    series.forEach((value, index) => {
      const x = (cssWidth * index) / Math.max(series.length - 1, 1);
      const y = cssHeight - ((value + 1) / 2) * cssHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  }

  ctx.restore();
}

function drawTriggerCharts() {
  drawSeriesOnCanvas(leftTriggerCtx, dom.leftTriggerCanvas, state.triggerAnalytics.left.history, "#ffb84d", 0, 1);
  drawSeriesOnCanvas(rightTriggerCtx, dom.rightTriggerCanvas, state.triggerAnalytics.right.history, "#ffd99b", 0, 1);
}

function updateGuidedCoverage(target, raw) {
  target.minX = Math.min(target.minX, raw.x);
  target.maxX = Math.max(target.maxX, raw.x);
  target.minY = Math.min(target.minY, raw.y);
  target.maxY = Math.max(target.maxY, raw.y);
}

function markGuidedStep(status) {
  const step = state.guided.steps[state.guided.currentIndex];
  if (!step) {
    return;
  }
  step.status = status;
  state.guided.currentIndex += 1;

  if (state.guided.currentIndex >= state.guided.steps.length) {
    state.guided.active = false;
  } else {
    state.guided.steps[state.guided.currentIndex].status = "active";
  }

  renderGuidedTest();
}

function startGuidedTest() {
  state.guided = createGuidedState();
  state.guided.active = true;
  state.guided.steps[0].status = "active";
  renderGuidedTest();
}

function resetGuidedTest() {
  state.guided = createGuidedState();
  renderGuidedTest();
}

function getCurrentGuidedStepKey() {
  const step = state.guided.steps[Math.min(state.guided.currentIndex, state.guided.steps.length - 1)];
  return step ? `step${capitalize(step.id)}` : "currentStepDone";
}

function updateGuidedTest(gamepad, leftRaw, rightRaw, leftTrigger, rightTrigger) {
  if (!state.guided.active) {
    return;
  }

  const currentStep = state.guided.steps[state.guided.currentIndex];
  if (!currentStep) {
    return;
  }

  if (currentStep.id === "center") {
    const quiet = Math.hypot(leftRaw.x, leftRaw.y) < state.deadzone + 0.03 && Math.hypot(rightRaw.x, rightRaw.y) < state.deadzone + 0.03;
    state.guided.neutralFrames = quiet ? state.guided.neutralFrames + 1 : 0;
    if (state.guided.neutralFrames > 35) {
      markGuidedStep("done");
    }
  } else if (currentStep.id === "leftSweep") {
    updateGuidedCoverage(state.guided.leftCoverage, leftRaw);
    const coverage = state.guided.leftCoverage;
    if (coverage.maxX > 0.75 && coverage.minX < -0.75 && coverage.maxY > 0.75 && coverage.minY < -0.75) {
      markGuidedStep("done");
    }
  } else if (currentStep.id === "rightSweep") {
    updateGuidedCoverage(state.guided.rightCoverage, rightRaw);
    const coverage = state.guided.rightCoverage;
    if (coverage.maxX > 0.75 && coverage.minX < -0.75 && coverage.maxY > 0.75 && coverage.minY < -0.75) {
      markGuidedStep("done");
    }
  } else if (currentStep.id === "leftTrigger") {
    if (leftTrigger > 0.95) {
      state.guided.leftTriggerPressed = true;
    }
    if (state.guided.leftTriggerPressed && leftTrigger < 0.05) {
      markGuidedStep("done");
    }
  } else if (currentStep.id === "rightTrigger") {
    if (rightTrigger > 0.95) {
      state.guided.rightTriggerPressed = true;
    }
    if (state.guided.rightTriggerPressed && rightTrigger < 0.05) {
      markGuidedStep("done");
    }
  } else if (currentStep.id === "faceButtons") {
    [0, 1, 2, 3].forEach((index, position) => {
      if (gamepad.buttons[index]?.pressed || (gamepad.buttons[index]?.value || 0) > 0.5) {
        state.guided.faceButtons[position] = true;
      }
    });
    if (state.guided.faceButtons.every(Boolean)) {
      markGuidedStep("done");
    }
  } else if (currentStep.id === "dpad") {
    [12, 13, 14, 15].forEach((index, position) => {
      if (gamepad.buttons[index]?.pressed || (gamepad.buttons[index]?.value || 0) > 0.5) {
        state.guided.dpadButtons[position] = true;
      }
    });
    if (state.guided.dpadButtons.every(Boolean)) {
      markGuidedStep("done");
    }
  } else if (currentStep.id === "rumble") {
    if (!hasRumbleSupport(gamepad)) {
      markGuidedStep("skipped");
    } else if (state.guided.rumbleConfirmed) {
      markGuidedStep("done");
    }
  }
}

function renderGuidedTest() {
  const completed = state.guided.steps.filter((step) => step.status === "done" || step.status === "skipped").length;
  const progress = Math.round((completed / state.guided.steps.length) * 100);
  dom.guidedProgressFill.style.width = `${progress}%`;
  dom.guidedProgressText.textContent = `${progress}%`;

  if (!state.guided.active && completed === 0) {
    dom.guidedCurrentStep.textContent = t("guideIdle");
  } else if (!state.guided.active && completed === state.guided.steps.length) {
    dom.guidedCurrentStep.textContent = t("currentStepDone");
  } else {
    dom.guidedCurrentStep.textContent = t(getCurrentGuidedStepKey());
  }

  dom.guidedSteps.innerHTML = "";
  state.guided.steps.forEach((step) => {
    const wrapper = document.createElement("div");
    wrapper.className = `guide-step ${step.status === "active" ? "is-active" : ""} ${step.status === "done" ? "is-done" : ""} ${step.status === "skipped" ? "is-skipped" : ""}`;
    wrapper.innerHTML = `
      <div>
        <strong>${t(`step${capitalize(step.id)}`)}</strong>
        <span>${t(`status${capitalize(step.status)}`)}</span>
      </div>
      <span class="guide-step-badge">${t(`status${capitalize(step.status)}`)}</span>
    `;
    dom.guidedSteps.append(wrapper);
  });
}

function hasRumbleSupport(gamepad) {
  return Boolean(
    gamepad?.vibrationActuator?.playEffect ||
    (gamepad?.hapticActuators && gamepad.hapticActuators.some((actuator) => typeof actuator.pulse === "function")),
  );
}

async function runRumbleTest() {
  const gamepad = getSelectedGamepad();
  if (!gamepad) {
    setUtilityStatus("utilityNeedController");
    return;
  }
  if (!hasRumbleSupport(gamepad)) {
    setUtilityStatus("utilityRumbleUnsupported");
    return;
  }

  try {
    if (gamepad.vibrationActuator?.playEffect) {
      await gamepad.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 180,
        weakMagnitude: 0.65,
        strongMagnitude: 1,
      });
    } else if (gamepad.hapticActuators?.length) {
      await gamepad.hapticActuators[0].pulse(0.85, 180);
    }

    state.guided.rumbleConfirmed = true;
    setUtilityStatus("utilityRumbleDone");
  } catch {
    setUtilityStatus("utilityRumbleUnsupported");
  }
}

function buildSupportMetricList(gamepad) {
  const installAvailable = Boolean(state.installPrompt) || isStandaloneMode();
  const shareAvailable = Boolean(navigator.share || navigator.clipboard?.writeText);
  const rumbleAvailable = Boolean(gamepad && hasRumbleSupport(gamepad));

  return [
    { label: t("supportInstall"), value: installAvailable ? t("supportedYes") : t("supportedNo") },
    { label: t("supportShare"), value: shareAvailable ? t("supportedYes") : t("supportedNo") },
    { label: t("supportRumble"), value: rumbleAvailable ? t("supportedYes") : t("supportedNo") },
  ];
}

function setUtilityStatus(key) {
  state.utilityStatusKey = key;
  dom.utilityStatus.textContent = t(key);
  updateInstallButton();
}

function updateInstallButton() {
  if (isStandaloneMode()) {
    dom.installBtn.disabled = true;
    dom.installBtn.textContent = t("installBtnInstalled");
  } else if (state.installPrompt) {
    dom.installBtn.disabled = false;
    dom.installBtn.textContent = t("installBtnText");
  } else {
    dom.installBtn.disabled = true;
    dom.installBtn.textContent = t("installBtnUnavailable");
  }
}

function isStandaloneMode() {
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

async function promptInstall() {
  if (!state.installPrompt) {
    setUtilityStatus(isStandaloneMode() ? "utilityInstalled" : "utilityInstallUnavailable");
    return;
  }

  try {
    await state.installPrompt.prompt();
    await state.installPrompt.userChoice;
    state.installPrompt = null;
    setUtilityStatus(isStandaloneMode() ? "utilityInstalled" : "utilityInstallReady");
  } catch {
    setUtilityStatus("utilityInstallUnavailable");
  }
}

function buildCurrentMetricsSnapshot() {
  const now = performance.now();
  const gamepad = getSelectedGamepad();
  if (!gamepad || !state.lastControllerInfo) {
    return null;
  }

  const timingMetrics = buildTimingMetricList(gamepad, now);
  return {
    controller: {
      model: state.lastControllerInfo.model,
      family: state.lastControllerInfo.familyLabel,
      hardwareIds: state.lastControllerInfo.hardwareIds,
      mapping: state.lastControllerInfo.mapping,
    },
    sticks: {
      leftIdle: state.stats.left.idleSamples ? state.stats.left.idleMagnitudeSum / state.stats.left.idleSamples : 0,
      rightIdle: state.stats.right.idleSamples ? state.stats.right.idleMagnitudeSum / state.stats.right.idleSamples : 0,
      leftPeak: state.stats.left.peak,
      rightPeak: state.stats.right.peak,
    },
    triggers: {
      leftPeak: state.triggerAnalytics.left.peak,
      rightPeak: state.triggerAnalytics.right.peak,
      leftStart: state.triggerAnalytics.left.firstActive,
      rightStart: state.triggerAnalytics.right.firstActive,
      leftLevels: state.triggerAnalytics.left.uniqueLevels.length,
      rightLevels: state.triggerAnalytics.right.uniqueLevels.length,
    },
    timing: Object.fromEntries(timingMetrics.map((metric) => [metric.label, metric.value])),
    samples: state.sampleCount,
  };
}

function buildSessionSummary() {
  const snapshot = buildCurrentMetricsSnapshot();
  if (!snapshot) {
    return null;
  }

  return [
    "PadPulse",
    `${snapshot.controller.model} | ${snapshot.controller.family}`,
    `${snapshot.controller.hardwareIds} | ${snapshot.controller.mapping}`,
    `${t("samplesLabel")}: ${snapshot.samples}`,
    `${t("idleAverage")} L: ${snapshot.sticks.leftIdle.toFixed(3)} | R: ${snapshot.sticks.rightIdle.toFixed(3)}`,
    `${t("triggerPeak")} L: ${Math.round(snapshot.triggers.leftPeak * 100)}% | R: ${Math.round(snapshot.triggers.rightPeak * 100)}%`,
    `${t("triggerStartThreshold")} L: ${snapshot.triggers.leftStart != null ? Math.round(snapshot.triggers.leftStart * 100) : 0}% | R: ${snapshot.triggers.rightStart != null ? Math.round(snapshot.triggers.rightStart * 100) : 0}%`,
  ].join("\n");
}

function saveCurrentSession(reason = "manual", silent = false) {
  const snapshot = buildCurrentMetricsSnapshot();
  const summary = buildSessionSummary();
  if (!snapshot || !summary) {
    if (!silent) {
      setUtilityStatus("utilityNeedController");
    }
    return;
  }

  const entry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    reason,
    timestamp: Date.now(),
    controller: snapshot.controller,
    samples: snapshot.samples,
    summary,
  };

  state.savedSessions.unshift(entry);
  state.savedSessions = state.savedSessions.slice(0, 25);
  saveStoredJson(SESSION_STORAGE_KEY, state.savedSessions);
  renderSavedSessions();

  if (!silent) {
    setUtilityStatus("utilitySaved");
  }
}

async function shareCurrentResult() {
  const summary = buildSessionSummary();
  if (!summary) {
    setUtilityStatus("utilityNeedController");
    return;
  }

  try {
    if (navigator.share) {
      await navigator.share({
        title: "PadPulse",
        text: summary,
        url: window.location.href,
      });
      setUtilityStatus("utilityShared");
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(summary);
      setUtilityStatus("utilityCopied");
      return;
    }
  } catch {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(summary);
      setUtilityStatus("utilityCopied");
      return;
    }
  }

  setUtilityStatus("utilityShareUnavailable");
}

function renderSavedSessions() {
  dom.savedSessionsList.innerHTML = "";

  if (!state.savedSessions.length) {
    dom.savedSessionsList.innerHTML = `<div class="empty-state">${t("historyEmpty")}</div>`;
    return;
  }

  state.savedSessions.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "session-card";
    card.innerHTML = `
      <h3>${escapeHtml(entry.controller.model)}</h3>
      <p class="session-meta">${escapeHtml(entry.reason === "manual" ? t("sessionManual") : t("sessionAutosaved"))} | ${t("savedAt")}: ${escapeHtml(formatDate(entry.timestamp))}</p>
      <pre class="session-summary">${escapeHtml(entry.summary)}</pre>
    `;
    dom.savedSessionsList.append(card);
  });
}

function clearCompatibilityRecords() {
  state.compatibilityRecords = [];
  state.lastCompatibilityKey = "";
  saveStoredJson(COMPAT_STORAGE_KEY, state.compatibilityRecords);
  renderCompatibilityTable();
  setUtilityStatus("utilityCompatibilityCleared");
}

function clearSavedSessions() {
  state.savedSessions = [];
  saveStoredJson(SESSION_STORAGE_KEY, state.savedSessions);
  renderSavedSessions();
  setUtilityStatus("utilitySessionsCleared");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
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
  dom.utilityStatus.textContent = t(state.utilityStatusKey);
  applyViewMode({ refreshEnvironment: false });
  updateInstallButton();
  renderCompatibilityTable();
  renderSavedSessions();
  renderGuidedTest();
  updateGamepadSelect();
  setActiveTab(state.activeTab);
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
  dom.leftTriggerAnalysisLabel.textContent = "L2 / LT";
  dom.rightTriggerAnalysisLabel.textContent = "R2 / RT";
  dom.leftTriggerValue.textContent = "0%";
  dom.rightTriggerValue.textContent = "0%";
  dom.leftTriggerAnalysisValue.textContent = "0%";
  dom.rightTriggerAnalysisValue.textContent = "0%";
  dom.leftTriggerFill.style.width = "0%";
  dom.rightTriggerFill.style.width = "0%";
  dom.buttonsGrid.innerHTML = "";
  state.buttons = [];
  state.lastControllerInfo = null;
  upsertMetrics(dom.leftStickMetrics, []);
  upsertMetrics(dom.rightStickMetrics, []);
  upsertMetrics(dom.timingMetrics, []);
  upsertMetrics(dom.leftTriggerMetrics, []);
  upsertMetrics(dom.rightTriggerMetrics, []);
  upsertMetrics(dom.supportMetrics, buildSupportMetricList(null));
  ctx.clearRect(0, 0, dom.historyCanvas.width, dom.historyCanvas.height);
  leftTriggerCtx.clearRect(0, 0, dom.leftTriggerCanvas.width, dom.leftTriggerCanvas.height);
  rightTriggerCtx.clearRect(0, 0, dom.rightTriggerCanvas.width, dom.rightTriggerCanvas.height);
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
  dom.leftTriggerAnalysisLabel.textContent = controllerInfo.leftTrigger;
  dom.rightTriggerAnalysisLabel.textContent = controllerInfo.rightTrigger;
  state.lastControllerInfo = controllerInfo;
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
  recordCompatibility(gamepad, controllerInfo);

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
  dom.leftStickStatus.textContent = leftStats.current > state.deadzone ? t("outsideDeadzone") : t("insideDeadzone");
  dom.rightStickStatus.textContent = rightStats.current > state.deadzone ? t("outsideDeadzone") : t("insideDeadzone");
  upsertMetrics(dom.leftStickMetrics, buildStickMetricList(leftStats, leftRaw, leftFiltered));
  upsertMetrics(dom.rightStickMetrics, buildStickMetricList(rightStats, rightRaw, rightFiltered));

  const leftTrigger = gamepad.buttons[6]?.value || 0;
  const rightTrigger = gamepad.buttons[7]?.value || 0;
  updateTriggerAnalytics("left", leftTrigger);
  updateTriggerAnalytics("right", rightTrigger);

  dom.leftTriggerValue.textContent = `${Math.round(leftTrigger * 100)}%`;
  dom.rightTriggerValue.textContent = `${Math.round(rightTrigger * 100)}%`;
  dom.leftTriggerAnalysisValue.textContent = `${Math.round(leftTrigger * 100)}%`;
  dom.rightTriggerAnalysisValue.textContent = `${Math.round(rightTrigger * 100)}%`;
  dom.leftTriggerFill.style.width = `${leftTrigger * 100}%`;
  dom.rightTriggerFill.style.width = `${rightTrigger * 100}%`;
  upsertMetrics(dom.leftTriggerMetrics, buildTriggerMetricList("left"));
  upsertMetrics(dom.rightTriggerMetrics, buildTriggerMetricList("right"));

  updateButtonsGrid(controllerInfo, gamepad.buttons);

  state.sampleCount += 1;
  dom.sampleCounter.textContent = String(state.sampleCount);
  pushHistoryValue(state.history.leftX, leftRaw.x);
  pushHistoryValue(state.history.leftY, leftRaw.y);
  pushHistoryValue(state.history.rightX, rightRaw.x);
  pushHistoryValue(state.history.rightY, rightRaw.y);

  captureTiming(gamepad, buildSignature(gamepad), now);
  upsertMetrics(dom.timingMetrics, buildTimingMetricList(gamepad, now));
  upsertMetrics(dom.supportMetrics, buildSupportMetricList(gamepad));

  updateGuidedTest(gamepad, leftRaw, rightRaw, leftTrigger, rightTrigger);
  renderGuidedTest();
  drawHistory();
  drawTriggerCharts();

  requestAnimationFrame(render);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

function bindInstallEvents() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPrompt = event;
    setUtilityStatus("utilityInstallReady");
  });

  window.addEventListener("appinstalled", () => {
    state.installPrompt = null;
    setUtilityStatus("utilityInstalled");
  });
}

function bindEvents() {
  window.addEventListener("gamepadconnected", () => {
    updateGamepadSelect();
  });

  window.addEventListener("gamepaddisconnected", () => {
    if (state.sampleCount > 60 && state.lastControllerInfo) {
      saveCurrentSession("autosave", true);
    }
    updateGamepadSelect();
    resetBaseline();
    resetMetrics();
    state.buttons = [];
    state.lastCompatibilityKey = "";
  });

  dom.gamepadSelect.addEventListener("change", (event) => {
    if (state.sampleCount > 60 && state.lastControllerInfo) {
      saveCurrentSession("autosave", true);
    }
    state.selectedIndex = event.target.value === "" ? null : Number(event.target.value);
    resetBaseline();
    resetMetrics();
    state.buttons = [];
    state.lastCompatibilityKey = "";
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

  dom.guidedStartBtn.addEventListener("click", () => {
    startGuidedTest();
  });

  dom.guidedResetBtn.addEventListener("click", () => {
    resetGuidedTest();
  });

  dom.langEsBtn.addEventListener("click", () => {
    changeLanguage("es");
  });

  dom.langEnBtn.addEventListener("click", () => {
    changeLanguage("en");
  });

  dom.viewModeSelect.addEventListener("change", (event) => {
    state.viewModePreference = VIEW_MODE_OPTIONS.includes(event.target.value) ? event.target.value : "auto";
    window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, state.viewModePreference);
    applyViewMode();
    renderCompatibilityTable();
  });

  dom.installBtn.addEventListener("click", () => {
    promptInstall();
  });

  dom.saveSessionBtn.addEventListener("click", () => {
    saveCurrentSession("manual");
  });

  dom.shareBtn.addEventListener("click", () => {
    shareCurrentResult();
  });

  dom.rumbleBtn.addEventListener("click", () => {
    runRumbleTest();
  });

  dom.clearCompatBtn.addEventListener("click", () => {
    clearCompatibilityRecords();
  });

  dom.clearSessionsBtn.addEventListener("click", () => {
    clearSavedSessions();
  });

  dom.tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab);
    });

    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        return;
      }

      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + dom.tabButtons.length) % dom.tabButtons.length;
      const nextButton = dom.tabButtons[nextIndex];
      setActiveTab(nextButton.dataset.tab);
      nextButton.focus();
    });
  });

  window.addEventListener("resize", () => {
    applyViewMode();
    renderCompatibilityTable();
    drawHistory();
    drawTriggerCharts();
  });
}

function init() {
  applyLanguageToUi();
  bindInstallEvents();
  bindEvents();
  registerServiceWorker();
  renderCompatibilityTable();
  renderSavedSessions();
  renderGuidedTest();
  updateInstallButton();
  setActiveTab(state.activeTab);
  setUtilityStatus(isStandaloneMode() ? "utilityInstalled" : "utilityIdle");
  updateGamepadSelect();
  setDisconnectedState();
  render();
}

init();
