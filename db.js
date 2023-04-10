require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URL;

const connectToMongo = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("connected to mongo"))
    .catch((err) => console.log(err));
};

module.exports = connectToMongo;
