const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("Hi i am server with new");
});

app.listen(3000, () => {
  console.log("server is listening");
});
