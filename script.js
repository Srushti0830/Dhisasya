/* ========= Demo Sensor Simulation ========= */
const ui = {
  temp: document.getElementById("temp"),
  humidity: document.getElementById("humidity"),
  moisture: document.getElementById("moisture"),
  ph: document.getElementById("ph"),
  recCrop: document.getElementById("recCrop"),
  recFert: document.getElementById("recFert"),
  simulateOnceBtn: document.getElementById("simulateOnceBtn"),
  toggleSimBtn: document.getElementById("toggleSimBtn"),
  recalcBtn: document.getElementById("recalcBtn"),
  modeLabel: document.getElementById("modeLabel"),
  pumpState: document.getElementById("pumpState"),
  flowRate: document.getElementById("flowRate"),
  flowInput: document.getElementById("flowInput"),
  setFlowBtn: document.getElementById("setFlowBtn"),
  pumpOnBtn: document.getElementById("pumpOnBtn"),
  pumpOffBtn: document.getElementById("pumpOffBtn"),
  autoModeChk: document.getElementById("autoModeChk"),
};

const sensor = {
  temp: 27.5,
  humidity: 62,
  moisture: 48,
  ph: 6.6,
};

let simTimer = null;

/** Randomize one set of sensor values */
function simulateOnce() {
  sensor.temp = +(22 + Math.random() * 13).toFixed(1);      // 22–35 °C
  sensor.humidity = +(40 + Math.random() * 50).toFixed(1);  // 40–90 %
  sensor.moisture = +(20 + Math.random() * 70).toFixed(1);  // 20–90 %
  sensor.ph = +(5.0 + Math.random() * 3).toFixed(2);        // 5.00–8.00
  paintSensors();
}

/** Start/stop auto simulation */
function toggleSim() {
  if (simTimer) {
    clearInterval(simTimer);
    simTimer = null;
    ui.toggleSimBtn.textContent = "Start Auto-Sim";
  } else {
    simTimer = setInterval(() => {
      simulateOnce();
      if (water.mode === "auto") autoWaterLogic();
      updateRecommendations();
      updateCharts();
    }, 3000);
    ui.toggleSimBtn.textContent = "Stop Auto-Sim";
  }
}

/** Paint sensors to UI */
function paintSensors() {
  ui.temp.textContent = sensor.temp.toFixed(1);
  ui.humidity.textContent = sensor.humidity.toFixed(1);
  ui.moisture.textContent = sensor.moisture.toFixed(1);
  ui.ph.textContent = sensor.ph.toFixed(2);
}

/* ========= Recommendation Logic ========= */
/**
 * Very simple rule-based crop recommendation
 * Based on temp (°C), humidity (%), soil moisture (%), pH
 */
function recommendCrop({ temp, humidity, moisture, ph }) {
  // Tomato: warm, moderate humidity, neutral pH
  if (temp >= 20 && temp <= 32 && humidity >= 40 && humidity <= 80 && ph >= 6 && ph <= 7.5) {
    return "Tomato";
  }
  // Maize: warm, slightly acidic to neutral, medium moisture
  if (temp >= 18 && temp <= 34 && ph >= 5.5 && ph <= 7.2 && moisture >= 35) {
    return "Maize";
  }
  // Rice: high moisture
  if (moisture >= 60 && temp >= 22) {
    return "Rice";
  }
  // Wheat: cooler & neutral
  if (temp <= 25 && ph >= 6 && ph <= 7.5) {
    return "Wheat";
  }
  return "Finger Millet (Ragi)";
}

const fertilizerByCrop = {
  Tomato: "NPK 10-10-10 (balanced) + micronutrients",
  Maize: "NPK 12-32-16 (basal) + Urea topdressing",
  Rice: "NPK 12-32-16 + Urea split doses",
  Wheat: "Urea + DAP (balanced N & P)",
  "Finger Millet (Ragi)": "NPK 8-20-10 (basal) + urea",
};

function updateRecommendations() {
  const crop = recommendCrop(sensor);
  ui.recCrop.textContent = crop;
  ui.recFert.textContent = fertilizerByCrop[crop] || "Balanced NPK";

  // refresh charts according to crop
  updateCharts();
}

/* ========= Water Control (Simulated) ========= */
const water = {
  mode: "manual", // 'manual' | 'auto'
  pumpOn: false,
  flow: 0, // L/h
};

function paintWater() {
  ui.modeLabel.textContent = water.mode === "auto" ? "Auto" : "Manual";
  ui.pumpState.textContent = water.pumpOn ? "ON" : "OFF";
  ui.pumpState.style.color = water.pumpOn ? "green" : "crimson";
  ui.flowRate.textContent = water.flow;
  ui.autoModeChk.checked = water.mode === "auto";
}

function setManualFlow() {
  let v = parseInt(ui.flowInput.value || "0", 10);
  if (Number.isNaN(v)) v = 0;
  v = Math.min(100, Math.max(0, v));
  water.flow = v;
  paintWater();
  alert(`(Demo) Flow set to ${v} L/h`);
}

function pumpOn() {
  water.pumpOn = true;
  if (water.flow === 0) water.flow = 20;
  paintWater();
  alert("(Demo) Pump turned ON");
}

function pumpOff() {
  water.pumpOn = false;
  paintWater();
  alert("(Demo) Pump turned OFF");
}

function setAutoMode(enabled) {
  water.mode = enabled ? "auto" : "manual";
  paintWater();
  if (enabled) {
    autoWaterLogic(); // evaluate immediately
  }
}

/** Simple hysteresis: ON < 35% moisture, OFF > 55% moisture */
function autoWaterLogic() {
  if (sensor.moisture < 35 && !water.pumpOn) {
    water.pumpOn = true;
    water.flow = 35;
  } else if (sensor.moisture > 55 && water.pumpOn) {
    water.pumpOn = false;
  }
  paintWater();
}

/* ========= Charts ========= */
let yieldChart, marketChart;

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const priceByCrop = {
  Tomato: [18, 20, 25, 30, 28, 24],
  Maize: [20, 19, 21, 22, 23, 22],
  Rice: [34, 33, 35, 36, 34, 35],
  Wheat: [29, 28, 30, 31, 30, 29],
  "Finger Millet (Ragi)": [32, 31, 33, 35, 34, 33],
};

function randomSeries(len, base, jitter) {
  const out = [];
  let v = base;
  for (let i = 0; i < len; i++) {
    v = v + (Math.random() * jitter - jitter / 2);
    out.push(+v.toFixed(1));
  }
  return out;
}

function updateCharts() {
  const crop = ui.recCrop.textContent || "Tomato";

  // YIELD chart (line)
  const ctxYield = document.getElementById("yieldChart").getContext("2d");
  const dataYield = randomSeries(12, 18, 5); // dummy tons/ha
  if (yieldChart) yieldChart.destroy();
  yieldChart = new Chart(ctxYield, {
    type: "line",
    data: {
      labels: monthLabels,
      datasets: [{ label: `Expected Yield for ${crop} (t/ha)`, data: dataYield }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // MARKET chart (bar) for a set of crops, highlight recommended
  const ctxMarket = document.getElementById("marketChart").getContext("2d");
  const crops = ["Tomato", "Maize", "Rice", "Wheat", "Finger Millet (Ragi)"];
  const values = crops.map(c => {
    const arr = priceByCrop[c] || [20, 20, 20, 20, 20, 20];
    return arr[arr.length - 1]; // last month price
  });

  if (marketChart) marketChart.destroy();
  marketChart = new Chart(ctxMarket, {
    type: "bar",
    data: {
      labels: crops,
      datasets: [{ label: "Market Price (₹/kg)", data: values }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      },
      scales: { y: { beginAtZero: true } }
    }
  });
}

/* ========= Wire up UI ========= */
ui.simulateOnceBtn.addEventListener("click", () => {
  simulateOnce();
  if (water.mode === "auto") autoWaterLogic();
  updateRecommendations();
});

ui.toggleSimBtn.addEventListener("click", toggleSim);
ui.recalcBtn.addEventListener("click", updateRecommendations);
ui.setFlowBtn.addEventListener("click", setManualFlow);
ui.pumpOnBtn.addEventListener("click", pumpOn);
ui.pumpOffBtn.addEventListener("click", pumpOff);
ui.autoModeChk.addEventListener("change", (e) => setAutoMode(e.target.checked));

/* ========= First paint ========= */
paintSensors();
updateRecommendations();
updateCharts();
