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

router.route("/").get(getAnnouncements).post(authenticate, createAnnouncement);

router
 .route("/:id")
 .get(getAnnouncementById)
 .put(authenticate, authorize, updateAnnouncement)
 .delete(authenticate, authorize, deleteAnnouncement);

module.exports = router;
