import { getCordinates } from "./apiFunction.js"

const searchBtn = document.querySelector(".search-btn")

searchBtn.addEventListener("click", (e) => {
    console.log("hello")
    e.preventDefault()
    const city = document.querySelector(".search-input").value
    getCordinates(city)
})