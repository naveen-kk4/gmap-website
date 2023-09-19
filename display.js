const iframeEle = document.getElementsByClassName("map-img")[0];
const lat_long_ele = document.getElementsByClassName("lat-long")[0];
const all_details = document.getElementsByClassName("details")[0];
const api_key ='c2635ae582b2ddf2f8890c3edf75e2b2';
window.onload = renderData;


function getTime(){
    let date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    
    let mins = minutes/10 < 1?`0${minutes}`:""+minutes;
    let hrs = hours/10<1?"0"+hours:""+hours;


    
    return `${hrs}:${mins}  ${date.toLocaleDateString(undefined, {day:'2-digit',timeZoneName: 'long' }).substring(4).match(/\b(\w)/g).join('')}`;
}

async function renderData(){
    const lat = localStorage.getItem("latitude");
    const long = localStorage.getItem("longitude");
   const url = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
   iframeEle.innerHTML=`<iframe src=${url} frameborder="0" style="border:0"></iframe>`;
   lat_long_ele.innerHTML=`<div class="me-3 px-4 py-2">Lat: ${lat}</div>
   <div class="px-4 py-2">Long: ${long}</div>`

   let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=imperial`);
   let res = await response.json();
  
   all_details.innerHTML=`<h3 class="p-4">Your Weather Data</h3>
   <div class="all-details d-flex flex-wrap">
       <div>Location: ${res.name}</div>
       <div>Wind Speed: ${res.wind.speed} m/hr</div>
       <div>Humidity : ${res.main.humidity} %</div>
       <div>Time Zone : ${getTime()}</div>
       <div>Pressure:${res.main.pressure} hPa</div>
       <div>Wind Direction : ${res.wind.deg} deg</div>
       <div>Weather : ${res.weather[0].description}</div>
       <div>Feels like: ${Math.floor(((res.main.temp - 32) * 5) / 9)} °C</div>
   </div>`
   
   

}