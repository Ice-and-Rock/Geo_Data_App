import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface WeatherChartProps {
  weatherData: {
    hourly: {
      time: string[];
      temperature_2m: number[];
      pressure_msl: number[];
    };
  };
}

function WeatherChart({ weatherData }: WeatherChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: weatherData.hourly.time,
            datasets: [
              {
                label: 'Temperature (°C)',
                data: weatherData.hourly.temperature_2m,
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
              },
              {
                label: 'Pressure (hPa)',
                data: weatherData.hourly.pressure_msl,
                borderColor: 'rgb(54, 162, 235)',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  parser: 'iso',
                  unit: 'hour',
                  displayFormats: {
                    hour: 'HH:mm',
                  },
                },
                title: {
                  display: true,
                  text: 'Time',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Value',
                },
              },
            },
          },
        });
      }
    }
  }, [weatherData]);

  return <canvas ref={chartRef} />;
}

export default WeatherChart;
