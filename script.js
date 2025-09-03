// ===============================
// Irrigation Pump Controls
// ===============================
function turnOnPump() {
  alert("✅ Irrigation pump turned ON 🌱💧");
  document.getElementById("pump-status").innerText = "Pump: ON";
}

function turnOffPump() {
  alert("❌ Irrigation pump turned OFF");
  document.getElementById("pump-status").innerText = "Pump: OFF";
}

// ===============================
// Yield Estimation Chart
// ===============================
const yieldCtx = document.getElementById("yieldChart");
new Chart(yieldCtx, {
  type: "line",
  data: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{
      label: "Estimated Yield (kg)",
      data: [10, 20, 35, 50],
      borderColor: "#2e7d32",
      borderWidth: 2,
      fill: true,
      backgroundColor: "rgba(46,125,50,0.2)",
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: "#2e7d32" }
      }
    }
  }
});

// ===============================
// Market Prices Chart
// ===============================
const marketCtx = document.getElementById("marketChart");
new Chart(marketCtx, {
  type: "bar",
  data: {
    labels: ["Tomato", "Onion", "Wheat", "Rice"],
    datasets: [{
      label: "Market Price (₹/kg)",
      data: [30, 25, 22, 18],
      backgroundColor: ["#66bb6a","#43a047","#2e7d32","#1b5e20"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#2e7d32" }
      },
      x: {
        ticks: { color: "#2e7d32" }
      }
    }
  }
});
