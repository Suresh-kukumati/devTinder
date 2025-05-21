const express = require("express");
const connectDB = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("DB connection is successfully");
    app.listen(3000, () => {
      console.log("server is listening");
    });
  })
  .catch(() => {
    console.log("DB connection is failds");
  });
