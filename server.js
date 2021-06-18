const weatherData = require('./data/weather.json');
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

class Movie {

  constructor(title,release_Date) {


    this.title = title;
    this.release_Date = release_Date;
  }

}


class Forecast {

  constructor(date, description) {


    this.date = date;
    this.description = description;

  }

}




console.log('port is ' + PORT);
// specify what routes our server should be listening for
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

// tell our server to start listening for requests
app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });