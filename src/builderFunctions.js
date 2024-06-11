import { handleWeatherIcon } from "./apiFunctions"
import {
  roundUp,
  convertMetersToKilometers,
  convertPopToPercentage,
  handleCorrectMetric,
  getDayFromUnixTimestamp,
  getHourFromUnixTimestamp,
  getHoursAndMinutes,
  findCompassDirection,
  appendToMainDisplay,
  appendToContentWrapper,
} from "./helperFunctions"

export function createMainDisplay() {
  const mainDisplay = document.createElement("div")
  mainDisplay.classList.add("l-mainDisplay")

  document.querySelector(".weather-content-wrapper").appendChild(mainDisplay)
}

export function createMainInfo(cityCoordinates, weatherObj) {
  const mainInfoSection = document.createElement("section")
  mainInfoSection.classList.add("mainInfoSection")
  mainInfoSection.setAttribute("aria-label", "city info")

  const { name: cityName } = cityCoordinates

  const city = document.createElement("h2")
  city.textContent = `${cityName}`
  city.classList.add("city")

  const { main } = weatherObj.current.weather[0]

  const cityWeather = document.createElement("div")
  cityWeather.textContent = `${main}`
  cityWeather.classList.add("city-weather")

  const { temp } = weatherObj.current

  const cityTemp = document.createElement("div")
  cityTemp.textContent = `${roundUp(temp)}°`
  cityTemp.classList.add("city-temperature")

  const selectedMetric = document.querySelector(".selectedMetric")
  let metric

  if (selectedMetric.classList.contains("metric-celsius")) {
    metric = "Celsius"
  } else {
    metric = "Fahrenheit"
  }

  const cityTempSrText = document.createElement("span")
  cityTempSrText.textContent = `${metric}`
  cityTempSrText.classList.add("visually-hidden")

  cityTemp.appendChild(cityTempSrText)

  const { min, max } = weatherObj.daily[0].temp

  const cityHighAndLowContainer = document.createElement("div")
  const cityHigh = document.createElement("div")
  const cityLow = document.createElement("div")

  cityHigh.textContent = `H:${roundUp(max)}°`
  cityLow.textContent = `L:${roundUp(min)}°`

  cityHigh.classList.add("city-highAndLowTemp-high")
  cityLow.classList.add("city-highAndLowTemp-low")
  cityHighAndLowContainer.classList.add("city-highAndLowTemp")

  cityHighAndLowContainer.append(cityHigh, cityLow)

  mainInfoSection.append(city, cityWeather, cityTemp, cityHighAndLowContainer)

  appendToMainDisplay(mainInfoSection)
}

export function createHourlyForecast(weatherObj) {
  const hourlyForecastSection = document.createElement("section")
  hourlyForecastSection.classList.add("hourlyForecastSection")

  const hourlyForecastHeading = document.createElement("h2")
  hourlyForecastHeading.classList.add("hourlyForecast-heading")
  hourlyForecastHeading.textContent = "Hourly Forecast"

  const hourlyForecastList = document.createElement("ul")
  hourlyForecastList.classList.add("hourlyForecast-list")

  const arr24Hours = weatherObj.hourly.slice(0, 24)

  for (let i = 0; i < arr24Hours.length; i += 1) {
    const hourlyForecast = document.createElement("li")
    const hour = document.createElement("div")
    const rainChance = document.createElement("div")
    const weatherImage = new Image()
    const temperature = document.createElement("div")

    hourlyForecast.classList.add("hourlyForecast")
    hour.classList.add("hourlyForecast-hour")
    rainChance.classList.add("hourlyForecast-rainChance")
    weatherImage.classList.add("hourlyForecast-weatherImage")
    temperature.classList.add("hourlyForecast-temperature")

    if (i === 0) {
      hour.textContent = "Now"
    } else {
      hour.textContent = `${getHourFromUnixTimestamp(arr24Hours[i].dt)}`
    }

    if (arr24Hours[i].pop !== 0) {
      rainChance.textContent = `${convertPopToPercentage(arr24Hours[i].pop)}%`
    }

    handleWeatherIcon(
      weatherImage,
      arr24Hours[i].weather[0].icon,
      arr24Hours[i].weather[0].description,
    )

    temperature.textContent = `${roundUp(arr24Hours[i].temp)}°`

    hourlyForecast.append(hour, rainChance, weatherImage, temperature)
    hourlyForecastList.appendChild(hourlyForecast)
  }

  hourlyForecastSection.append(hourlyForecastHeading, hourlyForecastList)
  appendToMainDisplay(hourlyForecastSection)
}

export function createDescription(weatherObj) {
  const { max, min } = weatherObj.temp
  const descriptionValue = weatherObj.weather[0].description

  const description = document.createElement("section")
  description.setAttribute("aria-label", "todays description")

  const descriptionParagraph = document.createElement("p")

  description.classList.add("todaysDescription")
  descriptionParagraph.classList.add("todaysDescription-paragraph")

  descriptionParagraph.textContent = `Today: ${descriptionValue}. The high will be ${roundUp(max)}°. The low will be ${roundUp(min)}°.`

  description.appendChild(descriptionParagraph)

  appendToMainDisplay(description)
}

export function createDailyForecast(dailyForecastArr) {
  const dailyForecastSection = document.createElement("section")
  dailyForecastSection.classList.add("dailyForecastSection")

  const dailyForecastHeading = document.createElement("h2")
  dailyForecastHeading.textContent = "Daily Forecast"
  dailyForecastHeading.classList.add("dailyForecast-heading")

  const dailyForecastList = document.createElement("ul")
  dailyForecastList.classList.add("dailyForecast-list")

  for (let i = 1; i < dailyForecastArr.length; i += 1) {
    const dailyForecast = document.createElement("li")

    const day = document.createElement("div")
    const weatherIcon = new Image()
    const highAndLowContainer = document.createElement("div")
    const high = document.createElement("span")
    const low = document.createElement("span")

    dailyForecast.classList.add("dailyForecast")

    day.classList.add("dailyForecast-day")
    weatherIcon.classList.add("dailyForecast-weatherImage")
    highAndLowContainer.classList.add("dailyForecast-highAndLowContainer")
    high.classList.add("dailyForecast-highAndLowContainer-high")
    low.classList.add("dailyForecast-highAndLowContainer-low")

    day.textContent = `${getDayFromUnixTimestamp(dailyForecastArr[i].dt)}`
    handleWeatherIcon(
      weatherIcon,
      dailyForecastArr[i].weather[0].icon,
      dailyForecastArr[i].weather[0].description,
    )
    high.textContent = `${roundUp(dailyForecastArr[i].temp.max)}°`
    low.textContent = `${roundUp(dailyForecastArr[i].temp.min)}°`

    highAndLowContainer.appendChild(high)
    highAndLowContainer.appendChild(low)

    dailyForecast.appendChild(day)
    dailyForecast.appendChild(weatherIcon)
    dailyForecast.appendChild(highAndLowContainer)

    dailyForecastList.appendChild(dailyForecast)
  }

  dailyForecastSection.append(dailyForecastHeading, dailyForecastList)
  appendToContentWrapper(dailyForecastSection)
}

export function createGeneralInfo(weatherObj) {
  const generalInfoSection = document.createElement("section")
  generalInfoSection.classList.add("generalInfoSection")

  const generalInfoHeading = document.createElement("h2")
  generalInfoHeading.textContent = "General information"
  generalInfoHeading.classList.add("generalInfo-heading")

  const generalInfoList = document.createElement("ol")
  generalInfoList.classList.add("generalInfo-list")

  const { sunrise, sunset } = weatherObj.daily[0]

  const sunriseContainer = document.createElement("li")
  const sunriseTitle = document.createElement("div")
  const sunriseValue = document.createElement("div")

  sunriseTitle.textContent = "SUNRISE"
  sunriseValue.textContent = `${getHoursAndMinutes(sunrise)}`

  const sunsetContainer = document.createElement("li")
  const sunsetTitle = document.createElement("div")
  const sunsetValue = document.createElement("div")

  sunsetTitle.textContent = "SUNSET"
  sunsetValue.textContent = `${getHoursAndMinutes(sunset)}`

  sunriseTitle.classList.add("generalInfo-title")
  sunriseValue.classList.add("generalInfo-value")

  sunsetTitle.classList.add("generalInfo-title")
  sunsetValue.classList.add("generalInfo-value")

  sunriseContainer.classList.add("generalInfo")
  sunsetContainer.classList.add("generalInfo")

  sunriseContainer.append(sunriseTitle, sunriseValue)
  sunsetContainer.append(sunsetTitle, sunsetValue)

  const { pop } = weatherObj.hourly[0]

  const chanceOfRainContainer = document.createElement("li")
  const chanceOfRainTitle = document.createElement("div")
  const chanceOfRainValue = document.createElement("div")

  chanceOfRainTitle.textContent = "CHANCE OF RAIN"
  chanceOfRainValue.textContent = `${convertPopToPercentage(pop)}%`

  chanceOfRainTitle.classList.add("generalInfo-title")
  chanceOfRainValue.classList.add("generalInfo-value")

  chanceOfRainContainer.classList.add("generalInfo")

  chanceOfRainContainer.append(chanceOfRainTitle, chanceOfRainValue)

  const { humidity } = weatherObj.hourly[0]

  const humidityContainer = document.createElement("li")
  const humidityTitle = document.createElement("div")
  const humidityValue = document.createElement("div")

  humidityTitle.textContent = "HUMIDITY"
  humidityValue.textContent = `${humidity}%`

  humidityTitle.classList.add("generalInfo-title")
  humidityValue.classList.add("generalInfo-value")

  humidityContainer.classList.add("generalInfo")

  humidityContainer.append(humidityTitle, humidityValue)

  const { wind_speed: windSpeed, wind_deg: windDeg } = weatherObj.hourly[0]

  const windContainer = document.createElement("li")
  const windTitle = document.createElement("div")
  const windValue = document.createElement("div")

  windTitle.textContent = "WIND"

  const compassDirection = findCompassDirection(windDeg)

  windValue.textContent = `${compassDirection} ${roundUp(handleCorrectMetric(windSpeed))} km/hr`

  windTitle.classList.add("generalInfo-title")
  windValue.classList.add("generalInfo-value")

  windContainer.classList.add("generalInfo")

  windContainer.append(windTitle, windValue)

  const { feels_like: feelsLike } = weatherObj.hourly[0]

  const feelsLikeContainer = document.createElement("li")
  const feelsLikeTitle = document.createElement("div")
  const feelsLikeValue = document.createElement("div")

  feelsLikeTitle.textContent = "FEELS LIKE"
  feelsLikeValue.textContent = `${roundUp(feelsLike)}°`

  feelsLikeTitle.classList.add("generalInfo-title")
  feelsLikeValue.classList.add("generalInfo-value")

  feelsLikeContainer.classList.add("generalInfo")

  feelsLikeContainer.append(feelsLikeTitle, feelsLikeValue)

  const { rain } = weatherObj.daily[0]

  const precipitationContainer = document.createElement("li")
  const precipitationTitle = document.createElement("div")
  const precipitationValue = document.createElement("div")

  precipitationTitle.textContent = "PRECIPITATION"
  precipitationValue.textContent = `${rain} mm/h`

  if (rain === undefined) {
    precipitationValue.textContent = 0
  }

  precipitationTitle.classList.add("generalInfo-title")
  precipitationValue.classList.add("generalInfo-value")

  precipitationContainer.classList.add("generalInfo")

  precipitationContainer.append(precipitationTitle, precipitationValue)

  const { pressure } = weatherObj.hourly[0]

  const pressureContainer = document.createElement("li")
  const pressureTitle = document.createElement("div")
  const pressureValue = document.createElement("div")

  pressureTitle.textContent = "PRESSURE"
  pressureValue.textContent = `${pressure} hPa`

  pressureTitle.classList.add("generalInfo-title")
  pressureValue.classList.add("generalInfo-value")

  pressureContainer.classList.add("generalInfo")

  pressureContainer.append(pressureTitle, pressureValue)

  const { visibility } = weatherObj.hourly[0]

  const visibilityContainer = document.createElement("li")
  const visibilityTitle = document.createElement("div")
  const visibilityValue = document.createElement("div")

  visibilityTitle.textContent = "VISIBILITY"
  visibilityValue.textContent = `${convertMetersToKilometers(visibility)} km`

  visibilityTitle.classList.add("generalInfo-title")
  visibilityValue.classList.add("generalInfo-value")

  visibilityContainer.classList.add("generalInfo")

  visibilityContainer.append(visibilityTitle, visibilityValue)

  const { uvi } = weatherObj.hourly[0]

  const uviIndexContainer = document.createElement("li")
  const uviIndexTitle = document.createElement("div")
  const uviIndexValue = document.createElement("div")

  uviIndexTitle.textContent = "UVI INDEX"
  uviIndexValue.textContent = `${uvi}`

  uviIndexTitle.classList.add("generalInfo-title")
  uviIndexValue.classList.add("generalInfo-value")

  uviIndexContainer.classList.add("generalInfo")

  uviIndexContainer.append(uviIndexTitle, uviIndexValue)

  generalInfoList.append(
    sunriseContainer,
    sunsetContainer,
    chanceOfRainContainer,
    humidityContainer,
    windContainer,
    pressureContainer,
    feelsLikeContainer,
    precipitationContainer,
    precipitationContainer,
    visibilityContainer,
    uviIndexContainer,
  )

  generalInfoSection.append(generalInfoHeading, generalInfoList)

  appendToContentWrapper(generalInfoSection)
}
