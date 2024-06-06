export function getCordinates(city) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`,
    { mode: "cors" },
  )
    .then((res) => {
      if (res.ok === false) {
        throw new Error(
          `getCordinates fetch operation unsuccessful: ${res.status} ${res.statusText}`,
        )
      }
      return res.json()
    })
    .then((res) => {
      const { lat, lon, name } = res[0]
      return { name, lat, lon }
    })
    .catch((err) => {
      console.error(err)
    })
}

export function getWeather(lat, lon, metric) {
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
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.error(err)
    })
}

export function getWeatherIcon(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
