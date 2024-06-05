import { getWeatherIcon } from "./apiFunctions"
import { roundUp, convertMetersToKilometers, convertPopToPercentage, handleCorrectMetric, getDayFromUnixTimestamp, getHourFromUnixTimestamp, getHoursAndMinutes, findCompassDirection, appendToMainDisplay, appendToContentWrapper } from "./helperFunctions"

export function createMainDisplay() {
  const mainDisplay = document.createElement("div")
  mainDisplay.classList.add("l-mainDisplay")

  const contentWrapper = document.querySelector(".weather-content-wrapper")
  contentWrapper.appendChild(mainDisplay)
}

export function createMainInfo(cityCoordinates, weatherObj) {
    const mainInfo = document.createElement("div")
    mainInfo.classList.add("mainInfo")

    const { name: cityName } = cityCoordinates

    const city = document.createElement("div")
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

    mainInfo.append(city, cityWeather, cityTemp, cityHighAndLowContainer)

    appendToMainDisplay(mainInfo)
}

export function createHourlyForecast(weatherObj) {
    const arr24Hours = weatherObj.hourly.slice(0, 24)

    const hourlyForecastContainer = document.createElement("div")
    hourlyForecastContainer.classList.add("hourlyForecastContainer")
  
    for (let i = 0; i < arr24Hours.length; i += 1) {
      const hourlyForecast = document.createElement("div")
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
  
      weatherImage.src = getWeatherIcon(arr24Hours[i].weather[0].icon)
  
      temperature.textContent = `${roundUp(arr24Hours[i].temp)}°`
  
      hourlyForecast.append(hour, rainChance, weatherImage, temperature)
      hourlyForecastContainer.appendChild(hourlyForecast)
      }

      appendToMainDisplay(hourlyForecastContainer)
}

export function createDescription(weatherObj) {
    const { max , min } = weatherObj.temp
    const descriptionValue = weatherObj.weather[0].description
  
    const description = document.createElement("div")
    const descriptionParagraph = document.createElement("p")
  
    description.classList.add("todaysDescription")
    descriptionParagraph.classList.add("todaysDescription-paragraph")
  
    descriptionParagraph.textContent = `Today: ${descriptionValue}. The high will be ${roundUp(max)}°. The low will be ${roundUp(min)}°.`
  
    description.appendChild(descriptionParagraph)

    appendToMainDisplay(description)
}

export function createDailyForecast(dailyForecastArr) {
    const dailyForecastContainer = document.createElement("div")
  
    dailyForecastContainer.classList.add("dailyForecastContainer")
  
    for(let i = 1; i < dailyForecastArr.length; i += 1) {
      const dailyForecast = document.createElement("div")
  
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
      weatherIcon.src = getWeatherIcon(dailyForecastArr[i].weather[0].icon)
      high.textContent = `${roundUp(dailyForecastArr[i].temp.max)}°`
      low.textContent = `${roundUp(dailyForecastArr[i].temp.min)}°`
  
      highAndLowContainer.appendChild(high)
      highAndLowContainer.appendChild(low)
  
      dailyForecast.appendChild(day)
      dailyForecast.appendChild(weatherIcon)
      dailyForecast.appendChild(highAndLowContainer)
  
      dailyForecastContainer.appendChild(dailyForecast)
    }
    
    appendToContentWrapper(dailyForecastContainer)
}



export function createGeneralInfo(weatherObj) {
    const generalInfoContainer = document.createElement("div")
  
    generalInfoContainer.classList.add("generalInfo-container")
  
    const { sunrise, sunset } = weatherObj.daily[0]
  
    const sunriseContainer = document.createElement("div")
    const sunriseTitle = document.createElement("div")
    const sunriseValue = document.createElement("div")
  
    sunriseTitle.textContent = "SUNRISE"
    sunriseValue.textContent = `${getHoursAndMinutes(sunrise)}`
  
    const sunsetContainer = document.createElement("div")
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
  
    const chanceOfRainContainer = document.createElement("div")
    const chanceOfRainTitle = document.createElement("div")
    const chanceOfRainValue = document.createElement("div")
  
    chanceOfRainTitle.textContent = "CHANCE OF RAIN"
    chanceOfRainValue.textContent = `${convertPopToPercentage(pop)}%`
  
    chanceOfRainTitle.classList.add("generalInfo-title")
    chanceOfRainValue.classList.add("generalInfo-value")
  
    chanceOfRainContainer.classList.add("generalInfo")
  
    chanceOfRainContainer.append(chanceOfRainTitle, chanceOfRainValue)
  
    const { humidity } = weatherObj.hourly[0]
  
    const humidityContainer = document.createElement("div")
    const humidityTitle = document.createElement("div")
    const humidityValue = document.createElement("div")
  
    humidityTitle.textContent = "HUMIDITY"
    humidityValue.textContent = `${humidity}%`
  
    humidityTitle.classList.add("generalInfo-title")
    humidityValue.classList.add("generalInfo-value")
  
    humidityContainer.classList.add("generalInfo")
  
    humidityContainer.append(humidityTitle, humidityValue)
  
    const { wind_speed:windSpeed, wind_deg:windDeg } = weatherObj.hourly[0]
  
    const windContainer = document.createElement("div")
    const windTitle = document.createElement("div")
    const windValue = document.createElement("div")
  
    windTitle.textContent = "WIND"

    const compassDirection = findCompassDirection(windDeg)

    windValue.textContent = `${(compassDirection)} ${roundUp(handleCorrectMetric(windSpeed))} km/hr`
  
    windTitle.classList.add("generalInfo-title")
    windValue.classList.add("generalInfo-value")
  
    windContainer.classList.add("generalInfo")
  
    windContainer.append(windTitle, windValue)
  
    const { feels_like:feelsLike } = weatherObj.hourly[0]
  
    const feelsLikeContainer = document.createElement("div")
    const feelsLikeTitle = document.createElement("div")
    const feelsLikeValue = document.createElement("div")
  
    feelsLikeTitle.textContent = "FEELS LIKE"
    feelsLikeValue.textContent = `${roundUp(feelsLike)}°`
  
    feelsLikeTitle.classList.add("generalInfo-title")
    feelsLikeValue.classList.add("generalInfo-value")
  
    feelsLikeContainer.classList.add("generalInfo")
  
    feelsLikeContainer.append(feelsLikeTitle, feelsLikeValue)
  
    const { rain } = weatherObj.daily[0]
  
    const precipitationContainer = document.createElement("div")
    const precipitationTitle = document.createElement("div")
    const precipitationValue = document.createElement("div")
  
    precipitationTitle.textContent = "PRECIPITATION"
    precipitationValue.textContent = `${rain} mm/h`
  
    if(rain === undefined) {
      precipitationValue.textContent = 0;
    }
  
    precipitationTitle.classList.add("generalInfo-title")
    precipitationValue.classList.add("generalInfo-value")
  
    precipitationContainer.classList.add("generalInfo")
  
    precipitationContainer.append(precipitationTitle, precipitationValue)
  
    const { pressure } = weatherObj.hourly[0]
  
    const pressureContainer = document.createElement("div")
    const pressureTitle = document.createElement("div")
    const pressureValue = document.createElement("div")
  
    pressureTitle.textContent = "PRESSURE"
    pressureValue.textContent = `${pressure} hPa`
  
    pressureTitle.classList.add("generalInfo-title")
    pressureValue.classList.add("generalInfo-value")
  
    pressureContainer.classList.add("generalInfo")
  
    pressureContainer.append(pressureTitle, pressureValue)
  
    const { visibility } = weatherObj.hourly[0]
  
    const visibilityContainer = document.createElement("div")
    const visibilityTitle = document.createElement("div")
    const visibilityValue = document.createElement("div")
  
    visibilityTitle.textContent = "VISIBILITY"
    visibilityValue.textContent = `${convertMetersToKilometers(visibility)} km`
  
    visibilityTitle.classList.add("generalInfo-title")
    visibilityValue.classList.add("generalInfo-value")
  
    visibilityContainer.classList.add("generalInfo")
  
    visibilityContainer.append(visibilityTitle, visibilityValue)
  
    const { uvi } = weatherObj.hourly[0]
  
    const uviIndexContainer = document.createElement("div")
    const uviIndexTitle = document.createElement("div")
    const uviIndexValue = document.createElement("div")
  
    uviIndexTitle.textContent = "UVI INDEX" 
    uviIndexValue.textContent = `${uvi}`
  
    uviIndexTitle.classList.add("generalInfo-title")
    uviIndexValue.classList.add("generalInfo-value")
  
    uviIndexContainer.classList.add("generalInfo")
  
    uviIndexContainer.append(uviIndexTitle, uviIndexValue)
  
    generalInfoContainer.append(sunriseContainer, sunsetContainer, chanceOfRainContainer, humidityContainer, windContainer, pressureContainer, feelsLikeContainer, precipitationContainer, precipitationContainer, visibilityContainer, uviIndexContainer)
    
    appendToContentWrapper(generalInfoContainer)
  }