# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

With this project I have done some following works:
- Spin up the server in `server.js`
- Add a GET route that returns the `projectData` object in your server code and add a POST route that adds incoming data to `projectData`.
- Acquire API credentials from OpenWeatherMap website
- Integrating OpenWeatherMap API: retrieval of the weather data from OpenWeatherMap
- making a POST request to add API data and user input to Web app
- Add function to update the UI dynamically
- Add more data to display in web app
- Modify project style and add background image

## Demo-Preview

![alt text](image.png)

## Instructions
This will require modifying the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.

## Extras
If you are interested in testing your code as you go, you can use `tests.js` as a template for writing and running some basic tests for your code.

## Installation guide
1. Download the app zip file.

2. Unzip it from the desktop.

3. Install node.js - https://nodejs.org/.

4. Install Express: 
terminal command line: `npm install express`.

5. Install Body-Parser: 
terminal command line: `npm install body-parser`.

6. Install Cors: 
terminal command line `npm install cors`.

7. Install dotenv
terminal command line `npm install dotenv`

8. Install node-fetch
terminal command line `npm install node-fetch`

## Using Weather-Journal App
1. Running the server:
terminal command line: `node server.js`.

2. Open web browser and input the link:
`localhost:8000`

3. Input some fields: zip-code field and feeling field.

4. Press `Generate button` and get the result.
