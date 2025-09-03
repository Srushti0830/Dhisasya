function updateSensorData() {
  document.getElementById("temp").innerText = (20 + Math.random() * 10).toFixed(1);
  document.getElementById("humidity").innerText = (40 + Math.random() * 20).toFixed(1);
  document.getElementById("moisture").innerText = (30 + Math.random() * 50).toFixed(1);
  document.getElementById("ph").innerText = (5 + Math.random() * 2).toFixed(2);
}

// Update every 3 seconds
setInterval(updateSensorData, 3000);
updateSensorData();
