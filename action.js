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

function formatSticker() {
  let dailyMessage;
  const currentDay = new Date().getDay();
  switch (currentDay) {
    case 0:
      dailyMessage = `Today is the best day of your life!`;
      break;
    case 1:
      dailyMessage = `A whole week of opportunities lies ahead. You will definitely succeed!
`;
      break;
    case 2:
      dailyMessage = `Today you will have a great day, full of inspiration and fun.`;
      break;
    case 3:
      dailyMessage = `You're doing great, keep it up.`;
      break;
    case 4:
      dailyMessage = `You can do anything, the main thing is to believe in yourself.`;
      break;
    case 5:
      dailyMessage = `I'm proud of you!`;
      break;
    case 6:
      dailyMessage = `You have everything you need to enjoy life here and now.`;
      break;
  }
  document.querySelector("#message-inspiration").innerHTML = dailyMessage;
}
formatSticker();

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
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
          <div class="icon-weather">
            <img 
            src="./img/iconsWeather/${forecastDay.weather[0].icon}.svg";
           alt=""
           fill="#a077b8"
        width="25"/> 
        </div>
            <div class="weather-forecast-date">
            ${formatDay(forecastDay.dt)}</div>
            <span class="weather-forecast-temperature max">
            ${Math.round(forecastDay.temp.max)}º </span>
            <span class="weather-forecast-temperature min">
          ${Math.round(forecastDay.temp.min)}º</span>
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
    `./img/iconsWeather/${response.data.weather[0].icon}.svg`
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
