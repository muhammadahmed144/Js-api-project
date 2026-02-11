let weatherCard = document.querySelector(".weather-card");
let searchBox = document.querySelector(".search-section input");
let searchIcon = document.querySelector(".searchIcon");

async function getCityFromCoords(lat, lng) {
  const request = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=8c9770e2458af071b878315ef257f2b5`
  )
  let requestFulFil = await request.json()
    return requestFulFil[0].name;
}

async function getWeatherByCity(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8c9770e2458af071b878315ef257f2b5`)
    return await res.json()
}

async function showWeather(city) {
  try {
    const data = await getWeatherByCity(city);

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const condition = data.weather[0].main;
   const isDay = iconCode.includes("d");
      switch (condition) {

  case "Clear":
    document.body.style.background = isDay
      ? "linear-gradient(to right, #fceabb, #f8b500)"
      : "linear-gradient(to right, #141e30, #243b55)";
    break;

  case "Clouds":
    document.body.style.background = isDay
      ? "linear-gradient(to right, #bdc3c7, #2c3e50)"
      : "linear-gradient(to right, #232526, #414345)";
    break;

  case "Rain":
  case "Drizzle":
    document.body.style.background = isDay
      ? "linear-gradient(to right, #4b79a1, #283e51)"
      : "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
    break;

  case "Thunderstorm":
    document.body.style.background =
      "linear-gradient(to right, #0f2027, #000000)";
    break;

  case "Snow":
    document.body.style.background =
      "linear-gradient(to right, #e6dada, #274046)";
    break;

  case "Mist":
  case "Smoke":
  case "Haze":
  case "Fog":
    document.body.style.background =
      "linear-gradient(to right, #757f9a, #d7dde8)";
    break;

  case "Dust":
  case "Sand":
  case "Ash":
    document.body.style.background =
      "linear-gradient(to right, #ba8b02, #181818)";
    break;

  case "Tornado":
  case "Squall":
    document.body.style.background =
      "linear-gradient(to right, #434343, #000000)";
    break;

  default:
    document.body.style.background =
      "linear-gradient(to left, dodgerblue, aquamarine)";
}



    weatherCard.innerHTML = `
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <img src="${iconUrl}" alt="weather icon" class="weather-icon">

      <h2>${data.name}</h2>

      <div class="humidityWindSpeed">
        <div class="stat">
          <i class="fa-solid fa-droplet"></i>
          <div>
            <h4>${data.main.humidity}%</h4>
            <p>Humidity</p>
          </div>
        </div>

        <div class="stat">
          <i class="fa-solid fa-wind"></i>
          <div>
            <h4>${data.wind.speed} m/s</h4>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    weatherCard.innerHTML = "City not found ❌";
  }
}


navigator.geolocation.getCurrentPosition(async (success) => {
  const lat = success.coords.latitude;
  const lng = success.coords.longitude;

  const city = await getCityFromCoords(lat, lng);
  showWeather(city);
});

// 🔎 Search click
searchIcon.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    showWeather(city);
  }
});

// ⌨️ Enter key search
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchBox.value.trim();
    if (city !== "") {
      showWeather(city);
    }
  }
});