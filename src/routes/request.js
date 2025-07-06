const express = require("express");
const { userAuth } = require("../middleware/auth");
const Connectionrequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const { userId: toUserId, status } = req.params;
      const fromUserId = user._id;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status type");
      }

      const verifyToUser = await User.findById(toUserId);

      // console.log(verifyToUser);

      if (!verifyToUser) {
        return res
          .status(400)
          .send({ message: "sending to connection user is mismatch" });
      }

      const existConnectionRequest = await Connectionrequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      // console.log(existConnectionRequest);

      if (existConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection is already exists" });
      }

      const connection = await Connectionrequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connection.save();

      res.json({
        message: "Connection send successfully",
        data,
        error: null,
      });
    } catch (err) {
      res.status(400).json({
        message: "Failed to connect the request",
        data: [],
        error: err.message,
      });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUser = req.user;

      const allowedRequestStatus = ["accepted", "rejected"];

      if (!allowedRequestStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status send" });
      }

      const connectionData = await Connectionrequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionData) {
        return res.status(400).json({ message: "Connection not found" });
      }

      connectionData.status = status;
      const data = await connectionData.save();
      res.json({
        message: `connection request ${status} successfully`,
        data,
        error: null,
      });
    } catch (err) {
      res.status(400).json({
        message: "Something went wrong",
        data: [],
        error: err.message,
      });
      res.status(400).send("Error: " + e.message);
    }
  }
);

module.exports = requestRouter;
