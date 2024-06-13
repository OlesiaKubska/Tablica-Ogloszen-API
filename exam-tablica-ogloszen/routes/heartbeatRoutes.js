const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /heartbeat:
 *   get:
 *     summary: Returns the current server time
 *     tags: [Heartbeat]
 *     responses:
 *       200:
 *         description: The current server time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentTime:
 *                   type: string
 *                   description: The current server time in ISO format
 *                   example: 2023-06-15T12:00:00.000Z
 */

router.get("/", (req, res) => {
 const currentTime = new Date().toISOString();
 res.status(200).json({ currentTime });
});

module.exports = router;
