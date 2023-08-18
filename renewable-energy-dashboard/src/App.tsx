import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

interface WeatherData {
  time: string;
  temperature_2m: number;
  pressure_msl: number;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2023-08-11&end_date=2023-08-18&hourly=temperature_2m,pressure_msl&timezone=Europe%2FLondon'
        );
        const data = response.data.data;
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchData();
  }, []);

  const timeLabels = weatherData.map((entry) => entry.time);
  const temperatureData = weatherData.map((entry) => entry.temperature_2m);
  const pressureData = weatherData.map((entry) => entry.pressure_msl);

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatureData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Pressure (hPa)',
        data: pressureData,
        fill: false,
        borderColor: 'rgb(192, 75, 75)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="App">
      <h1>Weather Data Chart</h1>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default App;
