// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/api/data', (req, res) => {
  const mockData = [
    { timestamp: '2023-08-18T12:00:00Z', windSpeed: 10, temperature: 25 },
    { timestamp: '2023-08-18T13:00:00Z', windSpeed: 12, temperature: 26 },
    // Add more data entries as needed
  ];
  console.log('Sending mock data:', mockData);
  res.json(mockData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
