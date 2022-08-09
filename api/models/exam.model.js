const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  date: { type: Number, required: true },
});

module.exports = mongoose.model("Exam", examSchema);
