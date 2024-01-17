const fs = require("fs");
const path = require("path");

// Pobieranie ścieżki do pliku
const filePath = path.basename(__filename);

// Odczytanie szczegółów pliku
fs.stat(filePath, (err, stats) => {
 if (err) {
  console.error("Error:", err);
  return;
 }

 console.log(`File details for ${filePath}:`);
 console.log(`Creation time: ${stats.birthtime}`);
 console.log(`Last modified time: ${stats.mtime}`);
 console.log(`Size: ${stats.size} bytes`);
});
