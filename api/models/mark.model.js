const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

const markSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    marks: [
      {
        type: Object,
        subject: String,
        theoryMark: Number,
        practicalMark: Number,
        total: Number,
        fullTheoryMark: Number,
        fullPracticalMark: Number,
      },
    ],
  },
  { timestamps: true }
);

markSchema.index({ exam: 1, class: 1, student: 1 }, { unique: true });

markSchema.virtual("total").get(function () {
  return this.marks.reduce((pv, cv) => {
    return +pv + +cv.theoryMark + +cv.practicalMark;
  }, 0);
});

markSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model("Mark", markSchema);
