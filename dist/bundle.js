(()=>{"use strict";function e(e){return`https://openweathermap.org/img/wn/${e}@2x.png`}function t(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}function n(e){return t(e).getHours()}function a(e){return t(1e3*e)}function c(e){return Math.floor(100*e)}function d(e){const n=t(a(e)).getDay();return 0===n?"Sunday":1===n?"Monday":2===n?"Tuesday":3===n?"Wednesday":4===n?"Thursday":5===n?"Friday":6===n?"Saturday":void 0}function o(e){const c=a(e),d=n(c);let o=function(e){return t(e).getMinutes()}(c);return 1===o.toString(10).length&&(o=`0${o}`),`${d} : ${o}`}function r(e){return Math.round(e)}const s=window.matchMedia("(min-width: 768px");function i(e){const t=document.querySelector(".generalInfo-container"),n=document.querySelector(".dailyForecastContainer"),a=document.querySelector(".weather-content-wrapper");e.matches?(t.remove(),a.insertBefore(t,n)):(t.remove(),a.appendChild(t))}function l(e){document.querySelector(".l-mainDisplay").appendChild(e)}function m(e){document.querySelector(".weather-content-wrapper").appendChild(e)}s.addEventListener("change",i);const u=document.querySelector("main");async function p(t){!function(){const e=document.querySelector(".weather-content-wrapper");e&&e.remove()}();const p=document.createElement("div");p.classList.add("weather-content-wrapper"),u.appendChild(p);const h=await function(e){return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=1&appid=2815b9b71f4c4387bd5d1f3c3f298af6`,{mode:"cors"}).then((e=>{if(!1===e.ok)throw new Error(`getCordinates fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>{const{lat:t,lon:n,name:a}=e[0];return{name:a,lat:t,lon:n}})).catch((e=>{console.error(e)}))}(t),{lat:f,lon:g}=h,v=document.querySelector(".selectedMetric");let E;v.classList.contains("metric-celsius")&&(E="metric"),v.classList.contains("metric-fahrenheit")&&(E="imperial");const L=await function(e,t,n){return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${e}&lon=${t}&exclude=minutely&appid=2815b9b71f4c4387bd5d1f3c3f298af6&units=${n}`,{mode:"cors"}).then((e=>{if(!1===e.ok)throw new Error(`getWeather fetch operation unsuccessful: ${e.status} ${e.statusText}`);return e.json()})).then((e=>e)).catch((e=>{console.error(e)}))}(f,g,E);!function(){const e=document.createElement("div");e.classList.add("l-mainDisplay"),document.querySelector(".weather-content-wrapper").appendChild(e)}(),function(e,t){const n=document.createElement("div");n.classList.add("mainInfo");const{name:a}=e,c=document.createElement("div");c.textContent=`${a}`,c.classList.add("city");const{main:d}=t.current.weather[0],o=document.createElement("div");o.textContent=`${d}`,o.classList.add("city-weather");const{temp:s}=t.current,i=document.createElement("div");i.textContent=`${r(s)}°`,i.classList.add("city-temperature");const{min:m,max:u}=t.daily[0].temp,p=document.createElement("div"),h=document.createElement("div"),f=document.createElement("div");h.textContent=`H:${r(u)}°`,f.textContent=`L:${r(m)}°`,h.classList.add("city-highAndLowTemp-high"),f.classList.add("city-highAndLowTemp-low"),p.classList.add("city-highAndLowTemp"),p.append(h,f),n.append(c,o,i,p),l(n)}(h,L),function(t){const d=t.hourly.slice(0,24),o=document.createElement("div");o.classList.add("hourlyForecastContainer");for(let t=0;t<d.length;t+=1){const i=document.createElement("div"),l=document.createElement("div"),m=document.createElement("div"),u=new Image,p=document.createElement("div");i.classList.add("hourlyForecast"),l.classList.add("hourlyForecast-hour"),m.classList.add("hourlyForecast-rainChance"),u.classList.add("hourlyForecast-weatherImage"),p.classList.add("hourlyForecast-temperature"),l.textContent=0===t?"Now":`${s=d[t].dt,n(a(s))}`,0!==d[t].pop&&(m.textContent=`${c(d[t].pop)}%`),u.src=e(d[t].weather[0].icon),p.textContent=`${r(d[t].temp)}°`,i.append(l,m,u,p),o.appendChild(i)}var s;l(o)}(L),function(e){const{max:t,min:n}=e.temp,a=e.weather[0].description,c=document.createElement("div"),d=document.createElement("p");c.classList.add("todaysDescription"),d.classList.add("todaysDescription-paragraph"),d.textContent=`Today: ${a}. The high will be ${r(t)}°. The low will be ${r(n)}°.`,c.appendChild(d),l(c)}(L.daily[0]),function(t){const n=document.createElement("div");n.classList.add("dailyForecastContainer");for(let a=1;a<t.length;a+=1){const c=document.createElement("div"),o=document.createElement("div"),s=new Image,i=document.createElement("div"),l=document.createElement("span"),m=document.createElement("span");c.classList.add("dailyForecast"),o.classList.add("dailyForecast-day"),s.classList.add("dailyForecast-weatherImage"),i.classList.add("dailyForecast-highAndLowContainer"),l.classList.add("dailyForecast-highAndLowContainer-high"),m.classList.add("dailyForecast-highAndLowContainer-low"),o.textContent=`${d(t[a].dt)}`,s.src=e(t[a].weather[0].icon),l.textContent=`${r(t[a].temp.max)}°`,m.textContent=`${r(t[a].temp.min)}°`,i.appendChild(l),i.appendChild(m),c.appendChild(o),c.appendChild(s),c.appendChild(i),n.appendChild(c)}m(n)}(L.daily),function(e){const t=document.createElement("div");t.classList.add("generalInfo-container");const{sunrise:n,sunset:a}=e.daily[0],d=document.createElement("div"),s=document.createElement("div"),i=document.createElement("div");s.textContent="SUNRISE",i.textContent=`${o(n)}`;const l=document.createElement("div"),u=document.createElement("div"),p=document.createElement("div");u.textContent="SUNSET",p.textContent=`${o(a)}`,s.classList.add("generalInfo-title"),i.classList.add("generalInfo-value"),u.classList.add("generalInfo-title"),p.classList.add("generalInfo-value"),d.classList.add("generalInfo"),l.classList.add("generalInfo"),d.append(s,i),l.append(u,p);const{pop:h}=e.hourly[0],f=document.createElement("div"),g=document.createElement("div"),v=document.createElement("div");g.textContent="CHANCE OF RAIN",v.textContent=`${c(h)}%`,g.classList.add("generalInfo-title"),v.classList.add("generalInfo-value"),f.classList.add("generalInfo"),f.append(g,v);const{humidity:E}=e.hourly[0],L=document.createElement("div"),y=document.createElement("div"),C=document.createElement("div");y.textContent="HUMIDITY",C.textContent=`${E}%`,y.classList.add("generalInfo-title"),C.classList.add("generalInfo-value"),L.classList.add("generalInfo"),L.append(y,C);const{wind_speed:I,wind_deg:w}=e.hourly[0],x=document.createElement("div"),N=document.createElement("div"),S=document.createElement("div");N.textContent="WIND";const $=function(e){const t=[{directionName:"N",degrees:0},{directionName:"NNE",degrees:22.5},{directionName:"NE",degrees:45},{directionName:"ENE",degrees:67.5},{directionName:"E",degrees:90},{directionName:"ESE",degrees:112.5},{directionName:"SE",degrees:135},{directionName:"SSE",degrees:157.5},{directionName:"S",degrees:180},{directionName:"SSW",degrees:202.5},{directionName:"SW",degrees:225},{directionName:"WSW",degrees:247.5},{directionName:"W",degrees:270},{directionName:"WNW",degrees:292.5},{directionName:"NW",degrees:315},{directionName:"NNW",degrees:337.5},{directionName:"N",degrees:360}];for(let n=0;n<t.length;n+=1){if(t[n].degrees===e)return t[n].directionName;if(t[n].degrees>e)return e-t[n-1].degrees<t[n].degrees-e?t[n-1].directionName:t[n].directionName}}(w);var q;S.textContent=`${$} ${r((q=I,document.querySelector(".selectedMetric").classList.contains("metric-celsius")?function(e){return 3.6*e}(q):function(e){return 1.609344*e}(q)))} km/hr`,N.classList.add("generalInfo-title"),S.classList.add("generalInfo-value"),x.classList.add("generalInfo"),x.append(N,S);const{feels_like:b}=e.hourly[0],F=document.createElement("div"),T=document.createElement("div"),M=document.createElement("div");T.textContent="FEELS LIKE",M.textContent=`${r(b)}°`,T.classList.add("generalInfo-title"),M.classList.add("generalInfo-value"),F.classList.add("generalInfo"),F.append(T,M);const{rain:D}=e.daily[0],W=document.createElement("div"),A=document.createElement("div"),j=document.createElement("div");A.textContent="PRECIPITATION",j.textContent=`${D} mm/h`,void 0===D&&(j.textContent=0),A.classList.add("generalInfo-title"),j.classList.add("generalInfo-value"),W.classList.add("generalInfo"),W.append(A,j);const{pressure:k}=e.hourly[0],R=document.createElement("div"),U=document.createElement("div"),H=document.createElement("div");U.textContent="PRESSURE",H.textContent=`${k} hPa`,U.classList.add("generalInfo-title"),H.classList.add("generalInfo-value"),R.classList.add("generalInfo"),R.append(U,H);const{visibility:P}=e.hourly[0],O=document.createElement("div"),_=document.createElement("div"),B=document.createElement("div");_.textContent="VISIBILITY",B.textContent=`${function(e){return e/100}(P)} km`,_.classList.add("generalInfo-title"),B.classList.add("generalInfo-value"),O.classList.add("generalInfo"),O.append(_,B);const{uvi:V}=e.hourly[0],Y=document.createElement("div"),K=document.createElement("div"),X=document.createElement("div");K.textContent="UVI INDEX",X.textContent=`${V}`,K.classList.add("generalInfo-title"),X.classList.add("generalInfo-value"),Y.classList.add("generalInfo"),Y.append(K,X),t.append(d,l,f,L,x,R,F,W,W,O,Y),m(t)}(L),i(s)}document.querySelector(".toggleMetric").addEventListener("click",(()=>{const e=document.querySelector(".metric-celsius"),t=document.querySelector(".metric-fahrenheit");e.classList.contains("selectedMetric")?(e.classList.remove("selectedMetric"),t.classList.add("selectedMetric")):(e.classList.add("selectedMetric"),t.classList.remove("selectedMetric")),document.querySelector(".weather-content-wrapper")&&p(document.querySelector(".city").textContent)})),document.querySelector(".search-btn").addEventListener("click",(e=>{const t=document.querySelector(".search-input").value;document.querySelector(".search-input").value="",p(t),e.preventDefault()}))})();
//# sourceMappingURL=bundle.js.map