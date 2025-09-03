/* =============================
   Global Language Switching
============================= */
let currentLang = "en";

const translations = {
  en: {
    title: "Dhisasya - Intelligent Crop System",
    cropHeading: "Crop Recommendation",
    fertHeading: "Fertilizer Recommendation",
    yieldHeading: "Yield Prediction Graph",
    marketHeading: "Market Prices",
    waterHeading: "Water Flow Control",
    diseaseHeading: "Disease Recognition",
    checkCrop: "Check Crop",
    recommendFert: "Recommend Fertilizer",
    pumpOn: "Turn ON Pump",
    pumpOff: "Turn OFF Pump"
  },
  kn: {
    title: "ಧಿಸಸ್ಯ - ಬುದ್ಧಿವಂತ ಬೆಳೆ ವ್ಯವಸ್ಥೆ",
    cropHeading: "ಬೆಳೆ ಶಿಫಾರಸು",
    fertHeading: "ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು",
    yieldHeading: "ಉತ್ಪಾದನಾ ಪೂರ್ವಾನುಮಾನ ಚಾರ್ಟ್",
    marketHeading: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    waterHeading: "ನೀರಿನ ಹರಿವು ನಿಯಂತ್ರಣ",
    diseaseHeading: "ರೋಗ ಗುರುತಿಸುವಿಕೆ",
    checkCrop: "ಬೆಳೆ ಪರಿಶೀಲಿಸಿ",
    recommendFert: "ರಸಗೊಬ್ಬರ ಶಿಫಾರಸು",
    pumpOn: "ಪಂಪ್ ಆನ್ ಮಾಡಿ",
    pumpOff: "ಪಂಪ್ ಆಫ್ ಮಾಡಿ"
  }
};

const ui = {
  title: document.getElementById("title"),
  cropHeading: document.getElementById("cropHeading"),
  fertHeading: document.getElementById("fertHeading"),
  yieldHeading: document.getElementById("yieldHeading"),
  marketHeading: document.getElementById("marketHeading"),
  waterHeading: document.getElementById("waterHeading"),
  diseaseHeading: document.getElementById("diseaseHeading"),
  checkCrop: document.getElementById("checkCrop"),
  recommendFert: document.getElementById("recommendFert"),
  pumpOn: document.getElementById("pumpOn"),
  pumpOff: document.getElementById("pumpOff")
};

function setLanguage(lang) {
  currentLang = lang;
  ui.title.textContent = translations[lang].title;
  ui.cropHeading.textContent = translations[lang].cropHeading;
  ui.fertHeading.textContent = translations[lang].fertHeading;
  ui.yieldHeading.textContent = translations[lang].yieldHeading;
  ui.marketHeading.textContent = translations[lang].marketHeading;
  ui.waterHeading.textContent = translations[lang].waterHeading;
  ui.diseaseHeading.textContent = translations[lang].diseaseHeading;
  ui.checkCrop.textContent = translations[lang].checkCrop;
  ui.recommendFert.textContent = translations[lang].recommendFert;
  ui.pumpOn.textContent = translations[lang].pumpOn;
  ui.pumpOff.textContent = translations[lang].pumpOff;
}

/* =============================
   Crop Recommendation
============================= */
document.getElementById("checkCrop").addEventListener("click", function () {
  const n = document.getElementById("n").value;
  const p = document.getElementById("p").value;
  const k = document.getElementById("k").value;

  let crop;
  if (n > 80 && p > 40) crop = currentLang === "en" ? "Maize 🌽" : "ಮೆಕ್ಕೆಜೋಳ 🌽";
  else if (n > 60 && k > 40) crop = currentLang === "en" ? "Rice 🌾" : "ಅಕ್ಕಿ 🌾";
  else crop = currentLang === "en" ? "Wheat 🌿" : "ಗೋಧಿ 🌿";

  document.getElementById("cropResult").textContent =
    (currentLang === "en" ? "Recommended Crop: " : "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ: ") + crop;
});

/* =============================
   Fertilizer Recommendation
============================= */
document.getElementById("recommendFert").addEventListener("click", function () {
  const n = document.getElementById("n").value;
  const p = document.getElementById("p").value;
  const k = document.getElementById("k").value;

  let fert;
  if (n < 50) fert = currentLang === "en" ? "Add Urea (Nitrogen)" : "ಯೂರಿಯಾ ಸೇರಿಸಿ (ನೈಟ್ರೋಜನ್)";
  else if (p < 30) fert = currentLang === "en" ? "Add DAP (Phosphorus)" : "ಡಿಎಪಿ ಸೇರಿಸಿ (ಫಾಸ್ಫರಸ್)";
  else if (k < 30) fert = currentLang === "en" ? "Add MOP (Potassium)" : "ಎಂಪಿಒಪಿ ಸೇರಿಸಿ (ಪೊಟ್ಯಾಸಿಯಂ)";
  else fert = currentLang === "en" ? "Balanced fertilizer is sufficient" : "ಸಮತೋಲನ ರಸಗೊಬ್ಬರ ಸಾಕಷ್ಟು";

  document.getElementById("fertResult").textContent = fert;
});

/* =============================
   Yield Graph (Demo)
============================= */
const ctx = document.getElementById("yieldChart").getContext("2d");
const yieldChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["2021", "2022", "2023", "2024"],
    datasets: [{
      label: "Yield (Quintals per Acre)",
      data: [20, 25, 23, 30],
      borderWidth: 2,
      fill: false,
      tension: 0.3
    }]
  }
});

/* =============================
   Market Prices (Demo)
============================= */
const marketData = [
  { crop: "Rice", price: "₹2200/qtl" },
  { crop: "Wheat", price: "₹2000/qtl" },
  { crop: "Maize", price: "₹1800/qtl" }
];

const tableBody = document.getElementById("marketTable");
marketData.forEach(item => {
  const row = `<tr><td>${item.crop}</td><td>${item.price}</td></tr>`;
  tableBody.innerHTML += row;
});

/* =============================
   Water Flow Control
============================= */
document.getElementById("pumpOn").addEventListener("click", () => {
  alert(currentLang === "en" ? "Pump is turned ON 🚰" : "ಪಂಪ್ ಆನ್ ಆಗಿದೆ 🚰");
});

document.getElementById("pumpOff").addEventListener("click", () => {
  alert(currentLang === "en" ? "Pump is turned OFF 💧" : "ಪಂಪ್ ಆಫ್ ಆಗಿದೆ 💧");
});

/* =============================
   Disease Recognition (Demo)
============================= */
const diseaseDb = {
  en: {
    healthy: { name: "Healthy Leaf ✅", treatment: "No action needed" },
    blight: { name: "Early Blight 🍂", treatment: "Use Mancozeb fungicide spray" },
    mildew: { name: "Powdery Mildew 🌫️", treatment: "Apply sulfur spray" },
    rust: { name: "Leaf Rust 🍁", treatment: "Spray triazole fungicide" }
  },
  kn: {
    healthy: { name: "ಆರೋಗ್ಯಕರ ಎಲೆ ✅", treatment: "ಯಾವ ಕ್ರಮವೂ ಅಗತ್ಯವಿಲ್ಲ" },
    blight: { name: "ಆರ್ಲಿ ಬ್ಲೈಟ್ 🍂", treatment: "ಮ್ಯಾಂಕೋಜೆಬ್ ಫಂಗಿಸೈಡ್ ಸ್ಪ್ರೇ ಬಳಸಿ" },
    mildew: { name: "ಪೌಡರಿ ಮಿಲ್ಡ್ಯೂ 🌫️", treatment: "ಸಲ್ಫರ್ ಸ್ಪ್ರೇ ಬಳಸಿ" },
    rust: { name: "ಲೀಫ್ ರಸ್ಟ್ 🍁", treatment: "ಟ್ರೈಝೋಲ್ ಫಂಗಿಸೈಡ್ ಬಳಸಿ" }
  }
};

document.getElementById("leafUpload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  // Show preview
  const reader = new FileReader();
  reader.onload = function (event) {
    document.getElementById("preview").innerHTML =
      `<img src="${event.target.result}" alt="Leaf" width="200" style="margin:10px;">`;
  };
  reader.readAsDataURL(file);

  // Fake recognition (random)
  const diseases = ["healthy", "blight", "mildew", "rust"];
  const detected = diseases[Math.floor(Math.random() * diseases.length)];

  const t = diseaseDb[currentLang][detected];
  document.getElementById("diseaseResult").textContent =
    `${t.name} → ${t.treatment}`;
});
