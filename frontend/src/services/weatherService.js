const API_KEY = "83827ec885406a3b4a68f146a5235417";

// CLIMA ATUAL -------------------------------------------------------
export async function getWeatherNow(city){
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=-3.14&lon=-58.45&appid=83827ec885406a3b4a68f146a5235417&units=metric&lang=pt_br`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data || !data.main) {
      console.error("Erro ao buscar clima atual:", data);
      return null;
    }

    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error("Erro getWeatherNow:", error);
    return null;
  }
}

// HISTÓRICO 5 DIAS ---------------------------------------------------
export async function getHistoricalWeather(city){
  try {
    // 1. Pegando coordenadas da cidade
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const geoRes = await fetch(geoUrl);
    const geo = await geoRes.json();

    if (!geo || geo.length === 0) {
      console.error("Cidade não encontrada:", geo);
      return [];
    }

    const lat = geo[0].lat;
    const lon = geo[0].lon;

    // 2. Pegando previsões
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data || !data.list) {
      console.error("Erro ao carregar histórico:", data);
      return [];
    }

    const days = {};
    data.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!days[date]) days[date] = [];
      days[date].push(item.main.temp);
    });

    return Object.keys(days)
      .slice(0, 5)
      .map(d => ({
        date: d,
        temp: (days[d].reduce((a,b)=>a+b) / days[d].length).toFixed(1)
      }));
  } catch (error) {
    console.error("Erro getHistoricalWeather:", error);
    return [];
  }
}

// NÍVEL DO RIO -------------------------------------------------------
export async function getRiverLevel(){
  try {
    const stationCode = "14990000"; // Manaus
    const url = `https://www.snirh.gov.br/hidroweb/rest/api/documento/estacao/${stationCode}/ultimaMedicao`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data) {
      console.error("Erro ao carregar nível do rio:", data);
      return null;
    }

    return {
      height: data.cota || null,
      date: data.dataHora || "Sem data"
    };
  } catch (error) {
    console.error("Erro getRiverLevel:", error);
    return null;
  }
}
