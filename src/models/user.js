const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      // required: true,
    },
    gender: {
      type: String,
      // required: true,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw Error("Invalid gender name");
        }
      },
    },
    about: {
      type: String,
      default: "Hi i am mong testing",
    },
    photos: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/13/42/46/360_F_313424630_Uja1TnjdFhdz0bdbFnhMRuBTSIw25TWQ.jpg",
    },
    skills: {
      type: Array,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "tokenFirstWithNew", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validateHashPassword = async function (password) {
  const user = this;
  const hashPassword = user.password;
  const validateUser = await bcrypt.compare(password, hashPassword);
  return validateUser;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
