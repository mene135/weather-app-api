import { handleMediaQueryMin768, mediaQueryMin768 } from "./handlers"
import { clearContentWrapper } from "./helperFunctions"
import { getCordinates, getWeather } from "./apiFunctions"
import {
  createMainDisplay,
  createMainInfo,
  createHourlyForecast,
  createDescription,
  createDailyForecast,
  createGeneralInfo,
} from "./builderFunctions"

async function searchManager(city) {
  // Clears existing content, shows a loader component, and then hides the toast if it is displayed from a previous search.
  clearContentWrapper()
  document.querySelector(".loader").classList.remove("loader-isHidden")
  document.querySelector(".toast").classList.add("toast-isHidden")

  /* A wrapper that will wrap all of yhr data provided from the Api */
  const weatherContentWrapper = document.createElement("div")
  weatherContentWrapper.classList.add("weather-content-wrapper")

  document.querySelector("main").appendChild(weatherContentWrapper)

  let coordinatesObj

  try {
    /* extracts latitude and longitude from an Api to be used for the api that provides us weather data */
    coordinatesObj = await getCordinates(city)
  } catch (err) {
    document.querySelector(".loader").classList.add("loader-isHidden")
    searchManager(err)
    return
  }

  const { lat, lon } = coordinatesObj

  const selectedMetric = document.querySelector(".selectedMetric")

  let metricForApi

  // `metricForApi` determines the unit system for the API query string:
  // - 'metric' for Celsius units
  // - 'imperial' for Fahrenheit units

  if (selectedMetric.classList.contains("metric-celsius")) {
    metricForApi = "metric"
  }

  if (selectedMetric.classList.contains("metric-fahrenheit")) {
    metricForApi = "imperial"
  }

  const weatherObj = await getWeather(lat, lon, metricForApi)

  document.querySelector(".loader").classList.add("loader-isHidden")

  createMainDisplay()
  createMainInfo(coordinatesObj, weatherObj)
  createHourlyForecast(weatherObj)
  createDescription(weatherObj.daily[0])
  createDailyForecast(weatherObj.daily)
  createGeneralInfo(weatherObj)

  // Handles where general section should be
  handleMediaQueryMin768(mediaQueryMin768)
}

const toggleMetricBtn = document.querySelector(".toggleMetric")

toggleMetricBtn.addEventListener("click", () => {
  const celsiusMetric = document.querySelector(".metric-celsius")
  const fahrenheitMetric = document.querySelector(".metric-fahrenheit")

  if (celsiusMetric.classList.contains("selectedMetric")) {
    celsiusMetric.classList.remove("selectedMetric")
    fahrenheitMetric.classList.add("selectedMetric")
    toggleMetricBtn.setAttribute(
      "aria-label",
      "Toggle metric used, currently selected metric is fahrenheit, other option is celsius",
    )
  } else {
    celsiusMetric.classList.add("selectedMetric")
    fahrenheitMetric.classList.remove("selectedMetric")
    toggleMetricBtn.setAttribute(
      "aria-label",
      "Toggle metric used, currently selected metric is celsius, other option is fahrenheit",
    )
  }

  if (document.querySelector(".weather-content-wrapper")) {
    const city = document.querySelector(".city").textContent

    searchManager(city)
  }
})

const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", (e) => {
  e.preventDefault()

  const searchValue = document.querySelector(".search-input").value
  if (searchValue === "") {
    return
  }

  const searchInput = document.querySelector(".search-input")
  searchInput.value = ""

  searchManager(searchValue)
})

mediaQueryMin768.addEventListener("change", handleMediaQueryMin768)

window.addEventListener("load", () => {
  searchManager("London")
})
