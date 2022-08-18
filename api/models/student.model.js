const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNo: Number,
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    passed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//after student is deleted, change roll No of remainig student alphabetically
studentSchema.post("remove", async function () {
  const stdList = await Student.find({
    class: this.class,
  }).sort({ name: 1 });

  stdList.forEach(async (s, i) => {
    await s.updateOne({ rollNo: i + 1 });
  });
});

// studentSchema.index({ class: 1, rollNo: 1 }, { unique: true });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
