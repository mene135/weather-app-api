import {
  handleCitySearch,
  handleMediaQueryMin768,
  mediaQueryMin768
} from "./handlers"


const toggleMetricBtn = document.querySelector(".toggleMetric")

toggleMetricBtn.addEventListener("click", () => {
  const celsiusMetric = document.querySelector(".metric-celsius")
  const fahrenheitMetric = document.querySelector(".metric-fahrenheit")

  if (celsiusMetric.classList.contains("selectedMetric")) {
    celsiusMetric.classList.remove("selectedMetric")
    fahrenheitMetric.classList.add("selectedMetric")
    toggleMetricBtn.setAttribute("aria-label", "Toggle metric used, currently selected metric is fahrenheit, other option is celsius")
  } else {
    celsiusMetric.classList.add("selectedMetric")
    fahrenheitMetric.classList.remove("selectedMetric")
    toggleMetricBtn.setAttribute("aria-label", "Toggle metric used, currently selected metric is celsius, other option is fahrenheit")
  }

  if (document.querySelector(".weather-content-wrapper")) {
    const city = document.querySelector(".city").textContent

    handleCitySearch(city)
  }
})

const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", (e) => {
  e.preventDefault()

  const searchValue = document.querySelector(".search-input").value
  if(searchValue === "") {
    return
  }

  const searchInput = document.querySelector(".search-input")
  searchInput.value = ""

  handleCitySearch(searchValue)
})


mediaQueryMin768.addEventListener("change", handleMediaQueryMin768)


window.addEventListener("load", () => {
  handleCitySearch("London")
})

