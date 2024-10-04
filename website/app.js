/* Global Variables */
// Base URL of your server-side API endpoint
const serverURL = 'http://localhost:8000/weather';

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.toDateString();  // Get the current date as a string

document.getElementById('cityName').addEventListener('focus', function () {
    if (this.value) {
        // Select all text when the text field has content
        this.select();
    } else {
        // Clear placeholder when empty and focused
        this.placeholder = '';
    }
});

document.getElementById('feelings').addEventListener('focus', function () {
    if (this.value) {
        // Select all text when the textarea has content
        this.select();
    } else {
        // Clear placeholder when empty and focused
        this.placeholder = '';
    }
});

// Restore the placeholder when the field is empty and loses focus
document.getElementById('cityName').addEventListener('blur', function () {
    if (!this.value) {
        // Restore the original placeholder when empty
        this.placeholder = 'Enter city name here';
    }
});

document.getElementById('feelings').addEventListener('blur', function () {
    if (!this.value) {
        // Restore the original placeholder when empty
        this.placeholder = 'Enter your feelings here';
    }
});

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    console.log("Generate button clicked");

    // Get user input for city name and feelings
    const cityName = document.getElementById('cityName').value;
    const feelings = document.getElementById('feelings').value;

    // Get weather data and handle it as a promise
    getWeatherData(cityName).then((data) => {
        if (data) {
            // Process data received from the server
            const {
                main: { temp, feels_like, temp_min, temp_max },
                weather: [{ description }],
                name: city
            } = data;

            // Prepare data to be sent to the server
            const info = {
                date,
                temp: Math.round(temp),  // Round temperature values
                user_response: feelings,
                feels_like: Math.round(feels_like),
                temp_min: Math.round(temp_min),
                temp_max: Math.round(temp_max),
                description,
                city,
            };

            // POST the weather information to the server
            postData("/add", info);
            updateUI();  // Update the UI with the new data
            document.getElementById('entry').style.opacity = 1;  // Show entry section
        }
    });
}

/* Function to GET weather data from the server-side */
const getWeatherData = async (cityName) => {
    // Fetch weather data
    const response = await fetch(`${serverURL}?city=${cityName}`);

    try {
        // Parse JSON data
        const data = await response.json();
        console.log("[Client] Received: ", data);

        // Check for errors in the response
        if (data.cod && data.cod != 200) {
            // Display the error message on UI
            error.innerHTML = data.message;
            setTimeout(_ => error.innerHTML = '', 2000)
            throw `${data.message}`;
        }

        return data;  // Return the parsed data
    } catch (error) {
        // Log any errors
        console.log("Error fetching weather data", error);
    }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',  // Specify the request method
        credentials: 'same-origin',  // Send cookies for same-origin requests
        headers: {
            'Content-Type': 'application/json',  // Specify the content type
        },
        body: JSON.stringify(data)  // Convert data to JSON string
    });

    try {
        // Parse the response JSON
        const newData = await response.json();

        // Log saved data
        console.log(`[Client] Data saved: `, newData);
        return newData;  // Return the new data
    } catch (error) {
        console.log(error);  // Log any errors
    }
};

/* Function to update UI */
const updateUI = async () => {
    try {
        const request = await fetch('/all');  // Fetch all data from the server
        const allData = await request.json();  // Parse JSON response

        // Log all data
        console.log(`[Client] allData: `, allData);

        // Update HTML elements with the received data
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp + '&degC';
        document.getElementById('content').innerHTML = "You are feeling " + allData.user_response;
        document.getElementById('temp_min_max').innerHTML = "L: " + allData.temp_min + '&degC' + " H: " + allData.temp_max + '&degC';
        document.getElementById('feels_like').innerHTML = "Feels like: " + allData.feels_like + '&degC';
        document.getElementById('description').innerHTML = allData.description;
        document.getElementById('city').innerHTML = allData.city;
    } catch (error) {
        // Log any errors
        console.error("Error updating UI:", error);
    }
}
