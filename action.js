function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  return `${date} ${month} ${hours}:${minutes}`;
}

function changeDay() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <img
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt=""
  width="25"
/>
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <div class="weather-forecast-temperature">28º 17º</div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  return displayForecast;
}

function getForecast(coordinates) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let currentDate = document.querySelector("#change-date-time");
  let currentDay = document.querySelector("#current-day");
  let changeTemperature = document.querySelector("#current-temp");
  let changeCity = document.querySelector(".city-name");
  let changeHumidity = document.querySelector("#humidity");
  let changeWind = document.querySelector("#wind");
  let changeDescription = document.querySelector("#description");
  let currentImageWeather = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  changeTemperature.innerHTML = Math.round(celsiusTemperature);
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  currentDay.innerHTML = changeDay();
  changeCity.innerHTML = response.data.name;
  changeHumidity.innerHTML = response.data.main.humidity;
  changeWind.innerHTML = Math.round(response.data.wind.speed);
  changeDescription.innerHTML = response.data.weather[0].description;
  currentImageWeather.setAttribute("alt", response.data.weather[0].description);
  currentImageWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showCity(city) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  showCity(city.value);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "8cac06f7ab6c10287cd06a316ff84a57";
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
  axios.get(api).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let geoBtn = document.querySelector("#geo-btn");
geoBtn.addEventListener("click", getPosition);

let cityForm = document.querySelector("#search-holder");
cityForm.addEventListener("submit", cityInput);

showCity("New York");
