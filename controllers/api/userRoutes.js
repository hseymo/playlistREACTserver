const express = require("express");
const router = express.Router();
const { User, Song } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [Song],
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [Song],
    });
    if (!userData) {
      res.status(404).json({ msg: "user does not exist" });
    } else {
      res.json(userData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = await User.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!response[0]) {
      res.status(404).json({ msg: "user does not exist" });
    } else {
      res.json({ msg: "successfully updated user" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

// need to debug this route - successfully deleting but also catching
router.delete("/:id", async (req, res) => {
  try {
    const response = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (response == 0) {
      res.status(404).json({ msg: "user does not exist" });
    } else {
      res.json({ msg: "user removed from database" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err: err });
  }
});

module.exports = router;
