const mongoose = require("mongoose");
const Announcement = require("../models/Announcement");

exports.getAnnouncements = async (req, res, next) => {
 const {
  title,
  description,
  startDate,
  endDate,
  minPrice,
  maxPrice,
  category,
  author,
  tags,
 } = req.query;

 let filter = {};

 if (title) {
  filter.title = { $regex: title, $options: "i" };
 }

 if (description) {
  filter.description = { $regex: description, $options: "i" };
 }

 if (startDate || endDate) {
  filter.createdAt = {};
  if (startDate) {
   filter.createdAt.$gte = new Date(startDate);
  }
  if (endDate) {
   filter.createdAt.$lte = new Date(endDate);
  }
 }

 if (minPrice || maxPrice) {
  filter.price = {};
  if (minPrice) {
   filter.price.$gte = parseFloat(minPrice);
  }
  if (maxPrice) {
   filter.price.$lte = parseFloat(maxPrice);
  }
 }

 if (category) {
  filter.category = category;
 }

 if (author) {
  filter.author = { $regex: author, $options: "i" };
 }

 if (tags) {
  filter.tags = { $in: tags.split(",") };
 }

 console.log("Filter:", filter);

 try {
  const announcements = await Announcement.find(filter);
  res.json(announcements);
 } catch (err) {
  next(err);
 }
};

exports.getAnnouncementById = async (req, res, next) => {
 try {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
   return res.status(400).json({ message: "Nieprawidłowe ID" });
  }

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
      `Price: ${announcement.price}` +
      `Images: ${announcement.images.join(", ")}`
    );
   },
   "text/html": () => {
    res.send(
     `<h1>${announcement.title}</h1>` +
      `<p>${announcement.description}</p>` +
      `<p><strong>Author:</strong> ${announcement.author}</p>` +
      `<p><strong>Category:</strong> ${announcement.category}</p>` +
      `<p><strong>Tags:</strong> ${announcement.tags.join(", ")}</p>` +
      `<p><strong>Price:</strong> ${announcement.price}</p>``<p><strong>Images:</strong> ${announcement.images
       .map((image) => `<img src="/uploads/${image}" />`)
       .join("")}</p>`
    );
   },
   default: () => {
    res.status(406).send("Not Acceptable");
   },
  });
 } catch (err) {
  next(err);
 }
};

exports.createAnnouncement = async (req, res, next) => {
 const { title, description, category, tags, price } = req.body;
 const author = req.user.username;
 const images = req.files.map((file) => file.filename);

 if (!title || !description || !category || !price) {
  return res.status(400).json({
   message: "Brakuje wymaganych pól: title, description, category, price",
  });
 }

 try {
  const newAnnouncement = new Announcement({
   title,
   description,
   author,
   category,
   tags,
   price,
   images,
  });
  await newAnnouncement.save();
  res.status(201).json(newAnnouncement);
 } catch (err) {
  next(err);
 }
};

exports.updateAnnouncement = async (req, res, next) => {
 try {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
   return res.status(400).json({ message: "Nieprawidłowe ID" });
  }

  const images = req.files.map((file) => file.filename);
  const updatedData = { ...req.body, images };

  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
   req.params.id,
   updatedData,
   { new: true, runValidators: true }
  );
  if (!updatedAnnouncement)
   return res.status(404).json({ message: "Ogłoszenie nie znalezione" });
  res.json(updatedAnnouncement);
 } catch (err) {
  next(err);
 }
};

exports.deleteAnnouncement = async (req, res, next) => {
 try {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
   return res.status(400).json({ message: "Nieprawidłowe ID" });
  }

  const announcement = await Announcement.findByIdAndDelete(req.params.id);
  if (!announcement)
   return res.status(404).json({ message: "Ogłoszenie nie znalezione" });
  res.json({ message: "Ogłoszenie usunięte" });
 } catch (err) {
  next(err);
 }
};
