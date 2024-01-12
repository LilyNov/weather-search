const API_KEY = "bcffaa2e3145f0t13bb8e32f07536eoe";
const BASE_URL = "https://api.shecodes.io/weather";

async function showWeather(query) {
  let url = `${BASE_URL}/v1/current?query=${query}&key=${API_KEY}`;
  try {
    const weather = await fetch(url).then((res) => res.json());

    if (weather) {
      let cityEl = document.querySelector(".current-city");
      let temperatureEl = document.querySelector(".current-temperature-value");

      cityEl.innerHTML = weather.city;
      temperatureEl.innerHTML = Math.round(weather.temperature.current);
    }
  } catch {
    throw new Error("Faild fetch");
  }
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let inputValue = searchInputElement.value;

  if (!!inputValue) {
    showWeather(inputValue);
  }
}

function formatDate(date) {
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
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
