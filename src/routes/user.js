const express = require("express");
const userRouter = express.Router();
const Connectionrequest = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");
const USER_STATIC_FIELD = "firstName lastName age gender about photos skills";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const Connectionrequests = await Connectionrequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", USER_STATIC_FIELD);

    res.json({
      message: "Data fecthed successfully !!",
      data: Connectionrequests,
    });
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionRequests = await Connectionrequest.find({
      $or: [
        { toUserId: user._id, status: "accepted" },
        { fromUserId: user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_STATIC_FIELD)
      .populate("toUserId", USER_STATIC_FIELD);

    const data = connectionRequests.map((conn) => {
      if (conn.fromUserId._id.toString() === user._id.toString()) {
        console.log("success");
        return conn.toUserId;
      }
      return conn.fromUserId;
    });
    res.json({
      message: "connection fecthed successfull !!",
      data: data,
    });
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const connectRequests = await Connectionrequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFormFeed = new Set();
    connectRequests.forEach((data) => {
      hideUserFormFeed.add(data.fromUserId._id.toString());
      hideUserFormFeed.add(data.toUserId._id.toString());
    });

    const feedUser = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFormFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_STATIC_FIELDS)
      .skip(skip)
      .limit(limit);

    res.json({
      message: "Feed data fetched successfully",
      data: feedUser,
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      data: [],
      error: err.message,
    });
  }
});

module.exports = userRouter;
