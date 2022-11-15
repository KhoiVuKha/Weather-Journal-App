// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
// Setup Server
const server = app.listen(port, listening);
function listening() {
  console.log(`[Server] Running on localhost: ${port}`);
};

// GET route
app.get('/all', getWeatherInfo);
function getWeatherInfo(req, res) {
  res.send(projectData);
}

// POST route
app.post('/add', addWeatherInfo);
function addWeatherInfo(req, res) {
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['user_response'] = req.body.user_response;
  projectData['feels_like'] = req.body.feels_like;
  projectData['temp_min'] = req.body.temp_min;
  projectData['temp_max'] = req.body.temp_max;
  projectData['description'] = req.body.description;
  projectData['city'] = req.body.city;
  console.log(`[Server] addWeatherInfo`, projectData);
  res.send(projectData);
};
