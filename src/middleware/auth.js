const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies) {
      throw new Error("Token is expired first");
    }

    const { token } = cookies;
    // console.log(token);
    const decoded = await jwt.verify(token, "tokenFirstWithNew");

    if (!decoded) {
      throw new Error("Token is expired");
    }

    const { _id } = decoded;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
};

module.exports = { userAuth };
