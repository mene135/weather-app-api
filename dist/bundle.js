/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const searchBtn = document.querySelector(".search-btn");
function getCordinates(city) {
  return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`, {
    mode: 'cors'
  }).then(res => {
    console.log(res);
    return res.json();
  }).then(res => {
    console.log(res);
    const {
      lat,
      lon,
      name
    } = res[0];
    console.log(lat, lon);
    return {
      name,
      lat,
      lon
    };
  }).catch(error);
}
function getWeather(lat, lon) {
  return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6&units=metric`, {
    mode: 'cors'
  }).then(res => {
    res.json();
  }).then(res => {
    console.log(res);
    return res;
  });
}
function roundUp(unit) {
  return Math.round(unit);
}
async function handleCitySearch(city) {
  const result = await getCordinates(city);
  const {
    name: cityName,
    lat,
    lon
  } = result;
  const weather = await getWeather(lat, lon);
  const cityDisplay = document.querySelector(".city");
  cityDisplay.textContent = cityName;
  const {
    main
  } = weather.current.weather[0];
  const cityWeather = document.querySelector(".city-weather");
  cityWeather.textContent = main;
  const {
    temp
  } = weather.current;
  const cityTemp = document.querySelector(".city-temperature");
  cityTemp.textContent = `${roundUp(temp)}°`;
  const {
    min,
    max
  } = weather.daily[0].temp;
  const cityHigh = document.querySelector(".city-high");
  const cityLow = document.querySelector(".city-low");
  cityHigh.textContent = `H:${roundUp(max)}`;
  cityLow.textContent = `L:${roundUp(min)}`;
}
searchBtn.addEventListener("click", e => {
  const searchValue = document.querySelector(".search-input").value;
  handleCitySearch(searchValue);
  e.preventDefault();
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map