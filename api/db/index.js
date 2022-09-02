const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  // .connect("mongodb://127.0.0.1:27017/rms")
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to db!"))
  .catch(() => console.log("connection to db failed!"));
