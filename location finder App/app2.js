const params = new URLSearchParams(window.location.search);
const lat = parseFloat(params.get("lat"));
const lng = parseFloat(params.get("lng"));

const map = L.map("map").setView([lat, lng], 16);

// Google-style tiles
L.tileLayer(
  "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
  { attribution: "© Google", maxZoom: 20 }
).addTo(map);

// Marker
L.marker([lat, lng])
  .addTo(map)
  .bindPopup("You are here 📍")
  .openPopup();

// Show lat/lng below map
document.getElementById("latlng").innerHTML = `Latitude: ${lat} | Longitude: ${lng}`;
function countryDetailFoo(countryName){
    fetch(`https://restcountries.com/v3.1/name/${countryName}`).then
    (function (result) {
        return result.json()
    }).then(function (result) {
        console.log(result)
    })
}