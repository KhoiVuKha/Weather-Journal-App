// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const app = express();

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

const port = 8000;
app.listen(port, () => {
  console.log(`[Server] Running on localhost: ${port}`);
});

const apiKey = process.env.API_KEY;
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const url = `${baseURL}${city}&appid=${apiKey}&units=metric`;

  console.log("Request URL: ", url)

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod != 200) {
      return res.status(400).send({ message: data.message });
    }

    res.send(data);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching weather data' });
  }
});

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/add', (req, res) => {
  projectData = { ...req.body };
  console.log(`[Server] addWeatherInfo`, projectData);
  res.send(projectData);
});
