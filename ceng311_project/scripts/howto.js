fetch("navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  });

const stepCounts = {
  tiger: 3,
  horse: 4,
  monkey: 3,
};

function showSteps(toy) {
  const steps = stepCounts[toy] || 3;
  const popup = document.getElementById("popup-overlay");
  const title = document.getElementById("popup-title");
  const stepsDiv = document.getElementById("popup-steps");

  title.textContent = `${toy.charAt(0).toUpperCase() + toy.slice(1)} - Instructions`;
  stepsDiv.innerHTML = "";

  for (let i = 1; i <= steps; i++) {
    const stepLabel = document.createElement("p");
    stepLabel.textContent = `Step ${i}:`;
    stepLabel.className = "step-label";

    const img = document.createElement("img");
    img.src = `image/${toy}/${toy}-s${i}.jpg`;
    img.alt = `Step ${i}`;
    img.className = "popup-img";

    stepsDiv.appendChild(stepLabel);
    stepsDiv.appendChild(img);
  }

  popup.style.display = "flex";
}

function closePopup() {
  document.getElementById("popup-overlay").style.display = "none";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});

window.addEventListener("click", (e) => {
  const popup = document.getElementById("popup-overlay");
  if (e.target === popup) closePopup();
});

//Fetch data with external WEATHER API
function getWeather() {
  const latitude = 39.9208;
  const longitude = 32.8541;

  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const weather = data.current_weather;
      const temp = weather.temperature;
      const wind = weather.windspeed;

      

      document.getElementById("weather-box").textContent =
        `The weather in Ankara is currently ${temp}°C, wind ${wind} km/s.`;
    })
    .catch(err => {
      document.getElementById("weather-box").textContent = "No weather data was received.";
      console.error("Weather API error:", err);
    });
}



document.addEventListener("DOMContentLoaded", getWeather);


