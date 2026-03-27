const MAX_HISTORY = 180;
const BUTTON_COUNT = 18;

const dom = {
  calibrateBtn: document.getElementById("calibrateBtn"),
  resetBtn: document.getElementById("resetBtn"),
  gamepadSelect: document.getElementById("gamepadSelect"),
  deadzoneRange: document.getElementById("deadzoneRange"),
  deadzoneValue: document.getElementById("deadzoneValue"),
  connectionState: document.getElementById("connectionState"),
  controllerType: document.getElementById("controllerType"),
  mappingState: document.getElementById("mappingState"),
  sampleCounter: document.getElementById("sampleCounter"),
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
};

const state = {
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
};

const ctx = dom.historyCanvas.getContext("2d");

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

function labelSetForGamepad(id) {
  const normalized = (id || "").toLowerCase();
  if (normalized.includes("playstation") || normalized.includes("wireless controller") || normalized.includes("sony")) {
    return {
      type: "PlayStation",
      leftTrigger: "L2",
      rightTrigger: "R2",
      buttons: [
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
    };
  }

  if (normalized.includes("xbox") || normalized.includes("xinput") || normalized.includes("microsoft")) {
    return {
      type: "Xbox",
      leftTrigger: "LT",
      rightTrigger: "RT",
      buttons: [
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
  }

  return {
    type: "Gamepad generico",
    leftTrigger: "Trigger L",
    rightTrigger: "Trigger R",
    buttons: Array.from({ length: BUTTON_COUNT }, (_, index) => `Boton ${index}`),
  };
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
    option.textContent = "Sin mandos";
    option.value = "";
    dom.gamepadSelect.append(option);
    state.selectedIndex = null;
    return;
  }

  connected.forEach((pad) => {
    const option = document.createElement("option");
    option.value = String(pad.index);
    option.textContent = `#${pad.index} - ${shortenId(pad.id)}`;
    dom.gamepadSelect.append(option);
  });

  const hasPrevious = connected.some((pad) => pad.index === previousValue);
  state.selectedIndex = hasPrevious ? previousValue : connected[0].index;
  dom.gamepadSelect.value = String(state.selectedIndex);
}

function shortenId(id) {
  if (!id) {
    return "Controlador desconocido";
  }
  return id.length > 52 ? `${id.slice(0, 49)}...` : id;
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

function updateButtonsGrid(labels, buttons) {
  if (!state.buttons.length) {
    dom.buttonsGrid.innerHTML = "";
    labels.buttons.forEach((label, index) => {
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
    buttonNode.querySelector("span").textContent = labels.buttons[index] || `Boton ${index}`;
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
  for (let i = 0; i < 5; i += 1) {
    const y = (cssHeight / 4) * i;
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

function setDisconnectedState() {
  dom.connectionState.textContent = "Sin mando conectado";
  dom.controllerType.textContent = "No detectado";
  dom.mappingState.textContent = "-";
  dom.sampleCounter.textContent = "0";
  dom.leftStickStatus.textContent = "Conecta un mando para empezar";
  dom.rightStickStatus.textContent = "Conecta un mando para empezar";
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

function render() {
  const gamepad = getSelectedGamepad();
  if (!gamepad) {
    setDisconnectedState();
    requestAnimationFrame(render);
    return;
  }

  const labels = labelSetForGamepad(gamepad.id);
  const now = performance.now();

  dom.connectionState.textContent = `Conectado (#${gamepad.index})`;
  dom.controllerType.textContent = labels.type;
  dom.mappingState.textContent = gamepad.mapping || "sin mapping";
  dom.leftTriggerLabel.textContent = labels.leftTrigger;
  dom.rightTriggerLabel.textContent = labels.rightTrigger;

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

  dom.leftStickStatus.textContent = leftStats.current > state.deadzone ? "Entrada fuera de la zona muerta" : "Reposo / dentro de zona muerta";
  dom.rightStickStatus.textContent = rightStats.current > state.deadzone ? "Entrada fuera de la zona muerta" : "Reposo / dentro de zona muerta";

  upsertMetrics(dom.leftStickMetrics, [
    { label: "X crudo", value: formatSigned(leftRaw.x) },
    { label: "Y crudo", value: formatSigned(leftRaw.y) },
    { label: "Magnitud", value: leftStats.current.toFixed(3) },
    { label: "Pico", value: leftStats.peak.toFixed(3) },
    { label: "Promedio en reposo", value: leftStats.idleAverage.toFixed(3) },
    { label: "Filtrado", value: `${formatSigned(leftFiltered.x)} / ${formatSigned(leftFiltered.y)}` },
  ]);

  upsertMetrics(dom.rightStickMetrics, [
    { label: "X crudo", value: formatSigned(rightRaw.x) },
    { label: "Y crudo", value: formatSigned(rightRaw.y) },
    { label: "Magnitud", value: rightStats.current.toFixed(3) },
    { label: "Pico", value: rightStats.peak.toFixed(3) },
    { label: "Promedio en reposo", value: rightStats.idleAverage.toFixed(3) },
    { label: "Filtrado", value: `${formatSigned(rightFiltered.x)} / ${formatSigned(rightFiltered.y)}` },
  ]);

  const leftTrigger = gamepad.buttons[6]?.value || 0;
  const rightTrigger = gamepad.buttons[7]?.value || 0;

  dom.leftTriggerValue.textContent = `${Math.round(leftTrigger * 100)}%`;
  dom.rightTriggerValue.textContent = `${Math.round(rightTrigger * 100)}%`;
  dom.leftTriggerFill.style.width = `${leftTrigger * 100}%`;
  dom.rightTriggerFill.style.width = `${rightTrigger * 100}%`;

  updateButtonsGrid(labels, gamepad.buttons);

  state.sampleCount += 1;
  dom.sampleCounter.textContent = String(state.sampleCount);
  pushAxisHistory({ left: leftRaw, right: rightRaw });

  const signature = buildSignature(gamepad);
  captureTiming(gamepad, signature, now);
  drawHistory();

  const avgFrameDelta = average(state.timing.frameDeltaHistory);
  const pollHz = avgFrameDelta > 0 ? 1000 / avgFrameDelta : 0;
  const frameJitter = standardDeviation(state.timing.frameDeltaHistory);
  const estimatedLatency = average(state.timing.estimatedLatencyHistory);
  const lastVisibleChange = state.timing.lastInputChange ? now - state.timing.lastInputChange : 0;

  upsertMetrics(dom.timingMetrics, [
    { label: "Polling estimado", value: pollHz ? `${pollHz.toFixed(1)} Hz` : "-" },
    { label: "Frame medio", value: avgFrameDelta ? `${avgFrameDelta.toFixed(2)} ms` : "-" },
    { label: "Jitter", value: `${frameJitter.toFixed(2)} ms` },
    { label: "Retardo estimado", value: estimatedLatency ? `${estimatedLatency.toFixed(2)} ms` : "No disponible" },
    { label: "Ultimo cambio visible", value: `${lastVisibleChange.toFixed(1)} ms` },
    { label: "Timestamp", value: gamepad.timestamp ? `${gamepad.timestamp.toFixed(1)} ms` : "No expuesto" },
  ]);

  requestAnimationFrame(render);
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

  window.addEventListener("resize", () => {
    drawHistory();
  });
}

function init() {
  updateGamepadSelect();
  bindEvents();
  render();
}

init();
