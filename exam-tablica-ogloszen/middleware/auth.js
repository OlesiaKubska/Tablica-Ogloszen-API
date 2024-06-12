const dotenv = require("dotenv");
const Announcement = require("../models/Announcement");

dotenv.config();

const users = [
 { username: process.env.USER1_USERNAME, password: process.env.USER1_PASSWORD },
 { username: process.env.USER2_USERNAME, password: process.env.USER2_PASSWORD },
 { username: process.env.USER3_USERNAME, password: process.env.USER3_PASSWORD },
];

const authenticate = (req, res, next) => {
 const { username, password } = req.headers;

 const user = users.find(
  (u) => u.username === username && u.password === password
 );
 if (!user) {
  return res
   .status(403)
   .json({ message: "Brak dostępu. Nieprawidłowe dane uwierzytelniające." });
 }

 req.user = user;
 next();
};

const authorize = async (req, res, next) => {
 const announcement = await Announcement.findById(req.params.id);
 if (!announcement) {
  return res.status(404).json({ message: "Ogłoszenie nie znalezione" });
 }

 if (announcement.author !== req.user.username) {
  return res.status(403).json({
   message: "Brak dostępu. Nie masz uprawnień do wykonania tej operacji.",
  });
 }

 req.announcement = announcement;
 next();
};

module.exports = { authenticate, authorize };
