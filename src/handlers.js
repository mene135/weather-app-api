import {
  convertMetersPerSecondToKhH,
  convertMilesPerHourToKhH,
} from "./helperFunctions"

export function handleSearchError(err) {
  document.querySelector(".toast-message").textContent = `${err}`
  document.querySelector(".toast").classList.remove("toast-isHidden")
}

export function handleMediaQueryMin768(event) {
  // Handles the allocation of the general info section while also checking if it exists.
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

export function handleCorrectMetric(windSpeed) {
  const selected = document.querySelector(".selectedMetric")

  /* If selected metric is celsius wind speed provided by the Api will be in meters per second, if metric selected is fahrenheit it will be provided in miles per hour. */
  if (selected.classList.contains("metric-celsius")) {
    return convertMetersPerSecondToKhH(windSpeed)
  }

  return convertMilesPerHourToKhH(windSpeed)
}
