const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.get("/sendconnection", userAuth, (req, res) => {
  res.send("Successfully connected");
});

module.exports = requestRouter;
