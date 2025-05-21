const mongoosh = require("mongoose");

const connectDB = async () => {
  await mongoosh.connect(
    "mongodb+srv://sureshpkukumati:WVySz9tRQR1FFheM@cluster0.96iob8r.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
