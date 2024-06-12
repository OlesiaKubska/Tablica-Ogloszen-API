const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const announcementRoutes = require("./routes/announcementRoutes");
const heartbeatRoutes = require("./routes/heartbeatRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/announcements", announcementRoutes);
app.use("/heartbeat", heartbeatRoutes);

const PORT = process.env.PORT || 4700;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
