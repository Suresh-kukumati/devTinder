const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const {
  validateEditProfileData,
  validateForgotPasswordData,
} = require("../utils/validation");
const { hash } = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Fields are not valid");
    }

    const loggedInUser = req.user;

    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    // console.log(loggedInUser);

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} details updated successfully`,
      data: loggedInUser,
    });
    res.send();
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!validateForgotPasswordData(req)) {
      throw new Error("Fields are not valid");
    }

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const veryfiedPassword = await user.validateHashPassword(oldPassword);

    if (!veryfiedPassword) {
      throw new Error("Old password mismatch");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

    if (!hashPassword) {
      throw new Error("Password hashing issue");
    }
    user.password = hashPassword;
    user.save();

    res.json({ message: "Password successfully updated" });
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
});

module.exports = profileRouter;
