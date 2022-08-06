const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  date: { type: Number, required: true },
});

module.exports = mongoose.model("Exam", examSchema);
