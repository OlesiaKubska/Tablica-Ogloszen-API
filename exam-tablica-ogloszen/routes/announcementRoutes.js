const express = require("express");
const router = express.Router();
const {
 getAnnouncements,
 getAnnouncementById,
 createAnnouncement,
 updateAnnouncement,
 deleteAnnouncement,
} = require("../controllers/announcementController");
const { authenticate, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router
 .route("/")
 .get(getAnnouncements)
 .post(authenticate, upload.array("images", 5), createAnnouncement);

router
 .route("/:id")
 .get(getAnnouncementById)
 .put(authenticate, authorize, upload.array("images", 5), updateAnnouncement)
 .delete(authenticate, authorize, deleteAnnouncement);

module.exports = router;
