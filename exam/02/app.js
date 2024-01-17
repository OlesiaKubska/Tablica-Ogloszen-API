const colors = require("colors");

// Sprawdzenie, czy podano argumenty
if (process.argv.length <= 2) {
 console.error("Error: No string provided for display.".green);
 process.exit(1);
}

try {
 const text = process.argv[2]; // Pobranie tekstu z argumentów
 console.log(text.rainbow); // Wyświetlenie tekstu w kolorach tęczy
} catch (error) {
 console.error(`Error: ${error.message}`.red);
}

// Wywołanie: node app.js "Hello World!"
// Wywołanie: node app.js Error: No string provided for display.
