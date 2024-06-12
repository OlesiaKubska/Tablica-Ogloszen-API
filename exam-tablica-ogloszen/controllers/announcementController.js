const Announcement = require("../models/Announcement");

exports.getAnnouncements = async (req, res) => {
 try {
  const announcements = await Announcement.find();
  res.json(announcements);
 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};

exports.getAnnouncementById = async (req, res) => {
 try {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement)
   return res.status(404).json({ message: "Ogłoszenie nie znalezione" });
  res.json(announcement);
 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};

exports.createAnnouncement = async (req, res) => {
 const { title, description, author, category, tags, price } = req.body;
 try {
  const newAnnouncement = new Announcement({
   title,
   description,
   author,
   category,
   tags,
   price,
  });
  await newAnnouncement.save();
  res.status(201).json(newAnnouncement);
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
};

exports.updateAnnouncement = async (req, res) => {
 try {
  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
   req.params.id,
   req.body,
   { new: true, runValidators: true }
  );
  if (!updatedAnnouncement)
   return res.status(404).json({ message: "Ogłoszenie nie znalezione" });
  res.json(updatedAnnouncement);
 } catch (err) {
  res.status(400).json({ message: err.message });
 }
};

exports.deleteAnnouncement = async (req, res) => {
 try {
  const announcement = await Announcement.findByIdAndDelete(req.params.id);
  if (!announcement)
   return res.status(404).json({ message: "Ogłoszenie nie znalezione" });
  res.json({ message: "Ogłoszenie usunięte" });
 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};
