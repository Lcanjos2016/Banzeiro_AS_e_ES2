const API_KEY = "SUA_API_KEY_OPENWEATHER";


// Clima atual
export async function getWeatherNow(city){
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`;
const res = await fetch(url);
const data = await res.json();


return {
temp: data.main.temp,
humidity: data.main.humidity,
description: data.weather[0].description,
icon: data.weather[0].icon,
};
}


// Histórico de 5 dias (médias)
export async function getHistoricalWeather(city){
const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
const geo = await (await fetch(geoUrl)).json();
const lat = geo[0].lat;
const lon = geo[0].lon;


const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`;
const res = await fetch(url);
const data = await res.json();


const days = {};
data.list.forEach(entry => {
const date = entry.dt_txt.split(" ")[0];
if(!days[date]) days[date] = [];
days[date].push(entry.main.temp);
});


return Object.keys(days).slice(0, 5).map(d => ({
date: d,
temp: (days[d].reduce((a,b)=>a+b,0) / days[d].length).toFixed(1)
}));
}


// API ANA / CPRM – nível dos rios
export async function getRiverLevel(){
const stationCode = "14990000"; // Manaus
const url = `https://www.snirh.gov.br/hidroweb/rest/api/documento/estacao/${stationCode}/ultimaMedicao`;
const res = await fetch(url);
const data = await res.json();


return {
height: data?.vazao ?? data?.cota ?? null,
date: data?.dataHora
};
}