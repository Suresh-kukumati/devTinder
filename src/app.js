const express = require("express");

const app = express();
const { authCheck, authUserCheck } = require("./middleware/auth");

app.use("/admin", authCheck);

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.use("/user", (req, res) => {
  // try {
  throw new Error("User mismatched");
  res.send("User created");
  // } catch (e) {
  //   res.status(500).send("Something went wrong, contact Admin");
  // }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong with default route");
  }
});

app.use("/admin/created", (req, res) => {
  res.send("Admin created");
});

app.use("/admin/deleted", (req, res) => {
  res.send("Admin deleted");
});

app.listen(3000, () => {
  console.log("server is listening");
});
