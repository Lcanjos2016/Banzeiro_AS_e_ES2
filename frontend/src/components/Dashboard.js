import React, { useEffect, useState } from "react";
import "../dashboard.css";
import { getWeather } from "../services/weatherService";
import { getRiverLevels } from "../services/riverService";

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [riverLevels, setRiverLevels] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const w = await getWeather();
    const r = await getRiverLevels();
    setWeather(w);
    setRiverLevels(r.slice(0, 4)); // mostra 4 registros igual ao modelo
  }

  if (!weather) return <h2>Carregando...</h2>;

  return (
    <div className="dash-page">

      {/* CARD PRINCIPAL DO CLIMA */}
      <div className="weather-card">

        <div className="weather-top">
          <h2 className="weather-city">{weather.city}</h2>
          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="icon"
          />
        </div>

        <div className="weather-main">
          <h1 className="weather-temp">{weather.temp}°</h1>
          <p className="weather-desc">{weather.description}</p>
        </div>

        <div className="weather-minmax">
          <p>Max {weather.max}°</p>
          <p>Min {weather.min}°</p>
        </div>
      </div>

      {/* CARD INFERIOR (CHUVA / UMIDADE / VENTO) */}
      <div className="info-row">

        <div className="info-card">
          <span className="info-title">🌧 Probabilidade de Chuva</span>
          <span className="info-value">{weather.rain}%</span>
        </div>

        <div className="info-card">
          <span className="info-title">💧 Umidade</span>
          <span className="info-value">{weather.humidity}%</span>
        </div>

        <div className="info-card">
          <span className="info-title">💨 Vento</span>
          <span className="info-value">{weather.wind} km/h</span>
        </div>

      </div>

      {/* CARD DE NÍVEL DO RIO */}
      <div className="river-card">
        <h3 className="river-title">Atualizações Nível do Rio</h3>

        <table className="river-table">
          <tbody>
            {riverLevels.map((item, index) => (
              <tr key={index}>
                <td className="river-date">Dia {item.date}</td>
                <td className="river-icon">🌊</td>
                <td className="river-level">{item.level} m</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
