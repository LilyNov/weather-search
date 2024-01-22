const API_KEY = "bcffaa2e3145f0t13bb8e32f07536eoe";
const BASE_URL = "https://api.shecodes.io/weather";

const setWeather = (weatherData) => {
  let cityEl = document.querySelector(".current-city");
  let humidityEl = document.querySelector("#current-humidity");
  let descriptionEl = document.querySelector("#current-description");
  let windEl = document.querySelector("#current-wind");
  let iconEl = document.createElement("img");
  let iconContainerEl = document.querySelector("#icon");
  let temperatureEl = document.querySelector(".current-temperature-value");

  console.log(weatherData);
  cityEl.innerHTML = weatherData.city;
  descriptionEl.innerHTML = weatherData.condition.description;
  humidityEl.innerHTML = weatherData.temperature.humidity;
  windEl.innerHTML = Math.round(weatherData.wind.speed);
  iconEl.src = weatherData.condition.icon_url;
  iconEl.alt = weatherData.condition.icon;
  iconContainerEl.innerHTML = "";
  iconContainerEl.appendChild(iconEl);
  temperatureEl.innerHTML = Math.round(weatherData.temperature.current);
};

const showWeather = async (query = "Paris") => {
  let url = `${BASE_URL}/v1/current?query=${query}&key=${API_KEY}`;
  try {
    const weather = await fetch(url).then((res) => res.json());

    if (weather) {
      setWeather(weather);
    }
  } catch {
    throw new Error("Failed fetch");
  }
};

const search = (event) => {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let inputValue = searchInputElement.value;

  if (!!inputValue) {
    showWeather(inputValue);
  }
};

const formatDate = (date) => {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
};

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
