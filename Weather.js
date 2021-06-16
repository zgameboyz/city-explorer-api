const Weather = require('./data/weather.json');
// in our servers, we use require instead of import
const express = require('express');
const app = express();
// use dotenv to access our .env file
require('dotenv').config();
// allow the frontend to access data from the backend
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT;

// -----------------------------------
// everything above that line is identical (or close to it) in every express app ever

app.get('/', (request, response) =>{
  
response.send('working')

})

import Weather from "./data/weather.json";



class Forecast {

 constructor(description,date){

    
 this.date=date;
 this.description=description;

  }

}

const getForecast = () => {
    weatherData.map(i => {

      new Forecast (i.description, i.date);


    });
};  




const weatherData = require('./data/weather.json');

console.log('port is ' + PORT);
// specify what routes our server should be listening for
app.get('/weather', (request, response) => {
  // when we get that request, send back a response
  response.send('hello from the server!');
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
});

// put this LAST, with its crazy wildcard matching
app.get('*', (request, response) => {
  response.status(404).send('Sorry, route not found');
});

// tell our server to start listening for requests
app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});