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

  console.log("Accept header:", req.headers.accept);

  res.format({
   "application/json": () => {
    res.json(announcement);
   },
   "text/plain": () => {
    res.send(
     `Title: ${announcement.title}\n` +
      `Description: ${announcement.description}\n` +
      `Author: ${announcement.author}\n` +
      `Category: ${announcement.category}\n` +
      `Tags: ${announcement.tags.join(", ")}\n` +
      `Price: ${announcement.price}`
    );
   },
   "text/html": () => {
    res.send(
     `<h1>${announcement.title}</h1>` +
      `<p>${announcement.description}</p>` +
      `<p><strong>Author:</strong> ${announcement.author}</p>` +
      `<p><strong>Category:</strong> ${announcement.category}</p>` +
      `<p><strong>Tags:</strong> ${announcement.tags.join(", ")}</p>` +
      `<p><strong>Price:</strong> ${announcement.price}</p>`
    );
   },
   default: () => {
    res.status(406).send("Not Acceptable");
   },
  });
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
