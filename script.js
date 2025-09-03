/* ===== UI Elements ===== */
const ui = {
  title: document.getElementById("title"),
  sensorHeading: document.getElementById("sensorHeading"),
  recommendHeading: document.getElementById("recommendHeading"),
  irrigationHeading: document.getElementById("irrigationHeading"),
  yieldHeading: document.getElementById("yieldHeading"),
  marketHeading: document.getElementById("marketHeading"),
  temp: document.getElementById("temp"),
  humidity: document.getElementById("humidity"),
  moisture: document.getElementById("moisture"),
  ph: document.getElementById("ph"),
  npk: document.getElementById("npk"),
  recCrop: document.getElementById("recCrop"),
  recFert: document.getElementById("recFert"),
  pumpState: document.getElementById("pumpState"),
  turnOn: document.getElementById("turnOn"),
  turnOff: document.getElementById("turnOff"),
  marketBody: document.getElementById("marketBody"),
  langToggle: document.getElementById("langToggle"),
  yieldChart: document.getElementById("yieldChart")
};

/* ===== Language Translations ===== */
let currentLang = "en";

const translations = {
  en: {
    title: "Dhisasya - Intelligent Crop System",
    sensorHeading: "Live Sensor Data",
    recommendHeading: "Recommendations",
    irrigationHeading: "Irrigation Control",
    yieldHeading: "Expected Yield",
    marketHeading: "Market Prices",
    temp: "Temp",
    humidity: "Humidity",
    moisture: "Soil Moisture",
    ph: "Soil pH",
    npk: "NPK",
    cropRice: "Recommended Crop: Rice 🌾",
    cropTomato: "Recommended Crop: Tomato 🍅",
    cropMaize: "Recommended Crop: Maize 🌽",
    fertHighN: "Fertilizer: Urea (High N)",
    fertBalanced: "Fertilizer: NPK 10-10-10",
    fertHighK: "Fertilizer: Potash + NPK",
    pumpOn: "Pump Status: ON ✅",
    pumpOff: "Pump Status: OFF ❌",
    btnOn: "Turn ON Pump",
    btnOff: "Turn OFF Pump"
  },
  kn: {
    title: "ಧಿಸಸ್ಯ - ಬುದ್ಧಿವಂತ ಬೆಳೆ ವ್ಯವಸ್ಥೆ",
    sensorHeading: "ನೇರ ಸಂವೇದಕ ಡೇಟಾ",
    recommendHeading: "ಶಿಫಾರಸುಗಳು",
    irrigationHeading: "ನೀರಾವರಿ ನಿಯಂತ್ರಣ",
    yieldHeading: "ಅಪೇಕ್ಷಿತ ಉತ್ಪಾದನೆ",
    marketHeading: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    temp: "ತಾಪಮಾನ",
    humidity: "ಆದ್ರತೆ",
    moisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    ph: "ಮಣ್ಣಿನ pH",
    npk: "NPK",
    cropRice: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ: ಅಕ್ಕಿ 🌾",
    cropTomato: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ: ಟೊಮ್ಯಾಟೊ 🍅",
    cropMaize: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ: ಜೋಳ 🌽",
    fertHighN: "ಗೊಬ್ಬರ: ಯೂರಿಯಾ (ಹೆಚ್ಚು N)",
    fertBalanced: "ಗೊಬ್ಬರ: NPK 10-10-10",
    fertHighK: "ಗೊಬ್ಬರ: ಪೊಟಾಶ್ + NPK",
    pumpOn: "ಪಂಪ್ ಸ್ಥಿತಿ: ON ✅",
    pumpOff: "ಪಂಪ್ ಸ್ಥಿತಿ: OFF ❌",
    btnOn: "ಪಂಪ್ ಆನ್ ಮಾಡಿ",
    btnOff: "ಪಂಪ್ ಆಫ್ ಮಾಡಿ"
  }
};

/* ===== Language Switch ===== */
function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  ui.title.textContent = t.title;
  ui.sensorHeading.textContent = t.sensorHeading;
  ui.recommendHeading.textContent = t.recommendHeading;
  ui.irrigationHeading.textContent = t.irrigationHeading;
  ui.yieldHeading.textContent = t.yieldHeading;
  ui.marketHeading.textContent = t.marketHeading;
  ui.turnOn.textContent = t.btnOn;
  ui.turnOff.textContent = t.btnOff;
}

/* ===== Dummy Sensor Data ===== */
function getSensorData() {
  return {
    temp: (20 + Math.random() * 10).toFixed(1),
    humidity: (40 + Math.random() * 20).toFixed(1),
    moisture: (30 + Math.random() * 50).toFixed(1),
    ph: (5 + Math.random() * 2).toFixed(2),
    npk: {
      n: Math.floor(Math.random() * 100),
      p: Math.floor(Math.random() * 100),
      k: Math.floor(Math.random() * 100)
    }
  };
}

/* ===== Crop & Fertilizer Recommendation ===== */
function recommend(data) {
  const t = translations[currentLang];
  if (data.moisture > 60 && data.ph < 6.5 && data.npk.n > 50) {
    ui.recCrop.textContent = t.cropRice;
    ui.recFert.textContent = t.fertHighN;
  } else if (data.ph > 6.5 && data.moisture > 40) {
    ui.recCrop.textContent = t.cropTomato;
    ui.recFert.textContent = t.fertBalanced;
  } else {
    ui.recCrop.textContent = t.cropMaize;
    ui.recFert.textContent = t.fertHighK;
  }
}

/* ===== Update Dashboard ===== */
function updateDashboard() {
  const data = getSensorData();
  const t = translations[currentLang];

  ui.temp.textContent = `${t.temp}: ${data.temp} °C`;
  ui.humidity.textContent = `${t.humidity}: ${data.humidity} %`;
  ui.moisture.textContent = `${t.moisture}: ${data.moisture} %`;
  ui.ph.textContent = `${t.ph}: ${data.ph}`;
  ui.npk.textContent = `${t.npk}: N=${data.npk.n}, P=${data.npk.p}, K=${data.npk.k}`;

  recommend(data);
}

/* ===== Irrigation ===== */
ui.turnOn.addEventListener("click", () => {
  ui.pumpState.textContent = translations[currentLang].pumpOn;
});
ui.turnOff.addEventListener("click", () => {
  ui.pumpState.textContent = translations[currentLang].pumpOff;
});

/* ===== Yield Chart ===== */
function drawChart() {
  new Chart(ui.yieldChart, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{
        label: "Yield (t/ha)",
        data: [12, 15, 18, 20, 19, 22],
        borderColor: "#2e7d32",
        backgroundColor: "rgba(46, 125, 50, 0.2)",
        fill: true,
        tension: 0.3
      }]
    }
  });
}

/* ===== Market Prices ===== */
function loadMarketPrices() {
  const crops = [
    { name: "Rice 🌾", price: 3200 },
    { name: "Tomato 🍅", price: 2500 },
    { name: "Maize 🌽", price: 2200 }
  ];
  ui.marketBody.innerHTML = "";
  crops.forEach(crop => {
    const row = `<tr><td>${crop.name}</td><td>${crop.price}</td></tr>`;
    ui.marketBody.innerHTML += row;
  });
}

/* ===== Init ===== */
ui.langToggle.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "kn" : "en");
  updateDashboard();
});

setLanguage("en");
setInterval(updateDashboard, 4000);
updateDashboard();
drawChart();
loadMarketPrices();
