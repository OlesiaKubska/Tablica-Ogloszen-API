const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
 title: { type: String, required: true },
 description: { type: String, required: true },
 author: { type: String, required: true },
 category: { type: String, required: true },
 tags: [String],
 price: { type: Number, required: true },
 createdAt: { type: Date, default: Date.now },
 images: [String],
});

module.exports = mongoose.model("Announcement", announcementSchema);
