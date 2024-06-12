const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const announcementRoutes = require("./routes/announcementRoutes");
const heartbeatRoutes = require("./routes/heartbeatRoutes");
const logRequest = require("./logger");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Middleware do logowania żądań
if (process.argv.includes("debug")) {
 app.use((req, res, next) => {
  logRequest(req);
  next();
 });
}

app.use("/api/announcements", announcementRoutes);
app.use("/heartbeat", heartbeatRoutes);

const PORT = process.env.PORT || 4700;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
