import { getWeatherIcon } from "./apiFunctions"
import { roundUp, convertMetersToKilometers, convertPopToPercentage, handleCorrectMetric, getDayFromUnixTimestamp, getHourFromUnixTimestamp, getHoursAndMinutes, findCompassDirection } from "./helperFunctions"



export function createMainInfo(result, weather) {
    const mainInfo = document.createElement("div")
    mainInfo.classList.add("mainInfoDisplay")

    const { name: cityName } = result

    const city = document.createElement("div")
    city.textContent = `${cityName}`
    city.classList.add("city")

    const { main } = weather.current.weather[0]

    const cityWeather = document.createElement("div")
    cityWeather.textContent = `${main}`
    cityWeather.classList.add("city-weather")

    const { temp } = weather.current

    const cityTemp = document.createElement("div")
    cityTemp.textContent = `${roundUp(temp)}°`
    cityTemp.classList.add("city-temperature")

    const { min, max } = weather.daily[0].temp

    const cityHighAndLowContainer = document.createElement("div")
    const cityHigh = document.createElement("div")
    const cityLow = document.createElement("div")


    cityHigh.textContent = `H:${roundUp(max)}°`
    cityLow.textContent = `L:${roundUp(min)}°`

    cityHighAndLowContainer.classList.add("city-highAndLowTemp")
    cityHigh.classList.add("city-high")
    cityLow.classList.add("city-low")

    cityHighAndLowContainer.append(cityHigh, cityLow)

    mainInfo.append(city, cityWeather, cityTemp, cityHighAndLowContainer)

    const contentWrapper = document.querySelector(".weather-content-wrapper")
    contentWrapper.appendChild(mainInfo)
}

export function createHourlyForecast(weather) {
    const arr24Hours = weather.hourly.slice(0, 24)

    const hourlyForecastContainer = document.createElement("div")
  
    for (let i = 0; i < arr24Hours.length; i += 1) {
      const hourlyForecast = document.createElement("div")
      const hour = document.createElement("div")
      const rainChance = document.createElement("div")
      const weatherImage = new Image()
      const temperature = document.createElement("div")
  
      hourlyForecastContainer.classList.add("hourlyForecastContainer")
  
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
  
      hourlyForecast.appendChild(hour)
      hourlyForecast.appendChild(rainChance)
      hourlyForecast.appendChild(weatherImage)
      hourlyForecast.appendChild(temperature)
  
      hourlyForecastContainer.appendChild(hourlyForecast)
  
      const contentWrapper = document.querySelector(".weather-content-wrapper")
      contentWrapper.appendChild(hourlyForecastContainer)
    }
}

export function createDescription(obj) {
    const { max , min } = obj.temp
    const descriptionValue = obj.weather[0].description
  
    const description = document.createElement("div")
    const descriptionParagraph = document.createElement("p")
  
    description.classList.add("todaysDescription")
    descriptionParagraph.classList.add("todaysDescription-paragraph")
  
    descriptionParagraph.textContent = `Today: ${descriptionValue}. The high will be ${roundUp(max)}°. The low will be ${roundUp(min)}°.`
  
    description.appendChild(descriptionParagraph)

    const contentWrapper = document.querySelector(".weather-content-wrapper")
    contentWrapper.appendChild(description)
}

export function createDailyForecast(arr) {
    const dailyForecastContainer = document.createElement("div")
  
    dailyForecastContainer.classList.add("dailyForecastContainer")
  
    for(let i = 1; i < arr.length; i += 1) {
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
  
      day.textContent = `${getDayFromUnixTimestamp(arr[i].dt)}`
      weatherIcon.src = getWeatherIcon(arr[i].weather[0].icon)
      high.textContent = `${roundUp(arr[i].temp.max)}°`
      low.textContent = `${roundUp(arr[i].temp.min)}°`
  
      highAndLowContainer.appendChild(high)
      highAndLowContainer.appendChild(low)
  
      dailyForecast.appendChild(day)
      dailyForecast.appendChild(weatherIcon)
      dailyForecast.appendChild(highAndLowContainer)
  
      dailyForecastContainer.appendChild(dailyForecast)
    }
    
    const contentWrapper = document.querySelector(".weather-content-wrapper")
    contentWrapper.appendChild(dailyForecastContainer)
}



export function createGeneralInfo(obj) {
    const generalInformation = document.createElement("div")
  
    generalInformation.classList.add("generalInformation")
  
    const { sunrise, sunset } = obj.daily[0]
  
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
  
    sunriseTitle.classList.add("generalInformation-container-title")
    sunriseValue.classList.add("generalInformation-container-value")
  
    sunsetTitle.classList.add("generalInformation-container-title")
    sunsetValue.classList.add("generalInformation-container-value")
  
    sunriseContainer.classList.add("generalInformation-container")
    sunsetContainer.classList.add("generalInformation-container")
  
    sunriseContainer.append(sunriseTitle, sunriseValue)
    sunsetContainer.append(sunsetTitle, sunsetValue)
  
    const { pop } = obj.hourly[0]
  
    const chanceOfRainContainer = document.createElement("div")
    const chanceOfRainTitle = document.createElement("div")
    const chanceOfRainValue = document.createElement("div")
  
    chanceOfRainTitle.textContent = "CHANCE OF RAIN"
    chanceOfRainValue.textContent = `${convertPopToPercentage(pop)}%`
  
    chanceOfRainTitle.classList.add("generalInformation-container-title")
    chanceOfRainValue.classList.add("generalInformation-container-value")
  
    chanceOfRainContainer.classList.add("generalInformation-container")
  
    chanceOfRainContainer.append(chanceOfRainTitle, chanceOfRainValue)
  
    const { humidity } = obj.hourly[0]
  
    const humidityContainer = document.createElement("div")
    const humidityTitle = document.createElement("div")
    const humidityValue = document.createElement("div")
  
    humidityTitle.textContent = "HUMIDITY"
    humidityValue.textContent = `${humidity}%`
  
    humidityTitle.classList.add("generalInformation-container-title")
    humidityValue.classList.add("generalInformation-container-value")
  
    humidityContainer.classList.add("generalInformation-container")
  
    humidityContainer.append(humidityTitle, humidityValue)
  
    const { wind_speed, wind_deg } = obj.hourly[0]
  
    const windContainer = document.createElement("div")
    const windTitle = document.createElement("div")
    const windValue = document.createElement("div")
  
    windTitle.textContent = "WIND"

    let compassDirection = findCompassDirection(wind_deg)

    windValue.textContent = `${(compassDirection)} ${roundUp(handleCorrectMetric(wind_speed))} km/hr`
  
    windTitle.classList.add("generalInformation-container-title")
    windValue.classList.add("generalInformation-container-value")
  
    windContainer.classList.add("generalInformation-container")
  
    windContainer.append(windTitle, windValue)
  
    const { feels_like } = obj.hourly[0]
  
    const feelsLikeContainer = document.createElement("div")
    const feelsLikeTitle = document.createElement("div")
    const feelsLikeValue = document.createElement("div")
  
    feelsLikeTitle.textContent = "FEELS LIKE"
    feelsLikeValue.textContent = `${roundUp(feels_like)}°`
  
    feelsLikeTitle.classList.add("generalInformation-container-title")
    feelsLikeValue.classList.add("generalInformation-container-value")
  
    feelsLikeContainer.classList.add("generalInformation-container")
  
    feelsLikeContainer.append(feelsLikeTitle, feelsLikeValue)
  
    const { rain } = obj.daily[0]
  
    const precipitationContainer = document.createElement("div")
    const precipitationTitle = document.createElement("div")
    const precipitationValue = document.createElement("div")
  
    precipitationTitle.textContent = "PRECIPITATION"
    precipitationValue.textContent = `${rain} mm/h`
  
    if(rain === undefined) {
      precipitationValue.textContent = 0;
    }
  
    precipitationTitle.classList.add("generalInformation-container-title")
    precipitationValue.classList.add("generalInformation-container-value")
  
    precipitationContainer.classList.add("generalInformation-container")
  
    precipitationContainer.append(precipitationTitle, precipitationValue)
  
    const { pressure } = obj.hourly[0]
  
    const pressureContainer = document.createElement("div")
    const pressureTitle = document.createElement("div")
    const pressureValue = document.createElement("div")
  
    pressureTitle.textContent = "PRESSURE"
    pressureValue.textContent = `${pressure} hPa`
  
    pressureTitle.classList.add("generalInformation-container-title")
    pressureValue.classList.add("generalInformation-container-value")
  
    pressureContainer.classList.add("generalInformation-container")
  
    pressureContainer.append(pressureTitle, pressureValue)
  
    const { visibility } = obj.hourly[0]
  
    const visibilityContainer = document.createElement("div")
    const visibilityTitle = document.createElement("div")
    const visibilityValue = document.createElement("div")
  
    visibilityTitle.textContent = "VISIBILITY"
    visibilityValue.textContent = `${convertMetersToKilometers(visibility)} km`
  
    visibilityTitle.classList.add("generalInformation-container-title")
    visibilityValue.classList.add("generalInformation-container-value")
  
    visibilityContainer.classList.add("generalInformation-container")
  
    visibilityContainer.append(visibilityTitle, visibilityValue)
  
    const { uvi } = obj.hourly[0]
  
    const uviIndexContainer = document.createElement("div")
    const uviIndexTitle = document.createElement("div")
    const uviIndexValue = document.createElement("div")
  
    uviIndexTitle.textContent = "UVI INDEX" 
    uviIndexValue.textContent = `${uvi}`
  
    uviIndexTitle.classList.add("generalInformation-container-title")
    uviIndexValue.classList.add("generalInformation-container-value")
  
    uviIndexContainer.classList.add("generalInformation-container")
  
    uviIndexContainer.append(uviIndexTitle, uviIndexValue)
  
    generalInformation.append(sunriseContainer, sunsetContainer, chanceOfRainContainer, humidityContainer, windContainer, feelsLikeContainer, precipitationContainer, precipitationContainer, visibilityContainer, uviIndexContainer)
    
    const contentWrapper = document.querySelector(".weather-content-wrapper")
    contentWrapper.appendChild(generalInformation)
  }