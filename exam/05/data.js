const axios = require("axios");

async function getUserData(username) {
 const userResponse = await axios.get(
  `https://api.github.com/users/${username}`
 );

 return {
  name: userResponse.data.name || userResponse.data.login,
  followers: userResponse.data.followers,
  location: userResponse.data.location,
 };
}

module.exports = { getUserData };
