const searchElement = document.querySelector("[data-city-search]");

//this one gonna come from google API
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return;
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      setWeatherData(data, place.formatted_address);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

const locationElement = document.querySelector("[data-location]");
const statusElement = document.querySelector("[data-status]");
const temperatureElement = document.querySelector("[data-temperature]");
const windElement = document.querySelector("[data-wind]");
const pressureElement = document.querySelector("[data-pressure]");
const iconElement = document.querySelector("#img-icon");
const humidityElement = document.querySelector("[data-humidity]");

function toCelcius(kelvin) {
  return Math.round((kelvin - 273.15) * 10) / 10;
}

function setWeatherData(data, place) {
  locationElement.textContent = place;
  statusElement.textContent = data.weather["0"].description;
  temperatureElement.textContent = toCelcius(data.main.temp) + " °C";
  humidityElement.textContent = data.main.humidity + " %";
  pressureElement.textContent = data.main.pressure + " mb";
  windElement.textContent = data.wind.speed + " m/s";

  var iconcode = data.weather["0"].icon;
  // console.log("iconcode:", iconcode);
  // console.log("iconElement", iconElement);
  const iconUrl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
  //console.log("iconUrl:", iconUrl);
  iconElement.src = iconUrl;
}
