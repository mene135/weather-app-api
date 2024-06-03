import { fromUnixTime, getHours, getMinutes, getDay } from "date-fns"

export function convertPopToPercentage(unit) {
    return Math.floor(unit * 100)
}

function convertMetersPerSecondToKhH(unit) {
    return unit * 3.6
}

function convertMilesToKilometers(unit) {
  return unit * 1.609344
}
  
export function convertMetersToKilometers(unit) {
    return unit / 100
}



export function getHourFromUnixTimestamp(unix) {
    const date = fromUnixTime(unix)
    const hour = getHours(date)
  
    return hour
}

export function handleCorrectMetric(unit) {
  let selected = document.querySelector(".selectedMetric")

  if(selected.classList.contains("metric-celsius")) {
    let result = convertMetersPerSecondToKhH(unit)
    return result
  } else {
    return convertMilesToKilometers(unit)
  }
}

export function getDayFromUnixTimestamp(unix) {
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

export function getHoursAndMinutes(unit) {
    let result1 = fromUnixTime(unit)
    let hours = getHours(result1)
    let minutes = getMinutes(result1)

    if(minutes.toString(10).length === 1) {
        minutes = `0${minutes}`
    }

    return `${hours} : ${minutes}`
}

export function roundUp(unit) {
    return Math.round(unit)
}

export function findCompassDirection(deg) {
    let directionsArr = [{directionName: "N", degrees: 0}, {directionName: "NNE", degrees: 22.5}, {directionName: "NE", degrees: 45}, {directionName: "ENE", degrees: 67.5}, {directionName: "E", degrees: 90}, {directionName: "ESE", degrees: 112.5}, {directionName: "SE", degrees: 135}, {directionName: "SSE", degrees: 157.5}, {directionName: "S", degrees: 180}, {directionName: "SSW", degrees: 202.5}, {directionName: "SW", degrees: 225}, {directionName: "WSW", degrees: 247.5}, {directionName: "W", degrees: 270}, {directionName: "WNW", degrees: 292.5}, {directionName: "NW", degrees: 315}, {directionName: "NNW", degrees: 337.5}, {directionName: "N", degrees: 360} ]
  
  
    for(let i = 0; i < directionsArr.length; i += 1) {
      if(directionsArr[i].degrees === deg) {
        return directionsArr[i].directionName
      } 
  
      if(directionsArr[i].degrees > deg) {
        let prevMinusDeg = deg - directionsArr[i - 1].degrees 
        let currMinusDeg = directionsArr[i].degrees - deg
  
        if(prevMinusDeg < currMinusDeg) {
          return directionsArr[i - 1].directionName
        } else {
          return directionsArr[i].directionName
        }
      }
    }
  }
  

