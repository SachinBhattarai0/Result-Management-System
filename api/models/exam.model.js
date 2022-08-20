const mongoose = require("mongoose");
const Mark = require("./mark.model");

const examSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  date: { type: Number, required: true },
});

examSchema.post("remove", async function () {
  await Mark.deleteMany({ "exam.id": this._id.toString() });
});

// examSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Exam", examSchema);
