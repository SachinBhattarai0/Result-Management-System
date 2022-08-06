const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    completed: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

assignmentSchema.index({ exam: 1, class: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
