const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    theoryMark: {
      type: Number,
      default: 75,
      required: true,
    },
    practicalMark: {
      type: Number,
      default: 25,
      required: true,
    },
    passMark: {
      type: Number,
      default: 40,
      required: true,
    },
    class: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
    total: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
