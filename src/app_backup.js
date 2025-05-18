const express = require("express");

const app = express();
const { authCheck, authUserCheck } = require("./middleware/auth");

app.use("/admin", authCheck);

app.use("/user", authUserCheck, (req, res) => {
  res.send("User created");
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
