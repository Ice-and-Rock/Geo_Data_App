import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherChart from "./components/WeatherChart";

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
          "https://archive-api.open-meteo.com/v1/archive?latitude=57.3&longitude=-6.25&start_date=2023-08-01&end_date=2023-08-10&hourly=temperature_2m,pressure_msl&timezone=Europe%2FLondon"
        );
        const data = response.data;
        setWeatherData(data);
        console.log("Weather data:", data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { time, temperature_2m, pressure_msl } = weatherData.hourly;

  //  4-hour intervals for dataa
  const interval = 4;
  const groupedData: {
    time: string;
    temperature_2m: number;
    pressure_msl: number;
  }[] = [];

  for (let i = 0; i < time.length; i += interval) {
    const slicedTime = time.slice(i, i + interval);
    const slicedTemperature = temperature_2m.slice(i, i + interval);
    const slicedPressure = pressure_msl.slice(i, i + interval);

    const averageTemperature =
      slicedTemperature.reduce((acc, val) => acc + val, 0) /
      slicedTemperature.length;
    const averagePressure =
      slicedPressure.reduce((acc, val) => acc + val, 0) / slicedPressure.length;

    groupedData.push({
      time: slicedTime[0],
      temperature_2m: averageTemperature,
      pressure_msl: averagePressure,
    });
  }

  return (
    <div className="App">
      <h1>Geo Weather Data</h1>

      <div className="chart-container">
        <h1>Weather Chart</h1>
        <WeatherChart weatherData={weatherData} />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Avg. Temperature (°C)</th>
              <th>Avg. Pressure (hPa)</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.map((entry, index) => (
              <tr key={index}>
                <td className="table-cell">{entry.time}</td>
                <td className="table-cell">
                  {entry.temperature_2m.toFixed(2)}
                </td>
                <td className="table-cell">{entry.pressure_msl.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
