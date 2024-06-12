const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const announcementRoutes = require("./routes/announcementRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/announcements", announcementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
