const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      lowercase: true,
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
      required: true,
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw Error("Invalid gender name");
        }
      },
    },
    desc: {
      type: String,
      default: "Hi i am mong testing",
    },
    test: {
      type: Array,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
