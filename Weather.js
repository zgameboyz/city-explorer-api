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



// const weatherData = require('./weather.json');

// console.log('port is ' + PORT);
// // specify what routes our server should be listening for
// app.get('/weather', (request, response) => {
//   // when we get that request, send back a response
//   response.send('hello from the server!');
//   let lat = request.query.lat;
//   let lon = request.query.lon;
//   let searchQuery = request.query.searchQuery;
// });
// app.get('/potato', (request, response) => {
//   // when we get that request, send back a response
//   response.send('potatoes are delicious');
// });
// app.get('/sayHello', (request, response) => {
//   // query parameters allow us to send extra information to the backend
//   // we access query params using request.query
//   // in the URL, this looks like localhost:3001/sayHello?name=Michelle
//   let name = request.query.name;
//   response.send(`Hello, ${name}!`);
// });

// app.get('/restaurants', (request, response)=> {
//   // get the info from the restaurants file & send it back
//   // restaurant data is require'd earlier in this file
//   response.send(weatherData.filter(restaurant => restaurant.locality.toLowerCase().includes(request.query.location.toLowerCase())));
// });

// put this LAST, with its crazy wildcard matching
app.get('*', (request, response) => {
  response.status(404).send('Sorry, route not found');
});

// tell our server to start listening for requests
app.listen(PORT, () => {console.log(`listening on port ${PORT}`);});