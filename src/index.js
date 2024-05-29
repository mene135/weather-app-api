import { fromUnixTime, getHours, getDay } from "date-fns"

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

getDayFromUnixTimestamp(1716976800)

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
      console.log(arr[i].dt)
      console.log(`${getHourFromUnixTimestamp(arr[i].dt)}`)
      hour.textContent = `${getHourFromUnixTimestamp(arr[i].dt)}`
    }

    if (arr[i].pop !== 0) {
      rainChance.textContent = `${convertPopToPercentage(arr[i].pop)}%`
    }

    weatherImage.src = getWeatherIcon(arr[i].weather[0].icon)

    console.log(arr[i].tem)

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

function createDescription(obj) {
  console.log(obj)
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

const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", (e) => {
  const searchValue = document.querySelector(".search-input").value
  const searchInput = document.querySelector(".search-input")
  searchInput.value = ""

  handleCitySearch(searchValue)
  e.preventDefault()
})
