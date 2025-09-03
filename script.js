/* ====== UI Elements ====== */
const ui = {
  temp: document.getElementById("temp"),
  humidity: document.getElementById("humidity"),
  moisture: document.getElementById("moisture"),
  ph: document.getElementById("ph"),
  recCrop: document.getElementById("recCrop"),
  recFert: document.getElementById("recFert"),
  pumpState: document.getElementById("pumpState"),
  yieldChart: document.getElementById("yieldChart"),
  turnOn: document.getElementById("turnOn"),
  turnOff: document.getElementById("turnOff")
};

/* ====== Generate Dummy Sensor Data ====== */
function getSensorData() {
  return {
    temp: (20 + Math.random() * 10).toFixed(1),
    humidity: (40 + Math.random() * 20).toFixed(1),
    moisture: (30 + Math.random() * 50).toFixed(1),
    ph: (5 + Math.random() * 2).toFixed(2)
  };
}

/* ====== Update Dashboard ====== */
function updateDashboard() {
  const data = getSensorData();
  ui.temp.textContent = `${data.temp} °C`;
  ui.humidity.textContent = `${data.humidity} %`;
  ui.moisture.textContent = `${data.moisture} %`;
  ui.ph.textContent = data.ph;

  // Simple crop recommendation logic
  if (data.moisture > 50 && data.ph > 6) {
    ui.recCrop.textContent = "Recommended Crop: Tomato 🍅";
    ui.recFert.textContent = "Fertilizer: NPK 10-10-10 + Micronutrients";
  } else {
    ui.recCrop.textContent = "Recommended Crop: Maize 🌽";
    ui.recFert.textContent = "Fertilizer: Urea + Potash";
  }
}

/* ====== Irrigation Controls ====== */
ui.turnOn.addEventListener("click", () => {
  ui.pumpState.textContent = "Pump Status: ON ✅";
});

ui.turnOff.addEventListener("click", () => {
  ui.pumpState.textContent = "Pump Status: OFF ❌";
});

/* ====== Yield Chart ====== */
function drawChart() {
  new Chart(ui.yieldChart, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{
        label: "Expected Yield (t/ha)",
        data: [10, 14, 18, 20, 17, 22],
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46, 125, 50, 0.2)",
        fill: true,
        tension: 0.3
      }]
    }
  });
}

/* ====== Init ====== */
setInterval(updateDashboard, 4000); // Auto-refresh every 4s
updateDashboard();
drawChart();
