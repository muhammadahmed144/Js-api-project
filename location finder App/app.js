console.log("javascript is runing");
let userLat;
let userLng;
document
  .querySelector("#getLocationBtn")
  .addEventListener("click", getLocation);

function getLocation() {
  let maindiv = document.querySelector(".main-div");
  let flagdiv = document.querySelector(".flag-div");
  let countrySection = document.querySelector(".country-section");
  let neighborssection = document.querySelector(".neighbors-section")
  maindiv.style.display = "none";
  flagdiv.style.display = "flex";
  countrySection.style.display = "block";
  neighborssection.style.display = "block"
  
  navigator.geolocation.getCurrentPosition(
    function (success) {
      const { coords } = success;
      const { latitude, longitude } = coords;
      console.log(latitude, longitude);
      userLat = latitude;
      userLng = longitude;
      countryNameFoo(latitude, longitude);
    },
    function (error) {
      console.log(error, "error");
    },
  );
}

// auth=108925674349625344949x72438
function countryNameFoo(lat, long) {
  fetch(
    `https://geocode.xyz/${lat},${long}?geoit=json&auth=100587140388117e15753185x99862`,
  )
    .then(function (countryDetail) {
      return countryDetail.json();
    })
    .then(function (countryDetail) {
      console.log(countryDetail);
      const { country } = countryDetail;
      countryDetailsFoo(country);
      //  MAP CALL
      showExactMap(userLat, userLng);
    })
    .catch(function (err) {
      console.log(err);
    });
}

let neighborcountriesDetails = [];

function countryDetailsFoo(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(function (result) {
      return result.json();
    })
    .then(async function (result) {
      console.log(result);

        await showNeighbors(result[0].borders);

      console.log(showNeighbors, '==>> neighborcountriesDetails')

      let flagImg = document.querySelector(".flag-div");

      let flag = result.map(function (currDetails) {
        return `
        <img src="${currDetails.flags.png}" alt="img" class="flag">
        <p class = "pk">${currDetails.altSpellings[2]}</p>
        <img src="${currDetails.coatOfArms.png}" alt="img" class="arms">`
      });

      flagImg.innerHTML = flag.join("");

      let Details = document.querySelector(".country-Details");

      let capital = result.map(function (currDetails) {
        return `<div>
        <h3>Capital</h3>
        <p><p>${currDetails.capital[0]}</p></p>
        </div>
        <div>
        <h3>Population</h3>
        <p> ${currDetails.population}</p>
        </div>
        <div>
        <h3>Currency</h3>
        <p>${currDetails.currencies.PKR.name}</p>
        </div>
        <div>
        <h3>Continents</h3>
        <p>${currDetails.continents[0]}</p>
        </div>
        <div>
        <h3>Latitude</h3>
        <p>${currDetails.latlng[0]}</p>
        </div>
        <div>
        <h3>Longitude</h3>
        <p> ${currDetails.latlng[1]}</p>
        </div>
        <div>
        <h3>Languages</h3>
        <p>${currDetails.languages.eng}, ${currDetails.languages.urd}</p>
        </div>
        <div>
        <h3>Sub region</h3>
        <p>${currDetails.subregion}</p>
        </div>
        <div>
        <h3>Independent</h3>
        <p>${currDetails.independent}</p>
        </div>
        <div>
        <h3>Time Zone</h3>
        <p> ${currDetails.timezones}</p>
        </div>
        <div>
        <h3>Un Member</h3>
        <p>${currDetails.unMember}</p>
        </div>
        <div>
        <h3>Driving Side</h3> 
        <p>${currDetails.car.side}</p>
        </div>`;
      });
      Details.innerHTML = capital.join("");
    })
    .catch(function (err) {
      console.log(err);
    });
}
async function neiborcountries(borders) {
  let neighborCountriesPromises = borders.map(async function (border) {
    let res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
    let data = await res.json();
    console.log(data);
    return data[0];
  })
  let neighborCountriesData = await Promise.all(neighborCountriesPromises);
  return neighborCountriesData;
}

const slider = document.getElementById("neighbors");
const leftBtn = document.querySelector(".slide-btn.left");
const rightBtn = document.querySelector(".slide-btn.right");

leftBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -260, behavior: "smooth" }); // ek card ka width
});

rightBtn.addEventListener("click", () => {
  slider.scrollBy({ left: 260, behavior: "smooth" });
});

let isDragging = false;
let startX, scrollStart;

slider.addEventListener("mousedown", e => {
  isDragging = true;
  startX = e.pageX;
  scrollStart = slider.scrollLeft;
});
slider.addEventListener("mouseup", () => isDragging = false);
slider.addEventListener("mouseleave", () => isDragging = false);
slider.addEventListener("mousemove", e => {
  if (!isDragging) return;
  const x = e.pageX;
  slider.scrollLeft = scrollStart - (x - startX);
});

// touch devices
slider.addEventListener("touchstart", e => {
  startX = e.touches[0].pageX;
  scrollStart = slider.scrollLeft;
});
slider.addEventListener("touchmove", e => {
  const x = e.touches[0].pageX;
  slider.scrollLeft = scrollStart - (x - startX);
});

// 🔹 UI BANANE KA FUNCTION
async function showNeighbors(borders) {
  let neighbors = await neiborcountries(borders);

  let container = document.getElementById("neighbors");
  container.innerHTML = "";

  neighbors.forEach(country => {
    let card = `
      <div class="neighbor-card">
        <img src="${country.flags.png}" alt="${country.name.common}">
        <h4>${country.name.common}</h4>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
      </div>
    `;
    container.innerHTML += card;
  });
}


function showExactMap(lat, lng) {
  let mapDiv = document.querySelector(".map-div");

  let map = L.map("map").setView([lat, lng], 16); // 🔥 zoom 16 = accurate

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  L.marker([lat, lng]).addTo(map).bindPopup("📍 You are here").openPopup();
}
