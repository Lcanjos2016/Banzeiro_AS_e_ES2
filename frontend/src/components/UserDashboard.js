import React, { useEffect, useState } from 'react';
import { getWeatherNow, getHistoricalWeather, getRiverLevel } from '../services/weatherService';
import '../theme.css';

export default function UserDashboard() {
  const [city] = useState("Manaus");
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [river, setRiver] = useState(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setCurrent(await getWeatherNow(city));
      setHistory(await getHistoricalWeather(city));
      setRiver(await getRiverLevel());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="header">
        <h1>Dashboard Banzeiro</h1>
      </div>

      <div className="page-container">

        <div className="grid grid-2">
          
          {/* Card clima atual */}
          <div className="card">
            <h2>Clima Atual — {city}</h2>
            {current ? (
              <>
                <p><strong>Temperatura:</strong> {current.temp}°C</p>
                <p><strong>Umidade:</strong> {current.humidity}%</p>
                <p><strong>Condição:</strong> {current.description}</p>
              </>
            ) : "Carregando..."}
          </div>

          {/* Card nível do rio */}
          <div className="card">
            <h2>Nível do Rio Negro</h2>
            {river ? (
              <>
                <p><strong>Altura:</strong> {river.height} m</p>
                <p><strong>Medição:</strong> {river.date}</p>
              </>
            ) : "Carregando..."}
          </div>

        </div>

        {/* Histórico */}
        <div className="card">
          <h2>Histórico dos últimos 5 dias</h2>
          {history.map((h,i)=>(
            <p key={i}><strong>{h.date}</strong>: {h.temp}°C</p>
          ))}
        </div>

      </div>
    </>
  );
}