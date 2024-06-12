const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "requests.log");

const logRequest = (req) => {
 const logEntry = `${new Date().toISOString()} - ${req.method} ${
  req.originalUrl
 }\n`;
 fs.appendFileSync(logFilePath, logEntry, "utf8");
};

module.exports = logRequest;
