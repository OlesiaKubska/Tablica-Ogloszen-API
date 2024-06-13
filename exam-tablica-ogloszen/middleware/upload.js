const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
 fs.mkdirSync(uploadDir);
}

// Konfiguracja miejsca i nazwy plików
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, uploadDir);
 },
 filename: (req, file, cb) => {
  cb(null, `${Date.now()}_${file.originalname}`);
 },
});

// Filtracja plików - akceptowanie tylko obrazów
const fileFilter = (req, file, cb) => {
 const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
 if (allowedMimeTypes.includes(file.mimetype)) {
  cb(null, true);
 } else {
  cb(new Error("Invalid file type. Only JPEG, PNG and GIF are allowed."));
 }
};

const upload = multer({
 storage: storage,
 fileFilter: fileFilter,
 limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
