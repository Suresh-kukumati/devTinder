const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");

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
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //Fields validation
    validateSignUpData(req.body);

    //Bcrypt password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = {
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    };

    const userData = new User(user);
    // const userData = new User({
    //   firstName: "Rajesh K",
    //   lastName: "K",
    //   emailId: "Rajesh@gmail.com",
    //   password: "Pass@1234567890",
    // });

    await userData.save();
    res.send("User Created successfully");
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

app.get("/user", async (req, res) => {
  // const user = await User.find(req.body);
  const user = await User.findOne(req.body);

  if (!user) {
    res.status(404).send("User not found");
  }
  res.send(user);
});

app.get("/feed", async (req, res) => {
  const feedUsers = await User.find({});

  if (!feedUsers.length) {
    res.status(400).send("Unable to find users");
  }

  res.send(feedUsers);
});

app.patch("/update/:userId", async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params?.userId;

    const ALLOW_UPDATE_FIELDS = ["firstName", "test"];

    // const isUpdateAllowed = Object.keys(data).every((k) => {
    //   return ALLOW_UPDATE_FIELDS.includes(k);
    // });

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOW_UPDATE_FIELDS.includes(k)
    );
    // console.log(isUpdateAllowed);
    if (!isUpdateAllowed) {
      throw new Error("Fields are not allowed for Update 1");
    }
    const testArray = data.test;
    console.log(testArray);

    if (testArray.length > 10) {
      throw new Error("`test` field length is very high");
    }

    const updateData = await User.findOneAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    console.log(updateData);
    res.send("Data updated successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //Validating req data
    validateLoginData(req.body);

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error(
        "User is not valid , please enter a correct user details"
      );
    }

    const validateUser = await bcrypt.compare(password, user.password);

    if (validateUser) {
      const token = jwt.sign({ _id: user._id }, "tokenFirstWithNew");
      if (token) {
        res.cookie("token", token, { expiresIn: "0d" });
        res.send("User logged in successfully");
      } else {
        throw new Error("something wrong with token, please try again");
      }
    } else {
      throw new Error("User credential is mismatched");
    }
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (e) {
    res.status(400).send("ERROR: " + e.message);
  }
});

app.get("/sendconnection", userAuth, (req, res) => {
  res.send("Successfully connected");
});
