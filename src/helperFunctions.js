import { fromUnixTime, getHours, getMinutes, getDay } from "date-fns"

export function convertPopToPercentage(unit) {
  return Math.floor(unit * 100)
}

function convertMetersPerSecondToKhH(unit) {
  return unit * 3.6
}

function convertMilesPerHourToKhH(unit) {
  return unit * 1.609344
}

export function convertMetersToKilometers(unit) {
  return unit / 100
}

export function getHourFromUnixTimestamp(unix) {
  return getHours(fromUnixTime(unix))
}

export function handleCorrectMetric(unit) {
  const selected = document.querySelector(".selectedMetric")

  if (selected.classList.contains("metric-celsius")) {
    return convertMetersPerSecondToKhH(unit)
  }

  return convertMilesPerHourToKhH(unit)
}

export function getDayFromUnixTimestamp(unix) {
  const day = getDay(fromUnixTime(unix))

  if (day === 0) {
    return "Sunday"
  }

  if (day === 1) {
    return "Monday"
  }

  if (day === 2) {
    return "Tuesday"
  }

  if (day === 3) {
    return "Wednesday"
  }

  if (day === 4) {
    return "Thursday"
  }

  if (day === 5) {
    return "Friday"
  }

  if (day === 6) {
    return "Saturday"
  }

  return undefined
}

export function getHoursAndMinutes(unit) {
  const date = fromUnixTime(unit)
  const hours = getHours(date)
  let minutes = getMinutes(date)

  if (minutes.toString(10).length === 1) {
    minutes = `0${minutes}`
  }

  return `${hours} : ${minutes}`
}

export function roundUp(unit) {
  return Math.round(unit)
}

export function findCompassDirection(deg) {
  const directionsArr = [
    { directionName: "N", degrees: 0 },
    { directionName: "NNE", degrees: 22.5 },
    { directionName: "NE", degrees: 45 },
    { directionName: "ENE", degrees: 67.5 },
    { directionName: "E", degrees: 90 },
    { directionName: "ESE", degrees: 112.5 },
    { directionName: "SE", degrees: 135 },
    { directionName: "SSE", degrees: 157.5 },
    { directionName: "S", degrees: 180 },
    { directionName: "SSW", degrees: 202.5 },
    { directionName: "SW", degrees: 225 },
    { directionName: "WSW", degrees: 247.5 },
    { directionName: "W", degrees: 270 },
    { directionName: "WNW", degrees: 292.5 },
    { directionName: "NW", degrees: 315 },
    { directionName: "NNW", degrees: 337.5 },
    { directionName: "N", degrees: 360 },
  ]

  for (let i = 0; i < directionsArr.length; i += 1) {
    if (directionsArr[i].degrees === deg) {
      return directionsArr[i].directionName
    }

    if (directionsArr[i].degrees > deg) {
      const prevMinusDeg = deg - directionsArr[i - 1].degrees
      const currMinusDeg = directionsArr[i].degrees - deg

      if (prevMinusDeg < currMinusDeg) {
        return directionsArr[i - 1].directionName
      }

      return directionsArr[i].directionName
    }
  }

  return undefined
}

export function clearContentWrapper() {
  const content = document.querySelector(".weather-content-wrapper")

  if (content) {
    content.remove()
  }
}

export function appendToMainDisplay(element) {
  document.querySelector(".l-mainDisplay").appendChild(element)
}

export function appendToContentWrapper(element) {
  document.querySelector(".weather-content-wrapper").appendChild(element)
}
