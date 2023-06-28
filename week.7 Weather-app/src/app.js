function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.country;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = response.data.wind.speed;
  let temperatureElement = document.querySelector("#heat");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let weatherElement = document.querySelector("#type");
  weatherElement.innerHTML = response.data.condition.description;
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  console.log(response);
}

function search(event) {
  event.preventDefault();
  let textElement = document.querySelector("#text");
  console.log(textElement.value);
}

let apiKey = `2b03bfeb040ctdb92faf2af53622202o`;
let city = "Dublin";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
