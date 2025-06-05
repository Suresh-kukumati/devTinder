const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const {
  validateSignUpData,
  validateLoginData,
} = require("../utils/validation");

const authRouter = express.Router();
authRouter.use(express.json());
authRouter.use(cookieParser());

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //Fields validation
    validateSignUpData(req.body);

    //Bcrypt password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = {
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    };

    const userData = await new User(user);
    await userData.save();
    res.send("User Created successfully");
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //Validating req data
    validateLoginData(req.body);

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error(
        "User is not valid , please enter a correct user details"
      );
    }

    const validateUser = await user.validateHashPassword(password);

    if (validateUser) {
      const token = await user.getJWT();
      if (token) {
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
        res.json({
          message: "User logged in successfully!",
          data: user,
          error: null,
        });
      } else {
        throw new Error("something wrong with token, please try again");
      }
    } else {
      throw new Error("User credential is mismatched");
    }
  } catch (e) {
    res.status(400).json({
      message: "Failed to login",
      data: [],
      error: e.message,
    });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", "", { expiresIn: new Date(Date.now()) });
  res.send("User log out successfully");
});

module.exports = authRouter;
