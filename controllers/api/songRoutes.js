const express = require("express");
const router = express.Router();
const { User, Song } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const songData = await Song.findAll({
      include: [User],
    });
    res.status(200).json(songData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const songData = await Song.findByPk(req.params.id, {
      include: [User],
    });
    if (!songData) {
      res.status(404).json({ msg: "song does not exist" });
    } else {
      res.json(songData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

router.post("/", async (req, res) => {
  try {
    const songData = await Song.create({
      song_name: req.body.song_name,
      artist: req.body.artist,
      genre: req.body.genre,
    });
    res.status(200).json(songData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await Song.update(
      {
        song_name: req.body.song_name,
        artist: req.body.artist,
        genre: req.body.genre,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!response[0]) {
      res.status(404).json({ msg: "song does not exist" });
    } else {
      res.json({ msg: "successfully updated song" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const response = await Song.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (response == 0) {
      res.status(404).json({ msg: "song does not exist" });
    } else {
      res.json("song removed from database");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

module.exports = router;
