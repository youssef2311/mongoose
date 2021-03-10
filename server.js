const express = require("express");
const connectDB = require("./config/connectDB");

const server = express();
server.use(express.json());

connectDB();
server.use("/persons", require("./routes/person"));
const port = process.env.PORT || 8000;

server.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on http://localhost:${port}`);
});