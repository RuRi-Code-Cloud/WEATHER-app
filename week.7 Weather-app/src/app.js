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
  document.querySelector("h1").innerHTML = response.data.city;

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#heat").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#type").innerHTML =
    response.data.condition.description;
  document.querySelector("#time").innerHTML = formatDate(
    response.data.time * 1000
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    `src`,
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  document.querySelector("#country").innerHTML = response.data.country;
}

function search(event) {
  let apiKey = `2b03bfeb040ctdb92faf2af53622202o`;
  let city = document.querySelector("#text").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function findCity(event) {
  event.preventDefault();
  let textElement = document.querySelector("#text");
  search(textElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", findCity);
