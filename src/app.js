const express = require("express");

const app = express();

app.use("/hello/2", (req, res) => {
  res.send("Hi i am hello 2");
});

app.use("/hello", (req, res) => {
  res.send("Hi i am hello hello test");
});

app.use("/xyz", (req, res) => {
  res.send("Hi i am xyz xyz test");
});

// app.use("/", (req, res) => {
//   res.send("Hi i am server with new");
// });

app.listen(3000, () => {
  console.log("server is listening");
});
