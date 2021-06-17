const weatherData = require('./data/weather.json');
// in our servers, we use require instead of import

const express = require('express');
const app = express();
// use dotenv to access our .env file
require('dotenv').config();
// allow the frontend to access data from the backend
const cors = require('cors');
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT;

// -----------------------------------
// everything above that line is identical (or close to it) in every express app ever

app.get('/', (request, response) =>{
  
response.send('working')

})





class Forecast {

 constructor(date,description){

    
 this.date=date;
 this.description=description;

  }

}




console.log('port is ' + PORT);
// specify what routes our server should be listening for
app.get('/weather', (request, response) => {
  // when we get that request, send back a response
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = request.query.searchQuery;
  console.log(searchQuery)
  let cityWeatherData = weatherData.find(city=>city.city_name === searchQuery);
  console.log("bananas " ,cityWeatherData);
  if (cityWeatherData === undefined) {
    response.status(400).send('Unsupported city');
  }
  else{
    let cityDataPretty = cityWeatherData.data.map(obj => new Forecast(obj.datetime, `Low of ${obj.low_temp}, high of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description.toLowerCase()}`));
    response.send(cityDataPretty);
  }



});

// put this LAST, with its crazy wildcard matching
app.get('*', (request, response) => {
  response.status(404).send('Sorry, route not found');
});

// tell our server to start listening for requests
app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});