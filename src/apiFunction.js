export function getCordinates() {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=2815b9b71f4c4387bd5d1f3c3f298af6")
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(res => {
        console.log(res)
    }) 
}