const mongoose = require("mongoose");
const Assignment = require("../models/assignment.model");
const Exam = require("../models/exam.model");

const classSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

classSchema.index({ name: 1 }, { unique: true });

classSchema.post("remove", async function () {
  await Assignment.deleteMany({ class: this._id.toString() });
});

module.exports = mongoose.model("Class", classSchema);
