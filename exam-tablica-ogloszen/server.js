const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const setupSwagger = require("./swagger");
const connectDB = require("./config/db");
const announcementRoutes = require("./routes/announcementRoutes");
const heartbeatRoutes = require("./routes/heartbeatRoutes");
const logRequest = require("./logger");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Middleware do obsługi CORS
app.use(cors());

// Middleware do logowania żądań
if (process.argv.includes("debug")) {
 app.use((req, res, next) => {
  logRequest(req);
  next();
 });
}

// Umożliw serwowanie plików z katalogu uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/announcements", announcementRoutes);
app.use("/heartbeat", heartbeatRoutes);

// Setup Swagger
setupSwagger(app);

// Middleware do obsługi błędów 404 - zwracanie statycznego obrazka
app.use((req, res, next) => {
 console.log("404 error middleware hit");
 res.status(404).sendFile(path.join(__dirname, "public", "404.png"));
});

// Middleware do obsługi błędów aplikacji
app.use((err, req, res, next) => {
 console.error(err.stack); // Logowanie szczegółów błędu na serwerze
 res.status(500).json({ message: "Wewnętrzny błąd serwera" }); // Wysłanie komunikatu do klienta
});

const PORT = process.env.PORT || 4700;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
