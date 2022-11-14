/**
 * Refer to: https://openweathermap.org/current
 * Built-in API request by ZIP code
 * Please note if country is not specified then the search works for USA as a default.
 * API Call:
 * https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
 */

/* Global Variables */
// Base URL
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='

// Personal API Key for OpenWeatherMap API
let apiKey = 'bb7daac7665c00c87d1c8d42bd26d101';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  console.log("generate button onClicked");

  const zipCode =  document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  // Get weather data return promise
  getWeatherData(baseURL, zipCode, apiKey).then((data) => {
    if (data) {
      // Process data  received here
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const info = {
        newDate,
        city,
        temp: convertKelvinToCelsius(temp),
        description,
        feelings,
      };

      postData("/add", info);
    }
  });
}

/* Function to GET Web API Data*/
const getWeatherData = async (url, zip, key) => {
  const res = await fetch(url + zip + `,&appid=${key}`);
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.newDate,
      user_response: data.feelings
    })
  });

  try {
    const newData = await response.json();
    console.log(`[Client] Data saved: `, newData);
    return newData;
  } catch (error) {
      console.log(error);
  }
};

// Function to convert °K to ℃
function convertKelvinToCelsius(kelvin) {
  if (kelvin < (0)) {
      return 'below absolute zero (0 °K)';
  } else {
      return (kelvin - 273.15).toFixed(2);
  }
}