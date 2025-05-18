const express = require("express");

const app = express();

// app.use("/test", (req, res) => {
//   res.send("Hi i am server with new");
// });

app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params);
  res.send("Hi i am server with new");
});

app.listen(3000, () => {
  console.log("server is listening");
});
