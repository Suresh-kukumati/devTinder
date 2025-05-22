const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

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
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const userData = new User(req.body);
    // const userData = new User({
    //   firstName: "Rajesh K",
    //   lastName: "K",
    //   emailId: "Rajesh@gmail.com",
    //   password: "Pass@1234567890",
    // });

    await userData.save();
    res.send("User Created successfully");
  } catch (e) {
    res.status(400).send("User creation failed");
  }
});
