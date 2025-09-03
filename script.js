/* ====== UI Elements ====== */
const ui = {
  title: document.getElementById("title"),
  sensorHeading: document.getElementById("sensorHeading"),
  recommendHeading: document.getElementById("recommendHeading"),
  irrigationHeading: document.getElementById("irrigationHeading"),
  yieldHeading: document.getElementById("yieldHeading"),
  temp: document.getElementById("temp"),
  humidity: document.getElementById("humidity"),
  moisture: document.getElementById("moisture"),
  ph: document.getElementById("ph"),
  recCrop: document.getElementById("recCrop"),
  recFert: document.getElementById("recFert"),
  pumpState: document.getElementById("pumpState"),
  turnOn: document.getElementById("turnOn"),
  turnOff: document.getElementById("turnOff"),
  yieldChart: document.getElementById("yieldChart"),
  langToggle: document.getElementById("langToggle"),
};

/* ====== Translations ====== */
let currentLang = "en";

const translations = {
  en: {
    title: "Dhisasya - Intelligent Crop System",
    sensorHeading: "Live Sensor Data",
    recommendHeading: "Recommendations",
    irrigationHeading: "Irrigation Control",
    yieldHeading: "Expected Yield",
    temp: "Temp",
    humidity: "Humidity",
    moisture: "Soil Moisture",
    ph: "pH",
    cropTomato: "Recommended Crop: Tomato 🍅",
    cropMaize: "Recommended Crop: Maize 🌽",
    fertTomato: "Fertilizer: NPK 10-10-10 + Micronutrients",
    fertMaize: "Fertilizer: Urea + Potash",
    pumpOn: "Pump Status: ON ✅",
    pumpOff: "Pump Status: OFF ❌",
    btnOn: "Turn ON Pump",
    btnOff: "Turn OFF Pump",
  },
  kn: {
    title: "ಧಿಸಸ್ಯ - ಬುದ್ಧಿವಂತ ಬೆಳೆ ವ್ಯವಸ್ಥೆ",
    sensorHeading: "ನೇರ ಸಂವೇದಕ ಡೇಟಾ",
    recommendHeading: "ಶಿಫಾರಸುಗಳು",
    irrigationHeading: "ನೀರಾವರಿ ನಿಯಂತ್ರಣ",
    yieldHeading: "ಅಪೇಕ್ಷಿತ ಉತ್ಪಾದನೆ",
    temp: "ತಾಪಮಾನ",
    humidity: "ಆದ್ರತೆ",
    moisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    ph: "pH",
    cropTomato: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ: ಟೊಮ್ಯಾಟೊ 🍅",
    cropMaize: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ: ಜೋಳ 🌽",
    fertTomato: "ಗೊಬ್ಬರ: NPK 10-10-10 + ಸಣ್ಣ ಅಂಶಗಳು",
    fertMaize: "ಗೊಬ್ಬರ: ಯೂರಿಯಾ + ಪೊಟಾಶ್",
    pumpOn: "ಪಂಪ್ ಸ್ಥಿತಿ: ON ✅",
    pumpOff: "ಪಂಪ್ ಸ್ಥಿತಿ: OFF ❌",
    btnOn: "ಪಂಪ್ ಆನ್ ಮಾಡಿ",
    btnOff: "ಪಂಪ್ ಆಫ್ ಮಾಡಿ",
  }
};

/* ====== Apply Translations ====== */
function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  ui.title.textContent = t.title;
  ui.sensorHeading.textContent = t.sensorHeading;
  ui.recommendHeading.textContent = t.recommendHeading;
  ui.irrigationHeading.textContent = t.irrigationHeading;
  ui.yieldHeading.textContent = t.yieldHeading;
  ui.turnOn.textContent = t.btnOn;
  ui.turnOff.textContent = t.btnOff;
}

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
  const t = translations[currentLang];

  ui.temp.textContent = `${t.temp}: ${data.temp} °C`;
  ui.humidity.textContent = `${t.humidity}: ${data.humidity} %`;
  ui.moisture.textContent = `${t.moisture}: ${data.moisture} %`;
  ui.ph.textContent = `${t.ph}: ${data.ph}`;

  if (data.moisture > 50 && data.ph > 6) {
    ui.recCrop.textContent = t.cropTomato;
    ui.recFert.textContent = t.fertTomato;
  } else {
    ui.recCrop.textContent = t.cropMaize;
    ui.recFert.textContent = t.fertMaize;
  }
}

/* ====== Irrigation Controls ====== */
ui.turnOn.addEventListener("click", () => {
  ui.pumpState.textContent = translations[currentLang].pumpOn;
});

ui.turnOff.addEventListener("click", () => {
  ui.pumpState.textContent = translations[currentLang].pumpOff;
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

/* ====== Language Toggle ====== */
ui.langToggle.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "kn" : "en");
  updateDashboard();
});

/* ====== Init ====== */
setLanguage("en");
setInterval(updateDashboard, 4000);
updateDashboard();
drawChart();
