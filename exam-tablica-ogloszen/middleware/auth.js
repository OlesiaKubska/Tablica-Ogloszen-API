const dotenv = require("dotenv");

dotenv.config();

const authenticate = (req, res, next) => {
 const password = req.headers["x-api-password"];

 if (!password || password !== process.env.API_PASSWORD) {
  return res
   .status(403)
   .json({ message: "Brak dostępu. Nieprawidłowe hasło." });
 }

 next();
};

module.exports = authenticate;
