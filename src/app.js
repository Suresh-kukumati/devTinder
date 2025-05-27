const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const app = express();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("DB connection is successfully");
    app.listen(3000, () => {
      console.log("server is listening");
    });
  })
  .catch(() => {
    console.error("DB connection is failds");
  });
