const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  mongoose
    .connect(config.get("MONGO_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("mongoose is connectedd"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;