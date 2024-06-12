const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
 const currentTime = new Date().toISOString();
 res.status(200).json({ currentTime });
});

module.exports = router;
