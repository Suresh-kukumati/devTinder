const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
