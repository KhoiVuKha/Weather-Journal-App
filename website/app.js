/* Global Variables */
// Base URL of your server-side API endpoint
const serverURL = 'http://localhost:8000/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.toDateString();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  console.log("Generate button clicked");

  const cityName = document.getElementById('cityName').value;
  const feelings = document.getElementById('feelings').value;

  // Get weather data return promise
  getWeatherData(cityName).then((data) => {
    if (data) {
      // Process data received from server
      const {
        main: { temp, feels_like, temp_min, temp_max },
        weather: [{ description }],
        name: city
      } = data;

      const info = {
        date,
        temp: Math.round(temp),
        user_response: feelings,
        feels_like: Math.round(feels_like),
        temp_min: Math.round(temp_min),
        temp_max: Math.round(temp_max),
        description,
        city,
      };

      postData("/add", info);
      updateUI();
      document.getElementById('entry').style.opacity = 1;
    }
  });
}

/* Function to GET weather data from server-side */
const getWeatherData = async (cityName) => {
  const response = await fetch(`${serverURL}?city=${cityName}`);

  try {
    const data = await response.json();
    console.log("[Client] Received: ", data);

    if (data.cod && data.cod != 200) {
      // Display error message on UI
      document.getElementById('error').innerHTML = data.message;
      setTimeout(() => document.getElementById('error').innerHTML = '', 2000);
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log("Error fetching weather data", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    console.log(`[Client] Data saved: `, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};


/* Function to update UI */
const updateUI = async () => {
  try {
    const request = await fetch('/all');
    const allData = await request.json();

    console.log(`[Client] allData: `, allData);

    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp + '&degC';
    document.getElementById('content').innerHTML = "You are feeling " + allData.user_response;
    document.getElementById('temp_min_max').innerHTML = "L: " + allData.temp_min + '&degC' + " H: " + allData.temp_max + '&degC';
    document.getElementById('feels_like').innerHTML = "Feels like: " + allData.feels_like + '&degC';
    document.getElementById('description').innerHTML = allData.description;
    document.getElementById('city').innerHTML = allData.city;
  } catch (error) {
    console.error("Error updating UI:", error);
  }
}
