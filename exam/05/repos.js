const axios = require("axios");

async function getUserRepos(username) {
 const response = await axios.get(
  `https://api.github.com/users/${username}/repos`
 );
 const repos = response.data.map((repo) => ({
  name: repo.name,
 }));

 return repos;
}

module.exports = { getUserRepos };
