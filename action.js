////////Changing hour, month, date, day////////
function formatDate() {
  let now = new Date();
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

let currentDate = document.querySelector("#change-h-1");
currentDate.innerHTML = formatDate();

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
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = changeDay();

//////////////Change city name and temp//////////////////
function showWeather(response) {
  console;
  let changeTemperature = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  changeTemperature.innerHTML = temperature;
  let changeCity = document.querySelector(".city-name");
  changeCity.innerHTML = response.data.name;
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = response.data.main.humidity;
  let changeWind = document.querySelector("#wind");
  changeWind.innerHTML = Math.round(response.data.wind.speed);
  let changeDescription = document.querySelector("#description");
  changeDescription.innerHTML = response.data.weather[0].main;
}

function showCity(city) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function cityInput(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  showCity(city);
}
let cityForm = document.querySelector("#search-holder");
cityForm.addEventListener("submit", cityInput);

/////////Current geolocation btn//////////
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
let geoBtn = document.querySelector("#geo-btn");
geoBtn.addEventListener("click", getPosition);

showCity("New York");
