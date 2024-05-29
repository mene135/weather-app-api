(()=>{"use strict";function e(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}function t(t){return o=e(1e3*t),e(o).getHours();var o}function o(e){return Math.round(e)}function n(e){const n=document.createElement("div");for(let c=0;c<e.length;c+=1){const a=document.createElement("div"),l=document.createElement("div"),s=document.createElement("div"),u=new Image,d=document.createElement("div");n.classList.add("hourlyForecastContainer"),a.classList.add("hourlyForecast"),l.classList.add("hourlyForecast-hour"),s.classList.add("hourlyForecast-rainChance"),u.classList.add("hourlyForecast-weatherImage"),d.classList.add("hourlyForecast-temperature"),0===c?l.textContent="Now":(console.log(e[c].dt),console.log(`${t(e[c].dt)}`),l.textContent=`${t(e[c].dt)}`),0!==e[c].pop&&(s.textContent=`${r=e[c].pop,Math.floor(100*r)}%`),u.src=`https://openweathermap.org/img/wn/${e[c].weather[0].icon}@2x.png`,console.log(e[c].tem),d.textContent=`${o(e[c].temp)}°`,a.appendChild(l),a.appendChild(s),a.appendChild(u),a.appendChild(d),n.appendChild(a),document.querySelector("body").appendChild(n)}var r}document.querySelector(".search-btn").addEventListener("click",(e=>{const t=document.querySelector(".search-input").value;document.querySelector(".search-input").value="",async function(e){const t=await function(e){return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`,{mode:"cors"}).then((e=>{if(console.log(e),!1===e.ok)throw new Error(`getCordinates fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>{console.log(e);const{lat:t,lon:o,name:n}=e[0];return console.log(t,o),{name:n,lat:t,lon:o}})).catch((e=>{console.error(e)}))}(e),{name:r,lat:c,lon:a}=t,l=await function(e,t){return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${e}&lon=${t}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6&units=metric`,{mode:"cors"}).then((e=>{if(!1===e.ok)throw new Error(`getWeather fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>(console.log(e),e))).catch((e=>{console.error(e)}))}(c,a);console.log(l),document.querySelector(".city").textContent=r;const{main:s}=l.current.weather[0];document.querySelector(".city-weather").textContent=s;const{temp:u}=l.current;document.querySelector(".city-temperature").textContent=`${o(u)}°`;const{min:d,max:i}=l.daily[0].temp,p=document.querySelector(".city-high"),h=document.querySelector(".city-low");p.textContent=`H:${o(i)}°`,h.textContent=`L:${o(d)}°`;const m=l.hourly.slice(0,24);null!==document.querySelector(".hourlyForecastContainer")?(document.querySelector(".hourlyForecastContainer").remove(),n(m)):n(m),function(e){console.log(e);const{max:t,min:n}=e.temp,r=e.weather[0].description,c=document.createElement("div"),a=document.createElement("p");c.classList.add("todaysDescription"),a.classList.add("todaysDescription-paragraph"),a.textContent=`Today: ${r}. The high will be ${o(t)}°. The low will be ${o(n)}°`,c.appendChild(a),document.querySelector("body").appendChild(c)}(l.daily[0])}(t),e.preventDefault()}))})();
//# sourceMappingURL=bundle.js.map