export function getCordinates(city) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`,
    { mode: "cors" },
  )
    .then((res) => {
      if (res.ok === false) {
        throw new Error("Operation unsuccessful")
      }
      return res.json()
    })
    .then((res) => {
      if (res.length === 0) {
        throw new Error("City not found")
      }

      const { lat, lon, name } = res[0]

      return { name, lat, lon }
    })
    .catch((err) => {
      if (err.message === "Failed to fetch") {
        throw new Error("Network error")
      }
      throw err
    })
}

export function getWeather(lat, lon, metric) {
  // Api call with latitude and longitude values to find the city and also a metric value to get either celsius or fahrenheit units, as well as different metrics for wind speed (meters/second) for metric value and (miles/hour) for the imperial value in the metric parameter.
  return fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6&units=${metric}`,
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
    .then((res) => res)
    .catch((err) => {
      console.error(err)
    })
}

export function handleWeatherIcon(weatherImage, iconCode, iconDescription) {
  const image = weatherImage

  image.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  image.setAttribute("alt", `${iconDescription}`)
  image.setAttribute("title", `${iconDescription}`)
}
