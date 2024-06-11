import { getCordinates, getWeather } from "./apiFunctions"
import {
  createMainDisplay,
  createMainInfo,
  createHourlyForecast,
  createDescription,
  createDailyForecast,
  createGeneralInfo,
} from "./builderFunctions"
import { clearContentWrapper } from "./helperFunctions"

export function handleSearchError(err) {
  document.querySelector(".toast-message").textContent = `${err}`
  document.querySelector(".toast").classList.remove("toast-isHidden")
}

export function handleMediaQueryMin768(event) {
  const generalInfoSection = document.querySelector(".generalInfoSection")
  const dailyForecastSection = document.querySelector(".dailyForecastSection")
  const contentWrapper = document.querySelector(".weather-content-wrapper")

  if (event.matches && generalInfoSection) {
    generalInfoSection.remove()
    contentWrapper.insertBefore(generalInfoSection, dailyForecastSection)
  } else if (generalInfoSection) {
    generalInfoSection.remove()
    contentWrapper.appendChild(generalInfoSection)
  }
}

export const mediaQueryMin768 = window.matchMedia("(min-width: 768px")

export async function handleCitySearch(city) {
  clearContentWrapper()
  document.querySelector(".loader").classList.remove("loader-isHidden")
  document.querySelector(".toast").classList.add("toast-isHidden")

  const weatherContentWrapper = document.createElement("div")
  weatherContentWrapper.classList.add("weather-content-wrapper")

  document.querySelector("main").appendChild(weatherContentWrapper)

  let coordinatesObj

  try {
    coordinatesObj = await getCordinates(city)
  } catch (err) {
    document.querySelector(".loader").classList.add("loader-isHidden")
    handleSearchError(err)
    return
  }

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

  document.querySelector(".loader").classList.add("loader-isHidden")

  createMainDisplay()
  createMainInfo(coordinatesObj, weatherObj)
  createHourlyForecast(weatherObj)
  createDescription(weatherObj.daily[0])
  createDailyForecast(weatherObj.daily)
  createGeneralInfo(weatherObj)

  handleMediaQueryMin768(mediaQueryMin768)
}
