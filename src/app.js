const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const cors = require("cors");
// https://medium.com/deno-the-complete-reference/10-commonly-used-express-middlewares-33dba53faf7a
const app = express();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const ExpressError = require("./utils/ExpressError");
const helmet = require("helmet");

// app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5174",
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
      console.log("server is listening 3000");
    });
  })
  .catch(() => {
    console.error("DB connection is failds");
  });

app.all("/{*any}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 404, message } = err;
  res.status(statusCode).send(message);
});
