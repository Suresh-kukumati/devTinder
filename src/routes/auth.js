const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const rateLimt = require("express-rate-limit");

const loginLimiter = rateLimt({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after 15 minutes",
  },
  standardHeaders: true, //Ratelimit-Limit,Ratelimit-Remaining,Ratelimit-Reset
  legacyHeaders: true, //legacyHeaders: Controls whether to send the old headers (X-RateLimit-*),
  // Setting to false avoids duplication if you're using only standard headers.
});

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
    const userData = {
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    };

    const user = await new User(userData);
    await user.save();

    const token = await user.getJWT();

    if (token) {
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      const data = user.toObject();
      delete data.password;

      res.json({
        message: "User Created successfully",
        data,
        error: null,
      });
    } else {
      throw new Error("something wrong with token, please try again");
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Failed to register",
        data: [],
        error: "Email already exists",
      });
    }
    res.status(400).json({
      message: "Failed to Register",
      data: [],
      error: err.message,
    });
  }
});

authRouter.post("/login", loginLimiter, async (req, res) => {
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
    // console.log(user);
    if (validateUser) {
      const token = await user.getJWT();
      if (token) {
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });

        const sortData = user.toObject();
        delete sortData.password;

        res.status(200).json({
          message: "User logged in successfully!",
          data: sortData,
          error: null,
        });
      } else {
        throw new Error("something wrong with token, please try again");
      }
    } else {
      throw new Error("User credential is mismatched");
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to login",
      data: [],
      error: err.message,
    });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", "", { expiresIn: new Date(Date.now()) });
  res.send("User log out successfully");
});

module.exports = authRouter;
