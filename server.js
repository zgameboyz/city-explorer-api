const weatherData = require('./data/weather.json');
const Forecast = require('./modules/Forecast');
const Movie = require('./modules/Movie');
// in our servers, we use require instead of import
const axios = require('axios');
const express = require('express');
const app = express();
// use dotenv to access our .env file
require('dotenv').config();
// allow the frontend to access data from the backend
const cors = require('cors');
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT;
// let searchQuery = request.query.searchQuery;
const weatherkey = process.env.WEATHER_KEY;
const movieKey = process.env.MOVIE_KEY;
// -----------------------------------
// everything above that line is identical (or close to it) in every express app ever

app.get('/', (request, response) => {

  response.send('working')

})







console.log('port is ' + PORT);
// specify what routes our server should be listening for


// 'use strict';

// let cache = require('./modules/cache.js');

// module.exports = getWeather;

// function getWeather(latitude, longitude) {
//   const key = 'weather-' + latitude + longitude;
//   const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

//   if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
//     console.log('Cache hit');
//   } else {
//     console.log('Cache miss');
//     cache[key] = {};
//     cache[key].timestamp = Date.now();
//     cache[key].data = axios.get(url)
//     .then(response => parseWeather(response.body));
//   }
  
//   return cache[key].data;
// }

// function parseWeather(weatherData) {
//   try {
//     const weatherSummaries = weatherData.data.map(day => {
//       return new Weather(day);
//     });
//     return Promise.resolve(weatherSummaries);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// }

// class Weather {
//   constructor(day) {
//     this.forecast = day.weather.description;
//     this.time = day.datetime;
//   }
// }



















app.get('/weather', async (request, response) => {
  // when we get that request, send back a response
  let lat = request.query.lat;
  let lon = request.query.lon;

  try {
    let cityWeatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherkey}`)
      console.log("here")
    if (cityWeatherData === undefined) {
     
      response.status(400).send('Unsupported city');
    }
    else {
    console.log(Forecast)
      let cityDataPretty = cityWeatherData.data.data.map(obj => new Forecast(obj.datetime, `Low of ${obj.low_temp}, high of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description.toLowerCase()}`));
      
      response.send(cityDataPretty);

    }
  }
  catch(e) {console.log(e)}

});
app.get('/movie', async (request, response) => {
  let movie = request.query.movie;
 

  try {
    let cityMovieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movie}}`)
      console.log(cityMovieData)
    if (cityMovieData === undefined) {
     
      response.status(400).send('Unsupported city');
    }
    else {
      console.log(cityMovieData.data.data)
      let cityMoviePretty = cityMovieData.data.results.map(obj => new Movie(obj.title,`Movies with: ${obj.release_Date}`));
      console.log(cityMoviePretty);
      response.send(cityMoviePretty);

    }
  }
  catch(e) {console.log(e)}

});


// put this LAST, with its crazy wildcard matching
app.get('*', (request, response) => {
  response.status(404).send('Sorry, route not found');
});



// require('dotenv');
// const express = require('express');
// const cors = require('cors');

// const weather = require('./modules/weather.js');
// const app = express();

// app.get('/weather', weatherHandler);

// function weatherHandler(request, response) {
//   let { lat, lon } = request.query;
//   weather(lat, lon)
//   .then(summaries => response.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }  

//app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));

// tell our server to start listening for requests
app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
