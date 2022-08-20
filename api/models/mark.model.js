const mongoose = require("mongoose");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");

/*
 Here in markSchema no any refrences are used because,the data should not be changing overtime
 for example if a mark is created for student whose name is John and after some time the name
 is changed to Jack then the name should be John for all the marks of exams which he has given
 in past the name should not change in the report card while printing

 because the name has been changed recently and the name was John back 
 when the mark was first created
*/
const markSchema = new mongoose.Schema(
  {
    exam: {
      type: Object,
      id: String,
      name: String,
      year: Number,
      month: Number,
      date: Number,
    },
    class: {
      type: Object,
      id: String,
      name: String,
    },
    student: {
      type: Object,
      id: String,
      name: String,
      rollNo: Number,
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

markSchema.index(
  { "exam.id": 1, "class.id": 1, "student.id": 1 },
  { unique: true }
);
markSchema.index({ "student.id": 1 });

markSchema.virtual("total").get(function () {
  return this.marks.reduce((pv, cv) => {
    return +pv + +cv.theoryMark + +cv.practicalMark;
  }, 0);
});

markSchema.plugin(mongooseLeanVirtuals);

module.exports = mongoose.model("Mark", markSchema);
