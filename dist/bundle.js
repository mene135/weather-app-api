(()=>{"use strict";function e(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}function t(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}function n(e){return t(1e3*e)}function a(e){return t(e).getHours()}function c(e){return Math.floor(100*e)}function d(e){const a=t(n(e)).getDay();return 0===a?"Sunday":1===a?"Monday":2===a?"Tuesday":3===a?"Wednesday":4===a?"Thursday":5===a?"Friday":6===a?"Saturday":void 0}function o(e){let c=n(e),d=a(c),o=t(c).getMinutes();return 1===o.toString(10).length&&(o=`0${o}`),`${d} : ${o}`}function r(e){return Math.round(e)}const i=document.querySelector("main");async function s(t){!function(){let e=document.querySelector(".weather-content-wrapper");e&&e.remove()}();const s=document.createElement("div");s.classList.add("weather-content-wrapper"),i.appendChild(s);const u=await function(e){return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`,{mode:"cors"}).then((e=>{if(console.log(e),!1===e.ok)throw new Error(`getCordinates fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>{console.log(e);const{lat:t,lon:n,name:a}=e[0];return console.log(t,n),{name:a,lat:t,lon:n}})).catch((e=>{console.error(e)}))}(t),{lat:p,lon:h}=u,g=document.querySelector(".selectedMetric");let f;g.classList.contains("metric-celsius")&&(f="metric"),g.classList.contains("metric-fahrenheit")&&(f="imperial");const y=await function(e,t,n){return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${e}&lon=${t}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6&units=${n}`,{mode:"cors"}).then((e=>{if(!1===e.ok)throw new Error(`getWeather fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>(console.log(e),e))).catch((e=>{console.error(e)}))}(p,h,f);!function(e,t){const n=document.createElement("div");n.classList.add("l-mainDisplay");const a=document.createElement("div");a.classList.add("mainInfo");const{name:c}=e,d=document.createElement("div");d.textContent=`${c}`,d.classList.add("city");const{main:o}=t.current.weather[0],i=document.createElement("div");i.textContent=`${o}`,i.classList.add("city-weather");const{temp:s}=t.current,l=document.createElement("div");l.textContent=`${r(s)}°`,l.classList.add("city-temperature");const{min:m,max:u}=t.daily[0].temp,p=document.createElement("div"),h=document.createElement("div"),g=document.createElement("div");h.textContent=`H:${r(u)}°`,g.textContent=`L:${r(m)}°`,p.classList.add("city-highAndLowTemp"),h.classList.add("city-highAndLowTemp-high"),g.classList.add("city-highAndLowTemp-low"),p.append(h,g),a.append(d,i,l,p),n.appendChild(a),document.querySelector(".weather-content-wrapper").appendChild(n)}(u,y),function(t){const d=t.hourly.slice(0,24),o=document.createElement("div");for(let t=0;t<d.length;t+=1){const s=document.createElement("div"),l=document.createElement("div"),m=document.createElement("div"),u=new Image,p=document.createElement("div");o.classList.add("hourlyForecastContainer"),s.classList.add("hourlyForecast"),l.classList.add("hourlyForecast-hour"),m.classList.add("hourlyForecast-rainChance"),u.classList.add("hourlyForecast-weatherImage"),p.classList.add("hourlyForecast-temperature"),l.textContent=0===t?"Now":`${i=d[t].dt,a(n(i))}`,0!==d[t].pop&&(m.textContent=`${c(d[t].pop)}%`),u.src=e(d[t].weather[0].icon),p.textContent=`${r(d[t].temp)}°`,s.appendChild(l),s.appendChild(m),s.appendChild(u),s.appendChild(p),o.appendChild(s);const h=document.querySelector(".l-mainDisplay");h.appendChild(o),document.querySelector(".weather-content-wrapper").appendChild(h)}var i}(y),function(e){const{max:t,min:n}=e.temp,a=e.weather[0].description,c=document.createElement("div"),d=document.createElement("p");c.classList.add("todaysDescription"),d.classList.add("todaysDescription-paragraph"),d.textContent=`Today: ${a}. The high will be ${r(t)}°. The low will be ${r(n)}°.`,c.appendChild(d);const o=document.querySelector(".l-mainDisplay");o.appendChild(c),document.querySelector(".weather-content-wrapper").appendChild(o)}(y.daily[0]),function(t){const n=document.createElement("div");n.classList.add("dailyForecastContainer");for(let a=1;a<t.length;a+=1){const c=document.createElement("div"),o=document.createElement("div"),i=new Image,s=document.createElement("div"),l=document.createElement("span"),m=document.createElement("span");c.classList.add("dailyForecast"),o.classList.add("dailyForecast-day"),i.classList.add("dailyForecast-weatherImage"),s.classList.add("dailyForecast-highAndLowContainer"),l.classList.add("dailyForecast-highAndLowContainer-high"),m.classList.add("dailyForecast-highAndLowContainer-low"),o.textContent=`${d(t[a].dt)}`,i.src=e(t[a].weather[0].icon),l.textContent=`${r(t[a].temp.max)}°`,m.textContent=`${r(t[a].temp.min)}°`,s.appendChild(l),s.appendChild(m),c.appendChild(o),c.appendChild(i),c.appendChild(s),n.appendChild(c)}document.querySelector(".weather-content-wrapper").appendChild(n)}(y.daily),function(e){const t=document.createElement("div");t.classList.add("generalInfo-container");const{sunrise:n,sunset:a}=e.daily[0],d=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div");i.textContent="SUNRISE",s.textContent=`${o(n)}`;const l=document.createElement("div"),m=document.createElement("div"),u=document.createElement("div");m.textContent="SUNSET",u.textContent=`${o(a)}`,i.classList.add("generalInfo-title"),s.classList.add("generalInfo-value"),m.classList.add("generalInfo-title"),u.classList.add("generalInfo-value"),d.classList.add("generalInfo"),l.classList.add("generalInfo"),d.append(i,s),l.append(m,u);const{pop:p}=e.hourly[0],h=document.createElement("div"),g=document.createElement("div"),f=document.createElement("div");g.textContent="CHANCE OF RAIN",f.textContent=`${c(p)}%`,g.classList.add("generalInfo-title"),f.classList.add("generalInfo-value"),h.classList.add("generalInfo"),h.append(g,f);const{humidity:y}=e.hourly[0],E=document.createElement("div"),v=document.createElement("div"),L=document.createElement("div");v.textContent="HUMIDITY",L.textContent=`${y}%`,v.classList.add("generalInfo-title"),L.classList.add("generalInfo-value"),E.classList.add("generalInfo"),E.append(v,L);const{wind_speed:C,wind_deg:w}=e.hourly[0],I=document.createElement("div"),S=document.createElement("div"),x=document.createElement("div");S.textContent="WIND";let N=function(e){let t=[{directionName:"N",degrees:0},{directionName:"NNE",degrees:22.5},{directionName:"NE",degrees:45},{directionName:"ENE",degrees:67.5},{directionName:"E",degrees:90},{directionName:"ESE",degrees:112.5},{directionName:"SE",degrees:135},{directionName:"SSE",degrees:157.5},{directionName:"S",degrees:180},{directionName:"SSW",degrees:202.5},{directionName:"SW",degrees:225},{directionName:"WSW",degrees:247.5},{directionName:"W",degrees:270},{directionName:"WNW",degrees:292.5},{directionName:"NW",degrees:315},{directionName:"NNW",degrees:337.5},{directionName:"N",degrees:360}];for(let n=0;n<t.length;n+=1){if(t[n].degrees===e)return t[n].directionName;if(t[n].degrees>e)return e-t[n-1].degrees<t[n].degrees-e?t[n-1].directionName:t[n].directionName}}(w);x.textContent=`${N} ${r(function(e){if(document.querySelector(".selectedMetric").classList.contains("metric-celsius")){let t=function(e){return 3.6*e}(e);return t}return function(e){return 1.609344*e}(e)}(C))} km/hr`,S.classList.add("generalInfo-title"),x.classList.add("generalInfo-value"),I.classList.add("generalInfo"),I.append(S,x);const{feels_like:$}=e.hourly[0],q=document.createElement("div"),b=document.createElement("div"),F=document.createElement("div");b.textContent="FEELS LIKE",F.textContent=`${r($)}°`,b.classList.add("generalInfo-title"),F.classList.add("generalInfo-value"),q.classList.add("generalInfo"),q.append(b,F);const{rain:T}=e.daily[0],D=document.createElement("div"),M=document.createElement("div"),W=document.createElement("div");M.textContent="PRECIPITATION",W.textContent=`${T} mm/h`,void 0===T&&(W.textContent=0),M.classList.add("generalInfo-title"),W.classList.add("generalInfo-value"),D.classList.add("generalInfo"),D.append(M,W);const{pressure:A}=e.hourly[0],j=document.createElement("div"),k=document.createElement("div"),R=document.createElement("div");k.textContent="PRESSURE",R.textContent=`${A} hPa`,k.classList.add("generalInfo-title"),R.classList.add("generalInfo-value"),j.classList.add("generalInfo"),j.append(k,R);const{visibility:U}=e.hourly[0],H=document.createElement("div"),P=document.createElement("div"),O=document.createElement("div");P.textContent="VISIBILITY",O.textContent=U/100+" km",P.classList.add("generalInfo-title"),O.classList.add("generalInfo-value"),H.classList.add("generalInfo"),H.append(P,O);const{uvi:_}=e.hourly[0],B=document.createElement("div"),V=document.createElement("div"),Y=document.createElement("div");V.textContent="UVI INDEX",Y.textContent=`${_}`,V.classList.add("generalInfo-title"),Y.classList.add("generalInfo-value"),B.classList.add("generalInfo"),B.append(V,Y),t.append(d,l,h,E,I,j,q,D,D,H,B),document.querySelector(".weather-content-wrapper").appendChild(t)}(y),m(l)}document.querySelector(".toggleMetric").addEventListener("click",(()=>{let e=document.querySelector(".metric-celsius"),t=document.querySelector(".metric-fahrenheit");e.classList.contains("selectedMetric")?(e.classList.remove("selectedMetric"),t.classList.add("selectedMetric")):(e.classList.add("selectedMetric"),t.classList.remove("selectedMetric")),document.querySelector(".weather-content-wrapper")&&s(document.querySelector(".city").textContent)})),document.querySelector(".search-btn").addEventListener("click",(e=>{const t=document.querySelector(".search-input").value;document.querySelector(".search-input").value="",s(t),e.preventDefault()}));const l=window.matchMedia("(min-width: 768px");function m(e){let t=document.querySelector(".generalInfo-container"),n=document.querySelector(".dailyForecastContainer");const a=document.querySelector(".weather-content-wrapper");e.matches?(t.remove(),a.insertBefore(t,n)):(t.remove(),a.appendChild(t))}l.addEventListener("change",m)})();
//# sourceMappingURL=bundle.js.map