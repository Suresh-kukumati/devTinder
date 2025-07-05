const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies) {
      res
        .status(401)
        .json({ message: "Unauthenticated user", data: [], error: null });
    }

    const { token } = cookies;
    if (!token) {
      res
        .status(401)
        .json({ message: "Unauthenticated user", data: [], error: null });
    }
    const decoded = await jwt.verify(token, "tokenFirstWithNew");

    if (!decoded) {
      res
        .status(401)
        .json({ message: "Unauthenticated user", data: [], error: null });
    }

    const { _id } = decoded;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(400).json({ message: "Error", data: [], error: e.message });
  }
};

module.exports = { userAuth };
