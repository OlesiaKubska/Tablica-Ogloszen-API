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

/**
 * @swagger
 * components:
 *   schemas:
 *     Announcement:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the announcement
 *         title:
 *           type: string
 *           description: The title of the announcement
 *         description:
 *           type: string
 *           description: The description of the announcement
 *         author:
 *           type: string
 *           description: The author of the announcement
 *         category:
 *           type: string
 *           description: The category of the announcement
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The tags of the announcement
 *         price:
 *           type: number
 *           description: The price of the announcement
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the announcement was created
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: The images of the announcement
 *       example:
 *         title: Sprzedam rower
 *         description: Rower w dobrym stanie, używany przez 2 lata.
 *         author: user1
 *         category: Sport
 *         tags: [rower, sport]
 *         price: 500
 *         createdAt: 2024-06-12T11:35:29.121Z
 *         images: [image1.png, image2.png]
 */

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: The announcements managing API
 */

/**
 * @swagger
 * /api/announcements:
 *   get:
 *     summary: Returns the list of all the announcements
 *     tags: [Announcements]
 *     responses:
 *       200:
 *         description: The list of the announcements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Announcement'
 */

router
 .route("/")
 .get(getAnnouncements)

 /**
  * @swagger
  * /api/announcements:
  *   post:
  *     summary: Create a new announcement
  *     tags: [Announcements]
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               title:
  *                 type: string
  *                 description: The title of the announcement
  *               description:
  *                 type: string
  *                 description: The description of the announcement
  *               category:
  *                 type: string
  *                 description: The category of the announcement
  *               tags:
  *                 type: string
  *                 description: The tags of the announcement
  *               price:
  *                 type: number
  *                 description: The price of the announcement
  *               images:
  *                 type: array
  *                 items:
  *                   type: string
  *                 description: The images of the announcement
  *     responses:
  *       201:
  *         description: The announcement was successfully created
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Announcement'
  *       500:
  *         description: Some server error
  */

 .post(authenticate, upload.array("images", 5), createAnnouncement);

/**
 * @swagger
 * /api/announcements/{id}:
 *   get:
 *     summary: Get the announcement by id
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The announcement id
 *     responses:
 *       200:
 *         description: The announcement description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Announcement'
 *       404:
 *         description: The announcement was not found
 */

router
 .route("/:id")
 .get(getAnnouncementById)
 /**
  * @swagger
  * /api/announcements/{id}:
  *   put:
  *     summary: Update the announcement by the id
  *     tags: [Announcements]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The announcement id
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             type: object
  *             properties:
  *               title:
  *                 type: string
  *                 description: The title of the announcement
  *               description:
  *                 type: string
  *                 description: The description of the announcement
  *               category:
  *                 type: string
  *                 description: The category of the announcement
  *               tags:
  *                 type: string
  *                 description: The tags of the announcement
  *               price:
  *                 type: number
  *                 description: The price of the announcement
  *               images:
  *                 type: array
  *                 items:
  *                   type: string
  *                 description: The images of the announcement
  *     responses:
  *       200:
  *         description: The announcement was updated
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Announcement'
  *       404:
  *         description: The announcement was not found
  *       500:
  *         description: Some error happened
  */

 .put(authenticate, authorize, upload.array("images", 5), updateAnnouncement)
 /**
  * @swagger
  * /api/announcements/{id}:
  *   delete:
  *     summary: Remove the announcement by id
  *     tags: [Announcements]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The announcement id
  *     responses:
  *       200:
  *         description: The announcement was deleted
  *       404:
  *         description: The announcement was not found
  */

 .delete(authenticate, authorize, deleteAnnouncement);

module.exports = router;
