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
const caches = require('./modules/cache.js')
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





//   if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
//     console.log('Cache hit');
// response.json
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
  let cacheKey = lat + lon;
  try {
    console.log(cacheKey)
      if (caches.cacheWeather[cacheKey] && (Date.now() - caches.cacheWeather[cacheKey].timestamp < 50000)) {
    console.log('Weather Cache hit');
    response.send(caches.cacheWeather[cacheKey].data);
  } else {
    console.log('Weather Cache miss');
   
    let cityWeatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${weatherkey}`)

    if (cityWeatherData === undefined) {
     
      response.status(400).send('Unsupported city');
    }
    else {
   
      let cityDataPretty = cityWeatherData.data.data.map(obj => new Forecast(obj.datetime, `Low of ${obj.low_temp}, high of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description.toLowerCase()}`));
      caches.cacheWeather[cacheKey] = {};
      caches.cacheWeather[cacheKey].timestamp = Date.now();
      caches.cacheWeather[cacheKey].data = cityDataPretty;
      response.send(cityDataPretty);

    }
    // cache[key].data = axios.get(url)
    // .then(response => parseWeather(response.body));
  }
    
    //   console.log("here")
  
  }
  catch(e) {console.log(e)}

});
app.get('/movie', async (request, response) => {
  let movie = request.query.movie;
 

  try {

  if (caches.cacheMovie[movie] && (Date.now() - caches.cacheMovie[movie].timestamp < 500000)) {
    console.log('Movie Cache hit');
response.json
  } else {
    console.log('Movie Cache miss');
 
    
    let cityMovieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${movie}}`)
     
    if (cityMovieData === undefined) {
     
      response.status(400).send('Unsupported city');
    }
    else {
     
      let cityMoviePretty = cityMovieData.data.results.map(obj => new Movie(obj.title,`Movies with: ${obj.release_date}`));

      caches.cacheMovie[movie] = {};
      caches.cacheMovie[movie].timestamp = Date.now();
      caches.cacheMovie[movie].data = cityMoviePretty;

      response.send(cityMoviePretty);

    }
    // caches.cacheMovie[movie].data = axios.get(url)
    // .then(response => parseWeather(response.body));
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