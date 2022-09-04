const express = require('express');
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/users",userRoutes);

const songRoutes = require("./songRoutes");
router.use("/songs",songRoutes);

module.exports = router;