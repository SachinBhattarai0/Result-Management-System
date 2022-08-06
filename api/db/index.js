const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/rms")
  .then(() => console.log("Connected to db!"))
  .catch(() => console.log("connection to db failed!"));
