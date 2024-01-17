const dataModule = require("./data");
const weatherModule = require("./weather");
const reposModule = require("./repos");

async function main() {
 try {
  const username = process.argv[2];
  const showFollowers = process.argv[3] === "true";

  const userData = await dataModule.getUserData(username);
  console.log(`Username: ${userData.name}`);
  if (showFollowers) {
   console.log(`Followers count: ${userData.followers}`);
  }
  const repos = await reposModule.getUserRepos(username);
  console.log(`Number of repositories: ${repos.length}`);
  repos.forEach((repo) => {
   console.log(`Repository: ${repo.name}`);
  });

  const weatherData = await weatherModule.getWeather(userData.location);
  console.log(
   `Weather in ${userData.location}: ${weatherData.main}, ${weatherData.description}`
  );
 } catch (error) {
  console.error("An error occurred:", error.message);
 }
}

main();
