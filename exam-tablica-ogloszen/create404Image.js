const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

const publicDir = path.join(__dirname, "public");
const filePath = path.join(publicDir, "404.png");

// Utwórz katalog public, jeśli nie istnieje
if (!fs.existsSync(publicDir)) {
 fs.mkdirSync(publicDir);
}

const width = 600;
const height = 400;

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

// Tło
context.fillStyle = "#ffffff";
context.fillRect(0, 0, width, height);

// Tekst 404
context.fillStyle = "#000000";
context.font = "bold 48px Arial";
context.fillText("404", width / 2 - 50, height / 2 - 10);

// Tekst Not Found
context.font = "bold 24px Arial";
context.fillText("Not Found", width / 2 - 75, height / 2 + 40);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(filePath, buffer);
console.log("404.png image created successfully");
