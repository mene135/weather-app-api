import { getCordinates, getWeather } from "./apiFunctions"
import { createHourlyForecast, createDescription, createDailyForecast, createGeneralInfo } from "./builderFunctions"
import { roundUp } from "./helperFunctions"

const body = document.querySelector("body")

function clearHourlyForecastContainer() {
  document.querySelector(".hourlyForecastContainer").remove()
}

async function handleCitySearch(city) {
  const result = await getCordinates(city)

  const { name: cityName, lat, lon } = result

  const weather = await getWeather(lat, lon)

  const cityDisplay = document.querySelector(".city")
  cityDisplay.textContent = cityName

  const { main } = weather.current.weather[0]

  const cityWeather = document.querySelector(".city-weather")
  cityWeather.textContent = main

  const { temp } = weather.current

  const cityTemp = document.querySelector(".city-temperature")
  cityTemp.textContent = `${roundUp(temp)}°`

  const { min, max } = weather.daily[0].temp

  const cityHigh = document.querySelector(".city-high")
  const cityLow = document.querySelector(".city-low")

  cityHigh.textContent = `H:${roundUp(max)}°`
  cityLow.textContent = `L:${roundUp(min)}°`

  const hourlyForecast24Arr = weather.hourly.slice(0, 24)

  if (document.querySelector(".hourlyForecastContainer") !== null) {
    clearHourlyForecastContainer()
    createHourlyForecast(hourlyForecast24Arr)
  } else {
    createHourlyForecast(hourlyForecast24Arr)
  }

  createDescription(weather.daily[0])
  createDailyForecast(weather.daily)
  createGeneralInfo(weather)
}

const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", (e) => {
  const searchValue = document.querySelector(".search-input").value
  const searchInput = document.querySelector(".search-input")
  searchInput.value = ""

  handleCitySearch(searchValue)
  e.preventDefault()
})



