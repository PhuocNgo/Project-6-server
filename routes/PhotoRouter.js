const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/commentsOfPhoto/:photo_id", async (request, response) => {
  try {
    const { comment, userId } = request.body;
    const photoId = request.params.photo_id;
    const thatPhoto = await Photo.findById(photoId);
    if (!thatPhoto) {
      return response.status(404).send({ message: "Photo not found!" });
    }

    const newComment = { comment, date_time: new Date(), user_id: userId };

    thatPhoto.comments.push(newComment);
    await thatPhoto.save();

    response.status(200).send({ photoWithNewComments: thatPhoto });
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.post("/new", upload.single("file"), async (request, response) => {
  try {
    const user = request.user;
    const title = request.body.title;
    const imagePath = request.file.path;
    const photoSaved = await Photo.create({
      title: title,
      url: imagePath,
      file_name: req.file.filename,
      user_id: user._id,
      comments: [],
    });
    response.status(200).send({
      message: "upload success",
      data: photoSaved,
    });
  } catch (err) {
    response.status(500).send({ message: "error" });
  }
});

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const photosList = await Photo.find({
      user_id: id,
    });
    response.send(photosList);
  } catch {
    response
      .status(400)
      .send({ message: `This photo with id: ${id} doesn't exist` });
  }
});

module.exports = router;
