import { fromUnixTime, getHours, getMinutes, getDay } from "date-fns"

const body = document.querySelector("body")


function getHourFromUnixTimestamp(unix) {
  const date = fromUnixTime(unix)
  const hour = getHours(date)

  return hour
}

function roundUp(unit) {
  return Math.round(unit)
}

function convertPopToPercentage(unit) {
  return Math.floor(unit * 100)
}

function convertMetersPerSecondToKhH(unit) {
  return 3.6 * unit
}

function convertMetersToKilometers(unit) {
  return unit / 100
}

function getDayFromUnixTimestamp(unix) {
  const date = fromUnixTime(unix)
  const day = getDay(date)

  if(day === 0) {
    return "Sunday"
  } 

  if(day === 1) {
    return "Monday"
  }

  if(day === 2) {
    return "Tuesday"
  }
  
  if(day === 3) {
    return "Wednesday"
  }

  if(day === 4) {
    return "Thursday"
  }

  if(day === 5) {
    return "Friday"
  }

  if(day === 6) {
    return "Saturday"
  }
}

function getWeatherIcon(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

function clearHourlyForecastContainer() {
  document.querySelector(".hourlyForecastContainer").remove()
}

function createHourlyForecast(arr) {
  const hourlyForecastContainer = document.createElement("div")

  for (let i = 0; i < arr.length; i += 1) {
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
      hour.textContent = `${getHourFromUnixTimestamp(arr[i].dt)}`
    }

    if (arr[i].pop !== 0) {
      rainChance.textContent = `${convertPopToPercentage(arr[i].pop)}%`
    }

    weatherImage.src = getWeatherIcon(arr[i].weather[0].icon)

    temperature.textContent = `${roundUp(arr[i].temp)}°`

    hourlyForecast.appendChild(hour)
    hourlyForecast.appendChild(rainChance)
    hourlyForecast.appendChild(weatherImage)
    hourlyForecast.appendChild(temperature)

    hourlyForecastContainer.appendChild(hourlyForecast)

    const body = document.querySelector("body")

    body.appendChild(hourlyForecastContainer)
  }
}

function getCordinates(city) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`,
    { mode: "cors" },
  )
    .then((res) => {
      console.log(res)
      if (res.ok === false) {
        throw new Error(
          `getCordinates fetch operation unsuccessful: ${res.status} ${res.statusText}`,
        )
      }
      return res.json()
    })
    .then((res) => {
      console.log(res)
      const { lat, lon, name } = res[0]
      console.log(lat, lon)
      return { name, lat, lon }
    })
    .catch((err) => {
      console.error(err)
    })
}

function getWeather(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6&units=metric`,
    { mode: "cors" },
  )
    .then((res) => {
      if (res.ok === false) {
        throw new Error(
          `getWeather fetch operation unsuccessful: ${res.status} ${res.statusText}`,
        )
      }
      return res.json()
    })
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.error(err)
    })
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

function createDailyForecast(arr) {
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

  const body = document.querySelector("body")

  body.appendChild(dailyForecastContainer)
}

function getHoursAndMinutes(unit) {
  let result1 = fromUnixTime(unit)
  let hours = getHours(result1)
  let minutes = getMinutes(result1)

  if(minutes.toString(10).length === 1) {
    minutes = `0${minutes}`
  }

  return `${hours} : ${minutes}`
}

function createDescription(obj) {
  const { max , min } = obj.temp
  const descriptionValue = obj.weather[0].description

  const description = document.createElement("div")
  const descriptionParagraph = document.createElement("p")

  description.classList.add("todaysDescription")
  descriptionParagraph.classList.add("todaysDescription-paragraph")

  descriptionParagraph.textContent = `Today: ${descriptionValue}. The high will be ${roundUp(max)}°. The low will be ${roundUp(min)}°.`

  description.appendChild(descriptionParagraph)
  const body = document.querySelector("body");
  body.appendChild(description)
}

function createGeneralInfo(obj) {
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
  windValue.textContent = `${findCompassDirection(wind_deg)} ${roundUp(convertMetersPerSecondToKhH(wind_speed))} km/hr`

  windTitle.classList.add("generalInformation-container-title")
  windValue.classList.add("generalInformation-container-value")

  windContainer.classList.add("generalInformation-container")

  windContainer.append(windTitle, windValue)

  const { feels_like } = obj.hourly[0]

  const feelsLikeContainer = document.createElement("div")
  const feelsLikeTitle = document.createElement("div")
  const feelsLikeValue = document.createElement("div")

  feelsLikeTitle.textContent = "FEELS LIKE"
  feelsLikeValue.textContent = `${feels_like}°`

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

  body.appendChild(generalInformation)
}

const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", (e) => {
  const searchValue = document.querySelector(".search-input").value
  const searchInput = document.querySelector(".search-input")
  searchInput.value = ""

  handleCitySearch(searchValue)
  e.preventDefault()
})

function findCompassDirection(deg) {
  let directionsArr = [{directionName: "N", degrees: 0}, {directionName: "NNE", degrees: 22.5}, {directionName: "NE", degrees: 45}, {directionName: "ENE", degrees: 67.5}, {directionName: "E", degrees: 90}, {directionName: "ESE", degrees: 112.5}, {directionName: "SE", degrees: 135}, {directionName: "SSE", degrees: 157.5}, {directionName: "S", degrees: 180}, {directionName: "SSW", degrees: 202.5}, {directionName: "SW", degrees: 225}, {directionName: "WSW", degrees: 247.5}, {directionName: "W", degrees: 270}, {directionName: "WNW", degrees: 292.5}, {directionName: "NW", degrees: 315}, {directionName: "NNW", degrees: 337.5}, {directionName: "N", degrees: 360} ]


  for(let i = 0; i < directionsArr.length; i += 1) {
    if(directionsArr[i].degrees === deg) {
      return directionsArr[i].directionName
    } 

    if(directionsArr[i].degrees > deg) {
      let prevMinusDeg = deg - directionsArr[i - 1].degrees 
      let currMinusDeg = directionsArr[i].degrees - deg

      console.log(prevMinusDeg)
      console.log(currMinusDeg)

      if(prevMinusDeg < currMinusDeg) {
        return directionsArr[i - 1].directionName
      } else {
        return directionsArr[i].directionName
      }
    }
  }
}

console.log(findCompassDirection(290))



