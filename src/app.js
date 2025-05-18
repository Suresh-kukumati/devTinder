const express = require("express");

const app = express();

// app.use("/test", (req, res) => {
//   res.send("Hi i am server with new");
// });

app.get(
  "/user",
  [
    (req, res, next) => {
      console.log("Handling first user");
      // res.send("I am the response of first user");
      next();
    },
    (req, res, next) => {
      console.log("Handling second user");
      // res.send("I am the response of Second user");
      next();
    },
  ],
  (req, res, next) => {
    console.log("Handling Third user");
    // res.send("I am the response of Third user");
    next();
  },
  (req, res, next) => {
    console.log("Handling Fourth user");
    // res.send("I am the response of Fourth user");
    next();
  },
  (req, res, next) => {
    console.log("Handling Fifth user");
    res.send("I am the response of Fifth user");
    // next();
  }
);

app.listen(3000, () => {
  console.log("server is listening");
});
