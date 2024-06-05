import { getCordinates, getWeather } from "./apiFunctions"
import { createHourlyForecast, createDescription, createDailyForecast, createGeneralInfo, createMainInfo } from "./builderFunctions"
import { roundUp } from "./helperFunctions"

const main = document.querySelector("main")

function clearContentWrapper() {
  let content = document.querySelector(".weather-content-wrapper")    
  
  if(content) {
    content.remove()
  }
}

async function handleCitySearch(city) {
  clearContentWrapper()

  const weatherContentWrapper = document.createElement("div")
  weatherContentWrapper.classList.add("weather-content-wrapper")
  main.appendChild(weatherContentWrapper)

  const result = await getCordinates(city)

  const { lat , lon } = result

  const selectedMetric = document.querySelector(".selectedMetric")
  let metricForApi;

  if(selectedMetric.classList.contains("metric-celsius")) {
    metricForApi = "metric"
  }

  if(selectedMetric.classList.contains("metric-fahrenheit")) {
    metricForApi = "imperial"
  }

  const weather = await getWeather(lat, lon, metricForApi)

  createMainInfo(result, weather)
  createHourlyForecast(weather)
  createDescription(weather.daily[0])
  createDailyForecast(weather.daily)
  createGeneralInfo(weather)

  handleMediaQuery(mediaQuery)
}

const toggleMetricBtn = document.querySelector(".toggleMetric")

toggleMetricBtn.addEventListener("click", () => {
  let celsiusMetric = document.querySelector(".metric-celsius")
  let fahrenheitMetric = document.querySelector(".metric-fahrenheit")

  if(celsiusMetric.classList.contains("selectedMetric")) {
    celsiusMetric.classList.remove("selectedMetric")
    fahrenheitMetric.classList.add("selectedMetric")

  } else {
    celsiusMetric.classList.add("selectedMetric")
    fahrenheitMetric.classList.remove("selectedMetric")
  }

  if(document.querySelector(".weather-content-wrapper")) {
    let city = document.querySelector(".city").textContent

    handleCitySearch(city);
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

const mediaQuery = window.matchMedia('(min-width: 768px')

mediaQuery.addEventListener('change', handleMediaQuery)

function handleMediaQuery(event) {
  let generalInfo = document.querySelector(".generalInfo-container")
  let dailyForecastContainer = document.querySelector(".dailyForecastContainer")
  const contentWrapper = document.querySelector(".weather-content-wrapper")

  if(event.matches) {
    generalInfo.remove()
    contentWrapper.insertBefore(generalInfo, dailyForecastContainer)
  } else {
    generalInfo.remove()
    contentWrapper.appendChild(generalInfo)
  }
}
