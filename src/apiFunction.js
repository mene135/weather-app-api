export function getCordinates(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`)
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(res => {
        console.log(res)
        const {lat, lon} = res[0];
        console.log(lat, lon)
        getWeather(lat, lon)
    }) 
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6`)
    .then(res => {
      return  res.json()
    }) 
    .then(res => {
        console.log(res)
    })
}