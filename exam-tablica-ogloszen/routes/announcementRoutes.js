const express = require("express");
const router = express.Router();
const {
 getAnnouncements,
 getAnnouncementById,
 createAnnouncement,
 updateAnnouncement,
 deleteAnnouncement,
} = require("../controllers/announcementController");
const authenticate = require("../middleware/auth");

router.route("/").get(getAnnouncements).post(createAnnouncement);

router
 .route("/:id")
 .get(getAnnouncementById)
 .put(authenticate, updateAnnouncement)
 .delete(authenticate, deleteAnnouncement);

module.exports = router;
