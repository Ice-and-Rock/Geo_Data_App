import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    temperature_2m: number[];
    pressure_msl: number[];
  };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<WeatherData>(
          'https://archive-api.open-meteo.com/v1/archive?latitude=57.199997&longitude=-6.300003&start_date=2023-08-11&end_date=2023-08-18&hourly=temperature_2m,pressure_msl&timezone=Europe%2FLondon'
        );
        const data = response.data;
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { time, temperature_2m, pressure_msl } = weatherData.hourly;

  return (
    <div className="App">
      <h1>Weather Data Display</h1>
      <div>
        <h2>Temperature Data</h2>
        <ul>
          {time.map((timestamp, index) => (
            <li key={timestamp}>
              Time: {timestamp}, Temperature: {temperature_2m[index]} °C
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Pressure Data</h2>
        <ul>
          {time.map((timestamp, index) => (
            <li key={timestamp}>
              Time: {timestamp}, Pressure: {pressure_msl[index]} hPa
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
