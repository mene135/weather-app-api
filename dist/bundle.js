(()=>{"use strict";function e(e,t,n){e.src=`https://openweathermap.org/img/wn/${t}@2x.png`,e.setAttribute("alt",`${n}`),e.setAttribute("title",`${n}`)}function t(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}function n(e){return t(e).getHours()}function a(e){return t(1e3*e)}function c(e){return Math.floor(100*e)}function o(e){const n=t(a(e)).getDay();return 0===n?"Sunday":1===n?"Monday":2===n?"Tuesday":3===n?"Wednesday":4===n?"Thursday":5===n?"Friday":6===n?"Saturday":void 0}function d(e){const c=a(e),o=n(c);let d=function(e){return t(e).getMinutes()}(c);return 1===d.toString(10).length&&(d=`0${d}`),`${o} : ${d}`}function r(e){return Math.round(e)}const s=window.matchMedia("(min-width: 768px");function i(e){const t=document.querySelector(".generalInfo-container"),n=document.querySelector(".dailyForecastContainer"),a=document.querySelector(".weather-content-wrapper");e.matches&&t?(t.remove(),a.insertBefore(t,n)):t&&(t.remove(),a.appendChild(t))}function l(e){document.querySelector(".l-mainDisplay").appendChild(e)}function u(e){document.querySelector(".weather-content-wrapper").appendChild(e)}s.addEventListener("change",i);const m=document.querySelector("main");function p(){const e=document.querySelector(".loader");e.classList.contains("loader-isHidden")?e.classList.remove("loader-isHidden"):!1===e.classList.contains("loader-isHidden")&&e.classList.add("loader-isHidden")}async function h(t){!function(){const e=document.querySelector(".weather-content-wrapper");e&&e.remove()}(),p(),document.querySelector(".toast").classList.add("toast-isHidden");const h=document.createElement("div");let f;h.classList.add("weather-content-wrapper"),m.appendChild(h);try{f=await function(e){return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`,{mode:"cors"}).then((e=>{if(!1===e.ok)throw new Error(`getCordinates fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>{if(0===e.length)throw new Error("City not found");const{lat:t,lon:n,name:a}=e[0];return{name:a,lat:t,lon:n}})).catch((e=>{if("Failed to fetch"===e.message)throw new Error("Network error");throw e}))}(t),document.querySelector(".toast").classList.add("toast-isHidden")}catch(e){return p(),void function(e){document.querySelector(".toast-message").textContent=`${e}`,document.querySelector(".toast").classList.remove("toast-isHidden")}(e)}const{lat:g,lon:y}=f,L=document.querySelector(".selectedMetric");let v;L.classList.contains("metric-celsius")&&(v="metric"),L.classList.contains("metric-fahrenheit")&&(v="imperial");const E=await function(e,t,n){return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${e}&lon=${t}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6&units=${n}`,{mode:"cors"}).then((e=>{if(!1===e.ok)throw new Error(`getWeather fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>(console.log(e),e))).catch((e=>{console.error(e)}))}(g,y,v);p(),function(){const e=document.createElement("div");e.classList.add("l-mainDisplay"),document.querySelector(".weather-content-wrapper").appendChild(e)}(),function(e,t){const n=document.createElement("div");n.classList.add("mainInfo");const{name:a}=e,c=document.createElement("div");c.textContent=`${a}`,c.classList.add("city");const{main:o}=t.current.weather[0],d=document.createElement("div");d.textContent=`${o}`,d.classList.add("city-weather");const{temp:s}=t.current,i=document.createElement("div");i.textContent=`${r(s)}°`,i.classList.add("city-temperature");const{min:u,max:m}=t.daily[0].temp,p=document.createElement("div"),h=document.createElement("div"),f=document.createElement("div");h.textContent=`H:${r(m)}°`,f.textContent=`L:${r(u)}°`,h.classList.add("city-highAndLowTemp-high"),f.classList.add("city-highAndLowTemp-low"),p.classList.add("city-highAndLowTemp"),p.append(h,f),n.append(c,d,i,p),l(n)}(f,E),function(t){const o=t.hourly.slice(0,24),d=document.createElement("div");d.classList.add("hourlyForecastContainer");for(let t=0;t<o.length;t+=1){const i=document.createElement("div"),l=document.createElement("div"),u=document.createElement("div"),m=new Image,p=document.createElement("div");i.classList.add("hourlyForecast"),l.classList.add("hourlyForecast-hour"),u.classList.add("hourlyForecast-rainChance"),m.classList.add("hourlyForecast-weatherImage"),p.classList.add("hourlyForecast-temperature"),l.textContent=0===t?"Now":`${s=o[t].dt,n(a(s))}`,0!==o[t].pop&&(u.textContent=`${c(o[t].pop)}%`),e(m,o[t].weather[0].icon,o[t].weather[0].description),p.textContent=`${r(o[t].temp)}°`,i.append(l,u,m,p),d.appendChild(i)}var s;l(d)}(E),function(e){const{max:t,min:n}=e.temp,a=e.weather[0].description,c=document.createElement("div"),o=document.createElement("p");c.classList.add("todaysDescription"),o.classList.add("todaysDescription-paragraph"),o.textContent=`Today: ${a}. The high will be ${r(t)}°. The low will be ${r(n)}°.`,c.appendChild(o),l(c)}(E.daily[0]),function(t){const n=document.createElement("div");n.classList.add("dailyForecastContainer");for(let a=1;a<t.length;a+=1){const c=document.createElement("div"),d=document.createElement("div"),s=new Image,i=document.createElement("div"),l=document.createElement("span"),u=document.createElement("span");c.classList.add("dailyForecast"),d.classList.add("dailyForecast-day"),s.classList.add("dailyForecast-weatherImage"),i.classList.add("dailyForecast-highAndLowContainer"),l.classList.add("dailyForecast-highAndLowContainer-high"),u.classList.add("dailyForecast-highAndLowContainer-low"),d.textContent=`${o(t[a].dt)}`,e(s,t[a].weather[0].icon,t[a].weather[0].description),l.textContent=`${r(t[a].temp.max)}°`,u.textContent=`${r(t[a].temp.min)}°`,i.appendChild(l),i.appendChild(u),c.appendChild(d),c.appendChild(s),c.appendChild(i),n.appendChild(c)}u(n)}(E.daily),function(e){const t=document.createElement("div");t.classList.add("generalInfo-container");const{sunrise:n,sunset:a}=e.daily[0],o=document.createElement("div"),s=document.createElement("div"),i=document.createElement("div");s.textContent="SUNRISE",i.textContent=`${d(n)}`;const l=document.createElement("div"),m=document.createElement("div"),p=document.createElement("div");m.textContent="SUNSET",p.textContent=`${d(a)}`,s.classList.add("generalInfo-title"),i.classList.add("generalInfo-value"),m.classList.add("generalInfo-title"),p.classList.add("generalInfo-value"),o.classList.add("generalInfo"),l.classList.add("generalInfo"),o.append(s,i),l.append(m,p);const{pop:h}=e.hourly[0],f=document.createElement("div"),g=document.createElement("div"),y=document.createElement("div");g.textContent="CHANCE OF RAIN",y.textContent=`${c(h)}%`,g.classList.add("generalInfo-title"),y.classList.add("generalInfo-value"),f.classList.add("generalInfo"),f.append(g,y);const{humidity:L}=e.hourly[0],v=document.createElement("div"),E=document.createElement("div"),C=document.createElement("div");E.textContent="HUMIDITY",C.textContent=`${L}%`,E.classList.add("generalInfo-title"),C.classList.add("generalInfo-value"),v.classList.add("generalInfo"),v.append(E,C);const{wind_speed:w,wind_deg:I}=e.hourly[0],S=document.createElement("div"),x=document.createElement("div"),N=document.createElement("div");x.textContent="WIND";const $=function(e){const t=[{directionName:"N",degrees:0},{directionName:"NNE",degrees:22.5},{directionName:"NE",degrees:45},{directionName:"ENE",degrees:67.5},{directionName:"E",degrees:90},{directionName:"ESE",degrees:112.5},{directionName:"SE",degrees:135},{directionName:"SSE",degrees:157.5},{directionName:"S",degrees:180},{directionName:"SSW",degrees:202.5},{directionName:"SW",degrees:225},{directionName:"WSW",degrees:247.5},{directionName:"W",degrees:270},{directionName:"WNW",degrees:292.5},{directionName:"NW",degrees:315},{directionName:"NNW",degrees:337.5},{directionName:"N",degrees:360}];for(let n=0;n<t.length;n+=1){if(t[n].degrees===e)return t[n].directionName;if(t[n].degrees>e)return e-t[n-1].degrees<t[n].degrees-e?t[n-1].directionName:t[n].directionName}}(I);var q;N.textContent=`${$} ${r((q=w,document.querySelector(".selectedMetric").classList.contains("metric-celsius")?function(e){return 3.6*e}(q):function(e){return 1.609344*e}(q)))} km/hr`,x.classList.add("generalInfo-title"),N.classList.add("generalInfo-value"),S.classList.add("generalInfo"),S.append(x,N);const{feels_like:b}=e.hourly[0],F=document.createElement("div"),T=document.createElement("div"),M=document.createElement("div");T.textContent="FEELS LIKE",M.textContent=`${r(b)}°`,T.classList.add("generalInfo-title"),M.classList.add("generalInfo-value"),F.classList.add("generalInfo"),F.append(T,M);const{rain:A}=e.daily[0],D=document.createElement("div"),W=document.createElement("div"),H=document.createElement("div");W.textContent="PRECIPITATION",H.textContent=`${A} mm/h`,void 0===A&&(H.textContent=0),W.classList.add("generalInfo-title"),H.classList.add("generalInfo-value"),D.classList.add("generalInfo"),D.append(W,H);const{pressure:k}=e.hourly[0],j=document.createElement("div"),R=document.createElement("div"),U=document.createElement("div");R.textContent="PRESSURE",U.textContent=`${k} hPa`,R.classList.add("generalInfo-title"),U.classList.add("generalInfo-value"),j.classList.add("generalInfo"),j.append(R,U);const{visibility:P}=e.hourly[0],O=document.createElement("div"),_=document.createElement("div"),B=document.createElement("div");_.textContent="VISIBILITY",B.textContent=`${function(e){return e/100}(P)} km`,_.classList.add("generalInfo-title"),B.classList.add("generalInfo-value"),O.classList.add("generalInfo"),O.append(_,B);const{uvi:V}=e.hourly[0],Y=document.createElement("div"),K=document.createElement("div"),X=document.createElement("div");K.textContent="UVI INDEX",X.textContent=`${V}`,K.classList.add("generalInfo-title"),X.classList.add("generalInfo-value"),Y.classList.add("generalInfo"),Y.append(K,X),t.append(o,l,f,v,S,j,F,D,D,O,Y),u(t)}(E),i(s)}const f=document.querySelector(".toggleMetric");f.addEventListener("click",(()=>{const e=document.querySelector(".metric-celsius"),t=document.querySelector(".metric-fahrenheit");e.classList.contains("selectedMetric")?(e.classList.remove("selectedMetric"),t.classList.add("selectedMetric"),f.setAttribute("aria-label","Toggle metric used, currently selected metric is fahrenheit, other option is celsius")):(e.classList.add("selectedMetric"),t.classList.remove("selectedMetric"),f.setAttribute("aria-label","Toggle metric used, currently selected metric is celsius, other option is fahrenheit")),document.querySelector(".weather-content-wrapper")&&h(document.querySelector(".city").textContent)})),document.querySelector(".search-btn").addEventListener("click",(e=>{const t=document.querySelector(".search-input").value;document.querySelector(".search-input").value="",h(t),e.preventDefault()}))})();
//# sourceMappingURL=bundle.js.map