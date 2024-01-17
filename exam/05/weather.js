const axios = require("axios");

async function getWeather(location) {
 const apiKey = "0ed761300a2725ca778c07831ae64d6e";
 const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${location}`
 );
 const weather = response.data.weather[0];

 return {
  main: weather.main,
  description: weather.description,
 };
}

module.exports = { getWeather };
