import { getCordinates, getWeather } from "./apiFunctions"
import {
  createMainDisplay,
  createMainInfo,
  createHourlyForecast,
  createDescription,
  createDailyForecast,
  createGeneralInfo,
} from "./builderFunctions"
import {
  clearContentWrapper,
  mediaQueryMin768,
  handleMediaQueryMin768,
} from "./helperFunctions"

const main = document.querySelector("main")

function handleLoader() {
  const loader = document.querySelector(".loader")

  if(loader.classList.contains("loader-isHidden")) {
    loader.classList.remove("loader-isHidden")
  } else if (loader.classList.contains("loader-isHidden") === false) {
    loader.classList.add("loader-isHidden")  
  }
}

async function handleCitySearch(city) {
  clearContentWrapper()
  handleLoader()

  const weatherContentWrapper = document.createElement("div")
  weatherContentWrapper.classList.add("weather-content-wrapper")
  main.appendChild(weatherContentWrapper)

  const coordinatesObj = await getCordinates(city)
  const { lat, lon } = coordinatesObj

  const selectedMetric = document.querySelector(".selectedMetric")

  let metricForApi

  if (selectedMetric.classList.contains("metric-celsius")) {
    metricForApi = "metric"
  }

  if (selectedMetric.classList.contains("metric-fahrenheit")) {
    metricForApi = "imperial"
  }

  const weatherObj = await getWeather(lat, lon, metricForApi)
  handleLoader()

  createMainDisplay()
  createMainInfo(coordinatesObj, weatherObj)
  createHourlyForecast(weatherObj)
  createDescription(weatherObj.daily[0])
  createDailyForecast(weatherObj.daily)
  createGeneralInfo(weatherObj)

  handleMediaQueryMin768(mediaQueryMin768)
}

const toggleMetricBtn = document.querySelector(".toggleMetric")

toggleMetricBtn.addEventListener("click", () => {
  const celsiusMetric = document.querySelector(".metric-celsius")
  const fahrenheitMetric = document.querySelector(".metric-fahrenheit")

  if (celsiusMetric.classList.contains("selectedMetric")) {
    celsiusMetric.classList.remove("selectedMetric")
    fahrenheitMetric.classList.add("selectedMetric")
  } else {
    celsiusMetric.classList.add("selectedMetric")
    fahrenheitMetric.classList.remove("selectedMetric")
  }

  if (document.querySelector(".weather-content-wrapper")) {
    const city = document.querySelector(".city").textContent

    handleCitySearch(city)
  }
})

const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", (e) => {
  const searchValue = document.querySelector(".search-input").value
  const searchInput = document.querySelector(".search-input")
  searchInput.value = ""

  handleCitySearch(searchValue)
  e.preventDefault()
})


