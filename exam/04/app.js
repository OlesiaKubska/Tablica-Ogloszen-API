const fs = require("fs").promises;
const axios = require("axios");

async function fetchDataFromAPI(number) {
 try {
  const response = await axios.get(
   `https://lukaszuk.net/numbers.php?number=${number}`
  );
  return response.data;
 } catch (error) {
  throw new Error(`Error with API: ${error.message}`);
 }
}

async function main() {
 try {
  // Odczyt danych z pliku data.json
  const data = JSON.parse(await fs.readFile("data.json", "utf8"));

  // Pobranie informacji z API
  const apiData = await fetchDataFromAPI(data.number);

  // Zapis danych do pliku
  await fs.writeFile(data.filename, apiData);
  console.log(`Information saved in file ${data.filename}`);
 } catch (error) {
  console.error("An error occurred:", error);
 }
}

main();
