(()=>{"use strict";function e(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}function t(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}function n(e){return t(1e3*e)}function a(e){return t(e).getHours()}function o(e){return Math.floor(100*e)}function r(e){const a=t(n(e)).getDay();return 0===a?"Sunday":1===a?"Monday":2===a?"Tuesday":3===a?"Wednesday":4===a?"Thursday":5===a?"Friday":6===a?"Saturday":void 0}function c(e){let o=n(e),r=a(o),c=t(o).getMinutes();return 1===c.toString(10).length&&(c=`0${c}`),`${r} : ${c}`}function d(e){return Math.round(e)}const i=document.querySelector("body");async function s(t){!function(){let e=document.querySelector(".weather-content-wrapper");e&&e.remove()}();const s=document.createElement("div");s.classList.add("weather-content-wrapper"),i.appendChild(s);const l=await function(e){return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`,{mode:"cors"}).then((e=>{if(console.log(e),!1===e.ok)throw new Error(`getCordinates fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>{console.log(e);const{lat:t,lon:n,name:a}=e[0];return console.log(t,n),{name:a,lat:t,lon:n}})).catch((e=>{console.error(e)}))}(t),{lat:m,lon:u}=l,p=document.querySelector(".selectedMetric");let h;p.contains("metric-celsius")&&(h="metric"),p.contains("metric-fahrenheit")&&(h="imperial");const g=await function(e,t,n){return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${e}&lon=${t}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6&units=${n}`,{mode:"cors"}).then((e=>{if(!1===e.ok)throw new Error(`getWeather fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>(console.log(e),e))).catch((e=>{console.error(e)}))}(m,u,h);!function(e,t){const n=document.createElement("div");n.classList.add("mainInfoDisplay");const{name:a}=e,o=document.createElement("div");o.textContent=`${a}`,o.classList.add("city");const{main:r}=t.current.weather[0],c=document.createElement("div");c.textContent=`${r}`,c.classList.add("city-weather");const{temp:i}=t.current,s=document.createElement("div");s.textContent=`${d(i)}°`,s.classList.add("city-temperature");const{min:l,max:m}=t.daily[0].temp,u=document.createElement("div"),p=document.createElement("div"),h=document.createElement("div");p.textContent=`H:${d(m)}°`,h.textContent=`L:${d(l)}°`,u.classList.add("city-highAndLowTemp"),p.classList.add("city-high"),h.classList.add("city-low"),u.append(p,h),n.append(o,c,s,u),document.querySelector(".weather-content-wrapper").appendChild(n)}(l,g),function(t){t.hourly.slice(0,24);const r=document.createElement("div");for(let t=0;t<arr.length;t+=1){const i=document.createElement("div"),s=document.createElement("div"),l=document.createElement("div"),m=new Image,u=document.createElement("div");r.classList.add("hourlyForecastContainer"),i.classList.add("hourlyForecast"),s.classList.add("hourlyForecast-hour"),l.classList.add("hourlyForecast-rainChance"),m.classList.add("hourlyForecast-weatherImage"),u.classList.add("hourlyForecast-temperature"),s.textContent=0===t?"Now":`${c=arr[t].dt,a(n(c))}`,0!==arr[t].pop&&(l.textContent=`${o(arr[t].pop)}%`),m.src=e(arr[t].weather[0].icon),u.textContent=`${d(arr[t].temp)}°`,i.appendChild(s),i.appendChild(l),i.appendChild(m),i.appendChild(u),r.appendChild(i),document.querySelector(".weather-content-wrapper").appendChild(r)}var c}(g),function(e){const{max:t,min:n}=e.temp,a=e.weather[0].description,o=document.createElement("div"),r=document.createElement("p");o.classList.add("todaysDescription"),r.classList.add("todaysDescription-paragraph"),r.textContent=`Today: ${a}. The high will be ${d(t)}°. The low will be ${d(n)}°.`,o.appendChild(r),document.querySelector(".weather-content-wrapper").appendChild(o)}(g.daily[0]),function(t){const n=document.createElement("div");n.classList.add("dailyForecastContainer");for(let a=1;a<t.length;a+=1){const o=document.createElement("div"),c=document.createElement("div"),i=new Image,s=document.createElement("div"),l=document.createElement("span"),m=document.createElement("span");o.classList.add("dailyForecast"),c.classList.add("dailyForecast-day"),i.classList.add("dailyForecast-weatherImage"),s.classList.add("dailyForecast-highAndLowContainer"),l.classList.add("dailyForecast-highAndLowContainer-high"),m.classList.add("dailyForecast-highAndLowContainer-low"),c.textContent=`${r(t[a].dt)}`,i.src=e(t[a].weather[0].icon),l.textContent=`${d(t[a].temp.max)}°`,m.textContent=`${d(t[a].temp.min)}°`,s.appendChild(l),s.appendChild(m),o.appendChild(c),o.appendChild(i),o.appendChild(s),n.appendChild(o)}document.querySelector(".weather-content-wrapper").appendChild(n)}(g.daily),function(e){const t=document.createElement("div");t.classList.add("generalInformation");const{sunrise:n,sunset:a}=e.daily[0],r=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div");i.textContent="SUNRISE",s.textContent=`${c(n)}`;const l=document.createElement("div"),m=document.createElement("div"),u=document.createElement("div");m.textContent="SUNSET",u.textContent=`${c(a)}`,i.classList.add("generalInformation-container-title"),s.classList.add("generalInformation-container-value"),m.classList.add("generalInformation-container-title"),u.classList.add("generalInformation-container-value"),r.classList.add("generalInformation-container"),l.classList.add("generalInformation-container"),r.append(i,s),l.append(m,u);const{pop:p}=e.hourly[0],h=document.createElement("div"),g=document.createElement("div"),f=document.createElement("div");g.textContent="CHANCE OF RAIN",f.textContent=`${o(p)}%`,g.classList.add("generalInformation-container-title"),f.classList.add("generalInformation-container-value"),h.classList.add("generalInformation-container"),h.append(g,f);const{humidity:E}=e.hourly[0],v=document.createElement("div"),L=document.createElement("div"),y=document.createElement("div");L.textContent="HUMIDITY",y.textContent=`${E}%`,L.classList.add("generalInformation-container-title"),y.classList.add("generalInformation-container-value"),v.classList.add("generalInformation-container"),v.append(L,y);const{wind_speed:C,wind_deg:I}=e.hourly[0],w=document.createElement("div"),N=document.createElement("div"),x=document.createElement("div");var $;N.textContent="WIND",x.textContent=`${function(e){let t=[{directionName:"N",degrees:0},{directionName:"NNE",degrees:22.5},{directionName:"NE",degrees:45},{directionName:"ENE",degrees:67.5},{directionName:"E",degrees:90},{directionName:"ESE",degrees:112.5},{directionName:"SE",degrees:135},{directionName:"SSE",degrees:157.5},{directionName:"S",degrees:180},{directionName:"SSW",degrees:202.5},{directionName:"SW",degrees:225},{directionName:"WSW",degrees:247.5},{directionName:"W",degrees:270},{directionName:"WNW",degrees:292.5},{directionName:"NW",degrees:315},{directionName:"NNW",degrees:337.5},{directionName:"N",degrees:360}];for(let n=0;n<t.length;n+=1){if(t[n].degrees===e)return t[n].directionName;if(t[n].degrees>e){let a=e-t[n-1].degrees,o=t[n].degrees-e;return console.log(a),console.log(o),a<o?t[n-1].directionName:t[n].directionName}}}(I)} ${d(($=C,3.6*$))} km/hr`,N.classList.add("generalInformation-container-title"),x.classList.add("generalInformation-container-value"),w.classList.add("generalInformation-container"),w.append(N,x);const{feels_like:S}=e.hourly[0],b=document.createElement("div"),F=document.createElement("div"),q=document.createElement("div");F.textContent="FEELS LIKE",q.textContent=`${S}°`,F.classList.add("generalInformation-container-title"),q.classList.add("generalInformation-container-value"),b.classList.add("generalInformation-container"),b.append(F,q);const{rain:T}=e.daily[0],D=document.createElement("div"),M=document.createElement("div"),W=document.createElement("div");M.textContent="PRECIPITATION",W.textContent=`${T} mm/h`,void 0===T&&(W.textContent=0),M.classList.add("generalInformation-container-title"),W.classList.add("generalInformation-container-value"),D.classList.add("generalInformation-container"),D.append(M,W);const{pressure:j}=e.hourly[0],k=document.createElement("div"),A=document.createElement("div"),R=document.createElement("div");A.textContent="PRESSURE",R.textContent=`${j} hPa`,A.classList.add("generalInformation-container-title"),R.classList.add("generalInformation-container-value"),k.classList.add("generalInformation-container"),k.append(A,R);const{visibility:U}=e.hourly[0],H=document.createElement("div"),P=document.createElement("div"),O=document.createElement("div");P.textContent="VISIBILITY",O.textContent=`${function(e){return e/100}(U)} km`,P.classList.add("generalInformation-container-title"),O.classList.add("generalInformation-container-value"),H.classList.add("generalInformation-container"),H.append(P,O);const{uvi:_}=e.hourly[0],V=document.createElement("div"),Y=document.createElement("div"),B=document.createElement("div");Y.textContent="UVI INDEX",B.textContent=`${_}`,Y.classList.add("generalInformation-container-title"),B.classList.add("generalInformation-container-value"),V.classList.add("generalInformation-container"),V.append(Y,B),t.append(r,l,h,v,w,b,D,D,H,V),document.querySelector(".weather-content-wrapper").appendChild(t)}(g)}document.querySelector(".toggleMetric").addEventListener("click",(()=>{let e=document.querySelector(".metric-celsius"),t=document.querySelector(".metric-fahrenheit");e.classList.contains("selectedMetric")?(e.classList.remove("selectedMetric"),t.classList.add("selectedMetric")):(e.classList.add("selectedMetric"),t.classList.remove("selectedMetric"))})),document.querySelector(".search-btn").addEventListener("click",(e=>{const t=document.querySelector(".search-input").value;document.querySelector(".search-input").value="",s(t),e.preventDefault()}))})();
//# sourceMappingURL=bundle.js.map